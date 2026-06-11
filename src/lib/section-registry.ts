// Waimia · Section registry V2 (2026-05-15)
// Mapping `section.type` → composant Astro pour rendu data-driven.
// Cf docs/16-EXECUTION-TRACKER.md T2.3
//
// Pattern : nouvelle section = ajouter import + entry registry.
// Le SectionsRenderer.astro consomme ce registry.

import type { SectionType } from '../schemas/sections';

// Astro component type — opaque côté registry ; le rendu passe par SectionsRenderer.
export type AstroComponent = (_props: never) => unknown;

export type SectionCategory = 'marketing' | 'ecommerce' | 'app-ui';
export type SectionStatus = 'stable' | 'wip' | 'deprecated';

export interface SectionDescriptor {
  component: AstroComponent;
  category: SectionCategory;
  subcategory: string;
  categorySlug: string;
  tags: string[];
  status: SectionStatus;
  description_fr: string;
  description_en: string;
  preview?: string;
}

// Imports section components (sera étendu Wave T2.2 par worker Sonnet)
import HeroSplit from '../components/sections/HeroSplit.astro';
import HeroCentered from '../components/sections/HeroCentered.astro';
import HeroFullBleed from '../components/sections/HeroFullBleed.astro';
import HeroHome from '../components/sections/HeroHome.astro';
import TrustLegalSection from '../components/sections/TrustLegalSection.astro';
import WelcomeSection from '../components/sections/WelcomeSection.astro';
import ListIndexSection from '../components/sections/ListIndexSection.astro';
import HeroOfferDetail from '../components/sections/HeroOfferDetail.astro';
import HeroHubStats from '../components/sections/HeroHubStats.astro';
import HeroTunnelStep from '../components/sections/HeroTunnelStep.astro';
import TunnelStepNav from '../components/sections/TunnelStepNav.astro';
import MarqueeBand from '../components/sections/MarqueeBand.astro';
import WhyStalls from '../components/sections/WhyStalls.astro';
import HowWeShip from '../components/sections/HowWeShip.astro';
import OperatingLayer from '../components/sections/OperatingLayer.astro';
import ManifestoBlock from '../components/sections/ManifestoBlock.astro';
import HeroLiquid from '../components/sections/HeroLiquid.astro';
import StatBlock from '../components/sections/StatBlock.astro';
import MetricShift from '../components/sections/MetricShift.astro';
import SocialProof from '../components/sections/SocialProof.astro';
import MethodTimeline from '../components/sections/MethodTimeline.astro';
import FeatureGrid from '../components/sections/FeatureGrid.astro';
import ComparisonTable from '../components/sections/ComparisonTable.astro';
import TimelineBlock from '../components/sections/TimelineBlock.astro';
import MediaBlock from '../components/sections/MediaBlock.astro';
import PricingTable from '../components/sections/PricingTable.astro';
import FaqAccordion from '../components/sections/FaqAccordion.astro';
import ObjectionHandler from '../components/sections/ObjectionHandler.astro';
import CtaFinal from '../components/sections/CtaFinal.astro';
import CtaBandSection from '../components/sections/CtaBandSection.astro';
import TestimonialBlock from '../components/sections/TestimonialBlock.astro';
import GuaranteeBlock from '../components/sections/GuaranteeBlock.astro';
import ArchitectureDiagram from '../components/sections/ArchitectureDiagram.astro';
import ServicesGrid from '../components/sections/ServicesGrid.astro';
import MaturityPyramid from '../components/sections/MaturityPyramid.astro';
import UseCaseIndex from '../components/sections/UseCaseIndex.astro';
import CaseCardGrid from '../components/sections/CaseCardGrid.astro';
import TierPyramidSvg from '../components/sections/TierPyramidSvg.astro';
import OfferTierGrid from '../components/sections/OfferTierGrid.astro';
import TeamCardGrid from '../components/sections/TeamCardGrid.astro';
import HeroAtlas from '../components/sections/HeroAtlas.astro';
import CourseCatalogTable from '../components/sections/CourseCatalogTable.astro';
import LearningPathList from '../components/sections/LearningPathList.astro';
import PersonaAttributesGrid from '../components/sections/PersonaAttributesGrid.astro';
import EditorialSplitGrid from '../components/sections/EditorialSplitGrid.astro';
import ComingSoonPills from '../components/sections/ComingSoonPills.astro';
import BrandedCallout from '../components/sections/BrandedCallout.astro';
import EditorialPreview from '../components/sections/EditorialPreview.astro';
import NewsletterBand from '../components/sections/NewsletterBand.astro';
import SpecBar from '../components/sections/SpecBar.astro';
import TechStackBand from '../components/sections/TechStackBand.astro';
import RelatedCardsBand from '../components/sections/RelatedCardsBand.astro';
import PullQuoteBlock from '../components/sections/PullQuoteBlock.astro';
import InclusionsList from '../components/sections/InclusionsList.astro';
import ProblemStatement from '../components/sections/ProblemStatement.astro';
import BentoGrid from '../components/sections/BentoGrid.astro';
import FeatureZigzag from '../components/sections/FeatureZigzag.astro';
import LogoWall from '../components/sections/LogoWall.astro';
import GalleryMasonry from '../components/sections/GalleryMasonry.astro';
import FeatureTabs from '../components/sections/FeatureTabs.astro';
import QuoteSpotlight from '../components/sections/QuoteSpotlight.astro';
import StepsHorizontal from '../components/sections/StepsHorizontal.astro';
import CtaSplitVisual from '../components/sections/CtaSplitVisual.astro';
import StatsBento from '../components/sections/StatsBento.astro';
import ComparisonDuo from '../components/sections/ComparisonDuo.astro';
import ServiceCatalogList from '../components/sections/ServiceCatalogList.astro';
import FitColumnsSection from '../components/sections/FitColumnsSection.astro';
import EditorialTableBlock from '../components/sections/EditorialTableBlock.astro';
import DecisionList from '../components/sections/DecisionList.astro';
import TechPositioningSplit from '../components/sections/TechPositioningSplit.astro';
import TechCapabilitiesSpecs from '../components/sections/TechCapabilitiesSpecs.astro';
import TechWhenDual from '../components/sections/TechWhenDual.astro';
import TechIntegrationFlow from '../components/sections/TechIntegrationFlow.astro';
import PainPoints from '../components/sections/PainPoints.astro';
import WorkflowTable from '../components/sections/WorkflowTable.astro';
import RoiBand from '../components/sections/RoiBand.astro';
import CaseSplit from '../components/sections/CaseSplit.astro';
// Mission catalogue-gap 2026-06-11 · patterns /console + /manifesto
import TerminalTableSection from '../components/sections/TerminalTableSection.astro';
import EditorialWriteFeed from '../components/sections/EditorialWriteFeed.astro';
import ManifestoStatement from '../components/sections/ManifestoStatement.astro';
import ManifestoAct from '../components/sections/ManifestoAct.astro';
// >>> [gen-hero-feature] start
import HeroFormInline from '../components/sections/HeroFormInline.astro';
import HeroSocialProof from '../components/sections/HeroSocialProof.astro';
import FeatureComparisonGrid from '../components/sections/FeatureComparisonGrid.astro';
import FeatureAccordion from '../components/sections/FeatureAccordion.astro';
// <<< [gen-hero-feature] end
// >>> [gen-conversion] start
import FaqCtaAside from '../components/sections/FaqCtaAside.astro';
import CtaFormInline from '../components/sections/CtaFormInline.astro';
import ContactForm from '../components/sections/ContactForm.astro';
import BookingEmbed from '../components/sections/BookingEmbed.astro';
import NewsletterSignupSection from '../components/sections/NewsletterSignupSection.astro';
// <<< [gen-conversion] end
// >>> [gen-structure] start
import DataTable from '../components/sections/DataTable.astro';
import ArticleGrid from '../components/sections/ArticleGrid.astro';
import ResourceCardGrid from '../components/sections/ResourceCardGrid.astro';
import ProcessSteps from '../components/sections/ProcessSteps.astro';
import TimelineHorizontal from '../components/sections/TimelineHorizontal.astro';
import CodeShowcase from '../components/sections/CodeShowcase.astro';
import AnnouncementBanner from '../components/sections/AnnouncementBanner.astro';
// <<< [gen-structure] end
// >>> [gen-trust-proof] start
import TrustBadgesBand from '../components/sections/TrustBadgesBand.astro';
import TestimonialLogoMetric from '../components/sections/TestimonialLogoMetric.astro';
import StatCounter from '../components/sections/StatCounter.astro';
import VersusCompetitors from '../components/sections/VersusCompetitors.astro';
import LogoMarquee from '../components/sections/LogoMarquee.astro';
// <<< [gen-trust-proof] end
import AsymmetricServices from '../components/sections/AsymmetricServices.astro';
import TerminalMockupSection from '../components/sections/TerminalMockupSection.astro';
import TerminalMetricsStrip from '../components/sections/TerminalMetricsStrip.astro';
// >>> [gen-pricing] start
import PricingCards from '../components/sections/PricingCards.astro';
import PricingToggle from '../components/sections/PricingToggle.astro';
import PricingSingleHighlight from '../components/sections/PricingSingleHighlight.astro';
// <<< [gen-pricing] end
// >>> [new-standard] start
import TeamBioGrid from '../components/sections/TeamBioGrid.astro';
import AboutStorySplit from '../components/sections/AboutStorySplit.astro';
import FooterCtaBand from '../components/sections/FooterCtaBand.astro';
import IntegrationsGrid from '../components/sections/IntegrationsGrid.astro';
import FeatureSplitMedia from '../components/sections/FeatureSplitMedia.astro';
import MetricCalloutBand from '../components/sections/MetricCalloutBand.astro';
import TestimonialSingleSpotlight from '../components/sections/TestimonialSingleSpotlight.astro';
import FaqTwoColumn from '../components/sections/FaqTwoColumn.astro';
import CtaNewsletterFooter from '../components/sections/CtaNewsletterFooter.astro';
import ComparisonPricingCallout from '../components/sections/ComparisonPricingCallout.astro';
import DiagnosticStages from '../components/sections/DiagnosticStages.astro';
import CaseSpotlight from '../components/sections/CaseSpotlight.astro';
import TestimonialMetrics from '../components/sections/TestimonialMetrics.astro';
// <<< [new-standard] end

