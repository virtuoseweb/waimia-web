// Waimia · Co-location DS (Wave #38, T5) · module `data-table` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Table Sections',
    categorySlug: 'table-sections',
    family: 'table',
    intent: ['compare-options'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['drag-scroll'],
    elements: ['line-art', 'table', 'icons', 'code-block'],
    layoutFacets: ['centered'],
    tags: ['table', 'data', 'rows', 'comparison', 'neutral', 'striped'],
    status: 'stable',
    description_fr: 'Table de données neutre générique : en-tête optionnel, colonnes avec alignements, lignes et cellules typées (emphase), zébrures et légende. Distincte des tables habillées terminal ou éditoriale.',
    description_en: 'Neutral generic data table: optional header, columns with alignments, rows and typed cells (emphasis), zebra striping and caption. Distinct from the terminal or editorial dressed tables.',
  
};
