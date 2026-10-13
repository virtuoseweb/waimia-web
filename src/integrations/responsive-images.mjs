/**
 * Astro integration : images responsives posées APRÈS le build, sur le HTML généré.
 *
 * Les ~3 000 <img> du site pointent des fichiers de public/images et public/logos servis tels
 * quels (1 536 px pour une vignette de 280 px). Plutôt que de réécrire chaque usage, cette passe
 * relit chaque .html de la sortie client et, pour chaque <img> local raster (webp/png/jpg) :
 *   1. pose width/height intrinsèques s'ils manquent (lus avec sharp ; aucun CLS). Mesuré sur
 *      les 175 pages × 3 viewports : aucune boîte d'image ne change (la CSS fixe la taille
 *      affichée, les attributs ne fournissent que le ratio) ;
 *   2. génère des variantes webp plus étroites que la source (LADDER) et pose srcset + sizes.
 *      `sizes` vient de responsive-images-sizes.json, mesuré sur la mise en page réelle par
 *      scripts/measure-image-sizes.mjs (clé = classes, cf imageKey ; largeur effective, recadrage
 *      object-fit: cover compris) ; il remplace un `sizes` d'auteur, qui sans srcset n'avait
 *      aucun effet ; clé inconnue → `sizes` d'auteur s'il existe, sinon DEFAULT_SIZES (100vw) ;
 *   3. chargement : `fetchpriority="high"` sur la PREMIÈRE image `loading="eager"` de <main>
 *      (les héros portent déjà eager ; la première img de <main> est, sur 22 pages, à 2 000 à
 *      8 000 px de haut, d'où ce critère), `loading="lazy"` sur toute img sans attribut
 *      loading, `decoding="async"` partout où il manque. Un eager existant n'est jamais retiré.
 * Ne touche pas : SVG, img déjà munies de srcset, img dans <picture>, sources distantes.
 *
 * Variantes : /_astro/i/<empreinte>-<largeur>.webp (en-tête immutable déjà servi sur /_astro/),
 * empreinte = sha1(contenu source + paramètres). Cache entre builds dans
 * node_modules/.cache/responsive-images (hors dist), donc un build à chaud ne réencode rien.
 *
 * Ordre : cette intégration est déclarée dans astro.config.mjs ; l'adapter Vercel ajoute sa
 * copie dist/client → .vercel/output/static EN DERNIER (integration « astro:copy-vercel-output »
 * injectée par updateConfig, donc en fin de liste) : les fichiers modifiés ici sont copiés.
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const LADDER = [160, 320, 480, 800, 1200];
const QUALITY = 78;
const DEFAULT_SIZES = '100vw';
const OUT_DIR = '_astro/i';
const PARAMS = `webp-q${QUALITY}-v1`;

// Classes d'état posées à l'exécution (reveal, menus) : hors clé, pour que la clé calculée sur
// le HTML statique égale celle mesurée dans le navigateur.
const RUNTIME_CLASS = /^(reveal|is-|s-|in$|lift$)/;
const normClass = (c) =>
  (c || '')
    .split(/\s+/)
    .filter((x) => x && !RUNTIME_CLASS.test(x))
    .sort()
    .join('.');

/**
 * Clé de mise en page d'une image : sa classe, sinon celles des deux ancêtres classés les plus proches.
 * @param {string} own @param {string[]} ancestors du parent vers la racine
 */
