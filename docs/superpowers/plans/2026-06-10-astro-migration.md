# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate fullstackchris.dev from a React/Vite SPA to Astro + React islands, producing static HTML for all 14 routes with per-page SEO, JSON-LD, and MDX blog support.

**Architecture:** Astro file-based routing with `output: 'static'`. Stateless UI components (Badge, Card, Button, etc.) server-rendered in `.astro` files at build time — zero JS. Four React islands hydrated client-side: SiteHeader (`client:load`), ProjectsModal (`client:load`), FAQAccordion (`client:visible`), NewsletterForm (`client:visible`). Blog uses Astro content collections with MDX and a Zod-validated frontmatter schema.

**Tech Stack:** Astro, @astrojs/react, @astrojs/tailwind, @astrojs/mdx, React 18, Tailwind CSS, framer-motion (modal island only), TypeScript strict, pnpm, Cloudflare Pages (unchanged: `pnpm build` → `dist/`)

---

## File Map

**Create:**
- `astro.config.ts` — Astro config replacing vite.config.ts
- `src/env.d.ts` — Astro client types replacing vite-env.d.ts
- `src/styles/global.css` — global CSS moved from src/index.css
- `src/content/config.ts` — Zod schema for blog collection
- `src/content/blog/*.mdx` — 5 MDX blog placeholder files
- `src/components/layout/BaseLayout.astro` — HTML shell with SEO, fonts, JSON-LD
- `src/components/layout/SiteFooter.astro` — static 4-column footer
- `src/components/layout/PageLayout.astro` — BaseLayout + SiteHeader island + SiteFooter
- `src/components/islands/SiteHeader.tsx` — hamburger nav island
- `src/components/islands/ProjectsModal.tsx` — projects grid + case study modal island
- `src/components/islands/FAQAccordion.tsx` — FAQ accordion island
- `src/components/islands/NewsletterForm.tsx` — email form island
- `src/pages/index.astro` — homepage (10 sections)
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/services/index.astro`
- `src/pages/services/[slug].astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`

**Modify:**
- `tailwind.config.js` — add `.astro` to content glob
- `tsconfig.json` — extend `astro/tsconfigs/strict`
- `package.json` — swap Vite scripts for Astro scripts, swap deps

**Delete:**
- `vite.config.ts`, `index.html`, `src/vite-env.d.ts`, `src/main.tsx`, `src/App.tsx`
- `src/index.css` (content moved to `src/styles/global.css`)
- `src/hoc/SectionWrapper.jsx`, `src/hoc/index.js`
- `src/components/Hero.jsx`, `Header.jsx`, `Who.jsx`, `Experience.jsx`, `Contact.jsx`, `Stars.jsx`, `TechSkills.jsx`, `Projects.jsx`
- `src/components/index.js`
- `src/config/blog-data.ts` (replaced by content collection)
- `src/pages/about/AboutPage.tsx`, `src/pages/contact/ContactPage.tsx`
- `src/pages/services/ServicesIndexPage.tsx`, `src/pages/services/ServicePageTemplate.tsx`
- `src/pages/projects/ProjectIndexPage.tsx`, `src/pages/projects/ProjectCaseStudyPage.tsx`
- `src/pages/blog/BlogIndexPage.tsx`, `src/pages/blog/BlogArticlePage.tsx`

---

## Task 1: Create branch and swap dependencies

**Files:** `package.json`

- [ ] **Step 1: Create the migration branch**

```bash
git checkout -b feat/astro-migration
```

- [ ] **Step 2: Remove Vite and React Router deps**

```bash
pnpm remove vite @vitejs/plugin-react react-router-dom react-helmet-async
```

- [ ] **Step 3: Install Astro and integrations**

```bash
pnpm add astro @astrojs/react @astrojs/tailwind @astrojs/mdx
```

- [ ] **Step 4: Update scripts in package.json**

Open `package.json` and replace the `"scripts"` block with:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
},
```

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: swap Vite for Astro, remove React Router and react-helmet-async"
```

---

## Task 2: Configure Astro, TypeScript, and Tailwind

**Files:** `astro.config.ts`, `tsconfig.json`, `tailwind.config.js`

- [ ] **Step 1: Create astro.config.ts** (delete `vite.config.ts` first)

```bash
git rm vite.config.ts
```

Create `astro.config.ts`:

```ts
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  site: 'https://fullstackchris.dev',
});
```

- [ ] **Step 2: Replace tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowJs": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "include": ["src/**/*", ".astro/types.d.ts"]
}
```

- [ ] **Step 3: Update tailwind.config.js content glob**

Change only the `content` array to add `.astro`:

```js
content: ["./src/**/*.{js,jsx,ts,tsx,astro}"],
```

- [ ] **Step 4: Commit**

```bash
git add astro.config.ts tsconfig.json tailwind.config.js
git commit -m "chore: add Astro config, update tsconfig and Tailwind content glob"
```

---

## Task 3: Global CSS, env types, blog schema

**Files:** `src/styles/global.css`, `src/env.d.ts`, `src/content/config.ts`

- [ ] **Step 1: Move global CSS**

Create `src/styles/global.css` with the full content of the current `src/index.css` (CSS custom properties, Tailwind directives, gradient utilities, glow-bg, grid-bg, custom-scrollbar, etc.). Then stage `src/index.css` for deletion:

```bash
git rm src/index.css
```

The content of `src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-0: #0d0d10;
  --bg-1: #131318;
  --bg-2: #1a1a20;
  --bg-3: #22222a;
  --bg-4: #2c2c35;

  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --border-accent: rgba(167, 139, 250, 0.40);

  --text-hi: #f4f4f6;
  --text-mid: #a4a4af;
  --text-low: #6c6c78;
  --text-on-accent: #15101f;

  --color-brand: #a78bfa;
  --color-brand-hover: #c4b5fd;
  --accent-soft: rgba(167, 139, 250, 0.12);
  --accent-soft-2: rgba(167, 139, 250, 0.20);
  --accent-glow: rgba(167, 139, 250, 0.35);
  --color-bg-timeline: var(--bg-2);

  --positive: #5fd99a;
  --positive-soft: rgba(95, 217, 154, 0.14);
  --negative: #f47373;
  --negative-soft: rgba(244, 115, 115, 0.12);

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Hanken Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 16px;
  --r-xl: 22px;
  --r-pill: 999px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.55);
  --glow: 0 0 48px var(--accent-glow);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-body);
  scroll-behavior: smooth;
  color-scheme: dark;
}

body {
  background: var(--bg-0);
  color: var(--text-hi);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  letter-spacing: 0;
}

.hash-span {
  margin-top: -100px;
  padding-bottom: 100px;
  display: block;
}

.glow-bg {
  position: relative;
  overflow: hidden;
}

.glow-bg::before {
  content: "";
  position: absolute;
  top: -30%;
  left: 50%;
  width: 900px;
  height: 600px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(167, 139, 250, 0.18) 0%, rgba(167, 139, 250, 0.06) 35%, transparent 70%);
  filter: blur(20px);
}

.grid-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%);
}

.orange-text-gradient {
  background: linear-gradient(to top, #f12711, #f5af19);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.green-text-gradient {
  background: linear-gradient(to top, #11998e, #38ef7d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blue-text-gradient {
  background: linear-gradient(to top, #2f80ed, #56ccf2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pink-text-gradient {
  background: linear-gradient(to top, #ec008c, #fc6767);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar { height: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: var(--color-bg-timeline); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-brand-hover); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-brand); }
```

- [ ] **Step 2: Create src/env.d.ts** (delete `src/vite-env.d.ts` first)

```bash
git rm src/vite-env.d.ts
```

Create `src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 3: Create src/content/config.ts**

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()),
    comingSoon: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/env.d.ts src/content/config.ts
git commit -m "chore: add global CSS, Astro env types, and blog content collection schema"
```

---

## Task 4: BaseLayout.astro

**Files:** `src/components/layout/BaseLayout.astro`

- [ ] **Step 1: Create the layout directory and BaseLayout**

