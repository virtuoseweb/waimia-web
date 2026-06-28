// Waimia · Co-location DS (Wave #38, T5) · module `tech-when-dual` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('tech-when-dual'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  use_title_fr: z.string(),
  use_title_en: z.string(),
  use_items_fr: z.array(z.string()).min(1).max(10),
  use_items_en: z.array(z.string()).min(1).max(10),
  avoid_title_fr: z.string(),
  avoid_title_en: z.string(),
  avoid_items_fr: z.array(z.string()).min(1).max(10),
  avoid_items_en: z.array(z.string()).min(1).max(10),
});
