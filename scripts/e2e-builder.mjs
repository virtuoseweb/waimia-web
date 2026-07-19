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
// nettoyage du fichier de test.

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
    // 1. Charger la page builder + hydrater l'ile React (les items du picker apparaissent).
    const resp = await page.goto(BUILDER_URL, { waitUntil: 'networkidle', timeout: 45000 });
    const httpOk = resp && resp.status() === 200;
    try {
      await page.locator('button.bld-picker-item').first().waitFor({ state: 'visible', timeout: 20000 });
      const pickerCount = await page.locator('button.bld-picker-item').count();
      const fsErrors = consoleErrors.filter((e) => /@fs|403|Failed to fetch dynamically/i.test(e));
      step(
        'Hydratation ile React (picker interactif)',
        httpOk && pickerCount > 0 && fsErrors.length === 0,
        `HTTP ${resp ? resp.status() : '?'}, ${pickerCount} types, ${fsErrors.length} erreurs @fs`,
      );
      if (fsErrors.length > 0) {
        console.log('   ⚠️ erreurs @fs (worktree vite.server.fs.allow ?) :', fsErrors.slice(0, 3));
      }
    } catch (e) {
      step('Hydratation ile React (picker interactif)', false, `picker introuvable : ${e.message}`);
      throw new Error('hydratation echouee : flow interrompu');
    }

    // 2. Composer : renseigner le slug de test puis ajouter 1 section via l'UI reelle (clic).
    const slugInput = page.locator('label.bld-field', { hasText: 'Slug' }).locator('input.bld-input');
    await slugInput.fill(TEST_SLUG);

    const firstItem = page.locator('button.bld-picker-item').first();
    const addedType = (await firstItem.locator('span.bld-picker-type').innerText()).trim();
    await firstItem.click();

    await page.locator('li.bld-block').first().waitFor({ state: 'visible', timeout: 8000 });
    const blockCount = await page.locator('li.bld-block').count();
    step(
      'Ajout d\'une section via l\'UI (clic Playwright)',
      blockCount >= 1,
      `${blockCount} bloc(s) dans le canvas, type=${addedType}`,
    );

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
