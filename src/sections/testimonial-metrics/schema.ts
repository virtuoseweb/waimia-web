// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-metrics` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { testimonialMetricsItemSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('testimonial-metrics'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['quote-left', 'quote-right']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  metrics: z.array(testimonialMetricsItemSchema).min(3).max(4),
});
