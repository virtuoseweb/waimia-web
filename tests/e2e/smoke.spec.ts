// Tests de CONTRAT (durables, resistants au redesign visuel) : statut 200 + h1 present + 0 erreur console.
// Ne teste PAS le texte/CSS (volontairement, pour survivre aux redesigns).
// Routes verifiees contre le routage reel de waimia.com (waimia-web main, 2026-07-21).
import { test, expect } from "@playwright/test";

const ROUTES = [
  "/",
  "/services",
  // Hubs /secteurs et /demonstrations : redirigés en 301 vers /services (2026-10).
  "/secteurs/batiment",
  "/cas-clients",
  "/services/integration-claude",
  "/agence",
  "/agence/methode",
  "/implantations/montpellier",
  "/contact",
  "/manifesto",
  "/ressources",
  "/blog",
  "/ressources/outils",
  "/cgv",
  "/mentions-legales",
  "/politique-confidentialite",
  "/sources-methodologie",
  "/plan-du-site",
  // Intégration (2026-10-04) : /equipe est redirigé en 301 vers la fiche du fondateur.
  "/equipe/simon-beros",
  // Refonte D (2026-10-04) : nouvelles pages.
  "/services/automatisation-make",
  "/services/base-de-connaissance-ia",
  "/ressources/comparatifs/n8n-vs-make",
  "/ressources/guides/claude-cowork",
  "/blog/forward-deployed-engineer",
  "/formations",
  "/formations/automatisation",
  "/formations/n8n",
  "/formations/make",
  "/formations/claude",
  "/formations/chatgpt",
  "/implantations/bordeaux",
  "/implantations/lyon",
  "/conformite-ia",
  // Intégration (2026-10-04) : hub implantations indexable, outils et diagnostic.
  "/implantations",
  "/ressources/diagnostics/maturite-ia",
  "/ressources/outils/charte-ia-entreprise",
  "/ressources/outils/grille-taches-a-automatiser",
  "/ressources/outils/calculateur-roi-ia",
  // Cas d'usage par fonction + études de cas du marché + page ville Paris (2026-10-05).
  "/cas-usages",
  "/cas-usages/support-sav",
  "/cas-usages/finance-comptabilite",
  "/cas-usages/rh",
  "/implantations/paris",
];

for (const path of ROUTES) {
  test(`smoke: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));
    const response = await page.goto(path);
    await page.waitForLoadState("domcontentloaded");
    expect(response?.status(), `HTTP status for ${path}`).toBe(200);
    expect(await page.locator("h1").count(), `h1 count for ${path}`).toBeGreaterThanOrEqual(1);
    expect(errors, `console errors for ${path}`).toEqual([]);
  });
}

test("header : la nav principale est rendue cote serveur", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  expect(await page.locator("header a").count()).toBeGreaterThan(0);
});
