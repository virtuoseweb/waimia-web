// Utilitaires partagés des scripts illustrations (skill waimia-illustration).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const STYLE = JSON.parse(readFileSync(join(ROOT, 'scripts/illustrations/style.json'), 'utf8'));
export const REGISTRY = join(ROOT, 'src/data/illustrations.json');

/** sharp vit dans le store pnpm (dépendance d'astro) : même chargeur que scripts/generate-images.mjs. */
export function loadSharp() {
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

export function parseArgs(argv, booleans = []) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (!a.startsWith('--')) positional.push(a);
    else if (booleans.includes(a.slice(2))) flags[a.slice(2)] = true;
    else flags[a.slice(2)] = argv[(i += 1)];
  }
  return { flags, positional };
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

function toLab([r, g, b]) {
  const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const x = f((0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047);
  const y = f(0.2126 * R + 0.7152 * G + 0.0722 * B);
  const z = f((0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

/**
 * Mesure la conformité d'une image à une palette de style.json.
 * Retourne { meanDeltaE, coverage, blueShare, pass, reasons[] }.
 */
export async function checkPalette(file, paletteName) {
  const pal = STYLE.palettes[paletteName];
  if (!pal) throw new Error(`Palette inconnue : ${paletteName}`);
  const { check } = STYLE;
  const sharp = loadSharp();
  // Famille bleue = le bleu et ses teintes (canal bleu nettement au-dessus du rouge).
  const anchors = [...Object.values(pal.colors), ...pal.tints].map((h) => { const [r, , b] = hex(h); return { h, lab: toLab(hex(h)), blue: b - r > 20 }; });
  const blueLab = pal.colors.cyan ? toLab(hex(pal.colors.cyan)) : null;
  const { data } = await sharp(file).resize({ width: 364 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let sum = 0;
  let near = 0;
  let blue = 0;
  const n = data.length / 3;
  for (let p = 0; p < data.length; p += 3) {
    const lab = toLab([data[p], data[p + 1], data[p + 2]]);
    let best = Infinity;
    let bestIsBlue = false;
    for (const a of anchors) {
      const d = Math.hypot(lab[0] - a.lab[0], lab[1] - a.lab[1], lab[2] - a.lab[2]);
      if (d < best) { best = d; bestIsBlue = Boolean(blueLab) && a.blue; }
    }
    sum += best;
    if (best < 12) near += 1;
    if (bestIsBlue && best < 12) blue += 1;
  }
  const meanDeltaE = sum / n;
  const coverage = near / n;
  const blueShare = blue / n;
  const reasons = [];
  if (meanDeltaE > check.max_mean_delta_e) reasons.push(`ΔE moyen ${meanDeltaE.toFixed(1)} > ${check.max_mean_delta_e}`);
  if (coverage < check.min_coverage) reasons.push(`couverture palette ${(coverage * 100).toFixed(0)} % < ${check.min_coverage * 100} %`);
  if (blueLab && blueShare < check.cyan_min_share) reasons.push(`bleu ${(blueShare * 100).toFixed(0)} % < ${check.cyan_min_share * 100} %`);
  if (blueLab && blueShare > check.cyan_max_share) reasons.push(`bleu ${(blueShare * 100).toFixed(0)} % > ${check.cyan_max_share * 100} %`);
  return { meanDeltaE, coverage, blueShare, pass: reasons.length === 0, reasons };
}
