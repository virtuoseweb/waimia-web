// Waimia · Co-location DS (Wave #38, T5) · module `trust-badges-band` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Trust Sections',
    categorySlug: 'trust-sections',
    family: 'band',
    intent: ['establish-credibility'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['list', 'code-block'],
    layoutFacets: ['3-col'],
    tags: ['trust', 'badges', 'security', 'compliance', 'reassurance'],
    status: 'stable',
    description_fr: 'Bandeau de badges de réassurance (sécurité, hébergement, conformité RGPD, garanties) en cellules hairline mono, placé juste avant le CTA pour lever l’objection risque.',
    description_en: 'Reassurance badge band (security, hosting, GDPR compliance, guarantees) in mono hairline cells, placed right before the CTA to remove the risk objection.',
  
};
