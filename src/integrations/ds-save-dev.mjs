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
 *   - GET/PATCH
 *     /api/ds/instance      : edition IN-PLACE d'une instance de section dans une page REELLE
 *                            (src/content/**). PATCH { keyword, file, index, props } remplace
 *                            sections[index] par `props` (props.type doit rester le type actuel :
 *                            on n'edite pas le type ici) apres validation via `sectionSchema`
 *                            (memes messages Zod detailles que /api/ds/saved). GET
 *                            ?file=...&index=... renvoie la section actuelle (lecture pour le
 *                            futur formulaire). Garde keyword (jamais logue) + refus-main comme
 *                            /api/ds/save (c'est la SEULE route qui touche le contenu reel).
 *                            AUCUN commit/push : le git diff est laisse a la review humaine.
 *                            Reecriture qui PRESERVE la convention du fichier (indentation +
 *                            newline finale detectees, JSON.stringify sinon 2 espaces + '\n').
 *   - GET/POST/DELETE
 *     /api/ds/custom-preset : store des VARIANTES CUSTOM (presets nommes) dans
 *                            packages/ds-kernel/src/lib/custom-presets.json, fusionne au runtime
 *                            par @waimia/ds-kernel/lib/section-presets (listPresets/getPreset/
 *                            allPresets). POST valide keyword + type (union sectionSchema) + id
 *                            kebab-case prefixe `<type>--` + unicite (vs presets TS/custom) + axes
 *                            de props connus (PresetProps) + layout/density (KNOWN_LAYOUTS/
 *                            KNOWN_DENSITIES). Refus-main (source du DS). AUCUN commit/push.
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
import { dirname, resolve, sep } from 'node:path';
import { parseExport, applyTokenMap, parseKnownTokens } from '../../packages/ds-tokens/ds-tokens.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '../..');
const TOKENS_PATH = resolve(PROJECT_ROOT, 'packages/ds-tokens/tokens.css');
const DS_PRESETS_PATH = resolve(PROJECT_ROOT, 'src/data/ds-presets.json');
const THEMES_CSS_PATH = resolve(PROJECT_ROOT, 'src/styles/themes.css');
const PAGE_VARIANTS_DIR = resolve(PROJECT_ROOT, 'src/data/page-variants');
const SAVED_SECTIONS_PATH = resolve(PROJECT_ROOT, 'src/data/saved-sections.json');
// Store DEV-ONLY des démos éditées localement (P4.4-h E2) : { overrides: { <type>: <props partiels> } }.
// Consommé par src/lib/section-demos.ts (overlay dev-only). Écriture NON destructive, hors git.
const DEMO_OVERRIDES_PATH = resolve(PROJECT_ROOT, 'src/data/demo-overrides.json');
// Store des VARIANTES CUSTOM (presets nommés) fusionnees au runtime par @waimia/ds-kernel/lib/
// section-presets. Fichier PACKAGE-LOCAL : l'endpoint /api/ds/custom-preset ecrit ce chemin, le
// kernel l'importe statiquement (frontiere respectee : le package n'importe jamais src/ de l'app).
const CUSTOM_PRESETS_PATH = resolve(PROJECT_ROOT, 'packages/ds-kernel/src/lib/custom-presets.json');
const CONTENT_DIR = resolve(PROJECT_ROOT, 'src/content');
// Store d'etat des apps internes (registre apps.config.ts) + scaffolder de sections.
const APPS_STATE_PATH = resolve(PROJECT_ROOT, 'src/data/apps-state.json');
const SCAFFOLD_SCRIPT = resolve(PROJECT_ROOT, 'scripts/scaffold-section.mjs');
const FIXED_DELAY_SECONDS = 180;

const DEFAULT_KEYWORD = 'WAIMIA-SAVE';
const ROUTE = '/api/ds/save';
const PRESET_ROUTE = '/api/ds/preset';
const COMPOSE_ROUTE = '/api/ds/compose';
const SAVED_ROUTE = '/api/ds/saved';
const INSTANCE_ROUTE = '/api/ds/instance';
const PAGE_ROUTE = '/api/ds/page';
const CUSTOM_PRESET_ROUTE = '/api/ds/custom-preset';
const SCAFFOLD_ROUTE = '/api/ds/scaffold';
const APPS_ROUTE = '/api/ds/apps';
const DEMO_OVERRIDE_ROUTE = '/api/ds/demo-override';
// Source de verite du registre des apps internes (structure + defauts + listAppsState()).
const APPS_CONFIG_MODULE = '/src/apps.config.ts';
// Validation kebab-case (miroir de scaffold-section.mjs) : garde locale AVANT le spawn.
const KEBAB_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
// Source de verite du catalogue de presets (fonctions d'acces fusionnant les customs) + des
// enums de validation (KNOWN_LAYOUTS / KNOWN_DENSITIES). Chargee via ssrLoadModule (memes raisons
// que SECTIONS_SCHEMA_MODULE : la chaine tire des schemas/modules virtuels non importables en Node).
const SECTION_PRESETS_MODULE = '@waimia/ds-kernel/lib/section-presets';
// Source de verite de la validation (identique a src/pages/library/builder/render.astro).
const PAGE_DOC_MODULE = '@waimia/ds-kernel/lib/page-document';
// Source de verite du contrat d'instance de section (discriminatedUnion 'type' -> schema Zod).
// MEME module que celui dont sectionsArraySchema derive (packages/ds-kernel/src/schemas/sections.ts).
const SECTIONS_SCHEMA_MODULE = '@waimia/ds-kernel/schemas/sections';
// Démos GÉNÉRÉES (pures, sans overlay dev) : base de validation d'un override (démo ⊕ props).
// Chargé via ssrLoadModule pour la même raison que les autres (chaîne de modules virtuels Vite).
const GENERATED_DEMOS_MODULE = '/src/lib/section-demos.generated.ts';

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

// --- Handler instance (edition in-place dans une page reelle) ------------------
// Edite UNE instance de section dans un fichier de contenu reel (src/content/**). C'est la
// SEULE route de cette integration qui touche le contenu du site : keyword + refus-main
// obligatoires (comme /api/ds/save). AUCUN commit/push : le git diff est laisse a la review
// humaine. La reecriture PRESERVE la convention de serialisation du fichier (indentation +
// newline finale detectees sur l'original).
//
//   GET   /api/ds/instance?file=<rel>&index=<n>  -> { ok:true, section } (lecture).
//   PATCH /api/ds/instance                        -> { keyword, file, index, props } :
//       remplace sections[index] par `props` apres validation via `sectionSchema`
//       (discriminatedUnion 'type', MEMES messages Zod detailles que /api/ds/saved).
//       props.type doit rester EGAL au type actuel de l'instance (on ne change pas le type ici).
//
// `file` = chemin relatif SOUS src/content/ (ex. services/site-web-ia.json). Refus STRICT du
// path traversal (`..`, chemin absolu, backslash, NUL) AVANT toute lecture, + verification de
// containment (le chemin resolu reste DANS src/content/). Extension imposee .json.

/**
 * Valide un chemin de contenu relatif et renvoie son chemin absolu, ou une erreur.
 * @param {unknown} file
 * @returns {{ok:true,abs:string,rel:string}|{ok:false,error:string}}
 */
function resolveContentPath(file) {
  const rel = typeof file === 'string' ? file.trim() : '';
  if (!rel) return { ok: false, error: 'file manquant' };
  // Anti-traversal : jamais de chemin absolu, backslash, NUL, ni segment `..`.
  if (rel.startsWith('/') || /^[A-Za-z]:/.test(rel) || rel.includes('\\') || rel.includes('\0')) {
    return { ok: false, error: 'file invalide (path traversal refuse)' };
  }
  if (rel.split('/').includes('..')) {
    return { ok: false, error: 'file invalide (path traversal refuse)' };
  }
  if (!rel.endsWith('.json')) {
    return { ok: false, error: 'file invalide (extension .json requise)' };
  }
  const abs = resolve(CONTENT_DIR, rel);
  // Ceinture + bretelles : le chemin resolu doit rester DANS src/content/.
  if (abs !== CONTENT_DIR && !abs.startsWith(CONTENT_DIR + sep)) {
    return { ok: false, error: 'file invalide (hors src/content)' };
  }
  return { ok: true, abs, rel };
}

/**
 * Detecte la convention de serialisation d'un JSON (unite d'indentation + newline finale) pour
 * la reecrire a l'identique (0 reformatage parasite hors la/les ligne(s) editee(s)).
 * @param {string} raw
 * @returns {{indent:string,nl:string}}
 */
function detectJsonFormat(raw) {
  const nl = raw.endsWith('\n') ? '\n' : '';
  const m = raw.match(/\n([ \t]+)"/);
  return { indent: m ? m[1] : '  ', nl };
}

function makeInstanceHandler(server) {
  return async function instanceHandler(req, res, next) {
    const url = new URL(req.url || '/', 'http://localhost');

    // --- GET : lecture de l'instance actuelle (aucune ecriture, pas de keyword requis) ---
    if (req.method === 'GET') {
      const check = resolveContentPath(url.searchParams.get('file'));
      if (!check.ok) return sendJson(res, 400, { ok: false, error: check.error });
      if (!existsSync(check.abs)) {
        return sendJson(res, 400, { ok: false, error: 'fichier inexistant' });
      }
      let data;
      try {
        data = JSON.parse(readFileSync(check.abs, 'utf8'));
      } catch {
        return sendJson(res, 400, { ok: false, error: 'fichier JSON illisible' });
      }
      if (!data || !Array.isArray(data.sections)) {
        return sendJson(res, 400, { ok: false, error: 'pas de tableau sections' });
      }
      const rawIndex = url.searchParams.get('index');
      const index = Number(rawIndex);
      if (rawIndex === null || !Number.isInteger(index) || index < 0 || index >= data.sections.length) {
        return sendJson(res, 400, { ok: false, error: 'index hors bornes' });
      }
      return sendJson(res, 200, { ok: true, section: data.sections[index] });
    }

    if (req.method !== 'PATCH') return next();

    // 1. Lecture + parse du body
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || '{}');
    } catch {
      return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
    }

    const { keyword, file, index: rawIndex, props } = body || {};

    // 2. Save-guard keyword (jamais logue)
    const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;
    if (String(keyword || '') !== expected) {
      return sendJson(res, 400, { ok: false, error: 'keyword' });
    }

    // 3. Chemin de contenu (anti-traversal + containment)
    const check = resolveContentPath(file);
    if (!check.ok) return sendJson(res, 400, { ok: false, error: check.error });
    if (!existsSync(check.abs)) {
      return sendJson(res, 400, { ok: false, error: 'fichier inexistant' });
    }

    // 4. Props presentes (forme minimale) avant lecture/validation
    if (!props || typeof props !== 'object' || Array.isArray(props)) {
      return sendJson(res, 400, { ok: false, error: 'props doit etre un objet' });
    }
    if (typeof props.type !== 'string' || !props.type) {
      return sendJson(res, 400, { ok: false, error: 'props.type manquant' });
    }

    // 5. Lecture du fichier + convention de serialisation
    let raw;
    let data;
    try {
      raw = readFileSync(check.abs, 'utf8');
      data = JSON.parse(raw);
    } catch {
      return sendJson(res, 400, { ok: false, error: 'fichier JSON illisible' });
    }
    if (!data || !Array.isArray(data.sections)) {
      return sendJson(res, 400, { ok: false, error: 'pas de tableau sections' });
    }

    // 6. Index dans les bornes
    const index = Number(rawIndex);
    if (!Number.isInteger(index) || index < 0 || index >= data.sections.length) {
      return sendJson(res, 400, { ok: false, error: 'index hors bornes' });
    }

    // 7. Type inchangé : on n'edite pas le type d'une instance ici.
    const currentType = data.sections[index] && data.sections[index].type;
    if (props.type !== currentType) {
      return sendJson(res, 400, {
        ok: false,
        error: `type inchangeable : instance = « ${currentType} », props = « ${props.type} »`,
      });
    }

    // 8. Validation : MEME schema que le rendu (sectionSchema, discriminatedUnion 'type').
    let sectionSchema;
    try {
      ({ sectionSchema } = await server.ssrLoadModule(SECTIONS_SCHEMA_MODULE));
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: `validation indisponible : ${e.message}` });
    }
    const validation = sectionSchema.safeParse(props);
    if (!validation.success) {
      const errors = validation.error.issues.map(
        (issue) => `${issue.path.join('.') || 'section'} : ${issue.message}`,
      );
      return sendJson(res, 400, { ok: false, error: 'section invalide', errors });
    }

    // 9. Refus-main : c'est la SEULE route qui touche le contenu reel (prod = waimia.com).
    let branch;
    try {
      branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
    } catch {
      return sendJson(res, 500, { ok: false, error: 'impossible de lire la branche git' });
    }
    if (branch === 'main') {
      return sendJson(res, 403, { ok: false, error: 'refus edition main' });
    }

    // 10. Remplacement in-place + reecriture PRESERVANT la convention (0 commit git).
    data.sections[index] = props;
    const { indent, nl } = detectJsonFormat(raw);
    try {
      writeFileSync(check.abs, JSON.stringify(data, null, indent) + nl, 'utf8');
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }

    return sendJson(res, 200, { ok: true, file: check.rel, index, type: props.type });
  };
}

