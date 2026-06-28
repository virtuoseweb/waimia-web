// Waimia · Co-location DS (Wave #38, T5) · module `course-catalog-table` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('course-catalog-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  title_fr: z.string(),
  title_en: z.string(),
  rows: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        level: z.enum(['debutant', 'intermediaire', 'avance', 'expert']),
        duration_hours: z.number().positive(),
        price_eur: z.number().int().nonnegative().optional(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(20),
});
