// Waimia · Co-location DS (#80, GAP narratif) · module `sticky-scroll-storytelling`
//
// Schéma DS-driven. `z` vient de `zod` (cohérence kernel, cf media-bento/schema.ts).
// `placementSchema` réimporté depuis la feuille pure `_shared/base`. Famille narrative :
// rail de texte sticky (étapes/chapitres) + colonne média sticky dont l'image change au
// scroll (crossfade), l'étape active passant en accent. Mobile = stepper empilé.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const stickyScrollStorytellingSchema = z.object({
  type: z.literal('sticky-scroll-storytelling'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  placement: placementSchema,

  // ── Axes de composition (DS-driven, défauts = rendu signature) ──
  //  - textSide : colonne texte à gauche (défaut) ou à droite ; le média prend l'autre côté.
  textSide: z.enum(['left', 'right']).optional(),
  //  - proportion : largeur relative texte/média (§H.4, non 50/50 par défaut).
  //      balanced (1fr 1fr) | text-led (62/38) | media-led (38/62) | media-wide (34/66).
  proportion: z.enum(['balanced', 'text-led', 'media-led', 'media-wide']).optional(),
  //  - mediaRatio : ratio du cadre média (§H.5). portrait 4:5 défaut (éditorial).
  mediaRatio: z.enum(['4-5', '1-1', '4-3', '3-2']).optional(),
  //  - density : gap vertical entre étapes (rythme du rail).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - numbering : style du compteur d'étape (numéral serif | aucun).
  numbering: z.enum(['serif', 'none']).optional(),

  // ── Axes de LAYOUT optionnels (défaut absent = rendu signature inchangé) ──
  //  - frame : cadre optionnel de la section entière. 'expand-ink' = carte ink contenue
  //      (80 %) qui s'étend à pleine largeur au scroll (idiome StatementOrbit `so-expand`,
  //      CSS scroll-driven, 0 JS ; fallback + reduced-motion = carte contenue). Aucun axe
  //      existant ne pilote ce comportement (proportion/mediaRatio = grille interne ;
  //      background = teinte plate). Rôle distinct → nouvel axe.
  frame: z.enum(['expand-ink']).optional(),
  //  - mediaMode : 'sticky' (défaut) = colonne média sticky + crossfade au scroll ;
  //      'inline' = colonne média supprimée, l'image de chaque étape est tissée dans le
  //      rail (long-form éditorial, image alternée). Aucun axe existant ne décide de la
  //      PRÉSENCE/du couplage de la colonne média → nouvel axe.
  mediaMode: z.enum(['sticky', 'inline']).optional(),
  //  - mediaTreatment : 'card' (défaut) = cadre média bordé/arrondi ; 'bleed' = panneau
  //      média immersif sans chrome (bord à bord dans sa colonne). mediaRatio ne gère que
  //      le ratio, pas le chrome → nouvel axe.
  mediaTreatment: z.enum(['card', 'bleed']).optional(),
  //  - railStyle : 'plain' (défaut) = rail aéré ; 'ledger' = étapes séparées par un filet
  //      (registre / sommaire structuré). density gère le gap, pas les séparateurs → nouvel axe.
  railStyle: z.enum(['plain', 'ledger']).optional(),

  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),

  steps: z
    .array(
      z.object({
        // numéro/eyebrow court affiché au-dessus du titre d'étape (ex. "01", "Phase 1").
        index_fr: z.string().optional(),
        index_en: z.string().optional(),
        eyebrow_fr: z.string().optional(),
        eyebrow_en: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        media_src: z.string(),
        media_alt_fr: z.string().optional(),
        media_alt_en: z.string().optional(),
        link_label_fr: z.string().optional(),
        link_label_en: z.string().optional(),
        link_href: z.string().optional(),
      }),
    )
    .min(2)
    .max(6),
});

export const schema = stickyScrollStorytellingSchema;
