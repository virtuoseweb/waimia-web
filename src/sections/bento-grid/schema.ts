// Waimia · Co-location DS (Wave #38, T5) · module `bento-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('bento-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C) — bento adaptatif (grid auto-flow dense, spans clampés
  // au nb de colonnes → jamais de structure cassée). Tous optionnels, défauts = rendu actuel.
  //  - density : padding section + gap de la mosaïque + padding des tuiles (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - columns : nombre de colonnes de la mosaïque. 'auto' (défaut) = auto-fill content-driven
  //    (--tile-min) ; '2'|'3'|'4' = nombre fixe (--bento-cols) ; les spans lg/wide restent
  //    bornés à la largeur de la grille par CSS (pas de débordement).
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - layout (Batch 3) : VOCABULAIRE DE LAYOUT curé pour l'archétype bento/média.
  //      bento          : spans content-driven + auto-flow dense (DÉFAUT, rendu actuel).
  //      bento-feature  : 1ʳᵉ tuile vedette span 2×2 imposé, le reste en unités.
  //      mosaic         : spans ET hauteurs variés, dense obligatoire (éditorial).
  //      matrix-2x2     : matrice 2 colonnes, cellules carrées (aspect-ratio:1).
  //      matrix-3x3     : matrice 3 colonnes, cellules carrées (aspect-ratio:1).
  //      grid-uniform   : N colonnes ÉGALES, hauteurs égalisées (stretch), 0 span.
  //    Spans toujours clampés au nb de colonnes ; matrix réduit proprement la dernière ligne.
  layout: z
    .enum(['bento', 'bento-feature', 'mosaic', 'matrix-2x2', 'matrix-3x3', 'grid-uniform'])
    .optional(),
  //  - itemHeight (Batch 3) : hauteur des cellules. auto (contenu) | even (égalisées) |
  //    square (aspect-ratio:1) | video (16/9). Relâché en mobile (contenu prime).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  //  - contentAlign (Batch 3) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 3) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  cells: z.array(z.object({
    glyph: z.string().optional(),
    title_fr: z.string(),
    title_en: z.string(),
    body_fr: z.string(),
    body_en: z.string(),
    span: z.enum(['lg', 'wide', 'sm']).optional(),
  })).min(3).max(8),
});
