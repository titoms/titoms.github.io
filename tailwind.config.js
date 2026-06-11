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
        "accent-soft":  'rgba(167, 139, 250, 0.12)',
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
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-soft': 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
      keyframes: {
        drift1: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(50px,36px) scale(1.08)' } },
        drift2: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(-44px,26px) scale(1.1)' } },
        drift3: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(28px,-34px) scale(1.06)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        vpulse: { '0%': { boxShadow: '0 0 0 0 rgba(167,139,250,.5)' }, '70%': { boxShadow: '0 0 0 8px rgba(167,139,250,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(167,139,250,0)' } },
        vblink: { '50%': { opacity: '0' } },
        rise: { 'to': { opacity: '1', transform: 'none' } },
      },
      animation: {
        'drift1': 'drift1 28s ease-in-out infinite',
        'drift2': 'drift2 34s ease-in-out infinite',
        'drift3': 'drift3 31s ease-in-out infinite',
        'vpulse': 'vpulse 2.6s ease-out infinite',
        'vblink': 'vblink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
