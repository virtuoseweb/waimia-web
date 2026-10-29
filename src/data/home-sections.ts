// ─────────────────────────────────────────────────────────────────────────────
// Home LIVE · données des sections rendues par SectionsRenderer
// ─────────────────────────────────────────────────────────────────────────────
// Refonte positionnement 2026-10 : la home dit le métier (studio de développement IA et
// cabinet d'automatisation des processus pour PME et ETI) et présente l'offre DANS SON ORDRE :
// (1) automatisation et agents IA, (2) applications métier, (3) conseil et formation, puis
// (4) sites web et outils commerciaux. Décision du 14 octobre 2026 : le studio fait aussi des
// sites web (création, refonte, sur mesure) ; le web n'est plus présenté « en appui ».
//
// Séquence de la page (src/pages/index.astro) : Hero · Offre (offer-rail) · Méthode
// (sticky-scroll) · Réalisations (case-card-grid) · Où en êtes-vous (diagnostic-stages) ·
// Qui (eeat-panel) · FAQ · Action. Sections retirées car sans information utile à la
// décision : mur de logos, « la boucle », « la tension », bento de chiffres.
//
// Les cas, la méthode et les réponses de FAQ restent sourcés dans
// `src/data/page-variants/home/c.json` (source unique, mergée dans la page).
import type { SectionData } from '@waimia/ds-kernel';
import { AUDIT_PROMISE } from './conversion';