// --- Handler page (lecture seule d'une page reelle pour l'editeur, N4) --------
// Renvoie les sections + meta d'une page de contenu reelle (src/content/**) pour l'ouvrir dans
// l'editeur du builder. LECTURE SEULE : aucune ecriture, donc PAS de keyword requis (comme le GET
// de /api/ds/instance). Anti-traversal STRICT identique (resolveContentPath : refus chemin absolu,
// backslash, NUL, segment `..`, extension .json imposee, containment DANS src/content/).
//
//   GET /api/ds/page?file=<rel>  -> { ok:true, sections, meta } ; 400 si file invalide/inexistant.
//     - sections : le tableau `sections` de la page (instances concretes).
//     - meta     : le reste du document (title_fr / title_en / seo / ...), sections exclues.

function makePageHandler() {
  return async function pageHandler(req, res, next) {
    if (req.method !== 'GET') return next();
    const url = new URL(req.url || '/', 'http://localhost');
    const check = resolveContentPath(url.searchParams.get('file'));
    if (!check.ok) return sendJson(res, 400, { ok: false, error: check.error });
    if (!existsSync(check.abs)) {
      return sendJson(res, 400, { ok: false, error: 'fichier inexistant' });
    }
    let data;
    try {
      data = JSON.parse(readFileSync(check.abs, 'utf8'));
    } catch {
      return sendJson(res, 400, { ok: false, error: 'fichier JSON illisible' });
    }
    if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.sections)) {
      return sendJson(res, 400, { ok: false, error: 'pas de tableau sections' });
    }
    const { sections, ...meta } = data;
    return sendJson(res, 200, { ok: true, sections, meta });
  };
}

