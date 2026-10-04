// Waimia · Template « sector » (hub sectoriel /secteurs/<slug>) en DÉFINITION LOGICIELLE.
//
// Doctrine « template-as-data » (décision nuit 0018) : ce fichier n'est PAS un composant
// monolithique, c'est la DÉFINITION du template de la collection `secteurs` : une liste
// ORDONNÉE de sections cataloguées + les mappings frontmatter→données. Il ÉLÈVE 1:1 la
// séquence composable RICHE que construisait `src/pages/secteurs/[...slug].astro` (data
// builders + défauts partagés + dé-templatisation par secteur). La route fait
// `resolveTemplate(sectorTemplate, ctx)` puis rend la liste via le registry de sections
// (parité pixel avec l'ancien rendu route).
//
// Spécificité de cette vague vs `case-study` : la prose EST rendue (elle ne l'était pas
// pour les cas). Le builder `prose` émet la (les) section(s) `editorial-prose` du champ
// `body_sections`, avec `html_fr` porté par la donnée : PREMIER usage réel du champ
// `html_fr`/`html_en` du composant editorial-prose (rendu via <Fragment set:html>).
//
// Fidélité : mêmes données, mêmes valeurs, mêmes conditions (`when`) que l'ancienne route.
// La grille de cas (async, `sector-cases.ts`) est dérivée au niveau route et injectée au
// contexte (contrat app, pas kernel). Le masthead + le JSON-LD restent chrome de route.

import type { CollectionEntry } from 'astro:content';
import { defineTemplate, type TemplateContext } from '@waimia/ds-kernel/templates';
import type { SectionByType, SectionData } from '@waimia/ds-kernel';
import { localizeHref } from '../i18n';
import { meshForSecteur } from '../internal-mesh';
import { secteurHeroIllustration } from '../hero-illustrations';

/** Frontmatter typé d'un secteur (source de vérité = schéma `secteurs` de content.config.ts). */
export type SectorData = CollectionEntry<'secteurs'>['data'];

/**
 * Contexte de résolution du template `sector`. Étend `{ data, lang }` avec le slug (pathname)
 * et la grille de cas injectée (calcul async cross-collection au niveau route). Le MOTEUR
 * reste générique : ces extras sont un contrat app, pas kernel.
 */
export type SectorContext = TemplateContext<SectorData> & {
  /** Slug de la page (d.slug ?? entry.id), pour maillage + illustrations. */
  slug: string;
  /** Grille de cas `case-card-grid` injectée (sector-cases.ts, async). */
  caseGrid: SectionData;
};

// ── Sévérité dérivée par position (le frontmatter secteur ne porte pas de sévérité) :
//    le 1er pain = friction la plus structurante, dégradé ensuite. CMS-safe (3 à 6 items). ──
const SEVERITY_BY_INDEX = ['critical', 'high', 'high', 'medium', 'medium', 'low'] as const;

// ── Mapping workflow → illustration duotone réelle (variante -paper, fond clair).
//    Pool content-matched, assigné par index → 0 répétition dans une page (max 4 rangées). ──
const WORKFLOW_ILLUSTRATIONS = [
  { src: '/images/illustrations/ds/woman-computer-paper.webp', alt_fr: 'Illustration : poste de travail outillé', alt_en: 'Illustration: an equipped workstation' },
  { src: '/images/illustrations/ds/money-money-paper.webp', alt_fr: 'Illustration : flux de revenus', alt_en: 'Illustration: revenue flow' },
  { src: '/images/illustrations/ds/men-on-hand-paper.webp', alt_fr: 'Illustration : transmission entre équipes', alt_en: 'Illustration: handover between teams' },
  { src: '/images/illustrations/ds/chess-paper.webp', alt_fr: 'Illustration : pièces d\'échecs, stratégie', alt_en: 'Illustration: chess pieces, strategy' },
] as const;

