// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-single-spotlight` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('testimonial-single-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  portrait_src: z.string().optional(),
  logo_src: z.string().optional(),
});
