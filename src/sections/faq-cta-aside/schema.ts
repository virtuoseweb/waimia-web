// Waimia · Co-location DS (Wave #38, T5) · module `faq-cta-aside` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema, faqItemSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('faq-cta-aside'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
  open_first: z.boolean().optional(),
  aside_title_fr: z.string(),
  aside_title_en: z.string(),
  aside_body_fr: z.string().optional(),
  aside_body_en: z.string().optional(),
  aside_cta: ctaSchema,
  aside_note_fr: z.string().optional(),
  aside_note_en: z.string().optional(),
});
