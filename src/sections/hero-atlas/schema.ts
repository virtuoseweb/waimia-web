// Waimia · Co-location DS (Wave #38, T5) · module `hero-atlas` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-atlas'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  subhead_fr: z.string(),
  subhead_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  map_aria_label_fr: z.string(),
  map_aria_label_en: z.string(),
  map_kicker_fr: z.string(),
  map_kicker_en: z.string(),
  pillars: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
        deliverable_fr: z.string(),
        deliverable_en: z.string(),
      }),
    )
    .length(4),
});
