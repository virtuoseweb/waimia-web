// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { testimonialSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('testimonial-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  testimonials: z.array(testimonialSchema).min(1).max(6),
  layout: z.enum(['carousel', 'grid-2', 'rows']).default('grid-2'),
});
