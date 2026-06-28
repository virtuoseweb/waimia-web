// Waimia · Co-location DS (Wave #38, T5) · module `hero-asymmetric-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-asymmetric-grid'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  h1_fr: z.string(),
  h1_en: z.string(),
  label_left_fr: z.string().optional(),
  label_left_en: z.string().optional(),
  label_right_fr: z.string().optional(),
  label_right_en: z.string().optional(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  bullets: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(6),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(4),
});
