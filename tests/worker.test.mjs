import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import worker from "../src/worker.ts";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

const makeEnv = (overrides = {}) => ({
  ASSETS: {
    fetch: async () => new Response("asset fallback", { status: 200 }),
  },
  ...overrides,
});

const makeSubscribeRequest = (body, headers = {}) =>
  new Request("https://fullstackchris.dev/api/newsletter/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": `192.0.2.${Math.floor(Math.random() * 200) + 1}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });

test("health endpoint returns service status JSON", async () => {
  const response = await worker.fetch(
    new Request("https://fullstackchris.dev/api/health"),
    makeEnv(),
    {},
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "application/json; charset=utf-8");
  assert.deepEqual(body, {
    ok: true,
    service: "fullstackchris-api",
  });
});

test("falls back to static assets for non-api routes", async () => {
  const response = await worker.fetch(
    new Request("https://fullstackchris.dev/projects"),
    makeEnv(),
    {},
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset fallback");
});

test("subscribes through beehiiv without exposing secrets", async () => {
  let beehiivRequest;

  globalThis.fetch = async (url, init) => {
    beehiivRequest = { url, init };
    return new Response("{}", { status: 201 });
  };

  const response = await worker.fetch(
    makeSubscribeRequest({
      email: "reader@example.com",
      source: "homepage",
      interest: "AI workflows",
      honeypot: "",
    }),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
      BEEHIIV_API_BASE_URL: "https://api.beehiiv.com",
    }),
    {},
  );
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(result, {
    success: true,
    message: "Check your inbox to confirm your subscription.",
  });
  assert.equal(beehiivRequest.url, "https://api.beehiiv.com/v2/publications/pub_123/subscriptions");
  assert.equal(beehiivRequest.init.headers.Authorization, "Bearer test-secret");
  assert.deepEqual(JSON.parse(beehiivRequest.init.body), {
    email: "reader@example.com",
    reactivate_existing: false,
    send_welcome_email: true,
    utm_source: "homepage",
    utm_medium: "organic",
    custom_fields: [{ name: "interest", value: "AI workflows" }],
  });
});

test("returns a clean frontend error when beehiiv env vars are missing", async () => {
  const response = await worker.fetch(
    makeSubscribeRequest({ email: "reader@example.com", honeypot: "" }),
    makeEnv(),
    {},
  );
  const result = await response.json();

  assert.equal(response.status, 500);
  assert.deepEqual(result, {
    success: false,
    message: "We could not subscribe you right now. Please try again later.",
  });
});

test("rejects invalid email with a specific frontend message", async () => {
  const response = await worker.fetch(
    makeSubscribeRequest({ email: "not-an-email", honeypot: "" }),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
    }),
    {},
  );
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(result, {
    success: false,
    message: "Please enter a valid email address.",
  });
});
