#!/usr/bin/env node
/**
 * apply-ds-export.mjs
 * Applique un export DS Studio sur src/styles/tokens.css
 *
 * Usage :
 *   node scripts/apply-ds-export.mjs <fichier-export> [--dry] [--allow-new]
 *
 * Formats acceptés :
 *   (a) CSS  :root{ --x: v; --y: v; }
 *   (b) JSON { "--x": "v", "--y": "v" }
 *
 * Comportement :
 *   - Token existant  → remplace la valeur (garde indentation + commentaire)
 *   - Token inconnu   → refuse (warning) SAUF --allow-new (append § overrides)
 *   - --dry           → 0 écriture, affiche diff + résumé
 *   - Idempotent      → ré-appliquer le même export = 0 changement
 *
 * Code retour :
 *   0  tout appliqué (ou dry sans inconnu)
 *   1  erreur fatale (fichier manquant, syntaxe invalide…)
 *   2  tokens inconnus rejetés (sans --allow-new) — avertissement non-bloquant en dry
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const allowNew = args.includes('--allow-new');
const positional = args.filter(a => !a.startsWith('--'));

if (positional.length === 0) {
  console.error('Usage: node scripts/apply-ds-export.mjs <fichier-export> [--dry] [--allow-new]');
  process.exit(1);
}

const exportFile = resolve(positional[0]);
if (!existsSync(exportFile)) {
  console.error(`Erreur : fichier introuvable → ${exportFile}`);
  process.exit(1);
}

// ─── Chemins ──────────────────────────────────────────────────────────────────

const scriptDir = new URL('.', import.meta.url).pathname;
const tokensPath = resolve(scriptDir, '../src/styles/tokens.css');

if (!existsSync(tokensPath)) {
  console.error(`Erreur : tokens.css introuvable → ${tokensPath}`);
  process.exit(1);
}

// ─── Parse export (CSS ou JSON) ───────────────────────────────────────────────

function parseExport(raw) {
  const trimmed = raw.trim();

  // Format JSON
  if (trimmed.startsWith('{')) {
    let obj;
    try { obj = JSON.parse(trimmed); } catch (e) {
      console.error('Erreur : JSON invalide —', e.message);
      process.exit(1);
    }
    const out = new Map();
    for (const [k, v] of Object.entries(obj)) {
      const key = k.trim();
      if (!key.startsWith('--')) {
        console.error(`Erreur : clé JSON invalide (doit commencer par --) → ${key}`);
        process.exit(1);
      }
      out.set(key, String(v).trim());
    }
    return out;
  }

  // Format CSS :root { ... }
  // Accepte :root{ ... } ou :root { ... }, multi-ligne
  const rootMatch = trimmed.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) {
    console.error('Erreur : format non reconnu (attendu :root{ … } ou JSON { … })');
    process.exit(1);
  }
  const block = rootMatch[1];
  // Ligne : --token-name: value;   (valeur peut contenir : )
  const lineRe = /(--[\w-]+)\s*:\s*([^;]+)\s*;/g;
  const out = new Map();
  let m;
  while ((m = lineRe.exec(block)) !== null) {
    out.set(m[1].trim(), m[2].trim());
  }
  if (out.size === 0) {
    console.error('Erreur : aucun token trouvé dans le bloc :root{ }');
    process.exit(1);
  }
  return out;
}

// ─── Parse tokens.css : collecte les tokens connus ────────────────────────────

function parseKnownTokens(css) {
  // Ligne de la forme :   --token-name: value;   (peut avoir commentaire après)
  // Capture : indentation + nom + espace + valeur + reste-de-ligne (commentaire éventuel)
  const lineRe = /^([ \t]*)(--[\w-]+)([ \t]*:[ \t]*)([^;]+?)([ \t]*;.*)$/;
  const known = new Set();
  for (const line of css.split('\n')) {
    const m = line.match(lineRe);
    if (m) known.add(m[2]);
  }
  return known;
}

// ─── Appliquer les tokens dans le CSS ─────────────────────────────────────────

function applyTokens(css, tokens) {
  const lineRe = /^([ \t]*)(--[\w-]+)([ \t]*:[ \t]*)([^;]+?)([ \t]*;.*)$/;
  const lines = css.split('\n');
  const applied = [];
  const unchanged = [];

  const applied_names = new Set();

  const newLines = lines.map(line => {
    const m = line.match(lineRe);
    if (!m) return line;
    const name = m[2];
    if (!tokens.has(name)) return line;
    const newVal = tokens.get(name);
    const oldVal = m[4].trim();
    if (oldVal === newVal) {
      unchanged.push({ name, val: oldVal });
      applied_names.add(name);
      return line; // idempotent
    }
    applied.push({ name, oldVal, newVal });
    applied_names.add(name);
    // Reconstruit la ligne : garde l'indentation, le nom, le séparateur, la fin
    return `${m[1]}${m[2]}${m[3]}${newVal}${m[5]}`;
  });

  return { newLines, applied, unchanged, applied_names };
}

// ─── Append overrides ─────────────────────────────────────────────────────────

function appendOverrides(css, newTokens) {
  const separator = '\n/* --- overrides --- */\n:root {\n';
  const entries = [...newTokens.entries()].map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const closing = '\n}\n';
  return css + separator + entries + closing;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const exportRaw = readFileSync(exportFile, 'utf8');
const tokens = parseExport(exportRaw);

const cssOriginal = readFileSync(tokensPath, 'utf8');
const knownTokens = parseKnownTokens(cssOriginal);

// Séparer tokens connus vs inconnus
const toApply = new Map();
const unknown = [];
const newTokens = new Map();

for (const [k, v] of tokens) {
  if (knownTokens.has(k)) {
    toApply.set(k, v);
  } else {
    unknown.push(k);
    if (allowNew) newTokens.set(k, v);
  }
}

// Afficher le résumé
console.log(`\n=== apply-ds-export${dry ? ' [DRY RUN]' : ''} ===`);
console.log(`Source  : ${exportFile}`);
console.log(`Cible   : ${tokensPath}`);
console.log(`Format  : ${exportRaw.trim().startsWith('{') ? 'JSON' : 'CSS :root{}'}`);
console.log(`Tokens  : ${tokens.size} dans l'export`);
console.log('');

const { newLines, applied, unchanged, applied_names } = applyTokens(cssOriginal, toApply);

// Diff : tokens qui changent réellement
if (applied.length > 0) {
  console.log('Modifications :');
  for (const { name, oldVal, newVal } of applied) {
    console.log(`  ${name} : ${oldVal} → ${newVal}`);
  }
} else if (toApply.size > 0) {
  console.log('Aucune modification (valeurs déjà identiques — idempotent)');
}

if (unchanged.length > 0) {
  console.log(`\nInchangés (déjà à la bonne valeur) : ${unchanged.length}`);
  for (const { name, val } of unchanged) {
    console.log(`  ${name} = ${val}`);
  }
}

// Tokens inconnus
if (unknown.length > 0) {
  if (allowNew) {
    console.log(`\nNouveaux tokens (--allow-new) : ${unknown.length}`);
    for (const k of unknown) console.log(`  + ${k}: ${tokens.get(k)}`);
  } else {
    console.log(`\nTokens INCONNUS refusés (pas dans tokens.css) : ${unknown.length}`);
    for (const k of unknown) console.log(`  ✗ ${k}: ${tokens.get(k)}`);
  }
}

// Résumé final
console.log('');
console.log(`Résumé : ${applied.length} modifié(s) · ${unchanged.length} inchangé(s) · ${unknown.length} inconnu(s)${allowNew ? ` (${unknown.length} ajouté(s) en overrides)` : ' (refusé(s))'}`);

// Écriture
if (!dry) {
  let finalCss = newLines.join('\n');
  if (allowNew && newTokens.size > 0) {
    finalCss = appendOverrides(finalCss, newTokens);
  }
  writeFileSync(tokensPath, finalCss, 'utf8');
  console.log(`\nEcrit → ${tokensPath}`);
} else {
  console.log('\n[DRY RUN] — 0 fichier modifié');
}

// Code retour 2 si tokens inconnus rejetés (non-bloquant en dry, bloquant en apply)
if (unknown.length > 0 && !allowNew) {
  process.exit(dry ? 2 : 2);
}
process.exit(0);