// ── DÉ-TEMPLATISATION (décision 7, audit SEO final) · variantes PAR SECTEUR des blocs
//    injectés autrement identiques entre sœurs (feature-zigzag lede + corps de rangée,
//    sous-titre du climax CTA). Le défaut générique reste le FALLBACK ci-dessous → 0
//    régression sur les secteurs noindex, qui ne sont pas cadrés ici. Chaque tableau
//    `workflowBodies_fr` est indexé sur `workflowsCible` du frontmatter (même ordre). ──
const SECTOR_COPY: Record<string, {
  zigzagLede_fr: string; zigzagLede_en: string;
  ctaSubtitle_fr: string; ctaSubtitle_en: string;
  workflowBodies_fr: string[]; workflowBodies_en: string[];
}> = {
  batiment: {
    zigzagLede_fr: 'On outille la signature, pas la théorie : rassurer avant l\'appel, capter la demande, chiffrer vite. Branché sur vos outils, tenu par votre équipe.',
    zigzagLede_en: 'We tool the signature, not the theory: reassure before the call, capture the request, quote fast. Wired to your tools, run by your team.',
    ctaSubtitle_fr: 'On regarde vos demandes entrantes et votre visibilité locale en 45 minutes, et on vous dit vite si le terrain est opérable. Sans promesse en l\'air.',
    ctaSubtitle_en: 'We look at your inbound requests and local visibility in 45 minutes, and tell you quickly whether the field is operationally viable. No empty promises.',
    workflowBodies_fr: [
      'Photos de chantiers, avis en évidence, coordonnées claires : le prospect voit une entreprise sérieuse avant même d\'appeler. C\'est ce qui déclenche la demande.',
      'Chaque demande arrive triée : type de travaux, zone, urgence. Vous ouvrez une liste qualifiée, pas une pile d\'appels manqués à rappeler à l\'aveugle.',
      'Le premier qui chiffre emporte souvent le chantier. On prépare les réponses pour que le devis parte le jour même, pas la semaine suivante.',
    ],
    workflowBodies_en: [
      'Job-site photos, reviews up front, clear contact details: the prospect sees a serious company before even calling. That is what triggers the request.',
      'Every request comes sorted: type of work, area, urgency. You open a qualified list, not a pile of missed calls to return blind.',
      'The first to quote often wins the job. We prep the answers so the quote goes out the same day, not the next week.',
    ],
  },
  'e-commerce': {
    zigzagLede_fr: 'On travaille le tunnel, pas la vitrine : un site rapide, un guidage qui lève les objections, un suivi qui montre ce qui convertit. Branché sur votre stack actuelle.',
    zigzagLede_en: 'We work the funnel, not the storefront: a fast site, guidance that clears objections, tracking that shows what converts. Wired to your current stack.',
    ctaSubtitle_fr: 'On regarde votre tunnel d\'achat et vos perfs en 45 minutes, et on vous dit vite ce qui bloque la conversion. Sans promesse en l\'air.',
    ctaSubtitle_en: 'We look at your checkout funnel and performance in 45 minutes, and tell you quickly what is blocking conversion. No empty promises.',
    workflowBodies_fr: [
      'Sous trois secondes de chargement mobile, sinon le visiteur part avant la fiche produit. On traque et on corrige ce qui ralentit le tunnel, page par page.',
      'Un vendeur qui ne dort pas : il trouve le bon produit, répond aux objections livraison ou taille, et accompagne jusqu\'au paiement. Sans équipe support 24/7.',
      'On branche le suivi qui manque : quelle source rapporte, quelle étape fait décrocher, qui revient. Vous arrêtez d\'optimiser à l\'aveugle.',
    ],
    workflowBodies_en: [
      'Under three seconds of mobile load, or the visitor leaves before the product page. We track and fix what slows the funnel, page by page.',
      'A salesperson that never sleeps: finds the right product, answers delivery or size objections, and guides to checkout. Without a 24/7 support team.',
      'We wire the missing tracking: which source pays off, which step makes people drop, who comes back. You stop optimizing blind.',
    ],
  },
  'liberal-independant': {
    zigzagLede_fr: 'On construit l\'autorité, pas la brochure : être trouvé sur vos requêtes métier, rassurer, ouvrir un contact simple. Un actif qui vous appartient, hors plateformes.',
    zigzagLede_en: 'We build authority, not a brochure: get found on your trade queries, reassure, open a simple contact. An asset you own, off-platform.',
    ctaSubtitle_fr: 'On regarde votre visibilité et votre présence en ligne en 45 minutes, et on vous dit vite où vous perdez des contacts. Sans promesse en l\'air.',
    ctaSubtitle_en: 'We look at your visibility and online presence in 45 minutes, and tell you quickly where you are losing contacts. No empty promises.',
    workflowBodies_fr: [
      'Un site qui prouve votre expertise plutôt qu\'une fiche d\'annuaire interchangeable : votre angle, vos publications, vos références. Il travaille pendant vos rendez-vous.',
      'Être trouvé sur vos requêtes métier sur Google, et cité dans les réponses des moteurs IA où une part croissante de vos clients cherche désormais un nom.',
      'Un chemin de contact clair, sans formulaire à rallonge ni intermédiaire qui prend sa commission. Le prospect vous joint directement, quand il est décidé.',
    ],
    workflowBodies_en: [
      'A site that proves your expertise rather than an interchangeable directory listing: your angle, your publications, your references. It works while you are in meetings.',
      'Get found on your trade queries on Google, and cited in AI engine answers where a growing share of your clients now look for a name.',
      'A clear contact path, no endless form and no intermediary taking a cut. The prospect reaches you directly, the moment they have decided.',
    ],
  },
  therapeutes: {
    zigzagLede_fr: 'On travaille la confiance et le créneau, pas le décor : expliquer votre approche, rassurer, rendre la prise de rendez-vous évidente. Sans dépendre d\'une plateforme.',
    zigzagLede_en: 'We work trust and the booking slot, not the decor: explain your approach, reassure, make booking obvious. Without depending on a platform.',
    ctaSubtitle_fr: 'On regarde votre visibilité locale et votre prise de rendez-vous en 45 minutes, et on vous dit vite ce qui freine les demandes. Sans promesse en l\'air.',
    ctaSubtitle_en: 'We look at your local visibility and booking flow in 45 minutes, and tell you quickly what is holding requests back. No empty promises.',
    workflowBodies_fr: [
      'Votre approche expliquée sans jargon, votre cadre, vos avis : le nouveau patient hésitant est rassuré avant le premier échange, là où la décision se prend.',
      'Des créneaux visibles et réservables en quelques clics. Fini le téléphone qui sonne dans le vide et les allers-retours par mail qui découragent.',
      'Ressortir sur la recherche locale et la fiche Google, avec les avis en évidence. C\'est là que le patient choisit un praticien près de chez lui.',
    ],
    workflowBodies_en: [
      'Your approach explained without jargon, your setting, your reviews: the hesitant new patient is reassured before the first exchange, where the decision is made.',
      'Visible slots, bookable in a few clicks. No more calls going unanswered and discouraging email back-and-forth.',
      'Surface on local search and the Google listing, with reviews up front. That is where the patient picks a practitioner near them.',
    ],
  },
};

