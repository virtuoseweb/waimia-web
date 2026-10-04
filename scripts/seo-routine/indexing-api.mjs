/**
 * Indexing API de Google (urlNotifications.publish, type URL_UPDATED).
 *
 * Notifie Google des URL du sitemap de production qui sont nouvelles ou dont le `lastmod` a
 * changé depuis leur dernière soumission. Les URL que gsc-index a relevées comme non indexées
 * passent en premier. Une URL inchangée n'est jamais resoumise (sauf --all).
 *
 * À savoir : la documentation de Google réserve cette API aux pages JobPosting et
 * BroadcastEvent (dans une VideoObject). Simon l'utilise déjà sur virtuoseweb.fr et choisit de
 * la réutiliser ici. Google peut ignorer ces notifications pour des pages ordinaires et ne
 * garantit rien : le sitemap, le maillage et l'inspection d'URL restent le socle. Voir
 * docs/seo/SETUP.md.
 *
 * Authentification : le même secret GSC_SERVICE_ACCOUNT_JSON que Search Console, avec la portée
 * https://www.googleapis.com/auth/indexing. Le compte de service doit être PROPRIÉTAIRE de la
 * propriété Search Console, et « Web Search Indexing API » activée dans son projet Google Cloud.
 *
 * Quota : 200 requêtes « publish » par jour et par projet Google Cloud (partagé avec
 * virtuoseweb.fr). Le compteur du jour et l'historique des soumissions sont conservés dans
 * docs/seo/data/state/indexing-api.json.
 *
 * Usage direct :
 *   node scripts/seo-routine/indexing-api.mjs              URL nouvelles ou modifiées
 *   node scripts/seo-routine/indexing-api.mjs --all        tout le sitemap (première passe, refonte)
 *   node scripts/seo-routine/indexing-api.mjs --dry-run    liste ce qui partirait, n'envoie rien
 *   node scripts/seo-routine/indexing-api.mjs --url <url>  soumet une URL précise
 *   node scripts/seo-routine/indexing-api.mjs --status <url>  dernière notification connue de Google
 */
import { join } from 'node:path';
import { GSC_SITE_URL, INDEXING_DAILY_CAP, INDEXING_DELAY_MS, INDEXING_ENDPOINT, INDEXING_SCOPE, SITE_HOST, SITEMAP_URL, STATE_DIR } from './config.mjs';
import { gscFetch, isConfigured, NotConfiguredError, readServiceAccount } from './gsc-auth.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { isMain, readJson, sleep, writeJson } from './lib/util.mjs';

export const INDEXING_STATE_FILE = join(STATE_DIR, 'indexing-api.json');
const INDEX_STATE_FILE = join(STATE_DIR, 'gsc-index.json');

const NOT_CONFIGURED = 'GSC_SERVICE_ACCOUNT_JSON absent : Indexing API non configurée (voir docs/seo/SETUP.md)';

