// Waimia · Co-location DS (Wave #38, T5) · module `product-reel` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    family: 'terminal-shell',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: [],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['scrollytelling', 'scroll-driven', 'terminal', 'product', 'showcase', 'sticky', 'interactive'],
    status: 'stable',
    description_fr: 'Reel produit scroll-driven : étapes à gauche pilotées au scroll, console terminal à droite dont le contenu change par écran. Viewport sticky.',
    description_en: 'Scroll-driven product reel: steps on the left driven by scroll, terminal console on the right whose content changes per screen. Sticky viewport.',
  
};
