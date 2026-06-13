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

test("builds the expected beehiiv payload", () => {
  const payload = buildBeehiivPayload({
    email: "reader@example.com",
    source: "newsletter-footer",
    interest: "AI Clarity",
    honeypot: "",
  });

  assert.deepEqual(payload, {
    email: "reader@example.com",
    reactivate_existing: false,
    send_welcome_email: true,
    utm_source: "newsletter-footer",
    utm_medium: "organic",
    custom_fields: [{ name: "interest", value: "AI Clarity" }],
  });
});
