// Waimia · Co-location DS (Wave #38, T5) · module `timeline-horizontal` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('timeline-horizontal'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  events: z
    .array(
      z.object({
        date_fr: z.string().optional(),
        date_en: z.string().optional(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string().optional(),
        body_en: z.string().optional(),
        status: z.enum(['done', 'active', 'upcoming']).default('upcoming'),
      }),
    )
    .min(2)
    .max(10),
});
