// Waimia · Co-location DS (Wave #38, T5) · module `code-showcase` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    family: 'terminal-shell',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['horizontal-scroll'],
    interactions: ['drag-scroll'],
    elements: ['line-art', 'icons', 'code-block', 'badge', 'cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['code', 'showcase', 'syntax', 'mono', 'devtools', 'saas'],
    status: 'stable',
    description_fr: 'Vitrine de code annoté pour devtools/SaaS technique : copy explicative, bloc code mono avec numéros de ligne et commentaires bilingues alignés, label fichier et langage, tone encre ou paper.',
    description_en: 'Annotated code showcase for devtools/technical SaaS: explanatory copy, mono code block with line numbers and aligned bilingual comments, file and language label, ink or paper tone.',
  
};
