import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildBeehiivPayload,
  normalizeSignupInput,
  validateSignupInput,
} from "../src/server/newsletter.js";

test("validates and normalizes a newsletter signup", () => {
  const input = normalizeSignupInput({
    email: "  Reader@Example.COM ",
    source: "newsletter-footer",
    interest: "AI Clarity",
    honeypot: "",
  });

  assert.deepEqual(input, {
    email: "reader@example.com",
    source: "newsletter-footer",
    interest: "AI Clarity",
    honeypot: "",
  });

  assert.equal(validateSignupInput(input).ok, true);
});

test("rejects invalid, empty, suspicious, and honeypot signups", () => {
  const invalidCases = [
    { email: "" },
    { email: "not-an-email" },
    { email: "reader@example.com\nBcc: spam@example.com" },
    { email: "reader@example.com", source: "<script>alert(1)</script>" },
    { email: "reader@example.com", interest: "x".repeat(121) },
    { email: "reader@example.com", honeypot: "filled-by-bot" },
    { email: "reader@example.com", website: "legacy-honeypot" },
  ];

  for (const candidate of invalidCases) {
    assert.equal(validateSignupInput(normalizeSignupInput(candidate)).ok, false);
  }
});

test("builds the minimal beehiiv payload by default", () => {
  const payload = buildBeehiivPayload({
    email: "reader@example.com",
    source: "newsletter-footer",
    interest: "AI Clarity",
    honeypot: "",
  });

  assert.deepEqual(payload, {
    email: "reader@example.com",
    reactivate_existing: false,
    send_welcome_email: false,
    utm_source: "newsletter-footer",
    utm_medium: "organic",
    utm_campaign: "ai_clarity_newsletter",
    double_opt_override: "not_set",
  });
});

test("adds beehiiv custom fields only when enabled and existing", () => {
  const payload = buildBeehiivPayload(
    {
      email: "reader@example.com",
      source: "cloudflare-test",
      interest: "AI workflows",
      honeypot: "",
    },
    {
      customFieldsEnabled: true,
      existingCustomFieldNames: new Set(["Interest", "Source"]),
    },
  );

  assert.deepEqual(payload.custom_fields, [
    { name: "Interest", value: "AI workflows" },
    { name: "Source", value: "cloudflare-test" },
  ]);
});

test("does not add beehiiv custom fields when Interest is missing", () => {
  const payload = buildBeehiivPayload(
    {
      email: "reader@example.com",
      source: "cloudflare-test",
      interest: "AI workflows",
      honeypot: "",
    },
    {
      customFieldsEnabled: true,
      existingCustomFieldNames: new Set(["Source"]),
    },
  );

  assert.equal("custom_fields" in payload, false);
});

test("does not add beehiiv custom fields when support is disabled", () => {
  const payload = buildBeehiivPayload(
    {
      email: "reader@example.com",
      source: "cloudflare-test",
      interest: "AI workflows",
      honeypot: "",
    },
    {
      customFieldsEnabled: false,
      existingCustomFieldNames: new Set(["Interest", "Source"]),
    },
  );

  assert.equal("custom_fields" in payload, false);
});

test("uses a safe default source in beehiiv payloads", () => {
  const payload = buildBeehiivPayload({
    email: "reader@example.com",
    source: "",
    interest: "",
    honeypot: "",
  });

  assert.deepEqual(payload, {
    email: "reader@example.com",
    reactivate_existing: false,
    send_welcome_email: false,
    utm_source: "website",
    utm_medium: "organic",
    utm_campaign: "ai_clarity_newsletter",
    double_opt_override: "not_set",
  });
});
