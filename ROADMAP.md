# ROADMAP.md

## Product Direction

The site is moving from a classic developer portfolio to a service-oriented conversion site for `fullstackchris.dev`.

Core positioning:

```txt
Developer execution + teaching clarity + AI-assisted workflows.
```

The site should generate independent revenue through:

- AI web development newsletter.
- Web project coaching.
- Full-stack development days.
- MVP bootstrapping workshops.
- Custom MVP development.

Primary audience:

- Founders.
- Freelancers.
- Small teams.
- Junior developers / learners.
- Small businesses needing focused web development.

Immediate product direction:

- Rebuild the current React/Vite SPA first.
- Use the Claude Design system from `design/claude-design/` as the visual source of truth.
- Use the Relume homepage structure as the homepage source of truth.
- Treat the SPA remake as the first implementation target, not the final SEO architecture.
- Defer Astro vs Next.js until the homepage, services, project content, and conversion structure are stable.

## Phase 0 - Foundation And Migration

```txt
[x] Migrate package management from npm to pnpm.
[x] Import existing lockfile with pnpm import.
[x] Remove package-lock.json and regenerate dependencies through pnpm-lock.yaml.
[x] Add TypeScript with strict config.
[x] Rename Vite config to vite.config.ts.
[x] Rename React entry files from .jsx to .tsx.
[x] Create src/types/index.ts.
[x] Rewrite src/config/constants.js as typed src/config/constants.ts.
[x] Rename src/config/motion.js to src/config/motion.ts.
[x] Remove Three.js dependencies: three, @react-three/fiber, @react-three/drei, maath.
[x] Delete src/canvas/.
[x] Remove unused legacy structure: src/store/, src/pages/, src/styles.js, old HOC wrapper if replaced.
[x] Add Google Fonts: Space Grotesk, Hanken Grotesk, JetBrains Mono.
[x] Replace legacy purple/Poppins token system with Claude Design CSS variables.
[x] Update Tailwind config to expose Claude Design colors, fonts, radius, shadows, and max widths.
```

## Phase 1 - Design System And UI Primitives

```txt
[x] Add reusable Badge primitive.
[x] Add reusable Button primitive.
[x] Add reusable SectionHeader primitive.
[x] Add reusable Card primitive.
[x] Add reusable ServiceCard primitive.
[x] Add reusable PricingCard primitive.
[x] Add reusable ProjectCard primitive.
[x] Add reusable ProcessStep primitive.
[x] Add reusable FAQItem primitive.
[x] Support primary / secondary / ghost button variants.
[x] Support default / accent / positive badge variants.
[x] Support featured pricing card variant.
[x] Support card hover and glow states.
[x] Keep styling aligned with design/claude-design/styles.css.
```

## Phase 2 - Layout Shell

```txt
[x] Create sticky blurred Header.
[x] Add desktop nav item: Home.
[x] Add desktop nav item: Services.
[x] Add desktop nav item: Projects.
[x] Add desktop nav item: Blog.
[x] Add desktop nav item: About.
[x] Add desktop nav item: Contact.
[x] Add persistent Book a call CTA using CALENDLY_URL.
[x] Add responsive hamburger below 900px.
[x] Create 4-column Footer with Services.
[x] Create 4-column Footer with Projects.
[x] Create 4-column Footer with Blog / resources.
[x] Create 4-column Footer with Contact / social / legal.
[x] Rewrite App.tsx to compose the new homepage sections.
```

## Phase 3 - Homepage Sections

Build the homepage in this exact order:

```txt
[x] Sticky header.
[x] Hero with headline, subtitle, two CTAs, three meta stats, glow-bg, and grid-bg.
[x] Three ways to work: coaching, development, MVP.
[x] What gets built here: stats mosaic.
[x] Five services: all priced service cards.
[x] Recent projects: full project grid with modal.
[x] How we work: numbered process timeline.
[x] Tech stack: badge cluster.
[x] Pick your plan: pricing tiers.
[x] Newsletter CTA: email capture UI and issue preview code block.
[x] Real feedback: placeholder testimonial cards.
[x] Questions: FAQ accordion.
[x] Book a call: final Calendly CTA section.
[x] Footer.
```

Acceptance criteria:

```txt
[x] No Three.js scenes remain.
[x] No old #050816, #915eff, or Poppins usage remains.
[x] Hero and CTA visual effects are CSS-based.
[x] Project cards open the reskinned CaseStudyModal.
[x] Escape closes the modal.
```

## Phase 4 - SEO Baseline For Current SPA

```txt
[x] Update index.html title and meta description.
[x] Add OpenGraph tags.
[x] Add Twitter card tags.
[x] Add canonical URL for homepage.
[x] Add JSON-LD Person schema for Christophe.
[x] Create public/sitemap.xml.
[x] Create public/robots.txt.
[x] Include all planned URLs from REFONTE_COMPLETE.md in sitemap even before routes exist.
[x] Confirm /sitemap.xml is served by Vite and Cloudflare Pages.
[x] Confirm /robots.txt is served by Vite and Cloudflare Pages.
```

## Phase 5 - Service Landing Pages ✅