```bash
mkdir -p src/components/layout
```

Create `src/components/layout/BaseLayout.astro`:

```astro
---
import '../../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const { title, description, canonical, ogImage, jsonLd } = Astro.props;
const siteUrl = 'https://fullstackchris.dev';
const resolvedCanonical = canonical ?? siteUrl + Astro.url.pathname;
const resolvedOgImage = ogImage ?? `${siteUrl}/og-default.png`;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0d0d10" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={resolvedCanonical} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="fullstackchris.dev" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={resolvedCanonical} />
    <meta property="og:image" content={resolvedOgImage} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={resolvedOgImage} />

    {jsonLd && (
      Array.isArray(jsonLd)
        ? jsonLd.map((schema) => (
            <script type="application/ld+json" set:html={JSON.stringify(schema)} />
          ))
        : <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
    )}
  </head>
  <body class="min-h-screen bg-primary text-white">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/BaseLayout.astro
git commit -m "feat: add BaseLayout.astro with SEO head, OG tags, and JSON-LD support"
```

---

## Task 5: SiteFooter.astro

**Files:** `src/components/layout/SiteFooter.astro`

- [ ] **Step 1: Create SiteFooter.astro**

```astro
---
import { footerGroups } from '../../config/constants';
---

<footer class="border-t border-border bg-surface">
  <div class="mx-auto max-w-site px-6 py-14 sm:px-8 lg:px-10">
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {footerGroups.map((group) => (
        <div>
          <h3 class="font-mono text-xs uppercase tracking-[0.14em] text-low">{group.title}</h3>
          <ul class="mt-4 space-y-3">
            {group.links.map((link) => (
              <li>
                <a
                  class="text-sm text-secondary transition-colors hover:text-white"
                  href={link.href ?? `#${link.id}`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div class="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-low sm:flex-row sm:items-center sm:justify-between">
      <p>Christophe Crognier / fullstackchris.dev</p>
      <p>Developer execution + teaching clarity + AI-assisted workflows.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/SiteFooter.astro
git commit -m "feat: add static SiteFooter.astro"
```

---

## Task 6: PageLayout.astro

**Files:** `src/components/layout/PageLayout.astro`

- [ ] **Step 1: Create PageLayout.astro**

```astro
---
import BaseLayout from './BaseLayout.astro';
import SiteFooter from './SiteFooter.astro';
import SiteHeader from '../islands/SiteHeader';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const props = Astro.props;
---

<BaseLayout {...props}>
  <SiteHeader client:load />
  <main>
    <slot />
  </main>
  <SiteFooter />
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/PageLayout.astro
git commit -m "feat: add PageLayout.astro composing header island, main slot, and footer"
```

---

## Task 7: SiteHeader island

**Files:** `src/components/islands/SiteHeader.tsx`

- [ ] **Step 1: Create islands directory and SiteHeader**

```bash
mkdir -p src/components/islands
```

Create `src/components/islands/SiteHeader.tsx`:

```tsx
import { useState } from "react";
import { navLinks, CALENDLY_URL } from "../../config/constants";
import { Button } from "../ui";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-site items-center justify-between px-6 sm:px-8 lg:px-10">
        <a
          href="/"
          className="flex items-center gap-3 font-mono text-[0.98rem] font-semibold tracking-normal text-white"
          onClick={handleNavClick}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-accent bg-brand/10 text-accent">
            CC
          </span>
          <span>fullstackchris.dev</span>
        </a>

        <div className="hidden items-center gap-7 min-[901px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href ?? `/#${link.id}`}
              className="text-[0.92rem] font-medium text-secondary transition-colors hover:text-white"
            >
              {link.title}
            </a>
          ))}
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="sm">
            Book a call
            <span aria-hidden="true">-&gt;</span>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-border bg-tertiary text-white min-[901px]:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((c) => !c)}
        >
          <span className="font-mono text-lg leading-none">{isOpen ? "x" : "="}</span>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-primary/95 px-6 py-5 backdrop-blur-xl min-[901px]:hidden">
          <div className="mx-auto flex max-w-site flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href ?? `/#${link.id}`}
                className="rounded-md px-3 py-2 font-display text-xl font-semibold text-white hover:bg-tertiary"
                onClick={handleNavClick}
              >
                {link.title}
              </a>
            ))}
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
              Book a call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/islands/SiteHeader.tsx
git commit -m "feat: add SiteHeader React island with hamburger nav"
```

---

## Task 8: ProjectsModal island

**Files:** `src/components/islands/ProjectsModal.tsx`

- [ ] **Step 1: Create ProjectsModal.tsx**

```tsx
import { useState } from "react";
import { projects } from "../../config/constants";
import { ProjectCard } from "../ui";
import CaseStudyModal from "../CaseStudyModal";
import type { Project } from "../../types";

const ProjectsModal = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </div>
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsModal;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/islands/ProjectsModal.tsx
git commit -m "feat: add ProjectsModal React island combining project grid and case study modal"
```

---

## Task 9: FAQAccordion island

**Files:** `src/components/islands/FAQAccordion.tsx`

- [ ] **Step 1: Create FAQAccordion.tsx**

```tsx
import { faqs } from "../../config/constants";
import { FAQItem } from "../ui";

const FAQAccordion = () => (
  <div>
    {faqs.map((faq, index) => (
      <FAQItem key={faq.question} question={faq.question} defaultOpen={index === 0}>
        {faq.answer}
      </FAQItem>
    ))}
  </div>
);

export default FAQAccordion;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/islands/FAQAccordion.tsx
git commit -m "feat: add FAQAccordion React island"
```

---

## Task 10: NewsletterForm island

**Files:** `src/components/islands/NewsletterForm.tsx`

- [ ] **Step 1: Create NewsletterForm.tsx**

```tsx
import { Button } from "../ui";

const NewsletterForm = () => (
  <form
    className="mt-8 flex flex-col gap-3 sm:flex-row"
    onSubmit={(e) => e.preventDefault()}
  >
    <label className="sr-only" htmlFor="newsletter-email">
      Email address
    </label>
    <input
      id="newsletter-email"
      type="email"
      placeholder="you@example.com"
      className="min-h-[52px] flex-1 rounded-md border border-border bg-inset px-4 text-[0.95rem] text-white outline-none transition focus:border-accent focus:ring-4 focus:ring-brand/10"
    />
    <Button type="submit">Preview signup</Button>
  </form>
);

export default NewsletterForm;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/islands/NewsletterForm.tsx
git commit -m "feat: add NewsletterForm React island"
```

---

## Task 11: Delete all orphaned React files

- [ ] **Step 1: Delete Vite entry and App files**

```bash
git rm index.html src/main.tsx src/App.tsx
```

- [ ] **Step 2: Delete legacy HOC and components**

```bash
git rm src/hoc/SectionWrapper.jsx src/hoc/index.js src/components/index.js
git rm src/components/Hero.jsx src/components/Header.jsx src/components/Who.jsx
git rm src/components/Experience.jsx src/components/Contact.jsx src/components/Stars.jsx
git rm src/components/TechSkills.jsx src/components/Projects.jsx
```

- [ ] **Step 3: Delete old React Router page files**

```bash
git rm src/pages/about/AboutPage.tsx
git rm src/pages/contact/ContactPage.tsx
git rm src/pages/services/ServicesIndexPage.tsx src/pages/services/ServicePageTemplate.tsx
git rm src/pages/projects/ProjectIndexPage.tsx src/pages/projects/ProjectCaseStudyPage.tsx
git rm src/pages/blog/BlogIndexPage.tsx src/pages/blog/BlogArticlePage.tsx
git rm src/config/blog-data.ts
```

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: delete Vite entry, orphaned React components, React Router pages, and blog-data.ts"
```

---

## Task 12: Homepage — src/pages/index.astro

**Files:** `src/pages/index.astro`

- [ ] **Step 1: Create the homepage**

