# Motion Handoff — Homepage Hero (`Hero Variants.html`)

**Target stack:** Astro + React islands · TypeScript · Tailwind CSS · (optional) Framer Motion
**Source of truth:** `Hero Variants.html` → `variants.jsx` (logic) + `hero-variants.css` (motion) + `styles.css` (tokens)
**Entrance reference:** `Hero Section.html` — defines the page-load reveal stagger, connector-line fill, shipped state, and pointer parallax to apply to the chosen variant.
**Scope:** Three hero directions share one chrome layer (nav, eyebrow, headline, CTAs, background field, floating tool pills). Each variant then adds one **staged reveal sequence** driven by a shared timing hook.

This document is the implementation contract. Every animation below has explicit trigger, states, timing, easing, technique, perf and responsive notes. Build to these numbers — they are lifted directly from the source CSS/JSX.

---

## 0. Global decisions (read first)

### 0.1 The staged sequences: loop in the mockup → fire-once on the live site
In the source, all three variants run their reveal on an **auto-advancing, auto-resetting timer** (`useSequence`) so the design canvas demonstrates motion in a loop. **On the production site this is wrong** — an infinitely looping hero is distracting and burns CPU. Implement the staged sequences as **on-scroll-into-view, play once** instead, keeping the exact per-step timing below. Keep the looping behavior ONLY if a stakeholder explicitly asks for an ambient/animated hero.

- Recommended: `IntersectionObserver` (threshold ~0.4) → start the step timeline once → leave it on the final state.
- The shared timing knobs map 1:1 to the source `useSequence(count, { step, hold, start })`:
  - **start** = delay before step 1 (650 ms)
  - **step** = gap between consecutive steps
  - **hold** = pause on the full state before reset — **drop this entirely** in fire-once mode.

### 0.2 `prefers-reduced-motion` is mandatory
The source already honors it: `useSequence` jumps straight to the final state, and a `@media (prefers-reduced-motion: reduce)` block kills every continuous loop (blobs, float, pulse, blink, caret). Replicate exactly:
- Reduced motion → render the **final/active state immediately**, no transitions, no loops.
- Provide a single React hook `usePrefersReducedMotion()` and gate all timelines through it.

### 0.3 Animate only `transform`, `opacity`, `box-shadow`, `border-color`, and a single `width`
Every motion in this design is GPU-cheap by construction. Do not animate layout properties (`top/left/width/height` for movement, `margin`, `font-size`). The one `width` animation (V3 progress fill) is acceptable because it is a thin 2 px bar — see §8.

### 0.4 Design tokens (from `styles.css` — use these, do not hard-code hex)
```
--accent-400: #a78bfa  (primary)   --accent-300: #c4b5fd   --accent-500: #8f6ef3
--accent-soft: rgba(167,139,250,.12)   --accent-glow: rgba(167,139,250,.35)
--positive: #5fd99a   --positive-soft: rgba(95,217,154,.14)
--bg-0:#0d0d10 --bg-1:#131318 --bg-2:#1a1a20 --bg-3:#22222a --bg-4:#2c2c35
--border:rgba(255,255,255,.08) --border-strong:rgba(255,255,255,.14) --border-accent:rgba(167,139,250,.40)
--text-hi:#f4f4f6 --text-mid:#a4a4af --text-low:#6c6c78 --text-on-accent:#15101f
font-display: 'Space Grotesk' · font-body: 'Hanken Grotesk' · font-mono: 'JetBrains Mono'
```
Mirror these as Tailwind theme tokens (`theme.extend.colors.accent[...]`, `boxShadow.glow`, etc.) so class names stay legible.

### 0.5 Suggested Tailwind easing/keyframe additions
```js
// tailwind.config.{ts,js} → theme.extend
transitionTimingFunction: {
  'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',   // staged reveals
  'in-out-soft': 'cubic-bezier(0.45, 0, 0.55, 1)', // continuous drifts
},
keyframes: {
  drift1: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(50px,36px) scale(1.08)' } },
  drift2: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(-44px,26px) scale(1.1)' } },
  drift3: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(28px,-34px) scale(1.06)' } },
  floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
  pulse:  { '0%': { boxShadow: '0 0 0 0 rgba(167,139,250,.5)' }, '70%': { boxShadow: '0 0 0 8px rgba(167,139,250,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(167,139,250,0)' } },
  blink:  { '50%': { opacity: '0' } },
},
animation: {
  drift1: 'drift1 28s ease-in-out infinite',
  drift2: 'drift2 34s ease-in-out infinite',
  drift3: 'drift3 31s ease-in-out infinite',
  pulse:  'pulse 2.6s ease-out infinite',
  blink:  'blink 1.1s step-end infinite',
  // floaty uses per-instance duration/delay → set via inline style, not a fixed util
},
```

### 0.6 Astro island boundaries
- The hero **chrome** (nav, headline, CTAs, background blobs, grid, floating pills) is **static markup + pure CSS animation** → ship as plain Astro `.astro`, **no JS island**. Loops are declarative CSS; they need no React.
- Only the **staged reveal** of the active variant needs state → wrap *that subtree* in a React island with `client:visible` so the IntersectionObserver/timeline ships only when the hero scrolls near the viewport. Do not hydrate the whole hero.

---

## 1. Background gradient field (3 drifting blobs)

