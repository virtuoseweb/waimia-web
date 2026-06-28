// Waimia · Co-location DS (Wave #38, T5) · module `cta-final` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('cta-final'),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  chapter_num: z.string().optional(),
  chapter_title_fr: z.string().optional(),
  chapter_title_en: z.string().optional(),
  availability_fr: z.string().optional(),
  availability_en: z.string().optional(),
  reassurance_fr: z.string().optional(),
  reassurance_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('ink'),
});
