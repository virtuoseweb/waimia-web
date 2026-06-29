// GF-1 sweep des pages ressources C2 (comparatifs/guides/démonstrations/implantations)
// Usage : node scripts/gf1-ressources-c2.mjs  (serveur dist sur :4329 attendu)
import { chromium } from '@playwright/test';

const BASE = process.env.GF1_BASE || 'http://localhost:4329';
const urls = [
  // détails (11)
  '/ressources/comparatifs/claude-vs-chatgpt-pme',
  '/ressources/comparatifs/geo-vs-seo',
  '/ressources/comparatifs/site-web-intelligent-vs-wordpress',
  '/ressources/comparatifs/claude-code-vs-cursor',
  '/ressources/guides/claude-pme',
  '/ressources/guides/checklist-deploiement-claude',
  '/demonstrations/site-web-intelligent',
  '/demonstrations/integration-claude',
  '/demonstrations/avant-apres',
  '/implantations/montpellier',
  '/implantations/bordeaux',
  // hubs (4)
  '/ressources/comparatifs/',
  '/ressources/guides/',
  '/demonstrations/',
  '/implantations/',
  // hub Solutions v7 (correction nav /offres→/services)
  '/services/',
];

const nearIdentity = (t) => {
  if (!t || t === 'none') return true;
  const m = t.match(/matrix\(([^)]+)\)/);
  if (!m) return true;
  const n = m[1].split(',').map((x) => parseFloat(x.trim()));
  if (n.length === 6) return Math.abs(n[0] - 1) < 0.02 && Math.abs(n[3] - 1) < 0.02 && Math.abs(n[4]) < 2 && Math.abs(n[5]) < 2;
  return true;
};

const browser = await chromium.launch();
const report = [];
for (const u of urls) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 120)));
  let d, mob, status = 0;
  try {
    const resp = await page.goto(BASE + u, { waitUntil: 'networkidle', timeout: 30000 });
    status = resp ? resp.status() : 0;
    d = await page.evaluate(async () => {
      const ins = (el) => el ? { o: getComputedStyle(el).opacity, t: getComputedStyle(el).transform } : null;
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y <= h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); }
      await new Promise((r) => setTimeout(r, 600));
      const reveals = Array.from(document.querySelectorAll('.reveal, [data-reveal]'));
      const hidden = reveals.filter((e) => parseFloat(getComputedStyle(e).opacity) === 0).length;
      const imgs = Array.from(document.querySelectorAll('img'));
      const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
      window.scrollTo(0, 0);
      return {
        h1: ins(document.querySelector('h1')),
        sections: document.querySelectorAll('section, [class*="sec-base"]').length,
        revealTotal: reveals.length, hidden, broken,
        docW: document.documentElement.scrollWidth, winW: window.innerWidth,
      };
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + u, { waitUntil: 'networkidle', timeout: 30000 });
    mob = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      document.documentElement.scrollTo(0, 200);
      return { h1o: h1 ? getComputedStyle(h1).opacity : null, overflow: document.documentElement.scrollWidth > window.innerWidth + 1 };
    });
  } catch (e) { errors.push('NAV ' + String(e).slice(0, 120)); }
  const pass = status === 200 && d && d.h1 && parseFloat(d.h1.o) > 0.95 && nearIdentity(d.h1.t)
    && d.broken.length === 0 && d.hidden === 0 && d.docW <= d.winW + 1
    && mob && !mob.overflow && parseFloat(mob.h1o) > 0.95 && errors.length === 0;
  report.push({ u, status, PASS: !!pass, d, mob, errors });
  await ctx.close();
}
await browser.close();
const fails = report.filter((r) => !r.PASS);
console.log(JSON.stringify(report, null, 1));
console.log(`\n=== ${report.length - fails.length}/${report.length} PASS ===`);
if (fails.length) console.log('FAILS:', fails.map((f) => `${f.u}[${f.status}] ${(f.errors[0] || JSON.stringify({ h1: f.d?.h1, hidden: f.d?.hidden, broken: f.d?.broken, mob: f.mob })).slice(0, 90)}`).join('\n  '));
