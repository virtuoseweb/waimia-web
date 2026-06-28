// Waimia · Co-location DS (Wave #38, T5) · module `editorial-preview` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['list', 'cards'],
    layoutFacets: ['multi-col'],
    tags: ['editorial', 'preview', 'blog', 'rows', 'numbered'],
    status: 'stable',
    description_fr: 'Index éditorial de publications en lignes numérotées (num · date · tag · titre italique · flèche), extrait de FieldNotes.',
    description_en: 'Editorial publication index as numbered rows (num · date · tag · italic title · arrow), sourced from FieldNotes.',
  
};
