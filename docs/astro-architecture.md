# Astro Architecture — fullstackchris.dev

**Branch:** `feat/astro-migration`  
**Build:** `pnpm build` → `dist/` (static HTML, no SSR)  
**Deploy:** Cloudflare Pages (unchanged)

---

## How Astro works

Astro is a **static site generator** that compiles every page to plain HTML at build time. No client-side rendering on first load — the server always sends full HTML. JavaScript is added back only where interactivity is required, through a system called **React islands**.

### Build-time vs runtime

| Component type | When it runs | JS shipped? |
|---|---|---|
| `.astro` files | Build time only | No |
| React components (no `client:*`) | Build time only | No |
| React islands (`client:load`) | Build time + loads on page ready | Yes |
| React islands (`client:visible`) | Build time + loads on scroll into view | Yes (lazy) |

This means a user visiting `/services/web-project-coaching` receives static HTML — no waiting for JavaScript to render. The page is fully indexed by search engines and LLMs immediately.

---

## File structure

```
src/
  content/
    blog/                    # MDX blog posts (content collection)
      ai-web-development.mdx
      building-mvp-with-ai.mdx
      react-node-typescript.mdx
      claude-code-workflows.mdx
      how-much-does-an-mvp-cost.mdx

  content.config.ts          # Zod schema for blog frontmatter (Astro v6 format)

  pages/                     # File-based routing — each file = one URL
    index.astro              # /
    about.astro              # /about
    contact.astro            # /contact
    services/
      index.astro            # /services
      [slug].astro           # /services/web-project-coaching, etc.
    projects/
      index.astro            # /projects
      [slug].astro           # /projects/edumation, etc.
    blog/
      index.astro            # /blog
      [slug].astro           # /blog/ai-web-development, etc.

  components/
    layout/
      BaseLayout.astro       # <html>, <head>, SEO tags, JSON-LD
      PageLayout.astro       # BaseLayout + SiteHeader island + SiteFooter
      SiteFooter.astro       # Static footer with footerGroups data

    islands/                 # Hydrated React — ships JavaScript
      SiteHeader.tsx         # Hamburger menu (client:load)
      ProjectsModal.tsx      # Project grid + CaseStudyModal (client:load)
      FAQAccordion.tsx       # Accordion state (client:visible)
      NewsletterForm.tsx     # Form submit handler (client:visible)

    ui/                      # Stateless React — server-rendered only
      Badge.tsx, Button.tsx, Card.tsx, SectionHeader.tsx,
      ServiceCard.tsx, PricingCard.tsx, ProjectCard.tsx,
      ProcessStep.tsx, FAQItem.tsx

  config/
    constants.ts             # All site data (services, projects, FAQs, etc.)
    services-data.ts         # 5 service page data objects
    tokens.js, motion.ts     # Design tokens, animation config

  styles/
    global.css               # CSS variables, Tailwind directives, utilities

  env.d.ts                   # Astro TypeScript reference
```

---

## Routing

Astro uses **file-based routing**. Every `.astro` file in `src/pages/` becomes an HTML route:

- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/services/[slug].astro` → `/services/:slug` (dynamic)
- `src/pages/blog/[slug].astro` → `/blog/:slug` (dynamic, driven by content collection)

Dynamic routes use `getStaticPaths()` to enumerate all paths at build time.

---

## React islands

The 4 islands that ship JavaScript:

| Island | Directive | Why interactive |
|---|---|---|
| `SiteHeader.tsx` | `client:load` | Hamburger menu toggle |
| `ProjectsModal.tsx` | `client:load` | Project cards + CaseStudyModal with framer-motion |
| `FAQAccordion.tsx` | `client:visible` | Accordion open/close state |
| `NewsletterForm.tsx` | `client:visible` | Email form submit handler |

`client:load` — hydrates as soon as the page is ready (above the fold).  
`client:visible` — hydrates only when scrolled into the viewport (lazy, saves bandwidth).

All other UI components (`ServiceCard`, `PricingCard`, `Badge`, `Button`, etc.) are imported in `.astro` files with no `client:*` directive. Astro renders them as static HTML at build time — zero JS shipped for these.

---

## Content collections (blog)

Blog posts live in `src/content/blog/` as `.mdx` files. The schema is defined in `src/content.config.ts` using Zod:

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()),
    comingSoon: z.boolean().default(false),
  }),
});
```

In `src/pages/blog/[slug].astro`, `getStaticPaths()` calls `getCollection('blog')` to enumerate all MDX files. Each file's `id` (filename without extension) becomes the URL slug.

All 5 initial blog posts have `comingSoon: true`. When a post is ready, set `comingSoon: false` and add its full MDX content — the route already exists and is already indexed.

---

## SEO per page

`BaseLayout.astro` accepts `title`, `description`, `canonical`, `ogImage`, and `jsonLd`. Every page passes unique values.

### JSON-LD by page type

| Page | JSON-LD schema |
|---|---|
| Homepage | `Person` + `WebSite` |
| Service pages | `Service` |
| Project pages | `Article` + `BreadcrumbList` |
| Blog articles | `Article` + `BreadcrumbList` |

JSON-LD is injected as `<script type="application/ld+json">` in `<head>`. Each schema is passed as a plain object to `BaseLayout.astro` via the `jsonLd` prop.

---

## Adding a new blog post

1. Create `src/content/blog/your-slug.mdx` with valid frontmatter:
   ```mdx
   ---
   title: "Your Article Title"
   description: "A clear description for SEO."
   publishedAt: 2026-02-01
   tags: ["Tag1", "Tag2"]
   comingSoon: false
   ---

   # Your Article Title

   Article content in MDX format...
   ```
2. Run `pnpm build` — the route `/blog/your-slug` is built automatically.

---

## Adding a new service page

1. Add a new `ServicePageData` object to `src/config/services-data.ts`.
2. Add it to the `servicePages` array at the bottom.
3. `src/pages/services/[slug].astro` picks it up automatically via `getStaticPaths()`.

---

## Build output

`pnpm build` produces 21 static HTML files in `dist/`:

```
dist/
  index.html
  about/index.html
  contact/index.html
  services/index.html
  services/ai-web-development-newsletter/index.html
  services/web-project-coaching/index.html
  services/full-stack-development-day/index.html
  services/mvp-bootstrapping-workshop/index.html
  services/mvp-development/index.html
  projects/index.html
  projects/edumation/index.html
  projects/railguessr/index.html
  projects/singuessr/index.html
  projects/fuchibol-hub/index.html
  projects/fresh-win/index.html
  blog/index.html
  blog/ai-web-development/index.html
  blog/building-mvp-with-ai/index.html
  blog/react-node-typescript/index.html
  blog/claude-code-workflows/index.html
  blog/how-much-does-an-mvp-cost/index.html
```

Cloudflare Pages serves these directly from its edge network — no origin server needed.
