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

Current product direction:

- Continue the Astro static site as the implementation target.
- Keep GitHub Pages as the current deployment target.
- Keep Cloudflare as the domain and DNS management layer.
- Use the Claude Design system from `design/claude-design/` as the visual source of truth.
- Use the Relume homepage structure as the homepage source of truth.
- Prioritize service conversion, SEO content, free lead magnets, and newsletter capture before adding a custom backend.

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

## Phase 6 - Project Pages ✅

```txt
[x] Create /projects.
[x] Create full Keevo case study page.
[x] Create full Edumation case study page.
[x] Create full Singuessr case study page.
[x] Create full Railguessr case study page.
[x] Create full FreshWin case study page.
[x] Reuse existing rich caseStudy data from constants.
[x] Keep modal on homepage as a fast preview.
[x] Add project CTA linking to coaching, MVP workshop, or custom MVP development.
```

## Phase 7 - Additional Core Pages ✅

```txt
[x] Create /about.
[x] Create /contact.
[x] Create /blog placeholder index.
[x] Add future blog article placeholder: /blog/ai-web-development.
[x] Add future blog article placeholder: /blog/building-mvp-with-ai.
[x] Add future blog article placeholder: /blog/react-node-typescript.
[x] Add future blog article placeholder: /blog/claude-code-workflows.
[x] Add future blog article placeholder: /blog/how-much-does-an-mvp-cost.
```

## Phase 8 - Framework Migration For SEO ✅

Migrated from React/Vite SPA to Astro + React islands on branch `feat/astro-migration`.

Choices made:
- Framework: Astro (static output, `output: 'static'`)
- React islands: SiteHeader (client:load), ProjectsModal (client:load), FAQAccordion (client:visible), NewsletterForm (client:visible)
- Blog: Astro content collections with MDX, Zod-validated frontmatter
- Deployment: static output compatible with Cloudflare Pages and GitHub Pages (`pnpm build` -> `dist/`)

Migration acceptance criteria:

```txt
[x] Static HTML for homepage.
[x] Static HTML for services.
[x] Static HTML for projects.
[x] Static HTML for about.
[x] Static HTML for contact.
[x] Static HTML for blog.
[x] Per-page metadata.
[x] MDX support for blog and case studies.
[x] Static hosting-compatible build output.
[x] React retained only where interactivity is needed.
[x] JSON-LD structured data for all page types.
[x] 21 static pages built in under 4 seconds.
```

## Phase 9 - Newsletter, Payments, Analytics

```txt
[x] Choose newsletter provider: Beehiiv.
[x] Add real newsletter signup (NewsletterForm posts to Beehiiv embed endpoint; set BEEHIIV_PUBLICATION_ID in constants.ts).
[x] Add Stripe Payment Links for productized offers (set STRIPE_PAYMENT_LINKS in constants.ts; "Buy now" buttons appear on service pages when links are filled in).
[x] Add Calendly booking link with dark-themed inline embed on /contact (widget.js approach with background_color, text_color, primary_color params).
[x] Cloudflare Web Analytics beacon added to BaseLayout (set CF_ANALYTICS_TOKEN in constants.ts).
[x] Added Google Search Console meta tag support in BaseLayout (pass gscVerification prop if using meta tag method; DNS method needs no code change).
[x] Track email capture (trackEvent("newsletter_signup") fires on successful Beehiiv submit).
[x] Track CTA clicks (data-track attributes + inline script on service pages fires __cfBeacon events for stripe_click and cta_click).
```

## Phase 10 - Content, Freebies, Newsletter And Conversion System

Objective: turn the Astro site into a content and email acquisition engine that attracts solo founders, builders, junior developers, and small teams, then routes them toward newsletter signup, coaching, the AI Clarity Framework workshop, full-stack development services, or future MVP services.

Current context:

```txt
[x] Framework target: Astro static site.
[x] Deployment target: GitHub Pages.
[x] Domain management: Cloudflare.
[x] Newsletter provider: Beehiiv.
[x] English remains the default language.
[ ] Future language routes prepared for /fr and /es.
```

