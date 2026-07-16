// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-listing` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('hero-hub-listing'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  decoration: z.boolean().default(false),
  // Overrides layout rétro-compat (vague 6) : rendent le masthead 100% composable en
  // absorbant les props que le template UtilityTemplate posait à la main (ex. /blog).
  // Absent / true / false = comportement catalogue byte-identique (preview inchangée).
  top_pad: z.string().optional(),
  lede_reveal: z.boolean().optional(),
  list_border: z.boolean().optional(),
});
