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
[ ] Migrate package management from npm to pnpm.
[ ] Import existing lockfile with pnpm import.
[ ] Remove package-lock.json and regenerate dependencies through pnpm-lock.yaml.
[ ] Add TypeScript with strict config.
[ ] Rename Vite config to vite.config.ts.
[ ] Rename React entry files from .jsx to .tsx.
[ ] Create src/types/index.ts.
[ ] Rewrite src/config/constants.js as typed src/config/constants.ts.
[ ] Rename src/config/motion.js to src/config/motion.ts.
[ ] Remove Three.js dependencies: three, @react-three/fiber, @react-three/drei, maath.
[ ] Delete src/canvas/.
[ ] Remove unused legacy structure: src/store/, src/pages/, src/styles.js, old HOC wrapper if replaced.
[ ] Add Google Fonts: Space Grotesk, Hanken Grotesk, JetBrains Mono.
[ ] Replace legacy purple/Poppins token system with Claude Design CSS variables.
[ ] Update Tailwind config to expose Claude Design colors, fonts, radius, shadows, and max widths.
```

## Phase 1 - Design System And UI Primitives

```txt
[ ] Add reusable Badge primitive.
[ ] Add reusable Button primitive.
[ ] Add reusable SectionHeader primitive.
[ ] Add reusable Card primitive.
[ ] Add reusable ServiceCard primitive.
[ ] Add reusable PricingCard primitive.
[ ] Add reusable ProjectCard primitive.
[ ] Add reusable ProcessStep primitive.
[ ] Add reusable FAQItem primitive.
[ ] Support primary / secondary / ghost button variants.
[ ] Support default / accent / positive badge variants.
[ ] Support featured pricing card variant.
[ ] Support card hover and glow states.
[ ] Keep styling aligned with design/claude-design/styles.css.
```

## Phase 2 - Layout Shell

```txt
[ ] Create sticky blurred Header.
[ ] Add desktop nav item: Home.
[ ] Add desktop nav item: Services.
[ ] Add desktop nav item: Projects.
[ ] Add desktop nav item: Blog.
[ ] Add desktop nav item: About.
[ ] Add desktop nav item: Contact.
[ ] Add persistent Book a call CTA using CALENDLY_URL.
[ ] Add responsive hamburger below 900px.
[ ] Create 4-column Footer with Services.
[ ] Create 4-column Footer with Projects.
[ ] Create 4-column Footer with Blog / resources.
[ ] Create 4-column Footer with Contact / social / legal.
[ ] Rewrite App.tsx to compose the new homepage sections.
```

## Phase 3 - Homepage Sections

Build the homepage in this exact order:

```txt
[ ] Sticky header.
[ ] Hero with headline, subtitle, two CTAs, three meta stats, glow-bg, and grid-bg.
[ ] Three ways to work: coaching, development, MVP.
[ ] What gets built here: stats mosaic.
[ ] Five services: all priced service cards.
[ ] Recent projects: full project grid with modal.
[ ] How we work: numbered process timeline.
[ ] Tech stack: badge cluster.
[ ] Pick your plan: pricing tiers.
[ ] Newsletter CTA: email capture UI and issue preview code block.
[ ] Real feedback: placeholder testimonial cards.
[ ] Questions: FAQ accordion.
[ ] Book a call: final Calendly CTA section.
[ ] Footer.
```

Acceptance criteria:

```txt
[ ] No Three.js scenes remain.
[ ] No old #050816, #915eff, or Poppins usage remains.
[ ] Hero and CTA visual effects are CSS-based.
[ ] Project cards open the reskinned CaseStudyModal.
[ ] Escape closes the modal.
```

## Phase 4 - SEO Baseline For Current SPA

```txt
[ ] Update index.html title and meta description.
[ ] Add OpenGraph tags.
[ ] Add Twitter card tags.
[ ] Add canonical URL for homepage.
[ ] Add JSON-LD Person schema for Christophe.
[ ] Create public/sitemap.xml.
[ ] Create public/robots.txt.
[ ] Include all planned URLs from REFONTE_COMPLETE.md in sitemap even before routes exist.
[ ] Confirm /sitemap.xml is served by Vite and Cloudflare Pages.
[ ] Confirm /robots.txt is served by Vite and Cloudflare Pages.
```

## Phase 5 - Service Landing Pages

Blocked by the routing/framework decision unless the project intentionally stays SPA temporarily.

Pages to create later:

```txt
[ ] /services
[ ] /services/ai-web-development-newsletter
[ ] /services/web-project-coaching
[ ] /services/full-stack-development-day
[ ] /services/mvp-bootstrapping-workshop
[ ] /services/mvp-development
```

Each page must include:

```txt
[ ] Unique title and meta description.
[ ] One clear H1.
[ ] Problem / outcome / offer / proof / FAQ / CTA structure.
[ ] Pricing visible without excessive scrolling.
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
[ ] Sitemap includes all planned URLs.
[ ] Robots file references https://fullstackchris.dev/sitemap.xml.
```

Assumptions:

- The immediate implementation remains React + Vite + Cloudflare Pages.
- Astro or Next.js is intentionally deferred until the redesigned content and homepage structure are stable.
- The sitemap may include future URLs before their pages exist because it is part of the planned SEO architecture.
- The current CaseStudyModal behavior should be preserved and only visually reskinned.
- Newsletter signup, Stripe, forms, and analytics are future integrations, not part of the immediate homepage rebuild.
