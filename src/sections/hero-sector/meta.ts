// Waimia · Co-location DS (Wave #38, T5) · module `hero-sector` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['hover', 'scroll'],
    elements: ['line-art', 'buttons', 'badge', 'cards'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['hero', 'sector', 'department', 'tags'],
    status: 'stable',
    description_fr: 'Hero de page secteur ou département : SVG rotated 15° accent, dept kicker, h1 + lead italique, CTA et meta, tags secteurs.',
    description_en: 'Sector or department hero: 15° rotated SVG with accent, dept kicker, italic h1 + lead, CTA and meta, sector tags.',
  
};
