// Tests de CONTRAT (durables, resistants au redesign visuel) : statut 200 + h1 present + 0 erreur console.
// Ne teste PAS le texte/CSS (volontairement, pour survivre aux redesigns).
// Routes verifiees contre le routage reel de waimia.com (waimia-web main, 2026-06-15).
import { test, expect } from "@playwright/test";

const ROUTES = [
  "/",
  "/acquerir",
  "/piloter",
  "/operer",
  "/offres",
  "/secteurs",
  "/realisations",
  "/expertise-claude",
  "/agence",
  "/agence/methode",
  "/agence/about",
  "/agence-web-montpellier",
  "/contact",
  "/manifesto",
  "/ressources",
  "/ressources/blog",
  "/ressources/outils",
  "/cgv",
  "/mentions-legales",
  "/politique-confidentialite",
  "/sources-methodologie",
  "/plan-du-site",
  "/equipe",
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