```astro
---
import PageLayout from '../components/layout/PageLayout.astro';
import ProjectsModal from '../components/islands/ProjectsModal';
import FAQAccordion from '../components/islands/FAQAccordion';
import NewsletterForm from '../components/islands/NewsletterForm';
import {
  Badge, Button, Card, SectionHeader, ServiceCard,
  PricingCard, ProcessStep,
} from '../components/ui';
import {
  CALENDLY_URL, heroStats, workModes, buildStats, serviceOffers,
  processSteps, technologies, pricingPlans, newsletterIssue, feedbackCards,
} from '../config/constants';

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const uniqueTech = Array.from(new Set([
  "React", "Next.js", "TypeScript", "Node.js", "Express",
  "PostgreSQL", "Docker", "Cloudflare", "OpenAI API",
  ...technologies.map((t) => t.name),
]));

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Christophe Crognier",
    "url": "https://fullstackchris.dev",
    "jobTitle": "Full-Stack Web Developer",
    "description": "Full-stack web developer and programming teacher specialised in React, Node.js, TypeScript and AI-assisted development.",
    "sameAs": ["https://github.com/titoms", "https://www.linkedin.com/in/christophecrognier/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "fullstackchris.dev",
    "url": "https://fullstackchris.dev",
  },
];
---

<PageLayout
  title="Full-Stack Web Development, AI Workflows and Technical Coaching — fullstackchris.dev"
  description="I help founders, freelancers and small teams clarify, build and launch web projects using React, Node.js, TypeScript and practical AI-assisted development workflows."
  jsonLd={jsonLd}
>
  <!-- Hero -->
  <section id="home" class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`relative z-10 mx-auto grid min-h-[calc(100vh-68px)] w-full max-w-site items-center gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10`}>
      <div class="max-w-4xl">
        <h1 class="max-w-5xl font-display text-[clamp(2.75rem,7vw,5.8rem)] font-bold leading-[0.98] tracking-normal text-white">
          Full-stack web development, AI workflows and technical coaching for builders
        </h1>
        <p class="mt-7 max-w-prose text-[clamp(1.05rem,1.7vw,1.28rem)] leading-8 text-secondary">
          I help founders, freelancers and small teams clarify, build and launch web projects using React, Node.js,
          TypeScript and practical AI-assisted development workflows.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Book a project call
            <span aria-hidden="true">-&gt;</span>
          </Button>
          <Button href="#services" variant="secondary" size="lg">
            Explore services
          </Button>
        </div>
        <div class="mt-12 grid gap-4 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <Card className="bg-surface/70 p-5">
              <p class="font-display text-2xl font-semibold text-white">{stat.value}</p>
              <p class="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">{stat.label}</p>
              <p class="mt-3 text-sm leading-6 text-secondary">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-[520px] lg:ml-auto">
        <div class="absolute inset-6 rounded-xl border border-accent/30 bg-brand/10 blur-3xl" aria-hidden="true"></div>
        <Card glow className="relative overflow-hidden p-0">
          <div class="border-b border-border bg-surface px-5 py-3 font-mono text-xs text-low">
            project-clarity.ts
          </div>
          <div class="space-y-4 p-6 font-mono text-sm leading-7 text-secondary">
            <p><span class="text-accent">const</span> offer = <span class="text-positive">"clarify -&gt; build -&gt; launch"</span>;</p>
            <p><span class="text-accent">stack</span>: React + Node.js + TypeScript</p>
            <p><span class="text-accent">focus</span>: MVP scope, AI workflows, product UI, APIs</p>
            <div class="grid gap-3 pt-2 sm:grid-cols-2">
              {["Coaching", "Development", "MVP Workshop", "Custom build"].map((item) => (
                <span class="rounded-md border border-border bg-inset px-3 py-2 text-white">{item}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- Three ways to work -->
  <section id="about" class={sectionClass}>
    <SectionHeader
      eyebrow="Three ways to work"
      title="Get the level of help your project actually needs."
      description="Some projects need an explanation. Some need hands on delivery. Some need a product plan before anyone writes code."
    />
    <div class="mt-10 grid gap-5 md:grid-cols-3">
      {workModes.map((mode) => (
        <Card hover className="flex h-full flex-col gap-4">
          <span class="font-mono text-sm text-accent">{mode.title.toLowerCase()}</span>
          <h3 class="font-display text-2xl font-semibold text-white">{mode.title}</h3>
          <p class="text-[0.95rem] leading-7 text-secondary">{mode.description}</p>
          <p class="mt-auto border-t border-border pt-4 text-sm font-medium text-white">{mode.outcome}</p>
        </Card>
      ))}
    </div>
  </section>

  <!-- Build mosaic -->
  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <SectionHeader
          eyebrow="What gets built here"
          title="Practical web product work, not vague consulting."
          description="The site is organized around concrete outcomes: clear scope, useful UI, reliable APIs and AI workflows that help rather than distract."
        />
        <div class="grid gap-4 sm:grid-cols-2">
          {buildStats.map((stat, index) => (
            <Card
              className={index === 0 ? "sm:row-span-2 sm:flex sm:flex-col sm:justify-end" : undefined}
              hover
            >
              <p class="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-none text-white">{stat.value}</p>
              <h3 class="mt-4 font-display text-xl font-semibold text-white">{stat.label}</h3>
              <p class="mt-3 text-sm leading-6 text-secondary">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section id="services" class={sectionClass}>
    <SectionHeader
      eyebrow="Five services"
      title="Productized help from one hour to a custom MVP."
      description="Prices are visible early so the next step is concrete."
    />
    <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {serviceOffers.map((service) => (
        <ServiceCard
          title={service.title}
          description={service.description}
          price={service.price}
          priceUnit={service.priceUnit}
          badge={service.badge}
          featured={service.featured}
          ctaHref={CALENDLY_URL}
          ctaLabel={service.title.includes("Newsletter") ? "Join the list" : "Book a call"}
          ctaVariant={service.featured ? "primary" : "secondary"}
        />
      ))}
    </div>
  </section>

  <!-- Projects (island) -->
  <section id="projects" class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Recent projects"
          title="Project proof from real product surfaces."
          description="Open a case study preview to inspect the problem, architecture, results and gallery without leaving the homepage."
        />
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
          Start a similar project
        </Button>
      </div>
      <ProjectsModal client:load />
    </div>
  </section>

  <!-- Process + Tech -->
  <section class={sectionClass}>
    <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <SectionHeader
          eyebrow="How we work"
          title="A simple process for reducing ambiguity."
          description="The work is framed so each session, sprint or build has a practical definition of done."
        />
        <div class="mt-10">
          {processSteps.map((step, index) => (
            <ProcessStep number={index + 1} title={step.title} isLast={index === processSteps.length - 1}>
              {step.description}
            </ProcessStep>
          ))}
        </div>
      </div>
      <div id="blog" class="lg:pt-16">
        <SectionHeader
          eyebrow="Tech stack"
          title="Modern web tools with teaching clarity."
          description="The stack stays practical: enough structure for production, enough explanation for founders and learners to follow the decisions."
        />
        <Card className="mt-10">
          <div class="flex flex-wrap gap-3">
            {uniqueTech.map((tech) => (
              <Badge variant={tech.includes("AI") || tech.includes("OpenAI") ? "accent" : "default"} dot>
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader
        eyebrow="Pick your plan"
        title="Choose the smallest useful engagement."
        description="Start with clarity when scope is fuzzy, book delivery when the task is defined, or plan the MVP before committing to a larger build."
      />
      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard
            title={plan.title}
            description={plan.description}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            featured={plan.featured}
            ctaLabel="Book a call"
            ctaHref={CALENDLY_URL}
          />
        ))}
      </div>
    </div>
  </section>

  <!-- Newsletter (island) -->
  <section class={sectionClass}>
    <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div>
        <SectionHeader
          eyebrow="Newsletter"
          title="AI web development notes without the weekly noise."
          description="A future paid newsletter for developers, founders and freelancers who want practical signal on coding tools, agents, prompts and product workflows."
        />
        <NewsletterForm client:visible />
      </div>
      <Card className="overflow-hidden p-0">
        <div class="border-b border-border bg-surface px-5 py-3 font-mono text-xs text-low">
          june-issue-preview.md
        </div>
        <ol class="space-y-3 p-6 font-mono text-sm leading-7 text-secondary">
          {newsletterIssue.map((item, index) => (
            <li>
              <span class="mr-4 text-low">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  </section>

  <!-- Feedback + FAQ (island) -->
  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader
        eyebrow="Real feedback"
        title="Proof slots are ready for the next client stories."
        description="Testimonials are intentionally marked as placeholders until real quotes can replace them."
      />
      <div class="mt-10 grid gap-5 md:grid-cols-3">
        {feedbackCards.map((card) => (
          <Card className="flex h-full flex-col gap-5">
            <p class="text-[0.98rem] leading-7 text-secondary">"{card.testimonial}"</p>
            <div class="mt-auto border-t border-border pt-4">
              <p class="font-display text-lg font-semibold text-white">{card.name}</p>
              <p class="text-sm text-low">{card.designation} / {card.company}</p>
            </div>
          </Card>
        ))}
      </div>

      <div class="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Questions"
          title="Common decisions before booking."
          description="The right service depends mostly on whether you need clarity, implementation, or a scoped MVP plan."
        />
        <FAQAccordion client:visible />
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section id="contact" class={sectionClass}>
    <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Book a call</p>
          <h2 class="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight text-white">
            Bring me your idea, blocker or product goal.
          </h2>
          <p class="mt-5 max-w-prose text-lg leading-8 text-secondary">
            We will clarify what should happen next: coaching, a focused development block, an MVP workshop or a custom build proposal.
          </p>
        </div>
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Book a call
          <span aria-hidden="true">-&gt;</span>
        </Button>
      </div>
    </Card>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add homepage index.astro with all 10 sections and React islands"
```

