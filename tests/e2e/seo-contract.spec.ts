// Tests de CONTRAT SEO/GEO (durables) contre le build servi : ce qu'un robot reçoit, sans JS.
// Complètent les gates statiques (scripts/check-*.mjs) en passant par HTTP comme un crawler.
// Aucun test ne dépend d'un texte éditorial : ils survivent aux réécritures de contenu.
import { test, expect } from "@playwright/test";

const SERVICE = "/services/agents-ia";

test("robots.txt : un seul groupe, sitemap déclaré, catalogue interne interdit à tous", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const txt = await res.text();
  expect(txt).toContain("Sitemap: https://waimia.com/sitemap-index.xml");
  // Un groupe nommé n'hérite pas de `*` : tous les robots doivent partager les mêmes règles.
  const groups = txt.split(/\n\s*\n/).filter((block) => /^User-agent:/im.test(block));
  expect(groups.length, "nombre de groupes User-agent").toBe(1);
  for (const agent of ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
    expect(groups[0]).toContain(`User-agent: ${agent}`);
  }
  for (const rule of ["/api/", "/preview/", "/library/", "/dashboard-seo"]) {
    expect(groups[0]).toContain(`Disallow: ${rule}`);
  }
  expect(groups[0]).toContain("Allow: /api/og.png");
});

test("sitemap : chaque URL a un lastmod et aucune n'est interne", async ({ request }) => {
  const res = await request.get("/sitemap-0.xml");
  test.skip(res.status() === 404, "sitemap généré au build uniquement (absent en dev)");
  const xml = await res.text();
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  expect(urls.length).toBeGreaterThan(20);
  for (const u of urls) {
    expect(u, "lastmod présent").toMatch(/<lastmod>\d{4}-\d{2}-\d{2}/);
    expect(u).not.toMatch(/\/(preview|library|components|categories|dashboard-seo|lp|bienvenue)(\/|<)/);
    expect(u, "pas de slash final").not.toMatch(/<loc>https:\/\/waimia\.com\/.+\/<\/loc>/);
  }
  // Une date unique sur tout le site serait une date de build, pas de contenu.
  const dates = new Set(urls.map((u) => /<lastmod>(\d{4}-\d{2}-\d{2})/.exec(u)?.[1]));
  expect(dates.size, "dates lastmod distinctes").toBeGreaterThan(1);
});

test("llms.txt : structuré par silo, liens vers des fichiers qui répondent", async ({ request }) => {
  const res = await request.get("/llms.txt");
  test.skip(res.status() === 404, "llms.txt généré au build uniquement (absent en dev)");
  const txt = await res.text();
  expect(txt).toMatch(/^# Waimia/);
  expect(txt).toContain("## Services");
  expect(txt).not.toMatch(/\/(preview|library|dashboard-seo)\//);
  const links = [...txt.matchAll(/\]\(https:\/\/waimia\.com(\/[^)]+)\)/g)].map((m) => m[1]);
  expect(links.length).toBeGreaterThan(20);
  for (const path of links.slice(0, 8)) {
    expect((await request.get(path)).status(), `llms.txt → ${path}`).toBe(200);
  }
});

test("page service : citable sans JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const res = await page.goto(SERVICE);
  expect(res?.status()).toBe(200);

  // Un seul h1, canonical sans slash final, hreflang limité à fr-FR + x-default.
  expect(await page.locator("h1").count()).toBe(1);
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(`https://waimia.com${SERVICE}`);
  const hreflangs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
  expect(hreflangs.sort()).toEqual(["fr-FR", "x-default"]);
  expect(await page.locator('meta[name="twitter:site"]').count()).toBe(0);

  // Auteur et date de mise à jour en HTML statique.
  const updated = page.locator(".page-updated");
  await expect(updated).toHaveCount(1);
  expect(await updated.locator("time").getAttribute("datetime")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(await updated.locator('a[rel="author"]').getAttribute("href")).toBe("/equipe/simon-beros");

  // FAQ lisible sans JS (details/summary) quand elle est balisée.
  const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || "{}")));
  const types = ld.flat().map((b) => b["@type"]);
  for (const t of ["Organization", "WebSite", "Service", "BreadcrumbList"]) expect(types, `JSON-LD ${t}`).toContain(t);
  const service = ld.flat().find((b) => b["@type"] === "Service");
  expect(service.provider).toEqual({ "@id": "https://waimia.com/#organization" });
  expect(service.serviceType).toBeTruthy();
  expect(JSON.stringify(service.areaServed)).toContain("Bordeaux");
  if (types.includes("FAQPage")) expect(await page.locator("main details").count()).toBeGreaterThan(0);

  // Maillage : au moins 3 liens contextuels vers d'autres pages du site.
  expect(await page.locator("main .related-links a").count()).toBeGreaterThanOrEqual(3);
  await context.close();
});

test("accueil : ProfessionalService avec la zone desservie, pas de fil d'Ariane", async ({ page }) => {
  await page.goto("/");
  const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent || "{}")));
  const blocks = ld.flat();
  const local = blocks.find((b) => b["@type"] === "ProfessionalService");
  expect(local, "ProfessionalService sur l'accueil").toBeTruthy();
  const cities = (local.areaServed as Array<{ name: string }>).map((a) => a.name);
  for (const city of ["Bordeaux", "Montpellier", "Lyon", "Paris", "France"]) expect(cities).toContain(city);
  expect(blocks.filter((b) => b["@type"] === "Organization").length).toBe(1);
  expect(blocks.filter((b) => b["@type"] === "BreadcrumbList").length).toBe(0);
});
