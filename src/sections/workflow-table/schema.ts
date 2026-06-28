// Waimia · Co-location DS (Wave #38, T5) · module `workflow-table` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('workflow-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Workflows'),
  eyebrow_en: z.string().default('§ Workflows'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  workflows: z
    .array(
      z.object({
        num: z.string(),
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        model_fr: z.string(),
        model_en: z.string(),
        gain: z.string(),
        how_fr: z.string(),
        how_en: z.string(),
      }),
    )
    .min(1)
    .max(8),
});
