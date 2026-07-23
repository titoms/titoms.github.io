import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  ai,
  docker,
  pano,
  eventmaker,
  enovee,
  dsp,
  mainlogo,
} from "../assets";
import type {
  BuildStat,
  Experience,
  FAQ,
  FooterGroup,
  NavLink,
  PricingPlan,
  ProcessItem,
  Service,
  ServiceOffer,
  Technology,
  Testimonial,
  WorkMode,
} from "../types";
import { colors } from "./tokens";

export const navLinks: NavLink[] = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
    href: "/about/",
  },
  {
    id: "services",
    title: "Services",
    href: "/services/",
  },
  {
    id: "projects",
    title: "Projects",
    href: "/projects/",
  },
  {
    id: "blog",
    title: "Blog",
    href: "/blog/",
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact/",
  },
];

export const SITE_ALIASES = ["Full Stack Chris", "fullstackchris", "full stack chris"] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/christophe-crognier",
  github: "https://github.com/titoms",
  twitter: "https://x.com/fullstackchris_",
} as const;

export const TWITTER_HANDLE = "@fullstackchris_" as const;

export const heroStats: BuildStat[] = [
  {
    value: "~7,000h",
    label: "Teaching web dev",
    description: "Web development training across Bachelor and Master level programs.",
  },
  {
    value: "5",
    label: "Shipped projects",
    description: "Products built end-to-end: desktop apps, web platforms, games and tools.",
  },
  {
    value: "€90 → €15k",
    label: "Coaching to MVP",
    description: "From a single hour of clarity to a full product delivered.",
  },
];

export const workModes: WorkMode[] = [
  {
    title: "Coaching",
    description:
      "For founders, freelancers and developers who need a senior technical read on a blocker, roadmap or AI-generated codebase.",
    outcome: "Leave with diagnosis, explanation and next actions.",
  },
  {
    title: "Development",
    description:
      "Focused half-day, full-day and multi-day blocks for clear bugs, features, APIs, dashboards, cleanup or deployment work.",
    outcome: "Ship a scoped improvement without a long hiring process.",
  },
  {
    title: "MVP",
    description:
      "Workshops and custom builds that turn a fuzzy product idea into realistic scope, architecture, roadmap and delivery.",
    outcome: "Move from idea to buildable product plan or launched MVP.",
  },
];

export const buildStats: BuildStat[] = [
  {
    value: "MVP",
    label: "Scope before code",
    description: "Feature priority, user flows, risk map and realistic delivery plan.",
  },
  {
    value: "API",
    label: "Back-end clarity",
    description: "Node.js, Express, data modeling, auth flows and integrations.",
  },
  {
    value: "UI",
    label: "Product surfaces",
    description: "React dashboards, admin panels, booking flows and responsive pages.",
  },
  {
    value: "AI",
    label: "Useful automation",
    description: "AI-assisted workflows, prompts, agents and API integrations without hype.",
  },
];

export const serviceOffers: ServiceOffer[] = [
  {
    title: "AI Web Dev Newsletter",
    description:
      "A monthly, no-hype briefing on AI tools, coding workflows and MVP ideas worth testing.",
    price: "from €9",
    priceUnit: "/mo",
    badge: "Newsletter",
  },
  {
    title: "Web Project Coaching",
    description:
      "One-on-one sessions to debug, clarify and structure your React / Node / AI-generated project.",
    price: "€90",
    priceUnit: "/ 1h",
    badge: "Coaching",
  },
  {
    title: "Full-stack Development Day",
    description:
      "Focused half- or full-day blocks for a clear feature, bug fix, dashboard or refactor.",
    price: "from €350",
    priceUnit: "/ day",
    badge: "Delivery",
  },
  {
    title: "AI Clarity Bootstrap Workshop",
    description:
      "Turn an idea into a realistic MVP plan: scope, user flows, stack, roadmap and budget.",
    price: "from €650",
    priceUnit: "/ day",
    badge: "Workshop",
    featured: true,
  },
  {
    title: "Custom MVP Development",
    description:
      "A working web app from scope to deployment — frontend, backend, database and handover.",
    price: "from €4,500",
    badge: "MVP",
  },
];

export const processSteps: ProcessItem[] = [
  {
    title: "Clarify the real goal",
    description:
      "I'll map the user, business goal, current state, constraints and the smallest useful outcome with you.",
  },
  {
    title: "Reduce the scope",
    description:
      "The work is translated into a buildable slice: features, risks, dependencies, assumptions and success criteria.",
  },
  {
    title: "Build with visibility",
    description:
      "Implementation happens in focused blocks with practical notes, trade-offs and concrete next steps.",
  },
  {
    title: "Handover or continue",
    description:
      "You leave with working software, a clearer roadmap, or a defined next session depending on the offer.",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    title: "Coaching Session",
    description: "For a blocker, review or technical decision.",
    price: "90 EUR",
    period: "/hour",
    features: ["Project diagnosis", "Architecture advice", "AI-generated code review", "Written next steps"],
  },
  {
    title: "Development Day",
    description: "For a scoped feature, bug or cleanup.",
    price: "600 EUR",
    period: "/day",
    features: ["Focused implementation", "React and Node.js work", "Delivery notes", "Optional follow-up session"],
    featured: true,
  },
  {
    title: "MVP Workshop",
    description: "For founders who need a realistic product plan.",
    price: "650 EUR",
    period: "/day",
    features: ["MVP scope", "Feature priorities", "Tech stack recommendation", "Roadmap and risk map"],
  },
];

