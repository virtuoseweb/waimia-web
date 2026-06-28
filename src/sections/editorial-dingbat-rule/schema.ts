// Waimia · Co-location DS (Wave #38, T5) · module `editorial-dingbat-rule` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('editorial-dingbat-rule'),
  variant: z.enum(['default', 'section', 'end', 'rule', 'asterism']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  above_fr: z.string().optional(),
  above_en: z.string().optional(),
  below_fr: z.string().optional(),
  below_en: z.string().optional(),
  ...sectionBaseSchema.shape,
});
