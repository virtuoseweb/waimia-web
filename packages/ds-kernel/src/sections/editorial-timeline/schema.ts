// Waimia · Co-location DS (Wave #38, T5) · module `editorial-timeline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('editorial-timeline'),
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  orientation: z.enum(['vertical', 'horizontal']).optional(),
  numbered: z.boolean().optional(),
  events: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
        body_fr: z.string(),
        body_en: z.string(),
        variant: z.enum(['default', 'highlight']).optional(),
      }),
    )
    .min(2),
  ...sectionBaseSchema.shape,
});
