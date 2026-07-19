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
  kicker_fr: '§ L’écosystème qu’on opère',
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

// 09 · Témoignages · testimonial-wall (base = les 6 avis de site-web-ia.json, source
// unique, 0 avis réinventé). En-tête adapté home.
export const testimonialsOverrides = {
  background: 'paper',
  kicker_fr: '§ Ils ont mis leur système au travail',
  kicker_en: '§ They put their system to work',
  h2_fr: 'Ce que disent les équipes qui ont mis leur système au travail',
  h2_en: 'What teams who put their system to work are saying',
  subtitle_fr: 'Des dirigeants et des équipes qui ont arrêté de subir leurs outils et fait travailler leur système d’acquisition.',
  subtitle_en: 'Leaders and teams who stopped enduring their tools and put their acquisition system to work.',
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
