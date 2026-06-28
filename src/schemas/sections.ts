// Waimia · Section schemas V2 (2026-05-15)
// Composable architecture — discriminated union de tous les types de section data-driven.
// Cf docs/15-STRATEGIC-AUDIT.md Tier 2 + docs/16-EXECUTION-TRACKER.md T2.1
//
// Pattern : chaque page = `sections: Section[]`. Le renderer mappe `type` → composant Astro.
// Ajouter une nouvelle section = (1) ajouter schema ici, (2) créer composant, (3) inscrire dans registry.

import { z } from 'astro:content';

/* ─── Sous-schémas réutilisables ─── */

/**
 * Mixin de présentation transverse (Phase B · système de variation, cf docs/46).
 * Axes orthogonaux partagés par les composants-familles paramétrables. On l'applique
 * via `.extend(sectionBaseSchema.shape)` (les champs ajoutés sont tous optionnels →
 * 0 régression : un schema sans valeur garde son rendu par défaut).
 *  - background : déclinaison palette (idiome `data-bg`, déjà consolidé A1).
 *  - layout     : id d'un preset de grille (cf src/styles/layouts.css → var --sec-grid).
 *  - density    : cran de rythme vertical (mappe sur la famille --section-*).
 * `effects` viendra dans une phase ultérieure (NE PAS introduire avant que layout+density
 * soient prouvés sur la famille hero).
 */
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
const placementAlign = z.enum(['start', 'center', 'end']);
const placementJustify = z.enum(['start', 'center', 'end', 'between']);
const placementHide = z.enum(['none', 'mobile', 'desktop']);
const regionPlacement = z
  .object({
    align: placementAlign.optional(), // align-self + text-align de la région
    justify: placementJustify.optional(), // justify-content d'un cluster (ex. groupe CTA)
    order: z.number().int().min(0).max(9).optional(), // réordonnancement dans le flux (CSS order)
    hideOn: placementHide.optional(), // visibilité responsive (display:none au breakpoint)
  })
  .optional();
const placementSchema = z
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
const justifyContentEnum = z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']);
const alignItemsEnum = z.enum(['start', 'center', 'end', 'stretch', 'baseline']);
const justifyItemsEnum = z.enum(['start', 'center', 'end', 'stretch']);
const alignContentEnum = z.enum(['start', 'center', 'end', 'between', 'stretch']);
const cellAlignXEnum = z.enum(['start', 'center', 'end']);
const cellAlignYEnum = z.enum(['top', 'middle', 'bottom', 'between']);
const cellPadEnum = z.enum(['none', 'sm', 'base', 'lg']);
const mediaFitEnum = z.enum(['cover', 'contain']);
const mediaRatioEnum = z.enum(['auto', '1-1', '4-3', '3-2', '16-9']);

// L8 — états (interaction). `reveal`/`hover` ci-dessous étendent les enums déjà en place.
const hoverEnum = z.enum([
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
const pressFeedbackEnum = z.enum(['none', 'press']);
const focusRingEnum = z.enum(['auto', 'ring', 'inset', 'none']);
const transitionSpeedEnum = z.enum(['instant', 'fast', 'base', 'slow']);
const transitionEaseEnum = z.enum(['standard', 'out', 'spring']);
// L8 RÉSERVE (NEXT — onglets/accordéon) : figés au contrat dès maintenant.
const selectedStateEnum = z.enum(['none', 'outline', 'fill', 'accent-edge']);
const openStateEnum = z.enum(['auto']);

// L9 — motion / animation (tous gated prefers-reduced-motion par le moteur).
const revealEnum = z.enum([
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
const revealDelayEnum = z.enum(['none', 'sm', 'md']);
const loopEnum = z.enum(['none', 'marquee', 'pulse', 'float']);
const scrollMotionEnum = z.enum(['none', 'parallax', 'pin', 'progress']);
const textMotionEnum = z.enum(['none', 'word-stagger', 'count-up', 'type-on']);
const motionSpeedEnum = z.enum(['fast', 'base', 'slow']);
const motionEaseEnum = z.enum(['standard', 'out', 'spring']);
const pageTransitionEnum = z.enum(['none', 'fade', 'slide']);

// L10bis — couleur multi-scope (rôles DS uniquement, contraste auto, rule 60).
const cellBgEnum = z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'ink-2', 'ink-3', 'accent', 'none']);
const cellToneEnum = z.enum(['ink', 'muted', 'accent', 'accent-text', 'paper']);
const toneEnum = z.enum(['ink', 'muted', 'accent', 'accent-text', 'paper']);
const borderToneEnum = z.enum(['hairline', 'hairline-strong', 'accent', 'none']);

// L11 — orientation + long-tail.
const textFlowEnum = z.enum(['horizontal', 'vertical-rl', 'vertical-lr', 'sideways']);
const textTransformEnum = z.enum(['none', 'uppercase', 'lowercase', 'capitalize']);
const rotateEnum = z.enum(['none', '90', '-90', '180']);
const objectPositionEnum = z.enum(['center', 'top', 'bottom', 'left', 'right']);
const overflowEnum = z.enum(['visible', 'clip', 'auto']);
const scrollSnapEnum = z.enum(['none', 'proximity', 'mandatory']);

// L6 — typo core.
const measureEnum = z.enum(['prose', 'read', 'tight', 'wide', 'full']);
const clampEnum = z.enum(['none', '1', '2', '3', '4']);

// L12 — sizing.
const minHeightEnum = z.enum(['auto', 'half', 'screen']);
const widthEnum = z.enum(['full', 'contained', 'narrow', 'prose']);

// L13 — a11y / sémantique (le héros gère h1 séparément).
const headingLevelEnum = z.enum(['h2', 'h3']);

/* ─── COMPOSITION (axes de mise en COMPOSITION, contrat v2 — SYS v2-E) ───
 * Démultiplient l'espace combinatoire d'un archétype « collection » au-delà du seul
 * layout+couleur : en-tête (alignement + richesse), ligne d'intro au-dessus de la grille,
 * séparateurs de grille, richesse + média de carte, distribution de couleur entre cartes,
 * source de fond (couleur/image/gradient). Tous enum-bornés, optionnels (défaut = rendu
 * actuel), DS-driven. Le MOTEUR (section-layouts.css) les porte génériquement (réutilisables
 * par tout type de famille collection) ; chaque composant les rend. data-attr kebab-case. */
// En-tête : alignement du bloc header (gauche/centre/droite).
const headerAlignEnum = z.enum(['left', 'center', 'right']);
// En-tête : richesse (combien d'éléments d'en-tête rendre).
const headerKindEnum = z.enum([
  'none',
  'title',
  'eyebrow-title',
  'eyebrow-title-lede',
  'eyebrow-title-lede-cta',
]);
// Ligne d'intro AU-DESSUS de la grille (aucune / chapô + points / desc gauche + image droite / chapô centré).
const introRowEnum = z.enum(['none', 'lede-aside', 'desc-media-split', 'lede-centered']);
// Séparateurs de grille (aucun / traits entre colonnes / traits entre lignes / quadrillage complet).
const dividersEnum = z.enum(['none', 'column-rules', 'row-rules', 'grid-lines']);
// Richesse de carte (combien d'éléments par carte).
const cardContentEnum = z.enum([
  'title',
  'title-desc',
  'icon-title-desc',
  'title-desc-meta',
  'media-title-desc',
]);
// Média de carte (aucun / icône / image en tête / image en FOND de carte avec scrim).
const cardMediaEnum = z.enum(['none', 'icon', 'image', 'image-bg']);
// Alignement du contenu DANS la carte (gauche / centré).
const cardAlignEnum = z.enum(['left', 'center']);
// Distribution de couleur entre cartes (uniforme / 1ʳᵉ vedette / 1 accent / alternée en cycle).
const colorDistributionEnum = z.enum(['uniform', 'featured-first', 'one-accent', 'alternating']);
// Source de fond de SECTION (couleur DS / image placeholder + scrim / gradient preset).
const bgSourceEnum = z.enum(['color', 'image', 'gradient']);

const sectionBaseSchema = z.object({
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

const bilingualString = z.object({
  fr: z.string(),
  en: z.string(),
});

const ctaSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'accent', 'ghost', 'ghost-dark', 'terminal']).default('primary'),
  mag: z.number().min(0).max(1).optional(),
});

const metricSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  emphasis: z.boolean().default(false),
});

const featureItemSchema = z.object({
  icon: z.string().optional(), // SVG name dans components/svg
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  // ─── Overrides PAR ITEM (couches L10bis + L7-enfant), tous optionnels, défaut = hérite
  //     du réglage de section. Lus par le composant FeatureGrid → data-* sur la carte
  //     (.sec-item). Le moteur (section-layouts.css) fournit le contraste auto + le span.
  bg: cellBgEnum.optional(), // fond de cellule → data-cell-bg (contraste auto par le moteur)
  tone: toneEnum.optional(), // couleur de premier plan → data-tone
  cellAlignY: cellAlignYEnum.optional(), // distribution verticale → data-cell-y (between = CTA en bas)
  colSpan: z.enum(['1', '2', '3', '4']).optional(), // span de colonnes → data-col-span
  // ─── COMPOSITION par carte (SYS v2-E), optionnels, défaut = non rendu (rendu actuel) :
  //     meta = petite ligne (cardContent=title-desc-meta) ; media = chemin image placeholder
  //     editorial (cardMedia=image|image-bg), remplaçable CMS, JAMAIS d'URL en dur dans le CSS.
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  media: z.string().optional(),
  // CTA optionnel par carte (active les états reveal-cta / cellAlignY=between côté démo).
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});

const stepSchema = z.object({
  num: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  duration_fr: z.string().optional(),
});

const faqItemSchema = z.object({
  q_fr: z.string(),
  q_en: z.string(),
  a_fr: z.string(),
  a_en: z.string(),
});

const pricingTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

const testimonialSchema = z.object({
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

const comparisonRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  values: z.array(z.union([z.string(), z.boolean()])),
});

const timelineEventSchema = z.object({
  date: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

/* ─── Section schemas (20 types) ─── */

// HERO variants
export const heroSplitSchema = z.object({
  type: z.literal('hero-split'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema (Phase B, docs/46).
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  right_block: z
    .object({
      kind: z.enum(['mini-map', 'workflow-svg', 'stats', 'image', 'mockup-terminal']),
      data: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
});

// Héro « Split média » full-viewport (pilote X2) : 2 colonnes texte | carte média
// line-art, badges pills, paper+ink. Props-driven, distinct de hero-split.
export const heroSplitMediaSchema = z.object({
  type: z.literal('hero-split-media'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  // Tagline optionnelle sous le titre (registre intermédiaire h1/lede).
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  // Kicker secondaire optionnel (mono uppercase) annonçant la définition,
  // placé sous le subtitle et au-dessus du lede (= paragraphe de définition).
  definition_kicker_fr: z.string().optional(),
  definition_kicker_en: z.string().optional(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
});

// Héro « Masthead + KPI 2×2 » full-viewport (X1) : bande masthead 4-col (fil d'Ariane +
// meta mono) + titre serif accent + rangée 2-col (lede/CTA | KPI 2×2). Pas de média. paper+ink.
export const heroEditorialMastheadSchema = z.object({
  type: z.literal('hero-editorial-masthead'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  breadcrumb: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), href: z.string().optional() }))
    .max(4),
  meta: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(3)
    .optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(4),
});

// Héro « Grille multi-lignes asymétrique » full-viewport (X3) : titre pleine largeur,
// rangée 2-col (label+lede+CTA | label+bullets ›), bande 4-KPI dont la dernière cellule
// est inversée ink (relève dans les 2 modes). paper+ink.
export const heroAsymmetricGridSchema = z.object({
  type: z.literal('hero-asymmetric-grid'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  h1_fr: z.string(),
  h1_en: z.string(),
  label_left_fr: z.string().optional(),
  label_left_en: z.string().optional(),
  label_right_fr: z.string().optional(),
  label_right_en: z.string().optional(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  bullets: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(6),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(4),
});

// === Bande masthead autonome (chrome) ===
// Bande de chrome haut = fil d'Ariane intégré au masthead éditorial, posée sous le header
// fixe, au-dessus du hero. Compose MastheadRow (molécule) avec la prop `breadcrumb`.
export const mastheadBarSchema = z.object({
  type: z.literal('masthead-bar'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  breadcrumb: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), href: z.string().optional() }))
    .min(1)
    .max(5),
  locations_fr: z.string().optional(),
  locations_en: z.string().optional(),
  status_fr: z.string().optional(),
  status_en: z.string().optional(),
});

// === Fil d'Ariane classic (chrome) — modèle « classic » de la catégorie breadcrumb ===
// Barre de fil d'Ariane standard (ol mono uppercase), posée sous le header fixe.
// Compose la molécule Breadcrumb. Modèle sobre à côté de l'éditorial `masthead-bar`.
export const breadcrumbBarSchema = z.object({
  type: z.literal('breadcrumb-bar'),
  ...sectionBaseSchema.shape,
  breadcrumb: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), href: z.string().optional() }))
    .min(1)
    .max(5),
});

// === Famille héros explore-2 (Z1–Z9) : contenu pur, SANS MastheadRow embarqué ===
// Le breadcrumb/chrome vit désormais dans `masthead-bar` (composant autonome au-dessus).

// Z1 · « Édition 65/35 · rail KPI serif » : grille asymétrique ~63/37, rail droit = 3 KPI serif.
export const heroEditorialKpiSchema = z.object({
  type: z.literal('hero-editorial-kpi'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(3),
});

// Z2 · « Promesse 60/40 · mini-map capacités » : rail droit = mini-map 6 territoires (2 col).
export const heroScopeMinimapSchema = z.object({
  type: z.literal('hero-scope-minimap'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  minimap: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), items_fr: z.string(), items_en: z.string() }))
    .length(6),
});

// Z3 · « Asymétrie 72/28 · rail média mince » : rail droit = média line-art vertical mince.
export const heroThinMediaSchema = z.object({
  type: z.literal('hero-thin-media'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
});

// Z4 · « Tech-grid 68/32 · signature dominante » : rail droit = 2 grands numéraux serif.
export const heroTechSignatureSchema = z.object({
  type: z.literal('hero-tech-signature'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(2),
});

// Z5 · « Tri-zone asymétrique » : titre pleine largeur + 3 zones (lede/CTA · mini-map · 2 KPI).
export const heroTrizoneSchema = z.object({
  type: z.literal('hero-trizone'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  minimap: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), items_fr: z.string(), items_en: z.string() }))
    .length(6),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(2),
});

// Z6 · « Cover 60/40 · grand numéral » : rail droit = un grand numéral éditorial + caption + sous-stat.
export const heroNumeralCoverSchema = z.object({
  type: z.literal('hero-numeral-cover'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  numeral_value: z.string(),
  numeral_cap_fr: z.string(),
  numeral_cap_en: z.string(),
  numeral_sub_fr: z.string().optional(),
  numeral_sub_en: z.string().optional(),
});

// Z7 · « Masthead 64/36 · carte média ink réduite » : rail droit = carte média ink + 2 micro-KPI.
export const heroMastheadCardSchema = z.object({
  type: z.literal('hero-masthead-card'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .max(2)
    .optional(),
});

// Statement éditorial pleine largeur : carte ink qui s'étend de 80% à 100% au scroll, média globe filaire. Concept/définition posé sous un hero.
export const statementOrbitSchema = z.object({
  type: z.literal('statement-orbit'),
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta: ctaSchema.optional(),
  media_src: z.string(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
});

// Z8 · « Bandeau capacités asymétrique » : titre + lede left, puis bande 4 capacités + 1 KPI accent.
export const heroCapabilityBandSchema = z.object({
  type: z.literal('hero-capability-band'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  capabilities: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), items_fr: z.string(), items_en: z.string() }))
    .length(4),
  kpi: z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }),
});

