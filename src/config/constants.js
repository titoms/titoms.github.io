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
  singuessr_home,
  singuessr_blindtest,
  singuessr_create,
  singuessr_create2,
  singuessr_coverdle,
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

export const CALENDLY_URL = "https://calendly.com/fullstackchris/30min";
export { services, technologies, experiences, testimonials, projects };
