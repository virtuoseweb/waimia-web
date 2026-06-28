// Waimia · Co-location DS (Wave #38, T5) · module `hero-atlas` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-atlas',
    kicker_fr: 'Atlas · Cartographier · Câbler · Orchestrer · Industrialiser',
    kicker_en: 'Atlas · Map · Wire · Orchestrate · Industrialize',
    h1_fr: 'Une <i>cartographie</i><br />pour les pressés.',
    h1_en: 'A <i>map</i><br />for the time-pressed.',
    subhead_fr: 'Une seule page pour comprendre comment Waimia <i>câble l’IA dans le revenu</i>. Pas dix slides. Pas de schéma d’architecture. Juste une carte, des piliers, et trois portes selon votre fonction.',
    subhead_en: 'One page to understand how Waimia <i>wires AI into revenue</i>. Not ten slides. No architecture diagram. Just a map, four pillars, and three doors based on your role.',
    lead_fr: 'Marketing, sales, contenu, web, CRM, analytics et marque : sept territoires sur une seule carte. Quatre piliers. Trois portes d’entrée par persona. Repérez votre douleur, on prend l’audit en charge.',
    lead_en: "Marketing, sales, content, web, CRM, analytics and brand: seven territories on one map. Four pillars. Three entry doors per persona. Spot your pain, we'll handle the audit.",
    cta_primary: { label_fr: 'Réserver un audit', label_en: 'Book an audit', href: '/contact', variant: 'primary' },
    cta_secondary: { label_fr: '← Retour à l’accueil', label_en: '← Back to home', href: '/', variant: 'ghost' },
    map_aria_label_fr: 'Les 4 piliers Atlas',
    map_aria_label_en: 'The 4 Atlas pillars',
    map_kicker_fr: 'Atlas · 4 piliers',
    map_kicker_en: 'Atlas · 4 pillars',
    pillars: [
      { num: '01', label_fr: 'Audit', label_en: 'Audit', desc_fr: 'Cartographier la stack et les frictions revenue.', desc_en: 'Map the stack and revenue friction points.', deliverable_fr: 'Rapport 12 pages · 5 jours', deliverable_en: '12-page report · 5 days' },
      { num: '02', label_fr: 'Adoption', label_en: 'Adoption', desc_fr: 'Onboarder les équipes, ancrer la pratique.', desc_en: 'Onboard teams, embed the practice.', deliverable_fr: 'Playbooks · sessions hebdo', deliverable_en: 'Playbooks · weekly sessions' },
      { num: '03', label_fr: 'Orchestration', label_en: 'Orchestration', desc_fr: 'Câbler les agents IA dans les outils existants.', desc_en: 'Wire AI agents into existing tools.', deliverable_fr: 'Workflows live · monitoring', deliverable_en: 'Live workflows · monitoring' },
      { num: '04', label_fr: 'Souveraineté', label_en: 'Sovereignty', desc_fr: 'Garder la propriété de la couche AI.', desc_en: 'Retain ownership of the AI layer.', deliverable_fr: 'Code · données · runbook transmis', deliverable_en: 'Code · data · runbook transferred' },
    ],
  };
