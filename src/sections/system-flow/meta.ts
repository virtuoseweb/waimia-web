// Waimia · Co-location DS (Wave #38, T5) · module `system-flow` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'process-steps',
    intent: ['explain-concept', 'explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'icons', 'list'],
    layoutFacets: ['1-col'],
    tags: ['system', 'flow', 'architecture', 'steps', 'loop', 'ink'],
    status: 'stable',
    description_fr: 'Rangée horizontale de cartes d\'étapes sur fond ink, reliées par des flèches accent, qui raconte le flux du système (site → lead → scoring → CRM → apprentissage). En-tête « Fig. N » + méta mono, grand titre serif avec dernier mot en accent, lede courte, puis une ligne « ↺ boucle d\'amélioration continue ». Reveal-stagger, responsive (scroll horizontal / colonne empilée en mobile).',
    description_en: 'Horizontal row of step cards on an ink background, linked by accent arrows, telling the system flow (site → lead → scoring → CRM → learning). « Fig. N » header + mono meta, large serif title with the last word accented, short lede, then a « ↺ continuous improvement loop » line. Reveal-stagger, responsive (horizontal scroll / stacked column on mobile).',
  
};
