#!/usr/bin/env node
/**
 * Gate : typographie française des titres. Dans h1_fr, title_fr et seoTitle_fr (à toute
 * profondeur) de src/content/** et src/data/pages/*.json, ? ! : ; ne suivent jamais une espace
 * normale (U+0020) : il faut une espace insécable (U+00A0) ou fine (U+202F).
 * Correction : node scripts/fix-title-typo.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['src/content', 'src/data/pages'];
const FIELDS = new Set(['h1_fr', 'title_fr', 'seoTitle_fr']);

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.json')) out.push(p);
  }
  return out;
}

const bad = [];
let checked = 0;
function visit(v, file) {
  if (Array.isArray(v)) return v.forEach((x) => visit(x, file));
  if (!v || typeof v !== 'object') return;
  for (const [k, x] of Object.entries(v)) {
    if (FIELDS.has(k) && typeof x === 'string') {
      checked++;
      if (/ [?!:;]/.test(x)) bad.push(`${relative(ROOT, file)} ${k}: ${JSON.stringify(x)}`);
    } else visit(x, file);
  }
}

for (const dir of DIRS) for (const file of walk(join(ROOT, dir))) visit(JSON.parse(readFileSync(file, 'utf8')), file);

if (bad.length) {
  console.error(`check-title-typo : ${bad.length} titre(s) avec une espace normale avant ? ! : ;\n` + bad.map((b) => '  ' + b).join('\n'));
  console.error('Correction : node scripts/fix-title-typo.mjs');
  process.exit(1);
}
console.log(`check-title-typo : ${checked} champ(s) de titre contrôlés, 0 espace normale avant ? ! : ;`);
