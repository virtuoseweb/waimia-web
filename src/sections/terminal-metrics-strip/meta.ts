// Waimia · Co-location DS (Wave #38, T5) · module `terminal-metrics-strip` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    family: 'band',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['kpi-numbers', 'code-block'],
    layoutFacets: ['3-col'],
    tags: ['terminal', 'metrics', 'kpi', 'mono', 'strip', 'telemetry'],
    status: 'stable',
    description_fr: 'Strip KPI télémétrie tout mono : 2 à 6 cellules clé/valeur bordées de hairlines, esthétique console (uptime, agents, release), fonds paper, paper-2 ou ink.',
    description_en: 'All-mono telemetry KPI strip: 2 to 6 key/value cells with hairline borders, console aesthetics (uptime, agents, release), paper, paper-2 or ink backgrounds.',
  
};
