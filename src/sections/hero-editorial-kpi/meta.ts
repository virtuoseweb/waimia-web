// Waimia · Co-location DS (Wave #38, T5) · module `hero-editorial-kpi` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['line-art', 'buttons', 'list', 'kpi-numbers'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'editorial', 'kpi', 'asymmetric'],
    status: 'stable',
    description_fr: "Héro plein écran éditorial asymétrique (~65/35) : colonne dominante (kicker, titre serif accent, lede, 2 CTA, sous-CTA), rail léger à droite avec 3 KPI serif verticaux séparés par hairlines. Variante paper et ink, responsive.",
    description_en: 'Full-viewport asymmetric editorial hero (~65/35): dominant column (kicker, accented serif title, lede, 2 CTAs, sub-CTA), light right rail with 3 vertical serif KPIs separated by hairlines. Paper and ink variants, responsive.',
  
};