// ── DÉFAUT PARTAGÉ · 5 stades de maturité IA (génériques, crédibles, sentence case).
//    S'affiche toujours (jamais de fausse donnée client chiffrée). ──
const defaultDiagnosticStages = [
  {
    title_fr: 'Exploration',
    title_en: 'Exploration',
    body_fr: "Curiosité sans passage à l'action. Aucun outil IA en routine, données peu structurées. On se demande encore ce que l'IA pourrait changer concrètement.",
    body_en: 'Curiosity without action. No AI tool in routine use, loosely structured data. You are still wondering what AI could concretely change.',
    phase_fr: 'Niveau 1',
    phase_en: 'Level 1',
  },
  {
    title_fr: 'Expérimentation',
    title_en: 'Experimentation',
    body_fr: "Quelques personnes utilisent un assistant, sans cadre ni objectif partagé. Des essais isolés, aucun cas d'usage encore tenu en production.",
    body_en: 'A few people use an assistant, with no shared frame or goal. Isolated trials, no use case held in production yet.',
    phase_fr: 'Niveau 2',
    phase_en: 'Level 2',
  },
  {
    title_fr: 'Adoption',
    title_en: 'Adoption',
    body_fr: "Un à trois workflows actifs, avec des résultats mesurés. Premières formations, données en partie structurées. L'IA produit de la valeur sur un périmètre cadré.",
    body_en: 'One to three active workflows, with measured results. First training, partly structured data. AI produces value on a framed scope.',
    phase_fr: 'Niveau 3',
    phase_en: 'Level 3',
  },
  {
    title_fr: 'Intégration',
    title_en: 'Integration',
    body_fr: "L'IA est branchée sur vos process principaux. Gouvernance posée, équipes formées, mesure systématique. Le déploiement passe à l'échelle.",
    body_en: 'AI is wired into your main processes. Governance in place, trained teams, systematic measurement. Deployment scales up.',
    phase_fr: 'Niveau 4',
    phase_en: 'Level 4',
  },
  {
    title_fr: 'Transformation',
    title_en: 'Transformation',
    body_fr: "L'IA est au cœur du métier et procure un avantage durable. Stack complète, itération continue. Le très petit nombre d'entreprises au sommet.",
    body_en: 'AI sits at the heart of the trade and gives a lasting edge. Full stack, continuous iteration. The very few companies at the top.',
    phase_fr: 'Niveau 5',
    phase_en: 'Level 5',
  },
];

