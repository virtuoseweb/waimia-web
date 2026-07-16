// ⚠️ FICHIER GENERE - NE PAS EDITER A LA MAIN.
// Source : scripts/gen-section-aggregate.mjs (Wave #38 T5, mode REPLACE).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.
// (packages/ds-kernel/src/schemas/sections.generated.ts)

import { z } from 'zod';

import { schema as aboutStorySplitSchema } from '../sections/about-story-split/schema';
import { schema as agenticTerminalSchema } from '../sections/agentic-terminal/schema';
import { schema as announcementBannerSchema } from '../sections/announcement-banner/schema';
import { schema as architectureDiagramSchema } from '../sections/architecture-diagram/schema';
import { schema as articleGridSchema } from '../sections/article-grid/schema';
import { schema as asymmetricServicesSchema } from '../sections/asymmetric-services/schema';
import { schema as authorBylineSchema } from '../sections/author-byline/schema';
import { schema as bentoGridSchema } from '../sections/bento-grid/schema';
import { schema as bookingEmbedSchema } from '../sections/booking-embed/schema';
import { schema as brandedCalloutSchema } from '../sections/branded-callout/schema';
import { schema as breadcrumbBarSchema } from '../sections/breadcrumb-bar/schema';
import { schema as caseCardGridSchema } from '../sections/case-card-grid/schema';
import { schema as caseFeaturedGridSchema } from '../sections/case-featured-grid/schema';
import { schema as caseSplitSchema } from '../sections/case-split/schema';
import { schema as caseSpotlightSchema } from '../sections/case-spotlight/schema';
import { schema as challengesGridSchema } from '../sections/challenges-grid/schema';
import { schema as codeShowcaseSchema } from '../sections/code-showcase/schema';
import { schema as comingSoonPillsSchema } from '../sections/coming-soon-pills/schema';
import { schema as commitmentsGridSchema } from '../sections/commitments-grid/schema';
import { schema as comparisonDuoSchema } from '../sections/comparison-duo/schema';
import { schema as comparisonPricingCalloutSchema } from '../sections/comparison-pricing-callout/schema';
import { schema as comparisonTableSchema } from '../sections/comparison-table/schema';
import { schema as contactFormSchema } from '../sections/contact-form/schema';
import { schema as courseCatalogTableSchema } from '../sections/course-catalog-table/schema';
import { schema as ctaBandSchema } from '../sections/cta-band/schema';
import { schema as ctaFinalSchema } from '../sections/cta-final/schema';
import { schema as ctaFormInlineSchema } from '../sections/cta-form-inline/schema';
import { schema as ctaInlineSchema } from '../sections/cta-inline/schema';
import { schema as ctaNewsletterFooterSchema } from '../sections/cta-newsletter-footer/schema';
import { schema as ctaSplitVisualSchema } from '../sections/cta-split-visual/schema';
import { schema as dataTableSchema } from '../sections/data-table/schema';
import { schema as decisionListSchema } from '../sections/decision-list/schema';
import { schema as definitionExtractSchema } from '../sections/definition-extract/schema';
import { schema as deliverablesGridSchema } from '../sections/deliverables-grid/schema';
import { schema as departmentCtaSchema } from '../sections/department-cta/schema';
import { schema as departmentStackSchema } from '../sections/department-stack/schema';
import { schema as diagnosticStagesSchema } from '../sections/diagnostic-stages/schema';
import { schema as directAnswerSchema } from '../sections/direct-answer/schema';
import { schema as ecosystemPartnersSchema } from '../sections/ecosystem-partners/schema';
import { schema as editorialCalloutSchema } from '../sections/editorial-callout/schema';
import { schema as editorialDingbatRuleSchema } from '../sections/editorial-dingbat-rule/schema';
import { schema as editorialDropcapProseSchema } from '../sections/editorial-dropcap-prose/schema';
import { schema as editorialPreviewSchema } from '../sections/editorial-preview/schema';
import { schema as editorialProseSchema } from '../sections/editorial-prose/schema';
import { schema as editorialSplitGridSchema } from '../sections/editorial-split-grid/schema';
import { schema as editorialTableBlockSchema } from '../sections/editorial-table-block/schema';
import { schema as editorialTimelineSchema } from '../sections/editorial-timeline/schema';
import { schema as editorialWriteFeedSchema } from '../sections/editorial-write-feed/schema';
import { schema as eeatPanelSchema } from '../sections/eeat-panel/schema';
import { schema as faqAccordionSchema } from '../sections/faq-accordion/schema';
import { schema as faqCtaAsideSchema } from '../sections/faq-cta-aside/schema';
import { schema as faqTwoColumnSchema } from '../sections/faq-two-column/schema';
import { schema as featureAccordionSchema } from '../sections/feature-accordion/schema';
import { schema as featureComparisonGridSchema } from '../sections/feature-comparison-grid/schema';
import { schema as featureGridSchema } from '../sections/feature-grid/schema';
import { schema as featureSplitMediaSchema } from '../sections/feature-split-media/schema';
import { schema as featureTabsSchema } from '../sections/feature-tabs/schema';
import { schema as featureZigzagSchema } from '../sections/feature-zigzag/schema';
import { schema as fitColumnsSchema } from '../sections/fit-columns/schema';
import { schema as footerCtaBandSchema } from '../sections/footer-cta-band/schema';
import { schema as galleryMasonrySchema } from '../sections/gallery-masonry/schema';
import { schema as guaranteeBlockSchema } from '../sections/guarantee-block/schema';
import { schema as heroAcademyHubSchema } from '../sections/hero-academy-hub/schema';
import { schema as heroAsymmetricGridSchema } from '../sections/hero-asymmetric-grid/schema';
import { schema as heroAtlasSchema } from '../sections/hero-atlas/schema';
import { schema as heroAuthorSchema } from '../sections/hero-author/schema';
import { schema as heroBaselineStatsSchema } from '../sections/hero-baseline-stats/schema';
import { schema as heroCapabilityBandSchema } from '../sections/hero-capability-band/schema';
import { schema as heroCardCoverSchema } from '../sections/hero-card-cover/schema';
import { schema as heroCaseStudySchema } from '../sections/hero-case-study/schema';
import { schema as heroCenteredSchema } from '../sections/hero-centered/schema';
import { schema as heroCenteredBandSchema } from '../sections/hero-centered-band/schema';
import { schema as heroConversionFunnelSchema } from '../sections/hero-conversion-funnel/schema';
import { schema as heroCourseSchema } from '../sections/hero-course/schema';
import { schema as heroDetailMenuSchema } from '../sections/hero-detail-menu/schema';
import { schema as heroEditorialKpiSchema } from '../sections/hero-editorial-kpi/schema';
import { schema as heroEditorialMastheadSchema } from '../sections/hero-editorial-masthead/schema';
import { schema as heroEssaySchema } from '../sections/hero-essay/schema';
import { schema as heroFormInlineSchema } from '../sections/hero-form-inline/schema';
import { schema as heroFullBleedSchema } from '../sections/hero-full-bleed/schema';
import { schema as heroGrid12Schema } from '../sections/hero-grid-12/schema';
import { schema as heroHomeSchema } from '../sections/hero-home/schema';
import { schema as heroHubListingSchema } from '../sections/hero-hub-listing/schema';
import { schema as heroHubMastheadSchema } from '../sections/hero-hub-masthead/schema';
import { schema as heroHubStatsSchema } from '../sections/hero-hub-stats/schema';
import { schema as heroLandingSchema } from '../sections/hero-landing/schema';
import { schema as heroLeadMagnetSchema } from '../sections/hero-lead-magnet/schema';
import { schema as heroLiquidSchema } from '../sections/hero-liquid/schema';
import { schema as heroMagazineCoverSchema } from '../sections/hero-magazine-cover/schema';
import { schema as heroMastheadCardSchema } from '../sections/hero-masthead-card/schema';
import { schema as heroMediaMedallionSchema } from '../sections/hero-media-medallion/schema';
import { schema as heroNumeralCoverSchema } from '../sections/hero-numeral-cover/schema';
import { schema as heroOfferDetailSchema } from '../sections/hero-offer-detail/schema';
import { schema as heroPillarHubSchema } from '../sections/hero-pillar-hub/schema';
import { schema as heroProblemIndexSchema } from '../sections/hero-problem-index/schema';
import { schema as heroScopeMinimapSchema } from '../sections/hero-scope-minimap/schema';
import { schema as heroSectorSchema } from '../sections/hero-sector/schema';
import { schema as heroServiceDetailSchema } from '../sections/hero-service-detail/schema';
import { schema as heroServiceMastheadSchema } from '../sections/hero-service-masthead/schema';
import { schema as heroSocialProofSchema } from '../sections/hero-social-proof/schema';
import { schema as heroSplitSchema } from '../sections/hero-split/schema';
import { schema as heroSplitMediaSchema } from '../sections/hero-split-media/schema';
import { schema as heroStackRhythmSchema } from '../sections/hero-stack-rhythm/schema';
import { schema as heroSummaryRailSchema } from '../sections/hero-summary-rail/schema';
import { schema as heroTechLayerSchema } from '../sections/hero-tech-layer/schema';
import { schema as heroTechSignatureSchema } from '../sections/hero-tech-signature/schema';
import { schema as heroThinMediaSchema } from '../sections/hero-thin-media/schema';
import { schema as heroTrizoneSchema } from '../sections/hero-trizone/schema';
import { schema as heroTunnelStepSchema } from '../sections/hero-tunnel-step/schema';
import { schema as heroUtilityMastheadSchema } from '../sections/hero-utility-masthead/schema';
import { schema as horizontalShowcaseSchema } from '../sections/horizontal-showcase/schema';
import { schema as hoverRevealListSchema } from '../sections/hover-reveal-list/schema';
import { schema as hoverRevealWordsSchema } from '../sections/hover-reveal-words/schema';
import { schema as howWeShipSchema } from '../sections/how-we-ship/schema';
import { schema as iconTrioSchema } from '../sections/icon-trio/schema';
import { schema as inclusionsListSchema } from '../sections/inclusions-list/schema';
import { schema as integrationsGridSchema } from '../sections/integrations-grid/schema';
import { schema as journeyStepsSchema } from '../sections/journey-steps/schema';
import { schema as keyMetricGridSchema } from '../sections/key-metric-grid/schema';
import { schema as learningPathListSchema } from '../sections/learning-path-list/schema';
import { schema as listIndexSectionSchema } from '../sections/list-index-section/schema';
import { schema as logoMarqueeSchema } from '../sections/logo-marquee/schema';
import { schema as logoWallSchema } from '../sections/logo-wall/schema';
import { schema as manifestoActSchema } from '../sections/manifesto-act/schema';
import { schema as manifestoBlockSchema } from '../sections/manifesto-block/schema';
import { schema as manifestoStatementSchema } from '../sections/manifesto-statement/schema';
import { schema as marqueeBandSchema } from '../sections/marquee-band/schema';
import { schema as mastheadBarSchema } from '../sections/masthead-bar/schema';
import { schema as maturityPyramidSchema } from '../sections/maturity-pyramid/schema';
import { schema as mediaBentoSchema } from '../sections/media-bento/schema';
import { schema as mediaBlockSchema } from '../sections/media-block/schema';
import { schema as mediaSwapBandSchema } from '../sections/media-swap-band/schema';
import { schema as methodSteplineSchema } from '../sections/method-stepline/schema';
import { schema as methodTimelineSchema } from '../sections/method-timeline/schema';
import { schema as metricCalloutBandSchema } from '../sections/metric-callout-band/schema';
import { schema as metricShiftSchema } from '../sections/metric-shift/schema';
import { schema as newsletterBandSchema } from '../sections/newsletter-band/schema';
import { schema as newsletterSignupSectionSchema } from '../sections/newsletter-signup-section/schema';
import { schema as objectionHandlerSchema } from '../sections/objection-handler/schema';
import { schema as offProofSchema } from '../sections/off-proof/schema';
import { schema as offerTierGridSchema } from '../sections/offer-tier-grid/schema';
import { schema as operatingLayerSchema } from '../sections/operating-layer/schema';
import { schema as painPointsSchema } from '../sections/pain-points/schema';
import { schema as painSeverityListSchema } from '../sections/pain-severity-list/schema';
import { schema as personaAttributesGridSchema } from '../sections/persona-attributes-grid/schema';
import { schema as photoClusterSchema } from '../sections/photo-cluster/schema';
import { schema as pricingCardsSchema } from '../sections/pricing-cards/schema';
import { schema as pricingComparisonMatrixSchema } from '../sections/pricing-comparison-matrix/schema';
import { schema as pricingSingleHighlightSchema } from '../sections/pricing-single-highlight/schema';
import { schema as pricingTableSchema } from '../sections/pricing-table/schema';
import { schema as pricingTabsShowcaseSchema } from '../sections/pricing-tabs-showcase/schema';
import { schema as pricingToggleSchema } from '../sections/pricing-toggle/schema';
import { schema as problemStatementSchema } from '../sections/problem-statement/schema';
import { schema as problemsGridSchema } from '../sections/problems-grid/schema';
import { schema as processStepsSchema } from '../sections/process-steps/schema';
import { schema as productReelSchema } from '../sections/product-reel/schema';
import { schema as proofBarSchema } from '../sections/proof-bar/schema';
import { schema as pullQuoteBlockSchema } from '../sections/pull-quote-block/schema';
import { schema as quoteSpotlightSchema } from '../sections/quote-spotlight/schema';
import { schema as relatedCardsBandSchema } from '../sections/related-cards-band/schema';
import { schema as relatedLinksSchema } from '../sections/related-links/schema';
import { schema as resourceCardGridSchema } from '../sections/resource-card-grid/schema';
import { schema as richTextSchema } from '../sections/rich-text/schema';
import { schema as roiBandSchema } from '../sections/roi-band/schema';
import { schema as scrollGallerySchema } from '../sections/scroll-gallery/schema';
import { schema as sectorCardGridSchema } from '../sections/sector-card-grid/schema';
import { schema as serviceCatalogListSchema } from '../sections/service-catalog-list/schema';
import { schema as servicesGridSchema } from '../sections/services-grid/schema';
import { schema as siteShowcaseSchema } from '../sections/site-showcase/schema';
import { schema as socialProofSchema } from '../sections/social-proof/schema';
import { schema as specBarSchema } from '../sections/spec-bar/schema';
import { schema as stackCardsSchema } from '../sections/stack-cards/schema';
import { schema as statBlockSchema } from '../sections/stat-block/schema';
import { schema as statCounterSchema } from '../sections/stat-counter/schema';
import { schema as statementOrbitSchema } from '../sections/statement-orbit/schema';
import { schema as statsBentoSchema } from '../sections/stats-bento/schema';
import { schema as stepsHorizontalSchema } from '../sections/steps-horizontal/schema';
import { schema as stickyScrollStorytellingSchema } from '../sections/sticky-scroll-storytelling/schema';
import { schema as systemFlowSchema } from '../sections/system-flow/schema';
import { schema as teamBioGridSchema } from '../sections/team-bio-grid/schema';
import { schema as teamCardGridSchema } from '../sections/team-card-grid/schema';
import { schema as techCapabilitiesSpecsSchema } from '../sections/tech-capabilities-specs/schema';
import { schema as techIntegrationFlowSchema } from '../sections/tech-integration-flow/schema';
import { schema as techModelsTableSchema } from '../sections/tech-models-table/schema';
import { schema as techPositioningSplitSchema } from '../sections/tech-positioning-split/schema';
import { schema as techStackBandSchema } from '../sections/tech-stack-band/schema';
import { schema as techWhenDualSchema } from '../sections/tech-when-dual/schema';
import { schema as terminalMetricsStripSchema } from '../sections/terminal-metrics-strip/schema';
import { schema as terminalMockupSchema } from '../sections/terminal-mockup/schema';
import { schema as terminalTableSchema } from '../sections/terminal-table/schema';
import { schema as testimonialBlockSchema } from '../sections/testimonial-block/schema';
import { schema as testimonialLogoMetricSchema } from '../sections/testimonial-logo-metric/schema';
import { schema as testimonialMetricsSchema } from '../sections/testimonial-metrics/schema';
import { schema as testimonialSingleSpotlightSchema } from '../sections/testimonial-single-spotlight/schema';
import { schema as testimonialWallSchema } from '../sections/testimonial-wall/schema';
import { schema as tierPyramidSvgSchema } from '../sections/tier-pyramid-svg/schema';
import { schema as timelineBlockSchema } from '../sections/timeline-block/schema';
import { schema as timelineHorizontalSchema } from '../sections/timeline-horizontal/schema';
import { schema as trustBadgesBandSchema } from '../sections/trust-badges-band/schema';
import { schema as trustLegalSectionSchema } from '../sections/trust-legal-section/schema';
import { schema as tunnelStepHeroSchema } from '../sections/tunnel-step-hero/schema';
import { schema as tunnelStepNavSchema } from '../sections/tunnel-step-nav/schema';
import { schema as useCaseIndexSchema } from '../sections/use-case-index/schema';
import { schema as versusCompetitorsSchema } from '../sections/versus-competitors/schema';
import { schema as welcomeSectionSchema } from '../sections/welcome-section/schema';
import { schema as whyStallsSchema } from '../sections/why-stalls/schema';
import { schema as workflowTableSchema } from '../sections/workflow-table/schema';

