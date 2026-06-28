// Waimia · Co-location DS (Wave #38, T5) · module `method-stepline` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    family: 'timeline',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['timeline', 'list'],
    layoutFacets: ['1-col'],
    tags: ['method', 'timeline', 'process', 'steps', 'horizontal'],
    status: 'stable',
    description_fr: 'Timeline de méthode horizontale sur fond clair : ligne hairline traversée de nœuds accent, chaque nœud surmonté d\'un numéro mono, d\'un titre serif et d\'un sous-label mono. En-tête kicker à gauche, durée à droite. Reveal-stagger, empilage en colonne en mobile.',
    description_en: 'Horizontal method timeline on a light background: a hairline rail crossed by accent nodes, each node topped with a mono number, a serif title and a mono sub-label. Header kicker on the left, duration on the right. Reveal-stagger, stacks into a column on mobile.',
  
};
