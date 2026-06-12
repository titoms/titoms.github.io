# Motion Handoff — Projects & Services index pages

**Target stack:** Astro + React islands · TypeScript · Tailwind CSS · (optional) Framer Motion
**Source of truth:** `Projects.html`, `Services.html` → `motion.css` (all animation styles) + `motion.js` (all behavior) + `styles.css` (design tokens)
**Scope:** Two content-index pages that share one motion layer. The shared layer (`motion.css` + `motion.js`) is the reusable system; each page adds one signature interaction (Projects = **filter**, Services = **draw-on-scroll ladder**).

This is the implementation contract. Every animated element has explicit trigger, states, timing, easing, technique, perf and responsive notes. All values are lifted directly from `motion.css` / `motion.js` — they are production-ready, not approximations.

---

## 0. Global decisions (read first)

### 0.1 Two animation classes, one rule
- **Continuous / ambient** (blobs, pulse, float, caret): pure CSS `@keyframes`, run on load, never need JS. Ship as static markup.
- **Entrance / state** (scroll reveals, ladder, filter, count-up): driven by `motion.js` via `IntersectionObserver` + class toggles; **CSS owns the actual transition**, JS only adds a class. This keeps animations declarative and cheap.

### 0.2 `prefers-reduced-motion` is mandatory
`motion.css` ends with a reduced-motion block that (a) kills every loop, (b) forces `[data-reveal]`/`.reveal`/ladder/filter to their **final visible state with no transition**. `motion.js` mirrors this: it reads the media query once (`REDUCE`) and, when true, adds `.in` immediately, sets count-up to final, and skips parallax. **Replicate both halves** — CSS for declarative animations, JS for the observer paths.

### 0.3 No-JS / SSR safety
`<html class="no-js">` is set in markup; `motion.js` removes it on boot. `motion.css` has `.no-js [data-reveal] { opacity:1; transform:none }` so that if JS never runs (or during SSR before hydration), all reveal content is visible. **Critical for SEO and Astro's static output** — content must never depend on JS to be readable. Keep this guard.

### 0.4 Animate only `transform`, `opacity`, `box-shadow`, `border-color`/`background`, and the ladder's single `transform: scaleX`
Zero layout-animating properties. The ladder fill uses `scaleX` (transform), not `width`. Count-up writes `textContent` but the number container has fixed `font-variant-numeric: tabular-nums` so width never jitters.

### 0.5 Tokens (from `styles.css`)
```
--accent-400:#a78bfa (primary) · --accent-300:#c4b5fd · --accent-500:#8f6ef3 · --accent-600:#7c5ce8
--accent-soft:rgba(167,139,250,.12) · --accent-glow:rgba(167,139,250,.35) · --border-accent:rgba(167,139,250,.40)
--bg-0:#0d0d10 … --bg-4:#2c2c35 · --text-hi/-mid/-low · --positive:#5fd99a
font-display:'Space Grotesk' · font-body:'Hanken Grotesk' · font-mono:'JetBrains Mono'
```

### 0.6 Astro island boundaries
| Layer | Hydration |
|---|---|
| Blobs, grid, pulse, float pills, `.reveal` entrance | **None** — static CSS in `.astro` |
| Scroll reveals, count-up, ladder, parallax | One tiny vanilla module (`motion.js`) loaded with `<script>` (Astro ships it as-is; no React needed) |
| Projects filter | Same vanilla module, or a small `client:visible` React island if you prefer state-driven filtering |

**You do not need React or Framer Motion for any of this.** `motion.js` is ~160 lines of vanilla and covers every behavior. Port it as a single Astro `<script>` or a `client:idle` module. Framer Motion is listed as optional only if the team standardizes on it.

---

## 1. Ambient background field — drifting blobs

| | |
|---|---|
| **Element** | `.bg-field > .blob-1/2/3` — three blurred radial-gradient circles behind the hero (`z-index:0`). |
| **Purpose** | Slow ambient depth; the same brand field used across the site. |
| **Trigger** | Continuous loop, on load. |
| **Initial** | b1 660×660 top-left `rgba(143,110,243,.34)`; b2 560×560 top-right `rgba(124,92,232,.26)`; b3 520×520 bottom-center `rgba(167,139,250,.18)`. All `filter:blur(76px)`. |
| **Active** | b1 `translate(54px,38px) scale(1.08)`; b2 `translate(-46px,28px) scale(1.1)`; b3 `translate(30px,-36px) scale(1.06)`. |
| **Timing** | b1 **28s**, b2 **34s**, b3 **31s**, `infinite`, desynchronized. |
| **Easing** | `ease-in-out`. |
| **Technique** | CSS `@keyframes drift1/2/3`, transform-only. `will-change:transform`. |
| **Performance** | `blur(76px)` on **static, transform-only** layers (cheap). Never animate the blur. Cap at 3. |
| **Responsive** | Keep on all sizes; clipped by hero `overflow:hidden`. Optionally drop b3 < 640px. |
| **Reduced motion** | `animation:none`. |

