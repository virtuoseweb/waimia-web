// Waimia · Habillage editorial des heros de pages contenu (motif « illustration
// duotone + titre en overlap », directive Simon 2026-07-16). Source UNIQUE, content-matched.
//
// Pool d'illustrations duotone : public/images/illustrations/ds/<motif>-{paper,ink}.webp.
// Chaque hero de page contenu (blog, secteur, outil, implantation) recoit un motif choisi
// pour EVOQUER le sujet de la page, avec un alt bilingue soigne. Les heros utilisent tous un
// fond paper → variante `-paper`. `side` alterne pour un rythme editorial (gauche/droite).
//
// Regles de disjonction (0 doublon sur une meme page) :
//  - les heros de cas clients reservent : band-showing-tv, fruits, super-girl,
//    gentleman-craftsman-go-work, pretty-woman → evites ici quand un meilleur match existe.
//  - sur une page SECTEUR, le hero doit differer de la figure de prose de CETTE page
//    (map PROSE_ILLUSTRATIONS dans secteurs/[...slug].astro) ET du pool workflow
//    (woman-computer / money-money / men-on-hand / chess). Les assignations ci-dessous
//    respectent cette contrainte par slug.

import type { Silo } from '../data/taxonomies';

export interface HeroIllustration {
  src: string;
  alt_fr: string;
  alt_en: string;
  side: 'left' | 'right';
}

// Catalogue des motifs reference ici → alt bilingue (le src est derive du motif + fond).
// N'utiliser que des motifs « sujet isole sur fond paper » (le fond clair se fond dans la
// page en `mix-blend-mode: multiply` ; les motifs plein-cadre feraient un rectangle colle).
const ALT: Record<string, { fr: string; en: string }> = {
  'man-and-woman-hi': { fr: 'Illustration : deux personnes se saluent, relation client', en: 'Illustration: two people greeting, client relationship' },
  'men-on-hand': { fr: 'Illustration : une main qui porte une équipe, cadre et gouvernance', en: 'Illustration: a hand carrying a team, framing and governance' },
  'money-in-the-pig': { fr: 'Illustration : une tirelire, revenus et acquisition', en: 'Illustration: a piggy bank, revenue and acquisition' },
  'money-money': { fr: 'Illustration : des piles de pièces qui montent, retour sur investissement', en: 'Illustration: rising stacks of coins, return on investment' },
  'computer-health': { fr: 'Illustration : un poste informatique sain, outillage logiciel', en: 'Illustration: a healthy workstation, software tooling' },
  'woman-and-people': { fr: 'Illustration : une intervenante face à un groupe, transmission', en: 'Illustration: a speaker facing a group, knowledge transfer' },
  'woman-computer': { fr: 'Illustration : une personne au travail sur son poste, studio', en: 'Illustration: a person at work at their desk, studio' },
  chess: { fr: "Illustration : une pièce d'échecs, stratégie et maturité", en: 'Illustration: a chess piece, strategy and maturity' },
  'style-8': { fr: 'Illustration : des silhouettes réparties par paliers, niveaux', en: 'Illustration: figures arranged by tiers, levels' },
  'style-11': { fr: 'Illustration : une silhouette qui court, élan et visibilité', en: 'Illustration: a running figure, momentum and visibility' },
  'style-12': { fr: 'Illustration : une courbe de signal continue, pilotage et mesure', en: 'Illustration: a continuous signal line, steering and measurement' },
};

/** Construit l'objet illustration (fond paper par defaut, cf heros de pages contenu). */
function build(motif: string, side: 'left' | 'right', bg: 'paper' | 'ink' = 'paper'): HeroIllustration {
  const variant = bg === 'ink' ? 'ink' : 'paper';
  const alt = ALT[motif] ?? ALT['style-8'];
  return {
    src: `/images/illustrations/ds/${motif}-${variant}.webp`,
    alt_fr: alt.fr,
    alt_en: alt.en,
    side,
  };
}

// ── Blog · par silo editorial (SILOS, src/data/taxonomies.ts) ──
const BLOG_BY_CATEGORY: Record<Silo, HeroIllustration> = {
  automatisation: build('computer-health', 'right'),
  agents: build('man-and-woman-hi', 'left'),
  claude: build('style-11', 'right'),
  applications: build('woman-computer', 'left'),
  commercial: build('man-and-woman-hi', 'right'),
  acquisition: build('money-in-the-pig', 'left'),
  donnees: build('style-12', 'right'),
  conseil: build('chess', 'left'),
  conformite: build('men-on-hand', 'right'),
  formation: build('woman-and-people', 'left'),
  studio: build('style-8', 'right'),
};
export function blogHeroIllustration(category?: string): HeroIllustration {
  return (category && BLOG_BY_CATEGORY[category as Silo]) || build('style-8', 'right');
}

// ── Outils · par slug ──
const OUTIL_BY_SLUG: Record<string, HeroIllustration> = {
  'calculateur-roi-ia': build('money-money', 'right'),
  'score-maturite-ia': build('chess', 'left'),
};
export function outilHeroIllustration(slug: string): HeroIllustration {
  return OUTIL_BY_SLUG[slug] || build('style-8', 'right');
}
/** Illustration de hero réellement choisie pour l'outil (undefined = le hero retombe sur le
 *  motif générique ; les cartes du hub ne le reprennent pas, cf card-visual.ts). */
export function outilHeroOverride(slug: string): HeroIllustration | undefined {
  return OUTIL_BY_SLUG[slug];
}

// ── Secteurs · par slug (disjoint de la figure de prose de la page + pool workflow) ──
const SECTEUR_BY_SLUG: Record<string, HeroIllustration> = {
  agence: build('style-11', 'right'),
  batiment: build('man-and-woman-hi', 'left'),
  comptabilite: build('style-8', 'right'),
  conseil: build('man-and-woman-hi', 'left'),
  'e-commerce': build('money-in-the-pig', 'right'),
  esn: build('style-12', 'left'),
  formation: build('woman-and-people', 'right'),
  industrie: build('style-8', 'left'),
  'liberal-independant': build('man-and-woman-hi', 'left'),
  'services-b2b': build('woman-and-people', 'right'),
  'startup-logiciel': build('computer-health', 'right'),
  therapeutes: build('style-12', 'left'),
};
export function secteurHeroIllustration(slug: string): HeroIllustration | undefined {
  return SECTEUR_BY_SLUG[slug];
}

// ── Implantations · par slug ──
const IMPLANTATION_BY_SLUG: Record<string, HeroIllustration> = {
  montpellier: build('car-on-the-road', 'right'),
  bordeaux: build('man-and-woman-hi', 'left'),
};
export function implantationHeroIllustration(slug: string): HeroIllustration | undefined {
  return IMPLANTATION_BY_SLUG[slug];
}
