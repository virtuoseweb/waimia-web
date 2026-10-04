// ─────────────────────────────────────────────────────────────────────────────
// Home LIVE · données de la SÉQUENCE MÉDIANE en donnée (JSONification, vague V1)
// ─────────────────────────────────────────────────────────────────────────────
// Extraction des littéraux de section qui vivaient inline dans le frontmatter de
// `src/pages/index.astro` (fiche 0027 D6 : « JSONifier la séquence médiane, garder
// le shell animé Hero/BootSplash bespoke »). Le shell animé (BootSplash, Hero) et
// les 3 blocs bespoke sans équivalent catalogué (03 money-slot offres, 06 tension,
// 07 cas clients) restent dans la page (markup + dérivations c.json). Ici : la
// DONNÉE (props inline) des sections cataloguées rendues par SectionsRenderer.
//
// Mécanisme choisi = module de données `src/data/*.ts` (comme pain-points.ts,
// sitemap.ts, pricing.ts, logos.ts…) : c'est le plus cohérent avec l'existant et le
// plus SÛR pour la parité stricte (0 schéma à valider, pur déplacement d'objets ;
// une collection Astro aurait imposé un schéma sur des shapes hétérogènes — full
// SectionData + bags de surcharges + config FAQ). La page merge ces données avec
// les bases cataloguées (home/c.json, site-web-ia.json) comme avant.
//
// 0 valeur réécrite : chaque littéral est transcrit CARACTÈRE POUR CARACTÈRE depuis
// l'ancien frontmatter (apostrophes typographiques ’, points médians ·, flèches →,
// balises <i class="acc"> incluses).
import type { SectionData } from '@waimia/ds-kernel';
import { SIX_SERVICES } from './sitemap';

