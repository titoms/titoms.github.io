# AGENTS.md

Agent-level guidance for automated tools (Codex, Copilot Workspace, etc.) working in this repository.

## Project identity

Personal portfolio and service site for **Christophe Crognier** — full-stack developer, independent trainer (~7 000 h teaching), and AI-assisted development consultant. Live at `fullstackchris.dev`, deployed as a **Cloudflare Worker with static assets**.

The business goal is to generate independent revenue through coaching, development days, MVP workshops, a paid newsletter, and a digital-products shop. See `REFONTE_COMPLETE.md` for the full brief and `ROADMAP.md` for the phased checklist (Phase 14 = shop + booking backend).

## Stack

| Layer | Tech |
|---|---|
| Framework | Astro 6 (`output: 'static'`) + React 18 islands, TypeScript |
| Styling | Tailwind CSS + CSS variables in `src/styles/global.css` (Claude Design system) |
| i18n | Astro i18n — en default (unprefixed), `/fr`, `/es`; UI strings in `src/i18n/locales/` |
| Content | Blog via Astro content collections (MDX, Zod); services/projects via `src/config/{services,projects}/` content split |
| Package manager | **pnpm** (never npm) |
| Backend | Cloudflare Worker `src/worker.ts` + modules in `src/server/` |
| Data | D1 (SQLite), KV (slot holds), R2 (product files) |
| Payments | Stripe PaymentIntents (embedded Payment Element) + webhook |
| Email | Resend (transactional), Beehiiv (newsletter) |
| Calendar | Google Calendar via service account (free/busy + Meet links) |
| Tests | `node --test` in `tests/*.mjs`, mocked env/fetch |
| Deploy | `pnpm run cf:deploy` (build + `wrangler deploy`) |

## Key constraints

- **Additive backend changes.** New API routes go under new `/api/*` prefixes; never change existing route behavior (newsletter) without explicit instruction.
- **Never trust client prices.** Shop/booking amounts are recomputed server-side from `src/config/products.ts` / `src/config/bookingServices.ts`.
- **Secrets stay out of the repo.** Local: `.dev.vars` (uncommitted). Prod: Worker secrets. `.dev.vars.example` documents names only. Never use `PUBLIC_` prefixes for secrets.
- **Soft-launch flag.** Shop/booking pages and their nav links are gated behind `SITE_FEATURES.shopBooking` in `src/config/constants.ts` (noindex + sitemap exclusion while `false`). Flip only at go-live.
- **Shop/booking are EN-first.** Do not add fr/es routes for them until translations are scheduled; other pages follow the per-locale content-split pattern.
- **No breaking changes to production.** Phase 14 work happens on `feat/shop-booking`; go-live (P14d) is a separate manual step.

## Where things live

| What | Where |
|---|---|
| Site content (nav, hero, services, tech, experience) | `src/config/constants.ts` + `src/components/pages/content/` |
| Services/projects content (per-locale) | `src/config/services/`, `src/config/projects/` |
| Shop catalog | `src/config/products.ts` |
| Booking services (REFONTE prices) | `src/config/bookingServices.ts` |
| Feature flags, Stripe links, Calendly URL | `src/config/constants.ts` |
| Design tokens (CSS variables) | `src/styles/global.css` |
| Tailwind color mappings | `tailwind.config.js` |
| UI primitives (Button, Card, Badge…) | `src/components/ui/` |
| React islands (hydrated) | `src/components/islands/` |
| Worker entry | `src/worker.ts` |
| API modules (newsletter, auth, shop, booking) | `src/server/` |
| Server libs (db, tokens, tz, ics, mailer, stripe, gcal) | `src/server/lib/` |
| D1 migrations | `migrations/` |
| Worker tests | `tests/*.mjs` |
| Screen prototypes to port | `docs/shop-screen-handoff/`, `docs/booking-screen-handoff/` |

## Content editing rules

- **Products**: edit `src/config/products.ts` (prices in **cents**, EUR). Files for download go in the R2 bucket, never in the repo.
- **Booking services**: edit `src/config/bookingServices.ts`. Prices are REFONTE-canonical; do not copy prices from the handoff prototype.
- **Calendly link**: `CALENDLY_URL` in `constants.ts` only.
- **Coupons**: live in D1 `coupons` table (seeded WELCOME10/LAUNCH20), not in code.

## Out of scope for the current codebase

- Auto-refunds on booking cancellation (manual via Stripe dashboard for now)
- Stripe Tax / EU VAT automation (flagged follow-up)
- Blog article production (Phase 10 content)
- Admin dashboard / CRM (Phase 13)
