// Waimia · Co-location DS (Wave #38, T5) · module `feature-accordion` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    family: 'accordion',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['expand-collapse'],
    interactions: ['click-toggle'],
    elements: ['line-art', 'accordion'],
    layoutFacets: ['1-col'],
    tags: ['feature', 'accordion', 'progressive-disclosure', 'details', 'saas'],
    status: 'stable',
    description_fr: 'Features en progressive disclosure : accordéon natif <details>, chaque item ouvre un détail explicatif et une métadonnée optionnelle. Premier item ouvrable par défaut.',
    description_en: 'Features in progressive disclosure: native <details> accordion, each item reveals an explanatory body and optional meta. First item can open by default.',
  
};
