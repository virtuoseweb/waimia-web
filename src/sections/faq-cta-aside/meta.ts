// Waimia · Co-location DS (Wave #38, T5) · module `faq-cta-aside` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    family: 'accordion',
    intent: ['answer-objections'],
    pageRole: ['closer'],
    contentMode: 'instance',
    effects: ['expand-collapse', 'scroll-reveal'],
    interactions: ['scroll', 'click-toggle'],
    elements: ['line-art', 'buttons', 'accordion'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['faq', 'accordion', 'cta', 'aside', 'sticky', 'lead', 'conversion'],
    status: 'stable',
    description_fr: 'FAQ en accordéon à gauche et panneau de réassurance avec CTA collant à droite, pour transformer une FAQ passive en capture de lead.',
    description_en: 'Accordion FAQ on the left with a sticky reassurance and CTA panel on the right, turning a passive FAQ into lead capture.',
  
};
