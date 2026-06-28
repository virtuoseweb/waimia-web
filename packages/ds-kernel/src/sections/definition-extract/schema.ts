// Waimia · Co-location DS (Wave #38, T5) · module `definition-extract` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('definition-extract'),
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  statement_fr: z.string(),
  statement_en: z.string(),
  pills: z.array(z.object({ label_fr: z.string(), label_en: z.string() })).max(6).optional(),
  specs: z.array(z.object({ label_fr: z.string(), label_en: z.string() })).max(8).optional(),
});
