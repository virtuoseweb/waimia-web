// ⚠️ FICHIER GENERE - NE PAS EDITER A LA MAIN.
// Source : scripts/gen-section-aggregate.mjs (Wave #38 T5, mode REPLACE).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.
// (src/lib/section-components.generated.ts)

import type { SectionType } from '@waimia/ds-kernel';
import type { AstroComponent } from './section-registry-types';
import heroFormInlineComponent from '../sections/hero-form-inline/Component.astro';
import heroSocialProofComponent from '../sections/hero-social-proof/Component.astro';
import featureComparisonGridComponent from '../sections/feature-comparison-grid/Component.astro';
import featureAccordionComponent from '../sections/feature-accordion/Component.astro';
import faqCtaAsideComponent from '../sections/faq-cta-aside/Component.astro';
import ctaFormInlineComponent from '../sections/cta-form-inline/Component.astro';
import leadCaptureBandComponent from '../sections/lead-capture-band/Component.astro';
import contactFormComponent from '../sections/contact-form/Component.astro';
import bookingEmbedComponent from '../sections/booking-embed/Component.astro';
import newsletterSignupSectionComponent from '../sections/newsletter-signup-section/Component.astro';
import dataTableComponent from '../sections/data-table/Component.astro';
import articleGridComponent from '../sections/article-grid/Component.astro';
import resourceCardGridComponent from '../sections/resource-card-grid/Component.astro';
import processStepsComponent from '../sections/process-steps/Component.astro';
import timelineHorizontalComponent from '../sections/timeline-horizontal/Component.astro';
import codeShowcaseComponent from '../sections/code-showcase/Component.astro';
import announcementBannerComponent from '../sections/announcement-banner/Component.astro';
import trustBadgesBandComponent from '../sections/trust-badges-band/Component.astro';
import testimonialLogoMetricComponent from '../sections/testimonial-logo-metric/Component.astro';
import statCounterComponent from '../sections/stat-counter/Component.astro';
import versusCompetitorsComponent from '../sections/versus-competitors/Component.astro';
import logoMarqueeComponent from '../sections/logo-marquee/Component.astro';
import heroSplitComponent from '../sections/hero-split/Component.astro';
import heroSplitMediaComponent from '../sections/hero-split-media/Component.astro';
import mastheadBarComponent from '../sections/masthead-bar/Component.astro';
import breadcrumbBarComponent from '../sections/breadcrumb-bar/Component.astro';
import heroEditorialKpiComponent from '../sections/hero-editorial-kpi/Component.astro';
import heroScopeMinimapComponent from '../sections/hero-scope-minimap/Component.astro';
import heroThinMediaComponent from '../sections/hero-thin-media/Component.astro';
import heroTechSignatureComponent from '../sections/hero-tech-signature/Component.astro';
import heroTrizoneComponent from '../sections/hero-trizone/Component.astro';
import heroNumeralCoverComponent from '../sections/hero-numeral-cover/Component.astro';
import heroMastheadCardComponent from '../sections/hero-masthead-card/Component.astro';
import statementOrbitComponent from '../sections/statement-orbit/Component.astro';
import heroCapabilityBandComponent from '../sections/hero-capability-band/Component.astro';
import heroSummaryRailComponent from '../sections/hero-summary-rail/Component.astro';
import heroEditorialMastheadComponent from '../sections/hero-editorial-masthead/Component.astro';
import heroAsymmetricGridComponent from '../sections/hero-asymmetric-grid/Component.astro';
import heroCenteredBandComponent from '../sections/hero-centered-band/Component.astro';
import heroMediaMedallionComponent from '../sections/hero-media-medallion/Component.astro';
import heroBaselineStatsComponent from '../sections/hero-baseline-stats/Component.astro';
import heroGrid12Component from '../sections/hero-grid-12/Component.astro';
import heroCardCoverComponent from '../sections/hero-card-cover/Component.astro';
import heroStackRhythmComponent from '../sections/hero-stack-rhythm/Component.astro';
import heroMagazineCoverComponent from '../sections/hero-magazine-cover/Component.astro';
import heroCenteredComponent from '../sections/hero-centered/Component.astro';
import heroFullBleedComponent from '../sections/hero-full-bleed/Component.astro';
import heroHubListingComponent from '../sections/hero-hub-listing/Component.astro';
import heroServiceDetailComponent from '../sections/hero-service-detail/Component.astro';
import heroPillarHubComponent from '../sections/hero-pillar-hub/Component.astro';
import heroCaseStudyComponent from '../sections/hero-case-study/Component.astro';
import heroHomeComponent from '../sections/hero-home/Component.astro';
import heroLandingComponent from '../sections/hero-landing/Component.astro';
import heroProblemIndexComponent from '../sections/hero-problem-index/Component.astro';
import heroSectorComponent from '../sections/hero-sector/Component.astro';
import heroUtilityMastheadComponent from '../sections/hero-utility-masthead/Component.astro';
import heroAcademyHubComponent from '../sections/hero-academy-hub/Component.astro';
import heroHubMastheadComponent from '../sections/hero-hub-masthead/Component.astro';
import trustLegalSectionComponent from '../sections/trust-legal-section/Component.astro';
import welcomeSectionComponent from '../sections/welcome-section/Component.astro';
import listIndexSectionComponent from '../sections/list-index-section/Component.astro';
import heroOfferDetailComponent from '../sections/hero-offer-detail/Component.astro';
import heroTechLayerComponent from '../sections/hero-tech-layer/Component.astro';
import heroConversionFunnelComponent from '../sections/hero-conversion-funnel/Component.astro';
import heroHubStatsComponent from '../sections/hero-hub-stats/Component.astro';
import heroServiceMastheadComponent from '../sections/hero-service-masthead/Component.astro';
import heroDetailMenuComponent from '../sections/hero-detail-menu/Component.astro';
import heroAuthorComponent from '../sections/hero-author/Component.astro';
import heroLeadMagnetComponent from '../sections/hero-lead-magnet/Component.astro';
import heroCourseComponent from '../sections/hero-course/Component.astro';
import heroTunnelStepComponent from '../sections/hero-tunnel-step/Component.astro';
import tunnelStepHeroComponent from '../sections/tunnel-step-hero/Component.astro';
import tunnelStepNavComponent from '../sections/tunnel-step-nav/Component.astro';
import marqueeBandComponent from '../sections/marquee-band/Component.astro';
import problemsGridComponent from '../sections/problems-grid/Component.astro';
import whyStallsComponent from '../sections/why-stalls/Component.astro';
import howWeShipComponent from '../sections/how-we-ship/Component.astro';
import operatingLayerComponent from '../sections/operating-layer/Component.astro';
import manifestoBlockComponent from '../sections/manifesto-block/Component.astro';
import heroEssayComponent from '../sections/hero-essay/Component.astro';
import heroLiquidComponent from '../sections/hero-liquid/Component.astro';
import proofBarComponent from '../sections/proof-bar/Component.astro';
import statBlockComponent from '../sections/stat-block/Component.astro';
import metricShiftComponent from '../sections/metric-shift/Component.astro';
import socialProofComponent from '../sections/social-proof/Component.astro';
import siteShowcaseComponent from '../sections/site-showcase/Component.astro';
import ecosystemPartnersComponent from '../sections/ecosystem-partners/Component.astro';
import methodTimelineComponent from '../sections/method-timeline/Component.astro';
import featureGridComponent from '../sections/feature-grid/Component.astro';
import comparisonTableComponent from '../sections/comparison-table/Component.astro';
import timelineBlockComponent from '../sections/timeline-block/Component.astro';
import mediaBlockComponent from '../sections/media-block/Component.astro';
import pricingTableComponent from '../sections/pricing-table/Component.astro';
import faqAccordionComponent from '../sections/faq-accordion/Component.astro';
import objectionHandlerComponent from '../sections/objection-handler/Component.astro';
import ctaFinalComponent from '../sections/cta-final/Component.astro';
import ctaBandComponent from '../sections/cta-band/Component.astro';
import ctaInlineComponent from '../sections/cta-inline/Component.astro';
import testimonialBlockComponent from '../sections/testimonial-block/Component.astro';
import testimonialWallComponent from '../sections/testimonial-wall/Component.astro';
import guaranteeBlockComponent from '../sections/guarantee-block/Component.astro';
import architectureDiagramComponent from '../sections/architecture-diagram/Component.astro';
import servicesGridComponent from '../sections/services-grid/Component.astro';
import sectorCardGridComponent from '../sections/sector-card-grid/Component.astro';
import maturityPyramidComponent from '../sections/maturity-pyramid/Component.astro';
import useCaseIndexComponent from '../sections/use-case-index/Component.astro';
import caseCardGridComponent from '../sections/case-card-grid/Component.astro';
import caseFeaturedGridComponent from '../sections/case-featured-grid/Component.astro';
import tierPyramidSvgComponent from '../sections/tier-pyramid-svg/Component.astro';
import offerTierGridComponent from '../sections/offer-tier-grid/Component.astro';
import teamCardGridComponent from '../sections/team-card-grid/Component.astro';
import heroAtlasComponent from '../sections/hero-atlas/Component.astro';
import personaAttributesGridComponent from '../sections/persona-attributes-grid/Component.astro';
import editorialSplitGridComponent from '../sections/editorial-split-grid/Component.astro';
import comingSoonPillsComponent from '../sections/coming-soon-pills/Component.astro';
import commitmentsGridComponent from '../sections/commitments-grid/Component.astro';
import brandedCalloutComponent from '../sections/branded-callout/Component.astro';
import editorialPreviewComponent from '../sections/editorial-preview/Component.astro';
import newsletterBandComponent from '../sections/newsletter-band/Component.astro';
import specBarComponent from '../sections/spec-bar/Component.astro';
import deliverablesGridComponent from '../sections/deliverables-grid/Component.astro';
import techStackBandComponent from '../sections/tech-stack-band/Component.astro';
import relatedCardsBandComponent from '../sections/related-cards-band/Component.astro';
import relatedLinksComponent from '../sections/related-links/Component.astro';
import pullQuoteBlockComponent from '../sections/pull-quote-block/Component.astro';
import inclusionsListComponent from '../sections/inclusions-list/Component.astro';
import problemStatementComponent from '../sections/problem-statement/Component.astro';
import bentoGridComponent from '../sections/bento-grid/Component.astro';
import featureZigzagComponent from '../sections/feature-zigzag/Component.astro';
import scrollGalleryComponent from '../sections/scroll-gallery/Component.astro';
import stackCardsComponent from '../sections/stack-cards/Component.astro';
import hoverRevealListComponent from '../sections/hover-reveal-list/Component.astro';
import horizontalShowcaseComponent from '../sections/horizontal-showcase/Component.astro';
import mediaBentoComponent from '../sections/media-bento/Component.astro';
import photoClusterComponent from '../sections/photo-cluster/Component.astro';
import mediaSwapBandComponent from '../sections/media-swap-band/Component.astro';
import logoWallComponent from '../sections/logo-wall/Component.astro';
import pricingComparisonMatrixComponent from '../sections/pricing-comparison-matrix/Component.astro';
import galleryMasonryComponent from '../sections/gallery-masonry/Component.astro';
import featureTabsComponent from '../sections/feature-tabs/Component.astro';
import iconTrioComponent from '../sections/icon-trio/Component.astro';
import quoteSpotlightComponent from '../sections/quote-spotlight/Component.astro';
import stepsHorizontalComponent from '../sections/steps-horizontal/Component.astro';
import ctaSplitVisualComponent from '../sections/cta-split-visual/Component.astro';
import statsBentoComponent from '../sections/stats-bento/Component.astro';
import comparisonDuoComponent from '../sections/comparison-duo/Component.astro';
import serviceCatalogListComponent from '../sections/service-catalog-list/Component.astro';
import fitColumnsComponent from '../sections/fit-columns/Component.astro';
import editorialTableBlockComponent from '../sections/editorial-table-block/Component.astro';
import decisionListComponent from '../sections/decision-list/Component.astro';
import techPositioningSplitComponent from '../sections/tech-positioning-split/Component.astro';
import techCapabilitiesSpecsComponent from '../sections/tech-capabilities-specs/Component.astro';
import techModelsTableComponent from '../sections/tech-models-table/Component.astro';
import techWhenDualComponent from '../sections/tech-when-dual/Component.astro';
import techIntegrationFlowComponent from '../sections/tech-integration-flow/Component.astro';
import painPointsComponent from '../sections/pain-points/Component.astro';
import workflowTableComponent from '../sections/workflow-table/Component.astro';
import roiBandComponent from '../sections/roi-band/Component.astro';
import offProofComponent from '../sections/off-proof/Component.astro';
import caseSplitComponent from '../sections/case-split/Component.astro';
import departmentStackComponent from '../sections/department-stack/Component.astro';
import courseCatalogTableComponent from '../sections/course-catalog-table/Component.astro';
import learningPathListComponent from '../sections/learning-path-list/Component.astro';
import departmentCtaComponent from '../sections/department-cta/Component.astro';
import terminalTableComponent from '../sections/terminal-table/Component.astro';
import editorialWriteFeedComponent from '../sections/editorial-write-feed/Component.astro';
import productReelComponent from '../sections/product-reel/Component.astro';
import agenticTerminalComponent from '../sections/agentic-terminal/Component.astro';
import challengesGridComponent from '../sections/challenges-grid/Component.astro';
import journeyStepsComponent from '../sections/journey-steps/Component.astro';
import manifestoStatementComponent from '../sections/manifesto-statement/Component.astro';
import manifestoActComponent from '../sections/manifesto-act/Component.astro';
import asymmetricServicesComponent from '../sections/asymmetric-services/Component.astro';
import terminalMockupComponent from '../sections/terminal-mockup/Component.astro';
import terminalMetricsStripComponent from '../sections/terminal-metrics-strip/Component.astro';
import pricingCardsComponent from '../sections/pricing-cards/Component.astro';
import pricingTabsShowcaseComponent from '../sections/pricing-tabs-showcase/Component.astro';
import engagementLedgerComponent from '../sections/engagement-ledger/Component.astro';
import pricingToggleComponent from '../sections/pricing-toggle/Component.astro';
import pricingSingleHighlightComponent from '../sections/pricing-single-highlight/Component.astro';
import teamBioGridComponent from '../sections/team-bio-grid/Component.astro';
import aboutStorySplitComponent from '../sections/about-story-split/Component.astro';
import footerCtaBandComponent from '../sections/footer-cta-band/Component.astro';
import integrationsGridComponent from '../sections/integrations-grid/Component.astro';
import featureSplitMediaComponent from '../sections/feature-split-media/Component.astro';
import metricCalloutBandComponent from '../sections/metric-callout-band/Component.astro';
import numberedLayerListComponent from '../sections/numbered-layer-list/Component.astro';
import testimonialSingleSpotlightComponent from '../sections/testimonial-single-spotlight/Component.astro';
import faqTwoColumnComponent from '../sections/faq-two-column/Component.astro';
import ctaNewsletterFooterComponent from '../sections/cta-newsletter-footer/Component.astro';
import comparisonPricingCalloutComponent from '../sections/comparison-pricing-callout/Component.astro';
import diagnosticStagesComponent from '../sections/diagnostic-stages/Component.astro';
import caseSpotlightComponent from '../sections/case-spotlight/Component.astro';
import testimonialMetricsComponent from '../sections/testimonial-metrics/Component.astro';
import editorialProseComponent from '../sections/editorial-prose/Component.astro';
import keyMetricGridComponent from '../sections/key-metric-grid/Component.astro';
import editorialCalloutComponent from '../sections/editorial-callout/Component.astro';
import editorialDropcapProseComponent from '../sections/editorial-dropcap-prose/Component.astro';
import editorialDingbatRuleComponent from '../sections/editorial-dingbat-rule/Component.astro';
import editorialTimelineComponent from '../sections/editorial-timeline/Component.astro';
import directAnswerComponent from '../sections/direct-answer/Component.astro';
import authorBylineComponent from '../sections/author-byline/Component.astro';
import painSeverityListComponent from '../sections/pain-severity-list/Component.astro';
import definitionExtractComponent from '../sections/definition-extract/Component.astro';
import systemFlowComponent from '../sections/system-flow/Component.astro';
import methodSteplineComponent from '../sections/method-stepline/Component.astro';
import eeatPanelComponent from '../sections/eeat-panel/Component.astro';
import richTextComponent from '../sections/rich-text/Component.astro';
import stickyScrollStorytellingComponent from '../sections/sticky-scroll-storytelling/Component.astro';
import hoverRevealWordsComponent from '../sections/hover-reveal-words/Component.astro';
import provenanceChipComponent from '../sections/provenance-chip/Component.astro';
import usedServiceCalloutComponent from '../sections/used-service-callout/Component.astro';
import heroManifestoComponent from '../sections/hero-manifesto/Component.astro';
import editorialCaseGridComponent from '../sections/editorial-case-grid/Component.astro';
import keywordStripComponent from '../sections/keyword-strip/Component.astro';
import proseAsideComponent from '../sections/prose-aside/Component.astro';
import borderedPullquoteComponent from '../sections/bordered-pullquote/Component.astro';
import signedWritingListComponent from '../sections/signed-writing-list/Component.astro';
import methodDiagramListComponent from '../sections/method-diagram-list/Component.astro';
import curriculumTimelineComponent from '../sections/curriculum-timeline/Component.astro';
import publicationsPanelComponent from '../sections/publications-panel/Component.astro';
import closingCtaBandComponent from '../sections/closing-cta-band/Component.astro';
import offerRailComponent from '../sections/offer-rail/Component.astro';
import marketCasesComponent from '../sections/market-cases/Component.astro';

