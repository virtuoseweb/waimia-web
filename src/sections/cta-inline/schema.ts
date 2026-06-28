// Waimia · Co-location DS (Wave #38, T5) · module `cta-inline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('cta-inline'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).optional(),
});
