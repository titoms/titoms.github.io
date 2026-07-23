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

const makeGetRequest = (path) => new Request(`https://fullstackchris.dev${path}`);

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

test("falls back to static assets for canonical non-api routes", async () => {
  const response = await worker.fetch(
    new Request("https://fullstackchris.dev/projects/"),
    makeEnv(),
    {},
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset fallback");
});

test("redirects www host to the canonical apex host", async () => {
  const response = await worker.fetch(
    new Request("https://www.fullstackchris.dev/"),
    makeEnv(),
    {},
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("Location"), "https://fullstackchris.dev/");
});

test("redirects extensionless static routes to trailing-slash canonicals", async () => {
  const response = await worker.fetch(
    new Request("https://fullstackchris.dev/services/mvp-development"),
    makeEnv(),
    {},
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("Location"), "https://fullstackchris.dev/services/mvp-development/");
});

test("does not add trailing slashes to asset URLs", async () => {
  const response = await worker.fetch(
    new Request("https://fullstackchris.dev/og-image.png"),
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
      BEEHIIV_API_BASE_URL: "https://api.beehiiv.com/v2/",
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
    send_welcome_email: false,
    utm_source: "homepage",
    utm_medium: "organic",
    utm_campaign: "ai_clarity_newsletter",
    double_opt_override: "not_set",
  });
});

test("debug config endpoint returns only safe beehiiv configuration values", async () => {
  const response = await worker.fetch(
    makeGetRequest("/api/newsletter/debug-config"),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
    }),
    {},
  );
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(result, {
    ok: true,
    hasBeehiivApiKey: true,
    hasBeehiivPublicationId: true,
    beehiivApiBaseUrl: "https://api.beehiiv.com",
    publicationIdLooksValid: true,
  });
  assert.equal(JSON.stringify(result).includes("test-secret"), false);
  assert.equal(JSON.stringify(result).includes("pub_123"), false);
});

test("beehiiv failures stay generic unless debug mode is enabled", async () => {
  globalThis.fetch = async () =>
    new Response('{"code":"unauthorized","message":"bad token"}', { status: 401 });

  const genericResponse = await worker.fetch(
    makeSubscribeRequest({ email: "reader@example.com", honeypot: "" }),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
    }),
    {},
  );
  const genericResult = await genericResponse.json();

  assert.equal(genericResponse.status, 502);
  assert.deepEqual(genericResult, {
    success: false,
    message: "We could not subscribe you right now. Please try again later.",
  });

  const debugResponse = await worker.fetch(
    makeSubscribeRequest({ email: "reader@example.com", honeypot: "" }),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
      DEBUG_BEEHIIV: "true",
    }),
    {},
  );
  const debugResult = await debugResponse.json();

  assert.equal(debugResponse.status, 502);
  assert.deepEqual(debugResult, {
    success: false,
    message: "We could not subscribe you right now. Please try again later.",
    debug: {
      beehiivStatus: 401,
      beehiivBody: '{"code":"unauthorized","message":"bad token"}',
    },
  });
  assert.equal(JSON.stringify(debugResult).includes("test-secret"), false);
  assert.equal(JSON.stringify(debugResult).includes("reader@example.com"), false);
});

test("custom fields endpoint is available only in debug mode", async () => {
  const disabledResponse = await worker.fetch(
    makeGetRequest("/api/newsletter/custom-fields"),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
    }),
    {},
  );

  assert.equal(disabledResponse.status, 404);

  let beehiivRequest;
  globalThis.fetch = async (url, init) => {
    beehiivRequest = { url, init };
    return new Response(
      JSON.stringify({
        data: [
          { id: "cf_1", display: "Interest", kind: "string", extra: "kept" },
          { id: "cf_2", name: "Source", type: "text" },
        ],
      }),
      { status: 200 },
    );
  };

  const response = await worker.fetch(
    makeGetRequest("/api/newsletter/custom-fields"),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
      DEBUG_BEEHIIV: "true",
    }),
    {},
  );
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(
    beehiivRequest.url,
    "https://api.beehiiv.com/v2/publications/pub_123/custom_fields",
  );
  assert.equal(beehiivRequest.init.headers.Authorization, "Bearer test-secret");
  assert.deepEqual(result, {
    ok: true,
    customFields: [
      { id: "cf_1", name: "Interest", type: "string" },
      { id: "cf_2", name: "Source", type: "text" },
    ],
  });
});

test("subscription includes custom fields only when enabled and known by beehiiv", async () => {
  const calls = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });

    if (String(url).endsWith("/custom_fields")) {
      return new Response(
        JSON.stringify({ data: [{ name: "Interest" }, { name: "Source" }] }),
        { status: 200 },
      );
    }

    return new Response("{}", { status: 201 });
  };

  const response = await worker.fetch(
    makeSubscribeRequest({
      email: "reader@example.com",
      source: "cloudflare-test",
      interest: "AI workflows",
      honeypot: "",
    }),
    makeEnv({
      BEEHIIV_API_KEY: "test-secret",
      BEEHIIV_PUBLICATION_ID: "pub_123",
      BEEHIIV_CUSTOM_FIELDS_ENABLED: "true",
    }),
    {},
  );

  assert.equal(response.status, 200);
  assert.equal(calls.length, 2);
  assert.deepEqual(JSON.parse(calls[1].init.body).custom_fields, [
    { name: "Interest", value: "AI workflows" },
    { name: "Source", value: "cloudflare-test" },
  ]);
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
