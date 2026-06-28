// Waimia · Co-location DS (Wave #38, T5) · module `operating-layer` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('operating-layer'),
  chapter_num: z.string(),
  chapter_title_fr: z.string(),
  chapter_title_en: z.string(),
  spec_label: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  terminal_label: z.string(),
  console_lines: z
    .array(
      z.object({
        k: z.string(),
        v: z.string(),
      }),
    )
    .min(2)
    .max(8),
  console_cmd: z.string(),
  attrs: z
    .array(
      z.object({
        k: z.string(),
        v_fr: z.string(),
        v_en: z.string(),
      }),
    )
    .length(4),
});