Recommended architecture:

```txt
/blog
  SEO article index with filters or topic groups.

/blog/how-solo-founders-can-use-ai-assisted-development-without-building-a-mess
  Article for solo founders using AI coding tools.

/blog/react-typescript-node-stack-web-app-mvps
  Article for founders and technical profiles choosing an MVP stack.

/blog/web-app-idea-to-mvp-roadmap-ai-clarity-framework
  Article introducing the AI Clarity Framework and workshop.

/freebies
  Lead magnet library with Beehiiv signup CTAs.

/services/*
  Existing service pages updated with newsletter/freebie/internal-link CTAs where relevant.

/
  Homepage updated with blog, freebies, services, and newsletter paths.
```

Content model recommendation:

```txt
[ ] Use Astro content collections for blog posts.
[ ] Store articles as Markdown or MDX under src/content/blog/.
[ ] Validate frontmatter with Zod in the Astro content config.
[ ] Include slug, title, description, publishDate, updatedDate, author, language, canonicalUrl, tags, audience, primaryService, cta, faqs, internalLinks, ogImage, and draft.
[ ] Support article body sections in Markdown/MDX.
[ ] Generate Article JSON-LD from frontmatter and article metadata.
[ ] Generate FAQPage JSON-LD when an article includes FAQ entries.
[ ] Generate BreadcrumbList JSON-LD for blog and freebie pages.
[ ] Keep freebie metadata in a typed data file or content collection.
```

Translation preparation:

```txt
[ ] Keep English routes as canonical default routes for now.
[ ] Add language fields to content records: language, translationKey, translatedFrom, and availableTranslations.
[ ] Model future translated slugs without publishing empty /fr or /es pages yet.
[ ] Plan future routes as /fr/blog/[slug], /es/blog/[slug], /fr/freebies, and /es/freebies.
[ ] Add hreflang only when translated pages actually exist.
[ ] Avoid duplicating CTA logic per language by keeping CTA definitions in shared data files.
```

Components needed:

```txt
[ ] BlogIndexPage layout.
[ ] BlogPostLayout with metadata, article header, content body, FAQ, author/service CTA, and related links.
[ ] ArticleCard for blog previews.
[ ] ArticleMeta component for date, reading time, audience, and tags.
[ ] FAQBlock reusable for article and service FAQs.
[ ] InternalLinksBlock for related services, articles, and freebies.
[ ] NewsletterSignup component using Beehiiv embedded subscribe forms.
[ ] NewsletterInlineCTA for article body and service pages.
[ ] NewsletterSection for homepage and landing pages.
[ ] FreebiesPage layout.
[ ] FreebieCard with title, description, target audience, format/status, and CTA.
[ ] FreebieSignupModal or embedded signup area if Beehiiv forms can tag subscribers per freebie.
[ ] CTAButton or analytics-aware Button wrapper supporting data-analytics attributes.
[ ] SEO component helpers for title, meta description, canonical, OpenGraph, and JSON-LD.
```

Data and content files needed:

```txt
[ ] src/content/blog/how-solo-founders-can-use-ai-assisted-development-without-building-a-mess.mdx
[ ] src/content/blog/react-typescript-node-stack-web-app-mvps.mdx
[ ] src/content/blog/web-app-idea-to-mvp-roadmap-ai-clarity-framework.mdx
[ ] src/content/config.ts or existing Astro collection config updates.
[ ] src/config/freebies.ts for lead magnet metadata, unless freebies become a content collection.
[ ] src/config/newsletter.ts for newsletter name, promise, Beehiiv embed settings, and section structure.
[ ] src/config/analytics.ts for central CTA event names.
[ ] Optional: src/config/internal-links.ts for curated page-to-page linking rules.
```

Initial articles:

