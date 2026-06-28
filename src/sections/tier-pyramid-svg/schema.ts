// Waimia · Co-location DS (Wave #38, T5) · module `tier-pyramid-svg` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('tier-pyramid-svg'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  aria_label_fr: z.string(),
  aria_label_en: z.string(),
  tiers: z
    .array(
      z.object({
        roman: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .length(3),
});