/** Jour de quota : les quotas journaliers de Google repartent à minuit, heure du Pacifique. */
export function quotaDay(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

/** État lu sur disque vers l'état du jour : l'historique est conservé, le compteur repart à zéro chaque jour. Fonction pure. */
export function normalizeState(raw, day) {
  const sameDay = raw?.quota?.date === day;
  return {
    lastSubmission: raw?.lastSubmission ?? null,
    quota: { date: day, count: sameDay ? Number(raw.quota.count) || 0 : 0 },
    urls: { ...(raw?.urls ?? {}) },
  };
}

/**
 * Choisit les URL à soumettre. Fonction pure.
 *   - nouvelle : absente de l'historique ;
 *   - modifiée : `lastmod` du sitemap différent de celui de la dernière soumission ;
 *   - inchangée : jamais resoumise (sauf `all`, qui reprend tout le sitemap).
 * Les URL non indexées (`notIndexed`) passent devant, puis l'ordre du sitemap. `remaining` est
 * le quota restant du jour : ce qui dépasse est reporté (`deferred`) à la collecte suivante.
 */
export function selectToSubmit(urls, state, { notIndexed = new Set(), all = false, remaining = Infinity } = {}) {
  const sent = state?.urls ?? {};
  const added = [];
  const modified = [];
  const unchanged = [];
  for (const u of urls) {
    const before = sent[u.loc];
    if (!before) added.push(u);
    else if (u.lastmod && u.lastmod !== (before.lastmod ?? null)) modified.push(u);
    else unchanged.push(u);
  }
  const candidates = all ? [...urls] : [...added, ...modified];
  const rank = (u) => (notIndexed.has(u.loc) ? 0 : 1);
  const queue = candidates.map((u, i) => ({ u, i })).sort((a, b) => rank(a.u) - rank(b.u) || a.i - b.i).map((x) => x.u);
  const batch = queue.slice(0, Math.max(0, remaining));
  return {
    added: added.map((u) => u.loc),
    modified: modified.map((u) => u.loc),
    unchanged: unchanged.length,
    queue,
    batch,
    deferred: queue.slice(batch.length).map((u) => u.loc),
    prioritized: batch.filter((u) => notIndexed.has(u.loc)).map((u) => u.loc),
  };
}

/** Enregistre une soumission acceptée : historique de l'URL et compteur du jour. Fonction pure. */
export function recordSubmission(state, u, submittedAt) {
  return {
    lastSubmission: submittedAt,
    quota: { date: state.quota.date, count: state.quota.count + 1 },
    urls: { ...state.urls, [u.loc]: { lastmod: u.lastmod ?? null, submittedAt } },
  };
}

/** Traduit une erreur de l'API en message qui dit quoi faire. Fonction pure. */
export function explainError(err, clientEmail = 'le compte de service') {
  const status = err?.status;
  const message = err?.googleMessage ?? err?.message ?? String(err);
  if (status === 403 && /has not been used in project|is disabled|SERVICE_DISABLED|accessNotConfigured/i.test(message)) {
    return `Indexing API 403 : l'API n'est pas activée dans le projet Google Cloud du compte de service. À faire : activer « Web Search Indexing API » dans ce projet (docs/seo/SETUP.md, étape 1), attendre quelques minutes, relancer. Réponse de Google : ${message}`;
  }
  if (status === 403) {
    return `Indexing API 403 : ${clientEmail} n'est pas propriétaire de ${GSC_SITE_URL}. À faire : dans Search Console, « Paramètres », « Utilisateurs et autorisations », ajouter cette adresse avec l'autorisation « Propriétaire » (l'accès complet ne suffit pas à l'Indexing API ; docs/seo/SETUP.md, étape 2). Réponse de Google : ${message}`;
  }
  if (status === 429) {
    return `Indexing API 429 : quota épuisé (200 soumissions par jour pour le projet Google Cloud, partagé avec virtuoseweb.fr). Le reste partira à la collecte suivante. Réponse de Google : ${message}`;
  }
  return err?.message ?? String(err);
}

const API_OPTIONS = { scopes: [INDEXING_SCOPE], permissionHint: null, retries: 1 };

export function publishUrl(url) {
  return gscFetch(`${INDEXING_ENDPOINT}/urlNotifications:publish`, { ...API_OPTIONS, method: 'POST', body: { url, type: 'URL_UPDATED' } });
}

/** URL non indexées : sortie de gsc-index du même run si elle existe, sinon dernier état connu. */
async function loadNotIndexed(indexOutput) {
  if (indexOutput?.notIndexed) return new Set(indexOutput.notIndexed.map((n) => n.url));
  const state = await readJson(INDEX_STATE_FILE, null);
  return new Set(Object.entries(state?.urls ?? {}).filter(([, s]) => s.indexed === false).map(([url]) => url));
}

const DEFAULT_DEPS = {
  fetchUrls: async () => (await fetchSitemapUrls(SITEMAP_URL)).urls,
  loadState: () => readJson(INDEXING_STATE_FILE, null),
  saveState: (state) => writeJson(INDEXING_STATE_FILE, state),
  loadNotIndexed,
  publish: publishUrl,
  wait: sleep,
};

/**
 * Étape de la routine. `deps` permet aux tests de remplacer le réseau et le disque.
 * Lève NotConfiguredError sans secret ; lève une erreur explicite si aucune URL n'est acceptée.
 */
export async function runIndexingApi({ dryRun = false, all = false, persist = true, today = new Date(), indexOutput = null, env = process.env, cap = INDEXING_DAILY_CAP, deps = {} } = {}) {
  if (!isConfigured(env)) throw new NotConfiguredError(NOT_CONFIGURED);
  const d = { ...DEFAULT_DEPS, ...deps };
  const clientEmail = readServiceAccount(env).client_email;
  const urls = await d.fetchUrls();
  let state = normalizeState(await d.loadState(), quotaDay(today));
  const notIndexed = await d.loadNotIndexed(indexOutput);
  const remaining = Math.max(0, cap - state.quota.count);
  const sel = selectToSubmit(urls, state, { notIndexed, all, remaining });
  const base = {
    generatedAt: new Date().toISOString(),
    serviceAccount: clientEmail,
    sitemapUrlCount: urls.length,
    mode: all ? 'passe complète' : 'nouvelles et modifiées',
    added: sel.added,
    modified: sel.modified,
    unchanged: sel.unchanged,
    notIndexedKnown: notIndexed.size,
    prioritized: sel.prioritized,
  };
  const quota = () => ({ date: state.quota.date, used: state.quota.count, cap });
  if (sel.queue.length === 0) return { ...base, status: 'rien à soumettre', submitted: [], deferred: [], errors: [], quota: quota(), lastSubmission: state.lastSubmission };
  if (dryRun) return { ...base, status: 'simulation', submitted: [], wouldSubmit: sel.batch.map((u) => u.loc), deferred: sel.deferred, errors: [], quota: quota(), lastSubmission: state.lastSubmission };
  if (sel.batch.length === 0) {
    return { ...base, status: 'quota atteint', submitted: [], deferred: sel.deferred, errors: [], quota: quota(), lastSubmission: state.lastSubmission, note: `Plafond de ${cap} soumissions déjà atteint aujourd'hui : ${sel.deferred.length} URL reportées à la collecte suivante.` };
  }

  const submitted = [];
  const errors = [];
  let stop = null;
  for (let i = 0; i < sel.batch.length; i += 1) {
    const u = sel.batch[i];
    try {
      await d.publish(u.loc);
      state = recordSubmission(state, u, new Date().toISOString());
      submitted.push(u.loc);
    } catch (err) {
      errors.push({ url: u.loc, status: err.status ?? null, error: explainError(err, clientEmail) });
      // 401/403 : aucune URL ne passera. 429 : quota épuisé. Inutile d'insister dans les deux cas.
      if (err.status === 401 || err.status === 403) stop = 'refus';
      if (err.status === 429) stop = 'quota';
      if (stop) break;
    }
    if (i < sel.batch.length - 1) await d.wait(INDEXING_DELAY_MS);
  }
  if (persist && submitted.length) await d.saveState(state);

  const notSent = sel.queue.map((u) => u.loc).filter((loc) => !submitted.includes(loc));
  const result = { ...base, submitted, deferred: notSent, errors, quota: quota(), lastSubmission: state.lastSubmission };
  if (stop === 'quota') return { ...result, status: 'quota atteint', note: errors.at(-1).error };
  if (submitted.length === 0) throw new Error(errors[0].error);
  if (stop === 'refus') return { ...result, status: 'interrompu', note: errors.at(-1).error };
  if (notSent.length) return { ...result, status: 'soumis en partie', note: `${notSent.length} URL reportées à la collecte suivante (plafond du jour ou erreur).` };
  return { ...result, status: 'soumis' };
}

function assertOwnUrl(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    throw new Error(`URL invalide : ${raw}`);
  }
  if (u.protocol !== 'https:' || (u.hostname !== SITE_HOST && !u.hostname.endsWith(`.${SITE_HOST}`))) {
    throw new Error(`URL hors de ${SITE_HOST} : ${raw} (ce script ne soumet que les pages de ce site)`);
  }
  // L'URL est renvoyée telle qu'écrite (le sitemap liste la page d'accueil sans barre finale).
  return raw.trim();
}

