// Waimia · Co-location DS (Wave #38, T5) · module `method-stepline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('method-stepline'),
  ...sectionBaseSchema.shape,
  // Vague C · Batch 5 : layout (string mixin) lit horizontal (défaut, rail actuel),
  // vertical-stack (colonne), numbered-rows (lignes hairline), grid-steps (cartes en grille).
  // columns : nb de colonnes du mode grid-steps (auto = count-adaptive). Ignoré ailleurs.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  duration_fr: z.string().optional(),
  duration_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(z.object({
    title_fr: z.string(), title_en: z.string(),
    sub_fr: z.string(), sub_en: z.string(),
  })).min(2).max(6),
});
