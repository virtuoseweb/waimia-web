/**
 * Veille : lit les flux RSS/Atom listés dans docs/seo/feeds.json et sort les entrées des
 * 8 derniers jours (titre, lien, date, résumé court, source, thème), dédupliquées.
 * Un flux en erreur n'arrête pas le script : il est signalé dans `sources`.
 *
 * Usage direct : `node scripts/seo-routine/feeds.mjs [--check]`
 *   --check : affiche l'état de chaque flux (format, nombre d'entrées, date la plus récente).
 */
import { join } from 'node:path';
import { SEO_DIR, THRESHOLDS } from './config.mjs';
import { fetchText, readJson, mapLimit, normalizeUrl, normalizeText, isMain } from './lib/util.mjs';
import { parseFeed } from './lib/xml.mjs';

export const FEEDS_FILE = join(SEO_DIR, 'feeds.json');

/**
 * Filtre, borne et déduplique les entrées d'un ensemble de flux déjà lus. Fonction pure.
 * @param {Array<{feed:object, entries:Array}>} parsed
 */
export function selectEntries(parsed, { now = new Date(), windowDays = THRESHOLDS.feedWindowDays, maxPerSource = THRESHOLDS.feedMaxPerSource } = {}) {
  const since = now.getTime() - windowDays * 86400000;
  const seenLinks = new Set();
  const seenTitles = new Set();
  const out = [];
  const stats = {};
  for (const { feed, entries } of parsed) {
    const include = (feed.include ?? []).map(normalizeText).filter(Boolean);
    const recent = entries
      .filter((e) => e.date && e.date.getTime() >= since && e.date.getTime() <= now.getTime() + 86400000)
      .filter((e) => {
        if (!include.length) return true;
        const hay = ` ${normalizeText(`${e.title} ${e.summary}`)} `;
        return include.some((term) => hay.includes(` ${term}`));
      })
      .sort((a, b) => b.date - a.date);
    let kept = 0;
    for (const e of recent) {
      if (kept >= (feed.maxItems ?? maxPerSource)) break;
      const linkKey = normalizeUrl(e.link);
      const titleKey = normalizeText(e.title);
      if ((linkKey && seenLinks.has(linkKey)) || (titleKey && seenTitles.has(titleKey))) continue;
      if (linkKey) seenLinks.add(linkKey);
      if (titleKey) seenTitles.add(titleKey);
      kept += 1;
      out.push({ title: e.title, link: e.link, date: e.date.toISOString(), summary: e.summary, source: feed.name, sourceId: feed.id, theme: feed.theme, lang: feed.lang ?? null });
    }
    stats[feed.id] = { inWindow: recent.length, kept };
  }
  out.sort((a, b) => b.date.localeCompare(a.date));
  return { entries: out, stats };
}

export async function collectFeeds({ now = new Date() } = {}) {
  const config = await readJson(FEEDS_FILE);
  if (!config?.feeds?.length) throw new Error(`aucun flux dans ${FEEDS_FILE}`);
  const read = await mapLimit(config.feeds, 5, async (feed) => {
    try {
      const parsed = parseFeed(await fetchText(feed.url));
      return { feed, entries: parsed.entries, format: parsed.format };
    } catch (err) {
      return { feed, entries: [], error: err.message };
    }
  });
  const { entries, stats } = selectEntries(read.filter((r) => !r.error), { now });
  const sources = read.map((r) => {
    const dated = r.entries.filter((e) => e.date).sort((a, b) => b.date - a.date);
    return {
      id: r.feed.id,
      name: r.feed.name,
      theme: r.feed.theme,
      url: r.feed.url,
      ok: !r.error,
      error: r.error ?? null,
      format: r.format ?? null,
      total: r.entries.length,
      undated: r.entries.length - dated.length,
      newest: dated[0]?.date.toISOString() ?? null,
      inWindow: stats[r.feed.id]?.inWindow ?? 0,
      kept: stats[r.feed.id]?.kept ?? 0,
    };
  });
  const byTheme = {};
  for (const e of entries) byTheme[e.theme] = (byTheme[e.theme] ?? 0) + 1;
  return {
    generatedAt: new Date().toISOString(),
    windowDays: THRESHOLDS.feedWindowDays,
    feedCount: config.feeds.length,
    feedsInError: sources.filter((s) => !s.ok).map((s) => ({ id: s.id, url: s.url, error: s.error })),
    entryCount: entries.length,
    byTheme,
    sources,
    entries,
  };
}

if (isMain(import.meta.url)) {
  try {
    const out = await collectFeeds();
    if (process.argv.includes('--check')) {
      for (const s of out.sources) {
        console.log(`${s.ok ? 'OK ' : 'KO '} ${s.id.padEnd(28)} ${String(s.format ?? '-').padEnd(5)} total=${String(s.total).padStart(4)} 8j=${String(s.inWindow).padStart(3)} gardées=${String(s.kept).padStart(2)} récent=${s.newest?.slice(0, 10) ?? '-'} ${s.error ?? ''}`);
      }
      console.log(`${out.entryCount} entrées retenues sur ${out.feedCount} flux, ${out.feedsInError.length} en erreur.`);
    } else {
      console.log(JSON.stringify(out, null, 2));
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