/** Soumet une URL précise (hors sélection). Compte dans le quota du jour et dans l'historique. */
export async function submitOne(rawUrl, { dryRun = false, today = new Date(), env = process.env, cap = INDEXING_DAILY_CAP } = {}) {
  if (!isConfigured(env)) throw new NotConfiguredError(NOT_CONFIGURED);
  const url = assertOwnUrl(rawUrl);
  const clientEmail = readServiceAccount(env).client_email;
  let state = normalizeState(await readJson(INDEXING_STATE_FILE, null), quotaDay(today));
  if (state.quota.count >= cap) throw new Error(`plafond de ${cap} soumissions atteint pour aujourd'hui (${state.quota.date})`);
  if (dryRun) return { url, status: 'simulation' };
  let notification;
  try {
    notification = await publishUrl(url);
  } catch (err) {
    throw new Error(explainError(err, clientEmail));
  }
  // Le lastmod du sitemap est repris pour que la collecte suivante ne resoumette pas cette URL.
  const lastmod = await fetchSitemapUrls(SITEMAP_URL).then(({ urls }) => urls.find((u) => u.loc === url)?.lastmod ?? null, () => null);
  state = recordSubmission(state, { loc: url, lastmod }, new Date().toISOString());
  await writeJson(INDEXING_STATE_FILE, state);
  return { url, status: 'soumis', quota: { date: state.quota.date, used: state.quota.count, cap }, notification: notification.urlNotificationMetadata ?? notification };
}

