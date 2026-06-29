// Waimia · Co-location DS (Wave #38, T5) · module `hero-masthead-card` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-masthead-card'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .max(2)
    .optional(),
});
