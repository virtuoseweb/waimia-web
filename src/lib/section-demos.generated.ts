// ⚠️ FICHIER GENERE - NE PAS EDITER A LA MAIN.
// Source : scripts/gen-section-aggregate.mjs (Wave #38 T5, mode REPLACE).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.
// (src/lib/section-demos.generated.ts)

import type { SectionType } from '../schemas/sections';
import type { DemoData } from './section-demos-types';
import { demo as heroFormInlineDemo } from '../sections/hero-form-inline/demo';
import { demo as heroSocialProofDemo } from '../sections/hero-social-proof/demo';
import { demo as featureComparisonGridDemo } from '../sections/feature-comparison-grid/demo';
import { demo as featureAccordionDemo } from '../sections/feature-accordion/demo';
import { demo as faqCtaAsideDemo } from '../sections/faq-cta-aside/demo';
import { demo as ctaFormInlineDemo } from '../sections/cta-form-inline/demo';
import { demo as contactFormDemo } from '../sections/contact-form/demo';
import { demo as bookingEmbedDemo } from '../sections/booking-embed/demo';
import { demo as newsletterSignupSectionDemo } from '../sections/newsletter-signup-section/demo';
import { demo as dataTableDemo } from '../sections/data-table/demo';
import { demo as articleGridDemo } from '../sections/article-grid/demo';
import { demo as resourceCardGridDemo } from '../sections/resource-card-grid/demo';
import { demo as processStepsDemo } from '../sections/process-steps/demo';
import { demo as timelineHorizontalDemo } from '../sections/timeline-horizontal/demo';
import { demo as codeShowcaseDemo } from '../sections/code-showcase/demo';
import { demo as announcementBannerDemo } from '../sections/announcement-banner/demo';
import { demo as trustBadgesBandDemo } from '../sections/trust-badges-band/demo';
import { demo as testimonialLogoMetricDemo } from '../sections/testimonial-logo-metric/demo';
import { demo as statCounterDemo } from '../sections/stat-counter/demo';
import { demo as versusCompetitorsDemo } from '../sections/versus-competitors/demo';
import { demo as logoMarqueeDemo } from '../sections/logo-marquee/demo';
import { demo as heroSplitDemo } from '../sections/hero-split/demo';
import { demo as heroSplitMediaDemo } from '../sections/hero-split-media/demo';
import { demo as mastheadBarDemo } from '../sections/masthead-bar/demo';
import { demo as breadcrumbBarDemo } from '../sections/breadcrumb-bar/demo';
import { demo as heroEditorialKpiDemo } from '../sections/hero-editorial-kpi/demo';
import { demo as heroScopeMinimapDemo } from '../sections/hero-scope-minimap/demo';
import { demo as heroThinMediaDemo } from '../sections/hero-thin-media/demo';
import { demo as heroTechSignatureDemo } from '../sections/hero-tech-signature/demo';
import { demo as heroTrizoneDemo } from '../sections/hero-trizone/demo';
import { demo as heroNumeralCoverDemo } from '../sections/hero-numeral-cover/demo';
import { demo as heroMastheadCardDemo } from '../sections/hero-masthead-card/demo';
import { demo as statementOrbitDemo } from '../sections/statement-orbit/demo';
import { demo as heroCapabilityBandDemo } from '../sections/hero-capability-band/demo';
import { demo as heroSummaryRailDemo } from '../sections/hero-summary-rail/demo';
import { demo as heroEditorialMastheadDemo } from '../sections/hero-editorial-masthead/demo';
import { demo as heroAsymmetricGridDemo } from '../sections/hero-asymmetric-grid/demo';
import { demo as heroCenteredBandDemo } from '../sections/hero-centered-band/demo';
import { demo as heroMediaMedallionDemo } from '../sections/hero-media-medallion/demo';
import { demo as heroBaselineStatsDemo } from '../sections/hero-baseline-stats/demo';
import { demo as heroGrid12Demo } from '../sections/hero-grid-12/demo';
import { demo as heroCardCoverDemo } from '../sections/hero-card-cover/demo';
import { demo as heroStackRhythmDemo } from '../sections/hero-stack-rhythm/demo';
import { demo as heroMagazineCoverDemo } from '../sections/hero-magazine-cover/demo';
import { demo as heroCenteredDemo } from '../sections/hero-centered/demo';
import { demo as heroFullBleedDemo } from '../sections/hero-full-bleed/demo';
import { demo as heroHubListingDemo } from '../sections/hero-hub-listing/demo';
import { demo as heroServiceDetailDemo } from '../sections/hero-service-detail/demo';
import { demo as heroPillarHubDemo } from '../sections/hero-pillar-hub/demo';
import { demo as heroCaseStudyDemo } from '../sections/hero-case-study/demo';
import { demo as heroHomeDemo } from '../sections/hero-home/demo';
import { demo as heroLandingDemo } from '../sections/hero-landing/demo';
import { demo as heroProblemIndexDemo } from '../sections/hero-problem-index/demo';
import { demo as heroSectorDemo } from '../sections/hero-sector/demo';
import { demo as heroUtilityMastheadDemo } from '../sections/hero-utility-masthead/demo';
import { demo as heroAcademyHubDemo } from '../sections/hero-academy-hub/demo';
import { demo as heroHubMastheadDemo } from '../sections/hero-hub-masthead/demo';
import { demo as trustLegalSectionDemo } from '../sections/trust-legal-section/demo';
import { demo as welcomeSectionDemo } from '../sections/welcome-section/demo';
import { demo as listIndexSectionDemo } from '../sections/list-index-section/demo';
import { demo as heroOfferDetailDemo } from '../sections/hero-offer-detail/demo';
import { demo as heroTechLayerDemo } from '../sections/hero-tech-layer/demo';
import { demo as heroConversionFunnelDemo } from '../sections/hero-conversion-funnel/demo';
import { demo as heroHubStatsDemo } from '../sections/hero-hub-stats/demo';
import { demo as heroServiceMastheadDemo } from '../sections/hero-service-masthead/demo';
import { demo as heroDetailMenuDemo } from '../sections/hero-detail-menu/demo';
import { demo as heroAuthorDemo } from '../sections/hero-author/demo';
import { demo as heroLeadMagnetDemo } from '../sections/hero-lead-magnet/demo';
import { demo as heroCourseDemo } from '../sections/hero-course/demo';
import { demo as heroTunnelStepDemo } from '../sections/hero-tunnel-step/demo';
import { demo as tunnelStepHeroDemo } from '../sections/tunnel-step-hero/demo';
import { demo as tunnelStepNavDemo } from '../sections/tunnel-step-nav/demo';
import { demo as marqueeBandDemo } from '../sections/marquee-band/demo';
import { demo as problemsGridDemo } from '../sections/problems-grid/demo';
import { demo as whyStallsDemo } from '../sections/why-stalls/demo';
import { demo as howWeShipDemo } from '../sections/how-we-ship/demo';
import { demo as operatingLayerDemo } from '../sections/operating-layer/demo';
import { demo as manifestoBlockDemo } from '../sections/manifesto-block/demo';
import { demo as heroEssayDemo } from '../sections/hero-essay/demo';
import { demo as heroLiquidDemo } from '../sections/hero-liquid/demo';
import { demo as proofBarDemo } from '../sections/proof-bar/demo';
import { demo as statBlockDemo } from '../sections/stat-block/demo';
import { demo as metricShiftDemo } from '../sections/metric-shift/demo';
import { demo as socialProofDemo } from '../sections/social-proof/demo';
import { demo as ecosystemPartnersDemo } from '../sections/ecosystem-partners/demo';
import { demo as methodTimelineDemo } from '../sections/method-timeline/demo';
import { demo as featureGridDemo } from '../sections/feature-grid/demo';
import { demo as comparisonTableDemo } from '../sections/comparison-table/demo';
import { demo as timelineBlockDemo } from '../sections/timeline-block/demo';
import { demo as mediaBlockDemo } from '../sections/media-block/demo';
import { demo as pricingTableDemo } from '../sections/pricing-table/demo';
import { demo as faqAccordionDemo } from '../sections/faq-accordion/demo';
import { demo as objectionHandlerDemo } from '../sections/objection-handler/demo';
import { demo as ctaFinalDemo } from '../sections/cta-final/demo';
import { demo as ctaBandDemo } from '../sections/cta-band/demo';
import { demo as ctaInlineDemo } from '../sections/cta-inline/demo';
import { demo as testimonialBlockDemo } from '../sections/testimonial-block/demo';
import { demo as guaranteeBlockDemo } from '../sections/guarantee-block/demo';
import { demo as architectureDiagramDemo } from '../sections/architecture-diagram/demo';
import { demo as servicesGridDemo } from '../sections/services-grid/demo';
import { demo as maturityPyramidDemo } from '../sections/maturity-pyramid/demo';
import { demo as useCaseIndexDemo } from '../sections/use-case-index/demo';
import { demo as caseCardGridDemo } from '../sections/case-card-grid/demo';
import { demo as caseFeaturedGridDemo } from '../sections/case-featured-grid/demo';
import { demo as tierPyramidSvgDemo } from '../sections/tier-pyramid-svg/demo';
import { demo as offerTierGridDemo } from '../sections/offer-tier-grid/demo';
import { demo as teamCardGridDemo } from '../sections/team-card-grid/demo';
import { demo as heroAtlasDemo } from '../sections/hero-atlas/demo';
import { demo as personaAttributesGridDemo } from '../sections/persona-attributes-grid/demo';
import { demo as editorialSplitGridDemo } from '../sections/editorial-split-grid/demo';
import { demo as comingSoonPillsDemo } from '../sections/coming-soon-pills/demo';
import { demo as commitmentsGridDemo } from '../sections/commitments-grid/demo';
import { demo as brandedCalloutDemo } from '../sections/branded-callout/demo';
import { demo as editorialPreviewDemo } from '../sections/editorial-preview/demo';
import { demo as newsletterBandDemo } from '../sections/newsletter-band/demo';
import { demo as specBarDemo } from '../sections/spec-bar/demo';
import { demo as deliverablesGridDemo } from '../sections/deliverables-grid/demo';
import { demo as techStackBandDemo } from '../sections/tech-stack-band/demo';
import { demo as relatedCardsBandDemo } from '../sections/related-cards-band/demo';
import { demo as pullQuoteBlockDemo } from '../sections/pull-quote-block/demo';
import { demo as inclusionsListDemo } from '../sections/inclusions-list/demo';
import { demo as problemStatementDemo } from '../sections/problem-statement/demo';
import { demo as bentoGridDemo } from '../sections/bento-grid/demo';
import { demo as featureZigzagDemo } from '../sections/feature-zigzag/demo';
import { demo as scrollGalleryDemo } from '../sections/scroll-gallery/demo';
import { demo as stackCardsDemo } from '../sections/stack-cards/demo';
import { demo as hoverRevealListDemo } from '../sections/hover-reveal-list/demo';
import { demo as horizontalShowcaseDemo } from '../sections/horizontal-showcase/demo';
import { demo as mediaBentoDemo } from '../sections/media-bento/demo';
import { demo as photoClusterDemo } from '../sections/photo-cluster/demo';
import { demo as mediaSwapBandDemo } from '../sections/media-swap-band/demo';
import { demo as logoWallDemo } from '../sections/logo-wall/demo';
import { demo as pricingComparisonMatrixDemo } from '../sections/pricing-comparison-matrix/demo';
import { demo as galleryMasonryDemo } from '../sections/gallery-masonry/demo';
import { demo as featureTabsDemo } from '../sections/feature-tabs/demo';
import { demo as iconTrioDemo } from '../sections/icon-trio/demo';
import { demo as quoteSpotlightDemo } from '../sections/quote-spotlight/demo';
import { demo as stepsHorizontalDemo } from '../sections/steps-horizontal/demo';
import { demo as ctaSplitVisualDemo } from '../sections/cta-split-visual/demo';
import { demo as statsBentoDemo } from '../sections/stats-bento/demo';
import { demo as comparisonDuoDemo } from '../sections/comparison-duo/demo';
import { demo as serviceCatalogListDemo } from '../sections/service-catalog-list/demo';
import { demo as fitColumnsDemo } from '../sections/fit-columns/demo';
import { demo as editorialTableBlockDemo } from '../sections/editorial-table-block/demo';
import { demo as decisionListDemo } from '../sections/decision-list/demo';
import { demo as techPositioningSplitDemo } from '../sections/tech-positioning-split/demo';
import { demo as techCapabilitiesSpecsDemo } from '../sections/tech-capabilities-specs/demo';
import { demo as techModelsTableDemo } from '../sections/tech-models-table/demo';
import { demo as techWhenDualDemo } from '../sections/tech-when-dual/demo';
import { demo as techIntegrationFlowDemo } from '../sections/tech-integration-flow/demo';
import { demo as painPointsDemo } from '../sections/pain-points/demo';
import { demo as workflowTableDemo } from '../sections/workflow-table/demo';
import { demo as roiBandDemo } from '../sections/roi-band/demo';
import { demo as offProofDemo } from '../sections/off-proof/demo';
import { demo as caseSplitDemo } from '../sections/case-split/demo';
import { demo as departmentStackDemo } from '../sections/department-stack/demo';
import { demo as courseCatalogTableDemo } from '../sections/course-catalog-table/demo';
import { demo as learningPathListDemo } from '../sections/learning-path-list/demo';
import { demo as departmentCtaDemo } from '../sections/department-cta/demo';
import { demo as terminalTableDemo } from '../sections/terminal-table/demo';
import { demo as editorialWriteFeedDemo } from '../sections/editorial-write-feed/demo';
import { demo as productReelDemo } from '../sections/product-reel/demo';
import { demo as agenticTerminalDemo } from '../sections/agentic-terminal/demo';
import { demo as challengesGridDemo } from '../sections/challenges-grid/demo';
import { demo as journeyStepsDemo } from '../sections/journey-steps/demo';
import { demo as manifestoStatementDemo } from '../sections/manifesto-statement/demo';
import { demo as manifestoActDemo } from '../sections/manifesto-act/demo';
import { demo as asymmetricServicesDemo } from '../sections/asymmetric-services/demo';
import { demo as terminalMockupDemo } from '../sections/terminal-mockup/demo';
import { demo as terminalMetricsStripDemo } from '../sections/terminal-metrics-strip/demo';
import { demo as pricingCardsDemo } from '../sections/pricing-cards/demo';
import { demo as pricingToggleDemo } from '../sections/pricing-toggle/demo';
import { demo as pricingSingleHighlightDemo } from '../sections/pricing-single-highlight/demo';
import { demo as teamBioGridDemo } from '../sections/team-bio-grid/demo';
import { demo as aboutStorySplitDemo } from '../sections/about-story-split/demo';
import { demo as footerCtaBandDemo } from '../sections/footer-cta-band/demo';
import { demo as integrationsGridDemo } from '../sections/integrations-grid/demo';
import { demo as featureSplitMediaDemo } from '../sections/feature-split-media/demo';
import { demo as metricCalloutBandDemo } from '../sections/metric-callout-band/demo';
import { demo as testimonialSingleSpotlightDemo } from '../sections/testimonial-single-spotlight/demo';
import { demo as faqTwoColumnDemo } from '../sections/faq-two-column/demo';
import { demo as ctaNewsletterFooterDemo } from '../sections/cta-newsletter-footer/demo';
import { demo as comparisonPricingCalloutDemo } from '../sections/comparison-pricing-callout/demo';
import { demo as diagnosticStagesDemo } from '../sections/diagnostic-stages/demo';
import { demo as caseSpotlightDemo } from '../sections/case-spotlight/demo';
import { demo as testimonialMetricsDemo } from '../sections/testimonial-metrics/demo';
import { demo as editorialProseDemo } from '../sections/editorial-prose/demo';
import { demo as keyMetricGridDemo } from '../sections/key-metric-grid/demo';
import { demo as editorialCalloutDemo } from '../sections/editorial-callout/demo';
import { demo as editorialDropcapProseDemo } from '../sections/editorial-dropcap-prose/demo';
import { demo as editorialDingbatRuleDemo } from '../sections/editorial-dingbat-rule/demo';
import { demo as editorialTimelineDemo } from '../sections/editorial-timeline/demo';
import { demo as directAnswerDemo } from '../sections/direct-answer/demo';
import { demo as authorBylineDemo } from '../sections/author-byline/demo';
import { demo as painSeverityListDemo } from '../sections/pain-severity-list/demo';
import { demo as definitionExtractDemo } from '../sections/definition-extract/demo';
import { demo as systemFlowDemo } from '../sections/system-flow/demo';
import { demo as methodSteplineDemo } from '../sections/method-stepline/demo';
import { demo as eeatPanelDemo } from '../sections/eeat-panel/demo';
import { demo as richTextDemo } from '../sections/rich-text/demo';

