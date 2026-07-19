#!/usr/bin/env node
/**
 * gf1-template-sections-capture.mjs · P2.1-b
 *
 * Capture 1 PNG above-fold PAR SECTION top-level d'une page instance de template.
 * Complète le sweep preview-level (gf1-cloud-sweep.mjs, 1 capture / composant isolé)
 * par une couverture TEMPLATE-level : pour un agent qui veut itérer sur un template
 * (case-study, sector, essay, utility, welcome, trust-legal, author-page...), il faut
 * voir chaque section rendue DANS le contexte du template assemblé.
 *
 * Convention de sortie (P2.1-c) : versionnée sous
 *   docs/visual-audit/templates/<label>/<NN>-<slug>.png  (+ <label>/sections.json)
 * dé-ignorée dans .gitignore (bloc « Captures visual-audit VERSIONNÉES »).
 *
 * DOM : les pages passent par Base.astro → <main id="main"> ; chaque section cataloguée
 * (via SectionsRenderer / resolveTemplate) OU bespoke rend un élément top-level enfant
 * direct de #main. On énumère ces enfants (visibles, height>40, hors ancres height:0),
 * on scrolle chacun sous le header sticky, on laisse les reveals se déclencher, on
 * capture le viewport (= above-fold de CETTE section).
 *
 * Usage :
 *   node scripts/serve-dist.mjs --port 4660 --root dist/client &
 *   node scripts/gf1-template-sections-capture.mjs \
 *     --base http://localhost:4660 \
 *     --url /cas-clients/amploi --label case-study
 *
 * Sortie : JSON (stdout) + PNG + <label>/sections.json. Exit 0 si >=1 section capturée.
 */
import pw from '/Users/simonberos/waimia-web/.worktrees/1783831563-60089/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/index.js';
const { chromium } = pw;
import { promises as fs } from 'node:fs';
import { resolve, join } from 'node:path';

// ─── CLI args ────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const key = argv[i].slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : 'true';
    args[key] = val;
    if (val !== 'true') i++;
  }
}

const BASE = (args.base || 'http://localhost:4660').replace(/\/$/, '');
const URL_PATH = args.url;
const LABEL = args.label;
const OUTROOT = resolve(args.outroot || 'docs/visual-audit/templates');
const TIMEOUT = parseInt(args.timeout || '25000', 10);
const VIEWPORT = { width: 1440, height: 900 };
const STICKY = 96; // header sticky ~80px + marge

if (!URL_PATH || !LABEL) {
  console.error('Usage: --base <url> --url <path> --label <template-name>');
  process.exit(2);
}

const kebab = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 44) || 'section';

async function main() {
  const outDir = join(OUTROOT, LABEL);
  await fs.mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + String(e).slice(0, 200)));

  const target = BASE + URL_PATH;
  await page.goto(target, { waitUntil: 'networkidle', timeout: TIMEOUT }).catch(async () => {
    await page.goto(target, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  });

  // 1) Passe de scroll complète (bas puis haut) pour déclencher tous les
  //    IntersectionObserver (scroll-reveal, container-expand, stats, etc.).
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 600) {
      window.scrollTo(0, y);
      await sleep(60);
    }
    window.scrollTo(0, 0);
    await sleep(200);
  });

  // Force-reveal déterministe : le mécanisme projet (scroll-reveal.ts) ajoute
  // `.is-visible`/`.in` aux éléments `.reveal*` quand ils entrent dans le viewport.
  // Sur une capture par tranches, les staggers profonds peuvent être figés en
  // pré-reveal (opacity 0). On latche l'état révélé sur TOUS les éléments reveal
  // pour capturer le contenu final, pas un mid-stagger.
  await page.evaluate(() => {
    const SEL = ['.reveal', '.reveal-stagger', '.reveal-fade', '.reveal-slide',
      '.reveal-snap', '.reveal-mask-up', '.reveal-split-letter', '.reveal-curtain',
      '.reveal-zoom-in', '.reveal-blur-clip', '.reveal-up', '.scale-in', '.blur-in',
      '.clip-up', '.hair-draw', '.row-lines'].join(', ');
    document.querySelectorAll(SEL).forEach((el) => el.classList.add('is-visible', 'in'));
  });
  await page.waitForTimeout(250);

  // 2) Énumère les sections top-level enfants directs de #main.
  const sections = await page.evaluate(() => {
    const main = document.querySelector('main#main') || document.querySelector('main');
    if (!main) return [];
    const out = [];
    let idx = 0;
    for (const el of Array.from(main.children)) {
      if (el.nodeType !== 1) continue;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      // Ancres de scroll injectées par SectionsRenderer = height:0 aria-hidden.
      if (rect.height < 40) continue;
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (el.getAttribute('aria-hidden') === 'true' && rect.height < 40) continue;
      const heading = el.querySelector('h1, h2, h3, [class*="kicker"], [class*="eyebrow"]');
      const headingText = heading ? heading.textContent.trim().replace(/\s+/g, ' ').slice(0, 90) : '';
      const dst = el.getAttribute('data-section-type') || '';
      const firstClass = (el.className && typeof el.className === 'string')
        ? el.className.split(/\s+/).filter(Boolean)[0] : '';
      out.push({
        index: idx++,
        tag: el.tagName.toLowerCase(),
        cls: firstClass || '',
        dataSectionType: dst,
        headingText,
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
      });
    }
    return out;
  });

  const results = [];
  const SLICE = 820; // pas de découpe verticale pour les sections monolithiques
  for (const s of sections) {
    const slug = kebab(s.dataSectionType || s.headingText || (s.tag + '-' + s.cls));
    const nn = String(s.index).padStart(2, '0');
    // Sections plus hautes que ~1.5 viewport (templates bespoke monolithiques :
    // author-page, essay) = découpées en tranches verticales pour que la couverture
    // montre TOUT le contenu, pas seulement l'above-fold du haut.
    const sliceCount = s.height > VIEWPORT.height * 1.5
      ? Math.min(14, Math.ceil(s.height / SLICE))
      : 1;
    const files = [];
    for (let k = 0; k < sliceCount; k++) {
      const suffix = sliceCount > 1 ? `-p${k + 1}` : '';
      const file = join(outDir, `${nn}-${slug}${suffix}.png`);
      const scrollY = Math.max(0, s.top - STICKY + k * SLICE);
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(sliceCount > 1 ? 300 : 450);
      await page.screenshot({ path: file, fullPage: false });
      files.push(file.replace(resolve('.') + '/', ''));
    }
    results.push({
      index: s.index,
      slug,
      file: files[0],
      slices: files.length > 1 ? files : undefined,
      tag: s.tag,
      cls: s.cls,
      dataSectionType: s.dataSectionType || null,
      headingText: s.headingText || null,
      heightPx: s.height,
    });
  }

  const manifest = {
    label: LABEL,
    url: URL_PATH,
    capturedAt: new Date().toISOString(),
    sectionCount: results.length,
    consoleErrors,
    sections: results,
  };
  await fs.writeFile(join(outDir, 'sections.json'), JSON.stringify(manifest, null, 2) + '\n');

  await browser.close();
  console.log(JSON.stringify(manifest, null, 2));
  process.exit(results.length > 0 ? 0 : 1);
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(3);
});
