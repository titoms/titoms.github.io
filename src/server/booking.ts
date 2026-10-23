// Booking API: availability (Google Calendar free/busy ⊖ confirmed bookings ⊖
// active holds), slot holds, PaymentIntents, manage/reschedule/cancel via
// HMAC-signed tokens, and custom-quote intake.

import { BOOKING_SERVICES, formatBookingPrice, getBookingService } from "../config/bookingServices.ts";
import type { Env } from "./env.ts";
import { tokenSecret } from "./env.ts";
import { json, readJson } from "./lib/http.ts";
import { buildIcs } from "./lib/ics.ts";
import { emailButton, emailShell, sendEmail } from "./lib/mailer.ts";
import { addSecondsIso, newId, nowIso } from "./lib/db.ts";
import { createPaymentIntent } from "./lib/stripe.ts";
import { randomToken, signToken, utf8ToBase64, verifyToken } from "./lib/tokens.ts";
import {
  ALL_SLOT_TIMES,
  BUSINESS_TIMEZONE,
  SLOT_GROUP_NAMES,
  SLOT_GROUPS,
  addDays,
  isBusinessDay,
  slotWindowUtc,
  todayInZone,
  zonedTimeToUtc,
} from "./lib/tz.ts";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  isGcalConfigured,
  patchCalendarEvent,
  queryFreeBusy,
  type BusyInterval,
} from "./lib/gcal.ts";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const HOLD_TTL_SECONDS = 15 * 60;
const MANAGE_TOKEN_TTL_SECONDS = 400 * 24 * 3600;
const BOOKING_WINDOW_DAYS = 60;
const MIN_LEAD_HOURS = 12;
const WORK_END_TIME = "18:00"; // Europe/Paris wall clock — a slot must end by this time
const CANCEL_CUTOFF_HOURS = 24;

const GENERIC_ERROR = "Something went wrong. Please try again later.";
const ORIGIN = "https://fullstackchris.dev";

interface BookingRow {
  id: string;
  service_id: string;
  status: string;
  date: string;
  start_time: string;
  duration_min: number;
  timezone: string;
  customer_name: string;
  customer_email: string;
  company: string | null;
  project_details: string | null;
  prep_notes: string | null;
  amount_cents: number;
  stripe_payment_intent: string | null;
  gcal_event_id: string | null;
  meet_url: string | null;
  manage_secret: string;
  cutoff_at: string;
  created_at: string;
}

// ---------- availability engine ----------

const overlaps = (startA: Date, endA: Date, startB: Date, endB: Date): boolean =>
  startA < endB && endA > startB;

const purgeExpiredHolds = async (env: Env): Promise<void> => {
  await env.DB!.prepare("DELETE FROM slot_holds WHERE expires_at < ?").bind(nowIso()).run();
};

interface DayBusy {
  busy: BusyInterval[];
  confirmed: { startUtc: Date; endUtc: Date }[];
  heldTimes: Set<string>;
}

const getDayBusy = async (env: Env, dateStr: string, busyWindow?: BusyInterval[]): Promise<DayBusy> => {
  await purgeExpiredHolds(env);

  let busy = busyWindow;
  if (!busy) {
    busy = isGcalConfigured(env)
      ? await queryFreeBusy(
          env,
          zonedTimeToUtc(dateStr, "00:00", BUSINESS_TIMEZONE).toISOString(),
          zonedTimeToUtc(addDays(dateStr, 1), "00:00", BUSINESS_TIMEZONE).toISOString(),
        )
      : [];
  }

  const confirmedRows = await env.DB!.prepare(
    "SELECT date, start_time, duration_min FROM bookings WHERE date = ? AND status IN ('confirmed', 'rescheduled')",
  )
    .bind(dateStr)
    .all<{ date: string; start_time: string; duration_min: number }>();

  const confirmed = (confirmedRows.results ?? []).map((row) => {
    const { startUtc, endUtc } = slotWindowUtc(row.date, row.start_time, row.duration_min);
    return { startUtc, endUtc };
  });

  const holdRows = await env.DB!.prepare(
    "SELECT start_time FROM slot_holds WHERE date = ?",
  )
    .bind(dateStr)
    .all<{ start_time: string }>();

  return { busy, confirmed, heldTimes: new Set((holdRows.results ?? []).map((r) => r.start_time)) };
};