export const newsletterIssue = [
  "Claude Code workflows for React projects",
  "Cursor vs Claude Code: what to use and when",
  "AI agents for solo founders",
  "3 AI-powered MVP ideas worth testing",
  "Tool of the month",
  "Prompt of the month",
  "What to ignore this month",
];

export const feedbackCards: Testimonial[] = [
  {
    testimonial:
      "Placeholder for founder feedback on turning an unclear product idea into a realistic build plan.",
    name: "Founder",
    designation: "MVP workshop client",
    company: "Coming soon",
    image: "",
  },
  {
    testimonial:
      "Placeholder for developer feedback on debugging, architecture guidance and understanding AI-generated code.",
    name: "Developer",
    designation: "Coaching client",
    company: "Coming soon",
    image: "",
  },
  {
    testimonial:
      "Placeholder for business feedback on a focused development day that shipped a scoped feature.",
    name: "Team lead",
    designation: "Development day client",
    company: "Coming soon",
    image: "",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Do I need to be technical?",
    answer:
      "No. Every service adapts to non-technical founders, beginners or developers. The goal is that you always leave knowing what to build and why.",
  },
  {
    question: "How much does an MVP cost?",
    answer:
      "MVP development starts at €4,500, with most projects landing between €6,000 and €15,000 depending on scope. I confirm a fixed quote after a short discovery.",
  },
  {
    question: "Can you help with AI-generated code?",
    answer:
      "Yes — understanding, debugging and cleaning up code from ChatGPT, Claude, Cursor or Copilot is one of the most common reasons people book a session.",
  },
  {
    question: "Can coaching turn into a full build?",
    answer:
      "Often. If the scope becomes clear, we move from coaching to development days or a custom MVP project — no need to start over with someone new.",
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Services",
    links: [
      { id: "services", title: "AI newsletter", href: "/services/ai-web-development-newsletter/" },
      { id: "services", title: "Project coaching", href: "/services/web-project-coaching/" },
      { id: "services", title: "Development day", href: "/services/full-stack-development-day/" },
      { id: "services", title: "MVP workshop", href: "/services/mvp-bootstrapping-workshop/" },
    ],
  },
  {
    title: "Projects",
    links: [
      { id: "projects", title: "EduMation", href: "/projects/edumation/" },
      { id: "projects", title: "RailGuessr", href: "/projects/railguessr/" },
      { id: "projects", title: "Singuessr", href: "/projects/singuessr/" },
      { id: "projects", title: "Fresh.win", href: "/projects/fresh-win/" },
    ],
  },
  {
    title: "Blog / resources",
    links: [
      { id: "blog", title: "AI-assisted development", href: "/blog/ai-assisted-development-without-building-a-mess/" },
      { id: "blog", title: "MVP roadmap with AI", href: "/blog/ai-clarity-framework-mvp-roadmap/" },
      { id: "blog", title: "React TypeScript Node stack", href: "/blog/react-typescript-node-mvp-stack/" },
      { id: "blog", title: "Claude Code workflows", href: "/blog/claude-code-workflows/" },
    ],
  },
  {
    title: "Contact",
    links: [
      { id: "contact", title: "Book a call" },
      { id: "contact", title: "LinkedIn" },
      { id: "contact", title: "GitHub" },
      { id: "contact", title: "X / Twitter" },
    ],
  },
  {
    title: "Legal",
    links: [
      { id: "legal-notice",     title: "Legal notice",     href: "/legal-notice" },
      { id: "privacy-policy",   title: "Privacy policy",   href: "/privacy-policy" },
      { id: "terms-of-service", title: "Terms of service", href: "/terms-of-service" },
      { id: "cookies",          title: "Cookies",          href: "/cookies" },
    ],
  },
];

const services: Service[] = [
  {
    title: "Front End Developer",
    icon: web,
  },
  {
    title: "Back End Developer",
    icon: mobile,
  },
  {
    title: "DevOps",
    icon: backend,
  },
  {
    title: "Web Programming Teacher",
    icon: creator,
  },
];