// --- Handler custom-preset (variantes officielles persistees, P1+P2) ----------
// Cree/liste/supprime une VARIANTE officielle d'un type de section = un preset nomme (jeu d'axes
// de presentation) persiste dans packages/ds-kernel/src/lib/custom-presets.json, SANS patcher les
// ~2000 lignes de presets TS. Le kernel (@waimia/ds-kernel/lib/section-presets) fusionne ce store
// au runtime dans listPresets/getPreset/allPresets. Garde-fous : keyword (comme /api/ds/instance,
// jamais logue) + refus-main (ce store est une source du DS ; on ne le mute pas sur la branche prod).
// AUCUN commit/push : l'ecriture reste une modif de working-tree laissee a la review humaine.
//
//   GET    /api/ds/custom-preset          -> liste le store tel quel.
//   POST   /api/ds/custom-preset          -> { keyword, id, type, label_fr?, props } :
//        - keyword valide,
//        - type existe dans le registry (union discriminee sectionSchema, source de verite),
//        - id kebab-case prefixe `<type>--<slug>`, unicite vs presets TS/custom existants + store,
//        - props : cles limitees aux axes de presentation connus (PresetProps),
//          layout in KNOWN_LAYOUTS, density in KNOWN_DENSITIES.
//        Refus 400 detaille sinon.
//   DELETE /api/ds/custom-preset?id=<id>  -> retire du store ; id resolvant un preset TS officiel
//                                            -> 400 (non supprimable) ; inconnu -> 404.

