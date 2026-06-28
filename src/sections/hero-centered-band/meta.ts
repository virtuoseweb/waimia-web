// Waimia · Co-location DS (Wave #38, T5) · module `hero-centered-band` · meta (extrait)
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
    elements: ['buttons', 'list'],
    layoutFacets: ['4-col', 'centered'],
    tags: ['hero', 'centered', 'band', 'capabilities', 'ink'],
    status: 'stable',
    description_fr: "Héro plein écran centré (kicker, titre serif, lede, 2 CTA) suivi d'une bande de capacités ink pleine largeur : 4 cellules (label mono accent + description), sombre dans les deux modes. Variante paper et ink, responsive.",
    description_en: 'Full-viewport centered hero (kicker, serif title, lede, 2 CTAs) followed by a full-width ink capabilities band: 4 cells (mono accent label + description), dark in both modes. Paper and ink variants, responsive.',
  
};
