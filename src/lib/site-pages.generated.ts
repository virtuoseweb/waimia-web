// @generated par scripts/gen-site-pages.mjs · NE PAS ÉDITER À LA MAIN.
// Source de vérité = le SCRIPT (un .generated.ts édité à la main est reverté au build).
// Régénérer : npm run gen:site-pages
//
// PIVOT PAR PAGE du site (socle de la vue « sitemap » du builder) : toutes les vraies
// pages, groupées (SITE_GROUPS, ordre d'affichage) et ordonnées, chaque page listant ses
// sections dans l'ordre.
//   - editable: true  → page section-composable (`sections[]` JSON, éditable par le builder).
//   - editable: false → page rendue par template/prose (blog, cas, secteurs, outils, auteurs)
//                        ou page statique bespoke (accueil, hubs, agence, légal, conversion).

export interface SitePageSection {
  /** Type de section (clé du catalogue / registry). */
  type: string;
  /** Libellé reconnaissable : 1er champ de titre non vide, fallback `#<index>`. */
  label: string;
  /** Preset nommé si la section en porte un. */
  preset?: string;
  /** Variante si la section en porte une. */
  variant?: string;
  /** Fond (paper/paper-2/ink/...) si la section le précise. */
  background?: string;
}

export interface SitePage {
  /** Route publique réelle (commence par '/'). */
  route: string;
  /** Titre lisible (frontmatter title | humanisé du slug pour les pages bespoke). */
  title: string;
  /** Groupe de sitemap (id d'un SITE_GROUPS). */
  group: string;
  /** Collection Astro d'origine, ou 'bespoke' pour une page statique .astro. */
  collection: string;
  /** Chemin du fichier source relatif à src/content/ (pages issues d'une collection). */
  file?: string;
  /** true = sections[] JSON éditables ; false = page template/prose/bespoke. */
  editable: boolean;
  /** Sections dans l'ordre (vides pour les pages non section-composables). */
  sections: SitePageSection[];
}

