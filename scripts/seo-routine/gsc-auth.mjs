/**
 * Authentification Search Console par compte de service, sans dépendance :
 * JWT RS256 signé avec node:crypto, échangé contre un jeton OAuth2 (flux « JWT bearer »).
 *
 * Le JSON du compte de service est lu dans la variable d'environnement GSC_SERVICE_ACCOUNT_JSON
 * (JSON brut, ou le même JSON encodé en base64). Voir docs/seo/SETUP.md.
 *
 * Usage direct : `node scripts/seo-routine/gsc-auth.mjs` vérifie le secret et liste les
 * propriétés visibles par le compte de service (sans jamais afficher le jeton).
 */
import { createSign } from 'node:crypto';
import { GSC_SCOPE, GSC_SITE_URL } from './config.mjs';
import { isMain, sleep } from './lib/util.mjs';

export class NotConfiguredError extends Error {
  constructor(message = 'GSC_SERVICE_ACCOUNT_JSON absent : Search Console non configuré (voir docs/seo/SETUP.md)') {
    super(message);
    this.name = 'NotConfiguredError';
    this.notConfigured = true;
  }
}

export function isConfigured(env = process.env) {
  return Boolean(env.GSC_SERVICE_ACCOUNT_JSON && env.GSC_SERVICE_ACCOUNT_JSON.trim());
}

/** Lit et valide le JSON du compte de service (brut ou base64). */
export function readServiceAccount(env = process.env) {
  if (!isConfigured(env)) throw new NotConfiguredError();
  let raw = env.GSC_SERVICE_ACCOUNT_JSON.trim();
  if (!raw.startsWith('{')) raw = Buffer.from(raw, 'base64').toString('utf8');
  let sa;
  try {
    sa = JSON.parse(raw);
  } catch {
    throw new Error('GSC_SERVICE_ACCOUNT_JSON n\'est pas un JSON valide (coller le fichier de clé complet)');
  }
  if (!sa.client_email || !sa.private_key) {
    throw new Error('GSC_SERVICE_ACCOUNT_JSON incomplet : client_email et private_key sont requis');
  }
  return sa;
}

const b64url = (input) => Buffer.from(input).toString('base64url');

/** Construit l'assertion JWT signée (exportée pour les tests). */
export function buildAssertion(sa, { scope = GSC_SCOPE, now = Math.floor(Date.now() / 1000) } = {}) {
  const header = { alg: 'RS256', typ: 'JWT', ...(sa.private_key_id ? { kid: sa.private_key_id } : {}) };
  const claims = {
    iss: sa.client_email,
    scope,
    aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claims))}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(sa.private_key.replace(/\\n/g, '\n'));
  return `${unsigned}.${b64url(signature)}`;
}

let cached = null;

/** Jeton d'accès OAuth2 (mis en cache pour la durée du processus). */
export async function getAccessToken(env = process.env) {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const sa = readServiceAccount(env);
  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: buildAssertion(sa),
    }),
    signal: AbortSignal.timeout(20000),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.access_token) {
    throw new Error(`échec OAuth2 (${res.status}) : ${body.error_description || body.error || 'réponse sans jeton'}`);
  }
  cached = { token: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cached.token;
}

/**
 * Appel authentifié à une API Google. Réessaie sur 429 et 5xx (attente croissante).
 * Renvoie le JSON de la réponse (objet vide si la réponse n'a pas de corps).
 */
export async function gscFetch(url, { method = 'GET', body, retries = 3 } = {}) {
  const token = await getAccessToken();
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const res = await fetch(url, {
      method,
      headers: { authorization: `Bearer ${token}`, ...(body ? { 'content-type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30000),
    });
    const text = await res.text();
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { raw: text.slice(0, 300) };
    }
    if (res.ok) return json;
    const message = json?.error?.message || json.raw || res.statusText;
    lastError = new Error(`API Google ${res.status} : ${message}`);
    lastError.status = res.status;
    if (res.status === 403 && /permission|not have access|n'avez pas/i.test(message)) {
      lastError.message += ` (le compte de service doit être ajouté comme utilisateur de ${GSC_SITE_URL} dans Search Console, voir docs/seo/SETUP.md)`;
    }
    if (res.status !== 429 && res.status < 500) break;
    await sleep(2000 * 2 ** attempt);
  }
  throw lastError;
}

export const siteParam = () => encodeURIComponent(GSC_SITE_URL);

if (isMain(import.meta.url)) {
  try {
    const sa = readServiceAccount();
    console.log(`Compte de service : ${sa.client_email}`);
    const sites = await gscFetch('https://www.googleapis.com/webmasters/v3/sites');
    const entries = sites.siteEntry ?? [];
    console.log(`Propriétés visibles : ${entries.length}`);
    for (const s of entries) console.log(`  ${s.siteUrl} (${s.permissionLevel})`);
    const ok = entries.some((s) => s.siteUrl === GSC_SITE_URL);
    console.log(ok ? `OK : ${GSC_SITE_URL} est accessible.` : `ATTENTION : ${GSC_SITE_URL} n'est pas visible par ce compte.`);
    process.exit(ok ? 0 : 1);
  } catch (err) {
    console.error(err.message);
    process.exit(err.notConfigured ? 2 : 1);
  }
}
