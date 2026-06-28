// Waimia · Co-location DS (Wave #38, T5) · module `comparison-pricing-callout` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { comparisonValuePropSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('comparison-pricing-callout'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  columns: z.array(comparisonValuePropSchema).min(2).max(4),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
  cta_note_fr: z.string().optional(),
  cta_note_en: z.string().optional(),
});
