// Waimia · Co-location DS (Wave #38, T1) · feuille partagée PURE
//
// Extrait UNE FOIS depuis `src/schemas/sections.ts` (rule 60 : déplacer, pas dupliquer).
// Contient les ENUMS de variation (couches NOW/COMPOSITION) + le mixin `sectionBaseSchema`
// + les sous-schemas de placement. FEUILLE PURE : 0 import vers sections.ts / registry
// (anti-cycle). `z` vient de `astro:content` (comme tout le reste du repo) pour que le
// build Astro ET le pattern de codegen (replace `astro:content` → zod réel) fonctionnent.

import { z } from 'astro:content';

/**
 * COUCHE ATOMIQUE : placement par élément (Vague C, décision Simon 2026-06-28).
 * UN SEUL objet `placement` OPTIONNEL, region-clé, ajouté au mixin de base → forme
 * IDENTIQUE sur toutes les sections (contrat prévisible pour le builder + MCP). Chaque
 * région porte le sous-ensemble pertinent d'atomes (align/justify/order/hideOn). Tous
 * optionnels : sans valeur, le composant rend exactement comme aujourd'hui (rétro-compat).
 * Résolution raccourci↔placement (0 double source) : le composant calcule la valeur
 * effective une fois (`placement?.header?.align ?? contentAlign ?? défaut`) et pose UN
 * seul data-attr par région. `contentAlign`/`actionsAlign` = sucre qui alimente `placement`.
 */
export const placementAlign = z.enum(['start', 'center', 'end']);
export const placementJustify = z.enum(['start', 'center', 'end', 'between']);
export const placementHide = z.enum(['none', 'mobile', 'desktop']);
export const regionPlacement = z
  .object({
    align: placementAlign.optional(), // align-self + text-align de la région
    justify: placementJustify.optional(), // justify-content d'un cluster (ex. groupe CTA)
    order: z.number().int().min(0).max(9).optional(), // réordonnancement dans le flux (CSS order)
    hideOn: placementHide.optional(), // visibilité responsive (display:none au breakpoint)
  })
  .optional();
export const placementSchema = z
  .object({
    header: regionPlacement, // kicker + titre + lede
    media: regionPlacement, // image/visuel/card
    body: regionPlacement, // items/contenu principal
    actions: regionPlacement, // groupe CTA
    aside: regionPlacement, // colonne/encart secondaire
  })
  .optional();

/* ─── Enums factorisés des couches NOW (contrat v2, tasks/wave-c-axes-standard.md) ───
 * Réutilisables et lisibles. Chaque enum = vocabulaire borné d'une couche du contrat,
 * mappé à un data-attr par le composant (moteur CSS section-layouts.css). Tous portés
 * par le mixin en `.optional()` : défaut = rendu actuel (rétro-compat, 0 instance cassée). */

// L7 — alignement parent (conteneur flex/grid) + cellule (niveau section/grille).
export const justifyContentEnum = z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']);
export const alignItemsEnum = z.enum(['start', 'center', 'end', 'stretch', 'baseline']);
export const justifyItemsEnum = z.enum(['start', 'center', 'end', 'stretch']);
export const alignContentEnum = z.enum(['start', 'center', 'end', 'between', 'stretch']);
export const cellAlignXEnum = z.enum(['start', 'center', 'end']);
export const cellAlignYEnum = z.enum(['top', 'middle', 'bottom', 'between']);
export const cellPadEnum = z.enum(['none', 'sm', 'base', 'lg']);
export const mediaFitEnum = z.enum(['cover', 'contain']);
export const mediaRatioEnum = z.enum(['auto', '1-1', '4-3', '3-2', '16-9']);

// L8 — états (interaction). `reveal`/`hover` ci-dessous étendent les enums déjà en place.
export const hoverEnum = z.enum([
  'none',
  'lift',
  'zoom',
  'glow',
  'border',
  'tint',
  'underline',
  'reveal-cta',
  'media-zoom',
]);
export const pressFeedbackEnum = z.enum(['none', 'press']);
export const focusRingEnum = z.enum(['auto', 'ring', 'inset', 'none']);
export const transitionSpeedEnum = z.enum(['instant', 'fast', 'base', 'slow']);
export const transitionEaseEnum = z.enum(['standard', 'out', 'spring']);
// L8 RÉSERVE (NEXT — onglets/accordéon) : figés au contrat dès maintenant.
export const selectedStateEnum = z.enum(['none', 'outline', 'fill', 'accent-edge']);
export const openStateEnum = z.enum(['auto']);

