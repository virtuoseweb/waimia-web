#!/usr/bin/env node
// Enregistre et câble les illustrations dessinées par lots (moteur B).
//
// Usage : node scripts/illustrations/appliquer-manifestes.mjs scripts/illustrations/manifest-lot-*.json
//
// Pour chaque entrée { content, drawing, cast, palette, alt_fr, alt_en, tags, side } :
//   1. add-illustration.mjs <drawing> --no-fallback --source claude-svg (registre src/data/illustrations.json) ;
//   2. hero du contenu src/content/<content>.json : `sections[0].illustration` si la page commence
//      par un hero-split-media (guides, comparatifs), sinon `heroIllustration` (blog, outils).
// Le JSON est réécrit au format du dépôt (2 espaces) ; un fichier qui n'avait pas ce format le
// prend, et c'est signalé. Un contenu absent ou un dessin sans WebP arrête tout avant écriture.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const manifestes = process.argv.slice(2);
if (!manifestes.length) { console.error('Usage : appliquer-manifestes.mjs <manifeste.json>...'); process.exit(2); }
const entrees = manifestes.flatMap((m) => JSON.parse(readFileSync(m, 'utf8')));

const src = (d) => `/images/illustrations/ds/${d}-paper.webp`;
const fautes = entrees.flatMap((e) => [
  !existsSync(`src/content/${e.content}.json`) && `contenu absent : ${e.content}`,
  !existsSync(`public${src(e.drawing)}`) && `WebP absent : ${e.drawing}`,
].filter(Boolean));
const dessins = entrees.map((e) => e.drawing);
dessins.forEach((d, i) => { if (dessins.indexOf(d) !== i) fautes.push(`dessin en double : ${d}`); });
if (fautes.length) { console.error(fautes.join('\n')); process.exit(1); }

const registre = JSON.parse(readFileSync('src/data/illustrations.json', 'utf8'));
const connus = new Set((registre.illustrations ?? registre).map((i) => i.slug));
for (const e of entrees) {
  if (!connus.has(e.drawing)) {
    execFileSync('node', ['scripts/illustrations/add-illustration.mjs', e.drawing, '--palette', e.palette, '--cast', e.cast,
      '--drawing', e.drawing, '--source', 'claude-svg', '--no-fallback',
      '--alt-fr', e.alt_fr, '--alt-en', e.alt_en, '--tags', e.tags.join(',')], { stdio: 'inherit' });
  }
  const f = `src/content/${e.content}.json`;
  const texte = readFileSync(f, 'utf8');
  const j = JSON.parse(texte);
  const hero = { src: src(e.drawing), alt_fr: e.alt_fr, alt_en: e.alt_en, side: e.side };
  const s0 = Array.isArray(j.sections) ? j.sections[0] : undefined;
  if (s0?.type === 'hero-split-media') s0.illustration = hero;
  else j.heroIllustration = hero;
  if (JSON.stringify(JSON.parse(texte), null, 2) + '\n' !== texte) console.log(`  format normalisé : ${f}`);
  writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  console.log(`${e.content} ← ${e.drawing}`);
}
