// Waimia · Co-location DS (Wave #38, T5) · module `case-split` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('case-split'),
  kicker_fr: z.string().default('Cas client'),
  kicker_en: z.string().default('Client case'),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  cta_label_fr: z.string().default('Voir le cas complet →'),
  cta_label_en: z.string().default('See full case →'),
  cta_href: z.string().default('/cas-clients'),
  results: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(6),
});