// ── 03 · Les deux offres · MONEY SLOT · offer-rail CATALOGUE (ex-bloc bespoke he-offres eleve
// au catalogue, anti-orphelin). Donnee transcrite VERBATIM depuis l'ancien markup de
// src/pages/index.astro ; les 6 services derivent de SIX_SERVICES (source unique sitemap).
// La branche « Automation & IA » (offer 02) porte accent='complement' -> token DS --complementary
// (#2090A8, travail frais Simon 2026-07-16). `anchor: 'offres'` preserve la cible de scroll.
export const offerRail = {
  type: 'offer-rail',
  anchor: 'offres',
  background: 'paper',
  kicker_fr: '§ Agence d’ingénierie IA & applications pour PME',
  kicker_en: '§ AI engineering & applications studio for SMEs',
  h2_fr: 'On <i>conçoit le système</i>, pas juste l’outil.',
  h2_en: 'We <i>design the system</i>, not just the tool.',
  lede_fr: 'Un système métier IA n’est pas une automatisation isolée, c’est un ensemble cohérent d’applications, de données, de workflows et d’agents conçu autour de vos opérations.',
  lede_en: 'A business AI system is not an isolated automation, it is a coherent set of applications, data, workflows and agents designed around your operations.',
  tablist_label_fr: 'Familles de systèmes',
  tablist_label_en: 'System families',
  families: [
    {
      id: 'marketing',
      tab_label_fr: 'Système d’acquisition',
      tab_label_en: 'Acquisition system',
      intro_eyebrow_fr: '§ Système d’acquisition · équipes marketing de PME',
      intro_eyebrow_en: '§ Acquisition system · SME marketing teams',
      intro_lede_fr: 'Un inbound et un outbound qui rapportent : le site qualifie chaque visite, les agents relancent et mesurent. Deux briques d’un même système marketing, à un pricing de lancement.',
      intro_lede_en: 'Inbound and outbound that pay off: the site qualifies every visit, the agents follow up and measure. Two blocks of one marketing system, at a launch price.',
      layout: 'diptych',
      offers: [
        {
          tag_fr: 'Offre 01',
          tag_en: 'Offer 01',
          title_fr: 'Site web intelligent',
          title_en: 'Smart website',
          body_fr: 'Un site web IA sur Astro, rapide, indexé par Google et par les moteurs IA, branché à votre CRM. Il qualifie chaque visite et alimente le pipeline en continu : une vitrine qui génère des leads, pas une plaquette figée.',
          body_en: 'An AI website on Astro, fast, indexed by Google and by AI engines, wired to your CRM. It qualifies every visit and feeds the pipeline continuously: a storefront that generates leads, not a static brochure.',
          points_fr: ['Astro + IA, trouvé par Google et par les IA', 'Landing et tunnels reliés au CRM', 'Pages éditables, mesurées à la conversion'],
          points_en: ['Astro + AI, found by Google and by AIs', 'Landing pages and funnels wired to the CRM', 'Editable pages, measured on conversion'],
          link_label_fr: 'Voir l’offre →',
          link_label_en: 'See the offer →',
          link_href: '/services/site-web-ia',
        },
        {
          tag_fr: 'Offre 02',
          tag_en: 'Offer 02',
          title_fr: 'Automation & IA',
          title_en: 'Automation & AI',
          accent: 'complement',
          body_fr: 'Intégration IA de bout en bout : on déploie Claude, ChatGPT ou Mistral et leurs agents dans votre entreprise, branchés à vos outils via MCP (CRM, e-mail, base de données, dépôt Git). De quoi faire travailler l’IA sur vos données réelles et la faire passer de la conversation à l’action.',
          body_en: 'End-to-end AI integration: we deploy Claude, ChatGPT or Mistral and their agents in your company, wired to your tools via MCP (CRM, email, database, Git repository). Enough to put AI to work on your real data and move it from conversation to action.',
          points_fr: ['Claude, ChatGPT ou Mistral en production', 'Serveurs MCP propres vers vos outils', 'Gouvernance, mesure et passation incluses'],
          points_en: ['Claude, ChatGPT or Mistral in production', 'Clean MCP servers to your tools', 'Governance, measurement and handover included'],
          link_label_fr: 'Voir l’offre →',
          link_label_en: 'See the offer →',
          link_href: '/services/integration-claude',
        },
      ],
      rail: true,
      services_intro_fr: '§ Six services, une seule équipe. On active celui qui sert d’abord.',
      services_intro_en: '§ Six services, one team. We turn on the one that serves first.',
      services: SIX_SERVICES.map((s) => ({
        metric_fr: s.metric.fr,
        metric_en: s.metric.en,
        label_fr: s.label.fr,
        label_en: s.label.en,
        sub_fr: s.connectors.fr,
        sub_en: s.connectors.en,
        href: s.href,
      })),
    },
    {
      id: 'commercial',
      tab_label_fr: 'Système commercial',
      tab_label_en: 'Sales system',
      intro_eyebrow_fr: '§ Système commercial · équipes commerciales de PME',
      intro_eyebrow_en: '§ Sales system · SME sales teams',
      intro_lede_fr: 'Vos leads arrivent, puis se perdent. Un système commercial fait l’inverse : la prospection alimente, le CRM qualifie et route, les séquences relancent. Trois leviers sur une seule base pour transformer vos prospects en <i>clients</i>.',
      intro_lede_en: 'Your leads arrive, then get lost. A sales system does the opposite: prospecting feeds, the CRM qualifies and routes, the sequences follow up. Three levers on one base to turn your prospects into <i>clients</i>.',
      layout: 'trio',
      offers: [
        {
          tag_fr: 'Levier 01',
          tag_en: 'Lever 01',
          title_fr: 'Prospection automatisée',
          title_en: 'Automated prospecting',
          body_fr: 'L’outbound qui vise les comptes cibles : ICP serré, listes enrichies et séquences multicanal. La prospection va chercher les comptes que l’inbound n’a pas captés, sans brûler votre domaine.',
          body_en: 'Outbound that targets the right accounts: a tight ICP, enriched lists and multichannel sequences. Prospecting goes after the accounts inbound missed, without burning your domain.',
          link_label_fr: 'Voir le levier →',
          link_label_en: 'See the lever →',
          link_href: '/services/prospection-automatisee',
        },
        {
          tag_fr: 'Levier 02',
          tag_en: 'Lever 02',
          title_fr: 'CRM, scoring et routing',
          title_en: 'CRM, scoring and routing',
          body_fr: 'Chaque lead noté selon son comportement, dédoublonné et affecté au bon commercial. Le chaud ne refroidit plus dans une file : l’alerte part à temps.',
          body_en: 'Every lead scored on behaviour, de-duplicated and assigned to the right rep. Hot leads no longer cool down in a queue: the alert fires on time.',
          link_label_fr: 'Voir le levier →',
          link_label_en: 'See the lever →',
          link_href: '/services/crm-scoring-routing',
        },
        {
          tag_fr: 'Levier 03',
          tag_en: 'Lever 03',
          title_fr: 'Séquences de suivi',
          title_en: 'Follow-up sequences',
          body_fr: 'Des relances multicanal déclenchées par le comportement, personnalisées par l’IA. Plus aucun compte tiède ne s’éteint par oubli.',
          body_en: 'Multichannel follow-ups triggered by behaviour, personalised by AI. No warm account ever goes dark from being forgotten.',
          link_label_fr: 'Voir le levier →',
          link_label_en: 'See the lever →',
          link_href: '/services/sequences-de-suivi',
        },
      ],
      services_intro_fr: '§ Trois leviers, un seul système. On active celui qui bouche la fuite qui coûte d’abord.',
      services_intro_en: '§ Three levers, one system. We turn on the one that plugs the costliest leak first.',
      panel_cta_label_fr: 'Voir le système commercial →',
      panel_cta_label_en: 'See the sales system →',
      panel_cta_href: '/services/systeme-commercial',
    },
  ],
} as unknown as SectionData;