export const SECTION_COMPONENTS: Record<SectionType, AstroComponent> = {
  'hero-form-inline': heroFormInlineComponent,
  'hero-social-proof': heroSocialProofComponent,
  'feature-comparison-grid': featureComparisonGridComponent,
  'feature-accordion': featureAccordionComponent,
  'faq-cta-aside': faqCtaAsideComponent,
  'cta-form-inline': ctaFormInlineComponent,
  'lead-capture-band': leadCaptureBandComponent,
  'contact-form': contactFormComponent,
  'booking-embed': bookingEmbedComponent,
  'newsletter-signup-section': newsletterSignupSectionComponent,
  'data-table': dataTableComponent,
  'article-grid': articleGridComponent,
  'resource-card-grid': resourceCardGridComponent,
  'process-steps': processStepsComponent,
  'timeline-horizontal': timelineHorizontalComponent,
  'code-showcase': codeShowcaseComponent,
  'announcement-banner': announcementBannerComponent,
  'trust-badges-band': trustBadgesBandComponent,
  'testimonial-logo-metric': testimonialLogoMetricComponent,
  'stat-counter': statCounterComponent,
  'versus-competitors': versusCompetitorsComponent,
  'logo-marquee': logoMarqueeComponent,
  'hero-split': heroSplitComponent,
  'hero-split-media': heroSplitMediaComponent,
  'masthead-bar': mastheadBarComponent,
  'breadcrumb-bar': breadcrumbBarComponent,
  'hero-editorial-kpi': heroEditorialKpiComponent,
  'hero-scope-minimap': heroScopeMinimapComponent,
  'hero-thin-media': heroThinMediaComponent,
  'hero-tech-signature': heroTechSignatureComponent,
  'hero-trizone': heroTrizoneComponent,
  'hero-numeral-cover': heroNumeralCoverComponent,
  'hero-masthead-card': heroMastheadCardComponent,
  'statement-orbit': statementOrbitComponent,
  'hero-capability-band': heroCapabilityBandComponent,
  'hero-summary-rail': heroSummaryRailComponent,
  'hero-editorial-masthead': heroEditorialMastheadComponent,
  'hero-asymmetric-grid': heroAsymmetricGridComponent,
  'hero-centered-band': heroCenteredBandComponent,
  'hero-media-medallion': heroMediaMedallionComponent,
  'hero-baseline-stats': heroBaselineStatsComponent,
  'hero-grid-12': heroGrid12Component,
  'hero-card-cover': heroCardCoverComponent,
  'hero-stack-rhythm': heroStackRhythmComponent,
  'hero-magazine-cover': heroMagazineCoverComponent,
  'hero-centered': heroCenteredComponent,
  'hero-full-bleed': heroFullBleedComponent,
  'hero-hub-listing': heroHubListingComponent,
  'hero-service-detail': heroServiceDetailComponent,
  'hero-pillar-hub': heroPillarHubComponent,
  'hero-case-study': heroCaseStudyComponent,
  'hero-home': heroHomeComponent,
  'hero-landing': heroLandingComponent,
  'hero-problem-index': heroProblemIndexComponent,
  'hero-sector': heroSectorComponent,
  'hero-utility-masthead': heroUtilityMastheadComponent,
  'hero-academy-hub': heroAcademyHubComponent,
  'hero-hub-masthead': heroHubMastheadComponent,
  'trust-legal-section': trustLegalSectionComponent,
  'welcome-section': welcomeSectionComponent,
  'list-index-section': listIndexSectionComponent,
  'hero-offer-detail': heroOfferDetailComponent,
  'hero-tech-layer': heroTechLayerComponent,
  'hero-conversion-funnel': heroConversionFunnelComponent,
  'hero-hub-stats': heroHubStatsComponent,
  'hero-service-masthead': heroServiceMastheadComponent,
  'hero-detail-menu': heroDetailMenuComponent,
  'hero-author': heroAuthorComponent,
  'hero-lead-magnet': heroLeadMagnetComponent,
  'hero-course': heroCourseComponent,
  'hero-tunnel-step': heroTunnelStepComponent,
  'tunnel-step-hero': tunnelStepHeroComponent,
  'tunnel-step-nav': tunnelStepNavComponent,
  'marquee-band': marqueeBandComponent,
  'problems-grid': problemsGridComponent,
  'why-stalls': whyStallsComponent,
  'how-we-ship': howWeShipComponent,
  'operating-layer': operatingLayerComponent,
  'manifesto-block': manifestoBlockComponent,
  'hero-essay': heroEssayComponent,
  'hero-liquid': heroLiquidComponent,
  'proof-bar': proofBarComponent,
  'stat-block': statBlockComponent,
  'metric-shift': metricShiftComponent,
  'social-proof': socialProofComponent,
  'site-showcase': siteShowcaseComponent,
  'ecosystem-partners': ecosystemPartnersComponent,
  'method-timeline': methodTimelineComponent,
  'feature-grid': featureGridComponent,
  'comparison-table': comparisonTableComponent,
  'timeline-block': timelineBlockComponent,
  'media-block': mediaBlockComponent,
  'pricing-table': pricingTableComponent,
  'faq-accordion': faqAccordionComponent,
  'objection-handler': objectionHandlerComponent,
  'cta-final': ctaFinalComponent,
  'cta-band': ctaBandComponent,
  'cta-inline': ctaInlineComponent,
  'testimonial-block': testimonialBlockComponent,
  'testimonial-wall': testimonialWallComponent,
  'guarantee-block': guaranteeBlockComponent,
  'architecture-diagram': architectureDiagramComponent,
  'services-grid': servicesGridComponent,
  'sector-card-grid': sectorCardGridComponent,
  'maturity-pyramid': maturityPyramidComponent,
  'use-case-index': useCaseIndexComponent,
  'case-card-grid': caseCardGridComponent,
  'case-featured-grid': caseFeaturedGridComponent,
  'tier-pyramid-svg': tierPyramidSvgComponent,
  'offer-tier-grid': offerTierGridComponent,
  'team-card-grid': teamCardGridComponent,
  'hero-atlas': heroAtlasComponent,
  'persona-attributes-grid': personaAttributesGridComponent,
  'editorial-split-grid': editorialSplitGridComponent,
  'coming-soon-pills': comingSoonPillsComponent,
  'commitments-grid': commitmentsGridComponent,
  'branded-callout': brandedCalloutComponent,
  'editorial-preview': editorialPreviewComponent,
  'newsletter-band': newsletterBandComponent,
  'spec-bar': specBarComponent,
  'deliverables-grid': deliverablesGridComponent,
  'tech-stack-band': techStackBandComponent,
  'related-cards-band': relatedCardsBandComponent,
  'related-links': relatedLinksComponent,
  'pull-quote-block': pullQuoteBlockComponent,
  'inclusions-list': inclusionsListComponent,
  'problem-statement': problemStatementComponent,
  'bento-grid': bentoGridComponent,
  'feature-zigzag': featureZigzagComponent,
  'scroll-gallery': scrollGalleryComponent,
  'stack-cards': stackCardsComponent,
  'hover-reveal-list': hoverRevealListComponent,
  'horizontal-showcase': horizontalShowcaseComponent,
  'media-bento': mediaBentoComponent,
  'photo-cluster': photoClusterComponent,
  'media-swap-band': mediaSwapBandComponent,
  'logo-wall': logoWallComponent,
  'pricing-comparison-matrix': pricingComparisonMatrixComponent,
  'gallery-masonry': galleryMasonryComponent,
  'feature-tabs': featureTabsComponent,
  'icon-trio': iconTrioComponent,
  'quote-spotlight': quoteSpotlightComponent,
  'steps-horizontal': stepsHorizontalComponent,
  'cta-split-visual': ctaSplitVisualComponent,
  'stats-bento': statsBentoComponent,
  'comparison-duo': comparisonDuoComponent,
  'service-catalog-list': serviceCatalogListComponent,
  'fit-columns': fitColumnsComponent,
  'editorial-table-block': editorialTableBlockComponent,
  'decision-list': decisionListComponent,
  'tech-positioning-split': techPositioningSplitComponent,
  'tech-capabilities-specs': techCapabilitiesSpecsComponent,
  'tech-models-table': techModelsTableComponent,
  'tech-when-dual': techWhenDualComponent,
  'tech-integration-flow': techIntegrationFlowComponent,
  'pain-points': painPointsComponent,
  'workflow-table': workflowTableComponent,
  'roi-band': roiBandComponent,
  'off-proof': offProofComponent,
  'case-split': caseSplitComponent,
  'department-stack': departmentStackComponent,
  'course-catalog-table': courseCatalogTableComponent,
  'learning-path-list': learningPathListComponent,
  'department-cta': departmentCtaComponent,
  'terminal-table': terminalTableComponent,
  'editorial-write-feed': editorialWriteFeedComponent,
  'product-reel': productReelComponent,
  'agentic-terminal': agenticTerminalComponent,
  'challenges-grid': challengesGridComponent,
  'journey-steps': journeyStepsComponent,
  'manifesto-statement': manifestoStatementComponent,
  'manifesto-act': manifestoActComponent,
  'asymmetric-services': asymmetricServicesComponent,
  'terminal-mockup': terminalMockupComponent,
  'terminal-metrics-strip': terminalMetricsStripComponent,
  'pricing-cards': pricingCardsComponent,
  'pricing-tabs-showcase': pricingTabsShowcaseComponent,
  'engagement-ledger': engagementLedgerComponent,
  'pricing-toggle': pricingToggleComponent,
  'pricing-single-highlight': pricingSingleHighlightComponent,
  'team-bio-grid': teamBioGridComponent,
  'about-story-split': aboutStorySplitComponent,
  'footer-cta-band': footerCtaBandComponent,
  'integrations-grid': integrationsGridComponent,
  'feature-split-media': featureSplitMediaComponent,
  'metric-callout-band': metricCalloutBandComponent,
  'numbered-layer-list': numberedLayerListComponent,
  'testimonial-single-spotlight': testimonialSingleSpotlightComponent,
  'faq-two-column': faqTwoColumnComponent,
  'cta-newsletter-footer': ctaNewsletterFooterComponent,
  'comparison-pricing-callout': comparisonPricingCalloutComponent,
  'diagnostic-stages': diagnosticStagesComponent,
  'case-spotlight': caseSpotlightComponent,
  'testimonial-metrics': testimonialMetricsComponent,
  'editorial-prose': editorialProseComponent,
  'key-metric-grid': keyMetricGridComponent,
  'editorial-callout': editorialCalloutComponent,
  'editorial-dropcap-prose': editorialDropcapProseComponent,
  'editorial-dingbat-rule': editorialDingbatRuleComponent,
  'editorial-timeline': editorialTimelineComponent,
  'direct-answer': directAnswerComponent,
  'author-byline': authorBylineComponent,
  'pain-severity-list': painSeverityListComponent,
  'definition-extract': definitionExtractComponent,
  'system-flow': systemFlowComponent,
  'method-stepline': methodSteplineComponent,
  'eeat-panel': eeatPanelComponent,
  'rich-text': richTextComponent,
  'sticky-scroll-storytelling': stickyScrollStorytellingComponent,
  'hover-reveal-words': hoverRevealWordsComponent,
  'provenance-chip': provenanceChipComponent,
  'used-service-callout': usedServiceCalloutComponent,
  'hero-manifesto': heroManifestoComponent,
  'editorial-case-grid': editorialCaseGridComponent,
  'keyword-strip': keywordStripComponent,
  'prose-aside': proseAsideComponent,
  'bordered-pullquote': borderedPullquoteComponent,
  'signed-writing-list': signedWritingListComponent,
  'method-diagram-list': methodDiagramListComponent,
  'curriculum-timeline': curriculumTimelineComponent,
  'publications-panel': publicationsPanelComponent,
  'closing-cta-band': closingCtaBandComponent,
  'offer-rail': offerRailComponent,
  'market-cases': marketCasesComponent,
};
