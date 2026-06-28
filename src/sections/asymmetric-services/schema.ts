// Waimia · Co-location DS (Wave #38, T5) · module `asymmetric-services` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('asymmetric-services'),
  num_fr: z.string(),
  num_en: z.string(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  items: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});
