// Waimia · Co-location DS (Wave #38, T5) · module `tech-capabilities-specs` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('tech-capabilities-specs'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  capabilities: z
    .array(
      z.object({
        name_fr: z.string(),
        name_en: z.string(),
        description_fr: z.string(),
        description_en: z.string(),
        status: z.enum(['active', 'beta', 'planned']).default('active'),
      }),
    )
    .min(1),
});
