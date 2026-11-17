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
 *
 * Mode autonome, pour la tâche Brave (ni secret ; seul `--record` écrit) :
 *   `node scripts/seo-routine/brave-queue.mjs --from-sitemap [--cap=40] [--offset=0] [--sitemap=<URL ou fichier>] [--json] [--no-memory] [--days=8]`
 *   `node scripts/seo-routine/brave-queue.mjs --record [--record-file=<fichier>]` (URL sur stdin sinon)
 * Mémoire (depuis le 17 novembre 2026) : docs/seo/data/state/brave-submitted.json garde chaque URL
 * soumise avec « Success » et son lastmod à ce moment. La file est alors : les URL du sitemap
 * jamais soumises, ou dont le lastmod a changé depuis leur dernière soumission, sans fenêtre de
 * jours. Une page déjà soumise et inchangée ne ressort plus, et le reste au-delà du plafond revient
 * seul la semaine suivante. La tâche enregistre ses « Success » avec `--record` et commite ce seul
 * fichier. Sans mémoire (ou `--no-memory`), ancien fonctionnement : les URL dont le `lastmod` date
 * de moins de `--days` jours, réunies avec `brave.toSubmit` de docs/seo/data/latest.json. Ordre : la file de la collecte, puis les URL que la dernière inspection
 * d'indexation ne connaissait pas (pages nouvelles), puis les autres, les plus récentes d'abord.
 * `--cap` plafonne une exécution (40 : une vérification anti-robot est apparue vers 47
 * soumissions d'affilée le 4 octobre 2026) ; le reste sort en « à reprendre » et se relance avec
 * `--offset`. Limite : `lastmod` est la date du contenu (`updatedAt`) ou du dernier commit qui a
 * touché le fichier de la page (src/lib/seo/lastmod.mjs), au jour près. Une page modifiée sans
 * que cette date change ne sort pas ; un commit qui touche beaucoup de fichiers les fait toutes
 * sortir ; une PR fusionnée mais pas encore déployée n'est pas dans le sitemap.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DATA_DIR, SITE_ORIGIN, SITEMAP_URL, STATE_DIR } from './config.mjs';
import { fetchSitemapUrls } from './lib/sitemap.mjs';
import { parseSitemap } from './lib/xml.mjs';
import { isoWeek, readJson, writeJson, isMain, normalizeUrl } from './lib/util.mjs';

export const BRAVE_STATE_FILE = join(STATE_DIR, 'brave.json');
/** Mémoire de la tâche Brave : URL réellement soumises (« Success ») et lastmod au moment de l'envoi. */
export const BRAVE_SUBMITTED_FILE = join(STATE_DIR, 'brave-submitted.json');
export const BRAVE_SUBMIT_URL = 'https://search.brave.com/submit-url';
/** Mode autonome : fenêtre de récence (jours) et plafond de soumissions par exécution. */
export const BRAVE_RECENT_DAYS = 8;
export const BRAVE_BATCH_CAP = 40;

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

const onSite = (loc) => loc === SITE_ORIGIN || String(loc).startsWith(`${SITE_ORIGIN}/`);

/** Jour (YYYY-MM-DD) d'un lastmod, ou null s'il n'est pas datable. */
export function lastmodDay(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/**
 * Une URL est-elle à (re)soumettre au vu de la mémoire de la tâche ? Oui si elle n'a jamais été
 * soumise, ou si son lastmod du jour est plus récent que celui qu'elle avait à sa dernière
 * soumission. Une URL non datable n'est soumise qu'une fois.
 */
export function needsSubmission(entry, lastmod) {
  if (!entry) return true;
  const day = lastmodDay(lastmod);
  if (!day) return false;
  const sent = lastmodDay(entry.lastmod);
  return !sent || day > sent;
}

/**
 * File autonome. Fonction pure.
 * @param {Array<{loc:string, lastmod:string|null}>} urls URL du sitemap de production
 * @param {{now?:Date, days?:number, cap?:number, offset?:number, extra?:string[], knownUrls?:string[]|null, submitted?:Record<string,{lastmod:string|null}>|null}} options
 *   extra : `brave.toSubmit` de latest.json ; knownUrls : URL déjà vues par la dernière inspection
 *   d'indexation (`null` = inconnu, aucune priorité aux pages nouvelles) ; submitted : mémoire de
 *   la tâche (docs/seo/data/state/brave-submitted.json > urls). Avec une mémoire, la file est
 *   « jamais soumise, ou modifiée depuis sa dernière soumission », sans fenêtre de jours : le
 *   reste au-delà du plafond revient tout seul la semaine suivante. Sans mémoire (`null`),
 *   ancien fonctionnement : lastmod de moins de `days` jours.
 */
export function selectFromSitemap(urls, { now = new Date(), days = BRAVE_RECENT_DAYS, cap = BRAVE_BATCH_CAP, offset = 0, extra = [], knownUrls = null, submitted = null } = {}) {
  const limitMs = days * 86400000;
  const site = urls.filter((u) => onSite(u.loc));
  const lastmodOf = new Map(site.map((u) => [u.loc, u.lastmod ?? null]));
  const undated = site.filter((u) => !lastmodDay(u.lastmod)).map((u) => u.loc);
  const memory = submitted ? new Map(Object.entries(submitted).map(([k, v]) => [normalizeUrl(k), v])) : null;
  const pending = (loc) => !memory || needsSubmission(memory.get(normalizeUrl(loc)), lastmodOf.get(loc) ?? null);
  const recent = site
    .filter((u) => lastmodDay(u.lastmod))
    .filter((u) => (memory ? true : now.getTime() - new Date(u.lastmod).getTime() < limitMs))
    .filter((u) => pending(u.loc))
    .sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod) || a.loc.localeCompare(b.loc));
  // Mémoire : une page jamais soumise et sans lastmod part quand même, une fois.
  const undatedNew = memory ? undated.filter((loc) => !memory.has(normalizeUrl(loc))) : [];
  const known = knownUrls ? new Set(knownUrls.map(normalizeUrl)) : null;
  // La file de la collecte ne contient que des URL du sitemap ; filtrée par la mémoire comme le reste.
  const fromCollect = [...new Set(extra.filter(onSite))].filter((loc) => !memory || (lastmodOf.has(loc) && pending(loc)));
  const fresh = known ? recent.filter((u) => !known.has(normalizeUrl(u.loc))).map((u) => u.loc) : [];
  const candidates = [...new Set([...fromCollect, ...fresh, ...recent.map((u) => u.loc), ...undatedNew])];
  const start = Math.max(0, offset);
  const toSubmit = candidates.slice(start, start + cap);
  return {
    mode: memory ? 'mémoire' : 'fenêtre',
    memoryCount: memory ? memory.size : null,
    alreadySubmitted: memory ? site.filter((u) => !pending(u.loc) && memory.has(normalizeUrl(u.loc))).length : null,
    days,
    since: new Date(now.getTime() - limitMs).toISOString(),
    cap,
    offset: start,
    sitemapUrlCount: site.length,
    recentCount: recent.length,
    fromCollectCount: fromCollect.length,
    newSinceLastInspection: known ? fresh : null,
    undated,
    total: candidates.length,
    toSubmit,
    count: toSubmit.length,
    remaining: candidates.slice(start + cap),
    nextOffset: start + cap < candidates.length ? start + cap : null,
  };
}

