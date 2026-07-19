/**
 * ds-save-dev.mjs - Integration Astro DEV-ONLY : persistance git-based du DS Studio.
 *
 * DEV-ONLY : ce middleware n'existe que sous `astro dev` (hook `astro:server:setup`,
 * appele juste apres la creation du serveur Vite en mode dev). Il n'est JAMAIS bundle
 * en build static/prod (`output: 'static'`), donc aucune fonction serverless n'est
 * exposee sur waimia.com. Sur localhost le changement de token est deja visible
 * instantanement (HMR Astro) des l'ecriture de tokens.css ; le commit+push+attente
 * sert la PERSISTANCE et la mise a jour du deploiement preview Vercel. La version
 * hebergee multi-tenant (token serveur GitHub) = couche C' ulterieure, hors scope.
 *
 * Quatre routes, memes garde-fous :
 *   - POST /api/ds/save    : ecrit les tokens edites dans tokens.css (persistance DS).
 *   - POST /api/ds/preset  : enregistre un preset de THEME nomme (snapshot des tokens
 *                            modifies) dans src/data/ds-presets.json + regenere
 *                            src/styles/themes.css (un bloc [data-theme='<slug>']).
 *   - POST /api/ds/compose : persiste un PageDocument du builder (#39) en brouillon local
 *                            src/data/page-variants/<slug>.json (ecriture NON destructive,
 *                            hors git, jamais src/content/**). Valide le doc via la MEME
 *                            fonction que la route de rendu (validatePageDoc, source unique,
 *                            chargee par server.ssrLoadModule car sa chaine tire des modules
 *                            virtuels Vite/astro:content non importables en Node natif).
 *   - GET/POST/DELETE
 *     /api/ds/saved         : store "Saved sections" (copies de sections sauvegardees depuis
 *                            le builder) en brouillon local src/data/saved-sections.json (meme
 *                            regime que /api/ds/compose : ecriture NON destructive, hors git).
 *                            POST valide { type, ...props } via `sectionSchema`
 *                            (discriminatedUnion, MEME source de verite que le rendu/compose),
 *                            chargee par server.ssrLoadModule pour la meme raison que
 *                            PAGE_DOC_MODULE ci-dessous.
 *
 * Garde-fous (identiques sur les 2 premieres routes ; /api/ds/compose et /api/ds/saved n'ecrivent
 * qu'un brouillon local sans push git, donc pas de garde keyword/refus-main, mais slug/id stricts
 * anti-traversal) :
 *   - keyword       : compare a DS_SAVE_KEYWORD (defaut WAIMIA-SAVE) -> 403 sinon
 *                     (protege contre une sauvegarde accidentelle ; jamais logue).
 *   - refus main    : lit la branche courante, refuse de pousser sur main (prod).
 *   - tokens stricts : n'accepte que des tokens EXISTANTS dans tokens.css
 *                     (un token inconnu -> 400, on ne cree jamais de token). Le preset
 *                     ne MUTE PAS tokens.css : il en valide seulement les cles connues.
 *
 * Aucune dependance npm : Node natif (fs / child_process) + logique partagee avec
 * le CLI `npm run ds:apply` (packages/ds-tokens/ds-tokens.mjs).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parseExport, applyTokenMap, parseKnownTokens } from '../../packages/ds-tokens/ds-tokens.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '../..');
const TOKENS_PATH = resolve(PROJECT_ROOT, 'packages/ds-tokens/tokens.css');
const DS_PRESETS_PATH = resolve(PROJECT_ROOT, 'src/data/ds-presets.json');
const THEMES_CSS_PATH = resolve(PROJECT_ROOT, 'src/styles/themes.css');
const PAGE_VARIANTS_DIR = resolve(PROJECT_ROOT, 'src/data/page-variants');
const SAVED_SECTIONS_PATH = resolve(PROJECT_ROOT, 'src/data/saved-sections.json');
const FIXED_DELAY_SECONDS = 180;

const DEFAULT_KEYWORD = 'WAIMIA-SAVE';
const ROUTE = '/api/ds/save';
const PRESET_ROUTE = '/api/ds/preset';
const COMPOSE_ROUTE = '/api/ds/compose';
const SAVED_ROUTE = '/api/ds/saved';
// Source de verite de la validation (identique a src/pages/library/builder/render.astro).
const PAGE_DOC_MODULE = '@waimia/ds-kernel/lib/page-document';
// Source de verite du contrat d'instance de section (discriminatedUnion 'type' -> schema Zod).
// MEME module que celui dont sectionsArraySchema derive (packages/ds-kernel/src/schemas/sections.ts).
const SECTIONS_SCHEMA_MODULE = '@waimia/ds-kernel/schemas/sections';

// --- Helpers HTTP ------------------------------------------------------------

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let raw = '';
    let tooBig = false;
    req.on('data', (chunk) => {
      raw += chunk;
      // Garde-fou taille : un export de tokens ne fait jamais 1 Mo.
      if (raw.length > 1_000_000) {
        tooBig = true;
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooBig) return rejectBody(new Error('body trop volumineux'));
      resolveBody(raw);
    });
    req.on('error', rejectBody);
  });
}

// --- Git helpers (synchrones, args en tableau = aucune injection shell) -------

function git(args) {
  return execFileSync('git', args, { cwd: PROJECT_ROOT, encoding: 'utf8' }).trim();
}

// --- Presets : slug + projection themes.css (source unique, partagee avec le gate) --

/**
 * Slugifie un nom humain de preset : minuscule, sans accents, [a-z0-9] + tirets.
 * @param {string} name
 * @returns {string}
 */
