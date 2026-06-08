#!/usr/bin/env node
/**
 * check-token-purity.mjs — Gate « pureté du design system » (token-driven).
 *
 * Pourquoi : le DS Waimia doit rester pilotable par un futur générateur (composants
 * IA + outil d'identité qui swappe les VALEURS des tokens). Pour repeindre la marque
 * « sans conflit », les composants doivent consommer des TOKENS, jamais hardcoder une
 * couleur de marque.
 *
 *  - hex brut  = INTERDIT (#rgb/#rrggbb/#rrggbbaa). Le DS est token-driven → exit 1.
 *  - rgba de marque (accent #c94f2e=201,79,46 / paper #f6f1e8=246,241,232) = DETTE
 *    non-bloquante : à migrer vers des tokens canaux (--accent-rgb / color-mix) pour que
 *    l'outil identité repeigne sans conflit. Listée, n'incrémente PAS le total bloquant.
 *  - rgba neutre (0,0,0,* / 255,255,255,*) = OK, indépendant de la marque.
 *
 * Scan : blocs <style> ET attributs style="..." inline de src/components/sections/*.astro.
 * Ignore : url(#…) (refs SVG), currentColor, et le contenu des commentaires CSS.
 *
 * Exit : 1 si ≥1 hex brut · 0 sinon · 2 si 0 fichier scanné (parse cassé, jamais faux négatif silencieux).
 * Flag --report : liste toutes les occurrences (défaut = résumé + 3 exemples).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SECTIONS_DIR = join(ROOT, 'src/components/sections');
const REPORT = process.argv.includes('--report');

const ACCENT = [201, 79, 46]; // #c94f2e
const PAPER = [246, 241, 232]; // #f6f1e8
const TOL = 2; // ±2 par canal (arrondis)

const near = (rgb, ref) => rgb.every((c, i) => Math.abs(c - ref[i]) <= TOL);
const isNeutral = (rgb) =>
  (rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0) ||
  (rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255);

// Retire le contenu des commentaires CSS /* ... */ (en préservant les retours ligne pour garder les n° de ligne).
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

// Concatène tous les blocs <style>…</style> + les attributs style="…", commentaires neutralisés.
function extractColorSurface(raw) {
  const clean = stripComments(raw);
  let surface = clean.replace(/[^\n]/g, ' '); // canevas vide, lignes préservées
  const splice = (start, end) => {
    surface = surface.slice(0, start) + clean.slice(start, end) + surface.slice(end);
  };
  for (const m of clean.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    splice(m.index + m[0].indexOf(m[1]), m.index + m[0].indexOf(m[1]) + m[1].length);
  }
  for (const m of clean.matchAll(/\bstyle\s*=\s*"([^"]*)"/gi)) {
    splice(m.index + m[0].indexOf(m[1]), m.index + m[0].indexOf(m[1]) + m[1].length);
  }
  return surface;
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

const files = readdirSync(SECTIONS_DIR).filter((f) => f.endsWith('.astro'));
if (files.length === 0) {
  console.error('ERREUR : 0 fichier .astro scanné dans ' + SECTIONS_DIR + ' (parse cassé ?)');
  process.exit(2);
}

const hexHits = []; // bloquant
const brandHits = []; // dette non-bloquante
let neutralCount = 0;
const neutralHits = [];

const HEX_RE = /(?<![\w&])#[0-9a-fA-F]{3,8}\b/g;
const RGB_RE = /rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,[^)]*)?\)/gi;

for (const f of files) {
  const rel = relative(ROOT, join(SECTIONS_DIR, f));
  const surface = extractColorSurface(readFileSync(join(SECTIONS_DIR, f), 'utf8'));

  for (const m of surface.matchAll(HEX_RE)) {
    const hex = m[0];
    // 3/4/6/8 chiffres = couleur hex ; longueurs 5/7 = non-couleur (ex: id), on ignore.
    if (![3, 4, 6, 8].includes(hex.length - 1)) continue;
    hexHits.push({ file: rel, line: lineOf(surface, m.index), value: hex });
  }

  for (const m of surface.matchAll(RGB_RE)) {
    const rgb = [+m[1], +m[2], +m[3]];
    if (isNeutral(rgb)) {
      neutralCount++;
      neutralHits.push({ file: rel, line: lineOf(surface, m.index), value: m[0].replace(/\s+/g, '') });
      continue;
    }
    if (near(rgb, ACCENT) || near(rgb, PAPER)) {
      brandHits.push({
        file: rel,
        line: lineOf(surface, m.index),
        value: m[0].replace(/\s+/g, ''),
        token: near(rgb, ACCENT) ? 'accent' : 'paper',
      });
    }
    // autres rgba (ex: teinte accent assombrie 181,71,42) = ni marque canonique ni neutre → non comptés.
  }
}

const show = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmt = (h) => `    ${h.file}:${h.line}  ${h.value}${h.token ? ' [' + h.token + ']' : ''}`;

console.log(`\n🎨 Token purity — ${files.length} fichiers sections/*.astro scannés\n`);

console.log(`✗ Hex bruts (BLOQUANT, interdit — DS token-driven) : ${hexHits.length}`);
if (hexHits.length) show(hexHits).forEach((h) => console.log(fmt(h)));
if (!REPORT && hexHits.length > 3) console.log(`    … +${hexHits.length - 3} (voir --report)`);

console.log(`\n⚠ rgba de marque à tokeniser (prérequis outil identité, NON-BLOQUANT) : ${brandHits.length} occurrence(s)`);
if (brandHits.length) show(brandHits).forEach((h) => console.log(fmt(h)));
if (!REPORT && brandHits.length > 3) console.log(`    … +${brandHits.length - 3} (voir --report)`);

console.log(`\nℹ rgba neutre (0,0,0 / 255,255,255 — OK, indépendant marque) : ${neutralCount}`);
if (REPORT && neutralHits.length) neutralHits.forEach((h) => console.log(fmt(h)));

if (hexHits.length > 0) {
  console.log(`\n❌ FAIL — ${hexHits.length} hex brut(s). Migre vers var(--token) / color-mix.\n`);
  process.exit(1);
}
console.log(`\n✅ PASS — 0 hex brut. (${brandHits.length} rgba de marque = dette à tokeniser, non-bloquante.)\n`);
process.exit(0);