// Z9 · « Magazine 70/30 · colonne sommaire » : rail droit = sommaire typographique de 3 entrées.
export const heroSummaryRailSchema = z.object({
  type: z.literal('hero-summary-rail'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_sub_fr: z.string().optional(),
  cta_sub_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  summary: z
    .array(z.object({ tag_fr: z.string(), tag_en: z.string(), title_fr: z.string(), title_en: z.string(), sub_fr: z.string(), sub_en: z.string() }))
    .length(3),
});

// Héro « Centré + bande capacités ink » full-viewport (X4) : bloc centré (kicker, titre
// serif accent, lede, 2 CTA) + bande ink pleine largeur de 4 cellules capacités (label
// mono accent + desc), sombre dans les 2 modes. paper+ink.
export const heroCenteredBandSchema = z.object({
  type: z.literal('hero-centered-band'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  caps: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), desc_fr: z.string(), desc_en: z.string() }))
    .max(4),
});

// Héro « Médaillon média + KPI verticaux » full-viewport (X5) : 2 colonnes texte | médaillon
// line-art surmontant des KPI hairline. paper+ink.
export const heroMediaMedallionSchema = z.object({
  type: z.literal('hero-media-medallion'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .max(4)
    .optional(),
});

// Héro « Baseline stats » full-viewport (X6) : titre serif géant + lede, rangée 4-KPI en
// baseline (hairline forte). CTA optionnel, pas de média. paper+ink.
export const heroBaselineStatsSchema = z.object({
  type: z.literal('hero-baseline-stats'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(4),
  cta_primary: ctaSchema.optional(),
  cta_secondary: ctaSchema.optional(),
});

// Héro « Grille 12 colonnes éditoriale » full-viewport (X7) : kicker+sigle, titre serif 9-col,
// lede/puces/CTA répartis sur la dernière rangée (hairlines). paper+ink.
export const heroGrid12Schema = z.object({
  type: z.literal('hero-grid-12'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  sigil: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  bullets: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(4)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
});

// Héro « Carte cover ink » full-viewport (X8) : 2 colonnes texte | carte ink sombre (média
// line-art + mini-KPI), carte sombre même en mode paper. paper+ink.
export const heroCardCoverSchema = z.object({
  type: z.literal('hero-card-cover'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .max(2)
    .optional(),
});

// Héro « Stack rhythm » full-viewport (X9) : colonne unique resserrée au rythme vertical
// généreux (fil d'Ariane, kicker, titre, lede, badges inline, 2 CTA, bande 4-KPI). paper+ink.
export const heroStackRhythmSchema = z.object({
  type: z.literal('hero-stack-rhythm'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  breadcrumb: z
    .array(z.object({ label_fr: z.string(), label_en: z.string(), href: z.string().optional() }))
    .max(4)
    .optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  badges: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(5)
    .optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  kpis: z
    .array(z.object({ num: z.string(), cap_fr: z.string(), cap_en: z.string() }))
    .length(4)
    .optional(),
});

// Héro « Couverture magazine » full-viewport (X10) : bande masthead mono 4-col, titre serif
// géant centré, règle accent, tagline display italic, 1 seul CTA centré. paper+ink.
export const heroMagazineCoverSchema = z.object({
  type: z.literal('hero-magazine-cover'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema.
  ...sectionBaseSchema.shape,
  masthead: z
    .array(z.object({ label_fr: z.string(), label_en: z.string() }))
    .max(4)
    .optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  tagline_fr: z.string(),
  tagline_en: z.string(),
  cta_primary: ctaSchema,
});

export const heroCenteredSchema = z.object({
  type: z.literal('hero-centered'),
  // background/layout/density mutualisés via le mixin sectionBaseSchema (Phase B, docs/46).
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
});

export const heroFullBleedSchema = z.object({
  type: z.literal('hero-full-bleed'),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  background_kind: z.enum(['liquid-canvas', 'gradient-mesh', 'signature-grid', 'ink-paper']),
  cta_primary: ctaSchema.optional(),
});

// Hero · listing de hub (masthead éditorial, h1 monumental, 0 CTA)
export const heroHubListingSchema = z.object({
  type: z.literal('hero-hub-listing'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  decoration: z.boolean().default(false),
});

// Hero · détail d'un service (kicker § Service N.M, lede + proof-bar optionnelle)
export const heroServiceDetailSchema = z.object({
  type: z.literal('hero-service-detail'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  metrics: z.array(metricSchema).min(2).max(4).optional(),
});

// Hero · page pilier / hub (h1 le plus monumental, stats-grid 4-col optionnelle)
export const heroPillarHubSchema = z.object({
  type: z.literal('hero-pillar-hub'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  meta_kicker_fr: z.string(),
  meta_kicker_en: z.string(),
  hub_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats: z.array(metricSchema).min(2).max(4).optional(),
});

// Hero · étude de cas (kicker § Case N, h1 + SVG déco géométrique top-right)
export const heroCaseStudySchema = z.object({
  type: z.literal('hero-case-study'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  case_num: z.string(),
  eyebrow_fr: z.string().default('§ Cas client'),
  eyebrow_en: z.string().default('§ Case study'),
  h1_fr: z.string(),
  h1_en: z.string(),
  specs: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
      }),
    )
    .min(2)
    .max(6)
    .optional(),
});

// Hero · home Waimia (réservé `/` et `/en/`) · mini-map 6 territoires + 3 preuves verticales
export const heroHomeSchema = z.object({
  type: z.literal('hero-home'),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  minimap: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        items_fr: z.string(),
        items_en: z.string(),
      }),
    )
    .length(6),
  proofs: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .length(3),
  cta_primary_fr: z.string(),
  cta_primary_en: z.string(),
  cta_secondary_fr: z.string(),
  cta_secondary_en: z.string(),
  cta_sub_fr: z.string(),
  cta_sub_en: z.string(),
  cta_href: z.string().optional(),
  offer_href: z.string().optional(),
});

// Hero · landing magnétique · eyebrow + h1 italic + 2 CTA + dispo
export const heroLandingSchema = z.object({
  type: z.literal('hero-landing'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string(),
  eyebrow_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  availability_fr: z.string().optional(),
  availability_en: z.string().optional(),
});

// Hero · solutions par problème (solutions/index) · masthead SVG rect rotated 12° + h1 monumental
export const heroProblemIndexSchema = z.object({
  type: z.literal('hero-problem-index'),
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

// Hero · cas client par secteur (SolutionsDetailTemplate) · dept + h1 + lead italique + CTA + tags
export const heroSectorSchema = z.object({
  type: z.literal('hero-sector'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  hero_variant: z.enum(['equilibre', 'showcase', 'encadre']).optional(),
  dept_fr: z.string(),
  dept_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  tags: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(8)
    .optional(),
});

// Hero · masthead générique utilitaire (about / méthode / academy) · kicker + h1 + lede + align
export const heroUtilityMastheadSchema = z.object({
  type: z.literal('hero-utility-masthead'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  align: z.enum(['left', 'centered']).default('left'),
});

// Hero · hub académie (EcoleHubTemplate) · kicker mono + h1 + lede + bande stats
export const heroAcademyHubSchema = z.object({
  type: z.literal('hero-academy-hub'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats_label_fr: z.string().optional(),
  stats_label_en: z.string().optional(),
});

// Hero · masthead mutualisé pour pages d'index hub (offres/cas-clients/secteurs/technologies)
// variant 'hub' (défaut) = style hub masthead original
// variant 'listing' = style hero-hub-listing (deco SVG optionnelle)
// variant 'detail' = style hero-utility (kicker optionnel, align gauche|centré)
export const heroHubMastheadSchema = z.object({
  type: z.literal('hero-hub-masthead'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  variant: z.enum(['hub', 'listing', 'detail']).default('hub'),
  decoration: z.boolean().default(false),
  align: z.enum(['left', 'centered']).default('left'),
  scale: z.enum(['monumental', 'standard']).optional(),
  transition_id: z.string().optional(),
  role_fr: z.string().optional(),
  role_en: z.string().optional(),
});

// Trust/legal pages : masthead documentaire + TOC sticky gauche.
export const trustLegalSectionSchema = z.object({
  type: z.literal('trust-legal-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  revised_at: z.string(),
  version: z.string().optional(),
  legal_footer_fr: z.string().optional(),
  legal_footer_en: z.string().optional(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// Welcome confirmation : checkmark, confirmation copy, next steps and back link.
export const welcomeSectionSchema = z.object({
  type: z.literal('welcome-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  next_steps: z
    .array(
      z.object({
        num: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      }),
    )
    .min(1)
    .max(3),
  back_label_fr: z.string().optional(),
  back_label_en: z.string().optional(),
  back_href: z.string().optional(),
});

// Listing/index pages : masthead + optional filters + list body + optional footer.
export const listIndexSectionSchema = z.object({
  type: z.literal('list-index-section'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  filters_html_fr: z.string().optional(),
  filters_html_en: z.string().optional(),
  list_html_fr: z.string().optional(),
  list_html_en: z.string().optional(),
  footer_html_fr: z.string().optional(),
  footer_html_en: z.string().optional(),
});

// Hero · détail d'une offre (OffresDetailTemplate) · cercles concentriques + tier + h1 + lead + CTA
export const heroOfferDetailSchema = z.object({
  type: z.literal('hero-offer-detail'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  hero_variant: z.enum(['equilibre', 'showcase', 'encadre']).optional(),
  breadcrumb_label_fr: z.string().optional(),
  breadcrumb_label_en: z.string().optional(),
  breadcrumb_href: z.string().optional(),
  tier_fr: z.string(),
  tier_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  tags: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(8)
    .optional(),
});

// Hero · couche technologique (TechnologiesDetailTemplate) · triangles SVG + layer badge + h1 + lead + CTA
export const heroTechLayerSchema = z.object({
  type: z.literal('hero-tech-layer'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  layer_type: z.enum(['claude', 'os', 'orch']).default('claude'),
  layer_label_fr: z.string(),
  layer_label_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta: ctaSchema,
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
});

// Hero · entonnoir conversion flagship (ConversionFunnelTemplate) · meta pills + benefits + proof + 2 CTA + stats
export const heroConversionFunnelSchema = z.object({
  type: z.literal('hero-conversion-funnel'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  funnel_num: z.string(),
  // Traitement visuel du hero. Absent = rendu catalogue d'origine (1 colonne),
  // inchangé : protège hero-hub-stats/hero-pillar-hub et tout usage existant.
  //  · split   = 2 colonnes asym (texte | illustration line-art, via media_src)
  //  · sumie    = fond ink pleine largeur, motif line-art dessiné au scroll, h1 split-letter
  //  · minimal  = h1 centré, stats en ligne, visuel discret, hauteur réduite
  variant: z.enum(['split', 'sumie', 'minimal']).optional(),
  // Illustration latérale (variant split) : line-art DS sous /images/line-art/.
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  // Registre du média (variant split) — axe Variante orthogonal au squelette 2-col :
  //  · lineart   = grammaire DS (diagramme/trait posé dans un cadre paper-2, currentColor)
  //  · editorial = illustration recolorée ink/paper qui couvre la coque
  // Absent → `lineart` (défaut comportemental), rétrocompat des usages existants.
  media_register: z.enum(['lineart', 'editorial']).optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  meta_pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(6)
    .optional(),
  benefits: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(8)
    .optional(),
  proof_fr: z.string().optional(),
  proof_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(4)
    .optional(),
});

// Hero · hub avec stats (HubTemplate) · meta_kicker + num + h1 maximal + lede + KeyMetric grid 4-col
export const heroHubStatsSchema = z.object({
  type: z.literal('hero-hub-stats'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  meta_kicker_fr: z.string(),
  meta_kicker_en: z.string(),
  hub_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        emphasis: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(4)
    .optional(),
});

// Hero · masthead service (ServiceDetailTemplate) · kicker § Service N + h1 + lede sobre
export const heroServiceMastheadSchema = z.object({
  type: z.literal('hero-service-masthead'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  service_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · menu détail (DetailMenuTemplate) · parent kicker + num accent + h1 + lede sobre
export const heroDetailMenuSchema = z.object({
  type: z.literal('hero-detail-menu'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  parent_kicker_fr: z.string(),
  parent_kicker_en: z.string(),
  detail_num: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · page auteur (AuthorPageTemplate) · breadcrumb équipe + role eyebrow + h1 split lead+accent + lede + portrait
export const heroAuthorSchema = z.object({
  type: z.literal('hero-author'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  team_label_fr: z.string().optional(),
  team_label_en: z.string().optional(),
  team_href: z.string().optional(),
  name: z.string(),
  name_lead: z.string(),
  name_accent: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · lead magnet (LeadMagnetTemplate) · 2-col texte/cover + meta + download card
export const heroLeadMagnetSchema = z.object({
  type: z.literal('hero-lead-magnet'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  format_fr: z.string(),
  format_en: z.string(),
  published_at: z.string(),
  cover_url: z.string().optional(),
  download_label_fr: z.string().default('PDF gratuit · sur inscription'),
  download_label_en: z.string().default('Free PDF · on signup'),
  cta_label_fr: z.string(),
  cta_label_en: z.string(),
  cta_href: z.string().optional(),
});

// Hero · cours/formation (CourseDetailTemplate) · kicker + title + lede + meta-pills + cta-group
export const heroCourseSchema = z.object({
  type: z.literal('hero-course'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  type_label_fr: z.string(),
  type_label_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        variant: z.enum(['default', 'accent', 'price']).default('default'),
      }),
    )
    .min(1)
    .max(8),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
});

// Hero · étape tunnel (TunnelStepTemplate) · kicker + progress bar [NN] + h1 (hero ou section) + lede
export const heroTunnelStepSchema = z.object({
  type: z.literal('hero-tunnel-step'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  step: z.number().int().min(1),
  progress_total: z.number().int().min(1).max(12),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Hero · étape tunnel V2 — kicker calculé depuis offre_label+step+progress_total (TunnelStepTemplate)
export const tunnelStepHeroSchema = z.object({
  type: z.literal('tunnel-step-hero'),
  offre_label: z.string(),
  step: z.number().int().min(1),
  progress_total: z.number().int().min(1),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
});

// Nav · étape tunnel — prev + cta + meta (TunnelStepTemplate footer)
export const tunnelStepNavSchema = z.object({
  type: z.literal('tunnel-step-nav'),
  prev_href: z.string().optional(),
  prev_label_fr: z.string().default('← Étape précédente'),
  prev_label_en: z.string().default('← Previous step'),
  cta: z.object({
    label_fr: z.string(),
    label_en: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'accent', 'ghost']).default('primary'),
  }),
  reading_fr: z.string().default('Temps de lecture : 2 min'),
  reading_en: z.string().default('2 min read'),
  back_href: z.string(),
  back_label: z.string(),
});

// Bandeau marquee mono uppercase infini scroll (avec respect prefers-reduced-motion)
export const marqueeBandSchema = z.object({
  type: z.literal('marquee-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  items_fr: z.array(z.string()).min(2).max(12),
  items_en: z.array(z.string()).min(2).max(12).optional(),
  separator: z.string().default('·'),
  repeat: z.number().int().min(1).max(4).default(2),
});

// Grille de 3 problèmes/frictions : num + kicker + h3 + body, grid auto-fit minmax 280px
export const problemsGridSchema = z.object({
  type: z.literal('problems-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  problems: z
    .array(
      z.object({
        num: z.string().optional(),
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        // Line-art DS optionnel (Registre A) : chemin `/images/line-art/*.svg`. Inliné
        // par FeatureGrid (currentColor + var(--accent)). alt porteur de sens → role=img.
        illustration_src: z.string().optional(),
        illustration_alt_fr: z.string().optional(),
        illustration_alt_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(6),
});

// Section "Why X stalls" — sticky chapter label + N FIG rows row-lines
export const whyStallsSchema = z.object({
  type: z.literal('why-stalls'),
  chapter_num: z.string(),
  chapter_title_fr: z.string(),
  chapter_title_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_lead_fr: z.string(),
  aside_lead_en: z.string(),
  rows: z
    .array(
      z.object({
        fig: z.string(),
        text_fr: z.string(),
        text_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// Section "How we ship" — sticky pin scrub avec 4 étapes (numline + stage cards animées)
export const howWeShipSchema = z.object({
  type: z.literal('how-we-ship'),
  roman: z.string(),
  section_label_fr: z.string(),
  section_label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string(),
  aside_en: z.string(),
  steps: z
    .array(
      z.object({
        n: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(3)
    .max(6),
});

// Section operating layer — dark + console mockup + 4 attribute strip
export const operatingLayerSchema = z.object({
  type: z.literal('operating-layer'),
  chapter_num: z.string(),
  chapter_title_fr: z.string(),
  chapter_title_en: z.string(),
  spec_label: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  terminal_label: z.string(),
  console_lines: z
    .array(
      z.object({
        k: z.string(),
        v: z.string(),
      }),
    )
    .min(2)
    .max(8),
  console_cmd: z.string(),
  attrs: z
    .array(
      z.object({
        k: z.string(),
        v_fr: z.string(),
        v_en: z.string(),
      }),
    )
    .length(4),
});

// Manifesto block — grand bloc display italique, kicker mono
export const manifestoBlockSchema = z.object({
  type: z.literal('manifesto-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  text_fr: z.string(),
  text_en: z.string(),
});

// Hero · essai éditorial (kicker + h1 + lede italique + meta auteur/date/temps)
export const heroEssaySchema = z.object({
  type: z.literal('hero-essay'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  author: z.string(),
  date: z.string(),
  reading_time_fr: z.string().optional(),
  reading_time_en: z.string().optional(),
  hero_image: z.string().optional(),
  hero_image_alt_fr: z.string().optional(),
  hero_image_alt_en: z.string().optional(),
});

// Hero · manifeste liquide (fond canvas React LiquidHero + headline display + lede + CTAs)
export const heroLiquidSchema = z.object({
  type: z.literal('hero-liquid'),
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  cta_primary_label_fr: z.string().optional(),
  cta_primary_label_en: z.string().optional(),
  cta_primary_href: z.string().optional(),
  cta_secondary_label_fr: z.string().optional(),
  cta_secondary_label_en: z.string().optional(),
  cta_secondary_href: z.string().optional(),
});

// PROOF / STATS
export const proofBarSchema = z.object({
  type: z.literal('proof-bar'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  metrics: z.array(metricSchema).min(2).max(6),
  layout: z.enum(['horizontal', 'vertical-stack']).default('horizontal'),
  /** Lien d'attribution optionnel sous les métriques (« Voir les 4 dossiers → ») : source les chiffres. */
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  link_href: z.string().optional(),
});

export const statBlockSchema = z.object({
  type: z.literal('stat-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  quote_fr: z.string().optional(),
  quote_en: z.string().optional(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  metrics: z.array(metricSchema).min(1).max(8),
  layout: z.enum(['grid-3', 'grid-4', 'rows-hairlines', 'split-quote']).default('grid-3'),
});

// Band before→après : valeur initiale → valeur finale magnifiée + delta (résultats, ROI)
export const metricShiftSchema = z.object({
  type: z.literal('metric-shift'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  shifts: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        before: z.string(),
        after: z.string(),
        delta_fr: z.string().optional(),
        delta_en: z.string().optional(),
        trend: z.enum(['up', 'down', 'flat']).optional(),
      }),
    )
    .min(2)
    .max(6),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
});

export const socialProofSchema = z.object({
  type: z.literal('social-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  logos: z.array(z.object({ name: z.string(), src: z.string().optional() })),
  marquee: z.boolean().default(true),
});

// ecosystem-partners · logos partenaires unifiés (masque alpha + currentColor).
// docs/48 · grille groupée par catégorie / mur / marquee. Variante dark `ink`.
export const ecosystemPartnersSchema = z.object({
  type: z.literal('ecosystem-partners'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  layout: z.enum(['wall', 'grid', 'marquee']).default('grid'),
  partners: z
    .array(
      z.object({
        name: z.string(),
        asset: z.string(),
        href: z.string().optional(),
        external: z.boolean().optional(),
        category: z.string().optional(),
        // Calibrage poids optique (docs/48) : rétrécit la boîte des marques
        // compactes pour égaliser le poids d'encre. Surcharge --logo-w/--logo-h.
        box: z
          .object({ h: z.string().optional(), w: z.string().optional() })
          .optional(),
      }),
    )
    .min(1),
});

// CONTENT
export const methodTimelineSchema = z.object({
  type: z.literal('method-timeline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(stepSchema).min(2).max(6),
  // Vague C · Batch 5 (process/timeline). Recettes layout curées de la famille « process » :
  //  vertical-stack (défaut = grille éditoriale 3-col actuelle), numbered-rows (lignes hairline
  //  à gros numéro), horizontal (rail scroll tactile), grid-steps (étapes en cartes en grille).
  layout: z.enum(['vertical-stack', 'numbered-rows', 'horizontal', 'grid-steps']).optional(),
  // grid-steps : nombre de colonnes (auto = count-adaptive auto-fit). Ignoré par les autres recettes.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  // density (data-density) : rythme padding-block section + gap des étapes via --space-*.
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // contentAlign (data-content-align) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
});

export const featureGridSchema = z.object({
  type: z.literal('feature-grid'),
  // Mixin de variation unique : background/columns/layout/density + couches NOW v2
  // (hover/cellBg/cellTone/tone/cellAlignX|Y/justifyContent/alignItems/focusRing/
  // mediaFit/mediaRatio/measure/balance/clamp/headingLevel...). Tous optionnels →
  // défaut = rendu actuel. `columns` du mixin (auto|1..6) remplace l'ancien 2|3|4.
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  // ─── COMPOSITION (SYS v2-E) — contenu d'en-tête riche + ligne d'intro. Tous optionnels,
  //     rendus seulement si headerKind/introRow les demandent (défaut = non rendu).
  lede_fr: z.string().optional(), // chapô (headerKind=*-lede* / introRow=lede-*)
  lede_en: z.string().optional(),
  header_cta_label_fr: z.string().optional(), // CTA d'en-tête (headerKind=*-cta)
  header_cta_label_en: z.string().optional(),
  header_cta_href: z.string().optional(),
  intro_desc_fr: z.string().optional(), // desc de la ligne d'intro (introRow=desc-media-split)
  intro_desc_en: z.string().optional(),
  intro_media: z.string().optional(), // image de la ligne d'intro (placeholder editorial, CMS)
  features: z.array(featureItemSchema).min(3).max(8),
});

export const comparisonTableSchema = z.object({
  type: z.literal('comparison-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  column_headers_fr: z.array(z.string()).min(2),
  column_headers_en: z.array(z.string()).min(2),
  rows: z.array(comparisonRowSchema).min(2),
});

export const timelineBlockSchema = z.object({
  type: z.literal('timeline-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  events: z.array(timelineEventSchema).min(2),
});

export const mediaBlockSchema = z.object({
  type: z.literal('media-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // 'inset' = média centré sur --wrap-prose (illustrations carrées) · défaut = full (inchangé)
  display: z.enum(['full', 'inset']).optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  media_kind: z.enum(['image', 'svg', 'video', 'embed']),
  src: z.string(),
  alt_fr: z.string().optional(),
  alt_en: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// PRICING
export const pricingTableSchema = z.object({
  type: z.literal('pricing-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  tiers: z.array(pricingTierSchema).min(1).max(5),
});

// FAQ / OBJECTIONS
export const faqAccordionSchema = z.object({
  type: z.literal('faq-accordion'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
  /** Ouvre le premier item par défaut (ancrage prix visible sans clic). */
  open_first: z.boolean().optional(),
});

export const objectionHandlerSchema = z.object({
  type: z.literal('objection-handler'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  objections: z
    .array(
      z.object({
        objection_fr: z.string(),
        objection_en: z.string(),
        response_fr: z.string(),
        response_en: z.string(),
      }),
    )
    .min(2),
});

// CTA
export const ctaFinalSchema = z.object({
  type: z.literal('cta-final'),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  chapter_num: z.string().optional(),
  chapter_title_fr: z.string().optional(),
  chapter_title_en: z.string().optional(),
  availability_fr: z.string().optional(),
  availability_en: z.string().optional(),
  reassurance_fr: z.string().optional(),
  reassurance_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('ink'),
});

export const ctaBandSchema = z.object({
  type: z.literal('cta-band'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
  background: z.enum(['paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
});

export const ctaInlineSchema = z.object({
  type: z.literal('cta-inline'),
  text_fr: z.string(),
  text_en: z.string(),
  cta: ctaSchema,
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).optional(),
});

// SOCIAL / TRUST
export const testimonialBlockSchema = z.object({
  type: z.literal('testimonial-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  testimonials: z.array(testimonialSchema).min(1).max(6),
  layout: z.enum(['carousel', 'grid-2', 'rows']).default('grid-2'),
});

export const guaranteeBlockSchema = z.object({
  type: z.literal('guarantee-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  guarantees: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(1)
    .max(4),
});

// Diagramme d'architecture · N canaux entrée → système central → M sorties (signature visuelle)
export const architectureDiagramSchema = z.object({
  type: z.literal('architecture-diagram'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // ── Vague C · Scale (Batch 4 « splits/duo ») ──
  // Disposition header ↔ diagramme. Absent → 'stacked' (header au-dessus, schéma centré
  // pleine largeur : rendu actuel). 'split' = header (titre + spec + caption) en colonne
  // gauche, diagramme en colonne droite (lecture éditoriale, schéma plus compact).
  layout: z.enum(['stacked', 'split']).optional(),
  // Ratio des colonnes header|diagramme quand layout='split'. Absent → 2fr 3fr (diagramme
  // dominant). Ignoré par 'stacked'.
  proportion: z.enum(['1-1', '1-2', '2-1', '2-3', '3-2']).optional(),
  // Densité (gap header↔diagramme + marge sous le titre). Absent → base (rendu actuel).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // Alignement du bloc header (titre + spec). Absent → start (rendu actuel).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header/media). Forme identique partout.
  placement: placementSchema,
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  inputs_fr: z.array(z.string()).min(2).max(8),
  inputs_en: z.array(z.string()).min(2).max(8),
  /** Exemples concrets par canal d'entrée (tooltip <title> sur le nœud, même index que inputs). */
  input_examples_fr: z.array(z.string()).optional(),
  input_examples_en: z.array(z.string()).optional(),
  outputs_fr: z.array(z.string()).min(2).max(6),
  outputs_en: z.array(z.string()).min(2).max(6),
  system_label: z.string(),
  system_kicker: z.string(),
  system_subtitle: z.string(),
  show_loop: z.boolean().default(true),
  loop_label_fr: z.string(),
  loop_label_en: z.string(),
  caption_fr: z.string(),
  caption_en: z.string(),
});

// Grille de services 3×2 avec métrique, body et ligne de connecteurs
export const servicesGridSchema = z.object({
  type: z.literal('services-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  fig_num: z.string(),
  fig_title_fr: z.string(),
  fig_title_en: z.string(),
  spec_fr: z.string(),
  spec_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  connectors_label_fr: z.string().default('Connecteurs'),
  connectors_label_en: z.string().default('Connectors'),
  services: z
    .array(
      z.object({
        fig: z.string(),
        metric_fr: z.string(),
        metric_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        connectors_fr: z.string(),
        connectors_en: z.string(),
        /** Lien optionnel vers le cas d'usage /solutions/* du service (fusion UseCaseIndex). */
        usecase_label_fr: z.string().optional(),
        usecase_label_en: z.string().optional(),
        usecase_href: z.string().optional(),
      }),
    )
    .min(3)
    .max(6),
  /** Liens de pied de grille optionnels (« Six cas d'usage métier → », « Adapté à votre secteur → »). */
  foot_links: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .max(3)
    .optional(),
});

// Pyramide de maturité · variant 'full' = timeline 4 étapes + SVG paliers + grille 4 cards ·
// variant 'cards-only' = les 4 cards seules (1 info = 1 représentation), enrichies stage + prix + jauge
export const maturityPyramidSchema = z.object({
  type: z.literal('maturity-pyramid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['full', 'cards-only']).default('full'),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  timeline_label_fr: z.string().default('Progression de maturité IA'),
  timeline_label_en: z.string().default('AI maturity path'),
  tier_cta_fr: z.string().default('Voir le palier →'),
  tier_cta_en: z.string().default('Open tier →'),
  steps: z
    .array(
      z.object({
        roman: z.string(),
        verb_fr: z.string(),
        verb_en: z.string(),
        stage_fr: z.string(),
        stage_en: z.string(),
      }),
    )
    .length(4)
    .optional(),
  tiers: z
    .array(
      z.object({
        n: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        items_fr: z.array(z.string()),
        items_en: z.array(z.string()),
        action_fr: z.string(),
        action_en: z.string(),
        href: z.string(),
        /** Stage de maturité en sur-titre de card (AUDIT / WORKFLOW / SYSTÈME / INFRASTRUCTURE). */
        stage_fr: z.string().optional(),
        stage_en: z.string().optional(),
        /** Prix d'entrée du palier (« dès 1 500 € HT · 1 semaine ») : source FAQ/offres, jamais inventé. */
        price_fr: z.string().optional(),
        price_en: z.string().optional(),
      }),
    )
    .length(4),
});

// Index éditorial de cas d'usage horizontaux (rows numérotées vers /solutions/*)
export const useCaseIndexSchema = z.object({
  type: z.literal('use-case-index'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  num_prefix_fr: z.string().default('USE CASE'),
  num_prefix_en: z.string().default('USE CASE'),
  items: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  footer_label_fr: z.string().optional(),
  footer_label_en: z.string().optional(),
  footer_href: z.string().optional(),
});

// Grille de cas clients · table éditoriale 6 colonnes (idx · client · secteur · stack · impact)
export const caseCardGridSchema = z.object({
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

// Grille de cas clients « featured » · 1 cas mis en avant (7fr, cover) + N lignes (5fr)
export const caseFeaturedGridSchema = z.object({
  type: z.literal('case-featured-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Libellés surchargeables (défauts honnêtes côté composant).
  read_label_fr: z.string().optional(),
  read_label_en: z.string().optional(),
  first_party_label_fr: z.string().optional(),
  first_party_label_en: z.string().optional(),
  second_party_label_fr: z.string().optional(),
  second_party_label_en: z.string().optional(),
  cases: z
    .array(
      z.object({
        slug: z.string(),
        href: z.string().optional(),
        case_num: z.string().optional(),
        sector_fr: z.string(),
        sector_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        headline_fr: z.string(),
        headline_en: z.string(),
        duration_fr: z.string().optional(),
        duration_en: z.string().optional(),
        cover: z.string().optional(),
        cover_alt_fr: z.string().optional(),
        cover_alt_en: z.string().optional(),
        provenance: z.enum(['first-party', 'second-party']).optional(),
      }),
    )
    .min(1),
});

// Pyramide SVG isocèle de l'offre · 3 tiers labellisés
export const tierPyramidSvgSchema = z.object({
  type: z.literal('tier-pyramid-svg'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  aria_label_fr: z.string(),
  aria_label_en: z.string(),
  tiers: z
    .array(
      z.object({
        roman: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .length(3),
});

// Grille de palier d'offres · standard / featured hero dark / transparent
export const offerTierGridSchema = z.object({
  type: z.literal('offer-tier-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['standard', 'featured', 'transparent']).default('standard'),
  wrap: z.boolean().default(true),
  eyebrow_fr: z.string(),
  eyebrow_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  lede_max_width: z.string().optional(),
  featured_card: z
    .object({
      eyebrow_fr: z.string(),
      eyebrow_en: z.string(),
      title_fr: z.string(),
      title_en: z.string(),
      sub_fr: z.string(),
      sub_en: z.string(),
      lead_fr: z.string(),
      lead_en: z.string(),
      cta_fr: z.string(),
      cta_en: z.string(),
      href: z.string(),
    })
    .optional(),
  offers: z
    .array(
      z.object({
        price_fr: z.string(),
        price_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        cta_fr: z.string(),
        cta_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(6),
});

// Grille auteurs · cartes photo / rôle / description / compteur / CTA
export const teamCardGridSchema = z.object({
  type: z.literal('team-card-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  cta_label_fr: z.string().default('Voir le profil →'),
  cta_label_en: z.string().default('View profile →'),
  count_singular_fr: z.string().default('publication'),
  count_singular_en: z.string().default('publication'),
  count_plural_fr: z.string().default('publications'),
  count_plural_en: z.string().default('publications'),
  members: z
    .array(
      z.object({
        name: z.string(),
        role_fr: z.string(),
        role_en: z.string(),
        description_fr: z.string(),
        description_en: z.string(),
        href: z.string(),
        photo: z.string().optional(),
        photo_alt_fr: z.string().default('Portrait auteur Waimia'),
        photo_alt_en: z.string().default('Waimia author portrait'),
        count: z.number().int().min(0).default(0),
        transition_id: z.string().optional(),
      }),
    )
    .min(1)
    .max(6),
});

// Hero Atlas · 2 colonnes avec mini-map des piliers
export const heroAtlasSchema = z.object({
  type: z.literal('hero-atlas'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  subhead_fr: z.string(),
  subhead_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  map_aria_label_fr: z.string(),
  map_aria_label_en: z.string(),
  map_kicker_fr: z.string(),
  map_kicker_en: z.string(),
  pillars: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
        deliverable_fr: z.string(),
        deliverable_en: z.string(),
      }),
    )
    .length(4),
});

// Persona detail · grille 2×2 + footer méta sombre
export const personaAttributesGridSchema = z.object({
  type: z.literal('persona-attributes-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  blocks: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        items_fr: z.array(z.string()).min(1),
        items_en: z.array(z.string()).min(1),
      }),
    )
    .length(4),
  meta: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        value_fr: z.string(),
        value_en: z.string(),
      }),
    )
    .length(3),
});

const relatedCardSchema = z.object({
  kicker: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  lead_fr: z.string(),
  lead_en: z.string(),
  href: z.string(),
});

// Split éditorial ressources · blog / livres blancs
export const editorialSplitGridSchema = z.object({
  type: z.literal('editorial-split-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  left: z.object({
    slot: z.literal('left').default('left'),
    kicker_fr: z.string(),
    kicker_en: z.string(),
    h2_fr: z.string(),
    h2_en: z.string(),
    lede_fr: z.string(),
    lede_en: z.string(),
    cards: z.array(relatedCardSchema).min(1).max(3),
    cta: ctaSchema,
  }),
  right: z.object({
    slot: z.literal('right').default('right'),
    kicker_fr: z.string(),
    kicker_en: z.string(),
    h2_fr: z.string(),
    h2_en: z.string(),
    lede_fr: z.string(),
    lede_en: z.string(),
    cards: z.array(relatedCardSchema).min(1).max(3),
    cta: ctaSchema,
  }),
});

// Bande secteurs à venir · kicker + H2 + pills
export const comingSoonPillsSchema = z.object({
  type: z.literal('coming-soon-pills'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  aria_label_fr: z.string(),
  aria_label_en: z.string(),
  pills_fr: z.array(z.string()).min(1).max(16),
  pills_en: z.array(z.string()).min(1).max(16),
});

// Grille de 3 engagements / garanties (hairline border, titre display + body sans)
export const commitmentsGridSchema = z.object({
  type: z.literal('commitments-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  commitments: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// Callout de marque fond paper-2 : kicker §, h2 display italic, body + CTA optionnel
export const brandedCalloutSchema = z.object({
  type: z.literal('branded-callout'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body1_fr: z.string(),
  body1_en: z.string(),
  body2_fr: z.string().optional(),
  body2_en: z.string().optional(),
  cta: ctaSchema.optional(),
});

// Index éditorial de publications (lignes numérotées : date · tag · titre · flèche)
export const editorialPreviewSchema = z.object({
  type: z.literal('editorial-preview'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  roman: z.string().optional(),
  act_label_fr: z.string().optional(),
  act_label_en: z.string().optional(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z
    .array(
      z.object({
        num: z.string(),
        date_fr: z.string(),
        date_en: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  all_label_fr: z.string().optional(),
  all_label_en: z.string().optional(),
  all_href: z.string().optional(),
});

// Bande newsletter fond sombre : titre éditorial + formulaire capture email
export const newsletterBandSchema = z.object({
  type: z.literal('newsletter-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  placeholder_fr: z.string().default('votre@email.com'),
  placeholder_en: z.string().default('your@email.com'),
  cta_label_fr: z.string().default("S'abonner →"),
  cta_label_en: z.string().default('Subscribe →'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  form_action: z.string().optional(),
});

// Barre de spécifications projet : N colonnes (label + valeur), CSS var --spec-cols
export const specBarSchema = z.object({
  type: z.literal('spec-bar'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  specs: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// Grille de livrables tangibles : cards numérotées + tag format/durée
export const deliverablesGridSchema = z.object({
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

// Bande stack technologique : kicker + lead + rangée de pills
export const techStackBandSchema = z.object({
  type: z.literal('tech-stack-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  lead_fr: z.string().optional(),
  lead_en: z.string().optional(),
  pills: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        kind: z.enum(['primary', 'open', 'neutral']).optional(),
      }),
    )
    .min(2)
    .max(16),
});

// Bande de cards connexes : header optionnel + molécule RelatedCards
export const relatedCardsBandSchema = z.object({
  type: z.literal('related-cards-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  cards: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(3),
});

// Citation éditoriale isolée : wrapper catalogue autour de PullQuote
export const pullQuoteBlockSchema = z.object({
  type: z.literal('pull-quote-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
  variant: z.enum(['breakout', 'inline', 'centered']).default('centered'),
});

// Liste d'inclusions inline séparée par point médian
export const inclusionsListSchema = z.object({
  type: z.literal('inclusions-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  items_fr: z.array(z.string()).min(2).max(16),
  items_en: z.array(z.string()).min(2).max(16),
});

// Énoncé macro-typo du problème avec stats optionnelles
export const problemStatementSchema = z.object({
  type: z.literal('problem-statement'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  statement_fr: z.string(),
  statement_en: z.string(),
  dropcap: z.boolean().optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(4)
    .optional(),
});

/* ─── Sections catalogue · variations (12 nouveaux types) ─── */

// Mosaïque bento content-driven (N tuiles 3..8) : chaque tuile peut occuper
// plusieurs cellules via `span` (primitive .bento-fluid + .span-*). Défaut côté
// composant : 1ʳᵉ tuile = `lg` (vedette 2×2), les autres = `sm` → reproduit
// l'intention « cellule 1 vedette » tout en s'adaptant à tout nombre de tuiles.
export const bentoGridSchema = z.object({
  type: z.literal('bento-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C) — bento adaptatif (grid auto-flow dense, spans clampés
  // au nb de colonnes → jamais de structure cassée). Tous optionnels, défauts = rendu actuel.
  //  - density : padding section + gap de la mosaïque + padding des tuiles (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - columns : nombre de colonnes de la mosaïque. 'auto' (défaut) = auto-fill content-driven
  //    (--tile-min) ; '2'|'3'|'4' = nombre fixe (--bento-cols) ; les spans lg/wide restent
  //    bornés à la largeur de la grille par CSS (pas de débordement).
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - layout (Batch 3) : VOCABULAIRE DE LAYOUT curé pour l'archétype bento/média.
  //      bento          : spans content-driven + auto-flow dense (DÉFAUT, rendu actuel).
  //      bento-feature  : 1ʳᵉ tuile vedette span 2×2 imposé, le reste en unités.
  //      mosaic         : spans ET hauteurs variés, dense obligatoire (éditorial).
  //      matrix-2x2     : matrice 2 colonnes, cellules carrées (aspect-ratio:1).
  //      matrix-3x3     : matrice 3 colonnes, cellules carrées (aspect-ratio:1).
  //      grid-uniform   : N colonnes ÉGALES, hauteurs égalisées (stretch), 0 span.
  //    Spans toujours clampés au nb de colonnes ; matrix réduit proprement la dernière ligne.
  layout: z
    .enum(['bento', 'bento-feature', 'mosaic', 'matrix-2x2', 'matrix-3x3', 'grid-uniform'])
    .optional(),
  //  - itemHeight (Batch 3) : hauteur des cellules. auto (contenu) | even (égalisées) |
  //    square (aspect-ratio:1) | video (16/9). Relâché en mobile (contenu prime).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  //  - contentAlign (Batch 3) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 3) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  cells: z.array(z.object({
    glyph: z.string().optional(),
    title_fr: z.string(),
    title_en: z.string(),
    body_fr: z.string(),
    body_en: z.string(),
    span: z.enum(['lg', 'wide', 'sm']).optional(),
  })).min(3).max(8),
});

// Lignes alternées visuel/texte (gauche-droite, droite-gauche)
export const featureZigzagSchema = z.object({
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

// Galerie scroll : liste sticky à gauche, média qui change en fondu au scroll.
// Colonne texte qui défile + cadre média STICKY dont l'image active crossfade
// quand l'item correspondant croise la bande centrale du viewport (IntersectionObserver).
export const scrollGallerySchema = z.object({
  type: z.literal('scroll-gallery'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  // Côté du cadre média sticky en desktop (défaut right). 'left' inverse les colonnes.
  media_side: z.enum(['left', 'right']).optional(),
  items: z
    .array(
      z.object({
        index_fr: z.string().optional(),
        index_en: z.string().optional(),
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

// Cartes empilées au scroll : chaque carte sticky avec un top incrémental → les
// cartes se superposent à mesure que la page défile (effet stack, CSS pur).
export const stackCardsSchema = z.object({
  type: z.literal('stack-cards'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  cards: z
    .array(
      z.object({
        index_fr: z.string().optional(),
        index_en: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        // Fond de la carte (défaut paper). 'ink' rend la carte en contraste inverse.
        tone: z.enum(['paper', 'ink']).optional(),
        media_src: z.string().optional(),
        media_alt_fr: z.string().optional(),
        media_alt_en: z.string().optional(),
        points: z
          .array(z.object({ label_fr: z.string(), label_en: z.string() }))
          .max(4)
          .optional(),
        link_label_fr: z.string().optional(),
        link_label_en: z.string().optional(),
        link_href: z.string().optional(),
      }),
    )
    .min(2)
    .max(6),
});

export const hoverRevealListSchema = z.object({
  type: z.literal('hover-reveal-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  reveal_mode: z.enum(['cursor', 'fixed']).optional(),
  items: z.array(
    z.object({
      label_fr: z.string(),
      label_en: z.string(),
      meta_fr: z.string().optional(),
      meta_en: z.string().optional(),
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      link_href: z.string().optional(),
    }),
  ).min(2).max(10),
});

export const horizontalShowcaseSchema = z.object({
  type: z.literal('horizontal-showcase'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  panels: z.array(
    z.object({
      index_fr: z.string().optional(),
      index_en: z.string().optional(),
      title_fr: z.string(),
      title_en: z.string(),
      body_fr: z.string().optional(),
      body_en: z.string().optional(),
      tone: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
      points: z.array(z.object({ label_fr: z.string(), label_en: z.string() })).max(6).optional(),
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      link_label_fr: z.string().optional(),
      link_label_en: z.string().optional(),
      link_href: z.string().optional(),
    }),
  ).min(2).max(6),
});

export const mediaBentoSchema = z.object({
  type: z.literal('media-bento'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Batch 3) — bento média. Tous optionnels, défauts = rendu actuel.
  //  - density : gap de la grille (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - contentAlign : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 3) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  //  - layout (Batch 3) : VOCABULAIRE DE LAYOUT curé pour le bento média.
  //      feature-2      : 1 grande tuile (2 col / 2 rangs) + tuiles à droite (DÉFAUT, rendu actuel).
  //      quad           : grille 2×2 régulière (legacy, conservé).
  //      mosaic         : flux dense, tile span='2' occupe 2 colonnes (legacy, conservé).
  //      bento-feature  : 1ʳᵉ tuile vedette span 2×2 imposé, le reste en unités.
  //      matrix-2x2     : matrice 2 colonnes, tuiles carrées (aspect-ratio:1).
  //      matrix-3x3     : matrice 3 colonnes, tuiles carrées (aspect-ratio:1).
  //      grid-uniform   : N colonnes ÉGALES, tuiles 4/3 régulières.
  //    Spans clampés au nb de colonnes ; matrix réduit proprement la dernière ligne.
  layout: z
    .enum(['feature-2', 'quad', 'mosaic', 'bento-feature', 'matrix-2x2', 'matrix-3x3', 'grid-uniform'])
    .optional(),
  //  - columns : nb de colonnes pour grid-uniform (auto|2|3|4). Ignoré par les recettes
  //    qui imposent leur grille (feature-2/matrix/bento-feature).
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - itemHeight : hauteur des tuiles. auto | even | square (1:1) | video (16/9).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  tiles: z.array(
    z.object({
      title_fr: z.string(),
      title_en: z.string(),
      tag_fr: z.string().optional(),
      tag_en: z.string().optional(),
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      span: z.enum(['1', '2']).optional(),
      link_href: z.string().optional(),
    }),
  ).min(2).max(6),
});

export const photoClusterSchema = z.object({
  type: z.literal('photo-cluster'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  note_fr: z.string().optional(),
  note_en: z.string().optional(),
  layout: z.enum(['lead-cluster', 'scatter', 'duo']).optional(),
  lead: z.object({
    media_src: z.string(),
    media_alt_fr: z.string().optional(),
    media_alt_en: z.string().optional(),
  }),
  photos: z.array(
    z.object({
      media_src: z.string(),
      media_alt_fr: z.string().optional(),
      media_alt_en: z.string().optional(),
      caption_fr: z.string().optional(),
      caption_en: z.string().optional(),
    }),
  ).min(1).max(5),
});

export const mediaSwapBandSchema = z.object({
  type: z.literal('media-swap-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  swap_mode: z.enum(['auto', 'hover']).optional(),
  columns: z.array(
    z.object({
      label_fr: z.string(),
      label_en: z.string(),
      sublabel_fr: z.string().optional(),
      sublabel_en: z.string().optional(),
      media: z.array(
        z.object({
          media_src: z.string(),
          media_alt_fr: z.string().optional(),
          media_alt_en: z.string().optional(),
        }),
      ).min(1).max(4),
    }),
  ).min(1).max(3),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});

// Grille statique de logos partenaires (grayscale → couleur au hover)
const logoWallItemSchema = z.object({
  src: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  href: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const logoWallSchema = z.object({
  type: z.literal('logo-wall'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  logos: z.array(logoWallItemSchema).min(3).max(20),
});

// Matrice comparative tarifaire (3 plans, colonne recommandée)
const pricingComparisonPlanSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  price_note_fr: z.string().optional(),
  price_note_en: z.string().optional(),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});

const pricingComparisonRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  group_fr: z.string().optional(),
  group_en: z.string().optional(),
  values: z.array(z.union([z.string(), z.boolean()])).min(1),
});

export const pricingComparisonMatrixSchema = z.object({
  type: z.literal('pricing-comparison-matrix'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  plans: z.array(pricingComparisonPlanSchema).min(2).max(4),
  rows: z.array(pricingComparisonRowSchema).min(2),
});

// Galerie éditoriale en colonnes CSS (masonry naturel)
export const galleryMasonryItemSchema = z.object({
  src: z.string().optional(),
  alt_fr: z.string().optional(),
  alt_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  tag_fr: z.string().optional(),
  tag_en: z.string().optional(),
  ratio: z.enum(['portrait', 'landscape', 'square', 'wide']).default('landscape'),
});

export const galleryMasonrySchema = z.object({
  type: z.literal('gallery-masonry'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  items: z.array(galleryMasonryItemSchema).min(3).max(12),
});

// Section fonctionnalités en onglets cliquables (aria-compliant)
export const featureTabsSchema = z.object({
  type: z.literal('feature-tabs'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  tabs: z.array(z.object({
    icon: z.string().optional(),
    label_fr: z.string(),
    label_en: z.string(),
    title_fr: z.string(),
    title_en: z.string(),
    body_fr: z.string(),
    body_en: z.string(),
    visual_label_fr: z.string().optional(),
    visual_label_en: z.string().optional(),
  })).min(2).max(6),
});

// Trois colonnes iconographiques séparées par hairlines verticaux
const iconTrioItemSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const iconTrioSchema = z.object({
  type: z.literal('icon-trio'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  items: z.array(iconTrioItemSchema).length(3),
});

// Grande citation pleine lumière sur fond paper-2
export const quoteSpotlightSchema = z.object({
  type: z.literal('quote-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  avatar: z.string().optional(),
});

// Étapes numérotées en ligne avec pastilles et connecteurs hairline
const stepsHorizontalStepSchema = z.object({
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const stepsHorizontalSchema = z.object({
  type: z.literal('steps-horizontal'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  steps: z.array(stepsHorizontalStepSchema).min(2).max(6),
});

// Bandeau CTA asymétrique 2 colonnes (texte gauche, visuel SVG droite)
export const ctaSplitVisualSchema = z.object({
  type: z.literal('cta-split-visual'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
});

// Quatre KPI en grille bento de tailles inégales
export const statsBentoItemSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  delta: z.string().optional(),
});

export const statsBentoSchema = z.object({
  type: z.literal('stats-bento'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Axes de variation (Vague C) — bento adaptatif de KPI. Tous optionnels, défauts = rendu actuel.
  //  - density : padding section + gap de la grille + padding des cellules (compact|base|ample).
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - columns : 'auto' (défaut) = auto-fill content-driven (--tile-min) ; '2'|'3'|'4' = nombre
  //    fixe (--bento-cols), spans bornés à la largeur de grille par CSS.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  //  - layout (Batch 3) : VOCABULAIRE DE LAYOUT curé pour l'archétype stats/bento.
  //      bento          : 1ʳᵉ stat vedette span-lg + dense (DÉFAUT, rendu actuel).
  //      grid-uniform   : N colonnes ÉGALES, hauteurs égalisées (stretch), 0 vedette.
  //      matrix-2x2     : matrice 2 colonnes, cellules carrées (aspect-ratio:1).
  //      list           : 1 KPI par ligne, chiffre + label en cluster (table éditoriale).
  layout: z.enum(['bento', 'grid-uniform', 'matrix-2x2', 'list']).optional(),
  //  - itemHeight (Batch 3) : hauteur des cellules. auto | even | square (1:1) | video (16/9).
  itemHeight: z.enum(['auto', 'even', 'square', 'video']).optional(),
  //  - contentAlign (Batch 3) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique (Batch 3) : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  // Nombre de stats variable (2..6) : la grille bento est désormais content-driven
  // (1ʳᵉ stat = tuile vedette span-lg, les autres span-sm) → 0 trou à tout compte.
  stats: z.array(statsBentoItemSchema).min(2).max(6),
});

// Deux cartes côte à côte (Sans / Avec) — contraste avant/après
const comparisonDuoItemSchema = z.object({
  text_fr: z.string(),
  text_en: z.string(),
});

export const comparisonDuoSchema = z.object({
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

// Liste-catalogue éditoriale de services (rows § num · titre · desc · meta · flèche) - remontée HubTemplate « SERVICE CATALOG »
export const serviceCatalogListSchema = z.object({
  type: z.literal('service-catalog-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  roman: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  services: z
    .array(
      z.object({
        num: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
        meta: z.string().optional(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(8),
  footer_label_fr: z.string().optional(),
  footer_label_en: z.string().optional(),
  footer_href: z.string().optional(),
});

// Section qualification fit/no-fit sur fond ink - remontée HubTemplate « FIT / NO FIT » + molécule FitColumns
export const fitColumnsSchema = z.object({
  type: z.literal('fit-columns'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  heading_fr: z.string(),
  heading_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  yes_title_fr: z.string(),
  yes_title_en: z.string(),
  yes_items_fr: z.array(z.string()).min(1).max(8),
  yes_items_en: z.array(z.string()).min(1).max(8),
  no_title_fr: z.string(),
  no_title_en: z.string(),
  no_items_fr: z.array(z.string()).min(1).max(8),
  no_items_en: z.array(z.string()).min(1).max(8),
});

// Comparateur éditorial : header (kicker + heading display) + tableau bilingue - remontée page conseil « Comparateur services » + composant EditorialTable
export const editorialTableBlockSchema = z.object({
  type: z.literal('editorial-table-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns_fr: z.array(z.string()).min(2).max(6),
  columns_en: z.array(z.string()).min(2).max(6),
  rows_fr: z.array(z.array(z.string()).min(2).max(6)).min(1),
  rows_en: z.array(z.array(z.string()).min(2).max(6)).min(1),
  variant: z.enum(['default', 'compact', 'editorial']).default('editorial'),
});

// Arbre de décision : header (kicker + heading display) + <ol> numéroté - remontée page conseil « Arbre de décision »
export const decisionListSchema = z.object({
  type: z.literal('decision-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  heading_fr: z.string(),
  heading_en: z.string(),
  items: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// ─── Technologies (TechnologiesDetailTemplate → composable) ───

// §2 Positioning Split · prise de position éditoriale (statement manifesto + facts mono kv)
export const techPositioningSplitSchema = z.object({
  type: z.literal('tech-positioning-split'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  statement_fr: z.string(),
  statement_en: z.string(),
  facts: z
    .array(
      z.object({
        k: z.string(),
        v_fr: z.string(),
        v_en: z.string(),
      }),
    )
    .max(6)
    .optional(),
});

// §3 Capabilities Specs · inventaire technique en table (capacité · description · statut)
export const techCapabilitiesSpecsSchema = z.object({
  type: z.literal('tech-capabilities-specs'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  capabilities: z
    .array(
      z.object({
        name_fr: z.string(),
        name_en: z.string(),
        description_fr: z.string(),
        description_en: z.string(),
        status: z.enum(['active', 'beta', 'planned']).default('active'),
      }),
    )
    .min(1),
});

// §4 Models Table · comparaison modèles (5 colonnes Modèle / Profil / Coût / Contexte / Usages)
export const techModelsTableSchema = z.object({
  type: z.literal('tech-models-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  models: z
    .array(
      z.object({
        name: z.string(),
        version: z.string(),
        cost: z.string().optional(),
        context: z.string().optional(),
        use_case_fr: z.string(),
        use_case_en: z.string(),
      }),
    )
    .min(1),
});

// §5 When To Use Dual · aide décision (puces +/− mono)
export const techWhenDualSchema = z.object({
  type: z.literal('tech-when-dual'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  use_title_fr: z.string(),
  use_title_en: z.string(),
  use_items_fr: z.array(z.string()).min(1).max(10),
  use_items_en: z.array(z.string()).min(1).max(10),
  avoid_title_fr: z.string(),
  avoid_title_en: z.string(),
  avoid_items_fr: z.array(z.string()).min(1).max(10),
  avoid_items_en: z.array(z.string()).min(1).max(10),
});

// §6 Integration Flow · position dans la stack en frise verticale numérotée
export const techIntegrationFlowSchema = z.object({
  type: z.literal('tech-integration-flow'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  steps: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(1),
});

// §Solutions · Pain Points · 3 cards numérotées (empathie métier "pourquoi ça bloque")
export const painPointsSchema = z.object({
  type: z.literal('pain-points'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Friction'),
  eyebrow_en: z.string().default('§ Friction'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  items: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// §Solutions · Workflows Table · brique signature 5 colonnes (№ / workflow / modèle / gain / comment)
export const workflowTableSchema = z.object({
  type: z.literal('workflow-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Workflows'),
  eyebrow_en: z.string().default('§ Workflows'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  workflows: z
    .array(
      z.object({
        num: z.string(),
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        model_fr: z.string(),
        model_en: z.string(),
        gain: z.string(),
        how_fr: z.string(),
        how_en: z.string(),
      }),
    )
    .min(1)
    .max(8),
});

// §Solutions · ROI Band · brique signature 4 chiffres énormes sur fond ink
export const roiBandSchema = z.object({
  type: z.literal('roi-band'),
  eyebrow_fr: z.string().default('§ Preuve macro'),
  eyebrow_en: z.string().default('§ Macro proof'),
  h2_fr: z.string(),
  h2_en: z.string(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// §Offres · Off Proof · « Signal terrain » : PullQuote client + grille KeyMetric (asymétrie 5/7)
export const offProofSchema = z.object({
  type: z.literal('off-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Avant / Après'),
  eyebrow_en: z.string().default('§ Before / After'),
  h2_fr: z.string().default('Signal<br/><i>terrain</i>'),
  h2_en: z.string().default('Field<br/><i>signal</i>'),
  quote_fr: z.string(),
  quote_en: z.string(),
  attribution: z.string(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// §Solutions · Case Split · split dark/light 50/50 (case dark + résultats light)
export const caseSplitSchema = z.object({
  type: z.literal('case-split'),
  kicker_fr: z.string().default('Cas client'),
  kicker_en: z.string().default('Client case'),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  cta_label_fr: z.string().default('Voir le cas complet →'),
  cta_label_en: z.string().default('See full case →'),
  cta_href: z.string().default('/cas-clients'),
  results: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(6),
});

// §Solutions · Department Stack · table éditoriale outils (catégorie / outil / rôle)
export const departmentStackSchema = z.object({
  type: z.literal('department-stack'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Stack outils'),
  eyebrow_en: z.string().default('§ Tool stack'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns_fr: z.array(z.string()).min(2).max(4),
  columns_en: z.array(z.string()).min(2).max(4),
  rows: z
    .array(
      z.object({
        category_fr: z.string(),
        category_en: z.string(),
        tool: z.string(),
        role_fr: z.string(),
        role_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// §École · Catalogue de cours/formations · tableau (#/Titre/Niveau/Durée/Prix) · EcoleHubTemplate
export const courseCatalogTableSchema = z.object({
  type: z.literal('course-catalog-table'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  title_fr: z.string(),
  title_en: z.string(),
  rows: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        level: z.enum(['debutant', 'intermediaire', 'avance', 'expert']),
        duration_hours: z.number().positive(),
        price_eur: z.number().int().nonnegative().optional(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(20),
});

// §École · Liste de parcours/learning paths · titre + description · EcoleHubTemplate
export const learningPathListSchema = z.object({
  type: z.literal('learning-path-list'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  title_fr: z.string(),
  title_en: z.string(),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string(),
        desc_en: z.string(),
      }),
    )
    .min(1)
    .max(12),
});

// §Solutions · Department CTA · clôture dark "Votre équipe, augmentée."
export const departmentCtaSchema = z.object({
  type: z.literal('department-cta'),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  primary_label_fr: z.string().default('Prendre rendez-vous →'),
  primary_label_en: z.string().default('Book a call →'),
  primary_href: z.string().default('/contact'),
  secondary_label_fr: z.string().default('Toutes les solutions'),
  secondary_label_en: z.string().default('All solutions'),
  secondary_href: z.string().default('/solutions'),
});

/* ─── Mission catalogue-gap 2026-06-11 · patterns /console + /manifesto ─── */

// §Table Sections · Table terminal (frame TerminalTable) : cols/headers/rows configurables,
// rôle typographique par cellule. Source : /console Acte II (services) + Acte IV (cases).
export const terminalTableSectionSchema = z.object({
  type: z.literal('terminal-table'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  /** grid-template-columns de la table · ex: "60px 180px 1fr 120px" */
  cols: z.string(),
  headers: z.array(bilingualString).min(2).max(8),
  rows: z
    .array(
      z.object({
        href: z.string().optional(),
        cells: z
          .array(
            z.object({
              fr: z.string(),
              en: z.string(),
              role: z.enum(['id', 'title', 'body', 'mono', 'status', 'accent', 'arrow']).default('body'),
            }),
          )
          .min(2)
          .max(8),
      }),
    )
    .min(1)
    .max(12),
});

// §Table Sections · Feed éditorial cliquable (lignes EditorialWriteRow [date|tag|texte|flèche]).
// Source : /console Writing (paper) + /manifesto Writing dark (ink).
export const editorialWriteFeedSchema = z.object({
  type: z.literal('editorial-write-feed'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_label_fr: z.string().optional(),
  meta_label_en: z.string().optional(),
  meta_href: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  tone: z.enum(['paper', 'ink']).default('paper'),
  items: z
    .array(
      z.object({
        date: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
        text_fr: z.string(),
        text_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(10),
});

// §Manifesto Sections · Déclaration plein écran fond contrasté.
// tone ink = bloc [manifesto] de /console · tone accent = pattern ManifestoAccent (terracotta + grille).
// §Terminal Sections · product-reel : reel produit scroll-driven (ProductReel.tsx).
// Composant auto-porteur (DEFAULT_SCREENS/DEFAULT_COPY intégrés) → schéma minimal type-only.
export const productReelSchema = z.object({
  type: z.literal('product-reel'),
});

// §Terminal Sections · agentic-terminal : IDE mockup (fenêtre macOS + explorateur +
// prompt + bloc de code tapé LIVE caractère par caractère + succès + footer + badges).
// Source virtuoseOS retokenisée DS waimia. Animation gérée par AgenticTerminal.tsx.
const agenticLineSchema = z.object({
  kind: z.enum(['cmd', 'out', 'ok', 'comment']),
  text: z.string(),
});
export const agenticTerminalSchema = z.object({
  type: z.literal('agentic-terminal'),
  badge_fr: z.string(),
  badge_en: z.string(),
  title_part1_fr: z.string(),
  title_part1_en: z.string(),
  title_highlight_fr: z.string(),
  title_highlight_en: z.string(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  filename: z.string(),
  folders: z.array(z.string()).max(8).default([]),
  files: z
    .array(z.object({ name: z.string(), type: z.string() }))
    .max(12)
    .default([]),
  prompt_label_fr: z.string(),
  prompt_label_en: z.string(),
  prompt_text_fr: z.string(),
  prompt_text_en: z.string(),
  lines_fr: z.array(agenticLineSchema).min(1).max(20),
  lines_en: z.array(agenticLineSchema).min(1).max(20),
  success_msg_fr: z.string(),
  success_msg_en: z.string(),
  footer_status_fr: z.string(),
  footer_status_en: z.string(),
  footer_framework: z.string(),
  footer_memory: z.string(),
  badges_fr: z.array(z.string()).max(6).default([]),
  badges_en: z.array(z.string()).max(6).default([]),
});

// §Feature Sections · challenges-grid : grille 2x2 de pain-points (numéro en coin,
// icône, titre, body, border-left accent, hover élévation). Layout récolté de
// virtuoseOS PersonaChallenges, retokenisé DS waimia.
const challengeItemSchema = z.object({
  icon: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});
export const challengesGridSchema = z.object({
  type: z.literal('challenges-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(challengeItemSchema).min(2).max(4),
});

// §Process Sections · journey-steps : parcours en 3 temps (icône cercle + badge numéro,
// titre, description, pill highlight, connecteur entre étapes). Horizontal desktop,
// vertical mobile. Layout récolté de virtuoseOS PersonaJourney, retokenisé DS waimia.
const journeyStepSchema = z.object({
  icon: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  highlight_fr: z.string().optional(),
  highlight_en: z.string().optional(),
});
export const journeyStepsSchema = z.object({
  type: z.literal('journey-steps'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  steps: z.array(journeyStepSchema).min(2).max(4),
});

export const manifestoStatementSchema = z.object({
  type: z.literal('manifesto-statement'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  /** HTML · <i> = relevé italique serif, <span class="acc"> = accent, <strong> = gras */
  text_fr: z.string(),
  text_en: z.string(),
  tone: z.enum(['ink', 'accent']).default('ink'),
  show_grid: z.boolean().default(false),
  /** Narration scroll-pinnée : la section reste sticky plein viewport pendant ~250vh
   *  de scroll et la lecture guidée (--ms-lit) se déroule sur toute cette plage.
   *  Desktop + motion only (mobile ≤768px et reduced-motion retombent en lecture guidée
   *  simple, sans zone de scroll réservée). Opt-in — réservé à /agence. */
  pinned: z.boolean().default(false),
});

// §Manifesto Sections · Acte numéroté : label sticky (numéro romain + sous-titre) +
// statement XL + stats massives optionnelles. Source : /manifesto Acte I.
export const manifestoActSchema = z.object({
  type: z.literal('manifesto-act'),
  num_fr: z.string(),
  num_en: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
  sub_fr: z.string().optional(),
  sub_en: z.string().optional(),
  text_fr: z.string(),
  text_en: z.string(),
  tone: z.enum(['ink', 'paper']).default('ink'),
  stats: z
    .array(
      z.object({
        k: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .max(4)
    .default([]),
});

// §Manifesto Sections · Services asymétriques (rangées AsymmetricServiceRow alternées).
// Source : /manifesto Acte II.
export const asymmetricServicesSchema = z.object({
  type: z.literal('asymmetric-services'),
  num_fr: z.string(),
  num_en: z.string(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  items: z
    .array(
      z.object({
        num: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
      }),
    )
    .min(2)
    .max(8),
});

// §Terminal Sections · Console mockup à lignes configurables (frame TerminalMockup).
// Source : /console hero terminal split + Acte V (carte session).
export const terminalMockupSectionSchema = z.object({
  type: z.literal('terminal-mockup'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  layout: z.enum(['split', 'full']).default('split'),
  label: z.string().default(''),
  status: z.string().default(''),
  tone: z.enum(['ink', 'paper']).default('ink'),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  lines: z
    .array(
      z.object({
        kind: z.enum(['cmd', 'out', 'ok', 'comment']).default('out'),
        text_fr: z.string(),
        text_en: z.string(),
      }),
    )
    .min(1)
    .max(14),
  show_cursor: z.boolean().default(true),
});

// §Terminal Sections · Strip KPI mono bordé (télémétrie console, tout mono).
// Source : /console hero, strip 5 metrics.
export const terminalMetricsStripSchema = z.object({
  type: z.literal('terminal-metrics-strip'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(2)
    .max(6),
});

// >>> [gen-pricing] start
// PRICING · 3 nouveaux types (catégorie pricing-sections).

// pricing-cards · 3 tiers côte à côte, carte « Recommandé » mise en avant.
const pricingCardTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price: z.string(),
  period_fr: z.string().optional(),
  period_en: z.string().optional(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});
export const pricingCardsSchema = z.object({
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

// pricing-toggle · grille + bascule mensuel/annuel (prix doubles par tier).
const pricingToggleTierSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  price_monthly: z.string(),
  price_annual: z.string(),
  suffix_monthly_fr: z.string().optional(),
  suffix_monthly_en: z.string().optional(),
  suffix_annual_fr: z.string().optional(),
  suffix_annual_en: z.string().optional(),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  cta: ctaSchema,
  featured: z.boolean().default(false),
});
export const pricingToggleSchema = z.object({
  type: z.literal('pricing-toggle'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  label_monthly_fr: z.string(),
  label_monthly_en: z.string(),
  label_annual_fr: z.string(),
  label_annual_en: z.string(),
  save_badge_fr: z.string().optional(),
  save_badge_en: z.string().optional(),
  tiers: z.array(pricingToggleTierSchema).min(2).max(4),
});

// pricing-single-highlight · offre mono-produit en grand format.
export const pricingSingleHighlightSchema = z.object({
  type: z.literal('pricing-single-highlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  desc_fr: z.string().optional(),
  desc_en: z.string().optional(),
  anchor_price: z.string().optional(),
  anchor_label_fr: z.string().optional(),
  anchor_label_en: z.string().optional(),
  price: z.string(),
  period_fr: z.string().optional(),
  period_en: z.string().optional(),
  benefits_fr: z.array(z.string()).min(2),
  benefits_en: z.array(z.string()).min(2),
  cta: ctaSchema,
  guarantee_fr: z.string().optional(),
  guarantee_en: z.string().optional(),
  secondary_note_fr: z.string().optional(),
  secondary_note_en: z.string().optional(),
});
// <<< [gen-pricing] end

/* ─── Union discriminée pour validation ─── */

// >>> [gen-hero-feature] start
// hero-form-inline · hero de capture lead above-the-fold (copy + form email/CTA).
export const heroFormInlineSchema = z.object({
  type: z.literal('hero-form-inline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  form_title_fr: z.string(),
  form_title_en: z.string(),
  proof: z
    .array(z.object({ text_fr: z.string(), text_en: z.string() }))
    .max(4)
    .optional(),
});

// hero-social-proof · hero centré + bande de preuve sociale (stats + rating) above-fold.
export const heroSocialProofSchema = z.object({
  type: z.literal('hero-social-proof'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  cta_primary: ctaSchema,
  cta_secondary: ctaSchema.optional(),
  rating_fr: z.string().optional(),
  rating_en: z.string().optional(),
  stats: z
    .array(z.object({ k: z.string(), label_fr: z.string(), label_en: z.string() }))
    .min(2)
    .max(4),
});

// feature-comparison-grid · différenciation légère « nous vs eux » en grille (check/cross).
export const featureComparisonGridSchema = z.object({
  type: z.literal('feature-comparison-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  columns: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        highlighted: z.boolean().default(false),
        rows: z
          .array(z.object({ text_fr: z.string(), text_en: z.string(), included: z.boolean() }))
          .min(1)
          .max(10),
      }),
    )
    .min(2)
    .max(3),
});

// feature-accordion · features en progressive disclosure (accordéon titre → détail).
export const featureAccordionSchema = z.object({
  type: z.literal('feature-accordion'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  open_first: z.boolean().default(false),
  items: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(8),
});
// <<< [gen-hero-feature] end

// >>> [gen-conversion] start
// FAQ + Conversion + Contact + Newsletter (audit famille CONVERSION)

// FAQ accordéon (gauche) + panneau réassurance/CTA sticky (droite) — transforme une FAQ passive en capture lead.
export const faqCtaAsideSchema = z.object({
  type: z.literal('faq-cta-aside'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqItemSchema).min(2),
  open_first: z.boolean().optional(),
  aside_title_fr: z.string(),
  aside_title_en: z.string(),
  aside_body_fr: z.string().optional(),
  aside_body_en: z.string().optional(),
  aside_cta: ctaSchema,
  aside_note_fr: z.string().optional(),
  aside_note_en: z.string().optional(),
});

// Bande CTA avec mini-formulaire inline (email + bouton) — variante newsletter/lead, capture à l'instant d'intention.
export const ctaFormInlineSchema = z.object({
  type: z.literal('cta-form-inline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  placeholder_fr: z.string().default('votre@email.com'),
  placeholder_en: z.string().default('your@email.com'),
  submit_label_fr: z.string().default("S'inscrire →"),
  submit_label_en: z.string().default('Sign up →'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  form_action: z.string().optional(),
});

// Section contact avec formulaire (nom/email/message) + colonne coordonnées, action vers /api/contact.
export const contactFormSchema = z.object({
  type: z.literal('contact-form'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  name_label_fr: z.string().default('Nom'),
  name_label_en: z.string().default('Name'),
  email_label_fr: z.string().default('Email'),
  email_label_en: z.string().default('Email'),
  message_label_fr: z.string().default('Message'),
  message_label_en: z.string().default('Message'),
  submit_label_fr: z.string().default('Envoyer →'),
  submit_label_en: z.string().default('Send →'),
  form_action: z.string().default('/api/contact'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  details: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
        href: z.string().optional(),
      }),
    )
    .optional(),
});

// Section prise de RDV : embed CalEmbed + copy de réassurance.
export const bookingEmbedSchema = z.object({
  type: z.literal('booking-embed'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  reassurance: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(4)
    .optional(),
  cal_username: z.string().optional(),
  cal_event_type: z.string().optional(),
  cal_namespace: z.string().optional(),
});

// Section d'inscription newsletter pleine largeur (réutilise NewsletterSignup), fonds enum (ink = climax).
export const newsletterSignupSectionSchema = z.object({
  type: z.literal('newsletter-signup-section'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
});
// <<< [gen-conversion] end

// >>> [gen-structure] start
// §Table Sections · Table de données neutre générique (en-tête + lignes + cellules typées).
// Distincte de terminal-table (habillée console) et editorial-write-feed (feed) : data brute.
export const dataTableSchema = z.object({
  type: z.literal('data-table'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  striped: z.boolean().default(false),
  caption_fr: z.string().optional(),
  caption_en: z.string().optional(),
  columns: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        align: z.enum(['start', 'center', 'end']).default('start'),
      }),
    )
    .min(2)
    .max(8),
  rows: z
    .array(
      z.object({
        cells: z
          .array(
            z.object({
              text_fr: z.string(),
              text_en: z.string(),
              emphasis: z.boolean().default(false),
            }),
          )
          .min(2)
          .max(8),
      }),
    )
    .min(1)
    .max(20),
});

// §Content Listing Sections · Grille de cartes d'articles/blog (image, tag, titre, date, extrait).
export const articleGridSchema = z.object({
  type: z.literal('article-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  columns: z.enum(['2', '3']).default('3'),
  articles: z
    .array(
      z.object({
        image: z.string().optional(),
        tag_fr: z.string().optional(),
        tag_en: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        excerpt_fr: z.string().optional(),
        excerpt_en: z.string().optional(),
        date: z.string().optional(),
        read_time_fr: z.string().optional(),
        read_time_en: z.string().optional(),
        author: z.string().optional(),
        href: z.string(),
      }),
    )
    .min(2)
    .max(12),
});

// §Content Listing Sections · Grille de ressources téléchargeables (icône/type + titre + CTA).
export const resourceCardGridSchema = z.object({
  type: z.literal('resource-card-grid'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  columns: z.enum(['2', '3']).default('3'),
  resources: z
    .array(
      z.object({
        kind_fr: z.string(),
        kind_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        desc_fr: z.string().optional(),
        desc_en: z.string().optional(),
        format: z.string().optional(),
        href: z.string(),
        cta_label_fr: z.string().optional(),
        cta_label_en: z.string().optional(),
        gated: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(9),
});

// §Process Sections · « Comment ça marche » en étapes numérotées verticales (1..N, connecteurs).
export const processStepsSchema = z.object({
  type: z.literal('process-steps'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  steps: z
    .array(
      z.object({
        title_fr: z.string(),
        title_en: z.string(),
        body_fr: z.string(),
        body_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
      }),
    )
    .min(2)
    .max(8),
});

// §Timelines · Frise chronologique horizontale datée (roadmap), scroll-snap. Stack vertical mobile.
export const timelineHorizontalSchema = z.object({
  type: z.literal('timeline-horizontal'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  events: z
    .array(
      z.object({
        date_fr: z.string().optional(),
        date_en: z.string().optional(),
        label_fr: z.string(),
        label_en: z.string(),
        body_fr: z.string().optional(),
        body_en: z.string().optional(),
        status: z.enum(['done', 'active', 'upcoming']).default('upcoming'),
      }),
    )
    .min(2)
    .max(10),
});

// §Terminal Sections · Vitrine de code annoté (bloc code + copy explicatif), cible devtools/SaaS.
export const codeShowcaseSchema = z.object({
  type: z.literal('code-showcase'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  background: z.enum(['paper', 'paper-2', 'ink']).default('paper'),
  tone: z.enum(['ink', 'paper']).default('ink'),
  label: z.string().default(''),
  lang_label: z.string().default(''),
  show_line_numbers: z.boolean().default(true),
  lines: z
    .array(
      z.object({
        text: z.string(),
        comment_fr: z.string().optional(),
        comment_en: z.string().optional(),
      }),
    )
    .min(1)
    .max(24),
});

// §Banner Sections · Bandeau d'annonce/promo fin (texte + lien, dismissible, variante accent/ink).
export const announcementBannerSchema = z.object({
  type: z.literal('announcement-banner'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  text_fr: z.string(),
  text_en: z.string(),
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  href: z.string().optional(),
  badge_fr: z.string().optional(),
  badge_en: z.string().optional(),
  tone: z.enum(['accent', 'ink', 'paper-2']).default('accent'),
  dismissible: z.boolean().default(false),
});
// <<< [gen-structure] end

// >>> [gen-trust-proof] start
// Famille PREUVE / CRÉDIBILITÉ — 5 types (trust · testimonial · stats · comparison · logo)

// trust-badges-band (trust-sections) : bandeau badges réassurance (sécurité, hébergement, conformité, garanties)
// en cellules hairline mono, juste avant le CTA. Lève l'objection risque.
const trustBadgeSchema = z.object({
  glyph: z.string().optional(), // pictogramme texte court (◉, ✓, ⚿…) — pas d'icône externe
  label_fr: z.string(),
  label_en: z.string(),
  value_fr: z.string().optional(),
  value_en: z.string().optional(),
});
export const trustBadgesBandSchema = z.object({
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

// testimonial-logo-metric (testimonial-sections) : carte B2B = logo client + citation + métrique d'impact chiffrée.
// Réutilise le pattern testimonial (quote/author/role) + métrique inline (KeyMetric).
const testimonialLogoMetricCardSchema = z.object({
  logo_src: z.string().optional(),
  company: z.string(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  metric_value: z.string(),
  metric_label_fr: z.string(),
  metric_label_en: z.string(),
  href: z.string().optional(),
});
export const testimonialLogoMetricSchema = z.object({
  type: z.literal('testimonial-logo-metric'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  cards: z.array(testimonialLogoMetricCardSchema).min(2).max(6),
});

// stat-counter (stats-sections) : compteur animé count-up au scroll (île React client:visible,
// respecte prefers-reduced-motion). Grille de 2-4 stats. La valeur finale est rendue côté serveur
// (visible sans JS) ; l'île n'enrobe que l'animation count-up.
const statCounterItemSchema = z.object({
  value: z.string(), // valeur finale affichée (ex. '99.9%', '120', '4.8') — la partie numérique est animée
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const statCounterSchema = z.object({
  type: z.literal('stat-counter'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  stats: z.array(statCounterItemSchema).min(2).max(4),
  animate: z.boolean().default(true),
});

// versus-competitors (comparison-sections) : comparatif « nous vs alternatives »,
// colonne « nous » highlightée, lignes de critères avec check/cross/partiel.
const versusColumnSchema = z.object({
  name_fr: z.string(),
  name_en: z.string(),
  featured: z.boolean().default(false), // la colonne « nous »
});
const versusRowSchema = z.object({
  feature_fr: z.string(),
  feature_en: z.string(),
  group_fr: z.string().optional(),
  group_en: z.string().optional(),
  values: z.array(z.union([z.string(), z.boolean()])).min(1),
});
export const versusCompetitorsSchema = z.object({
  type: z.literal('versus-competitors'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  columns: z.array(versusColumnSchema).min(2).max(5),
  rows: z.array(versusRowSchema).min(3),
});

// logo-marquee (logo-sections) : bandeau de logos IMAGE défilant (« ils nous font confiance »),
// marquee CSS, respecte reduced-motion. Distinct de marquee-band (texte mono).
const logoMarqueeItemSchema = z.object({
  src: z.string(),
  name_fr: z.string(),
  name_en: z.string(),
  href: z.string().optional(),
});
export const logoMarqueeSchema = z.object({
  type: z.literal('logo-marquee'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  // logoIds : résolution GLOBAL via le store src/data/logos.ts (anti-duplication
  // des src/name inline répétés dans les MDX). Optionnel → si présent, le composant
  // résout chaque id via LOGOS[id] ; sinon il retombe sur `logos` inline (rétrocompat).
  logoIds: z.array(z.string()).optional(),
  logos: z.array(logoMarqueeItemSchema).min(4).max(24).optional(),
  speed: z.enum(['slow', 'base']).default('base'),
  grayscale: z.boolean().default(true),
});
// <<< [gen-trust-proof] end

// >>> [new-standard] start
// Lot new-standard 2026-06-11 — 10 nouveaux types standard B2B-SaaS, dark natif dès création.
// background: z.enum(['paper','paper-2','paper-3','ink']) sur chaque type (champ obligatoire dark).

// 1. team-bio-grid (team-sections) : grille équipe photo + nom + rôle + bio courte (2-4 colonnes).
const teamBioMemberSchema = z.object({
  photo_src: z.string().optional(),
  name: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  bio_fr: z.string(),
  bio_en: z.string(),
  link_href: z.string().optional(),
});
export const teamBioGridSchema = z.object({
  type: z.literal('team-bio-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  columns: z.enum(['2', '3', '4']).default('3'),
  members: z.array(teamBioMemberSchema).min(2).max(12),
});

// 2. about-story-split (about-sections) : récit fondateur, 2 colonnes (texte narratif + timeline/chiffres).
const aboutStoryMilestoneSchema = z.object({
  year: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const aboutStorySplitSchema = z.object({
  type: z.literal('about-story-split'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  paragraphs_fr: z.array(z.string()).min(1).max(5),
  paragraphs_en: z.array(z.string()).min(1).max(5),
  aside_title_fr: z.string().optional(),
  aside_title_en: z.string().optional(),
  milestones: z.array(aboutStoryMilestoneSchema).min(2).max(8),
});

// 3. footer-cta-band (cta-sections) : bande CTA finale pleine largeur, climax avant footer.
const footerCtaButtonSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'ghost', 'accent']).default('primary'),
});
export const footerCtaBandSchema = z.object({
  type: z.literal('footer-cta-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  // Axes de variation (Vague C pilote). Tous optionnels → défaut = rendu actuel.
  //  - layout : 'inline' (CTA à côté du titre, défaut historique) | 'stacked' (CTA sous le bloc).
  //  - contentAlign : alignement du bloc titre/texte (start|center|end).
  //  - actionsAlign : position des boutons, INDÉPENDANTE du contenu (start|center|end|spread).
  //  - density : rythme padding-block/gap via tokens --space-*.
  layout: z.enum(['inline', 'stacked']).optional(),
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  rounded: z.boolean().optional(),
  buttons: z.array(footerCtaButtonSchema).min(1).max(2),
});

// 4. integrations-grid (logo-sections) : grille de logos d'intégrations groupés par catégorie.
const integrationItemSchema = z.object({
  logo_src: z.string().optional(),
  name: z.string(),
  href: z.string().optional(),
});
const integrationGroupSchema = z.object({
  group_fr: z.string(),
  group_en: z.string(),
  items: z.array(integrationItemSchema).min(2).max(12),
});
export const integrationsGridSchema = z.object({
  type: z.literal('integrations-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  groups: z.array(integrationGroupSchema).min(1).max(6),
});

// 5. feature-split-media (feature-sections) : feature majeure texte + mockup, champ reversed.
const featureSplitPointSchema = z.object({
  label_fr: z.string(),
  label_en: z.string(),
});
export const featureSplitMediaSchema = z.object({
  type: z.literal('feature-split-media'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  reversed: z.boolean().default(false),
  // Paire asymétrique optionnelle (primitive layouts.css) : split-1-2 = texte
  // étroit + média large, split-2-1 = l'inverse. Absent → ratio symétrique 1fr 1fr
  // (défaut historique préservé). `reversed` mappe sur data-reversed (inversion
  // visuelle seule, ordre DOM = ordre de lecture, WCAG 1.3.2).
  layout: z.enum(['split-1-2', 'split-2-1']).optional(),
  // Média sticky (effet éditorial quand le texte est plus long que le média).
  // Absent/false → alignement centré historique préservé.
  media_sticky: z.boolean().optional(),
  // Axes de variation (Vague C pilote). Tous optionnels → défaut = rendu actuel.
  //  - proportion : ratio des colonnes texte|média (data-proportion). Préféré à `layout`
  //    (qui reste en compat : split-1-2 ≈ 1-2, split-2-1 ≈ 2-1). proportion gagne si présent.
  //  - mediaSide : côté du média en desktop (data-media-side). Absent → ordre DOM (média à droite).
  //  - contentAlign : alignement vertical/typo du bloc texte ; actionsAlign : position du CTA.
  //  - density : rythme padding/gap via tokens --space-*.
  proportion: z.enum(['1-1', '1-2', '2-1', '2-3', '3-2']).optional(),
  mediaSide: z.enum(['left', 'right']).optional(),
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  points: z.array(featureSplitPointSchema).max(6).default([]),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  media_caption_fr: z.string().optional(),
  media_caption_en: z.string().optional(),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});

// 6. metric-callout-band (stats-sections) : bande 1-3 métriques héro surdimensionnées + contexte.
const metricCalloutItemSchema = z.object({
  value: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const metricCalloutBandSchema = z.object({
  type: z.literal('metric-callout-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  context_fr: z.string(),
  context_en: z.string(),
  metrics: z.array(metricCalloutItemSchema).min(1).max(3),
});

// 7. testimonial-single-spotlight (testimonial-sections) : un témoignage plein écran.
export const testimonialSingleSpotlightSchema = z.object({
  type: z.literal('testimonial-single-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  portrait_src: z.string().optional(),
  logo_src: z.string().optional(),
});

// 8. faq-two-column (faq-sections) : FAQ 2 colonnes statiques, scan rapide sans accordéon.
const faqTwoColItemSchema = z.object({
  q_fr: z.string(),
  q_en: z.string(),
  a_fr: z.string(),
  a_en: z.string(),
});
export const faqTwoColumnSchema = z.object({
  type: z.literal('faq-two-column'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(faqTwoColItemSchema).min(2).max(12),
});

// 9. cta-newsletter-footer (newsletter-sections) : capture email compacte pré-footer + RGPD.
export const ctaNewsletterFooterSchema = z.object({
  type: z.literal('cta-newsletter-footer'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  placeholder_fr: z.string().default('vous@entreprise.com'),
  placeholder_en: z.string().default('you@company.com'),
  button_label_fr: z.string().default('S’abonner'),
  button_label_en: z.string().default('Subscribe'),
  consent_fr: z.string().optional(),
  consent_en: z.string().optional(),
  action: z.string().optional(),
});

// 10. comparison-pricing-callout (comparison-sections) : bloc « pourquoi nous » 3 colonnes, bridge feature→pricing.
const comparisonValuePropSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});
export const comparisonPricingCalloutSchema = z.object({
  type: z.literal('comparison-pricing-callout'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  columns: z.array(comparisonValuePropSchema).min(2).max(4),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
  cta_note_fr: z.string().optional(),
  cta_note_en: z.string().optional(),
});
// <<< [new-standard] end

// >>> [sections-gap] start
// Lot sections-gap 2026-06-11 — types manquants conversion / réassurance / GEO
// dérivés des 2 maquettes de référence (docs/44). Dark natif via background .optional().

// diagnostic-stages (conversion-sections) : auto-diagnostic « Où en êtes-vous ? »,
// 4-6 stades horizontaux cliquables, stade `current` relevé accent (« vous êtes ici »).
const diagnosticStageSchema = z.object({
  glyph: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  phase_fr: z.string().optional(),
  phase_en: z.string().optional(),
  href: z.string().optional(),
  current: z.boolean().optional(),
});
export const diagnosticStagesSchema = z.object({
  type: z.literal('diagnostic-stages'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  stages: z.array(diagnosticStageSchema).min(4).max(6),
  // Vague C · Batch 5 (process/stages). Recettes layout : grid-steps (défaut = piste de stades
  //  en grille count-adaptive actuelle), vertical-stack (stades empilés pleine largeur),
  //  numbered-rows (lignes hairline numérotées). La séquence 1..N et le relevé « current » sont
  //  préservés dans toutes les recettes.
  layout: z.enum(['grid-steps', 'vertical-stack', 'numbered-rows']).optional(),
  // grid-steps : nombre de colonnes imposé (auto = nb de stades, rendu actuel). Ignoré ailleurs.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  // density (data-density) : padding-block section + padding des cards via --space-*.
  density: z.enum(['compact', 'base', 'ample']).optional(),
  // contentAlign (data-content-align) : alignement du header (start défaut | center | end).
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  // Couche atomique : placement par région (header + body). Forme = placementSchema.
  placement: placementSchema,
});

// case-spotlight (case-sections) : carte INK image + métriques latérales massives +
// citation à barre accent + tags méta + CTA. Vitrine de cas concret (conversion).
const caseSpotlightMetricSchema = z.object({
  k: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
const caseSpotlightTagSchema = z.object({ fr: z.string(), en: z.string() });
export const caseSpotlightSchema = z.object({
  type: z.literal('case-spotlight'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['media-left', 'media-right']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  media_src: z.string().optional(),
  media_alt: z.string().optional(),
  media_caption: z.string().optional(),
  quote_fr: z.string().optional(),
  quote_en: z.string().optional(),
  attribution_fr: z.string().optional(),
  attribution_en: z.string().optional(),
  metrics: z.array(caseSpotlightMetricSchema).max(3).optional(),
  tags: z.array(caseSpotlightTagSchema).max(4).optional(),
  cta_href: z.string().optional(),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
});

// testimonial-metrics (testimonial-sections) : grande citation serif + grille 3-4 métriques.
const testimonialMetricsItemSchema = z.object({
  k: z.string(),
  label_fr: z.string(),
  label_en: z.string(),
});
export const testimonialMetricsSchema = z.object({
  type: z.literal('testimonial-metrics'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  variant: z.enum(['quote-left', 'quote-right']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  quote_fr: z.string(),
  quote_en: z.string(),
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  metrics: z.array(testimonialMetricsItemSchema).min(3).max(4),
});
// <<< [sections-gap] end

// >>> [editorial-prose] start
// editorial-prose (content-sections) : wrapper tokenisé d'une colonne de prose
// lisible (largeur --wrap-prose), destiné à héberger du contenu long rendu via
// `<slot/>` (corps MDX `<Content />`), sans champ texte (préserve la parité GEO :
// le contenu vit dans le MDX, pas dupliqué dans le frontmatter). Fond alterné via
// l'enum background partagé (idiome data-bg, modèle BentoGrid).
export const editorialProseSchema = z.object({
  type: z.literal('editorial-prose'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  maxWidth: z.enum(['prose', 'wide']).optional(),
});
// <<< [editorial-prose] end

// >>> [editorial-atoms] start
// Mission U2 (W3) — cataloguer KeyMetric + atomes éditoriaux non encore catalogués.
// Chaque type COMPOSE l'atome editorial/* dédié (markup non dupliqué) et applique le
// mixin de présentation partagé (...sectionBaseSchema.shape : background/layout/density).

// key-metric-grid (stats-sections) : grille de métriques magnifiées (atome KeyMetric).
export const keyMetricGridSchema = z.object({
  type: z.literal('key-metric-grid'),
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  columns: z.number().int().min(2).max(4).optional(),
  size: z.enum(['sm', 'md', 'lg', 'hero']).optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  variant: z.enum(['default', 'inverted', 'accent']).optional(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        label_fr: z.string(),
        label_en: z.string(),
        delta: z.string().optional(),
        trend: z.enum(['up', 'down', 'flat']).optional(),
      }),
    )
    .min(2),
  ...sectionBaseSchema.shape,
});

// editorial-callout (content-sections) : encadré éditorial (atome Callout).
export const editorialCalloutSchema = z.object({
  type: z.literal('editorial-callout'),
  variant: z.enum(['info', 'quote', 'note', 'warn', 'manifesto']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  align: z.enum(['left', 'center']).optional(),
  cite: z.string().optional(),
  body_fr: z.string(),
  body_en: z.string(),
  ...sectionBaseSchema.shape,
});

// editorial-dropcap-prose (content-sections) : ouverture d'article avec initiale (atome DropCap).
export const editorialDropcapProseSchema = z.object({
  type: z.literal('editorial-dropcap-prose'),
  variant: z.enum(['serif', 'mono', 'accent']).optional(),
  lead_fr: z.string(),
  lead_en: z.string(),
  paragraphs_fr: z.array(z.string()).optional(),
  paragraphs_en: z.array(z.string()).optional(),
  ...sectionBaseSchema.shape,
});

// editorial-dingbat-rule (content-sections) : séparateur ornemental (atome Dingbat).
export const editorialDingbatRuleSchema = z.object({
  type: z.literal('editorial-dingbat-rule'),
  variant: z.enum(['default', 'section', 'end', 'rule', 'asterism']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  above_fr: z.string().optional(),
  above_en: z.string().optional(),
  below_fr: z.string().optional(),
  below_en: z.string().optional(),
  ...sectionBaseSchema.shape,
});

// editorial-timeline (timelines) : frise chronologique éditoriale (atome Timeline).
export const editorialTimelineSchema = z.object({
  type: z.literal('editorial-timeline'),
  eyebrow_fr: z.string().optional(),
  eyebrow_en: z.string().optional(),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  orientation: z.enum(['vertical', 'horizontal']).optional(),
  numbered: z.boolean().optional(),
  events: z
    .array(
      z.object({
        num: z.string().optional(),
        title_fr: z.string(),
        title_en: z.string(),
        meta_fr: z.string().optional(),
        meta_en: z.string().optional(),
        body_fr: z.string(),
        body_en: z.string(),
        variant: z.enum(['default', 'highlight']).optional(),
      }),
    )
    .min(2),
  ...sectionBaseSchema.shape,
});
// <<< [editorial-atoms] end

// >>> [ds-primitives-v7] start
// Mission DS primitives v7 (W3) — 2 sections GEO/E-E-A-T sobres + éditoriales.
// Mêmes invariants que les atomes ci-dessus : mixin de présentation partagé
// (...sectionBaseSchema.shape → background/layout/density), 0 nouveau token DS.

// direct-answer (content-sections) : bloc GEO « réponse directe » en tête de page.
// Répond à une question implicite (eyebrow/question), définit éventuellement une
// entité (term) et délivre une réponse directe de 2 à 4 phrases. Markup sobre,
// colonne de lecture. Le JSON-LD (DefinedTerm/FAQ) se posera côté page, pas ici.
export const directAnswerSchema = z.object({
  type: z.literal('direct-answer'),
  question_fr: z.string(),
  question_en: z.string(),
  term_fr: z.string().optional(),
  term_en: z.string().optional(),
  answer_fr: z.string(),
  answer_en: z.string(),
  dropcap: z.boolean().optional(),
  ...sectionBaseSchema.shape,
});

// author-byline (team-sections) : ligne auteur compacte E-E-A-T sous un h1 d'article.
// Champs inline (pas de reference('authors') ici : sections.ts est un module de schéma
// plain, pas content.config) + authorId optionnel résolu côté page ultérieurement.
export const authorBylineSchema = z.object({
  type: z.literal('author-byline'),
  authorId: z.string().optional(),
  name: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  photo: z.string().optional(),
  photoAlt_fr: z.string().optional(),
  photoAlt_en: z.string().optional(),
  profileHref: z.string().optional(),
  publishedDate: z.string().optional(),
  updatedDate: z.string().optional(),
  ...sectionBaseSchema.shape,
});

// pain-severity-list (feature-sections) : liste editoriale de pain-points sur fond ink,
// chaque item porte un label severity vertical (mono) + un glyphe (◆▲●○), un titre serif,
// une description muted et une ligne mono « → {fix} ». Miroir de statementOrbitSchema pour
// le couple kicker/h2 ; convention severity reprise de la molecule PainPointInline.
export const painSeverityListSchema = z.object({
  type: z.literal('pain-severity-list'),
  ...sectionBaseSchema.shape,
  // Batch 6 (texte/manifeste) · refiner count-adaptive pour layout='two-col'|'grid'.
  // 'auto' = auto-fit ; '2'|'3' = nb fixe desktop. Ignoré par list/rows-divided. Défaut absent = list.
  columns: z.enum(['auto', '2', '3']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  items: z.array(z.object({
    severity: z.enum(['critical', 'high', 'medium', 'low']),
    title_fr: z.string(), title_en: z.string(),
    desc_fr: z.string(), desc_en: z.string(),
    fix_fr: z.string().optional(), fix_en: z.string().optional(),
  })).min(2).max(6),
});

// definition-extract (content-sections) : bloc GEO « format extractible ». Kicker mono,
// gros statement serif (terme defini en accent via set:html), rangee de pills, bandeau
// de specs mono en bas. Sobre, fond paper, reveal-stagger.
export const definitionExtractSchema = z.object({
  type: z.literal('definition-extract'),
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  statement_fr: z.string(),
  statement_en: z.string(),
  pills: z.array(z.object({ label_fr: z.string(), label_en: z.string() })).max(6).optional(),
  specs: z.array(z.object({ label_fr: z.string(), label_en: z.string() })).max(8).optional(),
});

// system-flow (feature-sections) : rangee horizontale de cartes d'etapes sur fond ink +
// boucle d'amelioration continue. En-tete a la architecture-diagram (ChapterLabel « Fig. N »
// a gauche + meta mono a droite), grand titre serif avec dernier mot en accent (set:html),
// lede courte, puis N cartes (numero mono accent derive de l'index, titre serif, desc muted)
// reliees par des fleches accent, fermees par une ligne « ↺ boucle ». Miroir du couple
// h2/lede de statementOrbitSchema. La numerotation (01,02…) est derivee, pas stockee.
export const systemFlowSchema = z.object({
  type: z.literal('system-flow'),
  ...sectionBaseSchema.shape,
  fig_num: z.string().optional(),
  fig_title_fr: z.string().optional(),
  fig_title_en: z.string().optional(),
  meta_fr: z.string().optional(),
  meta_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(z.object({
    title_fr: z.string(), title_en: z.string(),
    desc_fr: z.string(), desc_en: z.string(),
  })).min(2).max(6),
  loop_label_fr: z.string().optional(),
  loop_label_en: z.string().optional(),
});

export const methodSteplineSchema = z.object({
  type: z.literal('method-stepline'),
  ...sectionBaseSchema.shape,
  // Vague C · Batch 5 : layout (string mixin) lit horizontal (défaut, rail actuel),
  // vertical-stack (colonne), numbered-rows (lignes hairline), grid-steps (cartes en grille).
  // columns : nb de colonnes du mode grid-steps (auto = count-adaptive). Ignoré ailleurs.
  columns: z.enum(['auto', '2', '3', '4']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  duration_fr: z.string().optional(),
  duration_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  steps: z.array(z.object({
    title_fr: z.string(), title_en: z.string(),
    sub_fr: z.string(), sub_en: z.string(),
  })).min(2).max(6),
});
// <<< [ds-primitives-v7] end

// >>> [eeat-panel] start
// Panneau E-E-A-T auteur/autorité à 4 variantes (media/columns/light/hero). Contenu GLOBAL
// single-source (EEAT_PACK + EEAT_IMAGES) → pas de champ de contenu dans le schéma, seulement
// le pilotage de variante/fond + overrides éditoriaux optionnels.
export const eeatPanelSchema = z.object({
  type: z.literal('eeat-panel'),
  variant: z.enum(['media', 'columns', 'light', 'hero']).default('media'),
  background: z.enum(['ink', 'paper']).optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  lead: z.string().optional(),
});
// <<< [eeat-panel] end

export const sectionSchema = z.discriminatedUnion('type', [
  heroSplitSchema,
  heroSplitMediaSchema,
  mastheadBarSchema,
  breadcrumbBarSchema,
  heroEditorialKpiSchema,
  heroScopeMinimapSchema,
  heroThinMediaSchema,
  heroTechSignatureSchema,
  heroTrizoneSchema,
  heroNumeralCoverSchema,
  heroMastheadCardSchema,
  statementOrbitSchema,
  heroCapabilityBandSchema,
  heroSummaryRailSchema,
  heroEditorialMastheadSchema,
  heroAsymmetricGridSchema,
  heroCenteredBandSchema,
  heroMediaMedallionSchema,
  heroBaselineStatsSchema,
  heroGrid12Schema,
  heroCardCoverSchema,
  heroStackRhythmSchema,
  heroMagazineCoverSchema,
  heroCenteredSchema,
  heroFullBleedSchema,
  heroHubListingSchema,
  heroServiceDetailSchema,
  heroPillarHubSchema,
  heroCaseStudySchema,
  heroHomeSchema,
  heroLandingSchema,
  heroProblemIndexSchema,
  heroSectorSchema,
  heroUtilityMastheadSchema,
  heroAcademyHubSchema,
  heroHubMastheadSchema,
  trustLegalSectionSchema,
  welcomeSectionSchema,
  listIndexSectionSchema,
  heroOfferDetailSchema,
  heroTechLayerSchema,
  heroConversionFunnelSchema,
  heroHubStatsSchema,
  heroServiceMastheadSchema,
  heroDetailMenuSchema,
  heroAuthorSchema,
  heroLeadMagnetSchema,
  heroCourseSchema,
  heroTunnelStepSchema,
  tunnelStepHeroSchema,
  tunnelStepNavSchema,
  marqueeBandSchema,
  problemsGridSchema,
  whyStallsSchema,
  howWeShipSchema,
  operatingLayerSchema,
  manifestoBlockSchema,
  heroEssaySchema,
  heroLiquidSchema,
  proofBarSchema,
  statBlockSchema,
  metricShiftSchema,
  socialProofSchema,
  ecosystemPartnersSchema,
  methodTimelineSchema,
  featureGridSchema,
  comparisonTableSchema,
  timelineBlockSchema,
  mediaBlockSchema,
  pricingTableSchema,
  faqAccordionSchema,
  objectionHandlerSchema,
  ctaFinalSchema,
  ctaBandSchema,
  ctaInlineSchema,
  testimonialBlockSchema,
  guaranteeBlockSchema,
  architectureDiagramSchema,
  servicesGridSchema,
  maturityPyramidSchema,
  useCaseIndexSchema,
  caseCardGridSchema,
  caseFeaturedGridSchema,
  tierPyramidSvgSchema,
  offerTierGridSchema,
  teamCardGridSchema,
  heroAtlasSchema,
  personaAttributesGridSchema,
  editorialSplitGridSchema,
  comingSoonPillsSchema,
  commitmentsGridSchema,
  brandedCalloutSchema,
  editorialPreviewSchema,
  newsletterBandSchema,
  specBarSchema,
  deliverablesGridSchema,
  techStackBandSchema,
  relatedCardsBandSchema,
  pullQuoteBlockSchema,
  inclusionsListSchema,
  problemStatementSchema,
  bentoGridSchema,
  featureZigzagSchema,
  scrollGallerySchema,
  stackCardsSchema,
  hoverRevealListSchema,
  horizontalShowcaseSchema,
  mediaBentoSchema,
  photoClusterSchema,
  mediaSwapBandSchema,
  logoWallSchema,
  pricingComparisonMatrixSchema,
  galleryMasonrySchema,
  featureTabsSchema,
  iconTrioSchema,
  quoteSpotlightSchema,
  stepsHorizontalSchema,
  ctaSplitVisualSchema,
  statsBentoSchema,
  comparisonDuoSchema,
  serviceCatalogListSchema,
  fitColumnsSchema,
  editorialTableBlockSchema,
  decisionListSchema,
  techPositioningSplitSchema,
  techCapabilitiesSpecsSchema,
  techModelsTableSchema,
  techWhenDualSchema,
  techIntegrationFlowSchema,
  painPointsSchema,
  workflowTableSchema,
  roiBandSchema,
  offProofSchema,
  caseSplitSchema,
  departmentStackSchema,
  courseCatalogTableSchema,
  learningPathListSchema,
  departmentCtaSchema,
  terminalTableSectionSchema,
  editorialWriteFeedSchema,
  productReelSchema,
  agenticTerminalSchema,
  challengesGridSchema,
  journeyStepsSchema,
  manifestoStatementSchema,
  manifestoActSchema,
  asymmetricServicesSchema,
  terminalMockupSectionSchema,
  terminalMetricsStripSchema,
  // >>> [gen-pricing] start
  pricingCardsSchema,
  pricingToggleSchema,
  pricingSingleHighlightSchema,
  // <<< [gen-pricing] end
  // >>> [gen-hero-feature] start
  heroFormInlineSchema,
  heroSocialProofSchema,
  featureComparisonGridSchema,
  featureAccordionSchema,
  // <<< [gen-hero-feature] end
  // >>> [gen-conversion] start
  faqCtaAsideSchema,
  ctaFormInlineSchema,
  contactFormSchema,
  bookingEmbedSchema,
  newsletterSignupSectionSchema,
  // <<< [gen-conversion] end
  // >>> [gen-structure] start
  dataTableSchema,
  articleGridSchema,
  resourceCardGridSchema,
  processStepsSchema,
  timelineHorizontalSchema,
  codeShowcaseSchema,
  announcementBannerSchema,
  // <<< [gen-structure] end
  // >>> [gen-trust-proof] start
  trustBadgesBandSchema,
  testimonialLogoMetricSchema,
  statCounterSchema,
  versusCompetitorsSchema,
  logoMarqueeSchema,
  // <<< [gen-trust-proof] end
  // >>> [new-standard] start
  teamBioGridSchema,
  aboutStorySplitSchema,
  footerCtaBandSchema,
  integrationsGridSchema,
  featureSplitMediaSchema,
  metricCalloutBandSchema,
  testimonialSingleSpotlightSchema,
  faqTwoColumnSchema,
  ctaNewsletterFooterSchema,
  comparisonPricingCalloutSchema,
  // <<< [new-standard] end
  // >>> [sections-gap] start
  diagnosticStagesSchema,
  caseSpotlightSchema,
  testimonialMetricsSchema,
  // <<< [sections-gap] end
  // >>> [editorial-prose] start
  editorialProseSchema,
  // <<< [editorial-prose] end
  // >>> [editorial-atoms] start
  keyMetricGridSchema,
  editorialCalloutSchema,
  editorialDropcapProseSchema,
  editorialDingbatRuleSchema,
  editorialTimelineSchema,
  // <<< [editorial-atoms] end
  // >>> [ds-primitives-v7] start
  directAnswerSchema,
  authorBylineSchema,
  painSeverityListSchema,
  definitionExtractSchema,
  systemFlowSchema,
  methodSteplineSchema,
  // <<< [ds-primitives-v7] end
  // >>> [eeat-panel] start
  eeatPanelSchema,
  // <<< [eeat-panel] end
]);

export type SectionData = (typeof sectionSchema)['_output'];

/**
 * Schema usable directement dans content collections :
 * ```ts
 * import { sectionsArraySchema } from '../schemas/sections';
 * schema: z.object({
 *   ...baseFields,
 *   sections: sectionsArraySchema,
 * })
 * ```
 */
/**
 * Ancre optionnelle par section : chaque element du tableau peut porter, EN PLUS de
 * sa variante discriminee par `type`, un champ `anchor` (slug kebab-case) qui produit
 * un point d'ancrage scrollable `id` au rendu (cf SectionsRenderer.astro).
 *
 * On utilise `z.intersection(sectionSchema, ...)` plutot que d'ajouter `anchor` aux 151
 * variantes : l'intersection PRESERVE la discrimination par `type` ET conserve `anchor`
 * en sortie (Zod strip les cles inconnues par defaut, donc un simple `anchor:` serait
 * silencieusement supprime sans ce wrapper). Verifie empiriquement (anchor survit, type
 * preserve, slug invalide rejete).
 */
const sectionWithAnchorSchema = z.intersection(
  sectionSchema,
  z.object({
    anchor: z
      .string()
      .regex(/^[a-z0-9-]+$/, 'anchor doit etre un slug kebab-case (a-z, 0-9, tirets)')
      .optional(),
    // Opt-in Container Expansion : enveloppe le composant rendu dans `.container-expand`
    // (cf SectionsRenderer + scroll-reveal.css:248). Effet purement visuel pilote au scroll
    // (JS container-expand.ts), neutralise mobile <=768px + reduced-motion. Opt-in par
    // instance dans le `sections[]`, 0 churn composant, 0 impact si absent/false.
    expand: z.boolean().optional(),
  }),
);

export const sectionsArraySchema = z.array(sectionWithAnchorSchema).default([]);

/* ─── Type helpers ─── */

export type SectionType = SectionData['type'];

export type SectionByType<T extends SectionType> = Extract<SectionData, { type: T }>;
