
# 20. Prompt Claude Code — Read this document and plan the refactor

Use this prompt separately in Claude Code.

```txt
You are working on the existing portfolio website fullstackchris.dev.

Read the Markdown document `FULLSTACKCHRIS_SERVICES_SEO_BRIEF.md` carefully before making any code changes.

Your task is NOT to implement everything immediately.

First, analyze the current codebase and produce a detailed implementation plan for refactoring the existing site into a modern service-oriented portfolio and landing page system.

Business goal:
The site should help Christophe Crognier generate independent revenue through web development, coaching, consulting, MVP bootstrapping, MVP development and a paid AI web development newsletter.

Important context:
- Christophe is a full-stack web developer and independent trainer.
- Main stack: React, TypeScript, Node.js, Express, PostgreSQL, Docker, CI/CD.
- He has strong teaching experience and wants to position himself as developer + technical coach + AI-assisted development consultant.
- The current site is hosted on Cloudflare Pages.
- The target design style should be a premium dark modern developer/course landing page inspired by Jack Roberts-style landing pages, without copying any exact design.
- The website must be optimized for classic SEO, LLM visibility, performance and conversion.

Before coding, produce:
1. A summary of the current architecture.
2. A recommendation: keep current React SPA, migrate to Astro, or migrate to Next.js static export.
3. A proposed file/folder structure.
4. A routing plan for all service pages, project pages, blog pages and contact pages.
5. A component architecture plan.
6. A content model for services, projects and blog posts.
7. An SEO implementation plan:
   - titles
   - meta descriptions
   - canonical URLs
   - OpenGraph
   - sitemap
   - robots.txt
   - JSON-LD schema
8. A performance plan for Cloudflare Pages.
9. A phased roadmap:
   - Phase 1: static marketing site
   - Phase 2: forms, booking and payment links
   - Phase 3: backend/payment/customer portal if needed
10. A list of risks and implementation questions.

Do not make destructive changes.
Do not remove existing project content until it has been mapped to the new structure.
Prefer incremental migration.
If the current stack is not ideal for SEO, explain the tradeoffs clearly and propose the safest migration path.
```

---

# 21. Prompt Claude Code — Implement pages after planning

Use this prompt after Claude Code has produced a good implementation plan.

```txt
Now implement Phase 1 from the approved plan.

Goal:
Refactor the site into a modern service-oriented portfolio with dedicated landing pages for:
- AI Web Development Newsletter
- Web Project Coaching
- Full Stack Development Day
- MVP Bootstrapping Workshop
- Custom MVP Development
- Projects
- About
- Contact
- Blog index

Requirements:
- Use the content and structure from `FULLSTACKCHRIS_SERVICES_SEO_BRIEF.md`.
- Keep the visual style premium, dark, modern and conversion-focused.
- Use reusable components for Hero, ServiceCard, PricingCard, FAQ, CTASection, ProcessTimeline, ProjectProof, GoodFitNotFit, SEOHead and JSON-LD.
- Ensure every page has SEO metadata.
- Add sitemap and robots.txt.
- Add JSON-LD schemas for services and FAQ pages.
- Keep the site static-friendly for Cloudflare Pages.
- Do not add paid integrations yet. Use placeholder CTA links for booking and contact.
- Keep code clean, typed and maintainable.
- Preserve or migrate existing project content into proper project pages.
```

---

# 22. Prompt court Relume.io

```txt
Create a complete sitemap and wireframe for a premium dark portfolio and service website for Christophe Crognier, a full-stack web developer and web development trainer specializing in React, Node.js, TypeScript, MVP development and practical AI-assisted development workflows.

The site should sell five services:
1. Paid AI Web Development Newsletter
2. Web Project Coaching / Consulting
3. Full Stack Development Day
4. MVP Bootstrapping Workshop
5. Custom MVP Development on request

The website should include:
Homepage, Services index, 5 dedicated service landing pages, Projects index, individual project case studies, About, Blog, Contact.

Style:
Modern dark premium developer/course landing page, inspired by AI course and coding curriculum landing pages, with modular cards, strong typography, pricing sections, process timelines, FAQs, project proof, and repeated CTAs.

Goal:
Generate leads, subscriptions and bookings from founders, freelancers, developers, small teams and non-technical founders.
```

