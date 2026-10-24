// Waimia · news-sitemap.mjs · sitemap « Google Actualités » (fonction pure, testable sans Astro).
//
// Règles de Google : seuls les articles publiés dans les 48 dernières heures y figurent, au
// plus 1 000 URL, chacun avec le nom et la langue de la publication, sa date de publication
// (W3C, avec fuseau) et son titre. Le sitemap est servi À LA DEMANDE (voir
// src/pages/sitemap-news.xml.ts) : la fenêtre de 48 h se calcule à chaque requête, pas au build.

export const NEWS_SITEMAP_WINDOW_MS = 48 * 60 * 60 * 1000;
export const NEWS_SITEMAP_MAX_URLS = 1000;

const escapeXml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** ISO 8601 avec le décalage de Paris (ex. 2026-10-24T14:10:00+02:00). */
export function isoWithOffset(date, timeZone = 'Europe/Paris') {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'longOffset',
    })
      .formatToParts(date)
      .map((x) => [x.type, x.value]),
  );
  const m = /^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/.exec(p.timeZoneName ?? 'GMT');
  const offset = m ? `${m[1]}${m[2].padStart(2, '0')}:${m[3] ?? '00'}` : '+00:00';
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${offset}`;
}

/** Articles retenus : publiés entre `now − 48 h` et `now`, du plus récent au plus ancien, plafonnés. */
export function selectNewsItems(items, now = new Date()) {
  const since = now.getTime() - NEWS_SITEMAP_WINDOW_MS;
  return items
    .filter((i) => i.publishedAt.getTime() >= since && i.publishedAt.getTime() <= now.getTime())
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, NEWS_SITEMAP_MAX_URLS);
}

/**
 * @param {Array<{ loc: string, title: string, publishedAt: Date }>} items
 * @param {{ now?: Date, publicationName?: string, language?: string }} [options]
 */
export function buildNewsSitemapXml(items, { now = new Date(), publicationName = 'Waimia', language = 'fr' } = {}) {
  const urls = selectNewsItems(items, now).map(
    (i) =>
      `  <url>\n    <loc>${escapeXml(i.loc)}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>${escapeXml(publicationName)}</news:name>\n        <news:language>${language}</news:language>\n      </news:publication>\n      <news:publication_date>${isoWithOffset(i.publishedAt)}</news:publication_date>\n      <news:title>${escapeXml(i.title)}</news:title>\n    </news:news>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urls.join('\n')}${urls.length ? '\n' : ''}</urlset>\n`;
}
