// Waimia · Co-location DS (Wave #38, T5) · module `hero-offer-detail` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('hero-offer-detail'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  hero_variant: z.enum(['equilibre', 'showcase', 'encadre']).optional(),
  breadcrumb_label_fr: z.string().optional(),
  breadcrumb_label_en: z.string().optional(),
  breadcrumb_href: z.string().optional(),
  tier_fr: z.string(),
  tier_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  tags: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(8)
    .optional(),
});
