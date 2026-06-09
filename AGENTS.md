# AGENTS.md

Agent-level guidance for automated tools (Codex, Copilot Workspace, etc.) working in this repository.

## Project identity

Personal portfolio and future service site for **Christophe Crognier** — full-stack developer, independent trainer (~7 000 h teaching), and AI-assisted development consultant. Live at `fullstackchris.dev`, deployed via Cloudflare Pages.

The business goal is to evolve the site from a classic portfolio into a **service-oriented site** that generates independent revenue through coaching, development days, MVP workshops, and a paid newsletter. See `REFONTE_COMPLETE.md` for the full brief and `ROADMAP.md` for the phased checklist.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18, Vite |
| Styling | Tailwind CSS (JIT), custom tokens in `src/config/tokens.js` |
| Animation | Framer Motion |
| 3D | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Routing | React Router v6 (scroll/anchor only — no page routes active) |
| State | Valtio (legacy, currently unused) |
| Booking | Calendly (`react-calendly`) |
| Deploy | Cloudflare Pages |

## Key constraints

- **No SSR.** Everything is a client-side SPA. Any SEO improvements must wait for the planned migration to Astro or Next.js static export.
- **No test suite.** Verify behaviour in the browser.
- **No linter config.** Follow existing code style.
- **No backend.** All data is static in `src/config/constants.js`. External calls are limited to the Calendly widget.
- **Cloudflare Pages static hosting.** Do not add server-side dependencies.

## Where things live

| What | Where |
|---|---|
| All site content (nav, services, tech, experience, projects) | `src/config/constants.js` |
| Design tokens (colors, shadows, fonts) | `src/config/tokens.js` |
| Tailwind color mappings | `tailwind.config.js` |
| Global styles + gradient utilities | `src/index.css` |
| Section animation HOC | `src/hoc/SectionWrapper.jsx` |
| Three.js scenes | `src/canvas/` |
| Target design system spec | `design/stitch/DESIGN.md` |

## Content editing rules

- To add or update a project: edit the `projects` array in `src/config/constants.js`. Each project needs `name`, `slug`, `description`, `tags[]`, `image`, and a `caseStudy` object. Images go in `src/assets/`.
- To change the Calendly link: update `CALENDLY_URL` in `src/config/constants.js` only — it is imported everywhere else.
- To add a color: add to `src/config/tokens.js` first, then expose via `tailwind.config.js`.

## Design direction

The **current** site uses a deep purple/dark palette (brand `#915eff`, bg `#050816`) with Poppins font and Three.js visuals.

The **target** design (for the refonte) is "Elite Developer-Educator" — dark charcoal `#0A0A0B`, Electric Violet `#8B5CF6`, Geist (headlines) + Inter (body) + JetBrains Mono (labels/code). See `design/stitch/DESIGN.md` for the full spec. Do not start migrating colours or fonts until the framework migration decision (Astro vs Next.js) is settled.

## Out of scope for the current codebase

- Server-side rendering / static site generation
- Blog (planned, not yet built)
- Service landing pages (planned, not yet built)
- Payment / Stripe integration (Phase 2+)
- Newsletter backend (Phase 2+)
- Admin dashboard or CRM (Phase 3)
