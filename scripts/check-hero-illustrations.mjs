#!/usr/bin/env node
/**
 * check-hero-illustrations.mjs · Chaque contenu publié dans un hub a SON illustration de hero.
 *
 * Règle : un contenu (blog, guides, comparatifs, outils, actualités = billets `type: actualite`
 * du blog) déclare un hero explicite, dont le fichier existe, et son dessin n'est partagé avec
 * aucun autre contenu. La carte du hub reprend exactement cette image (src/lib/card-visual.ts),
 * donc la porte garantit aussi que carte et page affichent le même dessin.
 *
 * Lecture du hero, identique à card-visual.ts :
 *   - `heroIllustration.src`, sinon `heroImage` (blog, outils) ;
 *   - sinon la 1re section de `sections` : `illustration.src`, sinon `media_src` (guides, comparatifs).
 * Dessin : clé `drawing` de src/data/illustrations.json (ou le slug) pour un fichier de la
 * bibliothèque, sinon le nom de fichier sans suffixe de fond ; paper et ink = un seul dessin
 * (même logique que drawingKeyOfSrc dans src/lib/illustration-pick.ts).
 *
 * Il n'existe pas de champ « brouillon » dans les collections : sont ignorés les fichiers dont
 * le nom commence par `_` ou `draft: true`. Les billets `seo.noindex` restent contrôlés : ils
 * ont une URL et une carte.
 *
 * Transition : `--baseline <fichier>` liste les exceptions à date (contenus sans hero, dessins
 * partagés). Elle ne peut que diminuer : une entrée devenue inutile fait échouer le script,
 * et toute violation hors baseline aussi.
 *
 * Usage : node scripts/check-hero-illustrations.mjs [--baseline scripts/check-hero-illustrations.baseline.json]
 *                                                    [--root <racine du dépôt>] [--write-baseline <fichier>]
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : undefined;
};
const ROOT = resolve(opt('root') ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
const COLLECTIONS = ['blog', 'guides', 'comparatifs', 'outils'];

const library = JSON.parse(readFileSync(join(ROOT, 'src/data/illustrations.json'), 'utf8')).illustrations;
const drawingBySrc = new Map();
for (const ill of library) {
  const key = ill.drawing ?? ill.slug;
  drawingBySrc.set(ill.paper, key);
  drawingBySrc.set(ill.ink, key);
}
const drawingKeyOfSrc = (src) =>
  drawingBySrc.get(src) ?? (src.split('/').pop() ?? src).replace(/\.(webp|png|jpe?g|svg)$/i, '').replace(/-(paper|ink)$/, '');

/** Même lecture que `heroSrcFromSections` + les champs du frontmatter de card-visual / resources-hub. */
function heroSrcOf(data) {
  const explicit = data.heroIllustration?.src ?? (typeof data.heroImage === 'string' ? data.heroImage : undefined);
  if (explicit) return explicit;
  const first = Array.isArray(data.sections) ? data.sections[0] : undefined;
  if (!first) return undefined;
  return first.illustration?.src ?? (typeof first.media_src === 'string' ? first.media_src : undefined);
}

const contents = [];
for (const collection of COLLECTIONS) {
  const dir = join(ROOT, 'src/content', collection);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith('.json') || file.startsWith('_')) continue;
    const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    if (data.draft === true) continue;
    contents.push({ id: `${collection}/${file.replace(/\.json$/, '')}`, src: heroSrcOf(data) });
  }
}

const noHero = contents.filter((c) => !c.src).map((c) => c.id);
const fileMissing = contents.filter((c) => c.src && !/^https?:/.test(c.src) && !existsSync(join(ROOT, 'public', c.src)));
const groups = new Map();
for (const c of contents) {
  if (!c.src) continue;
  const key = drawingKeyOfSrc(c.src);
  groups.set(key, [...(groups.get(key) ?? []), c.id]);
}
const shared = Object.fromEntries(
  [...groups].filter(([, ids]) => ids.length > 1).sort(([a], [b]) => a.localeCompare(b)).map(([k, ids]) => [k, ids.sort()]),
);

const writeTo = opt('write-baseline');
if (writeTo) {
  const baseline = { _comment: 'Exceptions à date de check-hero-illustrations.mjs. Ne peut que diminuer.', sansHero: noHero.sort(), dessinsPartages: shared };
  writeFileSync(resolve(writeTo), `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`baseline écrite : ${noHero.length} sans hero, ${Object.keys(shared).length} dessins partagés`);
  process.exit(0);
}

const baselinePath = opt('baseline');
const baseline = baselinePath
  ? JSON.parse(readFileSync(resolve(baselinePath), 'utf8'))
  : { sansHero: [], dessinsPartages: {} };
const errors = [];

// Fichier d'image absent : jamais toléré.
for (const c of fileMissing) errors.push(`image absente de public/ : ${c.id} -> ${c.src}`);

// Sans hero explicite.
const okNoHero = new Set(baseline.sansHero ?? []);
for (const id of noHero) if (!okNoHero.has(id)) errors.push(`sans hero explicite : ${id} (renseigner heroIllustration, cf. skill waimia-illustration)`);
const ids = new Set(contents.map((c) => c.id));
for (const id of okNoHero) {
  if (!ids.has(id)) errors.push(`baseline inutile (contenu disparu) : sansHero ${id}`);
  else if (!noHero.includes(id)) errors.push(`baseline inutile (hero désormais présent) : sansHero ${id}, retirer l'entrée`);
}

// Dessin partagé.
const okShared = baseline.dessinsPartages ?? {};
for (const [key, members] of Object.entries(shared)) {
  const allowed = okShared[key];
  if (!allowed) errors.push(`dessin partagé : ${key} -> ${members.join(', ')}`);
  else if (members.some((m) => !allowed.includes(m))) {
    errors.push(`dessin partagé par un nouveau contenu : ${key} -> ${members.filter((m) => !allowed.includes(m)).join(', ')}`);
  }
}
for (const [key, allowed] of Object.entries(okShared)) {
  const members = shared[key];
  if (!members) errors.push(`baseline inutile (dessin plus partagé) : dessinsPartages ${key}, retirer l'entrée`);
  else if (allowed.some((m) => !members.includes(m))) {
    errors.push(`baseline inutile (membre sorti) : dessinsPartages ${key}, retirer ${allowed.filter((m) => !members.includes(m)).join(', ')}`);
  }
}

console.log(
  `check-hero-illustrations : ${contents.length} contenus, ${noHero.length} sans hero, ${Object.keys(shared).length} dessins partagés` +
    (baselinePath ? ` (baseline : ${okNoHero.size} / ${Object.keys(okShared).length})` : ' (sans baseline)'),
);
if (errors.length > 0) {
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(`\n${errors.length} écart(s). Règle : un contenu publié = une illustration de hero dédiée, unique.`);
  process.exit(1);
}
console.log('OK');