export function slugify(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const THEMES_HEADER =
  '/* GENERE depuis src/data/ds-presets.json. NE PAS EDITER A LA MAIN.\n' +
  ' * Regenere entierement a chaque sauvegarde de preset via le DS Studio\n' +
  ' * (POST /api/ds/preset, dev-only). Un bloc [data-theme=\'<slug>\'] par preset. */\n';

/**
 * Projette la liste de presets en CSS deterministe (1 bloc [data-theme] par preset).
 * Fonction PURE : le middleware l'ecrit, le gate check:ds-presets la recompare octet a
 * octet -> impossible que themes.css derive du JSON.
 * @param {Array<{slug:string,tokens:Record<string,string>}>} presets
 * @returns {string}
 */
export function renderThemesCss(presets) {
  const blocks = (Array.isArray(presets) ? presets : []).map((p) => {
    const tokens = p && p.tokens && typeof p.tokens === 'object' ? p.tokens : {};
    const lines = Object.keys(tokens)
      .sort()
      .map((k) => `  ${k}: ${tokens[k]};`);
    return `\n[data-theme='${p && p.slug}'] {\n${lines.join('\n')}\n}\n`;
  });
  return THEMES_HEADER + blocks.join('');
}

// --- Handler -----------------------------------------------------------------

async function handler(req, res, next) {
  if (req.method !== 'POST') return next();

  // 1. Lecture + parse du body
  let body;
  try {
    const raw = await readBody(req);
    body = JSON.parse(raw || '{}');
  } catch {
    return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
  }

  const { tokens: tokenObj, keyword } = body || {};

  // 2. Save-guard keyword (jamais logue la valeur attendue ni la valeur recue)
  const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;
  if (String(keyword || '') !== expected) {
    return sendJson(res, 403, { ok: false, error: 'keyword' });
  }

  // 3. Tokens fournis ?
  if (!tokenObj || typeof tokenObj !== 'object' || Array.isArray(tokenObj)) {
    return sendJson(res, 400, { ok: false, error: 'aucun token fourni' });
  }
  let tokenMap;
  try {
    tokenMap = parseExport(JSON.stringify(tokenObj));
  } catch (e) {
    return sendJson(res, 400, { ok: false, error: e.message });
  }
  if (tokenMap.size === 0) {
    return sendJson(res, 400, { ok: false, error: 'aucun token fourni' });
  }

  // 4. Garde-fou branche : jamais de push automatique sur main (prod = waimia.com)
  let branch;
  try {
    branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  } catch {
    return sendJson(res, 500, { ok: false, error: 'impossible de lire la branche git' });
  }
  if (branch === 'main') {
    return sendJson(res, 403, { ok: false, error: 'refus push main' });
  }

  // 5. Ecriture des tokens (STRICT : tokens existants uniquement, allowNew:false)
  if (!existsSync(TOKENS_PATH)) {
    return sendJson(res, 500, { ok: false, error: 'tokens.css introuvable' });
  }
  let changedCount;
  try {
    const cssOriginal = readFileSync(TOKENS_PATH, 'utf8');
    const result = applyTokenMap(cssOriginal, tokenMap, { allowNew: false });
    changedCount = result.changedCount;
    if (changedCount === 0) {
      return sendJson(res, 400, { ok: false, error: 'aucun changement (valeurs identiques)' });
    }
    writeFileSync(TOKENS_PATH, result.css, 'utf8');
  } catch (e) {
    // token inconnu -> 400 (on ne cree jamais de token) ; autre -> 500
    const isUnknown = /inconnu/.test(e.message || '');
    return sendJson(res, isUnknown ? 400 : 500, { ok: false, error: e.message });
  }

  // 6. Git : add + commit + push sur la branche courante
  try {
    git(['add', 'packages/ds-tokens/tokens.css']);
    git(['commit', '-m', `chore(ds): tokens via DS Studio (${changedCount} tokens)`]);
    git(['push', 'origin', branch]);
  } catch (e) {
    // stderr de git peut contenir des infos utiles mais jamais de secret.
    const detail = (e.stderr && String(e.stderr).trim()) || e.message || 'git a echoue';
    return sendJson(res, 500, { ok: false, error: detail });
  }

  // 7. Succes : sha court + meta pour le loader cote client
  let commit = '';
  try {
    commit = git(['rev-parse', '--short', 'HEAD']);
  } catch {
    commit = '';
  }

  return sendJson(res, 200, {
    ok: true,
    branch,
    commit,
    count: changedCount,
    fixedDelaySeconds: FIXED_DELAY_SECONDS,
  });
}

// --- Handler preset ----------------------------------------------------------
// Enregistre un preset de THEME nomme (snapshot des tokens modifies). Memes garde-fous
// que /api/ds/save (keyword non logue, refus main, tokens connus uniquement). N'ECRIT
// PAS tokens.css : upsert dans ds-presets.json + regeneration COMPLETE de themes.css.

async function presetHandler(req, res, next) {
  if (req.method !== 'POST') return next();

  // 1. Lecture + parse du body
  let body;
  try {
    const raw = await readBody(req);
    body = JSON.parse(raw || '{}');
  } catch {
    return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
  }

  const { name, tokens: tokenObj, keyword } = body || {};

  // 2. Save-guard keyword (jamais logue)
  const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;
  if (String(keyword || '') !== expected) {
    return sendJson(res, 403, { ok: false, error: 'keyword' });
  }

  // 3. Nom du preset -> slug
  const presetName = String(name || '').trim();
  if (!presetName) {
    return sendJson(res, 400, { ok: false, error: 'nom de preset manquant' });
  }
  const slug = slugify(presetName);
  if (!slug) {
    return sendJson(res, 400, { ok: false, error: 'nom de preset invalide (slug vide)' });
  }

  // 4. Tokens fournis ?
  if (!tokenObj || typeof tokenObj !== 'object' || Array.isArray(tokenObj)) {
    return sendJson(res, 400, { ok: false, error: 'aucun token fourni' });
  }
  let tokenMap;
  try {
    tokenMap = parseExport(JSON.stringify(tokenObj));
  } catch (e) {
    return sendJson(res, 400, { ok: false, error: e.message });
  }
  if (tokenMap.size === 0) {
    return sendJson(res, 400, { ok: false, error: 'aucun token fourni' });
  }

  // 5. Tokens connus uniquement (allowNew:false) : on VALIDE contre tokens.css sans le muter.
  if (!existsSync(TOKENS_PATH)) {
    return sendJson(res, 500, { ok: false, error: 'tokens.css introuvable' });
  }
  let known;
  try {
    known = parseKnownTokens(readFileSync(TOKENS_PATH, 'utf8'));
  } catch (e) {
    return sendJson(res, 500, { ok: false, error: e.message });
  }
  const unknown = [...tokenMap.keys()].filter((k) => !known.has(k));
  if (unknown.length > 0) {
    return sendJson(res, 400, { ok: false, error: `token(s) inconnu(s) refuse(s) : ${unknown.join(', ')}` });
  }

  // 6. Garde-fou branche : jamais de push automatique sur main (prod)
  let branch;
  try {
    branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  } catch {
    return sendJson(res, 500, { ok: false, error: 'impossible de lire la branche git' });
  }
  if (branch === 'main') {
    return sendJson(res, 403, { ok: false, error: 'refus push main' });
  }

  // 7. Upsert par slug dans ds-presets.json + regeneration complete de themes.css
  let store = { presets: [] };
  if (existsSync(DS_PRESETS_PATH)) {
    try {
      const parsed = JSON.parse(readFileSync(DS_PRESETS_PATH, 'utf8'));
      if (parsed && Array.isArray(parsed.presets)) store = { presets: parsed.presets };
    } catch {
      return sendJson(res, 500, { ok: false, error: 'ds-presets.json illisible' });
    }
  }
  const tokensObj = {};
  for (const [k, v] of tokenMap) tokensObj[k] = v;
  // savedAt : ISO cote serveur dev (jamais de Date cote validation/gate).
  const entry = { slug, name: presetName, savedAt: new Date().toISOString(), tokens: tokensObj };
  const idx = store.presets.findIndex((p) => p && p.slug === slug);
  if (idx >= 0) store.presets[idx] = entry;
  else store.presets.push(entry);
  store.presets.sort((a, b) => String(a && a.slug).localeCompare(String(b && b.slug)));

  try {
    writeFileSync(DS_PRESETS_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
    writeFileSync(THEMES_CSS_PATH, renderThemesCss(store.presets), 'utf8');
  } catch (e) {
    return sendJson(res, 500, { ok: false, error: e.message });
  }

  // 8. Git : add + commit + push sur la branche courante
  try {
    git(['add', 'src/data/ds-presets.json', 'src/styles/themes.css']);
    git(['commit', '-m', `chore(ds): preset "${slug}" via DS Studio (${tokenMap.size} tokens)`]);
    git(['push', 'origin', branch]);
  } catch (e) {
    const detail = (e.stderr && String(e.stderr).trim()) || e.message || 'git a echoue';
    return sendJson(res, 500, { ok: false, error: detail });
  }

  // 9. Succes : sha court + meta pour le loader cote client
  let commit = '';
  try {
    commit = git(['rev-parse', '--short', 'HEAD']);
  } catch {
    commit = '';
  }

  return sendJson(res, 200, {
    ok: true,
    branch,
    commit,
    slug,
    name: presetName,
    count: tokenMap.size,
    fixedDelaySeconds: FIXED_DELAY_SECONDS,
  });
}

// --- Handler compose ---------------------------------------------------------
// Persiste un PageDocument du builder (#39) en brouillon local (src/data/page-variants/<slug>.json).
// Ecriture NON destructive (hors git, jamais src/content/**). Le doc est valide par la MEME
// fonction que la route de rendu (validatePageDoc) : source unique, aucune re-validation maison.
// La validation est chargee via `server.ssrLoadModule` : la chaine de `@waimia/ds-kernel/lib/
// page-document` tire des schemas Zod exposes via des specifiers resolus par Vite (workspace +
// virtuels), non chargeables par l'import ESM natif de Node dans ce fichier .mjs.
//
// Body attendu : { slug?: string, doc: PageDocument }. Si `slug` est absent, on retombe sur
// `doc.meta.slug`. Le slug est strictement assaini (slugify) et refuse tout path traversal
// (`..`, `/`, `\`) AVANT toute ecriture. Overwrite d'un meme slug = autorise (brouillon).

function makeComposeHandler(server) {
  return async function composeHandler(req, res, next) {
    if (req.method !== 'POST') return next();

    // 1. Lecture + parse du body
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || '{}');
    } catch {
      return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
    }

    // 2. Extraction du PageDocument : forme canonique { slug?, doc }, ou le doc a plat
    //    (reconnu par sa cle $schema) pour tolerer un POST direct du PageDocument.
    const doc = body && typeof body === 'object' && body.doc && typeof body.doc === 'object'
      ? body.doc
      : body;
    if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
      return sendJson(res, 400, { ok: false, error: 'PageDocument manquant' });
    }

    // 3. Slug : explicite (body.slug) sinon doc.meta.slug. Refus STRICT du path traversal AVANT
    //    tout slugify (on rejette, on ne sanitise pas silencieusement) puis assainissement.
    const rawSlug = String(
      (body && typeof body.slug === 'string' && body.slug) ||
        (doc.meta && typeof doc.meta.slug === 'string' && doc.meta.slug) ||
        '',
    ).trim();
    if (!rawSlug) {
      return sendJson(res, 400, { ok: false, error: 'slug manquant (body.slug ou doc.meta.slug)' });
    }
    if (/[\\/]|\.\.|\0/.test(rawSlug)) {
      return sendJson(res, 400, { ok: false, error: 'slug invalide (path traversal refuse)' });
    }
    const slug = slugify(rawSlug);
    if (!slug) {
      return sendJson(res, 400, { ok: false, error: 'slug invalide (vide apres assainissement)' });
    }

    // 4. Validation : MEME fonction que render.astro (structure Zod + slot-level de contenu).
    let validatePageDoc;
    try {
      ({ validatePageDoc } = await server.ssrLoadModule(PAGE_DOC_MODULE));
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: `validation indisponible : ${e.message}` });
    }
    const validation = validatePageDoc(doc);
    if (!validation.valid) {
      const errors = (validation.errors || []).map((e) => {
        const where = e.index >= 0 ? `section #${e.index}${e.type ? ` (${e.type})` : ''}` : 'document';
        const field = e.field ? ` · champ « ${e.field} »` : '';
        return `${where}${field} : ${e.message}`;
      });
      return sendJson(res, 400, { ok: false, error: 'PageDocument invalide', errors });
    }

    // 5. Ecriture du brouillon : src/data/page-variants/<slug>.json (dossier cree si absent).
    //    Ceinture + bretelles : on prouve que le chemin final reste DANS page-variants.
    const filePath = resolve(PAGE_VARIANTS_DIR, `${slug}.json`);
    if (dirname(filePath) !== PAGE_VARIANTS_DIR) {
      return sendJson(res, 400, { ok: false, error: 'slug invalide (chemin hors page-variants)' });
    }
    try {
      mkdirSync(PAGE_VARIANTS_DIR, { recursive: true });
      // On ecrit le doc TEL QUEL (round-trip exact avec ce qui a ete envoye), indente 2 + newline.
      writeFileSync(filePath, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }

    return sendJson(res, 200, {
      ok: true,
      path: `src/data/page-variants/${slug}.json`,
      slug,
    });
  };
}