---

## Task 13: about.astro

**Files:** `src/pages/about.astro`

- [ ] **Step 1: Create about.astro**

```astro
---
import PageLayout from '../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../components/ui';
import { CALENDLY_URL, experiences, technologies } from '../config/constants';

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const coreStack = ["Next.js", "Express", "PostgreSQL", "Supabase", "Cloudflare", "OpenAI API", "Claude API"];
const AI_TOOLS = new Set(["OpenAI API", "Claude API"]);
const allTech = Array.from(new Set([...coreStack, ...technologies.map((t) => t.name)]));
---

<PageLayout
  title="About — fullstackchris.dev"
  description="Christophe Crognier is a full-stack web developer and independent programming teacher with over 7,000 hours of teaching experience, specialised in React, Node.js, TypeScript and AI-assisted web development."
>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <Badge variant="accent">About</Badge>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
        Developer execution and teaching clarity for web builders.
      </h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
        I am Christophe Crognier — a full-stack web developer and independent programming teacher with over 7,000 hours of technical instruction across Bachelor and Master programs.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Book a call <span aria-hidden="true"> →</span>
        </Button>
        <Button href="/services" variant="secondary" size="lg">View services</Button>
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="What I do" title="Two roles, one clear purpose." description="I work as a developer and a teacher. Both inform each other." />
    <div class="mt-10 grid gap-5 md:grid-cols-2">
      <Card hover className="flex flex-col gap-4">
        <p class="font-mono text-sm text-accent">developer</p>
        <h3 class="font-display text-2xl font-semibold text-white">Full-stack web developer</h3>
        <p class="text-[0.95rem] leading-7 text-secondary">I design and build custom web applications from concept to production using React, Node.js, TypeScript, PostgreSQL and modern DevOps practices.</p>
        <Button href="/projects" variant="secondary" size="sm" className="mt-auto w-fit">View projects</Button>
      </Card>
      <Card hover className="flex flex-col gap-4">
        <p class="font-mono text-sm text-accent">teacher</p>
        <h3 class="font-display text-2xl font-semibold text-white">Independent programming teacher</h3>
        <p class="text-[0.95rem] leading-7 text-secondary">Over 7,000 hours of technical training across Bachelor and Master programs. I can clarify complex systems for both technical and non-technical stakeholders.</p>
        <Button href="/services/web-project-coaching" variant="secondary" size="sm" className="mt-auto w-fit">Coaching service</Button>
      </Card>
    </div>
  </section>

  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="Technical stack" title="What I work with." />
      <Card className="mt-10">
        <div class="flex flex-wrap gap-3">
          {allTech.map((tech) => (
            <Badge variant={AI_TOOLS.has(tech) ? "accent" : "default"} dot>{tech}</Badge>
          ))}
        </div>
      </Card>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Experience" title="Career highlights." />
    <div class="mt-10 space-y-6">
      {experiences.map((exp) => (
        <Card hover className="flex flex-col gap-3">
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="font-display text-lg font-semibold text-white">{exp.title}</h3>
              <p class="font-mono text-xs uppercase tracking-[0.12em] text-accent">{exp.company_name}</p>
            </div>
            <Badge variant="default">{exp.date}</Badge>
          </div>
          <ul class="space-y-2">
            {exp.points.map((point) => (
              <li class="flex items-start gap-3 text-sm leading-6 text-secondary">
                <span class="mt-1 shrink-0 text-accent">›</span>
                {point}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  </section>

  <section class="border-t border-border bg-surface/55">
    <div class={sectionClass}>
      <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Get in touch</p>
            <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">Bring me your web project.</h2>
            <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">I help founders, freelancers and small teams clarify, build and launch web products.</p>
          </div>
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Book a call <span aria-hidden="true"> →</span>
          </Button>
        </div>
      </Card>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about.astro with experience timeline and tech stack"
```

---

## Task 14: contact.astro

**Files:** `src/pages/contact.astro`

- [ ] **Step 1: Create contact.astro**

```astro
---
import PageLayout from '../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../components/ui';
import { CALENDLY_URL } from '../config/constants';

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const callSteps = [
  { label: "01", title: "Describe your situation", description: "What you are building, where you are stuck, or what outcome you need." },
  { label: "02", title: "I clarify and ask questions", description: "I will ask about scope, stack, timeline and budget to understand what makes sense." },
  { label: "03", title: "We define the next step", description: "You leave with a clear recommendation: coaching, a development block, a workshop or a custom quote." },
];

const serviceLinks = [
  { slug: "ai-web-development-newsletter", title: "AI newsletter", description: "Monthly practical briefing on AI coding tools and web development workflows." },
  { slug: "web-project-coaching", title: "Web project coaching", description: "One-on-one technical guidance for blocked projects and messy codebases." },
  { slug: "full-stack-development-day", title: "Development day", description: "Focused half-day or full-day delivery on a scoped bug, feature or task." },
  { slug: "mvp-bootstrapping-workshop", title: "MVP workshop", description: "Turn your product idea into a realistic scope, roadmap and build plan." },
  { slug: "mvp-development", title: "Custom MVP", description: "Full-stack React and Node.js MVP from product scope to production deployment." },
];
---

<PageLayout
  title="Contact — fullstackchris.dev"
  description="Book a free 30-minute discovery call with Christophe Crognier, full-stack web developer and web project coach."
>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <Badge variant="accent">Contact</Badge>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
        Let's talk about your project.
      </h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
        Book a free 30-minute discovery call. We will identify what you need and whether I can help.
      </p>
      <div class="mt-8">
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Book a free discovery call <span aria-hidden="true"> →</span>
        </Button>
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="What to expect" title="A focused 30-minute conversation." description="Bring your project, your blocker or your product idea. We will determine the right next step together." />
    <div class="mt-10 grid gap-4 sm:grid-cols-3">
      {callSteps.map((step) => (
        <Card hover>
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-accent">{step.label}</p>
          <h3 class="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
          <p class="mt-2 text-sm leading-6 text-secondary">{step.description}</p>
        </Card>
      ))}
    </div>
  </section>

  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="Already know what you need?" title="Go straight to the right service." />
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceLinks.map((service) => (
          <Card hover className="flex flex-col gap-3">
            <h3 class="font-display text-lg font-semibold text-white">{service.title}</h3>
            <p class="text-sm leading-6 text-secondary">{service.description}</p>
            <Button href={`/services/${service.slug}`} variant="secondary" size="sm" className="mt-auto w-fit">Learn more</Button>
          </Card>
        ))}
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Ready to book?</p>
          <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">30 minutes. No commitment.</h2>
          <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">Most people walk away with a clearer picture of what to build and how much it will cost.</p>
        </div>
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">Book a call <span aria-hidden="true"> →</span></Button>
      </div>
    </Card>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add contact.astro"
```

