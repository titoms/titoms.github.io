import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, test } from "node:test";
import worker from "../src/worker.ts";
import { resetGcalTokenCache } from "../src/server/lib/gcal.ts";
import { signToken } from "../src/server/lib/tokens.ts";
import { addDays, isBusinessDay, todayInZone } from "../src/server/lib/tz.ts";
import { getJson, makeTestEnv, postJson } from "./helpers.mjs";

const originalFetch = globalThis.fetch;

// Real RSA key so the service-account JWT signing path works under test.
const keyPair = await crypto.subtle.generateKey(
  { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
  true,
  ["sign", "verify"],
);
const TEST_PRIVATE_KEY_B64 = Buffer.from(await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)).toString("base64");

afterEach(() => {
  globalThis.fetch = originalFetch;
  resetGcalTokenCache();
});

const signWebhook = (payload, secret) => {
  const t = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return `t=${t},v1=${sig}`;
};

const ENV = {
  STRIPE_SECRET_KEY: "sk_test_x",
  STRIPE_WEBHOOK_SECRET: "whsec_test",
  TOKEN_SECRET: "tok_test",
  RESEND_API_KEY: "re_test",
  ADMIN_EMAIL: "admin@example.com",
  GOOGLE_SERVICE_ACCOUNT_EMAIL: "svc@example.iam.gserviceaccount.com",
  GOOGLE_PRIVATE_KEY_B64: TEST_PRIVATE_KEY_B64,
  GOOGLE_CALENDAR_ID: "cal@example.com",
};

/** Stubs Stripe, Resend and Google (token + freeBusy + events). */
const stubExternals = (busy = []) => {
  const calls = { stripe: [], resend: [], gcalEvents: [] };
  globalThis.fetch = async (url, init = {}) => {
    const href = String(url);
    if (href === "https://oauth2.googleapis.com/token") {
      return new Response(JSON.stringify({ access_token: "g_tok", expires_in: 3600 }), { status: 200 });
    }
    if (href === "https://www.googleapis.com/calendar/v3/freeBusy") {
      return new Response(JSON.stringify({ calendars: { "cal@example.com": { busy } } }), { status: 200 });
    }
    if (href.includes("/calendar/v3/calendars/") && href.includes("/events") && init.method === "POST") {
      calls.gcalEvents.push(JSON.parse(init.body));
      return new Response(JSON.stringify({ id: "evt_1", hangoutLink: "https://meet.google.com/abc-defg" }), { status: 200 });
    }
    if (href.includes("/calendar/v3/calendars/") && init.method === "PATCH") {
      return new Response("{}", { status: 200 });
    }
    if (href.includes("/calendar/v3/calendars/") && init.method === "DELETE") {
      return new Response(null, { status: 204 });
    }
    if (href.startsWith("https://api.stripe.com/")) {
      calls.stripe.push({ url: href, body: String(init.body ?? "") });
      return new Response(JSON.stringify({ id: "pi_booking_1", client_secret: "cs_booking_1" }), { status: 200 });
    }
    if (href.startsWith("https://api.resend.com/")) {
      calls.resend.push(JSON.parse(init.body));
      return new Response('{"id":"email_1"}', { status: 200 });
    }
    return new Response("not found", { status: 404 });
  };
  return calls;
};

/** Next business day ~2 weeks out (inside the 60-day window, past lead time). */
const futureBusinessDay = () => {
  let date = addDays(todayInZone("Europe/Paris"), 14);
  while (!isBusinessDay(date)) date = addDays(date, 1);
  return date;
};

const makeHold = async (env, overrides = {}) => {
  const response = await worker.fetch(
    postJson("/api/booking/hold", {
      serviceId: "coach-1h",
      date: futureBusinessDay(),
      time: "09:00",
      timezone: "Europe/Paris",
      ...overrides,
    }),
    env,
    {},
  );
  return response;
};

test("availability returns grouped slots for a business day, none on weekends", async () => {
  stubExternals();
  const env = makeTestEnv(ENV);

  const date = futureBusinessDay();
  const dayResponse = await worker.fetch(
    getJson(`/api/booking/availability?date=${date}&serviceId=coach-1h`),
    env,
    {},
  );
  const day = await dayResponse.json();
  assert.equal(day.success, true);
  assert.equal(day.groups.length, 3);
  assert.ok(day.groups[0].slots.some((s) => s.available));

  const weekend = addDays(date, 6 - new Date(`${date}T12:00:00Z`).getUTCDay()); // Saturday
  const weekendResponse = await worker.fetch(
    getJson(`/api/booking/availability?date=${weekend}&serviceId=coach-1h`),
    env,
    {},
  );
  const weekendBody = await weekendResponse.json();
  assert.ok(weekendBody.groups.every((g) => g.slots.every((s) => !s.available)));
});

