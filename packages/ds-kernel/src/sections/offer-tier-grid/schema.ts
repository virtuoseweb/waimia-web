// Waimia · Co-location DS (Wave #38, T5) · module `offer-tier-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('offer-tier-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['standard', 'featured', 'transparent']).default('standard'),
  wrap: z.boolean().default(true),
  eyebrow_fr: z.string(),
  eyebrow_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  lede_max_width: z.string().optional(),
  featured_card: z
    .object({
      eyebrow_fr: z.string(),
      eyebrow_en: z.string(),
      title_fr: z.string(),
      title_en: z.string(),
      sub_fr: z.string(),
      sub_en: z.string(),
      lead_fr: z.string(),
      lead_en: z.string(),
      cta_fr: z.string(),
      cta_en: z.string(),
      href: z.string(),
    })
    .optional(),
  offers: z
    .array(
      z.object({
        price_fr: z.string(),
        price_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        cta_fr: z.string(),
        cta_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(6),
});
