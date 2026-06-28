// Waimia · Co-location DS (Wave #38, T3) · module `eeat-panel` · métadonnées descriptives.
// DÉPLACÉES depuis src/lib/section-registry.ts (rule 60 : déplacer, pas dupliquer).
// Cas dur : contentMode 'global-ref' + contentSource 'EEAT_PACK' (état ACTUEL post-#34 :
// family 'prose', categorySlug 'trust-sections').
// `SectionMeta` = `SectionDescriptor` SANS `component` (porté par Component.astro) ni `usage`.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Trust Sections',
  categorySlug: 'trust-sections',
  family: 'prose',
  intent: ['establish-credibility'],
  pageRole: ['proof'],
  contentMode: 'global-ref',
  contentSource: 'EEAT_PACK',
  effects: ['scroll-reveal'],
  interactions: ['hover', 'scroll'],
  elements: ['multiple-images', 'kpi-numbers', 'badge', 'avatar', 'buttons', 'list'],
  layoutFacets: ['multi-col', 'bento'],
  tags: ['eeat', 'author', 'authority', 'trust', 'bento', 'dashboard'],
  status: 'stable',
  description_fr: 'Panneau E-E-A-T auteur/autorité à 4 variantes (media, columns, light, hero) : dashboard bento ou colonnes accent qui rassemblent auteur, repères, secteurs, articles, services, outil et engagements. Contenu single-source (EEAT_PACK), avis honnête (engagements + note studio solo, 0 témoignage). Variantes ink/paper, reveal-stagger, responsive.',
  description_en: 'E-E-A-T author/authority panel with 4 variants (media, columns, light, hero): a bento dashboard or accent columns gathering author, milestones, sectors, articles, services, tool and commitments. Single-source content (EEAT_PACK), honest proof (commitments + solo-studio note, no testimonial). Ink/paper variants, reveal-stagger, responsive.',
};
