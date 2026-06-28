// Waimia · Co-location DS (Wave #38, T5) · module `pricing-cards` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';
import { pricingCardTierSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('pricing-cards'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C scale — Batch 2) — lus par data-* dans le composant. Tous
  // optionnels, défauts = rendu actuel.
  //  - layout : RECETTE de mise en page (lexique curé). Absent → rendu actuel (grille --col-count).
  //      grid-uniform   : N colonnes égales (columns) hauteurs stretch (cartes alignées).
  //      grid-auto      : auto-fit count-adaptive (s'adapte au nombre de tiers + largeur).
  //      grid-asym      : colonnes de largeurs différentes via colRatio (offre vedette plus large).
  //      list           : 1 tier par ligne, carte horizontale pleine largeur (prix ↔ features ↔ CTA).
  //      rows-divided   : list + hairline entre lignes (table tarifaire éditoriale).
  //      bento-feature  : 1ʳᵉ carte vedette (span 2 / row 2) + tiers simples (dense).
  //      featured-split : 1 gros tier (1fr) + colonne de tiers secondaires (1fr).
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
  //  - density : rythme padding section + gap colonnes (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - contentAlign : alignement du header (start|center|end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  //  - actionsAlign : justify du CTA dans la carte, indépendant du contenu (start|center|end|spread).
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  //  - columns : 'auto' = auto-fit count-adaptive (s'adapte au nombre de tiers, jamais
  //    de colonne vide) ; '2'..'6' = nombre fixe desktop. Absent → comportement
  //    historique (1 colonne par tier via --col-count). Honoré par grid-uniform/grid-auto.
  columns: z.enum(['auto', '2', '3', '4', '5', '6']).optional(),
  //  - colRatio : largeurs de colonnes, UNIQUEMENT pour layout='grid-asym'. Ignoré ailleurs.
  colRatio: z.enum(['equal', '1-2', '2-1', '1-1-2', '2-3']).optional(),
  //  - itemHeight : hauteur des cartes (auto|even|square|video). Défaut = align-items:start (actuel).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  // Couche atomique (Batch 2) : placement par région (header + body + actions). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  tiers: z.array(pricingCardTierSchema).min(2).max(4),
  footnote_fr: z.string().optional(),
  footnote_en: z.string().optional(),
});
