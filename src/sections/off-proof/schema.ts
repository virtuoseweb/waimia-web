// Waimia · Co-location DS (Wave #38, T5) · module `off-proof` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('off-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Avant / Après'),
  eyebrow_en: z.string().default('§ Before / After'),
  h2_fr: z.string().default('Signal<br/><i>terrain</i>'),
  h2_en: z.string().default('Field<br/><i>signal</i>'),
  quote_fr: z.string(),
  quote_en: z.string(),
  attribution: z.string(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});
