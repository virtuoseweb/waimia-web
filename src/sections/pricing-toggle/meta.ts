// Waimia · Co-location DS (Wave #38, T5) · module `pricing-toggle` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    family: 'card-grid',
    intent: ['present-pricing'],
    pageRole: ['conversion'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover', 'click-toggle'],
    elements: ['line-art', 'form', 'list', 'badge'],
    layoutFacets: ['3-col'],
    tags: ['pricing', 'toggle', 'monthly', 'annual', 'plans', 'switch'],
    status: 'stable',
    description_fr: 'Grille de cartes de prix avec bascule mensuel/annuel (CSS-only, sans JS) qui change les prix affichés et signale l\'économie annuelle.',
    description_en: 'Pricing card grid with a monthly/annual toggle (CSS-only, no JS) that swaps the displayed prices and surfaces the annual saving.',
  
};
