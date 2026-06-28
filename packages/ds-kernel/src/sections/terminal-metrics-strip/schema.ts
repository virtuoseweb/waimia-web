// Waimia · Co-location DS (Wave #38, T5) · module `terminal-metrics-strip` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('terminal-metrics-strip'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});
