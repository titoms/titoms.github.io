// Minimal .ics (RFC 5545) generator for booking confirmations.

import { formatIcsUtc } from "./tz.ts";

export interface IcsEvent {
  uid: string;
  title: string;
  description: string;
  location: string;
  startUtc: Date;
  endUtc: Date;
  organizerEmail: string;
  organizerName?: string;
  attendeeEmail?: string;
  attendeeName?: string;
}

const escapeIcsText = (value: string): string =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

/** Long lines must be folded at 75 octets; we keep lines short instead. */
export const buildIcs = (event: IcsEvent): string => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//fullstackchris.dev//booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsUtc(event.startUtc)}`,
    `DTEND:${formatIcsUtc(event.endUtc)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `ORGANIZER;CN=${escapeIcsText(event.organizerName ?? "Full Stack Chris")}:mailto:${event.organizerEmail}`,
  ];

  if (event.attendeeEmail) {
    const cn = event.attendeeName ? `;CN=${escapeIcsText(event.attendeeName)}` : "";
    lines.push(`ATTENDEE${cn}:mailto:${event.attendeeEmail}`);
  }

  lines.push("STATUS:CONFIRMED", "END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
};
