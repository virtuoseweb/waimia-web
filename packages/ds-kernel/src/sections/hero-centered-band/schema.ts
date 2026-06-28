// Waimia · Co-location DS (Wave #38, T5) · module `hero-centered-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-centered-band'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  caps: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), desc_fr: z.string(), desc_en: z.string() }))
    .max(4),
});
