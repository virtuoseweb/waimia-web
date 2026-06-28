// Waimia · Co-location DS (Wave #38, T5) · module `case-spotlight` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { caseSpotlightMetricSchema, caseSpotlightTagSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('case-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['media-left', 'media-right']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  media_src: z.string().optional(),
  media_alt: z.string().optional(),
  media_caption: z.string().optional(),
  quote_fr: z.string().optional(),
  quote_en: z.string().optional(),
  attribution_fr: z.string().optional(),
  attribution_en: z.string().optional(),
  metrics: z.array(caseSpotlightMetricSchema).max(3).optional(),
  tags: z.array(caseSpotlightTagSchema).max(4).optional(),
  cta_href: z.string().optional(),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
});