export {
  aboutStorySplitSchema,
  agenticTerminalSchema,
  announcementBannerSchema,
  architectureDiagramSchema,
  articleGridSchema,
  asymmetricServicesSchema,
  authorBylineSchema,
  bentoGridSchema,
  bookingEmbedSchema,
  brandedCalloutSchema,
  breadcrumbBarSchema,
  caseCardGridSchema,
  caseFeaturedGridSchema,
  caseSplitSchema,
  caseSpotlightSchema,
  challengesGridSchema,
  codeShowcaseSchema,
  comingSoonPillsSchema,
  commitmentsGridSchema,
  comparisonDuoSchema,
  comparisonPricingCalloutSchema,
  comparisonTableSchema,
  contactFormSchema,
  courseCatalogTableSchema,
  ctaBandSchema,
  ctaFinalSchema,
  ctaFormInlineSchema,
  ctaInlineSchema,
  ctaNewsletterFooterSchema,
  ctaSplitVisualSchema,
  dataTableSchema,
  decisionListSchema,
  definitionExtractSchema,
  deliverablesGridSchema,
  departmentCtaSchema,
  departmentStackSchema,
  diagnosticStagesSchema,
  directAnswerSchema,
  ecosystemPartnersSchema,
  editorialCalloutSchema,
  editorialDingbatRuleSchema,
  editorialDropcapProseSchema,
  editorialPreviewSchema,
  editorialProseSchema,
  editorialSplitGridSchema,
  editorialTableBlockSchema,
  editorialTimelineSchema,
  editorialWriteFeedSchema,
  eeatPanelSchema,
  faqAccordionSchema,
  faqCtaAsideSchema,
  faqTwoColumnSchema,
  featureAccordionSchema,
  featureComparisonGridSchema,
  featureGridSchema,
  featureSplitMediaSchema,
  featureTabsSchema,
  featureZigzagSchema,
  fitColumnsSchema,
  footerCtaBandSchema,
  galleryMasonrySchema,
  guaranteeBlockSchema,
  heroAcademyHubSchema,
  heroAsymmetricGridSchema,
  heroAtlasSchema,
  heroAuthorSchema,
  heroBaselineStatsSchema,
  heroCapabilityBandSchema,
  heroCardCoverSchema,
  heroCaseStudySchema,
  heroCenteredSchema,
  heroCenteredBandSchema,
  heroConversionFunnelSchema,
  heroCourseSchema,
  heroDetailMenuSchema,
  heroEditorialKpiSchema,
  heroEditorialMastheadSchema,
  heroEssaySchema,
  heroFormInlineSchema,
  heroFullBleedSchema,
  heroGrid12Schema,
  heroHomeSchema,
  heroHubListingSchema,
  heroHubMastheadSchema,
  heroHubStatsSchema,
  heroLandingSchema,
  heroLeadMagnetSchema,
  heroLiquidSchema,
  heroMagazineCoverSchema,
  heroMastheadCardSchema,
  heroMediaMedallionSchema,
  heroNumeralCoverSchema,
  heroOfferDetailSchema,
  heroPillarHubSchema,
  heroProblemIndexSchema,
  heroScopeMinimapSchema,
  heroSectorSchema,
  heroServiceDetailSchema,
  heroServiceMastheadSchema,
  heroSocialProofSchema,
  heroSplitSchema,
  heroSplitMediaSchema,
  heroStackRhythmSchema,
  heroSummaryRailSchema,
  heroTechLayerSchema,
  heroTechSignatureSchema,
  heroThinMediaSchema,
  heroTrizoneSchema,
  heroTunnelStepSchema,
  heroUtilityMastheadSchema,
  horizontalShowcaseSchema,
  hoverRevealListSchema,
  hoverRevealWordsSchema,
  howWeShipSchema,
  iconTrioSchema,
  inclusionsListSchema,
  integrationsGridSchema,
  journeyStepsSchema,
  keyMetricGridSchema,
  learningPathListSchema,
  listIndexSectionSchema,
  logoMarqueeSchema,
  logoWallSchema,
  manifestoActSchema,
  manifestoBlockSchema,
  manifestoStatementSchema,
  marqueeBandSchema,
  mastheadBarSchema,
  maturityPyramidSchema,
  mediaBentoSchema,
  mediaBlockSchema,
  mediaSwapBandSchema,
  methodSteplineSchema,
  methodTimelineSchema,
  metricCalloutBandSchema,
  metricShiftSchema,
  newsletterBandSchema,
  newsletterSignupSectionSchema,
  objectionHandlerSchema,
  offProofSchema,
  offerTierGridSchema,
  operatingLayerSchema,
  painPointsSchema,
  painSeverityListSchema,
  personaAttributesGridSchema,
  photoClusterSchema,
  pricingCardsSchema,
  pricingComparisonMatrixSchema,
  pricingSingleHighlightSchema,
  pricingTableSchema,
  pricingTabsShowcaseSchema,
  pricingToggleSchema,
  problemStatementSchema,
  problemsGridSchema,
  processStepsSchema,
  productReelSchema,
  proofBarSchema,
  pullQuoteBlockSchema,
  quoteSpotlightSchema,
  relatedCardsBandSchema,
  relatedLinksSchema,
  resourceCardGridSchema,
  richTextSchema,
  roiBandSchema,
  scrollGallerySchema,
  sectorCardGridSchema,
  serviceCatalogListSchema,
  servicesGridSchema,
  siteShowcaseSchema,
  socialProofSchema,
  specBarSchema,
  stackCardsSchema,
  statBlockSchema,
  statCounterSchema,
  statementOrbitSchema,
  statsBentoSchema,
  stepsHorizontalSchema,
  stickyScrollStorytellingSchema,
  systemFlowSchema,
  teamBioGridSchema,
  teamCardGridSchema,
  techCapabilitiesSpecsSchema,
  techIntegrationFlowSchema,
  techModelsTableSchema,
  techPositioningSplitSchema,
  techStackBandSchema,
  techWhenDualSchema,
  terminalMetricsStripSchema,
  terminalMockupSchema,
  terminalTableSchema,
  testimonialBlockSchema,
  testimonialLogoMetricSchema,
  testimonialMetricsSchema,
  testimonialSingleSpotlightSchema,
  testimonialWallSchema,
  tierPyramidSvgSchema,
  timelineBlockSchema,
  timelineHorizontalSchema,
  trustBadgesBandSchema,
  trustLegalSectionSchema,
  tunnelStepHeroSchema,
  tunnelStepNavSchema,
  useCaseIndexSchema,
  versusCompetitorsSchema,
  welcomeSectionSchema,
  whyStallsSchema,
  workflowTableSchema,
};

