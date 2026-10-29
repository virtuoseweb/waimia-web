export const prerender = true;

import rss from '@astrojs/rss';
import { getLiveCollection } from '../lib/live-collection';
import type { APIContext } from 'astro';
import { FEED_XMLNS, buildFeedItems } from '../lib/feed-items';
import { SITE } from '../site.config';

export async function GET(context: APIContext) {
  // Post-fusion R1 : blog porte aussi les types field-note / veille-ia
  // (liens construits vers leur URL canonique via blogEntryHref). Texte complet : cf feed-items.ts.
  const site = context.site ?? SITE.url;
  const blog = (await getLiveCollection('blog'))
    .filter((e) => e.data.seo?.noindex !== true)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: 'Waimia · Blog & Veille IA',
    description: "Articles, essais et veille sur l'IA appliquée aux PME.",
    site,
    items: await buildFeedItems(blog, String(site).replace(/\/$/, '')),
    xmlns: FEED_XMLNS,
    trailingSlash: false,
    customData: '<language>fr-FR</language>',
  });
}