const slotFitsWorkday = (dateStr: string, time: string, durationMin: number): boolean => {
  const startMin = Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
  const endMin = startMin + durationMin;
  const workEndMin = Number(WORK_END_TIME.slice(0, 2)) * 60 + Number(WORK_END_TIME.slice(3));
  return endMin <= workEndMin;
};

const isSlotFree = (
  dateStr: string,
  time: string,
  durationMin: number,
  busy: DayBusy,
  ignoreHoldTime?: string,
): boolean => {
  if (busy.heldTimes.has(time) && time !== ignoreHoldTime) return false;
  const { startUtc, endUtc } = slotWindowUtc(dateStr, time, durationMin);

  if (startUtc.getTime() < Date.now() + MIN_LEAD_HOURS * 3600 * 1000) return false;

  for (const interval of busy.busy) {
    if (overlaps(startUtc, endUtc, new Date(interval.start), new Date(interval.end))) return false;
  }
  for (const booking of busy.confirmed) {
    if (overlaps(startUtc, endUtc, booking.startUtc, booking.endUtc)) return false;
  }
  return true;
};

const validateSlotInputs = (
  serviceId: string,
  dateStr: string,
  time: string,
): { ok: true; service: NonNullable<ReturnType<typeof getBookingService>> } | { ok: false; message: string } => {
  const service = getBookingService(serviceId);
  if (!service || service.priceCents === null || service.durationMin <= 0) {
    return { ok: false, message: "Unknown or non-bookable service." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return { ok: false, message: "Invalid date." };
  if (!ALL_SLOT_TIMES.includes(time)) return { ok: false, message: "Invalid time slot." };
  if (!isBusinessDay(dateStr)) return { ok: false, message: "Weekends are unavailable." };

  const today = todayInZone(BUSINESS_TIMEZONE);
  if (dateStr < today) return { ok: false, message: "That date is in the past." };
  if (dateStr > addDays(today, BOOKING_WINDOW_DAYS)) {
    return { ok: false, message: "That date is too far ahead." };
  }
  if (!slotFitsWorkday(dateStr, time, service.durationMin)) {
    return { ok: false, message: "That slot would run past the working day." };
  }
  return { ok: true, service };
};

const handleAvailability = async (env: Env, url: URL): Promise<Response> => {
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const serviceId = url.searchParams.get("serviceId") ?? "";
  const service = getBookingService(serviceId);
  if (!service || service.priceCents === null) {
    return json({ success: false, message: "Unknown or non-bookable service." }, 400);
  }

  const dateParam = url.searchParams.get("date");
  const monthParam = url.searchParams.get("month");

  try {
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      const busy = await getDayBusy(env, dateParam);
      const bookableDay =
        isBusinessDay(dateParam) &&
        dateParam >= todayInZone(BUSINESS_TIMEZONE) &&
        dateParam <= addDays(todayInZone(BUSINESS_TIMEZONE), BOOKING_WINDOW_DAYS);

      const groups = SLOT_GROUP_NAMES.map((name) => ({
        name,
        slots: SLOT_GROUPS[name].map((time) => ({
          time,
          available:
            bookableDay &&
            slotFitsWorkday(dateParam, time, service.durationMin) &&
            isSlotFree(dateParam, time, service.durationMin, busy),
        })),
      }));

      return json({ success: true, date: dateParam, timezone: BUSINESS_TIMEZONE, groups });
    }

    if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
      const firstOfMonth = `${monthParam}-01`;
      const firstOfNext = `${addDays(firstOfMonth, 40).slice(0, 7)}-01`;
      const today = todayInZone(BUSINESS_TIMEZONE);
      const windowEnd = addDays(today, BOOKING_WINDOW_DAYS);

      const busyWindow = isGcalConfigured(env)
        ? await queryFreeBusy(
            env,
            zonedTimeToUtc(firstOfMonth, "00:00", BUSINESS_TIMEZONE).toISOString(),
            zonedTimeToUtc(firstOfNext, "00:00", BUSINESS_TIMEZONE).toISOString(),
          )
        : [];

      const days: Record<string, boolean> = {};
      const daysInMonth = Number(
        addDays(firstOfNext, -1).slice(8, 10),
      );

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${monthParam}-${String(day).padStart(2, "0")}`;
        if (!isBusinessDay(dateStr) || dateStr < today || dateStr > windowEnd) {
          days[dateStr] = false;
          continue;
        }
        const busy = await getDayBusy(env, dateStr, busyWindow);
        days[dateStr] = ALL_SLOT_TIMES.some(
          (time) =>
            slotFitsWorkday(dateStr, time, service.durationMin) &&
            isSlotFree(dateStr, time, service.durationMin, busy),
        );
      }

      return json({ success: true, month: monthParam, timezone: BUSINESS_TIMEZONE, days });
    }

    return json({ success: false, message: "Provide ?date=YYYY-MM-DD or ?month=YYYY-MM." }, 400);
  } catch (error) {
    console.error("[booking] availability failed", { error: String(error) });
    return json({ success: false, message: "Calendar is unavailable right now. Please try again." }, 502);
  }
};

// ---------- hold + payment ----------

const handleHold = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const serviceId = String(body.value.serviceId ?? "");
  const dateStr = String(body.value.date ?? "");
  const time = String(body.value.time ?? "");
  const timezone = String(body.value.timezone ?? "").slice(0, 64) || "Europe/Paris";

  const validation = validateSlotInputs(serviceId, dateStr, time);
  if (!validation.ok) return json({ success: false, message: validation.message }, 400);

  try {
    const busy = await getDayBusy(env, dateStr);
    if (!isSlotFree(dateStr, time, validation.service.durationMin, busy)) {
      return json({ success: false, code: "slot-taken", message: "That slot was just taken. Please pick another." }, 409);
    }

    const bookingId = newId();
    const { startUtc } = slotWindowUtc(dateStr, time, validation.service.durationMin);
    const cutoffAt = new Date(startUtc.getTime() - CANCEL_CUTOFF_HOURS * 3600 * 1000).toISOString();
    const expiresAt = addSecondsIso(nowIso(), HOLD_TTL_SECONDS);

    await env.DB.prepare(
      `INSERT INTO bookings (id, service_id, status, date, start_time, duration_min, timezone,
        customer_name, customer_email, amount_cents, manage_secret, cutoff_at)
       VALUES (?, ?, 'held', ?, ?, ?, ?, '', '', ?, ?, ?)`,
    )
      .bind(
        bookingId,
        serviceId,
        dateStr,
        time,
        validation.service.durationMin,
        timezone,
        validation.service.priceCents,
        randomToken(16),
        cutoffAt,
      )
      .run();

    try {
      await env.DB.prepare(
        "INSERT INTO slot_holds (booking_id, date, start_time, expires_at) VALUES (?, ?, ?, ?)",
      )
        .bind(bookingId, dateStr, time, expiresAt)
        .run();
    } catch {
      // UNIQUE(date, start_time) violation — someone else grabbed it first.
      await env.DB.prepare("DELETE FROM bookings WHERE id = ?").bind(bookingId).run();
      return json({ success: false, code: "slot-taken", message: "That slot was just taken. Please pick another." }, 409);
    }

    return json({ success: true, holdId: bookingId, expiresAt });
  } catch (error) {
    console.error("[booking] hold failed", { error: String(error) });
    return json({ success: false, message: GENERIC_ERROR }, 502);
  }
};

const handlePaymentIntent = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const holdId = String(body.value.holdId ?? "");
  const name = String(body.value.name ?? "").trim().slice(0, 120);
  const email = String(body.value.email ?? "").trim().toLowerCase();
  const company = String(body.value.company ?? "").trim().slice(0, 120);
  const projectDetails = String(body.value.projectDetails ?? "").trim().slice(0, 4000);
  const prepNotes = String(body.value.prepNotes ?? "").trim().slice(0, 4000);

  if (!name) return json({ success: false, message: "Please enter your name." }, 400);
  if (!email || !EMAIL_PATTERN.test(email)) {
    return json({ success: false, message: "Please enter a valid email address." }, 400);
  }

  const booking = await env.DB.prepare(
    "SELECT * FROM bookings WHERE id = ? AND status = 'held'",
  )
    .bind(holdId)
    .first<BookingRow>();

  if (!booking) {
    return json({ success: false, code: "hold-expired", message: "Your booking session expired. Please pick a slot again." }, 409);
  }

  const hold = await env.DB.prepare(
    "SELECT expires_at FROM slot_holds WHERE booking_id = ?",
  )
    .bind(holdId)
    .first<{ expires_at: string }>();

  if (!hold || hold.expires_at < nowIso()) {
    return json({ success: false, code: "hold-expired", message: "Your slot hold expired. Please pick a slot again." }, 409);
  }

  const service = getBookingService(booking.service_id);
  if (!service || service.priceCents === null) {
    return json({ success: false, message: GENERIC_ERROR }, 500);
  }

  await env.DB.prepare(
    `UPDATE bookings SET customer_name = ?, customer_email = ?, company = ?, project_details = ?, prep_notes = ?, updated_at = ?
     WHERE id = ?`,
  )
    .bind(name, email, company || null, projectDetails || null, prepNotes || null, nowIso(), holdId)
    .run();

  const paymentIntent = await createPaymentIntent(env, {
    amountCents: service.priceCents,
    metadata: { kind: "booking", bookingId: holdId },
    receiptEmail: email,
    description: `${service.title} — ${booking.date} ${booking.start_time} (${BUSINESS_TIMEZONE})`,
  });

  if (!paymentIntent.ok) {
    return json({ success: false, message: GENERIC_ERROR }, 502);
  }

  await env.DB.prepare("UPDATE bookings SET stripe_payment_intent = ? WHERE id = ?")
    .bind(paymentIntent.id!, holdId)
    .run();

  return json({
    success: true,
    clientSecret: paymentIntent.clientSecret,
    amountCents: service.priceCents,
  });
};

// ---------- manage / reschedule / cancel ----------

const verifyManageToken = async (
  env: Env,
  bookingId: string,
  token: string,
): Promise<BookingRow | null> => {
  const payload = await verifyToken<{ bid: string; s: string }>(token, tokenSecret(env));
  if (!payload || payload.bid !== bookingId || !env.DB) return null;

  const booking = await env.DB.prepare("SELECT * FROM bookings WHERE id = ?")
    .bind(bookingId)
    .first<BookingRow>();

  if (!booking || booking.manage_secret !== payload.s) return null;
  return booking;
};

export const buildManageUrl = async (env: Env, booking: BookingRow): Promise<string> => {
  const token = await signToken(
    { bid: booking.id, s: booking.manage_secret },
    tokenSecret(env),
    MANAGE_TOKEN_TTL_SECONDS,
  );
  return `${ORIGIN}/booking/manage/?id=${encodeURIComponent(booking.id)}&t=${encodeURIComponent(token)}`;
};

const formatSlotForEmail = (booking: BookingRow): string => {
  const { startUtc, endUtc } = slotWindowUtc(booking.date, booking.start_time, booking.duration_min);
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: booking.timezone || BUSINESS_TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const endFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: booking.timezone || BUSINESS_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  return `${fmt.format(startUtc)} – ${endFmt.format(endUtc)} (${booking.timezone || BUSINESS_TIMEZONE})`;
};

const sendBookingEmail = async (
  env: Env,
  booking: BookingRow,
  options: { rescheduled?: boolean } = {},
): Promise<void> => {
  const service = getBookingService(booking.service_id);
  const manageUrl = await buildManageUrl(env, booking);
  const { startUtc, endUtc } = slotWindowUtc(booking.date, booking.start_time, booking.duration_min);

  const ics = buildIcs({
    uid: `booking-${booking.id}@fullstackchris.dev`,
    title: `${service?.title ?? "Booking"} — Full Stack Chris`,
    description: `Booking with Christophe Crognier.${booking.meet_url ? `\\nMeet: ${booking.meet_url}` : ""}\\nManage: ${manageUrl}`,
    location: booking.meet_url || "Online",
    startUtc,
    endUtc,
    organizerEmail: env.ADMIN_EMAIL || "hello@fullstackchris.dev",
    organizerName: "Christophe Crognier",
    attendeeEmail: booking.customer_email,
    attendeeName: booking.customer_name,
  });

  const when = formatSlotForEmail(booking);

  await sendEmail(env, {
    to: booking.customer_email,
    subject: `${options.rescheduled ? "Rescheduled: " : "Confirmed: "}${service?.title ?? "Booking"} — ${booking.date}`,
    html: emailShell(
      options.rescheduled ? "Your booking was rescheduled" : "Your booking is confirmed",
      `<p><strong>${service?.title ?? ""}</strong></p>
       <p>${when}</p>
       ${booking.meet_url ? `<p>Video call: <a href="${booking.meet_url}" style="color:#a78bfa;">${booking.meet_url}</a></p>` : ""}
       <p>${emailButton(manageUrl, "Manage booking")}</p>
       <p style="color:#8f8f9d;font-size:13px;">You can reschedule or cancel up to ${CANCEL_CUTOFF_HOURS}h before the start time. An .ics calendar file is attached.</p>`,
    ),
    attachments: [{ filename: "booking.ics", contentBase64: utf8ToBase64(ics) }],
  });
};

const publicBookingView = (booking: BookingRow) => {
  const service = getBookingService(booking.service_id);
  return {
    id: booking.id,
    service: service
      ? { id: service.id, title: service.title, durationLabel: service.durationLabel }
      : { id: booking.service_id, title: booking.service_id, durationLabel: "" },
    status: booking.status,
    date: booking.date,
    startTime: booking.start_time,
    timezone: booking.timezone,
    meetUrl: booking.meet_url,
    customerName: booking.customer_name,
    customerEmail: booking.customer_email,
    amount: formatBookingPrice(booking.amount_cents),
    canModify: nowIso() < booking.cutoff_at && ["confirmed", "rescheduled"].includes(booking.status),
    cutoffAt: booking.cutoff_at,
  };
};

const handleManage = async (env: Env, url: URL): Promise<Response> => {
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const id = url.searchParams.get("id") ?? "";
  const token = url.searchParams.get("t") ?? "";
  const booking = await verifyManageToken(env, id, token);
  if (!booking) {
    return json({ success: false, message: "This manage link is invalid or has expired." }, 403);
  }

  return json({ success: true, booking: publicBookingView(booking) });
};

const handleReschedule = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const bookingId = String(body.value.id ?? "");
  const token = String(body.value.token ?? "");
  const newDate = String(body.value.date ?? "");
  const newTime = String(body.value.time ?? "");

  const booking = await verifyManageToken(env, bookingId, token);
  if (!booking) return json({ success: false, message: "This manage link is invalid." }, 403);

  if (!["confirmed", "rescheduled"].includes(booking.status)) {
    return json({ success: false, message: "This booking can no longer be changed." }, 400);
  }
  if (nowIso() >= booking.cutoff_at) {
    return json(
      { success: false, code: "cutoff", message: `Changes close ${CANCEL_CUTOFF_HOURS}h before the start time.` },
      400,
    );
  }

  const validation = validateSlotInputs(booking.service_id, newDate, newTime);
  if (!validation.ok) return json({ success: false, message: validation.message }, 400);

  try {
    const busy = await getDayBusy(env, newDate);
    if (!isSlotFree(newDate, newTime, booking.duration_min, busy)) {
      return json({ success: false, code: "slot-taken", message: "That slot was just taken. Please pick another." }, 409);
    }

    const { startUtc, endUtc } = slotWindowUtc(newDate, newTime, booking.duration_min);
    const newCutoff = new Date(startUtc.getTime() - CANCEL_CUTOFF_HOURS * 3600 * 1000).toISOString();

    if (booking.gcal_event_id && isGcalConfigured(env)) {
      const service = getBookingService(booking.service_id);
      await patchCalendarEvent(env, booking.gcal_event_id, {
        summary: `${service?.title ?? "Booking"} — ${booking.customer_name}`,
        description: `Booking ${booking.id}`,
        startUtc,
        endUtc,
      });
    }

    await env.DB.prepare(
      "UPDATE bookings SET date = ?, start_time = ?, status = 'rescheduled', cutoff_at = ?, updated_at = ? WHERE id = ?",
    )
      .bind(newDate, newTime, newCutoff, nowIso(), bookingId)
      .run();

    const updated = { ...booking, date: newDate, start_time: newTime, cutoff_at: newCutoff, status: "rescheduled" };
    await sendBookingEmail(env, updated, { rescheduled: true }).catch((error) =>
      console.error("[booking] reschedule email failed", { error: String(error) }),
    );

    return json({ success: true, booking: publicBookingView(updated) });
  } catch (error) {
    console.error("[booking] reschedule failed", { error: String(error) });
    return json({ success: false, message: GENERIC_ERROR }, 502);
  }
};

const handleCancel = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const bookingId = String(body.value.id ?? "");
  const token = String(body.value.token ?? "");

  const booking = await verifyManageToken(env, bookingId, token);
  if (!booking) return json({ success: false, message: "This manage link is invalid." }, 403);

  if (!["confirmed", "rescheduled"].includes(booking.status)) {
    return json({ success: false, message: "This booking can no longer be cancelled." }, 400);
  }
  if (nowIso() >= booking.cutoff_at) {
    return json(
      { success: false, code: "cutoff", message: `Cancellations close ${CANCEL_CUTOFF_HOURS}h before the start time.` },
      400,
    );
  }

  try {
    if (booking.gcal_event_id && isGcalConfigured(env)) {
      await deleteCalendarEvent(env, booking.gcal_event_id);
    }

    await env.DB.prepare("UPDATE bookings SET status = 'cancelled', updated_at = ? WHERE id = ?")
      .bind(nowIso(), bookingId)
      .run();

    const service = getBookingService(booking.service_id);
    await sendEmail(env, {
      to: booking.customer_email,
      subject: `Cancelled: ${service?.title ?? "Booking"} — ${booking.date}`,
      html: emailShell(
        "Your booking was cancelled",
        `<p>Your booking for <strong>${service?.title ?? ""}</strong> on ${booking.date} at ${booking.start_time} (${BUSINESS_TIMEZONE}) has been cancelled.</p>
         <p style="color:#8f8f9d;font-size:13px;">If you already paid, your refund is processed manually — you'll hear from us within 48h.</p>`,
      ),
    }).catch((error) => console.error("[booking] cancel email failed", { error: String(error) }));

    if (env.ADMIN_EMAIL) {
      await sendEmail(env, {
        to: env.ADMIN_EMAIL,
        subject: `[booking] Cancelled: ${booking.customer_name} — ${booking.date} ${booking.start_time}`,
        html: emailShell(
          "Booking cancelled",
          `<p><strong>${booking.customer_name}</strong> (${booking.customer_email}) cancelled <strong>${service?.title ?? booking.service_id}</strong> on ${booking.date} at ${booking.start_time}.</p>
           <p>Amount paid: ${formatBookingPrice(booking.amount_cents)} — refund manually in Stripe if required. PaymentIntent: ${booking.stripe_payment_intent ?? "n/a"}</p>`,
        ),
      }).catch((error) => console.error("[booking] admin cancel email failed", { error: String(error) }));
    }

    return json({ success: true });
  } catch (error) {
    console.error("[booking] cancel failed", { error: String(error) });
    return json({ success: false, message: GENERIC_ERROR }, 502);
  }
};