// Axes de presentation surchargeables autorises dans un preset custom (miroir des cles TOP-LEVEL de
// PresetProps, packages/ds-kernel/src/lib/section-presets.ts). Verrouille l'endpoint (le type TS a
// une index-signature permissive ; ici on RESTREINT aux axes documentes).
const CUSTOM_PRESET_AXES = new Set([
  'background', 'layout', 'density', 'variant', 'rating', 'portrait_src', 'logo_src',
  'media_register', 'media_src', 'media_alt_fr', 'media_alt_en', 'illustration', 'media_side',
  'reveal_mode', 'swap_mode', 'speed', 'alternate_blocks', 'reversed', 'media_sticky', 'rounded',
  'contentAlign', 'actionsAlign', 'columns', 'colRatio', 'itemHeight', 'proportion', 'mediaSide',
  'direction', 'itemOrder', 'hover', 'cellAlignY', 'cellBg', 'justifyContent', 'colSpan',
  'features', 'placement',
]);

function readCustomPresetsStore() {
  if (!existsSync(CUSTOM_PRESETS_PATH)) return { presets: [] };
  try {
    const parsed = JSON.parse(readFileSync(CUSTOM_PRESETS_PATH, 'utf8'));
    if (parsed && Array.isArray(parsed.presets)) return { presets: parsed.presets };
  } catch {
    // Store corrompu -> on repart d'un store vide plutot que de faire planter la route.
  }
  return { presets: [] };
}

