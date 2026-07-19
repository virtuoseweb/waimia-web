#!/usr/bin/env node
/**
 * check-ds-presets.mjs - Gate d'integrite des presets de theme du DS Studio (P2.8).
 *
 * Verifie que le trio { src/data/ds-presets.json, src/styles/themes.css } est coherent :
 *   1. ds-presets.json est parseable et a la forme { presets: [ { slug, name, tokens } ] }.
 *   2. Les slugs sont uniques (l'upsert par slug l'exige).
 *   3. Chaque token de chaque preset EXISTE dans packages/ds-tokens/tokens.css
 *      (allowNew:false : un preset ne peut jamais referencer un token inconnu).
 *   4. themes.css est EXACTEMENT la projection du JSON : on regenere en memoire via
 *      renderThemesCss() (la meme fonction que le middleware d'ecriture) et on compare
 *      octet a octet -> impossible que themes.css derive du JSON sans casser le gate.
 *
 * Exit : 0 si PASS . 1 si >= 1 violation.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseKnownTokens } from '../packages/ds-tokens/ds-tokens.mjs';
import { renderThemesCss, slugify } from '../src/integrations/ds-save-dev.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PRESETS_PATH = join(ROOT, 'src', 'data', 'ds-presets.json');
const THEMES_PATH = join(ROOT, 'src', 'styles', 'themes.css');
const TOKENS_PATH = join(ROOT, 'packages', 'ds-tokens', 'tokens.css');

const errors = [];

// --- 0. Presence des fichiers ------------------------------------------------
for (const [label, path] of [
  ['src/data/ds-presets.json', PRESETS_PATH],
  ['src/styles/themes.css', THEMES_PATH],
  ['packages/ds-tokens/tokens.css', TOKENS_PATH],
]) {
  if (!existsSync(path)) errors.push(`Fichier manquant : ${label}`);
}

if (errors.length === 0) {
  // --- 1. JSON parseable + forme attendue ------------------------------------
  let store = null;
  try {
    store = JSON.parse(readFileSync(PRESETS_PATH, 'utf8'));
  } catch (e) {
    errors.push(`ds-presets.json illisible : ${e.message}`);
  }

  if (store) {
    if (!store || typeof store !== 'object' || !Array.isArray(store.presets)) {
      errors.push('ds-presets.json : forme invalide (attendu { "presets": [ ... ] }).');
    } else {
      const known = parseKnownTokens(readFileSync(TOKENS_PATH, 'utf8'));
      const seenSlugs = new Set();

      store.presets.forEach((p, i) => {
        const ref = `presets[${i}]`;
        if (!p || typeof p !== 'object') {
          errors.push(`${ref} : entree non-objet.`);
          return;
        }
        // slug present, non vide, canonique (== slugify(slug))
        if (typeof p.slug !== 'string' || !p.slug) {
          errors.push(`${ref} : slug manquant ou vide.`);
        } else {
          if (slugify(p.slug) !== p.slug) {
            errors.push(`${ref} : slug non canonique « ${p.slug} » (attendu « ${slugify(p.slug)} »).`);
          }
          // 2. unicite des slugs
          if (seenSlugs.has(p.slug)) errors.push(`${ref} : slug duplique « ${p.slug} ».`);
          seenSlugs.add(p.slug);
        }
        if (typeof p.name !== 'string' || !p.name.trim()) {
          errors.push(`${ref} : name manquant ou vide.`);
        }
        // 3. tokens : objet non vide, toutes cles connues
        if (!p.tokens || typeof p.tokens !== 'object' || Array.isArray(p.tokens)) {
          errors.push(`${ref} : tokens manquant ou non-objet.`);
        } else {
          const keys = Object.keys(p.tokens);
          if (keys.length === 0) errors.push(`${ref} (« ${p.slug} ») : aucun token.`);
          for (const k of keys) {
            if (!known.has(k)) {
              errors.push(`${ref} (« ${p.slug} ») : token inconnu « ${k} » (absent de tokens.css).`);
            }
          }
        }
      });

      // 4. themes.css == projection exacte du JSON
      const expected = renderThemesCss(store.presets);
      const actual = readFileSync(THEMES_PATH, 'utf8');
      if (actual !== expected) {
        errors.push(
          'themes.css n\'est PAS la projection exacte de ds-presets.json.' +
          ' Regenere-le (le middleware POST /api/ds/preset le fait) ou lance le DS Studio.'
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`\nGate FAIL : ${errors.length} probleme(s) sur les presets de theme DS.\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

console.log('PASS - presets de theme DS coherents (JSON valide, slugs uniques, tokens connus, themes.css = projection exacte).');
process.exit(0);
