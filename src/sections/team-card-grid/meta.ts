// Waimia · Co-location DS (Wave #38, T5) · module `team-card-grid` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    family: 'card-grid',
    intent: ['social-proof', 'showcase-work'],
    pageRole: ['proof'],
    contentMode: 'instance',
    effects: ['hover-zoom'],
    interactions: ['hover'],
    elements: ['image', 'buttons', 'avatar', 'cards'],
    layoutFacets: ['3-col'],
    tags: ['team', 'authors', 'cards', 'profiles'],
    status: 'stable',
    description_fr: 'Grille auto-fill de cartes auteurs avec photo, rôle, description, compteur de publications et CTA profil.',
    description_en: 'Auto-fill author card grid with photo, role, description, publication count, and profile CTA.',
  
};
