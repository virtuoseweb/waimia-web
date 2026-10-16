// Parcours de conversion (refonte B, 4 octobre 2026) · tests de CONTRAT côté client.
// Tournent contre le build servi (pas d'API) : on vérifie ce que la page fait des
// paramètres d'URL, le calcul des outils et la présence des CTA, pas le texte ni le CSS.
import { test, expect } from "@playwright/test";

const AUDIT_BOOKING = "/contact?offer=audit-ia-pme&intent=audit";
// Forme fragment des anciens liens (avant le 15 octobre 2026) et des PDF déjà envoyés.
const AUDIT_BOOKING_FRAGMENT = "/contact#offer=audit-ia-pme&intent=audit";

test.describe("contact · paramètres d'URL", () => {
  test("?offer=audit-ia-pme&intent=audit : prise de RDV en premier, offre pré-sélectionnée", async ({ page }) => {
    await page.goto(AUDIT_BOOKING);
    const root = page.locator("[data-contact-root]");
    await expect(root).toHaveAttribute("data-first", "rdv");
    await expect(root.locator("[data-contact-subject]")).toHaveValue("audit");
    await expect(root.locator("[data-contact-offer]")).toHaveValue("audit-ia-pme");
    await expect(root.locator("[data-contact-intent]")).toHaveValue("audit");
    // Le bloc calendrier démarre au-dessus de la ligne de flottaison.
    const calTop = await page.locator("[data-cal-embed]").evaluate((el) => el.getBoundingClientRect().top);
    expect(calTop).toBeLessThan(page.viewportSize()!.height);
    // Le formulaire reste présent dessous pour les autres demandes.
    await expect(page.locator('form[name="contact"]')).toHaveCount(1);
    const rdvTop = await page.locator("#rdv").evaluate((el) => el.getBoundingClientRect().top);
    const msgTop = await page.locator("#message").evaluate((el) => el.getBoundingClientRect().top);
    expect(rdvTop).toBeLessThan(msgTop);
  });

  test("#offer=audit-ia-pme&intent=audit (ancien lien) : offre toujours pré-sélectionnée", async ({ page }) => {
    await page.goto(AUDIT_BOOKING_FRAGMENT);
    const root = page.locator("[data-contact-root]");
    await expect(root).toHaveAttribute("data-first", "rdv");
    await expect(root.locator("[data-contact-subject]")).toHaveValue("audit");
    await expect(root.locator("[data-contact-offer]")).toHaveValue("audit-ia-pme");
  });

  test("?intent=message : formulaire en premier", async ({ page }) => {
    await page.goto("/contact?intent=message");
    await expect(page.locator("[data-contact-root]")).toHaveAttribute("data-first", "message");
    const rdvTop = await page.locator("#rdv").evaluate((el) => el.getBoundingClientRect().top);
    const msgTop = await page.locator("#message").evaluate((el) => el.getBoundingClientRect().top);
    expect(msgTop).toBeLessThan(rdvTop);
  });

  test("paramètre non conforme ignoré (pas d'injection dans les champs cachés)", async ({ page }) => {
    await page.goto("/contact?offer=%3Cscript%3Ealert(1)%3C/script%3E&intent=audit");
    await expect(page.locator("[data-contact-offer]")).toHaveValue("");
  });

  test("soumission vide : erreurs par champ, aucun appel réseau", async ({ page }) => {
    let apiCalls = 0;
    page.on("request", (r) => { if (r.url().includes("/api/contact")) apiCalls++; });
    await page.goto(AUDIT_BOOKING);
    await page.locator("[data-contact-submit]").click();
    await expect(page.locator('form[name="contact"] [aria-invalid="true"]')).toHaveCount(3);
    expect(apiCalls).toBe(0);
  });
});

test("audit-ia-pme : h1, exemple étiqueté, CTA vers la prise de RDV", async ({ page }) => {
  const resp = await page.goto("/audit-ia-pme");
  expect(resp?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(`a[href="${AUDIT_BOOKING}"]`).first()).toBeVisible();
  await expect(page.getByText("Exemple illustratif").first()).toBeVisible();
  // Aucun CTA de la page ne mène à l'ancien positionnement.
  await expect(page.locator('main a[href*="audit-site-web-intelligent"]')).toHaveCount(0);
});

test("diagnostic maturité IA : questions → score → restitution → CTA audit", async ({ page }) => {
  await page.goto("/ressources/diagnostics/maturite-ia");
  const result = page.locator("[data-md-result]");
  await expect(result).toBeHidden();
  await expect(page.locator('[data-lcb][data-slug="diagnostic-maturite-ia"]')).toBeHidden();
  // Soumission incomplète : pas de résultat.
  await page.locator("[data-md-form] button[type=submit]").click();
  await expect(page.locator("[data-md-missing]")).toBeVisible();
  await expect(result).toBeHidden();
  // 10 réponses : total 7 → niveau 2 ; gouvernance (q7 + q8 = 0) = point faible.
  const answers = [1, 2, 0, 1, 1, 1, 0, 0, 1, 0];
  for (let i = 0; i < answers.length; i++) {
    await page.locator(`input[name="q${i + 1}"][value="${answers[i]}"]`).check();
  }
  await page.locator("[data-md-form] button[type=submit]").click();
  await expect(result).toBeVisible();
  await expect(page.locator("[data-md-level]")).toHaveText("2");
  await expect(page.locator("[data-md-score]")).toHaveText("7");
  await expect(page.locator("[data-md-weak-name]")).toHaveText("Gouvernance");
  await expect(result.locator(`a[href="${AUDIT_BOOKING}"]`)).toBeVisible();
  // Le résultat s'affiche sans e-mail ; la bande de capture (lead-capture-band) n'apparaît
  // qu'une fois le résultat calculé, champ vide.
  const band = page.locator('[data-lcb][data-slug="diagnostic-maturite-ia"]');
  await expect(band).toBeVisible();
  await expect(band.locator('input[name="email"]')).toHaveValue("");
});

