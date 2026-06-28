// Waimia · Co-location DS (#39) · module `rich-text` · schema.
// Section de corps riche : un CORPS MARKDOWN bilingue (body_md_fr / body_md_en) rendu en
// HTML au build avec les styles prose du DS. Equivalent fonctionnel de l'edition de corps
// Tina, mais sans backend : le Markdown vit dans le PageDocument JSON (git-based, AI-clean).
// `z.object` SANS le wrapper discriminatedUnion. `z` vient de `astro:content` (cohérence
// build Astro + pattern codegen). Herite du mixin de variation unique (sectionBaseSchema).
//
// body_md_fr / body_md_en : la paire `_fr`/`_en` est regroupee par le derive en UN slot
// logique `body_md` de type richtext (scalarType etendu aux motifs `*_md` / `body`).

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('rich-text'),
  // Mixin de variation unique (les couches NOW/COMPOSITION, toutes optionnelles → 0 régression).
  ...sectionBaseSchema.shape,
  // En-tete editorial optionnel (au-dessus du corps de prose).
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  // Corps de prose : Markdown source bilingue, rendu en HTML au build (1 slot logique body_md).
  body_md_fr: z.string(),
  body_md_en: z.string(),
});
