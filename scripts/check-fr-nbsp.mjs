#!/usr/bin/env node
/**
 * Porte : le texte français ne laisse aucune espace ordinaire avant `: ; ? !` ou `»`,
 * ni après `«` (espace insécable U+00A0 exigée, voir scripts/lib/fr-nbsp.mjs).
 * Sortie 1 s'il reste une occurrence ; correction : `node scripts/fix-fr-nbsp.mjs`.
 */
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectAll } from './lib/fr-nbsp.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { files, skipped, total } = collectAll(ROOT);

for (const s of skipped) console.warn(`check-fr-nbsp : ${s.file} non analysé (${s.reason})`);

if (total > 0) {
  console.error(`check-fr-nbsp : ${total} espace(s) ordinaire(s) à remplacer par U+00A0 dans ${files.length} fichier(s)`);
  for (const f of files.slice(0, 20)) {
    console.error(`  ${relative(ROOT, f.file)} (${f.n}) ${f.detail[0]}`);
  }
  if (files.length > 20) console.error(`  ... ${files.length - 20} autre(s) fichier(s)`);
  console.error('Corriger : node scripts/fix-fr-nbsp.mjs');
  process.exit(1);
}
console.log(`check-fr-nbsp : OK (0 occurrence, ${skipped.length} fichier(s) non analysé(s))`);
