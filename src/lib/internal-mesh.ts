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
 * Hubs de service : un hub (SERVICE_HUB_PATHS) lie en plus TOUS ses enfants du catalogue
 * (hubChildren, alimenté par sitemap.ts), pas seulement trois par thème.
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
import { SERVICE_HUB_PATHS, hubChildren } from './seo/service-catalog';

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
  | 'conformite'
  | 'formation'
  | 'studio'
  | 'web';

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
  | 'secteur'
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
// Thème `claude` = assistants et plateformes de modèles (Claude, ChatGPT, MCP, comparatifs).
// Thème `conformite` = RGPD, AI Act, charte d'usage, fonctions à risque (RH).

const PAGES: Record<string, PageDef> = {
  // ── Automatisation ──
  '/services/systemes-operationnels-ia': { label_fr: "Agence d'automatisation IA", label_en: 'AI automation agency', kind: 'service', topics: ['automatisation', 'agents'] },
  '/services/automatisations': { label_fr: 'Automatisation des processus', label_en: 'Process automation', kind: 'service', topics: ['automatisation'] },
  '/services/automatisation-n8n': { label_fr: 'Agence n8n', label_en: 'n8n agency', kind: 'service', topics: ['automatisation'] },
  '/services/automatisation-make': { label_fr: 'Automatisation Make', label_en: 'Make automation', kind: 'service', topics: ['automatisation'] },
  '/ressources/comparatifs/n8n-vs-make': { label_fr: 'n8n ou Make : le comparatif', label_en: 'n8n vs Make', kind: 'comparatif', topics: ['automatisation'] },
  '/ressources/guides/n8n-prix': { label_fr: 'n8n : prix et coût complet', label_en: 'n8n: pricing and full cost', kind: 'guide', topics: ['automatisation'] },
  '/ressources/guides/rpa-ou-agent-ia': { label_fr: 'RPA, API ou agent IA : comment choisir', label_en: 'RPA, API or AI agent: how to choose', kind: 'guide', topics: ['automatisation', 'agents'] },
  '/blog/n8n-c-est-quoi': { label_fr: "n8n, c'est quoi", label_en: 'What is n8n', kind: 'article', topics: ['automatisation'] },
  '/blog/avis-n8n-vs-zapier-2026': { label_fr: 'n8n ou Zapier : notre avis', label_en: 'n8n vs Zapier: our take', kind: 'article', topics: ['automatisation'] },
  '/cas-usages/standardiser-processus': { label_fr: "Automatiser l'administratif", label_en: 'Standardise processes', kind: 'cas-usage', topics: ['automatisation'] },
  '/cas-usages/finance-comptabilite': { label_fr: 'IA et automatisation de la comptabilité', label_en: 'AI and accounting automation', kind: 'cas-usage', topics: ['automatisation', 'donnees'] },
  '/cas-usages/rh': { label_fr: 'IA et automatisation des ressources humaines', label_en: 'AI and HR automation', kind: 'cas-usage', topics: ['automatisation', 'conformite'] },
  '/ressources/guides/taches-a-automatiser-pme': { label_fr: "Guide : quelles tâches automatiser d'abord", label_en: 'Guide: which tasks to automate first', kind: 'guide', topics: ['automatisation', 'conseil'] },
  '/blog/agent-ia-vs-automatisation-classique-2026': { label_fr: 'Agent IA ou automatisation classique', label_en: 'AI agent or classic automation', kind: 'article', topics: ['agents', 'automatisation'] },
  '/ressources/guides/agent-ia-definition': { label_fr: 'Agent IA : définition et limites', label_en: 'AI agent: definition and limits', kind: 'guide', topics: ['agents', 'automatisation'] },
  '/ressources/guides/llm-rag-dirigeant': { label_fr: 'LLM et RAG : définitions pour dirigeants', label_en: 'LLM and RAG: definitions for business owners', kind: 'guide', topics: ['agents', 'claude'] },
  '/blog/workflow-ia-exemples-pme': { label_fr: 'Workflow IA : cinq exemples concrets', label_en: 'AI workflow: five concrete examples', kind: 'article', topics: ['automatisation', 'agents'] },
  '/blog/agent-ia-entreprise-exemples': { label_fr: 'Agent IA en entreprise : exemples par fonction', label_en: 'AI agents in business: examples by function', kind: 'article', topics: ['agents', 'automatisation'] },
  '/ressources/guides/claude-duet': { label_fr: "Claude Duet : l'agent proactif d'Anthropic", label_en: "Claude Duet: Anthropic's proactive agent", kind: 'guide', topics: ['claude', 'agents'] },
  '/ressources/guides/chatgpt-dots': { label_fr: 'ChatGPT dots : les agents toujours actifs d\'OpenAI', label_en: "ChatGPT dots: OpenAI's always-on agents", kind: 'guide', topics: ['agents', 'claude'] },
  '/ressources/comparatifs/claude-duet-vs-chatgpt-dots': { label_fr: 'Claude Duet ou ChatGPT dots', label_en: 'Claude Duet or ChatGPT dots', kind: 'comparatif', topics: ['agents', 'claude'] },
  '/ressources/guides/hermes-agent': { label_fr: "Hermes Agent : l'agent open source qui apprend", label_en: 'Hermes Agent: the open source agent that learns', kind: 'guide', topics: ['agents', 'automatisation'] },
  '/ressources/guides/openclaw': { label_fr: 'OpenClaw 2.0 : fonctions, sécurité et usage en entreprise', label_en: 'OpenClaw 2.0: features, security and business use', kind: 'guide', topics: ['agents', 'automatisation'] },
  '/ressources/comparatifs/hermes-agent-vs-openclaw': { label_fr: 'Hermes Agent ou OpenClaw', label_en: 'Hermes Agent or OpenClaw', kind: 'comparatif', topics: ['agents', 'automatisation'] },
  '/blog/agents-ia-toujours-actifs-pme': { label_fr: 'Agent IA toujours actif : propriétaire ou open source', label_en: 'Always-on AI agents: proprietary or open source', kind: 'article', topics: ['agents', 'claude'] },
  '/blog/claude-duet-lancement-21-octobre-2026': { label_fr: "Claude Duet est lancé : ce qu'Anthropic a annoncé", label_en: "Claude Duet is launched: what Anthropic announced", kind: 'article', topics: ['claude', 'agents'] },
  '/blog/claude-duet-ou-claude-cowork': { label_fr: "Claude Duet ou Claude Cowork : la différence", label_en: "Claude Duet or Claude Cowork: the difference", kind: 'article', topics: ['claude', 'agents'] },
  '/blog/claude-duet-france-acces-rgpd': { label_fr: "Claude Duet en France : accès et RGPD", label_en: "Claude Duet in France: access and GDPR", kind: 'article', topics: ['claude', 'conformite'] },
  '/blog/chatgpt-dots-europe-disponibilite': { label_fr: "ChatGPT dots en Europe : disponibilité", label_en: "ChatGPT dots in Europe: availability", kind: 'article', topics: ['agents', 'claude'] },
  '/blog/chatgpt-dots-regles-personnalisees-approbations': { label_fr: "ChatGPT dots : règles et approbations", label_en: "ChatGPT dots: rules and approvals", kind: 'article', topics: ['agents', 'conformite'] },
  '/blog/chatgpt-dots-depuis-le-lancement': { label_fr: "ChatGPT dots depuis le lancement : ce qui a changé", label_en: "ChatGPT dots since launch: what has changed", kind: 'article', topics: ['agents', 'claude'] },
  '/blog/installer-hermes-agent-premier-agent': { label_fr: "Installer Hermes Agent : un premier agent prudent", label_en: "Installing Hermes Agent: a careful first agent", kind: 'article', topics: ['agents', 'automatisation'] },
  '/blog/hermes-agent-v0-22-modeles-locaux-connecteurs': { label_fr: "Hermes Agent v0.22 : modèles locaux et connecteurs", label_en: "Hermes Agent v0.22: local models and connectors", kind: 'article', topics: ['agents', 'automatisation'] },
  '/blog/openclaw-2-0-migration-changements': { label_fr: "OpenClaw 2.0 : changements et migration", label_en: "OpenClaw 2.0: changes and migration", kind: 'article', topics: ['agents', 'automatisation'] },
  '/blog/securiser-openclaw-checklist': { label_fr: "Sécuriser OpenClaw : checklist avant production", label_en: "Securing OpenClaw: pre-production checklist", kind: 'article', topics: ['agents', 'conformite'] },
  '/blog/agent-ia-toujours-actif-missions-pme': { label_fr: "Agent IA toujours actif : sept missions pour une PME", label_en: "Always-on AI agent: seven missions for an SMB", kind: 'article', topics: ['agents', 'automatisation'] },
  '/blog/cout-agent-ia-toujours-actif': { label_fr: "Coût d'un agent IA toujours actif", label_en: "Cost of an always-on AI agent", kind: 'article', topics: ['agents', 'conseil'] },

  // ── Agents IA et Claude ──
  '/services/agents-ia': { label_fr: 'Agents IA pour entreprise', label_en: 'AI agents for business', kind: 'service', topics: ['agents', 'claude'] },
  '/services/agents-ia-open-source': { label_fr: 'Agents IA open source : déploiement et exploitation', label_en: 'Open source AI agents: deployment and operations', kind: 'service', topics: ['agents', 'automatisation'] },
  '/services/integration-hermes-agent': { label_fr: 'Intégration Hermes Agent en entreprise', label_en: 'Hermes Agent integration for business', kind: 'service', topics: ['agents', 'automatisation'] },
  '/services/integration-openclaw': { label_fr: 'Intégration OpenClaw en entreprise', label_en: 'OpenClaw integration for business', kind: 'service', topics: ['agents', 'automatisation'] },
  '/services/agent-support-client': { label_fr: 'Agence chatbot et agent de service client', label_en: 'Chatbot and customer service agent', kind: 'service', topics: ['agents'] },
  '/services/agent-qualification-leads': { label_fr: 'Agent IA de qualification de leads', label_en: 'AI lead qualification agent', kind: 'service', topics: ['agents', 'commercial'] },
  '/services/agent-traitement-documents': { label_fr: 'Agent IA de traitement de documents', label_en: 'AI document processing agent', kind: 'service', topics: ['agents', 'automatisation'] },
  '/cas-usages/support-sav': { label_fr: 'Automatiser le service client et le SAV', label_en: 'Automating customer service', kind: 'cas-usage', topics: ['agents', 'automatisation'] },
  '/cas-clients/brow-x-professionnel': { label_fr: 'Cas client : Brow.X Professionnel', label_en: 'Case: Brow.X Professionnel', kind: 'cas-client', topics: ['agents', 'automatisation'] },
  '/services/base-de-connaissance-ia': { label_fr: 'Base de connaissance IA', label_en: 'AI knowledge base', kind: 'service', topics: ['agents', 'claude'] },
  '/ressources/guides/second-cerveau-entreprise': { label_fr: 'Second cerveau en entreprise : quand il vaut le coût', label_en: 'Company second brain: when it is worth the cost', kind: 'guide', topics: ['agents', 'claude', 'conseil'] },
  '/services/integration-claude': { label_fr: 'Claude en entreprise', label_en: 'Claude for business', kind: 'service', topics: ['claude', 'agents'] },
  '/services/integration-mistral-ai': { label_fr: 'Intégration Mistral AI aux outils métier', label_en: 'Mistral AI integration for business tools', kind: 'service', topics: ['claude', 'agents'] },
  '/services/integration-chatgpt-openai': { label_fr: 'Intégration ChatGPT et OpenAI aux outils métier', label_en: 'ChatGPT and OpenAI integration for business tools', kind: 'service', topics: ['claude', 'agents'] },
  '/ressources/guides/claude-pme': { label_fr: 'Guide complet : déployer Claude en PME', label_en: 'Pillar guide: deploying Claude in an SMB', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/choisir-agence-ia-pme': { label_fr: 'Choisir une agence IA en PME', label_en: 'Choosing an AI agency for an SMB', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/cout-integration-claude-pme': { label_fr: "Coût d'une intégration Claude en PME", label_en: 'Cost of a Claude integration for SMBs', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/financement-formation-ia-opco': { label_fr: 'Financer une formation IA avec un OPCO', label_en: 'Funding AI training through an OPCO', kind: 'guide', topics: ['formation', 'conformite', 'claude'] },
  '/ressources/guides/claude-rgpd-pme': { label_fr: 'Claude et RGPD en PME', label_en: 'Claude and GDPR for SMBs', kind: 'guide', topics: ['claude', 'conformite'] },
  '/ressources/guides/combien-coute-un-agent-ia-pme': { label_fr: 'Combien coûte un agent IA', label_en: 'How much an AI agent costs', kind: 'guide', topics: ['agents', 'automatisation'] },
  '/ressources/guides/cout-projet-ia-pme': { label_fr: 'Combien coûte un projet IA en PME', label_en: 'How much an AI project costs an SMB', kind: 'guide', topics: ['conseil', 'automatisation'] },
  '/ressources/guides/aides-financement-projet-ia': { label_fr: "Aides et financements d'un projet IA", label_en: 'Funding an AI project', kind: 'guide', topics: ['conseil', 'formation'] },
  '/ressources/guides/agent-sav-architecture': { label_fr: "Agent IA de service client : architecture et mesure", label_en: 'AI customer service agent: architecture and measurement', kind: 'guide', topics: ['agents', 'automatisation'] },
  '/ressources/comparatifs/n8n-vs-make-vs-zapier': { label_fr: 'n8n, Make ou Zapier : le comparatif', label_en: 'n8n vs Make vs Zapier', kind: 'comparatif', topics: ['automatisation'] },
  '/blog/automatiser-relance-devis-n8n': { label_fr: 'Automatiser la relance de devis avec n8n', label_en: 'Automate quote follow-ups with n8n', kind: 'article', topics: ['automatisation', 'commercial'] },
  '/blog/trier-emails-entrant-claude-n8n': { label_fr: 'Trier ses e-mails avec Claude et n8n', label_en: 'Sort emails with Claude and n8n', kind: 'article', topics: ['automatisation', 'claude', 'agents'] },
  '/ressources/guides/tutoriel-make-tri-emails-claude': { label_fr: 'Tutoriel Make : trier ses e-mails avec Claude', label_en: 'Make tutorial: sort emails with Claude', kind: 'guide', topics: ['automatisation', 'claude'] },
  '/blog/creer-agent-ia-claude': { label_fr: 'Agent IA Claude : quatre façons de le construire', label_en: 'Claude AI agent: four ways to build one', kind: 'article', topics: ['agents', 'claude'] },
  '/blog/claude-microsoft-copilot-pme': { label_fr: 'Claude dans Microsoft Copilot', label_en: 'Claude in Microsoft Copilot', kind: 'article', topics: ['claude', 'conformite'] },
  '/blog/connecter-claude-wordpress-shopify-mcp': { label_fr: 'Connecter Claude à WordPress et Shopify', label_en: 'Connecting Claude to WordPress and Shopify', kind: 'article', topics: ['claude', 'web'] },
  '/ressources/guides/claude-for-small-business': { label_fr: 'Claude for Small Business en France', label_en: 'Claude for Small Business in France', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/claude-cowork': { label_fr: 'Claude Cowork est désormais Claude', label_en: 'Claude Cowork is now Claude', kind: 'guide', topics: ['claude', 'conformite'] },
  '/ressources/guides/mcp-claude': { label_fr: 'Guide MCP : brancher Claude à vos outils', label_en: 'MCP guide: connecting Claude to your tools', kind: 'guide', topics: ['claude', 'agents'] },
  '/ressources/guides/claude-fonctionnalites-pme': { label_fr: 'Guide : fonctionnalités, offres et prix de Claude', label_en: 'Guide: Claude features, plans and pricing', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/quel-modele-claude-choisir': { label_fr: 'Quel modèle Claude choisir : Opus, Sonnet ou Haiku', label_en: 'Which Claude model to choose: Opus, Sonnet or Haiku', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/claude-managed-agents': { label_fr: 'Claude Managed Agents : prix, limites et données', label_en: 'Claude Managed Agents: pricing, limits and data', kind: 'guide', topics: ['claude', 'agents'] },
  '/ressources/guides/claude-tpe': { label_fr: 'Claude pour une TPE : abonnement et premiers usages', label_en: 'Claude for a very small business: plan and first uses', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/claude-in-chrome-entreprise': { label_fr: 'Claude in Chrome en entreprise : installer et encadrer', label_en: 'Claude in Chrome for business: install and govern', kind: 'guide', topics: ['claude', 'conformite'] },
  '/ressources/guides/prompt-engineering-pme': { label_fr: 'Prompt engineering en PME : méthode et gabarits', label_en: 'Prompt engineering for SMBs: method and templates', kind: 'guide', topics: ['formation', 'claude'] },
  '/ressources/guides/claude-finance-pme': { label_fr: "Claude pour la finance d'une PME : factures, clôture, trésorerie", label_en: "Claude for an SMB's finance function: invoices, closing, cash", kind: 'guide', topics: ['claude', 'automatisation'] },
  '/ressources/guides/claude-gratuit': { label_fr: "Claude gratuit : ce que permet l'offre Free", label_en: 'Free Claude: what the Free plan allows', kind: 'guide', topics: ['claude', 'conformite'] },
  '/ressources/outils/guide-achat-claude-pme': { label_fr: "Guide d'achat Claude pour PME (PDF)", label_en: "Claude buyer's guide for SMBs (PDF)", kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/outils/grille-audit-site-internet': { label_fr: "Grille d'audit de site internet (PDF)", label_en: 'Website audit grid (PDF)', kind: 'guide', topics: ['web', 'conseil'] },
  '/ressources/guides/claude-skills': { label_fr: 'Guide : skills Claude en entreprise', label_en: 'Guide: Claude skills in business', kind: 'guide', topics: ['claude', 'agents'] },
  '/ressources/outils/pack-skills-claude-pme': { label_fr: 'Pack de 8 skills Claude pour PME', label_en: 'Pack of 8 Claude skills for SMBs', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/guides/claude-plugins-entreprise': { label_fr: 'Guide des plugins Claude en entreprise', label_en: 'Claude plugins for business guide', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/outils/kit-conformite-claude-entreprise': { label_fr: 'Kit conformité Claude en entreprise', label_en: 'Claude compliance kit for business', kind: 'guide', topics: ['claude', 'conformite'] },
  '/ressources/guides/claude-code-entreprise': { label_fr: 'Guide Claude Code en entreprise', label_en: 'Claude Code for business guide', kind: 'guide', topics: ['claude', 'applications', 'formation'] },
  '/ressources/guides/claude-design': { label_fr: 'Claude Design en PME : usages et limites', label_en: 'Claude Design for SMBs: uses and limits', kind: 'guide', topics: ['claude', 'applications'] },
  '/cas-clients/inbound-value': { label_fr: 'Cas client : Inbound Value', label_en: 'Case: Inbound Value', kind: 'cas-client', topics: ['agents', 'claude'] },
  '/ressources/comparatifs/claude-vs-chatgpt-pme': { label_fr: 'Claude ou ChatGPT pour une PME', label_en: 'Claude or ChatGPT for an SMB', kind: 'comparatif', topics: ['claude', 'agents'] },
  '/ressources/comparatifs/mistral-vs-claude-pme': { label_fr: 'Mistral AI ou Claude pour une PME', label_en: 'Mistral AI or Claude for an SMB', kind: 'comparatif', topics: ['claude', 'conformite'] },
  '/ressources/comparatifs/chatgpt-claude-gemini-perplexity-pme': { label_fr: 'ChatGPT, Claude, Gemini ou Perplexity : quelle IA choisir', label_en: 'ChatGPT, Claude, Gemini or Perplexity: which AI to choose', kind: 'comparatif', topics: ['claude', 'conseil'] },
  '/ressources/comparatifs/claude-platform-vs-openai-platform': { label_fr: 'Claude Platform ou OpenAI Platform', label_en: 'Claude Platform or OpenAI Platform', kind: 'comparatif', topics: ['claude', 'agents'] },
  '/cas-clients/isabelle-diaz-naturopathe': { label_fr: 'Cas client : Isabelle Diaz', label_en: 'Case: Isabelle Diaz', kind: 'cas-client', topics: ['agents', 'acquisition'] },
  '/ressources/comparatifs/claude-code-vs-cursor': { label_fr: 'Claude Code ou Cursor', label_en: 'Claude Code or Cursor', kind: 'comparatif', topics: ['claude', 'applications'] },

  // ── Applications métier et données ──
  '/services/applications-internes': { label_fr: 'Application métier sur mesure', label_en: 'Custom business application', kind: 'service', topics: ['applications'] },
  '/services/mvp-saas': { label_fr: 'Développement de MVP SaaS', label_en: 'SaaS MVP development', kind: 'service', topics: ['applications'] },
  '/services/portail-client': { label_fr: 'Portail client sur mesure', label_en: 'Custom client portal', kind: 'service', topics: ['applications'] },
  '/services/back-office-sur-mesure': { label_fr: 'Back-office sur mesure', label_en: 'Custom back office', kind: 'service', topics: ['applications'] },
  '/blog/applications-internes-build-vs-buy-pme': { label_fr: 'Développer ou acheter son outil interne', label_en: 'Build or buy your internal tool', kind: 'article', topics: ['applications'] },
  '/ressources/comparatifs/lovable-vs-developpement-sur-mesure': { label_fr: 'Lovable ou développement sur mesure', label_en: 'Lovable or custom development', kind: 'comparatif', topics: ['applications'] },
  '/blog/poc-ou-mvp-differences-pme': { label_fr: 'POC ou MVP : quel test avant de financer', label_en: 'POC or MVP: which test before funding', kind: 'article', topics: ['applications', 'conseil'] },
  '/cas-clients/les-carnets-de-montpellier': { label_fr: 'Cas client : Les Carnets de Montpellier', label_en: 'Case: Les Carnets de Montpellier', kind: 'cas-client', topics: ['applications', 'agents'] },
  '/cas-clients/waimia-os': { label_fr: 'Projet interne : Waimia OS', label_en: 'Internal project: Waimia OS', kind: 'cas-client', topics: ['agents', 'applications'] },
  '/cas-clients/virtuoseos': { label_fr: 'Projet interne : VirtuoseOS', label_en: 'Internal project: VirtuoseOS', kind: 'cas-client', topics: ['applications', 'agents'] },
  '/cas-clients/prototypes-internes': { label_fr: 'Projets internes : trois prototypes', label_en: 'Internal projects: three prototypes', kind: 'cas-client', topics: ['applications', 'agents'] },
  '/services/donnees-reporting': { label_fr: 'Tableau de bord automatisé', label_en: 'Automated dashboard', kind: 'service', topics: ['donnees', 'applications'] },
  '/services/tableau-de-bord-direction': { label_fr: 'Tableau de bord de direction', label_en: 'Management dashboard', kind: 'service', topics: ['donnees'] },
  '/services/centralisation-donnees': { label_fr: 'Centralisation des données', label_en: 'Data centralisation', kind: 'service', topics: ['donnees'] },
  '/services/reporting-automatise': { label_fr: 'Reporting automatisé', label_en: 'Automated reporting', kind: 'service', topics: ['donnees'] },
  '/blog/tableau-de-bord-pme-quelles-donnees-suivre': { label_fr: 'Tableau de bord : quelles données suivre', label_en: 'Dashboard: which data to track', kind: 'article', topics: ['donnees'] },
  '/cas-usages/centraliser-donnees': { label_fr: 'Centraliser données et reporting', label_en: 'Centralise your data', kind: 'cas-usage', topics: ['donnees'] },

  // ── Commercial : prospection, CRM, suivi ──
  '/services/systeme-commercial': { label_fr: 'Système commercial', label_en: 'Sales system', kind: 'service', topics: ['commercial'] },
  '/services/prospection-automatisee': { label_fr: 'Prospection automatisée', label_en: 'Automated prospecting', kind: 'service', topics: ['commercial'] },
  '/services/prospection-linkedin': { label_fr: 'Prospection LinkedIn B2B', label_en: 'B2B LinkedIn prospecting', kind: 'service', topics: ['commercial'] },
  '/services/social-selling-ia': { label_fr: "Social selling avec l'IA", label_en: 'Social selling with AI', kind: 'service', topics: ['commercial'] },
  '/services/automatisation-reseaux-sociaux': { label_fr: 'Automatisation des réseaux sociaux', label_en: 'Social media automation', kind: 'service', topics: ['commercial'] },
  '/services/cold-email-b2b': { label_fr: 'Cold email B2B', label_en: 'B2B cold email', kind: 'service', topics: ['commercial'] },
  '/services/crm-scoring-routing': { label_fr: 'Automatisation CRM', label_en: 'CRM automation', kind: 'service', topics: ['commercial', 'donnees'] },
  '/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche': { label_fr: 'CRM sur mesure ou CRM du marché', label_en: 'Custom or off-the-shelf CRM', kind: 'comparatif', topics: ['commercial', 'applications'] },
  '/services/sequences-de-suivi': { label_fr: 'Relance automatisée des devis et factures', label_en: 'Automated quote and invoice follow-ups', kind: 'service', topics: ['commercial'] },
  '/ressources/guides/devis-automatise': { label_fr: 'Guide : automatiser ses devis', label_en: 'Guide: automating your quotes', kind: 'guide', topics: ['commercial', 'automatisation'] },
  '/blog/cabler-son-crm-en-10-jours': { label_fr: 'Câbler son CRM en 10 jours', label_en: 'Wire your CRM in 10 days', kind: 'article', topics: ['commercial', 'donnees'] },
  '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil': { label_fr: 'Automatiser ses relances B2B', label_en: 'Automate B2B follow-ups', kind: 'article', topics: ['commercial'] },
  '/cas-usages/generer-plus-de-leads': { label_fr: 'Automatiser le suivi commercial', label_en: 'Generate more leads', kind: 'cas-usage', topics: ['commercial', 'acquisition'] },

  // ── Conseil, audit, conformité ──
  '/audit-ia-pme': { label_fr: "L'audit IA pour PME", label_en: 'AI audit for SMBs', kind: 'audit', topics: ['conseil'], emit: false },
  '/services/consultant-ia-claude': { label_fr: 'Consultant IA', label_en: 'AI consultant', kind: 'service', topics: ['conseil', 'claude'] },
  '/conformite-ia': { label_fr: 'Conformité IA : RGPD et AI Act', label_en: 'AI compliance: GDPR and AI Act', kind: 'service', topics: ['conformite', 'conseil'] },
  '/ressources/guides/ai-act-pme-calendrier': { label_fr: 'AI Act pour PME : le calendrier à jour', label_en: 'AI Act for SMBs: the current timeline', kind: 'guide', topics: ['conformite', 'conseil'] },
  '/ressources/guides/chatbot-transparence-article-50': { label_fr: "Chatbot et AI Act : l'obligation de transparence (article 50)", label_en: 'Chatbot and AI Act: the Article 50 transparency obligation', kind: 'guide', topics: ['conformite', 'agents'] },
  '/ressources/guides/rgpd-agents-ia-checklist': { label_fr: 'RGPD et agents IA : 12 points avant de déployer', label_en: 'GDPR and AI agents: 12 checks before you deploy', kind: 'guide', topics: ['conformite', 'agents'] },
  '/ressources/guides/n8n-auto-heberge-rgpd': { label_fr: 'n8n auto-hébergé ou cloud : que change le RGPD ?', label_en: 'Self-hosted n8n or cloud: what does the GDPR change?', kind: 'guide', topics: ['conformite', 'automatisation'] },
  '/ressources/outils/checklist-90-jours-claude': { label_fr: 'Checklist 90 jours pour déployer Claude', label_en: '90-day Claude deployment checklist', kind: 'guide', topics: ['claude', 'conseil'] },
  '/ressources/diagnostics/maturite-ia': { label_fr: 'Diagnostic de maturité IA', label_en: 'AI maturity diagnostic', kind: 'diagnostic', topics: ['conseil'] },
  '/ressources/outils/calculateur-roi-ia': { label_fr: 'Calculateur de ROI IA', label_en: 'AI ROI calculator', kind: 'diagnostic', topics: ['conseil', 'automatisation'] },
  '/ressources/guides/roi-automatisation': { label_fr: "Guide : mesurer le ROI d'une automatisation", label_en: 'Guide: measuring automation ROI', kind: 'guide', topics: ['conseil', 'automatisation'] },
  '/ressources/outils/grille-taches-a-automatiser': { label_fr: 'Grille des tâches à automatiser', label_en: 'Task automation grid', kind: 'diagnostic', topics: ['automatisation', 'conseil'] },
  '/ressources/outils/charte-ia-entreprise': { label_fr: 'Modèle de charte IA pour PME', label_en: 'AI charter template for SMBs', kind: 'guide', topics: ['conformite', 'conseil'] },
  '/blog/ia-pme-guide-complet-2026': { label_fr: 'IA pour PME en 2026 : le guide complet', label_en: 'Applied AI for SMBs in 2026', kind: 'article', topics: ['conseil'] },
  '/blog/forward-deployed-engineer': { label_fr: "Forward deployed engineer : le rôle", label_en: 'Forward deployed engineer: the role', kind: 'article', topics: ['conseil', 'studio'] },
  '/blog/architecte-ia-role-pme': { label_fr: 'Architecte IA : le rôle en PME', label_en: 'AI architect: the role in an SMB', kind: 'article', topics: ['conseil', 'claude'] },
  '/tarifs': { label_fr: 'Tarifs', label_en: 'Pricing', kind: 'studio', topics: ['conseil', 'studio'], emit: false },

  // ── Formation ──
  '/formations': { label_fr: 'Formations IA et automatisation', label_en: 'AI and automation training', kind: 'formation', topics: ['formation'], emit: false },
  '/formations/automatisation': { label_fr: 'Formation automatisation', label_en: 'Automation training', kind: 'formation', topics: ['formation', 'automatisation'] },
  '/formations/n8n': { label_fr: 'Formation n8n', label_en: 'n8n training', kind: 'formation', topics: ['formation', 'automatisation'] },
  '/formations/make': { label_fr: 'Formation Make', label_en: 'Make training', kind: 'formation', topics: ['formation', 'automatisation'] },
  '/formations/claude': { label_fr: 'Formation Claude', label_en: 'Claude training', kind: 'formation', topics: ['formation', 'claude'] },
  '/formations/claude-code': { label_fr: 'Formation Claude Code', label_en: 'Claude Code training', kind: 'formation', topics: ['formation', 'claude'] },
  '/formations/chatgpt': { label_fr: 'Formation ChatGPT', label_en: 'ChatGPT training', kind: 'formation', topics: ['formation', 'claude'] },
  '/blog/formation-ia-cpf-qualiopi': { label_fr: 'Financer une formation IA : CPF, OPCO', label_en: 'Funding AI training: CPF, OPCO', kind: 'article', topics: ['formation', 'conseil'] },
  '/blog/formation-ia-finance-pme': { label_fr: 'Formation IA pour une équipe finance', label_en: 'AI training for finance teams', kind: 'article', topics: ['formation', 'donnees'] },

  // ── Acquisition : SEO, GEO et marque ──
  '/services/systeme-acquisition': { label_fr: "Système d'acquisition", label_en: 'Acquisition system', kind: 'service', topics: ['acquisition'] },

  // ── Site web et développement (thème `web`) : cas, services de site, secteurs « Site web et IA »
  //    puis guide de refonte. Cet ordre fait l'anneau. ──
  '/cas-clients/amploi': { label_fr: 'Cas client : Amploi', label_en: 'Case: Amploi', kind: 'cas-client', topics: ['web'] },
  '/cas-clients/balzeo': { label_fr: 'Cas client : Balzeo', label_en: 'Case: Balzeo', kind: 'cas-client', topics: ['web'] },
  '/cas-clients/sprinkable-airess': { label_fr: 'Cas client : Sprinkable et Airess', label_en: 'Case: Sprinkable and Airess', kind: 'cas-client', topics: ['web'] },
  '/services/site-web-ia': { label_fr: 'Agence site web', label_en: 'Web agency', kind: 'service', topics: ['web'] },
  '/services/webflow': { label_fr: 'Agence Webflow', label_en: 'Webflow agency', kind: 'service', topics: ['web'] },
  '/services/wordpress': { label_fr: 'Agence WordPress', label_en: 'WordPress agency', kind: 'service', topics: ['web'] },
  '/services/shopify': { label_fr: 'Agence Shopify', label_en: 'Shopify agency', kind: 'service', topics: ['web'] },
  '/services/sur-mesure-headless': { label_fr: 'Site sur mesure : Astro et CMS headless', label_en: 'Custom website: Astro and headless CMS', kind: 'service', topics: ['web'] },
  '/services/landing-pages-tunnels': { label_fr: 'Landing pages et tunnels', label_en: 'Landing pages and funnels', kind: 'service', topics: ['web'] },
  '/secteurs/agence': { label_fr: 'Site web et IA pour les agences', label_en: 'Website and AI for agencies', kind: 'secteur', topics: ['web'], emit: false },
  '/secteurs/conseil': { label_fr: 'Site web et IA pour les cabinets de conseil', label_en: 'Website and AI for consulting firms', kind: 'secteur', topics: ['web'], emit: false },
  '/secteurs/esn': { label_fr: 'Site web et IA pour les ESN', label_en: 'Website and AI for IT services firms', kind: 'secteur', topics: ['web'], emit: false },
  '/secteurs/industrie': { label_fr: 'Site web et IA pour les PME industrielles', label_en: 'Website and AI for industrial SMBs', kind: 'secteur', topics: ['web'], emit: false },
  '/ressources/guides/refonte-site-internet': { label_fr: 'Refonte de site internet : le guide', label_en: 'Website redesign: the guide', kind: 'guide', topics: ['web'] },

  // ── Acquisition (suite) ──
  '/services/audit-seo-technique': { label_fr: 'Audit SEO technique', label_en: 'Technical SEO audit', kind: 'service', topics: ['acquisition'] },
  '/services/seo-geo-contenu': { label_fr: 'Agence SEO et référencement naturel', label_en: 'SEO and organic search agency', kind: 'service', topics: ['acquisition'] },
  '/ressources/comparatifs/geo-vs-seo': { label_fr: 'GEO ou SEO', label_en: 'GEO or SEO', kind: 'comparatif', topics: ['acquisition'] },
  '/blog/seo-geo-etre-cite-par-les-ia-generatives': { label_fr: 'Être cité par les IA génératives', label_en: 'Get cited by generative AI', kind: 'article', topics: ['acquisition'] },
  '/services/referencement-ia': { label_fr: 'Agence GEO : être cité par les IA', label_en: 'GEO agency: get cited by AI', kind: 'service', topics: ['acquisition'] },
  '/services/redaction-seo-contenu': { label_fr: 'Rédaction SEO et contenu', label_en: 'SEO writing and content', kind: 'service', topics: ['acquisition'] },
  '/blog/contenu-ia-seo-google-penalise': { label_fr: 'Contenu IA et SEO : ce que Google pénalise', label_en: 'AI content and SEO: what Google penalises', kind: 'article', topics: ['acquisition'] },
  '/services/seo-local': { label_fr: 'SEO local', label_en: 'Local SEO', kind: 'service', topics: ['acquisition'] },
  '/services/branding': { label_fr: 'Agence de branding', label_en: 'Branding agency', kind: 'service', topics: ['acquisition'] },
  '/services/identite-de-marque': { label_fr: 'Identité de marque', label_en: 'Brand identity', kind: 'service', topics: ['acquisition'] },
  '/services/refonte-de-marque': { label_fr: 'Refonte de marque', label_en: 'Rebranding', kind: 'service', topics: ['acquisition'] },
  '/services/naming-et-positionnement': { label_fr: 'Naming et positionnement', label_en: 'Naming and positioning', kind: 'service', topics: ['acquisition'] },
  '/services/charte-graphique-brand-book': { label_fr: 'Charte graphique et brand book', label_en: 'Brand guidelines and brand book', kind: 'service', topics: ['acquisition'] },
  '/ressources/comparatifs/site-web-intelligent-vs-wordpress': { label_fr: 'Site web intelligent ou WordPress', label_en: 'Smart website or WordPress', kind: 'comparatif', topics: ['acquisition'] },
  '/blog/logiciel-seo-ia-pme': { label_fr: 'Logiciel SEO IA pour PME', label_en: 'AI SEO software for SMBs', kind: 'article', topics: ['acquisition'] },
  '/ressources/guides/mesurer-visibilite-ia-chatgpt': { label_fr: 'Mesurer sa visibilité dans ChatGPT : le protocole', label_en: 'Measuring your ChatGPT visibility: the protocol', kind: 'guide', topics: ['acquisition'] },
  '/blog/ai-mode-google-ai-overviews-pme': { label_fr: 'AI Mode et AI Overviews de Google : que faire en PME', label_en: 'Google AI Mode and AI Overviews: what a small business does', kind: 'article', topics: ['acquisition'] },
  '/blog/geo-local-recommande-par-les-ia': { label_fr: 'GEO local : être recommandé par les IA', label_en: 'Local GEO: getting recommended by AIs', kind: 'article', topics: ['acquisition'] },
  '/blog/chatgpt-shopping-e-commerce': { label_fr: 'ChatGPT Shopping : que corriger dans sa boutique', label_en: 'ChatGPT Shopping: what to fix in your shop', kind: 'article', topics: ['acquisition', 'web'] },
  '/ressources/guides/audit-geo-pme': { label_fr: 'Audit GEO : ce qu\'il vérifie, comment le mener', label_en: 'GEO audit: what it checks, how to run it', kind: 'guide', topics: ['acquisition'] },
  '/blog/etre-cite-par-perplexity': { label_fr: 'Être cité par Perplexity', label_en: 'Getting cited by Perplexity', kind: 'article', topics: ['acquisition'] },
  '/ressources/guides/accompagnement-ia-pme': { label_fr: 'Accompagnement IA en PME : les formes et les critères', label_en: 'AI support for SMBs: formats and criteria', kind: 'guide', topics: ['conseil', 'formation'] },
  '/ressources/comparatifs/formateur-ia-organisme-freelance-agence': { label_fr: 'Formateur IA : organisme, indépendant ou agence', label_en: 'AI trainer: training body, freelancer or agency', kind: 'comparatif', topics: ['formation', 'conseil'] },
  '/ressources/guides/refonte-logiciel-metier': { label_fr: 'Refonte d\'un logiciel métier : garder, refondre, remplacer', label_en: 'Business software overhaul: keep, rebuild, replace', kind: 'guide', topics: ['applications'] },
  '/blog/formation-ia-marketing-pme': { label_fr: 'Formation IA marketing en PME', label_en: 'AI marketing training for SMBs', kind: 'article', topics: ['formation', 'acquisition'] },
  '/blog/agent-ia-24-7-pme': { label_fr: 'Agent IA 24/7 en PME : ce qui reste humain', label_en: '24/7 AI agent for SMBs: what stays human', kind: 'article', topics: ['agents', 'automatisation'] },
  '/ressources/guides/cahier-des-charges-site-internet': { label_fr: 'Cahier des charges de site internet : le guide', label_en: 'Website specification: the guide', kind: 'guide', topics: ['web'] },
  '/blog/ia-auto-hebergee-open-webui-pme': { label_fr: 'IA auto-hébergée avec Open WebUI : pour quelle PME', label_en: 'Self-hosted AI with Open WebUI: for which SMB', kind: 'article', topics: ['conformite', 'claude'] },
  '/blog/audit-site-internet-pme': { label_fr: 'Audit de site internet : la grille avant refonte', label_en: 'Website audit: the grid before a redesign', kind: 'article', topics: ['web'] },
  '/blog/formation-ia-rh-pme': { label_fr: 'Formation IA pour une équipe RH', label_en: 'AI training for HR teams', kind: 'article', topics: ['formation', 'conformite'] },
  '/blog/chatbot-rh-pme': { label_fr: "Chatbot RH en PME : ce qu'il traite, ce qu'il laisse aux RH", label_en: 'HR chatbot for SMBs: what it handles, what stays with HR', kind: 'article', topics: ['agents', 'conformite'] },
  '/blog/relance-factures-impayees-automatique-pme': { label_fr: 'Relancer les factures impayées automatiquement', label_en: 'Automate unpaid invoice reminders', kind: 'article', topics: ['automatisation', 'commercial'] },
  '/ressources/guides/automatisation-factures-fournisseurs-pme': { label_fr: 'Automatisation des factures fournisseurs : déléguer et contrôler', label_en: 'Supplier invoice automation: what to delegate and check', kind: 'guide', topics: ['agents', 'automatisation'] },
  '/blog/ia-reponse-appel-offres-pme': { label_fr: "IA et appel d'offres : ce que la PME prépare et garde", label_en: 'AI and tenders: what a small business prepares and keeps', kind: 'article', topics: ['agents', 'automatisation'] },
  '/blog/claude-extension-chrome': { label_fr: 'Extension Claude pour Chrome : installer et dépanner', label_en: 'Claude extension for Chrome: install and troubleshoot', kind: 'article', topics: ['claude', 'conformite'] },
  '/blog/claude-cowork-windows': { label_fr: 'Claude Cowork sur Windows : installation et limites', label_en: 'Claude Cowork on Windows: installation and limits', kind: 'article', topics: ['claude', 'conformite'] },
  '/blog/claude-max-pme': { label_fr: 'Claude Max en PME : pour qui, et quand Pro suffit', label_en: 'Claude Max for an SMB: who it is for', kind: 'article', topics: ['claude', 'conseil'] },
  '/blog/ia-e-commercant': { label_fr: 'IA pour e-commerçant : Claude, ChatGPT ou Mistral', label_en: 'AI for online shops: Claude, ChatGPT or Mistral', kind: 'article', topics: ['conseil', 'commercial'] },
  '/blog/ia-organisme-de-formation': { label_fr: 'IA pour organisme de formation : Claude, ChatGPT ou Mistral', label_en: 'AI for training providers: Claude, ChatGPT or Mistral', kind: 'article', topics: ['conseil', 'conformite'] },
  '/blog/claude-pro-vs-team': { label_fr: 'Claude Pro ou Team : lequel choisir', label_en: 'Claude Pro vs Team: which to choose', kind: 'article', topics: ['claude', 'conseil'] },
  '/blog/facture-electronique-reception-pme': { label_fr: 'Facture électronique : ce que change la réception en PME', label_en: 'E-invoicing: what receiving changes for a small business', kind: 'article', topics: ['automatisation', 'conformite'] },
  '/blog/ai-act-pme-utilisatrice-ia': { label_fr: "AI Act : les obligations d'une PME qui utilise ChatGPT ou Claude", label_en: 'AI Act: what a small business using ChatGPT or Claude must do', kind: 'article', topics: ['conformite', 'conseil'] },
  '/blog/claude-code-skills': { label_fr: 'Skills Claude Code : créer et partager en équipe', label_en: 'Claude Code skills: create and share as a team', kind: 'article', topics: ['claude', 'applications'] },
  '/blog/cahier-des-charges-refonte-site': { label_fr: 'Cahier des charges de refonte : les cinq annexes', label_en: 'Redesign specification: the five appendices', kind: 'article', topics: ['web'] },
  '/blog/application-metier-exemples-pme': { label_fr: 'Application métier : définition, types et exemples', label_en: 'Business application: definition, types and examples', kind: 'article', topics: ['applications'] },
  '/cas-clients/desangles-peinture': { label_fr: 'Cas client : Desangles Peinture', label_en: 'Case: Desangles Peinture', kind: 'cas-client', topics: ['acquisition'] },

  // ── Secteurs (indexables depuis 2026-10-05) : cibles du maillage, sans bloc émis par
  //    Base (le gabarit secteur pose déjà le sien via `meshForSecteur`). ──
  '/secteurs/batiment': { label_fr: 'Automatisation des devis dans le bâtiment', label_en: 'Quote automation in construction', kind: 'secteur', topics: ['commercial', 'acquisition'], emit: false },
  '/secteurs/e-commerce': { label_fr: "Automatisation d'une boutique en ligne", label_en: 'Online shop automation', kind: 'secteur', topics: ['automatisation', 'agents'], emit: false },
  '/secteurs/startup-logiciel': { label_fr: 'IA et développement pour les éditeurs de logiciel', label_en: 'AI and development for software vendors', kind: 'secteur', topics: ['commercial', 'agents'], emit: false },

  // ── Studio : qui, comment, où ──
  '/agence': { label_fr: 'Le studio', label_en: 'The studio', kind: 'studio', topics: ['studio'], emit: false },
  '/agence/methode': { label_fr: 'La méthode', label_en: 'The method', kind: 'studio', topics: ['studio', 'conseil'], emit: false },
  '/equipe/simon-beros': { label_fr: 'Simon Beros, fondateur', label_en: 'Simon Beros, founder', kind: 'studio', topics: ['studio'], emit: false },
  '/technologies': { label_fr: 'Les technologies utilisées', label_en: 'Technologies used', kind: 'studio', topics: ['studio', 'automatisation'], emit: false },
  '/manifesto': { label_fr: 'Le manifeste', label_en: 'The manifesto', kind: 'studio', topics: ['studio'], emit: false },
  '/blog/brain-circuit': { label_fr: "L'iconographie de l'IA", label_en: 'The iconography of AI', kind: 'article', topics: ['studio'] },
  '/implantations': { label_fr: 'Où le studio intervient', label_en: 'Where the studio works', kind: 'implantation', topics: ['studio', 'acquisition'], emit: false },
  '/implantations/bordeaux': { label_fr: 'Agence IA à Bordeaux', label_en: 'AI agency in Bordeaux', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/montpellier': { label_fr: 'Agence IA à Montpellier', label_en: 'AI agency in Montpellier', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/lyon': { label_fr: 'Agence IA à Lyon', label_en: 'AI agency in Lyon', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/toulouse': { label_fr: 'Agence IA à Toulouse', label_en: 'AI agency in Toulouse', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/strasbourg': { label_fr: 'Agence IA à Strasbourg', label_en: 'AI agency in Strasbourg', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/lille': { label_fr: 'Agence IA à Lille', label_en: 'AI agency in Lille', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/marseille': { label_fr: 'Agence IA à Marseille', label_en: 'AI agency in Marseille', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/dijon': { label_fr: 'Agence IA à Dijon', label_en: 'AI agency in Dijon', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/nantes': { label_fr: 'Agence IA à Nantes', label_en: 'AI agency in Nantes', kind: 'implantation', topics: ['studio', 'acquisition'] },
  '/implantations/paris': { label_fr: 'Agence IA à Paris', label_en: 'AI agency in Paris', kind: 'implantation', topics: ['studio', 'acquisition'] },
};

/** Intitulé du groupe d'affichage par nature de page (ordre = ordre d'affichage). */
const GROUPS: Array<{ kinds: Kind[]; label_fr: string; label_en: string }> = [
  { kinds: ['service', 'audit'], label_fr: 'Services', label_en: 'Services' },
  { kinds: ['formation'], label_fr: 'Formations', label_en: 'Training' },
  { kinds: ['guide', 'comparatif', 'diagnostic'], label_fr: 'Guides et comparatifs', label_en: 'Guides and comparisons' },
  { kinds: ['cas-client', 'cas-usage'], label_fr: 'Cas concrets', label_en: 'Real cases' },
  { kinds: ['secteur'], label_fr: 'Par secteur', label_en: 'By sector' },
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
    // Un HUB de service émet d'abord TOUS ses enfants du catalogue (colonne du menu Solutions,
    // sitemap.ts : même source que l'OfferCatalog JSON-LD), puis complète par les anneaux.
    if ((SERVICE_HUB_PATHS as readonly string[]).includes(route)) {
      for (const child of hubChildren(route)) {
        if (child.url !== route && live.has(child.url) && !links.includes(child.url) && allowed(route, child.url)) {
          links.push(child.url);
        }
      }
    }
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

/** Plafond de liens par groupe du schéma `related-links` (packages/ds-kernel, `.max(6)`). */
const MAX_LINKS_PER_GROUP = 6;

/**
 * Hubs de service : enfants répartis par domaine, 6 liens au plus par groupe. Les hrefs
 * sont ceux de la colonne du menu (sitemap.ts, MM_SOLUTIONS_NEW) ; un enfant absent de
 * cette table retombe dans le regroupement par nature.
 */
const HUB_GROUPS: Record<string, Array<{ label_fr: string; label_en: string; hrefs: string[] }>> = {
  '/services/systeme-acquisition': [
    {
      label_fr: 'Site web',
      label_en: 'Website',
      hrefs: [
        '/services/site-web-ia',
        '/services/webflow',
        '/services/wordpress',
        '/services/shopify',
        '/services/sur-mesure-headless',
        '/services/landing-pages-tunnels',
      ],
    },
    {
      label_fr: 'Référencement naturel',
      label_en: 'Organic search',
      hrefs: [
        '/services/seo-geo-contenu',
        '/services/audit-seo-technique',
        '/services/referencement-ia',
        '/services/redaction-seo-contenu',
        '/services/seo-local',
      ],
    },
    {
      label_fr: 'Marque',
      label_en: 'Brand',
      hrefs: [
        '/services/branding',
        '/services/identite-de-marque',
        '/services/refonte-de-marque',
        '/services/naming-et-positionnement',
        '/services/charte-graphique-brand-book',
      ],
    },
  ],
  '/services/systemes-operationnels-ia': [
    {
      label_fr: 'Automatisation des processus',
      label_en: 'Process automation',
      hrefs: ['/services/automatisations', '/services/automatisation-n8n', '/services/automatisation-make'],
    },
    {
      label_fr: 'Agents IA',
      label_en: 'AI agents',
      hrefs: [
        '/services/agents-ia',
        '/services/agent-support-client',
        '/services/base-de-connaissance-ia',
        '/services/agent-qualification-leads',
        '/services/agent-traitement-documents',
      ],
    },
    {
      label_fr: 'Modèles et intégrations',
      label_en: 'Models and integrations',
      hrefs: ['/services/integration-claude', '/services/integration-mistral-ai', '/services/integration-chatgpt-openai'],
    },
  ],
  '/services/systeme-commercial': [
    {
      label_fr: 'Prospection automatisée',
      label_en: 'Automated prospecting',
      hrefs: [
        '/services/prospection-automatisee',
        '/services/prospection-linkedin',
        '/services/social-selling-ia',
        '/services/automatisation-reseaux-sociaux',
        '/services/cold-email-b2b',
      ],
    },
    {
      label_fr: 'CRM et suivi',
      label_en: 'CRM and follow-up',
      hrefs: ['/services/crm-scoring-routing', '/services/sequences-de-suivi'],
    },
  ],
};

/** Découpe tout groupe de plus de 6 liens en groupes successifs « (suite) ». */
function chunkGroups(groups: RelatedGroupOut[]): RelatedGroupOut[] {
  const out: RelatedGroupOut[] = [];
  for (const g of groups) {
    for (let i = 0; i < g.links.length; i += MAX_LINKS_PER_GROUP) {
      const part = i / MAX_LINKS_PER_GROUP;
      out.push({
        label_fr: part === 0 ? g.label_fr : `${g.label_fr} (suite)`,
        label_en: part === 0 ? g.label_en : `${g.label_en} (continued)`,
        links: g.links.slice(i, i + MAX_LINKS_PER_GROUP),
      });
    }
  }
  return out;
}

const KICKER = { fr: 'Explorer aussi', en: 'Explore more' };
const DEFAULT_H2 = { fr: 'Sur le même sujet', en: 'On the same topic' };

/** Plafond de groupes par section du schéma `related-links` (`.max(5)`). */
const MAX_GROUPS = 5;

/**
 * Ramène la liste à 5 groupes : les deux derniers sont fusionnés en « Pour aller plus loin »
 * (6 liens au plus, les premiers de l'ordre d'affichage) jusqu'à respecter le plafond.
 */
function capGroups(groups: RelatedGroupOut[]): RelatedGroupOut[] {
  const out = [...groups];
  while (out.length > MAX_GROUPS) {
    const b = out.pop()!;
    const a = out.pop()!;
    out.push({
      label_fr: 'Pour aller plus loin',
      label_en: 'Keep exploring',
      links: [...a.links, ...b.links].slice(0, MAX_LINKS_PER_GROUP),
    });
  }
  return out;
}

function assemble(groups: RelatedGroupOut[], h2: { fr: string; en: string } = DEFAULT_H2): RelatedLinksData {
  // Le plafond du schéma n'est jamais appliqué à l'exécution (donnée passée en `as any`) :
  // il est imposé ici, pour toutes les routes de maillage.
  return {
    type: 'related-links',
    kicker_fr: KICKER.fr,
    kicker_en: KICKER.en,
    h2_fr: h2.fr,
    h2_en: h2.en,
    groups: capGroups(chunkGroups(groups)),
  };
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
  const hub = HUB_GROUPS[normalize(pathname)];
  if (!hub) return assemble(groupByKind(links));
  // Hub de service : ses enfants sont répartis en groupes titrés par domaine ; les liens
  // d'anneau (autres natures de page) suivent, groupés par nature comme ailleurs.
  const placed = new Set<string>();
  const groups: RelatedGroupOut[] = [];
  for (const g of hub) {
    const inGroup = links.filter((l) => g.hrefs.includes(l));
    inGroup.forEach((l) => placed.add(l));
    if (inGroup.length > 0) groups.push({ label_fr: g.label_fr, label_en: g.label_en, links: inGroup.map(toLink) });
  }
  const rest = links.filter((l) => !placed.has(l));
  return assemble([...groups, ...groupByKind(rest)]);
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
  if (s.includes('industr')) return 'industrie';
  if (s.includes('conseil')) return 'conseil';
  return undefined;
}

/** Thèmes dominants par secteur : sert à proposer les bonnes pages sur une page secteur. */
const SECTEUR_TOPICS: Record<string, Topic[]> = {
  conseil: ['web', 'acquisition'],
  comptabilite: ['donnees', 'automatisation'],
  agence: ['web', 'acquisition'],
  industrie: ['web', 'applications'],
  formation: ['acquisition', 'automatisation'],
  esn: ['web', 'applications'],
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
  agence: '/cas-clients/amploi',
  conseil: '/cas-clients/amploi',
  industrie: '/cas-clients/sprinkable-airess',
  'e-commerce': '/cas-clients/balzeo',
  'liberal-independant': '/cas-clients/les-carnets-de-montpellier',
  'services-b2b': '/cas-clients/amploi',
  'startup-logiciel': '/cas-clients/amploi',
  therapeutes: '/cas-clients/isabelle-diaz-naturopathe',
};

/**
 * Maillage d'une page SECTEUR : les services, cas et ressources des deux thèmes dominants
 * du secteur. Les secteurs publiés sont aussi des CIBLES du registre (`kind: 'secteur'`).
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
      '/ressources/guides/mcp-claude',
      '/ressources/guides/ai-act-pme-calendrier',
      '/ressources/guides/taches-a-automatiser-pme',
      '/ressources/guides/roi-automatisation',
      '/ressources/comparatifs/claude-vs-chatgpt-pme',
      '/ressources/comparatifs/claude-duet-vs-chatgpt-dots',
      '/ressources/comparatifs/claude-platform-vs-openai-platform',
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
      '/services/agents-ia',
      '/services/agent-support-client',
      '/services/integration-claude',
      '/services/applications-internes',
      '/services/site-web-ia',
      '/services/seo-geo-contenu',
      '/cas-usages/support-sav',
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
