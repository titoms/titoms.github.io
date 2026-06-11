# Phase 5 — Service Landing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six service landing pages (`/services`, `/services/:slug` ×5) to the React SPA using React Router, a typed data config, and a single adaptive template component.

**Architecture:** `BrowserRouter` is already present with no routes — add `<Routes>` in `App.tsx`, extract current sections into a `HomePage` component, and create `ServicesIndexPage` + `ServicePageTemplate` for service URLs. All service copy lives in `src/config/services-data.ts`; the template conditionally renders optional sections (good-fit, process steps) based on presence in the data object.

**Tech Stack:** React 18, React Router v6, TypeScript, Tailwind CSS, react-helmet-async (new), pnpm

---

## Task 1: Install react-helmet-async, update Button for internal routing, wire HelmetProvider

**Files:**
- Modify: `package.json` (via pnpm)
- Modify: `src/main.tsx`
- Modify: `src/components/ui/Button.tsx`

- [ ] **Step 1: Install react-helmet-async**

```bash
cd C:\DEV\titoms.github.io
pnpm add react-helmet-async
```

Expected: package added, `pnpm-lock.yaml` updated.

- [ ] **Step 2: Wrap the app in HelmetProvider in `src/main.tsx`**

Replace the entire file with:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 3: Update `src/components/ui/Button.tsx` to use React Router `Link` for internal paths**

Replace the anchor branch so internal hrefs (starting with `/`, not `//`) use `Link` from react-router-dom instead of `<a>`, enabling client-side navigation without page reloads.

Full replacement of `src/components/ui/Button.tsx`:

```tsx
import { Link } from "react-router-dom";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type AnchorButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand text-[var(--text-on-accent)] shadow-[0_0_0_1px_rgba(167,139,250,0.4),0_8px_24px_rgba(124,92,232,0.25)] hover:bg-brand-hover hover:text-[var(--text-on-accent)] hover:shadow-glow",
  secondary:
    "border-strong bg-tertiary text-white hover:border-accent hover:bg-raised hover:text-white",
  ghost:
    "border-transparent bg-transparent text-secondary hover:bg-tertiary hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "rounded-sm px-3.5 py-2.5 text-[0.85rem]",
  md: "rounded-md px-[22px] py-3.5 text-[0.95rem]",
  lg: "rounded-md px-7 py-4 text-[1.05rem]",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-body font-semibold leading-none no-underline transition-[transform,background,border-color,box-shadow,color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "md", className, children } = props;
  const buttonClassName = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && typeof props.href === "string") {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props as AnchorButtonProps;
    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <Link to={href} className={buttonClassName} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={buttonClassName} {...rest}>
        {children}
      </a>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const { variant: _v, size: _s, className: _c, children: _ch, href: _href, ...buttonProps } = nativeProps;

  return (
    <button className={buttonClassName} type="button" {...buttonProps}>
      {children}
    </button>
  );
};
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build completes with no TypeScript errors. If there are errors in Button.tsx related to the Link spread, cast `rest` as needed — `{...(rest as Record<string, unknown>)}`.

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx src/components/ui/Button.tsx package.json pnpm-lock.yaml
git commit -m "feat: add react-helmet-async, wire HelmetProvider, update Button for internal routing"
```

---

## Task 2: Add service page types and update NavLink

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add `href?` to `NavLink` and add three new service page types**

Append to the end of `src/types/index.ts` (after the `MotionDirection` type):

```ts
// Add href? to NavLink (update the existing type at the top of the file)
// NavLink becomes:
// export type NavLink = {
//   id: string;
//   title: string;
//   href?: string;
// };
```

Find the existing `NavLink` type at the top of `src/types/index.ts`:

```ts
export type NavLink = {
  id: string;
  title: string;
};
```

Replace it with:

```ts
export type NavLink = {
  id: string;
  title: string;
  href?: string;
};
```

Then append the following three types at the bottom of `src/types/index.ts`:

```ts
export type ServicePricingRow = {
  label: string;
  price: string;
  featured?: boolean;
};

export type ServiceIncludedItem = {
  title: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  badge: string;
  hero: {
    h1: string;
    subtitle: string;
    primaryCta: string;
    primaryCtaHref?: string;
    secondaryCta?: string;
    secondaryCtaHref?: string;
  };
  painPoints: string[];
  outcomes: string[];
  included: ServiceIncludedItem[];
  pricing: ServicePricingRow[];
  pricingNote?: string;
  goodFit?: string[];
  notAFit?: string[];
  processSteps?: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: no new errors. The `NavLink` change is backward compatible — `href` is optional.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add ServicePageData types and optional href to NavLink"
```

---

