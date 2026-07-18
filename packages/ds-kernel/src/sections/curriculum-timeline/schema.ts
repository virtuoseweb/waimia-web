// Waimia · Co-location DS · module `curriculum-timeline` · schema (local, co-localise).
// Bloc curriculum : entete (kicker + titre) + frise verticale (experience / formation /
// distinctions) sur fond paper-2. Extrait FIDELE du bloc inline `author-curriculum` de
// AuthorPageTemplate (rule 60). Compose l'atome partage editorial/Timeline (numbered=false).
// Generique : tout curriculum ou parcours chronologique d'un profil. z.object SANS
// discriminatedUnion. 0 token DS cree, 0 hardcode dans le rendu.
//
// NB : le catalogue a `editorial-timeline` (meme atome Timeline) mais son entete/chrome propre
// (colonne prose centree, typo eyebrow/titre distincte) diverge du chrome auteur (g12 + display-md
// + fond paper-2) : extraction dediee pour la PARITE PIXEL sans editer un composant partage.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('curriculum-timeline'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  /** Titre en italique accent (parite `<em>Curriculum</em>`). */
  emphasis: z.boolean().optional(),
  events: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(1),
});

export type CurriculumTimelineData = z.infer<typeof schema>;
