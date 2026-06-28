// Waimia · Co-location DS (Wave #38, T5) · module `article-grid` · meta (extrait)
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
    elements: ['image', 'icons', 'avatar', 'cards'],
    layoutFacets: ['3-col'],
    tags: ['blog', 'articles', 'grid', 'cards', 'editorial', 'listing'],
    status: 'stable',
    description_fr: 'Grille de cartes d’articles/blog : image optionnelle, tag, titre, date, temps de lecture, extrait, auteur et lien, en 2 ou 3 colonnes. Le classique éditorial B2B.',
    description_en: 'Grid of article/blog cards: optional image, tag, title, date, read time, excerpt, author and link, in 2 or 3 columns. The B2B editorial classic.',
  
};
