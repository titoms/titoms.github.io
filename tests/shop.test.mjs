import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, test } from "node:test";
import worker from "../src/worker.ts";
import { getJson, makeFakeR2, makeTestEnv, postJson } from "./helpers.mjs";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

const signWebhook = (payload, secret) => {
  const t = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return `t=${t},v1=${sig}`;
};

const stubStripeAndResend = () => {
  const calls = { stripe: [], resend: [], beehiiv: [] };
  globalThis.fetch = async (url, init = {}) => {
    const href = String(url);
    if (href.startsWith("https://api.stripe.com/")) {
      calls.stripe.push({ url: href, body: init.body ? String(init.body) : "" });
      return new Response(JSON.stringify({ id: "pi_test_1", client_secret: "cs_test_1" }), { status: 200 });
    }
    if (href.startsWith("https://api.resend.com/")) {
      calls.resend.push(JSON.parse(init.body));
      return new Response('{"id":"email_1"}', { status: 200 });
    }
    if (href.startsWith("https://api.beehiiv.com/")) {
      calls.beehiiv.push(JSON.parse(init.body));
      return new Response("{}", { status: 201 });
    }
    return new Response("not found", { status: 404 });
  };
  return calls;
};

const WEBHOOK_ENV = {
  STRIPE_SECRET_KEY: "sk_test_x",
  STRIPE_WEBHOOK_SECRET: "whsec_test",
  TOKEN_SECRET: "tok_test",
  RESEND_API_KEY: "re_test",
  BEEHIIV_API_KEY: "bk_test",
  BEEHIIV_PUBLICATION_ID: "pub_test",
};

test("products endpoint returns catalog without R2 file keys", async () => {
  const env = makeTestEnv();
  const response = await worker.fetch(getJson("/api/shop/products"), env, {});
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.products.length, 12);
  assert.equal(body.products.some((p) => "fileKey" in p), false);
  assert.equal(body.products.find((p) => p.id === "ds-violet").priceCents, 5900);
});

test("coupon validation: seeded WELCOME10 works, unknown codes fail", async () => {
  const env = makeTestEnv();

  const ok = await worker.fetch(postJson("/api/shop/coupon/validate", { code: "welcome10" }), env, {});
  assert.deepEqual(await ok.json(), { valid: true, code: "WELCOME10", percentOff: 10 });

  const bad = await worker.fetch(postJson("/api/shop/coupon/validate", { code: "NOPE" }), env, {});
  assert.equal((await bad.json()).valid, false);
});

test("payment-intent recomputes totals server-side and applies coupon", async () => {
  const calls = stubStripeAndResend();
  const env = makeTestEnv(WEBHOOK_ENV);

  const response = await worker.fetch(
    postJson("/api/shop/payment-intent", {
      email: "buyer@example.com",
      lines: [{ productId: "ds-violet", qty: 1 }],
      couponCode: "LAUNCH20",
    }),
    env,
    {},
  );
  const body = await response.json();

  assert.equal(body.success, true);
  assert.equal(body.free, false);
  assert.equal(body.clientSecret, "cs_test_1");
  assert.deepEqual(body.totals, {
    subtotalCents: 5900,
    discountCents: 1180,
    totalCents: 4720,
    couponCode: "LAUNCH20",
  });

  // Stripe got the server-computed amount (client never sends prices).
  assert.match(calls.stripe[0].body, /amount=4720/);
  assert.match(calls.stripe[0].body, /currency=eur/);
});

test("payment-intent rejects unknown products and bad emails", async () => {
  const env = makeTestEnv(WEBHOOK_ENV);

  const badProduct = await worker.fetch(
    postJson("/api/shop/payment-intent", { email: "a@b.co", lines: [{ productId: "nope", qty: 1 }] }),
    env,
    {},
  );
  assert.equal(badProduct.status, 400);

  const badEmail = await worker.fetch(
    postJson("/api/shop/payment-intent", { email: "nope", lines: [{ productId: "ds-violet", qty: 1 }] }),
    env,
    {},
  );
  assert.equal(badEmail.status, 400);
});