```txt
[ ] Article A: "How Solo Founders Can Use AI-Assisted Development Without Building a Mess"
    Goal: attract solo founders using AI coding tools.
    CTA: coaching and AI Clarity Framework workshop.
    Required structure: title, meta description, intro, H2/H3 sections, FAQ, internal links, Article schema, optional FAQ schema.
    Suggested internal links: /services/web-project-coaching, /services/mvp-bootstrapping-workshop, /freebies.

[ ] Article B: "The React, TypeScript and Node.js Stack I Recommend for Web App MVPs"
    Goal: attract founders and technical profiles looking for a practical MVP stack.
    CTA: full-stack development service.
    Required structure: title, meta description, intro, H2/H3 sections, FAQ, internal links, Article schema, optional FAQ schema.
    Suggested internal links: /services/full-stack-development-day, /services/mvp-development, /projects.

[ ] Article C: "From Web App Idea to MVP Roadmap: The AI Clarity Framework"
    Goal: introduce the method and sell the workshop.
    CTA: bootstrapping workshop and newsletter signup.
    Required structure: title, meta description, intro, H2/H3 sections, FAQ, internal links, Article schema, optional FAQ schema.
    Suggested internal links: /services/mvp-bootstrapping-workshop, /freebies, /contact.
```

AI Clarity Framework content to encode:

```txt
[ ] Name: AI Clarity Framework.
[ ] Subtitle: The solo founder web app development method.
[ ] Step 1 - Idea: clarify target user, idea, and problem.
[ ] Step 2 - Scope: define MVP, useful features, and remove unnecessary features.
[ ] Step 3 - Design: naming, branding, and design system.
[ ] Step 4 - Stack: choose tools and technologies.
[ ] Step 5 - Workflow: set up development and AI-assisted workflow.
[ ] Step 6 - Roadmap: plan phases and milestones.
[ ] Step 7 - Build: implement the first phase.
[ ] Step 8 - Autonomy: help the user continue independently.
```

Freebies:

```txt
[ ] Create /freebies.
[ ] Add freebie cards with title, description, target audience, and CTA.
[ ] Connect CTA to Beehiiv signup forms or tagged Beehiiv embeds.
[ ] Freebie: AI Clarity Framework Checklist.
[ ] Freebie: Astro SaaS Landing Page Starter.
[ ] Freebie: Claude Code MVP Prompt Pack.
[ ] Freebie: Design System Tokens Starter.
[ ] Freebie: MVP Roadmap Template.
[ ] Freebie: Guessr Game Template.
[ ] Add data-analytics="click_freebie_download" to freebie CTAs.
```

Newsletter integration:

```txt
[ ] Newsletter name: AI Clarity Notes.
[ ] Newsletter promise: monthly practical notes for solo founders and web builders using AI to clarify, build and launch better web apps.
[ ] Add reusable Beehiiv subscribe component for homepage, blog posts, freebies, and service pages.
[ ] Support compact inline, full section, and card variants.
[ ] Include free newsletter structure:
    - 1 useful AI tool.
    - 1 practical dev workflow.
    - 1 resource to read.
    - 1 MVP advice.
    - 1 link to my content or service.
[ ] Add data-analytics="click_newsletter_signup" to signup CTAs.
```

SEO and internal linking requirements:

```txt
[ ] Add unique titles and meta descriptions for /blog, every article, and /freebies.
[ ] Add OpenGraph tags for /blog, every article, and /freebies.
[ ] Add canonical URLs for /blog, every article, and /freebies.
[ ] Add sitemap entries for /blog, each article, and /freebies.
[ ] Add Article schema for article pages.
[ ] Add FAQPage schema when FAQ content exists.
[ ] Add BreadcrumbList schema for blog posts and freebies.
[ ] Link blog articles to relevant service pages.
[ ] Link freebies page to newsletter signup.
[ ] Link service pages to contact or booking CTAs.
[ ] Link homepage to blog, freebies, and services.
[ ] Add descriptive text around CTAs so crawlers understand the relationship between content and services.
```

Analytics preparation:

