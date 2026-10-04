/**
 * internal-mesh.ts · Maillage interne AUTOMATIQUE (source unique des liens connexes).
 *
 * Refonte C 2026-10 · le maillage était une suite de listes écrites à la main, rendues sur
 * trois gabarits seulement (cas client, cas d'usage, secteur). Résultat mesuré sur le
 * build : 10 pages indexables sans aucun lien entrant contextuel, 12 avec un ou deux, et
 * des liens vers des pages noindex ou redirigées. Il est maintenant CALCULÉ :
 *
 *   1. REGISTRE (`PAGES`) : chaque page de contenu déclare son libellé, sa nature et ses
 *      thèmes. C'est la seule chose à tenir à jour quand on ajoute une page.
 *   2. FILTRE : une page n'entre dans le maillage que si elle EXISTE et est INDEXABLE
 *      (fichier source présent, pas dépubliée, pas noindex). Une page prévue mais pas
 *      encore créée peut donc être déclarée d'avance : elle s'active toute seule.
 *   3. CALCUL : chaque page émettrice lie les trois pages suivantes de l'anneau de chacun
 *      de ses thèmes (donc des pages du même sujet), puis une passe d'équilibrage garantit
 *      que toute page du registre reçoit au moins `MIN_INBOUND` liens entrants.
 *
 * Garanties : 0 lien fabriqué (routes du registre, vérifiées sur disque), 0 lien vers soi,
 * 0 lien vers une page noindex ou redirigée, aucune page du registre orpheline.
 * Rendu : section cataloguée `related-links` (packages/ds-kernel/.../related-links/schema.ts),
 * posée par Base.astro sur les pages de contenu, ou par le gabarit quand il a déjà la sienne.
 * Contrôle : `node scripts/check-internal-mesh.mjs` (rapport des liens entrants sur le build).
 *
 * Labels concis, voix active, 0 tiret cadratin (rule 58).
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEPUBLISHED_SERVICE_IDS, DEPUBLISHED_DEMONSTRATION_IDS, isRedirectedPath } from '../data/depublished';
import { NOINDEX_SITEMAP_PATHS } from '../data/sitemap-noindex-exclude';
import { listRouteSources } from './seo/lastmod.mjs';

type Lang = 'fr' | 'en';

/** Nombre minimal de liens entrants contextuels garanti à chaque page du registre. */
export const MIN_INBOUND = 3;
/** Liens émis par thème depuis une page. */
const LINKS_PER_TOPIC = 3;

type Topic =
  | 'automatisation'
  | 'agents'
  | 'claude'
  | 'applications'
  | 'commercial'
  | 'acquisition'
  | 'donnees'
  | 'conseil'
  | 'formation'
  | 'studio';

type Kind =
  | 'service'
  | 'audit'
  | 'formation'
  | 'guide'
  | 'comparatif'
  | 'diagnostic'
  | 'article'
  | 'cas-usage'
  | 'cas-client'
  | 'implantation'
  | 'studio';

interface PageDef {
  label_fr: string;
  label_en: string;
  kind: Kind;
  /** Thèmes, du plus central au plus secondaire. */
  topics: Topic[];
  /** Faux : la page reçoit des liens mais n'affiche pas de bloc de maillage (hub, tarifs…). */
  emit?: boolean;
}

// ───────────────────────────── Registre des pages ─────────────────────────────
// L'ORDRE compte : il définit les anneaux (une page lie celles qui la suivent dans son
// thème). Garder les pages d'un même sujet proches les unes des autres.

