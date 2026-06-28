// Waimia · Co-location DS (Wave #38, T5) · module `deliverables-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('deliverables-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C scale — Batch 2). Tous optionnels → défaut = rendu actuel.
  //  - layout : RECETTE de mise en page (lexique curé card-collection). Absent → rendu actuel
  //    (grille count-adaptive éditoriale border-top). Sous-ensemble pertinent pour des livrables :
  //      grid-uniform   : N colonnes égales (columns) hauteurs stretch.
  //      grid-auto      : auto-fit count-adaptive (s'adapte au nombre + largeur).
  //      grid-asym      : colonnes de largeurs différentes via colRatio.
  //      list           : 1 par ligne, item horizontal pleine largeur.
  //      rows-divided   : list + hairline entre lignes (table éditoriale).
  //      bento-feature  : 1ʳᵉ carte vedette (span 2 / row 2) + cellules simples (dense).
  //      featured-split : 1 gros bloc (1fr) + colonne d'items secondaires (1fr).
  //  - columns : 'auto' (count-adaptive :has, défaut historique) | '2'|'3'|'4' (fixe desktop).
  //    Honoré par grid-uniform/grid-auto ; ignoré proprement par list/bento-feature/matrix.
  //  - colRatio : largeurs de colonnes, UNIQUEMENT pour layout='grid-asym'. Ignoré ailleurs.
  //  - itemHeight : hauteur des cellules (auto|even|square|video). Couvre « harmonisées/contrastées ».
  //  - density : rythme padding/gap (compact|base|ample) via tokens --space-*.
  //  - contentAlign : alignement du header (start|center|end).
  layout: z
    .enum([
      'grid-uniform',
      'grid-auto',
      'grid-asym',
      'list',
      'rows-divided',
      'bento-feature',
      'featured-split',
    ])
    .optional(),
  columns: z.enum(['auto', '2', '3', '4', '5', '6']).optional(),
  colRatio: z.enum(['equal', '1-2', '2-1', '1-1-2', '2-3']).optional(),
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 2) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        format_fr: z.string().optional(),
        format_en: z.string().optional(),
        duration_fr: z.string().optional(),
        duration_en: z.string().optional(),
        // Line-art DS optionnel (Registre A) : chemin `/images/line-art/*.svg`. Inliné
        // par FeatureGrid (currentColor + var(--accent)). alt porteur de sens → role=img.
        illustration_src: z.string().optional(),
        illustration_alt_fr: z.string().optional(),
        illustration_alt_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(8),
});
