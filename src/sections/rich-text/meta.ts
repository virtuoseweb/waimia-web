// Waimia · Co-location DS (#39) · module `rich-text` · métadonnées descriptives.
// Section editoriale de corps riche (Markdown -> prose HTML au build). Famille `prose`
// (cf editorial-prose), catégorie marketing / Content Sections.
// `SectionMeta` = `SectionDescriptor` SANS `component` (porté par Component.astro) ni `usage`.
// 0 U+2014 (rule 58).

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Content Sections',
  categorySlug: 'content-sections',
  family: 'prose',
  intent: ['explain-concept'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['list'],
  layoutFacets: ['1-col'],
  tags: ['richtext', 'markdown', 'prose', 'editorial', 'body', 'content'],
  status: 'stable',
  description_fr: 'Section de corps riche : un corps Markdown bilingue rendu en HTML au build avec les styles prose du design system. Edition de corps editorial in-context sans backend (le Markdown vit dans le document de page, versionne avec le code). Titres, listes, liens, gras/italique ; mesure de ligne bornee ; variante ink lisible.',
  description_en: 'Rich text body section: a bilingual Markdown body rendered to HTML at build time with the design system prose styles. In-context editorial body editing without a backend (the Markdown lives in the page document, versioned with the code). Headings, lists, links, bold/italic; bounded line measure; readable ink variant.',
};
