// Waimia · Co-location DS (Wave #38, T5) · module `timeline-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { timelineEventSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('timeline-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  events: z.array(timelineEventSchema).min(2),
});
