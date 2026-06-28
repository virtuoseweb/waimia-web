// Waimia · Co-location DS (Wave #38, T5) · module `fit-columns` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('fit-columns'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  heading_fr: z.string(),
  heading_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  yes_title_fr: z.string(),
  yes_title_en: z.string(),
  yes_items_fr: z.array(z.string()).min(1).max(8),
  yes_items_en: z.array(z.string()).min(1).max(8),
  no_title_fr: z.string(),
  no_title_en: z.string(),
  no_items_fr: z.array(z.string()).min(1).max(8),
  no_items_en: z.array(z.string()).min(1).max(8),
});
