import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind({ applyBaseStyles: false }), mdx()],
  site: 'https://fullstackchris.dev',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