// L9 — motion / animation (tous gated prefers-reduced-motion par le moteur).
export const revealEnum = z.enum([
  'none',
  'fade',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'scale-in',
  'blur-in',
  'mask-up',
]);
export const revealDelayEnum = z.enum(['none', 'sm', 'md']);
export const loopEnum = z.enum(['none', 'marquee', 'pulse', 'float']);
export const scrollMotionEnum = z.enum(['none', 'parallax', 'pin', 'progress']);
export const textMotionEnum = z.enum(['none', 'word-stagger', 'count-up', 'type-on']);
export const motionSpeedEnum = z.enum(['fast', 'base', 'slow']);
export const motionEaseEnum = z.enum(['standard', 'out', 'spring']);
export const pageTransitionEnum = z.enum(['none', 'fade', 'slide']);

// L10bis — couleur multi-scope (rôles DS uniquement, contraste auto, rule 60).
export const cellBgEnum = z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'ink-2', 'ink-3', 'accent', 'none']);
export const cellToneEnum = z.enum(['ink', 'muted', 'accent', 'accent-text', 'paper']);
export const toneEnum = z.enum(['ink', 'muted', 'accent', 'accent-text', 'paper']);
export const borderToneEnum = z.enum(['hairline', 'hairline-strong', 'accent', 'none']);

// L11 — orientation + long-tail.
export const textFlowEnum = z.enum(['horizontal', 'vertical-rl', 'vertical-lr', 'sideways']);
export const textTransformEnum = z.enum(['none', 'uppercase', 'lowercase', 'capitalize']);
export const rotateEnum = z.enum(['none', '90', '-90', '180']);
export const objectPositionEnum = z.enum(['center', 'top', 'bottom', 'left', 'right']);
export const overflowEnum = z.enum(['visible', 'clip', 'auto']);
export const scrollSnapEnum = z.enum(['none', 'proximity', 'mandatory']);

// L6 — typo core.
export const measureEnum = z.enum(['prose', 'read', 'tight', 'wide', 'full']);
export const clampEnum = z.enum(['none', '1', '2', '3', '4']);

// L12 — sizing.
export const minHeightEnum = z.enum(['auto', 'half', 'screen']);
export const widthEnum = z.enum(['full', 'contained', 'narrow', 'prose']);

// L13 — a11y / sémantique (le héros gère h1 séparément).
export const headingLevelEnum = z.enum(['h2', 'h3']);

/* ─── COMPOSITION (axes de mise en COMPOSITION, contrat v2 — SYS v2-E) ───
 * Démultiplient l'espace combinatoire d'un archétype « collection » au-delà du seul
 * layout+couleur : en-tête (alignement + richesse), ligne d'intro au-dessus de la grille,
 * séparateurs de grille, richesse + média de carte, distribution de couleur entre cartes,
 * source de fond (couleur/image/gradient). Tous enum-bornés, optionnels (défaut = rendu
 * actuel), DS-driven. Le MOTEUR (section-layouts.css) les porte génériquement (réutilisables
 * par tout type de famille collection) ; chaque composant les rend. data-attr kebab-case. */
