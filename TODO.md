# TODO

## SHOP & BOOKING (Phase 14 — see ROADMAP.md for full checklist)

Backend + screens, all on branch `feat/shop-booking`, additive-only, Stripe test keys.
Go-live (flag flip + live keys) is a separate manual step.

### P14a — Backend foundation ✅

- [x] Add D1 / KV / R2 bindings to `wrangler.jsonc` (`DB`, `HOLDS`, `DOWNLOADS`, `run_worker_first` for `/api/*`)
- [x] Write `migrations/0001_init.sql` (customers, sessions, magic_tokens, coupons, orders, order_lines, wishlists, bookings, webhook_events, slot_holds, custom_quotes)
- [x] Additive dispatch in `src/worker.ts` (existing newsletter routes unchanged; canonical https redirect scoped to prod hosts so local dev works)
- [x] Server libs: `tokens.ts` (HMAC), `tz.ts` (Europe/Paris slots, DST-safe), `ics.ts`, `mailer.ts` (Resend), `stripe.ts` (fetch client + webhook verify), `gcal.ts` (service-account JWT, free/busy, events + Meet)
- [x] Magic-link auth: `POST /api/auth/magic-link`, `GET /api/auth/verify`, `POST /api/auth/logout`, `GET /api/auth/me` (HttpOnly session cookie)
- [x] Tests: `tests/auth.test.mjs`, `tests/tokens.test.mjs`, `tests/tz.test.mjs` (real SQL via `node:sqlite` fake D1)

### P14b — Shop ✅

- [x] `src/config/products.ts` — 12 products, categories Freebies/Templates/Design Systems/Others
- [x] API: `GET /api/shop/products`, `POST /api/shop/coupon/validate`, `POST /api/shop/payment-intent`, `GET /api/shop/orders` (auth), `GET|PUT /api/shop/wishlist` (auth), `GET /api/shop/download/{token}`, `GET /api/shop/order/{uuid}`
- [x] Stripe webhook: `payment_intent.succeeded` → order paid + download tokens + Resend email; €0 freebies skip Stripe → Beehiiv subscribe + signed link
- [x] Screens: `/shop/`, `/shop/category/[category]/`, `/shop/product/[slug]/`, `/shop/cart/`, `/shop/checkout/`, `/shop/confirmation/`, `/shop/account/`
- [x] Cart/wishlist state: localStorage + tiny pub/sub store; wishlist syncs to D1 when logged in
- [x] Stripe Payment Element mounted into `.cc-field` wrappers per handoff styling
- [x] Tests: `tests/shop.test.mjs`

### P14c — Booking ✅

- [x] `src/config/bookingServices.ts` — REFONTE prices (coach 90/300/550, dev 350/600, workshop 650, custom=quote)
- [x] API: `GET /api/booking/availability`, `POST /api/booking/hold` (D1 `slot_holds`, UNIQUE(date,start_time)), `POST /api/booking/payment-intent`, `GET /api/booking/manage`, `POST /api/booking/reschedule`, `POST /api/booking/cancel`, `POST /api/booking/custom-quote`
- [x] Webhook → booking confirmed: Google Calendar event + Meet link + Resend confirmation with .ics + manage link
- [x] 24h reschedule/cancel cutoff enforced server-side; v1 cancels without auto-refund (manual refund in Stripe); inline reschedule picker on manage screen
- [x] Screens: `/booking/`, `/booking/schedule/`, `/booking/details/`, `/booking/checkout/`, `/booking/confirmation/`, `/booking/manage/`
- [x] Soft-launch gates verified: nav links hidden, noindex on commerce pages, sitemap filter excludes `/shop/*` + `/booking/*`
- [x] Local smoke test via `wrangler dev`: health, products, coupon WELCOME10, shop/manage pages 200
- [x] Tests: `tests/booking.test.mjs`

### P14d — Go-live (manual, separate commit)

- [ ] Flip `SITE_FEATURES.shopBooking` to `true` (nav/footer links, remove noindex + sitemap filter)
- [ ] Apply D1 migrations to remote (`wrangler d1 migrations apply --remote`)
- [ ] Upload product files to R2, set live Stripe keys + live webhook, verify Resend domain
- [ ] Smoke tests on production, then remove Calendly-only duplication if desired (Calendly stays for free intro calls)

## NEWSLETTER / CLOUDFLARE

- TODO: Add optional Cloudflare Turnstile to the newsletter form and verify its token server-side in the Worker (extend to shop/booking forms when they ship).
- TODO: Add disposable email filtering if low-quality signups become a problem.
- TODO: Add KV-based rate limiting for newsletter submissions if abuse appears.
- TODO: Add freebie delivery tracking when free resources are connected to newsletter signup (covered by shop freebie orders in P14b ✅).
- ~~TODO: Add Stripe webhooks only when paid products/newsletter subscriptions require server-side fulfillment~~ Done in P14b/P14c (`/api/stripe/webhook`).

## FOLLOW-UPS (post go-live)

- [ ] fr/es translations for shop + booking (follow projects/services content-split pattern)
- [ ] Stripe Tax / EU digital VAT (MOSS) automation
- [ ] Auto-refund on booking cancellation (policy decision needed)
- [ ] Turnstile on shop checkout + booking forms
- [ ] Rate limiting on auth magic-link endpoint
