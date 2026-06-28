// Waimia · Co-location DS (Wave #38, T5) · module `department-stack` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('department-stack'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Stack outils'),
  eyebrow_en: z.string().default('§ Tool stack'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns_fr: z.array(z.string()).min(2).max(4),
  columns_en: z.array(z.string()).min(2).max(4),
  rows: z
    .array(
      z.object({
        category_fr: z.string(),
        category_en: z.string(),
        tool: z.string(),
        role_fr: z.string(),
        role_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});
