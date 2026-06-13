#!/usr/bin/env node
/**
 * Gate anti-régression : interdit les propriétés de geometrie in-flow dans les blocs :hover.
 *
 * Scan : tous les fichiers .astro sous src/components/ (walk recursif).
 * Proprietes autorisees au hover : transform, translate, scale, rotate, opacity,
 * box-shadow, background, color, border-color, outline, filter, text-decoration,
 * transition, will-change, transform-origin, clip-path, text-underline-offset.
 * Proprietes interdites : celles qui modifient la geometrie in-flow et causent un reflow.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/**
 * Proprietes de geometrie in-flow interdites dans un bloc :hover.
 * Matche le nom de propriete en debut de declaration (avant ':'), insensible a la casse.
 */
const INFLOW_PROPS = new Set([
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-inline',
  'padding-block',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-inline',
  'margin-block',
  'width',
  'min-width',
  'max-width',
  'height',
  'min-height',
  'max-height',
  'gap',
  'row-gap',
  'column-gap',
  'grid-template',
  'grid-template-columns',
  'grid-template-rows',
  'grid-auto-rows',
  'grid-auto-columns',
  'font-size',
  'font-weight',
  'letter-spacing',
  'line-height',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
]);

/** Regex : nom de propriete CSS en debut de declaration (apres ; ou { ou debut de ligne). */
const PROP_NAME_RE = /(?:^|[;{])\s*([\w-]+)\s*:/;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path, files);
    } else if (entry.isFile() && extname(entry.name) === '.astro') {
      files.push(path);
    }
  }
  return files;
}

/**
 * Parse un fichier .astro et retourne les violations :hover.
 * Strategie ligne-a-ligne :
 *   - Quand une ligne contient `:hover` et `{` : entrer en mode hover.
 *   - Aussi : sélecteur `:hover` seul sur une ligne, accolade sur la suivante.
 *   - En mode hover : scanner chaque token de declaration pour des props interdites.
 *   - Sortir du mode hover au `}` correspondant (compteur d'accolades = 0).
 */
function findViolations(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  let inHover = false;
  let depth = 0;
  let pendingHover = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    const line = lines[i];

    if (!inHover) {
      const hasHover = line.includes(':hover');
      const hasOpenBrace = line.includes('{');
      const hasCloseBrace = line.includes('}');

      if (hasHover && hasOpenBrace) {
        // Selecteur avec :hover et accolade sur la meme ligne.
        inHover = true;
        depth = 1;
        pendingHover = false;

        // Partie apres le premier '{' sur la meme ligne peut contenir des declarations.
        const afterBrace = line.slice(line.indexOf('{') + 1);
        checkDeclarations(afterBrace, lineNo, violations, filePath);

        // Si la ligne ferme aussi le bloc (cas inline `... :hover { prop: val }`).
        const opens = (afterBrace.match(/\{/g) || []).length;
        const closes = (afterBrace.match(/\}/g) || []).length;
        depth = 1 + opens - closes;
        if (depth <= 0) {
          inHover = false;
          depth = 0;
        }
        continue;
      }

      if (hasHover && !hasOpenBrace && !hasCloseBrace) {
        // Selecteur `:hover` sans accolade : l'accolade viendra sur la prochaine ligne.
        pendingHover = true;
        continue;
      }

      if (pendingHover && hasOpenBrace) {
        inHover = true;
        depth = 1;
        pendingHover = false;
        const afterBrace = line.slice(line.indexOf('{') + 1);
        checkDeclarations(afterBrace, lineNo, violations, filePath);
        const opens = (afterBrace.match(/\{/g) || []).length;
        const closes = (afterBrace.match(/\}/g) || []).length;
        depth = 1 + opens - closes;
        if (depth <= 0) {
          inHover = false;
          depth = 0;
        }
        continue;
      }

      if (!hasHover) {
        pendingHover = false;
      }

    } else {
      // En mode hover : compter les accolades et scanner les declarations.
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      depth += opens - closes;

      checkDeclarations(line, lineNo, violations, filePath);

      if (depth <= 0) {
        inHover = false;
        depth = 0;
      }
    }
  }

  return violations;
}

/**
 * Cherche des declarations de proprietes in-flow dans un fragment de texte CSS.
 * Extrait tous les noms de proprietes (avant ':') et verifie contre INFLOW_PROPS.
 */
function checkDeclarations(text, lineNo, violations, filePath) {
  // Decouper en tokens par ';' et '{' pour isoler les declarations.
  // On cherche le pattern `prop-name:` en debut de chaque token.
  const tokens = text.split(/[;{]/);
  for (const token of tokens) {
    const match = token.match(/^\s*([\w-]+)\s*:/);
    if (!match) continue;
    const propName = match[1].toLowerCase();
    if (INFLOW_PROPS.has(propName)) {
      violations.push({
        file: relative(ROOT, filePath),
        line: lineNo,
        prop: propName,
      });
    }
  }
}

const hits = [];

const componentsDir = join(ROOT, 'src', 'components');
for (const file of walk(componentsDir).sort()) {
  const violations = findViolations(file);
  hits.push(...violations);
}

if (hits.length > 0) {
  hits.forEach((hit) =>
    console.error(
      `${hit.file}:${hit.line}: ${hit.prop} dans un :hover (geometrie in-flow => risque reflow ; utilise transform/translate/scale/opacity/shadow)`
    )
  );
  process.exit(1);
}

console.log('✅ PASS — 0 :hover avec geometrie in-flow (reflow-safe)');
process.exit(0);
