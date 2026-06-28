// Waimia · Co-location DS (Wave #38, T5) · module `operating-layer` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'card-grid',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['line-art', 'buttons', 'code-block'],
    layoutFacets: ['4-col'],
    tags: ['platform', 'dark', 'terminal', 'console', 'mockup', 'attributes'],
    status: 'stable',
    description_fr: "Section couche opérationnelle fond sombre : chapter label + h2 + lede + CTA, console terminal mockup à droite, strip 4 attributs en pied.",
    description_en: 'Dark-background operating-layer section: chapter label + h2 + lede + CTA, terminal console mockup right, 4-attribute strip at foot.',
  
};
