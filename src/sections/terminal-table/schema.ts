// Waimia · Co-location DS (Wave #38, T5) · module `terminal-table` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { bilingualString } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('terminal-table'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  /** grid-template-columns de la table · ex: "60px 180px 1fr 120px" */
  cols: z.string(),
  headers: z.array(bilingualString).min(2).max(8),
  rows: z
    .array(
      z.object({
        href: z.string().optional(),
        cells: z
          .array(
            z.object({
              fr: z.string(),
              en: z.string(),
              role: z.enum(['id', 'title', 'body', 'mono', 'status', 'accent', 'arrow']).default('body'),
            }),
          )
          .min(2)
          .max(8),
      }),
    )
    .min(1)
    .max(12),
});
