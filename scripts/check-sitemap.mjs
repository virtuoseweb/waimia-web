#!/usr/bin/env node
/**
 * check-sitemap.mjs · Gate CI : cohérence stricte sitemap / robots / noindex / canonical.
 *
 * Chaque URL du sitemap doit :
 *   1. répondre 200      : un fichier HTML existe dans le build pour cette URL ;
 *   2. être indexable    : pas de meta robots noindex ;
 *   3. être canonique    : son canonical pointe elle-même, sans slash final (sauf l'accueil) ;
 *   4. ne pas rediriger  : ce n'est pas la source d'une redirection (config Vercel générée) ;
 *   5. être explorable   : aucune règle Disallow de robots.txt ne la couvre ;
 *   6. porter un lastmod : une date réelle, pas la même date sur tout le site.
 * Et dans l'autre sens :
 *   7. toute page indexable est dans le sitemap (sinon Google la découvre sans priorité) ;
 *   8. aucune page n'est à la fois Disallow et noindex (le noindex ne serait jamais lu) ;
 *   9. robots.txt déclare le sitemap, qui existe, et l'index liste les fichiers présents.
 *
 * Usage : node scripts/check-sitemap.mjs [--report]
 * Exit  : 0 propre · 1 erreur(s) · 2 dist/client absent.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  scanDist,
  isIndexable,
  readSitemap,
  readRobots,
  isDisallowed,
  readVercelRedirects,
  DIST,
  SITE_ORIGIN,
} from './lib/dist-scan.mjs';

const VERBOSE = process.argv.includes('--report');
const errors = [];
const warnings = [];
const err = (rule, msg) => errors.push({ rule, msg });
const warn = (rule, msg) => warnings.push({ rule, msg });

const { pages, byPath } = scanDist();
const sitemap = readSitemap();
const robots = readRobots();
const redirects = readVercelRedirects();

if (sitemap.length === 0) err('sitemap', 'aucune URL dans le sitemap (sitemap-*.xml absent ou vide)');

// Robots évalués : Googlebot (groupe `*` ou dédié) et un robot IA nommé, pour attraper un
// groupe nommé qui divergerait du groupe général.
const AGENTS = ['*', 'Googlebot', 'GPTBot', 'ClaudeBot', 'PerplexityBot'];

const seen = new Set();
for (const u of sitemap) {
  if (seen.has(u.pathname)) err('doublon', `${u.pathname} listée deux fois`);
  seen.add(u.pathname);

  if (!u.loc.startsWith(SITE_ORIGIN)) err('origine', `${u.loc} n'est pas sur ${SITE_ORIGIN}`);
  // L'accueil suit son canonical (`https://waimia.com/`) ; les autres URL n'ont pas de slash final.
  if (u.pathname !== '/' && u.loc.endsWith('/')) err('forme', `${u.loc} porte un slash final`);
  if (u.pathname === '/' && u.loc !== `${SITE_ORIGIN}/`) err('forme', `${u.loc} : l'accueil s'écrit ${SITE_ORIGIN}/, comme son canonical`);
  if (/[?#]/.test(u.loc)) err('forme', `${u.loc} contient une query ou un fragment`);

  const page = byPath.get(u.pathname);
  if (!page) {
    err('200', `${u.pathname} : aucune page bâtie (l'URL répondrait 404)`);
    continue;
  }
  if (page.refresh) err('redirection', `${u.pathname} est une page de redirection`);
  if (page.noindex) err('noindex', `${u.pathname} est noindex`);
  const expected = SITE_ORIGIN + (u.pathname === '/' ? '/' : u.pathname);
  if (!page.canonical) err('canonical', `${u.pathname} n'a pas de canonical`);
  else if (page.canonical !== expected) {
    err('canonical', `${u.pathname} a pour canonical ${page.canonical}`);
  }
  if (redirects) {
    const hit = redirects.find((r) => !r.has && r.src !== '^/(.*)/$' && r.re.test(u.pathname));
    if (hit) err('redirection', `${u.pathname} est redirigée vers ${hit.location} par la config`);
  }
  for (const agent of AGENTS) {
    if (isDisallowed(robots, u.pathname, agent)) err('robots', `${u.pathname} est interdite à ${agent} par robots.txt`);
  }
  if (!u.lastmod) warn('lastmod', `${u.pathname} sans lastmod (date de contenu inconnue)`);
  else if (Number.isNaN(Date.parse(u.lastmod))) err('lastmod', `${u.pathname} : lastmod invalide ${u.lastmod}`);
  else if (Date.parse(u.lastmod) > Date.now() + 86400000) err('lastmod', `${u.pathname} : lastmod dans le futur ${u.lastmod}`);
}

// 6. lastmod réel : s'il n'y a qu'une seule date pour tout le site, c'est une date de build.
const dates = new Set(sitemap.filter((u) => u.lastmod).map((u) => u.lastmod.slice(0, 10)));
const withDate = sitemap.filter((u) => u.lastmod).length;
if (sitemap.length > 10 && withDate / sitemap.length < 0.9) {
  err('lastmod', `seulement ${withDate}/${sitemap.length} URL ont un lastmod`);
}
if (sitemap.length > 10 && dates.size < 2) {
  err('lastmod', `toutes les URL portent la même date (${[...dates][0]}) : c'est une date de build, pas de contenu`);
}

// 7. Toute page indexable est dans le sitemap.
for (const p of pages.filter(isIndexable)) {
  if (!seen.has(p.pathname)) err('absente', `${p.pathname} est indexable mais absente du sitemap`);
}

// 8. Disallow ET noindex sur une même page publique : signal contradictoire.
for (const p of pages) {
  if (p.internal || p.refresh) continue;
  if (p.noindex && isDisallowed(robots, p.pathname, '*')) {
    err('contradiction', `${p.pathname} est à la fois Disallow (robots.txt) et noindex : le noindex n'est jamais lu`);
  }
  if (!p.noindex && isDisallowed(robots, p.pathname, '*')) {
    err('contradiction', `${p.pathname} est indexable mais interdite d'exploration`);
  }
}

// 9. robots.txt → sitemap index → fichiers.
const indexFile = join(DIST, 'sitemap-index.xml');
if (!robots.sitemaps.includes(`${SITE_ORIGIN}/sitemap-index.xml`)) err('robots', 'robots.txt ne déclare pas le sitemap-index.xml');
if (!existsSync(indexFile)) err('sitemap', 'sitemap-index.xml absent du build');
else {
  for (const m of readFileSync(indexFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const file = m[1].replace(SITE_ORIGIN + '/', '');
    if (!existsSync(join(DIST, file))) err('sitemap', `sitemap-index.xml liste ${file}, absent du build`);
  }
}
if (!redirects) warn('config', '.vercel/output/config.json absent : contrôle des redirections sauté');

const LINE = '═'.repeat(68);
console.log(`\n${LINE}`);
console.log('  check:sitemap : sitemap / robots / noindex / canonical');
console.log(`  URL au sitemap : ${sitemap.length} · avec lastmod : ${withDate} · dates distinctes : ${dates.size}`);
console.log(`  Pages indexables : ${pages.filter(isIndexable).length} · pages HTML : ${pages.length}`);
console.log(LINE);

const group = (list) => list.reduce((acc, e) => ((acc[e.rule] ||= []).push(e.msg), acc), {});
for (const [rule, list] of Object.entries(group(errors))) {
  console.log(`\n[${list.length}] ${rule}`);
  for (const m of VERBOSE ? list : list.slice(0, 5)) console.log(`  ✗ ${m}`);
  if (!VERBOSE && list.length > 5) console.log(`  … et ${list.length - 5} autre(s). Ajoute --report pour tout voir.`);
}
for (const [rule, list] of Object.entries(group(warnings))) {
  console.log(`\n⚠ [${list.length}] ${rule} (avertissement)`);
  for (const m of VERBOSE ? list : list.slice(0, 5)) console.log(`  ⚠ ${m}`);
}

console.log(`\n${LINE}`);
if (errors.length > 0) {
  console.log(`✗  ${errors.length} erreur(s) : exit 1`);
  console.log(LINE);
  process.exit(1);
}
console.log(`✓  Sitemap cohérent (${sitemap.length} URL, toutes 200, indexables, canoniques) : exit 0`);
console.log(LINE);
