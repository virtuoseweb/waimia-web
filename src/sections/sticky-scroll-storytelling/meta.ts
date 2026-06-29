// Waimia · Co-location DS (#80) · module `sticky-scroll-storytelling` · métadonnées.
// Famille narrative scroll : rail texte sticky + média sticky qui change au scroll.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Narrative Sections',
  categorySlug: 'feature-sections',
  family: 'scroll-interactive',
  intent: ['explain-process'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['sticky-media', 'scroll-reveal', 'crossfade'],
  interactions: ['scroll'],
  elements: ['multiple-images', 'list'],
  layoutFacets: ['split', 'media-right'],
  tags: ['sticky', 'scroll', 'storytelling', 'narrative', 'method', 'steps', 'media'],
  status: 'stable',
  description_fr:
    'Storytelling au scroll : rail de texte sticky dont l\'etape active passe en accent, colonne media sticky dont l\'image change en fondu. Mobile = stepper empile.',
  description_en:
    'Scroll storytelling: a sticky text rail whose active step turns accent, with a sticky media column that crossfades its image. Mobile becomes a stacked stepper.',
};
