// Waimia · Co-location DS (Wave #38, T5) · module `steps-horizontal` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { stepsHorizontalStepSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('steps-horizontal'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  steps: z.array(stepsHorizontalStepSchema).min(2).max(6),
});