// ── 04 · statement-orbit CATALOGUE · PIVOT après le money slot · liant conceptuel :
// les 2 offres forment UNE boucle d'amélioration continue (lire/mesurer/réinjecter).
// Copy neuf adapté home (0 reprise du copy SWI). Carte ink contenue → pleine largeur
// au scroll (motion signature). media = globe filaire line-art `orbit-network.svg`
// INLINE par le composant (import ?raw) → currentColor = paper sur ink. Pas de CTA
// (le hero + la ligne cas clients + BookSession couvrent déjà /contact).
export const statementOrbit: SectionData = {
  type: 'statement-orbit',
  background: 'paper',
  density: 'compact', // iter 6 : carte ink garde sa présence, inner padding space-11 → space-9.
  kicker_fr: '§ La boucle',
  kicker_en: '§ The loop',
  h2_fr: 'Vos systèmes forment une <i class="acc">boucle</i> : lire, mesurer, réinjecter.',
  h2_en: 'Your systems form one <i class="acc">loop</i>: read, measure, feed back.',
  lede_fr: 'Votre site qualifie chaque visite, les agents traitent et mesurent, ce qui remonte nourrit le cycle suivant. Une ingénierie qui gagne en justesse à chaque tour, sans refonte à chaque palier.',
  lede_en: 'Your site qualifies every visit, the agents process and measure, what comes back feeds the next cycle. A setup that sharpens with every turn, with no rebuild at each tier.',
  media_src: '/images/line-art/orbit-network.svg',
  media_alt_fr: 'Globe filaire aux nœuds relies par des arcs : le site, le CRM, le contenu et les agents tournent en une seule boucle d’acquisition.',
  media_alt_en: 'Wireframe globe with nodes linked by arcs: site, CRM, content and agents turn as one acquisition loop.',
} as SectionData;

