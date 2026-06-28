// Waimia · Co-location DS (Wave #38, T5) · module `learning-path-list` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('learning-path-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  title_fr: z.string(),
  title_en: z.string(),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});
