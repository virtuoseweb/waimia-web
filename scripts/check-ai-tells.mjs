#!/usr/bin/env node
/**
 * Porte « voix humaine » : refuse dans la prose publiée les marques d'un texte rédigé par
 * une IA qui raconte sa fabrication (docs/directives/04-voix-redactionnelle.md).
 *
 * Scan : chaînes françaises des contenus JSON (champs `*_en`, `sources`, URL et slugs exclus),
 * balises HTML retirées. Chaque règle compte ses occurrences par fichier.
 *
 * Cliquet : `scripts/ai-tells-baseline.json` garde la dette connue par fichier et par règle.
 * La porte échoue si un fichier dépasse son compte de référence (nouvelle dette), et
 * signale les fichiers qui sont passés sous la référence (lancer `--update` pour resserrer).
 *
 *   node scripts/check-ai-tells.mjs            contrôle (code 1 si nouvelle dette)
 *   node scripts/check-ai-tells.mjs --update   réécrit la référence au niveau actuel
 *   node scripts/check-ai-tells.mjs --report   détail par fichier, sans contrôle
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(ROOT, 'scripts/ai-tells-baseline.json');
const COLLECTIONS = [
  'blog', 'guides', 'comparatifs', 'outils', 'services', 'secteurs', 'cas-usages',
  'implantations', 'formations', 'cases', 'audits', 'diagnostics', 'demonstrations', 'lp',
];
const SKIP_KEYS = new Set(['sources', 'url', 'href', 'slug', 'src', 'id', '$schema', 'image']);

/** Règles : identifiant, motif (insensible à la casse), explication pour le message d'échec. */
export const RULES = [
  ['date-de-lecture', /\b(?:lue?s?|relue?s?|consultée?s?|vérifiée?s?) le (?:\d|1er)/giu, 'date de lecture dans la prose (elle va dans `sources`)'],
  ['source-non-lue', /n['’]a(?:ient|vons)? pas (?:pu )?(?:être )?(?:lue?s?|relue?s?|consultée?s?|vérifiée?s?)|pas pu (?:lire|relire|consulter|vérifier)/giu, 'aveu de source non lue'],
  ['erreur-du-site', /erreur du site/giu, 'incident de lecture raconté au lecteur'],
  ['non-verifie', /non vérifiée?s? ailleurs/giu, 'note de vérification au lieu d\'une attribution'],
  ['ne-sait-pas', /\b(?:ce qu['’]on|ce que nous|ce billet|ce guide|cette page|on) ne sai(?:t|ons) pas\b/giu, 'section ou phrase « ce qu\'on ne sait pas »'],
  ['auto-reference', /\b(?:ce billet|cet article|ce comparatif|cette page)\b/giu, 'le texte parle de lui-même'],
  ['tic-ia', /\b(?:plongeons|dans un monde où|il est (?:important|essentiel|crucial) de (?:noter|souligner)|en résumé|véritable levier|révolutionner|booster)\b/giu, 'formule de remplissage typique'],
];

function walk(value, key, out) {
  if (SKIP_KEYS.has(key) || /_en$/.test(key)) return;
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => walk(v, key, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, k, out);
}

export function scanText(text) {
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ');
  const counts = {};
  for (const [id, re] of RULES) {
    const n = (plain.match(re) ?? []).length;
    if (n) counts[id] = n;
  }
  return counts;
}

function scanAll() {
  const result = {};
  for (const col of COLLECTIONS) {
    const dir = join(ROOT, 'src/content', col);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).filter((n) => n.endsWith('.json')).sort()) {
      const path = join(dir, name);
      const strings = [];
      walk(JSON.parse(readFileSync(path, 'utf8')), '', strings);
      const counts = scanText(strings.join('\n'));
      if (Object.keys(counts).length) result[relative(ROOT, path)] = counts;
    }
  }
  return result;
}

const mode = process.argv[2];
const current = scanAll();
const total = (m) => Object.values(m).reduce((s, c) => s + Object.values(c).reduce((a, b) => a + b, 0), 0);

if (mode === '--update') {
  writeFileSync(BASELINE, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`check-ai-tells : référence réécrite, ${Object.keys(current).length} fichiers, ${total(current)} occurrences.`);
  process.exit(0);
}
if (mode === '--report') {
  for (const [file, counts] of Object.entries(current)) console.log(file, JSON.stringify(counts));
  const byRule = {};
  for (const c of Object.values(current)) for (const [r, n] of Object.entries(c)) byRule[r] = (byRule[r] ?? 0) + n;
  console.log(`\n${Object.keys(current).length} fichiers, ${total(current)} occurrences`, byRule);
  process.exit(0);
}

const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {};
const failures = [];
const improved = [];
for (const [file, counts] of Object.entries(current)) {
  for (const [rule, n] of Object.entries(counts)) {
    const allowed = baseline[file]?.[rule] ?? 0;
    if (n > allowed) failures.push(`${file} : ${rule} ${n} (référence ${allowed}) · ${RULES.find((r) => r[0] === rule)[2]}`);
    else if (n < allowed) improved.push(file);
  }
}
for (const file of Object.keys(baseline)) if (!current[file]) improved.push(file);

if (failures.length) {
  console.error('check-ai-tells : nouvelles marques de texte « IA » (docs/directives/04-voix-redactionnelle.md)');
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
const note = improved.length ? ` ; ${new Set(improved).size} fichier(s) sous la référence : lancer --update pour la resserrer` : '';
console.log(`check-ai-tells : OK, ${total(current)} occurrences connues (référence ${total(baseline)})${note}.`);
