// Waimia · Co-location DS (Wave #38, T5) · module `direct-answer` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('direct-answer'),
  question_fr: z.string(),
  question_en: z.string(),
  term_fr: z.string().optional(),
  term_en: z.string().optional(),
  answer_fr: z.string(),
  answer_en: z.string(),
  dropcap: z.boolean().optional(),
  ...sectionBaseSchema.shape,
});
