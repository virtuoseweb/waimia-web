// Waimia · Co-location DS (Wave #38, T5) · module `department-stack` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    family: 'table',
    intent: ['explain-concept'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['table', 'badge', 'list'],
    layoutFacets: ['2-col'],
    tags: ['solutions', 'stack', 'tools', 'table', 'editorial'],
    status: 'stable',
    description_fr: 'Stack outils en table éditoriale : en-tête eyebrow et titre display, aside Callout, EditorialTable catégorie/outil/rôle.',
    description_en: 'Tool stack as an editorial table: an eyebrow and display heading header, a Callout aside, and a category/tool/role EditorialTable.',
  
};