## Task 3: Create services-data.ts with all 5 service page data objects

**Files:**
- Create: `src/config/services-data.ts`

- [ ] **Step 1: Create `src/config/services-data.ts`**

```ts
import type { ServicePageData } from "../types";

const newsletter: ServicePageData = {
  slug: "ai-web-development-newsletter",
  meta: {
    title: "AI Web Development Newsletter for Developers and Founders",
    description:
      "A monthly AI newsletter focused on generative AI, coding tools, AI agents and practical web development workflows for developers, founders and freelancers.",
  },
  badge: "Newsletter",
  hero: {
    h1: "Stay ahead of AI web development without wasting hours reading noise",
    subtitle:
      "A practical monthly newsletter for developers, founders and freelancers who want to understand what matters in generative AI, coding tools and AI-assisted web development.",
    primaryCta: "Join the waitlist",
  },
  painPoints: [
    "Too many AI tools release every week. Signal is hard to find.",
    "Most AI content is hype or too shallow to be useful.",
    "Developers need concrete use cases, not press releases.",
    "Founders need to understand which opportunities are worth pursuing.",
    "Trainers and technical leads need to stay current without spending hours every day.",
  ],
  outcomes: [
    "Monthly AI web dev briefing",
    "Tool updates and honest takes",
    "Coding workflow ideas",
    "Practical prompts",
    "Worth testing / ignore this month",
    "Opinionated recommendations",
  ],
  included: [
    {
      title: "Monthly AI web dev briefing",
      description: "A curated summary of what actually matters in AI and web development this month.",
    },
    {
      title: "Tool updates",
      description: "Honest takes on new AI coding tools — what changed, what is worth trying, what is hype.",
    },
    {
      title: "Coding workflow ideas",
      description: "Practical patterns for integrating AI into React, Node.js and TypeScript projects.",
    },
    {
      title: "Practical prompts",
      description: "Tested prompts for coding, architecture and product thinking.",
    },
    {
      title: "Worth testing / ignore",
      description: "A direct opinion on what to spend time on and what to skip this month.",
    },
    {
      title: "Opinionated recommendations",
      description: "Clear recommendations with reasoning, not summaries.",
    },
  ],
  pricing: [
    { label: "Free sample", price: "0 EUR" },
    { label: "Solo builder", price: "9 EUR / mo" },
    { label: "Pro builder", price: "19 EUR / mo", featured: true },
    { label: "Team / School / Company", price: "99 EUR / mo" },
  ],
  faqs: [
    {
      question: "What is this newsletter about?",
      answer:
        "A monthly practical update about generative AI, coding tools, web development workflows, AI agents and product opportunities.",
    },
    {
      question: "Who is it for?",
      answer: "Developers, founders, freelancers, trainers and small technical teams.",
    },
    {
      question: "Is it beginner-friendly?",
      answer:
        "Yes. The tone is clear and practical, with enough detail for developers but without useless jargon.",
    },
    {
      question: "Will you include sources?",
      answer: "Yes. Issues include source links and practical interpretation, not just summaries.",
    },
    {
      question: "Can I use it for my team?",
      answer: "Yes. The team plan is made for internal knowledge sharing.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. There is no commitment. You can cancel any time from your account.",
    },
  ],
};

const coaching: ServicePageData = {
  slug: "web-project-coaching",
  meta: {
    title: "Web Project Coaching for Founders and Developers",
    description:
      "One-on-one web development coaching and technical consulting for founders, freelancers and developers building React, Node.js, TypeScript or AI-assisted web projects.",
  },
  badge: "Coaching",
  hero: {
    h1: "Get unstuck on your web project with one-on-one technical coaching",
    subtitle:
      "I help founders, freelancers and developers clarify, debug and structure web projects using React, Node.js, TypeScript and AI-assisted development workflows.",
    primaryCta: "Book a coaching session",
  },
  painPoints: [
    "You are blocked on your project and losing time.",
    "AI-generated code you do not fully understand.",
    "Your codebase is messy and you do not know where to start.",
    "You need technical clarity without hiring a full-time developer.",
    "You do not know which feature to build first.",
    "You need a senior opinion before spending more money.",
  ],
  outcomes: [
    "Project diagnosis",
    "Clear explanation",
    "Action plan",
    "Architecture advice",
    "Debugging help",
    "Written next steps",
  ],
  included: [
    {
      title: "Project diagnosis",
      description: "A clear read on your codebase, architecture and the actual source of the problem.",
    },
    {
      title: "Technical explanation",
      description: "Plain-language walkthrough of what is happening and why.",
    },
    {
      title: "Action plan",
      description: "Written next steps tailored to your project and skill level.",
    },
    {
      title: "Architecture advice",
      description: "Practical guidance on structure, patterns and trade-offs.",
    },
    {
      title: "Debugging help",
      description: "Live hands-on work through your specific blocker.",
    },
    {
      title: "Next steps",
      description: "A clear path forward so the session has a defined outcome.",
    },
  ],
  pricing: [
    { label: "1-hour coaching", price: "90 EUR" },
    { label: "Half-day coaching", price: "300 EUR", featured: true },
    { label: "Full-day coaching", price: "550 EUR" },
  ],
  faqs: [
    {
      question: "Do I need to be technical?",
      answer:
        "No. The session can be adapted to non-technical founders, beginners or developers.",
    },
    {
      question: "Can you help with existing code?",
      answer: "Yes, if you can share the repo, screenshots, errors or clear context.",
    },
    {
      question: "Can you help with AI-generated code?",
      answer:
        "Yes. I can help you understand, debug and clean code generated by ChatGPT, Claude, Cursor or Copilot.",
    },
    {
      question: "Is this development or consulting?",
      answer:
        "It can include both guidance and live technical help, but it is not unlimited development work.",
    },
    {
      question: "What should I prepare?",
      answer:
        "A description of your project, your goal, your blocker and any useful links or files.",
    },
    {
      question: "Can this lead to development work?",
      answer:
        "Yes. If the scope is clear, we can move from coaching to development days or a custom MVP project.",
    },
  ],
};

const devDay: ServicePageData = {
  slug: "full-stack-development-day",
  meta: {
    title: "Hire a Full Stack React Node Developer for a Day",
    description:
      "Book a focused half-day or full-day development session with a React, Node.js and TypeScript full stack developer for bugs, features, dashboards, APIs and MVP progress.",
  },
  badge: "Delivery",
  hero: {
    h1: "Book a focused full-stack development day for your web project",
    subtitle:
      "Need a feature, bug fix, dashboard, API or technical cleanup? I work on your React, Node.js or TypeScript project in focused half-day or full-day blocks.",
    primaryCta: "Request a development slot",
  },
  painPoints: [
    "You have a clear bug or feature but no developer time to tackle it.",
    "You need fast, reliable progress without a long hiring process.",
    "Your project is stuck on a specific task and needs an autonomous developer.",
    "You need code review, refactoring or a technical cleanup.",
    "You need a feature or integration shipped on a defined schedule.",
  ],
  outcomes: [
    "Scoped feature or bug fix shipped",
    "Delivery notes with decisions made",
    "Clear next steps documented",
    "Working code you own",
  ],
  included: [
    {
      title: "React and Next.js work",
      description: "Pages, layouts, dashboards and interactive UI components.",
    },
    {
      title: "Node.js APIs",
      description: "REST endpoints, Express routes, data modeling and third-party integrations.",
    },
    {
      title: "Database work",
      description: "PostgreSQL schema, queries, migrations and data cleanup.",
    },
    {
      title: "Auth flows",
      description: "Session management, JWT, OAuth2 or provider-based authentication.",
    },
    {
      title: "Bug fixing",
      description: "Diagnosis and resolution of production bugs with reproduction steps.",
    },
    {
      title: "Delivery notes",
      description: "A written summary of what was done, decisions made and what to do next.",
    },
  ],
  pricing: [
    { label: "Half-day", price: "350 EUR" },
    { label: "Full day", price: "600 EUR", featured: true },
    { label: "3-day pack", price: "1,650 EUR" },
    { label: "5-day pack", price: "2,600 EUR" },
    { label: "10-day pack", price: "5,000 EUR" },
  ],
  goodFit: [
    "Clear bug or feature with a definition of done",
    "Existing codebase with setup instructions",
    "Need for fast, focused progress",
    "Need for an autonomous developer",
    "Code review, refactoring or cleanup work",
  ],
  notAFit: [
    "Full MVP built in one day",
    "No repository access or setup documentation",
    "No clear task or definition of done",
    "Unrealistic scope for the time booked",
  ],
  processSteps: [
    {
      title: "Send the task",
      description: "Describe the task, what done looks like, and share the repo and any relevant context.",
    },
    {
      title: "Validate the scope",
      description: "I confirm the task is realistic for the session length and clarify any blockers before starting.",
    },
    {
      title: "Focused development session",
      description: "I work on your project in a dedicated block with no interruptions.",
    },
    {
      title: "Receive delivery notes",
      description: "A written summary of what was done, what changed and what to do next.",
    },
    {
      title: "Optional next session",
      description: "If the scope needs more time, we schedule a follow-up with a refined task.",
    },
  ],
  faqs: [
    {
      question: "Can you build a full app in one day?",
      answer:
        "No. A full app requires a custom project. This service is for focused development work on a specific task.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Docker and modern web tools.",
    },
    {
      question: "Can you work on an existing codebase?",
      answer: "Yes, if the repository and setup instructions are clear.",
    },
    {
      question: "Can you fix bugs?",
      answer: "Yes, if you provide enough context, reproduction steps and access.",
    },
    {
      question: "Can you integrate AI APIs?",
      answer:
        "Yes. I can help with OpenAI API, AI-assisted workflows and simple AI-powered features.",
    },
    {
      question: "Will you explain what you changed?",
      answer: "Yes. Delivery notes summarize what was done and what to do next.",
    },
  ],
};

const mvpWorkshop: ServicePageData = {
  slug: "mvp-bootstrapping-workshop",
  meta: {
    title: "MVP Bootstrapping Workshop for Founders",
    description:
      "A practical 1-day or 5-day workshop to clarify your web app idea, define your MVP, choose the right tech stack and create a realistic product roadmap.",
  },
  badge: "Workshop",
  hero: {
    h1: "Turn your web app idea into a realistic MVP plan",
    subtitle:
      "A practical workshop for founders and builders who need to clarify their product, define the first version and understand what it will take to build it.",
    primaryCta: "Book the workshop",
  },
  painPoints: [
    "You have an idea but no clear plan for what to build.",
    "You do not know which features to prioritize.",
    "You risk wasting time and money building the wrong product.",
    "You cannot communicate your idea clearly to developers.",
    "You want to use AI in your product but do not know where it adds value.",
  ],
  outcomes: [
    "MVP scope defined",
    "Feature priorities ranked",
    "Tech stack recommended",
    "Development roadmap created",
    "Budget estimation provided",
    "Risk map documented",
  ],
  included: [
    {
      title: "MVP scope",
      description: "A defined list of what to build and what to defer for the first version.",
    },
    {
      title: "Feature priorities",
      description: "A ranked feature list based on impact, risk and build effort.",
    },
    {
      title: "Tech stack recommendation",
      description: "A practical stack matched to your team, timeline and product needs.",
    },
    {
      title: "Development roadmap",
      description: "A phased plan with milestones and realistic delivery estimates.",
    },
    {
      title: "Budget estimation",
      description: "A rough cost range based on scope, complexity and timeline.",
    },
    {
      title: "Risk map",
      description: "Known risks, assumptions and how to reduce uncertainty before building.",
    },
  ],
  pricing: [
    { label: "1-day MVP Clarity Workshop", price: "650 EUR" },
    { label: "5-day MVP Sprint", price: "2,800 EUR", featured: true },
    { label: "5-day Premium Sprint + prototype / spec", price: "3,500 EUR" },
  ],
  goodFit: [
    "Non-technical founders with a product idea",
    "Freelancers and creators building a digital product",
    "Indie hackers planning a SaaS or tool",
    "Early-stage projects without a technical spec",
    "Small businesses needing a realistic product plan",
  ],
  notAFit: [
    "You already have a detailed technical specification",
    "You need development, not planning",
    "You have a full in-house technical team",
    "You need a marketing or business plan, not a product roadmap",
  ],
  faqs: [
    {
      question: "Do I need a technical background?",
      answer: "No. This workshop is designed to make technical choices understandable.",
    },
    {
      question: "Do I need an existing project?",
      answer: "No. You can come with only an idea or a rough concept.",
    },
    {
      question: "Will you build the MVP during the workshop?",
      answer:
        "No. The workshop creates the plan, roadmap and scope. Development is a separate service.",
    },
    {
      question: "What is the difference between 1 day and 5 days?",
      answer:
        "The 1-day workshop gives clarity and a roadmap. The 5-day sprint goes deeper into specs, architecture, user flows and delivery planning.",
    },
    {
      question: "Can this workshop lead to a full MVP build?",
      answer:
        "Yes. If the scope is realistic, it can become a custom development project.",
    },
    {
      question: "Can you include AI features in the roadmap?",
      answer:
        "Yes. AI features can be evaluated based on usefulness, complexity and cost.",
    },
  ],
};

const mvpDev: ServicePageData = {
  slug: "mvp-development",
  meta: {
    title: "MVP Development for Web Apps and SaaS Products",
    description:
      "Custom MVP development for founders and small teams. Build a React, Node.js and TypeScript web application from product scope to deployment.",
  },
  badge: "MVP",
  hero: {
    h1: "Build your MVP with a full-stack developer who can also help you think through the product",
    subtitle:
      "I help founders and small teams turn a clear product idea into a working web application using React, Node.js, TypeScript and practical AI-assisted development workflows.",
    primaryCta: "Request a quote",
  },
  painPoints: [
    "You have a clear product idea but no technical team to build it.",
    "You cannot afford a full-time development team for an unvalidated product.",
    "You do not know how to scope, architect and deliver a realistic first version.",
    "You need someone who can both think through the product and build it.",
    "You want to launch fast without building technical debt you will regret.",
  ],
  outcomes: [
    "Working web application delivered",
    "Product clarification included",
    "Full deployment handled",
    "Codebase handover with docs",
  ],
  included: [
    {
      title: "Product clarification",
      description: "Discovery sessions to align on scope, priorities and success criteria.",
    },
    {
      title: "Technical architecture",
      description: "System design, data models, API contracts and infrastructure plan.",
    },
    {
      title: "Frontend",
      description: "React or Next.js UI built to your product structure and design direction.",
    },
    {
      title: "Backend",
      description: "Node.js API with Express, authentication, business logic and integrations.",
    },
    {
      title: "Database",
      description: "PostgreSQL or Supabase schema design, migrations and query optimization.",
    },
    {
      title: "Deployment and handover",
      description:
        "Production deployment to Cloudflare Pages, Vercel or your preferred host, plus full codebase documentation.",
    },
  ],
  pricing: [{ label: "Custom MVP development", price: "from 4,500 EUR", featured: true }],
  pricingNote:
    "Typical range: 6,000 EUR – 15,000 EUR depending on scope. Custom quote provided after a discovery call.",
  goodFit: [
    "You have a clear problem to solve",
    "You can prioritize and reduce scope",
    "You have a realistic budget",
    "You want a clean, deployable first version",
    "You are open to a staged MVP approach",
  ],
  notAFit: [
    "You want a complex marketplace or social network in two weeks",
    "You have no budget or refuse to discuss scope",
    "You expect unlimited features in a fixed price",
    "You are looking for equity-only arrangements",
  ],
  processSteps: [
    {
      title: "Discovery",
      description: "We map the product idea, target users, must-have features, constraints and risks.",
    },
    {
      title: "Scope and proposal",
      description: "I write a clear scope document with milestones, timeline and a fixed-price proposal.",
    },
    {
      title: "Build sprint",
      description: "Development happens in focused sprints with regular check-ins and progress updates.",
    },
    {
      title: "Review",
      description: "You test the working product and provide feedback before the final delivery.",
    },
    {
      title: "Deployment and handover",
      description: "The product is deployed to production and handed over with full documentation.",
    },
  ],
  faqs: [
    {
      question: "How much does an MVP cost?",
      answer:
        "MVP development starts at 4,500 EUR. Most projects range between 6,000 EUR and 15,000 EUR depending on scope.",
    },
    {
      question: "How long does it take?",
      answer:
        "It depends on the scope. A small MVP may take a few weeks. A more complex MVP needs a staged roadmap.",
    },
    {
      question: "Can you help define the scope first?",
      answer:
        "Yes. The MVP Bootstrapping Workshop is recommended before development if the idea is still unclear.",
    },
    {
      question: "Can you include AI features?",
      answer: "Yes, if they are useful and realistic for the first version.",
    },
    {
      question: "Do you handle deployment?",
      answer: "Yes. Deployment and handover are included.",
    },
    {
      question: "Can you work with an existing codebase?",
      answer: "Yes, after review. Existing projects may require an audit first.",
    },
    {
      question: "Do you provide design?",
      answer:
        "I can create clean product UI structures, but advanced branding or custom visual identity may require a dedicated designer.",
    },
    {
      question: "What happens after launch?",
      answer:
        "You can book development days, support, improvements or a new sprint.",
    },
  ],
};

export const servicePages: ServicePageData[] = [
  newsletter,
  coaching,
  devDay,
  mvpWorkshop,
  mvpDev,
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: no errors. If TypeScript complains about missing types, verify that `src/types/index.ts` has the three new types from Task 2.

- [ ] **Step 3: Commit**

```bash
git add src/config/services-data.ts
git commit -m "feat: add service page content data for all 5 services"
```

---

## Task 4: Update constants.ts — services nav link and footer paths

**Files:**
- Modify: `src/config/constants.ts`

- [ ] **Step 1: Add `href: "/services"` to the services nav link**

In `src/config/constants.ts`, find the `navLinks` array and update the services entry:

```ts
// Before:
{ id: "services", title: "Services" },