---

## Task 15: services/index.astro

**Files:** `src/pages/services/index.astro`

- [ ] **Step 1: Create services/index.astro**

```astro
---
import PageLayout from '../../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../../components/ui';
import { CALENDLY_URL } from '../../config/constants';
import { servicePages } from '../../config/services-data';

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";
---

<PageLayout
  title="Services — fullstackchris.dev"
  description="Web development coaching, focused development days, MVP workshops and custom MVP builds. Five productized services for founders, freelancers and small teams."
>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <Badge variant="accent">All services</Badge>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
        Five ways to work together — from one hour to a full MVP.
      </h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
        Choose the level of engagement that matches your current need. Start small with a coaching session or newsletter, scale up to a development day or MVP build.
      </p>
      <div class="mt-8">
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Not sure where to start? Book a call <span aria-hidden="true"> →</span>
        </Button>
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Services" title="Pick the right engagement for your project." description="Prices are visible up front. Each service has a dedicated page with full details, pricing and FAQ." />
    <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {servicePages.map((service) => (
        <Card hover className="flex h-full flex-col gap-4">
          <Badge variant="accent">{service.badge}</Badge>
          <h3 class="font-display text-[1.35rem] font-semibold leading-tight text-white">
            {service.hero.h1.length > 60 ? service.hero.h1.slice(0, 57) + "…" : service.hero.h1}
          </h3>
          <p class="text-[0.95rem] leading-7 text-secondary">{service.hero.subtitle}</p>
          <div class="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <Button href={`/services/${service.slug}`} variant="primary" size="sm">Learn more</Button>
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">Book a call</Button>
          </div>
        </Card>
      ))}
    </div>
  </section>

  <section class="border-t border-border bg-surface/55">
    <div class={sectionClass}>
      <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Not sure?</p>
            <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">Bring me your idea, blocker or product goal.</h2>
            <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">We will clarify what should happen next: coaching, a focused development block, an MVP workshop or a custom build proposal.</p>
          </div>
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">Book a call <span aria-hidden="true"> →</span></Button>
        </div>
      </Card>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/services/index.astro
git commit -m "feat: add services index page"
```

---

## Task 16: services/[slug].astro

**Files:** `src/pages/services/[slug].astro`

- [ ] **Step 1: Create services/[slug].astro**

```astro
---
import type { GetStaticPaths } from 'astro';
import PageLayout from '../../components/layout/PageLayout.astro';
import FAQAccordion from '../../components/islands/FAQAccordion';
import { Badge, Button, Card, ProcessStep, SectionHeader } from '../../components/ui';
import { CALENDLY_URL } from '../../config/constants';
import { servicePages } from '../../config/services-data';
import type { ServicePageData } from '../../types';

export const getStaticPaths: GetStaticPaths = () =>
  servicePages.map((s) => ({ params: { slug: s.slug }, props: { data: s } }));

interface Props { data: ServicePageData; }
const { data } = Astro.props;

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";
const primaryHref = data.hero.primaryCtaHref ?? CALENDLY_URL;
const primaryTarget = primaryHref === CALENDLY_URL ? "_blank" : undefined;
const primaryRel = primaryHref === CALENDLY_URL ? "noopener noreferrer" : undefined;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": data.hero.h1,
  "description": data.meta.description,
  "provider": {
    "@type": "Person",
    "name": "Christophe Crognier",
    "url": "https://fullstackchris.dev",
  },
  "areaServed": "Worldwide",
  "offers": data.pricing.map((p) => ({
    "@type": "Offer",
    "name": p.label,
    "price": p.price,
    "priceCurrency": "EUR",
  })),
};
---

<PageLayout title={data.meta.title} description={data.meta.description} jsonLd={jsonLd}>
  <!-- Hero -->
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <Badge variant="accent">{data.badge}</Badge>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">{data.hero.h1}</h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">{data.hero.subtitle}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={primaryHref} target={primaryTarget} rel={primaryRel} size="lg">
          {data.hero.primaryCta} <span aria-hidden="true"> →</span>
        </Button>
        <Button href="/services" variant="secondary" size="lg">← All services</Button>
      </div>
    </div>
  </section>

  <!-- Pain points -->
  <section class={sectionClass}>
    <SectionHeader eyebrow="The problem" title="Sound familiar?" />
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.painPoints.map((point) => (
        <Card hover className="text-[0.95rem] leading-7 text-secondary">{point}</Card>
      ))}
    </div>
  </section>

  <!-- Included -->
  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="What you get" title="Everything included." />
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.included.map((item) => (
          <Card hover>
            <h3 class="font-display text-lg font-semibold text-white">{item.title}</h3>
            <p class="mt-2 text-sm leading-6 text-secondary">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class={sectionClass}>
    <SectionHeader eyebrow="Pricing" title="Clear prices, no surprises." />
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.pricing.map((row) => (
        <Card glow={row.featured} hover className="flex flex-col gap-4">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-accent">{row.label}</p>
          <p class="font-display text-3xl font-bold leading-none text-white">{row.price}</p>
          <Button href={primaryHref} target={primaryTarget} rel={primaryRel} variant={row.featured ? "primary" : "secondary"} size="sm" className="mt-auto">
            {data.hero.primaryCta}
          </Button>
        </Card>
      ))}
    </div>
    {data.pricingNote && <p class="mt-6 text-sm leading-7 text-low">{data.pricingNote}</p>}
  </section>

  <!-- Good fit / Not a fit (optional) -->
  {data.goodFit && (
    <section class="border-y border-border bg-surface/55">
      <div class={sectionClass}>
        <SectionHeader eyebrow="Is this right for you?" title="Good fit and not a fit." />
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <p class="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-positive">Good fit</p>
            <ul class="space-y-3">
              {data.goodFit.map((item) => (
                <li class="flex items-start gap-3 text-sm leading-6 text-secondary">
                  <span class="mt-0.5 shrink-0 text-positive">✓</span>{item}
                </li>
              ))}
            </ul>
          </Card>
          {data.notAFit && (
            <Card>
              <p class="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-negative">Not a fit</p>
              <ul class="space-y-3">
                {data.notAFit.map((item) => (
                  <li class="flex items-start gap-3 text-sm leading-6 text-secondary">
                    <span class="mt-0.5 shrink-0 text-negative">✗</span>{item}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </section>
  )}

  <!-- Process (optional) -->
  {data.processSteps && (
    <section class={sectionClass}>
      <SectionHeader eyebrow="How it works" title="A clear process." />
      <div class="mt-10">
        {data.processSteps.map((step, index) => (
          <ProcessStep number={index + 1} title={step.title} isLast={index === data.processSteps!.length - 1}>
            {step.description}
          </ProcessStep>
        ))}
      </div>
    </section>
  )}

  <!-- FAQ (island) -->
  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader eyebrow="Questions" title="Common questions answered." />
        <FAQAccordion faqs={data.faqs} client:visible />
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class={sectionClass}>
    <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">{data.hero.primaryCta}</p>
          <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">Ready to get started?</h2>
          <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">{data.hero.subtitle}</p>
        </div>
        <Button href={primaryHref} target={primaryTarget} rel={primaryRel} size="lg">
          {data.hero.primaryCta} <span aria-hidden="true"> →</span>
        </Button>
      </div>
    </Card>
  </section>
</PageLayout>
```

