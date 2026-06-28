// Waimia · Co-location DS (Wave #38, T5) · module `proof-bar` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { metricSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('proof-bar'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  metrics: z.array(metricSchema).min(2).max(6),
  layout: z.enum(['horizontal', 'vertical-stack']).default('horizontal'),
  /** Lien d'attribution optionnel sous les métriques (« Voir les 4 dossiers → ») : source les chiffres. */
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  link_href: z.string().optional(),
});