// After:
{ id: "services", title: "Services", href: "/services" },
```

- [ ] **Step 2: Update footer service links to real paths**

Find `footerGroups` in `src/config/constants.ts`. Replace the Services group links:

```ts
// Before:
{
  title: "Services",
  links: [
    { id: "services", title: "AI newsletter" },
    { id: "services", title: "Project coaching" },
    { id: "services", title: "Development day" },
    { id: "services", title: "MVP workshop" },
  ],
},

// After:
{
  title: "Services",
  links: [
    { id: "services", title: "AI newsletter", href: "/services/ai-web-development-newsletter" },
    { id: "services", title: "Project coaching", href: "/services/web-project-coaching" },
    { id: "services", title: "Development day", href: "/services/full-stack-development-day" },
    { id: "services", title: "MVP workshop", href: "/services/mvp-bootstrapping-workshop" },
  ],
},
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: no errors. `NavLink.href` is optional so all unchanged links stay valid.

- [ ] **Step 4: Commit**

```bash
git add src/config/constants.ts
git commit -m "feat: add service page hrefs to nav and footer links"
```

---

## Task 5: Refactor App.tsx — extract HomePage, add Routes, update nav/footer link rendering

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add `Navigate` and `Route`/`Routes` to the react-router-dom import, and add lazy imports for the new pages**

