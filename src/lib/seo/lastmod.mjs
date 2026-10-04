// Waimia · lastmod.mjs · date de dernière modification RÉELLE de chaque route publique.
//
// Une seule source pour trois usages : `<lastmod>` du sitemap, `dateModified` du JSON-LD
// et la ligne visible « Mis à jour le ». Jamais la date de build (identique partout, que
// Google ignore) : on prend la date du CONTENU.
//
// Deux sources fusionnées (la plus récente gagne) :
//   1. le champ `updatedAt` (sinon `publishedAt`) du fichier de contenu JSON ;
//   2. l'instantané `src/data/lastmod.generated.json` : date du dernier commit qui a
//      touché le fichier source de la route. Il est commité car les clones de build
//      (Vercel, CI) sont superficiels : `git log` n'y voit pas l'historique. On le
//      régénère avec `node scripts/gen-lastmod.mjs` depuis un clone complet.
// Une page hub (ex. /blog) prend la date la plus récente entre elle-même et ses enfants.
//
// JS pur, 0 dépendance : importé par astro.config.mjs, Base.astro et les scripts.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/** Collection de contenu → préfixe de route (`''` = page de premier niveau `/<id>`). */
export const COLLECTION_ROUTE_PREFIX = {
  services: '/services',
  blog: '/blog',
  cases: '/cas-clients',
  'cas-usages': '/cas-usages',
  comparatifs: '/ressources/comparatifs',
  diagnostics: '/ressources/diagnostics',
  guides: '/ressources/guides',
  outils: '/ressources/outils',
  demonstrations: '/demonstrations',
  implantations: '/implantations',
  secteurs: '/secteurs',
  authors: '/equipe',
  formations: '/formations',
  lp: '/lp',
  audits: '',
  legal: '',
};

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

function toDay(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/**
 * Route servie par un fichier de contenu, ou null si la collection n'a pas de route.
 * L'id d'une entrée (donc son URL) est son champ `slug` quand il existe, sinon son chemin
 * relatif : c'est la règle du loader `glob` d'Astro. Un service rangé dans un sous-dossier
 * (services/agents-ia/agent-support-client.json, slug `agent-support-client`) est donc
 * servi à /services/agent-support-client.
 */
export function routeForContentFile(root, file) {
  const rel = relative(join(root, 'src', 'content'), file).split(sep).join('/');
  const [collection, ...rest] = rel.split('/');
  if (!(collection in COLLECTION_ROUTE_PREFIX)) return null;
  let id = rest.join('/').replace(/\.(json|mdx?)$/, '');
  if (file.endsWith('.json')) {
    try {
      const slug = JSON.parse(readFileSync(file, 'utf8')).slug;
      if (typeof slug === 'string' && slug) id = slug;
    } catch {
      /* JSON invalide : on garde le chemin relatif */
    }
  }
  if (!id) return null;
  // Convention du repo : l'entrée `hub`/`index` d'une collection est rendue à la racine du préfixe.
  const tail = id === 'hub' || id === 'index' ? '' : `/${id}`;
  return `${COLLECTION_ROUTE_PREFIX[collection]}${tail}` || '/';
}

/** Route servie par une page statique `src/pages/**.astro` (null si dynamique ou privée). */
export function routeForPageFile(root, file) {
  const rel = relative(join(root, 'src', 'pages'), file).split(sep).join('/');
  if (!rel.endsWith('.astro') || rel.includes('[') || rel.split('/').some((s) => s.startsWith('_'))) return null;
  const route = '/' + rel.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
  return route.length > 1 ? route.replace(/\/$/, '') : '/';
}

/** Fichiers sources qui portent une route : [{ route, file }]. */
export function listRouteSources(root) {
  const out = [];
  for (const file of walk(join(root, 'src', 'content'))) {
    if (!/\.(json|mdx?)$/.test(file)) continue;
    const route = routeForContentFile(root, file);
    if (route) out.push({ route, file });
  }
  for (const file of walk(join(root, 'src', 'pages'))) {
    const route = routeForPageFile(root, file);
    if (route) out.push({ route, file });
  }
  return out;
}

let cache = null;

/** Map route → 'YYYY-MM-DD' (dates propres à chaque route, sans héritage de hub). */
export function loadLastmodMap(root = process.cwd()) {
  if (cache && cache.root === root) return cache.map;
  const map = new Map();
  const bump = (route, day) => {
    if (!day) return;
    const prev = map.get(route);
    if (!prev || day > prev) map.set(route, day);
  };

  const snapshotFile = join(root, 'src', 'data', 'lastmod.generated.json');
  if (existsSync(snapshotFile)) {
    const snapshot = JSON.parse(readFileSync(snapshotFile, 'utf8'));
    for (const [route, day] of Object.entries(snapshot.routes || {})) bump(route, toDay(day));
  }

  for (const { route, file } of listRouteSources(root)) {
    if (!file.endsWith('.json')) continue;
    try {
      const data = JSON.parse(readFileSync(file, 'utf8'));
      bump(route, toDay(data.updatedAt) || toDay(data.publishedAt));
    } catch {
      /* JSON invalide : le build de contenu le signalera, pas ce module. */
    }
  }

  cache = { root, map };
  return map;
}

/**
 * Date de dernière modification d'une route, ou null si inconnue (dans ce cas on n'émet
 * PAS de lastmod plutôt que d'inventer une date).
 */
export function lastmodFor(pathname, root = process.cwd()) {
  const map = loadLastmodMap(root);
  const route = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  let best = map.get(route) || null;
  // Hub : la page liste ses enfants, elle change quand l'un d'eux change. L'accueil est
  // exclu (sinon elle porterait la date de tout le site).
  if (route !== '/') {
    for (const [r, day] of map) {
      if (r.startsWith(`${route}/`) && (!best || day > best)) best = day;
    }
  }
  return best;
}
