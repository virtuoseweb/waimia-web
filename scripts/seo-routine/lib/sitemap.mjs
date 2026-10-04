/**
 * Lecture d'un sitemap (ou d'un index de sitemaps, suivi sur deux niveaux) vers une liste d'URL.
 */
import { fetchText } from './util.mjs';
import { parseSitemap } from './xml.mjs';

/**
 * @returns {Promise<{ urls: Array<{loc:string, lastmod:string|null}>, sitemaps: string[] }>}
 */
export async function fetchSitemapUrls(url, { maxSitemaps = 30, fetcher = fetchText } = {}) {
  const seen = new Set();
  const urls = new Map();
  const queue = [url];
  while (queue.length && seen.size < maxSitemaps) {
    const current = queue.shift();
    if (seen.has(current)) continue;
    seen.add(current);
    const parsed = parseSitemap(await fetcher(current));
    for (const child of parsed.sitemaps) if (!seen.has(child)) queue.push(child);
    for (const u of parsed.urls) if (!urls.has(u.loc)) urls.set(u.loc, u);
  }
  return { urls: [...urls.values()], sitemaps: [...seen] };
}