```txt
[ ] Add data-analytics="click_newsletter_signup" to newsletter buttons/forms.
[ ] Add data-analytics="click_freebie_download" to freebie CTAs.
[ ] Add data-analytics="click_book_call" to Calendly/book-call CTAs.
[ ] Add data-analytics="click_service_card" to service cards.
[ ] Add data-analytics="click_contact" to contact links/buttons.
[ ] Keep event names provider-neutral for future Plausible, Umami, or PostHog.
[ ] Avoid hard-coding analytics provider logic into individual components.
```

Implementation order:

```txt
[ ] 1. Audit current Astro pages, layouts, content collection setup, sitemap generation, and Beehiiv component.
[ ] 2. Define blog and freebie content models before writing pages.
[ ] 3. Add or update reusable SEO, JSON-LD, CTA, and newsletter components.
[ ] 4. Build /blog index and BlogPostLayout.
[ ] 5. Draft and add the three initial MDX articles.
[ ] 6. Build /freebies with six lead magnet cards and Beehiiv signup CTAs.
[ ] 7. Add newsletter signup placements across homepage, blog posts, freebies, and service pages.
[ ] 8. Add internal links between homepage, blog, freebies, services, projects, and contact.
[ ] 9. Add analytics data attributes to important CTAs.
[ ] 10. Update sitemap and verify static output under GitHub Pages constraints.
[ ] 11. Run build and browser verification.
[ ] 12. Submit content for editorial review before publishing.
```

Risks and open questions:

```txt
[ ] Beehiiv embed behavior: confirm whether separate forms, UTM parameters, or tags can identify which freebie generated each subscriber.
[ ] Freebie delivery: decide whether files are delivered by Beehiiv automation, confirmation email, public download page, or manual follow-up.
[ ] GitHub Pages base path: confirm whether the site is deployed at the domain root or needs an Astro base path.
[ ] Domain canonical: confirm whether fullstackchris.dev or www.fullstackchris.dev is canonical in Cloudflare and GitHub Pages.
[ ] Content production: confirm whether the initial articles should be fully written now or added first as structured drafts.
[ ] Lead magnets: confirm whether each freebie already exists, needs to be created, or should launch as a "coming soon" signup.
[ ] Analytics provider: choose Plausible, Umami, PostHog, or Cloudflare Web Analytics before implementing event dispatch.
[ ] Newsletter positioning: confirm whether AI Clarity Notes replaces the old AI Web Development Newsletter wording everywhere or coexists during transition.
[ ] Multilingual scope: decide when /fr and /es content becomes worth translating instead of only preparing the model.
```

Acceptance criteria:

```txt
[ ] /blog exists and lists the three initial articles.
[ ] /freebies exists and presents all six freebie cards.
[ ] Blog articles are stored in Markdown or MDX content files.
[ ] Every article includes title, meta description, intro, sections, FAQ, internal links, and CTA.
[ ] Article JSON-LD exists where relevant.
[ ] Newsletter signup components are reusable across page types.
[ ] Beehiiv forms are used for email capture.
[ ] Important CTAs include data-analytics attributes.
[ ] Sitemap includes /blog, the three article URLs, and /freebies.
[ ] English remains default while the content model can support future /fr and /es translations.
```

## Phase 11 - Lead Qualification And Forms

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

## Phase 12 - Autonomous Backend Layer

```txt
[ ] Add Cloudflare Workers when static tools are no longer enough.
[ ] Add D1 or Supabase.
[ ] Add Stripe Checkout.
[ ] Add Stripe webhooks.
[ ] Add Stripe Customer Portal.
[ ] Add paid newsletter access or archive if needed.
[ ] Add lightweight lead/customer storage.
```

## Phase 13 - Full Business Platform

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

- The current implementation target is Astro static output.
- The current deployment target is GitHub Pages, with the domain managed through Cloudflare.
- The sitemap may include future URLs before their pages exist when it is part of the planned SEO architecture.
- Existing React islands should remain limited to interaction that needs client-side JavaScript.
- Newsletter signup, analytics data attributes, and static lead-generation pages should be implemented before adding any custom backend.
