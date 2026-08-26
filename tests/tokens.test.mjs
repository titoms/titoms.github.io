import assert from "node:assert/strict";
import { test } from "node:test";
import { randomToken, sha256Hex, signToken, verifyToken } from "../src/server/lib/tokens.ts";

test("sign/verify round-trips a payload", async () => {
  const token = await signToken({ orderId: "o1", productId: "p1" }, "secret", 3600);
  const payload = await verifyToken(token, "secret");

  assert.equal(payload.orderId, "o1");
  assert.equal(payload.productId, "p1");
  assert.equal(typeof payload.exp, "number");
});

test("verify rejects a wrong secret", async () => {
  const token = await signToken({ a: 1 }, "secret-a", 3600);
  assert.equal(await verifyToken(token, "secret-b"), null);
});

test("verify rejects tampered payloads", async () => {
  const token = await signToken({ a: 1 }, "secret", 3600);
  const [body] = token.split(".");
  const forged = `${Buffer.from(JSON.stringify({ a: 2, exp: 9999999999 })).toString("base64url")}.${token.split(".")[1]}`;
  assert.equal(await verifyToken(forged, "secret"), null);
  assert.equal(body.length > 0, true);
});

test("verify rejects expired tokens", async () => {
  const token = await signToken({ a: 1 }, "secret", -10);
  assert.equal(await verifyToken(token, "secret"), null);
});

test("verify rejects malformed tokens", async () => {
  assert.equal(await verifyToken("nonsense", "secret"), null);
  assert.equal(await verifyToken("", "secret"), null);
  assert.equal(await verifyToken("a.b.c", "secret"), null);
});

test("randomToken is URL-safe and unique", () => {
  const a = randomToken();
  const b = randomToken();
  assert.notEqual(a, b);
  assert.match(a, /^[A-Za-z0-9_-]+$/);
});

test("sha256Hex is deterministic", async () => {
  const hash = await sha256Hex("hello");
  assert.equal(hash, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
});
