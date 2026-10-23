import assert from "node:assert/strict";
import { test } from "node:test";
import {
  addDays,
  formatIcsUtc,
  isBusinessDay,
  slotWindowUtc,
  todayInZone,
  zonedTimeToUtc,
} from "../src/server/lib/tz.ts";

test("Europe/Paris offset: winter is UTC+1, summer is UTC+2", () => {
  // 2026-01-15 09:00 Paris = 08:00 UTC (CET)
  assert.equal(zonedTimeToUtc("2026-01-15", "09:00", "Europe/Paris").toISOString(), "2026-01-15T08:00:00.000Z");
  // 2026-07-15 09:00 Paris = 07:00 UTC (CEST)
  assert.equal(zonedTimeToUtc("2026-07-15", "09:00", "Europe/Paris").toISOString(), "2026-07-15T07:00:00.000Z");
});

test("DST transition days resolve correctly", () => {
  // 2026-03-29: clocks jump forward (CET → CEST)
  assert.equal(zonedTimeToUtc("2026-03-29", "09:00", "Europe/Paris").toISOString(), "2026-03-29T07:00:00.000Z");
  // 2026-10-25: clocks fall back (CEST → CET)
  assert.equal(zonedTimeToUtc("2026-10-25", "09:00", "Europe/Paris").toISOString(), "2026-10-25T08:00:00.000Z");
});

test("slotWindowUtc adds duration", () => {
  const { startUtc, endUtc } = slotWindowUtc("2026-07-15", "09:00", 60);
  assert.equal(startUtc.toISOString(), "2026-07-15T07:00:00.000Z");
  assert.equal(endUtc.toISOString(), "2026-07-15T08:00:00.000Z");
});

test("isBusinessDay excludes weekends", () => {
  assert.equal(isBusinessDay("2026-08-17"), true);  // Monday
  assert.equal(isBusinessDay("2026-08-21"), true);  // Friday
  assert.equal(isBusinessDay("2026-08-22"), false); // Saturday
  assert.equal(isBusinessDay("2026-08-23"), false); // Sunday
});

test("addDays handles month boundaries", () => {
  assert.equal(addDays("2026-01-31", 1), "2026-02-01");
  assert.equal(addDays("2026-03-01", -1), "2026-02-28");
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
});

test("formatIcsUtc produces RFC 5545 UTC format", () => {
  assert.equal(formatIcsUtc(new Date("2026-09-01T07:00:00.000Z")), "20260901T070000Z");
});

test("todayInZone returns a YYYY-MM-DD string", () => {
  assert.match(todayInZone("Europe/Paris"), /^\d{4}-\d{2}-\d{2}$/);
});
