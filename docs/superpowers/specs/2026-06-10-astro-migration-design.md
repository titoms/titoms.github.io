# Astro Migration Design — fullstackchris.dev

**Date:** 2026-06-10  
**Status:** Approved  
**Branch:** `feat/astro-migration`

## Goal

Migrate the current React/Vite SPA to Astro + React islands, producing static HTML for every route. This enables per-page metadata, real crawlable content, and JSON-LD structured data — prerequisites for SEO and LLM indexability on a service-oriented site.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Astro (static output) | Best fit for mostly-static content with minimal interactivity |
| Adapter | None (`output: 'static'`) | Pure static deploy, no SSR needed |
| Deployment | Cloudflare Pages (unchanged) | Build command: `pnpm build`, output: `dist/` |
| Blog | Astro content collections + MDX | Future-proof, frontmatter schema enforced by Zod |
| Migration approach | New git branch | Keep `main` live on Cloudflare Pages during migration |
| React | Kept for islands only | Framer-motion (CaseStudyModal) and interactive state |

## File Structure

```
src/
  content/
    blog/
      ai-web-development.mdx
      building-mvp-with-ai.mdx
      react-node-typescript.mdx
      claude-code-workflows.mdx
      how-much-does-an-mvp-cost.mdx
    config.ts                     # Zod schema for blog frontmatter

  pages/
    index.astro                   # Homepage (all sections)
    about.astro
    contact.astro
    services/
      index.astro
      [slug].astro                # 5 service pages
    projects/
      index.astro
      [slug].astro                # 5 case study pages
    blog/
      index.astro
      [slug].astro                # Driven by content collection

  components/
    islands/                      # Hydrated React (client:*)
      SiteHeader.tsx              # Hamburger — client:load
      ProjectsModal.tsx           # Modal — client:load
      FAQAccordion.tsx            # Accordion — client:visible
      NewsletterForm.tsx          # Form — client:visible
    ui/                           # Stateless React, server-rendered (no client:*)
      Badge.tsx, Button.tsx, Card.tsx, SectionHeader.tsx,
      ServiceCard.tsx, PricingCard.tsx, ProjectCard.tsx,
      ProcessStep.tsx, FAQItem.tsx (unchanged)
    layout/
      BaseLayout.astro            # <html>, <head>, fonts, CSS, SEO tags, JSON-LD
      PageLayout.astro            # BaseLayout + SiteHeader island + SiteFooter

  config/
    constants.ts                  # Unchanged
    services-data.ts              # Unchanged
    tokens.js, motion.ts, …      # Unchanged
    blog-data.ts                  # Deleted (replaced by content collection)

public/
  robots.txt, sitemap.xml        # Unchanged

astro.config.ts                   # Replaces vite.config.ts
tailwind.config.js                # content glob updated to include .astro
tsconfig.json                     # Extended with Astro paths
```

**Deleted:** `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `src/hoc/SectionWrapper.jsx`, and all orphaned legacy components (`Hero.jsx`, `Header.jsx`, `Who.jsx`, `Experience.jsx`, `Contact.jsx`, `Stars.jsx`, `TechSkills.jsx`, `Projects.jsx`).

## React Islands

| Island | Directive | What it replaces |
|---|---|---|
| `SiteHeader.tsx` | `client:load` | Hamburger menu state |
| `ProjectsModal.tsx` | `client:load` | ProjectsSection + CaseStudyModal combined |
| `FAQAccordion.tsx` | `client:visible` | FAQItem accordion state |
| `NewsletterForm.tsx` | `client:visible` | Newsletter form submit handler |

All other UI components are imported in `.astro` files and rendered at build time — zero JS shipped.

## Blog Content Collection Schema

```ts
// src/content/config.ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()),
    comingSoon: z.boolean().default(false),
  })
})
```

All 5 initial MDX files use `comingSoon: true` as placeholders. The `[slug].astro` route uses `getStaticPaths` with `getCollection('blog')`.

## SEO Per Page

`BaseLayout.astro` accepts: `title`, `description`, `canonical`, `ogImage`.  
JSON-LD injected as `<script type="application/ld+json">` in `<head>`:

| Page type | JSON-LD schema |
|---|---|
| Homepage | `Person` + `WebSite` |
| Service pages | `Service` + `Offer` + `FAQPage` |
| Project pages | `Article` + `BreadcrumbList` |
| Blog articles | `Article` + `BreadcrumbList` |

## Acceptance Criteria

- `pnpm build` produces static HTML for all 14 routes
- Every page has unique `<title>`, `<meta description>`, canonical URL, OG tags
- JSON-LD present in `<head>` for all page types
- Homepage JS budget: only SiteHeader + ProjectsModal bundles load eagerly
- FAQ and newsletter form hydrate lazily (`client:visible`)
- Blog routes driven by `getCollection('blog')` — no manual slug list
- All 5 MDX blog files present with correct frontmatter
- `ROADMAP.md` updated to mark Phase 8 complete
- `docs/astro-architecture.md` written explaining the app structure
