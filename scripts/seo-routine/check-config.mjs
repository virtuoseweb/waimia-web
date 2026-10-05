/**
 * Vérifie la configuration de la routine SEO, hors réseau :
 *   - docs/seo/keywords.json : champs requis, pas de doublon, chaque page cible existe dans
 *     src/content (fichier JSON du même nom) ou src/pages (route statique) ;
 *   - docs/seo/feeds.json et competitors.json : champs requis, identifiants uniques, URL valides ;
 *   - la clé IndexNow de config.mjs correspond au fichier public/<clé>.txt.
 * Sort en erreur (code 1) à la première incohérence. Usage : node scripts/seo-routine/check-config.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SEO_DIR, INDEXNOW_KEY } from './config.mjs';
import { normalizeText } from './lib/util.mjs';
import { targetExists } from './lib/targets.mjs';

const errors = [];
const err = (m) => errors.push(m);
const read = (name) => JSON.parse(readFileSync(join(SEO_DIR, name), 'utf8'));

const kw = read('keywords.json').keywords ?? [];
if (!kw.length) err('keywords.json : aucun mot-clé');
const seen = new Set();
for (const k of kw) {
  const id = normalizeText(k.query);
  if (!k.query || typeof k.volume !== 'number' || !k.cluster || ![1, 2, 3].includes(k.priority)) err(`keywords.json : entrée incomplète (${JSON.stringify(k)})`);
  if (seen.has(id)) err(`keywords.json : doublon « ${k.query} »`);
  seen.add(id);
  if (k.target !== null && (!k.target?.startsWith('/') || !targetExists(k.target))) err(`keywords.json : page cible introuvable pour « ${k.query} » : ${k.target}`);
}

const isUrl = (u) => {
  try {
    return new URL(u).protocol === 'https:';
  } catch {
    return false;
  }
};
const feeds = read('feeds.json').feeds ?? [];
const THEMES = ['editeurs', 'reglementation', 'seo-geo', 'automatisation-agents'];
const ids = new Set();
for (const f of feeds) {
  if (!f.id || !f.name || !f.usage || !THEMES.includes(f.theme) || !isUrl(f.url)) err(`feeds.json : flux incomplet ou thème inconnu (${f.id ?? f.url})`);
  if (ids.has(f.id)) err(`feeds.json : identifiant en double « ${f.id} »`);
  ids.add(f.id);
}
if (feeds.length < 15 || feeds.length > 25) err(`feeds.json : ${feeds.length} flux, 15 à 25 attendus`);

const competitors = read('competitors.json').competitors ?? [];
for (const c of competitors) {
  if (!c.domain || (c.sitemap !== null && !isUrl(c.sitemap))) err(`competitors.json : entrée invalide (${c.domain})`);
}

const keyFile = join(ROOT, 'public', `${INDEXNOW_KEY}.txt`);
if (!/^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY)) err('config.mjs : clé IndexNow hors format (8 à 128 caractères a-z, A-Z, 0-9, tiret)');
if (!existsSync(keyFile) || readFileSync(keyFile, 'utf8').trim() !== INDEXNOW_KEY) err(`public/${INDEXNOW_KEY}.txt absent ou différent de la clé de config.mjs`);

if (errors.length) {
  console.error(`check-config : ${errors.length} erreur(s)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
const targets = new Set(kw.map((k) => k.target).filter(Boolean));
console.log(`check-config OK : ${kw.length} mots-clés (${targets.size} pages cibles vérifiées, ${kw.filter((k) => !k.target).length} sans cible), ${feeds.length} flux, ${competitors.length} concurrents, clé IndexNow publiée.`);
