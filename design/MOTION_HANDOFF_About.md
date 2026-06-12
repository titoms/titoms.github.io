# Motion Handoff — About page (`About Me.html`)

**Target stack:** Astro + React islands · TypeScript · Tailwind CSS · (optional) Framer Motion
**Source of truth:** `About Me.html` → `motion.css` (all animation styles) + `motion.js` (all behavior) + `styles.css` / `service.css` (tokens & layout) + `media/chris-portrait.png` (graded hero portrait)
**Companion:** `MOTION_DESIGN_About.md` (creative intent & choreography).
**Scope:** One "About me" page. It introduces **no new animation engine** — it recomposes the shared system (the same `motion.css` + `motion.js` behind Projects & Services) plus the homepage hero's `@keyframes rise` entrance. The one page-specific addition is a **vertical** draw-on-scroll rail for the career timeline (the shared ladder is horizontal).

This is the implementation contract. Every animated element below has explicit trigger, states, timing, easing, technique, perf and responsive notes. All values are lifted directly from `About Me.html` / `motion.css` / `motion.js` — production-ready, not approximations.

---

## 0. Global decisions (read first)

### 0.1 Two animation classes, one rule (unchanged from the shared system)
- **Continuous / ambient** (pulse dot, pill bob, static glow/grid): pure CSS `@keyframes`, run on load, never need JS.
- **Entrance / state** (`.reveal` hero stagger, `[data-reveal]` scroll reveals, count-up, timeline rail): CSS owns the transition; `motion.js` only toggles a class / writes a number via `IntersectionObserver`.

### 0.2 `prefers-reduced-motion` is mandatory
Inherited wholesale from `motion.css`'s reduced-motion block + `motion.js`'s `REDUCE` short-circuit: loops set to `animation:none`; `.reveal`/`[data-reveal]`/ladder forced to final visible state with no transition; count-up jumps to final; parallax skipped. **Do not re-implement — reuse.**

### 0.3 No-JS / SSR safety
`<html class="no-js">` is in the markup; `motion.js` removes it on boot. `motion.css` `.no-js [data-reveal]{opacity:1;transform:none}` guarantees all reveal content is visible if JS never runs (SSR, hydration gap, crawler). Keep this guard — content must never depend on JS to be readable.

> ⚠️ **Preview note:** in an occluded/offscreen iframe the browser may freeze CSS-animation `currentTime` at 0 (the `.reveal` entrance appears stuck). This is a *render-occlusion artifact*, not a bug — on a focused tab the animation runs normally. The `.no-js` guard + reduced-motion final-state rules mean content is never permanently hidden.

### 0.4 Animate only `transform`, `opacity`, `box-shadow`, `border-color`/`background`, and the timeline rail's single `transform: scaleY`
Zero layout-animating properties. Count-up writes `textContent` inside a `font-variant-numeric: tabular-nums` container (`.count`) so width never jitters.

### 0.5 Tokens (from `styles.css`)
```
--accent-400:#a78bfa (primary) · --accent-300:#c4b5fd · --accent-500:#8f6ef3 · --accent-600:#7c5ce8
--accent-soft:rgba(167,139,250,.12) · --accent-glow:rgba(167,139,250,.35) · --border-accent:rgba(167,139,250,.40)
--bg-0:#0d0d10 … --bg-4:#2c2c35 · --text-hi:#f4f4f6 · --text-mid:#a4a4af · --text-low:#6c6c78
--positive:#5fd99a · --positive-soft:rgba(95,217,154,.14)
font-display:'Space Grotesk' · font-body:'Hanken Grotesk' · font-mono:'JetBrains Mono'
```

### 0.6 Astro island boundaries
| Layer | Hydration |
|---|---|
| Static glow/grid bg, eyebrow pulse, pill bob, portrait glow, `.reveal`/`.reveal-v` hero entrance | **None** — static CSS |
| Scroll reveals, count-up, timeline rail draw, pointer parallax | One vanilla module (`motion.js`) via `<script>` — no React required |

