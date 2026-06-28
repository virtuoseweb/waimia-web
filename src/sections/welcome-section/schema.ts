// Waimia · Co-location DS (Wave #38, T5) · module `welcome-section` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('welcome-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  next_steps: z
    .array(
      z.object({
        num: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      }),
    )
    .min(1)
    .max(3),
  back_label_fr: z.string().optional(),
  back_label_en: z.string().optional(),
  back_href: z.string().optional(),
});
