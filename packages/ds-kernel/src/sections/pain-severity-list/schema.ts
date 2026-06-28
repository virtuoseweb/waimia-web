// Waimia · Co-location DS (Wave #38, T5) · module `pain-severity-list` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('pain-severity-list'),
  ...sectionBaseSchema.shape,
  // Batch 6 (texte/manifeste) · refiner count-adaptive pour layout='two-col'|'grid'.
  // 'auto' = auto-fit ; '2'|'3' = nb fixe desktop. Ignoré par list/rows-divided. Défaut absent = list.
  columns: z.enum(['auto', '2', '3']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(z.object({
    severity: z.enum(['critical', 'high', 'medium', 'low']),
    title_fr: z.string(), title_en: z.string(),
    desc_fr: z.string(), desc_en: z.string(),
    fix_fr: z.string().optional(), fix_en: z.string().optional(),
  })).min(2).max(6),
});
