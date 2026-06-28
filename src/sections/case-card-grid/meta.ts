// Waimia · Co-location DS (Wave #38, T5) · module `case-card-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'card-grid',
    intent: ['showcase-work', 'social-proof'],
    pageRole: ['proof'],
    contentMode: 'global-ref',
    contentSource: 'caseRefs → cas collection',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['cards', 'list'],
    layoutFacets: ['multi-col'],
    tags: ['case-study', 'grid', 'proof', 'editorial'],
    status: 'stable',
    description_fr: "Table éditoriale de cas clients en six colonnes (index, client, secteur, stack, impact, flèche) façon compte rendu d'audit.",
    description_en: 'Editorial six-column case-study table (index, client, sector, stack, impact, arrow) styled like an audit report.',
  
};
