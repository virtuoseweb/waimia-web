#!/usr/bin/env node
/**
 * Remplace par U+00A0 l'espace ordinaire avant `: ; ? !` et `»`, et après `«`, dans le texte FR
 * (règle et périmètre : scripts/lib/fr-nbsp.mjs). Idempotent : un second passage ne change rien.
 *
 *   node scripts/fix-fr-nbsp.mjs          écrit les fichiers
 *   node scripts/fix-fr-nbsp.mjs --dry    compte sans écrire
 */
import { writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectAll } from './lib/fr-nbsp.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry');
const { files, skipped, total } = collectAll(ROOT);

for (const f of files) {
  if (!dry) writeFileSync(f.file, f.after);
  console.log(`${f.n}\t${relative(ROOT, f.file)}`);
}
for (const s of skipped) console.warn(`non analysé : ${s.file} (${s.reason})`);
const json = files.filter((f) => f.kind === 'json');
const astro = files.filter((f) => f.kind === 'astro');
const code = files.filter((f) => f.kind === 'ts');
console.log(
  `${dry ? 'à corriger' : 'corrigé'} : ${total} occurrence(s), ${files.length} fichier(s) ` +
    `(json ${json.reduce((s, f) => s + f.n, 0)}/${json.length}, astro ${astro.reduce((s, f) => s + f.n, 0)}/${astro.length}, ` +
    `ts ${code.reduce((s, f) => s + f.n, 0)}/${code.length})`,
);
