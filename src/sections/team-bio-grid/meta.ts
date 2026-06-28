// Waimia · Co-location DS (Wave #38, T5) · module `team-bio-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Team Sections',
    categorySlug: 'team-sections',
    family: 'card-grid',
    intent: ['establish-credibility', 'tell-story'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['image', 'line-art', 'list', 'avatar'],
    layoutFacets: ['4-col', 'split'],
    tags: ['team', 'people', 'bio', 'grid', 'about'],
    status: 'stable',
    description_fr: 'Grille d’équipe : photo, nom, rôle et bio courte par membre, en 2 à 4 colonnes alignées. Idéale pour une page À propos ou Équipe qui humanise la marque.',
    description_en: 'Team grid: photo, name, role and a short bio per member, in 2 to 4 aligned columns. Ideal for an About or Team page that humanises the brand.',
  
};