/** Lit un sitemap depuis une URL (index suivi) ou un fichier local enregistré. */
async function readSitemap(source) {
  if (/^https?:\/\//i.test(source)) return (await fetchSitemapUrls(source)).urls;
  return parseSitemap(await readFile(source, 'utf8')).urls;
}

export async function runFromSitemap({ sitemap = SITEMAP_URL, days = BRAVE_RECENT_DAYS, cap = BRAVE_BATCH_CAP, offset = 0, now = new Date(), dataDir = DATA_DIR, useMemory = true } = {}) {
  const urls = await readSitemap(sitemap);
  const latest = await readJson(join(dataDir, 'latest.json'), null);
  const indexState = await readJson(join(dataDir, 'state', 'gsc-index.json'), null);
  const memory = useMemory ? await readJson(join(dataDir, 'state', 'brave-submitted.json'), null) : null;
  const sel = selectFromSitemap(urls, {
    now,
    days,
    cap,
    offset,
    extra: latest?.brave?.toSubmit ?? [],
    knownUrls: indexState?.urls ? Object.keys(indexState.urls) : null,
    submitted: memory?.urls ?? null,
  });
  return { generatedAt: now.toISOString(), submitUrl: BRAVE_SUBMIT_URL, sitemap, latestGeneratedAt: latest?.generatedAt ?? null, ...sel };
}

export function formatFromSitemap(out) {
  const lines = [
    `File Brave autonome · calculée le ${out.generatedAt}`,
    out.mode === 'mémoire'
      ? `Sitemap : ${out.sitemap} · ${out.sitemapUrlCount} URL. Mémoire Brave (docs/seo/data/state/brave-submitted.json) : ${out.memoryCount} URL connues, dont ${out.alreadySubmitted} déjà soumises avec leur lastmod actuel, écartées.`
      : `Sitemap : ${out.sitemap} · ${out.sitemapUrlCount} URL, dont ${out.recentCount} au lastmod de moins de ${out.days} jours (depuis ${out.since.slice(0, 10)}). Pas de mémoire Brave : fenêtre de jours.`,
    `File de la collecte (latest.json > brave.toSubmit) : ${out.fromCollectCount} URL${out.latestGeneratedAt ? `, collecte du ${out.latestGeneratedAt}` : ' (pas de latest.json, ou pas de clé brave)'}.`,
  ];
  if (out.newSinceLastInspection) lines.push(`Pages inconnues de la dernière inspection d'indexation, placées en tête : ${out.newSinceLastInspection.length}.`);
  if (out.undated.length && out.mode !== 'mémoire') lines.push(`URL sans lastmod, non datables, laissées de côté : ${out.undated.length}.`);
  lines.push(`Total : ${out.total} URL. Plafond par exécution : ${out.cap}. Départ : ${out.offset}.`, '');
  if (out.count === 0) lines.push('RIEN À SOUMETTRE.');
  else lines.push(`À SOUMETTRE MAINTENANT (${out.count}), une par une sur ${out.submitUrl} :`, ...out.toSubmit);
  if (out.remaining.length) {
    const how = out.mode === 'mémoire' ? 'reviennent seules à la prochaine exécution, une fois les soumissions enregistrées (--record)' : `dans une autre exécution, avec --offset=${out.nextOffset}`;
    lines.push('', `À REPRENDRE (${out.remaining.length}), ${how} :`, ...out.remaining);
  }
  return lines.join('\n');
}

/**
 * Enregistre des soumissions « Success » dans la mémoire. Fonction pure.
 * N'accepte que des URL du site présentes au sitemap : le lastmod enregistré est celui du sitemap
 * au moment de l'enregistrement, ce qui ramènera l'URL dès qu'il changera.
 * @returns {{nextState:object, recorded:string[], rejected:{url:string, reason:string}[]}}
 */
export function recordSubmissions(state, submittedUrls, sitemapUrls, { now = new Date() } = {}) {
  const bySitemap = new Map(sitemapUrls.filter((u) => onSite(u.loc)).map((u) => [normalizeUrl(u.loc), u]));
  const urls = { ...(state?.urls ?? {}) };
  const recorded = [];
  const rejected = [];
  for (const raw of submittedUrls) {
    const url = String(raw).trim();
    if (!url) continue;
    if (!onSite(url)) {
      rejected.push({ url, reason: `hors de ${SITE_ORIGIN}` });
      continue;
    }
    const hit = bySitemap.get(normalizeUrl(url));
    if (!hit) {
      rejected.push({ url, reason: 'absente du sitemap de production' });
      continue;
    }
    urls[hit.loc] = { lastmod: lastmodDay(hit.lastmod), submittedAt: now.toISOString() };
    recorded.push(hit.loc);
  }
  const sorted = Object.fromEntries(Object.entries(urls).sort(([a], [b]) => a.localeCompare(b)));
  const nextState = {
    $comment:
      'Mémoire de la tâche Brave : URL soumises avec « Success » et leur lastmod du sitemap à ce moment. Écrit par `brave-queue.mjs --record`, jamais à la main. docs/seo/ROUTINE.md, section 12.',
    updatedAt: recorded.length ? now.toISOString() : (state?.updatedAt ?? null),
    urls: sorted,
  };
  return { nextState, recorded, rejected };
}

export async function runRecord(submittedUrls, { sitemap = SITEMAP_URL, now = new Date(), file = BRAVE_SUBMITTED_FILE } = {}) {
  const sitemapUrls = await readSitemap(sitemap);
  const state = await readJson(file, null);
  const out = recordSubmissions(state, submittedUrls, sitemapUrls, { now });
  if (out.recorded.length) await writeJson(file, out.nextState);
  return { file, recorded: out.recorded, rejected: out.rejected, total: Object.keys(out.nextState.urls).length };
}

const numArg = (name, fallback) => {
  const raw = process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  if (raw === undefined) return fallback;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) throw new Error(`--${name} attend un entier positif ou nul (reçu : ${raw})`);
  return n;
};

