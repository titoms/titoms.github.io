// Magic-link auth: email → signed-in session cookie. No passwords.
//
// POST /api/auth/magic-link  { email, next? }      → emails a 15-min sign-in link
// GET  /api/auth/verify?token=…&next=…             → sets session cookie, redirects
// POST /api/auth/logout                            → clears session
// GET  /api/auth/me                                → { email } or 401

import type { Env } from "./env.ts";
import { json, readJson } from "./lib/http.ts";
import { emailButton, emailShell, sendEmail } from "./lib/mailer.ts";
import { addSecondsIso, newId, nowIso } from "./lib/db.ts";
import { randomToken, sha256Hex } from "./lib/tokens.ts";

const SESSION_COOKIE = "fsc_session";
const SESSION_TTL_SECONDS = 30 * 24 * 3600; // 30 days
const MAGIC_TTL_SECONDS = 15 * 60;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const GENERIC_SUCCESS = {
  success: true,
  message: "If that email is known to us, a sign-in link is on its way.",
};

const getCookie = (request: Request, name: string): string | null => {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
};

/** Only same-origin absolute paths are allowed as post-login redirects. */
const safeNext = (value: unknown): string => {
  if (typeof value !== "string") return "/shop/account/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/shop/account/";
  return value;
};

export interface SessionCustomer {
  id: string;
  email: string;
}

export const getSessionCustomer = async (
  request: Request,
  env: Env,
): Promise<SessionCustomer | null> => {
  if (!env.DB) return null;
  const token = getCookie(request, SESSION_COOKIE);
  if (!token) return null;

  const hash = await sha256Hex(token);
  const row = await env.DB.prepare(
    `SELECT s.expires_at AS expires_at, c.id AS id, c.email AS email
     FROM sessions s JOIN customers c ON c.id = s.customer_id
     WHERE s.token_hash = ?`,
  )
    .bind(hash)
    .first<{ expires_at: string; id: string; email: string }>();

  if (!row || row.expires_at < nowIso()) return null;
  return { id: row.id, email: row.email };
};

const handleMagicLink = async (request: Request, env: Env, url: URL): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const email = String(body.value.email ?? "").trim().toLowerCase();
  const next = safeNext(body.value.next);

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ success: false, message: "Please enter a valid email address." }, 400);
  }

  const token = randomToken();
  const tokenHash = await sha256Hex(token);

  await env.DB.prepare(
    "INSERT INTO magic_tokens (token_hash, email, next, expires_at) VALUES (?, ?, ?, ?)",
  )
    .bind(tokenHash, email, next, addSecondsIso(nowIso(), MAGIC_TTL_SECONDS))
    .run();

  const link = `${url.origin}/api/auth/verify?token=${encodeURIComponent(token)}`;

  if (env.DEBUG_EMAIL_LINKS === "true") {
    console.log("[auth] magic link", { email, link });
  }

  const result = await sendEmail(env, {
    to: email,
    subject: "Your sign-in link — fullstackchris.dev",
    html: emailShell(
      "Sign in to fullstackchris.dev",
      `<p>Click below to sign in. This link expires in 15 minutes and can only be used once.</p>
       <p>${emailButton(link, "Sign in")}</p>
       <p style="color:#a4a4af;font-size:13px;word-break:break-all;">${link}</p>
       <p style="color:#8f8f9d;font-size:13px;">If you didn't request this, you can ignore this email.</p>`,
    ),
  });

  if (!result.ok) {
    return json(
      { success: false, message: "We could not send the sign-in email right now. Please try again later." },
      502,
    );
  }

  return json(GENERIC_SUCCESS);
};

const upsertCustomer = async (env: Env, email: string): Promise<string> => {
  const existing = await env.DB!.prepare("SELECT id FROM customers WHERE email = ?")
    .bind(email)
    .first<{ id: string }>();
  if (existing) return existing.id;

  const id = newId();
  await env.DB!.prepare("INSERT INTO customers (id, email) VALUES (?, ?)").bind(id, email).run();
  return id;
};

const handleVerify = async (request: Request, env: Env, url: URL): Promise<Response> => {
  const fail = (reason: string) =>
    Response.redirect(`${url.origin}/shop/account/?error=${encodeURIComponent(reason)}`, 302);

  if (!env.DB) return fail("unavailable");

  const token = url.searchParams.get("token") ?? "";
  if (!token) return fail("invalid");

  const tokenHash = await sha256Hex(token);
  const row = await env.DB.prepare(
    "SELECT email, next, expires_at, used_at FROM magic_tokens WHERE token_hash = ?",
  )
    .bind(tokenHash)
    .first<{ email: string; next: string | null; expires_at: string; used_at: string | null }>();

  if (!row || row.used_at || row.expires_at < nowIso()) return fail("invalid");

  await env.DB.prepare("UPDATE magic_tokens SET used_at = ? WHERE token_hash = ?")
    .bind(nowIso(), tokenHash)
    .run();

  const customerId = await upsertCustomer(env, row.email);
  const sessionToken = randomToken();
  const sessionHash = await sha256Hex(sessionToken);

  await env.DB.prepare("INSERT INTO sessions (token_hash, customer_id, expires_at) VALUES (?, ?, ?)")
    .bind(sessionHash, customerId, addSecondsIso(nowIso(), SESSION_TTL_SECONDS))
    .run();

  const destination = safeNext(row.next);
  return new Response(null, {
    status: 302,
    headers: {
      Location: destination,
      "Set-Cookie": `${SESSION_COOKIE}=${sessionToken}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`,
      "Cache-Control": "no-store",
    },
  });
};

const handleLogout = async (request: Request, env: Env, url: URL): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }

  const token = getCookie(request, SESSION_COOKIE);
  if (token && env.DB) {
    const hash = await sha256Hex(token);
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(hash).run();
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${url.origin}/shop/account/`,
      "Set-Cookie": `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
      "Cache-Control": "no-store",
    },
  });
};

const handleMe = async (request: Request, env: Env): Promise<Response> => {
  const customer = await getSessionCustomer(request, env);
  if (!customer) return json({ authenticated: false }, 401);
  return json({ authenticated: true, email: customer.email });
};

export const handleAuthRequest = async (
  request: Request,
  env: Env,
  url: URL,
): Promise<Response> => {
  switch (url.pathname) {
    case "/api/auth/magic-link":
      return handleMagicLink(request, env, url);
    case "/api/auth/verify":
      return handleVerify(request, env, url);
    case "/api/auth/logout":
      return handleLogout(request, env, url);
    case "/api/auth/me":
      return handleMe(request, env);
    default:
      return json({ success: false, message: "Not found." }, 404);
  }
};
