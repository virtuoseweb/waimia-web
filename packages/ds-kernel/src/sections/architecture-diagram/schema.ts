// Waimia · Co-location DS (Wave #38, T5) · module `architecture-diagram` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('architecture-diagram'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // ── Vague C · Scale (Batch 4 « splits/duo ») ──
  // Disposition header ↔ diagramme. Absent → 'stacked' (header au-dessus, schéma centré
  // pleine largeur : rendu actuel). 'split' = header (titre + spec + caption) en colonne
  // gauche, diagramme en colonne droite (lecture éditoriale, schéma plus compact).
  layout: z.enum(['stacked', 'split']).optional(),
  // Ratio des colonnes header|diagramme quand layout='split'. Absent → 2fr 3fr (diagramme
  // dominant). Ignoré par 'stacked'.
  proportion: z.enum(['1-1', '1-2', '2-1', '2-3', '3-2']).optional(),
  // Densité (gap header↔diagramme + marge sous le titre). Absent → base (rendu actuel).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // Alignement du bloc header (titre + spec). Absent → start (rendu actuel).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header/media). Forme identique partout.
  placement: placementSchema,
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  inputs_fr: z.array(z.string()).min(2).max(8),
  inputs_en: z.array(z.string()).min(2).max(8),
  /** Exemples concrets par canal d'entrée (tooltip <title> sur le nœud, même index que inputs). */
  input_examples_fr: z.array(z.string()).optional(),
  input_examples_en: z.array(z.string()).optional(),
  outputs_fr: z.array(z.string()).min(2).max(6),
  outputs_en: z.array(z.string()).min(2).max(6),
  system_label: z.string(),
  system_kicker: z.string(),
  system_subtitle: z.string(),
  show_loop: z.boolean().default(true),
  loop_label_fr: z.string(),
  loop_label_en: z.string(),
  caption_fr: z.string(),
  caption_en: z.string(),
});
