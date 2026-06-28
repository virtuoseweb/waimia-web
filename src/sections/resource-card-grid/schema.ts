// Waimia · Co-location DS (Wave #38, T5) · module `resource-card-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('resource-card-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  columns: z.enum(['2', '3']).default('3'),
  resources: z
    .array(
      z.object({
        kind_fr: z.string(),
        kind_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string().optional(),
        desc_en: z.string().optional(),
        format: z.string().optional(),
        href: z.string(),
        cta_label_fr: z.string().optional(),
        cta_label_en: z.string().optional(),
        gated: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(9),
});
