// Google Calendar client for Cloudflare Workers.
// Service-account JWT (RS256 via WebCrypto) → access token → Calendar API.
// Used for free/busy availability and Meet-link event creation.

import { base64urlDecode, base64urlEncode } from "./tokens.ts";
import { BUSINESS_TIMEZONE } from "./tz.ts";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API = "https://www.googleapis.com/calendar/v3";
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

const encoder = new TextEncoder();

export interface GcalEnv {
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  /** base64 body of the service-account PEM private key (pkcs8 DER) */
  GOOGLE_PRIVATE_KEY_B64?: string;
  GOOGLE_CALENDAR_ID?: string;
}

export const isGcalConfigured = (env: GcalEnv): boolean =>
  Boolean(env.GOOGLE_SERVICE_ACCOUNT_EMAIL && env.GOOGLE_PRIVATE_KEY_B64 && env.GOOGLE_CALENDAR_ID);

let cachedToken: { token: string; expiresAt: number } | null = null;

const getAccessToken = async (env: GcalEnv): Promise<string> => {
  if (!isGcalConfigured(env)) throw new Error("google calendar not configured");

  // Isolate cache per service account (tests swap envs).
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.token;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64urlEncode(encoder.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64urlEncode(
    encoder.encode(
      JSON.stringify({
        iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        scope: CALENDAR_SCOPE,
        aud: GOOGLE_TOKEN_URL,
        iat: now,
        exp: now + 3600,
      }),
    ),
  );

  const key = await crypto.subtle.importKey(
    "pkcs8",
    base64urlDecode(env.GOOGLE_PRIVATE_KEY_B64 as string).buffer as ArrayBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(`${header}.${claims}`),
  );
  const jwt = `${header}.${claims}.${base64urlEncode(signature)}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[gcal] token exchange failed", { status: response.status, body: body.slice(0, 300) });
    throw new Error("google token exchange failed");
  }

  const body = (await response.json()) as { access_token: string; expires_in?: number };
  cachedToken = {
    token: body.access_token,
    expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
  };
  return body.access_token;
};

/** Test hook — clears the cached OAuth token. */
export const resetGcalTokenCache = (): void => {
  cachedToken = null;
};

const calendarId = (env: GcalEnv): string => encodeURIComponent(env.GOOGLE_CALENDAR_ID as string);

export interface BusyInterval {
  start: string; // ISO UTC
  end: string;
}

export const queryFreeBusy = async (
  env: GcalEnv,
  timeMinIso: string,
  timeMaxIso: string,
): Promise<BusyInterval[]> => {
  const token = await getAccessToken(env);
  const response = await fetch(`${CALENDAR_API}/freeBusy`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: timeMinIso,
      timeMax: timeMaxIso,
      timeZone: BUSINESS_TIMEZONE,
      items: [{ id: env.GOOGLE_CALENDAR_ID }],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[gcal] freeBusy failed", { status: response.status, body: body.slice(0, 300) });
    throw new Error("google freeBusy failed");
  }

  const body = (await response.json()) as {
    calendars?: Record<string, { busy?: BusyInterval[] }>;
  };
  return body.calendars?.[env.GOOGLE_CALENDAR_ID as string]?.busy ?? [];
};

export interface CalendarEventInput {
  summary: string;
  description: string;
  startUtc: Date;
  endUtc: Date;
  attendeeEmail: string;
  attendeeName?: string;
}

export interface CalendarEventResult {
  eventId: string;
  meetUrl: string;
}

export const createCalendarEvent = async (
  env: GcalEnv,
  input: CalendarEventInput,
): Promise<CalendarEventResult> => {
  const token = await getAccessToken(env);
  const response = await fetch(
    `${CALENDAR_API}/calendars/${calendarId(env)}/events?conferenceDataVersion=1&sendUpdates=none`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        start: { dateTime: input.startUtc.toISOString(), timeZone: BUSINESS_TIMEZONE },
        end: { dateTime: input.endUtc.toISOString(), timeZone: BUSINESS_TIMEZONE },
        attendees: [
          { email: input.attendeeEmail, ...(input.attendeeName ? { displayName: input.attendeeName } : {}) },
        ],
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[gcal] event create failed", { status: response.status, body: body.slice(0, 300) });
    throw new Error("google event create failed");
  }

  const body = (await response.json()) as { id: string; hangoutLink?: string };
  return { eventId: body.id, meetUrl: body.hangoutLink ?? "" };
};

export const patchCalendarEvent = async (
  env: GcalEnv,
  eventId: string,
  input: Pick<CalendarEventInput, "startUtc" | "endUtc" | "summary" | "description">,
): Promise<void> => {
  const token = await getAccessToken(env);
  const response = await fetch(
    `${CALENDAR_API}/calendars/${calendarId(env)}/events/${encodeURIComponent(eventId)}?sendUpdates=none`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: input.summary,
        description: input.description,
        start: { dateTime: input.startUtc.toISOString(), timeZone: BUSINESS_TIMEZONE },
        end: { dateTime: input.endUtc.toISOString(), timeZone: BUSINESS_TIMEZONE },
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[gcal] event patch failed", { status: response.status, body: body.slice(0, 300) });
    throw new Error("google event patch failed");
  }
};

export const deleteCalendarEvent = async (env: GcalEnv, eventId: string): Promise<void> => {
  const token = await getAccessToken(env);
  const response = await fetch(
    `${CALENDAR_API}/calendars/${calendarId(env)}/events/${encodeURIComponent(eventId)}?sendUpdates=none`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
  );

  if (!response.ok && response.status !== 404 && response.status !== 410) {
    const body = await response.text().catch(() => "");
    console.error("[gcal] event delete failed", { status: response.status, body: body.slice(0, 300) });
    throw new Error("google event delete failed");
  }
};
