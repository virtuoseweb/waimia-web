// Waimia · Co-location DS (Wave #38, T5) · module `logo-marquee` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    family: 'marquee',
    intent: ['social-proof'],
    pageRole: ['proof'],
    contentMode: 'hybrid',
    contentSource: 'logoIds → src/data/logos.ts',
    effects: ['marquee'],
    interactions: ['hover', 'autoplay'],
    elements: ['logos'],
    layoutFacets: ['1-col', 'full-bleed'],
    tags: ['logos', 'marquee', 'scroll', 'trusted-by', 'image'],
    status: 'stable',
    description_fr: 'Bandeau de logos image à défilement infini (« ils nous font confiance »), marquee CSS, grayscale optionnel. Respecte prefers-reduced-motion. Distinct du marquee-band texte mono.',
    description_en: 'Infinite-scroll image logo band (“trusted by”), CSS marquee, optional grayscale. Respects prefers-reduced-motion. Distinct from the mono-text marquee-band.',
  
};
