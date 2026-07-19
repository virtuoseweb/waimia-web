// e2e-builder.mjs : Harness E2E du builder visuel (#114 / #39) : prouve le flow COMPLET
// composer -> Enregistrer -> JSON persiste -> relecture disque -> cas limite d'erreur.
//
// Usage : `node scripts/e2e-builder.mjs [port]` (defaut 4610). Suppose un `astro dev`
// deja actif sur ce port (la route POST /api/ds/compose est DEV-ONLY, integration
// src/integrations/ds-save-dev.mjs). Script npm : `pnpm run e2e:builder`.
//
// Etapes prouvees (chacune ✅/❌, exit 0 si tout passe) : hydratation de l'ile React,
// ajout d'1 section via l'UI reelle (clic Playwright, pas d'appel API), clic Enregistrer
// (slug `e2e-smoke`), assertion du statut UI + de la reponse HTTP 200, write->read du
// fichier src/data/page-variants/e2e-smoke.json (structure : sections non vides, types
// non vides, meta.slug), cas limite (POST direct doc invalide -> 4xx propre, pas 500),
// cas limite JSON malforme (400), puis (B10) :
//   9.  navigation projet REEL : dashboard -> carte Waimia -> sitemap (118 cartes / 11 groupes)
//       -> ouverture de /services/site-web-ia (14 blocs + bandeau « Page reelle ») ;
//   10. edition inspecteur (onglet Contenu) -> la vignette du bloc edite recharge avec la valeur,
//       les autres blocs restent intacts ;
//   11. save-as-version roundtrip (/api/ds/saved) : write->read serveur + onglet Sauvegardees du
//       picker + reinsertion + nettoyage DELETE ;
//   12. custom-preset roundtrip via l'UI du bouton P3 « Enregistrer comme variante »
//       (POST /api/ds/custom-preset -> GET liste -> DELETE -> GET vide) ;
// puis nettoyage du/des fichier(s) de test. Total : 12 etapes.

import { chromium } from '@playwright/test';
import { readFileSync, existsSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const PORT = process.argv[2] || process.env.E2E_BUILDER_PORT || '4610';
const BASE = `http://localhost:${PORT}`;
const BUILDER_URL = `${BASE}/library/builder`;
const COMPOSE_URL = `${BASE}/api/ds/compose`;
const TEST_SLUG = 'e2e-smoke';
const TEST_FILE = resolve(PROJECT_ROOT, 'src/data/page-variants', `${TEST_SLUG}.json`);

const results = [];
const step = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  const icon = ok ? '✅' : '❌';
  console.log(`${icon} ${name}${detail ? ` :: ${detail}` : ''}`);
};

// Nettoyage best-effort d'un brouillon de test (avant + apres).
const cleanup = () => {
  for (const slug of [TEST_SLUG, 'e2e-invalid-doc']) {
    const f = resolve(PROJECT_ROOT, 'src/data/page-variants', `${slug}.json`);
    if (existsSync(f)) {
      try {
        unlinkSync(f);
      } catch {
        /* best-effort */
      }
    }
  }
};

