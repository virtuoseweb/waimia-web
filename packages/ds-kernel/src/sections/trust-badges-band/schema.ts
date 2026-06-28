// Waimia · Co-location DS (Wave #38, T5) · module `trust-badges-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { trustBadgeSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('trust-badges-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  // 'cells' = grille hairline (glyph + label + valeur) ; 'strip' = items mono uppercase
  // inline séparés par une puce accent (modèle bandeau certifications, ref-offre-deploiement).
  variant: z.enum(['cells', 'strip']).default('cells'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  badges: z.array(trustBadgeSchema).min(3).max(8),
});
