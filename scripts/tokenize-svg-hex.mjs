#!/usr/bin/env node
/**
 * tokenize-svg-hex.mjs — V9-SVG codemod DS Waimia
 *
 * Remplace les hex de marque hardcodés en attributs fill="/stroke=" de SVG inline
 * par var(--token). PROPERTY-ANCHORED : ne remplace que fill="…"/stroke="…".
 * Byte-équivalent : var() résout à la même valeur → 0 pixel change.
 *
 * Usage :
 *   node scripts/tokenize-svg-hex.mjs --dry   → compte sans écrire
 *   node scripts/tokenize-svg-hex.mjs          → applique
 *
 * Idempotent : relancer = 0 remplacement.
 * Scope : src/**\/*.astro (intégral — les SVG inline sont dans le corps du template).
 * Exclusions : tokens.css, emails, LiquidHero.tsx, og.png.ts, *.ts, *.tsx, *.js
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC  = join(ROOT, 'src');

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

// ── Mapping hex → token (casse insensible, attribut fill/stroke uniquement) ──
// Format : { label, rx, replacement }
// Les regex capturent (fill|stroke) en groupe $1 puis le hex (insensible à la casse).
// Remplacement : $1="var(--token)"
const MAPPINGS = [
  {
    label: '#0C0B09 → var(--ink)',
    rx: /\b(fill|stroke)="#0C0B09"/gi,
    replacement: '$1="var(--ink)"',
    expectedCount: 16,
  },
  {
    label: '#6B6560 → var(--muted)',
    rx: /\b(fill|stroke)="#6B6560"/gi,
    replacement: '$1="var(--muted)"',
    expectedCount: 6,
  },
  {
    label: '#C94F2E → var(--accent)',
    rx: /\b(fill|stroke)="#C94F2E"/gi,
    replacement: '$1="var(--accent)"',
    expectedCount: 8,
  },
  {
    label: '#EFE9DD → var(--paper-2)',
    rx: /\b(fill|stroke)="#EFE9DD"/gi,
    replacement: '$1="var(--paper-2)"',
    expectedCount: 6,
  },
];

// ── Compteurs ─────────────────────────────────────────────────────────────────
const counts = new Map(MAPPINGS.map(m => [m.label, 0]));
const touchedFiles = [];

// ── Appliquer les mappings sur le contenu complet du fichier ─────────────────
function applyMappings(text) {
  let result = text;
  for (const mapping of MAPPINGS) {
    result = result.replace(mapping.rx, (match, group1) => {
      counts.set(mapping.label, (counts.get(mapping.label) || 0) + 1);
      return mapping.replacement.replace('$1', group1);
    });
  }
  return result;
}

// ── Walk récursif (Node natif) ────────────────────────────────────────────────
function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, exts, files);
    } else if (exts.includes(extname(full))) {
      files.push(full);
    }
  }
  return files;
}

// ── Main ───────────────────────────────────────────────────────────────────────
function main() {
  const allFiles = walk(SRC, ['.astro']).filter(f => !isExcluded(f));

  for (const fpath of allFiles) {
    const original = readFileSync(fpath, 'utf8');
    // Les SVG inline sont dans le corps du template (.astro) — pas besoin de splitter
    // le frontmatter : les fill/stroke n'y figurent jamais.
    const transformed = applyMappings(original);

    if (transformed !== original) {
      touchedFiles.push(relative(ROOT, fpath));
      if (!DRY) {
        writeFileSync(fpath, transformed, 'utf8');
      }
    }
  }

  const totalReplacements = [...counts.values()].reduce((a, b) => a + b, 0);

  console.log('\n── Résultats tokenize-svg-hex.mjs (V9-SVG) ─────────────────────────────');
  console.log(`Mode : ${DRY ? 'DRY-RUN (aucun fichier écrit)' : 'APPLY (fichiers modifiés)'}`);
  console.log(`Fichiers .astro scannés : ${allFiles.length}`);
  console.log(`Fichiers touchés        : ${touchedFiles.length}`);
  console.log(`Total remplacements     : ${totalReplacements}`);
  console.log('\nDétail par token :');

  let allMatch = true;
  for (const mapping of MAPPINGS) {
    const count = counts.get(mapping.label) || 0;
    const ok = count === mapping.expectedCount ? '✓' : '✗';
    if (count !== mapping.expectedCount) allMatch = false;
    console.log(`  ${ok} ${count.toString().padStart(4)} / ${mapping.expectedCount} attendu  ${mapping.label}`);
  }

  console.log('\nFichiers modifiés :');
  for (const f of touchedFiles) {
    console.log(`  · ${f}`);
  }

  if (!allMatch || totalReplacements !== 36 || touchedFiles.length !== 6) {
    console.log('\n⚠ ATTENTION : les compteurs ne correspondent pas aux attentes !');
    console.log(`  Attendu : total=36, fichiers=6`);
    console.log(`  Obtenu  : total=${totalReplacements}, fichiers=${touchedFiles.length}`);
    process.exit(1);
  }

  console.log('\n✅ Compteurs validés : 36 remplacements, 6 fichiers touchés.');
  console.log('──────────────────────────────────────────────────────────────────────\n');
}

main();
