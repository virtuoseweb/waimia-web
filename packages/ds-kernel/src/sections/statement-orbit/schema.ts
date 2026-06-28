// Waimia · Co-location DS (Wave #38, T5) · module `statement-orbit` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('statement-orbit'),
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta: ctaSchema.optional(),
  media_src: z.string(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
});
