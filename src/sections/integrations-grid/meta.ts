// Waimia · Co-location DS (Wave #38, T5) · module `integrations-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    family: 'card-grid',
    intent: ['social-proof'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['multiple-images', 'logos', 'list'],
    layoutFacets: ['3-col'],
    tags: ['integrations', 'logos', 'grid', 'ecosystem', 'connectors'],
    status: 'stable',
    description_fr: 'Grille de logos d’intégrations groupés par catégorie (CRM, communication, données). Répond à l’objection « est-ce que ça se branche à nos outils ? » d’un coup d’œil.',
    description_en: 'Integration logo grid grouped by category (CRM, communication, data). Answers the “does it plug into our tools?” objection at a glance.',
  
};