test("long services cannot start in late slots (must end by 18:00)", async () => {
  stubExternals();
  const env = makeTestEnv(ENV);
  const date = futureBusinessDay();

  // Full-day (480 min): only 09:00 / 09:30 / 10:00 fit.
  const response = await worker.fetch(
    getJson(`/api/booking/availability?date=${date}&serviceId=dev-full`),
    env,
    {},
  );
  const body = await response.json();
  const available = body.groups.flatMap((g) => g.slots).filter((s) => s.available).map((s) => s.time);
  assert.deepEqual(available.sort(), ["09:00", "09:30", "10:00"]);
});

test("month view flags days with at least one open slot", async () => {
  stubExternals();
  const env = makeTestEnv(ENV);
  const date = futureBusinessDay();
  const month = date.slice(0, 7);

  const response = await worker.fetch(
    getJson(`/api/booking/availability?month=${month}&serviceId=coach-1h`),
    env,
    {},
  );
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(body.days[date], true);
});

test("busy Google Calendar intervals remove overlapping slots", async () => {
  const date = futureBusinessDay();
  // Block 08:00–12:00 UTC — covers the whole Paris morning (summer: 09:00–13:00... use wide block).
  stubExternals([{ start: `${date}T00:00:00Z`, end: `${date}T11:00:00Z` }]);
  const env = makeTestEnv(ENV);

  const response = await worker.fetch(
    getJson(`/api/booking/availability?date=${date}&serviceId=coach-1h`),
    env,
    {},
  );
  const body = await response.json();
  const morning = body.groups.find((g) => g.name === "morning");
  assert.ok(morning.slots.every((s) => !s.available));
  const afternoon = body.groups.find((g) => g.name === "afternoon");
  assert.ok(afternoon.slots.some((s) => s.available));
});

test("hold → payment-intent → webhook confirm: booking confirmed with Meet link and email", async () => {
  const calls = stubExternals();
  const env = makeTestEnv(ENV);

  const hold = await makeHold(env);
  const holdBody = await hold.json();
  assert.equal(holdBody.success, true);
  assert.ok(holdBody.holdId);

  const piResponse = await worker.fetch(
    postJson("/api/booking/payment-intent", {
      holdId: holdBody.holdId,
      name: "Jane Founder",
      email: "jane@example.com",
      company: "Acme",
      projectDetails: "Need help with my React app",
    }),
    env,
    {},
  );
  const piBody = await piResponse.json();
  assert.equal(piBody.success, true);
  assert.equal(piBody.amountCents, 9000); // REFONTE 1h coaching price
  assert.match(calls.stripe[0].body, /amount=9000/);

  const event = {
    id: "evt_b1",
    type: "payment_intent.succeeded",
    data: { object: { id: "pi_booking_1", metadata: { kind: "booking", bookingId: holdBody.holdId } } },
  };
  const payload = JSON.stringify(event);
  const webhook = await worker.fetch(
    new Request("https://fullstackchris.dev/api/stripe/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json", "stripe-signature": signWebhook(payload, "whsec_test") },
      body: payload,
    }),
    env,
    {},
  );
  assert.equal((await webhook.json()).received, true);

  const booking = await env.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(holdBody.holdId).first();
  assert.equal(booking.status, "confirmed");
  assert.equal(booking.gcal_event_id, "evt_1");
  assert.equal(booking.meet_url, "https://meet.google.com/abc-defg");

  // Confirmation email with .ics attachment + manage link.
  const email = calls.resend.find((m) => m.subject.startsWith("Confirmed:"));
  assert.ok(email, "confirmation email sent");
  assert.match(email.html, /\/booking\/manage\/\?id=/);
  assert.equal(email.attachments[0].filename, "booking.ics");

  // Slot is now blocked for everyone else.
  const dayResponse = await worker.fetch(
    getJson(`/api/booking/availability?date=${booking.date}&serviceId=coach-1h`),
    env,
    {},
  );
  const day = await dayResponse.json();
  const slot = day.groups.flatMap((g) => g.slots).find((s) => s.time === booking.start_time);
  assert.equal(slot.available, false);
});