export const sectionSchema = z.discriminatedUnion('type', [
  aboutStorySplitSchema,
  agenticTerminalSchema,
  announcementBannerSchema,
  architectureDiagramSchema,
  articleGridSchema,
  asymmetricServicesSchema,
  authorBylineSchema,
  bentoGridSchema,
  bookingEmbedSchema,
  brandedCalloutSchema,
  breadcrumbBarSchema,
  caseCardGridSchema,
  caseFeaturedGridSchema,
  caseSplitSchema,
  caseSpotlightSchema,
  challengesGridSchema,
  codeShowcaseSchema,
  comingSoonPillsSchema,
  commitmentsGridSchema,
  comparisonDuoSchema,
  comparisonPricingCalloutSchema,
  comparisonTableSchema,
  contactFormSchema,
  courseCatalogTableSchema,
  ctaBandSchema,
  ctaFinalSchema,
  ctaFormInlineSchema,
  ctaInlineSchema,
  ctaNewsletterFooterSchema,
  ctaSplitVisualSchema,
  dataTableSchema,
  decisionListSchema,
  definitionExtractSchema,
  deliverablesGridSchema,
  departmentCtaSchema,
  departmentStackSchema,
  diagnosticStagesSchema,
  directAnswerSchema,
  ecosystemPartnersSchema,
  editorialCalloutSchema,
  editorialDingbatRuleSchema,
  editorialDropcapProseSchema,
  editorialPreviewSchema,
  editorialProseSchema,
  editorialSplitGridSchema,
  editorialTableBlockSchema,
  editorialTimelineSchema,
  editorialWriteFeedSchema,
  eeatPanelSchema,
  faqAccordionSchema,
  faqCtaAsideSchema,
  faqTwoColumnSchema,
  featureAccordionSchema,
  featureComparisonGridSchema,
  featureGridSchema,
  featureSplitMediaSchema,
  featureTabsSchema,
  featureZigzagSchema,
  fitColumnsSchema,
  footerCtaBandSchema,
  galleryMasonrySchema,
  guaranteeBlockSchema,
  heroAcademyHubSchema,
  heroAsymmetricGridSchema,
  heroAtlasSchema,
  heroAuthorSchema,
  heroBaselineStatsSchema,
  heroCapabilityBandSchema,
  heroCardCoverSchema,
  heroCaseStudySchema,
  heroCenteredSchema,
  heroCenteredBandSchema,
  heroConversionFunnelSchema,
  heroCourseSchema,
  heroDetailMenuSchema,
  heroEditorialKpiSchema,
  heroEditorialMastheadSchema,
  heroEssaySchema,
  heroFormInlineSchema,
  heroFullBleedSchema,
  heroGrid12Schema,
  heroHomeSchema,
  heroHubListingSchema,
  heroHubMastheadSchema,
  heroHubStatsSchema,
  heroLandingSchema,
  heroLeadMagnetSchema,
  heroLiquidSchema,
  heroMagazineCoverSchema,
  heroMastheadCardSchema,
  heroMediaMedallionSchema,
  heroNumeralCoverSchema,
  heroOfferDetailSchema,
  heroPillarHubSchema,
  heroProblemIndexSchema,
  heroScopeMinimapSchema,
  heroSectorSchema,
  heroServiceDetailSchema,
  heroServiceMastheadSchema,
  heroSocialProofSchema,
  heroSplitSchema,
  heroSplitMediaSchema,
  heroStackRhythmSchema,
  heroSummaryRailSchema,
  heroTechLayerSchema,
  heroTechSignatureSchema,
  heroThinMediaSchema,
  heroTrizoneSchema,
  heroTunnelStepSchema,
  heroUtilityMastheadSchema,
  horizontalShowcaseSchema,
  hoverRevealListSchema,
  hoverRevealWordsSchema,
  howWeShipSchema,
  iconTrioSchema,
  inclusionsListSchema,
  integrationsGridSchema,
  journeyStepsSchema,
  keyMetricGridSchema,
  learningPathListSchema,
  listIndexSectionSchema,
  logoMarqueeSchema,
  logoWallSchema,
  manifestoActSchema,
  manifestoBlockSchema,
  manifestoStatementSchema,
  marqueeBandSchema,
  mastheadBarSchema,
  maturityPyramidSchema,
  mediaBentoSchema,
  mediaBlockSchema,
  mediaSwapBandSchema,
  methodSteplineSchema,
  methodTimelineSchema,
  metricCalloutBandSchema,
  metricShiftSchema,
  newsletterBandSchema,
  newsletterSignupSectionSchema,
  objectionHandlerSchema,
  offProofSchema,
  offerTierGridSchema,
  operatingLayerSchema,
  painPointsSchema,
  painSeverityListSchema,
  personaAttributesGridSchema,
  photoClusterSchema,
  pricingCardsSchema,
  pricingComparisonMatrixSchema,
  pricingSingleHighlightSchema,
  pricingTableSchema,
  pricingTabsShowcaseSchema,
  pricingToggleSchema,
  problemStatementSchema,
  problemsGridSchema,
  processStepsSchema,
  productReelSchema,
  proofBarSchema,
  pullQuoteBlockSchema,
  quoteSpotlightSchema,
  relatedCardsBandSchema,
  relatedLinksSchema,
  resourceCardGridSchema,
  richTextSchema,
  roiBandSchema,
  scrollGallerySchema,
  sectorCardGridSchema,
  serviceCatalogListSchema,
  servicesGridSchema,
  siteShowcaseSchema,
  socialProofSchema,
  specBarSchema,
  stackCardsSchema,
  statBlockSchema,
  statCounterSchema,
  statementOrbitSchema,
  statsBentoSchema,
  stepsHorizontalSchema,
  stickyScrollStorytellingSchema,
  systemFlowSchema,
  teamBioGridSchema,
  teamCardGridSchema,
  techCapabilitiesSpecsSchema,
  techIntegrationFlowSchema,
  techModelsTableSchema,
  techPositioningSplitSchema,
  techStackBandSchema,
  techWhenDualSchema,
  terminalMetricsStripSchema,
  terminalMockupSchema,
  terminalTableSchema,
  testimonialBlockSchema,
  testimonialLogoMetricSchema,
  testimonialMetricsSchema,
  testimonialSingleSpotlightSchema,
  testimonialWallSchema,
  tierPyramidSvgSchema,
  timelineBlockSchema,
  timelineHorizontalSchema,
  trustBadgesBandSchema,
  trustLegalSectionSchema,
  tunnelStepHeroSchema,
  tunnelStepNavSchema,
  useCaseIndexSchema,
  versusCompetitorsSchema,
  welcomeSectionSchema,
  whyStallsSchema,
  workflowTableSchema,
]);

export type SectionData = (typeof sectionSchema)['_output'];

const sectionWithAnchorSchema = z.intersection(
  sectionSchema,
  z.object({
    anchor: z
      .string()
      .regex(/^[a-z0-9-]+$/, 'anchor doit etre un slug kebab-case (a-z, 0-9, tirets)')
      .optional(),
    expand: z.boolean().optional(),
  }),
);

export const sectionsArraySchema = z.array(sectionWithAnchorSchema).default([]);

export type SectionType = SectionData['type'];
export type SectionByType<T extends SectionType> = Extract<SectionData, { type: T }>;
