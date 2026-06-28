// Waimia · Co-location DS (Wave #38, T5) · module `system-flow` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('system-flow'),
  ...sectionBaseSchema.shape,
  fig_num: z.string().optional(),
  fig_title_fr: z.string().optional(),
  fig_title_en: z.string().optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(z.object({
    title_fr: z.string(), title_en: z.string(),
    desc_fr: z.string(), desc_en: z.string(),
  })).min(2).max(6),
  loop_label_fr: z.string().optional(),
  loop_label_en: z.string().optional(),
});
