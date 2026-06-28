// Waimia · Co-location DS (Wave #38, T5) · module `diagnostic-stages` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { placementSchema } from '../_shared/base';
import { diagnosticStageSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('diagnostic-stages'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  stages: z.array(diagnosticStageSchema).min(4).max(6),
  // Vague C · Batch 5 (process/stages). Recettes layout : grid-steps (défaut = piste de stades
  //  en grille count-adaptive actuelle), vertical-stack (stades empilés pleine largeur),
  //  numbered-rows (lignes hairline numérotées). La séquence 1..N et le relevé « current » sont
  //  préservés dans toutes les recettes.
  layout: z.enum(['grid-steps', 'vertical-stack', 'numbered-rows']).optional(),
  // grid-steps : nombre de colonnes imposé (auto = nb de stades, rendu actuel). Ignoré ailleurs.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  // density (data-density) : padding-block section + padding des cards via --space-*.
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // contentAlign (data-content-align) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
});
