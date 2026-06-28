// Waimia · Co-location DS (Wave #38, T5) · module `hero-service-masthead` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hero-service-masthead'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});