// En-tête : alignement du bloc header (gauche/centre/droite).
export const headerAlignEnum = z.enum(['left', 'center', 'right']);
// En-tête : richesse (combien d'éléments d'en-tête rendre).
export const headerKindEnum = z.enum([
  'none',
  'title',
  'eyebrow-title',
  'eyebrow-title-lede',
  'eyebrow-title-lede-cta',
]);
// Ligne d'intro AU-DESSUS de la grille (aucune / chapô + points / desc gauche + image droite / chapô centré).
export const introRowEnum = z.enum(['none', 'lede-aside', 'desc-media-split', 'lede-centered']);
// Séparateurs de grille (aucun / traits entre colonnes / traits entre lignes / quadrillage complet).
export const dividersEnum = z.enum(['none', 'column-rules', 'row-rules', 'grid-lines']);
// Richesse de carte (combien d'éléments par carte).
export const cardContentEnum = z.enum([
  'title',
  'title-desc',
  'icon-title-desc',
  'title-desc-meta',
  'media-title-desc',
]);
// Média de carte (aucun / icône / image en tête / image en FOND de carte avec scrim).
export const cardMediaEnum = z.enum(['none', 'icon', 'image', 'image-bg']);
// Alignement du contenu DANS la carte (gauche / centré).
export const cardAlignEnum = z.enum(['left', 'center']);
// Distribution de couleur entre cartes (uniforme / 1ʳᵉ vedette / 1 accent / alternée en cycle).
export const colorDistributionEnum = z.enum(['uniform', 'featured-first', 'one-accent', 'alternating']);
// Source de fond de SECTION (couleur DS / image placeholder + scrim / gradient preset).
export const bgSourceEnum = z.enum(['color', 'image', 'gradient']);

