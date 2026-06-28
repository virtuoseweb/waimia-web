// Waimia · Co-location DS (Wave #38, T5) · module `editorial-table-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('editorial-table-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns_fr: z.array(z.string()).min(2).max(6),
  columns_en: z.array(z.string()).min(2).max(6),
  rows_fr: z.array(z.array(z.string()).min(2).max(6)).min(1),
  rows_en: z.array(z.array(z.string()).min(2).max(6)).min(1),
  variant: z.enum(['default', 'compact', 'editorial']).default('editorial'),
});
