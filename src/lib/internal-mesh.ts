/**
 * internal-mesh.ts · Source unique de derivation des liens connexes (strat 11 maillage interne).
 *
 * Fournit un REGISTRE d'entites canoniques (routes reelles verifiees) + des fonctions
 * `meshFor*` qui retournent un objet `data` pour la section cataloguee `related-links`
 * (shape : packages/ds-kernel/src/sections/related-links/schema.ts).
 *
 * Regles dures :
 *  - 0 lien fabrique : toute href provient du registre ci-dessous (routes reelles).
 *  - 0 self-link : une page ne se linke jamais elle-meme (filtre par slug courant).
 *  - robuste : un slug inconnu retombe sur le hub pertinent, jamais d'erreur.
 *
 * Consomme par les templates (etape suivante, hors de ce fichier). Ce module ne rend rien :
 * il derive de la DATA. Labels concis, voix active, 0 tiret cadratin (rule 58).
 */

type Lang = 'fr' | 'en';

/** Une entite canonique : sa route reelle + libelles courts bilingues. */
interface MeshLink {
  href: string;
  label_fr: string;
  label_en: string;
  desc_fr?: string;
  desc_en?: string;
}

// ───────────────────────────── Registre canonique (routes reelles verifiees) ─────────────────────────────

/** Hubs services (les 2 offres). */
const SERVICES: Record<string, MeshLink> = {
  'site-web-intelligent': {
    href: '/services/site-web-intelligent',
    label_fr: 'Site Web Intelligent',
    label_en: 'Intelligent Website',
  },
  'integrateur-claude': {
    href: '/services/integrateur-claude',
    label_fr: 'Intégrateur Claude',
    label_en: 'Claude Integrator',
  },
  'agents-ia': {
    href: '/services/agents-ia',
    label_fr: 'Agents IA',
    label_en: 'AI Agents',
  },
  'consultant-ia-claude': {
    href: '/services/consultant-ia-claude',
    label_fr: 'Consultant IA Claude',
    label_en: 'Claude AI Consultant',
  },
  'content-marketing-intelligent': {
    href: '/services/content-marketing-intelligent',
    label_fr: 'Content marketing intelligent',
    label_en: 'Intelligent content marketing',
  },
  'landing-page-scoring': {
    href: '/services/landing-page-scoring',
    label_fr: 'Landing page & scoring',
    label_en: 'Landing page & scoring',
  },
  'machine-outbound': {
    href: '/services/machine-outbound',
    label_fr: 'Machine outbound',
    label_en: 'Outbound machine',
  },
  'maintenance-growth': {
    href: '/services/maintenance-growth',
    label_fr: 'Maintenance & growth',
    label_en: 'Maintenance & growth',
  },
};

/** Cas-usages (5). */
const CAS_USAGES: Record<string, MeshLink> = {
  'generer-plus-de-leads': {
    href: '/cas-usages/generer-plus-de-leads',
    label_fr: 'Générer plus de leads',
    label_en: 'Generate more leads',
  },
  'standardiser-processus': {
    href: '/cas-usages/standardiser-processus',
    label_fr: 'Standardiser les processus',
    label_en: 'Standardize processes',
  },
  'centraliser-donnees': {
    href: '/cas-usages/centraliser-donnees',
    label_fr: 'Centraliser les données',
    label_en: 'Centralize data',
  },
  'reduire-reporting': {
    href: '/cas-usages/reduire-reporting',
    label_fr: 'Réduire le temps de reporting',
    label_en: 'Cut reporting time',
  },
  'reduire-temps-cms': {
    href: '/cas-usages/reduire-temps-cms',
    label_fr: 'Réduire le temps sur le CMS',
    label_en: 'Cut time on the CMS',
  },
};

