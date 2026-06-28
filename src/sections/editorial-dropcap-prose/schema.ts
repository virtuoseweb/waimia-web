// Waimia · Co-location DS (Wave #38, T5) · module `editorial-dropcap-prose` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { sectionBaseSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('editorial-dropcap-prose'),
  variant: z.enum(['serif', 'mono', 'accent']).optional(),
  lead_fr: z.string(),
  lead_en: z.string(),
  paragraphs_fr: z.array(z.string()).optional(),
  paragraphs_en: z.array(z.string()).optional(),
  ...sectionBaseSchema.shape,
});