/** Dernière notification que Google a enregistrée pour une URL (urlNotifications.getMetadata). */
export async function getStatus(rawUrl, { env = process.env } = {}) {
  if (!isConfigured(env)) throw new NotConfiguredError(NOT_CONFIGURED);
  const url = assertOwnUrl(rawUrl);
  try {
    const metadata = await gscFetch(`${INDEXING_ENDPOINT}/urlNotifications/metadata?url=${encodeURIComponent(url)}`, API_OPTIONS);
    return { url, known: true, metadata };
  } catch (err) {
    if (err.status === 404) return { url, known: false, note: 'Google ne connaît aucune notification pour cette URL (jamais soumise par ce compte de service).' };
    throw new Error(explainError(err, readServiceAccount(env).client_email));
  }
}

/** Options de la ligne de commande. Fonction pure. */
export function parseArgs(argv) {
  const valueOf = (flag) => {
    const i = argv.indexOf(flag);
    const v = i === -1 ? null : argv[i + 1];
    return v && !v.startsWith('--') ? v : null;
  };
  const status = argv.includes('--status');
  const url = valueOf('--url') ?? (status ? valueOf('--status') : null);
  return { dryRun: argv.includes('--dry-run'), all: argv.includes('--all'), status, url };
}

if (isMain(import.meta.url)) {
  const opts = parseArgs(process.argv.slice(2));
  try {
    let out;
    if (opts.status) {
      if (!opts.url) throw new Error('usage : --status <url>');
      out = await getStatus(opts.url);
    } else if (process.argv.includes('--url')) {
      if (!opts.url) throw new Error('usage : --url <url>');
      out = await submitOne(opts.url, { dryRun: opts.dryRun });
    } else {
      out = await runIndexingApi({ dryRun: opts.dryRun, all: opts.all, persist: !opts.dryRun });
    }
    console.log(JSON.stringify(out, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(err.notConfigured ? 2 : 1);
  }
}
