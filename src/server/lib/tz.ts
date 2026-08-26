// Booking timezone logic. Slots are defined in Europe/Paris (the business
// timezone), converted to UTC instants server-side, and rendered in the
// visitor's timezone client-side with Intl.

export const BUSINESS_TIMEZONE = "Europe/Paris";

/** Daily start times (Europe/Paris wall clock), grouped as in the handoff. */
export const SLOT_GROUPS = {
  morning: ["09:00", "09:30", "10:00", "10:30", "11:00"],
  afternoon: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
  evening: ["16:30", "17:00", "17:30"],
} as const;

export const ALL_SLOT_TIMES: string[] = [
  ...SLOT_GROUPS.morning,
  ...SLOT_GROUPS.afternoon,
  ...SLOT_GROUPS.evening,
];

export const SLOT_GROUP_NAMES = Object.keys(SLOT_GROUPS) as (keyof typeof SLOT_GROUPS)[];

export const slotGroupFor = (time: string): string => {
  for (const name of SLOT_GROUP_NAMES) {
    if ((SLOT_GROUPS[name] as readonly string[]).includes(time)) return name;
  }
  return "morning";
};

/** YYYY-MM-DD (any timezone context) → Monday–Friday check. */
export const isBusinessDay = (dateStr: string): boolean => {
  const dow = new Date(`${dateStr}T12:00:00Z`).getUTCDay();
  return dow >= 1 && dow <= 5;
};

const dtfCache = new Map<string, Intl.DateTimeFormat>();

const getDtf = (timeZone: string): Intl.DateTimeFormat => {
  let dtf = dtfCache.get(timeZone);
  if (!dtf) {
    dtf = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    dtfCache.set(timeZone, dtf);
  }
  return dtf;
};

/** Offset (ms) between UTC and `timeZone` wall clock at the given UTC instant. */
export const tzOffsetMs = (utcDate: Date, timeZone: string): number => {
  const parts = getDtf(timeZone).formatToParts(utcDate);
  const map: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = Number(part.value);
  }
  const asUtc = Date.UTC(
    map.year,
    (map.month ?? 1) - 1,
    map.day ?? 1,
    (map.hour ?? 0) % 24,
    map.minute ?? 0,
    map.second ?? 0,
  );
  return asUtc - utcDate.getTime();
};

/**
 * Converts a wall-clock time in `timeZone` ("2026-09-01", "09:00") to the
 * correct UTC Date, including across DST transitions.
 */
export const zonedTimeToUtc = (dateStr: string, timeStr: string, timeZone: string): Date => {
  const guess = new Date(`${dateStr}T${timeStr}:00Z`);
  const off1 = tzOffsetMs(guess, timeZone);
  const utc = new Date(guess.getTime() - off1);
  const off2 = tzOffsetMs(utc, timeZone);
  if (off2 !== off1) return new Date(guess.getTime() - off2);
  return utc;
};

/** Current date (YYYY-MM-DD) in a timezone. */
export const todayInZone = (timeZone: string): string => {
  const parts = getDtf(timeZone).formatToParts(new Date());
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  return `${map.year}-${map.month}-${map.day}`;
};

/** Date arithmetic on YYYY-MM-DD strings. */
export const addDays = (dateStr: string, days: number): string => {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

/** "2026-09-01", "09:00" + duration → [startUtc, endUtc] */
export const slotWindowUtc = (
  dateStr: string,
  timeStr: string,
  durationMin: number,
  timeZone: string = BUSINESS_TIMEZONE,
): { startUtc: Date; endUtc: Date } => {
  const startUtc = zonedTimeToUtc(dateStr, timeStr, timeZone);
  return { startUtc, endUtc: new Date(startUtc.getTime() + durationMin * 60000) };
};

/** 20260901T070000Z (UTC) — used by the .ics generator. */
export const formatIcsUtc = (date: Date): string =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
