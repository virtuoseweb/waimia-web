// Waimia · Co-location DS (Wave #38, T5) · module `stat-counter` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { statCounterItemSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('stat-counter'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  stats: z.array(statCounterItemSchema).min(2).max(4),
  animate: z.boolean().default(true),
});
