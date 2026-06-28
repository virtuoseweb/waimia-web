// Waimia · Co-location DS (Wave #38, T5) · module `tech-models-table` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'table',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll', 'scroll-reveal'],
    interactions: ['hover', 'scroll', 'drag-scroll'],
    elements: ['badge'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['technologies', 'models', 'table', 'comparison', 'editorial'],
    status: 'stable',
    description_fr: 'Table de comparaison des modèles en cinq colonnes (Modèle, Profil, Coût, Contexte, Usages) basée sur EditorialTable.',
    description_en: 'Five-column model comparison table (Model, Profile, Cost, Context, Uses) built on EditorialTable.',
  
};