function writeCustomPresetsStore(store) {
  mkdirSync(dirname(CUSTOM_PRESETS_PATH), { recursive: true });
  writeFileSync(CUSTOM_PRESETS_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

/**
 * Extrait l'ensemble des types VALIDES depuis l'union discriminee `sectionSchema` (Zod), sans
 * charger les 200 composants du registry. Chaines d'acces robustes (versions de Zod : `.options`
 * ou `.def.options` ; literal `.value` ou `.def.value`).
 * @param {any} sectionSchema
 * @returns {Set<string>}
 */
function sectionTypesFrom(sectionSchema) {
  const s = sectionSchema || {};
  const opts = s.options || (s.def && s.def.options) || (s._def && s._def.options) || [];
  const types = new Set();
  for (const o of opts) {
    const shape = (o && (o.shape || (o.def && o.def.shape) || (o._def && o._def.shape))) || {};
    const t = shape.type;
    const val = t && (t.value ?? (t.def && t.def.value) ?? (t._def && t._def.value));
    if (typeof val === 'string') types.add(val);
  }
  return types;
}

function makeCustomPresetHandler(server) {
  return async function customPresetHandler(req, res, next) {
    const url = new URL(req.url || '/', 'http://localhost');

    // --- GET : liste du store (aucune ecriture, pas de keyword requis) ---
    if (req.method === 'GET') {
      return sendJson(res, 200, { ok: true, ...readCustomPresetsStore() });
    }

    // --- DELETE : retrait d'un custom ; id TS officiel -> 400 ; inconnu -> 404 ---
    if (req.method === 'DELETE') {
      const id = String(url.searchParams.get('id') || '').trim();
      if (!id) return sendJson(res, 400, { ok: false, error: 'id manquant' });
      const store = readCustomPresetsStore();
      const idx = store.presets.findIndex((p) => p && p.id === id);
      if (idx >= 0) {
        const [removed] = store.presets.splice(idx, 1);
        try {
          writeCustomPresetsStore(store);
        } catch (e) {
          return sendJson(res, 500, { ok: false, error: e.message });
        }
        return sendJson(res, 200, { ok: true, removed });
      }
      // Pas dans le store : soit un preset officiel TS (non supprimable), soit un id inconnu.
      let getPreset;
      try {
        ({ getPreset } = await server.ssrLoadModule(SECTION_PRESETS_MODULE));
      } catch (e) {
        return sendJson(res, 500, { ok: false, error: `resolution indisponible : ${e.message}` });
      }
      if (getPreset(id)) {
        return sendJson(res, 400, { ok: false, error: 'preset officiel, non supprimable' });
      }
      return sendJson(res, 404, { ok: false, error: `preset custom inconnu : ${id}` });
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

    const { keyword, id, type, label_fr, props } = body || {};

    // 2. Save-guard keyword (jamais logue) -> 400 (comme /api/ds/instance)
    const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;
    if (String(keyword || '') !== expected) {
      return sendJson(res, 400, { ok: false, error: 'keyword' });
    }

    // 3. Champs minimaux
    const typeStr = typeof type === 'string' ? type.trim() : '';
    if (!typeStr) return sendJson(res, 400, { ok: false, error: 'type manquant' });
    const idStr = typeof id === 'string' ? id.trim() : '';
    if (!idStr) return sendJson(res, 400, { ok: false, error: 'id manquant' });
    if (label_fr !== undefined && typeof label_fr !== 'string') {
      return sendJson(res, 400, { ok: false, error: 'label_fr doit etre une chaine' });
    }
    if (!props || typeof props !== 'object' || Array.isArray(props)) {
      return sendJson(res, 400, { ok: false, error: 'props doit etre un objet' });
    }

    // 4. Refus-main : le store est une source du DS ; on ne le mute pas sur la branche prod.
    let branch;
    try {
      branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
    } catch {
      return sendJson(res, 500, { ok: false, error: 'impossible de lire la branche git' });
    }
    if (branch === 'main') {
      return sendJson(res, 403, { ok: false, error: 'refus edition main' });
    }

    // 5. Modules de verite : catalogue de presets (getPreset + enums) + union de types.
    let presetsMod;
    let schemaMod;
    try {
      presetsMod = await server.ssrLoadModule(SECTION_PRESETS_MODULE);
      schemaMod = await server.ssrLoadModule(SECTIONS_SCHEMA_MODULE);
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: `validation indisponible : ${e.message}` });
    }
    const { KNOWN_LAYOUTS, KNOWN_DENSITIES, getPreset } = presetsMod;

    // 6. Type existe dans le registry (union discriminee = source de verite)
    const validTypes = sectionTypesFrom(schemaMod.sectionSchema);
    if (validTypes.size > 0 && !validTypes.has(typeStr)) {
      return sendJson(res, 400, { ok: false, error: `type inconnu : ${typeStr}` });
    }

    // 7. id kebab-case prefixe `<type>--<slug>` (convention des presets existants)
    const prefix = `${typeStr}--`;
    if (!idStr.startsWith(prefix)) {
      return sendJson(res, 400, { ok: false, error: `id doit etre prefixe « ${prefix} »` });
    }
    const slugPart = idStr.slice(prefix.length);
    if (!slugPart || !/^[a-z0-9-]+$/.test(idStr) || slugify(slugPart) !== slugPart) {
      return sendJson(res, 400, {
        ok: false,
        error: 'id invalide (kebab-case attendu : minuscules, chiffres, tirets simples)',
      });
    }

    // 8. props : cles limitees aux axes connus + valeurs layout/density validees
    const unknownKeys = Object.keys(props).filter((k) => !CUSTOM_PRESET_AXES.has(k));
    if (unknownKeys.length > 0) {
      return sendJson(res, 400, {
        ok: false,
        error: `axe(s) de presentation inconnu(s) refuse(s) : ${unknownKeys.join(', ')}`,
      });
    }
    if (props.layout !== undefined && !Array.from(KNOWN_LAYOUTS).includes(props.layout)) {
      return sendJson(res, 400, {
        ok: false,
        error: `layout inconnu : ${props.layout} (attendus : ${Array.from(KNOWN_LAYOUTS).join(', ')})`,
      });
    }
    if (props.density !== undefined && !Array.from(KNOWN_DENSITIES).includes(props.density)) {
      return sendJson(res, 400, {
        ok: false,
        error: `density inconnue : ${props.density} (attendues : ${Array.from(KNOWN_DENSITIES).join(', ')})`,
      });
    }

    // 9. Unicite : ni preset (TS OU custom deja fusionne par le module), ni entree du store disque.
    if (getPreset(idStr)) {
      return sendJson(res, 400, { ok: false, error: `id deja utilise : ${idStr}` });
    }
    const store = readCustomPresetsStore();
    if (store.presets.some((p) => p && p.id === idStr)) {
      return sendJson(res, 400, { ok: false, error: `id deja utilise : ${idStr}` });
    }

    // 10. Ecriture du store (tri par id = deterministe pour le gate / diff propre)
    const entry = {
      id: idStr,
      type: typeStr,
      ...(typeof label_fr === 'string' && label_fr ? { label_fr } : {}),
      props,
    };
    store.presets.push(entry);
    store.presets.sort((a, b) => String(a && a.id).localeCompare(String(b && b.id)));
    try {
      writeCustomPresetsStore(store);
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }

    return sendJson(res, 200, { ok: true, preset: entry });
  };
}

// --- Handler scaffold (generation d'un module de section, dev-only) ------------
// POST /api/ds/scaffold { keyword, type, from?, dryRun? } : spawn `node scripts/scaffold-section.mjs
// <type> [--from <from>] [--dry-run] --json` (args en tableau = 0 injection shell), capture
// stdout (JSON machine) + stderr (logs humains). Gardes IDENTIQUES aux autres routes mutantes :
// keyword (400, jamais logue, comme /api/ds/instance) + refus-main (403) + type/from kebab (400).
// Reponse : { ok, type, dryRun, created[], generators[], logs } ou { ok:false, error, logs }.

function makeScaffoldHandler() {
  return async function scaffoldHandler(req, res, next) {
    if (req.method !== 'POST') return next();

    // 1. Lecture + parse du body
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || '{}');
    } catch {
      return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
    }

    const { keyword, type, from, dryRun } = body || {};

    // 2. Save-guard keyword (jamais logue) -> 400 (comme /api/ds/instance)
    const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;
    if (String(keyword || '') !== expected) {
      return sendJson(res, 400, { ok: false, error: 'keyword' });
    }

    // 3. Validation type/from kebab-case AVANT le spawn (le scaffolder revalide de son cote)
    if (typeof type !== 'string' || !KEBAB_RE.test(type)) {
      return sendJson(res, 400, { ok: false, error: 'type invalide (kebab-case attendu)' });
    }
    if (from !== undefined && from !== null && (typeof from !== 'string' || !KEBAB_RE.test(from))) {
      return sendJson(res, 400, { ok: false, error: 'from invalide (kebab-case attendu)' });
    }

    // 4. Refus-main : le scaffold ecrit des sources + regenere des fichiers commites.
    let branch;
    try {
      branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
    } catch {
      return sendJson(res, 500, { ok: false, error: 'impossible de lire la branche git' });
    }
    if (branch === 'main') {
      return sendJson(res, 403, { ok: false, error: 'refus scaffold main' });
    }

    // 5. Spawn du scaffolder en --json (stdout = JSON, stderr = logs humains)
    const args = [SCAFFOLD_SCRIPT, type];
    if (typeof from === 'string' && from) args.push('--from', from);
    if (dryRun) args.push('--dry-run');
    args.push('--json');

    let stdout = '';
    let stderr = '';
    try {
      stdout = execFileSync('node', args, {
        cwd: PROJECT_ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        maxBuffer: 8 * 1024 * 1024,
      });
    } catch (e) {
      // Le scaffolder emet TOUJOURS son JSON sur stdout, meme en echec (exit 1).
      stdout = (e.stdout && String(e.stdout)) || '';
      stderr = (e.stderr && String(e.stderr)) || e.message || '';
    }

    // 6. Parse du JSON machine du scaffolder
    let result = null;
    try {
      result = JSON.parse(String(stdout).trim());
    } catch {
      result = null;
    }
    if (result && typeof result === 'object') {
      if (result.ok) {
        return sendJson(res, 200, {
          ok: true,
          type: result.type,
          dryRun: Boolean(result.dryRun),
          created: result.created || [],
          generators: result.generators || [],
          logs: stderr || null,
        });
      }
      return sendJson(res, 400, { ok: false, error: result.error || 'scaffold en echec', logs: stderr || null });
    }
    // Pas de JSON exploitable : erreur brute (tronquee).
    return sendJson(res, 500, {
      ok: false,
      error: 'sortie scaffolder illisible',
      logs: (stderr || stdout || '').slice(0, 4000),
    });
  };
}

