# Booking & Scheduling — Implementation Handoff (Claude Code)

Static HTML prototype on the existing design system (`styles.css`/`motion.css`/`service.css`) plus `booking/booking.css` + `booking/booking.js`. Payment step visually reuses `shop/shop.css` components (`cc-field`, `card-brands`, `secure-note`). Availability, cart-equivalent state and payment are all mocked client-side — replace with real Google Calendar sync + Stripe in the build.

## Files
- `booking/booking.css` — steps, service cards, calendar, slots, summary, confirmation, manage states
- `booking/booking.js` — SERVICES data, timezone detect, calendar render/nav, mock slot fetch, state in `localStorage` (`fsc_booking`), summary sync across pages. Exposes `window.booking`.
- `booking/index.html` — service selection + inline custom-quote form (no calendar for custom services)
- `booking/schedule.html` — calendar (step 2) + time slots (step 3) + live summary, combined as one screen since slot selection depends on the chosen day
- `booking/details.html` — contact + project details form (step 4)
- `booking/checkout.html` — payment (step 5), Stripe Elements mock
- `booking/confirmation.html` — success state, meeting details, add-to-calendar, next steps
- `booking/manage.html` — view / reschedule / cancel an existing booking (optional view, built out)

## Flow & state
Linear 5-step flow: **Service → Schedule → Details → Payment → Confirmed**, mirrored by `.booking-steps` on every page. State persists to `localStorage['fsc_booking']` as `{ serviceId, date, slot, tz }` so summary panels stay in sync without a backend — replace with real session/order state (server-side booking hold once a slot is selected, to prevent double-booking during checkout).

## Reusable components
- **ServiceCard** (`.svc-select`): duration badge, title, description, price/from-price, Select CTA. `.featured` variant for the flagship workshop.
- **Stepper** (`.booking-steps`/`.bk-step`): done/active/default states, collapses to numbers only on mobile.
- **Calendar** (`.cal-card`): month grid generated client-side in `booking.js` (`renderCalendar`) — swap `isUnavailable()` for a real Google Calendar free/busy query. States: `.avail`, `.unavail` (past + busy), `.selected`, `.today` (dot indicator). Legend included for accessibility/clarity.
- **TimeSlotGrid** (`.slot-groups`/`.slot-btn`): grouped morning/afternoon/evening, staggered fade-in (`slotIn` keyframe, 40ms stagger) on day change, disabled/unavailable state struck through. Swap the 550ms mock delay in `renderSlots()` for a real API call + the existing `.skeleton` loading state (already wired).
- **BookingSummary** (`.summary-card`): sticky sidebar reused across schedule/details/checkout; service, date, time, timezone, total. `updateSummary()` in booking.js keeps all instances in sync — port to a shared context/store.
- **TimezoneBar** (`.tz-bar`): auto-detects via `Intl.DateTimeFormat().resolvedOptions().timeZone`; manual override select is present but not yet wired to re-render slots in the new zone — implement real conversion server-side or with a library (date-fns-tz / Luxon).
- **PaymentForm**: literally reuses shop's checkout classes for visual consistency — mount real Stripe Elements into the same `.cc-field` wrapper.
- **ConfirmationMeeting** (`.meeting-card`): service/date/time recap + add-to-calendar actions (Google/Outlook links + .ics download) — wire to real calendar invite generation.
- **ManageBooking** (`.manage-card`): status badge, cutoff notice, reschedule (routes back into the schedule step) and cancel (inline confirm → cancelled state). Cutoff logic (24h) is copy-only here — enforce it server-side and disable the reschedule/cancel actions past the cutoff.

## Data model (suggested)
```
Service { id, title, durationLabel, priceFrom: number|null, description, category }
Booking { id, serviceId, date, startTime, timezone, customer: {name,email,company},
  projectDetails, prepNotes, meetingPlatform, meetingUrl, status: 'confirmed'|'cancelled'|'rescheduled',
  amountPaid, cutoffAt, createdAt }
AvailabilitySlot { date, time, available: boolean } // sourced from Google Calendar free/busy + a working-hours rule set
```

## Motion notes (lightweight, safe for React re-renders)
- **Card hover**: existing `.card-hover` lift (styles.css) — no change needed.
- **Calendar day select**: `.cal-day.selected` gets `transform: scale(1.04)` + `box-shadow: var(--glow)`, transition `.15s`. Trigger by toggling the class; no JS animation needed.
- **Slot reveal**: `.slot-btn` fades/slides in with a per-index stagger (`animation-delay`) whenever a new day's slots render — replicate with `framer-motion`'s `staggerChildren` or plain CSS as done here.
- **Step transitions**: pages are separate routes here (simplest for a static prototype); in the real app prefer client-side step transitions within one route — animate with a slide/fade (`.2s`) between step panels, keeping the `.booking-steps` bar persistent.
- **Confirmation success**: `.confirm-check` pulses via `confirmPulse` (2.2s loop, shared with shop). Recommend a one-shot scale-in + 2 pulses then rest in production rather than an infinite loop.
- **Cutoff/cancel confirm**: no animation needed beyond a simple show/hide fade — add a `.2s` opacity transition if desired.
- **Reduced motion**: extend the existing `@media (prefers-reduced-motion: reduce)` block in `motion.css` to include `.slot-btn`, `.cal-day.selected`, `.confirm-check` pulses.

## States covered
- **Loading**: slot fetch shows `.skeleton` shimmer (shared with shop.css) for ~550ms before rendering.
- **Empty**: no date selected yet ("pick a date first"), and no slots available for a selected day (`.empty-state`).
- **Error**: `.error-banner` class included in booking.css for calendar-sync-failed / payment-failed states — not yet triggered in the mock; wire to real API error responses (e.g. slot became unavailable mid-checkout → redirect back to schedule with this banner).
- **Disabled CTA**: "Continue" on the schedule page stays disabled until both a date and a slot are chosen.

## Known simplifications (flagged, not hidden)
- No real Google Calendar free/busy — `isUnavailable()` is a seeded pseudo-random mock; replace entirely.
- No slot hold/lock — in production, reserve the slot server-side the moment it's selected (with a short TTL) to avoid double-booking while the user fills the form.
- Timezone override select is present but cosmetic; real implementation must recompute slot times, not just the label.
- Manage page shows one hardcoded booking; needs auth or a secure booking-token link (typically emailed) instead of being a public route.
