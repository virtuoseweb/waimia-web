#!/usr/bin/env node
/**
 * gf1-cloud-sweep.mjs · Sweep GF-1 (preuve visuelle empirique) sur les previews de la bibliothèque.
 *
 * Conçu pour tourner en session CLOUD (claude.ai/code) où le download Playwright
 * est bloqué (cdn.playwright.dev hors allowlist) mais où un chromium est PRÉ-INSTALLÉ
 * dans /opt/pw-browsers. On pointe Playwright dessus via `executablePath`.
 *
 * Workflow :
 *   1. `pnpm build`            → dist/ statique avec les 57 pages /preview/<type>
 *   2. serveur HTTP local      → astro preview OU `node scripts/serve-dist.mjs`
 *   3. `node scripts/gf1-cloud-sweep.mjs --base http://localhost:4321`
 *
 * Pour CHAQUE type catalogué :
 *   · navigation /preview/<type>
 *   · section rendue avec hauteur > 0 (above-fold)
 *   · heading principal : opacity ≠ 0 ET transform neutre (none / pas de translate géant)
 *   · CTA (si présent) : opacity ≠ 0
 *   · 0 erreur console / pageerror
 *   · screenshot above-fold (1440x900) sauvegardé
 *
 * Sortie : JSON parsable (stdout) + PNG par type (--out) + exit code (0 = tous PASS).
 *
 * Permanent · cf docs/20-SESSION-NEXT-CLOUD-ORCHESTRATION.md §6 (init cloud) + GF-1.
 */
import { chromium } from '@playwright/test';
import { promises as fs } from 'node:fs';
import { existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

// ─── CLI args ──────────────────────────────────────────────────────────────
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

const BASE = (args.base || 'http://localhost:4321').replace(/\/$/, '');
const OUT = resolve(args.out || '/tmp/wmission/gf1-cloud-sweep');
const DIST_PREVIEW = resolve(args['dist-preview'] || 'dist/preview');
const TIMEOUT = parseInt(args.timeout || '20000', 10);
const VIEWPORT = { width: 1440, height: 900 };

// Auto-détection du chromium pré-installé (cloud) ou bundle local.
function findChromium() {
  if (process.env.PW_CHROME && existsSync(process.env.PW_CHROME)) return process.env.PW_CHROME;
  const roots = ['/opt/pw-browsers'];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    const dir = readdirSync(root).find((d) => /^chromium-\d+$/.test(d));
    if (dir) {
      const exe = join(root, dir, 'chrome-linux', 'chrome');
      if (existsSync(exe)) return exe;
    }
  }
  return undefined; // laisse Playwright résoudre son bundle par défaut
}

// Énumère les types depuis les pages preview générées (robuste post-build).
function listPreviewTypes() {
  if (!existsSync(DIST_PREVIEW)) {
    throw new Error(`dist/preview introuvable (${DIST_PREVIEW}) — lancer \`pnpm build\` d'abord.`);
  }
  return readdirSync(DIST_PREVIEW, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

await fs.mkdir(OUT, { recursive: true });
const types = listPreviewTypes();
const executablePath = findChromium();

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ['--no-sandbox', '--disable-gpu'],
});