const PAGES: Record<string, PageDef> = {
  // ── Automatisation ──
  '/services/systemes-operationnels-ia': { label_fr: "Agence d'automatisation IA", label_en: 'AI automation agency', kind: 'service', topics: ['automatisation', 'agents'] },
  '/services/automatisations': { label_fr: 'Automatisation des processus', label_en: 'Process automation', kind: 'service', topics: ['automatisation'] },
  '/services/automatisation-n8n': { label_fr: 'Agence n8n', label_en: 'n8n agency', kind: 'service', topics: ['automatisation'] },
  '/services/automatisation-make': { label_fr: 'Automatisation Make', label_en: 'Make automation', kind: 'service', topics: ['automatisation'] },
  '/ressources/comparatifs/n8n-vs-make': { label_fr: 'n8n ou Make : le comparatif', label_en: 'n8n vs Make', kind: 'comparatif', topics: ['automatisation'] },
  '/blog/avis-n8n-vs-zapier-2026': { label_fr: 'n8n ou Zapier : notre avis', label_en: 'n8n vs Zapier: our take', kind: 'article', topics: ['automatisation'] },
  '/cas-usages/standardiser-processus': { label_fr: "Automatiser l'administratif", label_en: 'Standardise processes', kind: 'cas-usage', topics: ['automatisation'] },
  '/blog/agent-ia-vs-automatisation-classique-2026': { label_fr: 'Agent IA ou automatisation classique', label_en: 'AI agent or classic automation', kind: 'article', topics: ['agents', 'automatisation'] },

  // ── Agents IA et Claude ──
  '/services/agents-ia': { label_fr: 'Agents IA pour entreprise', label_en: 'AI agents for business', kind: 'service', topics: ['agents', 'claude'] },
  '/services/agent-support-client': { label_fr: 'Chatbot et agent de service client', label_en: 'Customer service agent', kind: 'service', topics: ['agents'] },
  '/services/base-de-connaissance-ia': { label_fr: 'Base de connaissance IA', label_en: 'AI knowledge base', kind: 'service', topics: ['agents', 'claude'] },
  '/services/integration-claude': { label_fr: 'Claude en entreprise', label_en: 'Claude for business', kind: 'service', topics: ['claude', 'agents'] },
  '/ressources/guides/claude-pme': { label_fr: 'Guide : déployer Claude dans une PME', label_en: 'Guide: deploying Claude in an SMB', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/claude-cowork': { label_fr: 'Guide Claude Cowork', label_en: 'Claude Cowork guide', kind: 'guide', topics: ['claude'] },
  '/ressources/comparatifs/claude-vs-chatgpt-pme': { label_fr: 'Claude ou ChatGPT pour une PME', label_en: 'Claude or ChatGPT for an SMB', kind: 'comparatif', topics: ['claude', 'agents'] },
  '/ressources/comparatifs/claude-code-vs-cursor': { label_fr: 'Claude Code ou Cursor', label_en: 'Claude Code or Cursor', kind: 'comparatif', topics: ['claude', 'applications'] },

  // ── Applications métier et données ──
  '/services/applications-internes': { label_fr: 'Application métier sur mesure', label_en: 'Custom business application', kind: 'service', topics: ['applications', 'donnees'] },
  '/blog/applications-internes-build-vs-buy-pme': { label_fr: 'Développer ou acheter son outil interne', label_en: 'Build or buy your internal tool', kind: 'article', topics: ['applications'] },
  '/cas-clients/les-carnets-de-montpellier': { label_fr: 'Cas client : Les Carnets de Montpellier', label_en: 'Case: Les Carnets de Montpellier', kind: 'cas-client', topics: ['applications', 'acquisition'] },
  '/services/donnees-reporting': { label_fr: 'Tableau de bord automatisé', label_en: 'Automated dashboard', kind: 'service', topics: ['donnees', 'applications'] },
  '/blog/tableau-de-bord-pme-quelles-donnees-suivre': { label_fr: 'Tableau de bord : quelles données suivre', label_en: 'Dashboard: which data to track', kind: 'article', topics: ['donnees'] },
  '/cas-usages/centraliser-donnees': { label_fr: 'Centraliser données et reporting', label_en: 'Centralise your data', kind: 'cas-usage', topics: ['donnees'] },

  // ── Commercial : prospection, CRM, suivi ──
  '/services/systeme-commercial': { label_fr: 'Système commercial', label_en: 'Sales system', kind: 'service', topics: ['commercial'] },
  '/services/prospection-automatisee': { label_fr: 'Prospection automatisée', label_en: 'Automated prospecting', kind: 'service', topics: ['commercial'] },
  '/services/crm-scoring-routing': { label_fr: 'Automatisation CRM', label_en: 'CRM automation', kind: 'service', topics: ['commercial', 'donnees'] },
  '/services/sequences-de-suivi': { label_fr: 'Devis automatisé et relances', label_en: 'Automated quotes and follow-ups', kind: 'service', topics: ['commercial'] },
  '/blog/cabler-son-crm-en-10-jours': { label_fr: 'Câbler son CRM en 10 jours', label_en: 'Wire your CRM in 10 days', kind: 'article', topics: ['commercial', 'donnees'] },
  '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil': { label_fr: 'Automatiser ses relances B2B', label_en: 'Automate B2B follow-ups', kind: 'article', topics: ['commercial'] },
  '/cas-usages/generer-plus-de-leads': { label_fr: 'Automatiser le suivi commercial', label_en: 'Generate more leads', kind: 'cas-usage', topics: ['commercial', 'acquisition'] },

  // ── Conseil, audit, conformité ──
  '/audit-ia-pme': { label_fr: "L'audit IA pour PME", label_en: 'AI audit for SMBs', kind: 'audit', topics: ['conseil'], emit: false },
  '/services/consultant-ia-claude': { label_fr: 'Consultant IA', label_en: 'AI consultant', kind: 'service', topics: ['conseil', 'claude'] },
  '/conformite-ia': { label_fr: 'Conformité IA : RGPD et AI Act', label_en: 'AI compliance: GDPR and AI Act', kind: 'service', topics: ['conseil', 'claude'] },
  '/ressources/diagnostics/maturite-ia': { label_fr: 'Diagnostic de maturité IA', label_en: 'AI maturity diagnostic', kind: 'diagnostic', topics: ['conseil'] },
  '/ressources/outils/calculateur-roi-ia': { label_fr: 'Calculateur de ROI IA', label_en: 'AI ROI calculator', kind: 'diagnostic', topics: ['conseil', 'automatisation'] },
  '/ressources/outils/grille-taches-a-automatiser': { label_fr: 'Grille des tâches à automatiser', label_en: 'Task automation grid', kind: 'diagnostic', topics: ['automatisation', 'conseil'] },
  '/ressources/outils/charte-ia-entreprise': { label_fr: 'Modèle de charte IA pour PME', label_en: 'AI charter template for SMBs', kind: 'guide', topics: ['conseil', 'claude'] },
  '/blog/essai-pillar-ia-pme-2026': { label_fr: "L'IA appliquée aux PME en 2026", label_en: 'Applied AI for SMBs in 2026', kind: 'article', topics: ['conseil'] },
  '/blog/forward-deployed-engineer': { label_fr: "Forward deployed engineer : le rôle", label_en: 'Forward deployed engineer: the role', kind: 'article', topics: ['conseil', 'studio'] },
  '/tarifs': { label_fr: 'Tarifs', label_en: 'Pricing', kind: 'studio', topics: ['conseil', 'studio'], emit: false },

  // ── Formation ──
  '/formations': { label_fr: 'Formations IA et automatisation', label_en: 'AI and automation training', kind: 'formation', topics: ['formation'], emit: false },
  '/formations/automatisation': { label_fr: 'Formation automatisation', label_en: 'Automation training', kind: 'formation', topics: ['formation', 'automatisation'] },
  '/formations/n8n': { label_fr: 'Formation n8n', label_en: 'n8n training', kind: 'formation', topics: ['formation', 'automatisation'] },
  '/formations/make': { label_fr: 'Formation Make', label_en: 'Make training', kind: 'formation', topics: ['formation', 'automatisation'] },
  '/formations/claude': { label_fr: 'Formation Claude', label_en: 'Claude training', kind: 'formation', topics: ['formation', 'claude'] },

  // ── Acquisition : site, SEO et GEO ──
  '/services/systeme-acquisition': { label_fr: "Système d'acquisition", label_en: 'Acquisition system', kind: 'service', topics: ['acquisition'] },
  '/services/site-web-ia': { label_fr: 'Création de site internet', label_en: 'Website creation', kind: 'service', topics: ['acquisition'] },
  '/services/seo-geo-contenu': { label_fr: 'SEO, GEO et contenu', label_en: 'SEO, GEO and content', kind: 'service', topics: ['acquisition'] },
  '/services/landing-pages-tunnels': { label_fr: 'Landing pages et tunnels', label_en: 'Landing pages and funnels', kind: 'service', topics: ['acquisition', 'commercial'] },
  '/ressources/comparatifs/geo-vs-seo': { label_fr: 'GEO ou SEO', label_en: 'GEO or SEO', kind: 'comparatif', topics: ['acquisition'] },
  '/blog/seo-geo-etre-cite-par-les-ia-generatives': { label_fr: 'Être cité par les IA génératives', label_en: 'Get cited by generative AI', kind: 'article', topics: ['acquisition'] },
  '/cas-clients/amploi': { label_fr: 'Cas client : Amploi', label_en: 'Case: Amploi', kind: 'cas-client', topics: ['acquisition'] },
  '/cas-clients/balzeo': { label_fr: 'Cas client : Balzeo', label_en: 'Case: Balzeo', kind: 'cas-client', topics: ['acquisition'] },
  '/cas-clients/desangles-peinture': { label_fr: 'Cas client : Desangles Peinture', label_en: 'Case: Desangles Peinture', kind: 'cas-client', topics: ['acquisition'] },
  '/cas-clients/isabelle-diaz-naturopathe': { label_fr: 'Cas client : Isabelle Diaz', label_en: 'Case: Isabelle Diaz', kind: 'cas-client', topics: ['acquisition'] },

  // ── Studio : qui, comment, où ──
  '/agence': { label_fr: 'Le studio', label_en: 'The studio', kind: 'studio', topics: ['studio'], emit: false },
  '/agence/methode': { label_fr: 'La méthode', label_en: 'The method', kind: 'studio', topics: ['studio', 'conseil'], emit: false },
  '/equipe/simon-beros': { label_fr: 'Simon Beros, fondateur', label_en: 'Simon Beros, founder', kind: 'studio', topics: ['studio'], emit: false },
  '/technologies': { label_fr: 'Les technologies utilisées', label_en: 'Technologies used', kind: 'studio', topics: ['studio', 'automatisation'], emit: false },
  '/manifesto': { label_fr: 'Le manifeste', label_en: 'The manifesto', kind: 'studio', topics: ['studio'], emit: false },
  '/blog/brain-circuit': { label_fr: "L'iconographie de l'IA", label_en: 'The iconography of AI', kind: 'article', topics: ['studio'] },
  '/implantations/bordeaux': { label_fr: 'Waimia à Bordeaux', label_en: 'Waimia in Bordeaux', kind: 'implantation', topics: ['studio'] },
  '/implantations/montpellier': { label_fr: 'Waimia à Montpellier', label_en: 'Waimia in Montpellier', kind: 'implantation', topics: ['studio'] },
  '/implantations/lyon': { label_fr: 'Waimia à Lyon', label_en: 'Waimia in Lyon', kind: 'implantation', topics: ['studio'] },
};

/** Intitulé du groupe d'affichage par nature de page (ordre = ordre d'affichage). */
const GROUPS: Array<{ kinds: Kind[]; label_fr: string; label_en: string }> = [
  { kinds: ['service', 'audit'], label_fr: 'Services', label_en: 'Services' },
  { kinds: ['formation'], label_fr: 'Formations', label_en: 'Training' },
  { kinds: ['guide', 'comparatif', 'diagnostic'], label_fr: 'Guides et comparatifs', label_en: 'Guides and comparisons' },
  { kinds: ['cas-client', 'cas-usage'], label_fr: 'Cas concrets', label_en: 'Real cases' },
  { kinds: ['article'], label_fr: 'À lire', label_en: 'Worth reading' },
  { kinds: ['studio', 'implantation'], label_fr: 'Le studio', label_en: 'The studio' },
];

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

// ───────────────────────────── Pages vivantes ─────────────────────────────

/**
 * Routes du registre qui EXISTENT et sont INDEXABLES, lues sur disque au build :
 * fichier source présent (contenu JSON ou page .astro), pas dépubliée par fusion, pas
 * `seo.noindex`, pas `visible: false`, pas dans la liste des stubs noindex.
 */
function computeLiveRoutes(root: string): Set<string> {
  const live = new Set<string>();
  let sources: Array<{ route: string; file: string }> = [];
  try {
    sources = listRouteSources(root);
  } catch {
    return live; // pas d'accès disque (rendu serverless) : aucun lien émis plutôt qu'un lien faux
  }
  for (const { route, file } of sources) {
    if (!(route in PAGES) || NOINDEX_SITEMAP_PATHS.has(route) || isRedirectedPath(route)) continue;
    const id = route.split('/').pop() ?? '';
    if (route.startsWith('/services/') && (DEPUBLISHED_SERVICE_IDS.has(id) || id === 'template-service-ref')) continue;
    if (route.startsWith('/demonstrations/') && DEPUBLISHED_DEMONSTRATION_IDS.has(id)) continue;
    if (file.endsWith('.json') && existsSync(file)) {
      try {
        const data = JSON.parse(readFileSync(file, 'utf8'));
        if (data?.seo?.noindex === true || data?.noindex === true || data?.visible === false) continue;
      } catch {
        continue;
      }
    }
    live.add(route);
  }
  return live;
}

// ───────────────────────────── Calcul du graphe ─────────────────────────────

interface Graph {
  live: Set<string>;
  /** Liens sortants par page émettrice, dans l'ordre d'émission. */
  out: Map<string, string[]>;
  /** Nombre de liens entrants par page vivante. */
  inbound: Map<string, number>;
}

let graphCache: { root: string; graph: Graph } | null = null;

function buildGraph(root: string): Graph {
  const live = computeLiveRoutes(root);
  const order = Object.keys(PAGES).filter((r) => live.has(r));
  const emitters = order.filter((r) => PAGES[r].emit !== false);

  const rings = new Map<Topic, string[]>();
  for (const route of order) {
    for (const topic of PAGES[route].topics) {
      if (!rings.has(topic)) rings.set(topic, []);
      rings.get(topic)!.push(route);
    }
  }

  // Un cas client ne lie pas un autre cas client depuis ce bloc : le gabarit pose déjà la
  // bande « Autres cas » juste au-dessus (sinon les deux blocs listent les mêmes pages).
  const allowed = (from: string, to: string) => !(PAGES[from].kind === 'cas-client' && PAGES[to].kind === 'cas-client');

  // 1. Anneaux : chaque page émettrice lie les pages qui la suivent dans chacun de ses thèmes.
  const out = new Map<string, string[]>(emitters.map((r) => [r, []]));
  for (const route of emitters) {
    const links = out.get(route)!;
    for (const topic of PAGES[route].topics) {
      const ring = rings.get(topic)!;
      const at = ring.indexOf(route);
      for (let step = 1, added = 0; step < ring.length && added < LINKS_PER_TOPIC; step++) {
        const target = ring[(at + step) % ring.length];
        if (target === route || links.includes(target) || !allowed(route, target)) continue;
        links.push(target);
        added++;
      }
    }
  }

  const inbound = new Map<string, number>(order.map((r) => [r, 0]));
  for (const links of out.values()) for (const t of links) inbound.set(t, (inbound.get(t) ?? 0) + 1);

  // 2. Équilibrage : une page sous le seuil est ajoutée aux pages émettrices du même thème
  //    qui lient le moins (puis à n'importe quelle émettrice), jusqu'à atteindre le seuil.
  const shares = (a: string, b: string) => PAGES[a].topics.filter((t) => PAGES[b].topics.includes(t)).length;
  for (const target of order) {
    while ((inbound.get(target) ?? 0) < MIN_INBOUND) {
      const candidates = emitters
        .filter((e) => e !== target && !out.get(e)!.includes(target) && allowed(e, target))
        .sort(
          (a, b) =>
            shares(b, target) - shares(a, target) ||
            out.get(a)!.length - out.get(b)!.length ||
            order.indexOf(a) - order.indexOf(b),
        );
      if (candidates.length === 0) break;
      out.get(candidates[0])!.push(target);
      inbound.set(target, (inbound.get(target) ?? 0) + 1);
    }
  }

  return { live, out, inbound };
}

function graph(root: string = process.cwd()): Graph {
  if (!graphCache || graphCache.root !== root) graphCache = { root, graph: buildGraph(root) };
  return graphCache.graph;
}

const normalize = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/');

function toLink(route: string): RelatedLinkOut {
  return { label_fr: PAGES[route].label_fr, label_en: PAGES[route].label_en, href: route };
}

/** Regroupe des routes par nature de page, dans l'ordre d'affichage de `GROUPS`. */
function groupByKind(routes: string[]): RelatedGroupOut[] {
  const groups: RelatedGroupOut[] = [];
  for (const g of GROUPS) {
    const links = routes.filter((r) => g.kinds.includes(PAGES[r].kind)).map(toLink);
    if (links.length > 0) groups.push({ label_fr: g.label_fr, label_en: g.label_en, links });
  }
  return groups;
}

const KICKER = { fr: 'Explorer aussi', en: 'Explore more' };
const DEFAULT_H2 = { fr: 'Sur le même sujet', en: 'On the same topic' };

function assemble(groups: RelatedGroupOut[], h2: { fr: string; en: string } = DEFAULT_H2): RelatedLinksData {
  return { type: 'related-links', kicker_fr: KICKER.fr, kicker_en: KICKER.en, h2_fr: h2.fr, h2_en: h2.en, groups };
}

// ───────────────────────────── API ─────────────────────────────

/** Vrai si la page porte un bloc de maillage calculé (elle est dans le registre et émettrice). */
export function hasMesh(pathname: string): boolean {
  return (graph().out.get(normalize(pathname))?.length ?? 0) > 0;
}

/**
 * Maillage calculé d'une page de contenu : liens vers les pages du même sujet, regroupés
 * par nature. Retourne null si la page n'est pas émettrice (hub, page absente du registre).
 */
export function meshForPath(pathname: string, _lang: Lang = 'fr'): RelatedLinksData | null {
  const links = graph().out.get(normalize(pathname));
  if (!links || links.length === 0) return null;
  return assemble(groupByKind(links));
}

/** Liens du registre filtrés : vivants, sans la page courante, sans doublon. */
function liveLinks(routes: string[], self?: string): string[] {
  const { live } = graph();
  return [...new Set(routes)].filter((r) => r in PAGES && live.has(r) && r !== self);
}

/** Données minimales d'un cas d'usage requises par le maillage. */
export interface CasUsageMeshInput {
  slug: string;
  category?: string;
}

/** Maillage d'une page CAS D'USAGE (rendu par le gabarit cas-usages). */
export function meshForCasUsage(casUsage: CasUsageMeshInput, lang: Lang = 'fr'): RelatedLinksData {
  return meshForPath(`/cas-usages/${casUsage.slug}`, lang) ?? meshFallback();
}

/** Données minimales d'un cas client requises par le maillage. */
export interface CaseMeshInput {
  slug: string;
  sector_fr?: string;
  stack?: string[];
}

/** Maillage d'une page CAS CLIENT (rendu par le gabarit case-study). */
export function meshForCase(caseData: CaseMeshInput, lang: Lang = 'fr'): RelatedLinksData {
  return meshForPath(`/cas-clients/${caseData.slug}`, lang) ?? meshFallback();
}

/** Données minimales d'un article requises par le maillage. */
export interface ArticleMeshInput {
  slug: string;
  category?: string;
}

/** Maillage d'une page ARTICLE. */
export function meshForArticle(blog: ArticleMeshInput, lang: Lang = 'fr'): RelatedLinksData {
  return meshForPath(`/blog/${blog.slug}`, lang) ?? meshFallback();
}

/** Données minimales d'une ressource requises par le maillage. */
export interface RessourceMeshInput {
  href?: string;
}

/** Maillage d'une page RESSOURCE. */
export function meshForRessource(ressource: RessourceMeshInput = {}, lang: Lang = 'fr'): RelatedLinksData {
  return (ressource.href ? meshForPath(ressource.href, lang) : null) ?? meshFallback();
}

/** Bloc de secours : les points d'entrée du site, quand une page n'est pas au registre. */
function meshFallback(self?: string): RelatedLinksData {
  return assemble(
    groupByKind(
      liveLinks(
        [
          '/services/systemes-operationnels-ia',
          '/services/agents-ia',
          '/services/applications-internes',
          '/audit-ia-pme',
          '/ressources/outils/calculateur-roi-ia',
          '/tarifs',
        ],
        self,
      ),
    ),
  );
}

/**
 * Mappe un libellé de secteur libre (`sector_fr` d'un cas) vers un slug de secteur.
 * SOURCE UNIQUE : consommée par la grille de cas des pages secteur (sector-cases.ts).
 * Ordre des tests = spécificité ('rh' avant 'santé' pour ne pas classer un cas RH en
 * thérapeutes).
 */
export function sectorSlugFromLabel(sectorFr?: string): string | undefined {
  if (!sectorFr) return undefined;
  const s = sectorFr.toLowerCase();
  if (s.includes('e-commerce') || s.includes('ecommerce') || s.includes('commerce')) return 'e-commerce';
  if (s.includes('batiment') || s.includes('bâtiment') || s.includes('artisanat')) return 'batiment';
  if (/\brh\b/.test(s) || s.includes('ressources humaines')) return 'services-b2b';
  if (
    s.includes('sante') ||
    s.includes('santé') ||
    s.includes('bien-etre') ||
    s.includes('bien-être') ||
    s.includes('naturopath') ||
    s.includes('therapeute') ||
    s.includes('thérapeute')
  )
    return 'therapeutes';
  if (s.includes('patrimoine') || s.includes('média') || s.includes('media') || s.includes('local'))
    return 'liberal-independant';
  if (s.includes('conseil')) return 'conseil';
  return undefined;
}

/** Thèmes dominants par secteur : sert à proposer les bonnes pages sur une page secteur. */
const SECTEUR_TOPICS: Record<string, Topic[]> = {
  conseil: ['commercial', 'agents'],
  comptabilite: ['donnees', 'automatisation'],
  agence: ['acquisition', 'automatisation'],
  industrie: ['applications', 'automatisation'],
  formation: ['acquisition', 'automatisation'],
  esn: ['applications', 'agents'],
  batiment: ['acquisition', 'commercial'],
  'e-commerce': ['acquisition', 'donnees'],
  'liberal-independant': ['acquisition', 'commercial'],
  'services-b2b': ['commercial', 'automatisation'],
  'startup-logiciel': ['applications', 'agents'],
  therapeutes: ['acquisition', 'commercial'],
};

/** Cas client rattaché à un secteur, quand il en existe un. */
const SECTEUR_CASE: Record<string, string> = {
  batiment: '/cas-clients/desangles-peinture',
  'e-commerce': '/cas-clients/balzeo',
  'liberal-independant': '/cas-clients/les-carnets-de-montpellier',
  'services-b2b': '/cas-clients/amploi',
  therapeutes: '/cas-clients/isabelle-diaz-naturopathe',
};

/**
 * Maillage d'une page SECTEUR : les services, cas et ressources des deux thèmes dominants
 * du secteur. Les pages secteur ne sont pas des cibles du maillage (noindex à ce jour).
 */
export function meshForSecteur(secteurSlug: string, _lang: Lang = 'fr'): RelatedLinksData {
  const topics = SECTEUR_TOPICS[secteurSlug] ?? ['automatisation', 'conseil'];
  const { live } = graph();
  const picked: string[] = [];
  const dedicated = SECTEUR_CASE[secteurSlug];
  if (dedicated) picked.push(dedicated);
  for (const topic of topics) {
    let services = 0;
    let others = 0;
    for (const [route, def] of Object.entries(PAGES)) {
      if (!live.has(route) || def.topics[0] !== topic || picked.includes(route)) continue;
      if (def.kind === 'service' && services < 2) {
        picked.push(route);
        services++;
      } else if (def.kind !== 'service' && def.kind !== 'studio' && others < 2) {
        picked.push(route);
        others++;
      }
    }
  }
  picked.push('/audit-ia-pme');
  const groups = groupByKind(liveLinks(picked));
  return groups.length > 0 ? assemble(groups, { fr: 'Pour votre secteur', en: 'For your sector' }) : meshFallback();
}

/** Bloc « cas d'usage » pour une page service (complément historique, conservé). */
export function meshForServiceCasUsages(_lang: Lang = 'fr'): RelatedLinksData {
  const groups = groupByKind(
    liveLinks(['/cas-usages/generer-plus-de-leads', '/cas-usages/standardiser-processus', '/cas-usages/centraliser-donnees']),
  );
  return groups.length > 0 ? assemble(groups, { fr: 'Ce que ça change', en: 'What it changes' }) : meshFallback();
}

/** Maillage du HUB BLOG : des billets vers les services qu'ils préparent, et la preuve. */
export function meshForBlogHub(_lang: Lang = 'fr'): RelatedLinksData {
  const groups = groupByKind(
    liveLinks([
      '/services/systemes-operationnels-ia',
      '/services/agents-ia',
      '/services/automatisation-n8n',
      '/services/applications-internes',
      '/services/integration-claude',
      '/ressources/guides/claude-pme',
      '/ressources/comparatifs/claude-vs-chatgpt-pme',
      '/ressources/outils/calculateur-roi-ia',
      '/cas-clients/amploi',
    ]),
  );
  return groups.length > 0 ? assemble(groups, { fr: "De la lecture à l'action", en: 'From reading to action' }) : meshFallback();
}

/** Maillage du HUB CAS CLIENTS : vers les services qui ont produit ces projets. */
export function meshForCasClientsHub(_lang: Lang = 'fr'): RelatedLinksData {
  const groups = groupByKind(
    liveLinks([
      '/services/systemes-operationnels-ia',
      '/services/applications-internes',
      '/services/site-web-ia',
      '/services/seo-geo-contenu',
      '/cas-usages/generer-plus-de-leads',
      '/cas-usages/standardiser-processus',
      '/audit-ia-pme',
    ]),
  );
  return groups.length > 0 ? assemble(groups, { fr: 'Et pour votre entreprise ?', en: 'And for your company?' }) : meshFallback();
}

/** Diagnostic du maillage calculé (consommé par les tests et le rapport). */
export function meshReport(root: string = process.cwd()): Array<{ route: string; inbound: number; outbound: number }> {
  const g = graph(root);
  return [...g.live].map((route) => ({
    route,
    inbound: g.inbound.get(route) ?? 0,
    outbound: g.out.get(route)?.length ?? 0,
  }));
}
