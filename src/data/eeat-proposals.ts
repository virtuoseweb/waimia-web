// src/data/eeat-proposals.ts
// Content pack PARTAGÉ pour la page de proposition des 10 sections bento éditoriales E-E-A-T
// (/preview/eeat-propositions). NON catalogué tant que Simon n'a pas choisi (cf demande 2026-06-27).
//
// HONNÊTETÉ (cf src/data/proof-points.ts) : Waimia = studio solo, 0 client réel, 0 cas mesuré.
// => AUCUN témoignage client inventé. Le bloc « avis/review » = ENGAGEMENTS/GARANTIES + note honnête.
//
// Sources réelles : src/content/authors/simon-beros.mdx, src/content/secteurs/*, src/content/blog/*,
// src/content/outils/*, src/content/services/*. Routes : /secteurs/<slug>, /blog/<slug>,
// /ressources/outils/<slug>, /services/<slug>, /equipe/simon-beros.

export interface EeatLink {
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
    sectors: { label: string; href: string };
    articles: { label: string; href: string };
    services: { label: string; href: string };
    tools: { label: string; href: string };
  };
  /** Bloc « avis » honnête : engagements d'offre, PAS de témoignage client. */
  commitments: { label: string; detail: string }[];
  /** Note d'honnêteté à afficher près du bloc avis/preuves. */
  honestyNote: string;
  /** Labels & certifications officiels (badges couleur, ex. France Num, Meta Business Partner). */
  credentials?: { src: string; alt: string }[];
}

export const EEAT_PACK: EeatPack = {
  author: {
    name: 'Simon Beros',
    role: 'Fondateur · architecte systèmes IA pour PME',
    location: 'Montpellier, France',
    profileHref: '/equipe/simon-beros',
    initials: 'SB',
    bio: "Studio solo. Simon conçoit, câble et suit lui-même chaque mission : pas de junior qui découvre le sujet en même temps que vous, pas de pool de sous-traitants entre vous et le travail.",
    signature: 'Conçu, câblé et tenu en production par Simon Beros · Waimia, Montpellier.',
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
  sectors: [
    { label: 'Bâtiment & artisans', href: '/secteurs/batiment', kicker: 'Secteur' },
    { label: 'E-commerce', href: '/secteurs/e-commerce', kicker: 'Secteur' },
    { label: 'Libéraux & indépendants', href: '/secteurs/liberal-independant', kicker: 'Secteur' },
    { label: 'Services B2B', href: '/secteurs/services-b2b', kicker: 'Secteur' },
    { label: 'Startup & éditeur logiciel', href: '/secteurs/startup-logiciel', kicker: 'Secteur' },
    { label: 'Thérapeutes & bien-être', href: '/secteurs/therapeutes', kicker: 'Secteur' },
  ],
  articles: [
    {
      label: 'SEO & GEO : être cité par les IA génératives',
      href: '/blog/seo-geo-etre-cite-par-les-ia-generatives',
      kicker: 'Article',
      lead: 'Baliser un site pour que Google et les moteurs génératifs citent votre marque.',
    },
    {
      label: "L'IA pour les PME en 2026",
      href: '/blog/essai-pillar-ia-pme-2026',
      kicker: 'Essai',
      lead: 'Le tour d\'horizon : où l\'IA crée vraiment de la valeur pour une PME.',
    },
    {
      label: 'Câbler son CRM en 10 jours',
      href: '/blog/cabler-son-crm-en-10-jours',
      kicker: 'Guide',
      lead: 'La méthode pour brancher un CRM utile, scoring compris, en deux semaines.',
    },
    {
      label: 'n8n vs Zapier en 2026',
      href: '/blog/avis-n8n-vs-zapier-2026',
      kicker: 'Comparatif',
      lead: 'Quel orchestrateur d\'automatisations selon votre stack et votre budget.',
    },
    {
      label: 'Automatiser les relances B2B sans SDR',
      href: '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil',
      kicker: 'Guide',
      lead: 'Relancer chaque lead au bon moment sans recruter un commercial dédié.',
    },
  ],
  tools: [
    {
      label: 'Calculateur de ROI IA',
      href: '/ressources/outils/calculateur-roi-ia',
      kicker: 'Outil',
      lead: 'Estimez le retour d\'un site instrumenté sur votre acquisition, à partir de vos chiffres.',
      media: {
        ink: '/images/illustrations/ds/money-in-the-pig-ink.webp',
        paper: '/images/illustrations/ds/money-in-the-pig-paper.webp',
      },
    },
  ],
  // Ordre = les 3 étages du système d'abord (silo : contenu → tunnels → système
  // d'acquisition), puis le reste. Le composant n'affiche que les 3 premiers en mode
  // default (le hub « Tous les services → » compense), donc les étages priment sur agents/consultant.
  services: [
    {
      label: 'SEO, GEO et contenu',
      href: '/services/seo-geo-contenu',
      kicker: 'Service',
      media: {
        ink: '/images/illustrations/ds/oh-men-boy-ink.webp',
        paper: '/images/illustrations/ds/oh-men-boy-paper.webp',
      },
    },
    {
      label: 'Landing pages et tunnels',
      href: '/services/landing-pages-tunnels',
      kicker: 'Service',
      media: {
        ink: '/images/illustrations/ds/style-8-ink.webp',
        paper: '/images/illustrations/ds/style-8-paper.webp',
      },
    },
    {
      label: 'Systèmes d\'acquisition et de conversion',
      href: '/services/systeme-acquisition',
      kicker: 'Service',
      media: {
        ink: '/images/illustrations/ds/snow-movement-ink.webp',
        paper: '/images/illustrations/ds/snow-movement-paper.webp',
      },
    },
    {
      label: 'Agents IA',
      href: '/services/agents-ia',
      kicker: 'Service',
      media: {
        ink: '/images/illustrations/ds/its-x-ink.webp',
        paper: '/images/illustrations/ds/its-x-paper.webp',
      },
    },
    {
      label: 'Consultant IA Claude',
      href: '/services/consultant-ia-claude',
      kicker: 'Service',
      media: {
        ink: '/images/illustrations/ds/pretty-woman-ink.webp',
        paper: '/images/illustrations/ds/pretty-woman-paper.webp',
      },
    },
  ],
  hubs: {
    sectors: { label: 'Tous les secteurs', href: '/secteurs' },
    articles: { label: 'Tous les articles', href: '/blog' },
    services: { label: 'Tous les services', href: '/services' },
    tools: { label: 'Tous les outils', href: '/ressources/outils' },
  },
  commitments: [
    { label: 'Audit 5 jours', detail: 'Diagnostic du parcours, livrable chiffré avant tout engagement.' },
    { label: 'Prix fixe transparent', detail: 'Périmètre et budget connus avant de signer, pas de dérive.' },
    { label: 'Formation incluse', detail: 'Documentation et passation : votre équipe est autonome à la livraison.' },
    { label: 'Zéro captivité', detail: 'Code, balisage et docs transférés : vous gardez la stack.' },
  ],
  honestyNote: 'Studio solo · premiers cas clients en cours de rédaction.',
  credentials: [
    { src: '/logos/badge-france-num-activateur.png', alt: 'Activateur France Num' },
    { src: '/logos/badge-meta-business-partner.svg', alt: 'Meta Business Partner' },
  ],
};

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
  { id: 'site-health', src: '/images/editorial/image-computer-health.webp', alt: "Ordinateur portable affichant une courbe de santé, monitoring d'un site en continu" },
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

