export const prerender = true;

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { blogEntryHref } from '../lib/blog-routing';

export async function GET(context: APIContext) {
  // Post-fusion R1 : blog porte aussi les types field-note / veille-ia
  // (liens construits vers leur URL canonique via blogEntryHref).
  const blog = await getCollection('blog');

  const items = blog
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
    site: context.site ?? 'https://waimia.com',
    items,
    customData: '<language>fr-FR</language>',
  });
}
