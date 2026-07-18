// Waimia · Co-location DS · module `prose-aside` · schema (local, co-localise).
// Colonne de prose editoriale (corps MDX via <slot/>) precedee d'un kicker en aside (col-3).
// Extrait FIDELE du bloc inline `author-why` de AuthorPageTemplate (rule 60). Le corps vit dans
// le MDX (`<Content/>`), pas dans le frontmatter : 0 champ texte (preserve la parite GEO/AIO,
// modele `editorial-prose`). Generique : tout bloc « prose + eyebrow lateral ». z.object SANS
// discriminatedUnion. 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('prose-aside'),
  /** Kicker de la colonne aside (ex. « § Pourquoi Waimia »). */
  kicker_fr: z.string(),
  kicker_en: z.string(),
});

export type ProseAsideData = z.infer<typeof schema>;
