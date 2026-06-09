# Design System — titoms.github.io

Source of truth: `src/config/tokens.js`  
Token consumers: `tailwind.config.js` (Tailwind classes) and components via direct import for inline styles.

---

## 1. Color Palette

All values are defined in `src/config/tokens.js` and exposed as Tailwind utility classes via `tailwind.config.js`.

### Backgrounds

| Token | Tailwind class | Hex | Role |
|---|---|---|---|
| `colors.bgPrimary` | `bg-primary` | `#050816` | Full-page background |
| `colors.bgTertiary` | `bg-tertiary` | `#151030` | Card / surface background |
| `colors.bgSurface` | `bg-surface` / `bg-black-100` | `#100d25` | Panel overlays (Contact, CaseStudy nav) |
| `colors.bgDeep` | `bg-surface-deep` / `bg-black-200` | `#090325` | Deep fallback (no-image cards, gallery) |
| `colors.bgTimeline` | `bg-timeline` | `#1d1836` | VerticalTimeline card background |
| `colors.bgTimelineArrow` | — (JS only) | `#232631` | VerticalTimeline arrow border |
| `colors.bgShadow` | — (JS only) | `#211e35` | Card box-shadow base color |

### Brand

| Token | Tailwind class | Hex | Role |
|---|---|---|---|
| `colors.brand` | `bg-brand` / `text-brand` / `border-brand` | `#915eff` | Primary brand violet — buttons, accents, links |
| `colors.brandHover` | `bg-brand-hover` | `#804dee` | Hover / active state for brand elements |

Both are also available as CSS custom properties in `src/index.css`:
- `--color-brand: #915eff`
- `--color-brand-hover: #804dee`

### Text

| Token | Tailwind class | Hex | Role |
|---|---|---|---|
| `colors.textPrimary` | `text-white` | `#ffffff` | Primary headings and body |
| `colors.textSecondary` | `text-secondary` | `#aaa6c3` | Secondary body text, descriptions |
| `colors.textSubtle` | `text-subtle` | `#dfd9ff` | Hero sub-heading, taglines |
| `colors.textLight` | `text-white-100` | `#f3f3f3` | Light text variant |

### Icon Backgrounds (Experience timeline data)

| Token | Hex | Role |
|---|---|---|
| `colors.iconBgDark` | `#383E56` | Dark icon background — EventMaker, Panorabanques, Freelance Dev |
| `colors.iconBgLight` | `#E6DEDD` | Light icon background — Enovee, DSP |

---

## 2. Typography

**Font family:** Poppins (sans-serif) — set globally in `src/index.css` via `font-family: "Poppins", sans-serif`.

Token: `fonts.base = '"Poppins", sans-serif'`

### Type Scale

Defined as Tailwind class strings in `src/styles.js`:

| Name | Classes | Usage |
|---|---|---|
| `heroHeadText` | `font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2` | Hero section main heading |
| `heroSubText` | `text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]` | Hero section subtitle |
| `sectionHeadText` | `text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]` | Section headings (Overview, Skills, Projects…) |
| `sectionSubText` | `sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider` | Section eyebrow labels |

### Weights

| Value | Usage |
|---|---|
| `font-medium` | Body text, nav links |
| `font-semibold` | CTA buttons, tags |
| `font-bold` | Card titles, experience headings |
| `font-black` | Hero heading, section headings |

---

## 3. Spacing & Layout

### Container

- Max width: `max-w-7xl` (1280px) with `mx-auto`
- Applied via `SectionWrapper` HOC: `${styles.padding} max-w-7xl mx-auto relative z-0`

### Padding System (`src/styles.js`)

| Name | Classes | Usage |
|---|---|---|
| `paddingX` | `sm:px-16 px-6` | Horizontal section padding |
| `paddingY` | `sm:py-16 py-6` | Vertical section padding |
| `padding` | `sm:px-16 px-6 sm:py-16 py-10` | Combined (used in SectionWrapper) |

### Breakpoints

