// Waimia · Co-location DS · module `signed-writing-list` · schema (local, co-localise).
// Index chronologique d'ecrits long-form signes : date + titre (lien) + extrait. Extrait FIDELE
// du bloc inline `author-essays` (.essays-list / .essay-item) de AuthorPageTemplate (rule 60).
// Le composant formate la date par langue (locale) : la donnee ne porte qu'un ISO. Generique :
// tout index d'articles date/titre/extrait d'un auteur ou d'une rubrique. z.object SANS
// discriminatedUnion. 0 token DS cree, 0 hardcode dans le rendu.
//
// NB : distinct de `editorial-write-feed` (feed tag+texte, sans titre/extrait) et `article-grid`
// (cartes) : ni l'un ni l'autre ne couvre le rendu date|titre|extrait long-form a la parite.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('signed-writing-list'),
  // Axe de déclinaison (#118) : fond. DÉFAUT ABSENT = paper (rendu inchangé) ;
  // paper-2/paper-3/ink déclinent l'index d'écrits (modèle BentoGrid data-bg).
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  items: z
    .array(
      z.object({
        /** ISO complet (Date.toISOString) : le composant formate par locale (annee + mois court). */
        date_iso: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        href: z.string(),
        excerpt_fr: z.string().optional(),
        excerpt_en: z.string().optional(),
      }),
    )
    .min(1),
});

export type SignedWritingListData = z.infer<typeof schema>;