test("a second hold on a held slot is rejected", async () => {
  stubExternals();
  const env = makeTestEnv(ENV);
  const date = futureBusinessDay();

  const first = await makeHold(env, { date });
  assert.equal((await first.json()).success, true);

  const second = await makeHold(env, { date });
  const body = await second.json();
  assert.equal(second.status, 409);
  assert.equal(body.code, "slot-taken");
});

test("payment-intent with unknown or stale hold is rejected", async () => {
  stubExternals();
  const env = makeTestEnv(ENV);

  const response = await worker.fetch(
    postJson("/api/booking/payment-intent", { holdId: "nope", name: "A", email: "a@b.co" }),
    env,
    {},
  );
  assert.equal(response.status, 409);
  assert.equal((await response.json()).code, "hold-expired");
});

test("manage link: view, reschedule and cancel with token auth", async () => {
  const calls = stubExternals();
  const env = makeTestEnv(ENV);

  // Create + confirm a booking directly in the DB for speed.
  const hold = await makeHold(env);
  const { holdId } = await hold.json();
  await worker.fetch(
    postJson("/api/booking/payment-intent", { holdId, name: "Jane", email: "jane@example.com" }),
    env,
    {},
  );
  const booking = await env.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(holdId).first();
  await env.DB.prepare("UPDATE bookings SET status = 'confirmed', gcal_event_id = 'evt_1' WHERE id = ?").bind(holdId).run();

  const token = await signToken({ bid: holdId, s: booking.manage_secret }, "tok_test", 400 * 24 * 3600);

  const manage = await worker.fetch(getJson(`/api/booking/manage?id=${holdId}&t=${token}`), env, {});
  const manageBody = await manage.json();
  assert.equal(manageBody.success, true);
  assert.equal(manageBody.booking.canModify, true);
  assert.equal(manageBody.booking.amount, "€90");

  const badToken = await worker.fetch(getJson(`/api/booking/manage?id=${holdId}&t=bogus`), env, {});
  assert.equal(badToken.status, 403);

  const newDate = addDays(booking.date, 7);
  const newDay = isBusinessDay(newDate) ? newDate : addDays(newDate, 2);
  const reschedule = await worker.fetch(
    postJson("/api/booking/reschedule", { id: holdId, token, date: newDay, time: "14:00" }),
    env,
    {},
  );
  const reschedBody = await reschedule.json();
  assert.equal(reschedBody.success, true);
  assert.equal(reschedBody.booking.date, newDay);
  assert.equal(reschedBody.booking.status, "rescheduled");

  const cancel = await worker.fetch(
    postJson("/api/booking/cancel", { id: holdId, token }),
    env,
    {},
  );
  assert.equal((await cancel.json()).success, true);

  const final = await env.DB.prepare("SELECT status FROM bookings WHERE id = ?").bind(holdId).first();
  assert.equal(final.status, "cancelled");
  assert.ok(calls.resend.some((m) => m.subject.startsWith("Cancelled:")));
});

test("custom quote stores a lead and emails the admin", async () => {
  const calls = stubExternals();
  const env = makeTestEnv(ENV);

  const response = await worker.fetch(
    postJson("/api/booking/custom-quote", {
      name: "Bob Builder",
      email: "bob@example.com",
      company: "BuildIt",
      message: "I need a custom integration between my CRM and a React dashboard.",
    }),
    env,
    {},
  );
  assert.equal((await response.json()).success, true);

  const lead = await env.DB.prepare("SELECT * FROM custom_quotes WHERE email = ?").bind("bob@example.com").first();
  assert.equal(lead.name, "Bob Builder");
  assert.ok(calls.resend.some((m) => m.subject.includes("[custom quote]")));
});

test("custom quote honeypot is silently accepted", async () => {
  stubExternals();
  const env = makeTestEnv(ENV);

  const response = await worker.fetch(
    postJson("/api/booking/custom-quote", {
      name: "Bot",
      email: "bot@example.com",
      message: "spam spam spam spam spam spam",
      honeypot: "http://spam.example",
    }),
    env,
    {},
  );
  assert.equal((await response.json()).success, true);

  const lead = await env.DB.prepare("SELECT * FROM custom_quotes WHERE email = ?").bind("bot@example.com").first();
  assert.equal(lead, null);
});
