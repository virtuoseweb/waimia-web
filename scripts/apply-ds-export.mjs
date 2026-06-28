#!/usr/bin/env node
/**
 * apply-ds-export.mjs
 * Applique un export DS Studio sur packages/ds-tokens/tokens.css
 *
 * Usage :
 *   node scripts/apply-ds-export.mjs <fichier-export> [--dry] [--allow-new]
 *
 * Formats acceptés :
 *   (a) CSS  :root{ --x: v; --y: v; }
 *   (b) JSON { "--x": "v", "--y": "v" }
 *
 * Comportement :
 *   - Token existant  -> remplace la valeur (garde indentation + commentaire)
 *   - Token inconnu   -> refuse (warning) SAUF --allow-new (append - overrides)
 *   - --dry           -> 0 ecriture, affiche diff + resume
 *   - Idempotent      -> re-appliquer le meme export = 0 changement
 *
 * Code retour :
 *   0  tout applique (ou dry sans inconnu)
 *   1  erreur fatale (fichier manquant, syntaxe invalide...)
 *   2  tokens inconnus rejetes (sans --allow-new) - avertissement non-bloquant en dry
 *
 * NOTE ARCHITECTURE : la logique pure (parse + application sur le CSS) vit dans
 * packages/ds-tokens/ds-tokens.mjs et est reutilisee par l'integration dev-only
 * src/integrations/ds-save-dev.mjs (bouton "Enregistrer" du DS Studio).
 * Ce fichier ne garde que le runner CLI (back-compat `npm run ds:apply`).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  parseExport,
  parseKnownTokens,
  applyTokens,
  appendOverrides,
} from '../packages/ds-tokens/ds-tokens.mjs';

// --- CLI args ----------------------------------------------------------------

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const allowNew = args.includes('--allow-new');
const positional = args.filter((a) => !a.startsWith('--'));

if (positional.length === 0) {
  console.error('Usage: node scripts/apply-ds-export.mjs <fichier-export> [--dry] [--allow-new]');
  process.exit(1);
}

const exportFile = resolve(positional[0]);
if (!existsSync(exportFile)) {
  console.error(`Erreur : fichier introuvable -> ${exportFile}`);
  process.exit(1);
}

// --- Chemins -----------------------------------------------------------------

const scriptDir = new URL('.', import.meta.url).pathname;
const tokensPath = resolve(scriptDir, '../packages/ds-tokens/tokens.css');

if (!existsSync(tokensPath)) {
  console.error(`Erreur : tokens.css introuvable -> ${tokensPath}`);
  process.exit(1);
}

// --- Parse export (CSS ou JSON) ----------------------------------------------

const exportRaw = readFileSync(exportFile, 'utf8');
let tokens;
try {
  tokens = parseExport(exportRaw);
} catch (e) {
  console.error('Erreur :', e.message);
  process.exit(1);
}

const cssOriginal = readFileSync(tokensPath, 'utf8');
const knownTokens = parseKnownTokens(cssOriginal);

// Separer tokens connus vs inconnus
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

// Afficher le resume
console.log(`\n=== apply-ds-export${dry ? ' [DRY RUN]' : ''} ===`);
console.log(`Source  : ${exportFile}`);
console.log(`Cible   : ${tokensPath}`);
console.log(`Format  : ${exportRaw.trim().startsWith('{') ? 'JSON' : 'CSS :root{}'}`);
console.log(`Tokens  : ${tokens.size} dans l'export`);
console.log('');

const { newLines, applied, unchanged } = applyTokens(cssOriginal, toApply);

// Diff : tokens qui changent reellement
if (applied.length > 0) {
  console.log('Modifications :');
  for (const { name, oldVal, newVal } of applied) {
    console.log(`  ${name} : ${oldVal} -> ${newVal}`);
  }
} else if (toApply.size > 0) {
  console.log('Aucune modification (valeurs deja identiques - idempotent)');
}

if (unchanged.length > 0) {
  console.log(`\nInchanges (deja a la bonne valeur) : ${unchanged.length}`);
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
    console.log(`\nTokens INCONNUS refuses (pas dans tokens.css) : ${unknown.length}`);
    for (const k of unknown) console.log(`  x ${k}: ${tokens.get(k)}`);
  }
}

// Resume final
console.log('');
console.log(
  `Resume : ${applied.length} modifie(s) - ${unchanged.length} inchange(s) - ${unknown.length} inconnu(s)${allowNew ? ` (${unknown.length} ajoute(s) en overrides)` : ' (refuse(s))'}`,
);

// Ecriture
if (!dry) {
  let finalCss = newLines.join('\n');
  if (allowNew && newTokens.size > 0) {
    finalCss = appendOverrides(finalCss, newTokens);
  }
  writeFileSync(tokensPath, finalCss, 'utf8');
  console.log(`\nEcrit -> ${tokensPath}`);
} else {
  console.log('\n[DRY RUN] - 0 fichier modifie');
}

// Code retour 2 si tokens inconnus rejetes (non-bloquant en dry, bloquant en apply)
if (unknown.length > 0 && !allowNew) {
  process.exit(2);
}
process.exit(0);
