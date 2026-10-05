#!/usr/bin/env node
/**
 * Filtre duotone Waimia : applique la LUT rétro-ingénierée (duotone-lut.json) à une
 * illustration source et écrit les deux variantes du design system.
 *
 *   node scripts/illustrations/duotone.mjs <source.png|jpg|webp> <slug> [--width 1456] [--keep-source]
 *
 * Sorties :
 *   public/images/illustrations/ds/<slug>-paper.webp  (sections paper / paper-2 / paper-3)
 *   public/images/illustrations/ds/<slug>-ink.webp    (sections ink, blocs inversés)
 *   public/images/illustrations/<slug>.webp           (original couleur, avec --keep-source)
 *
 * Mapping : luminance Rec.709 de chaque pixel → couleur de la LUT (256 niveaux).
 * Paper ≈ terracotta #C85130 (noirs) → crème #F7F0E7 (blancs).
 * Ink   ≈ brun encre #100B08 (noirs) → terracotta #BA5032 (gris moyens) → crème (blancs).
 * Le grain de la source est conservé (il passe par la luminance).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// sharp vit dans le store pnpm (dépendance d'astro), même chargeur que scripts/generate-images.mjs.
function loadSharp() {
  let dir = ROOT;
  for (let i = 0; i < 5; i += 1) {
    const direct = join(dir, 'node_modules', 'sharp');
    if (existsSync(direct)) return createRequire(join(direct, 'package.json'))(direct);
    const store = join(dir, 'node_modules', '.pnpm');
    if (existsSync(store)) {
      const entry = readdirSync(store).find((e) => e.startsWith('sharp@'));
      if (entry) {
        const p = join(store, entry, 'node_modules', 'sharp');
        return createRequire(join(p, 'package.json'))(p);
      }
    }
    if (dirname(dir) === dir) break;
    dir = dirname(dir);
  }
  throw new Error('sharp introuvable : lancer `npx -y pnpm@9.15.0 install`');
}
const sharp = loadSharp();
const OUT = join(ROOT, 'public/images/illustrations');
const WEBP = { quality: 82, effort: 6 };

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const [src, slug] = args.filter((a, i) => !a.startsWith('--') && !['--width'].includes(args[i - 1]));

if (!src || !slug || flag('--help')) {
  console.log('Usage : node scripts/illustrations/duotone.mjs <source> <slug> [--width 1456] [--keep-source]');
  process.exit(src && slug ? 0 : 1);
}
if (!existsSync(src)) throw new Error(`Source introuvable : ${src}`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`Slug invalide (kebab-case attendu) : ${slug}`);

const lut = JSON.parse(readFileSync(join(ROOT, 'scripts/illustrations/duotone-lut.json'), 'utf8'));
const width = Number(opt('--width', 1456));

const { data, info } = await sharp(src)
  .resize({ width, withoutEnlargement: true })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (const tone of ['paper', 'ink']) {
  const map = lut[tone];
  const out = Buffer.alloc(data.length);
  for (let p = 0; p < data.length; p += 3) {
    const L = Math.round(0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]);
    const c = map[L];
    out[p] = c[0];
    out[p + 1] = c[1];
    out[p + 2] = c[2];
  }
  const file = join(OUT, 'ds', `${slug}-${tone}.webp`);
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).webp(WEBP).toFile(file);
  console.log(`✓ ${file.replace(ROOT + '/', '')} (${info.width}×${info.height})`);
}

if (flag('--keep-source')) {
  const file = join(OUT, `${slug}.webp`);
  await sharp(src).resize({ width, withoutEnlargement: true }).webp(WEBP).toFile(file);
  console.log(`✓ ${file.replace(ROOT + '/', '')}`);
}
