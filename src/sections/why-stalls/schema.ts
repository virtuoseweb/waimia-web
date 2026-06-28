// Waimia · Co-location DS (Wave #38, T5) · module `why-stalls` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('why-stalls'),
  chapter_num: z.string(),
  chapter_title_fr: z.string(),
  chapter_title_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_lead_fr: z.string(),
  aside_lead_en: z.string(),
  rows: z
    .array(
      z.object({
        fig: z.string(),
        text_fr: z.string(),
        text_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});
