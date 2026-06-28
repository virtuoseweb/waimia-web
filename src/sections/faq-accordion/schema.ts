// Waimia · Co-location DS (Wave #38, T5) · module `faq-accordion` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { faqItemSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('faq-accordion'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
  /** Ouvre le premier item par défaut (ancrage prix visible sans clic). */
  open_first: z.boolean().optional(),
});