| Name | Value | Notes |
|---|---|---|
| `xs` | 450px | Custom — defined in Tailwind config |
| `sm` | 640px | Tailwind default |
| `md` | 768px | Tailwind default |
| `lg` | 1024px | Tailwind default |
| `min-[1000px]` | 1000px | Nav desktop/mobile breakpoint |

### Nav offset

```css
.hash-span {
  margin-top: -100px;
  padding-bottom: 100px;
}
```

Applied to every section anchor to account for the fixed 80px navbar + buffer.

---

## 4. Gradients & Utilities

Defined as CSS utility classes in `src/index.css`. Use as Tailwind-style class names directly in JSX.

### Background gradients

| Class | Description | Usage |
|---|---|---|
| `.black-gradient` | `#434343 → #000000` (right) | GitHub icon button background on project cards |
| `.violet-gradient` | `brand-hover → transparent` (left) | Vertical accent line in Hero |
| `.green-pink-gradient` | `#00cea8 → #bf61ff` (right) | Service card border glow (1px wrapper) |

### Text gradients

Apply alongside `bg-clip-text` and `text-transparent` (already embedded in each class):

| Class | Colors | Usage |
|---|---|---|
| `.orange-text-gradient` | `#f12711 → #f5af19` | Project tag color option |
| `.green-text-gradient` | `#11998e → #38ef7d` | Project tag color option |
| `.blue-text-gradient` | `#2f80ed → #56ccf2` | Project tag color option |
| `.pink-text-gradient` | `#ec008c → #fc6767` | Project tag color option |

### Scrollbar

`.custom-scrollbar` — applied to the CaseStudy modal scroll area. Uses `--color-brand-hover` for the thumb, `--color-bg-timeline` for the track.

---

## 5. Component Patterns

### SectionWrapper HOC

```jsx
SectionWrapper(Component, "section-id")
```

Wraps any section with `motion.section` (stagger animation), `max-w-7xl` container, and a `.hash-span` anchor offset. All main sections use this.

### Service / Project Cards (Tilt)

```jsx
<Tilt options={{ max: 45, scale: 1, speed: 450 }}>
  <div className="green-pink-gradient p-[1px] rounded-[20px] shadow-card">
    <div className="bg-tertiary rounded-[20px] ...">
      {/* content */}
    </div>
  </div>
</Tilt>
```

Pattern: 1px gradient border wrapping a `bg-tertiary` inner card with `shadow-card`.

### Buttons (filled brand)

```jsx
<a className="bg-brand text-white font-semibold px-5 py-2 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">
  Label
</a>
```

### Section title label

```jsx
<h4 className="text-brand uppercase tracking-widest text-[11px] font-semibold mb-3">
  LABEL
</h4>
```

Used inside CaseStudyModal for sub-section headings.

### CaseStudyModal

Full-screen portal (`createPortal → document.body`). Fixed layout with:
- Sticky nav bar: `bg-primary border-b border-white/5`
- Scrollable body with `.custom-scrollbar`
- Hero image with `bg-gradient-to-t from-primary` overlay
- Challenge cards: `bg-surface-deep/60 border border-white/5`
- Results cards: `bg-surface-deep/60 border border-brand/20`

### VerticalTimeline

Uses token values via direct import (framework boundary — no Tailwind classes here):

```jsx
import { colors } from '../config/tokens'

contentStyle={{ background: colors.bgTimeline, color: colors.textPrimary }}
contentArrowStyle={{ borderRight: `7px solid ${colors.bgTimelineArrow}` }}
```

### Scroll indicator (Hero)

```jsx
<div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary ...">
  <motion.div animate={{ y: [0,24,0] }} className="w-3 h-3 rounded-full bg-white" />
</div>
```

---

## 6. Shadows

| Token | Tailwind class | Value | Usage |
|---|---|---|---|
| `shadows.card` | `shadow-card` | `0px 35px 120px -15px #211e35` | Tilt card drop shadow |
| — | `shadow-brand/20` | Brand color at 20% opacity | CTA button shadow |

---

## Updating tokens

1. Change the value in `src/config/tokens.js`
2. Tailwind picks it up automatically via `tailwind.config.js`
3. Components using direct `import { colors }` update on next build
4. CSS variables in `src/index.css` must be updated manually if they diverge