/** Secteurs (12). */
const SECTEURS: Record<string, MeshLink> = {
  conseil: { href: '/secteurs/conseil', label_fr: 'Conseil', label_en: 'Consulting' },
  comptabilite: { href: '/secteurs/comptabilite', label_fr: 'Comptabilité', label_en: 'Accounting' },
  agence: { href: '/secteurs/agence', label_fr: 'Agence', label_en: 'Agency' },
  industrie: { href: '/secteurs/industrie', label_fr: 'Industrie', label_en: 'Industry' },
  formation: { href: '/secteurs/formation', label_fr: 'Formation', label_en: 'Training' },
  esn: { href: '/secteurs/esn', label_fr: 'ESN', label_en: 'IT services' },
  batiment: { href: '/secteurs/batiment', label_fr: 'Bâtiment', label_en: 'Construction' },
  'e-commerce': { href: '/secteurs/e-commerce', label_fr: 'E-commerce', label_en: 'E-commerce' },
  'liberal-independant': {
    href: '/secteurs/liberal-independant',
    label_fr: 'Libéral & indépendant',
    label_en: 'Freelance & independent',
  },
  'services-b2b': { href: '/secteurs/services-b2b', label_fr: 'Services B2B', label_en: 'B2B services' },
  'startup-logiciel': {
    href: '/secteurs/startup-logiciel',
    label_fr: 'Startup logiciel',
    label_en: 'Software startup',
  },
  therapeutes: { href: '/secteurs/therapeutes', label_fr: 'Thérapeutes', label_en: 'Therapists' },
};

/** Diagnostics, outils, comparatifs, guides (sous /ressources). */
const RESSOURCES: Record<string, MeshLink> = {
  'diagnostics/maturite-ia': {
    href: '/ressources/diagnostics/maturite-ia',
    label_fr: 'Diagnostic maturité IA',
    label_en: 'AI maturity diagnostic',
  },
  'diagnostics/site-web-intelligent': {
    href: '/ressources/diagnostics/site-web-intelligent',
    label_fr: 'Diagnostic site web',
    label_en: 'Website diagnostic',
  },
  'outils/calculateur-roi-ia': {
    href: '/ressources/outils/calculateur-roi-ia',
    label_fr: 'Calculateur de ROI IA',
    label_en: 'AI ROI calculator',
  },
  'comparatifs/claude-vs-chatgpt-pme': {
    href: '/ressources/comparatifs/claude-vs-chatgpt-pme',
    label_fr: 'Claude contre ChatGPT pour les PME',
    label_en: 'Claude versus ChatGPT for SMBs',
  },
  'comparatifs/geo-vs-seo': {
    href: '/ressources/comparatifs/geo-vs-seo',
    label_fr: 'GEO contre SEO',
    label_en: 'GEO versus SEO',
  },
  'comparatifs/site-web-intelligent-vs-wordpress': {
    href: '/ressources/comparatifs/site-web-intelligent-vs-wordpress',
    label_fr: 'Site intelligent contre WordPress',
    label_en: 'Intelligent site versus WordPress',
  },
  'comparatifs/claude-code-vs-cursor': {
    href: '/ressources/comparatifs/claude-code-vs-cursor',
    label_fr: 'Claude Code contre Cursor',
    label_en: 'Claude Code versus Cursor',
  },
  'guides/claude-pme': {
    href: '/ressources/guides/claude-pme',
    label_fr: 'Guide Claude pour les PME',
    label_en: 'Claude guide for SMBs',
  },
  'guides/checklist-deploiement-claude': {
    href: '/ressources/guides/checklist-deploiement-claude',
    label_fr: 'Checklist déploiement Claude',
    label_en: 'Claude deployment checklist',
  },
};