export function imageKey(own, ancestors) {
  const o = normClass(own);
  if (o) return o;
  return '^' + ancestors.map(normClass).filter(Boolean).slice(0, 2).join('<');
}

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);
const TAG = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>/g;
const attr = (attrs, name) => {
  const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i').exec(attrs);
  return m ? (m[1] ?? m[2] ?? m[3]) : null;
};
const has = (attrs, name) => new RegExp(`\\s${name}(?:\\s*=|\\s|$)`, 'i').test(attrs);
// Toute source raster locale reçoit dimensions, lazy et decoding ; seules /images et /logos
// reçoivent des variantes (les favicons de la racine ont déjà leurs tailles dédiées).
const LOCAL = /^\/(?!\/)[^?#"]+\.(webp|png|jpe?g)$/i;
const VARIANTS = /^\/(images|logos)\//;

/** Parcourt le HTML et rend chaque <img> avec son contexte (pile des éléments ouverts). */
function scanImages(html) {
  const out = [];
  const stack = [];
  TAG.lastIndex = 0;
  let m;
  while ((m = TAG.exec(html))) {
    if (m[0].startsWith('<!--')) continue;
    const [, close, rawName, attrs, selfClose] = m;
    const name = rawName.toLowerCase();
    if (close) {
      const i = stack.findLastIndex((e) => e.name === name);
      if (i >= 0) stack.length = i;
      continue;
    }
    if (name === 'img') {
      out.push({
        start: m.index,
        end: m.index + m[0].length,
        attrs,
        selfClose,
        ancestors: stack.slice().reverse().map((e) => e.cls),
        inMain: stack.some((e) => e.name === 'main'),
        inPicture: stack.some((e) => e.name === 'picture'),
      });
      continue;
    }
    if (RAW.has(name)) {
      const endRe = new RegExp(`</${name}`, 'ig');
      endRe.lastIndex = TAG.lastIndex;
      const end = endRe.exec(html);
      TAG.lastIndex = end ? end.index : html.length;
      continue;
    }
    if (VOID.has(name) || selfClose) continue;
    stack.push({ name, cls: attr(attrs, 'class') || '' });
  }
  return out;
}

/**
 * Largeur proche du cran `t` (± 12 px) dont la hauteur proportionnelle tombe au plus près d'un
 * entier. Une variante garde ainsi le ratio exact de la source : sans cela, la hauteur arrondie
 * par l'encodeur (480 × 205,71 → 206) change le ratio naturel retenu par le navigateur une fois
 * l'image chargée, et décale de ~0,2 px tout ce qui suit.
 */
function exactWidth(t, W, H) {
  let best = t;
  let err = 1;
  for (let w = Math.max(1, t - 12); w <= Math.min(W - 1, t + 12); w++) {
    const h = (w * H) / W;
    const e = Math.abs(h - Math.round(h)) + Math.abs(w - t) * 1e-4;
    if (e < err) { err = e; best = w; }
  }
  return best;
}

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) await fn(items[i++]);
  }));
}

