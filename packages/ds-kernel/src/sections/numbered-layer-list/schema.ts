// Waimia · Co-location DS · module `numbered-layer-list` · schema (kernel, co-localise).
// Couches numerotees avec sous-listes : rang serif accent + titre + intro + puces « → ».
// Extrait FIDELE du bloc inline `.tech-layers` de src/pages/technologies.astro (idiome
// « livrables numerotes »), deplace vers un composant catalogue (rule 60 : bouger le markup,
// pas le dupliquer). Generique : toute liste de couches / rangs numerotes a sous-puces
// (stack, livrables, etapes rangees...). z.object SANS discriminatedUnion (pattern codegen).
// 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('numbered-layer-list'),
  /** Fond de section (variante dark `ink` systematique, directive 02-dark). Absent = clair. */
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  /** Titre de section masque (a11y) rendu en <h2 class="sr-only"> si present. */
  srHeading_fr: z.string().optional(),
  srHeading_en: z.string().optional(),
  layers: z
    .array(
      z.object({
        /** Rang affiche (ex. « 01 »), serif italique accent. */
        n: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        /** Chapo optionnel sous le titre. */
        intro_fr: z.string().optional(),
        intro_en: z.string().optional(),
        /** Sous-puces « → » (min 1). */
        items: z
          .array(
            z.object({
              text_fr: z.string(),
              text_en: z.string(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

export type NumberedLayerListData = z.infer<typeof schema>;
