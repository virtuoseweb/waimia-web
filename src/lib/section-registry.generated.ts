// ⚠️ FICHIER GENERE - NE PAS EDITER A LA MAIN.
// Source : scripts/gen-section-aggregate.mjs (Wave #38 T5, mode REPLACE).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.
// (src/lib/section-registry.generated.ts)

import type { SectionType } from '@waimia/ds-kernel';
import type { SectionDescriptor } from './section-registry-types';
import { meta as heroFormInlineMeta } from '../sections/hero-form-inline/meta';
import { meta as heroSocialProofMeta } from '../sections/hero-social-proof/meta';
import { meta as featureComparisonGridMeta } from '../sections/feature-comparison-grid/meta';
import { meta as featureAccordionMeta } from '../sections/feature-accordion/meta';
import { meta as faqCtaAsideMeta } from '../sections/faq-cta-aside/meta';
import { meta as ctaFormInlineMeta } from '../sections/cta-form-inline/meta';
import { meta as leadCaptureBandMeta } from '../sections/lead-capture-band/meta';
import { meta as contactFormMeta } from '../sections/contact-form/meta';
import { meta as bookingEmbedMeta } from '../sections/booking-embed/meta';
import { meta as newsletterSignupSectionMeta } from '../sections/newsletter-signup-section/meta';
import { meta as dataTableMeta } from '../sections/data-table/meta';
import { meta as articleGridMeta } from '../sections/article-grid/meta';
import { meta as resourceCardGridMeta } from '../sections/resource-card-grid/meta';
import { meta as processStepsMeta } from '../sections/process-steps/meta';
import { meta as timelineHorizontalMeta } from '../sections/timeline-horizontal/meta';
import { meta as codeShowcaseMeta } from '../sections/code-showcase/meta';
import { meta as announcementBannerMeta } from '../sections/announcement-banner/meta';
import { meta as trustBadgesBandMeta } from '../sections/trust-badges-band/meta';
import { meta as testimonialLogoMetricMeta } from '../sections/testimonial-logo-metric/meta';
import { meta as statCounterMeta } from '../sections/stat-counter/meta';
import { meta as versusCompetitorsMeta } from '../sections/versus-competitors/meta';
import { meta as logoMarqueeMeta } from '../sections/logo-marquee/meta';
import { meta as heroSplitMeta } from '../sections/hero-split/meta';
import { meta as heroSplitMediaMeta } from '../sections/hero-split-media/meta';
import { meta as mastheadBarMeta } from '../sections/masthead-bar/meta';
import { meta as breadcrumbBarMeta } from '../sections/breadcrumb-bar/meta';
import { meta as heroEditorialKpiMeta } from '../sections/hero-editorial-kpi/meta';
import { meta as heroScopeMinimapMeta } from '../sections/hero-scope-minimap/meta';
import { meta as heroThinMediaMeta } from '../sections/hero-thin-media/meta';
import { meta as heroTechSignatureMeta } from '../sections/hero-tech-signature/meta';
import { meta as heroTrizoneMeta } from '../sections/hero-trizone/meta';
import { meta as heroNumeralCoverMeta } from '../sections/hero-numeral-cover/meta';
import { meta as heroMastheadCardMeta } from '../sections/hero-masthead-card/meta';
import { meta as statementOrbitMeta } from '../sections/statement-orbit/meta';
import { meta as heroCapabilityBandMeta } from '../sections/hero-capability-band/meta';
import { meta as heroSummaryRailMeta } from '../sections/hero-summary-rail/meta';
import { meta as heroEditorialMastheadMeta } from '../sections/hero-editorial-masthead/meta';
import { meta as heroAsymmetricGridMeta } from '../sections/hero-asymmetric-grid/meta';
import { meta as heroCenteredBandMeta } from '../sections/hero-centered-band/meta';
import { meta as heroMediaMedallionMeta } from '../sections/hero-media-medallion/meta';
import { meta as heroBaselineStatsMeta } from '../sections/hero-baseline-stats/meta';
import { meta as heroGrid12Meta } from '../sections/hero-grid-12/meta';
import { meta as heroCardCoverMeta } from '../sections/hero-card-cover/meta';
import { meta as heroStackRhythmMeta } from '../sections/hero-stack-rhythm/meta';
import { meta as heroMagazineCoverMeta } from '../sections/hero-magazine-cover/meta';
import { meta as heroCenteredMeta } from '../sections/hero-centered/meta';
import { meta as heroFullBleedMeta } from '../sections/hero-full-bleed/meta';
import { meta as heroHubListingMeta } from '../sections/hero-hub-listing/meta';
import { meta as heroServiceDetailMeta } from '../sections/hero-service-detail/meta';
import { meta as heroPillarHubMeta } from '../sections/hero-pillar-hub/meta';
import { meta as heroCaseStudyMeta } from '../sections/hero-case-study/meta';
import { meta as heroHomeMeta } from '../sections/hero-home/meta';
import { meta as heroLandingMeta } from '../sections/hero-landing/meta';
import { meta as heroProblemIndexMeta } from '../sections/hero-problem-index/meta';
import { meta as heroSectorMeta } from '../sections/hero-sector/meta';
import { meta as heroUtilityMastheadMeta } from '../sections/hero-utility-masthead/meta';
import { meta as heroAcademyHubMeta } from '../sections/hero-academy-hub/meta';
import { meta as heroHubMastheadMeta } from '../sections/hero-hub-masthead/meta';
import { meta as trustLegalSectionMeta } from '../sections/trust-legal-section/meta';
import { meta as welcomeSectionMeta } from '../sections/welcome-section/meta';
import { meta as listIndexSectionMeta } from '../sections/list-index-section/meta';
import { meta as heroOfferDetailMeta } from '../sections/hero-offer-detail/meta';
import { meta as heroTechLayerMeta } from '../sections/hero-tech-layer/meta';
import { meta as heroConversionFunnelMeta } from '../sections/hero-conversion-funnel/meta';
import { meta as heroHubStatsMeta } from '../sections/hero-hub-stats/meta';
import { meta as heroServiceMastheadMeta } from '../sections/hero-service-masthead/meta';
import { meta as heroDetailMenuMeta } from '../sections/hero-detail-menu/meta';
import { meta as heroAuthorMeta } from '../sections/hero-author/meta';
import { meta as heroLeadMagnetMeta } from '../sections/hero-lead-magnet/meta';
import { meta as heroCourseMeta } from '../sections/hero-course/meta';
import { meta as heroTunnelStepMeta } from '../sections/hero-tunnel-step/meta';
import { meta as tunnelStepHeroMeta } from '../sections/tunnel-step-hero/meta';
import { meta as tunnelStepNavMeta } from '../sections/tunnel-step-nav/meta';
import { meta as marqueeBandMeta } from '../sections/marquee-band/meta';
import { meta as problemsGridMeta } from '../sections/problems-grid/meta';
import { meta as whyStallsMeta } from '../sections/why-stalls/meta';
import { meta as howWeShipMeta } from '../sections/how-we-ship/meta';
import { meta as operatingLayerMeta } from '../sections/operating-layer/meta';
import { meta as manifestoBlockMeta } from '../sections/manifesto-block/meta';
import { meta as heroEssayMeta } from '../sections/hero-essay/meta';
import { meta as heroLiquidMeta } from '../sections/hero-liquid/meta';
import { meta as proofBarMeta } from '../sections/proof-bar/meta';
import { meta as statBlockMeta } from '../sections/stat-block/meta';
import { meta as metricShiftMeta } from '../sections/metric-shift/meta';
import { meta as socialProofMeta } from '../sections/social-proof/meta';
import { meta as siteShowcaseMeta } from '../sections/site-showcase/meta';
import { meta as ecosystemPartnersMeta } from '../sections/ecosystem-partners/meta';
import { meta as methodTimelineMeta } from '../sections/method-timeline/meta';
import { meta as featureGridMeta } from '../sections/feature-grid/meta';
import { meta as comparisonTableMeta } from '../sections/comparison-table/meta';
import { meta as timelineBlockMeta } from '../sections/timeline-block/meta';
import { meta as mediaBlockMeta } from '../sections/media-block/meta';
import { meta as pricingTableMeta } from '../sections/pricing-table/meta';
import { meta as faqAccordionMeta } from '../sections/faq-accordion/meta';
import { meta as objectionHandlerMeta } from '../sections/objection-handler/meta';
import { meta as ctaFinalMeta } from '../sections/cta-final/meta';
import { meta as ctaBandMeta } from '../sections/cta-band/meta';
import { meta as ctaInlineMeta } from '../sections/cta-inline/meta';
import { meta as testimonialBlockMeta } from '../sections/testimonial-block/meta';
import { meta as testimonialWallMeta } from '../sections/testimonial-wall/meta';
import { meta as guaranteeBlockMeta } from '../sections/guarantee-block/meta';
import { meta as architectureDiagramMeta } from '../sections/architecture-diagram/meta';
import { meta as servicesGridMeta } from '../sections/services-grid/meta';
import { meta as sectorCardGridMeta } from '../sections/sector-card-grid/meta';
import { meta as maturityPyramidMeta } from '../sections/maturity-pyramid/meta';
import { meta as useCaseIndexMeta } from '../sections/use-case-index/meta';
import { meta as caseCardGridMeta } from '../sections/case-card-grid/meta';
import { meta as caseFeaturedGridMeta } from '../sections/case-featured-grid/meta';
import { meta as tierPyramidSvgMeta } from '../sections/tier-pyramid-svg/meta';
import { meta as offerTierGridMeta } from '../sections/offer-tier-grid/meta';
import { meta as teamCardGridMeta } from '../sections/team-card-grid/meta';
import { meta as heroAtlasMeta } from '../sections/hero-atlas/meta';
import { meta as personaAttributesGridMeta } from '../sections/persona-attributes-grid/meta';
import { meta as editorialSplitGridMeta } from '../sections/editorial-split-grid/meta';
import { meta as comingSoonPillsMeta } from '../sections/coming-soon-pills/meta';
import { meta as commitmentsGridMeta } from '../sections/commitments-grid/meta';
import { meta as brandedCalloutMeta } from '../sections/branded-callout/meta';
import { meta as editorialPreviewMeta } from '../sections/editorial-preview/meta';
import { meta as newsletterBandMeta } from '../sections/newsletter-band/meta';
import { meta as specBarMeta } from '../sections/spec-bar/meta';
import { meta as deliverablesGridMeta } from '../sections/deliverables-grid/meta';
import { meta as techStackBandMeta } from '../sections/tech-stack-band/meta';
import { meta as relatedCardsBandMeta } from '../sections/related-cards-band/meta';
import { meta as relatedLinksMeta } from '../sections/related-links/meta';
import { meta as pullQuoteBlockMeta } from '../sections/pull-quote-block/meta';
import { meta as inclusionsListMeta } from '../sections/inclusions-list/meta';
import { meta as problemStatementMeta } from '../sections/problem-statement/meta';
import { meta as bentoGridMeta } from '../sections/bento-grid/meta';
import { meta as featureZigzagMeta } from '../sections/feature-zigzag/meta';
import { meta as scrollGalleryMeta } from '../sections/scroll-gallery/meta';
import { meta as stackCardsMeta } from '../sections/stack-cards/meta';
import { meta as hoverRevealListMeta } from '../sections/hover-reveal-list/meta';
import { meta as horizontalShowcaseMeta } from '../sections/horizontal-showcase/meta';
import { meta as mediaBentoMeta } from '../sections/media-bento/meta';
import { meta as photoClusterMeta } from '../sections/photo-cluster/meta';
import { meta as mediaSwapBandMeta } from '../sections/media-swap-band/meta';
import { meta as logoWallMeta } from '../sections/logo-wall/meta';
import { meta as pricingComparisonMatrixMeta } from '../sections/pricing-comparison-matrix/meta';
import { meta as galleryMasonryMeta } from '../sections/gallery-masonry/meta';
import { meta as featureTabsMeta } from '../sections/feature-tabs/meta';
import { meta as iconTrioMeta } from '../sections/icon-trio/meta';
import { meta as quoteSpotlightMeta } from '../sections/quote-spotlight/meta';
import { meta as stepsHorizontalMeta } from '../sections/steps-horizontal/meta';
import { meta as ctaSplitVisualMeta } from '../sections/cta-split-visual/meta';
import { meta as statsBentoMeta } from '../sections/stats-bento/meta';
import { meta as comparisonDuoMeta } from '../sections/comparison-duo/meta';
import { meta as serviceCatalogListMeta } from '../sections/service-catalog-list/meta';
import { meta as fitColumnsMeta } from '../sections/fit-columns/meta';
import { meta as editorialTableBlockMeta } from '../sections/editorial-table-block/meta';
import { meta as decisionListMeta } from '../sections/decision-list/meta';
import { meta as techPositioningSplitMeta } from '../sections/tech-positioning-split/meta';
import { meta as techCapabilitiesSpecsMeta } from '../sections/tech-capabilities-specs/meta';
import { meta as techModelsTableMeta } from '../sections/tech-models-table/meta';
import { meta as techWhenDualMeta } from '../sections/tech-when-dual/meta';
import { meta as techIntegrationFlowMeta } from '../sections/tech-integration-flow/meta';
import { meta as painPointsMeta } from '../sections/pain-points/meta';
import { meta as workflowTableMeta } from '../sections/workflow-table/meta';
import { meta as roiBandMeta } from '../sections/roi-band/meta';
import { meta as offProofMeta } from '../sections/off-proof/meta';
import { meta as caseSplitMeta } from '../sections/case-split/meta';
import { meta as departmentStackMeta } from '../sections/department-stack/meta';
import { meta as courseCatalogTableMeta } from '../sections/course-catalog-table/meta';
import { meta as learningPathListMeta } from '../sections/learning-path-list/meta';
import { meta as departmentCtaMeta } from '../sections/department-cta/meta';
import { meta as terminalTableMeta } from '../sections/terminal-table/meta';
import { meta as editorialWriteFeedMeta } from '../sections/editorial-write-feed/meta';
import { meta as productReelMeta } from '../sections/product-reel/meta';
import { meta as agenticTerminalMeta } from '../sections/agentic-terminal/meta';
import { meta as challengesGridMeta } from '../sections/challenges-grid/meta';
import { meta as journeyStepsMeta } from '../sections/journey-steps/meta';
import { meta as manifestoStatementMeta } from '../sections/manifesto-statement/meta';
import { meta as manifestoActMeta } from '../sections/manifesto-act/meta';
import { meta as asymmetricServicesMeta } from '../sections/asymmetric-services/meta';
import { meta as terminalMockupMeta } from '../sections/terminal-mockup/meta';
import { meta as terminalMetricsStripMeta } from '../sections/terminal-metrics-strip/meta';
import { meta as pricingCardsMeta } from '../sections/pricing-cards/meta';
import { meta as pricingTabsShowcaseMeta } from '../sections/pricing-tabs-showcase/meta';
import { meta as engagementLedgerMeta } from '../sections/engagement-ledger/meta';
import { meta as pricingToggleMeta } from '../sections/pricing-toggle/meta';
import { meta as pricingSingleHighlightMeta } from '../sections/pricing-single-highlight/meta';
import { meta as teamBioGridMeta } from '../sections/team-bio-grid/meta';
import { meta as aboutStorySplitMeta } from '../sections/about-story-split/meta';
import { meta as footerCtaBandMeta } from '../sections/footer-cta-band/meta';
import { meta as integrationsGridMeta } from '../sections/integrations-grid/meta';
import { meta as featureSplitMediaMeta } from '../sections/feature-split-media/meta';
import { meta as metricCalloutBandMeta } from '../sections/metric-callout-band/meta';
import { meta as numberedLayerListMeta } from '../sections/numbered-layer-list/meta';
import { meta as testimonialSingleSpotlightMeta } from '../sections/testimonial-single-spotlight/meta';
import { meta as faqTwoColumnMeta } from '../sections/faq-two-column/meta';
import { meta as ctaNewsletterFooterMeta } from '../sections/cta-newsletter-footer/meta';
import { meta as comparisonPricingCalloutMeta } from '../sections/comparison-pricing-callout/meta';
import { meta as diagnosticStagesMeta } from '../sections/diagnostic-stages/meta';
import { meta as caseSpotlightMeta } from '../sections/case-spotlight/meta';
import { meta as testimonialMetricsMeta } from '../sections/testimonial-metrics/meta';
import { meta as editorialProseMeta } from '../sections/editorial-prose/meta';
import { meta as keyMetricGridMeta } from '../sections/key-metric-grid/meta';
import { meta as editorialCalloutMeta } from '../sections/editorial-callout/meta';
import { meta as editorialDropcapProseMeta } from '../sections/editorial-dropcap-prose/meta';
import { meta as editorialDingbatRuleMeta } from '../sections/editorial-dingbat-rule/meta';
import { meta as editorialTimelineMeta } from '../sections/editorial-timeline/meta';
import { meta as directAnswerMeta } from '../sections/direct-answer/meta';
import { meta as authorBylineMeta } from '../sections/author-byline/meta';
import { meta as painSeverityListMeta } from '../sections/pain-severity-list/meta';
import { meta as definitionExtractMeta } from '../sections/definition-extract/meta';
import { meta as systemFlowMeta } from '../sections/system-flow/meta';
import { meta as methodSteplineMeta } from '../sections/method-stepline/meta';
import { meta as eeatPanelMeta } from '../sections/eeat-panel/meta';
import { meta as richTextMeta } from '../sections/rich-text/meta';
import { meta as stickyScrollStorytellingMeta } from '../sections/sticky-scroll-storytelling/meta';
import { meta as hoverRevealWordsMeta } from '../sections/hover-reveal-words/meta';
import { meta as provenanceChipMeta } from '../sections/provenance-chip/meta';
import { meta as usedServiceCalloutMeta } from '../sections/used-service-callout/meta';
import { meta as heroManifestoMeta } from '../sections/hero-manifesto/meta';
import { meta as editorialCaseGridMeta } from '../sections/editorial-case-grid/meta';
import { meta as keywordStripMeta } from '../sections/keyword-strip/meta';
import { meta as proseAsideMeta } from '../sections/prose-aside/meta';
import { meta as borderedPullquoteMeta } from '../sections/bordered-pullquote/meta';
import { meta as signedWritingListMeta } from '../sections/signed-writing-list/meta';
import { meta as methodDiagramListMeta } from '../sections/method-diagram-list/meta';
import { meta as curriculumTimelineMeta } from '../sections/curriculum-timeline/meta';
import { meta as publicationsPanelMeta } from '../sections/publications-panel/meta';
import { meta as closingCtaBandMeta } from '../sections/closing-cta-band/meta';
import { meta as offerRailMeta } from '../sections/offer-rail/meta';
import { meta as marketCasesMeta } from '../sections/market-cases/meta';

