// Waimia · Co-location DS (Wave #38, T5) · module `code-showcase` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('code-showcase'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  tone: z.enum(['ink', 'paper']).default('ink'),
  label: z.string().default(''),
  lang_label: z.string().default(''),
  show_line_numbers: z.boolean().default(true),
  lines: z
    .array(
      z.object({
        text: z.string(),
        comment_fr: z.string().optional(),
        comment_en: z.string().optional(),
      }),
    )
    .min(1)
    .max(24),
});
