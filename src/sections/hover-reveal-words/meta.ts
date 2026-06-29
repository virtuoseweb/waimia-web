// Waimia · Co-location DS (#80) · module `hover-reveal-words` · métadonnées.
// Prose éditoriale dont des mots déclencheurs révèlent une vignette au survol/au tap.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Narrative Sections',
  categorySlug: 'content-sections',
  family: 'prose',
  intent: ['tell-story'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['hover-reveal'],
  interactions: ['hover', 'click-toggle'],
  elements: ['multiple-images', 'quote'],
  layoutFacets: ['centered'],
  tags: ['prose', 'editorial', 'hover', 'reveal', 'words', 'interactive', 'narrative'],
  status: 'stable',
  description_fr:
    'Prose editoriale dont certains mots declencheurs revelent une vignette image au survol (desktop, suit le curseur) ou au tap (mobile, vignette inline). Accessible au clavier.',
  description_en:
    'Editorial prose where certain trigger words reveal an image thumbnail on hover (desktop, follows the cursor) or on tap (mobile, inline thumbnail). Keyboard accessible.',
};
