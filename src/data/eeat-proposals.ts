// src/data/eeat-proposals.ts
// Content pack PARTAGÉ pour la page de proposition des 10 sections bento éditoriales E-E-A-T
// (/preview/eeat-propositions). NON catalogué tant que Simon n'a pas choisi (cf demande 2026-06-27).
//
// HONNÊTETÉ (cf src/data/proof-points.ts) : Waimia = studio solo, 0 client réel, 0 cas mesuré.
// => AUCUN témoignage client inventé. Le bloc « avis/review » = ENGAGEMENTS/GARANTIES + note honnête.
//
// Sources réelles : src/content/authors/simon-beros.json, src/content/secteurs/*, src/content/blog/*,
// src/content/outils/*, src/content/services/*. Routes : /secteurs/<slug>, /blog/<slug>,
// /ressources/outils/<slug>, /services/<slug>, /equipe/simon-beros.

import { NOINDEX_SITEMAP_PATHS } from './sitemap-noindex-exclude';

export interface EeatLink {
  /** Vrai si la page cible est en noindex : le libellé s'affiche sans lien. */
  noindex?: boolean;
  label: string;
  href: string;
  /** petit libellé de catégorie (kicker), ex. « Secteur », « Article ». */
  kicker?: string;
  /** accroche courte optionnelle. */
  lead?: string;
  /**
   * Illustration DS optionnelle par CIBLE de lien (stable cross-pages), révélée au survol
   * dans le cadre flottant de l'eeat-panel. Les deux variantes de fond ({ink} sur panneau
   * sombre, {paper} sur panneau clair) permettent l'assortiment au fond du composant.
   * Absente → la ligne ne participe simplement pas au reveal (rétrocompat totale).
   */
  media?: { ink: string; paper: string };
}

export interface EeatMilestone {
  year: string;
  label: string;
}

export interface EeatPack {
  author: {
    name: string;
    role: string;
    location: string;
    profileHref: string;
    initials: string;
    /** une phrase de posture (extrait bio). */
    bio: string;
    /** signature courte pour un colophon / ours. */
    signature: string;
  };
  expertise: string[];
  milestones: EeatMilestone[];
  sectors: EeatLink[];
  articles: EeatLink[];
  tools: EeatLink[];
  services: EeatLink[];
  /**
   * Liens de hub par famille (maillage interne) : chaque bloc secteurs/articles/services/outils
   * gagne un lien « voir tous » vers sa page d'index. Routes RÉELLES (vérifiées dans dist/client).
   */
  hubs: {
    /** Absent depuis le retrait du hub /secteurs (301 vers /services) : pas de lien « tous ». */
    sectors?: { label: string; href: string };
    articles: { label: string; href: string };
    services: { label: string; href: string };
    tools: { label: string; href: string };
  };
  /** Bloc « avis » honnête : engagements d'offre, PAS de témoignage client. */
  commitments: { label: string; detail: string }[];
  /** Note d'honnêteté à afficher près du bloc avis/preuves. */
  honestyNote: string;
  /**
   * Labels & certifications officiels. `src` = badge officiel présent dans public/logos ; absent,
   * le libellé `alt` est rendu en texte sobre (jamais de logo redessiné). `scope` précise
   * l'activité concernée : Meta Business Partner et Google Partner relèvent de la publicité et
   * de la visibilité, PAS de l'IA (aucun partenariat éditeur IA n'est revendiqué).
   */
  credentials?: { src?: string; alt: string; scope?: string; href?: string }[];
}

/**
 * Silo de maillage interne. La page hôte de l'eeat-panel déclare son silo ; le composant
 * sélectionne alors le jeu de liens cohérent (services / outil / secteurs / articles).
 * 'generic' = jeu historique (fallback rétrocompatible pour toute instance sans champ `silo`).
 */
export type EeatSilo = 'acquisition' | 'commercial' | 'ops' | 'hub' | 'generic';

