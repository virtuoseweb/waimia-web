// Waimia · Co-location DS (Wave #38, T5) · module `team-bio-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { teamBioMemberSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('team-bio-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  columns: z.enum(['2', '3', '4']).default('3'),
  members: z.array(teamBioMemberSchema).min(2).max(12),
});
