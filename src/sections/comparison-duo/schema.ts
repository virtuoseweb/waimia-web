// Waimia · Co-location DS (Wave #38, T5) · module `comparison-duo` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { placementSchema } from '../_shared/base';
import { comparisonDuoItemSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('comparison-duo'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // ── Vague C · Scale (Batch 4 « splits/duo ») ──
  // Disposition des 2 cartes (honnête : pas de bento, c'est un duo face-à-face). Absent →
  // 'inline' (côte à côte, rendu actuel). 'stacked' = empilé vertical (sans/avec l'un sous l'autre).
  layout: z.enum(['inline', 'stacked']).optional(),
  // Ratio des 2 colonnes sans|avec. Absent → 1fr 1fr (rendu actuel). Ignoré par 'stacked'.
  //   1-1 (défaut) · 1-2 (carte AVEC dominante) · 2-1 (carte SANS dominante).
  proportion: z.enum(['1-1', '1-2', '2-1']).optional(),
  // Densité (gap entre cartes + padding interne). Absent → base (rendu actuel).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // Alignement du bloc header (kicker + h2). Absent → start (rendu actuel).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header/body). Forme identique partout.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  without_label_fr: z.string(),
  without_label_en: z.string(),
  without_title_fr: z.string(),
  without_title_en: z.string(),
  without_items: z.array(comparisonDuoItemSchema).min(2).max(6),
  with_label_fr: z.string(),
  with_label_en: z.string(),
  with_title_fr: z.string(),
  with_title_en: z.string(),
  with_items: z.array(comparisonDuoItemSchema).min(2).max(6),
});
