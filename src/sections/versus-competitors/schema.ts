// Waimia · Co-location DS (Wave #38, T5) · module `versus-competitors` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { versusColumnSchema, versusRowSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('versus-competitors'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  columns: z.array(versusColumnSchema).min(2).max(5),
  rows: z.array(versusRowSchema).min(3),
});
