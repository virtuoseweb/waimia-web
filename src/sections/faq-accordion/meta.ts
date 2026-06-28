// Waimia · Co-location DS (Wave #38, T5) · module `faq-accordion` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    family: 'accordion',
    intent: ['answer-objections'],
    pageRole: ['closer'],
    contentMode: 'instance',
    effects: ['expand-collapse'],
    interactions: ['click-toggle'],
    elements: ['line-art', 'accordion'],
    layoutFacets: ['1-col'],
    tags: ['faq', 'accordion'],
    status: 'stable',
    description_fr: 'FAQ en accordéon pour répondre aux questions fréquentes sans surcharger la page.',
    description_en: 'Accordion FAQ for answering common questions without overloading the page.',
  
};