export const SECTIONS: Record<SectionType, SectionDescriptor> = {
  'hero-form-inline': {
    ...heroFormInlineMeta,
  },
  'hero-social-proof': {
    ...heroSocialProofMeta,
  },
  'feature-comparison-grid': {
    ...featureComparisonGridMeta,
  },
  'feature-accordion': {
    ...featureAccordionMeta,
  },
  'faq-cta-aside': {
    ...faqCtaAsideMeta,
  },
  'cta-form-inline': {
    ...ctaFormInlineMeta,
  },
  'lead-capture-band': {
    ...leadCaptureBandMeta,
  },
  'contact-form': {
    ...contactFormMeta,
  },
  'booking-embed': {
    ...bookingEmbedMeta,
  },
  'newsletter-signup-section': {
    ...newsletterSignupSectionMeta,
  },
  'data-table': {
    ...dataTableMeta,
  },
  'article-grid': {
    ...articleGridMeta,
  },
  'resource-card-grid': {
    ...resourceCardGridMeta,
  },
  'process-steps': {
    ...processStepsMeta,
  },
  'timeline-horizontal': {
    ...timelineHorizontalMeta,
  },
  'code-showcase': {
    ...codeShowcaseMeta,
  },
  'announcement-banner': {
    ...announcementBannerMeta,
  },
  'trust-badges-band': {
    ...trustBadgesBandMeta,
  },
  'testimonial-logo-metric': {
    ...testimonialLogoMetricMeta,
  },
  'stat-counter': {
    ...statCounterMeta,
  },
  'versus-competitors': {
    ...versusCompetitorsMeta,
  },
  'logo-marquee': {
    ...logoMarqueeMeta,
  },
  'hero-split': {
    ...heroSplitMeta,
  },
  'hero-split-media': {
    ...heroSplitMediaMeta,
  },
  'masthead-bar': {
    ...mastheadBarMeta,
  },
  'breadcrumb-bar': {
    ...breadcrumbBarMeta,
  },
  'hero-editorial-kpi': {
    ...heroEditorialKpiMeta,
  },
  'hero-scope-minimap': {
    ...heroScopeMinimapMeta,
  },
  'hero-thin-media': {
    ...heroThinMediaMeta,
  },
  'hero-tech-signature': {
    ...heroTechSignatureMeta,
  },
  'hero-trizone': {
    ...heroTrizoneMeta,
  },
  'hero-numeral-cover': {
    ...heroNumeralCoverMeta,
  },
  'hero-masthead-card': {
    ...heroMastheadCardMeta,
  },
  'statement-orbit': {
    ...statementOrbitMeta,
  },
  'hero-capability-band': {
    ...heroCapabilityBandMeta,
  },
  'hero-summary-rail': {
    ...heroSummaryRailMeta,
  },
  'hero-editorial-masthead': {
    ...heroEditorialMastheadMeta,
  },
  'hero-asymmetric-grid': {
    ...heroAsymmetricGridMeta,
  },
  'hero-centered-band': {
    ...heroCenteredBandMeta,
  },
  'hero-media-medallion': {
    ...heroMediaMedallionMeta,
  },
  'hero-baseline-stats': {
    ...heroBaselineStatsMeta,
  },
  'hero-grid-12': {
    ...heroGrid12Meta,
  },
  'hero-card-cover': {
    ...heroCardCoverMeta,
  },
  'hero-stack-rhythm': {
    ...heroStackRhythmMeta,
  },
  'hero-magazine-cover': {
    ...heroMagazineCoverMeta,
  },
  'hero-centered': {
    ...heroCenteredMeta,
  },
  'hero-full-bleed': {
    ...heroFullBleedMeta,
  },
  'hero-hub-listing': {
    ...heroHubListingMeta,
  },
  'hero-service-detail': {
    ...heroServiceDetailMeta,
  },
  'hero-pillar-hub': {
    ...heroPillarHubMeta,
  },
  'hero-case-study': {
    ...heroCaseStudyMeta,
  },
  'hero-home': {
    ...heroHomeMeta,
  },
  'hero-landing': {
    ...heroLandingMeta,
  },
  'hero-problem-index': {
    ...heroProblemIndexMeta,
  },
  'hero-sector': {
    ...heroSectorMeta,
  },
  'hero-utility-masthead': {
    ...heroUtilityMastheadMeta,
  },
  'hero-academy-hub': {
    ...heroAcademyHubMeta,
  },
  'hero-hub-masthead': {
    ...heroHubMastheadMeta,
  },
  'trust-legal-section': {
    ...trustLegalSectionMeta,
  },
  'welcome-section': {
    ...welcomeSectionMeta,
  },
  'list-index-section': {
    ...listIndexSectionMeta,
  },
  'hero-offer-detail': {
    ...heroOfferDetailMeta,
  },
  'hero-tech-layer': {
    ...heroTechLayerMeta,
  },
  'hero-conversion-funnel': {
    ...heroConversionFunnelMeta,
  },
  'hero-hub-stats': {
    ...heroHubStatsMeta,
  },
  'hero-service-masthead': {
    ...heroServiceMastheadMeta,
  },
  'hero-detail-menu': {
    ...heroDetailMenuMeta,
  },
  'hero-author': {
    ...heroAuthorMeta,
  },
  'hero-lead-magnet': {
    ...heroLeadMagnetMeta,
  },
  'hero-course': {
    ...heroCourseMeta,
  },
  'hero-tunnel-step': {
    ...heroTunnelStepMeta,
  },
  'tunnel-step-hero': {
    ...tunnelStepHeroMeta,
  },
  'tunnel-step-nav': {
    ...tunnelStepNavMeta,
  },
  'marquee-band': {
    ...marqueeBandMeta,
  },
  'problems-grid': {
    ...problemsGridMeta,
  },
  'why-stalls': {
    ...whyStallsMeta,
  },
  'how-we-ship': {
    ...howWeShipMeta,
  },
  'operating-layer': {
    ...operatingLayerMeta,
  },
  'manifesto-block': {
    ...manifestoBlockMeta,
  },
  'hero-essay': {
    ...heroEssayMeta,
  },
  'hero-liquid': {
    ...heroLiquidMeta,
  },
  'proof-bar': {
    ...proofBarMeta,
  },
  'stat-block': {
    ...statBlockMeta,
  },
  'metric-shift': {
    ...metricShiftMeta,
  },
  'social-proof': {
    ...socialProofMeta,
  },
  'site-showcase': {
    ...siteShowcaseMeta,
  },
  'ecosystem-partners': {
    ...ecosystemPartnersMeta,
  },
  'method-timeline': {
    ...methodTimelineMeta,
  },
  'feature-grid': {
    ...featureGridMeta,
  },
  'comparison-table': {
    ...comparisonTableMeta,
  },
  'timeline-block': {
    ...timelineBlockMeta,
  },
  'media-block': {
    ...mediaBlockMeta,
  },
  'pricing-table': {
    ...pricingTableMeta,
  },
  'faq-accordion': {
    ...faqAccordionMeta,
  },
  'objection-handler': {
    ...objectionHandlerMeta,
  },
  'cta-final': {
    ...ctaFinalMeta,
  },
  'cta-band': {
    ...ctaBandMeta,
  },
  'cta-inline': {
    ...ctaInlineMeta,
  },
  'testimonial-block': {
    ...testimonialBlockMeta,
  },
  'testimonial-wall': {
    ...testimonialWallMeta,
  },
  'guarantee-block': {
    ...guaranteeBlockMeta,
  },
  'architecture-diagram': {
    ...architectureDiagramMeta,
  },
  'services-grid': {
    ...servicesGridMeta,
  },
  'sector-card-grid': {
    ...sectorCardGridMeta,
  },
  'maturity-pyramid': {
    ...maturityPyramidMeta,
  },
  'use-case-index': {
    ...useCaseIndexMeta,
  },
  'case-card-grid': {
    ...caseCardGridMeta,
  },
  'case-featured-grid': {
    ...caseFeaturedGridMeta,
  },
  'tier-pyramid-svg': {
    ...tierPyramidSvgMeta,
  },
  'offer-tier-grid': {
    ...offerTierGridMeta,
  },
  'team-card-grid': {
    ...teamCardGridMeta,
  },
  'hero-atlas': {
    ...heroAtlasMeta,
  },
  'persona-attributes-grid': {
    ...personaAttributesGridMeta,
  },
  'editorial-split-grid': {
    ...editorialSplitGridMeta,
  },
  'coming-soon-pills': {
    ...comingSoonPillsMeta,
  },
  'commitments-grid': {
    ...commitmentsGridMeta,
  },
  'branded-callout': {
    ...brandedCalloutMeta,
  },
  'editorial-preview': {
    ...editorialPreviewMeta,
  },
  'newsletter-band': {
    ...newsletterBandMeta,
  },
  'spec-bar': {
    ...specBarMeta,
  },
  'deliverables-grid': {
    ...deliverablesGridMeta,
  },
  'tech-stack-band': {
    ...techStackBandMeta,
  },
  'related-cards-band': {
    ...relatedCardsBandMeta,
  },
  'related-links': {
    ...relatedLinksMeta,
  },
  'pull-quote-block': {
    ...pullQuoteBlockMeta,
  },
  'inclusions-list': {
    ...inclusionsListMeta,
  },
  'problem-statement': {
    ...problemStatementMeta,
  },
  'bento-grid': {
    ...bentoGridMeta,
  },
  'feature-zigzag': {
    ...featureZigzagMeta,
  },
  'scroll-gallery': {
    ...scrollGalleryMeta,
  },
  'stack-cards': {
    ...stackCardsMeta,
  },
  'hover-reveal-list': {
    ...hoverRevealListMeta,
  },
  'horizontal-showcase': {
    ...horizontalShowcaseMeta,
  },
  'media-bento': {
    ...mediaBentoMeta,
  },
  'photo-cluster': {
    ...photoClusterMeta,
  },
  'media-swap-band': {
    ...mediaSwapBandMeta,
  },
  'logo-wall': {
    ...logoWallMeta,
  },
  'pricing-comparison-matrix': {
    ...pricingComparisonMatrixMeta,
  },
  'gallery-masonry': {
    ...galleryMasonryMeta,
  },
  'feature-tabs': {
    ...featureTabsMeta,
  },
  'icon-trio': {
    ...iconTrioMeta,
  },
  'quote-spotlight': {
    ...quoteSpotlightMeta,
  },
  'steps-horizontal': {
    ...stepsHorizontalMeta,
  },
  'cta-split-visual': {
    ...ctaSplitVisualMeta,
  },
  'stats-bento': {
    ...statsBentoMeta,
  },
  'comparison-duo': {
    ...comparisonDuoMeta,
  },
  'service-catalog-list': {
    ...serviceCatalogListMeta,
  },
  'fit-columns': {
    ...fitColumnsMeta,
  },
  'editorial-table-block': {
    ...editorialTableBlockMeta,
  },
  'decision-list': {
    ...decisionListMeta,
  },
  'tech-positioning-split': {
    ...techPositioningSplitMeta,
  },
  'tech-capabilities-specs': {
    ...techCapabilitiesSpecsMeta,
  },
  'tech-models-table': {
    ...techModelsTableMeta,
  },
  'tech-when-dual': {
    ...techWhenDualMeta,
  },
  'tech-integration-flow': {
    ...techIntegrationFlowMeta,
  },
  'pain-points': {
    ...painPointsMeta,
  },
  'workflow-table': {
    ...workflowTableMeta,
  },
  'roi-band': {
    ...roiBandMeta,
  },
  'off-proof': {
    ...offProofMeta,
  },
  'case-split': {
    ...caseSplitMeta,
  },
  'department-stack': {
    ...departmentStackMeta,
  },
  'course-catalog-table': {
    ...courseCatalogTableMeta,
  },
  'learning-path-list': {
    ...learningPathListMeta,
  },
  'department-cta': {
    ...departmentCtaMeta,
  },
  'terminal-table': {
    ...terminalTableMeta,
  },
  'editorial-write-feed': {
    ...editorialWriteFeedMeta,
  },
  'product-reel': {
    ...productReelMeta,
  },
  'agentic-terminal': {
    ...agenticTerminalMeta,
  },
  'challenges-grid': {
    ...challengesGridMeta,
  },
  'journey-steps': {
    ...journeyStepsMeta,
  },
  'manifesto-statement': {
    ...manifestoStatementMeta,
  },
  'manifesto-act': {
    ...manifestoActMeta,
  },
  'asymmetric-services': {
    ...asymmetricServicesMeta,
  },
  'terminal-mockup': {
    ...terminalMockupMeta,
  },
  'terminal-metrics-strip': {
    ...terminalMetricsStripMeta,
  },
  'pricing-cards': {
    ...pricingCardsMeta,
  },
  'pricing-tabs-showcase': {
    ...pricingTabsShowcaseMeta,
  },
  'engagement-ledger': {
    ...engagementLedgerMeta,
  },
  'pricing-toggle': {
    ...pricingToggleMeta,
  },
  'pricing-single-highlight': {
    ...pricingSingleHighlightMeta,
  },
  'team-bio-grid': {
    ...teamBioGridMeta,
  },
  'about-story-split': {
    ...aboutStorySplitMeta,
  },
  'footer-cta-band': {
    ...footerCtaBandMeta,
  },
  'integrations-grid': {
    ...integrationsGridMeta,
  },
  'feature-split-media': {
    ...featureSplitMediaMeta,
  },
  'metric-callout-band': {
    ...metricCalloutBandMeta,
  },
  'numbered-layer-list': {
    ...numberedLayerListMeta,
  },
  'testimonial-single-spotlight': {
    ...testimonialSingleSpotlightMeta,
  },
  'faq-two-column': {
    ...faqTwoColumnMeta,
  },
  'cta-newsletter-footer': {
    ...ctaNewsletterFooterMeta,
  },
  'comparison-pricing-callout': {
    ...comparisonPricingCalloutMeta,
  },
  'diagnostic-stages': {
    ...diagnosticStagesMeta,
  },
  'case-spotlight': {
    ...caseSpotlightMeta,
  },
  'testimonial-metrics': {
    ...testimonialMetricsMeta,
  },
  'editorial-prose': {
    ...editorialProseMeta,
  },
  'key-metric-grid': {
    ...keyMetricGridMeta,
  },
  'editorial-callout': {
    ...editorialCalloutMeta,
  },
  'editorial-dropcap-prose': {
    ...editorialDropcapProseMeta,
  },
  'editorial-dingbat-rule': {
    ...editorialDingbatRuleMeta,
  },
  'editorial-timeline': {
    ...editorialTimelineMeta,
  },
  'direct-answer': {
    ...directAnswerMeta,
  },
  'author-byline': {
    ...authorBylineMeta,
  },
  'pain-severity-list': {
    ...painSeverityListMeta,
  },
  'definition-extract': {
    ...definitionExtractMeta,
  },
  'system-flow': {
    ...systemFlowMeta,
  },
  'method-stepline': {
    ...methodSteplineMeta,
  },
  'eeat-panel': {
    ...eeatPanelMeta,
  },
  'rich-text': {
    ...richTextMeta,
  },
  'sticky-scroll-storytelling': {
    ...stickyScrollStorytellingMeta,
  },
  'hover-reveal-words': {
    ...hoverRevealWordsMeta,
  },
  'provenance-chip': {
    ...provenanceChipMeta,
  },
  'used-service-callout': {
    ...usedServiceCalloutMeta,
  },
  'hero-manifesto': {
    ...heroManifestoMeta,
  },
  'editorial-case-grid': {
    ...editorialCaseGridMeta,
  },
  'keyword-strip': {
    ...keywordStripMeta,
  },
  'prose-aside': {
    ...proseAsideMeta,
  },
  'bordered-pullquote': {
    ...borderedPullquoteMeta,
  },
  'signed-writing-list': {
    ...signedWritingListMeta,
  },
  'method-diagram-list': {
    ...methodDiagramListMeta,
  },
  'curriculum-timeline': {
    ...curriculumTimelineMeta,
  },
  'publications-panel': {
    ...publicationsPanelMeta,
  },
  'closing-cta-band': {
    ...closingCtaBandMeta,
  },
  'offer-rail': {
    ...offerRailMeta,
  },
  'market-cases': {
    ...marketCasesMeta,
  },
};
