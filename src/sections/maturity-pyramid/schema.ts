// Waimia · Co-location DS (Wave #38, T5) · module `maturity-pyramid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('maturity-pyramid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['full', 'cards-only']).default('full'),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  timeline_label_fr: z.string().default('Progression de maturité IA'),
  timeline_label_en: z.string().default('AI maturity path'),
  tier_cta_fr: z.string().default('Voir le palier →'),
  tier_cta_en: z.string().default('Open tier →'),
  steps: z
    .array(
      z.object({
        roman: z.string(),
        verb_fr: z.string(),
        verb_en: z.string(),
        stage_fr: z.string(),
        stage_en: z.string(),
      }),
    )
    .length(4)
    .optional(),
  tiers: z
    .array(
      z.object({
        n: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        items_fr: z.array(z.string()),
        items_en: z.array(z.string()),
        action_fr: z.string(),
        action_en: z.string(),
        href: z.string(),
        /** Stage de maturité en sur-titre de card (AUDIT / WORKFLOW / SYSTÈME / INFRASTRUCTURE). */
        stage_fr: z.string().optional(),
        stage_en: z.string().optional(),
        /** Prix d'entrée du palier (« dès 1 500 € HT · 1 semaine ») : source FAQ/offres, jamais inventé. */
        price_fr: z.string().optional(),
        price_en: z.string().optional(),
      }),
    )
    .length(4),
});
