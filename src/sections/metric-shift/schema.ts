// Waimia · Co-location DS (Wave #38, T5) · module `metric-shift` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('metric-shift'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  shifts: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        before: z.string(),
        after: z.string(),
        delta_fr: z.string().optional(),
        delta_en: z.string().optional(),
        trend: z.enum(['up', 'down', 'flat']).optional(),
      }),
    )
    .min(2)
    .max(6),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
});
