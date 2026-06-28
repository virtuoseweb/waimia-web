// Waimia · Co-location DS (Wave #38, T5) · module `coming-soon-pills` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('coming-soon-pills'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  aria_label_fr: z.string(),
  aria_label_en: z.string(),
  pills_fr: z.array(z.string()).min(1).max(16),
  pills_en: z.array(z.string()).min(1).max(16),
});
