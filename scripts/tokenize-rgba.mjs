#!/usr/bin/env node
/**
 * tokenize-rgba.mjs — V5 codemod DS Waimia
 *
 * Remplace les rgba() bruts de marque par rgba(var(--X-rgb), α)
 * dans les fichiers .css (intégralement) et .astro (corps après frontmatter uniquement).
 *
 * Usage :
 *   node scripts/tokenize-rgba.mjs --dry   → compte sans écrire
 *   node scripts/tokenize-rgba.mjs          → applique
 *
 * Idempotent : relancer = 0 remplacement.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY = process.argv.includes('--dry');
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../src');

// ── Fichiers exclus ──────────────────────────────────────────────────────────
const EXCLUDES = [
  /\/src\/styles\/tokens\.css$/,                        // définition des channels → ne pas toucher
  /\/src\/components\/emails\//,                         // emails HTML
  /\/src\/components\/motion\/LiquidHero\.tsx$/,         // canvas JS
  /\/src\/pages\/api\/og\.png\.ts$/,                    // OG image API
  /\.(ts|tsx|js|jsx)$/,                                  // JS/TS génériques
];

function isExcluded(fpath) {
  return EXCLUDES.some(rx => rx.test(fpath));
}

// ── 6 mappings ────────────────────────────────────────────────────────────────
const MAPPINGS = [
  {
    label: 'ink (12,11,9) → --ink-rgb',
    r: 12, g: 11, b: 9,
    channel: '--ink-rgb',
  },
  {
    label: 'paper (246,241,232) → --paper-rgb',
    r: 246, g: 241, b: 232,
    channel: '--paper-rgb',
  },
  {
    label: 'accent (201,79,46) → --accent-rgb',
    r: 201, g: 79, b: 46,
    channel: '--accent-rgb',
  },
  {
    label: 'noir (0,0,0) → --ink-rgb [FIX]',
    r: 0, g: 0, b: 0,
    channel: '--ink-rgb',
  },
  {
    label: 'terracotta bâtard (181,71,42) → --accent-rgb [FIX]',
    r: 181, g: 71, b: 42,
    channel: '--accent-rgb',
  },
  {
    label: 'blanc (255,255,255,0.15) → rgba(var(--ink-rgb),0.18) [FIX polarité dark]',
    r: 255, g: 255, b: 255,
    channel: '--ink-rgb',
    alphaFix: { from: '0.15', to: '0.18' }, // uniquement cet alpha précis
  },
];

// ── Regex builder ─────────────────────────────────────────────────────────────
function buildRegex(r, g, b) {
  return new RegExp(
    `rgba\\(\\s*${r}\\s*,\\s*${g}\\s*,\\s*${b}\\s*,\\s*([^)]+?)\\s*\\)`,
    'g'
  );
}

// ── Compteurs ─────────────────────────────────────────────────────────────────
const counts = Object.fromEntries(MAPPINGS.map(m => [m.label, 0]));
let totalFiles = 0;

// ── Isoler le corps d'un fichier .astro (après 2ème `---`) ────────────────────
function splitAstro(content) {
  if (!content.startsWith('---')) {
    return { frontmatter: '', body: content };
  }
  // Chercher la 2ème occurrence de `---` (pos > 3)
  const idx = content.indexOf('---', 3);
  if (idx === -1) {
    return { frontmatter: '', body: content };
  }
  const end = idx + 3; // inclus la 2ème `---`
  return {
    frontmatter: content.slice(0, end),
    body: content.slice(end),
  };
}

// ── Appliquer les 6 mappings sur une chaîne ────────────────────────────────────
function applyMappings(text) {
  let result = text;
  for (const mapping of MAPPINGS) {
    const rx = buildRegex(mapping.r, mapping.g, mapping.b);
    result = result.replace(rx, (match, alpha) => {
      let finalAlpha = alpha.trim();

      // Cas spécial : blanc 255,255,255 → uniquement si alpha === 0.15
      if (mapping.alphaFix) {
        if (finalAlpha !== mapping.alphaFix.from) {
          // Alpha différent : ne pas transformer
          return match;
        }
        finalAlpha = mapping.alphaFix.to;
      }

      counts[mapping.label]++;
      return `rgba(var(${mapping.channel}), ${finalAlpha})`;
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

  const totalReplacements = Object.values(counts).reduce((a, b) => a + b, 0);

  console.log('\n── Résultats tokenize-rgba.mjs ──────────────────────────────────');
  console.log(`Mode : ${DRY ? 'DRY-RUN (aucun fichier écrit)' : 'APPLY (fichiers modifiés)'}`);
  console.log(`Fichiers scannés : ${allFiles.length}`);
  console.log(`Fichiers touchés : ${totalFiles}`);
  console.log(`Total remplacements : ${totalReplacements}`);
  console.log('\nDétail par mapping :');
  for (const [label, count] of Object.entries(counts)) {
    const bar = count > 0 ? '✓' : '·';
    console.log(`  ${bar} ${count.toString().padStart(4)}  ${label}`);
  }
  console.log('──────────────────────────────────────────────────────────────────\n');
}

main();