No React or Framer Motion is needed. `motion.js` (~160 lines vanilla) covers every behavior on this page.

---

## 1. Hero entrance — staggered rise (left column)

| | |
|---|---|
| **Elements (order)** | `.reveal.r1` breadcrumb + eyebrow · `.reveal.r2` `<h1>` · `.reveal.r3` lead · `.reveal.r4` CTA row · `.reveal.r5` stat row |
| **Purpose** | Choreograph reading order; eye lands on CTAs as they arrive. |
| **Trigger** | **On page load** (class in markup; `animation-fill-mode: forwards`). Hero is first viewport — no scroll trigger. |
| **Initial** | `opacity:0; transform: translateY(16px)` |
| **Final** | `opacity:1; transform:none` |
| **Duration** | **800 ms** each |
| **Delays** | r1 `.05s` · r2 `.15s` · r3 `.25s` · r4 `.35s` · r5 `.45s` (100 ms stagger) |
| **Easing** | `cubic-bezier(.2,.7,.2,1)` — fast decelerate. Do not substitute `ease-out`. |
| **Technique** | CSS only — `@keyframes rise` (in `motion.css`) + `.reveal .rN`. No JS. |
| **Perf** | `opacity`+`transform` only, compositor, zero reflow. |
| **Responsive** | Identical all breakpoints; below 1000 px the portrait column stacks under the copy (see §6). |
| **Reduced motion** | `animation:none; opacity:1; transform:none` (motion.css block). |

## 2. Hero entrance — portrait column (`.reveal-v`)

| | |
|---|---|
| **Element** | `.portrait-scene.reveal-v` — portrait card + glow + float pills |
| **Initial** | `opacity:0; transform: translateY(24px) scale(.98)` |
| **Final** | `opacity:1; transform:none` |
| **Duration / delay** | **900 ms**, delay **300 ms** (rises a beat after the headline) |
| **Easing** | `cubic-bezier(.2,.7,.2,1)` |
| **Technique** | CSS only, same `rise` keyframe, deeper initial offset set inline. |
| **Reduced motion** | final state immediately. |

---

## 3. Stat count-up (`.count[data-count]`)

| | |
|---|---|
| **Elements** | `7000`+suffix `+` · `10`+suffix `+ yrs` · `3` (in `.hero-meta`) |
| **Purpose** | Quantify credibility as the row arrives. |
| **Trigger** | `IntersectionObserver` (threshold 0.6) in `motion.js` → fires **once**. |
| **States** | `textContent` animates `0 → target`. |
| **Timing** | **1300 ms** default (`data-count-dur` overridable). |
| **Easing** | easeOutCubic (`1 - (1-p)³`) in JS. |
| **Technique** | `motion.js` `animateCount()` writes `textContent`; container has `tabular-nums` so no width jitter. Optional `data-prefix` / `data-suffix` / `data-count-dec`. |
| **Perf** | One `requestAnimationFrame` loop per number, ends deterministically on the final value. |
| **Reduced motion** | sets final value instantly (no tween). |

---

## 4. Continuous ambient loops

### 4.1 Eyebrow / availability pulse (`.pulse-dot`)
| | |
|---|---|
| **Where** | Hero eyebrow dot (violet) + `.portrait-tag` "Available for projects" dot (green, `--positive`). |
| **Trigger** | Continuous, on load. |
| **States** | `box-shadow: 0 0 0 0 → 0 0 0 8px (fade to 0)`. |
| **Timing / easing** | **2.6 s** `infinite`, `ease-out`. |
| **Technique** | CSS `@keyframes pulse` (motion.css). Box-shadow only. |
| **Reduced motion** | `animation:none`. |

