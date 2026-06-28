// Waimia · Co-location DS (Wave #38, T5) · module `use-case-index` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

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
    elements: ['list'],
    layoutFacets: ['multi-col'],
    tags: ['use-case', 'index', 'editorial', 'rows'],
    status: 'stable',
    description_fr: "Index éditorial de cas d'usage en lignes numérotées avec libellé italique, tag mono et lien d'ancrage solution.",
    description_en: 'Editorial use-case index as numbered rows with italic label, mono tag, and solution anchor link.',
  
};