/** Jeu de liens d'un silo : 3 services (hub en pose 4, filtré à 3 au rendu), 1 outil, 3 secteurs, 3 articles. */
export interface EeatSiloSet {
  services: EeatLink[];
  tool: EeatLink;
  sectors: EeatLink[];
  articles: EeatLink[];
}

// Illustration DS (paire ink/paper) par nom de fichier, révélée au survol dans le cadre
// flottant de l'eeat-panel. Fichiers réels : public/images/illustrations/ds/<name>-{ink,paper}.webp.
const ds = (name: string) => ({
  ink: `/images/illustrations/ds/${name}-ink.webp`,
  paper: `/images/illustrations/ds/${name}-paper.webp`,
});

// ─── Catalogues de liens (SOURCE UNIQUE) : le pack ET les silos y puisent, 0 duplication. ───
// Libellés = intitulés métier (couche marque OK sur les hubs système). Routes RÉELLES vérifiées
// contre src/content/services · src/content/secteurs · src/content/blog · src/content/outils ·
// src/content/diagnostics (0 lien inventé).
const SERVICE_LINKS: Record<string, EeatLink> = {
  'seo-geo-contenu': { label: 'SEO, GEO et contenu', href: '/services/seo-geo-contenu', kicker: 'Service', media: ds('oh-men-boy') },
  'landing-pages-tunnels': { label: 'Landing pages et tunnels', href: '/services/landing-pages-tunnels', kicker: 'Service', media: ds('style-8') },
  'systeme-acquisition': { label: "Système d'acquisition", href: '/services/systeme-acquisition', kicker: 'Service', media: ds('snow-movement') },
  'systeme-commercial': { label: 'Système commercial', href: '/services/systeme-commercial', kicker: 'Service', media: ds('no-no-yes') },
  'prospection-automatisee': { label: 'Prospection automatisée', href: '/services/prospection-automatisee', kicker: 'Service', media: ds('band-showing-tv') },
  'crm-scoring-routing': { label: 'CRM, scoring et routage', href: '/services/crm-scoring-routing', kicker: 'Service', media: ds('chess') },
  'systemes-operationnels-ia': { label: 'Automatisation IA pour PME', href: '/services/systemes-operationnels-ia', kicker: 'Service', media: ds('style-st') },
  'automatisations': { label: 'Automatisations', href: '/services/automatisations', kicker: 'Service', media: ds('gentleman-craftsman-go-work') },
  'agents-ia': { label: 'Agents IA', href: '/services/agents-ia', kicker: 'Service', media: ds('its-x') },
  'consultant-ia-claude': { label: 'Consultant IA Claude', href: '/services/consultant-ia-claude', kicker: 'Service', media: ds('pretty-woman') },
  'site-web-ia': { label: 'Site web intelligent', href: '/services/site-web-ia', kicker: 'Service', media: ds('computer-health') },
};

// Intégration 2026-10 : seuls les secteurs encore publiés (les autres sont redirigés en 301
// vers /services, cf src/data/depublished.ts). Un silo ne lie jamais une URL redirigée.
const SECTOR_LINKS: Record<string, EeatLink> = {
  'batiment': { label: 'Bâtiment & artisans', href: '/secteurs/batiment', kicker: 'Secteur' },
  'e-commerce': { label: 'E-commerce', href: '/secteurs/e-commerce', kicker: 'Secteur' },
  'startup-logiciel': { label: 'Startup & éditeur logiciel', href: '/secteurs/startup-logiciel', kicker: 'Secteur' },
};

