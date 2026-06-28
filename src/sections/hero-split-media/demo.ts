// Waimia · Co-location DS (Wave #38, T5) · module `hero-split-media` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-split-media',
    kicker_fr: '§ Site web intelligent',
    kicker_en: '§ Intelligent website',
    h1_fr: 'Un site web <i class="acc">intelligent</i> pour PME.',
    h1_en: 'An intelligent <i class="acc">website</i> for SMEs.',
    subtitle_fr: 'Waimia conçoit des sites web connectés au CRM, au contenu, aux données et aux parcours de conversion pour générer plus de leads qualifiés.',
    subtitle_en: 'Waimia builds websites wired to your CRM, content, data and conversion journeys to generate more qualified leads.',
    definition_kicker_fr: "Qu'est-ce qu'un site web intelligent ?",
    definition_kicker_en: 'What is an intelligent website?',
    lede_fr: "Un site web intelligent est une application web pilotée par l'IA (Claude, GPT), branchée à votre Search Console et à votre Analytics. Elle lit ses propres KPI, optimise son SEO et son contenu en continu, et qualifie chaque visiteur via un quiz de routing relié au CRM. À la différence d'une vitrine statique, il mesure son acquisition de bout en bout et alimente votre stack sans saisie manuelle.",
    lede_en: "An intelligent website is a web application driven by AI (Claude, GPT), wired to your Search Console and your Analytics. It reads its own KPIs, optimises its SEO and content continuously, and qualifies every visitor through a routing quiz connected to the CRM. Unlike a static brochure, it measures its acquisition end to end and feeds your stack without manual entry.",
    badges: [
      { label_fr: "Connectée à l'IA (Claude, GPT)", label_en: 'Connected to AI (Claude, GPT)' },
      { label_fr: 'Branchée à vos données', label_en: 'Wired to your data' },
      { label_fr: 'Alertes temps réel', label_en: 'Real-time alerts' },
      { label_fr: 'Quiz qui route vers ce qui convertit', label_en: 'A quiz that routes to what converts' },
    ],
    cta_primary: { label_fr: 'Réserver un diagnostic (45 min) →', label_en: 'Book a diagnostic (45 min) →', href: '#', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la méthode', label_en: 'See the method', href: '#', variant: 'ghost' },
    media_src: '/images/line-art/dispositif-flow.svg',
    media_alt_fr: "Schéma du dispositif : outils dispersés reliés par un nœud d'orchestration IA vers un résultat mesuré.",
    media_alt_en: 'Diagram of the setup: scattered tools linked by an AI orchestration node toward a measured outcome.',
  };
