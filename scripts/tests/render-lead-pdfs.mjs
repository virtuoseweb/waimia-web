/**
 * Rendu des PDF de fixtures (preuve visuelle) : node scripts/tests/render-lead-pdfs.mjs <dossier>
 * Écrit diag-<cas>.pdf et roi-<cas>.pdf, puis affiche taille, pages et durée.
 */
import './_src-hooks.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { DIAG, ROI, LONG_EMAIL } from './fixtures/lead-tools.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = (p) => pathToFileURL(join(ROOT, 'src', p)).href;
const { computeLeadTool } = await import(src('lib/lead-tools/index.ts'));
const { renderLeadToolPdf } = await import(src('lib/pdf/index.ts'));

const out = resolve(process.argv[2] ?? '/tmp/pdf-proof');
mkdirSync(out, { recursive: true });
const date = new Date('2026-10-11T08:30:00Z');
const jobs = [
  ...Object.entries(DIAG).map(([k, v]) => [`diag-${k}`, v, k === 'fort' ? LONG_EMAIL : 'claire.martin@atelier-durand.fr']),
  ...Object.entries(ROI).map(([k, v]) => [`roi-${k}`, v, k === 'maxima' ? LONG_EMAIL : 'claire.martin@atelier-durand.fr']),
];
for (const [name, payload, email] of jobs) {
  const t0 = performance.now();
  const res = computeLeadTool(payload);
  const { bytes, filename } = await renderLeadToolPdf(res, { email, date, lang: 'fr' });
  const ms = Math.round(performance.now() - t0);
  writeFileSync(join(out, `${name}.pdf`), bytes);
  const pages = (await PDFDocument.load(bytes)).getPageCount();
  console.log(`${name}.pdf · ${filename} · ${(bytes.length / 1024).toFixed(0)} Ko · ${pages} pages · ${ms} ms`);
}
