#!/usr/bin/env node
/**
 * measure-image-sizes.mjs · Dérive l'attribut `sizes` des images depuis la mise en page RÉELLE.
 *
 * Sert un build (scripts/serve-dist.mjs) puis, sur chaque page et 6 largeurs de viewport,
 * mesure la largeur affichée (offsetWidth, hors transform ; en object-fit: cover, largeur de
 * l'image recadrée) de chaque <img> local raster.
 * Les images sont regroupées par CLÉ DE CLASSE (même calcul que src/integrations/responsive-images.mjs) :
 * classe de l'img, sinon classes des deux ancêtres classés les plus proches. Pour chaque clé,
 * on retient le RATIO MAXIMAL largeur/viewport par tranche (mobile, tablette, bureau), majoré
 * de 5 % puis arrondi au 5 vw supérieur : le `sizes` sur-estime plutôt que de flouter.
 *
 * Sortie : src/integrations/responsive-images-sizes.json (versionné, relu à chaque build).
 * À relancer quand une mise en page d'images change :
 *   node scripts/serve-dist.mjs --root dist/client --port 4400 &
 *   node scripts/measure-image-sizes.mjs --base http://localhost:4400 --root dist/client
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { imageKey } from '../src/integrations/responsive-images.mjs';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : d);
const BASE = opt('base', 'http://localhost:4400');
const ROOT = path.resolve(opt('root', 'dist/client'));
const OUT = path.resolve(opt('out', 'src/integrations/responsive-images-sizes.json'));

// Tranches du `sizes` émis : ≤ 768 px, ≤ 1280 px, au-delà. Chaque tranche prend le maximum de
// ses viewports ET de ceux qui la bordent (une bascule de grille entre deux mesures reste couverte).
const VIEWPORTS = [390, 768, 1024, 1280, 1440, 1920];
const BANDS = [
  { media: '(max-width: 768px)', from: [390, 768, 1024] },
  { media: '(max-width: 1280px)', from: [768, 1024, 1280, 1440] },
  { media: null, from: [1280, 1440, 1920] },
];

const routes = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') routes.push('/' + path.relative(ROOT, d).split(path.sep).join('/'));
  }
};
walk(ROOT);

const browser = await chromium.launch();
/** @type {Record<string, Record<number, number>>} */
const ratios = {};
async function run(route, vw) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: 900 } });
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const rows = await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')].filter((i) =>
        /^\/(images|logos)\/[^?#]+\.(webp|png|jpe?g)$/i.test(i.getAttribute('src') || ''),
      );
      imgs.forEach((i) => (i.loading = 'eager'));
      await Promise.race([
        Promise.all(imgs.map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r))))),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
      // Classes STATIQUES : on retire celles qu'un script ajoute à l'exécution (reveal → `in`).
      const chain = (i) => {
        const out = [];
        for (let e = i; e; e = e.parentElement) out.push(e.getAttribute('class') || '');
        return out;
      };
      // Largeur EFFECTIVE de l'image : en object-fit: cover, une image plus large que son cadre
      // est mise à l'échelle sur la hauteur, puis recadrée. Elle s'affiche donc plus large
      // que la boîte, d'où h × ratio naturel.
      const eff = (i) => {
        const w = i.offsetWidth;
        const h = i.offsetHeight;
        if (getComputedStyle(i).objectFit !== 'cover' || !i.naturalWidth || !h) return w;
        return Math.max(w, (h * i.naturalWidth) / i.naturalHeight);
      };
      return imgs.map((i) => ({ chain: chain(i), w: eff(i) }));
    });
    for (const r of rows) {
      const key = imageKey(r.chain[0], r.chain.slice(1));
      const o = (ratios[key] ??= {});
      o[vw] = Math.max(o[vw] ?? 0, r.w / vw);
    }
  } catch (e) {
    console.error(route, vw, e.message);
  }
  await ctx.close();
}
const jobs = routes.flatMap((r) => VIEWPORTS.map((vw) => [r, vw]));
let next = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (next < jobs.length) await run(...jobs[next++]);
  }),
);
await browser.close();

// Pas de plafond à 100vw : une image en object-fit: cover peut être peinte plus large que le viewport.
const up5 = (r) => Math.ceil((r * 105) / 5) * 5;
/** @type {Record<string, string>} */
const sizes = {};
for (const [key, byVw] of Object.entries(ratios).sort()) {
  const all = Math.max(...Object.values(byVw));
  if (all === 0) continue; // jamais affichée : le défaut s'applique
  const parts = BANDS.map(({ media, from }) => {
    const m = Math.max(...from.map((v) => byVw[v] ?? 0));
    const vw = up5(m || all); // tranche où l'image est masquée : ratio global (prudent)
    return media ? `${media} ${vw}vw` : `${vw}vw`;
  });
  sizes[key] = parts.join(', ');
}
fs.writeFileSync(OUT, JSON.stringify(sizes, null, 2) + '\n');
console.log(`${routes.length} pages × ${VIEWPORTS.length} viewports → ${Object.keys(sizes).length} clés → ${path.relative(process.cwd(), OUT)}`);