async function main() {
  cleanup(); // etat de depart propre (pas de fichier residuel d'un run precedent)

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160));
  });
  page.on('pageerror', (e) => consoleErrors.push(`PAGEERROR ${e.message.slice(0, 160)}`));

  // Capture la reponse HTTP de l'enregistrement (statut + payload) pour l'assertion serveur.
  let composeResponse = null;
  page.on('response', async (resp) => {
    if (resp.url().endsWith('/api/ds/compose') && resp.request().method() === 'POST') {
      let json = null;
      try {
        json = await resp.json();
      } catch {
        /* non-JSON */
      }
      composeResponse = { status: resp.status(), json };
    }
  });

  try {
    // 1. Charger la page builder + hydrater l'ile React. L'app s'ouvre desormais sur le DASHBOARD
    //    d'accueil (N2) : on clique « Nouveau brouillon » pour atteindre l'editeur vierge, puis le
    //    picker est le panneau AddPanel (vignettes) ouvert par « + Ajouter une section » (B5/B9).
    const resp = await page.goto(BUILDER_URL, { waitUntil: 'networkidle', timeout: 45000 });
    const httpOk = resp && resp.status() === 200;
    let addedType = '';
    try {
      // Dashboard -> editeur vierge (le harness teste le flow composer, pas l'ouverture de page reelle).
      const newDraft = page.locator('[data-testid="dash-new-draft"]');
      await newDraft.waitFor({ state: 'visible', timeout: 20000 });
      await newDraft.click();
      const trigger = page.locator('button.bld-add-trigger').first();
      await trigger.waitFor({ state: 'visible', timeout: 20000 });
      await trigger.click();
      // Le panneau AddPanel s'ouvre : la grille des vignettes de types apparait.
      await page.locator('[data-testid="add-grid"] .wa-thumb__frame').first().waitFor({ state: 'visible', timeout: 15000 });
      const thumbCount = await page.locator('[data-testid="add-grid"] .wa-thumb__frame').count();
      const fsErrors = consoleErrors.filter((e) => /@fs|403|Failed to fetch dynamically/i.test(e));
      step(
        'Hydratation ile React (picker interactif)',
        httpOk && thumbCount > 0 && fsErrors.length === 0,
        `HTTP ${resp ? resp.status() : '?'}, ${thumbCount} vignettes, ${fsErrors.length} erreurs @fs`,
      );
      if (fsErrors.length > 0) {
        console.log('   ⚠️ erreurs @fs (worktree vite.server.fs.allow ?) :', fsErrors.slice(0, 3));
      }
    } catch (e) {
      step('Hydratation ile React (picker interactif)', false, `picker introuvable : ${e.message}`);
      throw new Error('hydratation echouee : flow interrompu');
    }

    // 2. Composer : ajouter 1 section via l'UI reelle (clic sur une vignette du panneau AddPanel),
    //    puis renseigner le slug de test (le panneau se ferme apres le clic).
    const firstThumb = page.locator('[data-testid="add-grid"] .wa-thumb__frame').first();
    // Le libelle du type = aria-label de la vignette cliquable (label_fr = id du type cote hote).
    addedType = ((await firstThumb.getAttribute('aria-label')) || '').trim();
    await firstThumb.click();

    await page.locator('li.bld-block').first().waitFor({ state: 'visible', timeout: 8000 });
    const blockCount = await page.locator('li.bld-block').count();
    step(
      'Ajout d\'une section via l\'UI (clic Playwright)',
      blockCount >= 1,
      `${blockCount} bloc(s) dans le canvas, type=${addedType}`,
    );

    const slugInput = page.locator('label.bld-field', { hasText: 'Slug' }).locator('input.bld-input');
    await slugInput.fill(TEST_SLUG);

    // 3. Enregistrer : clic sur le bouton (POST /api/ds/compose) + assertion du statut UI.
    await page.locator('button.bld-btn', { hasText: /^Enregistrer$/ }).click();
    // Le succes affiche un <p class="bld-note">Brouillon enregistre : ...</p>.
    let uiSaveOk = false;
    let uiSaveText = '';
    try {
      const note = page.locator('p.bld-note', { hasText: 'Brouillon enregistr' });
      await note.waitFor({ state: 'visible', timeout: 15000 });
      uiSaveText = (await note.innerText()).trim();
      uiSaveOk = true;
    } catch {
      // Recupere un eventuel message d'erreur inline pour le diagnostic.
      const err = page.locator('.bld-slot-err').first();
      if (await err.count()) uiSaveText = (await err.innerText()).trim();
    }
    step('Statut UI d\'enregistrement (succes inline)', uiSaveOk, uiSaveText || '(aucun statut)');

    // 3bis. Assertion de la reponse HTTP (pas juste 200 : ok:true + path attendu).
    const httpSaveOk =
      composeResponse &&
      composeResponse.status === 200 &&
      composeResponse.json &&
      composeResponse.json.ok === true &&
      composeResponse.json.path === `src/data/page-variants/${TEST_SLUG}.json`;
    step(
      'Reponse HTTP /api/ds/compose (200 + ok:true + path)',
      !!httpSaveOk,
      composeResponse
        ? `status=${composeResponse.status}, path=${composeResponse.json && composeResponse.json.path}`
        : '(aucune reponse capturee)',
    );

    // 4. write->read : le fichier existe sur disque + structure valide.
    let fileOk = false;
    let fileDetail = '';
    if (existsSync(TEST_FILE)) {
      try {
        const parsed = JSON.parse(readFileSync(TEST_FILE, 'utf8'));
        const sections = Array.isArray(parsed.sections) ? parsed.sections : [];
        const allTyped = sections.length > 0 && sections.every((s) => s && typeof s.type === 'string' && s.type.length > 0);
        const hasAddedType = sections.some((s) => s.type === addedType);
        const slugOk = parsed.meta && parsed.meta.slug === TEST_SLUG;
        fileOk = allTyped && hasAddedType && !!slugOk;
        fileDetail = `${sections.length} section(s), meta.slug=${parsed.meta && parsed.meta.slug}, type «${addedType}» present=${hasAddedType}`;
      } catch (e) {
        fileDetail = `JSON illisible : ${e.message}`;
      }
    } else {
      fileDetail = `fichier absent : ${TEST_FILE}`;
    }
    step('write->read du brouillon persiste', fileOk, fileDetail);

    // 5. Cas limite : POST direct d'un doc INVALIDE -> statut d'erreur propre (4xx, pas 500).
    //    Le doc a un slug valide + structure de base mais un type de section inexistant :
    //    la validation Zod partagee (validatePageDoc) doit le refuser en 4xx.
    const invalidDoc = {
      slug: 'e2e-invalid-doc',
      doc: {
        $schema: 'waimia.page-document/v1',
        meta: { collection: 'home', slug: 'e2e-invalid-doc', lang: 'fr', title_fr: 'x', title_en: 'x', collectionExtra: {} },
        sections: [{ type: '___type_inexistant_e2e___' }],
      },
    };
    let edgeOk = false;
    let edgeDetail = '';
    try {
      const r = await fetch(COMPOSE_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(invalidDoc),
      });
      let payload = null;
      try {
        payload = await r.json();
      } catch {
        /* non-JSON */
      }
      edgeOk = r.status >= 400 && r.status < 500 && payload && payload.ok === false;
      edgeDetail = `status=${r.status}, ok=${payload && payload.ok}, error=${payload && payload.error}`;
    } catch (e) {
      edgeDetail = `fetch echoue : ${e.message}`;
    }
    step('Cas limite doc invalide (4xx propre, pas 500)', edgeOk, edgeDetail);

    // 6. Cas limite bis : body JSON malforme -> 400 corps JSON invalide.
    let malformedOk = false;
    let malformedDetail = '';
    try {
      const r = await fetch(COMPOSE_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{ pas du json',
      });
      malformedOk = r.status === 400;
      malformedDetail = `status=${r.status}`;
    } catch (e) {
      malformedDetail = `fetch echoue : ${e.message}`;
    }
    step('Cas limite JSON malforme (400)', malformedOk, malformedDetail);

    // ── Petits helpers de navigation dans l'app (SPA a ecrans internes) ──────────────────────────
    const backToProjects = async () => {
      await page.locator('.bldx-crumb__link', { hasText: 'Projets' }).first().click();
      await page.locator('[data-testid="dash-open-project"]').waitFor({ state: 'visible', timeout: 15000 });
    };
    // Ouvre l'AddPanel et ajoute la 1re vignette (retourne le type ajoute = aria-label).
    const addFirstThumb = async () => {
      await page.locator('button.bld-add-trigger').first().click();
      const thumb = page.locator('[data-testid="add-grid"] .wa-thumb__frame').first();
      await thumb.waitFor({ state: 'visible', timeout: 15000 });
      const t = ((await thumb.getAttribute('aria-label')) || '').trim();
      await thumb.click();
      return t;
    };

    // 9. Navigation projet REEL : dashboard -> carte Waimia -> sitemap (118 cartes / 11 groupes) ->
    //    ouvrir /services/site-web-ia -> 14 blocs + bandeau « Page reelle ».
    let navOk = false;
    let navDetail = '';
    try {
      await backToProjects();
      await page.locator('[data-testid="dash-open-project"]').click();
      const cardSel = '[data-testid="sitemap-page-card"]';
      await page.locator(cardSel).first().waitFor({ state: 'visible', timeout: 20000 });
      const cardCount = await page.locator(cardSel).count();
      const groupCount = await page.locator('[data-testid="sitemap-group"]').count();
      const targetCard = page.locator(`${cardSel}[data-route="/services/site-web-ia"]`).first();
      await targetCard.waitFor({ state: 'visible', timeout: 15000 });
      await targetCard.click();
      const banner = page.locator('[data-testid="editor-realpage-banner"]');
      await banner.waitFor({ state: 'visible', timeout: 20000 });
      const bannerText = (await banner.innerText()).trim();
      await page.locator('li.bld-block').first().waitFor({ state: 'visible', timeout: 15000 });
      const blockCount = await page.locator('li.bld-block').count();
      navOk =
        cardCount === 118 &&
        groupCount === 11 &&
        blockCount === 14 &&
        /site-web-ia/.test(bannerText);
      navDetail = `${cardCount} cartes, ${groupCount} groupes, ${blockCount} blocs, bandeau «${bannerText}»`;
    } catch (e) {
      navDetail = `echec navigation : ${e.message}`;
    }
    step('Navigation projet reel (sitemap 118/11 -> page reelle 14 blocs)', navOk, navDetail);

    // 10. Edition inspecteur -> vignette : sur un brouillon a 2 blocs, editer un champ texte via
    //     l'onglet Contenu et prouver que SEULE la vignette du bloc edite recharge avec la valeur.
    const SENTINEL = `E2ESENTINEL${Date.now()}`;
    let editOk = false;
    let editDetail = '';
    try {
      await backToProjects();
      await page.locator('[data-testid="dash-new-draft"]').click();
      await page.locator('button.bld-add-trigger').first().waitFor({ state: 'visible', timeout: 15000 });
      await addFirstThumb();
      await page.locator('li.bld-block').first().waitFor({ state: 'visible', timeout: 8000 });
      await addFirstThumb();
      await page.waitForFunction(() => document.querySelectorAll('li.bld-block').length >= 2, null, {
        timeout: 8000,
      });
      // Selectionne le bloc 0 (bouton type de la 1re carte) -> l'inspecteur monte.
      await page.locator('li.bld-block .bld-card-type').first().click();
      // Onglet Contenu.
      await page.locator('.wa-insp-tab', { hasText: 'Contenu' }).click();
      // 1er champ editable texte/textarea du panneau Contenu.
      const field = page
        .locator('.wa-insp-body input.wa-insp-input, .wa-insp-body textarea.wa-insp-textarea')
        .first();
      await field.waitFor({ state: 'visible', timeout: 8000 });
      await field.fill(SENTINEL);
      // Attend que la vignette du bloc 0 recharge avec la valeur (src GET ou srcdoc POST).
      const frameHasSentinel = (i) =>
        page.evaluate(
          ({ idx, needle }) => {
            const frames = document.querySelectorAll('li.bld-block iframe.bld-card-frame');
            const f = frames[idx];
            if (!f) return false;
            const src = f.getAttribute('src') || '';
            const srcdoc = f.getAttribute('srcdoc') || '';
            return src.includes(needle) || src.includes(encodeURIComponent(needle)) || srcdoc.includes(needle);
          },
          { idx: i, needle: SENTINEL },
        );
      let block0 = false;
      for (let i = 0; i < 30; i += 1) {
        block0 = await frameHasSentinel(0);
        if (block0) break;
        await page.waitForTimeout(200);
      }
      const block1 = await frameHasSentinel(1);
      editOk = block0 === true && block1 === false;
      editDetail = `bloc edite reflete=${block0}, autre bloc intact=${!block1}`;
    } catch (e) {
      editDetail = `echec edition : ${e.message}`;
    }
    step('Edition Contenu -> vignette du bloc edite rechargee (pas les autres)', editOk, editDetail);

    // 11. Save-as-version roundtrip : « Enregistrer comme version » -> /api/ds/saved write->read ->
    //     onglet Sauvegardees du picker -> reinsertion -> nettoyage DELETE.
    const VERSION_LABEL = `E2e Version ${Date.now()}`;
    let savedOk = false;
    let savedDetail = '';
    let savedId = '';
    try {
      const blocksBefore = await page.locator('li.bld-block').count();
      // Ouvre la mini-modale d'hote via l'outil ⭳ de la 1re carte.
      await page.locator('li.bld-block .bld-card-tool[title="Enregistrer comme version"]').first().click();
      const vInput = page.locator('.bldx-ov__panel--narrow input.bld-input');
      await vInput.waitFor({ state: 'visible', timeout: 8000 });
      await vInput.fill(VERSION_LABEL);
      await page.locator('.bldx-save__confirm').click();
      // La modale se ferme apres succes (POST + refresh).
      await page.locator('.bldx-save__confirm').waitFor({ state: 'hidden', timeout: 10000 });
      // write->read serveur.
      const listRes = await fetch(`${BASE}/api/ds/saved`);
      const listJson = await listRes.json().catch(() => null);
      const entry = listJson && Array.isArray(listJson.sections)
        ? listJson.sections.find((s) => s && s.label === VERSION_LABEL)
        : null;
      savedId = entry ? entry.id : '';
      // Onglet Sauvegardees du picker : l'entree apparait.
      await page.locator('button.bld-add-trigger').first().click();
      await page.locator('.wa-add__tab', { hasText: 'Sauvegard' }).click();
      const savedThumbs = page.locator('[data-testid="saved-grid"] .wa-thumb__frame');
      await savedThumbs.first().waitFor({ state: 'visible', timeout: 8000 });
      const savedShown = await savedThumbs.count();
      // Reinsertion : clic sur la vignette sauvegardee -> +1 bloc.
      await savedThumbs.first().click();
      await page.waitForFunction(
        (n) => document.querySelectorAll('li.bld-block').length > n,
        blocksBefore,
        { timeout: 8000 },
      );
      const blocksAfter = await page.locator('li.bld-block').count();
      // Nettoyage DELETE + relecture vide.
      let cleaned = false;
      if (savedId) {
        const del = await fetch(`${BASE}/api/ds/saved?id=${encodeURIComponent(savedId)}`, { method: 'DELETE' });
        const delJson = await del.json().catch(() => null);
        const after = await (await fetch(`${BASE}/api/ds/saved`)).json().catch(() => null);
        const stillThere = after && Array.isArray(after.sections)
          ? after.sections.some((s) => s && s.id === savedId)
          : true;
        cleaned = del.status === 200 && delJson && delJson.ok === true && !stillThere;
      }
      savedOk = !!savedId && savedShown >= 1 && blocksAfter > blocksBefore && cleaned;
      savedDetail = `id=${savedId || '?'}, vignettes=${savedShown}, blocs ${blocksBefore}->${blocksAfter}, nettoye=${cleaned}`;
    } catch (e) {
      savedDetail = `echec save-as-version : ${e.message}`;
    }
    step('Save-as-version roundtrip (/api/ds/saved write->read->reinsert->delete)', savedOk, savedDetail);

    // 12. Custom-preset roundtrip via l'UI du bouton P3 : « Enregistrer comme variante » -> POST ok
    //     -> GET liste la contient -> DELETE nettoyage -> GET vide.
    const VARIANT_LABEL = `E2e Variante ${Date.now()}`;
    let variantOk = false;
    let variantDetail = '';
    try {
      // Selectionne un bloc -> inspecteur, onglet Variante (defaut).
      await page.locator('li.bld-block .bld-card-type').first().click();
      await page.locator('.wa-insp-tab', { hasText: 'Variante' }).click();
      await page.locator('[data-testid="variant-save-open"]').click();
      await page.locator('[data-testid="variant-save-modal"]').waitFor({ state: 'visible', timeout: 8000 });
      await page.locator('[data-testid="variant-save-label"]').fill(VARIANT_LABEL);
      const variantId = (await page.locator('[data-testid="variant-save-id"]').inputValue()).trim();
      await page.locator('[data-testid="variant-save-submit"]').click();
      await page.locator('[data-testid="variant-save-ok"]').waitFor({ state: 'visible', timeout: 10000 });
      // GET serveur : la variante existe.
      const listJson = await (await fetch(`${BASE}/api/ds/custom-preset`)).json().catch(() => null);
      const present = listJson && Array.isArray(listJson.presets)
        ? listJson.presets.some((p) => p && p.id === variantId)
        : false;
      // DELETE + relecture vide.
      const del = await fetch(`${BASE}/api/ds/custom-preset?id=${encodeURIComponent(variantId)}`, { method: 'DELETE' });
      const delJson = await del.json().catch(() => null);
      const after = await (await fetch(`${BASE}/api/ds/custom-preset`)).json().catch(() => null);
      const emptied = after && Array.isArray(after.presets) && !after.presets.some((p) => p && p.id === variantId);
      variantOk = !!variantId && present && del.status === 200 && delJson && delJson.ok === true && emptied;
      variantDetail = `id=${variantId || '?'}, present=${present}, delete=${del.status}, vide=${emptied}`;
    } catch (e) {
      variantDetail = `echec custom-preset : ${e.message}`;
    }
    step('Custom-preset roundtrip via UI (POST->GET->DELETE->GET vide)', variantOk, variantDetail);
  } finally {
    await browser.close();
    // 7. Nettoyage du/des fichier(s) de test.
    const existedBefore = existsSync(TEST_FILE);
    if (process.env.E2E_KEEP === '1') {
      step('Nettoyage fichier de test', true, 'conserve (E2E_KEEP=1)');
      const failedK = results.filter((r) => !r.ok);
      console.log(`\nResultat : ${results.length - failedK.length}/${results.length} etapes OK (fichier conserve)`);
      process.exit(failedK.length > 0 ? 1 : 0);
    }
    cleanup();
    step('Nettoyage fichier de test', !existsSync(TEST_FILE), existedBefore ? `${TEST_SLUG}.json supprime` : 'rien a nettoyer');
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Resultat : ${results.length - failed.length}/${results.length} etapes OK`);
  if (failed.length > 0) {
    console.log(`Echecs : ${failed.map((f) => f.name).join(' | ')}`);
    process.exit(1);
  }
  console.log('Flow builder E2E : PASS');
  process.exit(0);
}

main().catch((e) => {
  console.error('❌ Harness interrompu :', e.message);
  process.exit(1);
});
