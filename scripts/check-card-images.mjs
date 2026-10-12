#!/usr/bin/env node
/**
 * check-card-images.mjs · Unicité et existence des images de cartes des hubs de contenu.
 *
 * Lit le HTML BUILDÉ (dist/client) de /blog, /ressources, /ressources/outils,
 * /ressources/comparatifs et /ressources/guides, extrait l'image de chaque carte
 * (`a.article-card > img`) et compte :
 *   - les doublons exacts de fichier (src identique sur une même page) ;
 *   - les doublons de DESSIN (deux variantes de couleur d'un même dessin : clé `drawing` de
 *     src/data/illustrations.json, sinon le nom de fichier sans suffixe -paper/-ink) ;
 *   - les cartes sans image ;
 *   - les fichiers pointés qui n'existent pas dans dist.
 * Sortie 1 si un doublon, une carte sans image ou un fichier manquant est trouvé.
 *
 * Usage : node scripts/check-card-images.mjs [--root dist/client] [--report]
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const argv = process.argv.slice(2);
const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def;
};
const ROOT = resolve(opt('root', 'dist/client'));
const PAGES = ['/blog', '/ressources', '/ressources/outils', '/ressources/comparatifs', '/ressources/guides'];

const library = JSON.parse(readFileSync(resolve('src/data/illustrations.json'), 'utf8')).illustrations;
const drawingBySrc = new Map();
for (const ill of library) {
  const key = ill.drawing ?? ill.slug;
  drawingBySrc.set(ill.paper, key);
  drawingBySrc.set(ill.ink, key);
}
// Hors bibliothèque : nom de fichier sans suffixe de fond.
const drawingOf = (src) =>
  drawingBySrc.get(src) ?? src.split('/').pop().replace(/\.(webp|png|jpg|svg)$/i, '').replace(/-(paper|ink)$/, '');

function htmlFor(page) {
  for (const f of [join(ROOT, page, 'index.html'), join(ROOT, `${page}.html`)]) {
    if (existsSync(f)) return readFileSync(f, 'utf8');
  }
  return null;
}

let bad = 0;
for (const page of PAGES) {
  const html = htmlFor(page);
  if (html === null) {
    console.log(`${page} : page absente du build`);
    bad++;
    continue;
  }
  // Les cartes : <a class="article-card" href="..."> ... </a> (pas de <a> imbriqué).
  const cards = [...html.matchAll(/<a\b[^>]*class="[^"]*\barticle-card\b[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => {
    const tag = m[0].slice(0, m[0].indexOf('>') + 1);
    const href = (tag.match(/href="([^"]*)"/) ?? [])[1] ?? '?';
    const src = (m[1].match(/<img\b[^>]*\bsrc="([^"]*)"/) ?? [])[1];
    return { href, src };
  });
  const noImg = cards.filter((c) => !c.src);
  const byFile = new Map();
  const byDrawing = new Map();
  for (const c of cards) {
    if (!c.src) continue;
    byFile.set(c.src, [...(byFile.get(c.src) ?? []), c.href]);
    const d = drawingOf(c.src);
    byDrawing.set(d, [...(byDrawing.get(d) ?? []), c.href]);
  }
  const dupFile = [...byFile].filter(([, h]) => h.length > 1);
  const dupDraw = [...byDrawing].filter(([, h]) => h.length > 1);
  const missing = [...byFile.keys()].filter((s) => !existsSync(join(ROOT, s.split('?')[0])));
  console.log(
    `${page.padEnd(26)} cartes=${String(cards.length).padStart(2)} sans-image=${noImg.length} ` +
      `doublons-fichier=${dupFile.length} doublons-dessin=${dupDraw.length} fichiers-manquants=${missing.length}`,
  );
  if (argv.includes('--report') || dupFile.length || dupDraw.length || noImg.length || missing.length) {
    for (const [s, h] of dupFile) console.log(`    fichier x${h.length} ${s} <- ${h.join(', ')}`);
    for (const [d, h] of dupDraw) if (!dupFile.some(([s]) => drawingOf(s) === d)) console.log(`    dessin  x${h.length} ${d} <- ${h.join(', ')}`);
    for (const c of noImg) console.log(`    sans image ${c.href}`);
    for (const s of missing) console.log(`    manquant ${s}`);
  }
  if (cards.length === 0) bad++;
  bad += dupFile.length + dupDraw.length + noImg.length + missing.length;
}
if (bad > 0) {
  console.error(`check-card-images : ${bad} défaut(s).`);
  process.exit(1);
}
console.log('check-card-images : OK (0 doublon, 0 carte sans image, 0 fichier manquant).');