const results = [];
for (const type of types) {
  const url = `${BASE}/preview/${type}`;
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  // JS errors (réels) vs ressources 4xx (artefacts d'isolation preview : prefetch de
  // liens internes absents du build /preview/*, images OG placeholder). On distingue.
  const jsErrors = [];
  const resource4xx = [];
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/Failed to load resource/i.test(t)) return; // capté via 'response' ci-dessous
    jsErrors.push(t);
  });
  page.on('pageerror', (e) => jsErrors.push(String(e)));
  page.on('response', (resp) => { if (resp.status() >= 400) resource4xx.push(`${resp.status()} ${resp.url()}`); });

  const r = { type, url };
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT });
    r.status = resp?.status() ?? null;
    await page.waitForTimeout(500);

    const probe = await page.evaluate(() => {
      const norm = (t) => !t || t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)';
      const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const section = document.body.firstElementChild;
      const secRect = section ? section.getBoundingClientRect() : { height: 0 };
      // Heading principal : 1er h1/h2 ou classe headline connue (sections hero).
      const head = document.querySelector('h1, .hero-headline, [class*="-h1"], [class*="headline"], h2');
      // Élément de contenu principal : heading SINON 1er élément visible porteur de texte
      // (sections non-hero : marquee, proof-bar, cta-band, spec-bar, manifesto…).
      let primary = head && vis(head) ? head : null;
      if (!primary) {
        const sels = ['[class*="cta"]', 'a', 'button', 'p', '[class*="label"]',
          '[class*="value"]', '[class*="metric"]', '[class*="title"]', 'span', 'div'];
        for (const s of sels) {
          for (const el of document.querySelectorAll(s)) {
            if (vis(el) && (el.textContent || '').trim().length > 1) { primary = el; break; }
          }
          if (primary) break;
        }
      }
      const pCS = primary ? getComputedStyle(primary) : null;
      const cta = document.querySelector('a[class*="cta"], a[class*="btn"], button, .pill-cta, .terminal-cta, [class*="cta-"]');
      const ctaCS = cta ? getComputedStyle(cta) : null;
      return {
        sectionHeight: Math.round(secRect.height),
        headingPresent: !!(head && vis(head)),
        primaryFound: !!primary,
        primaryText: primary ? (primary.textContent || '').trim().slice(0, 60) : null,
        primaryOpacity: pCS ? pCS.opacity : null,
        primaryTransform: pCS ? pCS.transform : null,
        primaryTransformOk: pCS ? norm(pCS.transform) : null,
        hasVisibleText: (document.body.innerText || '').trim().length > 0,
        ctaFound: !!cta,
        ctaOpacity: ctaCS ? ctaCS.opacity : null,
        unknownSection: !!document.querySelector('p[style*="monospace"]'),
      };
    });
    Object.assign(r, probe);
    r.jsErrors = jsErrors;
    r.resource4xx = resource4xx; // warnings (isolation preview), non bloquants

    const shot = join(OUT, `${type}.png`);
    await page.screenshot({ path: shot, fullPage: false });
    r.screenshot = shot;

    // Verdict GF-1 par preview : le composant rend-il du contenu visible above-fold,
    // opacity≠0 + transform neutre, sans erreur JS ?
    const fails = [];
    if (r.status !== 200) fails.push(`status=${r.status}`);
    if (r.unknownSection) fails.push('section inconnue (registry/demo manquant)');
    if (r.sectionHeight <= 0) fails.push('section hauteur 0 (pas above-fold)');
    if (!r.hasVisibleText) fails.push('aucun texte visible');
    if (!r.primaryFound) fails.push('aucun élément de contenu visible');
    else {
      if (r.primaryOpacity !== null && parseFloat(r.primaryOpacity) === 0) fails.push('contenu opacity=0');
      if (r.primaryTransformOk === false) fails.push(`contenu transform=${r.primaryTransform}`);
    }
    if (r.ctaFound && r.ctaOpacity !== null && parseFloat(r.ctaOpacity) === 0) fails.push('cta opacity=0');
    if (jsErrors.length) fails.push(`${jsErrors.length} erreur JS`);
    r.pass = fails.length === 0;
    r.fails = fails;
    r.warnings = resource4xx.length ? [`${resource4xx.length} ressource(s) 4xx (artefact isolation preview)`] : [];
  } catch (e) {
    r.pass = false;
    r.fails = [`exception: ${e.message}`];
  } finally {
    await ctx.close();
  }
  results.push(r);
  const warn = r.warnings && r.warnings.length ? `  ⚠️ ${r.warnings.join('; ')}` : '';
  process.stderr.write(`${r.pass ? '✅' : '❌'} ${type}${r.pass ? '' : ' → ' + r.fails.join('; ')}${warn}\n`);
}

await browser.close();

const passed = results.filter((r) => r.pass).length;
const summary = {
  capturedAt: new Date().toISOString(),
  base: BASE,
  executablePath: executablePath || '(playwright bundle default)',
  total: results.length,
  passed,
  failed: results.length - passed,
  outDir: OUT,
  results,
};
await fs.writeFile(join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ ...summary, results: undefined }, null, 2));
process.stderr.write(`\n→ ${passed}/${results.length} PASS · screenshots+summary: ${OUT}\n`);
process.exit(passed === results.length ? 0 : 1);
