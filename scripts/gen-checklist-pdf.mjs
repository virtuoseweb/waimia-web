#!/usr/bin/env node
// Régénère le PDF de la checklist « 90 jours pour déployer Claude en PME » à partir de la page rendue.
//
// Source unique du texte : src/data/checklist-90-jours-claude.ts → page
// /ressources/outils/checklist-90-jours-claude → feuille d'impression (@media print de
// l'organism ChecklistDocument) → private/telechargements/checklist-90-jours-claude-pme-waimia.pdf.
// À relancer après toute modification du texte de la checklist, puis committer le PDF.
//
// Usage :
//   node scripts/serve-dist.mjs --port 4330 --root dist/client &   (ou `astro dev`)
//   node scripts/gen-checklist-pdf.mjs --base http://localhost:4330
// Option : PW_CHROMIUM=/chemin/vers/chrome si le Chromium de Playwright n'est pas installé.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:4321';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'private/telechargements/checklist-90-jours-claude-pme-waimia.pdf');
mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch(
  process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
);
const page = await browser.newPage();
// Contexte neuf : aucune case cochée ni champ saisi en localStorage → le PDF est la checklist vierge.
await page.goto(`${base}/ressources/outils/checklist-90-jours-claude`, { waitUntil: 'domcontentloaded', timeout: 90_000 });
await page.waitForSelector('[data-ck-sheet]');
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: out,
  format: 'A4',
  margin: { top: '18mm', bottom: '18mm', left: '18mm', right: '18mm' },
  printBackground: false,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8px;color:#6B6560;padding:0 18mm;display:flex;justify-content:space-between;font-family:sans-serif">' +
    '<span>Checklist 90 jours · Claude en PME · waimia.com</span>' +
    '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
});
await browser.close();
console.log(`PDF écrit : ${out}`);
