// Waimia · Co-location DS (Wave #38, T5) · module `hover-reveal-list` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'scroll-interactive',
    intent: ['showcase-work'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['hover-reveal', 'scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['multiple-images', 'list'],
    layoutFacets: ['2-col', 'split'],
    tags: ['hover', 'reveal', 'list', 'interactive', 'portfolio'],
    status: 'stable',
    description_fr: "Liste editoriale qui revele l'image du projet au survol, dans un carre cadre (image qui suit le curseur ou centree).",
    description_en: 'Editorial list that reveals the project image on hover, in a framed square (image follows the cursor or stays centred).',
  
};
