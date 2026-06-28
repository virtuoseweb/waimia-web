// Waimia · Co-location DS (Wave #38, T5) · module `decision-list` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'list',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['list'],
    layoutFacets: ['3-col'],
    tags: ['decision', 'list', 'numbered', 'editorial', 'guide'],
    status: 'stable',
    description_fr: 'Arbre de décision : en-tête kicker et titre display à gauche, liste ordonnée numérotée d items à droite, hairlines fines.',
    description_en: 'Decision tree: kicker and display heading on the left, a numbered ordered list of items on the right, thin hairlines.',
  
};