### 4.2 Floating tool pills (`.float-pill.pp-1…4`)
| | |
|---|---|
| **Elements** | React · Node.js · Rust·Tauri · Claude Code, absolutely positioned around the portrait. |
| **Trigger** | Continuous bob, on load. |
| **States** | `translateY(0 → -12px → 0)`. |
| **Timing** | per-pill `--dur` **6.6 / 7.7 / 8.3 / 7.1 s**, `--del` **0 / .6 / 1 / .4 s**, `infinite`, out of phase. |
| **Easing** | `ease-in-out` (`@keyframes floaty`). |
| **Technique** | CSS only; per-instance dur/delay via inline CSS vars. Glassy: `rgba(34,34,42,.82)` + `backdrop-filter: blur(10px)` (static — never animate the blur). |
| **Responsive** | **`display:none` below 1000 px** (`.portrait-scene .float-pill`). The absolute positions assume the desktop two-column hero. |
| **Reduced motion** | `animation:none` — pills sit still. |

### 4.3 Portrait glow + page bg (static)
`.portrait-glow` is a static blurred radial `--accent-glow` behind the card (the same hue the photo was graded into in `media/chris-portrait.png`, so subject and page share one light). Hero & CTA use `.glow-bg`/`.grid-bg` from `styles.css` — static glow + masked grid. **Not animated.**

---

## 5. Pointer parallax (desktop only)

| | |
|---|---|
| **Scene** | `.about-hero[data-parallax-scene]`; layers carry `data-depth`. |
| **Depths** | portrait card `0.014` · React `0.05` · Node.js `0.07` · Rust·Tauri `0.04` · Claude Code `0.065`. |
| **Trigger** | `mousemove`, **desktop only** (`motion.js` guards `innerWidth >= 1024` + `!REDUCE`). |
| **Motion** | `offset = pointerOffsetFromCenter × depth`, lerped `0.06`/frame in a `requestAnimationFrame` loop. |
| **Conflict rule** | pills already animate `transform` (floaty) → parallax is applied via `marginLeft/Top` on `.float-pill`; `transform: translate3d()` only on the non-animated portrait card. (Handled in `motion.js`.) |
| **Reduced motion / touch** | guarded off — graceful no-op. |

---

## 6. Section scroll reveals (`[data-reveal]` + `[data-stagger]`)

Driven by `motion.js` `IntersectionObserver` (threshold 0.16, `rootMargin 0 0 -7% 0`), **fire once** (`unobserve` after). `[data-stagger="N"]` on a group auto-assigns incremental `data-delay` to its `[data-reveal]` children.

| Section | Elements | Variant | Stagger |
|---|---|---|---|
| Approach | `.s-head` | `fade` | — |
| Approach | 3 `.ap-card` | default (rise 22 px) | base 80, **120 ms** step |
| Bio | `.s-head`, 3 `<p>` | `fade` | — |
| Bio | `.glance` panel | `right` (translateX -26→0) | — |
| Experience | `.s-head` | `fade` | — |
| Tech stack | `.s-head` | `fade` | — |
| Tech stack | 15 `.badge` | `scale` (translateY 26 + scale .97→1) | base 40, **55 ms** step |
| CTA | header / copy / buttons | `fade` / default | — |

| | |
|---|---|
| **Initial** | per variant: default `translateY(22px)`; `fade` none; `left/right` `translateX(±26px)`; `scale` `translateY(26px) scale(.97)`. `opacity:0`. |
| **Final** | `.in` → `opacity:1; transform:none`. |
| **Timing / easing** | **700 ms**, `cubic-bezier(.2,.7,.2,1)` (motion.css `[data-reveal]`). Stagger delay applied inline by `motion.js`, cleared 750 ms after firing so hover transitions aren't delayed. |
| **Perf** | transform+opacity only. All elements present at full size from first paint → zero CLS. |
| **Responsive** | identical; `.glance` is `position:sticky; top:96px` on desktop, static below 1000 px. |
| **Reduced motion / no-JS** | `.in` applied immediately / `.no-js` forces visible. |

---

## 7. Career timeline — vertical draw-on-scroll  ★ signature

The one page-specific motion. The shared ladder is horizontal (`scaleX`); the About timeline rail is **vertical** (`scaleY`), defined in `About Me.html`'s `<style>` and triggered by the shared `.ladder.run` mechanism in `motion.js`.

