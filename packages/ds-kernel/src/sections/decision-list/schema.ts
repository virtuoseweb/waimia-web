// Waimia · Co-location DS (Wave #38, T5) · module `decision-list` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('decision-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  items: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});
