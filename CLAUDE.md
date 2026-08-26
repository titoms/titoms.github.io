# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Astro dev server (http://localhost:4321)
pnpm build        # production build → dist/
pnpm preview      # preview Astro build
pnpm test         # node --test tests/*.mjs (Worker API tests, mocked env/fetch)
pnpm cf:dev       # build + wrangler dev (Worker + local D1/KV/R2 emulation)
pnpm cf:deploy    # build + wrangler deploy (production — confirm before running)
```

Use **pnpm**, never npm. Run targeted tests (`node --test tests/shop.test.mjs`) before the full suite.

## Architecture overview

**Astro 6 static site** (`output: 'static'`) + **Cloudflare Worker** backend, deployed together via `wrangler deploy`. The Worker (`src/worker.ts`) serves built assets through the `ASSETS` binding and owns all `/api/*` routes.

### Frontend conventions

- Pages: `src/pages/**/*.astro`; dynamic routes via `getStaticPaths` (see `services/[slug].astro`).
- Interactivity: React islands in `src/components/islands/` hydrated with `client:*` directives; receive `locale` prop and use `useTranslations` from `src/i18n/ui.ts`.
- i18n: `en` default (unprefixed), `/fr`, `/es`. Per-locale content split for services/projects (`src/config/{services,projects}/content/{en,fr,es}.ts` + shared `structural.ts`). Blog = MDX content collections with per-locale subfolders.
- Layouts: `BaseLayout.astro` (head/SEO/JSON-LD/hreflang) → `PageLayout.astro` (+ SiteHeader/SiteFooter). Commerce pages pass `noindex` while the soft-launch flag is off.
- Design tokens: CSS variables in `src/styles/global.css` (`--bg-*`, `--text-*`, `--accent-*`, `--r-*`), mapped in `tailwind.config.js`. Use Tailwind classes matching tokens; the handoff CSS in `docs/*-handoff/` is ported to these tokens, not copied verbatim.

### Backend conventions

- `src/worker.ts` is a thin entry: canonical redirect → route dispatch → `ASSETS` fallback. Route modules live in `src/server/` (`newsletter.js`, `auth/`, `shop/`, `booking/`) with shared libs in `src/server/lib/` (`db`, `tokens`, `tz`, `ics`, `mailer`, `stripe`, `gcal`).
- Data: **D1** (`DB`, migrations in `migrations/`), **KV** (`HOLDS`, booking slot holds with native TTL), **R2** (`DOWNLOADS`, product files streamed via HMAC-signed token URLs).
- Integrations: Stripe PaymentIntents + `/api/stripe/webhook` (SubtleCrypto signature verify, `webhook_events` idempotency table), Google Calendar via service-account JWT (free/busy, events with Meet links), Resend for transactional email, Beehiiv for newsletter.
- **Pricing is always recomputed server-side** from `src/config/products.ts` / `src/config/bookingServices.ts` (REFONTE prices; the handoff prototype's prices are stale).
- Money is stored in **cents** (EUR). Booking slot times are generated server-side in `Europe/Paris` and rendered in the visitor's timezone client-side via `Intl`.
- Secrets: `.dev.vars` locally (uncommitted), Worker secrets in prod; `.dev.vars.example` lists names only. Frontend-visible values use `PUBLIC_` prefix (e.g. `PUBLIC_STRIPE_PUBLISHABLE_KEY`) — never for secrets.

### Testing

`node --test` against `src/worker.ts` with a fake env (`ASSETS`, `DB`… mocked) and `globalThis.fetch` stubbed — see `tests/worker.test.mjs` for the pattern. Pure logic (pricing, slots, tokens) is extracted into modules and unit-tested directly.

## Feature flags & go-live

`SITE_FEATURES` in `src/config/constants.ts` gates in-progress surfaces. `shopBooking: false` hides nav/footer links, adds `noindex` to `/shop/*` + `/booking/*`, and excludes them from the sitemap. Flip only at Phase 14d go-live (see `ROADMAP.md`).

## Reference docs

`REFONTE_COMPLETE.md` (business brief + canonical prices), `ROADMAP.md` (phases, Phase 14 = shop/booking), `TODO.md` (task list), `CLOUDFLARE_DEPLOYMENT.md` (deploy + secrets runbook), `docs/shop-screen-handoff/` + `docs/booking-screen-handoff/` (screen prototypes to port), `AGENTS.md` (editing rules).