// ── 05 · Où en êtes-vous · diagnostic-stages CATALOGUE + bande CTA quiz (axe quizCta).
// 5 stades de maturité SYSTÈME/IA d'une PME (current = stade 2, prospect type).
// Fond paper ; la carte quiz est TOUJOURS ink (rendue par le composant). density
// compact. Bande quiz → route réelle /ressources/diagnostics/maturite-ia. media_src
// omis = défaut DS `no-no-yes-ink.webp` (carte ink).
export const maturityStages: SectionData = {
  type: 'diagnostic-stages',
  background: 'paper',
  density: 'compact',
  kicker_fr: '§ Où en êtes-vous ?',
  kicker_en: '§ Where do you stand?',
  h2_fr: 'Cinq stades, du <i class="acc">tout-manuel</i> à l’entreprise qui tourne sur ses systèmes.',
  h2_en: 'Five stages, from <i class="acc">all-manual</i> to a company that runs on its systems.',
  lede_fr: 'Situez votre PME sur la trajectoire des systèmes métier IA, jusqu’à ce qu’ils deviennent le système d’exploitation de votre entreprise. La plupart démarrent au stade 2 : des outils, mais rien qui pilote l’ensemble.',
  lede_en: 'Place your SME on the business-AI-system path, up to the point where it becomes your company’s operating system. Most start at stage 2: tools, but nothing steering the whole.',
  stages: [
    {
      glyph: '○', phase_fr: 'Stade 1', phase_en: 'Stage 1',
      title_fr: 'Tout à la main', title_en: 'All by hand',
      body_fr: 'Les tâches répétitives à faible valeur monopolisent vos équipes. Rien n’est outillé, tout repose sur des personnes et un temps qu’elles n’ont pas.',
      body_en: 'Low-value repetitive tasks monopolise your teams. Nothing is tooled, everything rests on people and time they don’t have.',
    },
    {
      glyph: '◔', phase_fr: 'Stade 2', phase_en: 'Stage 2', current: true,
      title_fr: 'Outils dispersés', title_en: 'Scattered tools',
      body_fr: 'Un CRM, des SaaS, des tableurs, mais déconnectés. La donnée se ressaisit à la main et personne ne pilote l’ensemble.',
      body_en: 'A CRM, SaaS apps, spreadsheets, but disconnected. Data is re-keyed by hand and no one steers the whole.',
    },
    {
      glyph: '◑', phase_fr: 'Stade 3', phase_en: 'Stage 3',
      title_fr: 'Premières automatisations', title_en: 'First automations',
      body_fr: 'Vous commencez à déléguer les tâches répétitives à l’IA : quelques workflows, un premier agent sur une tâche ciblée, des résultats que vous suivez.',
      body_en: 'You start delegating repetitive tasks to AI: a few workflows, a first agent on a targeted task, results you track.',
    },
    {
      glyph: '◕', phase_fr: 'Stade 4', phase_en: 'Stage 4',
      title_fr: 'Système connecté', title_en: 'Connected system',
      body_fr: 'Applications et agents branchés à vos outils via MCP. La donnée circule, les coûts opérationnels baissent, chaque décision est mesurée.',
      body_en: 'Applications and agents wired to your tools via MCP. Data flows, operating costs drop, every decision is measured.',
    },
    {
      glyph: '●', phase_fr: 'Stade 5', phase_en: 'Stage 5',
      title_fr: 'L’entreprise-système', title_en: 'The system-company',
      body_fr: 'L’équipe pilote, l’IA exécute. Votre entreprise tourne sur ses systèmes : une PME IA-ready, qui gagne en justesse à chaque cycle.',
      body_en: 'The team steers, AI executes. Your company runs on its systems: an AI-ready SME that sharpens with every cycle.',
    },
  ],
  quizCta: {
    eyebrow_fr: '§ Diagnostic de maturité', eyebrow_en: '§ Maturity diagnostic',
    title_fr: 'À quel stade est votre PME aujourd’hui ?',
    title_en: 'Which stage is your company at today?',
    body_fr: 'Situez votre PME sur les cinq niveaux de maturité IA et repartez avec les prochaines étapes concrètes pour monter d’un cran.',
    body_en: 'Place your company on the five AI maturity levels and leave with the concrete next steps to climb one level.',
    cta_label_fr: 'Faire le diagnostic →', cta_label_en: 'Run the diagnostic →',
    cta_href: '/ressources/diagnostics/maturite-ia',
    media_alt_fr: 'Illustration : évaluer des options et trancher pour avancer d’un stade.',
    media_alt_en: 'Illustration: weighing options and deciding to move up a stage.',
    note_fr: 'Gratuit · 5 min · sans formulaire', note_en: 'Free · 5 min · no form',
  },
} as SectionData;

