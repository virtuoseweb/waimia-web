#!/usr/bin/env node
/**
 * check-media-query-var.mjs — Gate anti-régression : var() invalide dans une condition @media/@container.
 *
 * Pourquoi : var() est INTERDIT dans la condition d'une @media ou @container (spec CSS).
 * Le navigateur jette silencieusement le bloc entier (0 erreur console, 0 erreur de build).
 * Le reflow responsive n'est donc jamais appliqué.
 *
 * Scan : src/ récursif sur .astro et .css.
 * Regex par ligne : /@(media|container)[^{]*var\(/
 *
 * Exit : 1 si >= 1 hit (violation détectée) · 0 si 0 hit (PASS) · 2 si 0 fichier scanné.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');
const EXTENSIONS = new Set(['.astro', '.css']);
const CONDITION_VAR_RE = /@(media|container)[^{]*var\(/;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path, files);
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

const files = walk(SRC_DIR).sort();

if (files.length === 0) {
  console.error('ERROR: 0 fichier scanné (src/ introuvable ou vide).');
  process.exit(2);
}

const hits = [];

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    if (CONDITION_VAR_RE.test(line)) {
      hits.push({
        file: relative(ROOT, file),
        line: index + 1,
        snippet: line.trim().slice(0, 90),
      });
    }
  });
}

if (hits.length > 0) {
  console.error(`\nGate FAIL : var() détecté dans une condition @media/@container (${hits.length} occurrence(s))\n`);
  for (const hit of hits) {
    console.error(`  ${hit.file}:${hit.line}  ${hit.snippet}`);
  }
  console.error(
    '\nvar() est INVALIDE dans une condition @media/@container (spec CSS).' +
    ' Le bloc est jeté silencieusement par le navigateur.' +
    ' Le reflow responsive n\'est jamais appliqué.' +
    ' Utilise un littéral px (900px=--wrap-read, 720px=--wrap-prose, cf tokens.css).\n'
  );
  process.exit(1);
}

console.log(`✅ PASS — 0 var() dans une condition @media/@container (${files.length} fichiers scannés)`);
process.exit(0);
