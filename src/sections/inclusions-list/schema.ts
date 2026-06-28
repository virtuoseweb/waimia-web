// Waimia · Co-location DS (Wave #38, T5) · module `inclusions-list` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('inclusions-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  items_fr: z.array(z.string()).min(2).max(16),
  items_en: z.array(z.string()).min(2).max(16),
});
