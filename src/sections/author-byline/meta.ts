// Waimia · Co-location DS (Wave #38, T5) · module `author-byline` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Team Sections',
    categorySlug: 'team-sections',
    family: 'prose',
    intent: ['establish-credibility', 'tell-story'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['image', 'avatar'],
    layoutFacets: ['1-col'],
    tags: ['eeat', 'author', 'byline', 'article', 'team'],
    status: 'stable',
    description_fr: 'Ligne auteur compacte E-E-A-T sous un h1 d\'article : avatar optionnel, nom, rôle, dates de publication et mise à jour, lien vers la page profil. Beaucoup plus léger qu\'un hero auteur.',
    description_en: 'Compact E-E-A-T author byline under an article h1: optional avatar, name, role, published and updated dates, link to the profile page. Far lighter than an author hero.',
  
};
