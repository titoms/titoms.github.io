# Design Spec — Hero V2 · Case Study Template · Stripe Links
**Date:** 2026-06-11  
**Stack:** Astro 6 + React islands + TypeScript + Tailwind CSS  
**Branch:** main (feat branch recommended: `feat/hero-v2-casestudy`)

---

## Scope

Three independent chores delivered together:

| # | Chore | Effort |
|---|---|---|
| 1 | Stripe payment links wired | S |
| 2 | Hero section replaced with V2 (Cursor AI build board) | L |
| 3 | Case study pages rebuilt on new template | L |

---

## 1. Stripe Payment Links

### Current state
`STRIPE_PAYMENT_LINKS` in `src/config/constants.ts` has 5 placeholder keys with `REPLACE_*` values.

### Target state
Replace all values with the provided test links and add 2 missing keys:

```typescript
export const STRIPE_PAYMENT_LINKS = {
  newsletter:          "",                                                        // handled via Beehiiv, no Stripe
  coaching1h:          "https://buy.stripe.com/test_28E28rclg3ueeTfUF2kw00",   // €90  ← used by services-data.ts
  coachingHalfDay:     "https://buy.stripe.com/test_dRmeVd8595oQ3AfeQB2kw01",  // €300 ← new
  coachingFullDay:     "https://buy.stripe.com/test_9B6fZh7158B2fiX6k52kw02",  // €550 ← new
  developmentDay:      "https://buy.stripe.com/test_aFa5kDbhl18Agn1fUF2kw04",  // €600 full day ← used by services-data.ts (keep key name)
  developmentHalfDay:  "https://buy.stripe.com/test_00weVd85904w3AfgYJ2kw03",  // €350 ← new
  mvpWorkshop:         "https://buy.stripe.com/test_eVq6oHclpeZq2wb0ZL2kw05",  // €650 ← used by services-data.ts
} as const;
```

**Note:** These are Stripe TEST mode links — safe to commit. Swap for live links when going to production.

`services-data.ts`: **no changes needed** — existing key references (`coaching1h`, `developmentDay`, `mvpWorkshop`) are preserved. The `coaching4h` key (previously unused) is removed and replaced by `coachingHalfDay`/`coachingFullDay`.

---

## 2. Hero V2 — Cursor AI Build Board

### Source files (design reference)
- `design/claude-design/hero-variants/MOTION_HANDOFF.md` — complete animation spec
- `design/claude-design/hero-variants/variants.jsx` — component source (V2 = `HeroV2`)
- `design/claude-design/hero-variants/hero-variants.css` — CSS tokens and component styles

### Architecture

```
src/
  components/hero/
    HeroV2.astro          ← static chrome: blobs, grid, eyebrow, h1, subhead, CTAs, inline pills, parallax script
    Variant2Board.tsx     ← client:visible island: 6-card staged sequence
  hooks/
    useStagedReveal.ts    ← IntersectionObserver + setTimeout step timer, play-once
    usePrefersReducedMotion.ts
  scripts/
    heroParallax.ts       ← vanilla JS mouse parallax (desktop only, rAF lerp)
```

`index.astro`: replace the `<section class="glow-bg ...">` hero block with `<HeroV2 />`.

### Tailwind additions (`tailwind.config.js`)

New keyframes:
- `vdrift1/2/3` (28s/34s/31s blob drift)
- `vpulse` (2.6s eyebrow heartbeat)
- `vfloaty` (per-pill bob — duration via inline `--dur`/`--del` CSS vars)
- `rise` (page-load entrance stagger)
- `vblink` (caret/cursor step-end blink)

New animations:
- `animate-drift1/2/3`, `animate-vpulse`, `animate-vblink`
- `floaty` is inline-style driven (not a fixed Tailwind util) due to per-pill timing

New easing:
- `out-soft: 'cubic-bezier(0.22, 1, 0.36, 1)'`
- `in-out-soft: 'cubic-bezier(0.45, 0, 0.55, 1)'`

New colors (extend existing `accent` scale):
- `accent.200`, `accent.300`, `accent.400`, `accent.500`, `accent.soft`, `accent.soft2`, `accent.glow`
- `positive`, `positive.soft`, `text.on-accent`
- `bg.0` through `bg.4`, `border.strong`, `border.accent`

### Animation inventory

| Layer | Technique | Hydrate? |
|---|---|---|
| Background blobs | CSS `@keyframes vdrift1/2/3`, `will-change: transform` | No |
| Grid overlay | Static CSS mask | No |
| Eyebrow pulse dot | CSS `@keyframes vpulse` | No |
| Page-load entrance (left col) | CSS `@keyframes rise` + `.r1-r5` delay classes | No |
| Visual col entrance | CSS `@keyframes rise` + `.reveal-v` | No |
| Editor caret blink | CSS `@keyframes vblink step-end` | No |
| V2 board staged reveal | React island `useStagedReveal(6, {start:650, step:900})` | Yes (`client:visible`) |
| Mouse parallax | Vanilla JS `heroParallax.ts` in `<script>` | No |

### V2 Board sequence (Variant2Board.tsx)

Cards 0–5: PRD → Roadmap → Editor[span2] → Agent Tasks → Design System → Deploy bar

State: integer `n` (0→6) driven by `useStagedReveal`.  
- `n=0`: all cards inactive
- Card `i < n`: `.done` (accent-soft border + icon, green status pill for done)  
- Card `n-1`: `.active` (accent border glow, `translateY(-2px)`)
- `n >= 3`: agent-writing chip appears on Editor card
- `n >= 4`: all 3 task checkboxes flip to checked
- `n >= 6`: Deploy bar gets `.live` (green border + gradient bg)

