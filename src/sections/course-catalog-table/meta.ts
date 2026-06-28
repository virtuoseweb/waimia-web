// Waimia · Co-location DS (Wave #38, T5) · module `course-catalog-table` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Index Sections',
    categorySlug: 'index-sections',
    family: 'table',
    intent: ['orient-navigate'],
    pageRole: ['utility'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['badge'],
    layoutFacets: ['multi-col'],
    tags: ['catalog', 'table', 'courses', 'school'],
    status: 'stable',
    description_fr: 'Tableau du catalogue formations : titre de section et lignes (#, titre, niveau en pill, durée, prix, flèche), une formation par ligne.',
    description_en: 'Course catalog table: a section title and rows (#, title, level pill, duration, price, arrow), one course per row.',
  
};
