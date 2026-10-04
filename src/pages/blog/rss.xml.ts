export const prerender = true;

import rss from '@astrojs/rss';
import { getLiveCollection } from '../../lib/live-collection';
import type { APIContext } from 'astro';
import { blogEntryHref } from '../../lib/blog-routing';
import { SITE } from '../../site.config';

export async function GET(context: APIContext) {
  const blog = await getLiveCollection('blog');

  // Post-fusion R1 : liens type-aware (field-note / veille-ia → routes héritées).
  const items = blog
    .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
    .map((entry) => ({
      title: entry.data.title_fr,
      pubDate: new Date(entry.data.publishedAt),
      description: entry.data.description_fr,
      link: blogEntryHref(entry),
    }));

  return rss({
    title: 'Waimia · Blog',
    description: "Essais et articles sur l'IA appliquée aux PME B2B.",
    site: context.site ?? SITE.url,
    items,
    customData: '<language>fr-FR</language>',
  });
}
