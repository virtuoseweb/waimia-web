#!/usr/bin/env node
/**
 * check-news.mjs · Gate CI : les actualités (billets `type: "actualite"`) sont publiables comme
 * actualités, de la donnée jusqu'au HTML bâti.
 *
 * Données (src/content/blog) :
 *   1. publishedAt et updatedAt portent l'heure et le fuseau (« 2026-10-24T14:10:00+02:00 »), pas un jour nu ;
 *   2. updatedAt n'est pas antérieur à publishedAt, et aucune des deux n'est dans le futur ;
 *   3. titre court (110 caractères au plus) ;
 *   4. un auteur identifié, avec sa page /equipe/<auteur> dans le build ;
 *   5. une illustration d'au moins 1 200 px de large (en-tête du fichier lu, 0 dépendance).
 * Build (dist/client) :
 *   6. la page de l'actualité émet UN NewsArticle (et aucun Article), dates avec heure ;
 *   7. aucun autre billet /blog/ n'émet de NewsArticle (le balisage ne vaut que pour les actualités) ;
 *   8. /actualites liste chaque actualité ; /actualites/rss.xml porte son texte complet ;
 *   9. /rss.xml et /blog/rss.xml portent le texte complet (content:encoded) ;
 *  10. robots.txt déclare /sitemap-news.xml.
 *
 * Usage : node scripts/check-news.mjs
 * Exit  : 0 propre · 1 erreur(s) · 2 dist/client absent.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, ROOT } from './lib/dist-scan.mjs';

const HEADLINE_MAX = 110;
const IMAGE_MIN_WIDTH = 1200;
const WITH_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/;

const errors = [];
const err = (rule, msg) => errors.push({ rule, msg });

/** Largeur d'un fichier WebP (VP8, VP8L ou VP8X), lue dans l'en-tête. Null si illisible. */
export function webpWidth(buf) {
  if (buf.length < 30 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const kind = buf.toString('ascii', 12, 16);
  if (kind === 'VP8 ') return buf.readUInt16LE(26) & 0x3fff;
  if (kind === 'VP8L') return (buf.readUInt32LE(21) & 0x3fff) + 1;
  if (kind === 'VP8X') return buf.readUIntLE(24, 3) + 1;
  return null;
}

if (!existsSync(DIST)) {
  console.error('check-news : dist/client absent (lancer le build).');
  process.exit(2);
}

const blogDir = join(ROOT, 'src', 'content', 'blog');
const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(blogDir, f), 'utf8')) }));
const news = posts.filter((p) => p.data.type === 'actualite');
const newsSlugs = new Set(news.map((p) => p.data.slug ?? p.file.replace(/\.json$/, '')));
const now = Date.now();

const read = (rel) => (existsSync(join(DIST, rel)) ? readFileSync(join(DIST, rel), 'utf8') : null);

function jsonLdNodes(html) {
  const nodes = [];
  for (const m of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const v = JSON.parse(m[1]);
      for (const n of Array.isArray(v) ? v : v['@graph'] ? v['@graph'] : [v]) nodes.push(n);
    } catch {
      /* un JSON-LD invalide est le sujet de check:jsonld */
    }
  }
  return nodes;
}
const typesOf = (n) => [].concat(n['@type'] ?? []);

if (news.length === 0) {
  err('donnée', 'aucune actualité (type "actualite") : la section /actualites serait vide');
}

const actualites = read('actualites/index.html');
if (actualites === null) err('page', '/actualites absent du build');
const feedNews = read('actualites/rss.xml');
if (feedNews === null) err('flux', '/actualites/rss.xml absent du build');

