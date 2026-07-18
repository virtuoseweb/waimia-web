// Waimia · Co-location DS · module `method-diagram-list` · schema (local, co-localise).
// Bloc methode : entete (kicker + titre) + diagramme de process (SVG geometrique de marque) +
// liste numerotee de phases (numero mono + titre + corps). Extrait FIDELE du bloc inline
// `author-method` (.author-method-list / .method-item) de AuthorPageTemplate (rule 60). La
// numerotation est derivee (index + 1, zero-pad). Generique : toute methode N phases illustree.
// z.object SANS discriminatedUnion. 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('method-diagram-list'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  steps: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(1),
});

export type MethodDiagramListData = z.infer<typeof schema>;
