// HMAC-signed stateless tokens (download links, booking manage links) plus
// random-token / hash helpers for DB-backed tokens (sessions, magic links).
// WebCrypto only — runs in Workers and in Node tests.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const base64urlEncode = (bytes: ArrayBuffer | Uint8Array): string => {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const b of arr) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const base64urlDecode = (value: string): Uint8Array => {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const binary = atob(b64 + pad);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
};

export const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

const importHmacKey = (secret: string): Promise<CryptoKey> =>
  crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);

export const hexEncode = (bytes: ArrayBuffer | Uint8Array): string => {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return [...arr].map((b) => b.toString(16).padStart(2, "0")).join("");
};

/** Signs a JSON payload into `b64u(payload+exp).b64u(hmac)`. */
export const signToken = async (
  payload: Record<string, unknown>,
  secret: string,
  ttlSeconds: number,
): Promise<string> => {
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const bodyB64 = base64urlEncode(encoder.encode(JSON.stringify(body)));
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(bodyB64));
  return `${bodyB64}.${base64urlEncode(sig)}`;
};

/** Returns the payload when signature + expiry are valid, else null. */
export const verifyToken = async <T = Record<string, unknown>>(
  token: string,
  secret: string,
): Promise<T | null> => {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const bodyB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  const key = await importHmacKey(secret);
  const expected = base64urlEncode(await crypto.subtle.sign("HMAC", key, encoder.encode(bodyB64)));
  if (!timingSafeEqual(expected, sigB64)) return null;

  try {
    const body = JSON.parse(decoder.decode(base64urlDecode(bodyB64))) as Record<string, unknown>;
    if (typeof body.exp !== "number" || body.exp < Math.floor(Date.now() / 1000)) return null;
    return body as T;
  } catch {
    return null;
  }
};

/** URL-safe random token for sessions / magic links / manage secrets. */
export const randomToken = (bytes = 32): string =>
  base64urlEncode(crypto.getRandomValues(new Uint8Array(bytes)));

/** SHA-256 hex — used to store session/magic tokens hashed at rest. */
export const sha256Hex = async (value: string): Promise<string> =>
  hexEncode(await crypto.subtle.digest("SHA-256", encoder.encode(value)));

/** UTF-8-safe standard base64 (btoa throws on non-Latin1 input). */
export const utf8ToBase64 = (value: string): string => {
  const bytes = encoder.encode(value);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
};
