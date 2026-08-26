import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import worker from "../src/worker.ts";
import { getJson, makeTestEnv, postJson } from "./helpers.mjs";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

const stubResend = () => {
  const sent = [];
  globalThis.fetch = async (url, init) => {
    if (String(url).startsWith("https://api.resend.com/")) {
      sent.push({ url: String(url), body: JSON.parse(init.body) });
      return new Response('{"id":"email_1"}', { status: 200 });
    }
    return new Response("not found", { status: 404 });
  };
  return sent;
};

const extractMagicLink = (sent) => {
  const html = sent[0]?.body?.html ?? "";
  const match = html.match(/https:\/\/fullstackchris\.dev\/api\/auth\/verify\?token=([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
};

const extractSessionCookie = (response) => {
  const setCookie = response.headers.get("Set-Cookie") ?? "";
  const match = setCookie.match(/fsc_session=([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
};

test("magic link flow: request → email → verify → session → me → logout", async () => {
  const sent = stubResend();
  const env = makeTestEnv({ RESEND_API_KEY: "re_test" });

  const requestResponse = await worker.fetch(
    postJson("/api/auth/magic-link", { email: "Buyer@Example.com", next: "/shop/account/" }),
    env,
    {},
  );
  assert.equal(requestResponse.status, 200);
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].body.to, ["buyer@example.com"]);

  const token = extractMagicLink(sent);
  assert.ok(token, "magic link token present in email");

  const verifyResponse = await worker.fetch(
    getJson(`/api/auth/verify?token=${token}`),
    env,
    {},
  );
  assert.equal(verifyResponse.status, 302);
  assert.equal(verifyResponse.headers.get("Location"), "/shop/account/");

  const session = extractSessionCookie(verifyResponse);
  assert.ok(session, "session cookie set");

  const meResponse = await worker.fetch(
    getJson("/api/auth/me", { Cookie: `fsc_session=${session}` }),
    env,
    {},
  );
  assert.equal(meResponse.status, 200);
  assert.deepEqual(await meResponse.json(), { authenticated: true, email: "buyer@example.com" });

  const logoutResponse = await worker.fetch(
    postJson("/api/auth/logout", {}, { Cookie: `fsc_session=${session}` }),
    env,
    {},
  );
  assert.equal(logoutResponse.status, 302);

  const meAfterLogout = await worker.fetch(
    getJson("/api/auth/me", { Cookie: `fsc_session=${session}` }),
    env,
    {},
  );
  assert.equal(meAfterLogout.status, 401);
});

test("magic link token cannot be reused", async () => {
  const sent = stubResend();
  const env = makeTestEnv({ RESEND_API_KEY: "re_test" });

  await worker.fetch(postJson("/api/auth/magic-link", { email: "a@b.co" }), env, {});
  const token = extractMagicLink(sent);

  const first = await worker.fetch(getJson(`/api/auth/verify?token=${token}`), env, {});
  assert.equal(first.status, 302);
  assert.equal(first.headers.get("Location"), "/shop/account/");

  const second = await worker.fetch(getJson(`/api/auth/verify?token=${token}`), env, {});
  assert.equal(second.status, 302);
  assert.match(second.headers.get("Location"), /error=invalid/);
});

test("magic link rejects invalid emails", async () => {
  const env = makeTestEnv({ RESEND_API_KEY: "re_test" });
  const response = await worker.fetch(
    postJson("/api/auth/magic-link", { email: "not-an-email" }),
    env,
    {},
  );
  assert.equal(response.status, 400);
});

test("magic link reports failure when the mailer is down", async () => {
  globalThis.fetch = async () => new Response("boom", { status: 500 });
  const env = makeTestEnv({ RESEND_API_KEY: "re_test" });

  const response = await worker.fetch(
    postJson("/api/auth/magic-link", { email: "a@b.co" }),
    env,
    {},
  );
  assert.equal(response.status, 502);
});

test("verify with unknown token redirects with error", async () => {
  const env = makeTestEnv({ RESEND_API_KEY: "re_test" });
  const response = await worker.fetch(getJson("/api/auth/verify?token=bogus"), env, {});
  assert.equal(response.status, 302);
  assert.match(response.headers.get("Location"), /error=invalid/);
});

test("unsafe next values fall back to the account page", async () => {
  const sent = stubResend();
  const env = makeTestEnv({ RESEND_API_KEY: "re_test" });

  await worker.fetch(
    postJson("/api/auth/magic-link", { email: "a@b.co", next: "https://evil.example/" }),
    env,
    {},
  );
  const token = extractMagicLink(sent);
  const response = await worker.fetch(getJson(`/api/auth/verify?token=${token}`), env, {});
  assert.equal(response.headers.get("Location"), "/shop/account/");
});

test("me without cookie returns 401", async () => {
  const env = makeTestEnv();
  const response = await worker.fetch(getJson("/api/auth/me"), env, {});
  assert.equal(response.status, 401);
});