**Note:** The service `[slug].astro` passes `faqs={data.faqs}` to `FAQAccordion`. Update `FAQAccordion.tsx` to accept an optional `faqs` prop, falling back to the global `faqs` from constants when not provided:

```tsx
import type { FAQ } from "../../types";
import { faqs as globalFaqs } from "../../config/constants";
import { FAQItem } from "../ui";

interface Props {
  faqs?: FAQ[];
}

const FAQAccordion = ({ faqs = globalFaqs }: Props) => (
  <div>
    {faqs.map((faq, index) => (
      <FAQItem key={faq.question} question={faq.question} defaultOpen={index === 0}>
        {faq.answer}
      </FAQItem>
    ))}
  </div>
);

export default FAQAccordion;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/services/[slug].astro src/components/islands/FAQAccordion.tsx
git commit -m "feat: add dynamic service page [slug].astro with JSON-LD and flexible FAQAccordion"
```

---

## Task 17: projects/index.astro

**Files:** `src/pages/projects/index.astro`

- [ ] **Step 1: Create projects/index.astro**

```astro
---
import PageLayout from '../../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../../components/ui';
import { CALENDLY_URL, projects } from '../../config/constants';

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";
---

<PageLayout
  title="Projects — fullstackchris.dev"
  description="Full-stack web project case studies: scheduling systems, music games, transit geography games and prediction platforms built with React, Node.js and TypeScript."
>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <Badge variant="accent">Case studies</Badge>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
        Projects built for real problems.
      </h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
        Each case study covers the problem, architecture, technical challenges, results and lessons learned.
      </p>
      <div class="mt-8">
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Start a similar project <span aria-hidden="true"> →</span>
        </Button>
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Portfolio" title="Shipped products with real case studies." description="Open each project to read the full architecture, challenges and results." />
    <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <Card hover className="flex h-full flex-col gap-4">
          {project.image && (
            <div class="overflow-hidden rounded-md border border-border">
              <img src={project.image} alt={project.name} class="h-48 w-full object-cover" loading="lazy" />
            </div>
          )}
          <div class="flex flex-wrap gap-2">
            {project.tags.map((tag) => <Badge variant="default">{tag.name}</Badge>)}
          </div>
          <h3 class="font-display text-[1.25rem] font-semibold leading-tight text-white">{project.name}</h3>
          <p class="text-[0.95rem] leading-7 text-secondary">{project.description}</p>
          <div class="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <Button href={`/projects/${project.slug}`} variant="primary" size="sm">View case study</Button>
            {project.live_link && (
              <Button href={project.live_link} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">Live site</Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  </section>

  <section class="border-t border-border bg-surface/55">
    <div class={sectionClass}>
      <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Work with me</p>
            <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">Want to build a product like this?</h2>
            <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">Book an MVP workshop to define the scope, or request a custom quote for a full build.</p>
          </div>
          <div class="flex flex-col gap-3">
            <Button href="/services/mvp-bootstrapping-workshop" variant="primary" size="lg">MVP Workshop</Button>
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">Book a call</Button>
          </div>
        </div>
      </Card>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/projects/index.astro
git commit -m "feat: add projects index page"
```

---

## Task 18: projects/[slug].astro

**Files:** `src/pages/projects/[slug].astro`

- [ ] **Step 1: Create projects/[slug].astro**

```astro
---
import type { GetStaticPaths } from 'astro';
import PageLayout from '../../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../../components/ui';
import { CALENDLY_URL, projects } from '../../config/constants';
import type { Project } from '../../types';

export const getStaticPaths: GetStaticPaths = () =>
  projects.map((p) => ({ params: { slug: p.slug }, props: { project: p } }));

interface Props { project: Project; }
const { project } = Astro.props;
const { caseStudy } = project;

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": `${project.name} — Case Study`,
  "description": caseStudy.tagline,
  "author": { "@type": "Person", "name": "Christophe Crognier", "url": "https://fullstackchris.dev" },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Projects", "item": "https://fullstackchris.dev/projects" },
      { "@type": "ListItem", "position": 2, "name": project.name, "item": `https://fullstackchris.dev/projects/${project.slug}` },
    ],
  },
};
---

<PageLayout
  title={`${project.name} — Case Study — fullstackchris.dev`}
  description={caseStudy.tagline}
  jsonLd={jsonLd}
