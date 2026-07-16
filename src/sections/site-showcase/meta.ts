// Waimia · Co-location DS (Wave #38) · module `site-showcase` · metadonnees descriptives.
// `SectionMeta` = `SectionDescriptor` SANS `component` (porte par Component.astro) ni `usage`.
// Le god-file genere reattache `component` pour reconstituer le `SectionDescriptor`.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Gallery Sections',
  categorySlug: 'gallery-sections',
  family: 'gallery',
  intent: ['showcase-work'],
  pageRole: ['proof', 'body'],
  contentMode: 'instance',
  effects: ['scroll-reveal', 'hover-zoom'],
  interactions: ['hover'],
  elements: ['multiple-images', 'buttons'],
  layoutFacets: ['bento', 'off-grid'],
  tags: ['showcase', 'screenshots', 'browser-frame', 'case-study', 'result', 'nofollow'],
  status: 'stable',
  description_fr: 'Vitrine du site livre : captures reelles dans des cadres navigateur, capture pleine page qui defile au survol, lien nofollow vers le site en production.',
  description_en: 'Delivered-site showcase: real screenshots in browser frames, a full-page capture that scrolls on hover, and a nofollow link to the live site.',
};
