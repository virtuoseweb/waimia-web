// Waimia · Co-location DS (Wave #38, T5) · module `how-we-ship` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('how-we-ship'),
  roman: z.string(),
  section_label_fr: z.string(),
  section_label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string(),
  aside_en: z.string(),
  steps: z
    .array(
      z.object({
        n: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(3)
    .max(6),
});
