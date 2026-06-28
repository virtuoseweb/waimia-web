// Waimia · Co-location DS (Wave #38, T5) · module `cta-split-visual` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    family: 'split-media',
    intent: ['drive-action'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'buttons'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['cta', 'split', 'visual', 'banner'],
    status: 'stable',
    description_fr: 'Bandeau CTA asymetrique 2 colonnes : texte kicker/titre/body/boutons a gauche, visuel SVG decoratif a droite. Distinct des CTA centres.',
    description_en: 'Asymmetric 2-column CTA banner: kicker/title/body/buttons on the left, decorative SVG visual on the right. Distinct from centered CTAs.',
  
};
