// Waimia · Co-location DS (Wave #38, T5) · module `metric-callout-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { metricCalloutItemSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('metric-callout-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  context_fr: z.string(),
  context_en: z.string(),
  metrics: z.array(metricCalloutItemSchema).min(1).max(3),
});
