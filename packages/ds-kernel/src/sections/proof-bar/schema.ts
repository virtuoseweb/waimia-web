// Waimia · Co-location DS (Wave #38, T5) · module `proof-bar` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { metricSchema } from '../_shared/subschemas';
import { refOrInline } from '../_shared/refs';

export const schema = z.object({
  type: z.literal('proof-bar'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  // metrics : forme inline (`metricSchema`) OU pointeur `{ ref: 'proof-points/<id>' }` résolu
  // au rendu via le référentiel GLOBAL src/data/proof-points.ts et PROJETÉ (value → value,
  // label → label) par resolveSectionRefs (REF_TARGETS['proof-bar.metrics'] = 'proof-points').
  // Les instances actuelles restent inline (valides sous l'union).
  metrics: z.array(refOrInline(metricSchema)).min(2).max(6),
  layout: z.enum(['horizontal', 'vertical-stack']).default('horizontal'),
  /** Lien d'attribution optionnel sous les métriques (« Voir les 4 dossiers → ») : source les chiffres. */
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  link_href: z.string().optional(),
});
