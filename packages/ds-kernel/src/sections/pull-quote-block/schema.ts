// Waimia · Co-location DS (Wave #38, T5) · module `pull-quote-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('pull-quote-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  variant: z.enum(['breakout', 'inline', 'centered']).default('centered'),
});