// --- Handler apps (registre des apps internes, dev-only) -----------------------
// GET   /api/ds/apps          -> { ok, apps: AppState[] } (id, enabled=configure, active=servi,
//                                 extracted, facade, route). Source de verite = src/apps.config.ts.
// PATCH /api/ds/apps          -> { keyword, id, enabled } : ecrit src/data/apps-state.json (merge).
//   Gardes : keyword (400) + refus-main (403) + id connu (400) + enabled boolean (400).
//   UX honnete : la reponse rappelle que le toggle prend effet au REDEMARRAGE d'astro dev
//   (la config des apps n'est evaluee qu'au boot ; le store est relu a chaud pour l'affichage).

function readAppsStateFile() {
  if (!existsSync(APPS_STATE_PATH)) return { apps: {} };
  try {
    const parsed = JSON.parse(readFileSync(APPS_STATE_PATH, 'utf8'));
    if (parsed && parsed.apps && typeof parsed.apps === 'object') return { apps: parsed.apps };
  } catch {
    // illisible -> store vide (defauts)
  }
  return { apps: {} };
}

function makeAppsHandler(server) {
  return async function appsHandler(req, res, next) {
    // Structure des apps = src/apps.config.ts (listAppsState re-lit apps-state.json a chaud).
    let listAppsState;
    try {
      ({ listAppsState } = await server.ssrLoadModule(APPS_CONFIG_MODULE));
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: `registre apps indisponible : ${e.message}` });
    }

    if (req.method === 'GET') {
      return sendJson(res, 200, { ok: true, apps: listAppsState() });
    }

    if (req.method !== 'PATCH') return next();

    // 1. Lecture + parse du body
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || '{}');
    } catch {
      return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
    }

    const { keyword, id, enabled } = body || {};

    // 2. Save-guard keyword (jamais logue)
    const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;
    if (String(keyword || '') !== expected) {
      return sendJson(res, 400, { ok: false, error: 'keyword' });
    }

    // 3. id + enabled valides
    if (typeof id !== 'string' || !id) {
      return sendJson(res, 400, { ok: false, error: 'id manquant' });
    }
    if (typeof enabled !== 'boolean') {
      return sendJson(res, 400, { ok: false, error: 'enabled doit etre un booleen' });
    }
    const known = new Set(listAppsState().map((a) => a.id));
    if (!known.has(id)) {
      return sendJson(res, 400, { ok: false, error: `app inconnue : ${id} (connues : ${[...known].join(', ')})` });
    }

    // 4. Refus-main : apps-state.json pilote la config du build (prod = waimia.com).
    let branch;
    try {
      branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
    } catch {
      return sendJson(res, 500, { ok: false, error: 'impossible de lire la branche git' });
    }
    if (branch === 'main') {
      return sendJson(res, 403, { ok: false, error: 'refus edition main' });
    }

    // 5. Ecriture du store (merge par id)
    const store = readAppsStateFile();
    store.apps[id] = enabled;
    try {
      mkdirSync(dirname(APPS_STATE_PATH), { recursive: true });
      writeFileSync(APPS_STATE_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }

    return sendJson(res, 200, {
      ok: true,
      id,
      enabled,
      note: "effet au redemarrage d'astro dev (la config des apps est evaluee au boot)",
    });
  };
}

