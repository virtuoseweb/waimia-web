#!/usr/bin/env node
/**
 * Fallback sans GPT : rend une illustration dessinée en SVG (par Claude) dans les palettes
 * Waimia, sans filtre après coup. Le SVG utilise deux sortes de variables :
 *   - rôles de composition (recommandé) : {{field}} fond · {{ground}} sol / second plan ·
 *     {{shape}} grande forme · {{subject}} sujet, silhouettes · {{detail}} petits éléments.
 *     La distribution (--cast, cf style.json `casts`) décide quelle couleur tient chaque rôle :
 *     le bleu peut être le fond, le sol, le sujet ou une simple touche ; un rôle peut aussi
 *     être un dégradé en bandes (gradient:<de>:<à>).
 *   - tons fixes : {{shadow}} {{deep}} {{mid}} {{soft}} {{pale}} {{light}} {{blue}}.
 * Les tons correspondent aux mêmes niveaux de luminance en paper et en ink : un seul dessin
 * donne les deux variantes. Un grain risographie (bruit de luminance déterministe) est ajouté.
 *
 *   node scripts/illustrations/render-svg.mjs scripts/illustrations/svg/<slug>.svg <slug> \
 *     [--cast terracotta-plein|creme-aere|contre-jour|degrade-aube|ciel-bleu|touche-bleue|objet-bleu|sol-bleu|degrade-bleu] \
 *     [--grain 0.045] [--out-dir dir]
 *
 * Sorties : public/images/illustrations/ds/<slug>-paper.webp et <slug>-ink.webp, puis
 * palette-check sur chacune. Format attendu du SVG : viewBox 0 0 1456 624.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, STYLE, loadSharp, parseArgs, checkPalette } from './_lib.mjs';

const ROLES = {
  paper: { shadow: '#C85130', deep: '#D16E52', mid: '#D98970', soft: '#E5B4A2', pale: '#EDD3C5', light: '#F7F0E7', blue: '#75B0D7' },
  ink: { shadow: '#100B08', deep: '#542517', mid: '#943C23', soft: '#D1785E', pale: '#E5B5A3', light: '#F8EFE5', blue: '#75B0D7' },
};

const { flags, positional } = parseArgs(process.argv.slice(2));
const [src, slug] = positional;
const castName = flags.cast ?? STYLE.default_cast[flags.palette ?? 'duotone'];
const cast = STYLE.casts[castName];
if (!cast) throw new Error(`Distribution inconnue : ${castName} (voir style.json casts)`);
const family = cast.family;
const outDir = flags['out-dir'] ?? join(ROOT, 'public/images/illustrations/ds');
const grain = Number(flags.grain ?? 0.045);
if (!src || !slug) {
  console.log('Usage : render-svg.mjs <file.svg> <slug> [--cast <distribution>] [--grain 0.045] [--out-dir dir]');
  process.exit(1);
}
const svg = readFileSync(src, 'utf8');
const COMPOSITION = ['field', 'ground', 'shape', 'subject', 'detail'];
const usesBlue = svg.includes('{{blue}}') || Object.values(cast.map).some((v) => v.includes('blue'));
if (family === 'duotone' && usesBlue) throw new Error('bleu utilisé dans une distribution duotone');

const sharp = loadSharp();
let ok = true;
for (const tone of ['paper', 'ink']) {
  // Dégradés en bandes (4 aplats + 1, façon risographie) pour les rôles `gradient:a:b`.
  const grads = [];
  const resolve = (role) => {
    if (COMPOSITION.includes(role)) {
      const v = cast.map[role];
      if (v.startsWith('gradient:')) {
        const [, a, b] = v.split(':');
        const id = `wm-grad-${role}`;
        if (!grads.some((g) => g.includes(id))) {
          const mix = (t) => {
            const [ha, hb] = [ROLES[tone][a], ROLES[tone][b]].map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)));
            return `#${ha.map((c, i) => Math.round(c + (hb[i] - c) * t).toString(16).padStart(2, '0')).join('')}`;
          };
          const stops = [0, 1, 2, 3, 4].map((k) => `<stop offset="${k * 20}%" stop-color="${mix(k / 4)}"/><stop offset="${(k + 1) * 20}%" stop-color="${mix(k / 4)}"/>`).join('');
          grads.push(`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">${stops}</linearGradient>`);
        }
        return `url(#${id})`;
      }
      return ROLES[tone][v];
    }
    if (!ROLES[tone][role]) throw new Error(`Rôle inconnu : ${role}`);
    return ROLES[tone][role];
  };
  let out = svg.replace(/\{\{(\w+)\}\}/g, (_, r) => resolve(r));
  if (grads.length) out = out.replace(/(<svg[^>]*>)/, `$1<defs>${grads.join('')}</defs>`);
  const file = join(outDir, `${slug}-${tone}.webp`);
  const { data, info } = await sharp(Buffer.from(out), { density: 144 })
    .resize({ width: 1456 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Grain risographie : bruit de luminance fin et déterministe (même amplitude sur R, G, B,
  // donc la teinte ne bouge pas), plus marqué dans les tons moyens comme sur une sérigraphie.
  let seed = 7;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const amp = grain * 255;
  // Cellules de 2×2 px : grain de trame plus réaliste et bien plus compressible (≈ poids
  // des illustrations existantes) qu'un bruit pixel par pixel.
  const { width: W, height: H } = info;
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      const r = (rand() - 0.5) * 2 * amp;
      for (let dy = 0; dy < 2 && y + dy < H; dy += 1) {
        for (let dx = 0; dx < 2 && x + dx < W; dx += 1) {
          const p = ((y + dy) * W + x + dx) * 3;
          const L = (data[p] + data[p + 1] + data[p + 2]) / 765;
          const n = r * (0.45 + Math.sin(Math.PI * L) * 0.55);
          for (let c = 0; c < 3; c += 1) data[p + c] = Math.max(0, Math.min(255, data[p + c] + n));
        }
      }
    }
  }
  await sharp(data, { raw: info }).webp({ quality: 78, effort: 6 }).toFile(file);
  const r = await checkPalette(file, `${family}-${tone}`);
  ok &&= r.pass;
  console.log(`${r.pass ? '✓' : '✗'} ${file.replace(ROOT + '/', '')} [${castName}] · ΔE ${r.meanDeltaE.toFixed(1)} · couverture ${(r.coverage * 100).toFixed(0)} %${family === 'tritone' ? ` · bleu ${(r.blueShare * 100).toFixed(0)} %` : ''}${r.reasons.length ? ` · ${r.reasons.join(' ; ')}` : ''}`);
}
process.exit(ok ? 0 : 2);