export const SECTION_DEMOS: Record<SectionType, DemoData> = {
  'hero-form-inline': heroFormInlineDemo,
  'hero-social-proof': heroSocialProofDemo,
  'feature-comparison-grid': featureComparisonGridDemo,
  'feature-accordion': featureAccordionDemo,
  'faq-cta-aside': faqCtaAsideDemo,
  'cta-form-inline': ctaFormInlineDemo,
  'contact-form': contactFormDemo,
  'booking-embed': bookingEmbedDemo,
  'newsletter-signup-section': newsletterSignupSectionDemo,
  'data-table': dataTableDemo,
  'article-grid': articleGridDemo,
  'resource-card-grid': resourceCardGridDemo,
  'process-steps': processStepsDemo,
  'timeline-horizontal': timelineHorizontalDemo,
  'code-showcase': codeShowcaseDemo,
  'announcement-banner': announcementBannerDemo,
  'trust-badges-band': trustBadgesBandDemo,
  'testimonial-logo-metric': testimonialLogoMetricDemo,
  'stat-counter': statCounterDemo,
  'versus-competitors': versusCompetitorsDemo,
  'logo-marquee': logoMarqueeDemo,
  'hero-split': heroSplitDemo,
  'hero-split-media': heroSplitMediaDemo,
  'masthead-bar': mastheadBarDemo,
  'breadcrumb-bar': breadcrumbBarDemo,
  'hero-editorial-kpi': heroEditorialKpiDemo,
  'hero-scope-minimap': heroScopeMinimapDemo,
  'hero-thin-media': heroThinMediaDemo,
  'hero-tech-signature': heroTechSignatureDemo,
  'hero-trizone': heroTrizoneDemo,
  'hero-numeral-cover': heroNumeralCoverDemo,
  'hero-masthead-card': heroMastheadCardDemo,
  'statement-orbit': statementOrbitDemo,
  'hero-capability-band': heroCapabilityBandDemo,
  'hero-summary-rail': heroSummaryRailDemo,
  'hero-editorial-masthead': heroEditorialMastheadDemo,
  'hero-asymmetric-grid': heroAsymmetricGridDemo,
  'hero-centered-band': heroCenteredBandDemo,
  'hero-media-medallion': heroMediaMedallionDemo,
  'hero-baseline-stats': heroBaselineStatsDemo,
  'hero-grid-12': heroGrid12Demo,
  'hero-card-cover': heroCardCoverDemo,
  'hero-stack-rhythm': heroStackRhythmDemo,
  'hero-magazine-cover': heroMagazineCoverDemo,
  'hero-centered': heroCenteredDemo,
  'hero-full-bleed': heroFullBleedDemo,
  'hero-hub-listing': heroHubListingDemo,
  'hero-service-detail': heroServiceDetailDemo,
  'hero-pillar-hub': heroPillarHubDemo,
  'hero-case-study': heroCaseStudyDemo,
  'hero-home': heroHomeDemo,
  'hero-landing': heroLandingDemo,
  'hero-problem-index': heroProblemIndexDemo,
  'hero-sector': heroSectorDemo,
  'hero-utility-masthead': heroUtilityMastheadDemo,
  'hero-academy-hub': heroAcademyHubDemo,
  'hero-hub-masthead': heroHubMastheadDemo,
  'trust-legal-section': trustLegalSectionDemo,
  'welcome-section': welcomeSectionDemo,
  'list-index-section': listIndexSectionDemo,
  'hero-offer-detail': heroOfferDetailDemo,
  'hero-tech-layer': heroTechLayerDemo,
  'hero-conversion-funnel': heroConversionFunnelDemo,
  'hero-hub-stats': heroHubStatsDemo,
  'hero-service-masthead': heroServiceMastheadDemo,
  'hero-detail-menu': heroDetailMenuDemo,
  'hero-author': heroAuthorDemo,
  'hero-lead-magnet': heroLeadMagnetDemo,
  'hero-course': heroCourseDemo,
  'hero-tunnel-step': heroTunnelStepDemo,
  'tunnel-step-hero': tunnelStepHeroDemo,
  'tunnel-step-nav': tunnelStepNavDemo,
  'marquee-band': marqueeBandDemo,
  'problems-grid': problemsGridDemo,
  'why-stalls': whyStallsDemo,
  'how-we-ship': howWeShipDemo,
  'operating-layer': operatingLayerDemo,
  'manifesto-block': manifestoBlockDemo,
  'hero-essay': heroEssayDemo,
  'hero-liquid': heroLiquidDemo,
  'proof-bar': proofBarDemo,
  'stat-block': statBlockDemo,
  'metric-shift': metricShiftDemo,
  'social-proof': socialProofDemo,
  'ecosystem-partners': ecosystemPartnersDemo,
  'method-timeline': methodTimelineDemo,
  'feature-grid': featureGridDemo,
  'comparison-table': comparisonTableDemo,
  'timeline-block': timelineBlockDemo,
  'media-block': mediaBlockDemo,
  'pricing-table': pricingTableDemo,
  'faq-accordion': faqAccordionDemo,
  'objection-handler': objectionHandlerDemo,
  'cta-final': ctaFinalDemo,
  'cta-band': ctaBandDemo,
  'cta-inline': ctaInlineDemo,
  'testimonial-block': testimonialBlockDemo,
  'guarantee-block': guaranteeBlockDemo,
  'architecture-diagram': architectureDiagramDemo,
  'services-grid': servicesGridDemo,
  'maturity-pyramid': maturityPyramidDemo,
  'use-case-index': useCaseIndexDemo,
  'case-card-grid': caseCardGridDemo,
  'case-featured-grid': caseFeaturedGridDemo,
  'tier-pyramid-svg': tierPyramidSvgDemo,
  'offer-tier-grid': offerTierGridDemo,
  'team-card-grid': teamCardGridDemo,
  'hero-atlas': heroAtlasDemo,
  'persona-attributes-grid': personaAttributesGridDemo,
  'editorial-split-grid': editorialSplitGridDemo,
  'coming-soon-pills': comingSoonPillsDemo,
  'commitments-grid': commitmentsGridDemo,
  'branded-callout': brandedCalloutDemo,
  'editorial-preview': editorialPreviewDemo,
  'newsletter-band': newsletterBandDemo,
  'spec-bar': specBarDemo,
  'deliverables-grid': deliverablesGridDemo,
  'tech-stack-band': techStackBandDemo,
  'related-cards-band': relatedCardsBandDemo,
  'pull-quote-block': pullQuoteBlockDemo,
  'inclusions-list': inclusionsListDemo,
  'problem-statement': problemStatementDemo,
  'bento-grid': bentoGridDemo,
  'feature-zigzag': featureZigzagDemo,
  'scroll-gallery': scrollGalleryDemo,
  'stack-cards': stackCardsDemo,
  'hover-reveal-list': hoverRevealListDemo,
  'horizontal-showcase': horizontalShowcaseDemo,
  'media-bento': mediaBentoDemo,
  'photo-cluster': photoClusterDemo,
  'media-swap-band': mediaSwapBandDemo,
  'logo-wall': logoWallDemo,
  'pricing-comparison-matrix': pricingComparisonMatrixDemo,
  'gallery-masonry': galleryMasonryDemo,
  'feature-tabs': featureTabsDemo,
  'icon-trio': iconTrioDemo,
  'quote-spotlight': quoteSpotlightDemo,
  'steps-horizontal': stepsHorizontalDemo,
  'cta-split-visual': ctaSplitVisualDemo,
  'stats-bento': statsBentoDemo,
  'comparison-duo': comparisonDuoDemo,
  'service-catalog-list': serviceCatalogListDemo,
  'fit-columns': fitColumnsDemo,
  'editorial-table-block': editorialTableBlockDemo,
  'decision-list': decisionListDemo,
  'tech-positioning-split': techPositioningSplitDemo,
  'tech-capabilities-specs': techCapabilitiesSpecsDemo,
  'tech-models-table': techModelsTableDemo,
  'tech-when-dual': techWhenDualDemo,
  'tech-integration-flow': techIntegrationFlowDemo,
  'pain-points': painPointsDemo,
  'workflow-table': workflowTableDemo,
  'roi-band': roiBandDemo,
  'off-proof': offProofDemo,
  'case-split': caseSplitDemo,
  'department-stack': departmentStackDemo,
  'course-catalog-table': courseCatalogTableDemo,
  'learning-path-list': learningPathListDemo,
  'department-cta': departmentCtaDemo,
  'terminal-table': terminalTableDemo,
  'editorial-write-feed': editorialWriteFeedDemo,
  'product-reel': productReelDemo,
  'agentic-terminal': agenticTerminalDemo,
  'challenges-grid': challengesGridDemo,
  'journey-steps': journeyStepsDemo,
  'manifesto-statement': manifestoStatementDemo,
  'manifesto-act': manifestoActDemo,
  'asymmetric-services': asymmetricServicesDemo,
  'terminal-mockup': terminalMockupDemo,
  'terminal-metrics-strip': terminalMetricsStripDemo,
  'pricing-cards': pricingCardsDemo,
  'pricing-toggle': pricingToggleDemo,
  'pricing-single-highlight': pricingSingleHighlightDemo,
  'team-bio-grid': teamBioGridDemo,
  'about-story-split': aboutStorySplitDemo,
  'footer-cta-band': footerCtaBandDemo,
  'integrations-grid': integrationsGridDemo,
  'feature-split-media': featureSplitMediaDemo,
  'metric-callout-band': metricCalloutBandDemo,
  'testimonial-single-spotlight': testimonialSingleSpotlightDemo,
  'faq-two-column': faqTwoColumnDemo,
  'cta-newsletter-footer': ctaNewsletterFooterDemo,
  'comparison-pricing-callout': comparisonPricingCalloutDemo,
  'diagnostic-stages': diagnosticStagesDemo,
  'case-spotlight': caseSpotlightDemo,
  'testimonial-metrics': testimonialMetricsDemo,
  'editorial-prose': editorialProseDemo,
  'key-metric-grid': keyMetricGridDemo,
  'editorial-callout': editorialCalloutDemo,
  'editorial-dropcap-prose': editorialDropcapProseDemo,
  'editorial-dingbat-rule': editorialDingbatRuleDemo,
  'editorial-timeline': editorialTimelineDemo,
  'direct-answer': directAnswerDemo,
  'author-byline': authorBylineDemo,
  'pain-severity-list': painSeverityListDemo,
  'definition-extract': definitionExtractDemo,
  'system-flow': systemFlowDemo,
  'method-stepline': methodSteplineDemo,
  'eeat-panel': eeatPanelDemo,
  'rich-text': richTextDemo,
};
