# Motion Design — About page (`About Me.html`)

**What this is:** the creative motion brief for the About page — the *why* and the *choreography*. Pair it with `MOTION_HANDOFF_About.md`, which holds the exact numbers an engineer builds to.
**Built on:** the shared motion system (`motion.css` + `motion.js`) already powering Projects & Services, plus the homepage hero's entrance language (`@keyframes rise`, `.reveal`). No new engine, no new dependency — the About page is a *recomposition* of the existing vocabulary.

---

## 1. Intent

The page has one job: make a solo engineer feel like a credible, production-grade studio. Motion does that in three ways:

1. **Calm authority, not flash.** Everything eases in slowly (700–800 ms) on a single decelerate curve. Nothing bounces, nothing loops aggressively in the reader's face. The only continuous loops are a 7 px "available" heartbeat and a barely-perceptible pill bob — signals of *liveness*, not decoration.
2. **Reading order is choreographed.** The hero staggers top-to-bottom so the eye lands on the CTAs exactly as they arrive. Each section below reveals its header first, then its content, so the page always reads in the intended sequence even while scrolling fast.
3. **The career is literally drawn.** The timeline's accent rail fills downward as it enters view while the six roles rise in sequence — a 1.7 s gesture that says "a decade, built step by step."

If a single principle governs the page: **state changes are earned by scrolling, never by waiting.** Reveals fire once on entry and stay; nothing re-animates or distracts after it has landed.

---

## 2. The choreography, top to bottom

### Act 1 — Hero entrance (on load, CSS only)
A staggered rise. Each left-column element fades up 16 px on a 100 ms cadence:

| Beat | Element | Delay |
|---|---|---|
| 1 | Breadcrumb + eyebrow (`AI FULLSTACK ENGINEER` + heartbeat dot) | 50 ms |
| 2 | Headline "Production-ready products, end to end." | 150 ms |
| 3 | Lead paragraph | 250 ms |
| 4 | CTA row | 350 ms |
| 5 | Stat row (count-ups) | 450 ms |

The **portrait** (`.reveal-v`) enters in parallel at 300 ms with a deeper offset (24 px) and a subtle `scale(.98 → 1)` — it rises *into* its frame a beat after the headline lands, so the reader reads the promise, then meets the person.

As the stat row appears, three numbers **count up** from zero: `7000+` teaching hours, `10+ yrs` shipping, `3` disciplines. Tabular figures, ~1.3 s, easeOutCubic — they settle, they don't spin forever.

Around the portrait, four glassy tool pills (**React · Node.js · Rust·Tauri · Claude Code**) **bob** gently out of phase and drift with the cursor via pointer parallax (desktop only). The violet glow behind the head is static — it's the same accent halo the photo was graded into, so the portrait reads as native to the page rather than pasted on.

### Act 2 — Approach (scroll reveal)
Section header fades in first. Then the three discipline cards (01 Fullstack · 02 Automation · 03 Applied AI) rise in a 120 ms stagger. Cards lift 3 px on hover — the only interactive motion here.

### Act 3 — Bio + At a glance (scroll reveal)
The three biography paragraphs fade in (no slide — this is the "settle and read" moment, motion gets out of the way). The **At a glance** panel slides in from the right (26 px) and then *sticks* to the viewport while the prose scrolls past it — a quiet way to keep the credentials in view.

### Act 4 — Career timeline (the signature gesture)
The hero of the page. When the timeline scrolls into view:
- the **accent rail draws downward** (`scaleY 0 → 1`) over 1.7 s, a gradient line with a soft violet glow stitching the roles together;
- the **six role cards rise** left-to-right-of-the-rail in a 120 ms stagger, numbered nodes glowing as they arrive;
- the two current roles carry a green **"Now"** tag — the only non-violet accent on the page, marking the live present at the bottom of the timeline.

### Act 5 — Tech stack (scroll reveal)
Fifteen tool chips **pop in** on a fast 55 ms stagger (`scale .97 → 1`) — a quick, confident flurry rather than a slow parade. The four AI tools (Claude Code, Codex, Stitch, Antigravity) are accent-tinted and dotted, separating "daily stack" from "AI workflow." Chips lift on hover.

### Act 6 — CTA band (scroll reveal)
Header and copy fade up, buttons arrive last. The page ends on the same violet glow it opened with — a closed loop.

---

## 3. Texture & continuous loops (the quiet layer)

| Loop | Where | Feel |
|---|---|---|
| Heartbeat pulse (2.6 s) | Eyebrow dot + "Available for projects" tag | "This practice is live." |
| Pill bob (6.6–8.3 s, out of phase) | 4 hero tool pills | Dimensional, floating, premium. |
| Pointer parallax (lerp 0.06) | Portrait + pills, desktop | Subtle 3-D depth on mouse-move. |
| Static violet glow + masked grid | Hero & CTA backgrounds | Brand "blueprint" texture. |

All four are decorative and **all four stop** under `prefers-reduced-motion`.

---

## 4. Accessibility stance

Reduced motion is not an afterthought — it's a first-class state inherited from `motion.css`: every loop halts, every reveal renders at its final position with no transition, count-ups jump to their value, parallax is skipped. The page is fully legible and complete with zero motion. Content is also visible without JS (`.no-js` guard), so nothing readable depends on the animation layer.

---

## 5. Why these choices

- **One curve** (`cubic-bezier(.2,.7,.2,1)`) across every entrance = a coherent "voice." Mixing easings would read as careless.
- **Fire-once reveals** respect the reader — a portfolio that re-animates on every scroll feels like a toy.
- **The timeline draw is the only "big" gesture** — spending the motion budget on the career section tells the visitor where to look and what matters.
- **Green appears exactly twice** (the two "Now" roles + the available dot) — scarcity makes it mean "current / live."

> Implementation numbers — triggers, durations, easings, per-element timing, perf and reduced-motion specifics — are in `MOTION_HANDOFF_About.md`.
