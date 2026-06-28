// Waimia · Co-location DS (Wave #38, T5) · module `agentic-terminal` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { agenticLineSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('agentic-terminal'),
  badge_fr: z.string(),
  badge_en: z.string(),
  title_part1_fr: z.string(),
  title_part1_en: z.string(),
  title_highlight_fr: z.string(),
  title_highlight_en: z.string(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  filename: z.string(),
  folders: z.array(z.string()).max(8).default([]),
  files: z
    .array(z.object({ name: z.string(), type: z.string() }))
    .max(12)
    .default([]),
  prompt_label_fr: z.string(),
  prompt_label_en: z.string(),
  prompt_text_fr: z.string(),
  prompt_text_en: z.string(),
  lines_fr: z.array(agenticLineSchema).min(1).max(20),
  lines_en: z.array(agenticLineSchema).min(1).max(20),
  success_msg_fr: z.string(),
  success_msg_en: z.string(),
  footer_status_fr: z.string(),
  footer_status_en: z.string(),
  footer_framework: z.string(),
  footer_memory: z.string(),
  badges_fr: z.array(z.string()).max(6).default([]),
  badges_en: z.array(z.string()).max(6).default([]),
});
