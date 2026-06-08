#!/usr/bin/env node
/**
 * snap-halfpixel-fontsize.mjs — V9d codemod DS Waimia
 *
 * Élimine la dérive demi-pixel sur font-size en snappant chaque demi-pixel
 * vers le cran token entier le plus proche (arrondi vers le BAS, conservateur).
 * Sub-pixel imperceptible (-0.5px). NON byte-équivalent.
 *
 * Mapping (font-size UNIQUEMENT, valeur directe — PAS dans clamp/calc) :
 *   10.5px → var(--text-mono-xs)   (10px)
 *   11.5px → var(--text-eyebrow)   (11px)
 *   12.5px → var(--text-caption)   (12px)
 *   13.5px → var(--text-ui)        (13px)
 *   14.5px → var(--text-body-sm)   (14px)
 *   15.5px → var(--text-body-lead) (15px)
 *
 * LAISSÉS INTACTS :
 *   - 8.5px, 9.5px (outliers, pas de token proche)
 *   - tout demi-pixel dans clamp(...)/calc(...) (exclusion gratuite via regex anchored)
 *   - tout demi-pixel sur border/height/autre propriété (hors font-size)
 *
 * Usage :
 *   node scripts/snap-halfpixel-fontsize.mjs --dry   → compte sans écrire
 *   node scripts/snap-halfpixel-fontsize.mjs          → applique
 *
 * Idempotent : relancer = 0 remplacement.
 * Scope : src/**\/*.css (intégral) + src/**\/*.astro (corps après frontmatter)
 * Exclusions : tokens.css, emails/, LiquidHero.tsx, og.png.ts, *.ts, *.tsx, *.js
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC  = join(ROOT, 'src');

// ── Fichiers exclus (même liste que V8) ──────────────────────────────────────
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

// ── Séparer frontmatter .astro ────────────────────────────────────────────────
function splitAstro(content) {
  if (!content.startsWith('---')) return { frontmatter: '', body: content };
  const idx = content.indexOf('---', 3);
  if (idx === -1)             return { frontmatter: '', body: content };
  const end = idx + 3;
  return { frontmatter: content.slice(0, end), body: content.slice(end) };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── Réutilise buildPropertyAnchored de tokenize-literals.mjs ─────────────────
// Pattern : (font-size:\s*)(?!var\()VALUE(?![a-zA-Z0-9_-])
// → "font-size: clamp(10.5px,…)" NE matche PAS car après "font-size: " vient "clamp"
//   et non la valeur numérique directement (exclusion clamp gratuite).
function buildPropertyAnchored(property, value, tokenVar) {
  const escapedProp = escapeRegex(property);
  const escapedVal  = escapeRegex(value);
  // px → boundary alphanum
  const rightBoundary = '(?![a-zA-Z0-9_-])';
  const rx = new RegExp(
    `(${escapedProp}:\\s*)(?!var\\()${escapedVal}${rightBoundary}`,
    'g'
  );
  return { rx, replacement: `$1${tokenVar}` };
}

// ── Table des mappings V9d ────────────────────────────────────────────────────
// Outliers 8.5px / 9.5px : PAS de mapping (préservés).
const HALF_PIXEL_MAPPINGS = [
  { value: '10.5px', token: 'var(--text-mono-xs)' },   // → 10px
  { value: '11.5px', token: 'var(--text-eyebrow)' },   // → 11px
  { value: '12.5px', token: 'var(--text-caption)' },   // → 12px
  { value: '13.5px', token: 'var(--text-ui)' },        // → 13px
  { value: '14.5px', token: 'var(--text-body-sm)' },   // → 14px
  { value: '15.5px', token: 'var(--text-body-lead)' }, // → 15px
];

const MAPPINGS = HALF_PIXEL_MAPPINGS.map(({ value, token }) => ({
  label: `font-size: ${value} → ${token}`,
  ...buildPropertyAnchored('font-size', value, token),
}));

// ── Compteurs ─────────────────────────────────────────────────────────────────
const counts   = new Map(MAPPINGS.map(m => [m.label, 0]));
let totalFiles = 0;

// ── Appliquer tous les mappings sur une chaîne ────────────────────────────────
function applyMappings(text) {
  let result = text;
  for (const mapping of MAPPINGS) {
    result = result.replace(mapping.rx, (match, ...groups) => {
      counts.set(mapping.label, (counts.get(mapping.label) || 0) + 1);
      // groups[0] = groupe de capture "font-size: "
      if (mapping.replacement.startsWith('$1') && groups.length > 0) {
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
  const ext      = extname(fpath);
  let transformed;

  if (ext === '.astro') {
    const { frontmatter, body } = splitAstro(original);
    transformed = frontmatter + applyMappings(body);
  } else {
    transformed = applyMappings(original);
  }

  if (transformed !== original) {
    totalFiles++;
    if (!DRY) writeFileSync(fpath, transformed, 'utf8');
  }
}

// ── Walk récursif ──────────────────────────────────────────────────────────────
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
  const allFiles = walk(SRC, ['.css', '.astro']);

  for (const fpath of allFiles) {
    processFile(fpath);
  }

  const totalReplacements = [...counts.values()].reduce((a, b) => a + b, 0);

  console.log('\n── Résultats snap-halfpixel-fontsize.mjs (V9d) ─────────────────────────');
  console.log(`Mode : ${DRY ? 'DRY-RUN (aucun fichier écrit)' : 'APPLY (fichiers modifiés)'}`);
  console.log(`Fichiers scannés : ${allFiles.length}`);
  console.log(`Fichiers touchés : ${totalFiles}`);
  console.log(`Total remplacements : ${totalReplacements}`);
  console.log('\nDétail par mapping (demi-pixel snapé → token) :');
  for (const [label, count] of counts.entries()) {
    const bar = count > 0 ? '✓' : '·';
    console.log(`  ${bar} ${count.toString().padStart(4)}  ${label}`);
  }
  console.log('\nLaissés intacts : 8.5px, 9.5px (outliers, 0 token proche) + clamp()/calc() demi-pixels');
  console.log('──────────────────────────────────────────────────────────────────────────\n');

  if (DRY && totalReplacements === 0) {
    process.exit(0); // idempotence OK (ou aucun hit)
  }
}

main();
