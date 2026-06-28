// Waimia · Co-location DS (Wave #38, T5) · module `hero-tech-layer` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-tech-layer'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  layer_type: z.enum(['claude', 'os', 'orch']).default('claude'),
  layer_label_fr: z.string(),
  layer_label_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
});
