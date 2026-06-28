// Waimia · Section schemas V2 (2026-05-15 ; Wave #38 T5 - co-location full replace 2026-06-28)
// Composable architecture - discriminated union de tous les types de section data-driven.
//
// ⚠️ Les 199 schémas vivent désormais dans les modules co-localisés `src/sections/<type>/schema.ts`
// (un dossier par type). L'union, les types dérivés et le wrapper anchor sont GENERES dans
// `sections.generated.ts` (scripts/gen-section-aggregate.mjs, mode REPLACE) et ré-exportés ici.
// Ce fichier n'est plus qu'un point d'agrégation à API PUBLIQUE PRESERVEE (drop-in).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.

/* ─── Feuilles partagées co-localisées (Wave #38) ───
 * ENUMS de variation + mixin `sectionBaseSchema` + sous-schemas réutilisables, EXTRAITS
 * (rule 60) vers `src/sections/_shared/` (feuilles pures). Ré-exportés ici → exports INCHANGÉS. */
export {
  // placement (couche atomique)
  placementAlign,
  placementJustify,
  placementHide,
  regionPlacement,
  placementSchema,
  // L7
  justifyContentEnum,
  alignItemsEnum,
  justifyItemsEnum,
  alignContentEnum,
  cellAlignXEnum,
  cellAlignYEnum,
  cellPadEnum,
  mediaFitEnum,
  mediaRatioEnum,
  // L8
  hoverEnum,
  pressFeedbackEnum,
  focusRingEnum,
  transitionSpeedEnum,
  transitionEaseEnum,
  selectedStateEnum,
  openStateEnum,
  // L9
  revealEnum,
  revealDelayEnum,
  loopEnum,
  scrollMotionEnum,
  textMotionEnum,
  motionSpeedEnum,
  motionEaseEnum,
  pageTransitionEnum,
  // L10bis
  cellBgEnum,
  cellToneEnum,
  toneEnum,
  borderToneEnum,
  // L11
  textFlowEnum,
  textTransformEnum,
  rotateEnum,
  objectPositionEnum,
  overflowEnum,
  scrollSnapEnum,
  // L6 / L12 / L13
  measureEnum,
  clampEnum,
  minHeightEnum,
  widthEnum,
  headingLevelEnum,
  // COMPOSITION (SYS v2-E)
  headerAlignEnum,
  headerKindEnum,
  introRowEnum,
  dividersEnum,
  cardContentEnum,
  cardMediaEnum,
  cardAlignEnum,
  colorDistributionEnum,
  bgSourceEnum,
  // mixin de base
  sectionBaseSchema,
} from '../sections/_shared/base';

// Sous-schemas partagés (ctaSchema, etc.) - ré-export inchangé.
export {
  bilingualString,
  ctaSchema,
  metricSchema,
  featureItemSchema,
  stepSchema,
  faqItemSchema,
  pricingTierSchema,
  testimonialSchema,
  comparisonRowSchema,
  timelineEventSchema,
} from '../sections/_shared/subschemas';

// Helpers locaux historiques (déplacés one-shot vers _shared/locals) - ré-export inchangé.
export * from '../sections/_shared/locals';

// Schemas par type + union + types dérivés + sectionsArraySchema (GENERES depuis les modules).
export * from './sections.generated';
