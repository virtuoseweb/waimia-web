// Waimia · Co-location DS (Wave #38, T5) · module `architecture-diagram` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'split-media',
    intent: ['explain-concept'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art'],
    layoutFacets: ['centered'],
    tags: ['architecture', 'diagram', 'svg', 'system'],
    status: 'stable',
    description_fr: "Diagramme d'architecture signature : N canaux d'entrée vers un système central et M sorties, avec boucle d'amélioration continue.",
    description_en: 'Signature architecture diagram: N input channels flowing into a central system with M outputs, plus a continuous improvement loop.',
  
};
