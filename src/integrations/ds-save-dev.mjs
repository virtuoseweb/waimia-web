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
 * Garde-fous :
 *   - keyword       : compare a DS_SAVE_KEYWORD (defaut WAIMIA-SAVE) -> 403 sinon
 *                     (protege contre une sauvegarde accidentelle ; jamais logue).
 *   - refus main    : lit la branche courante, refuse de pousser sur main (prod).
 *   - tokens stricts : ecrit uniquement des tokens EXISTANTS dans tokens.css
 *                     (un token inconnu -> 400, on ne cree jamais de token).
 *
 * Aucune dependance npm : Node natif (fs / child_process) + logique partagee avec
 * le CLI `npm run ds:apply` (scripts/lib/ds-tokens.mjs).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parseExport, applyTokenMap } from '../../scripts/lib/ds-tokens.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '../..');
const TOKENS_PATH = resolve(PROJECT_ROOT, 'src/styles/tokens.css');
const FIXED_DELAY_SECONDS = 180;

const DEFAULT_KEYWORD = 'WAIMIA-SAVE';
const ROUTE = '/api/ds/save';

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
    git(['add', 'src/styles/tokens.css']);
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

// --- Integration -------------------------------------------------------------

export default function dsSaveDev() {
  return {
    name: 'ds-save-dev',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use(ROUTE, handler);
        if (logger && typeof logger.info === 'function') {
          logger.info(`DEV-ONLY : POST ${ROUTE} actif (DS Studio "Enregistrer")`);
        }
      },
    },
  };
}
