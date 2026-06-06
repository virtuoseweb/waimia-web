/* Quality sweep · régressions verrouillées
 * Cible : verrouiller les fixes d'une session de quality sweep (a11y, SEO,
 * liens internes, hreflang, JSON-LD, sitemap) contre toute régression future.
 *
 * Chaque test assert sur le HTML servi (server-rendered) → marche en dev ET prod.
 * Aucune URL absolue : on utilise des chemins relatifs (baseURL configurable via
 * PLAYWRIGHT_BASE_URL). Commits sources : 32ae252 (hreflang FR/EN-only + sitemap),
 * 8a05e4e (liens cassés), 719e27c (heading-order /solutions),
 * e0481b0 (aria-pressed filtres), d507e7d (JSON-LD Article cas). */
import { test, expect } from "@playwright/test";

test.describe("Quality sweep · régressions verrouillées", () => {
  /* ───── 1. hreflang FR-only ne pointe pas vers un miroir EN inexistant (404) ─────
   * Les pages FR-only (tunnels de conversion, bienvenue/*) ne doivent PAS émettre
   * `hreflang="en-US"` : il pointerait vers une URL /en/... qui n'existe pas.
   * Contrôle positif sur la home bilingue pour prouver que le test n'est pas vacue. */
  test("hreflang · pages FR-only n'émettent pas en-US (anti-404)", async ({
    page,
  }) => {
    // /offres/<offre>/tunnel/<step> · segment /tunnel/ = FR-only (i18n.ts FR_ONLY_PATH_SEGMENTS)
    await page.goto("/offres/site-web-ia/tunnel/1");
    const tunnelHtml = await page.content();
    expect(
      tunnelHtml,
      "tunnel FR-only ne doit pas émettre hreflang en-US (cible 404)",
    ).not.toContain('hreflang="en-US"');

    // /bienvenue/contact · thank-you FR-only (i18n.ts FR_ONLY_STATIC)
    await page.goto("/bienvenue/contact");
    const bienvenueHtml = await page.content();
    expect(
      bienvenueHtml,
      "bienvenue/contact FR-only ne doit pas émettre hreflang en-US (cible 404)",
    ).not.toContain('hreflang="en-US"');

    // CONTRÔLE POSITIF · la home est bilingue → DOIT émettre au moins un hreflang.
    // Garantit que l'assertion not.toContain ci-dessus n'est pas trivialement vraie.
    await page.goto("/");
    const homeHtml = await page.content();
    expect(homeHtml, "home bilingue doit émettre des hreflang").toContain(
      "hreflang=",
    );
  });

  /* ───── 2. hreflang EN-only ne pointe pas vers un miroir FR inexistant (404) ─────
   * /en/ressources/cas est servi uniquement sous /en (le FR vit à /cas via redirect).
   * Cette page EN-only ne doit donc PAS émettre `hreflang="fr-FR"` (cible 404). */
  test("hreflang · /en/ressources/cas EN-only n'émet pas fr-FR (anti-404)", async ({
    page,
  }) => {
    await page.goto("/en/ressources/cas");
    const html = await page.content();
    expect(
      html,
      "/en/ressources/cas EN-only ne doit pas émettre hreflang fr-FR (cible 404)",
    ).not.toContain('hreflang="fr-FR"');
  });

  /* ───── 3. a11y · heading-order sur /solutions ─────
   * Aucun saut de niveau > 1 (ex. h2 → h4 interdit) dans l'ordre du DOM,
   * et exactement un <h1>. Verrouille le fix cards problèmes h3→h2 / secteurs h4→h3. */
  test("a11y · /solutions respecte l'ordre des titres (pas de saut > 1)", async ({
    page,
  }) => {
    await page.goto("/solutions");

    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) =>
        Number(el.tagName.charAt(1)),
      ),
    );

    expect(levels.length, "la page doit contenir des titres").toBeGreaterThan(0);

    // Exactement un h1
    const h1Count = levels.filter((lvl) => lvl === 1).length;
    expect(h1Count, "/solutions doit avoir exactement un <h1>").toBe(1);

    // Aucun saut descendant > 1 niveau entre deux titres consécutifs
    for (let i = 1; i < levels.length; i++) {
      const jump = levels[i] - levels[i - 1];
      expect(
        jump,
        `saut de niveau interdit : <h${levels[i - 1]}> → <h${levels[i]}> (index ${i})`,
      ).toBeLessThanOrEqual(1);
    }
  });

  /* ───── 4. a11y · aria-pressed sur les filtres /integrations ─────
   * Chaque .filter-btn porte un attribut aria-pressed, et exactement un est
   * aria-pressed="true" au render (le filtre « Tous »). Si la collection est
   * vide et qu'aucun filtre ne rend → skip explicite plutôt que faux échec. */
  test("a11y · filtres /integrations exposent aria-pressed (1 actif)", async ({
    page,
  }) => {
    await page.goto("/integrations");

    const buttons = page.locator(".filter-btn");
    const count = await buttons.count();

    test.skip(
      count === 0,
      "Aucun .filter-btn rendu (collection integrations vide) — rien à verrouiller.",
    );

    // Chaque bouton de filtre doit exposer aria-pressed (true OU false)
    const withAriaPressed = await page
      .locator(".filter-btn[aria-pressed]")
      .count();
    expect(
      withAriaPressed,
      "chaque .filter-btn doit porter un attribut aria-pressed",
    ).toBe(count);

    // Exactement un filtre actif au render
    const pressedTrue = await page
      .locator('.filter-btn[aria-pressed="true"]')
      .count();
    expect(
      pressedTrue,
      "exactement un .filter-btn doit être aria-pressed=true au render",
    ).toBe(1);
  });

  /* ───── 5. liens internes cassés réparés ─────
   * /technologies ne doit plus pointer vers /technologies/mcp-connectors
   * (réparé en /offres/mcp-connectors). Et /equipe doit répondre 200
   * (ex-lien /agence/team réparé vers la route réelle). */
  test("liens · /technologies ne pointe plus vers /technologies/mcp-connectors", async ({
    page,
  }) => {
    await page.goto("/technologies");
    const html = await page.content();
    expect(
      html,
      "lien cassé /technologies/mcp-connectors doit être réparé",
    ).not.toContain('href="/technologies/mcp-connectors"');
  });

  test("liens · /equipe répond 200 (cible réparée ex-/agence/team)", async ({
    page,
  }) => {
    const resp = await page.goto("/equipe");
    expect(resp?.status(), "/equipe doit répondre 200").toBe(200);
  });

  /* ───── 6. JSON-LD Article sur les pages cas (GEO/AIO) ─────
   * Au moins un script ld+json contient "@type":"Article" ET l'auteur cohérent
   * "Simon Beros" — sur le cas FR et son miroir EN. Verrouille buildArticle. */
  test("JSON-LD · /cas/caserne expose un Article avec auteur Simon Beros", async ({
    page,
  }) => {
    await page.goto("/cas/caserne");
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const hasArticleAuthor = blocks.some(
      (s) => s.includes('"@type":"Article"') && s.includes("Simon Beros"),
    );
    expect(
      hasArticleAuthor,
      "/cas/caserne doit exposer un JSON-LD Article avec author Simon Beros",
    ).toBe(true);
  });

  test("JSON-LD · /en/cas/caserne expose un Article avec auteur Simon Beros", async ({
    page,
  }) => {
    await page.goto("/en/cas/caserne");
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const hasArticleAuthor = blocks.some(
      (s) => s.includes('"@type":"Article"') && s.includes("Simon Beros"),
    );
    expect(
      hasArticleAuthor,
      "/en/cas/caserne doit exposer un JSON-LD Article avec author Simon Beros",
    ).toBe(true);
  });

  /* ───── 7. sitemap exclut les pages catalogue internes (BUILD-ONLY) ─────
   * Le sitemap (généré au build par @astrojs/sitemap) ne doit lister NI /preview/
   * NI /components/ (148 URLs noindex retirées). En dev le sitemap n'existe pas
   * (généré au build) → skip explicite si le fichier n'est pas servi (status ≠ 200). */
  test("sitemap · exclut /preview/ et /components/ (catalogue interne noindex)", async ({
    page,
  }) => {
    const resp = await page.goto("/sitemap-0.xml");
    const status = resp?.status();

    test.skip(
      status !== 200,
      "sitemap build-only : absent en dev, lancer contre un build servi (serve-dist/preview).",
    );

    const xml = await page.content();
    expect(xml, "le sitemap ne doit pas lister /preview/").not.toContain(
      "/preview/",
    );
    expect(xml, "le sitemap ne doit pas lister /components/").not.toContain(
      "/components/",
    );
  });
});