// --- Handler saved sections ---------------------------------------------------
// Store "Saved sections" (copies de sections sauvegardees depuis le builder) en brouillon local
// src/data/saved-sections.json = { sections: [{ id, label, type, props, sourcePresetId?, createdAt }] }.
// Meme regime que /api/ds/compose : ecriture NON destructive, hors git (pas de commit/push),
// donc pas de garde keyword/refus-main (coherent avec le commentaire d'en-tete de fichier).
//
//   GET    /api/ds/saved         -> liste le store tel quel.
//   POST   /api/ds/saved         -> { label, type, props, sourcePresetId? }. Valide `{ ...props,
//                                    type }` via `sectionSchema` (discriminatedUnion 'type',
//                                    MEME source de verite que sectionsArraySchema/le rendu),
//                                    chargee par server.ssrLoadModule pour la meme raison que
//                                    PAGE_DOC_MODULE (chaine de modules non importable en Node
//                                    natif). Genere id = slugify(label) deduplique (-2, -3, ...)
//                                    + createdAt ISO, puis upsert (par id) et ecrit le store.
//   DELETE /api/ds/saved?id=<id> -> retire l'entree ; 404 si id inconnu.

function readSavedStore() {
  if (!existsSync(SAVED_SECTIONS_PATH)) return { sections: [] };
  try {
    const parsed = JSON.parse(readFileSync(SAVED_SECTIONS_PATH, 'utf8'));
    if (parsed && Array.isArray(parsed.sections)) return { sections: parsed.sections };
  } catch {
    // Store corrompu -> on repart d'un store vide plutot que de faire planter la route.
  }
  return { sections: [] };
}