// --- Handler demo-override (démos éditées localement, P4.4-h E2) ----------------
// « Modifier le composant » = éditer sa démo. Store DEV-ONLY src/data/demo-overrides.json
// = { overrides: { <type>: <props partiels> } }, consommé par l'overlay dev de
// src/lib/section-demos.ts (la fiche + les previews affichent alors la démo modifiée ;
// les INSTANCES réelles ne bougent pas). Écriture NON destructive, hors git (comme
// /api/ds/saved), + garde keyword (comme /api/ds/instance : jamais loguée, 400 si absente).
//
//   GET    /api/ds/demo-override                     -> liste le store tel quel.
//   PUT    /api/ds/demo-override                      -> { keyword, type, props } :
//        - keyword valide,
//        - type existe (démo générée présente),
//        - le RÉSULTAT (démo de base ⊕ props, type forcé) est valide via `sectionSchema`
//          (discriminatedUnion 'type', MÊME source de vérité que le rendu) -> tolère un
//          override PARTIEL sans casser la section. On stocke `props` (le partiel, sans `type`).
//   DELETE /api/ds/demo-override?keyword=&type=       -> retire l'override ; 404 si absent.

function readDemoOverridesStore() {
  if (!existsSync(DEMO_OVERRIDES_PATH)) return { overrides: {} };
  try {
    const parsed = JSON.parse(readFileSync(DEMO_OVERRIDES_PATH, 'utf8'));
    if (parsed && parsed.overrides && typeof parsed.overrides === 'object' && !Array.isArray(parsed.overrides)) {
      return { overrides: parsed.overrides };
    }
  } catch {
    // Store corrompu -> on repart d'un store vide plutot que de faire planter la route.
  }
  return { overrides: {} };
}

