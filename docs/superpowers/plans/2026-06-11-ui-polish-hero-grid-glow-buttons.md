# UI Polish — Hero sizing, grid, cursor glow, gradient borders

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Four visual enhancements — bigger hero text, restored background grid on hero, smooth page-wide mouse-tracking ambient glow, and gradient animated borders on secondary/ghost buttons.

**Architecture:** All changes are CSS/JS only. The cursor glow is a `position: fixed` element added to `BaseLayout.astro` using `mix-blend-mode: screen` so it appears to illuminate content from behind without occluding anything. Button gradient borders use CSS `@property --border-angle` (Houdini) for a smooth native-animated conic-gradient spin.

**Tech Stack:** Astro 6, CSS custom properties / Houdini `@property`, Tailwind CSS (JIT), React 18 (Button component), `requestAnimationFrame` lerp for glow tracking.

---

## File Map

| File | Change |
|---|---|
| `src/components/hero/HeroV2.astro` | Hero font sizes, copy gap, grid `::after` rule, secondary btn hover override |
| `src/styles/global.css` | `#cursor-glow` CSS, `@property --border-angle`, `@keyframes border-spin`, `.btn-grad-hover` |
| `src/components/layout/BaseLayout.astro` | `<div id="cursor-glow">` + inline lerp script |
| `src/components/ui/Button.tsx` | Add `btn-grad-hover` to `secondary` and `ghost` variant strings |

---

## Task 1: Hero typography — bigger desktop sizing

**Files:**
- Modify: `src/components/hero/HeroV2.astro:107-111` (inside `<style is:global>`)

- [ ] Open `src/components/hero/HeroV2.astro`. In the `<style is:global>` block, find and update three CSS rules:

**Replace `.v-h1` font-size:**
```css
/* before */
.v-h1 { font-family: var(--font-display); font-weight: 600; line-height: 0.98; letter-spacing: -0.035em; color: var(--text-hi); margin: 0; font-size: clamp(2.4rem, 4.5vw, 3.4rem); }

/* after */
.v-h1 { font-family: var(--font-display); font-weight: 600; line-height: 0.98; letter-spacing: -0.035em; color: var(--text-hi); margin: 0; font-size: clamp(2.8rem, 5.5vw, 4.4rem); }
```

**Replace `.v-sub` font-size:**
```css
/* before */
.v-sub { color: var(--text-mid); font-size: 1.02rem; line-height: 1.55; margin: 0; max-width: 38ch; }

/* after */
.v-sub { color: var(--text-mid); font-size: 1.12rem; line-height: 1.55; margin: 0; max-width: 38ch; }
```

**Replace `.v2-copy` gap:**
```css
/* before */
.v2-copy { display: flex; flex-direction: column; gap: 20px; }

/* after */
.v2-copy { display: flex; flex-direction: column; gap: 24px; }
```

- [ ] Start dev server (if not already running): `pnpm dev`

- [ ] Open `http://localhost:4321` (or the port shown in terminal). On a desktop viewport (≥1080px wide), the headline should visibly larger — roughly 4rem tall — and the paragraph text should feel slightly more spacious.

- [ ] Commit:
```bash
git add src/components/hero/HeroV2.astro
git commit -m "style: increase hero headline and subhead size on desktop"
```

---

## Task 2: Hero background grid

**Files:**
- Modify: `src/components/hero/HeroV2.astro` (inside `<style is:global>`, before the responsive breakpoints)

- [ ] In `src/components/hero/HeroV2.astro`'s `<style is:global>` block, add the following rule immediately after the `.hero-v2-root { ... }` rule (around line 74):

```css
/* grid overlay — sits above blobs (z:0) and below copy (z:3) */
.hero-v2-root::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.4;
  z-index: 2;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%);
}
```

- [ ] In the browser, the hero section should now show a subtle 64px grid pattern fading down from the top, matching the look of other sections (contact, services, etc.). The blobs should remain visible through and behind the grid.

- [ ] Commit:
```bash
git add src/components/hero/HeroV2.astro
git commit -m "style: restore 64px grid overlay on hero section"
```

---

## Task 3: Cursor glow — CSS, HTML element, and JS script

**Files:**
- Modify: `src/styles/global.css` (append after the `.grid-bg::after` block, around line 109)
- Modify: `src/components/layout/BaseLayout.astro` (add div + script inside `<body>`)

### 3a — CSS

- [ ] Open `src/styles/global.css`. After the closing `}` of the `.grid-bg::after` block (line ~109), add:

```css
/* ---- cursor glow ---- */
#cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 1000px;
  height: 700px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  background: radial-gradient(ellipse 500px 380px at center, rgba(139, 92, 246, 0.22), transparent 70%);
  transform: translate(-50%, -50%);
  will-change: transform;
  opacity: 0;
  transition: opacity 0.5s ease;
}

body.cursor-active #cursor-glow {
  opacity: 1;
}

@media (hover: none) {
  #cursor-glow { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  #cursor-glow { display: none; }
}
```

### 3b — HTML div and JS script

- [ ] Open `src/components/layout/BaseLayout.astro`. Inside `<body>`, add `<div id="cursor-glow" aria-hidden="true"></div>` immediately before the existing `<slot />` line:

```astro
<body>
  <div id="cursor-glow" aria-hidden="true"></div>
  <slot />
  ...
```

- [ ] In the same file, add the following `<script is:inline>` block immediately before `</body>` (after the Cloudflare analytics script block):

```astro
<script is:inline>
  (function () {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var cx = tx, cy = ty;
    var raf = 0, active = false;

    function loop() {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      glow.style.transform = 'translate(calc(' + cx + 'px - 50%), calc(' + cy + 'px - 50%))';
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        document.body.classList.add('cursor-active');
      }
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  })();
</script>
```