Implemented as React Router routes within the SPA. JSON-LD deferred to Phase 8 (framework migration).

```txt
[x] /services
[x] /services/ai-web-development-newsletter
[x] /services/web-project-coaching
[x] /services/full-stack-development-day
[x] /services/mvp-bootstrapping-workshop
[x] /services/mvp-development
```

Each page includes:

```txt
[x] Unique title and meta description.
[x] One clear H1.
[x] Problem / outcome / offer / proof / FAQ / CTA structure.
[x] Pricing visible without excessive scrolling.
[ ] JSON-LD Service data after framework migration.
[ ] JSON-LD Offer data after framework migration.
[ ] JSON-LD FAQPage data after framework migration.
[ ] JSON-LD breadcrumb data after framework migration.
```

## Phase 6 - Project Pages

```txt
[ ] Create /projects.
[ ] Create full Keevo case study page.
[ ] Create full Edumation case study page.
[ ] Create full Singuessr case study page.
[ ] Create full Railguessr case study page.
[ ] Create full FreshWin case study page.
[ ] Reuse existing rich caseStudy data from constants.
[ ] Keep modal on homepage as a fast preview.
[ ] Add project CTA linking to coaching, MVP workshop, or custom MVP development.
```

## Phase 7 - Additional Core Pages

```txt
[ ] Create /about.
[ ] Create /contact.
[ ] Create /blog placeholder index.
[ ] Add future blog article placeholder: /blog/ai-web-development.
[ ] Add future blog article placeholder: /blog/building-mvp-with-ai.
[ ] Add future blog article placeholder: /blog/react-node-typescript.
[ ] Add future blog article placeholder: /blog/claude-code-workflows.
[ ] Add future blog article placeholder: /blog/how-much-does-an-mvp-cost.
```

## Phase 8 - Framework Migration For SEO

Decision to make after Phases 0-7 content is stable:

- Preferred: Astro + React islands.
- Alternative: Next.js static export.
- Avoid long-term pure React SPA for service pages and blog.

Migration acceptance criteria:

```txt
[ ] Static HTML for homepage.
[ ] Static HTML for services.
[ ] Static HTML for projects.
[ ] Static HTML for about.
[ ] Static HTML for contact.
[ ] Static HTML for blog.
[ ] Per-page metadata.
[ ] MDX support for blog and case studies.
[ ] Cloudflare Pages-compatible build output.
[ ] React retained only where interactivity is needed.
```

## Phase 9 - Newsletter, Payments, Analytics

```txt
[ ] Choose newsletter provider: Buttondown, Beehiiv, or MailerLite.
[ ] Add real newsletter signup.
[ ] Add Stripe Payment Links for productized offers.
[ ] Add Calendly or Cal.com booking links.
[ ] Add Plausible or Umami analytics.
[ ] Add Google Search Console.
[ ] Track email capture.
[ ] Track CTA clicks.
```

## Phase 10 - Lead Qualification And Forms

```txt
[ ] Add global contact form.
[ ] Add service-specific intake fields.
[ ] Include budget ranges from REFONTE_COMPLETE.md.
[ ] Use Tally, Formspree, or equivalent no-backend service first.
[ ] Route users toward the right offer based on selected need.
```

Budget ranges to preserve:

```txt
< 500 EUR
500-1,500 EUR
1,500-5,000 EUR
5,000-15,000 EUR
15,000 EUR+
```

## Phase 11 - Autonomous Backend Layer

```txt
[ ] Add Cloudflare Workers when static tools are no longer enough.
[ ] Add D1 or Supabase.
[ ] Add Stripe Checkout.
[ ] Add Stripe webhooks.
[ ] Add Stripe Customer Portal.
[ ] Add paid newsletter access or archive if needed.
[ ] Add lightweight lead/customer storage.
```

## Phase 12 - Full Business Platform

```txt
[ ] Add auth.
[ ] Add admin dashboard.
[ ] Add lightweight CRM.
[ ] Add client portal.
[ ] Add invoices/downloads/resources area.
[ ] Add newsletter archive.
[ ] Add course or private resource area if validated by revenue.
```

## Verification Checklist

```txt
[ ] pnpm install completes.
[ ] pnpm dev loads the site.
[ ] pnpm build completes without TypeScript errors.
[ ] Homepage sections render in Relume order.
[ ] Header navigation and mobile hamburger work.
[ ] All Book a call CTAs use CALENDLY_URL.
[ ] Case study modal opens, closes, and uses new styling.
[ ] No Three.js dependencies or canvas imports remain.
[ ] No legacy Poppins or old purple background/accent tokens remain.
[x] Sitemap includes all planned URLs.
[x] Robots file references https://fullstackchris.dev/sitemap.xml.
```

Assumptions:

- The immediate implementation remains React + Vite + Cloudflare Pages.
- Astro or Next.js is intentionally deferred until the redesigned content and homepage structure are stable.
- The sitemap may include future URLs before their pages exist because it is part of the planned SEO architecture.
- The current CaseStudyModal behavior should be preserved and only visually reskinned.
- Newsletter signup, Stripe, forms, and analytics are future integrations, not part of the immediate homepage rebuild.