function writeSavedStore(store) {
  mkdirSync(dirname(SAVED_SECTIONS_PATH), { recursive: true });
  writeFileSync(SAVED_SECTIONS_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

/**
 * Genere un id slug depuis un label humain, deduplique contre les ids existants (-2, -3, ...).
 * @param {string} label
 * @param {Set<string>} existingIds
 * @returns {string}
 */
export function generateSavedId(label, existingIds) {
  const base = slugify(label) || 'section';
  let candidate = base;
  let n = 2;
  while (existingIds.has(candidate)) {
    candidate = `${base}-${n}`;
    n += 1;
  }
  return candidate;
}

function makeSavedHandler(server) {
  return async function savedHandler(req, res, next) {
    // Parse robuste de la query (?id=...) quelle que soit la maniere dont le mount-path a ete
    // retire de req.url par connect (les differentes versions ne s'accordent pas toutes) : on ne
    // regarde QUE searchParams, jamais le pathname.
    const url = new URL(req.url || '/', 'http://localhost');

    if (req.method === 'GET') {
      return sendJson(res, 200, { ok: true, ...readSavedStore() });
    }

    if (req.method === 'DELETE') {
      const id = String(url.searchParams.get('id') || '').trim();
      if (!id) {
        return sendJson(res, 400, { ok: false, error: 'id manquant' });
      }
      const store = readSavedStore();
      const idx = store.sections.findIndex((s) => s && s.id === id);
      if (idx < 0) {
        return sendJson(res, 404, { ok: false, error: `entree inconnue : ${id}` });
      }
      const [removed] = store.sections.splice(idx, 1);
      try {
        writeSavedStore(store);
      } catch (e) {
        return sendJson(res, 500, { ok: false, error: e.message });
      }
      return sendJson(res, 200, { ok: true, removed });
    }

    if (req.method !== 'POST') return next();

    // 1. Lecture + parse du body
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || '{}');
    } catch {
      return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
    }

    const { label, type, props, sourcePresetId } = body || {};

    // 2. Label non vide
    const trimmedLabel = String(label || '').trim();
    if (!trimmedLabel) {
      return sendJson(res, 400, { ok: false, error: 'label manquant' });
    }

    // 3. Type + props presents (forme minimale) avant validation Zod
    if (typeof type !== 'string' || !type) {
      return sendJson(res, 400, { ok: false, error: 'type manquant' });
    }
    if (!props || typeof props !== 'object' || Array.isArray(props)) {
      return sendJson(res, 400, { ok: false, error: 'props doit etre un objet' });
    }

    // 4. Validation : MEME schema que le rendu (sectionSchema, discriminatedUnion 'type').
    //    Un type inconnu -> issue Zod sur le champ 'type' (invalid_union) -> 400 avec le detail.
    let sectionSchema;
    try {
      ({ sectionSchema } = await server.ssrLoadModule(SECTIONS_SCHEMA_MODULE));
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: `validation indisponible : ${e.message}` });
    }
    const candidate = { ...props, type };
    const validation = sectionSchema.safeParse(candidate);
    if (!validation.success) {
      const errors = validation.error.issues.map(
        (issue) => `${issue.path.join('.') || 'section'} : ${issue.message}`,
      );
      return sendJson(res, 400, { ok: false, error: 'section invalide', errors });
    }

    // 5. id (slugify + dedup) + createdAt, puis upsert par id (le dedup garantit un id neuf sauf
    //    collision deja presente dans le store, geree defensivement par l'upsert ci-dessous).
    const store = readSavedStore();
    const existingIds = new Set(store.sections.map((s) => s && s.id));
    const id = generateSavedId(trimmedLabel, existingIds);
    const entry = {
      id,
      label: trimmedLabel,
      type,
      props,
      ...(typeof sourcePresetId === 'string' && sourcePresetId ? { sourcePresetId } : {}),
      createdAt: new Date().toISOString(),
    };
    const idx = store.sections.findIndex((s) => s && s.id === id);
    if (idx >= 0) store.sections[idx] = entry;
    else store.sections.push(entry);

    try {
      writeSavedStore(store);
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }

    return sendJson(res, 200, { ok: true, section: entry });
  };
}

// --- Integration -------------------------------------------------------------

export default function dsSaveDev() {
  return {
    name: 'ds-save-dev',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use(ROUTE, handler);
        server.middlewares.use(PRESET_ROUTE, presetHandler);
        server.middlewares.use(COMPOSE_ROUTE, makeComposeHandler(server));
        server.middlewares.use(SAVED_ROUTE, makeSavedHandler(server));
        if (logger && typeof logger.info === 'function') {
          logger.info(
            `DEV-ONLY : POST ${ROUTE} + ${PRESET_ROUTE} + ${COMPOSE_ROUTE} + GET/POST/DELETE ${SAVED_ROUTE} actifs (DS Studio "Enregistrer" / presets / builder compose / saved sections)`,
          );
        }
      },
    },
  };
}
