#!/usr/bin/env node
/**
 * Typographie française des titres : remplace l'espace normale avant ? ! : ; par une espace
 * insécable (U+00A0, convention déjà dominante du contenu) dans les seuls champs h1_fr,
 * title_fr et seoTitle_fr de src/content/** et src/data/pages/*.json. Idempotent : une seconde
 * passe ne change rien. Le contrôle est dans scripts/check-title-typo.mjs.
 *
 * Usage : node scripts/fix-title-typo.mjs [--dry]
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['src/content', 'src/data/pages'];
const FIELD_LINE_RE = /^(\s*"(?:h1_fr|title_fr|seoTitle_fr)": )("(?:[^"\\]|\\.)*")(,?\s*)$/;
const dry = process.argv.includes('--dry');

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.json')) out.push(p);
  }
  return out;
}

let changedFiles = 0;
let changedFields = 0;
for (const dir of DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, 'utf8').split('\n');
    let touched = false;
    const next = lines.map((line) => {
      const m = FIELD_LINE_RE.exec(line);
      if (!m) return line;
      const fixed = m[2].replace(/ ([?!:;])/g, ' $1');
      if (fixed === m[2]) return line;
      touched = true;
      changedFields++;
      return m[1] + fixed + m[3];
    });
    if (touched) {
      changedFiles++;
      if (!dry) writeFileSync(file, next.join('\n'));
    }
  }
}
console.log(`fix-title-typo : ${changedFields} champ(s) dans ${changedFiles} fichier(s)${dry ? ' (dry)' : ''}`);
