// Waimia · Co-location DS (Wave #38, T5) · module `list-index-section` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('list-index-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  filters_html_fr: z.string().optional(),
  filters_html_en: z.string().optional(),
  list_html_fr: z.string().optional(),
  list_html_en: z.string().optional(),
  footer_html_fr: z.string().optional(),
  footer_html_en: z.string().optional(),
});
