import type {
  ProjectCaseStudy,
  ProjectPainPoint,
  ProjectAudienceStat,
  ProjectMeta,
  ProjectFlowStep,
  ProjectFeature,
  ProjectStackCategory,
  ProjectProve,
} from '../../../types';

export type ProjectContent = {
  description: string;
  longDescription: string;
  caseStudy: ProjectCaseStudy;
  painPoints: ProjectPainPoint[];
  audienceWho: string;
  audienceDesc: string;
  audienceStats: ProjectAudienceStat[];
  meta: ProjectMeta;
  productFlow: ProjectFlowStep[];
  features: ProjectFeature[];
  stack: ProjectStackCategory[];
  proves: ProjectProve[];
};

export const projectsContentEn: Record<string, ProjectContent> = {
  keevo: {
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
        "Running a quantized on-device speech model within Tauri without blocking the UI thread.",
        "Handling long-form audio segmentation to produce accurate timestamps across variable speaking rates.",
        "Designing a timeline editor that lets users correct transcripts without re-running the model.",
        "Packaging native binaries for macOS and Windows within Tauri's cross-platform build pipeline.",
      ],
      architecture:
        "Tauri shell (Rust core) with a React renderer in the system webview. The speech model runs in a Rust worker spawned from the Tauri backend, with results streamed to the renderer via IPC as segments complete. SQLite stores project state locally.",
      implementation:
        "The pipeline extracts audio via ffmpeg, chunks it into overlapping segments, runs inference in a worker pool, merges results with a timestamp reconciliation pass, then surfaces them in the editor. Subtitle export supports SRT, VTT and plain text.",
      results: [
        "Processes 60 minutes of footage in under 4 minutes on Apple Silicon.",
        "Zero cloud dependency — all data stays on device.",
        "Subtitle accuracy comparable to leading cloud APIs on clean recordings.",
      ],
      lessonsLearned: [
        "Off-main-thread isolation is non-negotiable when running inference — blocking the UI thread tanks UX.",
        "Overlapping audio chunks with reconciliation produces far cleaner word boundaries than hard splits.",
        "SQLite is the right local state store for Tauri — zero setup, reliable, fast enough for this data shape.",
        "Tauri's Rust backend keeps the install footprint a fraction of Electron's while giving direct access to native inference runtimes.",
      ],
    },
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
      { title: "On-device Inference", description: "A quantized speech model runs entirely on the local machine in a Rust worker spawned by the Tauri backend — no API keys, no uploads, no recurring costs.", bullets: ["Native Rust inference runtime works on both macOS and Windows", "Results stream to the UI as segments complete"] },
      { title: "Timeline Editor", description: "Correct model output in a synchronized transcript editor — clicking any word seeks the video, so review is fast.", bullets: ["Word-level timestamp display", "Keyboard-first editing flow"] },
      { title: "Multi-format Export", description: "Export to SRT, WebVTT or plain text with a single click — ready to import into Premiere, Final Cut, DaVinci or any subtitle tool.", bullets: ["Accurate timecodes from the reconciliation pass", "UTF-8 safe for multilingual content"] },
    ],
    stack: [
      { label: "Shell", chips: ["Tauri", "Rust"] },
      { label: "UI", chips: ["React", "TypeScript"] },
      { label: "AI", chips: ["Native Rust inference", "On-device speech model"] },
      { label: "Storage", chips: ["SQLite", "ffmpeg"] },
    ],
    proves: [
      { iconKey: "cpu", title: "On-device AI", description: "Shipped a production Rust-side inference pipeline inside Tauri without blocking the UI thread." },
      { iconKey: "zap", title: "Desktop performance", description: "Processes an hour of footage in under 4 minutes via a worker-pool inference architecture." },
      { iconKey: "shield", title: "Privacy by design", description: "Zero cloud dependency — all processing stays local, making it viable for client and sensitive recordings." },
      { iconKey: "layers", title: "Cross-platform build", description: "Native binary packaging for both macOS and Windows via Tauri's single build pipeline." },
    ],
  },
  edumation: {
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
  },
  railguessr: {
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
  },
  singuessr: {
    description:
      "Singuessr is an interactive music blind test platform that turns any Spotify playlist into a real-time guessing game — playlists and cover art come from Spotify, audio previews stream from Apple Music.",
    longDescription:
      "Singuessr is a dynamic music blind test platform built for fans of all genres. It combines two music APIs: the Spotify Web API (via a custom high-performance Cloudflare Worker proxy) provides playlist metadata and album cover art, while the Apple Music / iTunes Search API delivers the 30-second audio previews that drive each round. The hybrid serverless architecture handles regional API restrictions, high-concurrency recursive fetching, and cross-catalog track matching.",
    caseStudy: {
      tagline: "Your playlists, your game — the ultimate dynamic blind test.",
      problem:
        "Traditional music blind tests are static, pre-defined, and limited in scope. On top of that, Spotify previews suffer from regional licensing '403 Forbidden' errors when fetched from cloud server regions — so an app built solely on Spotify audio breaks for most users.",
      context:
        "Built to solve the limitations of static music trivia. Singuessr uses Spotify as the source-of-truth for playlists and cover art (because that's where users curate their music), but routes audio playback through the public Apple Music / iTunes preview catalogue — which is globally reachable, unauthenticated, and free of OAuth complexity.",
      technicalChallenges: [
        "Architecting a Cloudflare Worker proxy to bypass CORS restrictions and regional licensing locks when fetching Spotify playlist data (injecting market=FR headers and handling OAuth2 token refresh at the edge).",
        "Matching every Spotify track to its Apple Music / iTunes preview equivalent across two independent catalogues, with fuzzy normalization to cope with naming inconsistencies between providers.",
        "Implementing recursive API fetching to flatten large Spotify playlists (100+ tracks) into a single, high-speed JSON payload for the frontend.",
        "Developing a 'fuzzy' scoring algorithm that normalizes song titles, stripping metadata like '- Remastered' or '(Bonus Track)' to ensure fair guessing.",
        "Optimizing the media lifecycle in React to pre-fetch upcoming Apple Music audio buffers, ensuring a zero-latency transition between game rounds.",
      ],
      architecture:
        "A hybrid serverless architecture: React SPA for the UI and a Cloudflare Worker for the API proxy layer. The Worker handles Spotify OAuth2, recursive playlist flattening, and cross-catalog matching against the public iTunes Search API to resolve each track's Apple Music preview URL. The frontend manages the interactive audio loop and feeds the round queue directly from those preview URLs. Deployment is fully automated via Cloudflare's edge network.",
      implementation:
        "The proxy uses a 'flatten-and-cache' strategy for Spotify playlist metadata (covers + titles + artists) and pipes each track into a parallel iTunes Search lookup that returns a 30-second Apple Music preview URL. Audio is then played in the React SPA via the HTML5 Audio API with a custom state machine that handles loading, playback, and race conditions during fast-paced guessing rounds.",
      results: [
        "Access to millions of playable playlists instantly via a single search/import interface.",
        "Sub-200ms load times for large playlists achieved by offloading Spotify data flattening and iTunes preview matching to the edge.",
        "Globally reachable audio playback — Apple Music previews bypass the regional licensing issues that block Spotify previews from server regions.",
        "Successful monetization through privacy-first ad networks (A-Ads) while maintaining high platform performance.",
      ],
      lessonsLearned: [
        "Cross-catalog matching (Spotify → Apple Music) is the simplest way to combine the best of both worlds: Spotify's curated playlists with Apple Music's globally-reachable preview URLs.",
        "Serverless workers are an ideal solution for API orchestration and bypassing regional restrictions in third-party media integrations.",
        "Pre-fetching assets during 'player downtime' is the most effective way to improve perceived performance in interactive media apps.",
        "Regex-based string normalization is critical when matching tracks across providers with inconsistent metadata naming conventions.",
        "Privacy-first monetization can be effective and performant when integrated early into the application lifecycle.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 8 weeks", platform: "Web", type: "Music Platform" },
    painPoints: [
      { bold: "Regional licensing blocks Spotify previews.", rest: "Cloud servers get 403 errors from Spotify preview URLs for EU-region content — audio simply doesn't play for most users." },
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
      { step: "02", title: "Resolve", description: "Edge worker flattens Spotify tracks and matches each to its Apple Music preview." },
      { step: "03", title: "Play", description: "Apple Music previews stream round by round, with cover art from Spotify." },
      { step: "04", title: "Score", description: "Fuzzy matching validates song title guesses." },
    ],
    features: [
      { title: "Cloudflare Worker Proxy", description: "A lightweight Worker orchestrates two APIs: it hits Spotify for playlist data + album covers (with the right market headers to dodge regional blocks), then resolves every track to its Apple Music preview URL via iTunes Search.", bullets: ["Resolves Spotify 403 regional blocks transparently to the client", "Cross-catalog matching against iTunes Search to find each preview URL", "Handles OAuth2 token flow and request orchestration at the edge"] },
      { title: "Recursive Playlist Flattening", description: "A single fetch call recursively pages through all of Spotify's paginated endpoints, returning a flat track array — each enriched with its matched Apple Music preview — in one round-trip.", bullets: ["Handles Spotify's 100-item page limit transparently", "Sub-200ms for large playlists via edge colocation"] },
      { title: "Audio Lifecycle Management", description: "A custom state machine pre-fetches the next Apple Music preview buffer during active round play, eliminating perceived latency between game rounds.", bullets: ["Zero-latency round transitions via background pre-fetch", "Race condition handling during fast-paced guessing sequences"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "HTML5 Audio API"] },
      { label: "Edge / Backend", chips: ["Cloudflare Workers", "Spotify Web API", "Apple Music / iTunes Search API"] },
      { label: "Algorithms", chips: ["Regex normalization", "Cross-catalog matching", "Fuzzy matching", "State machine"] },
      { label: "Monetization", chips: ["A-Ads (privacy-first)"] },
    ],
    proves: [
      { iconKey: "server", title: "Serverless architecture", description: "Designed and shipped a Cloudflare Worker that proxies and orchestrates two music APIs at the edge." },
      { iconKey: "shield", title: "Regional restriction bypass", description: "Combined Spotify (playlists + cover art) with Apple Music (globally reachable previews) so audio plays for every user, regardless of region." },
      { iconKey: "zap", title: "Performance engineering", description: "Achieved sub-200ms large playlist loading by collocating data flattening and cross-catalog matching at the CDN edge." },
      { iconKey: "music", title: "Media state machine", description: "Built a robust audio lifecycle manager that handles pre-fetching and race conditions in a fast-paced game context." },
    ],
  },
  "fuchibol-hub": {
    description:
      "FuchibolHub is a football-focused platform gathering multiple interactive mini-games designed for fan engagement and competition.",
    longDescription:
      "FuchibolHub is a football-focused platform gathering multiple interactive mini-games designed for fan engagement and competition. Its flagship feature is a large-scale prediction system built around the 2026 FIFA World Cup, allowing users to forecast match outcomes and tournament progress. The project explores gamification, community interaction and scalable event-driven application design.",
    caseStudy: {
      tagline: "The 2026 World Cup prediction platform — built for fans, not gamblers.",
      problem:
        "Football fans want to compete on match predictions, but existing platforms either require real-money gambling or offer engagement so shallow it doesn't hold attention past week one. There was no free, social, reputation-based prediction platform built around the biggest football event of the decade.",
      context:
        "Built ahead of the 2026 FIFA World Cup to provide a free-to-play prediction league where groups of friends and communities can compete based on prediction accuracy. The platform needed to handle tournament bracket progression, real-time leaderboard updates, and peak traffic during major matches.",
      technicalChallenges: [
        "Real-time score and leaderboard updates using Socket.io across concurrent users during high-traffic match windows.",
        "Prediction deadline enforcement — submissions must lock precisely at each match's kickoff time, server-side.",
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
  },
  "fresh-win": {
    description:
      "Fresh.win is a sports prediction platform centered around football competitions from Europe's top leagues.",
    longDescription:
      "Fresh.win is a sports prediction platform centered around football competitions from Europe's top leagues. Instead of gambling with money, users compete through probability-based match predictions, rankings and community challenges. The platform integrates gamification systems such as daily rewards, referral programs, streak mechanics and seasonal competitions to maximize engagement while promoting responsible play.",
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
        "PostgreSQL's relational model simplifies complex leaderboard queries compared to document stores — the right tool for this data shape.",
        "An event-driven points engine decouples business logic cleanly and makes A/B testing reward rules straightforward.",
      ],
    },
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
  },
};
