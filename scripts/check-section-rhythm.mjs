#!/usr/bin/env node
/**
 * check-section-rhythm.mjs — Gate « rythme vertical = famille --section-* » (refonte R4).
 *
 * Doctrine (docs/37-REFONTE-SYSTEMIQUE.md §2.4, arbitrage A4) : le rythme vertical
 * inter-sections est UNE famille de crans FIXES :
 *   --section-tight (48px) · --section-base (96px) · --section-loose (160px) · --section-grand (256px)
 * Modifier un cran re-rythme toute la famille (DS Studio pilotable). Les clamps fluides
 * bespoke ecrasent la hierarchie selon le viewport : INTERDITS sur les paddings
 * verticaux de section.
 *
 * Regles verifiees :
 *  R1 — `var(--spacing-section)` (token fluide supprime R4) = INTERDIT partout dans src/.
 *  R2 — Dans src/components/sections/*.astro : toute declaration padding/padding-block/
 *       padding-top/padding-bottom contenant un clamp(...) en px dont le MAX >= 72px
 *       = rythme vertical bespoke -> INTERDIT (consommer un cran --section-*).
 *       Exemptions :
 *        - clamp en `vh` (logique de fit viewport-height, ex. panneau sticky), pas du rythme ;
 *        - fichiers Hero* + mastheads listes (geometrie hero = vague R5, au-dessus du fold).
 *
 * Exit : 1 si >= 1 violation · 0 sinon · 2 si 0 fichier scanne.
 * Flag --report : liste toutes les occurrences conformes en plus des violations.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SECTIONS_DIR = join(ROOT, 'src/components/sections');
const REPORT = process.argv.includes('--report');

// Geometrie hero bespoke (above-fold) : consolidation prevue vague R5 (Hero 33 -> ~5 archetypes).
const HERO_EXEMPT = (name) =>
  /^Hero/.test(name) ||
  ['TunnelStepHero.astro', 'ListIndexSection.astro', 'TrustLegalSection.astro'].includes(name);

const MAX_BESPOKE_PX = 72; // au-dela : c'est un cran de section qui s'ignore

// ── R1 : var(--spacing-section) interdit dans tout src/ ──
const r1Hits = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(astro|css|ts|tsx|mdx)$/.test(entry)) {
      const src = readFileSync(p, 'utf8');
      let idx = src.indexOf('var(--spacing-section)');
      while (idx !== -1) {
        const line = src.slice(0, idx).split('\n').length;
        r1Hits.push(`${relative(ROOT, p)}:${line}`);
        idx = src.indexOf('var(--spacing-section)', idx + 1);
      }
    }
  }
}
walk(join(ROOT, 'src'));

// ── R2 : clamps verticaux bespoke dans sections/ ──
const files = readdirSync(SECTIONS_DIR).filter((f) => f.endsWith('.astro'));
if (files.length === 0) {
  console.error('ERREUR : 0 fichier .astro scanne dans ' + SECTIONS_DIR);
  process.exit(2);
}

const PAD_RE = /(?:^|;|\{)\s*(padding(?:-block|-top|-bottom)?)\s*:\s*([^;}]+)/g;
const CLAMP_RE = /clamp\(\s*[^,)]+,\s*([^,)]+),\s*([^)]+)\)/g;

const r2Hits = [];
let cranCount = 0;
for (const f of files) {
  const rel = `src/components/sections/${f}`;
  const src = readFileSync(join(SECTIONS_DIR, f), 'utf8');
  cranCount += (src.match(/var\(--section-(tight|base|loose|grand)\)/g) || []).length;
  if (HERO_EXEMPT(f)) continue;
  for (const m of src.matchAll(PAD_RE)) {
    const [, prop, value] = m;
    // padding-left/right ne matchent pas PAD_RE ; le shorthand `padding:` est verifie
    // valeur par valeur ci-dessous (seules les composantes VERTICALES comptent).
    let values = [value.trim()];
    if (prop === 'padding') {
      // split top-level par espaces (les virgules internes des clamp/var sont protegees)
      const parts = [];
      let depth = 0, cur = '';
      for (const ch of value.trim()) {
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        if (ch === ' ' && depth === 0) { if (cur) parts.push(cur); cur = ''; }
        else cur += ch;
      }
      if (cur) parts.push(cur);
      // composantes verticales du shorthand : 1 valeur -> [0] ; 2/3/4 valeurs -> [0] et [2] si presente
      values = parts.length <= 1 ? parts : parts.length === 2 ? [parts[0]] : [parts[0], parts[2]];
    }
    for (const v of values) {
      for (const cm of (v ?? '').matchAll(CLAMP_RE)) {
        const mid = cm[1];
        const max = cm[2].trim();
        if (/vh/.test(mid)) continue; // fit viewport-height, pas du rythme
        const px = max.match(/^(\d+(?:\.\d+)?)px$/);
        if (px && Number(px[1]) >= MAX_BESPOKE_PX) {
          const line = src.slice(0, m.index).split('\n').length;
          r2Hits.push(`${rel}:${line} -> ${prop}: ${v.trim()}`);
        }
      }
    }
  }
}

console.log('check-section-rhythm — famille --section-* (R4)');
console.log(`Sections scannees : ${files.length} · usages de crans --section-* : ${cranCount}`);
console.log(`\nR1 var(--spacing-section) (token supprime) : ${r1Hits.length}`);
r1Hits.slice(0, REPORT ? Infinity : 5).forEach((h) => console.log('  ⛔ ' + h));
console.log(`R2 clamps verticaux bespoke >= ${MAX_BESPOKE_PX}px (hors heros R5 / vh) : ${r2Hits.length}`);
r2Hits.slice(0, REPORT ? Infinity : 10).forEach((h) => console.log('  ⛔ ' + h));

const total = r1Hits.length + r2Hits.length;
if (total > 0) {
  console.log(`\n⛔ FAIL — ${total} violation(s). Substituer vers un cran var(--section-tight|base|loose|grand).`);
  process.exit(1);
}
console.log('\n✅ PASS — 0 rythme vertical hors famille --section-*.');
