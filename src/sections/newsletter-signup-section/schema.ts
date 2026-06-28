// Waimia · Co-location DS (Wave #38, T5) · module `newsletter-signup-section` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('newsletter-signup-section'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
});