At the top of `src/App.tsx`, update the import from react-router-dom:

```tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
```

Add two new imports after the existing imports:

```tsx
import ServicesIndexPage from "./pages/services/ServicesIndexPage";
import ServicePageTemplate from "./pages/services/ServicePageTemplate";
```

These files don't exist yet (Tasks 6 and 7 create them) — the build will fail until they are created, which is expected. Complete Tasks 6 and 7 before running `pnpm build`.

- [ ] **Step 2: Wrap all current homepage sections in a `HomePage` component**

Find the `App` component at the bottom of `src/App.tsx`:

```tsx
const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className="min-h-screen bg-primary text-white">
      <SiteHeader />
      <main>
        <Hero />
        <WorkModesSection />
        <BuildMosaicSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessAndTechSection />
        <PricingSection />
        <NewsletterSection />
        <FeedbackAndFAQSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </div>
  </BrowserRouter>
);
```

Replace it with a `HomePage` component and an updated `App`:

```tsx
const HomePage = () => (
  <>
    <Hero />
    <WorkModesSection />
    <BuildMosaicSection />
    <ServicesSection />
    <ProjectsSection />
    <ProcessAndTechSection />
    <PricingSection />
    <NewsletterSection />
    <FeedbackAndFAQSection />
    <FinalCTASection />
  </>
);

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className="min-h-screen bg-primary text-white">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/services/:slug" element={<ServicePageTemplate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  </BrowserRouter>
);
```