>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <div class="flex flex-wrap gap-2">
        {project.tags.map((tag) => <Badge variant="default">{tag.name}</Badge>)}
      </div>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">{project.name}</h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">{caseStudy.tagline}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        {project.live_link && (
          <Button href={project.live_link} target="_blank" rel="noopener noreferrer" size="lg">
            View live site <span aria-hidden="true"> →</span>
          </Button>
        )}
        <Button href={project.source_code_link} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">Source code</Button>
        <Button href="/projects" variant="secondary" size="lg">← All projects</Button>
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="The problem" title="What needed solving." />
    <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">{caseStudy.problem}</Card>
  </section>

  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="Context" title="Who it was built for." />
      <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">{caseStudy.context}</Card>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Technical challenges" title="The hard parts." />
    <div class="mt-10 grid gap-4 sm:grid-cols-2">
      {caseStudy.technicalChallenges.map((challenge, index) => (
        <Card hover>
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-accent">Challenge {String(index + 1).padStart(2, "0")}</p>
          <p class="mt-3 text-[0.95rem] leading-7 text-secondary">{challenge}</p>
        </Card>
      ))}
    </div>
  </section>

  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="Architecture" title="How it was designed." />
      <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">{caseStudy.architecture}</Card>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Implementation" title="What was actually built." />
    <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">{caseStudy.implementation}</Card>
  </section>

  <section class="border-y border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="Results" title="What it achieved." />
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudy.results.map((result, index) => (
          <Card glow={index === 0} hover>
            <p class="font-mono text-xs uppercase tracking-[0.14em] text-positive">Result {String(index + 1).padStart(2, "0")}</p>
            <p class="mt-3 text-[0.95rem] leading-7 text-secondary">{result}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Lessons learned" title="What this project taught." />
    <div class="mt-10 max-w-3xl space-y-5">
      {caseStudy.lessonsLearned.map((lesson, index) => (
        <div class="flex items-start gap-4">
          <span class="mt-1 shrink-0 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
          <p class="text-[0.95rem] leading-7 text-secondary">{lesson}</p>
        </div>
      ))}
    </div>
  </section>

  {project.images.length > 0 && (
    <section class="border-y border-border bg-surface/55">
      <div class={sectionClass}>
        <SectionHeader eyebrow="Gallery" title="Screenshots." />
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.map((img, index) => (
            <div class="overflow-hidden rounded-lg border border-border">
              <img src={img} alt={`${project.name} screenshot ${index + 1}`} class="h-56 w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )}

  <section class={sectionClass}>
    <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
      <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Work with me</p>
          <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">Want to build a product like this?</h2>
          <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">Book an MVP workshop to define the scope, or request a custom quote for a full build.</p>
        </div>
        <div class="flex flex-col gap-3">
          <Button href="/services/mvp-bootstrapping-workshop" variant="primary" size="lg">MVP Workshop</Button>
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">Book a call</Button>
        </div>
      </div>
    </Card>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "feat: add dynamic project case study page with Article JSON-LD and breadcrumbs"
```

---

## Task 19: MDX blog files

**Files:** `src/content/blog/*.mdx` (5 files)

- [ ] **Step 1: Create all 5 MDX placeholder files**

`src/content/blog/ai-web-development.mdx`:
```mdx
---
title: "AI Web Development in 2026: Tools, Workflows and What Actually Works"
description: "A practical guide to building web applications with AI-assisted development tools including Claude Code, Cursor and GitHub Copilot."
publishedAt: 2026-06-10
tags: ["AI", "Web development", "Tools"]
comingSoon: true
---

This article is coming soon. Subscribe to the newsletter to get notified when it publishes.
```

`src/content/blog/building-mvp-with-ai.mdx`:
```mdx
---
title: "How to Build an MVP with AI-Assisted Development"
description: "Step-by-step approach to scoping, building and launching a web app MVP using AI coding tools, React and Node.js."
publishedAt: 2026-06-10
tags: ["MVP", "AI", "React", "Node.js"]
comingSoon: true
---

This article is coming soon. Subscribe to the newsletter to get notified when it publishes.
```

`src/content/blog/react-node-typescript.mdx`:
```mdx
---
title: "React + Node.js + TypeScript: The Full-Stack MVP Stack for 2026"
description: "Why this stack is the right choice for founders and small teams who need to move fast without accumulating technical debt."
publishedAt: 2026-06-10
tags: ["React", "Node.js", "TypeScript"]
comingSoon: true
---

This article is coming soon. Subscribe to the newsletter to get notified when it publishes.
```

`src/content/blog/claude-code-workflows.mdx`:
```mdx
---
title: "Claude Code Workflows for Full-Stack Web Development"
description: "Practical Claude Code patterns for React, Node.js and TypeScript development — from component generation to deployment scripts."
publishedAt: 2026-06-10
tags: ["Claude Code", "AI", "TypeScript"]
comingSoon: true
---

This article is coming soon. Subscribe to the newsletter to get notified when it publishes.
```

`src/content/blog/how-much-does-an-mvp-cost.mdx`:
```mdx
---
title: "How Much Does a Web App MVP Cost in 2026?"
description: "An honest breakdown of MVP development costs for founders: what drives the price, what to expect at each budget level."
publishedAt: 2026-06-10
tags: ["MVP", "Pricing", "Freelance"]
comingSoon: true
---

This article is coming soon. Subscribe to the newsletter to get notified when it publishes.
```

- [ ] **Step 2: Commit**

```bash
git add src/content/blog/
git commit -m "feat: add 5 MDX blog placeholder files with Zod-validated frontmatter"
```

---

## Task 20: blog/index.astro

**Files:** `src/pages/blog/index.astro`

- [ ] **Step 1: Create blog/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../../components/ui';

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";
const articles = await getCollection('blog');
---

<PageLayout
  title="Blog — fullstackchris.dev"
  description="Practical articles on AI-assisted web development, MVP building, React and Node.js for founders and developers."
>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <Badge variant="accent">Blog</Badge>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
        AI and web development resources for builders.
      </h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
        Practical articles on AI-assisted development, MVP building, React, Node.js and TypeScript for founders, freelancers and developers.
      </p>
    </div>
  </section>

  <section class={sectionClass}>
    <SectionHeader eyebrow="Articles" title="Coming soon." description="These articles are in progress. Subscribe to the newsletter to get notified when they publish." />
    <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <Card hover className="flex h-full flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            {article.data.tags.map((tag: string) => <Badge variant="default">{tag}</Badge>)}
            {article.data.comingSoon && <Badge variant="accent">Coming soon</Badge>}
          </div>
          <h3 class="font-display text-[1.15rem] font-semibold leading-tight text-white">{article.data.title}</h3>
          <p class="text-[0.95rem] leading-7 text-secondary">{article.data.description}</p>
          <div class="mt-auto border-t border-border pt-4">
            <Button href={`/blog/${article.slug}`} variant="secondary" size="sm">Read article</Button>
          </div>
        </Card>
      ))}
    </div>
  </section>

  <section class="border-t border-border bg-surface/55">
    <div class={sectionClass}>
      <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Get notified</p>
            <h2 class="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">New articles in your inbox.</h2>
            <p class="mt-4 max-w-prose text-lg leading-8 text-secondary">The AI web development newsletter covers tools, workflows and product ideas for developers and founders.</p>
          </div>
          <Button href="/services/ai-web-development-newsletter" variant="primary" size="lg">Join the newsletter</Button>
        </div>
      </Card>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: add blog index driven by Astro content collection"
```

---

## Task 21: blog/[slug].astro

**Files:** `src/pages/blog/[slug].astro`

- [ ] **Step 1: Create blog/[slug].astro**

```astro
---
import type { GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import PageLayout from '../../components/layout/PageLayout.astro';
import { Badge, Button, Card, SectionHeader } from '../../components/ui';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
};

const { post } = Astro.props;
const { Content } = await post.render();

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const relatedServices = [
  { slug: "web-project-coaching", title: "Web project coaching", description: "Get hands-on guidance on your project or blocker." },
  { slug: "full-stack-development-day", title: "Development day", description: "Book a focused development session." },
  { slug: "mvp-bootstrapping-workshop", title: "MVP workshop", description: "Turn your idea into a realistic build plan." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.data.title,
  "description": post.data.description,
  "datePublished": post.data.publishedAt.toISOString(),
  "author": { "@type": "Person", "name": "Christophe Crognier", "url": "https://fullstackchris.dev" },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Blog", "item": "https://fullstackchris.dev/blog" },
      { "@type": "ListItem", "position": 2, "name": post.data.title, "item": `https://fullstackchris.dev/blog/${post.slug}` },
    ],
  },
};
---

<PageLayout title={`${post.data.title} — fullstackchris.dev`} description={post.data.description} jsonLd={jsonLd}>
  <section class="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div class={`${sectionClass} py-24`}>
      <div class="flex flex-wrap gap-2">
        {post.data.tags.map((tag: string) => <Badge variant="default">{tag}</Badge>)}
        {post.data.comingSoon && <Badge variant="accent">Coming soon</Badge>}
      </div>
      <h1 class="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
        {post.data.title}
      </h1>
      <p class="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">{post.data.description}</p>
      <Button href="/blog" variant="secondary" size="sm" className="mt-8" aria-label="Back to all articles">
        <span aria-hidden="true">←</span> All articles
      </Button>
    </div>
  </section>

  {post.data.comingSoon ? (
    <section class={sectionClass}>
      <Card className="mx-auto max-w-3xl p-10 sm:p-14">
        <div class="flex flex-col items-center gap-6 py-10 text-center">
          <Badge variant="accent">Coming soon</Badge>
          <h2 class="font-display text-2xl font-semibold text-white">This article is in progress.</h2>
          <p class="max-w-prose text-secondary">I am working on this article. Subscribe to the AI web development newsletter to get notified when it publishes.</p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <Button href="/services/ai-web-development-newsletter" variant="primary" size="lg">Join the newsletter</Button>
            <Button href="/blog" variant="secondary" size="lg">Back to blog</Button>
          </div>
        </div>
      </Card>
    </section>
  ) : (
    <section class={sectionClass}>
      <article class="prose prose-invert mx-auto max-w-3xl">
        <Content />
      </article>
    </section>
  )}

  <section class="border-t border-border bg-surface/55">
    <div class={sectionClass}>
      <SectionHeader eyebrow="While you wait" title="Work with me directly." />
      <div class="mt-10 grid gap-4 sm:grid-cols-3">
        {relatedServices.map((service) => (
          <Card hover className="flex flex-col gap-3">
            <h3 class="font-display text-lg font-semibold text-white">{service.title}</h3>
            <p class="text-sm leading-6 text-secondary">{service.description}</p>
            <Button href={`/services/${service.slug}`} variant="secondary" size="sm" className="mt-auto w-fit">Learn more</Button>
          </Card>
        ))}
      </div>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog/[slug].astro
git commit -m "feat: add dynamic blog article page with MDX rendering and Article JSON-LD"
```

---

## Task 22: Verify full build

- [ ] **Step 1: Run the build**

```bash
pnpm build
```

Expected: Astro outputs `dist/` with 14+ HTML files. No TypeScript errors. No unresolved imports.

- [ ] **Step 2: Check generated files exist**

```bash
ls dist/
ls dist/services/
ls dist/projects/
ls dist/blog/
```

Expected output includes:
```
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
projects/edumation/index.html  (and 4 more)
blog/index.html
blog/ai-web-development/index.html  (and 4 more)
```

- [ ] **Step 3: Verify SEO in a generated file**

```bash
grep -l "application/ld+json" dist/services/web-project-coaching/index.html
grep "og:title" dist/index.html
```

Both should return content (not empty).

- [ ] **Step 4: If build fails, fix TypeScript errors before continuing**

Common issues:
- Missing `FAQ` type export from `src/types/index.ts` — add `FAQ` to the export if not already there
- `ServicePageData` missing `hero.primaryCtaHref` or `hero.secondaryCtaHref` — these are optional fields; add `?:` in the type
- Image imports typed as `string` vs `ImageMetadata` — cast to `string` in `.astro` `src` attributes if needed

---

## Task 23: Update ROADMAP.md

**Files:** `ROADMAP.md`

- [ ] **Step 1: Mark Phase 8 complete and update verification checklist**

In `ROADMAP.md`, update Phase 8 header and all checkboxes:

```markdown
## Phase 8 - Framework Migration For SEO ✅

Migration complete. Astro + React islands, pure static output, deployed on Cloudflare Pages.

```txt
[x] Static HTML for homepage.
[x] Static HTML for services.
[x] Static HTML for projects.
[x] Static HTML for about.
[x] Static HTML for contact.
[x] Static HTML for blog.
[x] Per-page metadata.
[x] MDX support for blog and case studies.
[x] Cloudflare Pages-compatible build output.
[x] React retained only where interactivity is needed.
```
```

Also update the Verification Checklist at the bottom — mark all items that are now resolved:

```markdown
[x] pnpm install completes.
[x] pnpm dev loads the site.
[x] pnpm build completes without TypeScript errors.
[x] Homepage sections render in Relume order.
[x] Header navigation and mobile hamburger work.
[x] All Book a call CTAs use CALENDLY_URL.
[x] Case study modal opens, closes, and uses new styling.
[x] No Three.js dependencies or canvas imports remain.
[x] No legacy Poppins or old purple background/accent tokens remain.
[x] Sitemap includes all planned URLs.
[x] Robots file references https://fullstackchris.dev/sitemap.xml.
```

- [ ] **Step 2: Commit**

```bash
git add ROADMAP.md
git commit -m "docs: mark Phase 8 complete in ROADMAP.md"
```

---

## Task 24: Write docs/astro-architecture.md

**Files:** `docs/astro-architecture.md`

- [ ] **Step 1: Create the architecture doc**

```markdown
# Astro Architecture — fullstackchris.dev

## What Astro Does

Astro is a web framework that generates static HTML files at build time. Unlike the previous React/Vite SPA, every URL now has its own pre-rendered `.html` file in `dist/`. When Cloudflare Pages serves `/services/web-project-coaching`, the user receives a complete HTML page with all content — no JavaScript required to see the page.

## How the Build Works

```
pnpm build
  → Astro reads src/pages/**/*.astro
  → Generates one HTML file per route
  → Bundles React islands into separate JS chunks
  → Outputs everything to dist/
```

Cloudflare Pages serves `dist/` directly from its CDN. The build command and output directory are unchanged from the Vite setup.

## File-Based Routing

| File | Route |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/about.astro` | `/about` |
| `src/pages/contact.astro` | `/contact` |
| `src/pages/services/index.astro` | `/services` |
| `src/pages/services/[slug].astro` | `/services/:slug` |
| `src/pages/projects/index.astro` | `/projects` |
| `src/pages/projects/[slug].astro` | `/projects/:slug` |
| `src/pages/blog/index.astro` | `/blog` |
| `src/pages/blog/[slug].astro` | `/blog/:slug` |

Dynamic routes (`[slug].astro`) use `getStaticPaths()` to enumerate all slugs at build time. For services and projects, slugs come from TypeScript data files. For blog, slugs come from the content collection.

## .astro File Anatomy

```astro
---
// Frontmatter (runs at build time, never in the browser)
import Layout from '../components/layout/PageLayout.astro';
import { Button } from '../components/ui';
import { myData } from '../config/constants';
---

<!-- Template (HTML + JSX-like expressions) -->
<Layout title="Page title" description="Meta description">
  <h1>{myData.title}</h1>
  <Button href="/contact">Contact</Button>
</Layout>
```

The frontmatter block runs **once at build time**. No code inside `---` reaches the browser.

## React Islands

Islands are the only JavaScript that ships to the browser. There are four:

| Island | File | Directive | Why |
|---|---|---|---|
| Navigation | `src/components/islands/SiteHeader.tsx` | `client:load` | Hamburger menu needs state immediately |
| Project modal | `src/components/islands/ProjectsModal.tsx` | `client:load` | Modal triggered on homepage card click |
| FAQ accordion | `src/components/islands/FAQAccordion.tsx` | `client:visible` | Below the fold, lazy hydration saves JS |
| Newsletter form | `src/components/islands/NewsletterForm.tsx` | `client:visible` | Below the fold, lazy hydration saves JS |

**`client:load`** — hydrates immediately when the page loads.  
**`client:visible`** — hydrates only when the component scrolls into view.  
**No directive** — component rendered to HTML at build time, zero JS shipped.

All UI primitives (`Badge`, `Card`, `Button`, `SectionHeader`, `ServiceCard`, `PricingCard`, `ProcessStep`, `FAQItem`) are server-rendered. They are React components but Astro renders them at build time — no hydration, no JS bundle.

## Content Collections (Blog)

Blog articles live in `src/content/blog/*.mdx`. Each file has a frontmatter block validated by Zod at build time:

```mdx
---
title: "Article Title"
description: "Meta description"
publishedAt: 2026-06-10
tags: ["AI", "Web development"]
comingSoon: false
---

# Article content here
```

To add a real blog article:
1. Create `src/content/blog/your-slug.mdx`
2. Set `comingSoon: false`
3. Write the article body in MDX (Markdown + React components if needed)
4. Run `pnpm build` — the route `/blog/your-slug` is generated automatically

## SEO Per Page

Every page passes `title`, `description`, and optionally `jsonLd` to `PageLayout.astro`, which forwards them to `BaseLayout.astro`. `BaseLayout.astro` injects:
- `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- OpenGraph and Twitter Card tags
- `<script type="application/ld+json">` for structured data

JSON-LD schemas used:
- Homepage: `Person` + `WebSite`
- Service pages: `Service` + `Offer`
- Project pages: `Article` + `BreadcrumbList`
- Blog articles: `Article` + `BreadcrumbList`

## Adding a New Page

1. Create `src/pages/new-page.astro`
2. Import `PageLayout` and pass `title` + `description`
3. Add the route to `public/sitemap.xml`
4. Add a nav link in `src/config/constants.ts` `navLinks` if needed

## Adding a New Service Page

1. Add a new entry to `servicePages` in `src/config/services-data.ts`
2. The `[slug].astro` dynamic route picks it up automatically at build time
3. Update `public/sitemap.xml` to include the new URL

## Local Development

```bash
pnpm dev      # starts Astro dev server at http://localhost:4321
pnpm build    # builds to dist/
pnpm preview  # previews the dist/ build at http://localhost:4321
```
```

- [ ] **Step 2: Commit**

```bash
git add docs/astro-architecture.md
git commit -m "docs: add astro-architecture.md explaining routing, islands, MDX, and SEO"
```

---

## Task 25: Final cleanup commit

- [ ] **Step 1: Verify no leftover Vite or React Router references**

```bash
grep -r "react-router-dom\|react-helmet-async\|vite.config" src/ --include="*.ts" --include="*.tsx" --include="*.astro"
```

Expected: no output (zero matches).

- [ ] **Step 2: Verify island count — only 4 `client:` directives in pages**

```bash
grep -r "client:" src/pages/ --include="*.astro"
```

Expected: exactly 4 matches — `client:load` on SiteHeader (homepage), `client:load` on ProjectsModal (homepage), `client:visible` on FAQAccordion (homepage and service pages), `client:visible` on NewsletterForm (homepage).

- [ ] **Step 3: Push the branch**

```bash
git push -u origin feat/astro-migration
```

- [ ] **Step 4: Final status check**

```bash
git log --oneline -15
```

Expected: ~15 commits for the migration, all on `feat/astro-migration`.
```
