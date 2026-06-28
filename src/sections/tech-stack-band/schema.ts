// Waimia · Co-location DS (Wave #38, T5) · module `tech-stack-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('tech-stack-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        kind: z.enum(['primary', 'open', 'neutral']).optional(),
      }),
    )
    .min(2)
    .max(16),
});
