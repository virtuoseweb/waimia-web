#!/usr/bin/env node
/**
 * Vérifie qu'une illustration respecte une palette Waimia (style.json).
 *   node scripts/illustrations/palette-check.mjs <image> <duotone-paper|duotone-ink|tritone-paper|tritone-ink>
 * Code de sortie 0 = conforme, 2 = non conforme (=> régénérer, ne pas filtrer).
 */
import { checkPalette, parseArgs } from './_lib.mjs';

const { positional } = parseArgs(process.argv.slice(2));
const [file, palette] = positional;
if (!file || !palette) {
  console.log('Usage : palette-check.mjs <image> <palette>');
  process.exit(1);
}
const r = await checkPalette(file, palette);
console.log(`${r.pass ? '✓' : '✗'} ${file} [${palette}] ΔE moyen ${r.meanDeltaE.toFixed(1)} · couverture ${(r.coverage * 100).toFixed(0)} %${palette.startsWith('tritone') ? ` · bleu ${(r.blueShare * 100).toFixed(0)} %` : ''}${r.reasons.length ? ` · ${r.reasons.join(' ; ')}` : ''}`);
process.exit(r.pass ? 0 : 2);