export const SITE_PAGES: SitePage[] = [
  {
    "route": "/",
    "title": "Accueil",
    "group": "accueil",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/services",
    "title": "Services",
    "group": "offres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/services/agents-ia",
    "title": "Agence agents IA pour entreprise : conception et production",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agents IA pour votre entreprise",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Construire un agent autour d'un moteur ouvert, en cinq étapes",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Moteur ouvert, agent d'éditeur ou automatisation : le bon choix",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : la boîte contact@ d'une PME de services",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Un agent IA n'est pas la bonne réponse si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Trois réalisations avec des agents",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un agent IA",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#13",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Agents d'éditeur : Anthropic et OpenAI",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Agents open source : Hermes Agent et OpenClaw",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Agents IA : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quelle tâche confieriez-vous à un agent ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/agents-ia/agent-qualification-leads",
    "title": "Agent IA de qualification de leads · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia/agent-qualification-leads.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agent IA de qualification de leads",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : les demandes du site d'une PME de services",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Un agent de qualification n'est pas utile si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets voisins : le routage des demandes, et l'agent sous validation",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un agent de qualification de leads",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Agent de qualification de leads : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de demandes lisez-vous avant de trouver la bonne ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/agents-ia/agent-support-client",
    "title": "Agence chatbot et agent IA de service client · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia/agent-support-client.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Chatbot et agent IA pour votre service client",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Chatbot à règles ou agent conversationnel IA : lequel pour votre service client",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le SAV d'un distributeur B2B",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Un chatbot de support n'est pas utile si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Un cas en cours, et le projet interne qui pose les garde-fous",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un chatbot de service client",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#12",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Chatbot et agent de service client : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de demandes identiques recevez-vous chaque semaine ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/agents-ia/agent-traitement-documents",
    "title": "Agent IA de traitement de documents · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia/agent-traitement-documents.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agent IA de traitement de documents : factures, devis, contrats",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : les factures fournisseurs d'une PME de services",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Un agent de traitement de documents n'est pas utile si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Pas de cas de facturation publié : deux projets où l'agent lit, extrait puis passe la main",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un agent de traitement de documents",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Agent de traitement de documents : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de pièces ressaisissez-vous chaque semaine ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/agents-ia/agents-ia-open-source",
    "title": "Agents IA open source pour entreprise : Hermes Agent, OpenClaw · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia/agents-ia-open-source.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agents IA open source pour entreprise",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Le même moteur ouvert, installé tel quel ou déployé par Waimia",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Un service par moteur",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Déployer un agent IA open source en cinq étapes",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous est remis",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Un agent IA open source n'est pas la bonne réponse si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un agent IA open source",
        "background": "paper-2"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Agents IA open source : vos questions",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Comprendre les deux moteurs",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un moteur ouvert a-t-il sa place chez vous ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/agents-ia/agents-ia-open-source/integration-hermes-agent",
    "title": "Intégration Hermes Agent en entreprise · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia/agents-ia-open-source/integration-hermes-agent.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Hermes Agent en entreprise",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Hermes Agent installé par défaut, ou déployé avec méthode",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Déployer Hermes Agent en cinq étapes",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Hermes Agent n'est pas le bon moteur si",
        "background": "paper-2"
      },
      {
        "type": "pricing-cards",
        "label": "Prix de l'intégration de Hermes Agent",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Intégration de Hermes Agent : vos questions",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Hermes Agent a-t-il sa place chez vous, et à quelles conditions ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/agents-ia/agents-ia-open-source/integration-openclaw",
    "title": "Intégration OpenClaw en entreprise · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia/agents-ia-open-source/integration-openclaw.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "OpenClaw en entreprise",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "OpenClaw installé par défaut, ou déployé avec méthode",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Sécuriser et déployer OpenClaw en cinq étapes",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "OpenClaw n'est pas le bon moteur si",
        "background": "paper-2"
      },
      {
        "type": "pricing-cards",
        "label": "Prix de l'intégration d'OpenClaw",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Avant de brancher un agent sur vos messageries, écrivez les règles",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Intégration d'OpenClaw : vos questions",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "OpenClaw convient-il à votre usage, et que faut-il durcir avant ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/applications-internes",
    "title": "Logiciel sur mesure et application métier pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/applications-internes.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Application métier et logiciel sur mesure",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Application métier ou logiciel du marché : comment décider",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le suivi d'interventions d'une entreprise de maintenance",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ne faites pas développer d'application si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte une application sur mesure",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Application métier sur mesure : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quel tableur fait office de logiciel chez vous ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/applications-internes/back-office-sur-mesure",
    "title": "Back-office sur mesure et outil interne pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/applications-internes/back-office-sur-mesure.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Back-office sur mesure et outil interne pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "pain-severity-list",
        "label": "Quatre habitudes qu'un back-office retire",
        "background": "ink"
      },
      {
        "type": "method-stepline",
        "label": "Un process à la fois",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Prenez un outil du marché si",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Des outils internes déjà construits, pour le studio",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un back-office sur mesure",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quelle ressaisie vous coûte le plus de temps ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/applications-internes/mvp-saas",
    "title": "Développement de MVP SaaS pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/applications-internes/mvp-saas.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Développement de MVP SaaS pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "De l'idée au produit qui encaisse",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Ne faites pas développer de MVP SaaS si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Un abonnement payant, des prototypes, un produit en construction",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un MVP SaaS",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Développement de MVP SaaS : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quel est le premier client que votre produit doit convaincre ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/applications-internes/portail-client",
    "title": "Portail client sur mesure pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/applications-internes/portail-client.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Portail client sur mesure pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Ce que change un portail pour vos clients",
        "background": "paper"
      },
      {
        "type": "method-stepline",
        "label": "Comment on le construit",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Ne faites pas développer de portail si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Un espace membre déjà livré",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un portail client sur mesure",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Que vous demandent vos clients par e-mail, chaque semaine ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/automatisation-make",
    "title": "Agence automatisation Make : scénarios pour PME",
    "group": "offres",
    "collection": "services",
    "file": "services/automatisation-make.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence d'automatisation Make pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand Make est le bon choix, et quand il ne l'est pas",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : l'ouverture d'un dossier après la signature d'un devis",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Développement Make : ce qui est livré",
        "background": "paper"
      },
      {
        "type": "editorial-timeline",
        "label": "Comment se passe une mission Make",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Make n'est pas le bon choix si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une prestation Make",
        "background": "paper-2"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Commencez par la tâche qui vous coûte le plus d'heures.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/automatisations",
    "title": "Automatisation des processus métier pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/automatisations.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Automatisation de vos processus métier",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Scénario illustratif : la demande de devis reçue par formulaire",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "N'automatisez pas si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets où la saisie manuelle a disparu",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte l'automatisation d'un processus",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Automatisation des processus : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quel process vous coûte le plus d'heures chaque semaine ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/automatisations/automatisation-n8n",
    "title": "Agence n8n pour PME : workflows, prix et délais · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/automatisations/automatisation-n8n.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence n8n pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : les factures fournisseurs reçues par email",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Cinq workflows n8n qu'une PME demande souvent",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "process-steps",
        "label": "Comment se passe une mission n8n, du premier appel à la maintenance",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "n8n n'est pas le bon choix si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une prestation n8n",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Cinq questions à poser à une agence n8n avant de signer",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Agence n8n : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Un premier workflow n8n testé en quelques semaines, sur votre serveur.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/base-de-connaissance-ia",
    "title": "Base de connaissance IA pour entreprise · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/base-de-connaissance-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Base de connaissance IA : vos documents, chaque réponse avec sa source",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand ça vaut le coût, et quand non",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "L'architecture en mots simples",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-timeline",
        "label": "De la première question au déploiement",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Deux réalisations avec une base de connaissance",
        "background": "ink"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vérifions d'abord si vous en avez besoin.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/branding",
    "title": "Agence de branding pour PME : identité de marque · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/branding.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence de branding : une marque qu'on applique.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Ce que contient chaque offre",
        "background": "paper"
      },
      {
        "type": "data-table",
        "label": "Quelle offre pour quelle situation",
        "background": "paper-2"
      },
      {
        "type": "hover-reveal-list",
        "label": "Une page par offre, avec ses livrables",
        "background": "paper-3"
      },
      {
        "type": "pain-severity-list",
        "label": "Ce qui rend une marque inutilisable.",
        "background": "ink"
      },
      {
        "type": "decision-list",
        "label": "Ne nous confiez pas votre marque si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un branding pour une PME",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Agence de branding : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Où votre marque est-elle appliquée aujourd'hui ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/branding/charte-graphique-brand-book",
    "title": "Charte graphique et brand book pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/branding/charte-graphique-brand-book.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Charte graphique et brand book pour PME.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une charte qui sert, ou qui dort",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Quatre étapes, du constat aux fichiers",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Les livrables",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Ne commandez pas de charte si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une charte graphique et d'un brand book",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Charte graphique et brand book : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre marque est-elle appliquée pareil partout ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/branding/identite-de-marque",
    "title": "Création d'identité de marque pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/branding/identite-de-marque.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Création d'identité de marque pour PME.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Ce que coûte une marque faite en une soirée.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : un cabinet de trois personnes",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Cinq étapes, dans cet ordre",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Les livrables",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Cette offre n'est pas la bonne si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une création d'identité de marque",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Création d'identité de marque : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Que dit votre marque de vous aujourd'hui ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/branding/naming-et-positionnement",
    "title": "Naming et positionnement de marque pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/branding/naming-et-positionnement.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Naming et positionnement de marque pour PME.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Les noms qui coûtent cher plus tard.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : nommer une nouvelle offre",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Cinq étapes, de la génération au dossier",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Les livrables",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Ne changez pas de nom si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un naming et d'un positionnement",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Naming et positionnement : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre nom dit-il ce que vous faites ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/branding/refonte-de-marque",
    "title": "Refonte de marque pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/branding/refonte-de-marque.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Refonte de marque pour PME : garder ce qui fonctionne.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Là où une refonte tourne mal.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une PME de services de douze ans",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Six étapes, du constat au contrôle",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Les livrables",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Une refonte n'est pas utile si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une refonte de marque",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Refonte de marque : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre marque mérite-t-elle une refonte, ou un ajustement ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/consultant-ia-claude",
    "title": "Consultant IA pour PME : conseil et mise en œuvre · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/consultant-ia-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Consultant IA indépendant pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce que la mission tranche pour vous",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Six questions à poser à un consultant IA avant de signer",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une PME de négoce de 60 personnes",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "cta-form-inline",
        "label": "Recevez le kit conformité et administration de Claude (PDF, 11 pages)",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Vous n'avez pas besoin d'un consultant IA si",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment se déroule une mission de conseil IA",
        "background": "paper-3"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un accompagnement IA",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#14",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Consultant IA : vos questions",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Par quoi commencer, et que laisser de côté ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/crm-scoring-routing",
    "title": "Automatisation CRM et CRM sur mesure pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/crm-scoring-routing.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Automatisation de votre CRM",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : les demandes entrantes d'une PME industrielle",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "N'automatisez pas votre CRM si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets : demandes routées sans ressaisie, abonnements gérés automatiquement",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une automatisation CRM",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Automatisation CRM : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de demandes se perdent avant d'atteindre un commercial ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/donnees-reporting",
    "title": "Données et pilotage d'activité pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/donnees-reporting.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Le pilotage par la donnée, sans tableur refait à la main.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le reporting mensuel d'une PME de services",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ne lancez pas ce chantier si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix : un sprint de cadrage, puis sur devis",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Données et pilotage : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de jours par mois passez-vous à compiler des chiffres ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/donnees-reporting/centralisation-donnees",
    "title": "Centralisation des données pour PME : un socle unique · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/donnees-reporting/centralisation-donnees.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "La centralisation des données de votre PME, sans usine à gaz",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Ce que la dispersion coûte.",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "De l'inventaire au socle, en cinq étapes",
        "background": "paper-3"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une PME avec cinq outils",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ne centralisez pas si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Un connecteur en production : du formulaire au CRM, sans ressaisie",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une centralisation de données",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Centralisation des données : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de fois par mois exportez-vous le même fichier ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/donnees-reporting/reporting-automatise",
    "title": "Reporting automatisé hebdomadaire et mensuel pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/donnees-reporting/reporting-automatise.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Reporting automatisé : le rapport est prêt, vous le relisez, il part",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Ce que coûte un reporting refait à chaque période.",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "De la collecte à l'archive, en six étapes",
        "background": "paper-3"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le rapport mensuel d'un prestataire à son client",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ne l'automatisez pas si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un reporting automatisé",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Reporting automatisé : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quel rapport refaites-vous à chaque période sans l'avoir choisi ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/donnees-reporting/tableau-de-bord-direction",
    "title": "Tableau de bord de direction pour dirigeant de PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/donnees-reporting/tableau-de-bord-direction.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Un tableau de bord de direction qui tient sur un écran",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Comment un tableau de direction échoue.",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "De la décision à l'écran, en cinq étapes",
        "background": "paper-3"
      },
      {
        "type": "comparison-duo",
        "label": "Un tableau qui informe, ou un tableau qui décore",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ne commandez pas ce tableau si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un tableau de bord de direction",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Tableau de bord de direction : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quelle décision attend un chiffre que vous n'avez pas ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/integration-claude",
    "title": "Claude en entreprise : intégration et déploiement · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/integration-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Intégrer Claude dans votre entreprise",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Quelle offre Claude pour votre équipe",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Trois chantiers, dans cet ordre",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "cta-form-inline",
        "label": "Recevez le guide d'achat Claude pour PME (PDF, 14 pages)",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : un bureau d'études de 40 personnes",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand déployer Claude vous-même, et quand nous appeler",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Ne déployez pas Claude si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Trois réalisations autour de Claude et de MCP",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte une intégration de Claude",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Le déroulé d'un déploiement",
        "background": "paper-3"
      },
      {
        "type": "eeat-panel",
        "label": "#15",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Claude en entreprise : vos questions",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Claude est déjà utilisé chez vous. Reste à l'encadrer.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/integration-claude/integration-chatgpt-openai",
    "title": "Intégration ChatGPT et OpenAI aux outils métier · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/integration-claude/integration-chatgpt-openai.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Intégrer ChatGPT et OpenAI à vos outils métier",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "De l'application d'équipe à l'agent sur mesure",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand passer par ChatGPT et OpenAI, quand préférer Claude",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une équipe commerciale qui utilise ChatGPT chacune de son côté",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "process-steps",
        "label": "De l'usage éparpillé à l'outil branché",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une intégration de ChatGPT ou d'OpenAI",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant d'intégrer un modèle d'IA : fixez les règles d'usage avec le modèle de charte IA en PDF",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Intégration de ChatGPT et d'OpenAI : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vos équipes utilisent déjà ChatGPT : qui encadre, et avec quelles règles ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/integration-claude/integration-mistral-ai",
    "title": "Intégration Mistral AI aux outils métier · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/integration-claude/integration-mistral-ai.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Intégrer Mistral AI à vos outils métier",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Les critères qui décident, un par un",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand choisir Mistral AI, quand rester sur Claude",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : un cabinet qui traite des dossiers confidentiels",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "process-steps",
        "label": "Du choix du modèle à l'outil branché",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une intégration de Mistral AI",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant d'intégrer un modèle d'IA : fixez les règles d'usage avec le modèle de charte IA en PDF",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Intégration de Mistral AI : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quelle exigence de données pèse sur votre choix de modèle ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/landing-pages-tunnels",
    "title": "Landing page de site web et tunnel de conversion · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/landing-pages-tunnels.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Une landing page de site web qui convertit et qui trie vos leads.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : la page d'offre d'un organisme de formation",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Une landing page ne changera rien si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une landing page et d'un tunnel",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Landing pages et tunnels : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre landing page attire-t-elle les bonnes demandes ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/prospection-automatisee",
    "title": "Prospection automatisée par l'IA pour PME B2B · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/prospection-automatisee.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Prospection automatisée par l'IA",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : un éditeur de logiciel B2B sans équipe de prospection",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste si vous arrêtez",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "La prospection automatisée ne convient pas si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Un essai gratuit, puis deux formules en abonnement mensuel sans engagement",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Prospection automatisée : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre prospection s'arrête-t-elle quand vous êtes occupés ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/prospection-automatisee/automatisation-reseaux-sociaux",
    "title": "Automatisation des réseaux sociaux pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/prospection-automatisee/automatisation-reseaux-sociaux.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatisation des réseaux sociaux pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Six briques, de l'idée à la mesure",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Du contenu source aux publications, en cinq étapes",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste si vous arrêtez",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Ce qu'on refuse, et quand ne pas le faire",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Deux chantiers où du contenu est produit et publié avec l'IA",
        "background": "ink"
      },
      {
        "type": "hover-reveal-list",
        "label": "Vos publications nourrissent les autres canaux",
        "background": "paper-3"
      },
      {
        "type": "pricing-cards",
        "label": "Prix de l'automatisation des réseaux sociaux",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de temps passez-vous à republier le même contenu ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/prospection-automatisee/cold-email-b2b",
    "title": "Cold email B2B pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/prospection-automatisee/cold-email-b2b.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Cold email B2B pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Cold email B2B et RGPD : ce qu'on applique",
        "background": "paper-2"
      },
      {
        "type": "pain-severity-list",
        "label": "Quatre causes fréquentes de mails en spam",
        "background": "ink"
      },
      {
        "type": "method-stepline",
        "label": "Six étapes, dans cet ordre",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste si vous arrêtez",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Le cold email ne convient pas si",
        "background": "paper-2"
      },
      {
        "type": "hover-reveal-list",
        "label": "Le cold email s'assemble aux autres canaux",
        "background": "paper-3"
      },
      {
        "type": "pricing-cards",
        "label": "Un essai gratuit, puis un abonnement sans engagement",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vos e-mails froids arrivent-ils jusqu'à la boîte de réception ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/prospection-automatisee/prospection-linkedin",
    "title": "Prospection LinkedIn B2B automatisée · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/prospection-automatisee/prospection-linkedin.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Prospection LinkedIn B2B automatisée",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "De la liste au rendez-vous, en cinq étapes",
        "background": "paper-3"
      },
      {
        "type": "feature-grid",
        "label": "Conditions de LinkedIn et RGPD : ce qu'on applique",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Un robot d'envoi ou une file de tâches validée",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste si vous arrêtez",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "La prospection LinkedIn préparée ne convient pas si",
        "background": "paper-2"
      },
      {
        "type": "hover-reveal-list",
        "label": "LinkedIn s'assemble aux autres canaux",
        "background": "paper-3"
      },
      {
        "type": "pricing-cards",
        "label": "Prix de la prospection LinkedIn préparée",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre cible répond-elle sur LinkedIn ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/prospection-automatisee/social-selling-ia",
    "title": "Social selling avec l'IA pour PME B2B · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/prospection-automatisee/social-selling-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Social selling avec l'IA pour PME B2B",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Les signaux qu'on suit",
        "background": "paper-2"
      },
      {
        "type": "system-flow",
        "label": "Du signal au premier message",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : un éditeur de logiciel B2B de petite taille",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste si vous arrêtez",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Le social selling assisté par IA ne convient pas si",
        "background": "paper-2"
      },
      {
        "type": "hover-reveal-list",
        "label": "Le social selling nourrit les autres canaux",
        "background": "paper-3"
      },
      {
        "type": "pricing-cards",
        "label": "Prix du social selling assisté par IA",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quels signaux vos prospects émettent-ils déjà ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/seo-geo-contenu",
    "title": "Agence SEO et référencement naturel pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/seo-geo-contenu.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence SEO et référencement naturel pour PME, suivi jusqu'à la demande.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : la page service d'une PME de maintenance",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ce n'est pas le bon investissement si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Trois projets de ce volet",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une prestation SEO",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Agence SEO et référencement naturel : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vos pages répondent-elles aux questions de vos clients ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/seo-geo-contenu/audit-seo-technique",
    "title": "Agence audit SEO : audit technique de site pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/seo-geo-contenu/audit-seo-technique.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Audit SEO technique : ce qui freine vos pages, classé par priorité.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi un site soigné ne se trouve pas",
        "background": "ink"
      },
      {
        "type": "method-stepline",
        "label": "Un audit en six étapes",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous recevez",
        "background": "paper-3"
      },
      {
        "type": "comparison-duo",
        "label": "Un audit se juge à ce qu'on en corrige",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Ce n'est pas le bon investissement si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets où la technique a compté",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un audit SEO technique",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Audit SEO technique : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de vos pages Google a-t-il réellement indexées ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/seo-geo-contenu/redaction-seo-contenu",
    "title": "Rédaction SEO et calendrier éditorial pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/seo-geo-contenu/redaction-seo-contenu.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Rédaction SEO : des articles qui répondent à une requête, relus et signés.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Du sujet à la mise à jour",
        "background": "paper-3"
      },
      {
        "type": "comparison-duo",
        "label": "Un texte pour la requête, ou un texte pour remplir",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous gardez",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ce n'est pas le bon investissement si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets où le contenu est au cœur du travail",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'une rédaction SEO",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Rédaction SEO : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quels articles vos clients attendent-ils de vous ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/seo-geo-contenu/referencement-ia",
    "title": "Agence GEO : référencement IA pour être cité · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/seo-geo-contenu/referencement-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence GEO : être cité par ChatGPT, Perplexity et Gemini.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi les IA ne vous citent pas",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un passage citable change l'équation",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Un chantier GEO en six étapes",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ce n'est pas le bon investissement si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets avec une couche GEO",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de rendre vos pages citables",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Agence GEO : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Que répondent les assistants IA quand on les interroge sur votre marché ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/seo-geo-contenu/seo-local",
    "title": "SEO local : fiche Google, pages par ville et avis · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/seo-geo-contenu/seo-local.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "SEO local : être trouvé par les clients de votre zone.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vos clients de proximité ne vous trouvent pas",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un maillage local change l'équation",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Un chantier de SEO local en six étapes",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Ce n'est pas le bon investissement si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets où la proximité a compté",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de gagner en visibilité locale",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "SEO local : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vos clients proches vous trouvent-ils quand ils cherchent ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/sequences-de-suivi",
    "title": "Relance automatisée des devis et des factures · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/sequences-de-suivi.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Relance automatisée des devis et des factures",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Dans quel ordre mettre une relance en service",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Huit pannes probables d'une relance automatisée, et la parade",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Scénario illustratif : un devis suivi sur un mois",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "N'automatisez pas vos devis si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Prix d'un dispositif de devis et de relances",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Relance automatisée : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de devis attendent une relance chez vous ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/site-web-ia",
    "title": "Agence site web pour PME : création et refonte · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/site-web-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence site web : un site qui vend, pas une vitrine qui dort.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le site d'un cabinet de conseil",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "decision-list",
        "label": "Waimia n'est pas le bon choix si",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Trois projets de ce volet",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un site internet qui vend",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Pas encore prêt pour un devis ? Auditez d'abord votre site actuel",
        "background": "ink"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Création de site internet : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre site est-il à corriger, à refaire ou à reprendre ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/site-web-ia/shopify",
    "title": "Agence Shopify pour PME : boutique, refonte et migration · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/site-web-ia/shopify.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence Shopify : votre boutique en ligne, créée, refondue ou migrée.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Shopify, ou une autre plateforme",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une boutique de produits d'entretien",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Shopify, ou une autre base",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Aucune boutique Shopify publiée : une migration e-commerce mesurée, et un site livré en 6 semaines",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte une boutique Shopify",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Shopify : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre boutique actuelle est-elle à corriger, à migrer ou à refaire ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/site-web-ia/sur-mesure",
    "title": "Développement web sur mesure : Astro, CMS headless · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/site-web-ia/sur-mesure.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Développement web sur mesure : un code qui vous appartient.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Sur mesure, ou une autre plateforme",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le site d'une société de conseil industriel",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "hover-reveal-list",
        "label": "Sur mesure, ou une autre base",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Un site Astro livré, et un retour du headless vers WordPress",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un site sur mesure",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Site sur mesure : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre besoin justifie-t-il vraiment du sur mesure ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/site-web-ia/webflow",
    "title": "Agence Webflow pour PME : création et refonte · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/site-web-ia/webflow.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence Webflow : un site que votre équipe fait vivre.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Webflow, ou une autre plateforme",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le site d'un cabinet d'architectes",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "hover-reveal-list",
        "label": "Webflow, ou une autre base",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Aucune fiche Webflow publiée : un site Astro et une migration WordPress, sur d'autres plateformes",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un site Webflow",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#10",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Webflow : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre site actuel est-il le bon outil pour la suite ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/site-web-ia/wordpress",
    "title": "Agence WordPress pour PME : création et refonte · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/site-web-ia/wordpress.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence WordPress : un site tenu à jour, que vous maîtrisez.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "WordPress, ou une autre plateforme",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le site d'un cabinet comptable",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "WordPress, ou une autre base",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Deux projets WordPress publiés",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un site WordPress",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#11",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "WordPress : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre WordPress est-il à entretenir, à relier ou à refaire ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/systeme-acquisition",
    "title": "Générer des leads B2B qualifiés · outils de visibilité web",
    "group": "offres",
    "collection": "services",
    "file": "services/systeme-acquisition.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Des outils de visibilité web pour générer des leads B2B.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Trois outils, branchés au reste",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Des missions réelles, documentées",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Quatre socles pour un site",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#6",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Visibilité web : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quarante-cinq minutes pour savoir par quel outil commencer.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/systeme-commercial",
    "title": "Développement commercial B2B pour PME : système commercial",
    "group": "offres",
    "collection": "services",
    "file": "services/systeme-commercial.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Un développement commercial B2B sur une seule base.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Externaliser à une agence de SDR, ou installer un système",
        "background": "paper-2"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Trois leviers, une même base",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Comment un lead devient client",
        "background": "ink"
      },
      {
        "type": "case-card-grid",
        "label": "Des missions réelles, documentées",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Un essai gratuit, puis deux formules pour alimenter votre pipeline",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Développement commercial : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Un système qui alimente, qualifie et relance votre pipeline.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/systemes-operationnels-ia",
    "title": "Agence automatisation IA pour PME : workflows et agents · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/systemes-operationnels-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Agence d'automatisation IA pour PME",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition",
        "background": "paper-2"
      },
      {
        "type": "hover-reveal-list",
        "label": "Six modules, une même base",
        "background": "paper-3"
      },
      {
        "type": "feature-zigzag",
        "label": "Comment les modules se nourrissent",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Agents sur moteur ouvert",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Des missions réelles, documentées",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Quatre socles pour câbler votre système",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Automatisation IA : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quarante-cinq minutes pour savoir quoi automatiser.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/lp/hub",
    "title": "Landing pages Waimia · quel système freine votre croissance ?",
    "group": "landing",
    "collection": "lp",
    "file": "lp/hub.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-centered",
        "label": "Quel système freine votre croissance ?",
        "background": "paper-3"
      },
      {
        "type": "feature-grid",
        "label": "Repérez votre situation, on vous mène à la bonne page",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Trois PME, trois résultats concrets",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous hésitez entre plusieurs systèmes ? On vous oriente en 45 minutes.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/lp/site-web-intelligent",
    "title": "Site web intelligent pour PME · un site qui fait avancer la vente",
    "group": "landing",
    "collection": "lp",
    "file": "lp/site-web-intelligent.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-centered",
        "label": "Votre site ne devrait pas seulement présenter l'entreprise. Il devrait faire avancer la vente.",
        "background": "paper-3"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Une vitrine regarde vos prospects partir. Un système les retient.",
        "background": "ink"
      },
      {
        "type": "feature-split-media",
        "label": "Le site est le socle. Le reste se branche dessus.",
        "background": "paper"
      },
      {
        "type": "system-flow",
        "label": "Comment tout fonctionne ensemble.",
        "background": "ink"
      },
      {
        "type": "case-card-grid",
        "label": "Trois PME, trois résultats concrets.",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "De l'audit gratuit aux premiers résultats.",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement.",
        "background": "paper-2"
      },
      {
        "type": "pricing-cards",
        "label": "Quatre façons de construire votre site intelligent.",
        "background": "paper"
      },
      {
        "type": "guarantee-block",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez avant de signer.",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un site qui fait avancer la vente. Un audit pour voir si on peut le construire ensemble.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/lp/systeme-acquisition",
    "title": "Système d'acquisition pour PME B2B · relier vos outils en un seul système",
    "group": "landing",
    "collection": "lp",
    "file": "lp/systeme-acquisition.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-centered",
        "label": "Votre acquisition ne manque pas d'outils. Elle manque de système.",
        "background": "paper-3"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vos prospects vous échappent",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un système instrumenté change l'équation",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Les briques, de l'acquisition au commercial",
        "background": "paper"
      },
      {
        "type": "system-flow",
        "label": "Comment tout s'articule.",
        "background": "ink"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Trois PME, trois résultats concrets",
        "background": "paper"
      },
      {
        "type": "method-stepline",
        "label": "De l'audit gratuit aux premiers résultats",
        "background": "paper-3"
      },
      {
        "type": "pricing-cards",
        "label": "Quatre socles pour lancer votre acquisition",
        "background": "paper"
      },
      {
        "type": "guarantee-block",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Voyons où votre acquisition perd des opportunités.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/lp/systeme-ia-marketing",
    "title": "Systèmes IA pour équipes marketing · un système qui exécute le répétitif",
    "group": "landing",
    "collection": "lp",
    "file": "lp/systeme-ia-marketing.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-centered",
        "label": "Votre équipe n'a pas besoin d'un chatbot de plus. Elle a besoin d'un système qui exécute le travail répétitif.",
        "background": "paper-3"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi votre équipe passe sa semaine à déplacer de l'information.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Un chatbot de plus récite. Un système exécute et rend compte.",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Ce qu'un système exécute chez vous.",
        "background": "paper"
      },
      {
        "type": "method-stepline",
        "label": "Ce qui sépare un système fiable d'un gadget.",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Où la machine agit, où vous gardez la main.",
        "background": "ink"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement.",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Trois PME, le répétitif passé en système.",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Une offre, deux manières d'avancer.",
        "background": "paper"
      },
      {
        "type": "guarantee-block",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez avant de signer.",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Identifions les tâches qui méritent un système, et celles qui doivent rester humaines.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/lp/visibilite-google-ia",
    "title": "Visibilité Google + IA pour PME · classé sur Google, cité par les IA",
    "group": "landing",
    "collection": "lp",
    "file": "lp/visibilite-google-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-centered",
        "label": "Être bien classé ne suffit plus. Il faut devenir la source de la réponse.",
        "background": "paper-3"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vous n'êtes ni classé, ni cité.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Invisible aux moteurs. Ou trouvable et cité.",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 couches d'une visibilité qui tient.",
        "background": "paper-3"
      },
      {
        "type": "feature-split-media",
        "label": "llms.txt n'est pas votre stratégie de visibilité.",
        "background": "paper"
      },
      {
        "type": "system-flow",
        "label": "Comment une marque se met à être citée.",
        "background": "ink"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement.",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Trois PME, trois résultats concrets.",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de reprendre votre visibilité.",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez avant de signer.",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Ne préparez pas votre visibilité après la bascule. Mesurez ce qui manque maintenant.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/secteurs/_index",
    "title": "_index",
    "group": "secteurs",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/agence",
    "title": "Site web et IA pour les agences marketing et com : prouver votre valeur par l'exemple",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/agence.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/batiment",
    "title": "IA pour le bâtiment : ce qu'un artisan ou une TPE peut automatiser",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/batiment.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/comptabilite",
    "title": "Site web et IA pour les cabinets comptables : vendre le conseil, pas la saisie",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/comptabilite.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/conseil",
    "title": "Site web et IA pour les cabinets de conseil : rendre l'expertise lisible avant le premier appel",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/conseil.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/e-commerce",
    "title": "IA pour l'e-commerce : support client, commandes et catalogue",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/e-commerce.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/esn",
    "title": "Site web et IA pour les ESN : attirer les talents et prouver l'expertise avant le premier appel",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/esn.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/formation",
    "title": "Site web et IA pour les organismes de formation : remplir les sessions et produire sans s'épuiser",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/formation.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/industrie",
    "title": "Site web et IA pour les PME industrielles : rendre votre savoir-faire lisible et captable",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/industrie.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/liberal-independant",
    "title": "IA et automatisation pour professions libérales : moins d'administratif",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/liberal-independant.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/services-b2b",
    "title": "Site web et IA pour les services B2B : convaincre pendant que l'acheteur s'auto-évalue",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/services-b2b.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/startup-logiciel",
    "title": "IA pour startups et éditeurs de logiciel : produit, support et ventes",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/startup-logiciel.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/therapeutes",
    "title": "Site et prise de rendez-vous pour thérapeutes et praticiens",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/therapeutes.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients",
    "title": "Cas clients",
    "group": "cas-clients",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/amploi",
    "title": "Amploi : site Astro, CRM HubSpot et skills Claude",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/amploi.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/balzeo",
    "title": "Balzeo : migration WordPress, site 2× plus rapide",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/balzeo.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/brow-x-professionnel",
    "title": "Brow.X : agent IA pour le SAV (en cours)",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/brow-x-professionnel.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/desangles-peinture",
    "title": "Desangles Peinture : SEO local, de la page 6 à 1",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/desangles-peinture.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/inbound-value",
    "title": "Inbound Value : serveur MCP, hub de preuve sociale",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/inbound-value.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/isabelle-diaz-naturopathe",
    "title": "Isabelle Diaz : site IA et contenu automatisé",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/isabelle-diaz-naturopathe.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/les-carnets-de-montpellier",
    "title": "Les Carnets de Montpellier : média payant, agent IA",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/les-carnets-de-montpellier.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/prototypes-internes",
    "title": "Prototypes internes : LegiCheck, entretien, quiz",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/prototypes-internes.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/sprinkable-airess",
    "title": "Sprinkable et Airess : site du groupe et blog de la protection incendie",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/sprinkable-airess.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/virtuoseos",
    "title": "VirtuoseOS : le premier OS à agents IA du studio",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/virtuoseos.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/waimia-os",
    "title": "Waimia OS : un OS à agents IA multi-entreprises",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/waimia-os.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-usages",
    "title": "Cas usages",
    "group": "cas-usages",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-usages/centraliser-donnees",
    "title": "Centraliser ses données et automatiser le reporting · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/centraliser-donnees.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Centraliser ses données et automatiser le reporting",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : le comité de direction mensuel d'une PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Centraliser ses données : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Combien de versions du même chiffre circulent chez vous ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/finance-comptabilite",
    "title": "IA expert-comptable et automatisation de la comptabilité",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/finance-comptabilite.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "IA et expert-comptable : ce qui s’automatise, ce qui reste humain",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Les tâches comptables, classées par rentabilité probable et par risque",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment se déroule un pilote en comptabilité",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qu'on automatise, et ce qu'il ne faut pas automatiser",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-3"
      },
      {
        "type": "branded-callout",
        "label": "Pas encore de réalisation Waimia sur cette fonction",
        "background": "paper"
      },
      {
        "type": "market-cases",
        "label": "Études de cas du marché : comptabilité et finance",
        "variant": "full",
        "background": "paper-3"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour chiffrer avant de décider",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "IA et comptabilité : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Qui ressaisit encore, et combien de pièces par mois ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/generer-plus-de-leads",
    "title": "Automatiser le suivi commercial d'une PME · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/generer-plus-de-leads.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatiser le suivi commercial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une PME de services aux entreprises",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Automatiser le suivi commercial : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Où vos demandes attendent-elles ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/reduire-reporting",
    "title": "Réduire le temps de reporting · chiffres prêts à analyser",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/reduire-reporting.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Réduire le temps de reporting.",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où le reporting coûte",
        "background": "paper-2"
      },
      {
        "type": "steps-horizontal",
        "label": "De la compilation à la relecture",
        "background": "paper"
      },
      {
        "type": "bento-grid",
        "label": "Les briques qui vous rendent vos jours",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Du copier-coller au reporting prêt",
        "background": "paper-2"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "À explorer",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Reporting automatisé : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Passez du copier-coller à la décision.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/reduire-temps-cms",
    "title": "Réduire le temps passé sur le CMS · éditer en autonomie",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/reduire-temps-cms.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Réduire le temps passé sur le CMS.",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où le temps part",
        "background": "paper-2"
      },
      {
        "type": "steps-horizontal",
        "label": "Du chantier permanent à l'édition en minutes",
        "background": "paper"
      },
      {
        "type": "bento-grid",
        "label": "Les briques qui vous rendent le temps",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Du chantier WordPress à l'édition autonome",
        "background": "paper-2"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "À explorer",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "CMS git-based : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Reprenez la main sur votre contenu, sans dépendre de personne.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/rh",
    "title": "Automatisation RH par l'IA : ce qu’on automatise · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/rh.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatisation RH et IA : ce qu’on automatise en PME, ce qu’on évite",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les tâches RH, classées par rentabilité probable et par risque",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-3"
      },
      {
        "type": "process-steps",
        "label": "Comment se déroule un pilote RH",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce que Waimia automatise en RH, et ce que nous ne faisons pas sans cadre renforcé",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-3"
      },
      {
        "type": "branded-callout",
        "label": "Pas encore de réalisation Waimia sur cette fonction",
        "background": "paper"
      },
      {
        "type": "market-cases",
        "label": "Études de cas du marché : ressources humaines",
        "variant": "full",
        "background": "paper-3"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour chiffrer avant de décider",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "IA et ressources humaines : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Que se passe-t-il entre la signature et le premier jour ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/standardiser-processus",
    "title": "Standardiser et automatiser l'administratif en PME · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/standardiser-processus.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Standardiser et automatiser les tâches administratives",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : l'ouverture d'un dossier client dans un cabinet",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Automatiser l'administratif : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Quelle procédure ne tient que sur une personne ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/support-sav",
    "title": "Automatisation du service client : par où commencer · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/support-sav.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatisation du service client et du SAV",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Les tâches du support, classées par rentabilité probable et par risque",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment se déroule un pilote de support",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qu'on automatise, et ce qu'il ne faut pas automatiser",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "branded-callout",
        "label": "Un projet en cours, pas encore de résultat publié",
        "background": "paper"
      },
      {
        "type": "market-cases",
        "label": "Études de cas du marché : service client",
        "variant": "full",
        "background": "paper-3"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour chiffrer avant de décider",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Automatisation du service client : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Quelles demandes reviennent chaque semaine ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/demonstrations/avant-apres",
    "title": "Avant / après · un site d'agence classique vs un Site Web Intelligent",
    "group": "ressources",
    "collection": "demonstrations",
    "file": "demonstrations/avant-apres.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Site d'agence classique vs Site Web Intelligent.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où l'écart se creuse",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Du site figé au site qui travaille",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six signaux qui trahissent un site figé",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous avez vu la différence. Mesurons-la chez vous.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/demonstrations/integration-claude",
    "title": "Intégration Claude dans un process PME · la démo avant/après",
    "group": "ressources",
    "collection": "demonstrations",
    "file": "demonstrations/integration-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Une intégration Claude, avant/après.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Le même process, deux mondes",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Ce que fait l'agent, dans l'ordre",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour repérer le bon candidat",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous avez vu le résultat. Trouvons votre premier chantier.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/demonstrations/site-web-intelligent",
    "title": "Site Web Intelligent · démonstration concrète d'un site qui travaille pour vous",
    "group": "ressources",
    "collection": "demonstrations",
    "file": "demonstrations/site-web-intelligent.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Un site qui se fait trouver.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Quatre choses qu'un site classique ne fait pas",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "De la page blanche au site qui travaille",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour le savoir",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre site mérite mieux qu'une plaquette. Passons à l'acte.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources",
    "title": "Ressources",
    "group": "ressources",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/comparatifs",
    "title": "Comparatifs",
    "group": "ressources",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/comparatifs/chatgpt-claude-gemini-perplexity-pme",
    "title": "ChatGPT, Claude, Gemini ou Perplexity : quelle IA choisir en 2026 pour une PME · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/chatgpt-claude-gemini-perplexity-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "ChatGPT, Claude, Gemini ou Perplexity : quelle IA choisir en 2026 ?",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Rédiger, rechercher, analyser un fichier, connecter ses outils : ce que chaque offre d'équipe documente",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Combien coûte une offre d'équipe chez chaque éditeur ?",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Le même effectif de dix personnes, cinq offres",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Entraînement et conservation : ce que chaque éditeur écrit",
        "background": "paper"
      },
      {
        "type": "editorial-callout",
        "label": "#7",
        "variant": "quote",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Quel outil dans quel cas ?",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment trancher en quatre étapes",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Claude est dans votre sélection ? Recevez le guide d'achat avec trois budgets calculés",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Quelle IA choisir : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "L'outil compte moins que le cadre : tâches, données, test.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/claude-code-vs-cursor",
    "title": "Claude Code vs Cursor : lequel choisir en 2026 ?",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/claude-code-vs-cursor.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Code vs Cursor.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Claude Code face à Cursor, capacité par capacité (6 octobre 2026)",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Cinq lignes de fracture",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Le bon outil selon votre situation",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude Code ou Cursor : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le bon outil dépend de votre travail. Cadrons-le ensemble.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/claude-duet-vs-chatgpt-dots",
    "title": "Claude Duet vs ChatGPT dots : lequel choisir pour une PME · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/claude-duet-vs-chatgpt-dots.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Duet vs ChatGPT dots : lequel pour une PME ?",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Claude Duet vs ChatGPT dots : 16 critères, avec le niveau de preuve",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#6",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce qui peut changer vite",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Choisir selon votre situation",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Trancher en deux semaines, sur une vraie tâche",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de laisser un agent agir en votre nom, écrivez la règle : recevez le modèle de charte IA en PDF",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#16",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude Duet vs ChatGPT dots : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "L'agent compte moins que ce qu'il a le droit de faire.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/claude-platform-vs-openai-platform",
    "title": "Claude Platform ou OpenAI Platform pour une PME · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/claude-platform-vs-openai-platform.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Platform ou OpenAI Platform : lequel choisir pour une PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Claude Platform et OpenAI Platform, critère par critère",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand l'abonnement suffit, quand passer par la plateforme",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Dans quels cas chacune convient",
        "background": "paper"
      },
      {
        "type": "cta-form-inline",
        "label": "Abonnement, API, Bedrock ou Vertex : recevez le guide d'achat Claude (PDF, 14 pages)",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "La bonne plateforme se choisit sur vos données et vos contraintes.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/claude-vs-chatgpt-pme",
    "title": "Claude vs ChatGPT : lequel choisir en entreprise · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/claude-vs-chatgpt-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude vs ChatGPT pour une PME",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "comparison-table",
        "label": "Claude vs ChatGPT : prix, données, outils",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#7",
        "variant": "warn",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#9",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce qui a bougé chez Claude et ChatGPT, et ce que ça change",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "cta-form-inline",
        "label": "Vous penchez pour Claude ? Recevez le guide d'achat pour PME (PDF, 14 pages)",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Choisir selon votre situation",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment trancher en deux semaines, sur vos documents",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude vs ChatGPT : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "L'outil compte moins que le cadre.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
    "title": "CRM sur mesure ou CRM du marché : comment choisir · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/crm-sur-mesure-vs-crm-du-marche.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "CRM sur mesure ou CRM du marché : comment choisir pour une PME",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "CRM du marché, troisième voie, CRM sur mesure : critère par critère",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Le verdict de Waimia, situation par situation",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le bon CRM se choisit sur votre processus, pas sur une démo.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/formateur-ia-organisme-freelance-agence",
    "title": "Formateur IA : organisme, indépendant ou agence, qui choisir · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/formateur-ia-organisme-freelance-agence.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Formateur IA : organisme, formateur indépendant ou agence, qui choisir ?",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Organisme, indépendant, agence : cinq critères pour comparer",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "quote",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand choisir Waimia pour former, et quand choisir ailleurs",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six questions à écrire dans votre demande de devis",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant la formation : la charte d'usage que l'équipe appliquera ensuite",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Formateur IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le programme se monte sur vos tâches, pas sur un catalogue.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/geo-vs-seo",
    "title": "GEO vs SEO · où mettre le budget, par critère et par cas",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/geo-vs-seo.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "GEO vs SEO.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "GEO et SEO, critère par critère",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Trois conséquences pour un budget",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Six situations, six verdicts",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vu sur Google, repris par les IA. Faisons les deux.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/hermes-agent-vs-openclaw",
    "title": "Hermes Agent vs OpenClaw : lequel pour une entreprise · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/hermes-agent-vs-openclaw.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Hermes Agent vs OpenClaw : lequel pour une entreprise ?",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Hermes Agent vs OpenClaw, critère par critère (lu le 24 octobre 2026)",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "warn",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#8",
        "variant": "note",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Choisir selon votre situation",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Choisir et valider en deux semaines",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant d'installer un agent : la charte qui dit ce qu'il a le droit de faire",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#14",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Les deux guides en détail",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Nos services",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Hermes Agent vs OpenClaw : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le moteur compte moins que la façon de l'exploiter.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/lovable-vs-developpement-sur-mesure",
    "title": "Lovable ou développement sur mesure : prix et reprise du code · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/lovable-vs-developpement-sur-mesure.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Lovable ou développement sur mesure : quand reprendre le code ?",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Les prix de Lovable, tels que l'éditeur les publie",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Propriété, accès, sécurité, base de données, évolutions : ce que chaque voie documente",
        "background": "paper"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "quote",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment décider en quatre étapes",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Lovable ou sur mesure : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un prototype à regarder avant d'aller plus loin ?",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/mistral-vs-claude-pme",
    "title": "Mistral AI vs Claude : lequel choisir en PME · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/mistral-vs-claude-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Mistral AI vs Claude pour une PME",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Mistral AI vs Claude : hébergement, données, prix, modèles",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Le même scénario d'API chez Mistral AI et chez Claude",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce que chaque éditeur annonce, tâche par tâche",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand choisir Mistral AI, quand choisir Claude",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment trancher en quatre étapes",
        "background": "paper-3"
      },
      {
        "type": "lead-capture-band",
        "label": "Claude est dans la balance ? Recevez le kit conformité : réglages, RGPD, douze questions au fournisseur",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Mistral AI vs Claude : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Le modèle compte moins que le cadre : données, contrat, test.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/n8n-vs-make",
    "title": "n8n vs Make : lequel choisir pour une PME · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/n8n-vs-make.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "n8n vs Make : lequel choisir pour votre PME",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "n8n vs Make, critère par critère",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Notre verdict, cas par cas",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le bon outil se choisit sur vos tâches, pas sur un tableau.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/n8n-vs-make-vs-zapier",
    "title": "n8n vs Make vs Zapier : comparatif PME · Waimia",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/n8n-vs-make-vs-zapier.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "n8n vs Make vs Zapier : lequel choisir pour votre PME",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "n8n, Make et Zapier, critère par critère",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Le verdict, situation par situation",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le bon outil se choisit sur vos tâches, pas sur un tableau.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
    "title": "Site Web Intelligent vs WordPress : le comparatif PME",
    "group": "ressources",
    "collection": "comparatifs",
    "file": "comparatifs/site-web-intelligent-vs-wordpress.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Site Web Intelligent vs WordPress.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "comparison-table",
        "label": "Le face-à-face, critère par critère",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où le Site Web Intelligent creuse l'écart",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "La même PME, deux trajectoires",
        "background": "ink"
      },
      {
        "type": "decision-list",
        "label": "Le bon outil dépend de votre ambition",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un site qui travaille, pas une dette à porter.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/diagnostics/_index",
    "title": "_index",
    "group": "ressources",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/diagnostics/claude-pme",
    "title": "Votre PME est-elle prête à déployer Claude ? Le diagnostic en 6 questions",
    "group": "ressources",
    "collection": "diagnostics",
    "file": "diagnostics/claude-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Votre PME est-elle prête à déployer Claude ?",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "diagnostic-stages",
        "label": "Prêts, presque, ou pas encore ?",
        "background": "paper"
      },
      {
        "type": "data-table",
        "label": "Les cinq niveaux de préparation, ligne par ligne",
        "background": "paper-3"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce qui détermine votre préparation",
        "background": "paper-2"
      },
      {
        "type": "branded-callout",
        "label": "Un seul axe faible fait échouer le déploiement.",
        "background": "ink"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour jauger votre préparation",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Ce qu'on pose selon votre préparation",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous savez si vous êtes prêts. Cadrons le déploiement.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/diagnostics/maturite-ia",
    "title": "Diagnostic IA gratuit · votre maturité IA en 10 questions",
    "group": "ressources",
    "collection": "diagnostics",
    "file": "diagnostics/maturite-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "direct-answer",
        "label": "#0",
        "background": "paper-2"
      },
      {
        "type": "diagnostic-stages",
        "label": "Les cinq niveaux de la grille",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce que mesurent les dix questions",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Sur le diagnostic et son barème",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous connaissez votre niveau. L'audit dit par quelle tâche commencer.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/diagnostics/referent-ia",
    "title": "Diagnostic référent IA · en avez-vous besoin, et les moyens ?",
    "group": "ressources",
    "collection": "diagnostics",
    "file": "diagnostics/referent-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Diagnostic référent IA.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "diagnostic-stages",
        "label": "Quand un référent devient nécessaire",
        "background": "paper"
      },
      {
        "type": "data-table",
        "label": "Cinq signaux qu'un référent devient nécessaire",
        "background": "paper-3"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce que fait concrètement un référent",
        "background": "paper-2"
      },
      {
        "type": "pull-quote-block",
        "label": "#5",
        "variant": "centered",
        "background": "ink"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour trancher",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment on forme votre référent",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous savez s'il vous faut un référent. Passons au prochain pas.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/diagnostics/site-web-intelligent",
    "title": "Diagnostic site web intelligent · la checklist et où vous en êtes",
    "group": "ressources",
    "collection": "diagnostics",
    "file": "diagnostics/site-web-intelligent.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Diagnostic du site intelligent.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "diagnostic-stages",
        "label": "Où en est votre site ?",
        "background": "paper"
      },
      {
        "type": "data-table",
        "label": "Vitrine subie ou site qui qualifie",
        "background": "paper-2"
      },
      {
        "type": "branded-callout",
        "label": "Trois non, et c'est une vitrine.",
        "background": "ink"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour situer votre site",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Ce qu'on fait selon votre palier",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous savez où vous en êtes. Regardons votre site réel.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides",
    "title": "Guides",
    "group": "ressources",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/guides/accompagnement-ia-pme",
    "title": "Accompagnement IA en PME : les formes, comment choisir, ce que vous gardez en main",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/accompagnement-ia-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Accompagnement IA en PME : quelle forme choisir, et où s'arrêter",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels repères retenir avant de demander un devis ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quelles formes d'accompagnement IA existe-t-il, et où s'arrêter ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour choisir la forme d'accompagnement",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Que confier à un prestataire, et que garder chez vous ?",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment se déroule un parcours, étape par étape ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Accompagnement IA en PME : questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir quelle forme vous convient, avant de signer quoi que ce soit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/agent-ia-definition",
    "title": "Agent IA : c'est quoi ? Définition, coût et limites",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/agent-ia-definition.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agent IA : c'est quoi ? Définition, coût d'usage et limites",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Assistant, automatisation, agent IA : le tableau pour les distinguer",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "La même demande de SAV, traitée par une automatisation puis par un agent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Cinq questions pour savoir si on vous vend un agent, un chatbot ou une automatisation",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce que coûte l'usage : la même tâche en automatisation et en agent",
        "variant": "editorial",
        "background": "paper-3"
      },
      {
        "type": "editorial-table-block",
        "label": "Cinq pannes d'agent, comment on les voit, et le garde-fou",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "pull-quote-block",
        "label": "#11",
        "variant": "centered",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "Avez-vous besoin d'un agent, ou d'une automatisation ?",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Mettre un premier agent en production, en cinq étapes",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#14",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Agent IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si votre tâche demande un agent, ou seulement un workflow.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/agent-sav-architecture",
    "title": "Agent IA de service client (SAV) : architecture, garde-fous, mesure",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/agent-sav-architecture.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agent IA de service client (SAV) : architecture, garde-fous, mesure",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "De quoi se compose l'architecture d'un agent IA de service client ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Quels garde-fous poser à un agent de service client ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Que mesurer pour juger un agent IA de service client, et comment ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Agent du marché ou agent sur mesure : lequel choisir ?",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment mettre en place un agent IA de service client, étape par étape ?",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Agent IA de service client : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir quelles demandes un agent peut traiter chez vous, avant d'en construire un. L'audit est gratuit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/ai-act-pme-calendrier",
    "title": "AI Act pour PME : le calendrier vérifié le 26 octobre 2026",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/ai-act-pme-calendrier.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "AI Act pour les PME : le calendrier à jour et ce qui vous concerne",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "#4",
        "background": "ink"
      },
      {
        "type": "editorial-table-block",
        "label": "Le calendrier de l'AI Act au 26 octobre 2026",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Si vous déployez un système à haut risque : ce que l'article 26 demandera au 2 décembre 2027",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui vous concerne, ce qui ne vous concerne pas",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Quoi faire, échéance par échéance",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir lesquels de vos usages d'IA demandent une attention, et lesquels n'en demandent aucune.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/aides-financement-projet-ia",
    "title": "Aides et financements d'un projet IA en PME : ce qui existe en 2026",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/aides-financement-projet-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Aides et financements d'un projet IA en PME : ce qui existe en 2026",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels chiffres du Diag Data IA et du Prêt Boost IA faut-il retenir ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels dispositifs existent pour un projet IA en octobre 2026 ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quel projet ouvre droit au crédit d'impôt innovation ?",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment monter un dossier de financement pour un projet IA ?",
        "background": "paper-3"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand compter sur une aide, et quand ne pas le faire ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Financer un projet IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un projet écrit et chiffré avant de déposer un dossier. L'audit est gratuit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/audit-geo-pme",
    "title": "Audit GEO : les contrôles à faire seul avant d'en commander un",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/audit-geo-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Audit GEO : les contrôles à faire avant d'en commander un",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels repères retenir avant de commencer ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Bloc 1 : les robots peuvent-ils lire vos pages ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Six questions à poser à chacune de vos cinq pages",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#9",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Que faire de ce que vous avez relevé ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Que demander à un audit GEO, et que refuser ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#14",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Audit GEO : questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Un relevé de départ avant de changer quoi que ce soit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/automatisation-factures-fournisseurs-pme",
    "title": "Automatisation des factures fournisseurs : ce qu'on délègue à l'IA, ce qu'on contrôle",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/automatisation-factures-fournisseurs-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatisation des factures fournisseurs : ce qu'on délègue à l'IA, ce qu'on contrôle",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quand recevoir, quand émettre, selon la taille de l'entreprise ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Quel parcours en cinq étapes pour une facture fournisseur ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#9",
        "variant": "quote",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Logiciel du marché ou agent sur mesure : lequel choisir ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant d'envoyer vos factures à un modèle : fixez les données autorisées avec la charte IA",
        "background": "ink"
      },
      {
        "type": "cta-final",
        "label": "Faites passer vos factures par l'audit avant de choisir un outil",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Automatisation des factures fournisseurs : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un échantillon de vos factures, un tableau d'écarts, une décision.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/cahier-des-charges-site-internet",
    "title": "Cahier des charges de site internet : contenu, exemple de brief et choix techniques",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/cahier-des-charges-site-internet.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Cahier des charges site internet : contenu, exemple de brief et choix techniques",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Quelles rubriques écrire, et qu'en laisser à l'agence ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Un brief complet à copier et à remplir, pour une PME de services",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Comment comparer les devis reçus avec votre cahier des charges ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quand choisir quoi : statique, hybride, serveur, CMS, WordPress, Webflow, Lovable",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Que figer dans le cahier des charges, et que laisser ouvert ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia prépare un site avant la première ligne de code ?",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels packs d'heures pour un site, et avec quelle option SEO et GEO ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#15",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant d'écrire le cahier des charges : auditez votre site actuel avec la grille",
        "background": "ink"
      },
      {
        "type": "cta-final",
        "label": "Faites relire votre brouillon de cahier des charges avant les devis",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Cahier des charges de site internet : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un brief précis, des devis que vous pouvez comparer.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/chatbot-transparence-article-50",
    "title": "Chatbot et AI Act : l'obligation de transparence de l'article 50",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/chatbot-transparence-article-50.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Chatbot et AI Act : l'obligation de transparence de l'article 50",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les quatre obligations de l'article 50, et qui doit agir",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Chatbot d'éditeur ou agent sur mesure : qui doit prévoir l'annonce ?",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Quoi écrire selon le canal",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui tient, ce qui ne tient pas",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Six vérifications pour vos chatbots et agents",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Chatbot et article 50 : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir lequel de vos agents doit afficher « IA », et le faire proprement.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/chatgpt-dots",
    "title": "ChatGPT dots : les agents toujours actifs d'OpenAI, accès, prix, limites",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/chatgpt-dots.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "ChatGPT dots : les agents toujours actifs d'OpenAI",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "editorial-callout",
        "label": "#2",
        "variant": "warn",
        "background": "paper-2"
      },
      {
        "type": "direct-answer",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "key-metric-grid",
        "label": "Six repères relevés dans les pages d'OpenAI",
        "variant": "accent",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Disponibilité, prix, limites d'usage : ce que disent les pages d'OpenAI au 24 octobre 2026",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-3"
      },
      {
        "type": "tech-when-dual",
        "label": "Cas d'usage en PME : à confier à un dot, ou pas",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper-3"
      },
      {
        "type": "editorial-table-block",
        "label": "Dots, Duet, agent sur mesure ou moteur ouvert : qui fait quoi",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de confier une mission à un agent toujours actif : écrivez ce qu'il peut faire seul. Recevez le modèle de charte IA en PDF",
        "background": "ink"
      },
      {
        "type": "process-steps",
        "label": "Tester un agent toujours actif sans risque, en quatre étapes",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#16",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Les services",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur ChatGPT dots",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Dots arrivera-t-il sur votre offre ? Soyez prévenu quand ça change.",
        "background": "paper-3"
      },
      {
        "type": "footer-cta-band",
        "label": "Un agent qui suit vos dossiers, avec des règles que vous écrivez.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/choisir-agence-ia-pme",
    "title": "Choisir une agence IA en PME : le guide honnête",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/choisir-agence-ia-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Choisir une agence IA quand on dirige une PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Agence IA, freelance, cabinet, éditeur, équipe interne : le comparatif honnête",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "La grille de décision : huit critères, trois éliminatoires",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "ink"
      },
      {
        "type": "cta-form-inline",
        "label": "Fixez vos règles d'usage de l'IA avant qu'un prestataire touche vos données",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Huit points à écrire dans le devis ou le contrat",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Les cas où Waimia n'est pas le bon choix",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Si vous choisissez Waimia : comment Waimia travaille",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les changements de Claude qui comptent pour une PME, une fois par mois",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Choisir une agence IA : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un prestataire qui vous dit où il n'est pas utile. Ça se vérifie en 45 minutes.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-code-entreprise",
    "title": "Claude Code entreprise : fonctions, prix et déploiement",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-code-entreprise.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Code en entreprise : fonctionnalités, coût et déploiement",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Les chiffres à connaître avant d'équiper une équipe",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Dix fonctions de Claude Code, et à quoi elles servent en entreprise",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Trois fonctions qui font d'un outil individuel un outil d'équipe",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Où Claude Code est inclus, et à quel prix",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant d'ouvrir Claude Code à une équipe : la checklist 90 jours",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Claude Code ou un IDE assisté comme Cursor : pas le même métier",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Trois façons de démarrer avec Claude Code, et quand chacune est la bonne",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "On cadre d'abord, on code ensuite",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les changements de Claude, triés pour une PME",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude Code en entreprise : les questions des acheteurs",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Claude Code chez vous : on vérifie d'abord que c'est le bon outil.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-cowork",
    "title": "Claude Cowork : fusion dans Claude, prix et Windows (2026)",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-cowork.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Cowork est désormais Claude : ce qui change",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quatre repères avant de changer quoi que ce soit",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Claude Cowork avant et après la fusion",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "editorial-timeline",
        "label": "Claude Cowork en six étapes, de janvier à septembre 2026",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Claude Cowork prix : inclus dans les offres payantes",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quelles tâches confier à Claude en PME, et lesquelles garder",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Les réglages d'administration de Cowork, vérifiés un par un",
        "background": "ink"
      },
      {
        "type": "process-steps",
        "label": "Démarrer, ou passer la fusion, en quatre étapes",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur Claude Cowork",
        "background": "paper-2"
      },
      {
        "type": "newsletter-signup-section",
        "label": "La fusion n'est pas finie. Soyez prévenu quand elle touche votre offre.",
        "background": "paper-3"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir quelles tâches confier à Claude, et avec quels réglages.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-design",
    "title": "Claude Design : usages en PME, prix, limites, alternatives",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-design.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Design : usages en PME, limites et alternatives",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quatre faits à connaître avant d'ouvrir l'outil",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Idées reçues sur Claude Design, corrigées au 15 octobre 2026",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce que Claude Design produit, et ce que vous devez apporter",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Claude Design prix : inclus dans les offres de Claude",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quatre usages concrets en PME, et ce qui reste à faire",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "lead-capture-band",
        "label": "Quelle offre Claude donne accès à Design, et à quel coût réel ?",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Claude Design suffit, ou il faut un professionnel ?",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia s'y prend",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur Claude Design",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Claude change chaque mois. Recevez seulement ce qui compte pour une PME.",
        "background": "paper-3"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir ce que Claude Design peut produire chez vous, et ce qu'il faut confier à un pro.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-duet",
    "title": "Claude Duet : l'agent proactif d'Anthropic, prix, accès, limites",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-duet.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Duet : l'agent proactif d'Anthropic",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Six repères avant de vous inscrire",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Duet, Claude, Cowork, Managed Agents : qui fait quoi",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#7",
        "variant": "info",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Cas d'usage en PME : à confier à un agent proactif, ou pas",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Que faire en attendant l'accès : quatre voies",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Tester un agent proactif sans risque, en quatre étapes",
        "background": "paper-3"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de laisser un agent agir en votre nom : le kit conformité et administration de Claude",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#16",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Les services",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur Claude Duet",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Duet arrivera-t-il en France ? Soyez prévenu quand ça change.",
        "background": "paper-3"
      },
      {
        "type": "footer-cta-band",
        "label": "Un agent qui travaille pour vous, sans attendre une liste d'attente.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-finance-pme",
    "title": "Claude pour la finance d'une PME : factures fournisseurs, clôture, trésorerie",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-finance-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude pour la finance d'une PME : factures fournisseurs, clôture, trésorerie",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels chiffres retenir avant de confier une tâche financière à Claude ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quelles tâches financières confier à quel produit Claude, et qui valide ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Qu'est-ce qu'une personne garde toujours dans la finance d'une PME ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Des données financières dans Claude ? Recevez le kit conformité : réglages, RGPD, registre des usages",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude et finance en PME : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Une tâche financière choisie, une validation humaine écrite, avant d'automatiser quoi que ce soit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-fonctionnalites-pme",
    "title": "Claude Pro, Max, Team : offres, prix et usages en PME",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-fonctionnalites-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Pro, Max, Team : offres et prix en PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Offres entreprise, prix par siège et par mois, hors TVA",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les offres Claude, ligne par ligne",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Trois fonctionnalités qui changent le travail d'une PME",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Fonctionnalités, administration et données : la matrice par offre",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Le guide d'achat Claude pour PME : plan, coût, configuration",
        "background": "ink"
      },
      {
        "type": "decision-list",
        "label": "La règle de choix, cas par cas",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Quand acheter et configurer Claude seul, quand se faire accompagner",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia déploie Claude dans une PME",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les offres Claude changent vite. Soyez prévenu quand ça vous concerne.",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Prix et offres de Claude : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir quelle offre Claude prendre, et pour combien de sièges, avant la première facture.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-for-small-business",
    "title": "Claude for Small Business : le guide pour PME en France",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-for-small-business.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude for Small Business : ce que le plugin fait pour une PME française",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Le plugin en quatre chiffres, au 6 octobre 2026",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les 12 commandes du plugin et ce qu'elles valent en France",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Qui décide, qui voit quoi, et comment combler les trous",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Pennylane, Qonto, Sage, PayFit : qui se branche à Claude",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le guide d'achat Claude pour PME (PDF, 14 pages)",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand le plugin suffit, quand faire développer des connecteurs",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia adapte le plugin à une PME française",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les nouveaux connecteurs français à Claude, quand ils sortent",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur Claude for Small Business",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le plugin est américain. Votre compta ne l'est pas.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-gratuit",
    "title": "Claude gratuit : ce que permet l'offre Free et où elle s'arrête",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-gratuit.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude gratuit : ce que permet l'offre Free",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Que donne l'offre Free de Claude, en quatre repères ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Qu'est-ce qui change entre Claude gratuit et Claude Pro ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand rester sur Free, et quand passer à Team ?",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Free, Pro ou Team : quelle offre choisir ?",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le kit de conformité Claude en entreprise",
        "background": "ink"
      },
      {
        "type": "process-steps",
        "label": "Comment sortir des comptes gratuits avec Waimia ?",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude gratuit : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir quels comptes Claude existent dans l'équipe, et lesquels doivent passer sous conditions commerciales.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-in-chrome-entreprise",
    "title": "Claude in Chrome en entreprise : installer, régler, encadrer l'extension",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-in-chrome-entreprise.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Extension Claude in Chrome en entreprise : installer, régler, encadrer",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels chiffres et réglages retenir avant de déployer ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels réglages d'administration, et quelle valeur de départ ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#7",
        "variant": "quote",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Que confier à Claude in Chrome, et que garder hors du navigateur ?",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment mener un pilote en quatre temps ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de déployer à l'équipe : recevez le kit conformité et administration de Claude",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude in Chrome en entreprise : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Une liste de sites, une règle d'une page, un groupe pilote : avant l'installation.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-managed-agents",
    "title": "Claude Managed Agents : prix, limites, données et usages en PME",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-managed-agents.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Managed Agents : l'agent hébergé par Anthropic, expliqué à un dirigeant",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels sont les chiffres à retenir ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Managed Agents, API Messages, Agent SDK, Claude Code ou n8n : lequel choisir ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Quand ne pas choisir Managed Agents ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels sont les postes de coût de Managed Agents ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia choisit entre un workflow, le SDK et Managed Agents ?",
        "background": "paper-3"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de confier des tâches à un agent : recevez le kit conformité et administration de Claude",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude Managed Agents : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "La bonne voie pour votre agent, choisie avant d'écrire une ligne de code.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-plugins-entreprise",
    "title": "Plugins Claude en entreprise : le guide 2026",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-plugins-entreprise.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Plugins et connecteurs Claude pour l'entreprise : le guide",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Ce qu'il faut retenir en quatre chiffres",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les cinq briques d'un plugin et où chacune fonctionne",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Marketplaces officielles, dépôt ouvert, Claude Marketplace",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Six usages concrets en PME, plugin par plugin",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "ink"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le kit conformité et administration de Claude en entreprise",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand prendre un plugin officiel, quand en faire construire un",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia construit et déploie un plugin privé",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les changements de Claude qui comptent pour une PME, une fois par mois",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur les plugins Claude",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un plugin qui porte votre méthode, diffusé à ceux qui en ont besoin.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-pme",
    "title": "Déployer Claude en PME : le guide complet (2026)",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Déployer Claude dans votre PME : le guide complet",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "resource-card-grid",
        "label": "Sept guides détaillés, une question d'acheteur chacun",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Le guide d'achat Claude pour PME : plan, coût, configuration",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Un plan, pas une promesse",
        "variant": "accent"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Par où commencer selon votre profil",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "resource-card-grid",
        "label": "Quatre outils pour poser les prérequis",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Cinq usages qui se mesurent vite",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le pack de 8 skills Claude pour PME",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper-3"
      },
      {
        "type": "process-steps",
        "label": "Trois phases de 30 jours, du test à l'usage d'équipe",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Le plan des 90 jours, case par case",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#16",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#17",
        "background": "paper-3"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le kit conformité et administration de Claude",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#19",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce que chaque option demande, et ce qu'elle coûte",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six cas où vous n'avez pas besoin de Waimia",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Du premier rendez-vous à l'équipe autonome",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Claude change chaque mois. Recevez seulement ce qui touche une PME.",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Déployer Claude en PME : les questions des acheteurs",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vous savez par où commencer. Cadrons votre premier cas.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-rgpd-pme",
    "title": "Claude et RGPD : utiliser Claude en conformité en PME",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-rgpd-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude et RGPD : utiliser Claude en conformité dans une PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Ce qu'Anthropic établit, au 5 octobre 2026",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Entraînement, rétention, contrat : offre par offre",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Registre, analyse d'impact, politique d'usage, DPA : ce que chacun fait",
        "variant": "editorial",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le kit de conformité Claude en entreprise",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Ce qui passe par Claude, ce qui reste dehors",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand avancer seul, quand faire intervenir un DPO ou Waimia",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia s'y prend",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les changements de Claude qui touchent vos données, une fois par mois",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Claude et RGPD : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir quelles données passent par Claude, avant que ce soit trop tard.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-skills",
    "title": "Skills Claude : créer, partager et déployer en entreprise",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-skills.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Skills Claude : créer, partager et déployer vos procédures en entreprise",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "key-metric-grid",
        "label": "Ce qu'Anthropic fixe, au 5 octobre 2026",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "code-showcase",
        "label": "Exemple de SKILL.md : un en-tête de deux champs, puis une procédure en texte",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quatre surfaces, quatre façons d'installer et de partager",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Six exemples concrets, avec ce qu'il faut leur donner",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Écrire, sécuriser, diffuser",
        "background": "paper-2"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le pack de 8 skills Claude pour PME",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Quand le faire vous-même, quand le faire faire",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Les cas où vous n'avez pas besoin de nous",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "De la procédure orale au plugin qui tourne",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Les changements de Claude qui comptent pour une PME, une fois par mois",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Skills Claude : les questions des dirigeants",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Vos procédures en skills qui tournent, pour toute l'équipe",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-tpe",
    "title": "Claude pour une TPE : par où commencer, avec quel abonnement, pour quoi faire",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-tpe.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude pour une TPE : par où commencer, avec quel abonnement",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels chiffres retenir avant de choisir un compte ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quel compte Claude pour quelle situation de TPE ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Qu'est-ce qu'une TPE confie à Claude, et qu'est-ce qu'elle garde ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Que faire la première semaine, puis le premier mois ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Claude pour une petite équipe : recevez le guide d'achat, budgets calculés pour 5, 15 et 40 personnes",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Claude pour une TPE : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le bon compte et un premier usage, choisis avant la première facture.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/combien-coute-un-agent-ia-pme",
    "title": "Combien coûte un agent IA en PME : le coût complet",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/combien-coute-un-agent-ia-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Combien coûte un agent IA pour une PME ?",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Ce qui est sourcé, et ce qui ne l'est pas",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce qui compose le prix d'un agent IA",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Trois budgets mensuels de fonctionnement, hypothèses écrites",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper-2"
      },
      {
        "type": "cta-form-inline",
        "label": "Recevez le guide d'achat Claude pour PME",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Quand vous n'avez pas besoin de Waimia",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia chiffre un agent",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Prix d'un agent IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si un agent vaut son coût chez vous, avant la première heure facturée.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/cout-integration-claude-pme",
    "title": "Coût d'une intégration Claude en PME : prix détaillés",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/cout-integration-claude-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Combien coûte une intégration Claude en PME ?",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Trois chiffres d'Anthropic, un prix Waimia",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "La grille des offres Claude, en dollars",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les heures par poste : des exemples, pas un devis",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les trois exemples côte à côte, sans les additionner",
        "background": "paper-2"
      },
      {
        "type": "lead-capture-band",
        "label": "Recevez le guide d'achat Claude pour PME, avec les budgets calculés",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand le faire soi-même, quand payer un accompagnement",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Quand les prix de Claude bougent, vous le savez avant votre prochain devis",
        "background": "ink"
      },
      {
        "type": "faq-accordion",
        "label": "Coût d'une intégration Claude : vos questions",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir ce que vos licences Claude vous coûteront, avant d'acheter la première. L'audit est gratuit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/cout-projet-ia-pme",
    "title": "Combien coûte un projet IA en PME ? Les huit postes de coût",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/cout-projet-ia-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Combien coûte un projet IA en PME ? Les huit postes",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels chiffres retenir avant de demander un devis ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels sont les postes de coût d'un projet IA ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels sont les ordres de grandeur publics des licences, API et hébergement ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Combien coûte l'accompagnement de Waimia ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quel tableau remplir pour chiffrer votre projet ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Qu'est-ce qui fait monter ou baisser la facture ?",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Coût d'un projet IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un coût complet chiffré sur un périmètre écrit, avant la première heure facturée. L'audit est gratuit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/devis-automatise",
    "title": "Devis automatisé : la méthode pas à pas pour une PME",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/devis-automatise.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Devis automatisé : la méthode pas à pas, quel que soit l'outil",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Les quatre éléments à écrire avant d'ouvrir un outil",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Automatiser un devis en six étapes",
        "background": "paper-3"
      },
      {
        "type": "editorial-table-block",
        "label": "Quatre façons d'automatiser un devis, et le cas qui correspond à chacune",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : une entreprise de services qui envoie trente devis par mois",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand automatiser vos devis, et quand s'abstenir",
        "background": "paper-2"
      },
      {
        "type": "pull-quote-block",
        "label": "#10",
        "variant": "centered",
        "background": "ink"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Devis automatisé : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si vos devis valent d'être automatisés, et par où commencer.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/financement-formation-ia-opco",
    "title": "Financer une formation IA en entreprise : guide OPCO",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/financement-formation-ia-opco.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Financement d'une formation IA en entreprise : OPCO, devis, convention",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Ce que disent les sources officielles, pour la France entière",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Chaque fait, sa source, sa date",
        "variant": "default",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Six étapes, de l'identification de l'OPCO au suivi",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand compter sur un financement, quand ne pas le faire",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "pull-quote-block",
        "label": "#11",
        "variant": "centered",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "On vérifie la prise en charge avant de vous engager.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/hermes-agent",
    "title": "Hermes Agent : l'agent open source de Nous Research en entreprise",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/hermes-agent.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Hermes Agent : l'agent open source qui apprend",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Six repères avant d'installer quoi que ce soit",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce qu'il faut pour faire tourner Hermes Agent",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-timeline",
        "label": "Hermes Agent en quatre dates",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-callout",
        "label": "#7",
        "variant": "warn",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les postes de coût de Hermes Agent, un par un",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de choisir un moteur d'agent : écrivez les règles. Recevez le modèle de charte IA en PDF",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "Hermes Agent en PME : à confier, à ne pas confier",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#14",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#15",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Démarrer avec Hermes Agent en quatre étapes",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#17",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Agents open source",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Services et repères",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur Hermes Agent",
        "background": "paper"
      },
      {
        "type": "newsletter-signup-section",
        "label": "Hermes Agent publie vite. Soyez prévenu des versions qui comptent.",
        "background": "paper-3"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si Hermes Agent a sa place chez vous, et à quelles conditions.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/llm-rag-dirigeant",
    "title": "LLM et RAG : les définitions utiles à un dirigeant de PME · Waimia",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/llm-rag-dirigeant.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "LLM et RAG : les définitions utiles à un dirigeant de PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "LLM, contexte, hallucination, RAG : le tableau",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Modèle seul, documents dans le contexte, RAG ou fine-tuning",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand un RAG vaut le coût, et quand non",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Voir si votre cas justifie une base de connaissance",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce que coûte un RAG : les repères publics, datés",
        "variant": "editorial",
        "background": "paper-3"
      },
      {
        "type": "editorial-table-block",
        "label": "Cinq limites d'un RAG, et la parade",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Cinq questions à se poser avant de lancer un RAG",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "LLM et RAG : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si vos documents justifient un RAG, ou si une solution simple suffit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/mcp-claude",
    "title": "MCP Claude : le protocole expliqué aux dirigeants · Waimia",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/mcp-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "MCP (Model Context Protocol) expliqué à un dirigeant de PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Intégration classique ou serveur MCP",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Huit questions à poser avant de brancher un serveur MCP",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand faire développer un serveur MCP, et quand s'en passer",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de brancher un connecteur : recevez le kit conformité Claude (PDF, 11 pages)",
        "background": "ink"
      },
      {
        "type": "editorial-table-block",
        "label": "MCP dans les plateformes de Claude et d'OpenAI",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Brancher vos outils sur un assistant, avec des droits que vous avez décidés.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/mesurer-visibilite-ia-chatgpt",
    "title": "Mesurer sa visibilité dans ChatGPT et les moteurs IA : un protocole mensuel, sans abonnement",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/mesurer-visibilite-ia-chatgpt.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Mesurer sa visibilité IA : un protocole mensuel, sans abonnement",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels repères retenir avant de commencer ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Le protocole en cinq étapes",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quel relevé mesure quoi, et que ne dit-il pas ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Que peut-on conclure du relevé, et que faut-il s'interdire ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Mesurer sa visibilité dans ChatGPT : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir où vous en êtes avant de changer quoi que ce soit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/n8n-auto-heberge-rgpd",
    "title": "n8n auto-hébergé ou cloud : que change le RGPD ?",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/n8n-auto-heberge-rgpd.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "n8n auto-hébergé ou cloud : que change le RGPD ?",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "n8n Cloud et n8n auto-hébergé : qui porte quoi",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand l'auto-hébergement vaut la peine",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Neuf points pour n8n, quel que soit l'hébergement",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "n8n et RGPD : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Choisir entre Cloud et auto-hébergé, puis régler la purge et les accès.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/n8n-prix",
    "title": "n8n prix : tarifs 2026 et coût complet pour une PME",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/n8n-prix.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "n8n prix : tarifs 2026 et coût complet pour une PME",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Prix mensuels, facturation annuelle, hors taxes",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Les offres n8n, ligne par ligne",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Les cinq postes de coût d'une automatisation n8n",
        "variant": "editorial",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "n8n Cloud ou auto-hébergé : ce que vous payez en argent, ce que vous payez en temps",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Trois budgets mensuels de fonctionnement, hypothèses écrites",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "pull-quote-block",
        "label": "#11",
        "variant": "centered",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand n8n vaut son prix, et quand il ne le vaut pas",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Chiffrer votre cas en cinq étapes",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#14",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Prix de n8n : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "n8n Cloud ou auto-hébergé : décidez avant le premier workflow.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/openclaw",
    "title": "OpenClaw : version 2.0, sécurité et usage en entreprise",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/openclaw.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "OpenClaw 2.0 : l'agent open source à durcir",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Six repères avant d'installer OpenClaw",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce qu'il faut pour faire tourner OpenClaw",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#6",
        "variant": "warn",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Liste de contrôle de durcissement avant la mise en production",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Avant de brancher un agent sur vos messageries : écrivez les règles. Recevez le modèle de charte IA en PDF",
        "background": "ink"
      },
      {
        "type": "tech-when-dual",
        "label": "OpenClaw en PME : à confier, à ne pas confier",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#13",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Mettre OpenClaw en service en quatre étapes",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#15",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Agents open source",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Services et repères",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes sur OpenClaw",
        "background": "paper-2"
      },
      {
        "type": "newsletter-signup-section",
        "label": "OpenClaw change chaque semaine. Soyez prévenu de ce qui compte.",
        "background": "paper-3"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si OpenClaw convient à votre usage, et ce qu'il faut durcir avant.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/prompt-engineering-pme",
    "title": "Prompt engineering en PME : méthode de consignes et gabarits par fonction",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/prompt-engineering-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Prompt engineering en PME : une méthode de consignes en cinq éléments",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels repères retenir avant d'écrire vos consignes ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce que disent Anthropic et OpenAI, élément par élément",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "code-showcase",
        "label": "Un gabarit de consigne en cinq blocs, à adapter à chaque tâche",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Un gabarit par fonction de l'entreprise",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment faire entrer la méthode dans l'équipe ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Prompt engineering en PME : questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Des consignes écrites sur vos tâches, testées sur vos dossiers.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/quel-modele-claude-choisir",
    "title": "Quel modèle Claude choisir : Opus, Sonnet ou Haiku ?",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/quel-modele-claude-choisir.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Quel modèle Claude choisir : Opus, Sonnet ou Haiku ?",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels sont les quatre prix de l'API à retenir ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels sont les modèles Claude actuels ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Pour quelle tâche choisir Opus, Sonnet ou Haiku ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Que coûte le classement de 1 000 e-mails selon le modèle ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Quels modèles Claude sont accessibles dans chaque offre ?",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Quand monter ou descendre de gamme ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Le guide d'achat Claude pour PME : plan, coût, configuration",
        "background": "ink"
      },
      {
        "type": "process-steps",
        "label": "Comment Waimia choisit le modèle d'une automatisation ?",
        "background": "paper-3"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Modèles Claude : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Le bon modèle pour chaque tâche, testé sur vos cas avant la première facture.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/refonte-logiciel-metier",
    "title": "Refonte de logiciel métier : garder, réécrire ou remplacer · Waimia",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/refonte-logiciel-metier.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Refonte de logiciel métier : garder, réécrire ou remplacer ?",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Garder, réécrire par morceaux, remplacer : ce que chaque voie suppose",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Que faire de chaque module : valeur métier et état du code",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-callout",
        "label": "#7",
        "variant": "quote",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Une refonte en six étapes",
        "background": "paper-3"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand nous confier la refonte, et quand acheter ou attendre",
        "background": "paper-2"
      },
      {
        "type": "lead-capture-band",
        "label": "Si l'IA touche au code ou aux données de la refonte : écrivez les règles avant",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Refonte de logiciel métier : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Garder, réécrire ou remplacer : on le décide sur votre outil.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/refonte-site-internet",
    "title": "Refonte de site internet : étapes, coût et SEO à garder",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/refonte-site-internet.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Refonte de site internet : étapes, coût et SEO à garder",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Ce qu'il faut réunir avant de lancer une refonte",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Les étapes d'une refonte de site internet",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Balzeo : une boutique migrée sans perdre ses URL",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Corriger, refondre ou migrer : ce que chaque option touche",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Refondre votre site, ou s'en abstenir",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Corriger ou refaire ? Passez votre site à la grille d'audit",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Refonte de site internet : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir s'il faut corriger votre site ou le refaire.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/rgpd-agents-ia-checklist",
    "title": "RGPD et agents IA : 12 points à vérifier avant de déployer",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/rgpd-agents-ia-checklist.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "RGPD et agents IA : 12 points à vérifier avant de déployer",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "RGPD et agent IA : ce que dit le texte, ce que vous faites",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper-3"
      },
      {
        "type": "tech-when-dual",
        "label": "Avancer seul, ou faire appel à un DPO ou à un juriste",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "12 points à cocher avant de déployer un agent IA",
        "background": "paper"
      },
      {
        "type": "lead-capture-band",
        "label": "Outils autorisés, données interdites, validation humaine : recevez le modèle de charte IA en PDF",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "RGPD et agents IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Passer vos agents IA au crible du RGPD avant la mise en production.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/roi-automatisation",
    "title": "ROI automatisation et IA : la méthode de calcul · Waimia",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/roi-automatisation.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Mesurer le ROI d'une automatisation ou d'un projet IA : la méthode complète",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Chiffrez le gain avant de vous engager",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Le coût complet : six postes, dont trois qu'on oublie",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Exemple illustratif : la saisie de factures fournisseurs",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Le tableau de calcul, ligne par ligne",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un seuil de rentabilité calculé sur vos chiffres, pas sur une moyenne de marché.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/rpa-ou-agent-ia",
    "title": "RPA, automatisation par API ou agent IA : comment choisir en PME · Waimia",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/rpa-ou-agent-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "RPA, automatisation par API ou agent IA : comment choisir",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "RPA, automatisation par API, agent IA : le tableau pour les distinguer",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Ce que coûte le RPA : Power Automate et UiPath",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Votre situation, l'outil à essayer en premier",
        "variant": "editorial",
        "background": "paper-3"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand le RPA se justifie, et quand non",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir l'outil",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "RPA, API ou agent IA : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Savoir si votre tâche demande un robot, une API ou un agent.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/second-cerveau-entreprise",
    "title": "Second cerveau en entreprise : quand il vaut le coût",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/second-cerveau-entreprise.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Second cerveau en entreprise : quand il vaut le coût",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Quels chiffres retenir avant de lancer le projet ?",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Notes, projet Claude ou base indexée : lequel pour quel besoin ?",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Dans quels cas un second cerveau vaut-il son coût ?",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Dans quels cas ce n'est pas le bon projet ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#8",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#9",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Comment décider en une semaine ?",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Second cerveau en entreprise : questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Vérifions d'abord si un projet Claude suffit, avant de construire une base.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/taches-a-automatiser-pme",
    "title": "Automatisation PME : quelles tâches automatiser d'abord",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/taches-a-automatiser-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatisation en PME : quelles tâches automatiser en premier",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Les cinq critères, et comment les mesurer",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "La cartographie en cinq étapes, sur deux semaines",
        "background": "paper-3"
      },
      {
        "type": "editorial-table-block",
        "label": "Selon le profil de la tâche, quoi faire",
        "variant": "editorial",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Par fonction : le bon premier candidat",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qu'on automatise d'abord, ce qu'on n'automatise pas",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#11",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Votre liste de tâches, classée et tranchée en 45 minutes.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/tutoriel-make-tri-emails-claude",
    "title": "Tutoriel Make : trier ses e-mails avec Claude, pas à pas",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/tutoriel-make-tri-emails-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Trier ses e-mails avec Claude dans Make : le scénario pas à pas",
        "background": "paper"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#2",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Le scénario, module par module",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
        "background": "paper"
      },
      {
        "type": "editorial-table-block",
        "label": "Combien de crédits consomme chaque module ?",
        "background": "paper-2"
      },
      {
        "type": "editorial-table-block",
        "label": "Combien coûte la seule vérification de la boîte ?",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#10",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Les limites et les pièges à connaître avant d'activer",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#12",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Classez vos tâches avant de choisir le premier cas",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Tutoriel Make : questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un scénario qui trie vos e-mails, chiffré en crédits avant la première heure facturée.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/outils",
    "title": "Outils",
    "group": "ressources",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/calculateur-roi-ia",
    "title": "Calculateur ROI IA : temps récupérable et budget maximal",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/calculateur-roi-ia.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/charte-ia-entreprise",
    "title": "Charte IA entreprise : modèle gratuit pour PME",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/charte-ia-entreprise.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/checklist-90-jours-claude",
    "title": "Checklist 90 jours pour déployer Claude en PME",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/checklist-90-jours-claude.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/grille-audit-site-internet",
    "title": "Grille d'audit de site internet : corriger ou refaire",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/grille-audit-site-internet.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/grille-taches-a-automatiser",
    "title": "Grille des tâches à automatiser : modèle à remplir",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/grille-taches-a-automatiser.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/guide-achat-claude-pme",
    "title": "Guide d'achat Claude pour PME : plan, coût, configuration",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/guide-achat-claude-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/kit-conformite-claude-entreprise",
    "title": "Kit conformité et administration de Claude en entreprise",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/kit-conformite-claude-entreprise.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/ressources/outils/pack-skills-claude-pme",
    "title": "Pack de 8 skills Claude pour PME",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/pack-skills-claude-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog",
    "title": "Blog",
    "group": "blog",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/agent-ia-24-7-pme",
    "title": "Agent IA 24/7 pour une PME : ce qu'il tient seul",
    "group": "blog",
    "collection": "blog",
    "file": "blog/agent-ia-24-7-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/agent-ia-entreprise-exemples",
    "title": "Agent IA en entreprise : exemples concrets par fonction",
    "group": "blog",
    "collection": "blog",
    "file": "blog/agent-ia-entreprise-exemples.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/agent-ia-toujours-actif-missions-pme",
    "title": "Agent IA toujours actif : sept missions concrètes pour une PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/agent-ia-toujours-actif-missions-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/agent-ia-vs-automatisation-classique-2026",
    "title": "Agent IA vs automatisation : la frontière en 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/agent-ia-vs-automatisation-classique-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/agents-ia-toujours-actifs-pme",
    "title": "Agent IA toujours actif : Duet, dots, Hermes, OpenClaw, que choisir en PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/agents-ia-toujours-actifs-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ai-act-pme-utilisatrice-ia",
    "title": "AI Act : les obligations d'une PME qui utilise ChatGPT ou Claude",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ai-act-pme-utilisatrice-ia.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ai-mode-google-ai-overviews-pme",
    "title": "AI Mode (Mode IA) et AI Overviews de Google : ce que fait une PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ai-mode-google-ai-overviews-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/apparaitre-dans-chatgpt-pme",
    "title": "Apparaître dans ChatGPT : ce qu'une PME contrôle, et ce qu'elle ne contrôle pas",
    "group": "blog",
    "collection": "blog",
    "file": "blog/apparaitre-dans-chatgpt-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/application-metier-exemples-pme",
    "title": "Application métier : définition et exemples par service en PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/application-metier-exemples-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/applications-internes-build-vs-buy-pme",
    "title": "Application interne : développer ou acheter ?",
    "group": "blog",
    "collection": "blog",
    "file": "blog/applications-internes-build-vs-buy-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/architecte-ia-role-pme",
    "title": "Architecte IA : le rôle, les livrables, et quand en avoir un",
    "group": "blog",
    "collection": "blog",
    "file": "blog/architecte-ia-role-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/audit-site-internet-pme",
    "title": "Audit de site internet : la grille avant de décider d'une refonte",
    "group": "blog",
    "collection": "blog",
    "file": "blog/audit-site-internet-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/automatiser-relance-devis-n8n",
    "title": "Automatiser la relance de devis avec n8n, pas à pas",
    "group": "blog",
    "collection": "blog",
    "file": "blog/automatiser-relance-devis-n8n.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil",
    "title": "Automatiser les relances B2B sans commercial dédié",
    "group": "blog",
    "collection": "blog",
    "file": "blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/avis-n8n-vs-zapier-2026",
    "title": "n8n vs Zapier en 2026 : notre verdict par cas d'usage",
    "group": "blog",
    "collection": "blog",
    "file": "blog/avis-n8n-vs-zapier-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/brain-circuit",
    "title": "Cerveau-circuit : l'iconographie IA, un théâtre",
    "group": "blog",
    "collection": "blog",
    "file": "blog/brain-circuit.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/cabler-son-crm-en-10-jours",
    "title": "Câbler son CRM en 10 jours : la méthode",
    "group": "blog",
    "collection": "blog",
    "file": "blog/cabler-son-crm-en-10-jours.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/cahier-des-charges-refonte-site",
    "title": "Cahier des charges d'une refonte de site internet : cinq annexes à ajouter",
    "group": "blog",
    "collection": "blog",
    "file": "blog/cahier-des-charges-refonte-site.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/chatbot-rh-pme",
    "title": "Chatbot RH en PME : ce qu'il répond bien et ce qu'il ne doit jamais trancher",
    "group": "blog",
    "collection": "blog",
    "file": "blog/chatbot-rh-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/chatgpt-dots-depuis-le-lancement",
    "title": "ChatGPT dots depuis le lancement : ce qui a changé en octobre 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/chatgpt-dots-depuis-le-lancement.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/chatgpt-dots-europe-disponibilite",
    "title": "ChatGPT dots en Europe et en France : qui y a accès ?",
    "group": "blog",
    "collection": "blog",
    "file": "blog/chatgpt-dots-europe-disponibilite.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/chatgpt-dots-regles-personnalisees-approbations",
    "title": "ChatGPT dots : règles personnalisées et approbations, mode d'emploi",
    "group": "blog",
    "collection": "blog",
    "file": "blog/chatgpt-dots-regles-personnalisees-approbations.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/chatgpt-shopping-e-commerce",
    "title": "ChatGPT Shopping : ce que lit ChatGPT pour recommander un produit",
    "group": "blog",
    "collection": "blog",
    "file": "blog/chatgpt-shopping-e-commerce.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-code-skills",
    "title": "Skill Claude Code : créer et partager une compétence en équipe",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-code-skills.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-cowork-windows",
    "title": "Claude Cowork sur Windows : oui, mais l'installation dépend de l'offre",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-cowork-windows.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-duet-france-acces-rgpd",
    "title": "Claude Duet en France : accès, RGPD et questions à poser",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-duet-france-acces-rgpd.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-duet-lancement-21-octobre-2026",
    "title": "Claude Duet : ce qu'Anthropic a lancé le 21 octobre 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-duet-lancement-21-octobre-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-duet-ou-claude-cowork",
    "title": "Claude Duet ou Claude Cowork : lequel pour quelle tâche",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-duet-ou-claude-cowork.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-extension-chrome",
    "title": "Extension Claude pour Chrome : installer, régler, dépanner",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-extension-chrome.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-max-pme",
    "title": "Claude Max en PME : pour qui, et quand Pro suffit",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-max-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-microsoft-copilot-pme",
    "title": "Claude Copilot : ce que ça change en PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-microsoft-copilot-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/claude-pro-vs-team",
    "title": "Claude Pro vs Team : lequel choisir pour une petite équipe",
    "group": "blog",
    "collection": "blog",
    "file": "blog/claude-pro-vs-team.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/connecter-claude-wordpress-shopify-mcp",
    "title": "Connecter Claude à WordPress et à Shopify : API, MCP ou connecteur",
    "group": "blog",
    "collection": "blog",
    "file": "blog/connecter-claude-wordpress-shopify-mcp.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/contenu-ia-seo-google-penalise",
    "title": "Contenu IA et SEO : ce que Google pénalise vraiment",
    "group": "blog",
    "collection": "blog",
    "file": "blog/contenu-ia-seo-google-penalise.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/cout-agent-ia-toujours-actif",
    "title": "Coût d'un agent IA toujours actif : Duet, dots, open source ou sur mesure",
    "group": "blog",
    "collection": "blog",
    "file": "blog/cout-agent-ia-toujours-actif.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/creer-agent-ia-claude",
    "title": "Agent IA Claude : quatre façons d'en construire un",
    "group": "blog",
    "collection": "blog",
    "file": "blog/creer-agent-ia-claude.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/etre-cite-par-perplexity",
    "title": "Être cité par Perplexity : ce que le moteur lit, ce que vous contrôlez",
    "group": "blog",
    "collection": "blog",
    "file": "blog/etre-cite-par-perplexity.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/facture-electronique-reception-pme",
    "title": "Facture électronique : ce que la réception obligatoire change pour une PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/facture-electronique-reception-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/formation-ia-cpf-qualiopi",
    "title": "Formation IA CPF : ce qu'il faut vérifier",
    "group": "blog",
    "collection": "blog",
    "file": "blog/formation-ia-cpf-qualiopi.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/formation-ia-finance-pme",
    "title": "Formation IA finance : quel programme exiger",
    "group": "blog",
    "collection": "blog",
    "file": "blog/formation-ia-finance-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/formation-ia-marketing-pme",
    "title": "Formation IA marketing : le programme à exiger en PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/formation-ia-marketing-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/formation-ia-rh-pme",
    "title": "Formation IA RH : le programme à exiger en PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/formation-ia-rh-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/forward-deployed-engineer",
    "title": "Forward deployed engineer : définition, rôle PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/forward-deployed-engineer.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/geo-local-recommande-par-les-ia",
    "title": "GEO local : être recommandé par les IA près de chez soi",
    "group": "blog",
    "collection": "blog",
    "file": "blog/geo-local-recommande-par-les-ia.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/hermes-agent-v0-22-modeles-locaux-connecteurs",
    "title": "Hermes Agent v0.22 : modèles locaux, connecteurs et bac à sable par défaut",
    "group": "blog",
    "collection": "blog",
    "file": "blog/hermes-agent-v0-22-modeles-locaux-connecteurs.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-artisan-batiment",
    "title": "IA pour artisan du bâtiment : Claude, ChatGPT ou Mistral pour devis, compte-rendu et relance",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-artisan-batiment.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-auto-hebergee-open-webui-pme",
    "title": "Open WebUI : héberger son IA en PME, bonne idée ?",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-auto-hebergee-open-webui-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-cabinet-comptable",
    "title": "IA pour cabinet comptable : Claude, ChatGPT ou Mistral, quel outil pour quelle tâche",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-cabinet-comptable.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-cabinet-conseil",
    "title": "IA pour cabinet de conseil : Claude, ChatGPT ou Mistral, quel outil pour quelle tâche",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-cabinet-conseil.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-pme-guide-complet-2026",
    "title": "IA pour PME en 2026 : le guide complet",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-pme-guide-complet-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-pme-industrielle",
    "title": "IA pour PME industrielle : Claude, ChatGPT ou Mistral, quel outil pour quelle tâche",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-pme-industrielle.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/ia-reponse-appel-offres-pme",
    "title": "IA et réponse à un appel d'offres : ce qu'une PME peut préparer, ce qu'elle garde",
    "group": "blog",
    "collection": "blog",
    "file": "blog/ia-reponse-appel-offres-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/installer-hermes-agent-premier-agent",
    "title": "Installer Hermes Agent : un premier agent, pas à pas et prudemment",
    "group": "blog",
    "collection": "blog",
    "file": "blog/installer-hermes-agent-premier-agent.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/landing-page-qui-convertit-methode-2026",
    "title": "Landing page qui convertit : la méthode 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/landing-page-qui-convertit-methode-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/logiciel-seo-ia-pme",
    "title": "Logiciel SEO IA pour PME : faut-il en acheter un ?",
    "group": "blog",
    "collection": "blog",
    "file": "blog/logiciel-seo-ia-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/n8n-c-est-quoi",
    "title": "n8n c'est quoi ? Définition, usages et limites pour une PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/n8n-c-est-quoi.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/openclaw-2-0-migration-changements",
    "title": "OpenClaw 2.0 : changements, migration et mise à jour sans casse",
    "group": "blog",
    "collection": "blog",
    "file": "blog/openclaw-2-0-migration-changements.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/poc-ou-mvp-differences-pme",
    "title": "POC ou MVP : quelle différence pour une PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/poc-ou-mvp-differences-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/relance-factures-impayees-automatique-pme",
    "title": "Relancer les factures impayées automatiquement : la séquence et ce qui reste manuel",
    "group": "blog",
    "collection": "blog",
    "file": "blog/relance-factures-impayees-automatique-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/securiser-openclaw-checklist",
    "title": "Sécuriser OpenClaw : 12 contrôles avant de le brancher à vos messageries",
    "group": "blog",
    "collection": "blog",
    "file": "blog/securiser-openclaw-checklist.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/seo-geo-etre-cite-par-les-ia-generatives",
    "title": "Être cité par les IA : ce qui a changé, ce que vous vérifiez",
    "group": "blog",
    "collection": "blog",
    "file": "blog/seo-geo-etre-cite-par-les-ia-generatives.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/tableau-de-bord-pme-quelles-donnees-suivre",
    "title": "Tableau de bord PME : les données qui comptent",
    "group": "blog",
    "collection": "blog",
    "file": "blog/tableau-de-bord-pme-quelles-donnees-suivre.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/trier-emails-entrant-claude-n8n",
    "title": "Trier ses e-mails entrants avec Claude et n8n",
    "group": "blog",
    "collection": "blog",
    "file": "blog/trier-emails-entrant-claude-n8n.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/webflow-vs-wordpress-vs-site-code-ia-2026",
    "title": "Webflow vs WordPress vs site codé IA en 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/webflow-vs-wordpress-vs-site-code-ia-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/workflow-ia-exemples-pme",
    "title": "Workflow IA : cinq exemples concrets pour une PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/workflow-ia-exemples-pme.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/agence",
    "title": "Agence",
    "group": "confiance",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/agence/methode",
    "title": "Methode",
    "group": "confiance",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/equipe/simon-beros",
    "title": "Simon Beros",
    "group": "confiance",
    "collection": "authors",
    "file": "authors/simon-beros.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/manifesto",
    "title": "Manifesto",
    "group": "confiance",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/technologies",
    "title": "Technologies",
    "group": "confiance",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/audit-ia-pme",
    "title": "Audit IA gratuit pour PME : 45 min, vos tâches classées",
    "group": "conversion",
    "collection": "audits",
    "file": "audits/audit-ia-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "editorial-prose",
        "label": "#0",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Ce que le studio a déjà livré",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#2",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Questions avant de réserver",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Quarante-cinq minutes, et une liste de tâches classées par priorité.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/audit-site-web-intelligent",
    "title": "Audit gratuit de site web · 45 min sur votre système d'acquisition",
    "group": "conversion",
    "collection": "audits",
    "file": "audits/audit-site-web-intelligent.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Audit gratuit de votre site web.",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Un plan priorisé, pas un rapport qui dort",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Les quatre angles qu'on passe en revue",
        "background": "paper"
      },
      {
        "type": "versus-competitors",
        "label": "Cet audit de site est fait pour vous si",
        "background": "paper-2"
      },
      {
        "type": "process-steps",
        "label": "Vos 45 minutes, côté site et conversion",
        "background": "paper"
      },
      {
        "type": "comparison-duo",
        "label": "Le score automatique contre l'échange",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Vos questions sur l'audit de site",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Quarante-cinq minutes pour voir où votre site perd des leads.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/bienvenue/contact",
    "title": "Contact",
    "group": "conversion",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/bienvenue/livre-blanc",
    "title": "Livre blanc",
    "group": "conversion",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/bienvenue/newsletter",
    "title": "Newsletter",
    "group": "conversion",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/conformite-ia",
    "title": "Conformité IA en PME : AI Act et RGPD · Waimia",
    "group": "conversion",
    "collection": "audits",
    "file": "audits/conformite-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Conformité IA : AI Act et RGPD pour les PME",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-timeline",
        "label": "Le calendrier de l'AI Act",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que Waimia fait concrètement",
        "background": "paper-3"
      },
      {
        "type": "editorial-callout",
        "label": "#5",
        "variant": "warn",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#6",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Faire l'inventaire de vos usages d'IA avant qu'on vous le demande.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/contact",
    "title": "Contact",
    "group": "conversion",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/tarifs",
    "title": "Tarifs",
    "group": "conversion",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/_audit-site-web-intelligent",
    "title": "_audit site web intelligent",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/_expertise-claude",
    "title": "_expertise claude",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/actualites",
    "title": "Actualites",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cgv",
    "title": "Cgv",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/demonstrations/_index",
    "title": "_index",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/equipe/_index",
    "title": "_index",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/implantations",
    "title": "Implantations",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/implantations/bordeaux",
    "title": "Agence IA à Bordeaux : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/bordeaux.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Bordeaux",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Comment on démarre",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Parlons de vos processus, à Bordeaux ou en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/dijon",
    "title": "Agence IA à Dijon : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/dijon.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Dijon",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Dijon",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/lille",
    "title": "Agence IA à Lille : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/lille.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Lille",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Lille",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/lyon",
    "title": "Agence IA à Lyon : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/lyon.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Lyon",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Lyon",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/marseille",
    "title": "Agence IA à Marseille : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/marseille.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Marseille",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Marseille",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/montpellier",
    "title": "Agence IA à Montpellier : automatisation et agents IA",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/montpellier.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Montpellier",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#2",
        "background": "paper"
      },
      {
        "type": "decision-list",
        "label": "Trois situations, trois premiers pas",
        "background": "paper-2"
      },
      {
        "type": "editorial-prose",
        "label": "#4",
        "background": "paper"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un ou deux chantiers classés en 45 minutes.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/nantes",
    "title": "Agence IA à Nantes : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/nantes.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Nantes",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Nantes",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/paris",
    "title": "Agence IA à Paris : automatisation et formation · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/paris.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA à Paris, sans bureau à Paris",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se décide au devis pour une mission à Paris",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Un premier échange en visio, depuis Paris.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/strasbourg",
    "title": "Agence IA à Strasbourg : agents IA, LLM et ChatGPT · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/strasbourg.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Strasbourg",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Strasbourg",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/toulouse",
    "title": "Agence IA à Toulouse : automatisation et agents IA · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/toulouse.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA et automatisation à Toulouse",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Ce qui se fait à distance, ce qui se fait à Toulouse",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "cta-final",
        "label": "Où en est votre entreprise avec l'IA ?",
        "background": "ink"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper"
      },
      {
        "type": "faq-accordion",
        "label": "Questions fréquentes",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/mentions-legales",
    "title": "Mentions legales",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/plan-du-site",
    "title": "Plan du site",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/politique-confidentialite",
    "title": "Politique confidentialite",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  },
  {
    "route": "/sources-methodologie",
    "title": "Sources methodologie",
    "group": "autres",
    "collection": "bespoke",
    "editable": false,
    "sections": []
  }
];

