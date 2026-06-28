// Waimia · Co-location DS (Wave #38, T5) · module `booking-embed` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Contact Sections',
    categorySlug: 'contact-sections',
    family: 'form-panel',
    intent: ['capture-lead'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['scroll'],
    elements: ['line-art', 'list'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['contact', 'booking', 'cal', 'embed', 'meeting', 'rdv', 'conversion'],
    status: 'stable',
    description_fr: 'Section de prise de rendez-vous intégrant le widget Cal.com (CalEmbed) avec une copy de réassurance, pour réserver un audit ou un appel.',
    description_en: 'Booking section embedding the Cal.com widget (CalEmbed) with reassurance copy, to book an audit or a call.',
  
};
