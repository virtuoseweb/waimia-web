// ⚠️ FICHIER GENERE - NE PAS EDITER A LA MAIN.
// Source : scripts/gen-section-aggregate.mjs (Wave #38 T5, mode REPLACE).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.
// (src/lib/section-registry.generated.ts)

import type { SectionType } from '@waimia/ds-kernel';
import type { SectionDescriptor, AstroComponent } from './section-registry-types';
import { Component as heroFormInlineComponent, meta as heroFormInlineMeta } from '../sections/hero-form-inline';
import { Component as heroSocialProofComponent, meta as heroSocialProofMeta } from '../sections/hero-social-proof';
import { Component as featureComparisonGridComponent, meta as featureComparisonGridMeta } from '../sections/feature-comparison-grid';
import { Component as featureAccordionComponent, meta as featureAccordionMeta } from '../sections/feature-accordion';
import { Component as faqCtaAsideComponent, meta as faqCtaAsideMeta } from '../sections/faq-cta-aside';
import { Component as ctaFormInlineComponent, meta as ctaFormInlineMeta } from '../sections/cta-form-inline';
import { Component as contactFormComponent, meta as contactFormMeta } from '../sections/contact-form';
import { Component as bookingEmbedComponent, meta as bookingEmbedMeta } from '../sections/booking-embed';
import { Component as newsletterSignupSectionComponent, meta as newsletterSignupSectionMeta } from '../sections/newsletter-signup-section';
import { Component as dataTableComponent, meta as dataTableMeta } from '../sections/data-table';
import { Component as articleGridComponent, meta as articleGridMeta } from '../sections/article-grid';
import { Component as resourceCardGridComponent, meta as resourceCardGridMeta } from '../sections/resource-card-grid';
import { Component as processStepsComponent, meta as processStepsMeta } from '../sections/process-steps';
import { Component as timelineHorizontalComponent, meta as timelineHorizontalMeta } from '../sections/timeline-horizontal';
import { Component as codeShowcaseComponent, meta as codeShowcaseMeta } from '../sections/code-showcase';
import { Component as announcementBannerComponent, meta as announcementBannerMeta } from '../sections/announcement-banner';
import { Component as trustBadgesBandComponent, meta as trustBadgesBandMeta } from '../sections/trust-badges-band';
import { Component as testimonialLogoMetricComponent, meta as testimonialLogoMetricMeta } from '../sections/testimonial-logo-metric';
import { Component as statCounterComponent, meta as statCounterMeta } from '../sections/stat-counter';
import { Component as versusCompetitorsComponent, meta as versusCompetitorsMeta } from '../sections/versus-competitors';
import { Component as logoMarqueeComponent, meta as logoMarqueeMeta } from '../sections/logo-marquee';
import { Component as heroSplitComponent, meta as heroSplitMeta } from '../sections/hero-split';
import { Component as heroSplitMediaComponent, meta as heroSplitMediaMeta } from '../sections/hero-split-media';
import { Component as mastheadBarComponent, meta as mastheadBarMeta } from '../sections/masthead-bar';
import { Component as breadcrumbBarComponent, meta as breadcrumbBarMeta } from '../sections/breadcrumb-bar';
import { Component as heroEditorialKpiComponent, meta as heroEditorialKpiMeta } from '../sections/hero-editorial-kpi';
import { Component as heroScopeMinimapComponent, meta as heroScopeMinimapMeta } from '../sections/hero-scope-minimap';
import { Component as heroThinMediaComponent, meta as heroThinMediaMeta } from '../sections/hero-thin-media';
import { Component as heroTechSignatureComponent, meta as heroTechSignatureMeta } from '../sections/hero-tech-signature';
import { Component as heroTrizoneComponent, meta as heroTrizoneMeta } from '../sections/hero-trizone';
import { Component as heroNumeralCoverComponent, meta as heroNumeralCoverMeta } from '../sections/hero-numeral-cover';
import { Component as heroMastheadCardComponent, meta as heroMastheadCardMeta } from '../sections/hero-masthead-card';
import { Component as statementOrbitComponent, meta as statementOrbitMeta } from '../sections/statement-orbit';
import { Component as heroCapabilityBandComponent, meta as heroCapabilityBandMeta } from '../sections/hero-capability-band';
import { Component as heroSummaryRailComponent, meta as heroSummaryRailMeta } from '../sections/hero-summary-rail';
import { Component as heroEditorialMastheadComponent, meta as heroEditorialMastheadMeta } from '../sections/hero-editorial-masthead';
import { Component as heroAsymmetricGridComponent, meta as heroAsymmetricGridMeta } from '../sections/hero-asymmetric-grid';
import { Component as heroCenteredBandComponent, meta as heroCenteredBandMeta } from '../sections/hero-centered-band';
import { Component as heroMediaMedallionComponent, meta as heroMediaMedallionMeta } from '../sections/hero-media-medallion';
import { Component as heroBaselineStatsComponent, meta as heroBaselineStatsMeta } from '../sections/hero-baseline-stats';
import { Component as heroGrid12Component, meta as heroGrid12Meta } from '../sections/hero-grid-12';
import { Component as heroCardCoverComponent, meta as heroCardCoverMeta } from '../sections/hero-card-cover';
import { Component as heroStackRhythmComponent, meta as heroStackRhythmMeta } from '../sections/hero-stack-rhythm';
import { Component as heroMagazineCoverComponent, meta as heroMagazineCoverMeta } from '../sections/hero-magazine-cover';
import { Component as heroCenteredComponent, meta as heroCenteredMeta } from '../sections/hero-centered';
import { Component as heroFullBleedComponent, meta as heroFullBleedMeta } from '../sections/hero-full-bleed';
import { Component as heroHubListingComponent, meta as heroHubListingMeta } from '../sections/hero-hub-listing';
import { Component as heroServiceDetailComponent, meta as heroServiceDetailMeta } from '../sections/hero-service-detail';
import { Component as heroPillarHubComponent, meta as heroPillarHubMeta } from '../sections/hero-pillar-hub';
import { Component as heroCaseStudyComponent, meta as heroCaseStudyMeta } from '../sections/hero-case-study';
import { Component as heroHomeComponent, meta as heroHomeMeta } from '../sections/hero-home';
import { Component as heroLandingComponent, meta as heroLandingMeta } from '../sections/hero-landing';
import { Component as heroProblemIndexComponent, meta as heroProblemIndexMeta } from '../sections/hero-problem-index';
import { Component as heroSectorComponent, meta as heroSectorMeta } from '../sections/hero-sector';
import { Component as heroUtilityMastheadComponent, meta as heroUtilityMastheadMeta } from '../sections/hero-utility-masthead';
import { Component as heroAcademyHubComponent, meta as heroAcademyHubMeta } from '../sections/hero-academy-hub';
import { Component as heroHubMastheadComponent, meta as heroHubMastheadMeta } from '../sections/hero-hub-masthead';
import { Component as trustLegalSectionComponent, meta as trustLegalSectionMeta } from '../sections/trust-legal-section';
import { Component as welcomeSectionComponent, meta as welcomeSectionMeta } from '../sections/welcome-section';
import { Component as listIndexSectionComponent, meta as listIndexSectionMeta } from '../sections/list-index-section';
import { Component as heroOfferDetailComponent, meta as heroOfferDetailMeta } from '../sections/hero-offer-detail';
import { Component as heroTechLayerComponent, meta as heroTechLayerMeta } from '../sections/hero-tech-layer';
import { Component as heroConversionFunnelComponent, meta as heroConversionFunnelMeta } from '../sections/hero-conversion-funnel';
import { Component as heroHubStatsComponent, meta as heroHubStatsMeta } from '../sections/hero-hub-stats';
import { Component as heroServiceMastheadComponent, meta as heroServiceMastheadMeta } from '../sections/hero-service-masthead';
import { Component as heroDetailMenuComponent, meta as heroDetailMenuMeta } from '../sections/hero-detail-menu';
import { Component as heroAuthorComponent, meta as heroAuthorMeta } from '../sections/hero-author';
import { Component as heroLeadMagnetComponent, meta as heroLeadMagnetMeta } from '../sections/hero-lead-magnet';
import { Component as heroCourseComponent, meta as heroCourseMeta } from '../sections/hero-course';
import { Component as heroTunnelStepComponent, meta as heroTunnelStepMeta } from '../sections/hero-tunnel-step';
import { Component as tunnelStepHeroComponent, meta as tunnelStepHeroMeta } from '../sections/tunnel-step-hero';
import { Component as tunnelStepNavComponent, meta as tunnelStepNavMeta } from '../sections/tunnel-step-nav';
import { Component as marqueeBandComponent, meta as marqueeBandMeta } from '../sections/marquee-band';
import { Component as problemsGridComponent, meta as problemsGridMeta } from '../sections/problems-grid';
import { Component as whyStallsComponent, meta as whyStallsMeta } from '../sections/why-stalls';
import { Component as howWeShipComponent, meta as howWeShipMeta } from '../sections/how-we-ship';
import { Component as operatingLayerComponent, meta as operatingLayerMeta } from '../sections/operating-layer';
import { Component as manifestoBlockComponent, meta as manifestoBlockMeta } from '../sections/manifesto-block';
import { Component as heroEssayComponent, meta as heroEssayMeta } from '../sections/hero-essay';
import { Component as heroLiquidComponent, meta as heroLiquidMeta } from '../sections/hero-liquid';
import { Component as proofBarComponent, meta as proofBarMeta } from '../sections/proof-bar';
import { Component as statBlockComponent, meta as statBlockMeta } from '../sections/stat-block';
import { Component as metricShiftComponent, meta as metricShiftMeta } from '../sections/metric-shift';
import { Component as socialProofComponent, meta as socialProofMeta } from '../sections/social-proof';
import { Component as siteShowcaseComponent, meta as siteShowcaseMeta } from '../sections/site-showcase';
import { Component as ecosystemPartnersComponent, meta as ecosystemPartnersMeta } from '../sections/ecosystem-partners';
import { Component as methodTimelineComponent, meta as methodTimelineMeta } from '../sections/method-timeline';
import { Component as featureGridComponent, meta as featureGridMeta } from '../sections/feature-grid';
import { Component as comparisonTableComponent, meta as comparisonTableMeta } from '../sections/comparison-table';
import { Component as timelineBlockComponent, meta as timelineBlockMeta } from '../sections/timeline-block';
import { Component as mediaBlockComponent, meta as mediaBlockMeta } from '../sections/media-block';
import { Component as pricingTableComponent, meta as pricingTableMeta } from '../sections/pricing-table';
import { Component as faqAccordionComponent, meta as faqAccordionMeta } from '../sections/faq-accordion';
import { Component as objectionHandlerComponent, meta as objectionHandlerMeta } from '../sections/objection-handler';
import { Component as ctaFinalComponent, meta as ctaFinalMeta } from '../sections/cta-final';
import { Component as ctaBandComponent, meta as ctaBandMeta } from '../sections/cta-band';
import { Component as ctaInlineComponent, meta as ctaInlineMeta } from '../sections/cta-inline';
import { Component as testimonialBlockComponent, meta as testimonialBlockMeta } from '../sections/testimonial-block';
import { Component as testimonialWallComponent, meta as testimonialWallMeta } from '../sections/testimonial-wall';
import { Component as guaranteeBlockComponent, meta as guaranteeBlockMeta } from '../sections/guarantee-block';
import { Component as architectureDiagramComponent, meta as architectureDiagramMeta } from '../sections/architecture-diagram';
import { Component as servicesGridComponent, meta as servicesGridMeta } from '../sections/services-grid';
import { Component as sectorCardGridComponent, meta as sectorCardGridMeta } from '../sections/sector-card-grid';
import { Component as maturityPyramidComponent, meta as maturityPyramidMeta } from '../sections/maturity-pyramid';
import { Component as useCaseIndexComponent, meta as useCaseIndexMeta } from '../sections/use-case-index';
import { Component as caseCardGridComponent, meta as caseCardGridMeta } from '../sections/case-card-grid';
import { Component as caseFeaturedGridComponent, meta as caseFeaturedGridMeta } from '../sections/case-featured-grid';
import { Component as tierPyramidSvgComponent, meta as tierPyramidSvgMeta } from '../sections/tier-pyramid-svg';
import { Component as offerTierGridComponent, meta as offerTierGridMeta } from '../sections/offer-tier-grid';
import { Component as teamCardGridComponent, meta as teamCardGridMeta } from '../sections/team-card-grid';
import { Component as heroAtlasComponent, meta as heroAtlasMeta } from '../sections/hero-atlas';
import { Component as personaAttributesGridComponent, meta as personaAttributesGridMeta } from '../sections/persona-attributes-grid';
import { Component as editorialSplitGridComponent, meta as editorialSplitGridMeta } from '../sections/editorial-split-grid';
import { Component as comingSoonPillsComponent, meta as comingSoonPillsMeta } from '../sections/coming-soon-pills';
import { Component as commitmentsGridComponent, meta as commitmentsGridMeta } from '../sections/commitments-grid';
import { Component as brandedCalloutComponent, meta as brandedCalloutMeta } from '../sections/branded-callout';
import { Component as editorialPreviewComponent, meta as editorialPreviewMeta } from '../sections/editorial-preview';
import { Component as newsletterBandComponent, meta as newsletterBandMeta } from '../sections/newsletter-band';
import { Component as specBarComponent, meta as specBarMeta } from '../sections/spec-bar';
import { Component as deliverablesGridComponent, meta as deliverablesGridMeta } from '../sections/deliverables-grid';
import { Component as techStackBandComponent, meta as techStackBandMeta } from '../sections/tech-stack-band';
import { Component as relatedCardsBandComponent, meta as relatedCardsBandMeta } from '../sections/related-cards-band';
import { Component as relatedLinksComponent, meta as relatedLinksMeta } from '../sections/related-links';
import { Component as pullQuoteBlockComponent, meta as pullQuoteBlockMeta } from '../sections/pull-quote-block';
import { Component as inclusionsListComponent, meta as inclusionsListMeta } from '../sections/inclusions-list';
import { Component as problemStatementComponent, meta as problemStatementMeta } from '../sections/problem-statement';
import { Component as bentoGridComponent, meta as bentoGridMeta } from '../sections/bento-grid';
import { Component as featureZigzagComponent, meta as featureZigzagMeta } from '../sections/feature-zigzag';
import { Component as scrollGalleryComponent, meta as scrollGalleryMeta } from '../sections/scroll-gallery';
import { Component as stackCardsComponent, meta as stackCardsMeta } from '../sections/stack-cards';
import { Component as hoverRevealListComponent, meta as hoverRevealListMeta } from '../sections/hover-reveal-list';
import { Component as horizontalShowcaseComponent, meta as horizontalShowcaseMeta } from '../sections/horizontal-showcase';
import { Component as mediaBentoComponent, meta as mediaBentoMeta } from '../sections/media-bento';
import { Component as photoClusterComponent, meta as photoClusterMeta } from '../sections/photo-cluster';
import { Component as mediaSwapBandComponent, meta as mediaSwapBandMeta } from '../sections/media-swap-band';
import { Component as logoWallComponent, meta as logoWallMeta } from '../sections/logo-wall';
import { Component as pricingComparisonMatrixComponent, meta as pricingComparisonMatrixMeta } from '../sections/pricing-comparison-matrix';
import { Component as galleryMasonryComponent, meta as galleryMasonryMeta } from '../sections/gallery-masonry';
import { Component as featureTabsComponent, meta as featureTabsMeta } from '../sections/feature-tabs';
import { Component as iconTrioComponent, meta as iconTrioMeta } from '../sections/icon-trio';
import { Component as quoteSpotlightComponent, meta as quoteSpotlightMeta } from '../sections/quote-spotlight';
import { Component as stepsHorizontalComponent, meta as stepsHorizontalMeta } from '../sections/steps-horizontal';
import { Component as ctaSplitVisualComponent, meta as ctaSplitVisualMeta } from '../sections/cta-split-visual';
import { Component as statsBentoComponent, meta as statsBentoMeta } from '../sections/stats-bento';
import { Component as comparisonDuoComponent, meta as comparisonDuoMeta } from '../sections/comparison-duo';
import { Component as serviceCatalogListComponent, meta as serviceCatalogListMeta } from '../sections/service-catalog-list';
import { Component as fitColumnsComponent, meta as fitColumnsMeta } from '../sections/fit-columns';
import { Component as editorialTableBlockComponent, meta as editorialTableBlockMeta } from '../sections/editorial-table-block';
import { Component as decisionListComponent, meta as decisionListMeta } from '../sections/decision-list';
import { Component as techPositioningSplitComponent, meta as techPositioningSplitMeta } from '../sections/tech-positioning-split';
import { Component as techCapabilitiesSpecsComponent, meta as techCapabilitiesSpecsMeta } from '../sections/tech-capabilities-specs';
import { Component as techModelsTableComponent, meta as techModelsTableMeta } from '../sections/tech-models-table';
import { Component as techWhenDualComponent, meta as techWhenDualMeta } from '../sections/tech-when-dual';
import { Component as techIntegrationFlowComponent, meta as techIntegrationFlowMeta } from '../sections/tech-integration-flow';
import { Component as painPointsComponent, meta as painPointsMeta } from '../sections/pain-points';
import { Component as workflowTableComponent, meta as workflowTableMeta } from '../sections/workflow-table';
import { Component as roiBandComponent, meta as roiBandMeta } from '../sections/roi-band';
import { Component as offProofComponent, meta as offProofMeta } from '../sections/off-proof';
import { Component as caseSplitComponent, meta as caseSplitMeta } from '../sections/case-split';
import { Component as departmentStackComponent, meta as departmentStackMeta } from '../sections/department-stack';
import { Component as courseCatalogTableComponent, meta as courseCatalogTableMeta } from '../sections/course-catalog-table';
import { Component as learningPathListComponent, meta as learningPathListMeta } from '../sections/learning-path-list';
import { Component as departmentCtaComponent, meta as departmentCtaMeta } from '../sections/department-cta';
import { Component as terminalTableComponent, meta as terminalTableMeta } from '../sections/terminal-table';
import { Component as editorialWriteFeedComponent, meta as editorialWriteFeedMeta } from '../sections/editorial-write-feed';
import { Component as productReelComponent, meta as productReelMeta } from '../sections/product-reel';
import { Component as agenticTerminalComponent, meta as agenticTerminalMeta } from '../sections/agentic-terminal';
import { Component as challengesGridComponent, meta as challengesGridMeta } from '../sections/challenges-grid';
import { Component as journeyStepsComponent, meta as journeyStepsMeta } from '../sections/journey-steps';
import { Component as manifestoStatementComponent, meta as manifestoStatementMeta } from '../sections/manifesto-statement';
import { Component as manifestoActComponent, meta as manifestoActMeta } from '../sections/manifesto-act';
import { Component as asymmetricServicesComponent, meta as asymmetricServicesMeta } from '../sections/asymmetric-services';
import { Component as terminalMockupComponent, meta as terminalMockupMeta } from '../sections/terminal-mockup';
import { Component as terminalMetricsStripComponent, meta as terminalMetricsStripMeta } from '../sections/terminal-metrics-strip';
import { Component as pricingCardsComponent, meta as pricingCardsMeta } from '../sections/pricing-cards';
import { Component as pricingTabsShowcaseComponent, meta as pricingTabsShowcaseMeta } from '../sections/pricing-tabs-showcase';
import { Component as engagementLedgerComponent, meta as engagementLedgerMeta } from '../sections/engagement-ledger';
import { Component as pricingToggleComponent, meta as pricingToggleMeta } from '../sections/pricing-toggle';
import { Component as pricingSingleHighlightComponent, meta as pricingSingleHighlightMeta } from '../sections/pricing-single-highlight';
import { Component as teamBioGridComponent, meta as teamBioGridMeta } from '../sections/team-bio-grid';
import { Component as aboutStorySplitComponent, meta as aboutStorySplitMeta } from '../sections/about-story-split';
import { Component as footerCtaBandComponent, meta as footerCtaBandMeta } from '../sections/footer-cta-band';
import { Component as integrationsGridComponent, meta as integrationsGridMeta } from '../sections/integrations-grid';
import { Component as featureSplitMediaComponent, meta as featureSplitMediaMeta } from '../sections/feature-split-media';
import { Component as metricCalloutBandComponent, meta as metricCalloutBandMeta } from '../sections/metric-callout-band';
import { Component as numberedLayerListComponent, meta as numberedLayerListMeta } from '../sections/numbered-layer-list';
import { Component as testimonialSingleSpotlightComponent, meta as testimonialSingleSpotlightMeta } from '../sections/testimonial-single-spotlight';
import { Component as faqTwoColumnComponent, meta as faqTwoColumnMeta } from '../sections/faq-two-column';
import { Component as ctaNewsletterFooterComponent, meta as ctaNewsletterFooterMeta } from '../sections/cta-newsletter-footer';
import { Component as comparisonPricingCalloutComponent, meta as comparisonPricingCalloutMeta } from '../sections/comparison-pricing-callout';
import { Component as diagnosticStagesComponent, meta as diagnosticStagesMeta } from '../sections/diagnostic-stages';
import { Component as caseSpotlightComponent, meta as caseSpotlightMeta } from '../sections/case-spotlight';
import { Component as testimonialMetricsComponent, meta as testimonialMetricsMeta } from '../sections/testimonial-metrics';
import { Component as editorialProseComponent, meta as editorialProseMeta } from '../sections/editorial-prose';
import { Component as keyMetricGridComponent, meta as keyMetricGridMeta } from '../sections/key-metric-grid';
import { Component as editorialCalloutComponent, meta as editorialCalloutMeta } from '../sections/editorial-callout';
import { Component as editorialDropcapProseComponent, meta as editorialDropcapProseMeta } from '../sections/editorial-dropcap-prose';
import { Component as editorialDingbatRuleComponent, meta as editorialDingbatRuleMeta } from '../sections/editorial-dingbat-rule';
import { Component as editorialTimelineComponent, meta as editorialTimelineMeta } from '../sections/editorial-timeline';
import { Component as directAnswerComponent, meta as directAnswerMeta } from '../sections/direct-answer';
import { Component as authorBylineComponent, meta as authorBylineMeta } from '../sections/author-byline';
import { Component as painSeverityListComponent, meta as painSeverityListMeta } from '../sections/pain-severity-list';
import { Component as definitionExtractComponent, meta as definitionExtractMeta } from '../sections/definition-extract';
import { Component as systemFlowComponent, meta as systemFlowMeta } from '../sections/system-flow';
import { Component as methodSteplineComponent, meta as methodSteplineMeta } from '../sections/method-stepline';
import { Component as eeatPanelComponent, meta as eeatPanelMeta } from '../sections/eeat-panel';
import { Component as richTextComponent, meta as richTextMeta } from '../sections/rich-text';
import { Component as stickyScrollStorytellingComponent, meta as stickyScrollStorytellingMeta } from '../sections/sticky-scroll-storytelling';
import { Component as hoverRevealWordsComponent, meta as hoverRevealWordsMeta } from '../sections/hover-reveal-words';
import { Component as provenanceChipComponent, meta as provenanceChipMeta } from '../sections/provenance-chip';
import { Component as usedServiceCalloutComponent, meta as usedServiceCalloutMeta } from '../sections/used-service-callout';
import { Component as heroManifestoComponent, meta as heroManifestoMeta } from '../sections/hero-manifesto';
import { Component as editorialCaseGridComponent, meta as editorialCaseGridMeta } from '../sections/editorial-case-grid';
import { Component as keywordStripComponent, meta as keywordStripMeta } from '../sections/keyword-strip';
import { Component as proseAsideComponent, meta as proseAsideMeta } from '../sections/prose-aside';
import { Component as borderedPullquoteComponent, meta as borderedPullquoteMeta } from '../sections/bordered-pullquote';
import { Component as signedWritingListComponent, meta as signedWritingListMeta } from '../sections/signed-writing-list';
import { Component as methodDiagramListComponent, meta as methodDiagramListMeta } from '../sections/method-diagram-list';
import { Component as curriculumTimelineComponent, meta as curriculumTimelineMeta } from '../sections/curriculum-timeline';
import { Component as publicationsPanelComponent, meta as publicationsPanelMeta } from '../sections/publications-panel';
import { Component as closingCtaBandComponent, meta as closingCtaBandMeta } from '../sections/closing-cta-band';
import { Component as offerRailComponent, meta as offerRailMeta } from '../sections/offer-rail';
import { Component as marketCasesComponent, meta as marketCasesMeta } from '../sections/market-cases';

