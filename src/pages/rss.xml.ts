export const prerender = true;

import rss from '@astrojs/rss';
import { getLiveCollection } from '../lib/live-collection';
import type { APIContext } from 'astro';
import { blogEntryHref } from '../lib/blog-routing';
import { SITE } from '../site.config';

export async function GET(context: APIContext) {
  // Post-fusion R1 : blog porte aussi les types field-note / veille-ia
  // (liens construits vers leur URL canonique via blogEntryHref).
  const blog = await getLiveCollection('blog');

  const items = blog
    .filter((e) => e.data.seo?.noindex !== true)
    .map((entry) => ({
      title: entry.data.title_fr,
      pubDate: new Date(entry.data.publishedAt),
      description: entry.data.description_fr,
      link: blogEntryHref(entry),
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Waimia · Blog & Veille IA',
    description: "Articles, essais et veille sur l'IA appliquée aux PME.",
    site: context.site ?? SITE.url,
    items,
    trailingSlash: false,
    customData: '<language>fr-FR</language>',
  });
}
