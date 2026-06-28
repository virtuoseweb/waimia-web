// Waimia · Co-location DS (Wave #38, T5) · module `announcement-banner` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Banner Sections',
    categorySlug: 'banner-sections',
    family: 'band',
    intent: ['announce'],
    pageRole: ['utility'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['buttons', 'icons', 'badge'],
    layoutFacets: ['centered'],
    tags: ['banner', 'announcement', 'promo', 'alert', 'dismissible', 'strip'],
    status: 'stable',
    description_fr: 'Bandeau d’annonce/promo fin : badge optionnel, texte court et lien, bouton de fermeture optionnel (dismissible), variantes accent, encre ou paper-2.',
    description_en: 'Thin announcement/promo banner: optional badge, short text and link, optional dismiss button, accent, ink or paper-2 variants.',
  
};
