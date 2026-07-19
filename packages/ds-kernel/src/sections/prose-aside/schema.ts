// Waimia · Co-location DS · module `prose-aside` · schema (local, co-localise).
// Colonne de prose editoriale (corps MDX via <slot/>) precedee d'un kicker en aside (col-3).
// Extrait FIDELE du bloc inline `author-why` de AuthorPageTemplate (rule 60). Le corps vit dans
// le MDX (`<Content/>`), pas dans le frontmatter : 0 champ texte (preserve la parite GEO/AIO,
// modele `editorial-prose`). Generique : tout bloc « prose + eyebrow lateral ». z.object SANS
// discriminatedUnion. 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('prose-aside'),
  // Axe de déclinaison (#118) : fond. DÉFAUT ABSENT = paper (rendu inchangé) ;
  // paper-2/paper-3/ink déclinent la colonne de prose (modèle BentoGrid data-bg).
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  /** Kicker de la colonne aside (ex. « § Pourquoi Waimia »). */
  kicker_fr: z.string(),
  kicker_en: z.string(),
});

export type ProseAsideData = z.infer<typeof schema>;