### 7.1 Rail fill (`.tl-rail.ladder .rail .rail-fill`)
| | |
|---|---|
| **Element** | 2 px vertical line behind the numbered nodes; violet gradient fill grows top→bottom. |
| **Trigger** | `motion.js` ladder `IntersectionObserver` (threshold 0.3) adds `.run` to `.ladder` **once** on view. |
| **Initial** | `transform: scaleY(0)`, `transform-origin: top center`; track bg `--border-strong`. |
| **Final** | `.run` → `scaleY(1)`. Fill = `linear-gradient(180deg, --accent-500, --accent-300)`, `box-shadow: 0 0 10px --accent-glow`. |
| **Timing / easing** | **1.7 s**, `cubic-bezier(.4,0,.2,1)`. |
| **Technique** | CSS `scaleY` transform (not `height`) — gradient/glow origin preserved, no layout cost. React-free. |
| **Reduced motion** | `scaleY(1)` immediately, no transition. |

### 7.2 Role cards rise (`.tl-row[data-reveal="left"]`)
| | |
|---|---|
| **Elements** | 6 role rows (numbered node + title + meta + bullets); rows 5 & 6 carry a green `.tl-badge-now` "Now" tag. |
| **Trigger** | the timeline container has `data-stagger="120" data-stagger-base="120"` → each row reveals via the §6 observer in sequence as the rail draws. |
| **Initial / final** | `left` variant: `opacity:0; translateX(-26px)` → `opacity:1; transform:none`. |
| **Timing** | **700 ms** each, **120 ms** stagger, base delay 120 ms. |
| **Note** | the rail (`.tl-rail`) is a separate `.ladder` element *inside* the timeline so its `.run` fill is independent of the row reveals — keep them as two mechanisms (rail = ladder class, rows = `[data-reveal]`), do **not** nest rows in the ladder (the shared `.ladder .lnode` nth-child delays would mis-target). |
| **Reduced motion / no-JS** | rows visible immediately. |

---

## 8. Interactive (hover / press)

| Element | State change | Timing |
|---|---|---|
| `.btn-primary` / `.btn-secondary` + `.arrow` | bg/border/glow shift; arrow `translateX(3px)`; press `translateY(1px)` | `transform .12s`, `bg/border .15s`, `box-shadow .2s` (styles.css) |
| `.card-hover` (approach cards) | `border-color` → `--border-strong`; `translateY(-3px)` | `.2s` |
| `.stack-cloud .badge` | `border-color` → `--accent-400`; `translateY(-2px)`; text → `--text-hi` | `.18s` |

All CSS transitions; touch devices fall back to the press state. Keep `:focus-visible { outline: 2px solid --accent-400 }`.

---

## 9. Files to hand off

| # | File | Why |
|---|---|---|
| 1 | `MOTION_HANDOFF_About.md` | this contract |
| 2 | `MOTION_DESIGN_About.md` | creative intent / choreography |
| 3 | `About Me.html` | the page — markup + page-specific timeline CSS |
| 4 | `motion.css` | shared animation styles (`rise`, `pulse`, `floaty`, `[data-reveal]`, ladder, reduced-motion block) |
| 5 | `motion.js` | shared behavior (reveal IO, count-up, ladder `.run`, parallax, `no-js` removal) |
| 6 | `styles.css` + `service.css` | tokens + page-hero / breadcrumb / section-head layout |
| 7 | `media/chris-portrait.png` | hero portrait, pre-graded to the charcoal + violet palette (1200×1500, 4:5) |

> **Quick brief for Claude Code:** Build the About page in Astro + vanilla `motion.js` (no React needed). Reuse `motion.css`/`motion.js` as-is; the only page-local CSS is the vertical timeline rail (§7) and the portrait card/pill positioning. All timing, easing and state values above are production-ready. Honor `prefers-reduced-motion` and the `.no-js` guard exactly as the shared system already does.
