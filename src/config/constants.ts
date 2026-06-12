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
  edumation,
  edumation_login,
  edumation_schedule,
  edumation_profile,
  railguessr,
  railguessr_home,
  railguessr_daily,
  fuchibol,
  fuchibol_prediction,
  fuchibol_games,
  singuessr_home,
  singuessr_blindtest,
  singuessr_create,
  singuessr_create2,
  singuessr_coverdle,
} from "../assets";
import type {
  BuildStat,
  Experience,
  FAQ,
  FooterGroup,
  NavLink,
  PricingPlan,
  ProcessItem,
  Project,
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
    href: "/about",
  },
  {
    id: "services",
    title: "Services",
    href: "/services",
  },
  {
    id: "projects",
    title: "Projects",
    href: "/projects",
  },
  {
    id: "blog",
    title: "Blog",
    href: "/blog",
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
  },
];


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
    title: "MVP Bootstrapping Workshop",
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
      "We map the user, business goal, current state, constraints and the smallest useful outcome.",
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
      "MVP development starts at €4,500, with most projects landing between €6,000 and €15,000 depending on scope. We confirm a fixed quote after a short discovery.",
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
      { id: "services", title: "AI newsletter", href: "/services/ai-web-development-newsletter" },
      { id: "services", title: "Project coaching", href: "/services/web-project-coaching" },
      { id: "services", title: "Development day", href: "/services/full-stack-development-day" },
      { id: "services", title: "MVP workshop", href: "/services/mvp-bootstrapping-workshop" },
    ],
  },
  {
    title: "Projects",
    links: [
      { id: "projects", title: "EduMation", href: "/projects/edumation" },
      { id: "projects", title: "RailGuessr", href: "/projects/railguessr" },
      { id: "projects", title: "Singuessr", href: "/projects/singuessr" },
      { id: "projects", title: "Fresh.win", href: "/projects/fresh-win" },
    ],
  },
  {
    title: "Blog / resources",
    links: [
      { id: "blog", title: "AI-assisted development", href: "/blog/ai-assisted-development-without-building-a-mess" },
      { id: "blog", title: "MVP roadmap with AI", href: "/blog/ai-clarity-framework-mvp-roadmap" },
      { id: "blog", title: "React TypeScript Node stack", href: "/blog/react-typescript-node-mvp-stack" },
      { id: "blog", title: "Claude Code workflows", href: "/blog/claude-code-workflows" },
    ],
  },
  {
    title: "Contact",
    links: [
      { id: "contact", title: "Book a call" },
      { id: "contact", title: "LinkedIn" },
      { id: "contact", title: "GitHub" },
      { id: "contact", title: "Legal" },
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

const projects: Project[] = [
  {
    name: "Keevo",
    slug: "keevo",
    description:
      "A local-first desktop app that turns hours of raw footage into clean transcripts and ready-to-use subtitles — running an on-device speech model so no file ever touches the cloud.",
    longDescription:
      "Keevo is a desktop transcription and subtitle tool built for content creators and video producers. It processes video locally using an on-device speech recognition model, generates timestamped transcripts, and exports subtitle files in multiple formats — no cloud uploads, no API costs, no privacy concerns.",
    caseStudy: {
      tagline: "Local-first transcription — your footage never leaves your machine.",
      problem:
        "Content creators spend hours manually transcribing footage or pay recurring API costs to cloud speech services. Both options introduce friction: time cost or privacy concerns around uploading client footage to third-party servers.",
      context:
        "Built for freelance video editors, podcasters and content teams who process sensitive recordings and want full ownership of their workflow without subscription costs.",
      technicalChallenges: [
        "Running a quantized on-device speech model within Electron without blocking the UI thread.",
        "Handling long-form audio segmentation to produce accurate timestamps across variable speaking rates.",
        "Designing a timeline editor that lets users correct transcripts without re-running the model.",
        "Packaging native binaries for macOS and Windows within a cross-platform Electron build pipeline.",
      ],
      architecture:
        "Electron shell with a React renderer. The speech model runs in a Node.js worker process using a WASM-compiled inference runtime. Results are streamed back to the renderer via IPC as segments complete. SQLite stores project state locally.",
      implementation:
        "The pipeline extracts audio via ffmpeg, chunks it into overlapping segments, runs inference in a worker pool, merges results with a timestamp reconciliation pass, then surfaces them in the editor. Subtitle export supports SRT, VTT and plain text.",
      results: [
        "Processes 60 minutes of footage in under 4 minutes on Apple Silicon.",
        "Zero cloud dependency — all data stays on device.",
        "Subtitle accuracy comparable to leading cloud APIs on clean recordings.",
      ],
      lessonsLearned: [
        "Worker-process isolation is non-negotiable when running inference — blocking the main process tanks UX.",
        "Overlapping audio chunks with reconciliation produces far cleaner word boundaries than hard splits.",
        "SQLite is the right local state store for Electron — zero setup, reliable, fast enough for this data shape.",
      ],
    },
    tags: [
      { name: "Electron", color: "blue-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "On-device AI", color: "green-text-gradient" },
    ],
    image: null,
    images: [],
    source_code_link: "https://github.com/",
    meta: { role: "Solo · full-stack", timeline: "2025 · in progress", platform: "Desktop · macOS · Windows", type: "Developer Tool" },
    painPoints: [
      { bold: "Cloud transcription is expensive.", rest: "API costs accumulate fast on long recordings and eat into freelance margins." },
      { bold: "Privacy is a real concern.", rest: "Uploading client footage to third-party servers is a non-starter for many video professionals." },
      { bold: "Manual transcription is brutal.", rest: "Hours of listen-and-type work that adds nothing creative to the production." },
    ],
    audienceWho: "Video creators & podcasters",
    audienceDesc: "Freelance editors, content teams and podcasters who need fast, private transcription without recurring API costs",
    audienceStats: [
      { value: "0 cloud", label: "dependency" },
      { value: "<4 min", label: "per hour of footage" },
      { value: "100%", label: "local & private" },
    ],
    productFlow: [
      { step: "01", title: "Import", description: "Drop in any video or audio file." },
      { step: "02", title: "Transcribe", description: "On-device model runs, segments stream in." },
      { step: "03", title: "Edit", description: "Correct words and adjust timestamps in the timeline." },
      { step: "04", title: "Export", description: "SRT, VTT or plain text — ready to drop into any editor." },
    ],
    features: [
      { title: "On-device Inference", description: "A quantized speech model runs entirely on the local machine in a Node.js worker process — no API keys, no uploads, no recurring costs.", bullets: ["WASM-compiled runtime works on both macOS and Windows", "Results stream to the UI as segments complete"] },
      { title: "Timeline Editor", description: "Correct model output in a synchronized transcript editor — clicking any word seeks the video, so review is fast.", bullets: ["Word-level timestamp display", "Keyboard-first editing flow"] },
      { title: "Multi-format Export", description: "Export to SRT, WebVTT or plain text with a single click — ready to import into Premiere, Final Cut, DaVinci or any subtitle tool.", bullets: ["Accurate timecodes from the reconciliation pass", "UTF-8 safe for multilingual content"] },
    ],
    stack: [
      { label: "Shell", chips: ["Electron", "Node.js"] },
      { label: "UI", chips: ["React", "TypeScript"] },
      { label: "AI", chips: ["WASM inference", "On-device speech model"] },
      { label: "Storage", chips: ["SQLite", "ffmpeg"] },
    ],
    proves: [
      { iconKey: "cpu", title: "On-device AI", description: "Shipped a production WASM inference pipeline inside Electron without blocking the UI thread." },
      { iconKey: "zap", title: "Desktop performance", description: "Processes an hour of footage in under 4 minutes via a worker-pool inference architecture." },
      { iconKey: "shield", title: "Privacy by design", description: "Zero cloud dependency — all processing stays local, making it viable for client and sensitive recordings." },
      { iconKey: "layers", title: "Cross-platform build", description: "Native binary packaging for both macOS and Windows within a single Electron build pipeline." },
    ],
    nextProjectSlug: "edumation",
  },
  {
    name: "EduMation",
    slug: "edumation",
    description:
      "EduMation is an enterprise-grade School Management System (SMS) designed to automate the administrative overhead of coordinating students, teachers, and pedagogical programs.",
    longDescription:
      "EduMation is an enterprise-ready education management platform focusing on solving complex scheduling and administrative challenges through automation. The platform centralizes student, teacher, and course management within a multi-tenant architecture, while its core feature — an intelligent, constraint-aware scheduling engine — automates the generation of weekly schedules by integrating internal requirements with external calendar availability (Google, Microsoft, ICS).",
    caseStudy: {
      tagline: "Automated scheduling for education institutions — from weeks to minutes.",
      problem:
        "Education institutions face a 'scheduling nightmare': manually coordinating dozens of teachers, student groups, and courses across limited time slots while avoiding conflicts with external personal commitments. This manual process typically takes days, involves high cognitive load, and is brittle — any single change can cascade into multiple conflicts.",
      context:
        "Built for professional training organizations managing multiple schools, programs, and student cohorts. The platform needed to handle complex constraint-based scheduling (teacher availability, room capacity, course dependencies) at scale while ensuring strict data isolation between institutions.",
      technicalChallenges: [
        "Solving the NP-Hard scheduling problem while weighing multiple soft and hard constraints like lunch breaks, working hours, and teacher preferences.",
        "Ensuring strict multi-tenant data isolation via middleware-level filtering for all database queries across the shared infrastructure.",
        "Managing high-latency external calendar syncs (Google, Microsoft Graph, ICS) without blocking core application flows or exceeding provider rate limits.",
        "Building a high-performance interactive schedule UI capable of rendering hundreds of dynamic events with sub-100ms response times for edits.",
      ],
      architecture:
        "A modular MERN (MongoDB, Express, React, Node) stack with TypeScript for strict type safety. The React frontend follows a custom internal Design System, while the Node.js backend implements a heuristic-driven scheduling service. Each institution's data is isolated via a schoolId-based filtering layer, and external availability is cached with a 180-day TTL index for O(1) conflict checks.",
      implementation:
        "The scheduler uses a greedy heuristic that sorts courses by their 'degree of constraint' (Least-Constrained-First). It computes invalid slots by indexing internal events and cached external busy intervals. A seed-based randomization system generates three distinct proposals for administrators, while a dedicated sync worker handles OAuth2-based integrations with external calendar providers.",
      results: [
        "Average schedule generation time reduced from ~14 days of manual work to under 5 minutes.",
        "100% elimination of double-booking conflicts across pilot institutions through automated validation.",
        "90% reduction in administrative overhead for pedagogical coordinator roles per semester.",
      ],
      lessonsLearned: [
        "A 'good enough' heuristic solver with human refinement is far more effective for real-world needs than an expensive exact CSP solver.",
        "Enforcing data isolation at the middleware/query layer is the only reliable way to prevent cross-tenant security breaches in a shared SaaS environment.",
        "Caching external availability significantly improves the responsiveness of scheduling operations compared to live-fetching during planning.",
        "Type-safe domain logic for complex constraints prevents hundreds of potential runtime logical errors during development.",
      ],
    },
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "docker", color: "pink-text-gradient" },
    ],
    image: edumation,
    images: [edumation, edumation_login, edumation_schedule, edumation_profile],
    source_code_link: "https://github.com/",
    meta: { role: "Solo · full-stack", timeline: "2023 · 14 weeks", platform: "Web · SaaS", type: "Enterprise Platform" },
    painPoints: [
      { bold: "Manual scheduling is brutal.", rest: "Coordinating dozens of teachers and courses by hand takes days and is error-prone." },
      { bold: "One change breaks everything.", rest: "A single teacher conflict cascades into dozens of reassignments across the semester." },
      { bold: "No tool exists for this niche.", rest: "Generic scheduling software can't handle domain-specific education constraints." },
    ],
    audienceWho: "Training organizations & coordinators",
    audienceDesc: "Professional training orgs managing multiple schools, programs, and student cohorts at once",
    audienceStats: [
      { value: "14d→5min", label: "scheduling time" },
      { value: "100%", label: "conflict-free" },
      { value: "90%", label: "less admin work" },
    ],
    productFlow: [
      { step: "01", title: "Import", description: "Load teachers, student groups, rooms and constraints." },
      { step: "02", title: "Generate", description: "Heuristic solver proposes 3 conflict-free schedules." },
      { step: "03", title: "Refine", description: "Coordinators tweak and validate in the drag-and-drop UI." },
      { step: "04", title: "Publish", description: "Live calendar synced to all teachers and students." },
    ],
    features: [
      { title: "AI Scheduling Engine", description: "A heuristic solver that processes hard constraints (teacher availability, room capacity) and soft constraints (lunch breaks, preferences) to generate conflict-free proposals in under 5 minutes.", bullets: ["Generates 3 distinct proposals using seed-based randomization", "Handles complex multi-cohort timetabling in seconds"] },
      { title: "Real-Time Calendar Sync", description: "Two-way OAuth2 sync with Google Calendar and Microsoft Graph ensures teacher personal commitments are always reflected, with no manual import step.", bullets: ["180-day TTL caching for O(1) conflict checks", "Background sync worker handles rate limits gracefully"] },
      { title: "Multi-Tenant Architecture", description: "Strict data isolation enforced at the middleware layer ensures one institution never sees another's data, even on shared infrastructure.", bullets: ["SchoolId-based filtering on every database query", "Role-based access control per institution and role"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "TypeScript", "Custom Design System"] },
      { label: "Backend", chips: ["Node.js", "Express", "MongoDB"] },
      { label: "Integrations", chips: ["Google Calendar API", "Microsoft Graph", "ICS"] },
      { label: "DevOps", chips: ["Docker", "CI/CD", "Redis"] },
    ],
    proves: [
      { iconKey: "brain", title: "AI problem solving", description: "Designed and shipped a production heuristic solver for an NP-Hard scheduling problem." },
      { iconKey: "shield", title: "Multi-tenant security", description: "Built row-level data isolation across a shared SaaS database without any tenant cross-contamination." },
      { iconKey: "zap", title: "High-performance UI", description: "Rendered hundreds of dynamic calendar events with sub-100ms interactive response times." },
      { iconKey: "link", title: "Third-party integrations", description: "Shipped and maintained live OAuth2 syncs with Google Calendar and Microsoft Graph." },
    ],
    nextProjectSlug: "railguessr",
  },
  {
    name: "RailGuessr",
    slug: "railguessr",
    description:
      "RailGuessr is a transit-focused geography game challenging players to identify intermediate stations on the Paris Metro network.",
    longDescription:
      "RailGuessr is an interactive transit geography game designed for urban enthusiasts and commuters. Players must reconstruct specific metro segments by identifying intermediate stations between two endpoints across 16 lines. The project features a deterministic daily challenge system, PWA support, and a high-performance minimalist interface designed for mobile-first engagement.",
    caseStudy: {
      tagline: "Geography meets transit — guess the station, beat the clock.",
      problem:
        "Transit fans and daily commuters lacked an engaging, low-friction way to test their knowledge of urban networks. Existing geography games were too generic, and there was no daily 'Wordle-style' challenge specifically for the complex Paris Metro system.",
      context:
        "Built to explore deterministic client-side logic and high-retention gaming mechanics. RailGuessr targets a niche community of transit enthusiasts, providing a daily mental challenge that is synchronized globally without requiring any backend infrastructure.",
      technicalChallenges: [
        "Implementing a deterministic daily challenge system where every user globally gets the same puzzle based on a date-hash, with zero backend dependency.",
        "Handling the topological complexity of branched metro lines (Lines 7, 10, 13) using graph-based pathfinding to identify valid intermediate stations.",
        "Optimizing for 100% offline-first PWA support while maintaining high SEO visibility and AdSense performance for monetization.",
        "Building a 'fuzzy' input matching system that handles accents, casing, and varied nomenclature (e.g., 'Châtelet' vs 'Chatelet') to maximize accessibility.",
      ],
      architecture:
        "A purely client-side React application deployed via Cloudflare Pages. The metro network is modeled as a static adjacency list (Graph). The daily seed is derived from a hash of the current date, ensuring global sync. User statistics and streaks are managed via a custom StatsManager utility interacting with LocalStorage.",
      implementation:
        "Graph traversal logic identifies unique paths on branched lines, while a custom normalizer strips special characters for fuzzy matching. The UI is built with Tailwind CSS and Framer Motion for sub-60fps fluid transitions. Monetization is integrated via Google AdSense with specific focus on maintaining core UX performance.",
      results: [
        "Zero-cost infrastructure scaling: the platform handles thousands of users globally at zero hosting cost via edge delivery.",
        "High user retention: the daily streak system and community shares (Twitter/Reddit) drove organic growth to 400+ monthly active users.",
        "PWA conversion: 15% of regular users have 'installed' the game to their mobile home screens for daily access.",
      ],
      lessonsLearned: [
        "Deterministic client-side hashing is a powerful, cost-free alternative to traditional backends for synchronized daily games.",
        "Minimalist design and fluid 'Enter-key' flows are more important for retention than high-fidelity graphics.",
        "PWA implementations significantly lower the barrier to entry for casual mobile gaming compared to app store distribution.",
        "Graph-based data structures are essential for accurately modeling real-world transit networks compared to simple arrays.",
      ],
    },
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "canvas", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
      { name: "online", color: "orange-text-gradient" },
    ],
    image: railguessr,
    images: [railguessr, railguessr_home, railguessr_daily],
    source_code_link: "https://github.com/",
    live_link: "https://railguessr.com/",
    meta: { role: "Solo · full-stack", timeline: "2023 · 6 weeks", platform: "Web · PWA", type: "Daily Game" },
    painPoints: [
      { bold: "Transit fans have no daily challenge.", rest: "Generic geography games ignore the detail and real topology of urban metro networks." },
      { bold: "Daily sync normally requires a backend.", rest: "Keeping every global player on the same puzzle usually means a server and hosting cost." },
      { bold: "Metro topology is non-trivial.", rest: "Branched lines like Line 7 and 13 can't be modeled as simple arrays." },
    ],
    audienceWho: "Transit enthusiasts & commuters",
    audienceDesc: "Daily players who commute, urban enthusiasts who know their city's metro by heart",
    audienceStats: [
      { value: "€0", label: "hosting cost" },
      { value: "400+", label: "monthly active users" },
      { value: "15%", label: "PWA installs" },
    ],
    productFlow: [
      { step: "01", title: "Daily seed", description: "Date hash generates today's unique challenge." },
      { step: "02", title: "Play", description: "Player enters intermediate stations to reconstruct the route." },
      { step: "03", title: "Score", description: "Fuzzy matching validates answers and updates the streak." },
      { step: "04", title: "Share", description: "One-click share drives organic community growth." },
    ],
    features: [
      { title: "Deterministic Daily Challenge", description: "A date-hash generates the same puzzle for every player globally — no backend required, no synchronization cost.", bullets: ["Zero infrastructure cost for global daily sync", "Reproducible puzzles allow community discussion and hints"] },
      { title: "Graph-Based Pathfinding", description: "The Paris Metro is modeled as a graph, enabling accurate route identification even on branched lines like 7, 10, and 13.", bullets: ["Handles forked lines and shared track segments", "Validates all valid solution paths, not just one canonical answer"] },
      { title: "PWA & Offline Support", description: "Full offline-first PWA support means players can open their daily challenge even underground in the metro itself.", bullets: ["Service worker caches all game assets on first load", "Home-screen installable on iOS and Android"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "Framer Motion"] },
      { label: "Data", chips: ["Graph adjacency list", "LocalStorage (streaks)", "Static JSON"] },
      { label: "Infra", chips: ["Cloudflare Pages", "Service Worker / PWA"] },
      { label: "Monetization", chips: ["Google AdSense"] },
    ],
    proves: [
      { iconKey: "graph", title: "Graph algorithms", description: "Modeled a real-world transit network and wrote pathfinding logic on branched topologies." },
      { iconKey: "zap", title: "Zero-backend architecture", description: "Delivered a globally synchronized daily game with zero server cost using deterministic client-side hashing." },
      { iconKey: "mobile", title: "PWA engineering", description: "Built an installable offline-capable game that achieves a 15% home-screen adoption rate." },
      { iconKey: "search", title: "Fuzzy matching", description: "Engineered an accent-tolerant string normalizer for fair and accessible guessing across varied input." },
    ],
    nextProjectSlug: "singuessr",
  },
  {
    name: "Singuessr",
    slug: "singuessr",
    description:
      "Singuessr is an interactive music blind test platform that turns any Spotify playlist into a real-time guessing game.",
    longDescription:
      "Singuessr is a dynamic music blind test platform built for fans of all genres. By leveraging the Spotify Web API through a custom high-performance proxy, it allows users to import any public playlist and play instantly. The project features a serverless architecture designed to handle regional API restrictions and high-concurrency recursive fetching.",
    caseStudy: {
      tagline: "Your playlists, your game — the ultimate dynamic blind test.",
      problem:
        "Traditional music blind tests are often static, pre-defined, or suffer from regional licensing '403 Forbidden' errors that prevent reliable audio streaming from third-party APIs like Spotify when accessed from cloud server regions.",
      context:
        "Built to solve the limitations of static music trivia. Singuessr provides a platform where content is infinite, sourced directly from the Spotify ecosystem. It targets music lovers who want personalized challenges based on their own curated playlists.",
      technicalChallenges: [
        "Architecting a Cloudflare Worker proxy to bypass CORS restrictions and regional licensing locks by injecting location-specific headers (market=FR).",
        "Implementing recursive API fetching to flatten large Spotify playlists (100+ tracks) into a single, high-speed JSON payload for the frontend.",
        "Developing a 'fuzzy' scoring algorithm that normalizes song titles, stripping metadata like '- Remastered' or '(Bonus Track)' to ensure fair guessing.",
        "Optimizing the media lifecycle in React to pre-fetch upcoming audio buffers, ensuring a zero-latency transition between game rounds.",
      ],
      architecture:
        "A hybrid serverless architecture: React SPA for the UI and a Cloudflare Worker for the API Proxy layer. The Worker handles Spotify OAuth2 flows and data orchestration, while the frontend manages the complex state of the interactive audio loop. Deployment is fully automated via Cloudflare's Edge network.",
      implementation:
        "The proxy uses a 'flatten-and-cache' strategy for playlist metadata, drastically reducing the number of round-trips from the client. Audio previews are managed via the HTML5 Audio API with a custom state machine to handle loading, playbacks, and race conditions during fast-paced guessing rounds.",
      results: [
        "Access to millions of playable playlists instantly via a single search/import interface.",
        "Sub-200ms load times for large playlists achieved by offloading data flattening to the edge.",
        "Successful monetization through privacy-first ad networks (A-Ads) while maintaining high platform performance.",
      ],
      lessonsLearned: [
        "Serverless workers are an ideal solution for API orchestration and bypassing regional restrictions in third-party media integrations.",
        "Pre-fetching assets during 'player downtime' is the most effective way to improve perceived performance in interactive media apps.",
        "Regex-based string normalization is critical when dealing with inconsistent third-party metadata naming conventions.",
        "Privacy-first monetization can be effective and performant when integrated early into the application lifecycle.",
      ],
    },
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "serverless", color: "green-text-gradient" },
      { name: "spotify-api", color: "pink-text-gradient" },
    ],
    image: singuessr_home,
    images: [
      singuessr_home,
      singuessr_blindtest,
      singuessr_create,
      singuessr_create2,
      singuessr_coverdle,
    ],
    source_code_link: "https://github.com/",
    live_link: "https://singuessr.com/",
    meta: { role: "Solo · full-stack", timeline: "2023 · 8 weeks", platform: "Web", type: "Music Platform" },
    painPoints: [
      { bold: "Regional licensing blocks streaming.", rest: "Cloud servers get 403 errors from Spotify for EU-region content — the app breaks for most users." },
      { bold: "Static blind tests get boring fast.", rest: "Pre-defined song lists don't scale and quickly lose replay value after a few sessions." },
      { bold: "Large playlists are slow to load.", rest: "Fetching 100+ tracks from Spotify's paginated API creates painful loading latency." },
    ],
    audienceWho: "Music lovers & friend groups",
    audienceDesc: "Anyone who wants to run a real-time blind test on their own curated Spotify playlists",
    audienceStats: [
      { value: "∞", label: "playable playlists" },
      { value: "<200ms", label: "large playlist load" },
      { value: "0", label: "regional blocks" },
    ],
    productFlow: [
      { step: "01", title: "Import", description: "Paste any public Spotify playlist URL." },
      { step: "02", title: "Fetch", description: "Edge worker flattens all tracks instantly." },
      { step: "03", title: "Play", description: "Audio previews stream round by round." },
      { step: "04", title: "Score", description: "Fuzzy matching validates song title guesses." },
    ],
    features: [
      { title: "Cloudflare Worker Proxy", description: "A lightweight Worker sits between the frontend and Spotify's API, injecting location-specific headers to bypass regional licensing restrictions entirely.", bullets: ["Resolves 403 regional blocks transparently to the client", "Handles OAuth2 token flow and request orchestration at the edge"] },
      { title: "Recursive Playlist Flattening", description: "A single fetch call recursively pages through all of Spotify's paginated endpoints, returning a flat track array in one round-trip.", bullets: ["Handles Spotify's 100-item page limit transparently", "Sub-200ms for large playlists via edge colocation"] },
      { title: "Audio Lifecycle Management", description: "A custom state machine pre-fetches the next audio buffer during active round play, eliminating perceived latency between game rounds.", bullets: ["Zero-latency round transitions via background pre-fetch", "Race condition handling during fast-paced guessing sequences"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "HTML5 Audio API"] },
      { label: "Edge / Backend", chips: ["Cloudflare Workers", "Spotify Web API"] },
      { label: "Algorithms", chips: ["Regex normalization", "Fuzzy matching", "State machine"] },
      { label: "Monetization", chips: ["A-Ads (privacy-first)"] },
    ],
    proves: [
      { iconKey: "server", title: "Serverless architecture", description: "Designed and shipped a Cloudflare Worker that proxies and orchestrates a third-party API at the edge." },
      { iconKey: "shield", title: "Regional restriction bypass", description: "Solved a non-obvious licensing problem that blocks most server-hosted music apps by injecting the right market headers." },
      { iconKey: "zap", title: "Performance engineering", description: "Achieved sub-200ms large playlist loading by collocating data flattening at the CDN edge." },
      { iconKey: "music", title: "Media state machine", description: "Built a robust audio lifecycle manager that handles pre-fetching and race conditions in a fast-paced game context." },
    ],
    nextProjectSlug: "fuchibol-hub",
  },
  {
    name: "FuchibolHub",
    slug: "fuchibol-hub",
    description:
      "FuchibolHub is a football-focused platform gathering multiple interactive mini-games designed for fan engagement and competition.",
    longDescription:
      "FuchibolHub is a football-focused platform gathering multiple interactive mini-games designed for fan engagement and competition. Its flagship feature is a large-scale prediction system built around the 2026 FIFA World Cup, allowing users to forecast match outcomes and tournament progress. The project explores gamification, community interaction and scalable event-driven application design.",
    caseStudy: {
      tagline: "The 2026 World Cup prediction platform — built for fans, not gamblers.",
      problem:
        "Football fans want to compete on match predictions, but existing platforms either require real-money gambling or offer engagement so shallow it doesn’t hold attention past week one. There was no free, social, reputation-based prediction platform built around the biggest football event of the decade.",
      context:
        "Built ahead of the 2026 FIFA World Cup to provide a free-to-play prediction league where groups of friends and communities can compete based on prediction accuracy. The platform needed to handle tournament bracket progression, real-time leaderboard updates, and peak traffic during major matches.",
      technicalChallenges: [
        "Real-time score and leaderboard updates using Socket.io across concurrent users during high-traffic match windows.",
        "Prediction deadline enforcement — submissions must lock precisely at each match’s kickoff time, server-side.",
        "Scalable event-driven architecture to handle tournament bracket progression (group stage → knockouts → final).",
        "Group-based scoring with configurable rules — different leagues use different point systems.",
        "Handling concurrent prediction submissions without race conditions during the minutes before kickoff.",
      ],
      architecture:
        "React frontend, Node.js/Express backend, MongoDB. Socket.io manages real-time leaderboard broadcasts. A cron-based match results processor updates scores and emits change events. Redis serves as a pub/sub layer between Socket.io worker instances. Prediction submissions are validated and locked server-side against a kickoff timestamp stored in the match document.",
      implementation:
        "Prediction submission locks at the server-validated kickoff time — the client UI countdown is cosmetic only. Match result processing runs as a background job, triggered either by webhook payload or admin action, using a queue to prevent double-processing. Leaderboard computation uses MongoDB aggregation pipelines with a 30-second Redis TTL cache to avoid recalculating on every request during peak traffic.",
      results: [
        "200+ registered users for the 2026 World Cup season ahead of launch",
        "Real-time leaderboard updates with sub-500ms latency under load",
        "Zero prediction-after-kickoff incidents due to server-side lock enforcement",
      ],
      lessonsLearned: [
        "Redis pub/sub significantly simplifies scaling Socket.io across multiple Node processes — worth adding early.",
        "Admin tooling must be built before launch — manual match result entry without a UI creates operational risk.",
        "Bracket progression logic is cleaner modeled as a state machine than as a sequence of conditional updates.",
        "Prediction deadline enforcement must be server-authoritative from day one — client-side locks are insufficient.",
      ],
    },
    tags: [
      { name: "reactjs", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "socket.io", color: "pink-text-gradient" },
    ],
    image: fuchibol,
    images: [fuchibol, fuchibol_prediction, fuchibol_games],
    source_code_link: "https://github.com/",
    meta: { role: "Solo · full-stack", timeline: "2026 · 10 weeks", platform: "Web", type: "Social Platform" },
    painPoints: [
      { bold: "Gambling platforms exclude casual fans.", rest: "Most prediction apps require real money, which puts off the majority of football fans." },
      { bold: "Free alternatives lack competitive depth.", rest: "Existing free tools don't have proper leaderboards, group play, or tournament bracket progression." },
      { bold: "Real-time updates are hard to scale.", rest: "Socket.io across multiple Node processes requires careful Redis architecture to avoid split-brain." },
    ],
    audienceWho: "Football fans & friend groups",
    audienceDesc: "Groups of friends who want to compete on 2026 World Cup predictions without gambling",
    audienceStats: [
      { value: "200+", label: "pre-launch users" },
      { value: "<500ms", label: "leaderboard latency" },
      { value: "0", label: "prediction errors" },
    ],
    productFlow: [
      { step: "01", title: "Join group", description: "Create or join a prediction league with friends." },
      { step: "02", title: "Predict", description: "Submit match predictions before kickoff lock." },
      { step: "03", title: "Watch", description: "Real-time leaderboard updates during the match." },
      { step: "04", title: "Rank", description: "Season standings updated as the tournament progresses." },
    ],
    features: [
      { title: "Real-Time Leaderboard", description: "Socket.io broadcasts score updates to all connected clients during match windows, with Redis pub/sub for horizontal scaling across Node processes.", bullets: ["Sub-500ms leaderboard refresh under concurrent load", "Redis pub/sub decouples broadcasting from score computation"] },
      { title: "Server-Side Prediction Lock", description: "Prediction submissions are validated and locked server-side against the stored kickoff timestamp — the client UI countdown is purely cosmetic.", bullets: ["Zero after-kickoff predictions in production", "Client countdown is cosmetic; the server is always authoritative"] },
      { title: "Event-Driven Score Pipeline", description: "Match result processing runs as a background job, emitting events consumed by score updater, badge evaluator, and leaderboard recalculator services.", bullets: ["Idempotent processing handles retries safely", "Bracket progression modeled as a state machine"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "Socket.io client"] },
      { label: "Backend", chips: ["Node.js", "Express", "Socket.io", "MongoDB"] },
      { label: "Real-time", chips: ["Redis pub/sub", "Cron jobs", "WebSockets"] },
      { label: "DevOps", chips: ["Docker", "Background workers"] },
    ],
    proves: [
      { iconKey: "activity", title: "Real-time architecture", description: "Designed a Socket.io system with Redis pub/sub that scales across multiple Node processes." },
      { iconKey: "lock", title: "Server-authoritative deadlines", description: "Built prediction lock enforcement that is fully server-side, with zero client-bypass incidents in production." },
      { iconKey: "layers", title: "Event-driven pipeline", description: "Architected an idempotent score processing pipeline that handles match results and bracket progression cleanly." },
      { iconKey: "users", title: "Group social mechanics", description: "Shipped configurable league rules, friend-group scoring, and bracket progression for tournament formats." },
    ],
    nextProjectSlug: "fresh-win",
  },
  {
    name: "Fresh.win",
    slug: "fresh-win",
    description:
      "Fresh.win is a sports prediction platform centered around football competitions from Europe’s top leagues.",
    longDescription:
      "Fresh.win is a sports prediction platform centered around football competitions from Europe’s top leagues. Instead of gambling with money, users compete through probability-based match predictions, rankings and community challenges. The platform integrates gamification systems such as daily rewards, referral programs, streak mechanics and seasonal competitions to maximize engagement while promoting responsible play.",
    caseStudy: {
      tagline: "Compete on football predictions — no money, just reputation.",
      problem:
        "The sports betting market has a responsible-play problem: platforms engineered for money wagering attract addictive behavior and exclude casual fans. There was a gap for a prediction platform that provided the same competitive engagement loop — leaderboards, streaks, bragging rights — without financial stakes.",
      context:
        "Fresh.win targets the large audience of football fans who want to test their match knowledge and compete socially but are put off by gambling platforms. The referral program and streak mechanics are designed to drive organic growth while daily rewards create return habits.",
      technicalChallenges: [
        "Designing a gamification engine that is engaging without being so generous that leaderboards lose meaning.",
        "Building a fraud-resistant referral tracking and attribution pipeline to prevent abuse.",
        "Implementing seasonal competition brackets and cumulative leaderboards with high query performance.",
        "Daily reward distribution system that is fair, verifiable, and resistant to timing manipulation.",
        "Balancing reward generosity vs. competition integrity — tuned through beta user feedback.",
      ],
      architecture:
        "React + Tailwind frontend, Node.js API, PostgreSQL for relational data (users, predictions, referrals, leaderboards). A points engine processes match outcomes asynchronously via a job queue. Referral codes use HMAC-signed user ID tokens with configurable expiry. The gamification engine is event-driven: match resolution emits events consumed by score updater, streak checker, badge evaluator, and leaderboard recalculator services.",
      implementation:
        "The points engine listens to match result events and triggers a pipeline: score update → streak recalculation → badge evaluation → leaderboard refresh. Each step is idempotent to handle retries safely. Daily reward distribution runs as a scheduled cron job with deduplication via a processed-date key per user. Referral fraud prevention combines rate limiting, email verification, and IP-based identity checks.",
      results: [
        "Gamification loop validated with 150+ beta users over a 6-week trial",
        "Average 4-day active retention streak among engaged users",
        "Referral system drove 40% of new user acquisition during beta phase",
      ],
      lessonsLearned: [
        "Gamification reward tuning is as important as the mechanics themselves — start conservative and increase generosity based on retention data.",
        "Referral fraud prevention must be built before public launch, not retrofitted after the first abuse incident.",
        "PostgreSQL’s relational model simplifies complex leaderboard queries compared to document stores — the right tool for this data shape.",
        "An event-driven points engine decouples business logic cleanly and makes A/B testing reward rules straightforward.",
      ],
    },
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "gamification", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: null,
    images: [],
    source_code_link: "https://github.com/",
    meta: { role: "Solo · full-stack", timeline: "2024 · 12 weeks", platform: "Web", type: "Prediction Platform" },
    painPoints: [
      { bold: "Gambling platforms harm casual fans.", rest: "Money-based prediction attracts addictive behavior and excludes fans who just want to compete." },
      { bold: "Free platforms lack depth.", rest: "Without real stakes, engagement loops collapse after week one — there's nothing to come back for." },
      { bold: "Referral fraud is rampant.", rest: "Unprotected referral systems get abused immediately after public launch." },
    ],
    audienceWho: "Football fans avoiding gambling",
    audienceDesc: "Sports fans who want competitive prediction without financial stakes — just reputation and bragging rights",
    audienceStats: [
      { value: "150+", label: "beta users" },
      { value: "4 days", label: "avg. active streak" },
      { value: "40%", label: "referral acquisition" },
    ],
    productFlow: [
      { step: "01", title: "Predict", description: "Submit match outcome predictions daily." },
      { step: "02", title: "Earn", description: "Points awarded based on prediction accuracy." },
      { step: "03", title: "Streak", description: "Daily rewards compound with active streaks." },
      { step: "04", title: "Compete", description: "Seasonal leaderboards and friend leagues." },
    ],
    features: [
      { title: "Gamification Engine", description: "An event-driven points system that processes match results asynchronously, triggering streak recalculation, badge evaluation, and leaderboard refresh in one idempotent pipeline.", bullets: ["Conservative reward tuning refined through beta feedback", "A/B testable reward rules via event-driven architecture"] },
      { title: "Referral Attribution Pipeline", description: "HMAC-signed referral tokens with configurable expiry, combined with rate limiting, email verification, and IP-based identity checks to prevent abuse.", bullets: ["Fraud prevention built before public launch, not retrofitted", "Attribution tracking survives multi-step conversion flows"] },
      { title: "Seasonal Competition System", description: "PostgreSQL aggregation pipelines compute seasonal leaderboards and cumulative standings with a Redis-cached layer for high-traffic match windows.", bullets: ["High query performance during peak match traffic", "Seasonal bracket logic modeled for clean state transitions"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS"] },
      { label: "Backend", chips: ["Node.js", "Express", "PostgreSQL"] },
      { label: "Gamification", chips: ["Event-driven engine", "HMAC tokens", "Redis cache"] },
      { label: "Infrastructure", chips: ["Cron jobs", "Job queue", "Rate limiting"] },
    ],
    proves: [
      { iconKey: "star", title: "Gamification design", description: "Designed and tuned a complete engagement loop — points, streaks, badges, leaderboards — validated with 150+ beta users." },
      { iconKey: "shield", title: "Fraud prevention", description: "Built a multi-layer referral fraud system using HMAC tokens, rate limiting, and IP checks before public launch." },
      { iconKey: "database", title: "Relational data modeling", description: "Chose PostgreSQL over a document store and leveraged its aggregation pipelines for complex leaderboard queries." },
      { iconKey: "layers", title: "Event-driven architecture", description: "Decoupled the points pipeline into independent, idempotent services that make reward rule A/B testing straightforward." },
    ],
    nextProjectSlug: "edumation",
  },
];

export const CALENDLY_URL = "https://calendly.com/fullstackchris/30min";

/** Internal URL — navigates to the embedded Calendly on the contact page */
export const BOOK_CALL_URL = "/contact#schedule";

// Sourced from .env (PUBLIC_BEEHIIV_PUBLICATION_ID) — set in Cloudflare Pages for production
export const BEEHIIV_PUBLICATION_ID = import.meta.env.PUBLIC_BEEHIIV_PUBLICATION_ID as string ?? "";

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

export { services, technologies, experiences, testimonials, projects };
