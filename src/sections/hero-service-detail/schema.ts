// Waimia · Co-location DS (Wave #38, T5) · module `hero-service-detail` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { metricSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-service-detail'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  metrics: z.array(metricSchema).min(2).max(4).optional(),
});
