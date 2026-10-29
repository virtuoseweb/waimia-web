// Route · /sitemap-news.xml · sitemap Google Actualités, servi à la demande.
// Les 48 dernières heures se comptent à chaque requête : un fichier figé au build serait faux
// dès le lendemain. Cache CDN court, puis revalidation.
export const prerender = false;

import type { APIContext } from 'astro';
import { getLiveCollection } from '../lib/live-collection';
import { blogEntryHref } from '../lib/blog-routing';
import { sortNews } from '../lib/news';
import { buildNewsSitemapXml } from '../lib/seo/news-sitemap.mjs';
import { SITE } from '../site.config';

export async function GET(_context: APIContext) {
  const news = sortNews(await getLiveCollection('blog'));
  const xml = buildNewsSitemapXml(
    news.map((entry) => ({
      loc: `${SITE.url}${blogEntryHref(entry)}`,
      title: entry.data.title_fr,
      publishedAt: entry.data.publishedAt,
    })),
  );
  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=3600',
    },
  });
}