- [ ] In the browser, move the mouse around the page. A soft violet ambient bloom should follow the cursor with smooth easing (~300ms settle time). It should appear to illuminate the background without covering text or UI elements.

- [ ] On a touch device or browser with `@media (hover: none)` (simulate via DevTools → no hover), the glow div should not appear at all.

- [ ] Commit:
```bash
git add src/styles/global.css src/components/layout/BaseLayout.astro
git commit -m "feat: add mouse-tracking ambient glow (mix-blend-mode screen)"
```

---

## Task 4: Gradient animated borders on buttons

**Files:**
- Modify: `src/styles/global.css` (append after cursor glow block)
- Modify: `src/components/ui/Button.tsx:26-33` (variant class strings)
- Modify: `src/components/hero/HeroV2.astro:120-121` (`.v-btn.secondary:hover` rule)

### 4a — Global CSS: `@property`, keyframes, utility class

- [ ] Open `src/styles/global.css`. After the cursor glow block added in Task 3, append:

```css
/* ---- gradient border animation ---- */
@property --border-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes border-spin {
  to { --border-angle: 360deg; }
}

.btn-grad-hover {
  --btn-bg: var(--bg-2);
}

.btn-grad-hover:hover {
  border-color: transparent;
  background:
    linear-gradient(var(--btn-bg), var(--btn-bg)) padding-box,
    conic-gradient(
      from var(--border-angle),
      transparent 20%,
      var(--accent-400) 45%,
      #60a5fa 60%,
      transparent 80%
    ) border-box;
  animation: border-spin 5s linear infinite;
}
```

Note: `.btn-grad-hover` is defined after `@tailwind utilities` in the cascade, so it naturally overrides Tailwind's `hover:border-accent` and `hover:bg-raised` without needing `!important`.

### 4b — React Button component

- [ ] Open `src/components/ui/Button.tsx`. In the `variants` object, add `btn-grad-hover` to the `secondary` and `ghost` strings:

```tsx
const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand text-[var(--text-on-accent)] shadow-[0_0_0_1px_rgba(167,139,250,0.4),0_8px_24px_rgba(124,92,232,0.25)] hover:bg-brand-hover hover:text-[var(--text-on-accent)] hover:shadow-glow",
  secondary:
    "border-strong bg-tertiary text-white hover:border-accent hover:bg-raised hover:text-white btn-grad-hover",
  ghost:
    "border-transparent bg-transparent text-secondary hover:bg-tertiary hover:text-white btn-grad-hover",
};
```

The `ghost` variant has a transparent background. Override `--btn-bg` for it so the gradient border uses a transparent fill (button bg stays transparent on hover):

Add to `src/styles/global.css` immediately after the `.btn-grad-hover { --btn-bg: var(--bg-2); }` line:

```css
.btn-grad-hover.ghost-bg,
[data-variant="ghost"].btn-grad-hover {
  --btn-bg: transparent;
}
```

Actually, the simpler approach: target ghost buttons by combining with their Tailwind `bg-transparent` class. Instead, just add an override directly in Button.tsx by passing a custom class. Since `ghost` buttons are transparent and you can see through them, `--btn-bg: transparent` is needed. Add this override in global.css targeting the ghost button pattern:

```css
.btn-grad-hover.bg-transparent {
  --btn-bg: transparent;
}
```

Add that line after `.btn-grad-hover { --btn-bg: var(--bg-2); }`.

### 4c — Hero `.v-btn.secondary` hover override

The hero uses plain HTML classes, not React Button. Its hover rule in `HeroV2.astro` would override the global `.btn-grad-hover:hover` (same specificity, later in cascade). Replace the secondary hover rule directly.

- [ ] Open `src/components/hero/HeroV2.astro`. Find this rule in `<style is:global>` (around line 121):

```css
.v-btn.secondary:hover { background: var(--bg-3); border-color: var(--accent-400); }
```

Replace it with:

```css
.v-btn.secondary:hover {
  border-color: transparent;
  background:
    linear-gradient(var(--bg-2), var(--bg-2)) padding-box,
    conic-gradient(
      from var(--border-angle),
      transparent 20%,
      var(--accent-400) 45%,
      #60a5fa 60%,
      transparent 80%
    ) border-box;
  animation: border-spin 5s linear infinite;
}
```

- [ ] In the browser, hover over:
  1. "Explore services" button in the hero — should show the slow spinning gradient border (violet arcs around the button edge, spinning continuously)
  2. Any secondary `Button` component elsewhere on the page (e.g. in the services section or pricing section)
  3. Primary "Start your project" button — should be unchanged (solid violet hover with glow)

- [ ] The animation should be smooth (no stuttering) — this confirms `@property --border-angle` is working. If you see discrete jumps, the browser doesn't support `@property` and fell back to no animation (acceptable).

- [ ] Commit:
```bash
git add src/styles/global.css src/components/ui/Button.tsx src/components/hero/HeroV2.astro
git commit -m "feat: add smooth spinning gradient border on secondary/ghost button hover"
```

---

## Verification checklist (run after all tasks)

- [ ] Desktop (≥1080px): H1 is visibly larger (~4rem), subhead is slightly bigger, copy has more breathing room
- [ ] Hero section has 64px grid fading from top, matching the grid on contact/services/about sections
- [ ] Moving mouse across the page produces a soft violet bloom that follows with smooth lag (~300ms settle); stops when mouse exits viewport
- [ ] On mobile (or DevTools touch emulation), no glow element is visible
- [ ] Hovering any secondary or ghost button shows a slow conic-gradient ring spinning around the border (5s/revolution, smooth)
- [ ] Primary buttons are visually unchanged on hover
- [ ] No layout shifts, no z-index regressions (content readable, nav clickable, modals still on top)
