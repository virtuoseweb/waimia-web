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
    // reveal_mode = 'cursor' : la fiche catalogue montre l'effet desktop (survol d'une ligne →
    // titre en accent + illustration qui suit le curseur). Illustrations -ink (fond ink).
    reveal_mode: 'cursor',
    cases: [
      { client: 'Acquisition B2B',   sector_fr: 'SaaS B2B',       sector_en: 'B2B SaaS',     duration: '10 wk', stack: 'Claude · HubSpot · dbt',    impact_fr: 'Pipeline reconnecté · qualification automatisée', impact_en: 'Pipeline reconnected · automated qualification', href: '/cas-clients', media_src: '/images/illustrations/ds/super-girl-ink.webp',            media_alt_fr: 'Pipeline B2B reconnecté et qualification automatisée', media_alt_en: 'B2B pipeline reconnected and qualification automated' },
      { client: 'Santé-tech',        sector_fr: 'Santé-tech',     sector_en: 'Healthtech',   duration: '6 wk',  stack: 'Claude · Snowflake',        impact_fr: 'Triage allégé · réponse 24/7',                   impact_en: 'Triage streamlined · 24/7 response',            href: '/cas-clients', media_src: '/images/illustrations/ds/pretty-woman-ink.webp',          media_alt_fr: 'Triage santé allégé et réponse continue', media_alt_en: 'Health triage streamlined and 24/7 response' },
      { client: 'Fintech UE',        sector_fr: 'Fintech · UE',   sector_en: 'Fintech · EU', duration: '14 wk', stack: 'Claude · Segment · dbt',    impact_fr: 'Scoring automatisé · conversion suivie',         impact_en: 'Automated scoring · conversion tracked',        href: '/cas-clients', media_src: '/images/illustrations/ds/money-in-the-pig-ink.webp',       media_alt_fr: 'Scoring fintech automatisé et conversion suivie', media_alt_en: 'Fintech scoring automated and conversion tracked' },
      { client: 'Industrie FR',      sector_fr: 'Industrie · FR', sector_en: 'Industry · FR',duration: '8 wk',  stack: 'Claude · custom RAG · SAP', impact_fr: 'Heures récupérées · opérations déchargées',      impact_en: 'Hours recovered · streamlined back office',     href: '/cas-clients', media_src: '/images/illustrations/ds/its-x-ink.webp',                 media_alt_fr: 'Heures récupérées et opérations industrielles déchargées', media_alt_en: 'Hours recovered and industrial operations streamlined' },
      { client: 'E-commerce DTC',    sector_fr: 'E-commerce · DTC', sector_en: 'E-commerce · DTC', duration: '7 wk', stack: 'Claude · Shopify · BigQuery', impact_fr: 'Support déchargé · panier moyen suivi',       impact_en: 'Support offloaded · average basket tracked',     href: '/cas-clients', media_src: '/images/illustrations/ds/fruits-ink.webp',                media_alt_fr: 'Support e-commerce déchargé et panier moyen suivi', media_alt_en: 'E-commerce support offloaded and average basket tracked' },
      { client: 'EdTech UE',         sector_fr: 'EdTech · UE',     sector_en: 'EdTech · EU',  duration: '9 wk',  stack: 'Claude · Notion · Postgres', impact_fr: 'Contenus produits en continu · cycle réduit', impact_en: 'Continuous content output · shorter cycle',      href: '/cas-clients', media_src: '/images/illustrations/ds/band-showing-tv-ink.webp',        media_alt_fr: 'Contenus EdTech produits en continu', media_alt_en: 'EdTech content produced continuously' },
    ],
    all_label_fr: 'Tous les dossiers →',
    all_label_en: 'All case files →',
    all_href: '/cas-clients',
  };