function writeDemoOverridesStore(store) {
  mkdirSync(dirname(DEMO_OVERRIDES_PATH), { recursive: true });
  writeFileSync(DEMO_OVERRIDES_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

function makeDemoOverrideHandler(server) {
  return async function demoOverrideHandler(req, res, next) {
    const url = new URL(req.url || '/', 'http://localhost');
    const expected = process.env.DS_SAVE_KEYWORD || DEFAULT_KEYWORD;

    // --- GET : liste du store (aucune ecriture, pas de keyword requis) ---
    if (req.method === 'GET') {
      return sendJson(res, 200, { ok: true, ...readDemoOverridesStore() });
    }

    // --- DELETE ?keyword=&type= : retire l'override d'un type ; 404 si absent ---
    if (req.method === 'DELETE') {
      if (String(url.searchParams.get('keyword') || '') !== expected) {
        return sendJson(res, 400, { ok: false, error: 'keyword' });
      }
      const type = String(url.searchParams.get('type') || '').trim();
      if (!type) return sendJson(res, 400, { ok: false, error: 'type manquant' });
      const store = readDemoOverridesStore();
      if (!Object.prototype.hasOwnProperty.call(store.overrides, type)) {
        return sendJson(res, 404, { ok: false, error: `aucun override pour : ${type}` });
      }
      delete store.overrides[type];
      try {
        writeDemoOverridesStore(store);
      } catch (e) {
        return sendJson(res, 500, { ok: false, error: e.message });
      }
      return sendJson(res, 200, { ok: true, type });
    }

    if (req.method !== 'PUT') return next();

    // 1. Lecture + parse du body
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || '{}');
    } catch {
      return sendJson(res, 400, { ok: false, error: 'corps JSON invalide' });
    }

    const { keyword, type, props } = body || {};

    // 2. Save-guard keyword (jamais logue) -> 400 (comme /api/ds/instance)
    if (String(keyword || '') !== expected) {
      return sendJson(res, 400, { ok: false, error: 'keyword' });
    }

    // 3. Champs minimaux
    const typeStr = typeof type === 'string' ? type.trim() : '';
    if (!typeStr) return sendJson(res, 400, { ok: false, error: 'type manquant' });
    if (!props || typeof props !== 'object' || Array.isArray(props)) {
      return sendJson(res, 400, { ok: false, error: 'props doit etre un objet' });
    }

    // 4. Modules de verite : schema (validation) + demos generees (base pure de l'overlay).
    let sectionSchema;
    let baseDemos;
    try {
      ({ sectionSchema } = await server.ssrLoadModule(SECTIONS_SCHEMA_MODULE));
      ({ SECTION_DEMOS: baseDemos } = await server.ssrLoadModule(GENERATED_DEMOS_MODULE));
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: `validation indisponible : ${e.message}` });
    }
    const base = baseDemos && baseDemos[typeStr];
    if (!base) return sendJson(res, 400, { ok: false, error: `type inconnu : ${typeStr}` });

    // 5. On stocke le partiel SANS `type` (on n'edite jamais le discriminant), puis on valide le
    //    RESULTAT (base demo ⊕ partiel, type force) : un override partiel reste ainsi accepte
    //    tant que la section finale est valide.
    const { type: _ignoredType, ...cleanProps } = props;
    const candidate = { ...base, ...cleanProps, type: typeStr };
    const validation = sectionSchema.safeParse(candidate);
    if (!validation.success) {
      const errors = validation.error.issues.map(
        (issue) => `${issue.path.join('.') || 'section'} : ${issue.message}`,
      );
      return sendJson(res, 400, { ok: false, error: 'override invalide', errors });
    }

    // 6. Upsert du partiel dans le store.
    const store = readDemoOverridesStore();
    store.overrides[typeStr] = cleanProps;
    try {
      writeDemoOverridesStore(store);
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }
    return sendJson(res, 200, { ok: true, type: typeStr, props: cleanProps });
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
        server.middlewares.use(INSTANCE_ROUTE, makeInstanceHandler(server));
        server.middlewares.use(PAGE_ROUTE, makePageHandler());
        server.middlewares.use(CUSTOM_PRESET_ROUTE, makeCustomPresetHandler(server));
        server.middlewares.use(SCAFFOLD_ROUTE, makeScaffoldHandler());
        server.middlewares.use(APPS_ROUTE, makeAppsHandler(server));
        server.middlewares.use(DEMO_OVERRIDE_ROUTE, makeDemoOverrideHandler(server));
        if (logger && typeof logger.info === 'function') {
          logger.info(
            `DEV-ONLY : POST ${ROUTE} + ${PRESET_ROUTE} + ${COMPOSE_ROUTE} + GET/POST/DELETE ${SAVED_ROUTE} + GET/PATCH ${INSTANCE_ROUTE} + GET ${PAGE_ROUTE} + GET/POST/DELETE ${CUSTOM_PRESET_ROUTE} + POST ${SCAFFOLD_ROUTE} + GET/PATCH ${APPS_ROUTE} + GET/PUT/DELETE ${DEMO_OVERRIDE_ROUTE} actifs (DS Studio "Enregistrer" / presets / builder compose / saved sections / edition instance / lecture page reelle / variantes custom / scaffold section / registre apps / demo-overrides)`,
          );
        }
      },
    },
  };
}
