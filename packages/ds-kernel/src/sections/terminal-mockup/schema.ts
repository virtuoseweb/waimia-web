// Waimia · Co-location DS (Wave #38, T5) · module `terminal-mockup` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('terminal-mockup'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  layout: z.enum(['split', 'full']).default('split'),
  label: z.string().default(''),
  status: z.string().default(''),
  tone: z.enum(['ink', 'paper']).default('ink'),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  lines: z
    .array(
      z.object({
        kind: z.enum(['cmd', 'out', 'ok', 'comment']).default('out'),
        text_fr: z.string(),
        text_en: z.string(),
      }),
    )
    .min(1)
    .max(14),
  show_cursor: z.boolean().default(true),
});
