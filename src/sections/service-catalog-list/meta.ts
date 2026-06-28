// Waimia · Co-location DS (Wave #38, T5) · module `service-catalog-list` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'list',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: [],
    layoutFacets: ['4-col'],
    tags: ['services', 'catalog', 'list', 'editorial', 'rows'],
    status: 'stable',
    description_fr: 'Liste-catalogue éditoriale de services en lignes (§ numéro, titre display, description, méta durée, flèche) avec footer CTA optionnel.',
    description_en: 'Editorial service catalogue as rows (§ number, display title, description, duration meta, arrow) with an optional footer CTA.',
  
};
