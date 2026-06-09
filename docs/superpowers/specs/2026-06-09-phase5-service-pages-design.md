# Phase 5 — Service Landing Pages Design

**Date:** 2026-06-09  
**Status:** Approved  
**Scope:** Implement the six service URLs from ROADMAP.md Phase 5 within the current React + Vite SPA.

---

## Context

The site is a React 18 SPA deployed on Cloudflare Pages. `react-router-dom` is already installed and `BrowserRouter` wraps the app, but no `<Routes>` exist yet — the app is scroll/anchor-based. Phase 8 (Astro/Next.js migration) is deferred. Phase 5 must be implemented within the SPA, accepting that full static-HTML SEO comes later.

JSON-LD structured data is explicitly deferred to Phase 8 per ROADMAP acceptance criteria.

---

## URLs to create

```
/services
/services/ai-web-development-newsletter
/services/web-project-coaching
/services/full-stack-development-day
/services/mvp-bootstrapping-workshop
/services/mvp-development
```

---

## Architecture

### Routing

Add `<Routes>` inside `App.tsx`. The current homepage content becomes a `HomePage` component rendered at `/`. Service pages get their own routes.

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/services" element={<ServicesIndexPage />} />
  <Route path="/services/:slug" element={<ServicePageTemplate />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

`SiteHeader` and `SiteFooter` remain outside `<Routes>` so they persist across all pages.

### Header navigation

All nav anchor links change from `#anchor` to `/#anchor` so they work from any sub-page without a full reload. React Router's `<a href="/#services">` navigates to the homepage hash correctly.

The "Services" nav link changes from `/#services` to `/services` (the new index page).

### Footer links

Footer service links change from `{id: "services"}` anchors to real paths:
- `href="/services/ai-web-development-newsletter"` etc.

---

## New files

```
src/
  config/
    services-data.ts              ← typed content for all 5 service pages
  pages/
    services/
      ServicesIndexPage.tsx       ← /services route
      ServicePageTemplate.tsx     ← /services/:slug route
```

No new UI primitives are needed — all existing components (`Card`, `Badge`, `Button`, `FAQItem`, `SectionHeader`, `PricingCard`, `ProcessStep`) are used.

---

## TypeScript type

Defined in `src/types/index.ts`:

```ts
export type ServicePricingRow = {
  label: string;
  price: string;
  featured?: boolean;
};

export type ServiceIncludedItem = {
  title: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  badge: string;
  hero: {
    h1: string;
    subtitle: string;
    primaryCta: string;
    primaryCtaHref?: string;   // defaults to CALENDLY_URL if omitted
    secondaryCta?: string;     // defaults to "← All services" linking to /services
    secondaryCtaHref?: string; // defaults to /services
  };
  painPoints: string[];
  outcomes: string[];
  included: ServiceIncludedItem[];
  pricing: ServicePricingRow[];
  pricingNote?: string;
  goodFit?: string[];
  notAFit?: string[];
  processSteps?: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};
```

---

## services-data.ts

Contains one `ServicePageData` object per service, exported individually and as a `servicePages` array. Slugs match the URL segments exactly. All copy sourced from `REFONTE_COMPLETE.md` sections 10–14.

Services:
1. `ai-web-development-newsletter` — 4-tier pricing (0/9/19/99 EUR), no optional sections
2. `web-project-coaching` — 3-tier pricing (90/300/550 EUR), no optional sections
3. `full-stack-development-day` — 5-tier pricing (350/600/1650/2600/5000 EUR), goodFit + processSteps
4. `mvp-bootstrapping-workshop` — 3-tier pricing (650/2800/3500 EUR), goodFit only
5. `mvp-development` — 1 pricing entry (from 4,500 EUR + typical range note), goodFit + processSteps

---

## ServicePageTemplate component

Located at `src/pages/services/ServicePageTemplate.tsx`.

Uses `useParams()` to get `:slug`, looks up the matching `ServicePageData` object from `servicePages`. Redirects to `/services` if slug not found.

Section render order:
1. **`<Helmet>`** — sets `<title>` and `<meta name="description">`
2. **Hero** — eyebrow badge, H1, subtitle, primary CTA (Calendly), optional secondary CTA
3. **Pain points** — `SectionHeader` + responsive card grid (auto-fit, min 2 columns) of pain point strings
4. **What's included** — `SectionHeader` + card grid of `ServiceIncludedItem[]`
5. **Pricing** — `SectionHeader` + pricing rows rendered as `PricingCard` components; `pricingNote` shown below if present
6. **Good fit / Not a fit** — rendered only if `goodFit` is defined; two columns of pill badges (green/red)
7. **Process steps** — rendered only if `processSteps` is defined; uses existing `ProcessStep` component
8. **FAQ** — `SectionHeader` + `FAQItem` accordion list
9. **Final CTA** — reuses the existing `FinalCTASection` pattern (glow card, headline, Calendly button)

---

## ServicesIndexPage component

Located at `src/pages/services/ServicesIndexPage.tsx`.

Simple page: sticky header, hero with H1 "All services" and subtitle, then a grid of 5 `ServiceCard` components (title, description, price, badge). Each card has two CTAs: a primary "Learn more" linking to `/services/:slug` and a ghost "Book a call" linking to `CALENDLY_URL`. Footer below.

Sets its own `<Helmet>` with title "Services — fullstackchris.dev".

---

## SEO / meta

Add `react-helmet-async` as a dependency. `<HelmetProvider>` wraps the app in `main.tsx`. Each service page and the services index sets:

```tsx
<Helmet>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
</Helmet>
```

The homepage keeps its existing title from `index.html`. JSON-LD is deferred to Phase 8.

---

## Optional sections: which service uses what

| Service | Good/Not fit | Process steps | Pricing rows |
|---|:---:|:---:|---|
| Newsletter | — | — | 4 (free / 9 / 19 / 99 EUR/mo) |
| Coaching | — | — | 3 (1h / half-day / full-day) |
| Dev Day | ✓ | ✓ | 5 (half / full / 3d / 5d / 10d) |
| MVP Workshop | ✓ | — | 3 (1d / 5d / premium 5d) |
| MVP Dev | ✓ | ✓ | 1 (from 4,500 EUR, note with range) |

---

## Acceptance criteria (Phase 5)

- [ ] `/services` renders the services index page
- [ ] All five `/services/:slug` URLs resolve to the correct service page
- [ ] Each page has a unique `<title>` and `<meta name="description">`
- [ ] Each page has exactly one H1
- [ ] Pricing is visible without excessive scrolling (above the fold or first scroll stop)
- [ ] Optional sections (goodFit, processSteps) only render when defined in data
- [ ] Unknown slugs redirect to `/services`
- [ ] Nav anchor links work from service sub-pages (use `/#anchor` format)
- [ ] Footer service links point to `/services/:slug` URLs
- [ ] `pnpm build` completes without TypeScript errors
- [ ] No JSON-LD added (deferred to Phase 8)

---

## Out of scope

- JSON-LD structured data (Phase 8)
- Static HTML generation (Phase 8)
- Blog pages (Phase 7)
- `/about` and `/contact` pages (Phase 7)
- Real newsletter signup / Stripe / Calendly embedded forms (Phase 9)