// ── 10 · Tableau de bord média · eeat-panel variant media (INK) = profil auteur,
// repères, secteurs, badges E-E-A-T. Contenu + liens internes GLOBAUX portés par le
// composant (source unique, même rendu que SWI).
export const mediaDashboard: SectionData = {
  type: 'eeat-panel',
  variant: 'media',
  background: 'ink',
} as SectionData;

// ── Surcharges des sections cataloguées DÉRIVÉES d'une base (home/c.json ou
// site-web-ia.json) : la page garde le merge `{ ...base, ...override }` (la base reste
// source unique — logos, avis SWI, bento). Seuls les littéraux home-spécifiques
// vivent ici.

// 02 · écosystème opéré · logo-marquee sur fond ink + grayscale (base = c.json logo-marquee).
export const logoMarqueeOverrides = {
  background: 'ink',
  grayscale: true,
  kicker_fr: '§ Les outils que nous connectons',
} as const;

// 08 · Méthode · sticky-scroll-storytelling (base = c.json). Les steps.media_src
// basculent sur leur variante `-ink.webp` (mappé dans la page, dépend de la base).
export const methodOverrides = {
  background: 'ink',
  kicker_fr: '§ Méthode · l’ingénierie se construit par paliers',
  textSide: 'right',
  proportion: 'media-wide',
  mediaRatio: '3-2',
  density: 'compact',
  numbering: 'serif',
} as const;

// 11 · Climax chiffre = 2e stats-bento de c.json (base). density base (retire le
// surdimensionnement de la base 'ample'), paper-2, kicker pre-FAQ.
export const statsBentoOverrides = {
  background: 'paper-2',
  density: 'base',
  kicker_fr: '§ Ce que ça change',
} as const;

// 06 · La tension · libellés de sévérité des 3 douleurs (données réelles = c.json
// pain-severity-list, mappées dans la page). Bloc markup bespoke (pas de section
// cataloguée) → reste dans la page.
export const severityLabels: Record<string, string> = { critical: 'Critique', high: 'Élevé', medium: 'Moyen' };

// 12 · FAQ · 6 questions reformulées en requêtes conversationnelles AIO (surface AIO
// citable) ; les RÉPONSES restent celles de c.json (0 désync, mappées dans la page via
// `idx`). heading/intro de FaqAccordion inclus.
export const faqConfig = {
  idx: [0, 1, 2, 3, 4, 6],
  questions: [
    'Combien coûte un système IA pour une PME ?',
    'À quelle taille d’entreprise s’adresse un système métier IA ?',
    'En combien de temps une PME voit-elle un retour sur l’IA ?',
    'Faut-il remplacer nos outils pour intégrer l’IA ?',
    'L’IA peut-elle se brancher à notre CRM et à nos outils existants ?',
    'Nos équipes restent-elles autonomes après la livraison ?',
  ],
  heading: 'Ce qu’on écrit par mail avant de se parler.',
  intro: 'Six réponses nettes, pas des slides, pas du jargon.',
} as const;