/** Articles blog (6). Routes canoniques /blog/<id> (cf blog-routing.ts : type essai/avis -> /blog). */
const ARTICLES: Record<string, MeshLink> = {
  'agent-ia-vs-automatisation-classique-2026': {
    href: '/blog/agent-ia-vs-automatisation-classique-2026',
    label_fr: 'Agent IA contre automatisation classique',
    label_en: 'AI agent versus classic automation',
  },
  'automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil': {
    href: '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil',
    label_fr: 'Automatiser les relances B2B sans SDR',
    label_en: 'Automate B2B follow-ups without an SDR',
  },
  'avis-n8n-vs-zapier-2026': {
    href: '/blog/avis-n8n-vs-zapier-2026',
    label_fr: 'Avis n8n contre Zapier 2026',
    label_en: 'n8n versus Zapier 2026 review',
  },
  'cabler-son-crm-en-10-jours': {
    href: '/blog/cabler-son-crm-en-10-jours',
    label_fr: 'Câbler son CRM en 10 jours',
    label_en: 'Wire your CRM in 10 days',
  },
  'essai-pillar-ia-pme-2026': {
    href: '/blog/essai-pillar-ia-pme-2026',
    label_fr: "L'IA pilier pour les PME en 2026",
    label_en: 'AI as a pillar for SMBs in 2026',
  },
  'seo-geo-etre-cite-par-les-ia-generatives': {
    href: '/blog/seo-geo-etre-cite-par-les-ia-generatives',
    label_fr: 'SEO/GEO : être cité par les IA',
    label_en: 'SEO/GEO: get cited by AI',
  },
};

/** Hubs de section (toujours valides, sert de fallback robuste). */
const HUBS = {
  services: { href: '/services', label_fr: 'Toutes nos offres', label_en: 'All our offers' },
  casUsages: { href: '/cas-usages', label_fr: "Tous les cas d'usage", label_en: 'All use cases' },
  secteurs: { href: '/secteurs', label_fr: 'Tous les secteurs', label_en: 'All sectors' },
  casClients: { href: '/cas-clients', label_fr: 'Tous les cas clients', label_en: 'All client cases' },
  ressources: { href: '/ressources', label_fr: 'Toutes les ressources', label_en: 'All resources' },
  blog: { href: '/blog', label_fr: 'Le journal', label_en: 'The journal' },
} satisfies Record<string, MeshLink>;

// ───────────────────────────── Shape de sortie `related-links` ─────────────────────────────

interface RelatedLinkOut {
  label_fr: string;
  label_en: string;
  href: string;
  desc_fr?: string;
  desc_en?: string;
}
interface RelatedGroupOut {
  label_fr: string;
  label_en: string;
  links: RelatedLinkOut[];
}
/** `data` consomme par la section cataloguee `related-links` (5-touchpoints). */
export interface RelatedLinksData {
  type: 'related-links';
  background?: 'paper' | 'paper-2' | 'paper-3' | 'ink';
  kicker_fr?: string;
  kicker_en?: string;
  h2_fr?: string;
  h2_en?: string;
  groups: RelatedGroupOut[];
}

// ───────────────────────────── Helpers internes ─────────────────────────────

const KICKER = { fr: 'Explorer aussi', en: 'Explore more' };

/** Convertit un MeshLink en lien de sortie (porte ses 2 langues). */
function toLink(l: MeshLink): RelatedLinkOut {
  const out: RelatedLinkOut = { label_fr: l.label_fr, label_en: l.label_en, href: l.href };
  if (l.desc_fr) out.desc_fr = l.desc_fr;
  if (l.desc_en) out.desc_en = l.desc_en;
  return out;
}

/** Construit un groupe, en retirant tout lien dont href === currentHref (anti self-link). */
function group(
  label_fr: string,
  label_en: string,
  links: (MeshLink | undefined)[],
  currentHref?: string,
): RelatedGroupOut | null {
  const seen = new Set<string>();
  const cleaned: RelatedLinkOut[] = [];
  for (const l of links) {
    if (!l) continue;
    if (currentHref && l.href === currentHref) continue;
    if (seen.has(l.href)) continue;
    seen.add(l.href);
    cleaned.push(toLink(l));
  }
  if (cleaned.length === 0) return null;
  return { label_fr, label_en, links: cleaned };
}

