#!/usr/bin/env node
// Gate · prix à source unique (src/data/pricing.ts).
//
//  1. Contenu (src/content/**, src/data/pages/**) : le taux horaire ne s'écrit jamais en dur,
//     il passe par le jeton `{{prix.horaire}}` (résolu au chargement).
//  2. Reste de src/ (démos de catalogue, pages .astro) : un taux horaire écrit en dur doit
//     valoir HOURLY_RATE_EUR.
//  3. Si dist/ existe : aucun jeton `{{prix.` non résolu, aucun taux horaire différent.
//  4. Formations (TRAINING_FORMATS) : dans le contenu, durée et prix d'un format passent par
//     les jetons `{{prix.formation.*}}` ; aucun montant en dur dans src/content/formations/.
//     Dans dist/, tout « N heures pour X € » doit correspondre à un format de la source, et
//     chaque page de formation affiche tous les formats.
//  5. Système commercial (SALES_SYSTEM_FLOOR_EUR) : le prix d'entrée mensuel ne s'écrit pas
//     en dur dans le contenu (jeton `{{prix.commercial}}`), `seo.priceMin` des pages qui
//     l'utilisent vaut la source, et la page bâtie n'affiche jamais « Dès 0 € ».
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

const formats = [...pricingSrc.matchAll(/\{\s*id:\s*'(f\d)',\s*hours:\s*(\d+),\s*price:\s*(\d+)\s*\}/g)].map((m) => ({
  id: m[1],
  hours: Number(m[2]),
  price: Number(m[3]),
}));
// Le sprint de cadrage s'écrit aussi « 10 heures pour 999 € » : ce couple-là n'est pas une formation.
const sprint = {
  hours: Number(/SCOPING_SPRINT_HOURS\s*=\s*(\d+)/.exec(pricingSrc)?.[1]),
  price: Number(/SCOPING_SPRINT_EUR\s*=\s*(\d+)/.exec(pricingSrc)?.[1]),
};
const salesFloor = Number(/SALES_SYSTEM_FLOOR_EUR\s*=\s*(\d+)/.exec(pricingSrc)?.[1]);
if (formats.length === 0 || !Number.isFinite(salesFloor)) {
  console.error('check-pricing : TRAINING_FORMATS ou SALES_SYSTEM_FLOOR_EUR introuvable dans src/data/pricing.ts');
  process.exit(1);
}

const SP = '[ \\u00a0\\u202f]';
// « 80 € HT de l'heure », « 80 €/h », « 80 € an hour », « €80 per hour », « 80 euros de l'heure »…
const HOURLY = new RegExp(
  `(?:(\\d[\\d ]*|\\{\\{prix\\.horaire\\}\\})${SP}(?:€|euros)(?:${SP}HT|${SP}ex[ -]VAT)?(?:${SP}de l['’]heure|${SP}l['’]heure|${SP}an hour|${SP}per hour|${SP}?/ ?h\\b))|(?:€(\\d+|\\{\\{prix\\.horaire\\}\\})${SP}per hour)`,
  'g',
);

// « 10 heures pour 2 000 € », « 20 hours for 4,000 € », « 10 h pour 2000 euros »…
const TRAINING = new RegExp(`(\\d+)${SP}?(?:heures|hours|h)${SP}(?:pour|for)${SP}(\\d[\\d \\u00a0\\u202f,.]*)${SP}?(?:€|euros)`, 'g');
// Montant en euros écrit en chiffres (« 2 000 € », « €2,000 », « 4000 euros »).
const ANY_EUR = new RegExp(`\\d[\\d \\u00a0\\u202f,.]*${SP}?(?:€|euros)|€${SP}?\\d`, 'g');
// Prix d'entrée du système commercial écrit en dur (« 980 € », « €980 », « 980-1650€ »).
const SALES = new RegExp(`(?<![\\d.,])${salesFloor}(?:${SP}?(?:€|euros)|[–-]\\d)|€${SP}?${salesFloor}(?!\\d)`, 'g');
const digits = (v) => Number(String(v).replace(/[^\d]/g, ''));
const isSprint = (m) => Number(m[1]) === sprint.hours && digits(m[2]) === sprint.price;

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
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');
  if (isContent(rel)) {
    lines.forEach((line, i) => {
      for (const m of line.matchAll(TRAINING)) if (!isSprint(m)) errors.push(`${rel}:${i + 1} format de formation en dur « ${m[0]} » : utiliser {{prix.formation.*}}`);
      for (const m of line.matchAll(SALES)) errors.push(`${rel}:${i + 1} prix d'entrée commercial en dur « ${m[0]} » : utiliser {{prix.commercial}}`);
      if (rel.startsWith('src/content/formations/')) {
        for (const m of line.matchAll(ANY_EUR)) errors.push(`${rel}:${i + 1} montant en dur « ${m[0]} » dans une page de formation : utiliser {{prix.formation.*}}`);
      }
    });
    // `seo.priceMin` est numérique (pas de jeton possible) : il doit valoir la source.
    if (/"priceRange":\s*"\{\{prix\.commercial\}\}/.test(source)) {
      const min = Number(/"priceMin":\s*(\d+)/.exec(source)?.[1]);
      if (min !== salesFloor) errors.push(`${rel} seo.priceMin ${min} ≠ ${salesFloor} (SALES_SYSTEM_FLOOR_EUR)`);
    }
  }
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
    for (const m of html.matchAll(TRAINING)) {
      if (!isSprint(m) && !formats.some((f) => f.hours === Number(m[1]) && f.price === digits(m[2]))) {
        errors.push(`${rel} format de formation « ${m[0]} » absent de TRAINING_FORMATS`);
      }
    }
    const page = rel.replaceAll('\\', '/');
    if (/\/formations\/[^/]+\/index\.html$/.test(page)) {
      const shown = [...html.matchAll(TRAINING)].map((m) => `${Number(m[1])}:${digits(m[2])}`);
      for (const f of formats) {
        if (!shown.includes(`${f.hours}:${f.price}`)) errors.push(`${rel} format ${f.hours} h / ${f.price} € non affiché`);
      }
    }
    if (/\/services\/systeme-commercial\/index\.html$/.test(page)) {
      if (new RegExp(`[Dd]ès${SP}0${SP}?€`).test(html)) errors.push(`${rel} « Dès 0 € » : le prix d'entrée est ${salesFloor} € HT par mois, l'essai gratuit n'est pas un prix`);
      if (!new RegExp(`[Dd]ès${SP}${salesFloor}${SP}?€`).test(html)) errors.push(`${rel} prix d'entrée « dès ${salesFloor} € » non affiché`);
    }
  }
}

if (errors.length) {
  console.error(`✗ check-pricing : ${errors.length} écart(s)`);
  for (const e of errors.slice(0, 60)) console.error('  · ' + e);
  process.exit(1);
}
console.log(
  `✓ check-pricing : taux horaire ${rate} € HT, ${formats.length} formats de formation (${formats.map((f) => `${f.hours} h / ${f.price} €`).join(', ')}) et prix d'entrée commercial ${salesFloor} € HT à source unique (src/ ${DIST ? `+ ${scanned} fichiers bâtis` : ', dist/ absent'}).`,
);
