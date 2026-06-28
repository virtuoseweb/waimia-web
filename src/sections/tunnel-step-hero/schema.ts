// Waimia · Co-location DS (Wave #38, T5) · module `tunnel-step-hero` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('tunnel-step-hero'),
  offre_label: z.string(),
  step: z.number().int().min(1),
  progress_total: z.number().int().min(1),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});
