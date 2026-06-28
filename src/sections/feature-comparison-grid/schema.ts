// Waimia · Co-location DS (Wave #38, T5) · module `feature-comparison-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('feature-comparison-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  columns: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        highlighted: z.boolean().default(false),
        rows: z
          .array(z.object({ text_fr: z.string(), text_en: z.string(), included: z.boolean() }))
          .min(1)
          .max(10),
      }),
    )
    .min(2)
    .max(3),
});