for (const { file, data } of news) {
  const slug = data.slug ?? file.replace(/\.json$/, '');
  const where = `blog/${slug}`;
  for (const k of ['publishedAt', 'updatedAt']) {
    if (typeof data[k] !== 'string' || !WITH_TIME.test(data[k])) err('date', `${where} : ${k} doit porter l'heure et le fuseau (reçu ${JSON.stringify(data[k])})`);
  }
  const published = Date.parse(data.publishedAt);
  const updated = Date.parse(data.updatedAt);
  if (!Number.isNaN(published) && published > now) err('date', `${where} : publishedAt est dans le futur`);
  if (!Number.isNaN(updated) && updated > now) err('date', `${where} : updatedAt est dans le futur`);
  if (!Number.isNaN(published) && !Number.isNaN(updated) && updated < published) err('date', `${where} : updatedAt antérieur à publishedAt`);
  if ((data.title_fr ?? '').length > HEADLINE_MAX) err('titre', `${where} : titre de ${data.title_fr.length} caractères (max ${HEADLINE_MAX})`);

  if (!data.author) err('auteur', `${where} : auteur absent`);
  else if (!existsSync(join(DIST, 'equipe', data.author, 'index.html'))) err('auteur', `${where} : page auteur /equipe/${data.author} absente du build`);

  const src = data.heroIllustration?.src;
  if (!src) err('image', `${where} : heroIllustration absente (image d'au moins ${IMAGE_MIN_WIDTH} px requise)`);
  else {
    const file = join(ROOT, 'public', src.replace(/^\//, ''));
    if (!existsSync(file)) err('image', `${where} : ${src} introuvable dans public/`);
    else {
      const w = webpWidth(readFileSync(file));
      if (w === null) err('image', `${where} : largeur de ${src} illisible (WebP attendu)`);
      else if (w < IMAGE_MIN_WIDTH) err('image', `${where} : ${src} fait ${w} px de large (min ${IMAGE_MIN_WIDTH})`);
    }
  }

  const html = read(`blog/${slug}/index.html`);
  if (html === null) {
    err('page', `${where} absent du build`);
    continue;
  }
  const nodes = jsonLdNodes(html);
  const newsNodes = nodes.filter((n) => typesOf(n).includes('NewsArticle'));
  const articleNodes = nodes.filter((n) => typesOf(n).includes('Article'));
  if (newsNodes.length !== 1) err('jsonld', `${where} : ${newsNodes.length} NewsArticle émis (1 attendu)`);
  if (articleNodes.length > 0) err('jsonld', `${where} : un Article accompagne le NewsArticle`);
  const n = newsNodes[0];
  if (n) {
    for (const k of ['datePublished', 'dateModified']) {
      if (typeof n[k] !== 'string' || !WITH_TIME.test(n[k])) err('jsonld', `${where} : ${k} du NewsArticle sans heure (${JSON.stringify(n[k])})`);
    }
    if (!n.headline || n.headline.length > HEADLINE_MAX) err('jsonld', `${where} : headline absent ou trop long`);
    if (![].concat(n.image ?? []).length) err('jsonld', `${where} : NewsArticle sans image`);
    if (!n.author || !(n.author.name || n.author['@id'])) err('jsonld', `${where} : NewsArticle sans auteur identifié`);
  }

  if (actualites !== null && !actualites.includes(`/blog/${slug}`)) err('page', `/actualites ne liste pas ${where}`);
  if (feedNews !== null) {
    if (!feedNews.includes(`/blog/${slug}`)) err('flux', `/actualites/rss.xml ne contient pas ${where}`);
  }
}

if (feedNews !== null && news.length > 0 && !/<content:encoded>/.test(feedNews)) err('flux', '/actualites/rss.xml : aucun content:encoded (texte complet absent)');
for (const rel of ['rss.xml', 'blog/rss.xml']) {
  const xml = read(rel);
  if (xml === null) err('flux', `/${rel} absent du build`);
  else if (!/<content:encoded>/.test(xml)) err('flux', `/${rel} : aucun content:encoded (texte complet absent)`);
}

// Le balisage NewsArticle ne vaut que pour les actualités.
const blogOut = join(DIST, 'blog');
if (existsSync(blogOut)) {
  for (const dir of readdirSync(blogOut, { withFileTypes: true })) {
    if (!dir.isDirectory() || newsSlugs.has(dir.name)) continue;
    const html = read(`blog/${dir.name}/index.html`);
    if (html && jsonLdNodes(html).some((n) => typesOf(n).includes('NewsArticle'))) err('jsonld', `blog/${dir.name} émet un NewsArticle sans être une actualité`);
  }
}

const robots = read('robots.txt');
if (robots === null) err('robots', 'robots.txt absent du build');
else if (!/^Sitemap:\s*https:\/\/waimia\.com\/sitemap-news\.xml\s*$/m.test(robots)) err('robots', 'robots.txt ne déclare pas /sitemap-news.xml');

if (errors.length) {
  console.error(`check-news : ${errors.length} erreur(s)`);
  for (const e of errors) console.error(`  [${e.rule}] ${e.msg}`);
  process.exit(1);
}
console.log(`check-news : OK · ${news.length} actualité(s), dates à la minute, NewsArticle seul sur elles, flux texte complet, sitemap news déclaré`);
