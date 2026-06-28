// Waimia · Co-location DS (Wave #38, T5) · module `marquee-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('marquee-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  items_fr: z.array(z.string()).min(2).max(12),
  items_en: z.array(z.string()).min(2).max(12).optional(),
  separator: z.string().default('·'),
  repeat: z.number().int().min(1).max(4).default(2),
});