// ── 02 · L'offre · offer-rail CATALOGUE. Un onglet par domaine, dans l'ordre de l'offre.
// `anchor: 'offres'` préserve la cible de scroll #offres.
export const offerRail = {
  type: 'offer-rail',
  anchor: 'offres',
  background: 'paper',
  kicker_fr: '§ Ce qu’on construit',
  kicker_en: '§ What we build',
  h2_fr: 'Des systèmes <i>en production</i>, pas des démonstrations.',
  h2_en: 'Systems <i>in production</i>, not demos.',
  lede_fr: 'Automatiser les processus, développer les applications et les sites web qui manquent, conseiller et former vos équipes. Le même ingénieur s’en charge, de l’audit à la remise du code.',
  lede_en: 'Automating processes, building the applications and websites that are missing, advising and training your teams. The same engineer handles it, from the audit to the code handover.',
  tablist_label_fr: 'Domaines d’intervention',
  tablist_label_en: 'Areas of work',
  families: [
    {
      id: 'automatisation',
      tab_label_fr: 'Automatisation et agents IA',
      tab_label_en: 'Automation and AI agents',
      intro_eyebrow_fr: '§ Automatisation et agents IA · le cœur du studio',
      intro_eyebrow_en: '§ Automation and AI agents · the core of the studio',
      intro_lede_fr: 'Une automatisation suit des règles fixes. Un agent IA raisonne sur une tâche et enchaîne les étapes. On utilise le plus simple des deux qui fait le travail.',
      intro_lede_en: 'An automation follows fixed rules. An AI agent reasons about a task and chains the steps. We use the simpler of the two that does the job.',
      layout: 'diptych',
      offers: [
        {
          tag_fr: 'Automatisation',
          tag_en: 'Automation',
          title_fr: 'Automatisation des processus',
          title_en: 'Process automation',
          body_fr: 'Les workflows n8n et Make qui suppriment la ressaisie entre vos outils : une donnée saisie une fois circule du formulaire au CRM, du CRM à la facturation, du tableur au tableau de bord.',
          body_en: 'The n8n and Make workflows that remove re-keying between your tools: data entered once flows from the form to the CRM, from the CRM to invoicing, from the spreadsheet to the dashboard.',
          points_fr: ['n8n ou Make, selon vos contraintes', 'Branché à vos outils par API', 'Workflows documentés et transférés'],
          points_en: ['n8n or Make, depending on your constraints', 'Connected to your tools through API', 'Workflows documented and handed over'],
          link_label_fr: 'Voir l’automatisation des processus →',
          link_label_en: 'See process automation →',
          link_href: '/services/automatisations',
        },
        {
          tag_fr: 'Agents IA',
          tag_en: 'AI agents',
          title_fr: 'Agents IA',
          title_en: 'AI agents',
          accent: 'complement',
          body_fr: 'Des agents sur Claude ou OpenAI, branchés à vos outils via MCP (CRM, e-mail, base de données). Ils lisent vos données réelles et agissent dans un périmètre défini. Les actions sensibles passent par une validation humaine.',
          body_en: 'Agents on Claude or OpenAI, connected to your tools through MCP (CRM, email, database). They read your real data and act within a defined scope. Sensitive actions go through human validation.',
          points_fr: ['Claude ou OpenAI en production', 'Périmètre d’action et permissions explicites', 'Journal des actions, validation humaine'],
          points_en: ['Claude or OpenAI in production', 'Explicit scope of action and permissions', 'Action log, human validation'],
          link_label_fr: 'Voir les agents IA →',
          link_label_en: 'See AI agents →',
          link_href: '/services/agents-ia',
        },
      ],
      rail: true,
      services_intro_fr: '§ Les pages qui détaillent chaque prestation.',
      services_intro_en: '§ The pages that detail each service.',
      services: [
        { metric_fr: 'Vue d’ensemble', metric_en: 'Overview', label_fr: 'Automatisation IA pour PME', label_en: 'AI automation for SMEs', sub_fr: 'Workflows · Agents · Intégrations', sub_en: 'Workflows · Agents · Integrations', href: '/services/systemes-operationnels-ia' },
        { metric_fr: 'n8n', metric_en: 'n8n', label_fr: 'Automatisation n8n', label_en: 'n8n automation', sub_fr: 'Workflows · Connecteurs · API', sub_en: 'Workflows · Connectors · API', href: '/services/automatisation-n8n' },
        { metric_fr: 'Support', metric_en: 'Support', label_fr: 'Agent support client', label_en: 'Customer support agent', sub_fr: 'Réponses · Tri · Escalade humaine', sub_en: 'Answers · Triage · Human escalation', href: '/services/agent-support-client' },
        { metric_fr: 'Claude', metric_en: 'Claude', label_fr: 'Intégration Claude', label_en: 'Claude integration', sub_fr: 'Claude · MCP · Gouvernance', sub_en: 'Claude · MCP · Governance', href: '/services/integration-claude' },
        { metric_fr: 'Données', metric_en: 'Data', label_fr: 'Données et reporting', label_en: 'Data and reporting', sub_fr: 'Centralisation · Tableaux de bord', sub_en: 'Centralisation · Dashboards', href: '/services/donnees-reporting' },
        { metric_fr: 'Problèmes', metric_en: 'Problems', label_fr: 'Cas d’usage', label_en: 'Use cases', sub_fr: 'Processus · Données · Reporting', sub_en: 'Processes · Data · Reporting', href: '/cas-usages' },
      ],
    },
    {
      id: 'applications',
      tab_label_fr: 'Applications métier',
      tab_label_en: 'Business applications',
      intro_eyebrow_fr: '§ Applications métier · développement sur mesure',
      intro_eyebrow_en: '§ Business applications · custom development',
      intro_lede_fr: 'Quand le tableur ou le logiciel du marché ne suffit plus, on développe l’outil dont l’équipe a besoin. Avant de coder, on vérifie qu’un outil existant ne fait pas déjà le travail.',
      intro_lede_en: 'When the spreadsheet or off-the-shelf software is no longer enough, we build the tool the team needs. Before coding, we check that an existing tool does not already do the job.',
      layout: 'diptych',
      offers: [
        {
          tag_fr: 'Développement',
          tag_en: 'Development',
          title_fr: 'Applications internes',
          title_en: 'Internal applications',
          body_fr: 'L’application métier sur mesure : une interface simple, branchée à vos données et à vos automatisations. Le code est livré et hébergé chez vous.',
          body_en: 'The custom business application: a simple interface, connected to your data and your automations. The code is delivered and hosted on your side.',
          points_fr: ['Interface conçue avec les utilisateurs', 'Branchée aux données et aux workflows', 'Vous gardez le code'],
          points_en: ['Interface designed with its users', 'Connected to data and workflows', 'You keep the code'],
          link_label_fr: 'Voir les applications internes →',
          link_label_en: 'See internal applications →',
          link_href: '/services/applications-internes',
        },
        {
          tag_fr: 'Pilotage',
          tag_en: 'Steering',
          title_fr: 'Données et reporting',
          title_en: 'Data and reporting',
          accent: 'complement',
          body_fr: 'Les données dispersées entre vos outils rassemblées dans une seule base, et un reporting qui se produit tout seul au lieu d’occuper le vendredi soir.',
          body_en: 'Data scattered across your tools gathered in one base, and reporting that produces itself instead of taking up Friday evening.',
          points_fr: ['Une base, plusieurs sources', 'Tableaux de bord à jour', 'Alertes sur les anomalies'],
          points_en: ['One base, several sources', 'Up-to-date dashboards', 'Alerts on anomalies'],
          link_label_fr: 'Voir données et reporting →',
          link_label_en: 'See data and reporting →',
          link_href: '/services/donnees-reporting',
        },
      ],
    },
    {
      id: 'conseil',
      tab_label_fr: 'Conseil et formation',
      tab_label_en: 'Advisory and training',
      intro_eyebrow_fr: '§ Conseil et formation · avant et après le projet',
      intro_eyebrow_en: '§ Advisory and training · before and after the project',
      intro_lede_fr: 'Savoir où l’IA crée de la valeur avant d’investir, puis rendre vos équipes capables de faire évoluer ce qui a été construit. À distance ou, selon le projet, sur site dans <a href="/implantations">dix villes en France</a>.',
      intro_lede_en: 'Know where AI creates value before investing, then make your teams able to evolve what was built. Remote or, depending on the project, on site in <a href="/implantations">ten cities across France</a>.',
      layout: 'diptych',
      offers: [
        {
          tag_fr: 'Conseil',
          tag_en: 'Advisory',
          title_fr: 'Audit et feuille de route',
          title_en: 'Audit and roadmap',
          body_fr: `${AUDIT_PROMISE.general.short.fr} Le sprint de cadrage (10 h, 999 € HT) transforme le premier chantier en plan chiffré, avec un premier livrable en main.`,
          body_en: `${AUDIT_PROMISE.general.short.en} The scoping sprint (10 h, 999 € ex VAT) turns the first project into a costed plan, with a first deliverable in hand.`,
          points_fr: ['Audit IA gratuit, 45 min', 'Sprint de cadrage, 10 h', 'RGPD et AI Act regardés au cadrage'],
          points_en: ['Free AI audit, 45 min', 'Scoping sprint, 10 h', 'GDPR and AI Act reviewed during scoping'],
          link_label_fr: 'En savoir plus sur l’audit →',
          link_label_en: 'More about the audit →',
          link_href: '/audit-ia-pme',
        },
        {
          tag_fr: 'Formation',
          tag_en: 'Training',
          title_fr: 'Formation IA et automatisation',
          title_en: 'AI and automation training',
          accent: 'complement',
          body_fr: 'Former vos équipes à n8n, Make et Claude à partir de vos propres processus. Formations dispensées via Akigora, organisme certifié Qualiopi. Prise en charge possible selon votre situation.',
          body_en: 'Train your teams in n8n, Make and Claude from your own processes. Training delivered through Akigora, a Qualiopi-certified body. Funding possible depending on your situation.',
          points_fr: ['Ateliers sur vos cas réels', 'Programme défini après l’audit', 'Référent IA accompagné en interne'],
          points_en: ['Workshops on your real cases', 'Programme defined after the audit', 'In-house AI lead supported'],
          link_label_fr: 'Voir le conseil IA →',
          link_label_en: 'See AI advisory →',
          link_href: '/services/consultant-ia-claude',
        },
      ],
    },
    {
      id: 'site-web',
      tab_label_fr: 'Sites web et commercial',
      tab_label_en: 'Websites and sales',
      intro_eyebrow_fr: '§ Sites web et outils commerciaux · la demande, puis son suivi',
      intro_eyebrow_en: '§ Websites and sales tools · the demand, then its follow-up',
      intro_lede_fr: 'Le studio crée et refait des <a href="/services/site-web-ia">sites web</a> pour PME. On choisit la plateforme selon qui fera vivre le site, et les formulaires arrivent dans votre CRM.',
      intro_lede_en: 'The studio builds and rebuilds <a href="/services/site-web-ia">websites</a> for SMEs. We choose the platform based on who will run the site, and the forms land in your CRM.',
      layout: 'diptych',
      offers: [
        {
          tag_fr: 'Site web',
          tag_en: 'Website',
          title_fr: 'Création et refonte de site',
          title_en: 'Website creation and redesign',
          body_fr: 'Webflow, WordPress, Shopify ou développement sur mesure. Un site rapide et mesuré, lisible par Google et par les moteurs IA, relié à votre CRM.',
          body_en: 'Webflow, WordPress, Shopify or custom development. A fast, measured site, readable by Google and AI engines, connected to your CRM.',
          link_label_fr: 'Voir l’agence site web →',
          link_label_en: 'See the website agency →',
          link_href: '/services/site-web-ia',
        },
        {
          tag_fr: 'Commercial',
          tag_en: 'Sales',
          title_fr: 'Outils commerciaux',
          title_en: 'Sales tooling',
          accent: 'complement',
          body_fr: 'Prospection automatisée, CRM avec scoring et affectation, relances déclenchées par le comportement. Les mêmes briques d’automatisation, appliquées au pipeline.',
          body_en: 'Automated prospecting, CRM with scoring and assignment, follow-ups triggered by behaviour. The same automation building blocks, applied to the pipeline.',
          link_label_fr: 'Voir les outils commerciaux →',
          link_label_en: 'See sales tooling →',
          link_href: '/services/systeme-commercial',
        },
      ],
      panel_cta_label_fr: 'Voir aussi le référencement et les landing pages →',
      panel_cta_label_en: 'See also search visibility and landing pages →',
      panel_cta_href: '/services/systeme-acquisition',
    },
  ],
} as unknown as SectionData;