const technologies: Technology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Claude Code",
    icon: ai,
  },
  {
    name: "Codex",
    icon: ai,
  },
  {
    name: "Stitch",
    icon: ai,
  },
  {
    name: "Antigravity",
    icon: ai,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const technologyCategories: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "React Native", "JavaScript", "HTML 5", "CSS 3", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node JS", "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Tauri"],
  },
  {
    label: "AI / LLM",
    items: ["Claude Code", "Codex", "Antigravity", "OpenAI API", "Anthropic API", "Whisper"],
  },
  {
    label: "DevOps & Tools",
    items: ["Cloudflare", "Docker", "Traefik", "Jenkins", "Prometheus", "Grafana", "git"],
  },
  {
    label: "Design",
    items: ["Stitch", "Claude Design", "Relume", "Adobe"],
  },
];

const featuredTechnologies: string[] = ["React", "TypeScript", "React Native"];

const experiences: Experience[] = [
  {
    title: "Front End Developer",
    company_name: "EventMaker",
    icon: eventmaker,
    iconBg: colors.iconBgDark,
    date: "Jan 2016 - Dec 2016",
    points: [
      "Developing and maintaining web pages for major European Events",
      "Creation of landing pages for subscriptions",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Working in a agile environment",
    ],
  },
  {
    title: "Back End Developer",
    company_name: "Enovee",
    icon: enovee,
    iconBg: colors.iconBgLight,
    date: "Jan 2017 - Dec 2017",
    points: [
      "Developing and maintaining web applications using AngularJS, CakePHP and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Back End  Developer",
    company_name: "Panorabanques",
    icon: pano,
    iconBg: colors.iconBgDark,
    date: "Jan 2018 - Dec 2018",
    points: [
      "Creation and maintaining of automation bots",
      "Working close with client for better customization of the product",
      "Implementing automation tasks in several technologies as Javascript, PHP and Java",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Digital School of Paris",
    icon: dsp,
    iconBg: colors.iconBgLight,
    date: "Jan 2018 - Dec 2018",
    points: [
      "Developing a activity reservation Progressive Web App using ReactJS",
      "Conception and deployment of an API using NodeJS and Express framework",
      "Implementing a CI/CD pipeline for test and deployment automation using Jenkins, Git and Docker",
      "Creation of large variety of tests, unitary, functional and end to end testing",
    ],
  },
  {
    title: "Freelance Web Developer",
    company_name: "Independent",
    icon: mainlogo,
    iconBg: colors.iconBgDark,
    date: "Jan 2019 - today",
    points: [
      "As a Freelance Full Stack Developer, I design and build custom web applications from concept to production.",
      "I work across the entire development lifecycle including architecture design, front-end and back-end implementation, database modeling, deployment and maintenance.",
      "My work primarily focuses on scalable React and Node.js applications, API development, automation workflows and production-ready systems deployed using modern DevOps practices.",
      "I collaborate directly with clients to transform business ideas into functional digital products, ensuring performance, maintainability and long-term scalability while adapting quickly to evolving project requirements.",
    ],
  },
  {
    title: "Freelance Programming Teacher",
    company_name: "Independent",
    icon: mainlogo,
    iconBg: colors.bgTimeline,
    date: "Jan 2019 - today",
    points: [
      "As an Independent Programming Instructor, I have delivered over 7,000 hours of technical training in private higher-education institutions, teaching students from Bachelor to Master level.",
      "My teaching covers both theoretical foundations and real-world software engineering practices, helping students understand not only how to code but how to design, structure and communicate complex technical systems.",
      "This experience has strengthened my ability to break down complex concepts, document architectures clearly and collaborate efficiently with both technical and non-technical stakeholders — skills directly transferable to professional software development environments.",
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export const CALENDLY_URL = "https://calendly.com/fullstackchris/30min";

/** Internal URL — navigates to the embedded Calendly on the contact page */
export const BOOK_CALL_URL = "/contact/#schedule";

// Stripe TEST MODE links — safe to commit. Swap for live links before going to production.
export const STRIPE_PAYMENT_LINKS = {
  newsletter:          "",                                                        // handled via Beehiiv, no Stripe
  coaching1h:          "https://buy.stripe.com/test_28E28rclg3ueeTfUF2kw00",   // €90
  coachingHalfDay:     "https://buy.stripe.com/test_dRmeVd8595oQ3AfeQB2kw01",  // €300
  coachingFullDay:     "https://buy.stripe.com/test_9B6fZh7158B2fiX6k52kw02",  // €550
  developmentDay:      "https://buy.stripe.com/test_aFa5kDbhl18Agn1fUF2kw04",  // €600
  developmentHalfDay:  "https://buy.stripe.com/test_00weVd85904w3AfgYJ2kw03",  // €350
  mvpWorkshop:         "https://buy.stripe.com/test_eVq6oHclpeZq2wb0ZL2kw05",  // €650
} as const;

// Sourced from .env (PUBLIC_CF_ANALYTICS_TOKEN) — set in Cloudflare Pages for production
export const CF_ANALYTICS_TOKEN = import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN as string ?? "";

export { services, technologies, technologyCategories, featuredTechnologies, experiences, testimonials };
