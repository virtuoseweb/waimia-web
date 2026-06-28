// Waimia · Co-location DS (Wave #38, T5) · module `editorial-callout` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('editorial-callout'),
  variant: z.enum(['info', 'quote', 'note', 'warn', 'manifesto']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  align: z.enum(['left', 'center']).optional(),
  cite: z.string().optional(),
  body_fr: z.string(),
  body_en: z.string(),
  ...sectionBaseSchema.shape,
});
