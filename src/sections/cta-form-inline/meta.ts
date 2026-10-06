// Waimia · Co-location DS (Wave #38, T5) · module `cta-form-inline` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    family: 'form-panel',
    intent: ['drive-action'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['buttons', 'form'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['cta', 'form', 'inline', 'email', 'newsletter', 'lead', 'capture', 'lead-magnet'],
    status: 'stable',
    description_fr: 'Bande CTA avec mini-formulaire inline (email et bouton), pour capter un lead ou une inscription newsletter à l\'instant d\'intention. Prop optionnelle `lead_magnet` (slug) : le fichier est livré par e-mail en pièce jointe.',
    description_en: 'CTA band with an inline mini-form (email and button), to capture a lead or newsletter sign-up at the moment of intent. Optional `lead_magnet` prop (slug): the file is delivered by email as an attachment.',
  
};
