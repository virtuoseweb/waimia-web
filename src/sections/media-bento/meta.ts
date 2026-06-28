// Waimia · Co-location DS (Wave #38, T3) · module `media-bento` · métadonnées descriptives.
// DÉPLACÉES depuis src/lib/section-registry.ts (rule 60 : déplacer, pas dupliquer).
// `SectionMeta` = `SectionDescriptor` SANS `component` (porté par Component.astro) ni `usage`.
// Le god-file réattache `component` pour reconstituer le `SectionDescriptor` (API préservée).

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Feature Sections',
  categorySlug: 'feature-sections',
  family: 'scroll-interactive',
  intent: ['showcase-work'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['hover-zoom', 'scroll-reveal'],
  interactions: ['hover', 'scroll'],
  elements: ['multiple-images', 'cards'],
  layoutFacets: ['bento'],
  tags: ['bento', 'media', 'gallery', 'projects', 'hover'],
  status: 'stable',
  description_fr: 'Bento media asymetrique : tuiles image avec grand titre superpose et zoom au survol (layouts feature-2, quad, mosaic).',
  description_en: 'Asymmetric media bento: image tiles with a large overlaid title and hover zoom (feature-2, quad, mosaic layouts).',
};