---

# 23. Page-specific Claude Code prompts

## 23.1 Newsletter page prompt

```txt
Create a modern SEO-optimized landing page for an AI Web Development Newsletter.

Route:
/services/ai-web-development-newsletter

Hero:
Title: "Stay ahead of AI web development without wasting hours reading noise"
Subtitle: "A practical monthly newsletter for developers, founders and freelancers who want to understand what matters in generative AI, coding tools and AI-assisted web development."
CTA: "Subscribe now"
Secondary CTA: "Read a free sample"

Sections:
1. Hero with newsletter mockup visual.
2. Problem section.
3. What you get.
4. Example issue preview.
5. Pricing cards.
6. Who it is for.
7. FAQ.
8. Final CTA.

SEO:
Add title, meta description, OpenGraph, Service schema and FAQPage schema.
```

## 23.2 Coaching page prompt

```txt
Create a conversion-focused landing page for Web Project Coaching.

Route:
/services/web-project-coaching

Hero:
Title: "Get unstuck on your web project with one-on-one technical coaching"
Subtitle: "I help founders, freelancers and developers clarify, debug and structure web projects using React, Node.js, TypeScript and AI-assisted development workflows."
CTA: "Book a coaching session"

Sections:
1. Hero.
2. Pain points.
3. What you get.
4. Pricing.
5. Use cases.
6. Why work with Christophe.
7. FAQ.
8. Contact CTA.

SEO:
Add title, meta description, OpenGraph, Service schema and FAQPage schema.
```

## 23.3 Development day page prompt

```txt
Create a high-converting landing page for a Full Stack Development Day service.

Route:
/services/full-stack-development-day

Hero:
Title: "Book a focused full-stack development day for your web project"
Subtitle: "Need a feature, bug fix, dashboard, API or technical cleanup? I work on your React, Node.js or TypeScript project in focused half-day or full-day blocks."
CTA: "Request a development slot"

Sections:
1. Hero.
2. Explain service.
3. Good fit / Not a fit.
4. What I can build.
5. Process.
6. Pricing.
7. Project proof.
8. FAQ.
9. CTA form.

SEO:
Add title, meta description, OpenGraph, Service schema and FAQPage schema.
```

## 23.4 MVP bootstrapping page prompt

```txt
Create a landing page for an MVP Bootstrapping Workshop.

Route:
/services/mvp-bootstrapping-workshop

Hero:
Title: "Turn your web app idea into a realistic MVP plan"
Subtitle: "A practical workshop for founders and builders who need to clarify their product, define the first version and understand what it will take to build it."
CTA: "Book the workshop"

Sections:
1. Hero with flow: Idea → Scope → Stack → Roadmap → Build Plan.
2. Problem.
3. Outcomes.
4. Offer comparison.
5. Agenda.
6. Who it is for.
7. Why work with Christophe.
8. FAQ.
9. Contact CTA.

SEO:
Add title, meta description, OpenGraph, Service schema and FAQPage schema.
```

## 23.5 MVP development page prompt

```txt
Create a premium landing page for Custom MVP Development.

Route:
/services/mvp-development

Hero:
Title: "Build your MVP with a full-stack developer who can also help you think through the product"
Subtitle: "I help founders and small teams turn a clear product idea into a working web application using React, Node.js, TypeScript and practical AI-assisted development workflows."
CTA: "Request a quote"

Sections:
1. Hero.
2. What I build.
3. What is included.
4. Process timeline.
5. Tech stack.
6. Pricing.
7. Project proof.
8. Good fit / Not a fit.
9. FAQ.
10. Quote request form.

SEO:
Add title, meta description, OpenGraph, Service schema and FAQPage schema.
```

---
