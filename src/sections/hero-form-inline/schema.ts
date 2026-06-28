// Waimia · Co-location DS (Wave #38, T5) · module `hero-form-inline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hero-form-inline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  form_title_fr: z.string(),
  form_title_en: z.string(),
  proof: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(4)
    .optional(),
});
