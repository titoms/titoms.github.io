import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_FEATURES } from './src/config/features.ts';

export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      // Soft-launch gate: keep commerce pages out of the sitemap until go-live.
      filter: (page) =>
        SITE_FEATURES.shopBooking ||
        !(page.includes('/shop/') || page.includes('/booking/')),
    }),
  ],
  site: 'https://fullstackchris.dev',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'redirect',
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
});
