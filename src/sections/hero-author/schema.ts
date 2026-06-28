// Waimia · Co-location DS (Wave #38, T5) · module `hero-author` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hero-author'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  team_label_fr: z.string().optional(),
  team_label_en: z.string().optional(),
  team_href: z.string().optional(),
  name: z.string(),
  name_lead: z.string(),
  name_accent: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});