/** Assemble le `data` final (filtre les groupes vides, garantit >= 1 groupe). */
function assemble(
  groups: (RelatedGroupOut | null)[],
  h2: { fr: string; en: string },
): RelatedLinksData {
  const kept = groups.filter((g): g is RelatedGroupOut => g !== null);
  return {
    type: 'related-links',
    kicker_fr: KICKER.fr,
    kicker_en: KICKER.en,
    h2_fr: h2.fr,
    h2_en: h2.en,
    groups: kept.length ? kept : [group('Explorer', 'Explore', [HUBS.services, HUBS.casUsages, HUBS.ressources])!],
  };
}

// ───────────────────────────── Fonctions de derivation ─────────────────────────────

/**
 * Maillage pour une page SECTEUR (§17). Les cas clients du secteur sont deja rendus par
 * la grille de cas du template : on ne les duplique pas ici.
 * @param secteurSlug slug du secteur courant (ex. 'conseil')
 */
export function meshForSecteur(secteurSlug: string, _lang: Lang = 'fr'): RelatedLinksData {
  const selfHref = SECTEURS[secteurSlug]?.href;
  return assemble(
    [
      group(
        'Nos offres',
        'Our offers',
        [
          SERVICES['site-web-intelligent'],
          SERVICES['integrateur-claude'],
          SERVICES['agents-ia'],
          SERVICES['content-marketing-intelligent'],
        ],
        selfHref,
      ),
      group(
        "Cas d'usage",
        'Use cases',
        [
          CAS_USAGES['generer-plus-de-leads'],
          CAS_USAGES['standardiser-processus'],
          CAS_USAGES['centraliser-donnees'],
        ],
        selfHref,
      ),
      group('Diagnostic', 'Diagnostic', [RESSOURCES['diagnostics/maturite-ia']], selfHref),
      group(
        'À lire',
        'Worth reading',
        [ARTICLES['essai-pillar-ia-pme-2026'], ARTICLES['agent-ia-vs-automatisation-classique-2026']],
        selfHref,
      ),
    ],
    { fr: 'Continuez votre <i class="acc">parcours</i>.', en: 'Continue your <i class="acc">journey</i>.' },
  );
}

/** Donnees minimales d'un cas-usage requises par le maillage. */
export interface CasUsageMeshInput {
  slug: string;
  category?: string; // 'acquisition' | 'productivite'
}

/**
 * Maillage pour une page CAS-USAGE (§18). Le hub principal depend de la `category`
 * (acquisition -> SWI, sinon -> Integrateur Claude).
 */
export function meshForCasUsage(casUsage: CasUsageMeshInput, _lang: Lang = 'fr'): RelatedLinksData {
  const selfHref = CAS_USAGES[casUsage.slug]?.href ?? `/cas-usages/${casUsage.slug}`;
  const isAcquisition = casUsage.category === 'acquisition';

  const offers = isAcquisition
    ? [SERVICES['site-web-intelligent'], SERVICES['landing-page-scoring']]
    : [SERVICES['integrateur-claude'], SERVICES['agents-ia']];

  const article = isAcquisition
    ? ARTICLES['avis-n8n-vs-zapier-2026']
    : ARTICLES['cabler-son-crm-en-10-jours'];

  return assemble(
    [
      group('Nos offres', 'Our offers', offers, selfHref),
      group('Secteurs', 'Sectors', [SECTEURS['conseil'], SECTEURS['comptabilite']], selfHref),
      group('Ressource', 'Resource', [RESSOURCES['outils/calculateur-roi-ia']], selfHref),
      group('À lire', 'Worth reading', [article], selfHref),
      group("Cas d'usage", 'Use cases', [HUBS.casUsages], selfHref),
    ],
    { fr: 'Allez plus <i class="acc">loin</i>.', en: 'Go <i class="acc">further</i>.' },
  );
}

/** Donnees minimales d'un cas client requises par le maillage. */
export interface CaseMeshInput {
  slug: string;
  sector_fr?: string;
  stack?: string[];
}

