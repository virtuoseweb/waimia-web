// Waimia · Co-location DS (Wave #38, T5) · module `hero-media-medallion` · meta (extrait)
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
    elements: ['image', 'line-art', 'buttons', 'list', 'kpi-numbers', 'cards'],
    layoutFacets: ['3-col', 'split'],
    tags: ['hero', 'media', 'medallion', 'kpi', 'cta'],
    status: 'stable',
    description_fr: 'Héro plein écran en deux colonnes : texte (kicker, titre serif, lede, 2 CTA) à gauche, médaillon média line-art surmontant des KPI verticaux hairline à droite. Variante paper et ink, responsive (1 colonne sur mobile).',
    description_en: 'Full-viewport two-column hero: text (kicker, serif title, lede, 2 CTAs) on the left, line-art media medallion above stacked hairline KPIs on the right. Paper and ink variants, responsive (single column on mobile).',
  
};
