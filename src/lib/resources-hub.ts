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
import { outilHeroOverride } from './hero-illustrations';
import { heroSrcFromSections, resolveCardVisuals } from './card-visual';
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
  /** Image du hero de la page détail, quand elle en a une explicite (lue par card-visual.ts). */
  heroSrc?: string;
  /** Image de la carte : résolue pour tout le hub, sans doublon de dessin (card-visual.ts). */
  image?: string;
  /** Teinte `hue-rotate` (visuels de catégorie uniquement). */
  tint?: number;
  /** Tags kebab-case du contenu (mots-clés de la recherche du hub, search-index.json). */
  tags?: string[];
  /** Type d'outil (calculateur, checklist, modèle, audit) : mots-clés de la recherche. */
  toolType?: 'calculator' | 'checklist' | 'template' | 'audit';
  /** Libellé de carte plus précis que celui du type (ex. « OUTIL · CALCULATEUR », « ACTUALITÉ »). */
  tag_fr?: string;
  tag_en?: string;
};

// Sous-types d'outil et d'article : le tag de la carte dit de quoi il s'agit, pas seulement « OUTIL ».
const TOOL_TAG: Record<NonNullable<ResourceItem['toolType']>, { fr: string; en: string }> = {
  calculator: { fr: 'OUTIL · CALCULATEUR', en: 'TOOL · CALCULATOR' },
  checklist: { fr: 'OUTIL · CHECKLIST', en: 'TOOL · CHECKLIST' },
  template: { fr: 'OUTIL · MODÈLE', en: 'TOOL · TEMPLATE' },
  audit: { fr: 'OUTIL · DIAGNOSTIC', en: 'TOOL · DIAGNOSTIC' },
};
const ARTICLE_TAG: Record<string, { fr: string; en: string }> = {
  actualite: { fr: 'ACTUALITÉ', en: 'NEWS' },
  'veille-ia': { fr: 'ACTUALITÉ', en: 'NEWS' },
  essai: { fr: 'ESSAI', en: 'ESSAY' },
  avis: { fr: 'AVIS', en: 'REVIEW' },
  notes: { fr: 'NOTE DE TERRAIN', en: 'FIELD NOTE' },
  'field-note': { fr: 'NOTE DE TERRAIN', en: 'FIELD NOTE' },
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
      heroSrc: heroSrcFromSections(e.data.sections),
      tags: e.data.tags,
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
        heroSrc: heroSrcFromSections(e.data.sections),
        tags: e.data.tags,
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
      heroSrc: e.data.heroIllustration?.src ?? outilHeroOverride(e.id)?.src,
      toolType: e.data.type,
      tag_fr: TOOL_TAG[e.data.type].fr,
      tag_en: TOOL_TAG[e.data.type].en,
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
          tags: maturite.data.tags,
          toolType: 'audit' as const,
          tag_fr: TOOL_TAG.audit.fr,
          tag_en: TOOL_TAG.audit.en,
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
      heroSrc: e.data.heroIllustration?.src ?? e.data.heroImage ?? undefined,
      tags: e.data.tags,
      tag_fr: e.data.type ? ARTICLE_TAG[e.data.type]?.fr : undefined,
      tag_en: e.data.type ? ARTICLE_TAG[e.data.type]?.en : undefined,
    })),
  ];
  const sorted = items.sort(
    (a, b) => b.date.getTime() - a.date.getTime() || a.title_fr.localeCompare(b.title_fr, 'fr'),
  );
  // Image de carte : hero de la page détail, puis catégorie, puis tags ; 0 doublon de dessin.
  const visuals = resolveCardVisuals(
    sorted.map((it) => ({
      text: `${it.title_fr} ${it.excerpt_fr}`,
      silo: it.silo,
      slug: it.href.split('/').pop(),
      heroSrc: it.heroSrc,
    })),
  );
  const weak = visuals.filter((v) => v.source === 'tags-weak').length;
  console.info(
    `[card-visual] ${visuals.length} cartes : ${visuals.filter((v) => v.source === 'hero').length} hero, ` +
      `${visuals.filter((v) => v.source === 'category').length} catégorie, ` +
      `${visuals.filter((v) => v.source === 'tags').length} tags, ${weak} tags faibles`,
  );
  return sorted.map((it, i) => ({ ...it, image: visuals[i].image, tint: visuals[i].tint }));
}

/** Tous les items du hub (mémoïsé : une seule construction par build). */
export function getResourceItems(): Promise<ResourceItem[]> {
  memo ??= build();
  return memo;
}
