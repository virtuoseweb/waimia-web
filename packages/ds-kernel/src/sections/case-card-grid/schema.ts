// Waimia · Co-location DS (Wave #38, T5) · module `case-card-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('case-card-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C scale — Batch 2). Câblés réellement via data-*. Tous
  // optionnels → défaut = rendu actuel (table éditoriale en lignes).
  //  - layout : RECETTE de mise en page. Cette section est une TABLE de lignes : on NE ment
  //    PAS avec bento. Sous-ensemble honnête :
  //      rows-divided : table éditoriale (lignes + hairline). = rendu actuel, défaut implicite.
  //      list         : lignes empilées SANS hairline supérieur (rythme par l'espacement seul).
  //      grid-uniform : passe les cas en CARTES en grille N colonnes égales (columns).
  //      grid-asym    : cartes en grille de largeurs différentes via colRatio.
  layout: z
    .enum(['rows-divided', 'list', 'grid-uniform', 'grid-asym'])
    .optional(),
  //  - columns : nb de colonnes pour layout='grid-uniform' (auto|2|3|4). Ignoré par rows/list.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - colRatio : largeurs de colonnes, UNIQUEMENT pour layout='grid-asym'. Ignoré ailleurs.
  colRatio: z.enum(['equal', '1-2', '2-1', '1-1-2', '2-3']).optional(),
  //  - itemHeight : hauteur des cartes en mode grille (auto|even|square|video). Ignoré en table.
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  //  - density : rythme du header + padding des lignes (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - contentAlign : alignement du header (titre + ligne spec). start (défaut) | center | end.
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  //  - reveal_mode : enrichissement DESKTOP (pointeur fin + >=768px) inspiré de `hover-reveal-list`.
  //    Optionnel → défaut = table éditoriale actuelle, 0 markup actif. Si défini ET qu'au moins un
  //    cas porte `media_src`, au survol d'une ligne son titre passe en accent et un cadre flottant
  //    révèle l'illustration du cas. 'cursor' : l'image suit le curseur. 'fixed' : cadre centré, fondu.
  //    Tactile / mobile : aucun effet ni vignette inline (la table dense reste inchangée).
  reveal_mode: z.enum(['cursor', 'fixed']).optional(),
  // Couche atomique (Batch 2) : placement par région (header + body + actions=lien « tous »).
  placement: placementSchema,
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  case_label_fr: z.string().default('CASE'),
  case_label_en: z.string().default('CASE'),
  sector_label_fr: z.string().default('Secteur'),
  sector_label_en: z.string().default('Sector'),
  impact_label_fr: z.string().default('Impact'),
  impact_label_en: z.string().default('Impact'),
  // caseRefs : résolution GLOBAL via la collection `cases` (slugs). Optionnel → si
  // présent, le composant fait getCollection('cases') filtré par slug et mappe les
  // champs ; sinon il retombe sur `cases` inline (rétrocompat, 0 régression).
  caseRefs: z.array(z.string()).optional(),
  cases: z
    .array(
      z.object({
        client: z.string(),
        sector_fr: z.string(),
        sector_en: z.string(),
        duration: z.string(),
        stack: z.string(),
        impact_fr: z.string(),
        impact_en: z.string(),
        href: z.string(),
        // Média du reveal desktop : illustration révélée au survol de la ligne. Optionnels →
        // absents = ligne sans reveal (rétrocompat). N'a d'effet que si `reveal_mode` est défini.
        media_src: z.string().optional(),
        media_alt_fr: z.string().optional(),
        media_alt_en: z.string().optional(),
      }),
    )
    .max(6)
    .default([]),
  all_label_fr: z.string().optional(),
  all_label_en: z.string().optional(),
  all_href: z.string().optional(),
  // État vide honnête (GAP-B) : si < 2 cas (ou 0), la grille affiche un encart
  // « premiers cas en cours de rédaction » au lieu d'une table famélique. Texte
  // surchargeable par le consommateur, défauts honnêtes sinon.
  empty_kicker_fr: z.string().optional(),
  empty_kicker_en: z.string().optional(),
  empty_body_fr: z.string().optional(),
  empty_body_en: z.string().optional(),
});
