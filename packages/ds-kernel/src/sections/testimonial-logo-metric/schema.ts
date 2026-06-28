// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-logo-metric` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { testimonialLogoMetricCardSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('testimonial-logo-metric'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  cards: z.array(testimonialLogoMetricCardSchema).min(2).max(6),
});