/** @param {{ root?: string }} [options] */
export default function responsiveImages({ root = process.cwd() } = {}) {
  return {
    name: 'responsive-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const t0 = Date.now();
        // sharp est une dépendance d'astro (pnpm strict : résolu depuis astro, pas depuis le projet).
        const req = createRequire(createRequire(path.join(root, 'package.json')).resolve('astro/package.json'));
        const sharp = req('sharp');
        const distDir = fileURLToPath(dir);
        const cacheDir = path.join(root, 'node_modules/.cache/responsive-images');
        await fs.mkdir(cacheDir, { recursive: true });
        await fs.mkdir(path.join(distDir, OUT_DIR), { recursive: true });
        const sizesPath = path.join(root, 'src/integrations/responsive-images-sizes.json');
        /** @type {Record<string,string>} */
        const sizesMap = existsSync(sizesPath) ? JSON.parse(readFileSync(sizesPath, 'utf8')) : {};

        const htmlFiles = [];
        const walk = async (d) => {
          for (const e of await fs.readdir(d, { withFileTypes: true })) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) {
              if (p !== path.join(distDir, '_astro')) await walk(p);
            } else if (e.name.endsWith('.html')) htmlFiles.push(p);
          }
        };
        await walk(distDir);

        // 1. Sources : dimensions + empreinte (une lecture par fichier).
        /** @type {Map<string, {w:number,h:number,hash:string,file:string,ext:string}|null>} */
        const sources = new Map();
        const docs = [];
        for (const file of htmlFiles) {
          const html = await fs.readFile(file, 'utf8');
          const imgs = scanImages(html).filter((i) => {
            const src = attr(i.attrs, 'src');
            return src && LOCAL.test(src) && !has(i.attrs, 'srcset') && !i.inPicture;
          });
          if (!imgs.length) continue;
          for (const i of imgs) sources.set(attr(i.attrs, 'src'), null);
          docs.push({ file, html, imgs });
        }
        await pool([...sources.keys()], 8, async (src) => {
          const file = path.join(distDir, src);
          if (!existsSync(file)) return;
          const buf = await fs.readFile(file);
          const meta = await sharp(buf).metadata();
          const rotated = (meta.orientation ?? 1) >= 5;
          sources.set(src, {
            w: rotated ? meta.height : meta.width,
            h: rotated ? meta.width : meta.height,
            bytes: buf.length,
            hash: createHash('sha1').update(buf).update(PARAMS).digest('hex').slice(0, 10),
            file,
            src,
            ext: path.extname(src).toLowerCase(),
          });
        });

        // 2. Variantes (cache disque, puis copie dans dist).
        const variantsOf = (s) => {
          if (!VARIANTS.test(s.src)) return [];
          const ws = LADDER.filter((w) => w < s.w).map((t) => exactWidth(t, s.w, s.h));
          // Source non webp : sa pleine largeur est aussi proposée en webp.
          if (s.ext !== '.webp') ws.push(s.w);
          return ws;
        };
        const jobs = [];
        for (const s of sources.values()) if (s) for (const w of variantsOf(s)) jobs.push({ s, w });
        let encoded = 0;
        let dropped = 0;
        /** @type {Map<object, number[]>} variantes retenues par source */
        const kept = new Map();
        await pool(jobs, 6, async ({ s, w }) => {
          const name = `${s.hash}-${w}.webp`;
          const cached = path.join(cacheDir, name);
          if (!existsSync(cached)) {
            const out = await sharp(s.file).rotate().resize({ width: w }).webp({ quality: QUALITY, effort: 4 }).toBuffer();
            await fs.writeFile(cached, out);
            encoded++;
          }
          // Une source déjà très compressée peut peser MOINS que sa variante réduite : une
          // variante à plus de 90 % du poids de la source est écartée (la source la remplace).
          if (s.ext === '.webp' && (await fs.stat(cached)).size >= 0.9 * s.bytes) {
            dropped++;
            return;
          }
          await fs.copyFile(cached, path.join(distDir, OUT_DIR, name));
          kept.set(s, [...(kept.get(s) ?? []), w]);
        });

        // 3. Réécriture des balises.
        const stats = { pages: 0, imgs: 0, dims: 0, srcset: 0, lazy: 0, high: 0, keyMiss: new Set() };
        for (const doc of docs) {
          let html = doc.html;
          let highDone = scanImages(html).some((i) => has(i.attrs, 'fetchpriority'));
          // Fin → début : les index restent valides.
          const edits = [];
          for (const img of doc.imgs) {
            const src = attr(img.attrs, 'src');
            const s = sources.get(src);
            if (!s) continue;
            let a = img.attrs;
            const add = (k, v) => (a += ` ${k}="${v}"`);
            const w = attr(a, 'width');
            const h = attr(a, 'height');
            if (!w || !h) {
              if (!w && !h) { add('width', s.w); add('height', s.h); }
              else if (w) add('height', Math.round((Number(w) * s.h) / s.w));
              else add('width', Math.round((Number(h) * s.w) / s.h));
              stats.dims++;
            }
            const ws = (kept.get(s) ?? []).sort((x, y) => x - y);
            if (ws.length) {
              const cands = ws.map((vw) => `/${OUT_DIR}/${s.hash}-${vw}.webp ${vw}w`);
              if (s.ext === '.webp') cands.push(`${src} ${s.w}w`);
              add('srcset', cands.join(', '));
              // La mesure prime sur un `sizes` d'auteur : écrit sans srcset, il n'avait aucun
              // effet et n'a jamais été vérifié (fz__img : 50vw écrit, 65vw mesuré).
              const key = imageKey(attr(a, 'class') || '', img.ancestors);
              const sz = sizesMap[key];
              if (sz) {
                a = a.replace(/\ssizes\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+)/i, '');
                add('sizes', sz);
              } else if (!has(a, 'sizes')) {
                stats.keyMiss.add(key);
                add('sizes', DEFAULT_SIZES);
              }
              stats.srcset++;
            }
            const loading = (attr(a, 'loading') || '').toLowerCase();
            if (!loading) { add('loading', 'lazy'); stats.lazy++; }
            if (loading === 'eager' && img.inMain && !highDone && !has(a, 'fetchpriority')) {
              add('fetchpriority', 'high');
              highDone = true;
              stats.high++;
            }
            if (!has(a, 'decoding')) add('decoding', 'async');
            stats.imgs++;
            edits.push({ start: img.start, end: img.end, text: `<img${a}${img.selfClose ? ' /' : ''}>` });
          }
          for (const e of edits.reverse()) html = html.slice(0, e.start) + e.text + html.slice(e.end);
          if (edits.length) {
            await fs.writeFile(doc.file, html);
            stats.pages++;
          }
        }
        logger.info(
          `${stats.pages} pages, ${stats.imgs} img : ${stats.dims} dimensions posées, ${stats.srcset} srcset, ` +
            `${stats.lazy} lazy, ${stats.high} fetchpriority ; ${sources.size} sources, ${jobs.length} variantes ` +
            `(${encoded} encodées, ${jobs.length - encoded} en cache, ${dropped} écartées car pas plus légères) en ${((Date.now() - t0) / 1000).toFixed(1)} s`,
        );
        if (stats.keyMiss.size) logger.info(`sizes par défaut (${DEFAULT_SIZES}) pour : ${[...stats.keyMiss].join(' | ')}`);
      },
    },
  };
}
