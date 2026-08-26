// Booking flow draft state, shared across the step pages (localStorage-backed,
// same pattern as the handoff prototype's fsc_booking).

export interface BookingDraft {
  serviceId?: string;
  date?: string;
  slot?: string;
  tz?: string;
  holdId?: string;
  holdExpiresAt?: string;
  name?: string;
  email?: string;
  company?: string;
  projectDetails?: string;
  prepNotes?: string;
  confirmedBookingId?: string;
}

const KEY = "fsc_booking";

export const getDraft = (): BookingDraft => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "") ?? {};
  } catch {
    return {};
  }
};

export const patchDraft = (patch: BookingDraft): BookingDraft => {
  const next = { ...getDraft(), ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
};

export const clearSchedule = (): BookingDraft =>
  patchDraft({ date: undefined, slot: undefined, holdId: undefined, holdExpiresAt: undefined });

/** True when a slot is still held for us (server TTL is 15 min; keep margin). */
export const hasLiveHold = (draft: BookingDraft): boolean => {
  if (!draft.holdId || !draft.holdExpiresAt) return false;
  return new Date(draft.holdExpiresAt).getTime() > Date.now() + 60_000;
};

export const detectTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Paris";
  } catch {
    return "Europe/Paris";
  }
};
