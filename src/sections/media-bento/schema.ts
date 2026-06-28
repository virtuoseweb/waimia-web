// Waimia · Co-location DS (Wave #38, T3) · module `media-bento` (cas collection)
//
// Schéma DÉPLACÉ depuis src/schemas/sections.ts (rule 60 : déplacer, pas dupliquer).
// `z.object` SANS le wrapper discriminatedUnion. `z` vient de `astro:content` (cohérence
// build Astro + pattern codegen). `placementSchema` réimporté depuis la feuille pure `_shared`.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('media-bento'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Batch 3) : bento média. Tous optionnels, défauts = rendu actuel.
  //  - density : gap de la grille (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - contentAlign : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 3) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  //  - layout (Batch 3) : VOCABULAIRE DE LAYOUT curé pour le bento média.
  //      feature-2      : 1 grande tuile (2 col / 2 rangs) + tuiles à droite (DÉFAUT, rendu actuel).
  //      quad           : grille 2×2 régulière (legacy, conservé).
  //      mosaic         : flux dense, tile span='2' occupe 2 colonnes (legacy, conservé).
  //      bento-feature  : 1ʳᵉ tuile vedette span 2×2 imposé, le reste en unités.
  //      matrix-2x2     : matrice 2 colonnes, tuiles carrées (aspect-ratio:1).
  //      matrix-3x3     : matrice 3 colonnes, tuiles carrées (aspect-ratio:1).
  //      grid-uniform   : N colonnes ÉGALES, tuiles 4/3 régulières.
  //    Spans clampés au nb de colonnes ; matrix réduit proprement la dernière ligne.
  layout: z
    .enum(['feature-2', 'quad', 'mosaic', 'bento-feature', 'matrix-2x2', 'matrix-3x3', 'grid-uniform'])
    .optional(),
  //  - columns : nb de colonnes pour grid-uniform (auto|2|3|4). Ignoré par les recettes
  //    qui imposent leur grille (feature-2/matrix/bento-feature).
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - itemHeight : hauteur des tuiles. auto | even | square (1:1) | video (16/9).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  tiles: z.array(
    z.object({
      title_fr: z.string(),
      title_en: z.string(),
      tag_fr: z.string().optional(),
      tag_en: z.string().optional(),
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      span: z.enum(['1', '2']).optional(),
      link_href: z.string().optional(),
    }),
  ).min(2).max(6),
});