/**
 * Section registry — single source of truth pour composants et métadonnées marketplace.
 */
export const SECTIONS: Record<SectionType, SectionDescriptor> = {
  // >>> [gen-hero-feature] start
  'hero-form-inline': {
    component: HeroFormInline,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'form', 'lead', 'capture', 'newsletter', 'above-fold'],
    status: 'stable',
    description_fr: 'Hero de capture lead above-the-fold : promesse à gauche, formulaire email/CTA à droite postant sur /api/newsletter, points de réassurance optionnels.',
    description_en: 'Above-the-fold lead-capture hero: promise on the left, email/CTA form on the right posting to /api/newsletter, optional reassurance points.',
  },
  'hero-social-proof': {
    component: HeroSocialProof,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'social-proof', 'stats', 'rating', 'trust', 'above-fold'],
    status: 'stable',
    description_fr: 'Hero centré avec preuve sociale above-the-fold : titre, CTA, note clients optionnelle et bande de chiffres clés (StatRow) sous le pli haut.',
    description_en: 'Centered hero with above-the-fold social proof: heading, CTA, optional customer rating and a key-figures band (StatRow) under the fold.',
  },
  'feature-comparison-grid': {
    component: FeatureComparisonGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['feature', 'comparison', 'us-vs-them', 'grid', 'differentiation'],
    status: 'stable',
    description_fr: 'Différenciation légère « nous vs eux » en grille de cartes : 2 ou 3 colonnes, lignes cochées ou barrées, colonne mise en avant. Plus léger que la table comparative.',
    description_en: 'Lightweight "us vs them" differentiation as a card grid: 2 or 3 columns, check or cross rows, one highlighted column. Lighter than the comparison table.',
  },
  'feature-accordion': {
    component: FeatureAccordion,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['feature', 'accordion', 'progressive-disclosure', 'details', 'saas'],
    status: 'stable',
    description_fr: 'Features en progressive disclosure : accordéon natif <details>, chaque item ouvre un détail explicatif et une métadonnée optionnelle. Premier item ouvrable par défaut.',
    description_en: 'Features in progressive disclosure: native <details> accordion, each item reveals an explanatory body and optional meta. First item can open by default.',
  },
  // <<< [gen-hero-feature] end
  // >>> [gen-conversion] start
  'faq-cta-aside': {
    component: FaqCtaAside,
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    tags: ['faq', 'accordion', 'cta', 'aside', 'sticky', 'lead', 'conversion'],
    status: 'stable',
    description_fr: 'FAQ en accordéon à gauche et panneau de réassurance avec CTA collant à droite, pour transformer une FAQ passive en capture de lead.',
    description_en: 'Accordion FAQ on the left with a sticky reassurance and CTA panel on the right, turning a passive FAQ into lead capture.',
  },
  'cta-form-inline': {
    component: CtaFormInline,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['cta', 'form', 'inline', 'email', 'newsletter', 'lead', 'capture'],
    status: 'stable',
    description_fr: 'Bande CTA avec mini-formulaire inline (email et bouton), pour capter un lead ou une inscription newsletter à l\'instant d\'intention.',
    description_en: 'CTA band with an inline mini-form (email and button), to capture a lead or newsletter sign-up at the moment of intent.',
  },
  'contact-form': {
    component: ContactForm,
    category: 'marketing',
    subcategory: 'Contact Sections',
    categorySlug: 'contact-sections',
    tags: ['contact', 'form', 'name', 'email', 'message', 'lead'],
    status: 'stable',
    description_fr: 'Section contact avec formulaire (nom, email, message) et colonne coordonnées, action vers /api/contact, bilingue.',
    description_en: 'Contact section with a form (name, email, message) and a details column, posting to /api/contact, bilingual.',
  },
  'booking-embed': {
    component: BookingEmbed,
    category: 'marketing',
    subcategory: 'Contact Sections',
    categorySlug: 'contact-sections',
    tags: ['contact', 'booking', 'cal', 'embed', 'meeting', 'rdv', 'conversion'],
    status: 'stable',
    description_fr: 'Section de prise de rendez-vous intégrant le widget Cal.com (CalEmbed) avec une copy de réassurance, pour réserver un audit ou un appel.',
    description_en: 'Booking section embedding the Cal.com widget (CalEmbed) with reassurance copy, to book an audit or a call.',
  },
  'newsletter-signup-section': {
    component: NewsletterSignupSection,
    category: 'marketing',
    subcategory: 'Newsletter Sections',
    categorySlug: 'newsletter-sections',
    tags: ['newsletter', 'subscribe', 'email', 'signup', 'full-width', 'climax'],
    status: 'stable',
    description_fr: 'Section d\'inscription newsletter pleine largeur (réutilise NewsletterSignup), fonds au choix dont ink pour un climax de page.',
    description_en: 'Full-width newsletter sign-up section (reuses NewsletterSignup), with a background enum including ink for a page climax.',
  },
  // <<< [gen-conversion] end
  // >>> [gen-structure] start
  'data-table': {
    component: DataTable,
    category: 'marketing',
    subcategory: 'Table Sections',
    categorySlug: 'table-sections',
    tags: ['table', 'data', 'rows', 'comparison', 'neutral', 'striped'],
    status: 'stable',
    description_fr: 'Table de données neutre générique : en-tête optionnel, colonnes avec alignements, lignes et cellules typées (emphase), zébrures et légende. Distincte des tables habillées terminal ou éditoriale.',
    description_en: 'Neutral generic data table: optional header, columns with alignments, rows and typed cells (emphasis), zebra striping and caption. Distinct from the terminal or editorial dressed tables.',
  },
  'article-grid': {
    component: ArticleGrid,
    category: 'marketing',
    subcategory: 'Content Listing Sections',
    categorySlug: 'content-listing-sections',
    tags: ['blog', 'articles', 'grid', 'cards', 'editorial', 'listing'],
    status: 'stable',
    description_fr: 'Grille de cartes d’articles/blog : image optionnelle, tag, titre, date, temps de lecture, extrait, auteur et lien, en 2 ou 3 colonnes. Le classique éditorial B2B.',
    description_en: 'Grid of article/blog cards: optional image, tag, title, date, read time, excerpt, author and link, in 2 or 3 columns. The B2B editorial classic.',
  },
  'resource-card-grid': {
    component: ResourceCardGrid,
    category: 'marketing',
    subcategory: 'Content Listing Sections',
    categorySlug: 'content-listing-sections',
    tags: ['resources', 'downloads', 'grid', 'cards', 'cta', 'lead-magnet'],
    status: 'stable',
    description_fr: 'Grille de ressources téléchargeables : type (livre blanc, cookbook, outil), titre, description, format, badge gated et CTA, en 2 ou 3 colonnes.',
    description_en: 'Grid of downloadable resources: kind (white paper, cookbook, tool), title, description, format, gated badge and CTA, in 2 or 3 columns.',
  },
  'process-steps': {
    component: ProcessSteps,
    category: 'marketing',
    subcategory: 'Process Sections',
    categorySlug: 'process-sections',
    tags: ['process', 'steps', 'how-it-works', 'numbered', 'onboarding', 'method'],
    status: 'stable',
    description_fr: '« Comment ça marche » en étapes numérotées verticales : numéro, titre, description et meta par étape, connecteurs visuels entre paliers, fonds paper à ink.',
    description_en: 'How it works in vertical numbered steps: number, title, description and meta per step, visual connectors between stages, paper to ink backgrounds.',
  },
  'timeline-horizontal': {
    component: TimelineHorizontal,
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    tags: ['timeline', 'horizontal', 'roadmap', 'dated', 'scroll', 'milestones'],
    status: 'stable',
    description_fr: 'Frise chronologique horizontale datée (roadmap) : événements à statut (done/active/upcoming), date, label et body, scroll-snap horizontal, empilement vertical sur mobile.',
    description_en: 'Dated horizontal timeline (roadmap): status events (done/active/upcoming), date, label and body, horizontal scroll-snap, vertical stacking on mobile.',
  },
  'code-showcase': {
    component: CodeShowcase,
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    tags: ['code', 'showcase', 'syntax', 'mono', 'devtools', 'saas'],
    status: 'stable',
    description_fr: 'Vitrine de code annoté pour devtools/SaaS technique : copy explicative, bloc code mono avec numéros de ligne et commentaires bilingues alignés, label fichier et langage, tone encre ou paper.',
    description_en: 'Annotated code showcase for devtools/technical SaaS: explanatory copy, mono code block with line numbers and aligned bilingual comments, file and language label, ink or paper tone.',
  },
  'announcement-banner': {
    component: AnnouncementBanner,
    category: 'marketing',
    subcategory: 'Banner Sections',
    categorySlug: 'banner-sections',
    tags: ['banner', 'announcement', 'promo', 'alert', 'dismissible', 'strip'],
    status: 'stable',
    description_fr: 'Bandeau d’annonce/promo fin : badge optionnel, texte court et lien, bouton de fermeture optionnel (dismissible), variantes accent, encre ou paper-2.',
    description_en: 'Thin announcement/promo banner: optional badge, short text and link, optional dismiss button, accent, ink or paper-2 variants.',
  },
  // <<< [gen-structure] end
  // >>> [gen-trust-proof] start
  'trust-badges-band': {
    component: TrustBadgesBand,
    category: 'marketing',
    subcategory: 'Trust Sections',
    categorySlug: 'trust-sections',
    tags: ['trust', 'badges', 'security', 'compliance', 'reassurance'],
    status: 'stable',
    description_fr: 'Bandeau de badges de réassurance (sécurité, hébergement, conformité RGPD, garanties) en cellules hairline mono, placé juste avant le CTA pour lever l’objection risque.',
    description_en: 'Reassurance badge band (security, hosting, GDPR compliance, guarantees) in mono hairline cells, placed right before the CTA to remove the risk objection.',
  },
  'testimonial-logo-metric': {
    component: TestimonialLogoMetric,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['testimonial', 'logo', 'metric', 'b2b', 'social-proof'],
    status: 'stable',
    description_fr: 'Carte de preuve B2B la plus persuasive : logo client + citation attribuée + métrique d’impact chiffrée par carte. Combine preuve sociale, autorité de marque et résultat mesuré.',
    description_en: 'The most persuasive B2B proof card: client logo + attributed quote + a quantified impact metric per card. Combines social proof, brand authority and measured outcome.',
  },
  'stat-counter': {
    component: StatCounter,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['stats', 'counter', 'count-up', 'animated', 'kpi'],
    status: 'stable',
    description_fr: 'Compteur animé count-up déclenché à l’entrée dans le viewport (île React client:visible), grille de 2 à 4 stats. Respecte prefers-reduced-motion et reste lisible sans JS.',
    description_en: 'Animated count-up counter triggered on viewport entry (React island client:visible), grid of 2 to 4 stats. Respects prefers-reduced-motion and stays readable without JS.',
  },
  'versus-competitors': {
    component: VersusCompetitors,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['comparison', 'competitors', 'versus', 'table', 'highlight'],
    status: 'stable',
    description_fr: 'Comparatif « nous vs alternatives » avec colonne « nous » mise en avant, lignes de critères groupées et cellules check / cross / partiel. Distinct de la matrice tarifaire interne.',
    description_en: 'A “us vs alternatives” comparison with the “us” column highlighted, grouped criteria rows and check / cross / partial cells. Distinct from the internal pricing matrix.',
  },
  'logo-marquee': {
    component: LogoMarquee,
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    tags: ['logos', 'marquee', 'scroll', 'trusted-by', 'image'],
    status: 'stable',
    description_fr: 'Bandeau de logos image à défilement infini (« ils nous font confiance »), marquee CSS, grayscale optionnel. Respecte prefers-reduced-motion. Distinct du marquee-band texte mono.',
    description_en: 'Infinite-scroll image logo band (“trusted by”), CSS marquee, optional grayscale. Respects prefers-reduced-motion. Distinct from the mono-text marquee-band.',
  },
  // <<< [gen-trust-proof] end
  'hero-split': {
    component: HeroSplit,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'split', 'cta'],
    status: 'stable',
    description_fr: "Hero en deux colonnes pour présenter une offre avec visuel et appel à l'action principal.",
    description_en: 'Two-column hero section for presenting an offer with a visual and primary call to action.',
  },
  'hero-centered': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'centered', 'cta'],
    status: 'stable',
    description_fr: 'Hero centré pour poser une proposition de valeur claire et guider vers une action principale.',
    description_en: 'Centered hero section for stating a clear value proposition and guiding users to a primary action.',
  },
  'hero-full-bleed': {
    component: HeroFullBleed,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'full-bleed', 'canvas', 'motion'],
    status: 'stable',
    description_fr: 'Hero immersif plein écran pour créer un impact visuel fort avec mouvement ou canvas.',
    description_en: 'Immersive full-bleed hero section for creating strong visual impact with motion or canvas.',
  },
  'hero-hub-listing': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'listing', 'editorial'],
    status: 'deprecated',
    description_fr: "(déprécié → hero-hub-masthead variant=listing) Hero éditorial de hub avec titre monumental et lede courte, sans appel à l'action, pour pages de listing.",
    description_en: '(deprecated → hero-hub-masthead variant=listing) Editorial hub hero with a monumental headline and short lede, without a call to action, for listing pages.',
  },
  'hero-service-detail': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'service', 'detail', 'metrics'],
    status: 'stable',
    description_fr: 'Hero de page service avec numéro éditorial, titre, accroche et barre de preuves chiffrées optionnelle.',
    description_en: 'Service page hero with an editorial number, headline, lede, and optional inline proof metrics bar.',
  },
  'hero-pillar-hub': {
    component: HeroHubStats,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'pillar', 'hub', 'stats'],
    status: 'stable',
    description_fr: 'Hero de page pilier avec titre maximal et grille de statistiques quatre colonnes optionnelle.',
    description_en: 'Pillar page hero with a maximal headline and an optional four-column statistics grid.',
  },
  'hero-case-study': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'case-study', 'specs', 'decoration'],
    status: 'stable',
    description_fr: "Hero d'étude de cas avec décor géométrique, titre et barre de spécifications (client, secteur, durée).",
    description_en: 'Case study hero with geometric decoration, headline, and a specification bar (client, sector, duration).',
  },
  'hero-home': {
    component: HeroHome,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'home', 'minimap', 'proofs', 'signature'],
    status: 'stable',
    description_fr: 'Hero d\'accueil Waimia : mini-map 3×2 de 6 territoires opérationnels, 3 preuves verticales, double CTA et signature géométrique V·9.',
    description_en: 'Waimia home hero: 3×2 mini-map of 6 operational territories, 3 vertical proofs, dual CTA, and V·9 geometric signature.',
  },
  'hero-landing': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'landing', 'magnetic', 'cta'],
    status: 'stable',
    description_fr: 'Hero magnétique landing : eyebrow mono, h1 italique avec emphasis, lede, double CTA et bandeau de disponibilité.',
    description_en: 'Magnetic landing hero: mono eyebrow, italic emphasis h1, lede, dual CTA, and availability strip.',
  },
  'hero-problem-index': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'problem', 'svg', 'decoration'],
    status: 'stable',
    description_fr: 'Hero d\'index par problème : décor SVG rectangle rotated 12°, h1 monumental, lede italique et phrase canonique.',
    description_en: 'Problem index hero: 12° rotated rectangle SVG decoration, monumental h1, italic lede, and canonical line.',
  },
  'hero-sector': {
    component: HeroOfferDetail,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'sector', 'department', 'tags'],
    status: 'stable',
    description_fr: 'Hero de page secteur ou département : SVG rotated 15° accent, dept kicker, h1 + lead italique, CTA et meta, tags secteurs.',
    description_en: 'Sector or department hero: 15° rotated SVG with accent, dept kicker, italic h1 + lead, CTA and meta, sector tags.',
  },
  'hero-utility-masthead': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'utility', 'masthead', 'editorial'],
    status: 'deprecated',
    description_fr: '(déprécié → hero-hub-masthead variant=detail) Masthead utilitaire générique (about, méthode, academy intro) : kicker, h1 monumental, lede display italique, alignement gauche ou centré.',
    description_en: '(deprecated → hero-hub-masthead variant=detail) Generic utility masthead (about, method, academy intro): kicker, monumental h1, italic display lede, left or centered alignment.',
  },
  'hero-academy-hub': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'academy', 'school', 'stats'],
    status: 'stable',
    description_fr: 'Hero hub académie : kicker mono, h1 display, lede et bande de stats mono (cours, parcours, alumni).',
    description_en: 'Academy hub hero: mono kicker, display h1, lede, and mono stats strip (courses, paths, alumni).',
  },
  'hero-hub-masthead': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'masthead', 'index', 'unified', 'variant'],
    status: 'stable',
    description_fr: "Masthead unifié paramétrable (variant hub|listing|detail) : absorbe hero-hub-listing et hero-utility-masthead. hub = kicker mono + h1 italique display + lede court ; listing = deco SVG optionnelle + h1 monumental + lede révélée ; detail = kicker optionnel + h1 + lede display italique, alignement gauche ou centré.",
    description_en: 'Unified configurable masthead (variant hub|listing|detail): absorbs hero-hub-listing and hero-utility-masthead. hub = mono kicker + italic display h1 + short lede; listing = optional SVG deco + monumental h1 + revealed lede; detail = optional kicker + h1 + italic display lede, left or centered alignment.',
  },
  'trust-legal-section': {
    component: TrustLegalSection,
    category: 'marketing',
    subcategory: 'Trust Sections',
    categorySlug: 'trust-sections',
    tags: ['trust', 'legal', 'toc', 'governance'],
    status: 'stable',
    description_fr: 'Masthead documentaire avec meta de révision et sommaire sticky pour pages confiance, gouvernance et légales.',
    description_en: 'Documentary masthead with revision metadata and sticky contents for trust, governance, and legal pages.',
  },
  'welcome-section': {
    component: WelcomeSection,
    category: 'marketing',
    subcategory: 'Utility Sections',
    categorySlug: 'utility-sections',
    tags: ['welcome', 'confirmation', 'post-conversion', 'steps'],
    status: 'stable',
    description_fr: 'Écran de confirmation post-conversion avec checkmark, message central, trois prochaines étapes et lien retour.',
    description_en: 'Post-conversion confirmation screen with checkmark, centered message, three next steps, and back link.',
  },
  'list-index-section': {
    component: ListIndexSection,
    category: 'marketing',
    subcategory: 'Index Sections',
    categorySlug: 'index-sections',
    tags: ['index', 'listing', 'filters', 'resources'],
    status: 'stable',
    description_fr: 'Masthead de listing avec filtres optionnels, conteneur de liste ouvert et footer custom.',
    description_en: 'Listing masthead with optional filters, open list container, and custom footer.',
  },
  'hero-offer-detail': {
    component: HeroOfferDetail,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'offer', 'detail', 'concentric-svg', 'tier'],
    status: 'stable',
    description_fr: 'Hero de page offre détail : SVG cercles concentriques signature, breadcrumb, tier kicker, h1 + lead italique, CTA et meta.',
    description_en: 'Offer detail hero: signature concentric circles SVG, breadcrumb, tier kicker, h1 + italic lead, CTA and meta.',
  },
  'hero-tech-layer': {
    component: HeroOfferDetail,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'technology', 'layer', 'triangles'],
    status: 'stable',
    description_fr: 'Hero de couche technologique : triangles SVG signature, layer badge (claude/os/orch), h1 + lead italique, CTA et meta.',
    description_en: 'Technology layer hero: signature triangles SVG, layer badge (claude/os/orch), h1 + italic lead, CTA and meta.',
  },
  'hero-conversion-funnel': {
    component: HeroHubStats,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'conversion', 'funnel', 'flagship', 'stats', 'benefits'],
    status: 'stable',
    description_fr: 'Hero magnétique flagship : kicker num + h1 monumental, lede, meta pills, benefits checklist, ligne preuve mono, double CTA et grille stats 4-col.',
    description_en: 'Flagship magnetic hero: num kicker + monumental h1, lede, meta pills, benefits checklist, mono proof line, dual CTA and 4-col stats grid.',
  },
  'hero-hub-stats': {
    component: HeroHubStats,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'stats', 'pillar', 'masthead'],
    status: 'stable',
    description_fr: 'Hero hub avec stats : meta kicker double + numéro § accent + h1 maximal, lede, grille KeyMetric 4-col en pied avec accent.',
    description_en: 'Hub hero with stats: dual meta kicker + accent § number + maximal h1, lede, 4-col KeyMetric grid at the foot with accent.',
  },
  'hero-service-masthead': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'service', 'masthead', 'simple'],
    status: 'stable',
    description_fr: 'Masthead service sobre : kicker § Service N + h1 display + lede display muted, sans décor SVG.',
    description_en: 'Plain service masthead: § Service N kicker + display h1 + muted display lede, no SVG decoration.',
  },
  'hero-detail-menu': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'detail', 'menu', 'nested'],
    status: 'stable',
    description_fr: 'Hero d\'entrée de menu détail : kicker parent + numéro § accent + h1 + lede sobre, idéal pour sous-pages catalogue.',
    description_en: 'Detail-menu entry hero: parent kicker + accent § number + h1 + plain lede, ideal for sub-catalogue pages.',
  },
  'hero-author': {
    component: HeroSplit,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'author', 'portrait', 'profile'],
    status: 'stable',
    description_fr: 'Hero de page auteur : 2-col copy/portrait, breadcrumb équipe, role eyebrow, h1 split prénom+nom italic accent, lede display.',
    description_en: 'Author page hero: 2-col copy/portrait, team breadcrumb, role eyebrow, h1 split first-name + italic accent surname, display lede.',
  },
  'hero-lead-magnet': {
    component: HeroSplit,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'lead-magnet', 'whitepaper', 'cover', 'download'],
    status: 'stable',
    description_fr: 'Hero lead magnet (livre blanc) : 2-col texte/cover PDF, kicker + h1 + lede italique, meta format/date, carte download CTA.',
    description_en: 'Lead magnet hero (whitepaper): 2-col text/PDF cover, kicker + h1 + italic lede, format/date meta, download card CTA.',
  },
  'hero-course': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'course', 'training', 'pills', 'meta'],
    status: 'stable',
    description_fr: 'Hero de page cours/formation : kicker accent + title + lede + meta-pills (niveau/durée/format/prix) + cta-group primary/ghost.',
    description_en: 'Course/training hero: accent kicker + title + lede + meta-pills (level/duration/format/price) + primary/ghost cta-group.',
  },
  'hero-tunnel-step': {
    component: HeroTunnelStep,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'tunnel', 'step', 'progress', 'funnel'],
    status: 'stable',
    description_fr: 'Hero d\'étape de tunnel : kicker accent + barre de progression [01][02]... + h1 (variante hero ou section) + lede.',
    description_en: 'Tunnel step hero: accent kicker + progress bar [01][02]... + h1 (hero or section variant) + lede.',
  },
  'tunnel-step-hero': {
    component: HeroTunnelStep,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'tunnel', 'step', 'progress', 'funnel', 'kicker-computed'],
    status: 'stable',
    description_fr: 'Hero d\'étape tunnel V2 : kicker calculé (offre_label + step/progress_total) + barre [NN] + h1 (hero ou section) + lede.',
    description_en: 'Tunnel step hero V2: computed kicker (offre_label + step/progress_total) + [NN] bar + h1 (hero or section) + lede.',
  },
  'tunnel-step-nav': {
    component: TunnelStepNav,
    category: 'marketing',
    subcategory: 'Call-to-Action Sections',
    categorySlug: 'call-to-action-sections',
    tags: ['nav', 'tunnel', 'step', 'cta', 'footer', 'prev', 'meta'],
    status: 'stable',
    description_fr: 'Pied de navigation d\'étape tunnel : lien prev optionnel + cta (primary/accent/ghost) + barre méta (lecture + retour offre).',
    description_en: 'Tunnel step navigation footer: optional prev link + cta (primary/accent/ghost) + meta bar (reading time + back to offer).',
  },
  'marquee-band': {
    component: MarqueeBand,
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    tags: ['marquee', 'band', 'scroll', 'mono', 'infinite'],
    status: 'stable',
    description_fr: "Bandeau marquee mono uppercase à défilement horizontal infini · items + séparateurs · respecte prefers-reduced-motion.",
    description_en: 'Mono uppercase infinite-scroll marquee band · items + separators · respects prefers-reduced-motion.',
  },
  'problems-grid': {
    component: FeatureGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['problems', 'frictions', 'cards', 'grid', 'numbered'],
    status: 'stable',
    description_fr: 'Grille de problèmes/frictions auto-fit (3 cards min) : num + kicker + h3 + body, séparateurs hairline 1px.',
    description_en: 'Auto-fit problems/frictions grid (3+ cards): num + kicker + h3 + body, 1px hairline separators.',
  },
  'why-stalls': {
    component: WhyStalls,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['why', 'stalls', 'sticky', 'figures', 'editorial'],
    status: 'stable',
    description_fr: 'Section éditoriale "pourquoi X cale" : chapter label sticky à gauche + N FIG rows à droite avec row-lines.',
    description_en: 'Editorial "why X stalls" section: sticky chapter label left + N FIG rows right with row-lines.',
  },
  'how-we-ship': {
    component: HowWeShip,
    category: 'marketing',
    subcategory: 'Timeline Sections',
    categorySlug: 'timelines',
    tags: ['process', 'timeline', 'sticky', 'scrub', 'pin', 'steps'],
    status: 'stable',
    description_fr: 'Section "comment on livre" — sticky pin scrub : N étapes avec numline et stage cards animées au scroll (graceful degradation mobile).',
    description_en: 'How-we-ship section — sticky pin scrub: N steps with numline and scroll-driven stage cards (graceful mobile degradation).',
  },
  'operating-layer': {
    component: OperatingLayer,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['platform', 'dark', 'terminal', 'console', 'mockup', 'attributes'],
    status: 'stable',
    description_fr: "Section couche opérationnelle fond sombre : chapter label + h2 + lede + CTA, console terminal mockup à droite, strip 4 attributs en pied.",
    description_en: 'Dark-background operating-layer section: chapter label + h2 + lede + CTA, terminal console mockup right, 4-attribute strip at foot.',
  },
  'manifesto-block': {
    component: ManifestoBlock,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['manifesto', 'editorial', 'large-display', 'italic', 'statement'],
    status: 'stable',
    description_fr: 'Bloc manifeste intercalary : kicker mono § + grand bloc display italique sans box, span accent terracotta, respiration éditoriale forte.',
    description_en: 'Intercalary manifesto block: § mono kicker + large box-less italic display, terracotta accent span, strong editorial breathing.',
  },
  'hero-essay': {
    component: HeroCentered,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'essay', 'editorial', 'meta'],
    status: 'stable',
    description_fr: "Hero d'article éditorial avec accroche italique et métadonnées auteur, date et temps de lecture.",
    description_en: 'Editorial article hero with an italic lede and author, date, and reading-time metadata.',
  },
  'hero-liquid': {
    component: HeroLiquid,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'manifesto', 'canvas', 'react-island', 'dark'],
    status: 'stable',
    description_fr: 'Hero manifeste à fond canvas liquide (terracotta animé) : eyebrow, grand titre display italique, lede et CTAs sur fond sombre.',
    description_en: 'Liquid-canvas manifesto hero (animated terracotta): eyebrow, large italic display headline, lede and CTAs on a dark background.',
  },
  'proof-bar': {
    component: StatBlock,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['proof', 'metrics', 'bar'],
    status: 'stable',
    description_fr: 'Barre de preuve compacte pour afficher des métriques clés et renforcer la crédibilité.',
    description_en: 'Compact proof bar for displaying key metrics and reinforcing credibility.',
  },
  'stat-block': {
    component: StatBlock,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['stats', 'metrics', 'grid'],
    status: 'stable',
    description_fr: "Bloc de statistiques en grille pour mettre en avant des chiffres de performance ou d'impact.",
    description_en: 'Grid-based stats block for highlighting performance or impact figures.',
  },
  'metric-shift': {
    component: MetricShift,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['proof', 'metrics', 'before-after', 'results'],
    status: 'stable',
    description_fr: 'Comparaison avant → après : valeur initiale et finale magnifiées, delta.',
    description_en: 'Before → after comparison: initial and final value magnified, delta.',
  },
  'social-proof': {
    component: SocialProof,
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    tags: ['logos', 'social-proof', 'marquee'],
    status: 'stable',
    description_fr: 'Section de logos clients ou partenaires pour installer une preuve sociale immédiate.',
    description_en: 'Client or partner logo section for establishing immediate social proof.',
  },
  'method-timeline': {
    component: MethodTimeline,
    category: 'marketing',
    subcategory: 'Timeline Sections',
    categorySlug: 'timelines',
    tags: ['method', 'timeline', 'steps'],
    status: 'stable',
    description_fr: "Timeline méthodologique pour expliquer les étapes d'un accompagnement ou d'un processus.",
    description_en: 'Method timeline for explaining the steps of a service process or engagement.',
  },
  'feature-grid': {
    component: FeatureGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['features', 'grid'],
    status: 'stable',
    description_fr: "Grille de fonctionnalités pour structurer les bénéfices ou capacités principales d'une offre.",
    description_en: 'Feature grid for structuring the core benefits or capabilities of an offer.',
  },
  'comparison-table': {
    component: ComparisonTable,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['comparison', 'table'],
    status: 'stable',
    description_fr: 'Tableau comparatif pour clarifier les différences entre offres, options ou approches.',
    description_en: 'Comparison table for clarifying differences between offers, options, or approaches.',
  },
  'timeline-block': {
    component: TimelineBlock,
    category: 'marketing',
    subcategory: 'Timeline Sections',
    categorySlug: 'timelines',
    tags: ['timeline', 'events', 'history'],
    status: 'stable',
    description_fr: "Bloc chronologique pour raconter une progression, un historique ou une séquence d'événements.",
    description_en: 'Timeline block for telling a progression, history, or sequence of events.',
  },
  'media-block': {
    component: MediaBlock,
    category: 'marketing',
    subcategory: 'Gallery Sections',
    categorySlug: 'gallery-sections',
    tags: ['media', 'image', 'video', 'embed'],
    status: 'stable',
    description_fr: 'Bloc média pour intégrer une image, une vidéo ou un contenu embarqué dans une page marketing.',
    description_en: 'Media block for embedding an image, video, or external content in a marketing page.',
  },
  'pricing-table': {
    component: PricingTable,
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    tags: ['pricing', 'tiers', 'plans'],
    status: 'stable',
    description_fr: 'Table de prix pour présenter clairement les formules, paliers et options commerciales.',
    description_en: 'Pricing table for clearly presenting plans, tiers, and commercial options.',
  },
  'faq-accordion': {
    component: FaqAccordion,
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    tags: ['faq', 'accordion'],
    status: 'stable',
    description_fr: 'FAQ en accordéon pour répondre aux questions fréquentes sans surcharger la page.',
    description_en: 'Accordion FAQ for answering common questions without overloading the page.',
  },
  'objection-handler': {
    component: ObjectionHandler,
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    tags: ['objections', 'faq', 'reassurance'],
    status: 'stable',
    description_fr: 'Bloc de traitement des objections pour lever les freins et rassurer avant conversion.',
    description_en: 'Objection-handling block for reducing friction and reassuring users before conversion.',
  },
  'cta-final': {
    component: CtaFinal,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['cta', 'final', 'conversion'],
    status: 'stable',
    description_fr: "CTA final pour conclure une page et orienter vers l'action de conversion principale.",
    description_en: 'Final CTA section for closing a page and directing users to the main conversion action.',
  },
  'cta-band': {
    component: CtaBandSection,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['cta', 'band', 'inline'],
    status: 'stable',
    description_fr: 'Bandeau CTA horizontal pour relancer une action au milieu ou en fin de parcours.',
    description_en: 'Horizontal CTA band for prompting action mid-page or near the end of the journey.',
  },
  'cta-inline': {
    component: CtaBandSection,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['cta', 'inline'],
    status: 'stable',
    description_fr: 'CTA inline discret pour insérer une action contextuelle dans un contenu existant.',
    description_en: 'Subtle inline CTA for inserting a contextual action within existing content.',
  },
  'testimonial-block': {
    component: TestimonialBlock,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['testimonial', 'social-proof', 'quote'],
    status: 'stable',
    description_fr: 'Bloc témoignage pour mettre en avant une citation client et renforcer la confiance.',
    description_en: 'Testimonial block for highlighting a customer quote and strengthening trust.',
  },
  'guarantee-block': {
    component: GuaranteeBlock,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['guarantee', 'trust', 'reassurance'],
    status: 'stable',
    description_fr: 'Bloc garantie pour expliciter les engagements, réduire le risque perçu et rassurer.',
    description_en: 'Guarantee block for explaining commitments, reducing perceived risk, and reassuring users.',
  },
  'architecture-diagram': {
    component: ArchitectureDiagram,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['architecture', 'diagram', 'svg', 'system'],
    status: 'stable',
    description_fr: "Diagramme d'architecture signature : N canaux d'entrée vers un système central et M sorties, avec boucle d'amélioration continue.",
    description_en: 'Signature architecture diagram: N input channels flowing into a central system with M outputs, plus a continuous improvement loop.',
  },
  'services-grid': {
    component: ServicesGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['services', 'grid', 'metrics', 'connectors'],
    status: 'stable',
    description_fr: 'Grille éditoriale de services 3×2 avec figure, métrique, body et ligne de connecteurs en pied de cellule.',
    description_en: 'Editorial 3×2 services grid with figure index, metric, body, and a connectors line at the foot of each cell.',
  },
  'maturity-pyramid': {
    component: MaturityPyramid,
    category: 'marketing',
    subcategory: 'Timeline Sections',
    categorySlug: 'timelines',
    tags: ['maturity', 'pyramid', 'timeline', 'tiers'],
    status: 'stable',
    description_fr: "Pyramide de maturité à quatre paliers avec timeline d'étapes, SVG progressif et grille de cartes asymétriques.",
    description_en: 'Four-tier maturity pyramid with a steps timeline, a progressive SVG, and an asymmetric card grid.',
  },
  'use-case-index': {
    component: UseCaseIndex,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['use-case', 'index', 'editorial', 'rows'],
    status: 'stable',
    description_fr: "Index éditorial de cas d'usage en lignes numérotées avec libellé italique, tag mono et lien d'ancrage solution.",
    description_en: 'Editorial use-case index as numbered rows with italic label, mono tag, and solution anchor link.',
  },
  'case-card-grid': {
    component: CaseCardGrid,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['case-study', 'grid', 'proof', 'editorial'],
    status: 'stable',
    description_fr: "Table éditoriale de cas clients en six colonnes (index, client, secteur, stack, impact, flèche) façon compte rendu d'audit.",
    description_en: 'Editorial six-column case-study table (index, client, sector, stack, impact, arrow) styled like an audit report.',
  },
  'tier-pyramid-svg': {
    component: TierPyramidSvg,
    category: 'marketing',
    subcategory: 'Hero Sections',
    categorySlug: 'hero-header-sections',
    tags: ['offers', 'pyramid', 'tiers', 'svg'],
    status: 'stable',
    description_fr: 'Pyramide SVG isocèle à trois niveaux pour visualiser la progression Découverte · Transformation · Partenariat.',
    description_en: 'Three-tier isosceles SVG pyramid showing the Discovery · Transformation · Partnership offer progression.',
  },
  'offer-tier-grid': {
    component: OfferTierGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['offers', 'tiers', 'pricing', 'cards'],
    status: 'stable',
    description_fr: 'Section de palier d’offres avec eyebrow, H2, lede, grille de cartes et variante hero sombre optionnelle.',
    description_en: 'Offer-tier section with eyebrow, headline, lede, card grid, and optional dark featured hero variant.',
  },
  'team-card-grid': {
    component: TeamCardGrid,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['team', 'authors', 'cards', 'profiles'],
    status: 'stable',
    description_fr: 'Grille auto-fill de cartes auteurs avec photo, rôle, description, compteur de publications et CTA profil.',
    description_en: 'Auto-fill author card grid with photo, role, description, publication count, and profile CTA.',
  },
  'hero-atlas': {
    component: HeroAtlas,
    category: 'marketing',
    subcategory: 'Hero Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'atlas', 'pillars', 'map'],
    status: 'stable',
    description_fr: 'Hero Atlas en deux colonnes avec signature grid, copy éditoriale, CTAs et mini-map des quatre piliers.',
    description_en: 'Two-column Atlas hero with signature grid, editorial copy, CTAs, and a four-pillar mini-map.',
  },
  'persona-attributes-grid': {
    component: PersonaAttributesGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['persona', 'attributes', 'grid', 'meta'],
    status: 'stable',
    description_fr: 'Grille persona 2×2 pain points / critères / objections / preuves avec footer méta sombre en trois colonnes.',
    description_en: 'Persona 2×2 grid for pain points, criteria, objections, and proof points with a dark three-column meta footer.',
  },
  'editorial-split-grid': {
    component: EditorialSplitGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['editorial', 'resources', 'blog', 'whitepapers'],
    status: 'stable',
    description_fr: 'Split éditorial deux colonnes pour lister blog et livres blancs, chacun avec cartes connexes et CTA.',
    description_en: 'Two-column editorial split for blog and white papers, each with related cards and CTA.',
  },
  'coming-soon-pills': {
    component: ComingSoonPills,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['coming-soon', 'pills', 'sectors', 'teaser'],
    status: 'stable',
    description_fr: 'Bande teaser fond paper-2 avec kicker, H2 et liste de pills pour éléments à venir.',
    description_en: 'Paper-2 teaser band with kicker, headline, and pill list for upcoming items.',
  },
  'commitments-grid': {
    component: FeatureGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['commitments', 'guarantees', 'grid', 'trust'],
    status: 'stable',
    description_fr: 'Grille hairline de 2 à 6 engagements ou garanties, titre display et corps sans — extrait de la page Méthode.',
    description_en: 'Hairline grid of 2–6 commitments or guarantees, display title and sans body — sourced from the Méthode page.',
  },
  'branded-callout': {
    component: BrandedCallout,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['callout', 'brand', 'os', 'paper-2'],
    status: 'stable',
    description_fr: 'Callout de marque fond paper-2 avec kicker §, titre display italique et corps de deux paragraphes, CTA optionnel.',
    description_en: 'Brand callout on paper-2 background with § kicker, italic display headline, two-paragraph body, and optional CTA.',
  },
  'editorial-preview': {
    component: EditorialPreview,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['editorial', 'preview', 'blog', 'rows', 'numbered'],
    status: 'stable',
    description_fr: 'Index éditorial de publications en lignes numérotées (num · date · tag · titre italique · flèche) — extrait de FieldNotes.',
    description_en: 'Editorial publication index as numbered rows (num · date · tag · italic title · arrow) — sourced from FieldNotes.',
  },
  'newsletter-band': {
    component: NewsletterBand,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['newsletter', 'email', 'capture', 'dark', 'band'],
    status: 'stable',
    description_fr: 'Bande newsletter fond sombre : titre éditorial large à gauche, formulaire capture email à droite.',
    description_en: 'Dark newsletter band: large editorial headline on the left, email capture form on the right.',
  },
  'spec-bar': {
    component: SpecBar,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['specs', 'meta', 'case-study', 'grid', 'mono'],
    status: 'stable',
    description_fr: 'Barre de spécifications projet N colonnes (label mono + valeur) avec grille CSS var — extrait de CaseStudyTemplate.',
    description_en: 'N-column project spec bar (mono label + value) with CSS var grid — sourced from CaseStudyTemplate.',
  },
  'deliverables-grid': {
    component: FeatureGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['deliverables', 'grid', 'cards', 'offer'],
    status: 'stable',
    description_fr: 'Grille de livrables tangibles avec cards numérotées et tag format/durée, extraite des pages offre et détail.',
    description_en: 'Tangible deliverables grid with numbered cards and format/duration tag, sourced from offer and detail pages.',
  },
  'tech-stack-band': {
    component: TechStackBand,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['technology', 'stack', 'pills', 'tools'],
    status: 'stable',
    description_fr: 'Bande stack technologique fond paper-2 avec kicker, lead et rangée de pills techniques.',
    description_en: 'Paper-2 technology stack band with kicker, lead, and a row of technical pills.',
  },
  'related-cards-band': {
    component: RelatedCardsBand,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['related', 'cards', 'navigation', 'editorial'],
    status: 'stable',
    description_fr: 'Bande de trois cards connexes pour relier cas, offres ou ressources en fin de page.',
    description_en: 'Three-card related band for linking cases, offers, or resources near the end of a page.',
  },
  'pull-quote-block': {
    component: PullQuoteBlock,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['quote', 'pullquote', 'editorial', 'closing'],
    status: 'stable',
    description_fr: 'Citation éditoriale isolée centrée ou inline, wrapper catalogue autour de la molécule PullQuote.',
    description_en: 'Standalone editorial quote, centered or inline, as a catalogue wrapper around the PullQuote molecule.',
  },
  'inclusions-list': {
    component: InclusionsList,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['scope', 'inclusions', 'inline-list', 'offer'],
    status: 'stable',
    description_fr: "Liste d'inclusions inline séparée par point médian pour expliciter le périmètre d'un engagement.",
    description_en: 'Inline inclusions list separated by middle dots to clarify the scope of an engagement.',
  },
  'problem-statement': {
    component: ProblemStatement,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['problem', 'statement', 'metrics', 'macro-typography'],
    status: 'stable',
    description_fr: 'Énoncé macro-typographique du problème avec stats optionnelles en grille hairline.',
    description_en: 'Macro-typographic problem statement with optional hairline stats grid.',
  },
  'bento-grid': {
    component: BentoGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['bento', 'grid', 'feature', 'asymmetric'],
    status: 'stable',
    description_fr: 'Mosaique bento asymetrique de 5 cellules (1 grande 2x2 + 4 petites) pour valoriser les capacites cles avec une mise en page moderne.',
    description_en: 'Asymmetric bento mosaic of 5 cells (1 large 2x2 + 4 small) to highlight key capabilities with a modern layout.',
  },
  'feature-zigzag': {
    component: FeatureZigzag,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['feature', 'zigzag', 'alternating', 'rows'],
    status: 'stable',
    description_fr: "Lignes alternées visuel/texte (gauche-droite, droite-gauche) pour presenter les fonctionnalites cles d'une offre avec un rythme editorial fort.",
    description_en: 'Alternating visual/text rows (left-right, right-left) to present key features with strong editorial rhythm.',
  },
  'logo-wall': {
    component: LogoWall,
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    tags: ['logos', 'grid', 'social-proof', 'static'],
    status: 'stable',
    description_fr: 'Grille statique de logos partenaires ou clients, avec effet grayscale vers couleur au hover. Distinct du bandeau animé marquee-band.',
    description_en: 'Static grid of partner or client logos with grayscale to colour hover effect. Distinct from the animated marquee-band.',
  },
  'pricing-comparison-matrix': {
    component: ComparisonTable,
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    tags: ['pricing', 'table', 'comparison', 'matrix'],
    status: 'stable',
    description_fr: 'Matrice comparative tarifaire pour mettre en regard les fonctionnalites de 3 plans avec mise en avant de la colonne recommandee.',
    description_en: 'Pricing comparison matrix to compare features across 3 plans with a highlighted recommended column.',
  },
  'gallery-masonry': {
    component: GalleryMasonry,
    category: 'marketing',
    subcategory: 'Gallery Sections',
    categorySlug: 'gallery-sections',
    tags: ['gallery', 'masonry', 'images', 'editorial'],
    status: 'stable',
    description_fr: 'Galerie editoriale en colonnes CSS (masonry naturel) avec legende au hover par overlay. Hauteurs variees, responsive 3 colonnes -> 2 -> 1.',
    description_en: 'Editorial gallery in CSS columns (natural masonry) with hover overlay caption. Varied heights, responsive 3 cols -> 2 -> 1.',
  },
  'feature-tabs': {
    component: FeatureTabs,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['feature', 'tabs', 'interactive', 'tabbed'],
    status: 'stable',
    description_fr: 'Section fonctionnalites en onglets cliquables : barre de tabs aria-compliant + panneau texte/visuel. Interactif vanilla JS, 0 dependance.',
    description_en: 'Feature section with clickable tabs: aria-compliant tab bar + text/visual panel. Interactive vanilla JS, zero dependencies.',
  },
  'icon-trio': {
    component: FeatureGrid,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['feature', 'icons', 'trio', 'columns'],
    status: 'stable',
    description_fr: 'Trois colonnes iconographiques avec titre et description, séparées par des hairlines verticaux. Idéal pour présenter 3 piliers ou bénéfices distincts.',
    description_en: 'Three icon columns with title and description, separated by vertical hairlines. Ideal for presenting 3 pillars or distinct benefits.',
  },
  'quote-spotlight': {
    component: QuoteSpotlight,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['testimonial', 'quote', 'spotlight', 'editorial'],
    status: 'stable',
    description_fr: "Grande citation pleine lumiere sur fond paper-2 : guillemet decoratif, texte display italique, auteur avec avatar rond.",
    description_en: 'Full-spotlight quote on paper-2 background: decorative quotemark, italic display text, author with rounded avatar.',
  },
  'steps-horizontal': {
    component: StepsHorizontal,
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    tags: ['process', 'steps', 'horizontal', 'timeline'],
    status: 'stable',
    description_fr: 'Etapes numerotees en ligne avec pastilles et connecteurs hairline. Passage vertical sous 760px.',
    description_en: 'Numbered steps in a row with round pills and hairline connectors. Stacks vertically below 760px.',
  },
  'cta-split-visual': {
    component: CtaSplitVisual,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['cta', 'split', 'visual', 'banner'],
    status: 'stable',
    description_fr: 'Bandeau CTA asymetrique 2 colonnes : texte kicker/titre/body/boutons a gauche, visuel SVG decoratif a droite. Distinct des CTA centres.',
    description_en: 'Asymmetric 2-column CTA banner: kicker/title/body/buttons on the left, decorative SVG visual on the right. Distinct from centered CTAs.',
  },
  'stats-bento': {
    component: StatsBento,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['stats', 'bento', 'kpi', 'metrics'],
    status: 'stable',
    description_fr: 'Quatre KPI en grille bento de tailles inegales : une grande cellule avec chiffre geant et trois cellules secondaires, plus un bandeau bas pleine largeur.',
    description_en: 'Four KPIs in an uneven bento grid: one large hero cell with a giant number and three smaller cells, plus a full-width bottom banner.',
  },
  'comparison-duo': {
    component: ComparisonDuo,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['comparison', 'duo', 'before-after', 'versus'],
    status: 'stable',
    description_fr: 'Deux cartes cote a cote (Sans / Avec) pour mettre en evidence le contraste avant/apres ou nous-vs-eux, avec items a puces et glyphes differencies.',
    description_en: 'Two side-by-side cards (Without / With) to highlight a before/after or us-vs-them contrast, with bulleted items and differentiated glyphs.',
  },
  'service-catalog-list': {
    component: ServiceCatalogList,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['services', 'catalog', 'list', 'editorial', 'rows'],
    status: 'stable',
    description_fr: 'Liste-catalogue éditoriale de services en lignes (§ numéro, titre display, description, méta durée, flèche) avec footer CTA optionnel.',
    description_en: 'Editorial service catalogue as rows (§ number, display title, description, duration meta, arrow) with an optional footer CTA.',
  },
  'fit-columns': {
    component: FitColumnsSection,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['fit', 'qualification', 'yes-no', 'two-columns', 'ink'],
    status: 'stable',
    description_fr: 'Section de qualification fit/no-fit sur fond ink : kicker, titre display, intro callout et deux colonnes Oui/Non d items.',
    description_en: 'Fit/no-fit qualification section on an ink background: kicker, display heading, intro callout, and two yes/no item columns.',
  },
  'editorial-table-block': {
    component: EditorialTableBlock,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['comparison', 'table', 'editorial', 'comparator', 'rows'],
    status: 'stable',
    description_fr: 'Comparateur éditorial : en-tête kicker mono et titre display, puis tableau EditorialTable bilingue (colonnes, lignes, caption).',
    description_en: 'Editorial comparator: a mono kicker plus display heading header, then a bilingual EditorialTable (columns, rows, caption).',
  },
  'decision-list': {
    component: DecisionList,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['decision', 'list', 'numbered', 'editorial', 'guide'],
    status: 'stable',
    description_fr: 'Arbre de décision : en-tête kicker et titre display à gauche, liste ordonnée numérotée d items à droite, hairlines fines.',
    description_en: 'Decision tree: kicker and display heading on the left, a numbered ordered list of items on the right, thin hairlines.',
  },
  'tech-positioning-split': {
    component: TechPositioningSplit,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['technologies', 'positioning', 'split', 'manifesto', 'editorial'],
    status: 'stable',
    description_fr: 'Prise de position technologique en split 50/50 : kicker, titre display, aside, statement manifesto et facts mono clé/valeur.',
    description_en: 'Technology positioning in a 50/50 split: kicker, display heading, aside, manifesto statement, and mono key/value facts.',
  },
  'tech-capabilities-specs': {
    component: TechCapabilitiesSpecs,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['technologies', 'capabilities', 'specs', 'table', 'editorial'],
    status: 'stable',
    description_fr: 'Inventaire technique en table spec (capacité, description, statut) avec en-tête kicker et aside.',
    description_en: 'Technical inventory as a spec table (capability, description, status) with a kicker header and aside.',
  },
  'tech-models-table': {
    component: EditorialTableBlock,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['technologies', 'models', 'table', 'comparison', 'editorial'],
    status: 'stable',
    description_fr: 'Table de comparaison des modèles en cinq colonnes (Modèle, Profil, Coût, Contexte, Usages) basée sur EditorialTable.',
    description_en: 'Five-column model comparison table (Model, Profile, Cost, Context, Uses) built on EditorialTable.',
  },
  'tech-when-dual': {
    component: TechWhenDual,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['technologies', 'decision', 'when', 'dual', 'pros-cons'],
    status: 'stable',
    description_fr: 'Aide décision en deux colonnes (utiliser quand / considérer autre chose quand) avec puces mono plus et moins.',
    description_en: 'Two-column decision aid (use when / consider otherwise when) with plus and minus mono bullets.',
  },
  'tech-integration-flow': {
    component: TechIntegrationFlow,
    category: 'marketing',
    subcategory: 'Timelines',
    categorySlug: 'timelines',
    tags: ['technologies', 'integration', 'flow', 'timeline', 'stack'],
    status: 'stable',
    description_fr: 'Position dans la stack en frise verticale numérotée (Timeline + Dingbat), un nœud par étape d intégration.',
    description_en: 'Position in the stack as a numbered vertical timeline (Timeline + Dingbat), one node per integration step.',
  },
  'pain-points': {
    component: PainPoints,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['solutions', 'pain-points', 'friction', 'timeline', 'editorial'],
    status: 'stable',
    description_fr: 'Points de friction métier : en-tête eyebrow et titre display, aside Callout, frise Timeline numérotée des frictions.',
    description_en: 'Business pain points: an eyebrow and display heading header, a Callout aside, and a numbered Timeline of frictions.',
  },
  'workflow-table': {
    component: WorkflowTable,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['solutions', 'workflows', 'table', 'comparison', 'editorial'],
    status: 'stable',
    description_fr: 'Table workflows signature en 5 colonnes (numéro, workflow, modèle, gain, comment), un workflow IA par ligne.',
    description_en: 'Signature workflow table in 5 columns (number, workflow, model, gain, how), one AI workflow per row.',
  },
  'roi-band': {
    component: RoiBand,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['solutions', 'roi', 'metrics', 'proof', 'stats'],
    status: 'stable',
    description_fr: 'Bande ROI sur fond ink : en-tête eyebrow et titre display, chiffres KeyMetric placés en asymétrie 6/5.',
    description_en: 'ROI band on an ink background: an eyebrow and display heading header, with KeyMetric figures placed in a 6/5 asymmetry.',
  },
  'case-split': {
    component: CaseSplit,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['solutions', 'case-study', 'split', 'results', 'testimonial'],
    status: 'stable',
    description_fr: 'Cas client en split dark/light 50/50 : récit du cas à gauche (titre, body, CTA) et résultats chiffrés à droite.',
    description_en: 'Client case in a 50/50 dark/light split: the case narrative on the left (title, body, CTA) and quantified results on the right.',
  },
  'department-stack': {
    component: EditorialTableBlock,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['solutions', 'stack', 'tools', 'table', 'editorial'],
    status: 'stable',
    description_fr: 'Stack outils en table éditoriale : en-tête eyebrow et titre display, aside Callout, EditorialTable catégorie/outil/rôle.',
    description_en: 'Tool stack as an editorial table: an eyebrow and display heading header, a Callout aside, and a category/tool/role EditorialTable.',
  },
  'course-catalog-table': {
    component: CourseCatalogTable,
    category: 'marketing',
    subcategory: 'Index Sections',
    categorySlug: 'index-sections',
    tags: ['catalog', 'table', 'courses', 'school'],
    status: 'stable',
    description_fr: 'Tableau du catalogue formations : titre de section et lignes (#, titre, niveau en pill, durée, prix, flèche), une formation par ligne.',
    description_en: 'Course catalog table: a section title and rows (#, title, level pill, duration, price, arrow), one course per row.',
  },
  'learning-path-list': {
    component: LearningPathList,
    category: 'marketing',
    subcategory: 'Index Sections',
    categorySlug: 'index-sections',
    tags: ['list', 'paths', 'school'],
    status: 'stable',
    description_fr: 'Liste de parcours : titre de section et une ligne par parcours (titre en gras + description).',
    description_en: 'Learning path list: a section title and one row per path (bold title + description).',
  },
  'department-cta': {
    component: CtaFinal,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['solutions', 'cta', 'conversion', 'dark', 'closing'],
    status: 'stable',
    description_fr: 'Clôture CTA sur fond ink : Dingbat, titre display italique, body et deux boutons (rendez-vous + lien secondaire).',
    description_en: 'Closing CTA on an ink background: a Dingbat, an italic display heading, body copy, and two buttons (booking + secondary link).',
  },

  // ── Mission catalogue-gap 2026-06-11 · 3 nouvelles catégories (Table / Manifesto / Terminal) ──
  'terminal-table': {
    component: TerminalTableSection,
    category: 'marketing',
    subcategory: 'Table Sections',
    categorySlug: 'table-sections',
    tags: ['table', 'terminal', 'console', 'rows', 'data', 'services'],
    status: 'stable',
    description_fr: 'Table terminal configurable (frame TerminalTable) : en-tête kicker/meta, titre, puis colonnes, headers et lignes cliquables avec rôle typographique par cellule.',
    description_en: 'Configurable terminal table (TerminalTable frame): kicker/meta header, heading, then columns, headers and clickable rows with a typographic role per cell.',
  },
  'editorial-write-feed': {
    component: EditorialWriteFeed,
    category: 'marketing',
    subcategory: 'Table Sections',
    categorySlug: 'table-sections',
    tags: ['table', 'feed', 'editorial', 'writing', 'changelog', 'rows'],
    status: 'stable',
    description_fr: 'Feed éditorial en lignes cliquables (EditorialWriteRow) : date, tag, texte et flèche par ligne, tone paper ou ink, lien meta type /feed.xml.',
    description_en: 'Editorial feed as clickable rows (EditorialWriteRow): date, tag, text and arrow per row, paper or ink tone, /feed.xml style meta link.',
  },
  'manifesto-statement': {
    component: ManifestoStatement,
    category: 'marketing',
    subcategory: 'Manifesto Sections',
    categorySlug: 'manifesto-sections',
    tags: ['manifesto', 'statement', 'fullscreen', 'ink', 'accent', 'editorial'],
    status: 'stable',
    description_fr: 'Déclaration manifeste plein écran : kicker mono et statement XL en sans, relevés italiques serif, tone encre (interlude console) ou terracotta avec grille translucide.',
    description_en: 'Full-screen manifesto declaration: mono kicker and XL sans statement with serif italic highlights, ink tone (console interlude) or terracotta with a translucent grid.',
  },
  'manifesto-act': {
    component: ManifestoAct,
    category: 'marketing',
    subcategory: 'Manifesto Sections',
    categorySlug: 'manifesto-sections',
    tags: ['manifesto', 'act', 'numbered', 'stats', 'sticky', 'ink'],
    status: 'stable',
    description_fr: 'Acte numéroté de manifeste : label sticky (numéro romain + sous-titre), statement XL et rangée de chiffres massifs optionnelle, tone encre ou paper.',
    description_en: 'Numbered manifesto act: sticky label (roman numeral + subtitle), XL statement and an optional row of massive figures, ink or paper tone.',
  },
  'asymmetric-services': {
    component: AsymmetricServices,
    category: 'marketing',
    subcategory: 'Manifesto Sections',
    categorySlug: 'manifesto-sections',
    tags: ['manifesto', 'services', 'asymmetric', 'alternating', 'editorial', 'rows'],
    status: 'stable',
    description_fr: 'Services en rangées asymétriques (AsymmetricServiceRow) qui alternent gauche/droite : numéro display, nom, body et flèche, signature de /manifesto Acte II.',
    description_en: 'Services as asymmetric rows (AsymmetricServiceRow) alternating left/right: display number, name, body and arrow, the /manifesto Act II signature.',
  },
  'terminal-mockup': {
    component: TerminalMockupSection,
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    tags: ['terminal', 'console', 'mockup', 'cli', 'platform', 'split'],
    status: 'stable',
    description_fr: 'Console terminal configurable (frame TerminalMockup) : copy optionnelle à gauche, lignes cmd/out/ok/comment et curseur clignotant, layout split ou pleine largeur.',
    description_en: 'Configurable terminal console (TerminalMockup frame): optional copy on the left, cmd/out/ok/comment lines and a blinking cursor, split or full-width layout.',
  },
  'terminal-metrics-strip': {
    component: TerminalMetricsStrip,
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    tags: ['terminal', 'metrics', 'kpi', 'mono', 'strip', 'telemetry'],
    status: 'stable',
    description_fr: 'Strip KPI télémétrie tout mono : 2 à 6 cellules clé/valeur bordées de hairlines, esthétique console (uptime, agents, release), fonds paper, paper-2 ou ink.',
    description_en: 'All-mono telemetry KPI strip: 2 to 6 key/value cells with hairline borders, console aesthetics (uptime, agents, release), paper, paper-2 or ink backgrounds.',
  },
  // >>> [gen-pricing] start
  'pricing-cards': {
    component: PricingCards,
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    tags: ['pricing', 'cards', 'tiers', 'recommended', 'plans'],
    status: 'stable',
    description_fr: 'Grille de 2 à 4 cartes de prix côte à côte avec une carte « Recommandé » mise en avant, prix, période, features et CTA par carte. Ancrage par contraste.',
    description_en: 'Grid of 2 to 4 pricing cards side by side with a highlighted "Recommended" card, price, period, features and CTA per card. Anchoring by contrast.',
  },
  'pricing-toggle': {
    component: PricingToggle,
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    tags: ['pricing', 'toggle', 'monthly', 'annual', 'plans', 'switch'],
    status: 'stable',
    description_fr: 'Grille de cartes de prix avec bascule mensuel/annuel (CSS-only, sans JS) qui change les prix affichés et signale l\'économie annuelle.',
    description_en: 'Pricing card grid with a monthly/annual toggle (CSS-only, no JS) that swaps the displayed prices and surfaces the annual saving.',
  },
  'pricing-single-highlight': {
    component: PricingSingleHighlight,
    category: 'marketing',
    subcategory: 'Pricing Sections',
    categorySlug: 'pricing-sections',
    tags: ['pricing', 'single', 'highlight', 'offer', 'anchor', 'guarantee'],
    status: 'stable',
    description_fr: 'Offre mono-produit en grand format : une carte large centrée avec prix d\'ancrage, liste de bénéfices, garantie et CTA fort. Idéal landing mono-offre.',
    description_en: 'Single-product offer in large format: one wide centred card with anchor price, benefits list, guarantee and strong CTA. Ideal for single-offer landings.',
  },
  // <<< [gen-pricing] end
  // >>> [new-standard] start
  'team-bio-grid': {
    component: TeamBioGrid,
    category: 'marketing',
    subcategory: 'Team Sections',
    categorySlug: 'team-sections',
    tags: ['team', 'people', 'bio', 'grid', 'about'],
    status: 'stable',
    description_fr: 'Grille d’équipe : photo, nom, rôle et bio courte par membre, en 2 à 4 colonnes alignées. Idéale pour une page À propos ou Équipe qui humanise la marque.',
    description_en: 'Team grid: photo, name, role and a short bio per member, in 2 to 4 aligned columns. Ideal for an About or Team page that humanises the brand.',
  },
  'about-story-split': {
    component: AboutStorySplit,
    category: 'marketing',
    subcategory: 'About Sections',
    categorySlug: 'about-sections',
    tags: ['about', 'story', 'mission', 'timeline', 'split'],
    status: 'stable',
    description_fr: 'Récit fondateur en deux colonnes : texte narratif de mission à gauche, timeline de jalons datés à droite. Raconte l’histoire de la marque sans verbiage.',
    description_en: 'Founder narrative in two columns: a mission story on the left, a dated milestone timeline on the right. Tells the brand story without filler.',
  },
  'footer-cta-band': {
    component: FooterCtaBand,
    category: 'marketing',
    subcategory: 'CTA Sections',
    categorySlug: 'cta-sections',
    tags: ['cta', 'band', 'full-bleed', 'conversion', 'pre-footer'],
    status: 'stable',
    description_fr: 'Bande CTA finale pleine largeur (titre, sous-titre, un à deux boutons), pensée comme le climax juste avant le footer. Sombre par défaut pour trancher avec la page.',
    description_en: 'Full-bleed final CTA band (title, subtitle, one or two buttons), designed as the climax right before the footer. Dark by default to contrast with the page.',
  },
  'integrations-grid': {
    component: IntegrationsGrid,
    category: 'marketing',
    subcategory: 'Logo Sections',
    categorySlug: 'logo-sections',
    tags: ['integrations', 'logos', 'grid', 'ecosystem', 'connectors'],
    status: 'stable',
    description_fr: 'Grille de logos d’intégrations groupés par catégorie (CRM, communication, données). Répond à l’objection « est-ce que ça se branche à nos outils ? » d’un coup d’œil.',
    description_en: 'Integration logo grid grouped by category (CRM, communication, data). Answers the “does it plug into our tools?” objection at a glance.',
  },
  'feature-split-media': {
    component: FeatureSplitMedia,
    category: 'marketing',
    subcategory: 'Feature Sections',
    categorySlug: 'feature-sections',
    tags: ['feature', 'split', 'media', 'mockup', 'reversed'],
    status: 'stable',
    description_fr: 'Une feature majeure exposée en deux colonnes : texte et points clés d’un côté, mockup ou capture de l’autre. Le champ reversed permet d’alterner les côtés au fil de la page.',
    description_en: 'One major feature laid out in two columns: copy and key points on one side, mockup or screenshot on the other. The reversed field alternates sides down the page.',
  },
  'metric-callout-band': {
    component: MetricCalloutBand,
    category: 'marketing',
    subcategory: 'Stats Sections',
    categorySlug: 'stats-sections',
    tags: ['stats', 'metric', 'callout', 'band', 'impact'],
    status: 'stable',
    description_fr: 'Bande d’une à trois métriques héro surdimensionnées accompagnées d’une phrase de contexte. Frappe fort sur un résultat chiffré, sombre par défaut pour la mise en avant.',
    description_en: 'A band of one to three oversized hero metrics paired with a context sentence. Lands a single quantified result hard, dark by default for emphasis.',
  },
  'testimonial-single-spotlight': {
    component: TestimonialSingleSpotlight,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['testimonial', 'spotlight', 'quote', 'portrait', 'single'],
    status: 'stable',
    description_fr: 'Un seul témoignage en plein écran : grande citation, portrait, logo client et attribution nom/rôle. Donne tout le poids à une voix client, sombre par défaut.',
    description_en: 'A single full-screen testimonial: a large quote, portrait, client logo and name/role attribution. Gives full weight to one client voice, dark by default.',
  },
  'faq-two-column': {
    component: FaqTwoColumn,
    category: 'marketing',
    subcategory: 'FAQ Sections',
    categorySlug: 'faq-sections',
    tags: ['faq', 'two-column', 'static', 'questions', 'scan'],
    status: 'stable',
    description_fr: 'FAQ en deux colonnes statiques (question en gras, réponse en dessous), sans accordéon. Pensée pour le scan rapide quand toutes les réponses doivent être visibles d’emblée.',
    description_en: 'FAQ in two static columns (bold question, answer beneath), with no accordion. Built for fast scanning when every answer should be visible upfront.',
  },
  'cta-newsletter-footer': {
    component: CtaNewsletterFooter,
    category: 'marketing',
    subcategory: 'Newsletter Sections',
    categorySlug: 'newsletter-sections',
    tags: ['newsletter', 'cta', 'email', 'capture', 'pre-footer'],
    status: 'stable',
    description_fr: 'Capture email compacte multi-colonne de type pré-footer : titre, champ, bouton et mention RGPD sur une ligne. Sombre par défaut pour clore la page sur l’abonnement.',
    description_en: 'Compact multi-column pre-footer email capture: title, field, button and GDPR notice on one row. Dark by default to close the page on the subscription.',
  },
  'comparison-pricing-callout': {
    component: ComparisonPricingCallout,
    category: 'marketing',
    subcategory: 'Comparison Sections',
    categorySlug: 'comparison-sections',
    tags: ['comparison', 'value-prop', 'pricing', 'bridge', 'callout'],
    status: 'stable',
    description_fr: 'Bloc « pourquoi nous » en trois colonnes de propositions de valeur, terminé par un CTA et une mention. Sert de pont entre les features et la page tarifaire.',
    description_en: 'A “why us” block in three value-proposition columns, closed by a CTA and a note. Bridges the gap between features and the pricing page.',
  },
  // >>> [sections-gap] start
  'diagnostic-stages': {
    component: DiagnosticStages,
    category: 'marketing',
    subcategory: 'Process Sections',
    categorySlug: 'process-sections',
    tags: ['diagnostic', 'maturity', 'stages', 'conversion', 'self-assessment'],
    status: 'stable',
    description_fr: 'Auto-diagnostic « Où en êtes-vous ? » : 4 à 6 stades de maturité en cards horizontales cliquables, le stade courant relevé en accent (« vous êtes ici »). Situe le visiteur et l’oriente vers l’étape suivante (conversion + qualification).',
    description_en: 'A “Where do you stand?” self-assessment: 4 to 6 maturity stages as clickable horizontal cards, the current stage highlighted in accent (“you are here”). Places the visitor and points them to the next step (conversion + qualification).',
  },
  'case-spotlight': {
    component: CaseSpotlight,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['case', 'spotlight', 'proof', 'metrics', 'conversion', 'dark'],
    status: 'stable',
    description_fr: 'Vitrine de cas concret insérable partout : carte INK avec visuel habillé + titre serti d’un relevé accent, citation à barre accent, métriques massives latérales, tags méta et CTA. Levier de conversion à fort impact.',
    description_en: 'A concrete-case showcase you can drop anywhere: an INK card with a styled visual + a title with an accent highlight, an accent-bar quote, large lateral metrics, meta tags and a CTA. A high-impact conversion lever.',
  },
  'testimonial-metrics': {
    component: TestimonialMetrics,
    category: 'marketing',
    subcategory: 'Testimonial Sections',
    categorySlug: 'testimonial-sections',
    tags: ['testimonial', 'metrics', 'quote', 'proof', 'b2b'],
    status: 'stable',
    description_fr: 'Témoignage chiffré : grande citation serif d’un côté + grille de 3 à 4 métriques massives de l’autre, reliées par une barre accent. Combine la voix client et le résultat mesuré en un seul bloc de réassurance.',
    description_en: 'A quantified testimonial: a large serif quote on one side + a grid of 3 to 4 large metrics on the other, joined by an accent bar. Combines the client’s voice and the measured outcome in a single reassurance block.',
  },
  // <<< [sections-gap] end
  // <<< [new-standard] end
};

export const SECTION_REGISTRY: Record<SectionType, AstroComponent> = Object.fromEntries(
  Object.entries(SECTIONS).map(([type, d]) => [type, d.component]),
) as Record<SectionType, AstroComponent>;

/**
 * Helper : récupère le composant pour un type donné. Retourne undefined si type inconnu.
 */
export function getSectionComponent(type: SectionType): AstroComponent | undefined {
  return SECTIONS[type]?.component;
}

export function getSectionMeta(type: SectionType): SectionDescriptor | undefined {
  return SECTIONS[type];
}

export interface SectionListItem extends SectionDescriptor {
  type: SectionType;
}

export function listSections(): SectionListItem[] {
  return (Object.keys(SECTIONS) as SectionType[]).map((type) => ({ type, ...SECTIONS[type] }));
}

export interface CategoryGroup {
  slug: string;
  label: string;
  count: number;
  sectionTypes: SectionType[];
}

export function listCategories(): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>();

  for (const section of listSections()) {
    const current = map.get(section.categorySlug) ?? {
      slug: section.categorySlug,
      label: section.subcategory,
      count: 0,
      sectionTypes: [],
    };

    current.count += 1;
    current.sectionTypes.push(section.type);
    map.set(section.categorySlug, current);
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}