// ── DÉFAUT PARTAGÉ · stack Waimia (2 groupes : modèles Claude + intégration/infra).
//    Génériques, vrais composants de la stack, jamais de claim client chiffré. ──
const defaultStackPills = [
  { label_fr: 'Claude Opus', label_en: 'Claude Opus', kind: 'primary' as const },
  { label_fr: 'Claude Sonnet', label_en: 'Claude Sonnet', kind: 'primary' as const },
  { label_fr: 'Connecteurs MCP', label_en: 'MCP connectors', kind: 'open' as const },
  { label_fr: 'CRM et e-mail', label_en: 'CRM and email', kind: 'neutral' as const },
  { label_fr: 'PostgreSQL', label_en: 'PostgreSQL', kind: 'open' as const },
  { label_fr: 'Vercel', label_en: 'Vercel', kind: 'neutral' as const },
  { label_fr: 'Journal d\'audit', label_en: 'Audit trail', kind: 'open' as const },
];

// ── DÉFAUT PARTAGÉ · badges de réassurance finale (génériques, pas de claim non détenu). ──
const defaultTrustBadges = [
  // Pivot IA 2026-10 : uniquement le référencement détenu + des engagements factuels.
  // Retirés : « Claude certified », « AI Act ready », « RGPD », « ISO 27001 » (non détenus).
  { glyph: '◉', label_fr: 'Activateur France Num', label_en: 'France Num activator' },
  { glyph: '✓', label_fr: 'Audit gratuit de 45 min', label_en: 'Free 45-min audit' },
  { glyph: '⚿', label_fr: 'Code et workflows transférés', label_en: 'Code and workflows handed over' },
  { glyph: '⚖', label_fr: 'Validation humaine sur les actions sensibles', label_en: 'Human validation on sensitive actions' },
];

// ── Illustration duotone de la prose (habillage editorial) · pool DISJOINT du pool
//    workflow : 0 répétition dans la page. Assignée par slug (content-matched), 1 figure/page. ──
const PROSE_ILLUSTRATIONS: Record<string, { src: string; alt_fr: string; alt_en: string }> = {
  agence: { src: '/images/illustrations/ds/man-and-woman-hi-paper.webp', alt_fr: 'Illustration : deux personnes se saluent, collaboration', alt_en: 'Illustration: two people greeting, collaboration' },
  batiment: { src: '/images/illustrations/ds/gentleman-craftsman-go-work-paper.webp', alt_fr: 'Illustration : artisan en route vers le chantier', alt_en: 'Illustration: a craftsman heading to work' },
  comptabilite: { src: '/images/illustrations/ds/money-in-the-pig-paper.webp', alt_fr: 'Illustration : tirelire, gestion des chiffres', alt_en: 'Illustration: piggy bank, managing the numbers' },
  conseil: { src: '/images/illustrations/ds/woman-and-people-paper.webp', alt_fr: 'Illustration : une intervenante face a un groupe', alt_en: 'Illustration: a speaker facing a group' },
  'e-commerce': { src: '/images/illustrations/ds/fruits-paper.webp', alt_fr: 'Illustration : etal de produits', alt_en: 'Illustration: a display of products' },
  esn: { src: '/images/illustrations/ds/computer-health-paper.webp', alt_fr: 'Illustration : poste informatique sain, services IT', alt_en: 'Illustration: a healthy workstation, IT services' },
  formation: { src: '/images/illustrations/ds/super-girl-paper.webp', alt_fr: 'Illustration : montee en competence', alt_en: 'Illustration: building up skills' },
  industrie: { src: '/images/illustrations/ds/no-no-yes-paper.webp', alt_fr: 'Illustration : controle qualite, tri des options', alt_en: 'Illustration: quality control, sorting options' },
  'liberal-independant': { src: '/images/illustrations/ds/pretty-woman-paper.webp', alt_fr: 'Illustration : professionnelle independante', alt_en: 'Illustration: an independent professional' },
  'services-b2b': { src: '/images/illustrations/ds/band-showing-tv-paper.webp', alt_fr: 'Illustration : demonstration face a un public', alt_en: 'Illustration: a demonstration in front of an audience' },
};
const DEFAULT_PROSE_ILLUSTRATION = { src: '/images/illustrations/ds/style-8-paper.webp', alt_fr: 'Illustration de marque', alt_en: 'Brand illustration' };

