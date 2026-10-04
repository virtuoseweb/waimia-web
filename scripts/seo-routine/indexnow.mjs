/**
 * IndexNow (Bing, Yandex, Seznam, Naver et moteurs partenaires ; Google n'y participe pas).
 * Envoie les URL du sitemap de production qui sont nouvelles ou dont le `lastmod` a changé
 * depuis le dernier envoi. L'état du dernier envoi est conservé dans docs/seo/data/state/.
 *
 * La clé est publique par conception : public/<clé>.txt à la racine du site. Tant que ce
 * fichier n'est pas en ligne (PR non déployée), le script n'envoie rien et le signale.
 *
 * Usage direct : `node scripts/seo-routine/indexnow.mjs [--dry-run]`.
 */
import { join } from 'node:path';
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY, SITE_HOST, SITE_ORIGIN, SITEMAP_URL, STATE_DIR, USER_AGENT } from './config.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { fetchText, readJson, writeJson, isMain } from './lib/util.mjs';

export const INDEXNOW_STATE_FILE = join(STATE_DIR, 'indexnow.json');
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;

/** URL à envoyer : absentes de l'état, ou dont le lastmod diffère de celui du dernier envoi. Fonction pure. */
export function selectChanged(urls, state) {
  const sent = state?.urls ?? {};
  const added = [];
  const modified = [];
  for (const u of urls) {
    if (!(u.loc in sent)) added.push(u.loc);
    else if ((u.lastmod ?? null) !== (sent[u.loc] ?? null) && u.lastmod) modified.push(u.loc);
  }
  return { added, modified, toSend: [...added, ...modified] };
}

async function keyIsLive() {
  try {
    const body = await fetchText(KEY_LOCATION, { retries: 0, timeoutMs: 15000 });
    return body.trim() === INDEXNOW_KEY;
  } catch {
    return false;
  }
}

export async function runIndexNow({ dryRun = false, persist = true } = {}) {
  const { urls } = await fetchSitemapUrls(SITEMAP_URL);
  const state = await readJson(INDEXNOW_STATE_FILE, null);
  const { added, modified, toSend } = selectChanged(urls, state);
  const base = {
    generatedAt: new Date().toISOString(),
    keyLocation: KEY_LOCATION,
    sitemapUrlCount: urls.length,
    added,
    modified,
    lastSubmission: state?.lastSubmission ?? null,
  };
  if (toSend.length === 0) return { ...base, status: 'rien à envoyer', sent: 0 };
  if (!(await keyIsLive())) {
    return { ...base, status: 'clé non déployée', sent: 0, note: `Le fichier ${KEY_LOCATION} ne répond pas avec la clé attendue : rien n'a été envoyé et l'état n'a pas changé.` };
  }
  if (dryRun) return { ...base, status: 'simulation', sent: 0, wouldSend: toSend.length };
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8', 'user-agent': USER_AGENT },
    body: JSON.stringify({ host: SITE_HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList: toSend }),
    signal: AbortSignal.timeout(30000),
  });
  // 200 = reçu ; 202 = reçu, validation de la clé en attente. Le reste est une erreur.
  if (res.status !== 200 && res.status !== 202) {
    const detail = (await res.text().catch(() => '')).slice(0, 200);
    throw new Error(`IndexNow a répondu ${res.status} ${detail}`.trim());
  }
  const now = new Date().toISOString();
  if (persist) {
    await writeJson(INDEXNOW_STATE_FILE, {
      lastSubmission: now,
      lastStatus: res.status,
      urls: Object.fromEntries(urls.map((u) => [u.loc, u.lastmod ?? null])),
    });
  }
  return { ...base, status: res.status === 200 ? 'envoyé' : 'envoyé, clé en cours de validation', httpStatus: res.status, sent: toSend.length, lastSubmission: now };
}

if (isMain(import.meta.url)) {
  try {
    console.log(JSON.stringify(await runIndexNow({ dryRun: process.argv.includes('--dry-run'), persist: !process.argv.includes('--dry-run') }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
