#!/usr/bin/env node
/**
 * check-head.mjs · Gate CI : le <head> et le H1 de chaque page indexable.
 *
 * Bloquant (exit 1) :
 *   · title présent et unique sur le site ;
 *   · meta description présente, ≤ 160 caractères, unique ;
 *   · exactement un <h1>, non vide ;
 *   · canonical présent, absolu, sans slash final, égal à l'URL de la page ;
 *   · Open Graph complet : og:title, og:description, og:image (absolue), og:url, og:type ;
 *   · twitter:card présent ; twitter:site absent (le compte déclaré n'existe pas sur X).
 * Avertissement (n'échoue pas : relève du contenu, listé pour correction) :
 *   · title > 60 caractères hors marque ;
 *   · meta description < 70 caractères ;
 *   · H1 identique au H1 d'une autre page.
 *
 * Complète check-seo.mjs (noindex/sitemap) et check-static-quality.mjs (ordre des titres,
 * alt, liens) : ce gate garantit qu'aucune page indexable ne sort sans title, description,
 * h1 ou canonical.
 *
 * Usage : node scripts/check-head.mjs [--report]
 * Exit  : 0 propre · 1 erreur(s) · 2 dist/client absent.
 */

import { scanDist, isIndexable, titleWithoutBrand, SITE_ORIGIN } from './lib/dist-scan.mjs';

const VERBOSE = process.argv.includes('--report');
const TITLE_MAX = 60;
const DESC_MAX = 160;
const DESC_MIN = 70;

const { pages } = scanDist();
const indexable = pages.filter(isIndexable);
const errors = [];
const warnings = [];
const err = (rule, p, msg) => errors.push({ rule, msg: `${p.pathname} : ${msg}` });
const warn = (rule, p, msg) => warnings.push({ rule, msg: `${p.pathname} : ${msg}` });

const dup = (key) => {
  const map = new Map();
  for (const p of indexable) {
    const v = key(p);
    if (!v) continue;
    if (!map.has(v)) map.set(v, []);
    map.get(v).push(p);
  }
  return [...map].filter(([, list]) => list.length > 1);
};

for (const p of indexable) {
  if (!p.title) err('title', p, 'title absent');
  else if (titleWithoutBrand(p.title).length > TITLE_MAX) {
    warn('title-longueur', p, `${titleWithoutBrand(p.title).length} caractères hors marque : « ${p.title} »`);
  }

  if (!p.description) err('description', p, 'meta description absente');
  else if (p.description.length > DESC_MAX) err('description', p, `${p.description.length} caractères (max ${DESC_MAX})`);
  else if (p.description.length < DESC_MIN) warn('description-courte', p, `${p.description.length} caractères`);

  if (p.h1s.length !== 1) err('h1', p, `${p.h1s.length} <h1> (1 attendu)`);
  else if (!p.h1s[0]) err('h1', p, '<h1> vide');

  const expected = SITE_ORIGIN + (p.pathname === '/' ? '/' : p.pathname);
  if (!p.canonical) err('canonical', p, 'canonical absent');
  else if (p.canonical !== expected) err('canonical', p, `canonical ${p.canonical} (attendu ${expected})`);

  for (const [k, v] of Object.entries(p.og)) {
    if (!v) err('open-graph', p, `og:${k} absent`);
  }
  if (p.og.image && !/^https:\/\//.test(p.og.image)) err('open-graph', p, `og:image non absolue (${p.og.image})`);
  if (p.og.url && p.canonical && p.og.url !== p.canonical) err('open-graph', p, `og:url (${p.og.url}) différent du canonical`);
  if (!p.twitter.card) err('twitter', p, 'twitter:card absent');
  if (!p.twitter.image) err('twitter', p, 'twitter:image absent');
  if (p.twitter.site) err('twitter', p, `twitter:site émis (${p.twitter.site}) alors que le compte n'existe pas`);
}

for (const [title, list] of dup((p) => p.title)) err('title', list[0], `title partagé par ${list.length} pages (${list.map((p) => p.pathname).join(', ')}) : « ${title} »`);
for (const [, list] of dup((p) => p.description)) err('description', list[0], `description partagée par ${list.length} pages (${list.map((p) => p.pathname).join(', ')})`);
for (const [h1, list] of dup((p) => p.h1s[0])) warn('h1-doublon', list[0], `H1 partagé par ${list.map((p) => p.pathname).join(', ')} : « ${h1} »`);

const LINE = '═'.repeat(68);
console.log(`\n${LINE}`);
console.log('  check:head : title, description, h1, canonical, Open Graph');
console.log(`  Pages indexables : ${indexable.length}`);
console.log(LINE);

const group = (list) => list.reduce((acc, e) => ((acc[e.rule] ||= []).push(e.msg), acc), {});
for (const [rule, list] of Object.entries(group(errors))) {
  console.log(`\n[${list.length}] ${rule}`);
  for (const m of VERBOSE ? list : list.slice(0, 5)) console.log(`  ✗ ${m}`);
  if (!VERBOSE && list.length > 5) console.log(`  … et ${list.length - 5} autre(s). Ajoute --report pour tout voir.`);
}
for (const [rule, list] of Object.entries(group(warnings))) {
  console.log(`\n⚠ [${list.length}] ${rule} (avertissement, à corriger dans le contenu)`);
  for (const m of VERBOSE ? list : list.slice(0, 5)) console.log(`  ⚠ ${m}`);
  if (!VERBOSE && list.length > 5) console.log(`  … et ${list.length - 5} autre(s). Ajoute --report pour tout voir.`);
}

console.log(`\n${LINE}`);
if (errors.length > 0) {
  console.log(`✗  ${errors.length} erreur(s) : exit 1`);
  console.log(LINE);
  process.exit(1);
}
console.log(`✓  ${indexable.length} pages : title, description, h1 et canonical présents et cohérents : exit 0`);
console.log(LINE);
