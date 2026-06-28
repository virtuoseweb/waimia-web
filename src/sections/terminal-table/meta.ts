// Waimia · Co-location DS (Wave #38, T5) · module `terminal-table` · meta (extrait)
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
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['icons', 'code-block'],
    layoutFacets: ['1-col'],
    tags: ['table', 'terminal', 'console', 'rows', 'data', 'services'],
    status: 'stable',
    description_fr: 'Table terminal configurable (frame TerminalTable) : en-tête kicker/meta, titre, puis colonnes, headers et lignes cliquables avec rôle typographique par cellule.',
    description_en: 'Configurable terminal table (TerminalTable frame): kicker/meta header, heading, then columns, headers and clickable rows with a typographic role per cell.',
  
};
