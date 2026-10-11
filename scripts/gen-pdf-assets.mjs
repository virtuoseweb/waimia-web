#!/usr/bin/env node
/**
 * Génère src/lib/pdf/assets.generated.ts : polices (TTF statiques, base64) et illustrations
 * (JPEG, base64) du rapport PDF des outils. Aucune lecture de fichier à l'exécution sur Vercel :
 * tout vit dans le module, donc dans le bundle de la fonction.
 *
 * Polices : src/lib/pdf/fonts/*.ttf (produites hors ligne par scripts/pdf-assets/build-fonts.py
 * depuis les WOFF2 du site, commitées).
 * Illustrations : public/images/illustrations/ds/outil-<slug>-print.jpg (lot A, 1456×624) si le
 * fichier existe ; SINON repli TEMPORAIRE sur une illustration existante du site, recadrée au
 * même ratio par sharp (la mise en page ne change pas quand le fichier définitif arrive).
 * Relancer ce script après l'arrivée des fichiers du lot A :
 *   node scripts/gen-pdf-assets.mjs
 * Reproductible : même entrée, même sortie (aucun horodatage écrit).
 */
import { createRequire } from 'node:module';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
// sharp n'est pas hoisté par pnpm : on le résout depuis astro, qui en dépend.
const sharp = require(require.resolve('sharp', { paths: [require.resolve('astro')] }));

const FONTS = {
  serif: 'InstrumentSerif-Regular.ttf',
  serifItalic: 'InstrumentSerif-Italic.ttf',
  sans: 'InterTight-Regular.ttf',
  sansMedium: 'InterTight-Medium.ttf',
  sansBold: 'InterTight-SemiBold.ttf',
  mono: 'JetBrainsMono-Regular.ttf',
  monoBold: 'JetBrainsMono-SemiBold.ttf',
};

const ILLU_DIR = join(ROOT, 'public/images/illustrations/ds');
const ILLUSTRATIONS = {
  diagnostic: { final: 'outil-diagnostic-maturite-ia-print.jpg', fallback: 'chess-paper.webp' },
  roi: { final: 'outil-calculateur-roi-ia-print.jpg', fallback: 'roi-automatisation-v3-peson-paper.webp' },
};
// Ratio des fichiers du lot A (1456×624), rendu à 1200 px de large (≈ 170 dpi sur la colonne A4).
const W = 1200;
const H = Math.round((W * 624) / 1456);

const out = [];
out.push('// FICHIER GÉNÉRÉ par scripts/gen-pdf-assets.mjs : ne pas éditer à la main.');
out.push('// Polices et illustrations du rapport PDF, encodées en base64 (aucune lecture de fichier à l\'exécution).');
out.push('/* eslint-disable */');

const fontLines = [];
for (const [key, file] of Object.entries(FONTS)) {
  const buf = readFileSync(join(ROOT, 'src/lib/pdf/fonts', file));
  fontLines.push(`  ${key}: '${buf.toString('base64')}',`);
  console.log(`police ${key} : ${file} (${buf.length} octets)`);
}
out.push('export const PDF_FONTS = {');
out.push(...fontLines);
out.push('} as const;');

const imgLines = [];
for (const [key, { final, fallback }] of Object.entries(ILLUSTRATIONS)) {
  const finalPath = join(ILLU_DIR, final);
  const useFinal = existsSync(finalPath);
  const src = useFinal ? finalPath : join(ILLU_DIR, fallback);
  const buf = await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .flatten({ background: '#F6F1E8' })
    .jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
  imgLines.push(`  ${key}: { width: ${W}, height: ${H}, source: '${useFinal ? final : `${fallback} (repli temporaire)`}', jpeg: '${buf.toString('base64')}' },`);
  console.log(`illustration ${key} : ${useFinal ? final : `REPLI ${fallback}`} (${buf.length} octets)`);
}
out.push('export const PDF_IMAGES = {');
out.push(...imgLines);
out.push('} as const;');

writeFileSync(join(ROOT, 'src/lib/pdf/assets.generated.ts'), out.join('\n') + '\n');
console.log('écrit : src/lib/pdf/assets.generated.ts');
