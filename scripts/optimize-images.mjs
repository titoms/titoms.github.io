import { readdir, stat, rename, unlink, readFile, writeFile } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';
import { optimize as svgo } from 'svgo';

const ROOT = 'src/assets';
const QUALITY = 80;
const LOGO_QUALITY = 85;
const COMPANY_MAX = 400;
const SCREENSHOT_MAX = 1600;
const HERO_MAX = 1920;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let convertedCount = 0;
let recompressedCount = 0;
let svgCount = 0;
let totalSaved = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  const name = basename(file).toLowerCase();
  const norm = file.replace(/\\/g, '/');
  const isCompany = norm.includes('/company/');
  const isHero = name.startsWith('herobg');
  const isLogo = name.startsWith('logo') || name.startsWith('mainlogo');
  const maxW = isCompany ? COMPANY_MAX : isHero ? HERO_MAX : SCREENSHOT_MAX;
  const q = isLogo ? LOGO_QUALITY : QUALITY;

  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    const buf = await readFile(file);
    const before = buf.length;
    const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
    const outBuf = await sharp(buf).resize({ width: maxW, withoutEnlargement: true }).webp({ quality: q }).toBuffer();
    await writeFile(out, outBuf);
    if (out !== file) await unlink(file);
    totalSaved += before - outBuf.length;
    convertedCount++;
    console.log(`CONVERT ${file} -> ${out} | ${(before/1024).toFixed(1)}KB -> ${(outBuf.length/1024).toFixed(1)}KB`);
  } else if (ext === '.webp') {
    const buf = await readFile(file);
    const before = buf.length;
    const outBuf = await sharp(buf).resize({ width: maxW, withoutEnlargement: true }).webp({ quality: q }).toBuffer();
    if (outBuf.length < before * 0.95) {
      await writeFile(file, outBuf);
      totalSaved += before - outBuf.length;
      recompressedCount++;
      console.log(`RECOMP  ${file} | ${(before/1024).toFixed(1)}KB -> ${(outBuf.length/1024).toFixed(1)}KB`);
    }
  } else if (ext === '.svg') {
    const src = readFileSync(file, 'utf8');
    const result = svgo(src, { multipass: true });
    if (result.data && result.data.length < src.length) {
      writeFileSync(file, result.data);
      totalSaved += src.length - result.data.length;
      svgCount++;
      console.log(`SVGO    ${file} | ${src.length}B -> ${result.data.length}B`);
    }
  }
}

console.log(`\nDone. converted=${convertedCount} recompressed=${recompressedCount} svgs=${svgCount} | total saved ${(totalSaved/1024).toFixed(1)}KB`);