// ── 05 · Où en êtes-vous · diagnostic-stages CATALOGUE + bande CTA quiz (axe quizCta).
// 5 stades de maturité d'une PME face à l'automatisation (current = stade 2, cas le plus
// fréquent). Fond paper-2 ; la carte quiz est TOUJOURS ink (rendue par le composant).
export const maturityStages: SectionData = {
  type: 'diagnostic-stages',
  background: 'paper-2',
  density: 'base',
  kicker_fr: '§ Où en êtes-vous ?',
  kicker_en: '§ Where do you stand?',
  h2_fr: 'Cinq stades, du <i class="acc">tout-manuel</i> au système qui tourne.',
  h2_en: 'Five stages, from <i class="acc">all-manual</i> to a system that runs.',
  lede_fr: 'Situez votre entreprise. Beaucoup de PME en sont au stade 2 : des outils, mais rien qui les relie.',
  lede_en: 'Place your company. Many SMEs are at stage 2: tools, but nothing connecting them.',
  stages: [
    {
      glyph: '○', phase_fr: 'Stade 1', phase_en: 'Stage 1',
      title_fr: 'Tout à la main', title_en: 'All by hand',
      body_fr: 'Les tâches répétitives occupent les équipes. Rien n’est outillé, tout repose sur des personnes et sur leur mémoire.',
      body_en: 'Repetitive tasks occupy the teams. Nothing is tooled, everything rests on people and their memory.',
    },
    {
      glyph: '◔', phase_fr: 'Stade 2', phase_en: 'Stage 2', current: true,
      title_fr: 'Outils dispersés', title_en: 'Scattered tools',
      body_fr: 'Un CRM, des logiciels, des tableurs, mais déconnectés. La donnée se ressaisit à la main d’un outil à l’autre.',
      body_en: 'A CRM, software, spreadsheets, but disconnected. Data is re-keyed by hand from one tool to the next.',
    },
    {
      glyph: '◑', phase_fr: 'Stade 3', phase_en: 'Stage 3',
      title_fr: 'Premières automatisations', title_en: 'First automations',
      body_fr: 'Quelques workflows, un premier agent sur une tâche ciblée, un gain que vous mesurez.',
      body_en: 'A few workflows, a first agent on a targeted task, a gain you measure.',
    },
    {
      glyph: '◕', phase_fr: 'Stade 4', phase_en: 'Stage 4',
      title_fr: 'Système connecté', title_en: 'Connected system',
      body_fr: 'Applications et agents branchés à vos outils. La donnée circule sans ressaisie, les actions sont journalisées.',
      body_en: 'Applications and agents connected to your tools. Data flows without re-keying, actions are logged.',
    },
    {
      glyph: '●', phase_fr: 'Stade 5', phase_en: 'Stage 5',
      title_fr: 'L’équipe pilote, le système exécute', title_en: 'The team steers, the system executes',
      body_fr: 'Les processus répétitifs tournent seuls, sous supervision. L’équipe sait les faire évoluer sans prestataire.',
      body_en: 'Repetitive processes run on their own, under supervision. The team knows how to evolve them without a provider.',
    },
  ],
  quizCta: {
    eyebrow_fr: '§ Diagnostic de maturité', eyebrow_en: '§ Maturity diagnostic',
    title_fr: 'À quel stade est votre PME aujourd’hui ?',
    title_en: 'Which stage is your company at today?',
    body_fr: 'Situez votre PME sur les cinq niveaux et repartez avec les prochaines étapes concrètes pour monter d’un cran.',
    body_en: 'Place your company on the five levels and leave with the concrete next steps to climb one level.',
    cta_label_fr: 'Faire le diagnostic →', cta_label_en: 'Run the diagnostic →',
    cta_href: '/ressources/diagnostics/maturite-ia',
    media_alt_fr: 'Illustration : évaluer des options et trancher pour avancer d’un stade.',
    media_alt_en: 'Illustration: weighing options and deciding to move up a stage.',
    note_fr: 'Gratuit · 5 min · sans formulaire', note_en: 'Free · 5 min · no form',
  },
} as SectionData;

// ── 06 · Qui · eeat-panel variant media (INK) = profil du fondateur, repères, liens.
// Silo `ops` : le maillage du panneau pointe vers l'automatisation et les agents IA.
export const mediaDashboard: SectionData = {
  type: 'eeat-panel',
  variant: 'media',
  silo: 'ops',
  background: 'ink',
} as SectionData;

// ── 03 · Méthode · sticky-scroll-storytelling (base = c.json : audit, pilote, mesure,
// transfert). Les steps.media_src basculent sur leur variante `-ink.webp` dans la page.
export const methodOverrides = {
  background: 'ink',
  textSide: 'right',
  proportion: 'media-wide',
  mediaRatio: '3-2',
  density: 'compact',
  numbering: 'serif',
} as const;

// ── 07 · FAQ · 6 questions (index dans c.json faq-accordion.items ; questions et réponses
// viennent de c.json, source unique). heading/intro de FaqAccordion inclus.
export const faqConfig = {
  idx: [0, 1, 2, 3, 5, 6],
  heading: 'Ce qu’on écrit par mail avant de se parler.',
  intro: 'Six réponses nettes, sans jargon.',
} as const;