export const sectionBaseSchema = z.object({
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  layout: z.string().optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // Alignement du bloc header/contenu (data-content-align). Absent → start (rendu actuel).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Position du rang de CTA, INDÉPENDANTE du contenu (data-actions-align). Absent → suit contentAlign.
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  // Couche atomique : placement par région (Vague C). Optionnel, forme identique partout.
  placement: placementSchema,

  /* ─── Mixin de variation unique — les 6 couches (Pilier 2, système de production) ───
   * TOUS optionnels → 0 régression : sans valeur, le composant rend exactement comme
   * aujourd'hui. La LISTE des valeurs réellement supportées par un type vit dans
   * `capabilities` (section-archetypes.ts / registry), pas dans des enums divergents.
   * Le moteur CSS (section-layouts.css) lit les data-attrs correspondants. */

  // Couches 1-3 : layout + axes de grille / split.
  // `layout` (ci-dessus) reste un z.string() libre au niveau contrat ; capabilities cadre la liste.
  columns: z.enum(['auto', '1', '2', '3', '4', '5', '6']).optional(),
  colRatio: z.enum(['equal', '1-2', '2-1', '1-1-2', '2-3', 'golden']).optional(),
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  proportion: z.enum(['1-1', '1-2', '2-1', '2-3', '3-2']).optional(),
  mediaSide: z.enum(['left', 'right']).optional(),

  // Couche 4 : skin / surface (100 % tokens DS).
  surface: z.enum(['flat', 'outlined', 'filled', 'elevated', 'ghost']).optional(),
  divider: z.enum(['none', 'hairline', 'rule']).optional(),
  radius: z.enum(['none', 'sm', 'md', 'lg']).optional(),
  accentEdge: z.enum(['none', 'top', 'left']).optional(),

  // Couche 5 : responsive par breakpoint.
  colsMobile: z.enum(['auto', '1', '2', '3', '4']).optional(),
  colsTablet: z.enum(['auto', '1', '2', '3', '4']).optional(),
  layoutMobile: z.string().optional(),

  // Couche 6 : emphasis / typo + interaction.
  titleScale: z.enum(['sm', 'base', 'lg', 'xl']).optional(),
  eyebrow: z.enum(['none', 'kicker', 'badge']).optional(),

  /* ─── Contrat v2 — couches NOW (tasks/wave-c-axes-standard.md) ───
   * Tous `.optional()`, défaut = rendu actuel. Le moteur lit le data-attr correspondant
   * (mapping : nom de prop → data-attr kebab-case, ex. justifyContent→data-justify-content,
   * cellBg→data-cell-bg, hover→data-hover, textFlow→data-text-flow). La LISTE des valeurs
   * réellement câblées par un type vit dans `capabilities` (section-archetypes.ts), pas ici.
   * NOTE — overrides PAR ITEM (justifySelf/alignSelf/order/colSpan/rowSpan + items[].bg/tone)
   * = ajoutés dans CHAQUE schéma de type lors de la MIGRATION, pas dans ce mixin de base.
   * Le moteur CSS les supporte déjà. */

  // L7 — alignement parent (conteneur) + cellule (niveau section/grille).
  justifyContent: justifyContentEnum.optional(),
  alignItems: alignItemsEnum.optional(),
  justifyItems: justifyItemsEnum.optional(),
  alignContent: alignContentEnum.optional(),
  cellAlignX: cellAlignXEnum.optional(),
  cellAlignY: cellAlignYEnum.optional(),
  cellPad: cellPadEnum.optional(),
  mediaFit: mediaFitEnum.optional(),
  mediaRatio: mediaRatioEnum.optional(),

  // L8 — états (interaction). `reveal`/`hover` étendus (enums élargis vs v1).
  reveal: revealEnum.optional(),
  hover: hoverEnum.optional(),
  pressFeedback: pressFeedbackEnum.optional(),
  focusRing: focusRingEnum.optional(),
  transitionSpeed: transitionSpeedEnum.optional(),
  transitionEase: transitionEaseEnum.optional(),
  // L8 RÉSERVE (NEXT) — figés au contrat dès maintenant.
  selectedState: selectedStateEnum.optional(),
  openState: openStateEnum.optional(),

  // L9 — motion / animation.
  revealStagger: z.boolean().optional(),
  revealDelay: revealDelayEnum.optional(),
  loop: loopEnum.optional(),
  scrollMotion: scrollMotionEnum.optional(),
  textMotion: textMotionEnum.optional(),
  motionSpeed: motionSpeedEnum.optional(),
  motionEase: motionEaseEnum.optional(),
  pageTransition: pageTransitionEnum.optional(),

  // L10bis — couleur multi-scope (rôles DS, contraste auto).
  cellBg: cellBgEnum.optional(),
  cellTone: cellToneEnum.optional(),
  tone: toneEnum.optional(),
  borderTone: borderToneEnum.optional(),

  // L11 — orientation + long-tail.
  textFlow: textFlowEnum.optional(),
  textTransform: textTransformEnum.optional(),
  rotate: rotateEnum.optional(),
  objectPosition: objectPositionEnum.optional(),
  overflow: overflowEnum.optional(),
  scrollSnap: scrollSnapEnum.optional(),

  // L6 — typo core (titleScale/eyebrow déjà au-dessus ; weight/tracking/leading = NEXT).
  measure: measureEnum.optional(),
  balance: z.boolean().optional(),
  clamp: clampEnum.optional(),

  // L12 — sizing (`itemHeight` déjà déclaré couche 1 ci-dessus).
  minHeight: minHeightEnum.optional(),
  width: widthEnum.optional(),

  // L13 — a11y / sémantique.
  headingLevel: headingLevelEnum.optional(),
  ariaLabel: z.string().optional(),

  /* ─── COMPOSITION (SYS v2-E) — axes de mise en composition d'une collection.
   * Démultiplient l'espace au-delà de layout+couleur (en-tête, ligne d'intro, séparateurs,
   * richesse + média de carte, distribution de couleur, source de fond). Tous optionnels →
   * défaut = rendu actuel. Le moteur lit le data-attr kebab-case correspondant. */
  headerAlign: headerAlignEnum.optional(), // data-header-align (sur le header)
  headerKind: headerKindEnum.optional(), // richesse d'en-tête (rendu +/- d'éléments)
  introRow: introRowEnum.optional(), // ligne au-dessus de la grille → data-intro-row
  dividers: dividersEnum.optional(), // séparateurs de grille → data-dividers
  cardContent: cardContentEnum.optional(), // richesse de carte (rendu +/- d'éléments)
  cardMedia: cardMediaEnum.optional(), // média de carte → data-card-media (image-bg = fond)
  cardAlign: cardAlignEnum.optional(), // alignement intra-carte → data-card-align
  colorDistribution: colorDistributionEnum.optional(), // distribution couleur → data-color-distribution
  bgSource: bgSourceEnum.optional(), // source de fond section → data-bg-source
  // Source image de SECTION (placeholder editorial, remplaçable CMS) — JAMAIS d'URL en dur
  // dans le CSS : le composant pose --sec-bg-image inline depuis cette donnée.
  bgImage: z.string().optional(),
});