Reduced motion: `n = 6` immediately on mount, all states final.

### Responsive

| Breakpoint | Behavior |
|---|---|
| ≥ 1080px | 2-col layout (`0.82fr 1fr`), floating pills visible |
| 900–1080px | 1-col stack (copy above board), board remains 2-col grid |
| < 900px | 1-col, board collapses to 1-col |
| < 1024px | Floating pills hidden (`hidden lg:block`) |

### Parallax (desktop only, > 1024px)

`heroParallax.ts` attaches to `#hero-scene`. `data-depth` on each element:
- Board wrapper: `0.012`
- React pill: `0.050`, Node.js: `0.070`, TypeScript: `0.040`, Claude Code: `0.080`

Lerp factor `0.06` per rAF frame. Applies `marginLeft/Top` on float pills (no override of keyframe `transform`). Guarded by `prefers-reduced-motion`.

---

## 3. Case Study Pages — New Template

### Data model extension

Add to `Project` type in `src/types/index.ts`:

```typescript
interface ProjectMeta {
  role: string;        // e.g. "Solo · full-stack"
  timeline: string;    // e.g. "2023 · 14 weeks"
  platform: string;    // e.g. "Web · Mobile"
  type: string;        // e.g. "SaaS Platform"
}

interface ProjectFlowStep {
  step: string;        // "01", "02", etc.
  title: string;
  description: string;
}

interface ProjectFeature {
  title: string;
  description: string;
  bullets: string[];
}

interface ProjectStackCategory {
  label: string;       // "Frontend", "Runtime", etc.
  chips: string[];
}

interface ProjectProve {
  iconKey: string;     // maps to inline SVG
  title: string;
  description: string;
}
```

Extend `Project`:
```typescript
interface Project {
  // ... existing fields ...
  meta: ProjectMeta;
  productFlow: ProjectFlowStep[];
  features: ProjectFeature[];
  stack: ProjectStackCategory[];
  proves: ProjectProve[];
  nextProjectSlug?: string;  // for "Next case study" bar
}
```

### Data to add per project

| Project | Role | Timeline | Platform | Type |
|---|---|---|---|---|
| EduMation | Solo · full-stack | 2023 · 14 weeks | Web · SaaS | Enterprise Platform |
| RailGuessr | Solo · full-stack | 2023 · 6 weeks | Web · PWA | Daily Game |
| Singuessr | Solo · full-stack | 2023 · 8 weeks | Web | Music Platform |
| FuchibolHub | Solo · full-stack | 2026 · 10 weeks | Web | Social Platform |
| Fresh.win | Solo · full-stack | 2024 · 12 weeks | Web | Prediction Platform |

Each project also gets `productFlow` (4 steps), `features` (3 features with bullets), `stack` (4 categories), `proves` (4–5 proves), `nextProjectSlug`.

### Page template (`src/pages/projects/[slug].astro`) — sections

1. **Hero** — Breadcrumb / eyebrow / h1 / badges / meta-bar / hero-actions (Visit + Read technical breakdown) + hero window mockup (placeholder, `aspect-ratio:16/9`)
2. **Problem** (alt bg) — 2-col split: pain list (✗ bullets from `caseStudy.problem`) + audience card (stat-row with 3 derived stats)
3. **Solution** — product flow 4 nodes + before/after windows
4. **Key Features** (alt bg) — 3 zig-zag features (alternating image/copy sides), window placeholders
5. **Technical Challenge** — split: accent-icon pain list + code block (from `caseStudy.technicalChallenges`)
6. **Stack** — 4-col grid of chip categories
7. **What This Proves** (alt bg) — 3-col grid of `proves` cards
8. **CTA** — gradient card "Want to build something like this?" → service CTAs
9. **Next Project** — slim bar with `nextProjectSlug` link

### Window mockups
All `win-screen` divs: hatched background pattern (`repeating-linear-gradient`) + centered placeholder note text. Real screenshots can be wired later by replacing the `win-screen` contents with `<Image>` components.

### Styling
Port the Case Study CSS from `design/claude-design/Case Study.html` as Tailwind classes where possible. For complex selectors (`.flow .node:not(:last-child)::after` arrows), use a `<style>` block inside the Astro file. No external stylesheet.

---

## Files touched

| File | Change |
|---|---|
| `src/config/constants.ts` | Update `STRIPE_PAYMENT_LINKS` keys + values; add meta/features/flow/stack/proves to each project |
| `src/config/services-data.ts` | Update `stripeLink` references to new key names |
| `src/types/index.ts` | Extend `Project` with new interfaces |
| `tailwind.config.js` | Add keyframes, animations, easing, color tokens |
| `src/pages/index.astro` | Replace hero section with `<HeroV2 />` |
| `src/pages/projects/[slug].astro` | Full rewrite with new template |
| `src/components/hero/HeroV2.astro` | New file |
| `src/components/hero/Variant2Board.tsx` | New file |
| `src/hooks/useStagedReveal.ts` | New file |
| `src/hooks/usePrefersReducedMotion.ts` | New file |
| `src/scripts/heroParallax.ts` | New file |

---

## Constraints

- No new npm packages unless strictly necessary (Framer Motion already installed — optional for card spring)
- `prefers-reduced-motion` honored for every animation
- Hero chrome ships as static Astro (no hydration) — only `Variant2Board.tsx` has `client:visible`
- Case study window mockups are placeholders (hatched + text) — not real screenshots
- Stripe links are TEST mode — document this clearly in a comment
