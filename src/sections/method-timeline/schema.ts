// Waimia · Co-location DS (Wave #38, T5) · module `method-timeline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { placementSchema } from '../_shared/base';
import { stepSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('method-timeline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(stepSchema).min(2).max(6),
  // Vague C · Batch 5 (process/timeline). Recettes layout curées de la famille « process » :
  //  vertical-stack (défaut = grille éditoriale 3-col actuelle), numbered-rows (lignes hairline
  //  à gros numéro), horizontal (rail scroll tactile), grid-steps (étapes en cartes en grille).
  layout: z.enum(['vertical-stack', 'numbered-rows', 'horizontal', 'grid-steps']).optional(),
  // grid-steps : nombre de colonnes (auto = count-adaptive auto-fit). Ignoré par les autres recettes.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  // density (data-density) : rythme padding-block section + gap des étapes via --space-*.
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // contentAlign (data-content-align) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
});