/**
 * Workflows câblés (feature-zigzag) : 1 rangée par workflow cible (max 4), média réel.
 * Le frontmatter ne porte que le libellé du workflow ; le corps décrit l'approche Waimia
 * (générique, crédible, jamais de chiffre client inventé). Dé-templatisé par secteur.
 */
function workflowRowsFor(data: SectorData, slug: string) {
  const sectorCopy = SECTOR_COPY[slug];
  return data.workflowsCible.slice(0, 4).map((wf, i) => {
    const img = WORKFLOW_ILLUSTRATIONS[i % WORKFLOW_ILLUSTRATIONS.length];
    return {
      kicker_fr: String(i + 1).padStart(2, '0'),
      kicker_en: String(i + 1).padStart(2, '0'),
      h3_fr: wf.charAt(0).toUpperCase() + wf.slice(1),
      h3_en: wf.charAt(0).toUpperCase() + wf.slice(1),
      body_fr: sectorCopy?.workflowBodies_fr[i] ?? "On câble ce workflow sur vos outils existants, avec votre équipe. Tout reste lisible et modifiable : pas de boîte noire, vous gardez la main.",
      body_en: sectorCopy?.workflowBodies_en[i] ?? 'We wire this workflow onto your existing tools, with your team. Everything stays readable and editable: no black box, you keep control.',
      media_src: img.src,
      media_alt_fr: img.alt_fr,
      media_alt_en: img.alt_en,
    };
  });
}

