// Waimia · Co-location DS (Wave #38, T5) · module `stat-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { metricSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('stat-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  quote_fr: z.string().optional(),
  quote_en: z.string().optional(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  metrics: z.array(metricSchema).min(1).max(8),
  layout: z.enum(['grid-3', 'grid-4', 'rows-hairlines', 'split-quote']).default('grid-3'),
});
