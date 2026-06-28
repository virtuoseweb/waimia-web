// Waimia · Co-location DS (Wave #38, T5) · module `hero-home` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hero-home'),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  minimap: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        items_fr: z.string(),
        items_en: z.string(),
      }),
    )
    .length(6),
  proofs: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .length(3),
  cta_primary_fr: z.string(),
  cta_primary_en: z.string(),
  cta_secondary_fr: z.string(),
  cta_secondary_en: z.string(),
  cta_sub_fr: z.string(),
  cta_sub_en: z.string(),
  cta_href: z.string().optional(),
  offer_href: z.string().optional(),
});
