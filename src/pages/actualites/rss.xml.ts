export const prerender = true;

import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLiveCollection } from '../../lib/live-collection';
import { sortNews } from '../../lib/news';
import { FEED_XMLNS, buildFeedItems } from '../../lib/feed-items';
import { SITE } from '../../site.config';

/** Flux des actualités : texte complet, date et heure exactes de publication. */
export async function GET(context: APIContext) {
  const site = context.site ?? SITE.url;
  const news = sortNews(await getLiveCollection('blog'));

  return rss({
    title: 'Waimia · Actualités IA pour PME',
    description: "Actualités de l'IA vues par une PME : annonces, ce qui est confirmé, ce que ça change. Texte complet.",
    site,
    items: await buildFeedItems(news, String(site).replace(/\/$/, '')),
    xmlns: FEED_XMLNS,
    trailingSlash: false,
    customData: '<language>fr-FR</language>',
  });
}