/** Mappe un libelle de secteur libre (sector_fr du cas) vers un slug de secteur catalogue. */
function sectorSlugFromLabel(sectorFr?: string): string | undefined {
  if (!sectorFr) return undefined;
  const s = sectorFr.toLowerCase();
  if (s.includes('e-commerce') || s.includes('ecommerce') || s.includes('commerce')) return 'e-commerce';
  if (s.includes('batiment') || s.includes('bâtiment') || s.includes('artisanat')) return 'batiment';
  if (s.includes('sante') || s.includes('santé') || s.includes('bien-etre') || s.includes('bien-être')) return 'therapeutes';
  if (s.includes('conseil')) return 'conseil';
  if (s.includes('rh')) return 'services-b2b';
  return undefined;
}

/**
 * Maillage pour une page CAS CLIENT (§19). Secteur derive de `sector_fr` (fallback hub
 * secteurs si non mappe). 2 services + cas-usages + ressource + hub cas-clients.
 */
export function meshForCase(caseData: CaseMeshInput, _lang: Lang = 'fr'): RelatedLinksData {
  const sectorSlug = sectorSlugFromLabel(caseData.sector_fr);
  const sectorLink = sectorSlug ? SECTEURS[sectorSlug] : HUBS.secteurs;

  return assemble(
    [
      group('Nos offres', 'Our offers', [SERVICES['site-web-intelligent'], SERVICES['integrateur-claude']]),
      group('Secteur', 'Sector', [sectorLink]),
      group(
        "Cas d'usage",
        'Use cases',
        [CAS_USAGES['generer-plus-de-leads'], CAS_USAGES['standardiser-processus']],
      ),
      group('Ressource', 'Resource', [RESSOURCES['outils/calculateur-roi-ia']]),
      group('Cas clients', 'Client cases', [HUBS.casClients]),
    ],
    { fr: 'Et pour <i class="acc">vous</i> ?', en: 'And for <i class="acc">you</i>?' },
  );
}

/** Donnees minimales d'un article requises par le maillage. */
export interface ArticleMeshInput {
  slug: string;
  category?: string; // crm | acquisition | gouvernance | pilotage | contenu-seo-geo
}

/** Map category article -> bundle de liens connexes (1 service + 1 cas-usage + 1 ressource + 1 secteur + 1 article). */
const ARTICLE_MAP: Record<
  string,
  { service: string; casUsage: string; ressource: string; secteur: string; article: string }
> = {
  crm: {
    service: 'machine-outbound',
    casUsage: 'generer-plus-de-leads',
    ressource: 'comparatifs/site-web-intelligent-vs-wordpress',
    secteur: 'conseil',
    article: 'cabler-son-crm-en-10-jours',
  },
  acquisition: {
    service: 'site-web-intelligent',
    casUsage: 'generer-plus-de-leads',
    ressource: 'outils/calculateur-roi-ia',
    secteur: 'agence',
    article: 'avis-n8n-vs-zapier-2026',
  },
  gouvernance: {
    service: 'integrateur-claude',
    casUsage: 'standardiser-processus',
    ressource: 'guides/claude-pme',
    secteur: 'conseil',
    article: 'essai-pillar-ia-pme-2026',
  },
  pilotage: {
    service: 'integrateur-claude',
    casUsage: 'reduire-reporting',
    ressource: 'diagnostics/maturite-ia',
    secteur: 'comptabilite',
    article: 'agent-ia-vs-automatisation-classique-2026',
  },
  'contenu-seo-geo': {
    service: 'content-marketing-intelligent',
    casUsage: 'generer-plus-de-leads',
    ressource: 'comparatifs/geo-vs-seo',
    secteur: 'conseil',
    article: 'seo-geo-etre-cite-par-les-ia-generatives',
  },
};