export const SITE_GROUPS: Array<{ id: string; label_fr: string; routes: string[] }> = [
  {
    "id": "accueil",
    "label_fr": "Accueil",
    "routes": [
      "/"
    ]
  },
  {
    "id": "offres",
    "label_fr": "Offres et services",
    "routes": [
      "/services",
      "/services/agents-ia",
      "/services/agents-ia/agent-qualification-leads",
      "/services/agents-ia/agent-support-client",
      "/services/agents-ia/agent-traitement-documents",
      "/services/agents-ia/agents-ia-open-source",
      "/services/agents-ia/agents-ia-open-source/integration-hermes-agent",
      "/services/agents-ia/agents-ia-open-source/integration-openclaw",
      "/services/applications-internes",
      "/services/applications-internes/back-office-sur-mesure",
      "/services/applications-internes/mvp-saas",
      "/services/applications-internes/portail-client",
      "/services/automatisation-make",
      "/services/automatisations",
      "/services/automatisations/automatisation-n8n",
      "/services/base-de-connaissance-ia",
      "/services/branding",
      "/services/branding/charte-graphique-brand-book",
      "/services/branding/identite-de-marque",
      "/services/branding/naming-et-positionnement",
      "/services/branding/refonte-de-marque",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/donnees-reporting/centralisation-donnees",
      "/services/donnees-reporting/reporting-automatise",
      "/services/donnees-reporting/tableau-de-bord-direction",
      "/services/integration-claude",
      "/services/integration-claude/integration-chatgpt-openai",
      "/services/integration-claude/integration-mistral-ai",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/prospection-automatisee/automatisation-reseaux-sociaux",
      "/services/prospection-automatisee/cold-email-b2b",
      "/services/prospection-automatisee/prospection-linkedin",
      "/services/prospection-automatisee/social-selling-ia",
      "/services/seo-geo-contenu",
      "/services/seo-geo-contenu/audit-seo-technique",
      "/services/seo-geo-contenu/redaction-seo-contenu",
      "/services/seo-geo-contenu/referencement-ia",
      "/services/seo-geo-contenu/seo-local",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
      "/services/site-web-ia/shopify",
      "/services/site-web-ia/sur-mesure",
      "/services/site-web-ia/webflow",
      "/services/site-web-ia/wordpress",
      "/services/systeme-acquisition",
      "/services/systeme-commercial",
      "/services/systemes-operationnels-ia"
    ]
  },
  {
    "id": "landing",
    "label_fr": "Landing (/lp)",
    "routes": [
      "/lp/hub",
      "/lp/site-web-intelligent",
      "/lp/systeme-acquisition",
      "/lp/systeme-ia-marketing",
      "/lp/visibilite-google-ia"
    ]
  },
  {
    "id": "secteurs",
    "label_fr": "Secteurs",
    "routes": [
      "/secteurs/_index",
      "/secteurs/agence",
      "/secteurs/batiment",
      "/secteurs/comptabilite",
      "/secteurs/conseil",
      "/secteurs/e-commerce",
      "/secteurs/esn",
      "/secteurs/formation",
      "/secteurs/industrie",
      "/secteurs/liberal-independant",
      "/secteurs/services-b2b",
      "/secteurs/startup-logiciel",
      "/secteurs/therapeutes"
    ]
  },
  {
    "id": "cas-clients",
    "label_fr": "Cas clients",
    "routes": [
      "/cas-clients",
      "/cas-clients/amploi",
      "/cas-clients/balzeo",
      "/cas-clients/brow-x-professionnel",
      "/cas-clients/desangles-peinture",
      "/cas-clients/inbound-value",
      "/cas-clients/isabelle-diaz-naturopathe",
      "/cas-clients/les-carnets-de-montpellier",
      "/cas-clients/prototypes-internes",
      "/cas-clients/sprinkable-airess",
      "/cas-clients/virtuoseos",
      "/cas-clients/waimia-os"
    ]
  },
  {
    "id": "cas-usages",
    "label_fr": "Cas d'usage",
    "routes": [
      "/cas-usages",
      "/cas-usages/centraliser-donnees",
      "/cas-usages/finance-comptabilite",
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/rh",
      "/cas-usages/standardiser-processus",
      "/cas-usages/support-sav"
    ]
  },
  {
    "id": "ressources",
    "label_fr": "Ressources",
    "routes": [
      "/demonstrations/avant-apres",
      "/demonstrations/integration-claude",
      "/demonstrations/site-web-intelligent",
      "/ressources",
      "/ressources/comparatifs",
      "/ressources/comparatifs/chatgpt-claude-gemini-perplexity-pme",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-duet-vs-chatgpt-dots",
      "/ressources/comparatifs/claude-platform-vs-openai-platform",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche",
      "/ressources/comparatifs/formateur-ia-organisme-freelance-agence",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/hermes-agent-vs-openclaw",
      "/ressources/comparatifs/lovable-vs-developpement-sur-mesure",
      "/ressources/comparatifs/mistral-vs-claude-pme",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/n8n-vs-make-vs-zapier",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/_index",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides",
      "/ressources/guides/accompagnement-ia-pme",
      "/ressources/guides/agent-ia-definition",
      "/ressources/guides/agent-sav-architecture",
      "/ressources/guides/ai-act-pme-calendrier",
      "/ressources/guides/aides-financement-projet-ia",
      "/ressources/guides/audit-geo-pme",
      "/ressources/guides/automatisation-factures-fournisseurs-pme",
      "/ressources/guides/cahier-des-charges-site-internet",
      "/ressources/guides/chatbot-transparence-article-50",
      "/ressources/guides/chatgpt-dots",
      "/ressources/guides/choisir-agence-ia-pme",
      "/ressources/guides/claude-code-entreprise",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-design",
      "/ressources/guides/claude-duet",
      "/ressources/guides/claude-finance-pme",
      "/ressources/guides/claude-fonctionnalites-pme",
      "/ressources/guides/claude-for-small-business",
      "/ressources/guides/claude-gratuit",
      "/ressources/guides/claude-in-chrome-entreprise",
      "/ressources/guides/claude-managed-agents",
      "/ressources/guides/claude-plugins-entreprise",
      "/ressources/guides/claude-pme",
      "/ressources/guides/claude-rgpd-pme",
      "/ressources/guides/claude-skills",
      "/ressources/guides/claude-tpe",
      "/ressources/guides/combien-coute-un-agent-ia-pme",
      "/ressources/guides/cout-integration-claude-pme",
      "/ressources/guides/cout-projet-ia-pme",
      "/ressources/guides/devis-automatise",
      "/ressources/guides/financement-formation-ia-opco",
      "/ressources/guides/hermes-agent",
      "/ressources/guides/llm-rag-dirigeant",
      "/ressources/guides/mcp-claude",
      "/ressources/guides/mesurer-visibilite-ia-chatgpt",
      "/ressources/guides/n8n-auto-heberge-rgpd",
      "/ressources/guides/n8n-prix",
      "/ressources/guides/openclaw",
      "/ressources/guides/prompt-engineering-pme",
      "/ressources/guides/quel-modele-claude-choisir",
      "/ressources/guides/refonte-logiciel-metier",
      "/ressources/guides/refonte-site-internet",
      "/ressources/guides/rgpd-agents-ia-checklist",
      "/ressources/guides/roi-automatisation",
      "/ressources/guides/rpa-ou-agent-ia",
      "/ressources/guides/second-cerveau-entreprise",
      "/ressources/guides/taches-a-automatiser-pme",
      "/ressources/guides/tutoriel-make-tri-emails-claude",
      "/ressources/outils",
      "/ressources/outils/calculateur-roi-ia",
      "/ressources/outils/charte-ia-entreprise",
      "/ressources/outils/checklist-90-jours-claude",
      "/ressources/outils/grille-audit-site-internet",
      "/ressources/outils/grille-taches-a-automatiser",
      "/ressources/outils/guide-achat-claude-pme",
      "/ressources/outils/kit-conformite-claude-entreprise",
      "/ressources/outils/pack-skills-claude-pme"
    ]
  },
  {
    "id": "blog",
    "label_fr": "Blog",
    "routes": [
      "/blog",
      "/blog/agent-ia-24-7-pme",
      "/blog/agent-ia-entreprise-exemples",
      "/blog/agent-ia-toujours-actif-missions-pme",
      "/blog/agent-ia-vs-automatisation-classique-2026",
      "/blog/agents-ia-toujours-actifs-pme",
      "/blog/ai-act-pme-utilisatrice-ia",
      "/blog/ai-mode-google-ai-overviews-pme",
      "/blog/apparaitre-dans-chatgpt-pme",
      "/blog/application-metier-exemples-pme",
      "/blog/applications-internes-build-vs-buy-pme",
      "/blog/architecte-ia-role-pme",
      "/blog/audit-site-internet-pme",
      "/blog/automatiser-relance-devis-n8n",
      "/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil",
      "/blog/avis-n8n-vs-zapier-2026",
      "/blog/brain-circuit",
      "/blog/cabler-son-crm-en-10-jours",
      "/blog/cahier-des-charges-refonte-site",
      "/blog/chatbot-rh-pme",
      "/blog/chatgpt-dots-depuis-le-lancement",
      "/blog/chatgpt-dots-europe-disponibilite",
      "/blog/chatgpt-dots-regles-personnalisees-approbations",
      "/blog/chatgpt-shopping-e-commerce",
      "/blog/claude-code-skills",
      "/blog/claude-cowork-windows",
      "/blog/claude-duet-france-acces-rgpd",
      "/blog/claude-duet-lancement-21-octobre-2026",
      "/blog/claude-duet-ou-claude-cowork",
      "/blog/claude-extension-chrome",
      "/blog/claude-max-pme",
      "/blog/claude-microsoft-copilot-pme",
      "/blog/claude-pro-vs-team",
      "/blog/connecter-claude-wordpress-shopify-mcp",
      "/blog/contenu-ia-seo-google-penalise",
      "/blog/cout-agent-ia-toujours-actif",
      "/blog/creer-agent-ia-claude",
      "/blog/etre-cite-par-perplexity",
      "/blog/facture-electronique-reception-pme",
      "/blog/formation-ia-cpf-qualiopi",
      "/blog/formation-ia-finance-pme",
      "/blog/formation-ia-marketing-pme",
      "/blog/formation-ia-rh-pme",
      "/blog/forward-deployed-engineer",
      "/blog/geo-local-recommande-par-les-ia",
      "/blog/hermes-agent-v0-22-modeles-locaux-connecteurs",
      "/blog/ia-artisan-batiment",
      "/blog/ia-auto-hebergee-open-webui-pme",
      "/blog/ia-cabinet-comptable",
      "/blog/ia-cabinet-conseil",
      "/blog/ia-pme-guide-complet-2026",
      "/blog/ia-pme-industrielle",
      "/blog/ia-reponse-appel-offres-pme",
      "/blog/installer-hermes-agent-premier-agent",
      "/blog/landing-page-qui-convertit-methode-2026",
      "/blog/logiciel-seo-ia-pme",
      "/blog/n8n-c-est-quoi",
      "/blog/openclaw-2-0-migration-changements",
      "/blog/poc-ou-mvp-differences-pme",
      "/blog/relance-factures-impayees-automatique-pme",
      "/blog/securiser-openclaw-checklist",
      "/blog/seo-geo-etre-cite-par-les-ia-generatives",
      "/blog/tableau-de-bord-pme-quelles-donnees-suivre",
      "/blog/trier-emails-entrant-claude-n8n",
      "/blog/webflow-vs-wordpress-vs-site-code-ia-2026",
      "/blog/workflow-ia-exemples-pme"
    ]
  },
  {
    "id": "confiance",
    "label_fr": "Confiance et agence",
    "routes": [
      "/agence",
      "/agence/methode",
      "/equipe/simon-beros",
      "/manifesto",
      "/technologies"
    ]
  },
  {
    "id": "conversion",
    "label_fr": "Contact et conversion",
    "routes": [
      "/audit-ia-pme",
      "/audit-site-web-intelligent",
      "/bienvenue/contact",
      "/bienvenue/livre-blanc",
      "/bienvenue/newsletter",
      "/conformite-ia",
      "/contact",
      "/tarifs"
    ]
  },
  {
    "id": "autres",
    "label_fr": "Autres",
    "routes": [
      "/_audit-site-web-intelligent",
      "/_expertise-claude",
      "/actualites",
      "/cgv",
      "/demonstrations/_index",
      "/equipe/_index",
      "/implantations",
      "/implantations/bordeaux",
      "/implantations/dijon",
      "/implantations/lille",
      "/implantations/lyon",
      "/implantations/marseille",
      "/implantations/montpellier",
      "/implantations/nantes",
      "/implantations/paris",
      "/implantations/strasbourg",
      "/implantations/toulouse",
      "/mentions-legales",
      "/plan-du-site",
      "/politique-confidentialite",
      "/sources-methodologie"
    ]
  }
];

/** Page réelle par route (undefined si inconnue). */
export function getPage(route: string): SitePage | undefined {
  return SITE_PAGES.find((p) => p.route === route);
}
