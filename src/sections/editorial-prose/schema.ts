// Waimia · Co-location DS (Wave #38, T5) · module `editorial-prose` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('editorial-prose'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  maxWidth: z.enum(['prose', 'wide']).optional(),
});
