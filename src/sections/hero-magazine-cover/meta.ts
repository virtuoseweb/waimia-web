// Waimia · Co-location DS (Wave #38, T5) · module `hero-magazine-cover` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    family: 'hero',
    intent: ['state-value-prop'],
    pageRole: ['hero'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['buttons', 'badge'],
    layoutFacets: ['4-col', 'centered'],
    tags: ['hero', 'magazine', 'cover', 'masthead', 'editorial'],
    status: 'stable',
    description_fr: 'Héro plein écran « couverture magazine » : bande masthead mono 4 colonnes en haut, titre serif géant centré dominant, fine règle accent, tagline display italic, un seul CTA centré. Variante paper et ink, responsive (masthead 2 colonnes sur mobile).',
    description_en: 'Full-viewport "magazine cover" hero: 4-column mono masthead band at the top, dominant centered giant serif title, thin accent rule, italic display tagline, a single centered CTA. Paper and ink variants, responsive (2-column masthead on mobile).',
  
};