export const sectorTemplate = defineTemplate<SectorContext>({
  id: 'sector',
  sections: [
    // 1 · hero-sector variante editorial (masthead single-colonne, directive Simon 2026-06-29)
    {
      id: 'hero',
      build: ({ data, lang, slug }) => ({
        type: 'hero-sector',
        background: 'paper',
        hero_variant: 'editorial',
        dept_fr: '§ Secteur',
        dept_en: '§ Sector',
        h1_fr: data.title_fr,
        h1_en: data.title_en,
        lead_fr: data.description_fr,
        lead_en: data.description_en,
        tags: (data.kpis_fr ?? []).slice(0, 3).map((label, i) => ({
          label_fr: label,
          label_en: (data.kpis_en ?? [])[i] ?? label,
        })),
        cta: {
          label_fr: data.ctaPrimary_fr,
          label_en: data.ctaPrimary_en,
          href: localizeHref('/contact', lang),
          variant: 'primary',
        },
        cta_secondary: {
          label_fr: 'Voir les cas clients',
          label_en: 'See case studies',
          href: localizeHref('/cas-clients', lang),
          variant: 'ghost',
        },
        // Habillage editorial : illustration hero content-matched, DISJOINTE de la figure
        // de prose et du pool workflow de cette page (0 doublon page).
        illustration: secteurHeroIllustration(slug),
      } satisfies SectionByType<'hero-sector'>),
    },

    // 2 · pain-severity-list (ink) · friction, bascule contraste tôt
    {
      id: 'pains',
      build: ({ data }) => ({
        type: 'pain-severity-list',
        background: 'ink',
        kicker_fr: '§ Friction',
        kicker_en: '§ Friction',
        h2_fr: 'Là où ça bloque.',
        h2_en: 'Where it stalls.',
        items: data.pains_fr.slice(0, 6).map((p, i) => ({
          severity: SEVERITY_BY_INDEX[i] ?? 'medium',
          title_fr: p.title,
          title_en: data.pains_en[i]?.title ?? p.title,
          desc_fr: p.body,
          desc_en: data.pains_en[i]?.body ?? p.body,
        })),
      } satisfies SectionByType<'pain-severity-list'>),
    },

    // 3 · feature-zigzag (paper) · ce que Waimia câble · CONDITIONNEL (>= 2 workflows)
    {
      id: 'workflows',
      when: ({ data, slug }) => workflowRowsFor(data, slug).length >= 2,
      build: ({ data, slug }) => {
        const sectorCopy = SECTOR_COPY[slug];
        return {
          type: 'feature-zigzag',
          background: 'paper',
          kicker_fr: '§ Ce qu\'on câble',
          kicker_en: '§ What we wire',
          h2_fr: 'Des workflows, pas des <i>slides</i>.',
          h2_en: 'Workflows, not <i>slides</i>.',
          lede_fr: sectorCopy?.zigzagLede_fr ?? 'On déploie ce qui compte pour votre métier, branché sur vos outils, transféré à votre équipe.',
          lede_en: sectorCopy?.zigzagLede_en ?? 'We deploy what matters for your trade, wired to your tools, handed over to your team.',
          rows: workflowRowsFor(data, slug),
        } satisfies SectionByType<'feature-zigzag'>;
      },
    },

    // 4 · metric-callout-band (paper-2) · preuve marché chiffrée · CONDITIONNEL
    {
      id: 'market',
      when: ({ data }) => data.metricsHero.length > 0,
      build: ({ data }) => ({
        type: 'metric-callout-band',
        background: 'paper-2',
        context_fr: 'Étude · sources tierces. Chiffres de marché reportés (détail et sources nommées plus bas), pas nos résultats client.',
        context_en: 'Study · third-party sources. Reported market figures (details and named sources below), not our own client results.',
        metrics: data.metricsHero.slice(0, 3).map((m) => ({
          value: m.value,
          label_fr: m.label_fr,
          label_en: m.label_en,
        })),
      } satisfies SectionByType<'metric-callout-band'>),
    },

    // 5 · grille de cas injectée (paper) · preuve client (état vide géré dans le composant)
    {
      id: 'cases',
      build: ({ caseGrid }) => ({ ...caseGrid, background: 'paper' }) as SectionData,
    },

    // 6 · diagnostic-stages (paper-2) · orientation « où en êtes-vous » · défaut partagé
    {
      id: 'diagnostic',
      build: () => ({
        type: 'diagnostic-stages',
        background: 'paper-2',
        kicker_fr: '§ Les 5 niveaux',
        kicker_en: '§ The 5 levels',
        h2_fr: 'Où en est <i>votre entreprise</i> ?',
        h2_en: 'Where does <i>your company</i> stand?',
        lede_fr: 'Les référentiels convergent vers cinq niveaux. La plupart des PME se situent aux deux premiers, plus souvent qu\'elles ne le croient. Situez-vous franchement : surestimer son niveau nuit à la suite.',
        lede_en: 'Frameworks converge on five levels. Most SMBs sit at the first two, more often than they think. Place yourself honestly: overestimating your level harms what follows.',
        stages: defaultDiagnosticStages,
      } satisfies SectionByType<'diagnostic-stages'>),
    },

    // 7 · tech-stack-band (paper-3) · réassurance technique · défaut partagé.
    //    Fond `paper-3` (preset catalogue `tech-stack-band--paper-3`) : ancre la bande stack
    //    dans le ton papier le plus dense et casse la seule adjacence même-fond de la page
    //    (tech-stack + editorial-prose étaient tous deux `paper` sur les 12 secteurs).
    {
      id: 'stack',
      build: () => ({
        type: 'tech-stack-band',
        background: 'paper-3',
        kicker_fr: '§ La stack',
        kicker_en: '§ The stack',
        lead_fr: 'Une stack courte et auditable : des modèles Claude branchés à vos outils existants par connecteurs. Pas de refonte quand un connecteur suffit.',
        lead_en: 'A short, auditable stack: Claude models wired to your existing tools through connectors. No rebuild when a connector is enough.',
        pills: defaultStackPills,
      } satisfies SectionByType<'tech-stack-band'>),
    },

    // 8 · editorial-prose (paper) · corps de page GEO (PREMIER usage réel de html_fr).
    //    Émet la (les) section(s) du champ `body_sections` ; la figure duotone est dérivée
    //    du slug (habillage editorial, template concern) et posée sur la 1re prose (float droite).
    {
      id: 'prose',
      build: ({ data, slug }) => {
        const fig = PROSE_ILLUSTRATIONS[slug] ?? DEFAULT_PROSE_ILLUSTRATION;
        return (data.body_sections ?? []).map((p, i) => ({
          type: 'editorial-prose',
          ...(p.background ? { background: p.background } : {}),
          ...(p.maxWidth ? { maxWidth: p.maxWidth } : {}),
          // Float droite : la figure se niche en marge haute, le texte coule autour (desktop).
          ...(i === 0 ? { figures: [{ ...fig, side: 'right' as const }] } : {}),
          html_fr: p.html_fr,
          ...(p.html_en ? { html_en: p.html_en } : {}),
        } satisfies SectionByType<'editorial-prose'>));
      },
    },

    // 9 · faq-accordion (paper-2) · questions fréquentes · conditionnel (>= 2 items)
    {
      id: 'faq',
      when: ({ data }) => Array.isArray(data.faq_fr) && data.faq_fr.length >= 2,
      build: ({ data }) => ({
        type: 'faq-accordion',
        background: 'paper-2',
        kicker_fr: '§ Questions fréquentes',
        kicker_en: '§ Frequently asked',
        h2_fr: 'Ce que les dirigeants nous demandent.',
        h2_en: 'What leaders ask us.',
        open_first: true,
        items: (data.faq_fr ?? []).map((f, i) => ({
          q_fr: f.q,
          q_en: (data.faq_en ?? [])[i]?.q ?? f.q,
          a_fr: f.a,
          a_en: (data.faq_en ?? [])[i]?.a ?? f.a,
        })),
      } satisfies SectionByType<'faq-accordion'>),
    },

    // 10 · related-links (paper-3) · maillage interne · source unique internal-mesh
    {
      id: 'mesh',
      build: ({ slug, lang }) =>
        ({ ...meshForSecteur(slug, lang), background: 'paper-3' }) as unknown as SectionByType<'related-links'>,
    },

    // 11 · footer-cta-band (ink) · climax conversion · h2 avec fragment <i> (coloré accent)
    {
      id: 'cta',
      build: ({ data, lang, slug }) => {
        const sectorCopy = SECTOR_COPY[slug];
        return {
          type: 'footer-cta-band',
          background: 'ink',
          kicker_fr: '§ Votre terrain',
          kicker_en: '§ Your field',
          h2_fr: `${data.icp_fr} : on cadre votre <i>terrain</i>.`,
          h2_en: `${data.icp_en}: we frame your <i>field</i>.`,
          subtitle_fr: sectorCopy?.ctaSubtitle_fr ?? "On regarde votre contexte en 45 minutes et on vous dit vite si le terrain est opérable, sans promesse en l'air.",
          subtitle_en: sectorCopy?.ctaSubtitle_en ?? 'We look at your context in 45 minutes and tell you quickly whether the field is operationally viable, with no empty promises.',
          buttons: [
            {
              label_fr: data.ctaPrimary_fr,
              label_en: data.ctaPrimary_en,
              href: localizeHref('/contact', lang),
              variant: 'accent',
            },
          ],
        } satisfies SectionByType<'footer-cta-band'>;
      },
    },

    // 12 · trust-badges-band (paper-3) · réassurance finale · défaut partagé
    {
      id: 'trust',
      build: () => ({
        type: 'trust-badges-band',
        background: 'paper-3',
        variant: 'strip',
        kicker_fr: 'Réassurance',
        kicker_en: 'Reassurance',
        badges: defaultTrustBadges,
      } satisfies SectionByType<'trust-badges-band'>),
    },
  ],
});
