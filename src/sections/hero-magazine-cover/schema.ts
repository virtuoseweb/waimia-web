// Waimia · Co-location DS (Wave #38, T5) · module `hero-magazine-cover` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-magazine-cover'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  masthead: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  tagline_fr: z.string(),
  tagline_en: z.string(),
  cta_primary: ctaSchema,
});
