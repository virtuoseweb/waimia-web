// Waimia · Co-location DS (Wave #38, T5) · module `trust-legal-section` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('trust-legal-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  revised_at: z.string(),
  version: z.string().optional(),
  legal_footer_fr: z.string().optional(),
  legal_footer_en: z.string().optional(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});
