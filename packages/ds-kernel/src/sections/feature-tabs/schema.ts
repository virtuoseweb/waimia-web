// Waimia · Co-location DS (Wave #38, T5) · module `feature-tabs` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('feature-tabs'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  tabs: z.array(z.object({
    icon: z.string().optional(),
    label_fr: z.string(),
    label_en: z.string(),
    title_fr: z.string(),
    title_en: z.string(),
    body_fr: z.string(),
    body_en: z.string(),
    visual_label_fr: z.string().optional(),
    visual_label_en: z.string().optional(),
  })).min(2).max(6),
});
