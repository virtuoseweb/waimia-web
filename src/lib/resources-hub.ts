// Waimia · source unique des items du hub Ressources (2026-10-11).
//
// /ressources, /ressources/outils et /ressources/comparatifs rendent le MÊME composant
// (ResourcesHub.astro) à partir de cette liste, construite une seule fois par build :
// guides + comparatifs + outils (+ diagnostic maturité IA) + articles du blog, triés par
// date. Une vue filtrée ne rend que les items de son type (filtrage côté serveur).
import { getCollection, getEntry } from 'astro:content';
import { getLiveCollection } from './live-collection';
import { blogEntryHref } from './blog-routing';
import { isIndexableEntry } from './seo/hub-index';
import { COMPARATIFS_CURATION } from '../data/comparatifs-curation';
import type { ResourceKind } from '../data/ressources-hub-sections';

export type ResourceItem = {
  kind: ResourceKind;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  date: Date;
  read_time?: string;
  href: string;
  silo?: string;
};

// Titre court : la partie avant « · ».
const shortTitle = (full: string) => full.split(' · ')[0].trim();

let memo: Promise<ResourceItem[]> | undefined;

async function build(): Promise<ResourceItem[]> {
  const [guides, comparatifs, outils, blog, maturite] = await Promise.all([
    getCollection('guides'),
    getLiveCollection('comparatifs'),
    getCollection('outils'),
    getLiveCollection('blog'),
    getEntry('diagnostics', 'maturite-ia'),
  ]);

  const items: ResourceItem[] = [
    ...guides.filter(isIndexableEntry).map((e) => ({
      kind: 'guides' as const,
      title_fr: shortTitle(e.data.title_fr),
      title_en: shortTitle(e.data.title_en),
      excerpt_fr: e.data.description_fr,
      excerpt_en: e.data.description_en,
      date: e.data.publishedAt,
      href: `/ressources/guides/${e.data.slug ?? e.id}`,
      silo: e.data.category,
    })),
    ...comparatifs.filter(isIndexableEntry).map((e) => {
      const slug = e.data.slug ?? e.id;
      return {
        kind: 'comparatifs' as const,
        title_fr: shortTitle(e.data.title_fr),
        title_en: shortTitle(e.data.title_en),
        // Curation : l'arbitrage tranché en une phrase, sinon la description de la page.
        excerpt_fr: COMPARATIFS_CURATION[slug]?.fr ?? e.data.description_fr,
        excerpt_en: COMPARATIFS_CURATION[slug]?.en ?? e.data.description_en,
        date: e.data.publishedAt,
        href: `/ressources/comparatifs/${slug}`,
        silo: e.data.category,
      };
    }),
    ...outils.filter((e) => !e.data.seo?.noindex).map((e) => ({
      kind: 'outils' as const,
      title_fr: shortTitle(e.data.title_fr),
      title_en: shortTitle(e.data.title_en),
      excerpt_fr: e.data.description_fr,
      excerpt_en: e.data.description_en,
      date: e.data.publishedAt,
      href: `/ressources/outils/${e.id}`,
    })),
    ...(maturite
      ? [{
          kind: 'outils' as const,
          title_fr: shortTitle(maturite.data.title_fr),
          title_en: shortTitle(maturite.data.title_en),
          excerpt_fr: maturite.data.description_fr,
          excerpt_en: maturite.data.description_en,
          date: new Date(maturite.data.publishedAt),
          href: '/ressources/diagnostics/maturite-ia',
        }]
      : []),
    // Articles : même périmètre que /blog (les articles en noindex ne sont pas listés).
    ...blog.filter((e) => !e.data.seo?.noindex).map((e) => ({
      kind: 'articles' as const,
      title_fr: e.data.title_fr,
      title_en: e.data.title_en,
      excerpt_fr: e.data.excerpt_fr ?? e.data.description_fr,
      excerpt_en: e.data.excerpt_en ?? e.data.description_en,
      date: e.data.publishedAt,
      read_time: e.data.readingTime ? `${e.data.readingTime} min` : undefined,
      href: blogEntryHref(e),
      silo: e.data.category,
    })),
  ];
  return items.sort(
    (a, b) => b.date.getTime() - a.date.getTime() || a.title_fr.localeCompare(b.title_fr, 'fr'),
  );
}

/** Tous les items du hub (mémoïsé : une seule construction par build). */
export function getResourceItems(): Promise<ResourceItem[]> {
  memo ??= build();
  return memo;
}
