// Waimia · Co-location DS (Wave #38, T5) · module `media-swap-band` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'scroll-interactive',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['crossfade', 'auto-rotate', 'scroll-reveal'],
    interactions: ['hover', 'scroll', 'autoplay'],
    elements: ['multiple-images', 'buttons'],
    layoutFacets: ['2-col', 'split'],
    tags: ['media', 'swap', 'band', 'crossfade', 'interactive'],
    status: 'stable',
    description_fr: 'Bande 2 ou 3 colonnes dont les images changent en fondu (auto ou au survol), avec CTA.',
    description_en: 'Band of 2 or 3 columns whose images crossfade (auto or on hover), with a CTA.',
  
};
