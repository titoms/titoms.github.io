import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind({ applyBaseStyles: false }), mdx(), sitemap()],
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
