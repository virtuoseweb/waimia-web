// Waimia · Co-location DS (Wave #38, T5) · module `pull-quote-block` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'quote',
    intent: ['social-proof', 'showcase-work'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['quote', 'avatar'],
    layoutFacets: ['1-col'],
    tags: ['quote', 'pullquote', 'editorial', 'closing'],
    status: 'stable',
    description_fr: 'Citation éditoriale isolée centrée ou inline, wrapper catalogue autour de la molécule PullQuote.',
    description_en: 'Standalone editorial quote, centered or inline, as a catalogue wrapper around the PullQuote molecule.',
  
};