| | |
|---|---|
| **Element** | `.vbg > .vblob.b1 / .b2 / .b3` — three large blurred radial-gradient circles behind everything (`z-index:0`). |
| **Purpose** | Ambient depth + premium "alive" feel without drawing attention. Slow, near-imperceptible parallax wander. |
| **Trigger** | Continuous loop, starts on page load. |
| **Initial state** | b1: 620×620, top-left, `radial-gradient(circle, rgba(143,110,243,.38), transparent 64%)`. b2: 560×560, top-right, violet `rgba(124,92,232,.28)`. b3: 520×520, bottom-center, `rgba(167,139,250,.20)`. All `filter: blur(80px)`, `border-radius:50%`. |
| **Active state** | Each translates + scales and returns (see keyframes). b1 `translate(50px,36px) scale(1.08)`; b2 `translate(-44px,26px) scale(1.1)`; b3 `translate(28px,-34px) scale(1.06)`. |
| **Timing** | b1 **28s**, b2 **34s**, b3 **31s**. No delay. `infinite`. Deliberately desynchronized (prime-ish periods) so the field never visibly repeats. |
| **Easing** | `ease-in-out` (sine-like in/out at the extremes). |
| **Technique** | **CSS only.** Pure `@keyframes` on `transform`. Never Framer Motion — this must run with zero JS. |
| **Performance** | `will-change: transform` is already set. `blur(80px)` is the one expensive paint: it is applied to **static, GPU-composited** layers that only transform (cheap), so it's fine — **do not** also animate the blur radius. Keep blob count at 3. Promote each blob to its own layer (transform animation already does this). |
| **Responsive** | Keep on all breakpoints — they're decorative and behind a mask. On mobile, the blobs naturally clip; no change needed. Optionally reduce to 2 blobs < 640 px to save fill-rate on low-end phones. |
| **Reduced motion** | `animation: none` (blobs sit at initial position). Already in the source's reduced-motion block. |

```html
<div class="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
  <span class="absolute -top-60 -left-30 h-[620px] w-[620px] rounded-full blur-[80px] animate-drift1
               [background:radial-gradient(circle,rgba(143,110,243,.38),transparent_64%)] will-change-transform"></span>
  <!-- b2, b3 analogous with animate-drift2 / animate-drift3 -->
</div>
```

---

## 2. Grid overlay (`.vgrid::after`)

| | |
|---|---|
| **Element** | Masked square grid (58×58 px lines) faded by a radial mask, behind content. **V1 and V3 only.** |
| **Purpose** | Technical "blueprint" texture reinforcing the build/engineering theme. |
| **Trigger** | None — **static**. Listed so it is not mistaken for an animation. |
| **Technique** | CSS only: layered `linear-gradient` lines + `mask-image: radial-gradient(ellipse 90% 75% at 50% 10%, #000 22%, transparent 72%)`. Opacity 0.5. |
| **Performance** | Pure paint, never repaints (no animation). Implement as a `::after` or a static `<div>`. Do not animate. |
| **Responsive** | Fine as-is; the mask scales with the box. |

---

## 3. Eyebrow status pulse (`.v-eyebrow .pulse`)

