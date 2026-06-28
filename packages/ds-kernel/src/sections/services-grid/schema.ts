// Waimia · Co-location DS (Wave #38, T5) · module `services-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('services-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  connectors_label_fr: z.string().default('Connecteurs'),
  connectors_label_en: z.string().default('Connectors'),
  services: z
    .array(
      z.object({
        fig: z.string(),
        metric_fr: z.string(),
        metric_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        connectors_fr: z.string(),
        connectors_en: z.string(),
        /** Lien optionnel vers le cas d'usage /solutions/* du service (fusion UseCaseIndex). */
        usecase_label_fr: z.string().optional(),
        usecase_label_en: z.string().optional(),
        usecase_href: z.string().optional(),
      }),
    )
    .min(3)
    .max(6),
  /** Liens de pied de grille optionnels (« Six cas d'usage métier → », « Adapté à votre secteur → »). */
  foot_links: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .max(3)
    .optional(),
});
