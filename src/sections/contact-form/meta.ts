// Waimia · Co-location DS (Wave #38, T5) · module `contact-form` · meta (extrait)
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
    interactions: ['hover'],
    elements: ['line-art', 'buttons', 'form'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['contact', 'form', 'name', 'email', 'message', 'lead'],
    status: 'stable',
    description_fr: 'Section contact avec formulaire (nom, email, téléphone, message) et colonne coordonnées, action vers /api/contact, bilingue.',
    description_en: 'Contact section with a form (name, email, phone, message) and a details column, posting to /api/contact, bilingual.',
  
};
