// Waimia · Co-location DS (Wave #38, T5) · module `feature-zigzag` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('feature-zigzag'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Damier paper/ink opt-in : quand true, 1 bloc sur 2 (nth-child even) rend en
  // contraste inverse (fond ink / texte paper). Absent ou false = rendu inchangé
  // (rétrocompat). Cf manifeste §5.5 « 1 registre par bloc » : un bloc rendu en
  // ink doit pointer son média sur la variante -ink.webp (choix au contenu).
  alternate_blocks: z.boolean().optional(),
  // ── Vague C · Scale (Batch 4 « splits/duo ») ──
  // Recette de disposition des rangées (sous-ensemble du lexique « split/duo »). Absent →
  // 'alternate' (zigzag historique, alternance gérée en interne rangée par rangée).
  //   alternate    : zigzag (média gauche/droite alterné par rangée) · défaut, rendu actuel.
  //   stacked      : média TOUJOURS au-dessus du texte (1 colonne empilée par rangée).
  //   inline-left  : média TOUJOURS à gauche du texte (pas d'alternance).
  //   inline-right : média TOUJOURS à droite du texte (pas d'alternance).
  layout: z.enum(['alternate', 'stacked', 'inline-left', 'inline-right']).optional(),
  // Ratio des colonnes média|texte appliqué à CHAQUE rangée (mediaSide gère le côté).
  // Absent → 1fr 1fr (rendu actuel). Ignoré par 'stacked' (empilé, 1 colonne).
  proportion: z.enum(['1-1', '1-2', '2-1', '2-3', '3-2']).optional(),
  // Côté du média de la PREMIÈRE rangée (l'alternance enchaîne ensuite). Absent → 'left'
  // (rendu actuel : impair = visuel gauche). Ignoré par inline-left/inline-right/stacked.
  mediaSide: z.enum(['left', 'right']).optional(),
  // Densité (gap entre rangées + gap interne des cellules). Absent → base (rendu actuel).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // Alignement du bloc header (kicker + h2 + lede). Absent → start (rendu actuel).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header/media/body/actions). Forme identique partout.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  rows: z.array(
    z.object({
      kicker_fr: z.string().optional(),
      kicker_en: z.string().optional(),
      h3_fr: z.string(),
      h3_en: z.string(),
      body_fr: z.string(),
      body_en: z.string(),
      link_label_fr: z.string().optional(),
      link_label_en: z.string().optional(),
      link_href: z.string().optional(),
      // Points/touchpoints du bloc (liste à puces discrète sous le body). Optionnel
      // → rétrocompat (un row sans points ne rend rien de plus). Max 4 par bloc.
      points: z
        .array(
          z.object({
            label_fr: z.string(),
            label_en: z.string(),
          }),
        )
        .max(4)
        .optional(),
      // Média réel par bloc (corrige le placeholder vide). Optionnels → rétrocompat
      // (un row sans media_src garde le SVG placeholder). .svg = inline line-art via
      // ?raw (currentColor/var(--accent) résolvent) ; .webp = <img> avec dimensions.
      media_src: z.string().optional(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
    })
  ).min(2).max(6),
});