// ---------- custom quote ----------

const handleCustomQuote = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const name = String(body.value.name ?? "").trim().slice(0, 120);
  const email = String(body.value.email ?? "").trim().toLowerCase();
  const company = String(body.value.company ?? "").trim().slice(0, 120);
  const message = String(body.value.message ?? "").trim().slice(0, 4000);
  const honeypot = String(body.value.honeypot ?? body.value.website ?? "");

  if (honeypot) return json({ success: true }); // silent bot drop
  if (!name) return json({ success: false, message: "Please enter your name." }, 400);
  if (!email || !EMAIL_PATTERN.test(email)) {
    return json({ success: false, message: "Please enter a valid email address." }, 400);
  }
  if (message.length < 20) {
    return json({ success: false, message: "Please describe your project in a few sentences." }, 400);
  }

  await env.DB.prepare(
    "INSERT INTO custom_quotes (id, name, email, company, message) VALUES (?, ?, ?, ?, ?)",
  )
    .bind(newId(), name, email, company || null, message)
    .run();

  if (env.ADMIN_EMAIL) {
    await sendEmail(env, {
      to: env.ADMIN_EMAIL,
      subject: `[custom quote] ${name} — ${company || "no company"}`,
      html: emailShell(
        "New custom quote request",
        `<p><strong>${name}</strong> (${email})${company ? ` — ${company}` : ""}</p>
         <p style="white-space:pre-wrap;">${message.replace(/</g, "&lt;")}</p>`,
      ),
    }).catch((error) => console.error("[booking] quote email failed", { error: String(error) }));
  }

  return json({ success: true, message: "Thanks — I'll reply within 1–2 business days." });
};

