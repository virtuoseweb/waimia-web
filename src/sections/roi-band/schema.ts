// Waimia · Co-location DS (Wave #38, T5) · module `roi-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('roi-band'),
  eyebrow_fr: z.string().default('§ Preuve macro'),
  eyebrow_en: z.string().default('§ Macro proof'),
  h2_fr: z.string(),
  h2_en: z.string(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});
