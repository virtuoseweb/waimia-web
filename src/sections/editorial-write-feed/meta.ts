// Waimia · Co-location DS (Wave #38, T5) · module `editorial-write-feed` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Table Sections',
    categorySlug: 'table-sections',
    family: 'prose',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: [],
    layoutFacets: ['1-col'],
    tags: ['table', 'feed', 'editorial', 'writing', 'changelog', 'rows'],
    status: 'stable',
    description_fr: 'Feed éditorial en lignes cliquables (EditorialWriteRow) : date, tag, texte et flèche par ligne, tone paper ou ink, lien meta type /feed.xml.',
    description_en: 'Editorial feed as clickable rows (EditorialWriteRow): date, tag, text and arrow per row, paper or ink tone, /feed.xml style meta link.',
  
};
