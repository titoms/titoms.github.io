# UI Polish — Hero sizing, grid, cursor glow, gradient borders

**Date:** 2026-06-11  
**Scope:** Four visual enhancements to the homepage hero and site-wide button interactions.

---

## 1. Hero content bigger on desktop

**File:** `src/components/hero/HeroV2.astro`

| Property | Before | After |
|---|---|---|
| H1 `.v-h1` font-size | `clamp(2.4rem, 4.5vw, 3.4rem)` | `clamp(2.8rem, 5.5vw, 4.4rem)` |
| Subhead `.v-sub` font-size | `1.02rem` | `1.12rem` |
| `.v2-copy` gap | `20px` | `24px` |

Column proportion (`0.82fr 1fr`) and outer padding (`120px 5% 80px`) stay unchanged.

---

## 2. Background grid on hero

**File:** `src/components/hero/HeroV2.astro` — inside `<style is:global>`

Add `.hero-v2-root::after` rule directly (not via the global `.grid-bg` class, to keep z-index control inside the hero stacking context):

```css
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

Z-index rationale: blobs `.vbg` = 0, grid = 2, copy `.v2-wrap` = 3.  
Opacity `0.4` (vs `0.5` globally) to avoid competing with the animated blob gradients.

---

## 3. Mouse-tracking ambient glow (whole page)

### HTML — `src/components/layout/BaseLayout.astro`

Add before `<slot />` inside `<body>`:

```html
<div id="cursor-glow" aria-hidden="true"></div>
```

### CSS — `src/styles/global.css`

```css
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

**Why `mix-blend-mode: screen`:** The glow adds ambient light to everything below without occluding any element. Grid lines, text, and components remain fully visible. The glow appears to sit behind content because screen-blend only brightens — it never covers. Standard technique used by linear.app / Vercel.

### JS — inline script in `src/components/layout/BaseLayout.astro`

Added as `<script is:inline>` before `</body>`:

```js
(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let cx = tx, cy = ty;
  let raf = 0, active = false;

  function loop() {
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;
    glow.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = 0;
    }
  }

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!active) {
      active = true;
      document.body.classList.add('cursor-active');
    }
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
})();
```

Lerp factor `0.05` at ~60fps gives ~300ms to settle — smooth, not laggy.

---

## 4. Gradient animated borders on buttons (whole site)

### Technique

CSS `@property --border-angle` (Houdini) animates the `conic-gradient` start angle natively, giving a perfectly smooth spin. No keyframe-stepped fallback needed — support is 96%+ of modern browsers.

### CSS — `src/styles/global.css`

```css
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
  border-color: transparent !important;
  background:
    linear-gradient(var(--btn-bg), var(--btn-bg)) padding-box,
    conic-gradient(
      from var(--border-angle),
      transparent 20%,
      var(--accent-400) 45%,
      #60a5fa 60%,
      transparent 80%
    ) border-box !important;
  animation: border-spin 5s linear infinite;
}
```

`--btn-bg` defaults to `var(--bg-2)` (`#1a1a20`). Ghost buttons (transparent bg) override it to `transparent`.

### Application surface

**`src/components/ui/Button.tsx`** — add `btn-grad-hover` to `secondary` and `ghost` variant class strings.

**`src/components/hero/HeroV2.astro`** — add a `.v-btn.secondary.btn-grad-hover` CSS override in the `<style is:global>` block (or add the class to the secondary anchor element in the template).

Primary buttons in both systems keep their existing hover (solid `accent-300` bg + glow shadow). The gradient border would be invisible against a solid violet background.

---

## Files changed

| File | Change |
|---|---|
| `src/components/hero/HeroV2.astro` | Hero sizing, grid `::after`, hero secondary button class |
| `src/styles/global.css` | `#cursor-glow` CSS, `@property`, `@keyframes border-spin`, `.btn-grad-hover` |
| `src/components/layout/BaseLayout.astro` | `#cursor-glow` div + inline script |
| `src/components/ui/Button.tsx` | Add `btn-grad-hover` to secondary/ghost variants |
