#!/usr/bin/env node
// Génère le PDF d'un lead magnet VERROUILLÉ (livré uniquement par e-mail, jamais servi par le site).
//
// Source : private/lead-magnets-src/<slug>/index.html (HTML autonome : <style> inline, images en chemins
// relatifs ou file://, polices via @font-face vers ../../../public/fonts/*.woff2).
// Sortie : private/telechargements/<slug>.pdf (hors public/, donc non servi ; lu par /api/lead-magnet).
//
// Usage : node scripts/gen-lead-pdf.mjs <slug> [--footer "Texte de pied de page"]
// Option : PW_CHROMIUM=/chemin/vers/chrome si le Chromium de Playwright n'est pas installé.
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const slug = args[0];
if (!slug || slug.startsWith('--')) {
  console.error('Usage : node scripts/gen-lead-pdf.mjs <slug> [--footer "texte"]');
  process.exit(1);
}
const footer = args.includes('--footer') ? args[args.indexOf('--footer') + 1] : `${slug} · waimia.com`;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, `private/lead-magnets-src/${slug}/index.html`);
const out = resolve(root, `private/telechargements/${slug}.pdf`);
if (!existsSync(src)) {
  console.error(`Source introuvable : ${src}`);
  process.exit(1);
}
mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch(
  process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
);
const page = await browser.newPage();
await page.goto(pathToFileURL(src).href, { waitUntil: 'load', timeout: 60_000 });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: out,
  format: 'A4',
  margin: { top: '16mm', bottom: '18mm', left: '16mm', right: '16mm' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8px;color:#6B6560;padding:0 16mm;display:flex;justify-content:space-between;font-family:sans-serif">' +
    `<span>${footer}</span>` +
    '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
});
await browser.close();
console.log(`PDF écrit : ${out}`);
