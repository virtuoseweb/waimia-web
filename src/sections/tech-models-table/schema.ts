// Waimia · Co-location DS (Wave #38, T5) · module `tech-models-table` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('tech-models-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  models: z
    .array(
      z.object({
        name: z.string(),
        version: z.string(),
        cost: z.string().optional(),
        context: z.string().optional(),
        use_case_fr: z.string(),
        use_case_en: z.string(),
      }),
    )
    .min(1),
});
