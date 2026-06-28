// Waimia · Co-location DS (Wave #38, T5) · module `welcome-section` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Utility Sections',
    categorySlug: 'utility-sections',
    family: 'prose',
    intent: ['orient-navigate'],
    pageRole: ['utility'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['hover'],
    elements: ['line-art', 'buttons', 'list'],
    layoutFacets: ['2-col', 'media-right', 'centered', 'split'],
    tags: ['welcome', 'confirmation', 'post-conversion', 'steps'],
    status: 'stable',
    description_fr: 'Écran de confirmation post-conversion avec checkmark, message central, trois prochaines étapes et lien retour.',
    description_en: 'Post-conversion confirmation screen with checkmark, centered message, three next steps, and back link.',
  
};