const ARTICLE_LINKS: Record<string, EeatLink> = {
  'seo-geo': {
    label: 'SEO & GEO : être cité par les IA génératives',
    href: '/blog/seo-geo-etre-cite-par-les-ia-generatives',
    kicker: 'Article',
    lead: 'Baliser un site pour que Google et les moteurs génératifs citent votre marque.',
  },
  'pillar-ia-pme': {
    label: "L'IA pour les PME en 2026",
    href: '/blog/ia-pme-guide-complet-2026',
    kicker: 'Essai',
    lead: "Le tour d'horizon : où l'IA crée vraiment de la valeur pour une PME.",
  },
  'crm-10-jours': {
    label: 'Câbler son CRM en 10 jours',
    href: '/blog/cabler-son-crm-en-10-jours',
    kicker: 'Guide',
    lead: 'La méthode pour brancher un CRM utile, scoring compris, en deux semaines.',
  },
  'n8n-zapier': {
    label: 'n8n vs Zapier en 2026',
    href: '/blog/avis-n8n-vs-zapier-2026',
    kicker: 'Comparatif',
    lead: "Quel orchestrateur d'automatisations selon votre stack et votre budget.",
  },
  'relances-b2b': {
    label: 'Automatiser les relances B2B sans SDR',
    href: '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil',
    kicker: 'Guide',
    lead: 'Relancer chaque lead au bon moment sans recruter un commercial dédié.',
  },
};

const TOOL_LINKS: Record<string, EeatLink> = {
  'calculateur-roi-ia': {
    label: 'Calculateur de ROI IA',
    href: '/ressources/outils/calculateur-roi-ia',
    kicker: 'Outil',
    lead: "Estimez le retour d'un site instrumenté sur votre acquisition, à partir de vos chiffres.",
    media: ds('money-in-the-pig'),
  },
  'diagnostic-maturite-ia': {
    label: 'Diagnostic de maturité IA',
    href: '/ressources/diagnostics/maturite-ia',
    kicker: 'Diagnostic',
    lead: 'Situez votre organisation et repérez vos premiers chantiers IA à fort impact.',
    media: ds('chess'),
  },
};

const svc = (...ids: string[]): EeatLink[] => ids.map((id) => SERVICE_LINKS[id]);
// Un secteur dont la page est en noindex (liste NOINDEX_SITEMAP_PATHS) reste affiché, mais
// SANS lien : le maillage ne pointe jamais une page que l'on demande aux moteurs d'ignorer.
// Le lien revient tout seul quand la page sort de la liste.
const sec = (...ids: string[]): EeatLink[] =>
  ids.map((id) => ({ ...SECTOR_LINKS[id], noindex: NOINDEX_SITEMAP_PATHS.has(SECTOR_LINKS[id].href) }));
const art = (...ids: string[]): EeatLink[] => ids.map((id) => ARTICLE_LINKS[id]);

