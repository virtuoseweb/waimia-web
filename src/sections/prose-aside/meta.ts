// Waimia · Co-location DS · module `prose-aside` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Editorial Sections',
  categorySlug: 'content-sections',
  family: 'prose',
  intent: ['tell-story'],
  pageRole: ['body'],
  contentMode: 'instance',
  contentSource: 'slot',
  effects: ['scroll-reveal'],
  interactions: [],
  elements: [],
  layoutFacets: ['2-col'],
  tags: ['prose', 'editorial', 'aside', 'kicker', 'mdx', 'author'],
  status: 'stable',
  description_fr:
    'Colonne de prose editoriale (corps MDX) precedee d’un kicker en aside. Le corps vit dans le MDX, pas le frontmatter. Generique pour tout bloc prose + eyebrow lateral.',
  description_en:
    'Editorial prose column (MDX body) with a kicker in an aside. Body lives in MDX, not frontmatter. Generic for any prose + side-eyebrow block.',
};
