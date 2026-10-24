export const prerender = true;

import rss from '@astrojs/rss';
import { getLiveCollection } from '../../lib/live-collection';
import type { APIContext } from 'astro';
import { FEED_XMLNS, buildFeedItems } from '../../lib/feed-items';
import { SITE } from '../../site.config';

export async function GET(context: APIContext) {
  // Post-fusion R1 : liens type-aware (field-note / veille-ia → routes héritées). Texte complet : cf feed-items.ts.
  const site = context.site ?? SITE.url;
  const blog = (await getLiveCollection('blog')).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  return rss({
    title: 'Waimia · Blog',
    description: "Essais et articles sur l'IA appliquée aux PME B2B.",
    site,
    items: await buildFeedItems(blog, String(site).replace(/\/$/, '')),
    xmlns: FEED_XMLNS,
    customData: '<language>fr-FR</language>',
  });
}
