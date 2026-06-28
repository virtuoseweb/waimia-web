// Waimia · Co-location DS (Wave #38, T5) · module `case-card-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'case-card-grid',
    fig_num: 'FIG IV · 4.0',
    fig_title_fr: 'Acte IV · Les preuves',
    fig_title_en: 'Act IV · The proof',
    spec_fr: '4 DOSSIERS · BLOCS DE DONNÉES',
    spec_en: '4 CASE FILES · DATA BLOCKS',
    h2_fr: 'Quatre dossiers. <i>Secteur</i> · durée · stack · impact.',
    h2_en: 'Four files. <i>Sector</i> · duration · stack · impact.',
    case_label_fr: 'CASE',
    case_label_en: 'CASE',
    sector_label_fr: 'Secteur',
    sector_label_en: 'Sector',
    impact_label_fr: 'Impact',
    impact_label_en: 'Impact',
    cases: [
      { client: 'Acquisition B2B',   sector_fr: 'SaaS B2B',       sector_en: 'B2B SaaS',     duration: '10 wk', stack: 'Claude · HubSpot · dbt',    impact_fr: 'Pipeline reconnecté · qualification automatisée', impact_en: 'Pipeline reconnected · automated qualification', href: '/cas-clients' },
      { client: 'Santé-tech',        sector_fr: 'Santé-tech',     sector_en: 'Healthtech',   duration: '6 wk',  stack: 'Claude · Snowflake',        impact_fr: 'Triage allégé · réponse 24/7',                   impact_en: 'Triage streamlined · 24/7 response',            href: '/cas-clients' },
      { client: 'Fintech UE',        sector_fr: 'Fintech · UE',   sector_en: 'Fintech · EU', duration: '14 wk', stack: 'Claude · Segment · dbt',    impact_fr: 'Scoring automatisé · conversion suivie',         impact_en: 'Automated scoring · conversion tracked',        href: '/cas-clients' },
      { client: 'Industrie FR',      sector_fr: 'Industrie · FR', sector_en: 'Industry · FR',duration: '8 wk',  stack: 'Claude · custom RAG · SAP', impact_fr: 'Heures récupérées · opérations déchargées',      impact_en: 'Hours recovered · streamlined back office',     href: '/cas-clients' },
      { client: 'E-commerce DTC',    sector_fr: 'E-commerce · DTC', sector_en: 'E-commerce · DTC', duration: '7 wk', stack: 'Claude · Shopify · BigQuery', impact_fr: 'Support déchargé · panier moyen suivi',       impact_en: 'Support offloaded · average basket tracked',     href: '/cas-clients' },
      { client: 'EdTech UE',         sector_fr: 'EdTech · UE',     sector_en: 'EdTech · EU',  duration: '9 wk',  stack: 'Claude · Notion · Postgres', impact_fr: 'Contenus produits en continu · cycle réduit', impact_en: 'Continuous content output · shorter cycle',      href: '/cas-clients' },
    ],
    all_label_fr: 'Tous les dossiers →',
    all_label_en: 'All case files →',
    all_href: '/cas-clients',
  };
