import { colors, shadows } from './src/config/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
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
        timeline:       colors.bgTimeline,
        subtle:         colors.textSubtle,
      },
      boxShadow: {
        card: shadows.card,
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