export const EEAT_PACK: EeatPack = {
  author: {
    name: 'Simon Beros',
    role: 'Fondateur · Architecte de systèmes IA',
    location: 'Bordeaux, France',
    profileHref: '/equipe/simon-beros',
    initials: 'SB',
    bio: "Studio solo. Simon conçoit, câble et suit lui-même chaque mission : pas de junior qui découvre le sujet en même temps que vous, pas de pool de sous-traitants entre vous et le travail.",
    signature: 'Conçu, câblé et tenu en production par Simon Beros · Waimia, Bordeaux.',
  },
  expertise: [
    'Systèmes IA pour PME B2B',
    'RevOps & acquisition automatisée',
    'Pilotage data temps réel',
    'Stack Anthropic / Claude',
    'Process Intelligence',
  ],
  milestones: [
    { year: '2024', label: 'Fondation de Waimia · Montpellier' },
    { year: 'Avant', label: 'VirtuoseWeb · systèmes web et IA pour PME B2B' },
    { year: '2026', label: 'Claude, Claude Code et MCP en production' },
  ],
  // Pool historique (ordre préservé) : le composant n'affiche que les 3 premiers en mode
  // default (le hub « Tous les … → » compense la réduction). Les silos sélectionnent leur
  // propre sous-ensemble via EEAT_SILOS ; ce pool reste le fallback 'generic'.
  sectors: sec('batiment', 'e-commerce', 'startup-logiciel'),
  articles: art('seo-geo', 'pillar-ia-pme', 'crm-10-jours', 'n8n-zapier', 'relances-b2b'),
  tools: [TOOL_LINKS['calculateur-roi-ia']],
  // Ordre = les 3 étages du système d'abord (silo : contenu → tunnels → système
  // d'acquisition), puis le reste + les 2 hubs système (commercial, opérationnels). Le composant
  // n'affiche que les 3 premiers en mode default, donc les étages priment sur agents/consultant/hubs.
  services: svc(
    'systemes-operationnels-ia',
    'automatisations',
    'agents-ia',
    'consultant-ia-claude',
    'systeme-commercial',
    'systeme-acquisition',
    'seo-geo-contenu',
  ),
  hubs: {
    articles: { label: 'Tous les articles', href: '/blog' },
    services: { label: 'Tous les services', href: '/services' },
    tools: { label: 'Tous les outils', href: '/ressources/outils' },
  },
  commitments: [
    { label: 'Audit gratuit', detail: '45 minutes en visio, trois automatisations rentables repérées avant tout engagement.' },
    { label: 'Prix fixe transparent', detail: 'Périmètre et budget connus avant de signer, pas de dérive.' },
    { label: 'Formation incluse', detail: 'Documentation et passation : votre équipe est autonome à la livraison.' },
    { label: 'Zéro captivité', detail: 'Code, workflows et documentation transférés : vous gardez la main.' },
  ],
  honestyNote: 'Studio solo : un ingénieur, chaque mission documentée sur sa propre fiche.',
  credentials: [
    { src: '/logos/badge-france-num-activateur.png', alt: 'Activateur France Num', href: 'https://www.francenum.gouv.fr/activateurs/beros-simon' },
    // Confirmés par Simon (2026-10) : références du volet publicité et visibilité.
    { src: '/logos/badge-meta-business-partner.svg', alt: 'Meta Business Partner', scope: 'Publicité et visibilité' },
    // Pas de badge officiel Google Partner dans le repo → libellé texte.
    { alt: 'Google Partner', scope: 'Publicité et visibilité' },
  ],
};

// ─── Maillage interne par silo (source unique) ───
// Chaque silo = un jeu cohérent de 3 services + 1 outil + 3 secteurs + 3 articles.
// 'generic' REPRODUIT à l'identique le top-3 du pack (rétrocompat : instance sans champ `silo`).
// Le silo 'hub' pose 4 services (les 3 hubs système + site web) ; le composant filtre le lien
// qui pointe vers la page hôte (anti-self-link) et n'en affiche que 3.
export const EEAT_SILOS: Record<EeatSilo, EeatSiloSet> = {
  acquisition: {
    services: svc('systeme-acquisition', 'seo-geo-contenu', 'landing-pages-tunnels'),
    tool: TOOL_LINKS['calculateur-roi-ia'],
    sectors: sec('batiment', 'e-commerce', 'startup-logiciel'),
    articles: art('seo-geo', 'pillar-ia-pme', 'relances-b2b'),
  },
  commercial: {
    services: svc('systeme-commercial', 'prospection-automatisee', 'crm-scoring-routing'),
    tool: TOOL_LINKS['calculateur-roi-ia'],
    sectors: sec('batiment', 'e-commerce', 'startup-logiciel'),
    articles: art('crm-10-jours', 'relances-b2b', 'pillar-ia-pme'),
  },
  ops: {
    services: svc('systemes-operationnels-ia', 'automatisations', 'agents-ia'),
    tool: TOOL_LINKS['diagnostic-maturite-ia'],
    sectors: sec('batiment', 'e-commerce', 'startup-logiciel'),
    articles: art('n8n-zapier', 'pillar-ia-pme', 'crm-10-jours'),
  },
  hub: {
    // 4 services : les 3 hubs système + site web intelligent. Le composant retire le lien
    // égal à la page hôte (un hub ne s'auto-lie pas) → 3 liens affichés.
    services: svc('systemes-operationnels-ia', 'systeme-commercial', 'systeme-acquisition', 'automatisations'),
    tool: TOOL_LINKS['calculateur-roi-ia'],
    sectors: sec('batiment', 'e-commerce', 'startup-logiciel'),
    articles: art('pillar-ia-pme', 'seo-geo', 'crm-10-jours'),
  },
  generic: {
    services: svc('systemes-operationnels-ia', 'automatisations', 'agents-ia'),
    tool: TOOL_LINKS['calculateur-roi-ia'],
    sectors: sec('batiment', 'e-commerce', 'startup-logiciel'),
    articles: art('seo-geo', 'pillar-ia-pme', 'crm-10-jours'),
  },
};

