// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-stats` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('hero-hub-stats'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  meta_kicker_fr: z.string(),
  meta_kicker_en: z.string(),
  hub_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        emphasis: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(4)
    .optional(),
});
