#!/usr/bin/env node
/**
 * tokenize-literals.mjs — V8 codemod DS Waimia
 *
 * Remplace les littéraux CSS valant EXACTEMENT un token DS par var(--token).
 * PROPERTY-ANCHORED : ne remplace que la valeur dans la bonne propriété.
 * Byte-équivalent : 0 pixel changé.
 *
 * Usage :
 *   node scripts/tokenize-literals.mjs --dry   → compte sans écrire
 *   node scripts/tokenize-literals.mjs          → applique
 *
 * Idempotent : relancer = 0 remplacement.
 * Scoping : src/**\/*.css (intégral) + src/**\/*.astro (corps après frontmatter)
 * Exclusions : tokens.css, emails, LiquidHero.tsx, og.png.ts, *.ts, *.tsx, *.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../src');

// ── Fichiers exclus ──────────────────────────────────────────────────────────
const EXCLUDES = [
  /\/src\/styles\/tokens\.css$/,                        // définitions des tokens → ne pas toucher
  /\/src\/components\/emails\//,                         // emails HTML
  /\/src\/components\/motion\/LiquidHero\.tsx$/,         // canvas JS
  /\/src\/pages\/api\/og\.png\.ts$/,                    // OG image API
  /\.(ts|tsx|js|jsx)$/,                                 // JS/TS génériques
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

// ── MAPPINGS property-anchored ────────────────────────────────────────────────
//
// Format : { label, regexes: [ { rx, replacement } ] }
//
// Pour les propriétés CSS ancrees (font-size, line-height, etc.) :
//   rx capture (PROPERTY:\s*) suivi de la valeur, et remplace par $1var(--token).
//   Attention aux !important : la valeur peut être suivie de \s*!important
//   → on ancre AVANT !important ou fin de déclaration (; ou \n ou })
//
// Pour ms et cubic-bezier : remplacement global de la valeur exacte.
//   ms → toujours une durée, valeur littérale numérique.
//   cubic-bezier → la valeur exacte (espaces variables).
//
// ⚠ NE PAS matcher une valeur déjà dans var(...) — chaque regex vérifie
//   que la valeur n'est PAS précédée de "var(" ni suivie de ")" via lookahead.

// Helper : pour propriété anchored, build un regex
// propertyPattern : ex "font-size"
// valuePattern : ex "11px"  (littéral, sera échappé)
// tokenVar : ex "var(--text-eyebrow)"
//
// Stratégie : on match (property:\s*)(value)(?!\d)(le reste ok)
// puis remplace par $1tokenVar

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Pour une valeur numérique "14px" → assure \b autour (word-boundary ou lookahead pour 'px')
// Pour "1.5" → lookahead négatif sur digit/. pour éviter 1.55
// Pour "999px", "0.12em", etc. → idem

function buildPropertyAnchored(property, value, tokenVar) {
  const escapedProp = escapeRegex(property);
  const escapedVal = escapeRegex(value);

  // Lookahead négatif pour s'assurer qu'on ne matcher pas à l'intérieur de var(...)
  // On cherche la property suivie d'espaces puis la valeur exacte
  // puis une frontière (pas de chiffre/lettre de suite)
  // Cas : "font-size: 14px" → matcher "14px" mais pas "14pxrem"
  // Cas : "line-height: 1.1" → matcher mais pas "1.1" suivi de chiffre → lookahead négatif [0-9]

  // Détermine la frontière droite selon le type de valeur
  let rightBoundary;
  if (value.endsWith('px') || value.endsWith('em') || value.endsWith('ms')) {
    // px/em/ms : lookahead négatif sur alphanum (évite "14pxrem" ou "12px-something")
    rightBoundary = '(?![a-zA-Z0-9_-])';
  } else if (/^\d+\.\d+$/.test(value)) {
    // décimal pur (1.5, 0.96, etc.) : lookahead négatif sur [0-9.] pour éviter 1.55, 1.02→1.025
    rightBoundary = '(?![0-9.])';
  } else {
    rightBoundary = '(?![a-zA-Z0-9_-])';
  }

  // Ne pas matcher si déjà dans var(
  // On inclut un lookahead négatif sur le contexte qui précède : la valeur ne doit pas
  // être précédée d'un "var(" → on met (?<!var\() devant la valeur
  const rx = new RegExp(
    `(${escapedProp}:\\s*)(?!var\\()${escapedVal}${rightBoundary}`,
    'g'
  );
  return {
    rx,
    replacement: `$1${tokenVar}`,
  };
}

// Pour les durées en ms : remplacement global (ms = toujours une durée)
// Ne pas matcher si déjà dans var(
function buildDuration(value, tokenVar) {
  const escapedVal = escapeRegex(value); // ex "200ms"
  const rx = new RegExp(
    `(?<!var\\()\\b${escapedVal}\\b(?![a-zA-Z0-9_-])`,
    'g'
  );
  return {
    label: `duration ${value} → ${tokenVar}`,
    rx,
    replacement: tokenVar,
  };
}

// Pour les cubic-bezier : remplacement global de la valeur exacte
// On construit le regex tolérant aux espaces variables autour des virgules
function buildCubicBezier(a, b, c, d, tokenVar, labelSuffix = '') {
  // Valeurs flottantes → échapper le point
  const n = (x) => escapeRegex(String(x));
  // Tolérant aux espaces variables entre les valeurs, et aux éventuels .0 optionnels
  // On utilise \s* autour des virgules
  const rxStr = `cubic-bezier\\(\\s*${n(a)}\\s*,\\s*${n(b)}\\s*,\\s*${n(c)}\\s*,\\s*${n(d)}\\s*\\)`;
  const rx = new RegExp(rxStr, 'g');
  return {
    label: `cubic-bezier(${a},${b},${c},${d})${labelSuffix} → ${tokenVar}`,
    rx,
    replacement: tokenVar,
  };
}

// Construction de tous les mappings
const MAPPINGS = [];

// ── font-size ─────────────────────────────────────────────────────────────────
const fontSizes = [
  { value: '11px', token: 'var(--text-eyebrow)' },
  { value: '14px', token: 'var(--text-body-sm)' },
  { value: '10px', token: 'var(--text-mono-xs)' },
  { value: '17px', token: 'var(--text-body-md)' },
  // V9c — nouveaux crans à fort volume
  { value: '12px', token: 'var(--text-caption)' },
  { value: '13px', token: 'var(--text-ui)' },
  { value: '15px', token: 'var(--text-body-lead)' },
];
for (const { value, token } of fontSizes) {
  const { rx, replacement } = buildPropertyAnchored('font-size', value, token);
  MAPPINGS.push({ label: `font-size: ${value} → ${token}`, rx, replacement });
}

// ── line-height ───────────────────────────────────────────────────────────────
// ⚠ Exact uniquement : NE PAS toucher 1, 1.15, 1.55, 1.6 etc.
const lineHeights = [
  { value: '1.5',  token: 'var(--leading-body)' },
  { value: '0.96', token: 'var(--leading-h1)' },
  { value: '1.02', token: 'var(--leading-h2)' },
  { value: '1.1',  token: 'var(--leading-h3)' },
  // V9c — nouveaux crans à fort volume
  { value: '1.4',  token: 'var(--leading-lede)' },
  { value: '1.65', token: 'var(--leading-prose)' },
];
for (const { value, token } of lineHeights) {
  const { rx, replacement } = buildPropertyAnchored('line-height', value, token);
  MAPPINGS.push({ label: `line-height: ${value} → ${token}`, rx, replacement });
}

// ── letter-spacing ────────────────────────────────────────────────────────────
const letterSpacings = [
  { value: '0.12em',   token: 'var(--tracking-mono)' },
  { value: '-0.025em', token: 'var(--tracking-display)' },
  { value: '-0.005em', token: 'var(--tracking-body)' },
];
for (const { value, token } of letterSpacings) {
  const { rx, replacement } = buildPropertyAnchored('letter-spacing', value, token);
  MAPPINGS.push({ label: `letter-spacing: ${value} → ${token}`, rx, replacement });
}

// ── font-weight ───────────────────────────────────────────────────────────────
const fontWeights = [
  { value: '400', token: 'var(--fw-regular)' },
  { value: '500', token: 'var(--fw-medium)' },
  { value: '600', token: 'var(--fw-semibold)' },
];
for (const { value, token } of fontWeights) {
  const { rx, replacement } = buildPropertyAnchored('font-weight', value, token);
  MAPPINGS.push({ label: `font-weight: ${value} → ${token}`, rx, replacement });
}

// ── border-radius ─────────────────────────────────────────────────────────────
// ⚠ border-radius UNIQUEMENT, pas padding/gap
const borderRadii = [
  { value: '2px',   token: 'var(--radius-sm)' },
  { value: '8px',   token: 'var(--radius-md)' },
  { value: '12px',  token: 'var(--radius-lg)' },
  { value: '999px', token: 'var(--radius-pill)' },
  // V9c — nouveaux crans à fort volume
  // ⚠ '50%' : le % est échappé par escapeRegex → \% → pas de problème regex
  //   rightBoundary = '(?![a-zA-Z0-9_-])' convient (après % vient ; ou espace)
  //   '150%' ne matche PAS car buildPropertyAnchored ancre sur 'border-radius:\s*'
  //   et le lookahead (?![a-zA-Z0-9_-]) stoppe après % (le '1' de '150' est alphanum)
  //   → regex: /border-radius:\s*(?!var\()4px(?![a-zA-Z0-9_-])/g  (radius-xs)
  //   → regex: /border-radius:\s*(?!var\()50\%(?![a-zA-Z0-9_-])/g  (radius-full)
  { value: '4px',   token: 'var(--radius-xs)' },
  { value: '50%',   token: 'var(--radius-full)' },
];
for (const { value, token } of borderRadii) {
  const { rx, replacement } = buildPropertyAnchored('border-radius', value, token);
  MAPPINGS.push({ label: `border-radius: ${value} → ${token}`, rx, replacement });
}

// ── max-width ─────────────────────────────────────────────────────────────────
// ⚠️ FOOTGUN : ces mappings convertissent `max-width: 900px` → `var(--wrap-read)` SANS
// distinguer une déclaration d'une CONDITION @media. var() est INVALIDE dans une condition
// @media (spec CSS) → relancer cet auto-fixer re-casserait les 46 media queries responsive
// (cf check-token-purity.mjs qui, lui, skippe déjà les lignes @media). Ne PAS lancer sur
// les blocs @media sans ajouter d'abord un skip de ligne @media dans applyMappings().
const maxWidths = [
  { value: '720px',  token: 'var(--wrap-prose)' },
  { value: '900px',  token: 'var(--wrap-read)' },
  { value: '1120px', token: 'var(--wrap-tight)' },
  { value: '1440px', token: 'var(--wrap)' },
  { value: '1560px', token: 'var(--wrap-wide)' },
];
for (const { value, token } of maxWidths) {
  const { rx, replacement } = buildPropertyAnchored('max-width', value, token);
  MAPPINGS.push({ label: `max-width: ${value} → ${token}`, rx, replacement });
}

// ── Durées (ms) ───────────────────────────────────────────────────────────────
// ms = toujours une durée, remplacement global
const durations = [
  { value: '200ms',  token: 'var(--dur-fast)' },
  { value: '1100ms', token: 'var(--dur-reveal)' },
  { value: '1400ms', token: 'var(--dur-slow)' },
];
for (const { value, token } of durations) {
  MAPPINGS.push(buildDuration(value, token));
}

// ── cubic-bezier ──────────────────────────────────────────────────────────────
// Forme normalisée (0.22, 1, 0.36, 1) ET forme compacte (.22, 1, .36, 1)
// On construit les deux variantes pour chaque easing.
const cubicBeziers = [
  { a: '0.22', b: '1', c: '0.36', d: '1',  token: 'var(--ease)' },
  { a: '.22',  b: '1', c: '.36',  d: '1',  token: 'var(--ease)' },
  { a: '0.16', b: '1', c: '0.30', d: '1',  token: 'var(--ease-out)' },
  { a: '.16',  b: '1', c: '.30',  d: '1',  token: 'var(--ease-out)' },
  { a: '0.34', b: '1.56', c: '0.64', d: '1', token: 'var(--ease-spring)' },
  { a: '.34',  b: '1.56', c: '.64',  d: '1', token: 'var(--ease-spring)' },
];
for (const { a, b, c, d, token } of cubicBeziers) {
  MAPPINGS.push(buildCubicBezier(a, b, c, d, token));
}

// ── Compteurs ─────────────────────────────────────────────────────────────────
const counts = new Map(MAPPINGS.map(m => [m.label, 0]));
let totalFiles = 0;

// ── Appliquer tous les mappings sur une chaîne ────────────────────────────────
function applyMappings(text) {
  let result = text;
  for (const mapping of MAPPINGS) {
    result = result.replace(mapping.rx, (match, ...groups) => {
      // Incrémenter le compteur
      counts.set(mapping.label, (counts.get(mapping.label) || 0) + 1);
      // Reconstruction : le replacement peut contenir $1 (group de capture = propriété anchored)
      // On reconstruit manuellement pour éviter que le token lui-même soit interprété comme $N
      if (mapping.replacement.startsWith('$1') && groups.length > 0) {
        // groups[0] = le groupe de capture (ex "font-size: ")
        return groups[0] + mapping.replacement.slice(2);
      }
      return mapping.replacement;
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
    const newBody = applyMappings(body);
    transformed = frontmatter + newBody;
  } else {
    // .css → tout le contenu
    transformed = applyMappings(original);
  }

  if (transformed !== original) {
    totalFiles++;
    if (!DRY) {
      writeFileSync(fpath, transformed, 'utf8');
    }
  }
}

// ── Walk récursif (Node natif, pas de glob externe) ───────────────────────────
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

  const totalReplacements = [...counts.values()].reduce((a, b) => a + b, 0);

  console.log('\n── Résultats tokenize-literals.mjs ──────────────────────────────────');
  console.log(`Mode : ${DRY ? 'DRY-RUN (aucun fichier écrit)' : 'APPLY (fichiers modifiés)'}`);
  console.log(`Fichiers scannés : ${allFiles.length}`);
  console.log(`Fichiers touchés : ${totalFiles}`);
  console.log(`Total remplacements : ${totalReplacements}`);
  console.log('\nDétail par mapping :');
  for (const [label, count] of counts.entries()) {
    const bar = count > 0 ? '✓' : '·';
    console.log(`  ${bar} ${count.toString().padStart(4)}  ${label}`);
  }
  console.log('──────────────────────────────────────────────────────────────────────\n');
}

main();