test("free orders skip Stripe, return downloads, and subscribe to Beehiiv", async () => {
  const calls = stubStripeAndResend();
  const env = makeTestEnv(WEBHOOK_ENV);

  const response = await worker.fetch(
    postJson("/api/shop/payment-intent", {
      email: "reader@example.com",
      lines: [{ productId: "fb-starter", qty: 1 }],
    }),
    env,
    {},
  );
  const body = await response.json();

  assert.equal(body.success, true);
  assert.equal(body.free, true);
  assert.equal(calls.stripe.length, 0);
  assert.equal(body.downloads.length, 1);
  assert.match(body.downloads[0].url, /\/api\/shop\/download\//);
  assert.equal(calls.beehiiv.length, 1);
  assert.equal(calls.resend.length, 1); // download email
});

test("webhook marks order paid and emails download links; download endpoint streams R2", async () => {
  const calls = stubStripeAndResend();
  const env = makeTestEnv({
    ...WEBHOOK_ENV,
    DOWNLOADS: makeFakeR2({ "products/ds-violet.zip": { body: "zip-bytes" } }),
  });

  const piResponse = await worker.fetch(
    postJson("/api/shop/payment-intent", {
      email: "buyer@example.com",
      lines: [{ productId: "ds-violet", qty: 1 }],
    }),
    env,
    {},
  );
  const { orderId } = await piResponse.json();

  const event = {
    id: "evt_1",
    type: "payment_intent.succeeded",
    data: { object: { id: "pi_test_1", metadata: { kind: "shop-order", orderId } } },
  };
  const payload = JSON.stringify(event);
  const webhookResponse = await worker.fetch(
    new Request("https://fullstackchris.dev/api/stripe/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": signWebhook(payload, "whsec_test"),
      },
      body: payload,
    }),
    env,
    {},
  );
  assert.equal((await webhookResponse.json()).received, true);

  // Confirmation email contains a working download link.
  const orderEmail = calls.resend.find((m) => m.subject.includes("download links"));
  assert.ok(orderEmail, "order email sent");
  const link = orderEmail.html.match(/https:\/\/fullstackchris\.dev\/api\/shop\/download\/([A-Za-z0-9_.-]+)/);
  assert.ok(link, "download link present");

  const downloadResponse = await worker.fetch(getJson(`/api/shop/download/${link[1]}`), env, {});
  assert.equal(downloadResponse.status, 200);
  assert.equal(await downloadResponse.text(), "zip-bytes");

  // Duplicate webhook delivery is a no-op.
  const dupe = await worker.fetch(
    new Request("https://fullstackchris.dev/api/stripe/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json", "stripe-signature": signWebhook(payload, "whsec_test") },
      body: payload,
    }),
    env,
    {},
  );
  assert.equal((await dupe.json()).duplicate, true);
});

test("webhook rejects bad signatures", async () => {
  const env = makeTestEnv(WEBHOOK_ENV);
  const response = await worker.fetch(
    new Request("https://fullstackchris.dev/api/stripe/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json", "stripe-signature": "t=1,v1=bad" },
      body: JSON.stringify({ id: "evt_x", type: "payment_intent.succeeded", data: { object: {} } }),
    }),
    env,
    {},
  );
  assert.equal(response.status, 400);
});

test("orders endpoint requires auth and lists paid orders with downloads", async () => {
  const calls = stubStripeAndResend();
  const env = makeTestEnv(WEBHOOK_ENV);

  const anon = await worker.fetch(getJson("/api/shop/orders"), env, {});
  assert.equal(anon.status, 401);

  // Guest places a free order.
  await worker.fetch(
    postJson("/api/shop/payment-intent", {
      email: "buyer@example.com",
      lines: [{ productId: "fb-prompts", qty: 1 }],
    }),
    env,
    {},
  );

  // Buyer signs in via magic link.
  await worker.fetch(postJson("/api/auth/magic-link", { email: "buyer@example.com" }), env, {});
  const magicEmail = calls.resend.find((m) => m.subject.includes("sign-in"));
  const token = magicEmail.html.match(/verify\?token=([A-Za-z0-9_-]+)/)[1];
  const verify = await worker.fetch(getJson(`/api/auth/verify?token=${token}`), env, {});
  const session = verify.headers.get("Set-Cookie").match(/fsc_session=([A-Za-z0-9_-]+)/)[1];

  const ordersResponse = await worker.fetch(
    getJson("/api/shop/orders", { Cookie: `fsc_session=${session}` }),
    env,
    {},
  );
  const body = await ordersResponse.json();

  assert.equal(body.success, true);
  assert.equal(body.orders.length, 1);
  assert.equal(body.orders[0].status, "paid");
  assert.equal(body.orders[0].items[0].title, "Cursor & Claude Prompt Pack");
  assert.match(body.orders[0].downloads[0].url, /\/api\/shop\/download\//);
});

test("wishlist requires auth and round-trips", async () => {
  const calls = stubStripeAndResend();
  const env = makeTestEnv(WEBHOOK_ENV);

  const anon = await worker.fetch(getJson("/api/shop/wishlist"), env, {});
  assert.equal(anon.status, 401);

  await worker.fetch(postJson("/api/auth/magic-link", { email: "fan@example.com" }), env, {});
  const magicEmail = calls.resend.find((m) => m.subject.includes("sign-in"));
  const token = magicEmail.html.match(/verify\?token=([A-Za-z0-9_-]+)/)[1];
  const verify = await worker.fetch(getJson(`/api/auth/verify?token=${token}`), env, {});
  const session = verify.headers.get("Set-Cookie").match(/fsc_session=([A-Za-z0-9_-]+)/)[1];
  const auth = { Cookie: `fsc_session=${session}` };

  const put = await worker.fetch(
    new Request("https://fullstackchris.dev/api/shop/wishlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...auth },
      body: JSON.stringify({ productIds: ["ds-violet", "tpl-saas"] }),
    }),
    env,
    {},
  );
  assert.equal((await put.json()).success, true);

  const list = await worker.fetch(getJson("/api/shop/wishlist", auth), env, {});
  assert.deepEqual((await list.json()).productIds.sort(), ["ds-violet", "tpl-saas"]);

  const bad = await worker.fetch(
    new Request("https://fullstackchris.dev/api/shop/wishlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...auth },
      body: JSON.stringify({ productIds: ["not-a-product"] }),
    }),
    env,
    {},
  );
  assert.equal(bad.status, 400);
});

