// Waimia · Co-location DS (Wave #38, T5) · module `cta-newsletter-footer` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Newsletter Sections',
    categorySlug: 'newsletter-sections',
    family: 'band',
    intent: ['capture-lead'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['line-art', 'buttons', 'form'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['newsletter', 'cta', 'email', 'capture', 'pre-footer'],
    status: 'stable',
    description_fr: 'Capture email compacte multi-colonne de type pré-footer : titre, champ, bouton et mention RGPD sur une ligne. Sombre par défaut pour clore la page sur l’abonnement.',
    description_en: 'Compact multi-column pre-footer email capture: title, field, button and GDPR notice on one row. Dark by default to close the page on the subscription.',
  
};
