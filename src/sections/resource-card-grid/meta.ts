// Waimia · Co-location DS (Wave #38, T5) · module `resource-card-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Content Listing Sections',
    categorySlug: 'content-listing-sections',
    family: 'card-grid',
    intent: ['orient-navigate'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['buttons', 'icons', 'badge', 'cards'],
    layoutFacets: ['3-col'],
    tags: ['resources', 'downloads', 'grid', 'cards', 'cta', 'lead-magnet'],
    status: 'stable',
    description_fr: 'Grille de ressources téléchargeables : type (livre blanc, cookbook, outil), titre, description, format, badge gated et CTA, en 2 ou 3 colonnes.',
    description_en: 'Grid of downloadable resources: kind (white paper, cookbook, tool), title, description, format, gated badge and CTA, in 2 or 3 columns.',
  
};
