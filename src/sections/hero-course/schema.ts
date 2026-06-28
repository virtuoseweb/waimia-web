// Waimia · Co-location DS (Wave #38, T5) · module `hero-course` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-course'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  type_label_fr: z.string(),
  type_label_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        variant: z.enum(['default', 'accent', 'price']).default('default'),
      }),
    )
    .min(1)
    .max(8),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
});
