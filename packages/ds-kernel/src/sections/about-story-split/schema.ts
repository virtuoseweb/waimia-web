// Waimia · Co-location DS (Wave #38, T5) · module `about-story-split` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { aboutStoryMilestoneSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('about-story-split'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  paragraphs_fr: z.array(z.string()).min(1).max(5),
  paragraphs_en: z.array(z.string()).min(1).max(5),
  aside_title_fr: z.string().optional(),
  aside_title_en: z.string().optional(),
  milestones: z.array(aboutStoryMilestoneSchema).min(2).max(8),
});
