// Waimia · Co-location DS (Wave #38, T5) · module `sector-card-grid` · schema (extrait).
// Cataloguage (LOT 1b) de la grille de hubs sectoriels inline de src/pages/secteurs/index.astro.
// z.object SANS discriminatedUnion. z vient de zod (pattern codegen, cf team-card-grid).

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('sector-card-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  cta_label_fr: z.string().default('Voir le secteur →'),
  cta_label_en: z.string().default('See the industry →'),
  sectors: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        pain_fr: z.string(),
        pain_en: z.string(),
        href: z.string(),
        transition_id: z.string().optional(),
      }),
    )
    .min(1),
});