- [ ] **Step 3: Update nav anchor links to use `/#anchor` format and `link.href` override**

In `SiteHeader`, find both places where nav links are rendered (desktop and mobile). Update the `href` attribute in both:

```tsx
// Desktop nav — before:
href={`#${link.id}`}

// Desktop nav — after:
href={link.href ?? `/#${link.id}`}
```

```tsx
// Mobile nav — before:
href={`#${link.id}`}

// Mobile nav — after:
href={link.href ?? `/#${link.id}`}
```

- [ ] **Step 4: Update footer link rendering to use `link.href` override**

In `SiteFooter`, find the footer link `<a>` element:

```tsx
// Before:
<a className="text-sm text-secondary transition-colors hover:text-white" href={`#${link.id}`}>

// After:
<a className="text-sm text-secondary transition-colors hover:text-white" href={link.href ?? `#${link.id}`}>
```

- [ ] **Step 5: Commit (even though build will fail until Tasks 6–7 complete)**

```bash
git add src/App.tsx
git commit -m "feat: extract HomePage, add Routes, update nav and footer link rendering"
```

---

## Task 6: Create ServicesIndexPage

**Files:**
- Create: `src/pages/services/ServicesIndexPage.tsx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p src/pages/services
```

Create `src/pages/services/ServicesIndexPage.tsx`:

```tsx
import { Helmet } from "react-helmet-async";
import { CALENDLY_URL } from "../../config/constants";
import { servicePages } from "../../config/services-data";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const ServicesIndexPage = () => (
  <>
    <Helmet>
      <title>Services — fullstackchris.dev</title>
      <meta
        name="description"
        content="Web development coaching, focused development days, MVP workshops and custom MVP builds. Five productized services for founders, freelancers and small teams."
      />
    </Helmet>

    <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
      <div className={`${sectionClass} py-24`}>
        <Badge variant="accent">All services</Badge>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
          Five ways to work together — from one hour to a full MVP.
        </h1>
        <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
          Choose the level of engagement that matches your current need. Start small with a coaching session or newsletter, scale up to a development day or MVP build.
        </p>
        <div className="mt-8">
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Not sure where to start? Book a call
            <span aria-hidden="true"> →</span>
          </Button>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <SectionHeader
        eyebrow="Services"
        title="Pick the right engagement for your project."
        description="Prices are visible up front. Each service has a dedicated page with full details, pricing and FAQ."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {servicePages.map((service) => (
          <Card key={service.slug} hover className="flex h-full flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <Badge variant="accent">{service.badge}</Badge>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">
                {service.hero.h1.length > 60
                  ? service.hero.h1.slice(0, 57) + "…"
                  : service.hero.h1}
              </h3>
              <p className="text-[0.95rem] leading-7 text-secondary">{service.hero.subtitle}</p>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
              <Button href={`/services/${service.slug}`} variant="primary" size="sm">
                Learn more
              </Button>
              <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                Book a call
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section className="border-t border-border bg-surface/55">
      <div className={sectionClass}>
        <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Not sure?</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                Bring me your idea, blocker or product goal.
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
                We will clarify what should happen next: coaching, a focused development block, an MVP workshop or a custom build proposal.
              </p>
            </div>
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
              Book a call
              <span aria-hidden="true"> →</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  </>
);

export default ServicesIndexPage;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build may still fail if `ServicePageTemplate` is not yet created. If only `ServicePageTemplate` is missing, that is expected — continue to Task 7.

- [ ] **Step 3: Commit**

```bash
git add src/pages/services/ServicesIndexPage.tsx
git commit -m "feat: add ServicesIndexPage at /services"
```

---

## Task 7: Create ServicePageTemplate

**Files:**
- Create: `src/pages/services/ServicePageTemplate.tsx`

- [ ] **Step 1: Create `src/pages/services/ServicePageTemplate.tsx`**

```tsx
import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CALENDLY_URL } from "../../config/constants";
import { servicePages } from "../../config/services-data";
import {
  Badge,
  Button,
  Card,
  FAQItem,
  ProcessStep,
  SectionHeader,
} from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const ServicePageTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = servicePages.find((s) => s.slug === slug);

  if (!data) return <Navigate to="/services" replace />;

  const primaryHref = data.hero.primaryCtaHref ?? CALENDLY_URL;
  const primaryTarget = primaryHref === CALENDLY_URL ? "_blank" : undefined;
  const primaryRel = primaryHref === CALENDLY_URL ? "noopener noreferrer" : undefined;
  const secondaryHref = data.hero.secondaryCtaHref ?? "/services";
  const secondaryCta = data.hero.secondaryCta ?? "← All services";

  return (
    <>
      <Helmet>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Helmet>

      {/* 1 — Hero */}
      <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
        <div className={`${sectionClass} py-24`}>
          <Badge variant="accent">{data.badge}</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
            {data.hero.h1}
          </h1>
          <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
            {data.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} target={primaryTarget} rel={primaryRel} size="lg">
              {data.hero.primaryCta}
              <span aria-hidden="true"> →</span>
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      {/* 2 — Pain points */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="The problem" title="Sound familiar?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.painPoints.map((point) => (
            <Card key={point} hover className="text-[0.95rem] leading-7 text-secondary">
              {point}
            </Card>
          ))}
        </div>
      </section>

      {/* 3 — What's included */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="What you get" title="Everything included." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.included.map((item) => (
              <Card key={item.title} hover>
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Pricing */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="Pricing" title="Clear prices, no surprises." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.pricing.map((row) => (
            <Card key={row.label} glow={row.featured} hover className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{row.label}</p>
              <p className="font-display text-3xl font-bold leading-none text-white">{row.price}</p>
              <Button
                href={primaryHref}
                target={primaryTarget}
                rel={primaryRel}
                variant={row.featured ? "primary" : "secondary"}
                size="sm"
                className="mt-auto"
              >
                {data.hero.primaryCta}
              </Button>
            </Card>
          ))}
        </div>
        {data.pricingNote && (
          <p className="mt-6 text-sm leading-7 text-low">{data.pricingNote}</p>
        )}
      </section>

      {/* 5 — Good fit / Not a fit (optional) */}
      {data.goodFit && (
        <section className="border-y border-border bg-surface/55">
          <div className={sectionClass}>
            <SectionHeader eyebrow="Is this right for you?" title="Good fit and not a fit." />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-positive">
                  Good fit
                </p>
                <ul className="space-y-3">
                  {data.goodFit.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-secondary">
                      <span className="mt-0.5 shrink-0 text-positive">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              {data.notAFit && (
                <Card>
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-negative">
                    Not a fit
                  </p>
                  <ul className="space-y-3">
                    {data.notAFit.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-secondary">
                        <span className="mt-0.5 shrink-0 text-negative">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6 — Process steps (optional) */}
      {data.processSteps && (
        <section className={sectionClass}>
          <SectionHeader eyebrow="How it works" title="A clear process." />
          <div className="mt-10">
            {data.processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                number={index + 1}
                title={step.title}
                isLast={index === data.processSteps!.length - 1}
              >
                {step.description}
              </ProcessStep>
            ))}
          </div>
        </section>
      )}

      {/* 7 — FAQ */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader eyebrow="Questions" title="Common questions answered." />
            <div>
              {data.faqs.map((faq, index) => (
                <FAQItem key={faq.question} question={faq.question} defaultOpen={index === 0}>
                  {faq.answer}
                </FAQItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Final CTA */}
      <section className={sectionClass}>
        <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {data.hero.primaryCta}
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
                {data.hero.subtitle}
              </p>
            </div>
            <Button href={primaryHref} target={primaryTarget} rel={primaryRel} size="lg">
              {data.hero.primaryCta}
              <span aria-hidden="true"> →</span>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
};

export default ServicePageTemplate;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: build completes with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/services/ServicePageTemplate.tsx
git commit -m "feat: add ServicePageTemplate for /services/:slug routes"
```

---

## Task 8: Add SPA fallback, run full build verification, manual browser QA

**Files:**
- Create: `public/_redirects`

- [ ] **Step 1: Create `public/_redirects` for Cloudflare Pages SPA routing**

```
/*    /index.html   200
```

This tells Cloudflare Pages to serve `index.html` for any path that does not match a static file, enabling React Router to handle the route client-side.

Create `public/_redirects` with that single line.

- [ ] **Step 2: Run full build**

```bash
pnpm build
```

Expected: build completes, `dist/` contains `index.html` and `_redirects`. No TypeScript errors.

- [ ] **Step 3: Start dev server and verify all routes**

```bash
pnpm dev
```

Visit the following URLs and verify each:

| URL | Expected |
|---|---|
| `http://localhost:5173/` | Homepage renders unchanged |
| `http://localhost:5173/#services` | Scrolls to services section on homepage |
| `http://localhost:5173/services` | Services index page with 5 service cards |
| `http://localhost:5173/services/web-project-coaching` | Coaching page with H1, pricing, FAQ |
| `http://localhost:5173/services/full-stack-development-day` | Dev day page with Good fit + Process sections |
| `http://localhost:5173/services/mvp-bootstrapping-workshop` | Workshop page with Good fit, no Process section |
| `http://localhost:5173/services/mvp-development` | MVP dev page with pricing note below the card |
| `http://localhost:5173/services/ai-web-development-newsletter` | Newsletter page with 4 pricing tiers |
| `http://localhost:5173/services/does-not-exist` | Redirects to `/` (wildcard route) |
| Header "Services" link | Navigates to `/services` |
| Header other links from `/services` | Navigate to `/#home`, `/#about` etc. on homepage |
| Footer service links | Navigate to correct `/services/:slug` URLs |
| Browser back button from service page | Returns to previous page without reload |

- [ ] **Step 4: Check page `<title>` in browser tab for each service page**

With dev tools open, confirm each service page sets a unique `<title>`:
- `/services` → `Services — fullstackchris.dev`
- `/services/web-project-coaching` → `Web Project Coaching for Founders and Developers`
- `/services/full-stack-development-day` → `Hire a Full Stack React Node Developer for a Day`
- `/services/mvp-bootstrapping-workshop` → `MVP Bootstrapping Workshop for Founders`
- `/services/mvp-development` → `MVP Development for Web Apps and SaaS Products`
- `/services/ai-web-development-newsletter` → `AI Web Development Newsletter for Developers and Founders`

- [ ] **Step 5: Commit**

```bash
git add public/_redirects
git commit -m "feat: add Cloudflare Pages SPA _redirects fallback"
```

- [ ] **Step 6: Update ROADMAP.md — mark Phase 5 items complete**

In `ROADMAP.md`, mark all Phase 5 items as complete:

```markdown
## Phase 5 - Service Landing Pages

[x] /services
[x] /services/ai-web-development-newsletter
[x] /services/web-project-coaching
[x] /services/full-stack-development-day
[x] /services/mvp-bootstrapping-workshop
[x] /services/mvp-development
```

Also mark the per-page items:

```markdown
[x] Unique title and meta description.
[x] One clear H1.
[x] Problem / outcome / offer / proof / FAQ / CTA structure.
[x] Pricing visible without excessive scrolling.
```

Leave JSON-LD items unchecked (deferred to Phase 8).

```bash
git add ROADMAP.md
git commit -m "chore: mark Phase 5 service pages complete in ROADMAP"
```