| | |
|---|---|
| **Element** | 7 px violet dot inside the "Full-stack development · AI workflows…" eyebrow pill (all variants). |
| **Purpose** | "Live / available" signal — a heartbeat that says the practice is active. |
| **Trigger** | Continuous loop, on load. |
| **Initial state** | Solid `--accent-400` dot, `box-shadow: 0 0 0 0 rgba(167,139,250,.5)`. |
| **Active state** | An expanding ring that fades: shadow grows to `0 0 0 8px rgba(167,139,250,0)` then collapses. |
| **Timing** | **2.6s**, `infinite`. Keyframes `0% → 70% → 100%`. No delay. |
| **Easing** | `ease-out`. |
| **Technique** | **CSS only** (`animate-pulse` custom keyframe from §0.5 — note: NOT Tailwind's default `animate-pulse`, which is an opacity blink). Animate `box-shadow` only. |
| **Performance** | `box-shadow` animation triggers paint but on a 7 px element it is negligible. Acceptable. Do not convert to a scaling pseudo-element unless profiling demands it. |
| **Responsive** | Unchanged across breakpoints. |
| **Reduced motion** | `animation: none` → static dot. |

---

## 4. Floating tool pills (`.tool-pill.float.f-anim`)

| | |
|---|---|
| **Element** | Absolutely-positioned mono pills (React, TypeScript, Stripe, Codex, Node.js, Claude Code, Design System) scattered around the hero. **V1 (6 pills) and V3 (6 pills).** V2 renders the same pills **inline, non-floating** under the copy (no float animation). |
| **Purpose** | Show the real toolchain at a glance; gentle bobbing makes them feel like they're hovering in space (premium, dimensional). |
| **Trigger** | Continuous loop, on load. |
| **Initial state** | `translateY(0)`. Glassy: `background: rgba(34,34,42,.82)`, `border:1px solid var(--border-strong)`, `backdrop-filter: blur(10px)`, `box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,.05)`. |
| **Active state** | Bob up to `translateY(-12px)` and back. |
| **Timing** | **Per-pill duration 6.5s–8.4s**, **per-pill delay 0–1.3s**, `infinite`. Exact values are inline CSS vars on each pill — **preserve them** so pills drift out of phase (never bob in unison). See table below. |
| **Easing** | `ease-in-out`. |
| **Technique** | **CSS only.** `@keyframes floaty` translating Y. Because duration/delay differ per pill, set them via inline style / CSS custom props (`--dur`, `--del`) — not a single Tailwind utility. |
| **Performance** | `transform`-only → compositor-friendly. `backdrop-filter: blur(10px)` is the cost here: keep it, but **do not** animate it. Cap floating pills at 6. |
| **Responsive** | **Hide floating pills below ~1024 px** (`hidden lg:block`). They're absolutely positioned for a 1280-wide canvas and will collide with copy on tablet/mobile. On mobile, fall back to the **V2 inline-pill** treatment (a wrapped row under the subhead) if pills are desired. |
| **Reduced motion** | `animation: none` → pills sit still at their positions. |

**Exact per-pill timing (preserve):**

| Variant | Pill | Position | `--dur` | `--del` |
|---|---|---|---|---|
| V1 | React | top:96 left:52 | 6.5s | 0 |
| V1 | TypeScript | top:250 left:28 | 8.4s | .8s |
| V1 | Stripe | top:120 right:70 | 7.1s | .3s |
| V1 | Codex | top:280 right:36 | 8s | 1.1s |
| V1 | Node.js | bottom:92 left:80 | 7.6s | .5s |
| V1 | Claude Code | bottom:70 right:96 | 6.9s | .9s |
| V3 | React | top:92 left:70 | 6.6s | 0 |
| V3 | Node.js | top:116 right:80 | 7.7s | .6s |
| V3 | TypeScript | top:210 left:34 | 8.3s | 1s |
| V3 | Stripe | top:232 right:40 | 7.2s | .4s |
| V3 | Codex | bottom:78 left:96 | 8.1s | .9s |
| V3 | Design System | bottom:64 right:110 | 7.4s | 1.3s |

```html
<span class="tool-pill float ... hidden lg:inline-flex animate-[floaty_var(--dur)_ease-in-out_infinite]"
      style="top:96px;left:52px;--dur:6.5s;animation-delay:0s">React</span>
```

---

## 5. CTA buttons (`.v-btn.primary` / `.secondary` + `.ar` arrow)

| | |
|---|---|
| **Element** | "Start your project →" (primary, violet) and "Explore the AI Clarity Framework" (secondary). All variants. |
| **Purpose** | Tactile affordance + directional cue (arrow nudges right toward the action). |
| **Trigger** | **On hover** (and `:active`, `:focus-visible`). |
| **Initial state** | Primary: `background:--accent-400`, `box-shadow: 0 0 0 1px rgba(167,139,250,.4), 0 8px 24px rgba(124,92,232,.25)`. Arrow `translateX(0)`. |
| **Hover state** | Primary: `background:--accent-300`, `box-shadow: var(--glow), 0 8px 28px rgba(124,92,232,.35)`. Secondary: `bg --bg-2→--bg-3`, `border → --accent-400`. Arrow `translateX(3px)`. |
| **Active (press)** | `transform: translateY(1px)` (from base `.btn`). |
| **Timing** | `transform .12s`, `background .15s`, `border-color .15s`, `box-shadow .2s`. Arrow `transform .15s`. No delay. |
| **Easing** | `ease` (browser default). |
| **Technique** | **CSS only** (Tailwind `transition` + `hover:`/`active:`/`focus-visible:` variants). No JS, no Framer Motion. |
| **Performance** | `transform`/`box-shadow`/`background` only — trivial. |
| **Responsive** | Identical; ensure tap target ≥ 44 px (current padding `13px 20px` + font ≈ 46 px tall — OK). On touch, hover states won't trigger; the press `translateY(1px)` provides feedback. |
| **Reduced motion** | Hover color changes may stay (they're instant enough); optionally drop the arrow translate. Not critical. |
| **Accessibility** | Keep `:focus-visible { outline: 2px solid var(--accent-400); outline-offset:2px }` from `styles.css`. |

---

## 6. VARIANT 1 — Command-center palette reveal

A fake ⌘K command palette types a prompt, then "runs" a 6-row build plan one row at a time.

### 6.1 Typed query cursor (`.palette-input .cursor`)
| | |
|---|---|
| **Purpose** | Sells the "you type an idea" interaction. |
| **Trigger** | Continuous loop (blink). The text itself is **static** in the source (not a typewriter) — render the full string `"an app that helps my clients book & pay online"` and blink only the caret. *(Optional upgrade: a real typewriter on scroll-in — see §6.4.)* |
| **States** | Caret `opacity 1 ↔ 0`. |
| **Timing** | `blink 1.1s step-end infinite`. |
| **Easing** | `step-end` (hard on/off, terminal-style). |
| **Technique** | CSS only. |
| **Reduced motion** | `animation: none` → caret solid. |

### 6.2 Build-plan rows reveal (`.prow` → `.done` / `.active`)  ★ core sequence
| | |
|---|---|
| **Element** | 6 rows: Idea, Scope, Design, Stack, Roadmap, Build. |
| **Purpose** | Visualize the AI Clarity Framework executing step-by-step — the product's core promise. |
| **Trigger** | **On scroll into view, play once** (source loops via `useSequence(6,{step:850,hold:1900,start:650})`). |
| **Initial state (each row)** | icon tile `background:--bg-3`, `border:--border-strong`, `color:--text-low`; label `--text-mid`; `⏎ run` hint `opacity:0`; transparent border. |
| **Step n state** | Rows `0…n-1` get `.done`: icon tile → `--accent-soft` bg, `--border-accent`, `--accent-300` icon; label → `--text-hi`. The **current** row (`n-1`) ALSO gets `.active`: row bg `--accent-soft`, `border --border-accent`, `box-shadow: 0 0 22px rgba(167,139,250,.18), inset 0 0 0 1px rgba(167,139,250,.1)`; its icon tile fills solid `--accent-400` with `color:--text-on-accent` + `box-shadow: 0 0 18px rgba(167,139,250,.5)`; `⏎ run` fades to `opacity:1`, color `--accent-300`. |
| **Timing** | first step at **650 ms**; **850 ms** between steps; total reveal ≈ 650 + 6×850 ≈ **5.75 s**. Each row's visual change transitions over **.3s** (`background/border-color/box-shadow .3s`, icon `all .3s`). |
| **Easing** | `ease` for the per-row property transitions; the *step cadence* is a discrete timer (not eased). |
| **Technique** | **React island** drives an integer `n` (0→6); CSS classes do the visuals. No Framer Motion required — toggling `.done`/`.active` classes + CSS transitions is enough and lighter. (Framer optional if you want spring on the icon-tile fill.) |
| **Performance** | Animating `box-shadow`/`background`/`border` on 6 small rows is fine. Avoid animating row height/layout. The whole palette is a fixed-size card — no layout shift as rows light up (they're all present from the start, only styling changes). |
| **Responsive** | Palette `max-width:660px`. Below ~700 px, let it go full-width with reduced padding; rows stay stacked (already vertical). Keep font ≥ 14 px. Consider shortening descriptions on mobile. |
| **Reduced motion** | `n = count` immediately → all rows `.done`, last row `.active`, no stagger. |

```tsx
// Variant1Palette.tsx  (client:visible island)
const ROWS = [['idea','Idea','…'], …]; // 6
const n = useStagedReveal(ROWS.length, { start: 650, step: 850 }); // fires once on in-view
return ROWS.map(([ic,name,desc], i) => (
  <div className={cx('prow', i < n && 'done', i === n-1 && 'active')}>…</div>
));
```

---

## 7. VARIANT 2 — AI build-board reveal

A 6-tile board (PRD → Roadmap → Editor → Agent tasks → Design system → Deploy) activates left-to-right, ending in a green "Deployed" state.

### 7.1 Board cards activate in sequence (`.bcard` → `.done` / `.active`)  ★ core sequence
| | |
|---|---|
| **Element** | Cards index 0–4 (PRD, Roadmap, Editor[span2], Agent tasks, Design system) + the deploy bar (index 5). |
| **Purpose** | Show the AI build pipeline producing a working app — PRD parsed → roadmap scoped → code written → tasks done → design system → deployed. |
| **Trigger** | **On scroll into view, play once** (source `useSequence(6,{step:900,hold:2000})`, start 650 ms). |
| **Initial state** | `bcard`: `border:--border`, no glow, `translateY(0)`; status pill text e.g. "draft"/"queued"; `bdot` icon tile `--bg-3`/`--text-low`. |
| **Step n** | cards `<n` = `.done` (status pill flips to "parsed"/"scoped", text → `--positive`, bg `--positive-soft`, border green; bdot → accent-soft). current card `n-1` = `.active` (`border-color:--border-accent`, `box-shadow:0 0 28px rgba(167,139,250,.18)`, `transform:translateY(-2px)`; status pill accent-tinted). |
| **Sub-animations gated on n** | • **Editor "agent writing" chip** appears when `n ≥ 3` (fade/scale in). • **Agent task checkboxes**: `tasksChecked = n≥4 ? 3 : 0` → all three boxes flip to checked together (box fills `--accent-400`, check glyph `--text-on-accent`, label `--text-mid`) over **.35s**. • **Deploy bar** gets `.live` when `n ≥ 6`: border→green, `background: linear-gradient(180deg, --positive-soft, --bg-1 80%)`, `box-shadow:0 0 26px rgba(95,217,154,.14)`, label → "Deployed · buildable app", url → "app.yourstartup.com ✓" in `--positive`. |
| **Editor caret** (`.editor .caret`) | Continuous `blink 1.1s step-end infinite` (same as §6.1). |
| **Timing** | start **650 ms**; **900 ms** per step; per-card property transitions **.35s** (`border-color/box-shadow/transform`); deploy bar transition **.4s**. Full reveal ≈ 650 + 6×900 ≈ **6 s**. |
| **Easing** | `ease` on transitions; discrete timer for cadence. Optional: Framer `spring` (stiffness ~260, damping ~26) on the `translateY(-2px)` card lift for extra polish. |
| **Technique** | **React island** holds `n`; derive `tasksChecked` and `live` from it. CSS transitions for the visuals; **Framer Motion optional** only for the card lift spring and the agent-chip entrance. |
| **Performance** | Board is a CSS grid (`1fr 1fr`, editor spans 2). All cards exist from the start → activating them changes only `border/shadow/transform/color` → **no layout shift, no reflow**. The `translateY(-2px)` lift is transform-only. |
| **Responsive** | `.v2-wrap` is a 2-col grid (`0.82fr 1fr`). Below ~900 px, **stack to 1 column** (copy above board) and collapse `.v2-board` to a **single column** (`span2` editor becomes full-width naturally). Reduce card padding. Keep the sequence; on a tall mobile layout consider triggering when the board enters view rather than the hero top. |
| **Reduced motion** | `n=6` immediately → all cards done, deploy live, tasks checked, agent chip shown. No stagger, caret static. |

### 7.2 Inline tool pills (V2 only)
Static row under the copy (`.v2-tools`) — **no float animation** here. Just a flex-wrap row of pills. No motion to implement.

---

## 8. VARIANT 3 — Framework pipeline reveal

An 8-node horizontal pipeline (Idea→Scope→Design→Stack→Workflow→Roadmap→Build→Autonomy) lights up node-by-node while a progress line fills behind it.

### 8.1 Progress track fill (`.pipeline .track .fill`)  ★
| | |
|---|---|
| **Element** | 2 px horizontal line behind the nodes; a violet gradient fill grows along it. |
| **Purpose** | Continuous sense of forward momentum tying the discrete nodes together. |
| **Trigger** | Bound to the same sequence as nodes (scroll-in, once). |
| **Initial state** | `width: 0`. Track bg `--border-strong`. |
| **Active state** | `width = ((n-1)/(STAGES.length-1)) * 100%` (clamped 0–1). Fill = `linear-gradient(90deg, --accent-500, --accent-300)`, `box-shadow: 0 0 10px var(--accent-glow)`. |
| **Timing** | `transition: width .5s ease` — recomputed each step (step cadence below). |
| **Easing** | `ease`. |
| **Technique** | **CSS width transition** driven by a React-set inline `style={{ width: pct + '%' }}`. This is the one allowed non-transform animation — it's a 2 px-tall bar, so the layout cost is effectively nil and it cannot shift surrounding content (absolutely positioned, `top:27px; left/right:36px`). Do NOT replace with a transform-scaleX unless you also fix the gradient/glow origin — width is simpler and safe here. |
| **Performance** | Single thin absolutely-positioned element → no reflow of siblings. Fine. |
| **Responsive** | The track insets (`left:36px; right:36px`) assume node width ~116 px. On narrow screens, see §8.3 layout change. |

### 8.2 Pipeline nodes light up (`.pstage` → `.done` / `.active`)  ★ core sequence
| | |
|---|---|
| **Element** | 8 nodes, each = 54 px rounded-square icon tile + numbered badge + label + sublabel. |
| **Purpose** | The framework's 8 stages, revealed as a guided path. |
| **Trigger** | **On scroll into view, play once** (source `useSequence(8,{step:720,hold:2000})`, start 650 ms). |
| **Initial state** | node tile `--bg-2`/`--border-strong`/`--text-low`; num badge `--bg-3`; label `--text-mid`. |
| **Step n** | nodes `<n` = `.done` (tile → `--accent-soft`/`--border-accent`/`--accent-300`; num badge accent-tinted; label → `--text-hi`). current node `n-1` = `.active` (tile fills solid `--accent-400`, `color:--text-on-accent`, `box-shadow: 0 0 0 4px rgba(167,139,250,.14), 0 0 24px rgba(167,139,250,.45)`, `transform: translateY(-3px)`). |
| **Timing** | start **650 ms**; **720 ms** per step (fastest of the three — 8 nodes); node property transitions **.4s** (`all .4s`); total ≈ 650 + 8×720 ≈ **6.4 s**. |
| **Easing** | `ease` on node transitions; discrete timer for cadence. Optional Framer `spring` on the active node's `translateY(-3px)` + scale pop. |
| **Technique** | **React island** sets `n` and computes `fillPct`; CSS classes/transitions render. Keep the fill and nodes on the **same `n`** so the line head stays aligned with the active node. |
| **Performance** | 8 small tiles, transform + shadow + color only. The active node's `translateY(-3px)` is transform-based. No layout shift (all nodes present from start). |
| **Responsive** | `.pipeline` is `display:flex; justify-content:space-between; max-width:1080px`. **Below ~768 px a horizontal 8-up row won't fit** → switch to a **vertical pipeline**: rotate the track to a vertical 2 px line, stack nodes in a column, fill animates `height` instead of `width`. Alternatively render a 4×2 grid. Pick the vertical-line variant — it reads as a "path." Keep labels visible; hide sublabels < 480 px if cramped. |
| **Reduced motion** | `n=8` immediately, `fillPct=100%` (no `.5s` width tween — set width directly), all nodes done, last active. |

### 8.3 Framework eyebrow label (`.v3-framelabel`)
Static mono text "THE AI CLARITY FRAMEWORK". No animation.

---

## 9. Shared reveal hook — reference implementation

Source `useSequence` (loops). Production `useStagedReveal` (fires once on view). Same per-step math.

```tsx
// useStagedReveal.ts
export function useStagedReveal(
  count: number,
  { start = 650, step = 850 }: { start?: number; step?: number } = {}
) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced) { setN(count); return; }           // §0.2 — jump to final
    const el = ref.current;
    if (!el) return;
    let timers: number[] = [];
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();                                // play ONCE
      timers.push(window.setTimeout(() => {
        for (let i = 1; i <= count; i++)
          timers.push(window.setTimeout(() => setN(i), step * (i - 1)));
      }, start));
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [count, step, start, reduced]);

  return { ref, n };                                  // n: 0 → count
}
```

```tsx
// usePrefersReducedMotion.ts
export function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(m.matches); on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return r;
}
```

**Per-variant params:**
| Variant | count | start | step | full reveal |
|---|---|---|---|---|
| V1 palette rows | 6 | 650 ms | 850 ms | ≈ 5.75 s |
| V2 board cards | 6 | 650 ms | 900 ms | ≈ 6.0 s |
| V3 pipeline nodes | 8 | 650 ms | 720 ms | ≈ 6.4 s |

> If 6 s feels long for a hero, halve `step` (don't touch `start`). Keep all three feeling like the same system.

---

## 10. Technique summary (what to use where)

| Animation | Technique | Why |
|---|---|---|
| Background blobs (§1) | **CSS keyframes** | Must run with zero JS; transform-only loop. |
| Grid overlay (§2) | **CSS static** | Not animated. |
| Eyebrow pulse (§3) | **CSS keyframes** | Tiny box-shadow loop, no state. |
| Floating pills (§4) | **CSS keyframes + inline vars** | Per-instance dur/delay; no JS. |
| CTA hover/press (§5) | **CSS transitions** | Pure interaction, instant. |
| Caret / cursor blink (§6.1, 7.1) | **CSS keyframes** | step-end blink. |
| Staged reveals V1/V2/V3 (§6.2, 7.1, 8.1–8.2) | **React island (state) + CSS transitions** | Needs an integer step + in-view trigger; CSS does the visuals. Framer Motion **optional** for spring on card/node lifts only. |
| Progress fill (§8.1) | **CSS width transition, React-driven width** | One safe non-transform tween. |

**Do not** reach for Lottie, Rive, SVG SMIL, or Canvas/WebGL anywhere in this hero — everything is achievable with CSS + a thin React state island, which keeps the Astro site fast and SEO-clean.

---

## 11. Global performance & a11y checklist

- [ ] Hero chrome ships as static Astro (no hydration); only the active variant's reveal is a `client:visible` island.
- [ ] Every animated property is `transform`, `opacity`, `box-shadow`, `border-color`/`background-color`, or the single V3 `width`. No layout properties animated.
- [ ] No layout shift: all sequenced elements are present in the DOM at full size from first paint; only their styling changes. Reserve space for the palette/board/pipeline so CLS ≈ 0.
- [ ] `backdrop-filter` (pills, eyebrow, palette) and `blur(80px)` (blobs) are applied to **static** layers — never animated.
- [ ] `prefers-reduced-motion: reduce` → final states rendered instantly; all loops (`blobs, floaty, pulse, blink, caret`) set to `animation: none`; staged reveals jump to `n = count`. (Source already has the CSS block — replicate in Tailwind via `motion-reduce:` variants + the hook short-circuit.)
- [ ] Floating pills `hidden lg:block`; tablet/mobile uses inline-pill fallback.
- [ ] CTA `:focus-visible` outline preserved (2px `--accent-400`, offset 2px).
- [ ] Continuous loops do not run when the hero is scrolled out of view if you observe perf issues — optionally pause via `animation-play-state: paused` when off-screen (IntersectionObserver toggling a class). Nice-to-have, not required.
- [ ] Fonts (`Space Grotesk`, `Hanken Grotesk`, `JetBrains Mono`) loaded with `display=swap` (already in `styles.css` import) to avoid invisible-text flash that would delay the perceived reveal.

---

## 12. File / island mapping (suggested)

```
src/
  styles/tokens.css            ← port :root vars from styles.css (or Tailwind theme)
  components/hero/
    Hero.astro                 ← chrome: nav, headline, CTAs, bg blobs, grid, pills (static, CSS-only)
    Variant1Palette.tsx        ← client:visible · §6.2
    Variant2Board.tsx          ← client:visible · §7.1
    Variant3Pipeline.tsx       ← client:visible · §8.1–8.2
    useStagedReveal.ts         ← §9
    usePrefersReducedMotion.ts ← §9
```

Pick ONE variant to ship as the live hero (the source presents three directions side-by-side for selection). All three share `Hero.astro` chrome; only the inner island differs. Update file map after reading §13–16 — the entrance hook and parallax are static-CSS + vanilla JS, no additional islands required.

---

## 13. Page-load entrance reveal — staggered rise

*Source: `Hero Section.html` — `.reveal` / `.reveal-v` classes + `@keyframes rise`*

This is the **first animation the user sees**. Every visible element in the hero fades up from a slight vertical offset, in a left-to-right, top-to-bottom stagger. The visual column (right side / console / pipeline) enters fractionally later and with a bigger offset + a subtle scale-down.

### 13.1 Left-column elements (`.reveal .r1–.r5`)

| | |
|---|---|
| **Elements in order** | `r1` eyebrow pill · `r2` h1 · `r3` subhead · `r4` CTA row · `r5` trust/tool-badge row |
| **Purpose** | Orchestrates reading order. The eye follows the stagger downward, landing on the CTAs exactly when they appear. |
| **Trigger** | **On page load** (class in markup; `animation-fill-mode: forwards`). The hero is the first viewport — no scroll trigger needed. |
| **Initial state** | `opacity: 0`, `transform: translateY(16px)` |
| **Final state** | `opacity: 1`, `transform: none` |
| **Duration** | **800 ms** per element |
| **Delays** | r1 `50 ms` · r2 `150 ms` · r3 `250 ms` · r4 `350 ms` · r5 `450 ms` (100 ms stagger) |
| **Easing** | `cubic-bezier(.2, .7, .2, 1)` — fast decelerate (rushes up, settles gently). Do not substitute `ease-out`; the curve is more aggressive and reads as intentional. |
| **Technique** | **CSS only.** `@keyframes rise { to { opacity:1; transform:none; } }` with `animation-fill-mode: forwards`. No JS, no Framer Motion. |
| **Repeat** | None — `forwards` holds final state. |
| **Performance** | `opacity` + `transform` only — compositor. Zero reflow. |
| **Responsive** | Identical on all breakpoints. If the hero stacks to a single column on mobile, the visual column (`reveal-v`) appears below the copy — its 300 ms delay means it rises as the user finishes reading the subhead. |
| **Reduced motion** | `animation: none !important; opacity: 1 !important; transform: none !important;` — all elements visible immediately at full opacity. Already in source. |

```css
/* tokens */
@keyframes rise { to { opacity: 1; transform: none; } }

.reveal   { opacity: 0; transform: translateY(16px); animation: rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.r1 { animation-delay: .05s; }
.r2 { animation-delay: .15s; }
.r3 { animation-delay: .25s; }
.r4 { animation-delay: .35s; }
.r5 { animation-delay: .45s; }

/* In Tailwind (define in @layer utilities or as plugin): */
/* tw: animate-[rise_.8s_cubic-bezier(.2,.7,.2,1)_forwards] opacity-0 translate-y-4 */
/* + per-element delay via style="animation-delay:.15s" */

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-v { animation: none !important; opacity: 1 !important; transform: none !important; }
}
```

### 13.2 Visual / right column (`.reveal-v`)

| | |
|---|---|
| **Element** | The entire right column: console/pipeline artboard + all floating pills |
| **Purpose** | The visual enters slightly after the headline has landed — user reads the promise, then sees the proof. |
| **Trigger** | Page load |
| **Initial state** | `opacity: 0`, `transform: translateY(24px) scale(.98)` — deeper offset + slight shrink creates a "rising into position" feel |
| **Final state** | `opacity: 1`, `transform: none` |
| **Duration** | **900 ms** |
| **Delay** | **300 ms** (starts as r3 is mid-flight) |
| **Easing** | `cubic-bezier(.2, .7, .2, 1)` — same curve as left column |
| **Technique** | **CSS only.** Same `@keyframes rise`, different initial state inline. |
| **Performance** | The scale(.98) → none triggers a layer composite, not a layout recalc — fine. The whole visual column is already GPU-promoted by `will-change: transform` on the blobs behind it. |
| **Responsive** | On single-column layout (< ~1080 px), this block falls below the copy; the 300 ms delay still works since the user's eye scrolls down to it naturally. |

```css
.reveal-v {
  opacity: 0;
  transform: translateY(24px) scale(.98);
  animation: rise .9s cubic-bezier(.2,.7,.2,1) .3s forwards;
}
```

### 13.3 Applying to Hero Variants (React context)

In the chosen variant's Astro component, wrap each left-column element with the `.reveal .rN` class. The visual artboard gets `.reveal-v`. Since these are CSS animations with `forwards` fill, they work identically inside a React island — add the class to the outermost wrapper.

```tsx
// Hero.astro (static chrome)
<span class="hero-eyebrow reveal r1">…</span>
<h1 class="v-h1 reveal r2">…</h1>
<p class="v-sub reveal r3">…</p>
<div class="v-cta reveal r4">…</div>

// Variant island wrapper
<div class="hero-visual reveal-v" data-depth="0.012">
  <Variant1Palette client:visible />
</div>
```

**Important:** the `client:visible` island hydrates on IntersectionObserver. The CSS `reveal-v` animation fires immediately on parse (CSS, not JS). Hydration latency does **not** block the entrance animation — the DOM is already rendered; only interactivity is deferred.

---

## 14. Workflow connector line fill (Hero Section `::before` height)

*Source: `Hero Section.html` — `.wf-stage:not(:last-child) .wf-node::before`*

This animation exists in **Hero Section** (the vertical 5-step console) but **not** in the three Hero Variants. If V1's command palette or V3's pipeline are chosen for production, the connector-line treatment below is available as an enhancement; if Hero Section's console is ported directly, implement it exactly.

| | |
|---|---|
| **Element** | The 2 px vertical accent line drawn between consecutive workflow nodes via `::before` pseudo-element on `.wf-node`. |
| **Purpose** | Stitches the nodes together: the line "grows" downward as each step completes, making the pipeline feel like it's executing in real time. |
| **Trigger** | State-based — fires when `.wf-stage` receives the `.done` class (same staged-reveal system as §6.2 / §8.2). |
| **Initial state** | `height: 0`, `background: linear-gradient(var(--accent-400), var(--accent-600))`, `box-shadow: 0 0 8px var(--accent-glow)`, `width: 2px`, positioned `left:50%` at `top:38px` (directly below the node circle). The grey track line sits on `::after` (static, always full height). |
| **Final state** | `height: calc(100% - 38px + var(--sp-5))` — exactly fills the gap to the next node's top. |
| **Timing** | **550 ms** transition duration. Fires as soon as `.done` class is added to the parent stage. |
| **Easing** | `ease`. |
| **Technique** | **CSS transition** on `height` — the one acceptable height animation (2 px wide, absolutely positioned, does not affect surrounding layout). Do not replace with `scaleY` — the gradient / glow origin would distort. |
| **Performance** | Absolutely positioned `::before` with fixed width — no layout impact on siblings. Single thin element. |
| **Responsive** | Unchanged. On mobile the console is single-column and the lines behave identically. |
| **Reduced motion** | `.done .wf-node::before { height: calc(100% - 38px + var(--sp-5)); transition: none; }` — instant fill. |

```css
/* track (static background) */
.wf-stage:not(:last-child) .wf-node::after {
  content: ""; position: absolute; left: 50%; top: 38px;
  transform: translateX(-50%); width: 2px;
  height: calc(100% - 38px + var(--sp-5));
  background: var(--border-strong); border-radius: 2px;
}
/* fill (animated) */
.wf-stage:not(:last-child) .wf-node::before {
  content: ""; position: absolute; left: 50%; top: 38px;
  transform: translateX(-50%); width: 2px; height: 0;
  background: linear-gradient(var(--accent-400), var(--accent-600));
  border-radius: 2px; z-index: 1;
  transition: height .55s ease;
  box-shadow: 0 0 8px var(--accent-glow);
}
.wf-stage.done:not(:last-child) .wf-node::before {
  height: calc(100% - 38px + var(--sp-5));
}
```

---

## 15. Workflow output row — "shipped" state

*Source: `Hero Section.html` — `.console.shipped .wf-output`*

| | |
|---|---|
| **Element** | A single-row bar at the bottom of the console: `→ buildable web app ✓`. Analogous to the **deploy bar** in V2 (§7.1 `.deploy.live`) — same concept, different markup. |
| **Purpose** | Payoff moment: after all stages complete, the output bar lights up with a tick to confirm delivery. |
| **Trigger** | State-based: `.console` receives `.shipped` class when `n >= stages.length` in the sequence (maps to `n ≥ 6` in V2, `n ≥ 5` in the Hero Section console). |
| **Initial state** | `opacity: 0.45`, `border: 1px solid var(--border)`, `background: var(--bg-1)`. Arrow `--text-low`, label `--text-mid`. Tick: `opacity: 0`, `transform: scale(.7)`. |
| **Shipped state** | `opacity: 1`, `border-color: var(--border-accent)`, `background: linear-gradient(180deg, var(--accent-soft), var(--bg-1) 80%)`, `box-shadow: 0 0 28px rgba(167,139,250,.18)`. Arrow `--accent-400`, label `--text-hi`. Tick: `opacity: 1`, `transform: scale(1)`. |
| **Timing** | Row: `opacity .5s ease`, `border-color .5s ease`, `background .5s ease`, `box-shadow .5s ease`. Tick: `opacity .4s ease`, `transform .4s ease`. |
| **Easing** | `ease` |
| **Technique** | **CSS transitions** on `.console.shipped` class toggle. Tick uses a simultaneous scale + fade (no delay offset needed; .4s is slightly shorter than the row's .5s so it snaps in cleanly after the glow arrives). |
| **Responsive** | Identical. |
| **Reduced motion** | Toggle `.shipped` immediately (no transitions) — just swap classes. |

```css
.wf-output {
  opacity: .45;
  transition: opacity .5s ease, border-color .5s ease, background .5s ease, box-shadow .5s ease;
}
.wf-output .tick {
  opacity: 0; transform: scale(.7);
  transition: opacity .4s ease, transform .4s ease;
}
.console.shipped .wf-output { opacity: 1; border-color: var(--border-accent); /* …gradient bg, glow */ }
.console.shipped .wf-output .tick { opacity: 1; transform: scale(1); }
```

---

## 16. Pointer parallax (mouse-tracked depth layers)

*Source: `Hero Section.html` — vanilla JS `mousemove` handler + `data-depth` attributes*

| | |
|---|---|
| **Elements** | Visual column wrapper (`data-depth="0.012"`) + floating pills (individual depths `0.04–0.08`). |
| **Purpose** | Adds a subtle 3-D layering feel on desktop: closer elements (higher depth value) shift more, background elements barely move. Reinforces the premium, dimensional quality of the hero. |
| **Trigger** | **On mouse move** (desktop only). |
| **Depth values** | Console wrapper `0.012` (barely moves) · React `0.05` · Node.js `0.07` · TypeScript `0.04` · Claude Code `0.08` · Codex `0.055` · Design System `0.045` · Stripe `0.065`. Higher = more sensitive. |
| **Motion formula** | `offset = mouseOffsetFromCenter × depth`. Pointer at window edge (e.g. 640 px from center) shifts the `0.08` layer by `640 × 0.08 ≈ 51 px`. The console wrapper (`0.012`) shifts only `≈ 8 px`. |
| **Smoothing** | Lerp with factor `0.06` per frame: `cx += (target - cx) * 0.06`. This gives a lazy, trailing feel (~16 frames to reach 64% of target). Run in a `requestAnimationFrame` loop. |
| **Conflict with float animation** | The floating pills already animate `transform` via CSS keyframes (`floaty`). **Do not** apply parallax via `transform` on the same element — it will override the keyframe. Apply parallax via `marginLeft` / `marginTop` on pills instead (as the source does). Apply `transform: translate3d(x,y,0)` only on non-animated elements (the console wrapper). |
| **Technique** | **Vanilla JS** — no library needed. ~25 lines. |
| **Performance** | `rAF`-throttled, touches only `style.marginLeft/Top` or `style.transform` — no layout. Lazy lerp means rAF loop only runs while cursor is moving; cancel with a `setTimeout` after `~300 ms` of no movement if needed. |
| **Responsive** | **Desktop only (`> 1024 px`).** On touch devices `mousemove` never fires — graceful no-op. No fallback needed. Optionally `addEventListener('deviceorientation')` for a gyro-based parallax on mobile, but this is out of scope unless requested. |
| **Reduced motion** | Guard the entire block: `if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;`. Already in source. |

```ts
// heroParallax.ts  (imported in Hero.astro <script>)
export function initParallax(sceneId: string) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 1024) return;           // desktop only

  const scene = document.getElementById(sceneId)!;
  const layers = [...scene.querySelectorAll<HTMLElement>('[data-depth]')];
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

  const loop = () => {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    layers.forEach(el => {
      const d = parseFloat(el.dataset.depth ?? '0');
      if (el.classList.contains('float-pill')) {
        el.style.marginLeft = cx * d + 'px';  // avoid overriding keyframe transform
        el.style.marginTop  = cy * d + 'px';
      } else {
        el.style.transform = `translate3d(${cx * d}px,${cy * d}px,0)`;
      }
    });
    raf = 0;
  };

  window.addEventListener('mousemove', e => {
    tx = e.clientX - window.innerWidth  / 2;
    ty = e.clientY - window.innerHeight / 2;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
}
```

**Per-element depth map (paste as `data-depth` HTML attributes):**

| Element | `data-depth` |
|---|---|
| Console / pipeline wrapper | `0.012` |
| React pill | `0.050` |
| Node.js pill | `0.070` |
| TypeScript pill | `0.040` |
| Claude Code pill | `0.080` |
| Codex pill | `0.055` |
| Design System pill | `0.045` |
| Stripe pill | `0.065` |

---

## 17. Updated file / island mapping

```
src/
  styles/tokens.css              ← port :root vars from styles.css (or Tailwind theme)
  components/hero/
    Hero.astro                   ← chrome: nav, headline (.reveal .rN), CTAs, bg blobs,
                                    grid, pills (.reveal-v + data-depth), parallax <script>
    Variant1Palette.tsx          ← client:visible · §6.2 (staged palette reveal)
    Variant2Board.tsx            ← client:visible · §7.1 (staged board + shipped state §15)
    Variant3Pipeline.tsx         ← client:visible · §8.1–8.2 (staged pipeline + fill)
    useStagedReveal.ts           ← §9
    usePrefersReducedMotion.ts   ← §9
    heroParallax.ts              ← §16 (vanilla JS, imported in Hero.astro <script>)
```

**Animation layer separation (summary):**

| Layer | What drives it | Island? |
|---|---|---|
| Background blobs | CSS keyframes | No |
| Grid overlay | Static CSS | No |
| Eyebrow pulse | CSS keyframes | No |
| Floating pills — bob | CSS keyframes (per-pill vars) | No |
| Floating pills — parallax | `heroParallax.ts` via `marginTop/Left` | No (Astro `<script>`) |
| Entrance rise stagger | CSS keyframes + `.reveal` classes | No |
| CTA hover/press | CSS transitions | No |
| **Staged sequence** (all variants) | React island (`useStagedReveal`) | **Yes** (`client:visible`) |
| Connector line fill | CSS transition on `.done` class | No |
| Shipped / deploy state | CSS transition on `.shipped` class | **Driven by island** |

---

## 18. Files to give Claude Code

Hand off **all six** of the following. No others are needed for hero implementation.

| # | File | Why |
|---|---|---|
| 1 | `MOTION_HANDOFF.md` | **This document** — the complete implementation spec |
| 2 | `Hero Variants.html` | **The chosen design** — final visual reference for all three variant directions |
| 3 | `variants.jsx` | Component source: all three heroes, `useSequence` hook, `VIcon`, `ToolPill`, shared chrome |
| 4 | `hero-variants.css` | All variant CSS: layout, palette, board, pipeline, floating pills, staged-reveal transitions |
| 5 | `styles.css` | Design system tokens: colors, typography, spacing, radius, shadows — the full `:root` |
| 6 | `Hero Section.html` | Entrance-reveal reference: `@keyframes rise`, `.reveal`/`.reveal-v` stagger, connector line fill, shipped output bar, pointer parallax JS |

> **Quick brief for Claude Code:** Implement the hero for `fullstackchris.dev` in Astro + React + TypeScript + Tailwind. Pick ONE of the three variants in file #2 (or ask which). Port the design tokens from file #5 into `tailwind.config.ts`. Implement animations exactly as specified in `MOTION_HANDOFF.md` — all timing, easing and state values are production-ready. The entrance reveal (§13) and parallax (§16) live in static Astro; only the staged sequence island needs `client:visible`.
