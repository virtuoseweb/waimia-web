/**
 * Brave Search : file hebdomadaire des URL à soumettre au formulaire de réexploration
 * (https://search.brave.com/submit-url). Brave n'a ni API d'indexation, ni outil webmaster, ni
 * IndexNow : ce script NE SOUMET RIEN. Il calcule la file (URL du sitemap de production nouvelles
 * ou dont le `lastmod` a changé depuis la dernière file) ; la soumission se fait par le navigateur
 * de Simon, dans la tâche planifiée « Soumission Brave hebdomadaire Waimia » (docs/seo/ROUTINE.md).
 *
 * État : docs/seo/data/state/brave.json. La file de la semaine est considérée comme transmise :
 * une URL sortie une semaine ne ressort pas tant que son `lastmod` ne change pas. Si la collecte
 * tourne plusieurs fois dans la même semaine ISO, la file de la semaine est conservée et
 * complétée, pour qu'une relance ne l'efface pas de latest.json.
 *
 * Amorçage : les URL du sitemap ont été soumises à la main le 4 octobre 2026. Sans état, la
 * première exécution enregistre donc le sitemap courant comme déjà soumis et sort une file vide,
 * sauf avec `--all`.
 *
 * Usage direct : `node scripts/seo-routine/brave-queue.mjs [--all] [--dry-run]`
 *   --all : met tout le sitemap dans la file (nouvelle passe complète, après une refonte).
 *   --dry-run : affiche la file sans écrire l'état.
 */
import { join } from 'node:path';
import { SITEMAP_URL, STATE_DIR } from './config.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { isoWeek, readJson, writeJson, isMain } from './lib/util.mjs';

export const BRAVE_STATE_FILE = join(STATE_DIR, 'brave.json');
export const BRAVE_SUBMIT_URL = 'https://search.brave.com/submit-url';

/**
 * Calcule la file et l'état suivant. Fonction pure.
 * @param {Array<{loc:string, lastmod:string|null}>} urls URL du sitemap de production
 * @param {{week?:string, queue?:string[], urls?:Record<string,string|null>}|null} state état précédent, `null` s'il n'existe pas
 * @param {{all?:boolean, week:string, now?:string}} options
 */
export function selectBraveQueue(urls, state, { all = false, week, now = null } = {}) {
  const inSitemap = new Set(urls.map((u) => u.loc));
  const seeded = !state && !all;
  const known = state?.urls ?? {};
  const added = [];
  const modified = [];
  if (!seeded) {
    for (const u of urls) {
      if (!(u.loc in known)) added.push(u.loc);
      else if (u.lastmod && u.lastmod !== (known[u.loc] ?? null)) modified.push(u.loc);
    }
  }
  // Relance dans la même semaine : on garde la file déjà sortie (URL encore au sitemap).
  const carried = state?.week === week ? (state.queue ?? []).filter((loc) => inSitemap.has(loc)) : [];
  const toSubmit = all ? urls.map((u) => u.loc) : [...new Set([...carried, ...added, ...modified])];
  const nextState = {
    week,
    updatedAt: now,
    seededAt: state?.seededAt ?? (seeded ? now : null),
    queue: toSubmit,
    urls: Object.fromEntries(urls.map((u) => [u.loc, u.lastmod ?? null])),
  };
  return { seeded, all, added, modified, carried, toSubmit, nextState };
}

export function braveNote({ seeded, all, toSubmit, sitemapUrlCount }) {
  if (seeded) return `Amorçage : les ${sitemapUrlCount} URL du sitemap sont enregistrées comme déjà soumises à Brave (soumission manuelle du 4 octobre 2026). File vide.`;
  if (toSubmit.length === 0) return 'Aucune URL nouvelle ou modifiée : rien à soumettre à Brave cette semaine.';
  const scope = all ? 'tout le sitemap, option --all' : 'URL nouvelles ou modifiées';
  return `${toSubmit.length} URL à soumettre une par une sur ${BRAVE_SUBMIT_URL} (${scope}), par la tâche planifiée « Soumission Brave hebdomadaire Waimia ». Ce script ne soumet rien.`;
}

export async function runBraveQueue({ all = false, persist = true, today = new Date(), urls = null, stateFile = BRAVE_STATE_FILE } = {}) {
  const sitemapUrls = urls ?? (await fetchSitemapUrls(SITEMAP_URL)).urls;
  const state = await readJson(stateFile, null);
  const now = today.toISOString();
  const sel = selectBraveQueue(sitemapUrls, state, { all, week: isoWeek(today), now });
  if (persist) await writeJson(stateFile, sel.nextState);
  return {
    generatedAt: now,
    submitUrl: BRAVE_SUBMIT_URL,
    sitemapUrlCount: sitemapUrls.length,
    mode: all ? 'passe complète' : sel.seeded ? 'amorçage' : 'nouvelles ou modifiées',
    added: sel.added,
    modified: sel.modified,
    carried: sel.carried,
    toSubmit: sel.toSubmit,
    count: sel.toSubmit.length,
    note: braveNote({ ...sel, sitemapUrlCount: sitemapUrls.length }),
  };
}

if (isMain(import.meta.url)) {
  try {
    const dryRun = process.argv.includes('--dry-run');
    console.log(JSON.stringify(await runBraveQueue({ all: process.argv.includes('--all'), persist: !dryRun }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
