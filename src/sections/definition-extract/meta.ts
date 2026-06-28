// Waimia · Co-location DS (Wave #38, T5) · module `definition-extract` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Content Sections',
    categorySlug: 'content-sections',
    family: 'prose',
    intent: ['explain-concept'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['badge', 'list'],
    layoutFacets: ['1-col', 'centered'],
    tags: ['geo', 'definition', 'extractible', 'answer', 'eeat'],
    status: 'stable',
    description_fr: 'Bloc GEO « format extractible » : kicker mono, gros statement serif avec le terme défini en accent, rangée de pills, puis un bandeau de specs mono. Sobre, fond paper, pensé pour la citation par les moteurs génératifs.',
    description_en: 'GEO « extractable format » block: mono kicker, large serif statement with the defined term accented, a row of pills, then a mono specs strip. Sober, paper background, designed to be cited by generative engines.',
  
};