/** Résout le jeu de liens d'un silo (fallback 'generic' pour undefined / valeur inconnue). */
export function eeatSiloSet(silo?: EeatSilo): EeatSiloSet {
  return (silo && EEAT_SILOS[silo]) || EEAT_SILOS.generic;
}

// Images éditoriales curées (public/images/editorial/, importées 2026-06-27 du dossier
// waimia-services). Style illustration éditoriale dans la palette DS (terracotta/crème/ink),
// utilisables comme média de cellule dans les variations visuelles (dashboard, colonnes accent).
export interface EeatImage {
  id: string;
  src: string;
  alt: string;
}

export const EEAT_IMAGES: EeatImage[] = [
  // — Lot curé d'origine (10) —
  { id: 'site-health', src: '/images/editorial/image-computer-health.webp', alt: "Ordinateur portable affichant une courbe de santé, supervision continue d'un système" },
  { id: 'augmented-self', src: '/images/editorial/womancomputer17.webp', alt: "Personne travaillant avec son double augmenté par l'IA" },
  { id: 'growth', src: '/images/editorial/stylemoneymoney.webp', alt: 'Colonnes de pièces croissantes, retour sur investissement' },
  { id: 'audience', src: '/images/editorial/bandshowingtv.webp', alt: "Public attentif devant un écran, capter l'attention" },
  { id: 'strategy', src: '/images/editorial/chess-style-16.webp', alt: 'Échiquier en mouvement, stratégie et décisions' },
  { id: 'trajectory', src: '/images/editorial/carontheroad.webp', alt: 'Voiture sur une route, trajectoire et cap' },
  { id: 'trust-team', src: '/images/editorial/menonhand.webp', alt: "Équipe portée dans une main, accompagnement de confiance" },
  { id: 'handshake', src: '/images/editorial/himanandwoman.webp', alt: 'Deux personnes se tendant la main, relation et rencontre' },
  { id: 'momentum', src: '/images/editorial/image-style17.webp', alt: 'Courbe rouge ascendante, élan et croissance' },
  { id: 'workspace', src: '/images/editorial/itsx.webp', alt: "Espace de travail marqué d'un grand X, lieu d'exécution" },
  // — Pilotage, données &amp; tableaux de bord —
  { id: 'dashboard-pilot', src: '/images/editorial/pretty-woman-style.webp', alt: 'Personne entourée de fenêtres de données reliées, pilotage en tableau de bord' },
  { id: 'planning', src: '/images/editorial/image-style-15.webp', alt: "Équipe devant des tableaux de cartes, atelier de planification" },
  { id: 'network-orchestration', src: '/images/editorial/imaspiderboss.webp', alt: 'Personne au centre de fils reliés à un public, orchestration et réseau' },
  { id: 'execution', src: '/images/editorial/image-st.webp', alt: "Mains sur un clavier dans une lueur rouge, exécution et mise en œuvre" },
  { id: 'financial-results', src: '/images/editorial/nowomancry.webp', alt: 'Billets, graphique en barres et courbe, résultats financiers' },
  // — Croissance, momentum &amp; trajectoire —
  { id: 'snowball-momentum', src: '/images/editorial/snow-movement.webp', alt: "Boule de neige grossissant sur une pente, effet cumulatif et momentum" },
  { id: 'progression', src: '/images/editorial/image-style-11.webp', alt: 'Coureur et petit avion à l’horizon, progression et ambition' },
  { id: 'investment', src: '/images/editorial/moneyinthepig.webp', alt: "Main glissant une pièce dans une fente, investissement" },
  { id: 'vitality', src: '/images/editorial/image-style-10.webp', alt: 'Cœur et tracé vital au cœur d’une jungle, vitalité organique' },
  { id: 'serene-signal', src: '/images/editorial/image-style-12.webp', alt: 'Tracé d’électrocardiogramme et nuages, signal vital serein' },
  // — Différenciation, positionnement &amp; conviction —
  { id: 'differentiation', src: '/images/editorial/image-style-5.webp', alt: "Une personne désignant un piment parmi des tomates, se différencier" },
  { id: 'conviction', src: '/images/editorial/homme-piment.webp', alt: 'Personne portant un piment géant devant des robots-tomates, porter une idée différente' },
  { id: 'comparison', src: '/images/editorial/image-style-5-2.webp', alt: 'Tomate et piment coupés côte à côte, comparaison sous la surface' },
  { id: 'standout', src: '/images/editorial/imasupergirl.webp', alt: "Personne se détachant d’une assemblée, se démarquer" },
  { id: 'leadership-distinction', src: '/images/editorial/womanandpeople.webp', alt: 'Personne en rouge tournée vers le haut devant une foule estompée, distinction et cap' },
  { id: 'omnichannel', src: '/images/editorial/image-style-4.webp', alt: 'Un même motif répété sur tous les écrans et supports, présence omnicanale' },
  // — Expertise, vision &amp; engagement —
  { id: 'vision-expertise', src: '/images/editorial/ohmenboy.webp', alt: 'Triptyque illumination, lecture de carte et regard d’expert, vision et expertise' },
  { id: 'commitment', src: '/images/editorial/burning-boat-style.webp', alt: "Bateaux en flammes face à une assemblée sur la plage, engagement sans retour en arrière" },
  { id: 'build-craft', src: '/images/editorial/gentlemanhandcraftergoworknow.webp', alt: "Personne casquée travaillant sur un ordinateur devant un public, bâtir et exécuter" },
  { id: 'clarity', src: '/images/editorial/image-style.webp', alt: 'Personne face à plusieurs idées en suspension, clarifier la réflexion' },
  { id: 'product-craft', src: '/images/editorial/image-style-7.webp', alt: "Sélection minutieuse d’un élément parmi d’autres, soin du détail" },
  { id: 'personas', src: '/images/editorial/image-style-8.webp', alt: "Profils étudiés en éprouvettes, segmentation et personas" },
  // — Qualification, décision &amp; risques —
  { id: 'qualification', src: '/images/editorial/nonoyes.webp', alt: 'Triptyque de signaux d’arrêt puis de feu vert, qualifier et décider' },
  { id: 'overwhelm', src: '/images/editorial/image-style-6.webp', alt: "Personne submergée par l’afflux, surcharge à canaliser" },
  { id: 'obsolete-site', src: '/images/editorial/computercrashinlandscape.webp', alt: "Vieil ordinateur à l’écran fissuré envahi par la nature, site obsolète" },
  { id: 'decay-maintenance', src: '/images/editorial/fruits.webp', alt: 'Une pomme du frais au gâté, dégradation et entretien dans le temps' },
  { id: 'secure-recover', src: '/images/editorial/piratemoney.webp', alt: 'Recyclage, pavillon pirate et portefeuille, récupérer et sécuriser sa valeur' },
  { id: 'urgency-path', src: '/images/editorial/peopleandicecreamcar.webp', alt: 'File de personnes longeant un véhicule d’urgence, parcours et priorité' },
];

