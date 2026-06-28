// Waimia · Co-location DS (Wave #38, T5) · module `key-metric-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('key-metric-grid'),
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  columns: z.number().int().min(2).max(4).optional(),
  size: z.enum(['sm', 'md', 'lg', 'hero']).optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  variant: z.enum(['default', 'inverted', 'accent']).optional(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        delta: z.string().optional(),
        trend: z.enum(['up', 'down', 'flat']).optional(),
      }),
    )
    .min(2),
  ...sectionBaseSchema.shape,
});
