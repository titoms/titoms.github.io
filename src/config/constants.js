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
  figma,
  docker,
  threejs,
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
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
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

const technologies = [
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
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Front End Developer",
    company_name: "EventMaker",
    icon: eventmaker,
    iconBg: "#383E56",
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
    iconBg: "#E6DEDD",
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
    iconBg: "#383E56",
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
    iconBg: "#E6DEDD",
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
    iconBg: "#383E56",
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
    iconBg: "#1d1836",
    date: "Jan 2019 - today",
    points: [
      "As an Independent Programming Instructor, I have delivered over 7,000 hours of technical training in private higher-education institutions, teaching students from Bachelor to Master level.",
      "My teaching covers both theoretical foundations and real-world software engineering practices, helping students understand not only how to code but how to design, structure and communicate complex technical systems.",
      "This experience has strengthened my ability to break down complex concepts, document architectures clearly and collaborate efficiently with both technical and non-technical stakeholders — skills directly transferable to professional software development environments.",
    ],
  },
];

const testimonials = [
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

const projects = [
  {
    name: "Edumation",
    slug: "edumation",
    description:
      "Edumation is a comprehensive education management platform focused on solving complex scheduling and administrative challenges.",
    longDescription:
      "Edumation is a comprehensive education management platform focused on solving complex scheduling and administrative challenges. The application enables institutions to manage schools, teachers, students, courses, programs and quizzes while automatically generating optimized schedules based on availability constraints. Designed with scalability in mind, the project aims to progressively evolve into a complete ecosystem for professional training and educational operations.",
    caseStudy: {
      tagline: "Automated scheduling for education institutions — from weeks to minutes.",
      problem:
        "Education institutions manually build complex weekly schedules across dozens of teachers, rooms, and courses. The process takes weeks, introduces conflicts that disrupt entire semesters, and needs to be redone whenever a teacher or room becomes unavailable. No affordable off-the-shelf tool handles multi-program constraint scheduling at this level of granularity.",
      context:
        "Built for professional training organizations managing multiple schools, programs, and student cohorts. The platform needed to handle constraint-based scheduling (teacher availability, room capacity, course prerequisites) at scale while remaining accessible to non-technical administrators.",
      technicalChallenges: [
        "Designing a constraint satisfaction scheduling algorithm that handles competing constraints (teacher availability, room capacity, course dependencies) without exponential runtime.",
        "Building real-time conflict detection across overlapping scheduling entities — a single change can cascade through hundreds of slots.",
        "Multi-tenant architecture where each institution’s data must be strictly isolated while sharing infrastructure.",
        "Role-based access control spanning 4 user types (admin, teacher, student, institution manager) with different data visibility per role.",
        "Performance under bulk schedule generation for institutions with 50+ teachers and 200+ weekly slots.",
      ],
      architecture:
        "Three-tier architecture: React SPA frontend, Node.js REST API, MongoDB. The scheduling engine runs server-side as a standalone service. Redis caches generated schedule states between generation passes. Docker Compose manages local and production environments. Each institution lives in its own MongoDB database for strict data isolation.",
      implementation:
        "The scheduling engine uses a greedy constraint satisfaction approach — time slots are filled in priority order (mandatory courses first), with backtracking when a conflict is detected. Each entity (teacher, room, course) maintains an availability bitfield that can be checked in O(1). JWT authentication with scoped permission tokens per user role. Bulk schedule generation runs as an async job with progress events streamed to the frontend via Server-Sent Events.",
      results: [
        "Schedule generation time reduced from ~2 weeks to under 5 minutes for a 200-slot week",
        "Zero scheduling conflicts recorded across 3 pilot institutions during initial rollout",
        "Admin time spent on scheduling reduced by an estimated 90% per semester",
      ],
      lessonsLearned: [
        "Constraint satisfaction problems benefit heavily from aggressive caching of intermediate states — naive backtracking was 40× slower before memoization.",
        "Role-based access control is best enforced at the data layer (query filters), not just at the API middleware layer.",
        "Multi-tenant schemas require index design decisions from day one — retrofitting indexes on large datasets is painful.",
        "Streaming progress updates via SSE dramatically improves perceived performance for long-running jobs.",
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
  },
  {
    name: "Railguessr",
    slug: "railguessr",
    description:
      "Railguessr is an online geography and transit-based game inspired by exploration and deduction mechanics.",
    longDescription:
      "Railguessr is an online geography and transit-based game inspired by exploration and deduction mechanics. Players can guess the station of the day or reconstruct metro routes in the correct order across multiple cities and difficulty modes. Built as an experimentation project around game design, engagement mechanics and web monetization through advertising.",
    caseStudy: {
      tagline: "Geography meets transit — guess the station, beat the clock.",
      problem:
        "Geography games exist in abundance, but none focus on public transit networks — a subject with a passionate community of urban enthusiasts, commuters, and transit fans worldwide. The daily challenge format pioneered by Wordle had no equivalent in the transit space.",
      context:
        "Built as a side project to explore game design, engagement loops, and client-side application architecture. Railguessr targets transit fans who want a daily mental challenge tied to real metro systems. The live version covers Paris, London, New York, and Berlin.",
      technicalChallenges: [
        "Rendering interactive metro network maps using the HTML Canvas API with accurate geographic projection.",
        "Implementing a daily challenge system that synchronizes across all users without any backend infrastructure.",
        "Persisting game state, streaks, and history across sessions without user accounts or a database.",
        "Building mobile-friendly touch and drag interactions on Canvas elements across device sizes.",
        "Procedural route generation with difficulty scaling based on network complexity per city.",
      ],
      architecture:
        "Fully client-side React application — no backend, no database. Metro network data is stored as JSON graph structures (adjacency lists with geographic coordinates). The Canvas renderer projects real geographic coordinates to screen space using a custom 2D linear projection. The daily challenge seed is derived deterministically from the current date, ensuring every player gets the same challenge globally.",
      implementation:
        "Each city’s metro network is modeled as a weighted graph where nodes are stations and edges are line segments. The Canvas layer is split into a static background (painted once) and an interactive foreground (repainted on interaction) to maintain 60fps. The daily seed uses a hash of YYYY-MM-DD to select the target station. LocalStorage stores the player’s guess history, streaks, and completion status per city.",
      results: [
        "500+ monthly active users organically within 3 months of launch",
        "4 cities available — Paris, London, NYC, Berlin — with community-requested additions",
        "Average session length of 8 minutes, well above typical casual game benchmarks",
      ],
      lessonsLearned: [
        "Date-seeded client-side randomness is sufficient for non-competitive daily challenges — no backend required.",
        "Canvas performance requires strict layer separation between static backgrounds and interactive overlays.",
        "LocalStorage-based persistence works well for casual games but limits cross-device continuity — a future account system could address this.",
        "Community feedback drives feature priority faster than any roadmap — the most-requested cities came from Twitter mentions.",
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
  },
];

export const CALENDLY_URL = "https://calendly.com/christophe-crognier/30min";
export { services, technologies, experiences, testimonials, projects };
