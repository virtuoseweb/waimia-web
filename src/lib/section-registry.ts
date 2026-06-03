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
import HeroHubListing from '../components/sections/HeroHubListing.astro';
import HeroServiceDetail from '../components/sections/HeroServiceDetail.astro';
import HeroPillarHub from '../components/sections/HeroPillarHub.astro';
import HeroCaseStudy from '../components/sections/HeroCaseStudy.astro';
import HeroHome from '../components/sections/HeroHome.astro';
import HeroLanding from '../components/sections/HeroLanding.astro';
import HeroProblemIndex from '../components/sections/HeroProblemIndex.astro';
import HeroSector from '../components/sections/HeroSector.astro';
import HeroUtilityMasthead from '../components/sections/HeroUtilityMasthead.astro';
import HeroAcademyHub from '../components/sections/HeroAcademyHub.astro';
import HeroHubMasthead from '../components/sections/HeroHubMasthead.astro';
import HeroOfferDetail from '../components/sections/HeroOfferDetail.astro';
import HeroTechLayer from '../components/sections/HeroTechLayer.astro';
import HeroConversionFunnel from '../components/sections/HeroConversionFunnel.astro';
import HeroHubStats from '../components/sections/HeroHubStats.astro';
import HeroServiceMasthead from '../components/sections/HeroServiceMasthead.astro';
import HeroDetailMenu from '../components/sections/HeroDetailMenu.astro';
import HeroAuthor from '../components/sections/HeroAuthor.astro';
import HeroLeadMagnet from '../components/sections/HeroLeadMagnet.astro';
import HeroCourse from '../components/sections/HeroCourse.astro';
import HeroTunnelStep from '../components/sections/HeroTunnelStep.astro';
import MarqueeBand from '../components/sections/MarqueeBand.astro';
import ProblemsGrid from '../components/sections/ProblemsGrid.astro';
import WhyStalls from '../components/sections/WhyStalls.astro';
import HowWeShip from '../components/sections/HowWeShip.astro';
import OperatingLayer from '../components/sections/OperatingLayer.astro';
import ManifestoBlock from '../components/sections/ManifestoBlock.astro';
import HeroEssay from '../components/sections/HeroEssay.astro';
import HeroLiquid from '../components/sections/HeroLiquid.astro';
import ProofBarSection from '../components/sections/ProofBarSection.astro';
import StatBlock from '../components/sections/StatBlock.astro';
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
import CtaInline from '../components/sections/CtaInline.astro';
import TestimonialBlock from '../components/sections/TestimonialBlock.astro';
import GuaranteeBlock from '../components/sections/GuaranteeBlock.astro';
import ArchitectureDiagram from '../components/sections/ArchitectureDiagram.astro';
import ServicesGrid from '../components/sections/ServicesGrid.astro';
import MaturityPyramid from '../components/sections/MaturityPyramid.astro';
import UseCaseIndex from '../components/sections/UseCaseIndex.astro';
import CaseCardGrid from '../components/sections/CaseCardGrid.astro';
import CommitmentsGrid from '../components/sections/CommitmentsGrid.astro';
import BrandedCallout from '../components/sections/BrandedCallout.astro';
import EditorialPreview from '../components/sections/EditorialPreview.astro';
import NewsletterBand from '../components/sections/NewsletterBand.astro';
import SpecBar from '../components/sections/SpecBar.astro';
import DeliverablesGrid from '../components/sections/DeliverablesGrid.astro';
import TechStackBand from '../components/sections/TechStackBand.astro';
import RelatedCardsBand from '../components/sections/RelatedCardsBand.astro';
import PullQuoteBlock from '../components/sections/PullQuoteBlock.astro';
import InclusionsList from '../components/sections/InclusionsList.astro';
import ProblemStatement from '../components/sections/ProblemStatement.astro';

/**
 * Section registry — single source of truth pour composants et métadonnées marketplace.
 */
