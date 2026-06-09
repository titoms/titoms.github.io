# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview production build on port 80
```

No test runner or linter is configured.

## Architecture overview

**React 18 SPA** built with Vite, deployed to Cloudflare Pages (`dist/`). No SSR — the entire app renders client-side from `src/main.jsx` → `src/App.jsx`.

### Section layout pattern

Every full-page section (Who, TechSkills, Experience, Projects, Contact) is a React component wrapped with the `SectionWrapper` HOC (`src/hoc/SectionWrapper.jsx`). The HOC:
- Wraps the component in a `framer-motion` section with `whileInView` reveal
- Injects a `<span id={idName} className="hash-span">` for anchor nav — the `hash-span` class applies `-100px` top margin to compensate for the fixed header height

Usage: `export default SectionWrapper(MyComponent, "anchor-id")`

### Data / content model

All site content lives in `src/config/constants.js`: nav links, services cards, tech stack, experiences, testimonials, and the full `projects` array. Each project has a top-level `caseStudy` object with fields: `tagline`, `problem`, `context`, `technicalChallenges[]`, `architecture`, `implementation`, `results[]`, `lessonsLearned[]`. These fields are rendered one-to-one by `CaseStudyModal`.

The Calendly booking URL is exported as `CALENDLY_URL` from `constants.js` — always import from there, never hardcode.

### Design token system

Colors and shadows are defined in `src/config/tokens.js` and consumed in two ways:
1. **Tailwind classes**: `tailwind.config.js` maps token values to Tailwind color names (`primary`, `secondary`, `tertiary`, `brand`, `brand-hover`, `surface`, `surface-deep`, `timeline`, `subtle`). Use these classes in JSX.
2. **Inline styles / JS**: import `colors` directly from `tokens.js` when you need hex values at runtime (e.g., the Calendly widget `pageSettings`).

The font is Poppins (set globally in `src/index.css`). Text gradient utility classes (`blue-text-gradient`, `green-text-gradient`, `pink-text-gradient`, `orange-text-gradient`) are defined in `index.css` and used on project tags.

### Canvas / Three.js components

`src/canvas/` contains four Three.js scenes (`Earth`, `Ball`, `Computers`, `Stars`). They are heavy; `Stars` is rendered outside `<Suspense>` alongside `Contact`. The others are lazy-loaded. Do not add new Three.js work without considering the manual chunk splitting in `vite.config.js`.

### CaseStudyModal

Opens as a full-screen overlay via `createPortal(…, document.body)` with `z-index: 1000`. It manages its own scroll lock (`document.body.style.overflow = "hidden"`) and restores it on unmount. The lightbox layer sits at `z-index: 1100`. Escape key closes either the lightbox or the modal depending on state.

### Projects infinite carousel

`Projects.jsx` triplicates the `projects` array and uses a CSS `@keyframes loop-scroll` animation. Scroll distance is computed from `projects.length`. The `.paused` class (toggled by `group-hover`) stops the animation.

### Routing

`BrowserRouter` is present but no `<Routes>` exist in `App.jsx` — the app is scroll-based with anchor links. `src/pages/` contains older page stubs (`Home`, `Contact`, `Portfolio`) that are not currently used.

The Valtio store (`src/store/index.js`) is a leftover from a removed customiser page and is currently unused by the main app.

## Planned refonte

`REFONTE_COMPLETE.md` contains the full brief for migrating this portfolio into a **service-oriented site** with dedicated landing pages for five services, a blog, SEO metadata, and structured data. `ROADMAP.md` has the phased implementation checklist. `design/stitch/DESIGN.md` contains the target design system (Geist + Inter + JetBrains Mono, Electric Violet `#8B5CF6` as brand, dark charcoal `#0A0A0B` base). The migration to Astro or Next.js static export is being evaluated — the current React SPA is not ideal for SEO or LLM crawlers.
