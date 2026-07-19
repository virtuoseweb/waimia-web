// Waimia · Co-location DS (Wave #38, T5) · module `hero-problem-index` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('hero-problem-index'),
  // Axe de déclinaison (#118) : fond. DÉFAUT ABSENT = paper (rendu inchangé) ; paper-2/paper-3/ink
  // déclinent le héros (aligne hero-problem-index sur ses frères HeroCentered, modèle data-bg).
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  canonical_fr: z.string().optional(),
  canonical_en: z.string().optional(),
  transition_id: z.string().optional(),
});
