// Waimia · Co-location DS (Wave #38, T5) · module `manifesto-act` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('manifesto-act'),
  num_fr: z.string(),
  num_en: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  sub_fr: z.string().optional(),
  sub_en: z.string().optional(),
  text_fr: z.string(),
  text_en: z.string(),
  tone: z.enum(['ink', 'paper']).default('ink'),
  stats: z
    .array(
      z.object({
        k: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(4)
    .default([]),
});
