// Waimia · Co-location DS (Wave #38, T5) · module `pricing-toggle` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { pricingToggleTierSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('pricing-toggle'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  label_monthly_fr: z.string(),
  label_monthly_en: z.string(),
  label_annual_fr: z.string(),
  label_annual_en: z.string(),
  save_badge_fr: z.string().optional(),
  save_badge_en: z.string().optional(),
  tiers: z.array(pricingToggleTierSchema).min(2).max(4),
});