/** Articles de secours par categorie quand l'article connexe mappe est l'article courant. */
const ARTICLE_FALLBACK: Record<string, string> = {
  crm: 'automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil',
  acquisition: 'essai-pillar-ia-pme-2026',
  gouvernance: 'agent-ia-vs-automatisation-classique-2026',
  pilotage: 'essai-pillar-ia-pme-2026',
  'contenu-seo-geo': 'essai-pillar-ia-pme-2026',
};

/**
 * Maillage pour une page ARTICLE (§22). Map par `category`. L'article connexe n'est JAMAIS
 * l'article courant (fallback meme categorie). Categorie inconnue -> bundle gouvernance.
 */
export function meshForArticle(blog: ArticleMeshInput, _lang: Lang = 'fr'): RelatedLinksData {
  const cat = blog.category && ARTICLE_MAP[blog.category] ? blog.category : 'gouvernance';
  const m = ARTICLE_MAP[cat];
  const selfHref = ARTICLES[blog.slug]?.href ?? `/blog/${blog.slug}`;

  // article connexe : la cible mappee, sauf si c'est l'article courant -> fallback meme categorie.
  let relatedArticleSlug = m.article;
  if (ARTICLES[relatedArticleSlug]?.href === selfHref) relatedArticleSlug = ARTICLE_FALLBACK[cat];
  const relatedArticle = ARTICLES[relatedArticleSlug];

  return assemble(
    [
      group('Notre offre', 'Our offer', [SERVICES[m.service]], selfHref),
      group("Cas d'usage", 'Use case', [CAS_USAGES[m.casUsage]], selfHref),
      group('Ressource', 'Resource', [RESSOURCES[m.ressource]], selfHref),
      group('Secteur', 'Sector', [SECTEURS[m.secteur]], selfHref),
      group('A lire aussi', 'Also worth reading', [relatedArticle], selfHref),
    ],
    { fr: 'Sur le meme <i class="acc">fil</i>.', en: 'On the same <i class="acc">thread</i>.' },
  );
}

/** Donnees minimales d'une ressource requises par le maillage. */
export interface RessourceMeshInput {
  /** href ressource courante (ex. '/ressources/outils/calculateur-roi-ia'), pour l'anti self-link. */
  href?: string;
}

/**
 * Maillage GENERIQUE pour une page RESSOURCE (§21) : complete le maillage ressource.
 * 1 service + 2 cas-usages + 1 secteur + 2 articles.
 */
export function meshForRessource(ressource: RessourceMeshInput = {}, _lang: Lang = 'fr'): RelatedLinksData {
  const selfHref = ressource.href;
  return assemble(
    [
      group('Notre offre', 'Our offer', [SERVICES['integrateur-claude']], selfHref),
      group(
        "Cas d'usage",
        'Use cases',
        [CAS_USAGES['standardiser-processus'], CAS_USAGES['centraliser-donnees']],
        selfHref,
      ),
      group('Secteur', 'Sector', [SECTEURS['conseil']], selfHref),
      group(
        'À lire',
        'Worth reading',
        [ARTICLES['essai-pillar-ia-pme-2026'], ARTICLES['seo-geo-etre-cite-par-les-ia-generatives']],
        selfHref,
      ),
    ],
    { fr: 'Pour aller plus <i class="acc">loin</i>.', en: 'To go <i class="acc">further</i>.' },
  );
}

/**
 * Petit bloc "Cas d'usage" pour les pages SERVICE (§16 complement) : comble le SEUL trou
 * du maillage service (2-3 cas-usages). Renvoie un `data` a 1 groupe.
 */
export function meshForServiceCasUsages(_lang: Lang = 'fr'): RelatedLinksData {
  return assemble(
    [
      group(
        "Cas d'usage",
        'Use cases',
        [
          CAS_USAGES['generer-plus-de-leads'],
          CAS_USAGES['standardiser-processus'],
          CAS_USAGES['reduire-temps-cms'],
        ],
      ),
    ],
    { fr: 'Ce que ca <i class="acc">change</i>.', en: 'What it <i class="acc">changes</i>.' },
  );
}
