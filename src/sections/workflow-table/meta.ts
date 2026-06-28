// Waimia · Co-location DS (Wave #38, T5) · module `workflow-table` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'table',
    intent: ['explain-process', 'compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['table', 'badge', 'kpi-numbers'],
    layoutFacets: ['multi-col'],
    tags: ['solutions', 'workflows', 'table', 'comparison', 'editorial'],
    status: 'stable',
    description_fr: 'Table workflows signature en 5 colonnes (numéro, workflow, modèle, gain, comment), un workflow IA par ligne.',
    description_en: 'Signature workflow table in 5 columns (number, workflow, model, gain, how), one AI workflow per row.',
  
};
