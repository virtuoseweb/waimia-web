// Waimia · Co-location DS (Wave #38, T5) · module `data-table` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('data-table'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  striped: z.boolean().default(false),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        align: z.enum(['start', 'center', 'end']).default('start'),
      }),
    )
    .min(2)
    .max(8),
  rows: z
    .array(
      z.object({
        cells: z
          .array(
            z.object({
              text_fr: z.string(),
              text_en: z.string(),
              emphasis: z.boolean().default(false),
            }),
          )
          .min(2)
          .max(8),
      }),
    )
    .min(1)
    .max(20),
});
