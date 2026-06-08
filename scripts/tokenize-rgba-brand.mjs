#!/usr/bin/env node
/**
 * tokenize-rgba-brand.mjs — V9-RGBA codemod DS Waimia
 *
 * Tokenise les rgba() de marque EXACTE vers les tokens canaux → repaintabilité.
 * Byte-équivalent : var(--paper-rgb) résout à "246, 241, 232" (triplet du même token).
 *
 *   rgba(246,241,232,X) → rgba(var(--paper-rgb),X)
 *   rgba(201,79,46,X)   → rgba(var(--accent-rgb),X)
 *   rgba(12,11,9,X)     → rgba(var(--ink-rgb),X)
 *
 * Scope : src/**\/*.astro + src/**\/*.css (CONTENU COMPLET, frontmatter inclus).
 * Exclusions : tokens.css, emails/, LiquidHero.tsx, og.png.ts.
 * Idempotent : relancer = 0 remplacement.
 *
 * Usage :
 *   node scripts/tokenize-rgba-brand.mjs --dry   → compte sans écrire
 *   node scripts/tokenize-rgba-brand.mjs          → applique
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC  = join(ROOT, 'src');

// ── Exclusions (miroir de check-token-purity.mjs §V8) ──────────────────────
const EXCLUDES = [
  /\/src\/styles\/tokens\.css$/,
  /\/src\/components\/emails\//,
  /\/src\/components\/motion\/LiquidHero\.tsx$/,
  /\/src\/pages\/api\/og\.png\.ts$/,
];
function isExcluded(p) { return EXCLUDES.some(rx => rx.test(p)); }

// ── Walk récursif ──────────────────────────────────────────────────────────
function walk(dir, exts, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, acc);
    else if (exts.includes(extname(full)) && !isExcluded(full)) acc.push(full);
  }
  return acc;
}

const files = walk(SRC, ['.astro', '.css']);

if (files.length === 0) {
  console.error('ERREUR : 0 fichier scanné — chemin ou exclusions incorrects.');
  process.exit(2);
}

// ── Patterns de remplacement (préfixe triplet uniquement) ──────────────────
// Ne matche que `rgba(R,G,B,` (virgule finale) → préserve l'alpha X) intact.
const REPLACEMENTS = [
  {
    re: /rgba\(\s*246\s*,\s*241\s*,\s*232\s*,/g,
    replacement: 'rgba(var(--paper-rgb),',
    token: '--paper-rgb',
    label: 'paper',
  },
  {
    re: /rgba\(\s*201\s*,\s*79\s*,\s*46\s*,/g,
    replacement: 'rgba(var(--accent-rgb),',
    token: '--accent-rgb',
    label: 'accent',
  },
  {
    re: /rgba\(\s*12\s*,\s*11\s*,\s*9\s*,/g,
    replacement: 'rgba(var(--ink-rgb),',
    token: '--ink-rgb',
    label: 'ink',
  },
];

// ── Compteurs ───────────────────────────────────────────────────────────────
const counts = { paper: 0, accent: 0, ink: 0 };
let totalFiles = 0;
const touchedFiles = [];

// ── Traitement ───────────────────────────────────────────────────────────────
for (const fpath of files) {
  const original = readFileSync(fpath, 'utf8');
  let result = original;

  for (const { re, replacement, label } of REPLACEMENTS) {
    // Réinitialise lastIndex (sécurité regex globale réutilisée par itération)
    re.lastIndex = 0;
    const before = result;
    result = result.replace(re, () => {
      counts[label]++;
      return replacement;
    });
  }

  if (result !== original) {
    totalFiles++;
    touchedFiles.push(relative(ROOT, fpath));
    if (!DRY) {
      writeFileSync(fpath, result, 'utf8');
    }
  }
}

const total = counts.paper + counts.accent + counts.ink;

console.log('');
console.log('🎨 tokenize-rgba-brand.mjs — V9-RGBA' + (DRY ? ' [DRY RUN]' : ''));
console.log('');
console.log(`   rgba(paper)  246,241,232 → var(--paper-rgb) : ${counts.paper} occurrence(s)`);
console.log(`   rgba(accent) 201,79,46   → var(--accent-rgb): ${counts.accent} occurrence(s)`);
console.log(`   rgba(ink)    12,11,9     → var(--ink-rgb)   : ${counts.ink} occurrence(s)`);
console.log(`   ─────────────────────────────────────────────`);
console.log(`   Total                                        : ${total} occurrence(s)`);
console.log(`   Fichiers touchés                             : ${totalFiles}`);
if (touchedFiles.length) {
  touchedFiles.forEach(f => console.log(`     • ${f}`));
}
console.log('');

if (DRY) {
  console.log('→ Mode --dry : aucun fichier écrit.');
} else if (total > 0) {
  console.log('→ Fichiers mis à jour.');
} else {
  console.log('→ Idempotent : 0 remplacement (déjà tokenisé ?).');
}
console.log('');
