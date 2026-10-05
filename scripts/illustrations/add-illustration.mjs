#!/usr/bin/env node
/**
 * Enregistre une illustration déjà produite (public/images/illustrations/ds/<slug>-paper.webp
 * et -ink.webp) dans la bibliothèque src/data/illustrations.json, après contrôle de palette.
 *
 *   node scripts/illustrations/add-illustration.mjs <slug> --palette duotone|tritone \
 *     --alt-fr "Description FR" --alt-en "Description EN" --tags roi,croissance,gain \
 *     [--no-fallback] [--replace] [--source gpt-image-2]
 *
 * --no-fallback : n'entre pas dans le pool automatique de FeatureZigzag.
 * --replace     : écrase l'entrée existante du même slug.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, REGISTRY, loadSharp, parseArgs, checkPalette } from './_lib.mjs';

const { flags, positional } = parseArgs(process.argv.slice(2), ['no-fallback', 'replace']);
const [slug] = positional;
const family = flags.palette ?? 'duotone';
const tags = (flags.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean);
if (!slug || !flags['alt-fr'] || !flags['alt-en'] || tags.length < 3) {
  console.log('Usage : add-illustration.mjs <slug> --palette duotone|tritone --alt-fr "…" --alt-en "…" --tags a,b,c (3 tags min)');
  process.exit(1);
}

const reg = JSON.parse(readFileSync(REGISTRY, 'utf8'));
const idx = reg.illustrations.findIndex((e) => e.slug === slug);
if (idx >= 0 && !flags.replace) throw new Error(`Slug déjà présent : ${slug} (utiliser --replace)`);

const files = {};
for (const tone of ['paper', 'ink']) {
  const rel = `/images/illustrations/ds/${slug}-${tone}.webp`;
  const abs = join(ROOT, 'public', rel);
  if (!existsSync(abs)) {
    if (tone === 'paper') throw new Error(`Fichier manquant : public${rel}`);
    console.warn(`! pas de variante ink : la variante paper sera servie aussi sur fond sombre`);
    continue;
  }
  const r = await checkPalette(abs, `${family}-${tone}`);
  if (!r.pass) throw new Error(`public${rel} non conforme à ${family}-${tone} : ${r.reasons.join(' ; ')}`);
  files[tone] = rel;
}

const { width, height } = await loadSharp()(join(ROOT, 'public', files.paper)).metadata();
const item = {
  slug,
  paper: files.paper,
  ink: files.ink ?? files.paper,
  width,
  height,
  alt_fr: flags['alt-fr'],
  alt_en: flags['alt-en'],
  tags,
  fallback: !flags['no-fallback'],
  palette: family,
  source: flags.source ?? 'gpt-image-2',
};
if (idx >= 0) reg.illustrations[idx] = item;
else reg.illustrations.push(item);
writeFileSync(REGISTRY, `${JSON.stringify(reg, null, 2)}\n`);
console.log(`✓ src/data/illustrations.json : ${slug} (${family}, ${width}×${height}, ${tags.join(', ')})`);
