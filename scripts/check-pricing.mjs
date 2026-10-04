#!/usr/bin/env node
// Gate · prix à source unique (src/data/pricing.ts).
//
//  1. Contenu (src/content/**, src/data/pages/**) : le taux horaire ne s'écrit jamais en dur,
//     il passe par le jeton `{{prix.horaire}}` (résolu au chargement).
//  2. Reste de src/ (démos de catalogue, pages .astro) : un taux horaire écrit en dur doit
//     valoir HOURLY_RATE_EUR.
//  3. Si dist/ existe : aucun jeton `{{prix.` non résolu, aucun taux horaire différent.
//
// Usage : node scripts/check-pricing.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const pricingSrc = readFileSync(join(ROOT, 'src/data/pricing.ts'), 'utf8');
const rate = Number(/HOURLY_RATE_EUR\s*=\s*(\d+)/.exec(pricingSrc)?.[1]);
if (!Number.isFinite(rate)) {
  console.error('check-pricing : HOURLY_RATE_EUR introuvable dans src/data/pricing.ts');
  process.exit(1);
}

const SP = '[ \\u00a0\\u202f]';
// « 80 € HT de l'heure », « 80 €/h », « 80 € an hour », « €80 per hour », « 80 euros de l'heure »…
const HOURLY = new RegExp(
  `(?:(\\d[\\d ]*|\\{\\{prix\\.horaire\\}\\})${SP}(?:€|euros)(?:${SP}HT|${SP}ex[ -]VAT)?(?:${SP}de l['’]heure|${SP}l['’]heure|${SP}an hour|${SP}per hour|${SP}?/ ?h\\b))|(?:€(\\d+|\\{\\{prix\\.horaire\\}\\})${SP}per hour)`,
  'g',
);

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const errors = [];
const isContent = (rel) => rel.startsWith('src/content/') || rel.startsWith('src/data/pages/');
const SKIP = /generated|section-quickref\.json$/;

for (const file of walk(join(ROOT, 'src'), ['.json', '.ts', '.astro', '.md', '.mdx', '.mjs'])) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  if (SKIP.test(rel)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(HOURLY)) {
      const value = (m[1] ?? m[2]).trim();
      if (value.startsWith('{{')) continue;
      if (isContent(rel)) errors.push(`${rel}:${i + 1} taux horaire en dur « ${m[0]} » : utiliser {{prix.horaire}}`);
      else if (Number(value.replace(/\s/g, '')) !== rate) errors.push(`${rel}:${i + 1} taux horaire « ${m[0]} » ≠ ${rate} € (src/data/pricing.ts)`);
    }
  });
}

const DIST = ['dist/client', '.vercel/output/static', 'dist'].map((d) => join(ROOT, d)).find((d) => existsSync(d));
let scanned = 0;
if (DIST) {
  for (const file of walk(DIST, ['.html', '.md', '.txt', '.xml'])) {
    scanned++;
    const html = readFileSync(file, 'utf8');
    const rel = relative(ROOT, file);
    if (html.includes('{{prix.')) errors.push(`${rel} jeton de prix non résolu ({{prix.…}})`);
    for (const m of html.matchAll(HOURLY)) {
      const value = (m[1] ?? m[2]).trim();
      if (Number(value.replace(/\s/g, '')) !== rate) errors.push(`${rel} taux horaire « ${m[0]} » ≠ ${rate} €`);
    }
  }
}

if (errors.length) {
  console.error(`✗ check-pricing : ${errors.length} écart(s)`);
  for (const e of errors.slice(0, 60)) console.error('  · ' + e);
  process.exit(1);
}
console.log(`✓ check-pricing : taux horaire ${rate} € HT à source unique (src/ ${DIST ? `+ ${scanned} fichiers bâtis` : ', dist/ absent'}).`);
