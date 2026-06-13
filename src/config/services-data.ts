import type { ServicePageData } from "../types";

import { STRIPE_PAYMENT_LINKS } from "./constants";

const newsletter: ServicePageData = {
  slug: "ai-web-development-newsletter",
  title: "AI Web Development Newsletter",
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
  answer:
    "A practical monthly briefing on what actually matters in generative AI, coding tools and web development. Curated for developers, founders and freelancers who want to make smart decisions without reading everything.",
  useCases: [],
  heroCard: {
    type: "checklist",
    title: "EVERY ISSUE INCLUDES",
    items: [
      "AI tools worth testing this month",
      "Coding workflow ideas",
      "Practical prompts",
      "What to ignore",
      "Opinionated recommendations",
    ],
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
  stripeLink: STRIPE_PAYMENT_LINKS.newsletter,
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
  title: "Web Project Coaching",
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
  answer:
    "Practical, one-on-one technical coaching for your web project. Bring a blocker, a bug, a messy codebase or a vague plan — and leave with a diagnosis, an action plan and a clear understanding of what to do next. Adapted to your level, technical or not.",
  useCases: [
    "Code review",
    "Debugging",
    "React help",
    "Node API help",
    "Database modeling",
    "Deployment",
    "MVP scope",
    "AI coding workflow",
    "Understanding generated code",
  ],
  heroCard: {
    type: "checklist",
    title: "YOU LEAVE WITH",
    items: [
      "A clear project diagnosis",
      "A written action plan",
      "Architecture and stack advice",
      "Real understanding of your code",
      "Next steps you can execute",
    ],
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
  stripeLink: STRIPE_PAYMENT_LINKS.coaching1h,
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
        "Yes. If the scope is clear, you can move from coaching to development days or a custom MVP project.",
    },
  ],
};

const devDay: ServicePageData = {
  slug: "full-stack-development-day",
  title: "Full-Stack Development Day",
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
  answer:
    "Focused, professional development time on your existing codebase — booked by the half-day or day. Not a full product build: a dedicated block for a specific feature, bug, dashboard, API or refactor, delivered with notes on what changed and what's next.",
  useCases: [
    "React pages",
    "Next.js components",
    "Node APIs",
    "PostgreSQL work",
    "Auth flows",
    "Dashboards",
    "Admin panels",
    "Refactoring",
    "AI API integrations",
    "Deployment fixes",
    "UI improvements",
    "Responsive layouts",
  ],
  heroCard: {
    type: "info",
    title: "WHAT THIS IS",
    description:
      "Focused, professional development time on your existing codebase — booked by the half-day or day. Not a full product build: a dedicated block to ship a specific feature, fix a bug or deliver a clear technical outcome.",
    whenTitle: "WHEN TO USE",
    whenItems: [
      "You have a scoped feature or bug but no dev bandwidth",
      "You need a senior pair of hands for a few days",
      "You want a focused refactor or technical cleanup",
      "You need a working slice shipped on a tight schedule",
    ],
    leaveWithItems: [
      "A shipped feature, fix or refactor",
      "Delivery notes with the decisions made",
      "Clear next steps documented",
      "Working code you fully own",
    ],
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
  stripeLink: STRIPE_PAYMENT_LINKS.developmentDay,
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
  title: "AI Clarity Bootstrap Workshop",
  meta: {
    title: "AI Clarity Framework — MVP Workshop for Solo Founders",
    description:
      "A practical workshop to clarify your web app idea, define your MVP, choose the right stack and create a realistic roadmap using the AI Clarity Framework — for solo founders and small teams.",
  },
  badge: "Workshop",
  hero: {
    h1: "Turn your web app idea into a realistic MVP plan",
    subtitle:
      "A practical workshop for founders and builders who need to clarify their product, define the first version and understand what it will take to build it.",
    primaryCta: "Book the workshop",
  },
  answer:
    "A structured working session that turns a fuzzy idea into a buildable plan: MVP scope, feature priorities, user flows, tech stack, roadmap and a realistic budget. No code is written — the deliverable is clarity, so you stop guessing and start building the right thing.",
  useCases: [],
  heroCard: {
    type: "checklist",
    title: "YOU LEAVE WITH",
    items: [
      "A defined MVP scope",
      "A prioritized feature list",
      "A tech stack & roadmap",
      "A realistic budget estimate",
    ],
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
  stripeLink: STRIPE_PAYMENT_LINKS.mvpWorkshop,
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
  title: "Custom MVP Development",
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
  answer:
    "End-to-end development of a first version of your web app — from product clarification and architecture through frontend, backend, database, deployment and handover. Built by one full-stack developer who can also help you make product decisions, so scope stays sane and the first version actually ships.",
  useCases: [
    "SaaS MVPs",
    "Internal tools",
    "Dashboards",
    "Simple marketplaces",
    "AI-assisted tools",
    "Admin panels",
    "Automation platforms",
    "Productivity tools",
    "Client portals",
    "Training platforms",
  ],
  heroCard: {
    type: "info",
    title: "WHAT THIS IS",
    description:
      "End-to-end development of the first version of your web app — product clarification, architecture, frontend, backend, deployment and handover, delivered by one full-stack developer who can also help you make product decisions.",
    whenTitle: "WHEN TO USE",
    whenItems: [
      "You have a clear product idea and need to ship the first version",
      "You can't afford or don't need a full team yet",
      "You want product thinking and execution from the same person",
      "You want to launch fast without accumulating tech debt",
    ],
    leaveWithItems: [
      "A working web application in production",
      "Product scope clarified along the way",
      "Codebase handed over with docs",
      "Foundations ready for the next phase",
    ],
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
      description: "I'll map the product idea, target users, must-have features, constraints and risks with you.",
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
        "Yes. The AI Clarity Bootstrap Workshop is recommended before development if the idea is still unclear.",
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