if (isMain(import.meta.url)) {
  try {
    if (process.argv.includes('--record')) {
      // URL lues sur stdin ou dans --record-file=<fichier>, une par ligne.
      const fileArg = process.argv.find((a) => a.startsWith('--record-file='))?.slice('--record-file='.length);
      const text = fileArg ? await readFile(fileArg, 'utf8') : await new Promise((resolve, reject) => {
        let buf = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (c) => (buf += c));
        process.stdin.on('end', () => resolve(buf));
        process.stdin.on('error', reject);
      });
      const sitemap = process.argv.find((a) => a.startsWith('--sitemap='))?.slice('--sitemap='.length) || SITEMAP_URL;
      const out = await runRecord(text.split(/\s+/), { sitemap });
      console.log(`Mémoire Brave : ${out.recorded.length} URL enregistrées, ${out.total} au total (${out.file}).`);
      for (const r of out.rejected) console.log(`Refusée : ${r.url} (${r.reason})`);
      process.exit(out.rejected.length ? 2 : 0);
    }
    if (process.argv.includes('--from-sitemap')) {
      const sitemap = process.argv.find((a) => a.startsWith('--sitemap='))?.slice('--sitemap='.length) || SITEMAP_URL;
      const days = numArg('days', BRAVE_RECENT_DAYS);
      const cap = numArg('cap', BRAVE_BATCH_CAP);
      if (days < 1 || cap < 1) throw new Error('--days et --cap attendent au moins 1');
      const out = await runFromSitemap({ sitemap, days, cap, offset: numArg('offset', 0), useMemory: !process.argv.includes('--no-memory') });
      console.log(process.argv.includes('--json') ? JSON.stringify(out, null, 2) : formatFromSitemap(out));
      process.exit(0);
    }
    const dryRun = process.argv.includes('--dry-run');
    console.log(JSON.stringify(await runBraveQueue({ all: process.argv.includes('--all'), persist: !dryRun }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