export const SECTIONS: Record<SectionType, SectionDescriptor> = {
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
    component: HeroHubListing,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'listing', 'editorial'],
    status: 'stable',
    description_fr: "Hero éditorial de hub avec titre monumental et lede courte, sans appel à l'action, pour pages de listing.",
    description_en: 'Editorial hub hero with a monumental headline and short lede, without a call to action, for listing pages.',
  },
  'hero-service-detail': {
    component: HeroServiceDetail,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'service', 'detail', 'metrics'],
    status: 'stable',
    description_fr: 'Hero de page service avec numéro éditorial, titre, accroche et barre de preuves chiffrées optionnelle.',
    description_en: 'Service page hero with an editorial number, headline, lede, and optional inline proof metrics bar.',
  },
  'hero-pillar-hub': {
    component: HeroPillarHub,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'pillar', 'hub', 'stats'],
    status: 'stable',
    description_fr: 'Hero de page pilier avec titre maximal et grille de statistiques quatre colonnes optionnelle.',
    description_en: 'Pillar page hero with a maximal headline and an optional four-column statistics grid.',
  },
  'hero-case-study': {
    component: HeroCaseStudy,
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
    component: HeroLanding,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'landing', 'magnetic', 'cta'],
    status: 'stable',
    description_fr: 'Hero magnétique landing : eyebrow mono, h1 italique avec emphasis, lede, double CTA et bandeau de disponibilité.',
    description_en: 'Magnetic landing hero: mono eyebrow, italic emphasis h1, lede, dual CTA, and availability strip.',
  },
  'hero-problem-index': {
    component: HeroProblemIndex,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'problem', 'svg', 'decoration'],
    status: 'stable',
    description_fr: 'Hero d\'index par problème : décor SVG rectangle rotated 12°, h1 monumental, lede italique et phrase canonique.',
    description_en: 'Problem index hero: 12° rotated rectangle SVG decoration, monumental h1, italic lede, and canonical line.',
  },
  'hero-sector': {
    component: HeroSector,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'sector', 'department', 'tags'],
    status: 'stable',
    description_fr: 'Hero de page secteur ou département : SVG rotated 15° accent, dept kicker, h1 + lead italique, CTA et meta, tags secteurs.',
    description_en: 'Sector or department hero: 15° rotated SVG with accent, dept kicker, italic h1 + lead, CTA and meta, sector tags.',
  },
  'hero-utility-masthead': {
    component: HeroUtilityMasthead,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'utility', 'masthead', 'editorial'],
    status: 'stable',
    description_fr: 'Masthead utilitaire générique (about, méthode, academy intro) : kicker, h1 monumental, lede display italique, alignement gauche ou centré.',
    description_en: 'Generic utility masthead (about, method, academy intro): kicker, monumental h1, italic display lede, left or centered alignment.',
  },
  'hero-academy-hub': {
    component: HeroAcademyHub,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'academy', 'school', 'stats'],
    status: 'stable',
    description_fr: 'Hero hub académie : kicker mono, h1 display, lede et bande de stats mono (cours, parcours, alumni).',
    description_en: 'Academy hub hero: mono kicker, display h1, lede, and mono stats strip (courses, paths, alumni).',
  },
  'hero-hub-masthead': {
    component: HeroHubMasthead,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'hub', 'masthead', 'index'],
    status: 'stable',
    description_fr: 'Masthead mutualisé pour pages d\'index (offres, cas, secteurs, technologies) : kicker mono, h1 italique display, lede court.',
    description_en: 'Shared masthead for index pages (services, cases, sectors, technologies): mono kicker, italic display h1, short lede.',
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
    component: HeroTechLayer,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'technology', 'layer', 'triangles'],
    status: 'stable',
    description_fr: 'Hero de couche technologique : triangles SVG signature, layer badge (claude/os/orch), h1 + lead italique, CTA et meta.',
    description_en: 'Technology layer hero: signature triangles SVG, layer badge (claude/os/orch), h1 + italic lead, CTA and meta.',
  },
  'hero-conversion-funnel': {
    component: HeroConversionFunnel,
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
    component: HeroServiceMasthead,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'service', 'masthead', 'simple'],
    status: 'stable',
    description_fr: 'Masthead service sobre : kicker § Service N + h1 display + lede display muted, sans décor SVG.',
    description_en: 'Plain service masthead: § Service N kicker + display h1 + muted display lede, no SVG decoration.',
  },
  'hero-detail-menu': {
    component: HeroDetailMenu,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'detail', 'menu', 'nested'],
    status: 'stable',
    description_fr: 'Hero d\'entrée de menu détail : kicker parent + numéro § accent + h1 + lede sobre, idéal pour sous-pages catalogue.',
    description_en: 'Detail-menu entry hero: parent kicker + accent § number + h1 + plain lede, ideal for sub-catalogue pages.',
  },
  'hero-author': {
    component: HeroAuthor,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'author', 'portrait', 'profile'],
    status: 'stable',
    description_fr: 'Hero de page auteur : 2-col copy/portrait, breadcrumb équipe, role eyebrow, h1 split prénom+nom italic accent, lede display.',
    description_en: 'Author page hero: 2-col copy/portrait, team breadcrumb, role eyebrow, h1 split first-name + italic accent surname, display lede.',
  },
  'hero-lead-magnet': {
    component: HeroLeadMagnet,
    category: 'marketing',
    subcategory: 'Hero Header Sections',
    categorySlug: 'hero-header-sections',
    tags: ['hero', 'lead-magnet', 'whitepaper', 'cover', 'download'],
    status: 'stable',
    description_fr: 'Hero lead magnet (livre blanc) : 2-col texte/cover PDF, kicker + h1 + lede italique, meta format/date, carte download CTA.',
    description_en: 'Lead magnet hero (whitepaper): 2-col text/PDF cover, kicker + h1 + italic lede, format/date meta, download card CTA.',
  },
  'hero-course': {
    component: HeroCourse,
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
    component: ProblemsGrid,
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
    component: HeroEssay,
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
    component: ProofBarSection,
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
    component: CtaInline,
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
  'commitments-grid': {
    component: CommitmentsGrid,
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
    component: DeliverablesGrid,
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
