// Waimia · Co-location DS (Wave #38, T5) · module `pricing-single-highlight` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('pricing-single-highlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  desc_fr: z.string().optional(),
  desc_en: z.string().optional(),
  anchor_price: z.string().optional(),
  anchor_label_fr: z.string().optional(),
  anchor_label_en: z.string().optional(),
  price: z.string(),
  period_fr: z.string().optional(),
  period_en: z.string().optional(),
  benefits_fr: z.array(z.string()).min(2),
  benefits_en: z.array(z.string()).min(2),
  cta: ctaSchema,
  guarantee_fr: z.string().optional(),
  guarantee_en: z.string().optional(),
  secondary_note_fr: z.string().optional(),
  secondary_note_en: z.string().optional(),
});