---

## 2. Grid field overlay (`.grid-field::after`)
Static masked 60px grid, radial-masked at top-left. **Not animated.** Pure paint. Listed so it isn't mistaken for motion.

---

## 3. Scroll-reveal system ★ (the workhorse — used on every section of both pages)

| | |
|---|---|
| **Elements** | Any node with `[data-reveal]`. Variants: `data-reveal` (rise-up, default), `="fade"`, `="left"`, `="right"`, `="scale"`. |
| **Purpose** | Content settles into place as the user scrolls, giving the long index pages rhythm and a premium, intentional feel. |
| **Trigger** | **On scroll into view, once.** `IntersectionObserver(threshold:0.16, rootMargin:'0px 0px -7% 0px')` → adds `.in`, then `unobserve`. |
| **Initial** | `opacity:0` + per-variant transform: default `translateY(22px)`; `left` `translateX(-26px)`; `right` `translateX(26px)`; `scale` `translateY(26px) scale(.97)`; `fade` none. |
| **Final (`.in`)** | `opacity:1; transform:none`. |
| **Timing** | **700 ms** duration. Per-element stagger via `data-delay` (ms), applied as `transition-delay` when `.in` is added, then **cleared after firing** (so the delay doesn't lag later hover transitions). |
| **Stagger** | Containers with `[data-stagger="<ms>"]` auto-assign incremental `data-delay` to their `[data-reveal]` children in `motion.js` (default 80ms; Projects grid uses 90, Services list uses 90). Optional `data-stagger-base` offsets the start. |
| **Easing** | `cubic-bezier(.2,.7,.2,1)` (fast-decelerate — the house curve, matches the approved hero). |
| **Technique** | CSS transition; JS adds one class. No Framer Motion. |
| **Performance** | `opacity`+`transform` only. `will-change:opacity,transform` is set on the base. Observer disconnects per-element after firing. |
| **Responsive** | Identical; reveals fire wherever the element enters view. |
| **Reduced motion / no-JS** | Immediately visible (`.in` added in bulk by JS under reduce; `.no-js` rule covers JS-off). |

```html
<div data-stagger="90">
  <article data-reveal="scale">…</article>   <!-- delay 0 -->
  <article data-reveal="scale">…</article>   <!-- delay 90 -->
  <article data-reveal="scale">…</article>   <!-- delay 180 -->
</div>
```
```js
// motion.js core (vanilla):
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, d = +el.dataset.delay || 0;
    el.style.transitionDelay = d + 'ms';
    el.classList.add('in');
    setTimeout(() => { el.style.transitionDelay = ''; }, d + 750);
    io.unobserve(el);
  });
}, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });
```

---

## 4. On-load entrance stagger (`.reveal .r1–.r6`, `.reveal-v`)

| | |
|---|---|
| **Elements** | Above-the-fold hero items: crumb `r1`, eyebrow `r2`, h1 `r3`, lead `r4`, meta/CTA `r5`. |
| **Purpose** | First paint orchestration — the eye is led down the hero as each line rises in. |
| **Trigger** | **Page load** (CSS animation, `forwards` fill). Above the fold ⇒ no scroll trigger. |
| **Initial / Final** | `.reveal`: `opacity:0; translateY(16px)` → `none`. `.reveal-v`: `opacity:0; translateY(24px) scale(.98)` → `none`. |
| **Timing** | `.reveal` **800 ms**; `.reveal-v` **900 ms**, delay 300 ms. Per-line delays r1 50ms · r2 150 · r3 250 · r4 350 · r5 450 · r6 550 (100ms stagger). |
| **Easing** | `cubic-bezier(.2,.7,.2,1)`. |
| **Technique** | CSS only (`@keyframes rise`). |
| **Reduced motion** | `animation:none; opacity:1; transform:none`. |

> **Note (visibility-pause):** CSS load-animations only tick while the document is visible; a tab opened in the background paints these at frame 0 and resumes them on focus — content still appears. This is expected and matches the approved hero. Reduced-motion users and no-JS both get instant-visible.

---

## 5. Eyebrow pulse-dot + caret blink
- `.pulse-dot`: expanding ring `box-shadow 0→8px` fade, **2.6s** `ease-out` infinite. (Used in both hero eyebrows + the Featured flag.)
- `.blink`: `opacity 1↔0`, **1.1s** `step-end` infinite. (Available for typed/caret accents.)
Both CSS-only; `animation:none` under reduce.

---

## 6. Floating tool pills (Projects hero)

| | |
|---|---|
| **Element** | `.float-pill` (React / TypeScript / Node.js) absolutely placed around the hero. |
| **Trigger** | Continuous bob + pointer parallax. |
| **Bob** | `floaty` `translateY(0 → -12px → 0)`, per-instance `--dur` (6.6–8.3s) + `--del`, `ease-in-out` infinite. |
| **Parallax** | See §10. Pills shift via `marginLeft/Top` (NOT transform) to avoid overriding the `floaty` keyframe. |
| **Technique** | CSS keyframes + vanilla parallax. |
| **Responsive** | `display:none` below 1080px (`@media`). |
| **Reduced motion** | `animation:none`; parallax skipped. |

---

## 7. Count-up numbers (Projects hero stats)

| | |
|---|---|
| **Element** | `.count[data-count]` — "5 shipped products", "3 domains", "7000h+ teaching". |
| **Purpose** | Numbers tick up as the stat row enters view — a small moment of life on otherwise static figures. |
| **Trigger** | `IntersectionObserver(threshold:0.6)` → run once. |
| **Timing** | `data-count-dur` (default **1300 ms**). |
| **Easing** | `easeOutCubic` (`1-(1-p)³`) in JS via `requestAnimationFrame`. |
| **Format** | `data-prefix` / `data-suffix` (e.g. `h+`), `data-count-dec` for decimals. Container has `tabular-nums` so width is stable (no layout shift). |
| **Technique** | Vanilla JS writes `textContent`. |
| **Reduced motion** | Sets final value immediately. |

```html
<span class="count" data-count="7000" data-suffix="h+">0</span>
```

---

## 8. Projects — filter interaction ★

| | |
|---|---|
| **Elements** | `[data-filter-bar]` chips (All / Web apps / Tools / Games) + `.filterable[data-cats]` cards. |
| **Purpose** | Let visitors slice the work by type without a page load; the grid re-composes with a quick, confident fade. |
| **Trigger** | **On click** of a chip. |
| **Active chip** | `.active` → violet fill, accent ring + shadow. Only one active at a time. |
| **Card transition** | Non-matching: add `.is-hidden` (`opacity:0; scale(.96) translateY(8px); pointer-events:none`) over **320 ms** `ease`/`cubic-bezier(.2,.7,.2,1)`, then `.is-gone` (`display:none`) after the transition. Matching: remove `.is-gone` (display restored), then **next animation frame** remove `.is-hidden` so it fades back in. |
| **Matching logic** | `cat === 'all' || (' '+dataCats+' ').includes(' '+cat+' ')`. Cards can carry multiple space-separated cats. |
| **Easing** | `cubic-bezier(.2,.7,.2,1)`. |
| **Technique** | Vanilla JS class toggles + CSS transitions. (No FLIP — the fade reads clean without per-card position animation. If you want reflow-position animation later, layer FLIP on top; not required.) |
| **Performance** | `display:none` after fade removes hidden cards from layout/paint. `transform`/`opacity` only during the transition. |
| **Responsive** | Filter bar is `position:sticky; top:0` on desktop (frosted), becomes static below 900px. |
| **Reduced motion** | Skip the fade; toggle `.is-gone` immediately. |

```js
// match → show next frame; non-match → fade then display:none
if (match) { it.classList.remove('is-gone');
             requestAnimationFrame(() => it.classList.remove('is-hidden')); }
else       { it.classList.add('is-hidden');
             setTimeout(() => it.classList.add('is-gone'), 320); }
```

---

## 9. Projects — card hover

| | |
|---|---|
| **Elements** | `.pcard` (incl. `.feature` span-2). |
| **Purpose** | Tactile lift + a light sweep across the mockup that signals "clickable, alive". |
| **Trigger** | Hover. |
| **States** | Card: `translateY(-5px)`, border → `--border-strong`, `box-shadow: shadow-lg + 0 0 46px rgba(124,92,232,.14)`. Title arrow `.ar`: `translateX(4px)` + color → accent. **Sheen** `.win-shot .sheen`: a 115° translucent band sweeps `translateX(-120% → 120%)` over **800 ms**. |
| **Timing** | Card **300 ms** (`cubic-bezier(.2,.7,.2,1)`); arrow 200ms; sheen 800ms. |
| **Technique** | CSS `:hover` transitions only. |
| **Performance** | transform/opacity/shadow. Sheen is a single absolutely-positioned gradient layer inside `overflow:hidden`. |
| **Responsive** | Hover effects no-op on touch; the press/tap still navigates (whole card is an `<a>`). |
| **Reduced motion** | Lift/colors may remain (instant-ish); sheen transform still fine — optional to disable. |

---

## 10. Pointer parallax (desktop, opt-in)

| | |
|---|---|
| **Elements** | Any `[data-depth]` inside `[data-parallax-scene]` (Projects hero pills). |
| **Trigger** | `mousemove` within the scene; eased back to center on `mouseleave`. |
| **Motion** | `offset = pointerOffsetFromSceneCenter × depth`. Depths 0.045–0.07. |
| **Smoothing** | Lerp `cx += (target-cx) * 0.06` in a `requestAnimationFrame` loop that **self-cancels** when settled (`|Δ|<0.3`) — no idle rAF. |
| **Apply** | `.float-pill` → `marginLeft/Top` (avoid clobbering the `floaty` transform); other layers → `translate3d`. |
| **Guard** | Skipped entirely when `REDUCE` or `innerWidth < 1024`. |
| **Technique** | Vanilla JS. |

---

## 11. Services — ladder draw-on-scroll ★ (signature)

| | |
|---|---|
| **Element** | `.ladder` containing `.rail > .rail-fill` (the connecting line) and `.lnodes > .lnode` ×5 (Learn → Clarify → Plan → Build → Launch). |
| **Purpose** | The page's thesis is "one ladder, not five silos." The rail **draws left-to-right** while each node **pops in sequence**, literally animating the progression the copy describes. |
| **Trigger** | `IntersectionObserver(threshold:0.3)` adds `.run` to `.ladder` once it's ~⅓ visible. Everything else is CSS. |
| **Rail fill** | `.rail-fill` `transform: scaleX(0) → scaleX(1)`, `transform-origin:left`, over **1400 ms** `cubic-bezier(.4,0,.2,1)`. Violet gradient `--accent-600 → --accent-300` + `0 0 10px var(--accent-glow)`. |
| **Nodes** | `.lnode` `opacity:0; translateY(14px) → none`, **500 ms** `cubic-bezier(.2,.7,.2,1)`, sequential `transition-delay` via `:nth-child`: **.15 / .45 / .75 / 1.05 / 1.35 s** (≈300ms apart, riding just behind the rail head). |
| **Markers** | `.marker` + `.knum` tint to accent (`background/border/color/box-shadow` 400ms) under `.run`. |
| **Total** | Rail 1.4s; last node settles ~1.85s. Reads as one continuous "charge up the ladder." |
| **Technique** | One JS class toggle; all timing in CSS (`motion.css` §7). No Framer Motion. |
| **Performance** | Rail is a 2px bar animated via `scaleX` (transform, no reflow). Nodes transform/opacity only. |
| **Responsive** | Below 720px the horizontal `.rail` is `display:none` and `.lnodes` becomes a vertical left-aligned stack; nodes still reveal in sequence (the `.run` delays still apply). |
| **Reduced motion** | Rail forced `scaleX(1)`, nodes visible, no transition. |

```html
<div class="ladder">
  <div class="rail"><div class="rail-fill"></div></div>
  <div class="lnodes">
    <div class="lnode">…marker + label…</div>   <!-- ×5 -->
  </div>
</div>
```
```css
.ladder.run .rail .rail-fill { transform: scaleX(1); }      /* 1.4s */
.ladder.run .lnode:nth-child(1){ transition-delay:.15s }    /* …→1.35s */
```
> **Why `scaleX` not `width`:** transform composites on the GPU and never reflows the nodes sitting on top. Keep `transform-origin:left` so it grows from the first node.

---

## 12. Services — service-row hover

| | |
|---|---|
| **Element** | `.svc-row` (each service; `.flagship` = Custom MVP, accent-tinted). |
| **Trigger** | Hover. |
| **States** | Row: `translateY(-3px)`, border → strong, glow shadow. **Left accent bar** `::before`: `scaleY(0 → 1)` from top, **350 ms** `cubic-bezier(.2,.7,.2,1)`. Icon `.ic`: fills solid `--accent-400` + glow. Arrow `.ar`: `translateX(4px)`. |
| **Timing** | Row 300ms; bar 350ms; icon 300ms; arrow 200ms. |
| **Technique** | CSS `:hover`. |
| **Reduced motion** | Color changes only; transforms optional. |

---

## 13. File / module mapping (Astro)

```
src/
  styles/
    tokens.css            ← port :root from styles.css (or Tailwind theme.extend)
    motion.css            ← ship as-is: blobs, reveal, rise, pulse, float,
                            ladder, filter, reduced-motion block
  scripts/
    motion.ts             ← port motion.js: reveal IO, stagger, count-up,
                            ladder IO, filter, parallax  (one vanilla module)
  pages/
    projects.astro        ← hero (.reveal) + [data-filter-bar] + .pgrid[data-stagger]
    services.astro        ← hero (.reveal) + .ladder + .svc-list[data-stagger]
  components/
    ProjectCard.astro     ← .pcard / .pcard.feature (data-cats, data-reveal)
    ServiceRow.astro      ← .svc-row
    BgField.astro         ← .bg-field blobs (static)
    FloatPill.astro       ← .float-pill (data-depth)
```

Load order in each page: `tokens.css` → `styles.css` → `motion.css`, then `<script src="/scripts/motion.js" defer>` (or `import` in an Astro `<script>`). Set `<html class="no-js">`; `motion.js` strips it.

**Animation-driver summary:**

| Animation | Driver | Hydration |
|---|---|---|
| Blobs, grid, pulse, float bob, `.reveal` entrance | CSS keyframes | none |
| Scroll reveals + stagger | `motion.js` IO → `.in` | vanilla `<script>` |
| Count-up | `motion.js` IO + rAF | vanilla |
| Projects filter | `motion.js` click handler | vanilla (or `client:visible` island) |
| Card / row hover, sheen | CSS `:hover` | none |
| Pointer parallax | `motion.js` mousemove + rAF | vanilla, desktop-only |
| **Ladder draw** | `motion.js` IO → `.run`; CSS owns timing | vanilla |

---

## 14. Performance & a11y checklist

- [ ] Only `transform` / `opacity` / `box-shadow` / `border|background-color` animate; ladder uses `scaleX`, not `width`. Zero layout animation.
- [ ] `[data-reveal]` content is visible without JS (`.no-js` guard) — required for Astro static output + SEO.
- [ ] `prefers-reduced-motion`: CSS block + `motion.js` `REDUCE` branch both present; reveals/ladder/filter jump to final state, loops off, parallax skipped, count-up set to final.
- [ ] IntersectionObservers `unobserve` after firing (reveals, count, ladder) — no lingering callbacks.
- [ ] Parallax rAF self-cancels when settled; gated to `innerWidth ≥ 1024`.
- [ ] Count-up containers use `tabular-nums` → no width jitter.
- [ ] `blur(76px)` blobs are static transform-only layers; never animate blur. Cap 3.
- [ ] Filter removes hidden cards with `display:none` post-fade (off the paint/layout path).
- [ ] Sticky filter bar (`position:sticky`) drops to static < 900px to avoid covering content on mobile.
- [ ] Fonts loaded `display=swap` (already in `styles.css`) so reveals aren't gated on font load.
- [ ] Whole cards/rows are `<a>` — tap works on touch where hover doesn't.

---

## 15. Files to give Claude Code

| # | File | Why |
|---|---|---|
| 1 | `MOTION_HANDOFF_Pages.md` | **This document** — the spec for both pages |
| 2 | `Projects.html` | Final Projects design + markup hooks (`data-reveal`, `data-cats`, `data-filter`) |
| 3 | `Services.html` | Final Services design + ladder markup |
| 4 | `motion.css` | **All animation styles** — drop in as-is |
| 5 | `motion.js` | **All animation behavior** — port to one vanilla module |
| 6 | `styles.css` | Design system tokens (colors, type, spacing, radius, shadows) |

> **Brief for Claude Code:** Implement the Projects and Services index pages in Astro + TS + Tailwind. `motion.css` and `motion.js` are the complete, ready motion layer — port them verbatim (CSS as-is; JS as one vanilla `<script>`/module, no React or Framer Motion needed). Wire the markup hooks exactly as in files #2/#3: `[data-reveal]`/`[data-stagger]` for scroll reveals, `[data-filter-bar]`+`.filterable[data-cats]` for the Projects filter, and the `.ladder` structure for the Services draw-on-scroll. Honor `prefers-reduced-motion` and keep the `.no-js` visibility guard for SSR/SEO.
