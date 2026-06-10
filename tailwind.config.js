import { colors, fonts, layout, radii, shadows } from './src/config/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,astro}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Preserved names — already used across components
        primary:        colors.bgPrimary,
        secondary:      colors.textSecondary,
        tertiary:       colors.bgTertiary,
        "black-100":    colors.bgSurface,
        "black-200":    colors.bgDeep,
        "white-100":    colors.textLight,

        // Semantic names — replace all hardcoded hex classes
        brand:          colors.brand,
        "brand-hover":  colors.brandHover,
        surface:        colors.bgSurface,
        "surface-deep": colors.bgDeep,
        raised:         colors.bgRaised,
        inset:          colors.bgInset,
        timeline:       colors.bgTimeline,
        subtle:         colors.textSubtle,
        accent:         colors.brand,
        low:            colors.textLow,
        border:         colors.border,
        positive:       colors.positive,
        negative:       colors.negative,
      },
      borderColor: {
        DEFAULT: colors.border,
        strong: colors.borderStrong,
        accent: colors.borderAccent,
      },
      boxShadow: {
        sm: shadows.sm,
        md: shadows.md,
        lg: shadows.lg,
        card: shadows.card,
        glow: shadows.glow,
      },
      borderRadius: {
        sm: radii.sm,
        md: radii.md,
        lg: radii.lg,
        xl: radii.xl,
        pill: radii.pill,
      },
      fontFamily: {
        display: fonts.display,
        body: fonts.body,
        mono: fonts.mono,
      },
      maxWidth: {
        site: layout.maxw,
        prose: layout.prose,
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.webp')",
      },
    },
  },
  plugins: [],
}