test("grille des tâches : calcul et classement", async ({ page }) => {
  await page.goto("/ressources/outils/grille-taches-a-automatiser");
  await expect(page.locator("[data-tg-row]")).toHaveCount(3);
  await page.locator("[data-tg-add]").click();
  const row = page.locator("[data-tg-row]").last();
  await row.locator('[data-f="task"]').fill("Saisie des factures");
  await row.locator('[data-f="n"]').fill("200");
  await row.locator('[data-f="per"]').selectOption("month");
  await row.locator('[data-f="min"]').fill("9");
  // 200 × 9 min ÷ 60 = 30 h par mois, faisabilité 1 → priorité 30, premier du classement.
  await expect(row.locator('[data-o="hours"]')).toHaveText("30 h");
  await expect(row.locator('[data-o="score"]')).toHaveText("30");
  await expect(page.locator("[data-tg-rank] li").first()).toContainText("Saisie des factures");
});

test("calculateur ROI : hypothèses éditables, CTA audit", async ({ page }) => {
  await page.goto("/ressources/outils/calculateur-roi-ia");
  const values = page.locator("[data-result-value]");
  await expect(values.nth(0)).toContainText("460"); // 20 h × 46 sem × 50 %
  await page.locator("#tw-heuresTaches").fill("10");
  await page.locator("#tw-partAuto").fill("30");
  await expect(values.nth(0)).toContainText("138"); // 10 × 46 × 30 %
  await expect(page.locator(".tw-cta")).toHaveAttribute("href", AUDIT_BOOKING);
});

test("charte IA : texte lisible, champs personnalisables, PDF verrouillé (e-mail requis)", async ({ page, request }) => {
  await page.goto("/ressources/outils/charte-ia-entreprise");
  await expect(page.locator("[data-charter-article]")).toHaveCount(9);
  await page.locator("#ch-entreprise").fill("Menuiserie Durand");
  await expect(page.locator(".ch-preamble")).toContainText("Menuiserie Durand");
  // Le PDF n'est plus servi : aucun lien de téléchargement direct, l'e-mail est requis.
  await expect(page.locator("a[download]")).toHaveCount(0);
  await expect(page.locator('.ch-actions a[href="#recevoir-le-pdf"]')).toBeVisible();
  const old = await request.get("/telechargements/charte-ia-pme-modele-waimia.pdf", { maxRedirects: 0 });
  expect(old.status()).not.toBe(200);
});

test("checklist 90 jours : cases cochables et conservées, PDF verrouillé (e-mail requis)", async ({ page, request }) => {
  await page.goto("/ressources/outils/checklist-90-jours-claude");
  await expect(page.locator("[data-ck-sheet] h3")).toHaveCount(3);
  await expect(page.locator("[data-ck-sheet] h4")).toHaveCount(12);
  const box = page.locator("#ck-p1");
  await page.locator('label[for="ck-p1"]').click();
  await expect(box).toBeChecked();
  await expect(page.locator("[data-ck-done]")).toHaveText("1");
  await page.reload();
  await expect(page.locator("#ck-p1")).toBeChecked();
  await expect(page.locator("a[download]")).toHaveCount(0);
  await expect(page.locator('.ck-actions a[href="#recevoir-le-pdf"]')).toBeVisible();
  const old = await request.get("/telechargements/checklist-90-jours-claude-pme-waimia.pdf", { maxRedirects: 0 });
  expect(old.status()).not.toBe(200);
});

// Vague 13 (16 octobre 2026) · captures ajoutées aux pages de contenu. Les aimants à pièce
// jointe ont une bande (un seul formulaire, vers /api/lead-magnet, champ vide) ; les aimants-
// outils, qui exigent un résultat calculé, ont un appel vers l'outil. Aucune soumission.
const PAGES_A_BANDE = [
  "/ressources/comparatifs/chatgpt-claude-gemini-perplexity-pme",
  "/ressources/guides/claude-in-chrome-entreprise",
  "/services/integration-mistral-ai",
];
for (const path of PAGES_A_BANDE) {
  test(`bande de capture : ${path}`, async ({ page }) => {
    await page.goto(path);
    const band = page.locator("main [data-lcb]");
    await expect(band).toHaveCount(1);
    await band.scrollIntoViewIfNeeded();
    await expect(band).toBeVisible();
    await expect(band.locator("form[data-lead-form]")).toHaveAttribute("action", "/api/lead-magnet");
    await expect(band.locator('input[name="email"][type="email"]')).toHaveValue("");
  });
}
const PAGES_VERS_OUTIL: Array<[string, string]> = [
  ["/implantations/montpellier", "/ressources/diagnostics/maturite-ia"],
  ["/services/crm-scoring-routing", "/ressources/outils/calculateur-roi-ia"],
];
for (const [path, outil] of PAGES_VERS_OUTIL) {
  test(`appel vers l'outil : ${path}`, async ({ page }) => {
    await page.goto(path);
    const link = page.locator(`main a[href="${outil}"]`).first();
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
  });
}