// ---------- dispatcher ----------

export const handleBookingRequest = async (
  request: Request,
  env: Env,
  url: URL,
): Promise<Response> => {
  switch (url.pathname) {
    case "/api/booking/availability":
      return handleAvailability(env, url);
    case "/api/booking/hold":
      return handleHold(request, env);
    case "/api/booking/payment-intent":
      return handlePaymentIntent(request, env);
    case "/api/booking/manage":
      return handleManage(env, url);
    case "/api/booking/reschedule":
      return handleReschedule(request, env);
    case "/api/booking/cancel":
      return handleCancel(request, env);
    case "/api/booking/custom-quote":
      return handleCustomQuote(request, env);
    default:
      return json({ success: false, message: "Not found." }, 404);
  }
};

// ---------- webhook fulfillment (called from stripeWebhook.ts) ----------

export const confirmBooking = async (
  env: Env,
  paymentIntent: Record<string, unknown>,
): Promise<void> => {
  if (!env.DB) return;
  const bookingId = String(
    paymentIntent.metadata ? (paymentIntent.metadata as Record<string, unknown>).bookingId : "",
  );
  if (!bookingId) {
    console.error("[booking] payment_intent without bookingId", { id: paymentIntent.id });
    return;
  }

  const booking = await env.DB.prepare("SELECT * FROM bookings WHERE id = ?")
    .bind(bookingId)
    .first<BookingRow>();

  if (!booking) {
    console.error("[booking] unknown booking for payment_intent", { bookingId });
    return;
  }
  if (booking.status !== "held") return; // idempotent

  // First-to-pay wins: if the slot was confirmed elsewhere in the meantime,
  // cancel this one and flag for manual refund.
  const conflict = await env.DB.prepare(
    "SELECT id FROM bookings WHERE date = ? AND start_time = ? AND status IN ('confirmed', 'rescheduled') AND id != ?",
  )
    .bind(booking.date, booking.start_time, booking.id)
    .first();

  if (conflict) {
    await env.DB.prepare("UPDATE bookings SET status = 'cancelled', updated_at = ? WHERE id = ?")
      .bind(nowIso(), booking.id)
      .run();
    if (env.ADMIN_EMAIL) {
      await sendEmail(env, {
        to: env.ADMIN_EMAIL,
        subject: `[booking] CONFLICT — manual refund needed (${booking.date} ${booking.start_time})`,
        html: emailShell(
          "Double-booking detected",
          `<p>Booking ${booking.id} (${booking.customer_email}) paid for a slot that was already confirmed.</p>
           <p>PaymentIntent: ${booking.stripe_payment_intent ?? ""} — please refund manually in Stripe.</p>`,
        ),
      }).catch(() => undefined);
    }
    return;
  }

  let gcalEventId: string | null = null;
  let meetUrl: string | null = null;

  if (isGcalConfigured(env)) {
    try {
      const service = getBookingService(booking.service_id);
      const { startUtc, endUtc } = slotWindowUtc(booking.date, booking.start_time, booking.duration_min);
      const event = await createCalendarEvent(env, {
        summary: `${service?.title ?? "Booking"} — ${booking.customer_name}`,
        description: `Booking ${booking.id}\nClient: ${booking.customer_name} <${booking.customer_email}>\n${booking.project_details ?? ""}`,
        startUtc,
        endUtc,
        attendeeEmail: booking.customer_email,
        attendeeName: booking.customer_name,
      });
      gcalEventId = event.eventId;
      meetUrl = event.meetUrl || null;
    } catch (error) {
      console.error("[booking] gcal event create failed", { bookingId, error: String(error) });
      // Continue — booking is confirmed even if the calendar event failed; admin email below flags it.
    }
  }

  await env.DB.prepare(
    "UPDATE bookings SET status = 'confirmed', gcal_event_id = ?, meet_url = ?, updated_at = ? WHERE id = ?",
  )
    .bind(gcalEventId, meetUrl, nowIso(), booking.id)
    .run();
  await env.DB.prepare("DELETE FROM slot_holds WHERE booking_id = ?").bind(booking.id).run();

  const confirmed = { ...booking, status: "confirmed", gcal_event_id: gcalEventId, meet_url: meetUrl };
  await sendBookingEmail(env, confirmed).catch((error) =>
    console.error("[booking] confirmation email failed", { bookingId, error: String(error) }),
  );

  if (!gcalEventId && env.ADMIN_EMAIL) {
    await sendEmail(env, {
      to: env.ADMIN_EMAIL,
      subject: `[booking] Calendar event NOT created — ${booking.date} ${booking.start_time}`,
      html: emailShell(
        "Calendar event missing",
        `<p>Booking ${booking.id} (${booking.customer_email}) is confirmed and paid, but the Google Calendar event could not be created. Create it manually.</p>`,
      ),
    }).catch(() => undefined);
  }
};

export const failBooking = async (
  env: Env,
  paymentIntent: Record<string, unknown>,
): Promise<void> => {
  if (!env.DB) return;
  const bookingId = String(
    paymentIntent.metadata ? (paymentIntent.metadata as Record<string, unknown>).bookingId : "",
  );
  if (!bookingId) return;

  await env.DB.prepare("UPDATE bookings SET status = 'cancelled', updated_at = ? WHERE id = ? AND status = 'held'")
    .bind(nowIso(), bookingId)
    .run();
  await env.DB.prepare("DELETE FROM slot_holds WHERE booking_id = ?").bind(bookingId).run();
};
