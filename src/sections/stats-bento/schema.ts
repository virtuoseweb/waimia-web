// Waimia · Co-location DS (Wave #38, T5) · module `stats-bento` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { placementSchema } from '../_shared/base';
import { statsBentoItemSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('stats-bento'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C) — bento adaptatif de KPI. Tous optionnels, défauts = rendu actuel.
  //  - density : padding section + gap de la grille + padding des cellules (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - columns : 'auto' (défaut) = auto-fill content-driven (--tile-min) ; '2'|'3'|'4' = nombre
  //    fixe (--bento-cols), spans bornés à la largeur de grille par CSS.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - layout (Batch 3) : VOCABULAIRE DE LAYOUT curé pour l'archétype stats/bento.
  //      bento          : 1ʳᵉ stat vedette span-lg + dense (DÉFAUT, rendu actuel).
  //      grid-uniform   : N colonnes ÉGALES, hauteurs égalisées (stretch), 0 vedette.
  //      matrix-2x2     : matrice 2 colonnes, cellules carrées (aspect-ratio:1).
  //      list           : 1 KPI par ligne, chiffre + label en cluster (table éditoriale).
  layout: z.enum(['bento', 'grid-uniform', 'matrix-2x2', 'list']).optional(),
  //  - itemHeight (Batch 3) : hauteur des cellules. auto | even | square (1:1) | video (16/9).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  //  - contentAlign (Batch 3) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 3) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  // Nombre de stats variable (2..6) : la grille bento est désormais content-driven
  // (1ʳᵉ stat = tuile vedette span-lg, les autres span-sm) → 0 trou à tout compte.
  stats: z.array(statsBentoItemSchema).min(2).max(6),
});
