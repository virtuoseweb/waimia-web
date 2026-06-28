// Waimia · Co-location DS (Wave #38, T5) · module `manifesto-act` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Manifesto Sections',
    categorySlug: 'manifesto-sections',
    family: 'duo',
    intent: ['tell-story'],
    pageRole: ['opener'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'icons'],
    layoutFacets: ['3-col'],
    tags: ['manifesto', 'act', 'numbered', 'stats', 'sticky', 'ink'],
    status: 'stable',
    description_fr: 'Acte numéroté de manifeste : label sticky (numéro romain + sous-titre), statement XL et rangée de chiffres massifs optionnelle, tone encre ou paper.',
    description_en: 'Numbered manifesto act: sticky label (roman numeral + subtitle), XL statement and an optional row of massive figures, ink or paper tone.',
  
};
