// Waimia · Co-location DS (#80, GAP narratif) · module `hover-reveal-words`
//
// Schéma DS-driven. Paragraphe éditorial où des MOTS déclencheurs révèlent une vignette
// image au survol (desktop, suit le curseur) ou au tap (mobile, vignette inline sous la
// prose). Le texte est segmenté côté composant : la prose est rendue, et chaque mot
// déclencheur est repéré par sa chaîne exacte (`word`) puis enveloppé d'un <button>.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const hoverRevealWordsSchema = z.object({
  type: z.literal('hover-reveal-words'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  placement: placementSchema,

  // ── Axes de composition (DS-driven) ──
  //  - align : alignement du bloc prose (start défaut | center).
  contentAlign: z.enum(['start', 'center']).optional(),
  //  - measure : largeur de la colonne de lecture (read défaut | prose | wide).
  measure: z.enum(['prose', 'read', 'wide']).optional(),
  //  - thumbRatio : ratio des vignettes révélées (§H.5). 4:3 défaut.
  thumbRatio: z.enum(['4-3', '1-1', '3-2', '4-5']).optional(),
  //  - proseScale : taille du paragraphe (lede d'emphase | body standard).
  proseScale: z.enum(['lede', 'body']).optional(),

  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),

  // Le paragraphe éditorial. Les mots déclencheurs apparaissent tels quels dans ce texte ;
  // le composant les enveloppe automatiquement (match exact, première occurrence).
  prose_fr: z.string(),
  prose_en: z.string(),

  triggers: z
    .array(
      z.object({
        // mot/locution EXACTE telle qu'elle apparaît dans `prose_*` (la casse compte).
        word_fr: z.string(),
        word_en: z.string(),
        media_src: z.string(),
        media_alt_fr: z.string().optional(),
        media_alt_en: z.string().optional(),
      }),
    )
    .min(1)
    .max(8),
});

export const schema = hoverRevealWordsSchema;