export const SECTIONS: Record<SectionType, SectionDescriptor> = {
  'hero-form-inline': {
    component: heroFormInlineComponent,
    ...heroFormInlineMeta,
  },
  'hero-social-proof': {
    component: heroSocialProofComponent,
    ...heroSocialProofMeta,
  },
  'feature-comparison-grid': {
    component: featureComparisonGridComponent,
    ...featureComparisonGridMeta,
  },
  'feature-accordion': {
    component: featureAccordionComponent,
    ...featureAccordionMeta,
  },
  'faq-cta-aside': {
    component: faqCtaAsideComponent,
    ...faqCtaAsideMeta,
  },
  'cta-form-inline': {
    component: ctaFormInlineComponent,
    ...ctaFormInlineMeta,
  },
  'contact-form': {
    component: contactFormComponent,
    ...contactFormMeta,
  },
  'booking-embed': {
    component: bookingEmbedComponent,
    ...bookingEmbedMeta,
  },
  'newsletter-signup-section': {
    component: newsletterSignupSectionComponent,
    ...newsletterSignupSectionMeta,
  },
  'data-table': {
    component: dataTableComponent,
    ...dataTableMeta,
  },
  'article-grid': {
    component: articleGridComponent,
    ...articleGridMeta,
  },
  'resource-card-grid': {
    component: resourceCardGridComponent,
    ...resourceCardGridMeta,
  },
  'process-steps': {
    component: processStepsComponent,
    ...processStepsMeta,
  },
  'timeline-horizontal': {
    component: timelineHorizontalComponent,
    ...timelineHorizontalMeta,
  },
  'code-showcase': {
    component: codeShowcaseComponent,
    ...codeShowcaseMeta,
  },
  'announcement-banner': {
    component: announcementBannerComponent,
    ...announcementBannerMeta,
  },
  'trust-badges-band': {
    component: trustBadgesBandComponent,
    ...trustBadgesBandMeta,
  },
  'testimonial-logo-metric': {
    component: testimonialLogoMetricComponent,
    ...testimonialLogoMetricMeta,
  },
  'stat-counter': {
    component: statCounterComponent,
    ...statCounterMeta,
  },
  'versus-competitors': {
    component: versusCompetitorsComponent,
    ...versusCompetitorsMeta,
  },
  'logo-marquee': {
    component: logoMarqueeComponent,
    ...logoMarqueeMeta,
  },
  'hero-split': {
    component: heroSplitComponent,
    ...heroSplitMeta,
  },
  'hero-split-media': {
    component: heroSplitMediaComponent,
    ...heroSplitMediaMeta,
  },
  'masthead-bar': {
    component: mastheadBarComponent,
    ...mastheadBarMeta,
  },
  'breadcrumb-bar': {
    component: breadcrumbBarComponent,
    ...breadcrumbBarMeta,
  },
  'hero-editorial-kpi': {
    component: heroEditorialKpiComponent,
    ...heroEditorialKpiMeta,
  },
  'hero-scope-minimap': {
    component: heroScopeMinimapComponent,
    ...heroScopeMinimapMeta,
  },
  'hero-thin-media': {
    component: heroThinMediaComponent,
    ...heroThinMediaMeta,
  },
  'hero-tech-signature': {
    component: heroTechSignatureComponent,
    ...heroTechSignatureMeta,
  },
  'hero-trizone': {
    component: heroTrizoneComponent,
    ...heroTrizoneMeta,
  },
  'hero-numeral-cover': {
    component: heroNumeralCoverComponent,
    ...heroNumeralCoverMeta,
  },
  'hero-masthead-card': {
    component: heroMastheadCardComponent,
    ...heroMastheadCardMeta,
  },
  'statement-orbit': {
    component: statementOrbitComponent,
    ...statementOrbitMeta,
  },
  'hero-capability-band': {
    component: heroCapabilityBandComponent,
    ...heroCapabilityBandMeta,
  },
  'hero-summary-rail': {
    component: heroSummaryRailComponent,
    ...heroSummaryRailMeta,
  },
  'hero-editorial-masthead': {
    component: heroEditorialMastheadComponent,
    ...heroEditorialMastheadMeta,
  },
  'hero-asymmetric-grid': {
    component: heroAsymmetricGridComponent,
    ...heroAsymmetricGridMeta,
  },
  'hero-centered-band': {
    component: heroCenteredBandComponent,
    ...heroCenteredBandMeta,
  },
  'hero-media-medallion': {
    component: heroMediaMedallionComponent,
    ...heroMediaMedallionMeta,
  },
  'hero-baseline-stats': {
    component: heroBaselineStatsComponent,
    ...heroBaselineStatsMeta,
  },
  'hero-grid-12': {
    component: heroGrid12Component,
    ...heroGrid12Meta,
  },
  'hero-card-cover': {
    component: heroCardCoverComponent,
    ...heroCardCoverMeta,
  },
  'hero-stack-rhythm': {
    component: heroStackRhythmComponent,
    ...heroStackRhythmMeta,
  },
  'hero-magazine-cover': {
    component: heroMagazineCoverComponent,
    ...heroMagazineCoverMeta,
  },
  'hero-centered': {
    component: heroCenteredComponent,
    ...heroCenteredMeta,
  },
  'hero-full-bleed': {
    component: heroFullBleedComponent,
    ...heroFullBleedMeta,
  },
  'hero-hub-listing': {
    component: heroHubListingComponent,
    ...heroHubListingMeta,
  },
  'hero-service-detail': {
    component: heroServiceDetailComponent,
    ...heroServiceDetailMeta,
  },
  'hero-pillar-hub': {
    component: heroPillarHubComponent,
    ...heroPillarHubMeta,
  },
  'hero-case-study': {
    component: heroCaseStudyComponent,
    ...heroCaseStudyMeta,
  },
  'hero-home': {
    component: heroHomeComponent,
    ...heroHomeMeta,
  },
  'hero-landing': {
    component: heroLandingComponent,
    ...heroLandingMeta,
  },
  'hero-problem-index': {
    component: heroProblemIndexComponent,
    ...heroProblemIndexMeta,
  },
  'hero-sector': {
    component: heroSectorComponent,
    ...heroSectorMeta,
  },
  'hero-utility-masthead': {
    component: heroUtilityMastheadComponent,
    ...heroUtilityMastheadMeta,
  },
  'hero-academy-hub': {
    component: heroAcademyHubComponent,
    ...heroAcademyHubMeta,
  },
  'hero-hub-masthead': {
    component: heroHubMastheadComponent,
    ...heroHubMastheadMeta,
  },
  'trust-legal-section': {
    component: trustLegalSectionComponent,
    ...trustLegalSectionMeta,
  },
  'welcome-section': {
    component: welcomeSectionComponent,
    ...welcomeSectionMeta,
  },
  'list-index-section': {
    component: listIndexSectionComponent,
    ...listIndexSectionMeta,
  },
  'hero-offer-detail': {
    component: heroOfferDetailComponent,
    ...heroOfferDetailMeta,
  },
  'hero-tech-layer': {
    component: heroTechLayerComponent,
    ...heroTechLayerMeta,
  },
  'hero-conversion-funnel': {
    component: heroConversionFunnelComponent,
    ...heroConversionFunnelMeta,
  },
  'hero-hub-stats': {
    component: heroHubStatsComponent,
    ...heroHubStatsMeta,
  },
  'hero-service-masthead': {
    component: heroServiceMastheadComponent,
    ...heroServiceMastheadMeta,
  },
  'hero-detail-menu': {
    component: heroDetailMenuComponent,
    ...heroDetailMenuMeta,
  },
  'hero-author': {
    component: heroAuthorComponent,
    ...heroAuthorMeta,
  },
  'hero-lead-magnet': {
    component: heroLeadMagnetComponent,
    ...heroLeadMagnetMeta,
  },
  'hero-course': {
    component: heroCourseComponent,
    ...heroCourseMeta,
  },
  'hero-tunnel-step': {
    component: heroTunnelStepComponent,
    ...heroTunnelStepMeta,
  },
  'tunnel-step-hero': {
    component: tunnelStepHeroComponent,
    ...tunnelStepHeroMeta,
  },
  'tunnel-step-nav': {
    component: tunnelStepNavComponent,
    ...tunnelStepNavMeta,
  },
  'marquee-band': {
    component: marqueeBandComponent,
    ...marqueeBandMeta,
  },
  'problems-grid': {
    component: problemsGridComponent,
    ...problemsGridMeta,
  },
  'why-stalls': {
    component: whyStallsComponent,
    ...whyStallsMeta,
  },
  'how-we-ship': {
    component: howWeShipComponent,
    ...howWeShipMeta,
  },
  'operating-layer': {
    component: operatingLayerComponent,
    ...operatingLayerMeta,
  },
  'manifesto-block': {
    component: manifestoBlockComponent,
    ...manifestoBlockMeta,
  },
  'hero-essay': {
    component: heroEssayComponent,
    ...heroEssayMeta,
  },
  'hero-liquid': {
    component: heroLiquidComponent,
    ...heroLiquidMeta,
  },
  'proof-bar': {
    component: proofBarComponent,
    ...proofBarMeta,
  },
  'stat-block': {
    component: statBlockComponent,
    ...statBlockMeta,
  },
  'metric-shift': {
    component: metricShiftComponent,
    ...metricShiftMeta,
  },
  'social-proof': {
    component: socialProofComponent,
    ...socialProofMeta,
  },
  'site-showcase': {
    component: siteShowcaseComponent,
    ...siteShowcaseMeta,
  },
  'ecosystem-partners': {
    component: ecosystemPartnersComponent,
    ...ecosystemPartnersMeta,
  },
  'method-timeline': {
    component: methodTimelineComponent,
    ...methodTimelineMeta,
  },
  'feature-grid': {
    component: featureGridComponent,
    ...featureGridMeta,
  },
  'comparison-table': {
    component: comparisonTableComponent,
    ...comparisonTableMeta,
  },
  'timeline-block': {
    component: timelineBlockComponent,
    ...timelineBlockMeta,
  },
  'media-block': {
    component: mediaBlockComponent,
    ...mediaBlockMeta,
  },
  'pricing-table': {
    component: pricingTableComponent,
    ...pricingTableMeta,
  },
  'faq-accordion': {
    component: faqAccordionComponent,
    ...faqAccordionMeta,
  },
  'objection-handler': {
    component: objectionHandlerComponent,
    ...objectionHandlerMeta,
  },
  'cta-final': {
    component: ctaFinalComponent,
    ...ctaFinalMeta,
  },
  'cta-band': {
    component: ctaBandComponent,
    ...ctaBandMeta,
  },
  'cta-inline': {
    component: ctaInlineComponent,
    ...ctaInlineMeta,
  },
  'testimonial-block': {
    component: testimonialBlockComponent,
    ...testimonialBlockMeta,
  },
  'testimonial-wall': {
    component: testimonialWallComponent,
    ...testimonialWallMeta,
  },
  'guarantee-block': {
    component: guaranteeBlockComponent,
    ...guaranteeBlockMeta,
  },
  'architecture-diagram': {
    component: architectureDiagramComponent,
    ...architectureDiagramMeta,
  },
  'services-grid': {
    component: servicesGridComponent,
    ...servicesGridMeta,
  },
  'sector-card-grid': {
    component: sectorCardGridComponent,
    ...sectorCardGridMeta,
  },
  'maturity-pyramid': {
    component: maturityPyramidComponent,
    ...maturityPyramidMeta,
  },
  'use-case-index': {
    component: useCaseIndexComponent,
    ...useCaseIndexMeta,
  },
  'case-card-grid': {
    component: caseCardGridComponent,
    ...caseCardGridMeta,
  },
  'case-featured-grid': {
    component: caseFeaturedGridComponent,
    ...caseFeaturedGridMeta,
  },
  'tier-pyramid-svg': {
    component: tierPyramidSvgComponent,
    ...tierPyramidSvgMeta,
  },
  'offer-tier-grid': {
    component: offerTierGridComponent,
    ...offerTierGridMeta,
  },
  'team-card-grid': {
    component: teamCardGridComponent,
    ...teamCardGridMeta,
  },
  'hero-atlas': {
    component: heroAtlasComponent,
    ...heroAtlasMeta,
  },
  'persona-attributes-grid': {
    component: personaAttributesGridComponent,
    ...personaAttributesGridMeta,
  },
  'editorial-split-grid': {
    component: editorialSplitGridComponent,
    ...editorialSplitGridMeta,
  },
  'coming-soon-pills': {
    component: comingSoonPillsComponent,
    ...comingSoonPillsMeta,
  },
  'commitments-grid': {
    component: commitmentsGridComponent,
    ...commitmentsGridMeta,
  },
  'branded-callout': {
    component: brandedCalloutComponent,
    ...brandedCalloutMeta,
  },
  'editorial-preview': {
    component: editorialPreviewComponent,
    ...editorialPreviewMeta,
  },
  'newsletter-band': {
    component: newsletterBandComponent,
    ...newsletterBandMeta,
  },
  'spec-bar': {
    component: specBarComponent,
    ...specBarMeta,
  },
  'deliverables-grid': {
    component: deliverablesGridComponent,
    ...deliverablesGridMeta,
  },
  'tech-stack-band': {
    component: techStackBandComponent,
    ...techStackBandMeta,
  },
  'related-cards-band': {
    component: relatedCardsBandComponent,
    ...relatedCardsBandMeta,
  },
  'related-links': {
    component: relatedLinksComponent,
    ...relatedLinksMeta,
  },
  'pull-quote-block': {
    component: pullQuoteBlockComponent,
    ...pullQuoteBlockMeta,
  },
  'inclusions-list': {
    component: inclusionsListComponent,
    ...inclusionsListMeta,
  },
  'problem-statement': {
    component: problemStatementComponent,
    ...problemStatementMeta,
  },
  'bento-grid': {
    component: bentoGridComponent,
    ...bentoGridMeta,
  },
  'feature-zigzag': {
    component: featureZigzagComponent,
    ...featureZigzagMeta,
  },
  'scroll-gallery': {
    component: scrollGalleryComponent,
    ...scrollGalleryMeta,
  },
  'stack-cards': {
    component: stackCardsComponent,
    ...stackCardsMeta,
  },
  'hover-reveal-list': {
    component: hoverRevealListComponent,
    ...hoverRevealListMeta,
  },
  'horizontal-showcase': {
    component: horizontalShowcaseComponent,
    ...horizontalShowcaseMeta,
  },
  'media-bento': {
    component: mediaBentoComponent,
    ...mediaBentoMeta,
  },
  'photo-cluster': {
    component: photoClusterComponent,
    ...photoClusterMeta,
  },
  'media-swap-band': {
    component: mediaSwapBandComponent,
    ...mediaSwapBandMeta,
  },
  'logo-wall': {
    component: logoWallComponent,
    ...logoWallMeta,
  },
  'pricing-comparison-matrix': {
    component: pricingComparisonMatrixComponent,
    ...pricingComparisonMatrixMeta,
  },
  'gallery-masonry': {
    component: galleryMasonryComponent,
    ...galleryMasonryMeta,
  },
  'feature-tabs': {
    component: featureTabsComponent,
    ...featureTabsMeta,
  },
  'icon-trio': {
    component: iconTrioComponent,
    ...iconTrioMeta,
  },
  'quote-spotlight': {
    component: quoteSpotlightComponent,
    ...quoteSpotlightMeta,
  },
  'steps-horizontal': {
    component: stepsHorizontalComponent,
    ...stepsHorizontalMeta,
  },
  'cta-split-visual': {
    component: ctaSplitVisualComponent,
    ...ctaSplitVisualMeta,
  },
  'stats-bento': {
    component: statsBentoComponent,
    ...statsBentoMeta,
  },
  'comparison-duo': {
    component: comparisonDuoComponent,
    ...comparisonDuoMeta,
  },
  'service-catalog-list': {
    component: serviceCatalogListComponent,
    ...serviceCatalogListMeta,
  },
  'fit-columns': {
    component: fitColumnsComponent,
    ...fitColumnsMeta,
  },
  'editorial-table-block': {
    component: editorialTableBlockComponent,
    ...editorialTableBlockMeta,
  },
  'decision-list': {
    component: decisionListComponent,
    ...decisionListMeta,
  },
  'tech-positioning-split': {
    component: techPositioningSplitComponent,
    ...techPositioningSplitMeta,
  },
  'tech-capabilities-specs': {
    component: techCapabilitiesSpecsComponent,
    ...techCapabilitiesSpecsMeta,
  },
  'tech-models-table': {
    component: techModelsTableComponent,
    ...techModelsTableMeta,
  },
  'tech-when-dual': {
    component: techWhenDualComponent,
    ...techWhenDualMeta,
  },
  'tech-integration-flow': {
    component: techIntegrationFlowComponent,
    ...techIntegrationFlowMeta,
  },
  'pain-points': {
    component: painPointsComponent,
    ...painPointsMeta,
  },
  'workflow-table': {
    component: workflowTableComponent,
    ...workflowTableMeta,
  },
  'roi-band': {
    component: roiBandComponent,
    ...roiBandMeta,
  },
  'off-proof': {
    component: offProofComponent,
    ...offProofMeta,
  },
  'case-split': {
    component: caseSplitComponent,
    ...caseSplitMeta,
  },
  'department-stack': {
    component: departmentStackComponent,
    ...departmentStackMeta,
  },
  'course-catalog-table': {
    component: courseCatalogTableComponent,
    ...courseCatalogTableMeta,
  },
  'learning-path-list': {
    component: learningPathListComponent,
    ...learningPathListMeta,
  },
  'department-cta': {
    component: departmentCtaComponent,
    ...departmentCtaMeta,
  },
  'terminal-table': {
    component: terminalTableComponent,
    ...terminalTableMeta,
  },
  'editorial-write-feed': {
    component: editorialWriteFeedComponent,
    ...editorialWriteFeedMeta,
  },
  'product-reel': {
    component: productReelComponent,
    ...productReelMeta,
  },
  'agentic-terminal': {
    component: agenticTerminalComponent,
    ...agenticTerminalMeta,
  },
  'challenges-grid': {
    component: challengesGridComponent,
    ...challengesGridMeta,
  },
  'journey-steps': {
    component: journeyStepsComponent,
    ...journeyStepsMeta,
  },
  'manifesto-statement': {
    component: manifestoStatementComponent,
    ...manifestoStatementMeta,
  },
  'manifesto-act': {
    component: manifestoActComponent,
    ...manifestoActMeta,
  },
  'asymmetric-services': {
    component: asymmetricServicesComponent,
    ...asymmetricServicesMeta,
  },
  'terminal-mockup': {
    component: terminalMockupComponent,
    ...terminalMockupMeta,
  },
  'terminal-metrics-strip': {
    component: terminalMetricsStripComponent,
    ...terminalMetricsStripMeta,
  },
  'pricing-cards': {
    component: pricingCardsComponent,
    ...pricingCardsMeta,
  },
  'pricing-tabs-showcase': {
    component: pricingTabsShowcaseComponent,
    ...pricingTabsShowcaseMeta,
  },
  'engagement-ledger': {
    component: engagementLedgerComponent,
    ...engagementLedgerMeta,
  },
  'pricing-toggle': {
    component: pricingToggleComponent,
    ...pricingToggleMeta,
  },
  'pricing-single-highlight': {
    component: pricingSingleHighlightComponent,
    ...pricingSingleHighlightMeta,
  },
  'team-bio-grid': {
    component: teamBioGridComponent,
    ...teamBioGridMeta,
  },
  'about-story-split': {
    component: aboutStorySplitComponent,
    ...aboutStorySplitMeta,
  },
  'footer-cta-band': {
    component: footerCtaBandComponent,
    ...footerCtaBandMeta,
  },
  'integrations-grid': {
    component: integrationsGridComponent,
    ...integrationsGridMeta,
  },
  'feature-split-media': {
    component: featureSplitMediaComponent,
    ...featureSplitMediaMeta,
  },
  'metric-callout-band': {
    component: metricCalloutBandComponent,
    ...metricCalloutBandMeta,
  },
  'numbered-layer-list': {
    component: numberedLayerListComponent,
    ...numberedLayerListMeta,
  },
  'testimonial-single-spotlight': {
    component: testimonialSingleSpotlightComponent,
    ...testimonialSingleSpotlightMeta,
  },
  'faq-two-column': {
    component: faqTwoColumnComponent,
    ...faqTwoColumnMeta,
  },
  'cta-newsletter-footer': {
    component: ctaNewsletterFooterComponent,
    ...ctaNewsletterFooterMeta,
  },
  'comparison-pricing-callout': {
    component: comparisonPricingCalloutComponent,
    ...comparisonPricingCalloutMeta,
  },
  'diagnostic-stages': {
    component: diagnosticStagesComponent,
    ...diagnosticStagesMeta,
  },
  'case-spotlight': {
    component: caseSpotlightComponent,
    ...caseSpotlightMeta,
  },
  'testimonial-metrics': {
    component: testimonialMetricsComponent,
    ...testimonialMetricsMeta,
  },
  'editorial-prose': {
    component: editorialProseComponent,
    ...editorialProseMeta,
  },
  'key-metric-grid': {
    component: keyMetricGridComponent,
    ...keyMetricGridMeta,
  },
  'editorial-callout': {
    component: editorialCalloutComponent,
    ...editorialCalloutMeta,
  },
  'editorial-dropcap-prose': {
    component: editorialDropcapProseComponent,
    ...editorialDropcapProseMeta,
  },
  'editorial-dingbat-rule': {
    component: editorialDingbatRuleComponent,
    ...editorialDingbatRuleMeta,
  },
  'editorial-timeline': {
    component: editorialTimelineComponent,
    ...editorialTimelineMeta,
  },
  'direct-answer': {
    component: directAnswerComponent,
    ...directAnswerMeta,
  },
  'author-byline': {
    component: authorBylineComponent,
    ...authorBylineMeta,
  },
  'pain-severity-list': {
    component: painSeverityListComponent,
    ...painSeverityListMeta,
  },
  'definition-extract': {
    component: definitionExtractComponent,
    ...definitionExtractMeta,
  },
  'system-flow': {
    component: systemFlowComponent,
    ...systemFlowMeta,
  },
  'method-stepline': {
    component: methodSteplineComponent,
    ...methodSteplineMeta,
  },
  'eeat-panel': {
    component: eeatPanelComponent,
    ...eeatPanelMeta,
  },
  'rich-text': {
    component: richTextComponent,
    ...richTextMeta,
  },
  'sticky-scroll-storytelling': {
    component: stickyScrollStorytellingComponent,
    ...stickyScrollStorytellingMeta,
  },
  'hover-reveal-words': {
    component: hoverRevealWordsComponent,
    ...hoverRevealWordsMeta,
  },
  'provenance-chip': {
    component: provenanceChipComponent,
    ...provenanceChipMeta,
  },
  'used-service-callout': {
    component: usedServiceCalloutComponent,
    ...usedServiceCalloutMeta,
  },
  'hero-manifesto': {
    component: heroManifestoComponent,
    ...heroManifestoMeta,
  },
  'editorial-case-grid': {
    component: editorialCaseGridComponent,
    ...editorialCaseGridMeta,
  },
  'keyword-strip': {
    component: keywordStripComponent,
    ...keywordStripMeta,
  },
  'prose-aside': {
    component: proseAsideComponent,
    ...proseAsideMeta,
  },
  'bordered-pullquote': {
    component: borderedPullquoteComponent,
    ...borderedPullquoteMeta,
  },
  'signed-writing-list': {
    component: signedWritingListComponent,
    ...signedWritingListMeta,
  },
  'method-diagram-list': {
    component: methodDiagramListComponent,
    ...methodDiagramListMeta,
  },
  'curriculum-timeline': {
    component: curriculumTimelineComponent,
    ...curriculumTimelineMeta,
  },
  'publications-panel': {
    component: publicationsPanelComponent,
    ...publicationsPanelMeta,
  },
  'closing-cta-band': {
    component: closingCtaBandComponent,
    ...closingCtaBandMeta,
  },
  'offer-rail': {
    component: offerRailComponent,
    ...offerRailMeta,
  },
  'market-cases': {
    component: marketCasesComponent,
    ...marketCasesMeta,
  },
};
