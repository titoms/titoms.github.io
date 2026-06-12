// Generates public/og-image.png — 1200×630 social card.
// Composition: dark charcoal background + soft violet radial glow + mainlogo mark + tagline.
// Re-run with `node scripts/generate-og-image.mjs` whenever the brand changes.

import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.78" cy="0.18" r="0.8">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#7c5ce8" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0d0d10" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#0d0d10"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="0" y="0" width="100%" height="6" fill="#a78bfa" opacity="0.85"/>

  <g font-family="'Space Grotesk','Hanken Grotesk','Helvetica Neue',Arial,sans-serif">
    <!-- Eyebrow -->
    <text x="80" y="148" font-size="22" letter-spacing="6" font-weight="500" fill="#a78bfa" font-family="'JetBrains Mono','Courier New',monospace">
      AI FULLSTACK ENGINEER
    </text>

    <!-- Headline -->
    <text x="80" y="262" font-size="84" font-weight="700" fill="url(#hl)" letter-spacing="-1.5">
      Production-ready
    </text>
    <text x="80" y="356" font-size="84" font-weight="700" fill="url(#hl)" letter-spacing="-1.5">
      products, <tspan fill="#a78bfa">end to end.</tspan>
    </text>

    <!-- Lead -->
    <text x="80" y="440" font-size="28" font-weight="400" fill="#a4a4af">
      Fullstack engineering, automation
    </text>
    <text x="80" y="478" font-size="28" font-weight="400" fill="#a4a4af">
      and applied AI — shipped to production.
    </text>

    <!-- URL pill -->
    <g transform="translate(80,540)">
      <rect x="0" y="0" width="280" height="44" rx="22" fill="#1a1a20" stroke="#a78bfa" stroke-opacity="0.4"/>
      <circle cx="22" cy="22" r="5" fill="#5fd99a"/>
      <text x="40" y="29" font-size="18" font-weight="500" fill="#f4f4f6" font-family="'JetBrains Mono','Courier New',monospace">
        fullstackchris.dev
      </text>
    </g>
  </g>

  <!-- Decorative corner mark -->
  <g transform="translate(1050,80)">
    <rect x="0" y="0" width="80" height="80" rx="20" fill="#1a1a20" stroke="#a78bfa" stroke-opacity="0.4"/>
    <text x="40" y="56" font-size="44" font-weight="800" fill="#a78bfa" text-anchor="middle" font-family="'Space Grotesk',sans-serif">C</text>
  </g>
</svg>
`;

const out = await sharp(Buffer.from(svg)).png({ quality: 92, compressionLevel: 9 }).toBuffer();
await writeFile('public/og-image.png', out);
console.log(`og-image.png written (${(out.length / 1024).toFixed(1)} KB)`);
