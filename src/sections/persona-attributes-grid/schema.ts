// Waimia · Co-location DS (Wave #38, T5) · module `persona-attributes-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('persona-attributes-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  blocks: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        items_fr: z.array(z.string()).min(1),
        items_en: z.array(z.string()).min(1),
      }),
    )
    .length(4),
  meta: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        value_fr: z.string(),
        value_en: z.string(),
      }),
    )
    .length(3),
});
