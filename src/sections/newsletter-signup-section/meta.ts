// Waimia · Co-location DS (Wave #38, T5) · module `newsletter-signup-section` · meta (extrait)
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
    elements: ['buttons'],
    layoutFacets: ['centered'],
    tags: ['newsletter', 'subscribe', 'email', 'signup', 'full-width', 'climax'],
    status: 'stable',
    description_fr: 'Section d\'inscription newsletter pleine largeur (réutilise NewsletterSignup), fonds au choix dont ink pour un climax de page.',
    description_en: 'Full-width newsletter sign-up section (reuses NewsletterSignup), with a background enum including ink for a page climax.',
  
};
