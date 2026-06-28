// Waimia · Co-location DS (Wave #38, T5) · module `hero-stack-rhythm` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-stack-rhythm'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  breadcrumb: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), href: z.string().optional() }))
    .max(4)
    .optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(5)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(4)
    .optional(),
});
