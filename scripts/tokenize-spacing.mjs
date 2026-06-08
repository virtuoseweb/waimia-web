#!/usr/bin/env node
/**
 * tokenize-spacing.mjs — V9b codemod DS Waimia
 *
 * Remplace les littéraux px d'espacement EXACTEMENT égaux à un token --space-N
 * par var(--space-N). Property-ANCHORED + shorthand-aware.
 * Byte-équivalent : 0 pixel changé (var() résout à la même valeur).
 *
 * Usage :
 *   node scripts/tokenize-spacing.mjs --dry   → compte sans écrire
 *   node scripts/tokenize-spacing.mjs          → applique
 *
 * Idempotent : relancer = 0 remplacement.
 * Scoping : src/**\/*.css (intégral) + src/**\/*.astro (corps après frontmatter)
 * Exclusions : tokens.css, emails, LiquidHero.tsx, og.png.ts, *.ts, *.tsx, *.js, *.jsx
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../src');

// ── Fichiers exclus ──────────────────────────────────────────────────────────
const EXCLUDES = [
  /\/src\/styles\/tokens\.css$/,
  /\/src\/components\/emails\//,
  /\/src\/components\/motion\/LiquidHero\.tsx$/,
  /\/src\/pages\/api\/og\.png\.ts$/,
  /\.(ts|tsx|js|jsx)$/,
];

function isExcluded(fpath) {
  return EXCLUDES.some(rx => rx.test(fpath));
}

// ── Isoler le corps d'un fichier .astro (après 2ème `---`) ────────────────────
function splitAstro(content) {
  if (!content.startsWith('---')) {
    return { frontmatter: '', body: content };
  }
  const idx = content.indexOf('---', 3);
  if (idx === -1) {
    return { frontmatter: '', body: content };
  }
  const end = idx + 3;
  return {
    frontmatter: content.slice(0, end),
    body: content.slice(end),
  };
}

// ── Map px → token --space-N ──────────────────────────────────────────────────
const SPACE_MAP = new Map([
  ['4px',   'var(--space-1)'],
  ['8px',   'var(--space-2)'],
  ['12px',  'var(--space-3)'],
  ['16px',  'var(--space-4)'],
  ['24px',  'var(--space-5)'],
  ['32px',  'var(--space-6)'],
  ['40px',  'var(--space-7)'],
  ['48px',  'var(--space-8)'],
  ['64px',  'var(--space-9)'],
  ['80px',  'var(--space-10)'],
  ['96px',  'var(--space-11)'],
  ['120px', 'var(--space-12)'],
  ['160px', 'var(--space-13)'],
  ['200px', 'var(--space-14)'],
  ['256px', 'var(--space-15)'],
]);

// ── Propriétés d'espacement ancrées (liste FERMÉE) ───────────────────────────
// Chaque prop est un nom exact ; le regex boundary interdit -<prop> (ex: row-gap ≠ gap).
const SPACING_PROPS = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-inline',
  'padding-block',
  'padding-inline-start',
  'padding-inline-end',
  'padding-block-start',
  'padding-block-end',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-inline',
  'margin-block',
  'margin-inline-start',
  'margin-inline-end',
  'margin-block-start',
  'margin-block-end',
  'gap',
  'row-gap',
  'column-gap',
];

// ── Regex de détection d'une prop d'espacement ────────────────────────────────
//
// Stratégie :
//   (boundary)(prop)(\s*:\s*)(valeur jusqu'à ; } \n)(\s*!important)?
//
// boundary = début de ligne | { | ; | whitespace | >
//   → JAMAIS - ni alphanum (évite -padding, row-gap matchant gap, etc.)
//
// La valeur est tout ce qui précède ; } \n !important (lazy).
// On splitte ensuite le groupe valeur en tokens séparés par espaces
// et on remplace token-par-token via SPACE_MAP.
//
// On utilise un seul regex global qui capture (boundary)(prop)(\s*:\s*)(valeur)(\s*!important)?
// suivi de lookahead [;}\n] sans les consommer.

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build le regex pour une prop donnée.
// Boundary : (?:^|(?<=[{;\s>])) pour s'assurer qu'avant le nom de prop
// il n'y a pas de '-' ni alphanum.
// En JS les lookbehind variables-length sont supportés ES2018+.
// On utilise (?:^|(?<=[{;\s>])) pour ancrer côté gauche.
function buildPropRegex(prop) {
  const escaped = escapeRegex(prop);
  // Lookbehind : le car avant le nom de prop doit être début-de-ligne, {, ;, espace ou >
  // Lookahead à droite du nom de prop : immédiatement \s*: (pas de - ni alphanum intercalé)
  // Capture :
  //   group 1 = tout avant la valeur = (boundary_char_already_consumed_by_lookbehind + prop + \s*:\s*)
  //   group 2 = valeur brute (jusqu'à ; } \n ou !important)
  //   group 3 = \s*!important (optionnel)
  //   group 4 = terminateur [;}\n] (lookahead, non consommé)
  //
  // ⚠ Pour gap vs row-gap/column-gap : la boundary gauche + le fait qu'on cherche
  //   exactement le nom de prop suivi de \s*: suffit à les discriminer
  //   (gap: ≠ row-gap: car le lookbehind n'accepte pas '-').
  return new RegExp(
    `(?:^|(?<=[{;\\s>]))(${escaped})(\\s*:\\s*)` +
    `((?:(?!;|}|\\n|!important).)*?)` +
    `(\\s*!important)?(?=[;}\n])`,
    'gm'
  );
}

// ── Remplacer les tokens dans une valeur shorthand ────────────────────────────
// Splitte sur les espaces, remplace chaque token si c'est exactement un px on-grid,
// réassemble en préservant les espaces d'origine.
function replaceValueTokens(raw, counts) {
  // On préserve les séparateurs (espaces) en splitant ET en capturant les séparateurs.
  // Astuce : split sur regex avec groupe capturant = les séparateurs restent dans le tableau.
  const parts = raw.split(/(\s+)/);
  let changed = false;
  const result = parts.map(part => {
    // Ne toucher que les tokens qui sont EXACTEMENT <n>px sans préfixe/suffixe.
    // Un token déjà sous forme var(...) ne matcher pas (ne finit pas par 'px').
    // Un négatif comme -8px ne matcher pas (commence par -).
    if (SPACE_MAP.has(part)) {
      // Double-check : le token ne doit pas déjà être var() (impossible si SPACE_MAP.has(part),
      // mais sécurité supplémentaire).
      const replacement = SPACE_MAP.get(part);
      // Incrémenter compteur (propriété + valeur d'origine)
      const key = part;
      counts.set(key, (counts.get(key) || 0) + 1);
      changed = true;
      return replacement;
    }
    return part;
  });
  return { value: result.join(''), changed };
}

// ── Compteurs ─────────────────────────────────────────────────────────────────
// Compteur par (prop, px-value) et compteur total
const countsByPropVal = new Map(); // key: "prop|px" → { prop, px, count }
let totalReplacements = 0;
let totalFiles = 0;

function recordReplacement(prop, pxValue) {
  const key = `${prop}|${pxValue}`;
  if (!countsByPropVal.has(key)) {
    countsByPropVal.set(key, { prop, px: pxValue, count: 0 });
  }
  countsByPropVal.get(key).count++;
  totalReplacements++;
}

// ── Construire tous les regexes une fois ─────────────────────────────────────
const PROP_REGEXES = SPACING_PROPS.map(prop => ({
  prop,
  rx: buildPropRegex(prop),
}));

// ── Appliquer les remplacements sur une chaîne ────────────────────────────────
function applySpacingTokens(text) {
  let result = text;

  for (const { prop, rx } of PROP_REGEXES) {
    result = result.replace(rx, (match, propName, colon, rawValue, important, offset, str) => {
      // rawValue = la valeur brute entre "prop:" et le terminateur
      // On trace les px remplacés pour les compteurs
      const localCounts = new Map();
      const { value: newValue, changed } = replaceValueTokens(rawValue, localCounts);

      if (!changed) return match;

      // Enregistrer dans les compteurs globaux
      for (const [px, cnt] of localCounts.entries()) {
        for (let i = 0; i < cnt; i++) {
          recordReplacement(propName, px);
        }
      }

      const imp = important || '';
      return propName + colon + newValue + imp;
    });
  }

  return result;
}

// ── Traitement d'un fichier ────────────────────────────────────────────────────
function processFile(fpath) {
  if (isExcluded(fpath)) return;

  const original = readFileSync(fpath, 'utf8');
  const ext = extname(fpath);

  let transformed;

  if (ext === '.astro') {
    const { frontmatter, body } = splitAstro(original);
    const newBody = applySpacingTokens(body);
    transformed = frontmatter + newBody;
  } else {
    transformed = applySpacingTokens(original);
  }

  if (transformed !== original) {
    totalFiles++;
    if (!DRY) {
      writeFileSync(fpath, transformed, 'utf8');
    }
  }
}

// ── Walk récursif (Node natif) ────────────────────────────────────────────────
function walk(dir, extensions, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, extensions, files);
    } else if (extensions.includes(extname(full))) {
      files.push(full);
    }
  }
  return files;
}

// ── Main ───────────────────────────────────────────────────────────────────────
function main() {
  const allFiles = walk(ROOT, ['.css', '.astro']);

  for (const fpath of allFiles) {
    processFile(fpath);
  }

  // Trier par count desc pour le rapport
  const sorted = [...countsByPropVal.values()].sort((a, b) => b.count - a.count);

  console.log('\n── Résultats tokenize-spacing.mjs ───────────────────────────────────');
  console.log(`Mode : ${DRY ? 'DRY-RUN (aucun fichier écrit)' : 'APPLY (fichiers modifiés)'}`);
  console.log(`Fichiers scannés : ${allFiles.length}`);
  console.log(`Fichiers touchés : ${totalFiles}`);
  console.log(`Total remplacements : ${totalReplacements}`);

  if (sorted.length > 0) {
    console.log('\nDétail par (propriété, valeur) — trié par count desc :');
    for (const { prop, px, count } of sorted) {
      const bar = count > 0 ? '✓' : '·';
      const token = SPACE_MAP.get(px) || px;
      console.log(`  ${bar} ${count.toString().padStart(4)}  ${prop}: ${px} → ${token}`);
    }
  }

  console.log('─────────────────────────────────────────────────────────────────────\n');
}

main();
