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
    "title": "Agents IA pour entreprise : conception et mise en production · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/agents-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
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
        "type": "pricing-cards",
        "label": "Combien coûte un agent IA",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
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
        "type": "pricing-cards",
        "label": "Prix d'un chatbot de service client",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
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
    "route": "/services/applications-internes",
    "title": "Application métier sur mesure pour PME · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/applications-internes.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
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
        "label": "#8",
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
    "route": "/services/automatisation-make",
    "title": "Agence Make : automatisation de vos processus · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/automatisation-make.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence Make pour PME",
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
        "type": "deliverables-grid",
        "label": "Ce qui est livré",
        "background": "paper"
      },
      {
        "type": "editorial-timeline",
        "label": "Comment se passe une mission Make",
        "background": "paper-3"
      },
      {
        "type": "editorial-prose",
        "label": "#7",
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
        "label": "Commencez par la tâche qui vous coûte le plus d'heures.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/automatisations",
    "title": "Automatisation des processus métier par l'IA · Waimia",
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
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Exemple type : la demande de devis reçue par formulaire",
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
        "label": "#9",
        "variant": "media"
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
    "title": "Agence n8n : automatisation de vos processus · Waimia",
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
        "label": "Exemple type : les factures fournisseurs reçues par email",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qui vous reste à la fin",
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
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Agence n8n : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Un premier workflow n8n en production, sur votre serveur.",
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
        "label": "Base de connaissance IA : le second cerveau de votre entreprise",
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
    "route": "/services/consultant-ia-claude",
    "title": "Consultant IA pour PME : conseil et mise en œuvre · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/consultant-ia-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
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
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
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
        "type": "decision-list",
        "label": "Vous n'avez pas besoin d'un consultant IA si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un accompagnement IA",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Consultant IA : vos questions",
        "background": "paper-2"
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
        "label": "Deux projets où la saisie manuelle a disparu",
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
    "title": "Tableau de bord automatisé pour PME · reporting temps réel",
    "group": "offres",
    "collection": "services",
    "file": "services/donnees-reporting.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Un tableau de bord à jour, sans reporting refait à la main.",
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
        "label": "Prix d'un tableau de bord automatisé",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Tableau de bord et reporting automatisé : vos questions",
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
    "route": "/services/integration-claude",
    "title": "Claude en entreprise : intégration et déploiement · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/integration-claude.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
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
        "type": "decision-list",
        "label": "Ne déployez pas Claude si",
        "background": "paper"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte Claude en entreprise",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Claude en entreprise : vos questions",
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
    "route": "/services/landing-pages-tunnels",
    "title": "Landing pages qui convertissent · tunnels de qualification",
    "group": "offres",
    "collection": "services",
    "file": "services/landing-pages-tunnels.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Des landing pages qui convertissent, un tunnel qui trie vos leads.",
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
        "label": "Le problème vient-il de la page, ou de ce qui suit ?",
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
        "type": "hero-masthead-card",
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
        "label": "Trois formules, un abonnement mensuel sans engagement",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#8",
        "variant": "media"
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
    "route": "/services/seo-geo-contenu",
    "title": "Agence SEO et GEO pour PME : visible sur Google et les IA",
    "group": "offres",
    "collection": "services",
    "file": "services/seo-geo-contenu.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Visible sur Google, cité par les IA : le référencement double couche.",
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
        "label": "Prix d'une prestation SEO et GEO",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "SEO et GEO : vos questions",
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
    "route": "/services/sequences-de-suivi",
    "title": "Devis automatisé et relances clients · Waimia",
    "group": "offres",
    "collection": "services",
    "file": "services/sequences-de-suivi.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Devis automatisés et relances sans oubli",
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
        "label": "Exemple type : les devis d'une entreprise du bâtiment",
        "background": "paper"
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
        "label": "#8",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Devis automatisé et relances : vos questions",
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
    "title": "Création de site internet pour PME · un site qui vend",
    "group": "offres",
    "collection": "services",
    "file": "services/site-web-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Un site internet qui vend, pas une vitrine qui dort.",
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
        "label": "Ne nous confiez pas votre site si",
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
        "type": "eeat-panel",
        "label": "#9",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Création de site internet : vos questions",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Que devient une demande après le formulaire ?",
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
        "label": "Des outils de visibilité au service de votre système.",
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
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "La visibilité n'a de valeur que si la demande est traitée.",
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
        "label": "Un développement commercial B2B qui ne s'arrête jamais.",
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
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
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
    "title": "Agence d'automatisation IA pour PME · Waimia",
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
        "background": "paper"
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
        "label": "#7",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
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
    "title": "Site web et IA pour les agences marketing et com : prouver votre valeur par l'exemple, industrialiser sans diluer la créa",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/agence.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/batiment",
    "title": "IA et automatisation pour le bâtiment : demandes triées, devis le jour même",
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
    "title": "IA et automatisation pour l'e-commerce : commandes, support et catalogue",
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
    "title": "IA et automatisation pour éditeurs de logiciel : demandes routées, support outillé",
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
    "title": "Amploi : site marketing, CRM HubSpot et couche GEO",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/amploi.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/balzeo",
    "title": "Balzeo : migration WordPress, site deux fois plus rapide",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/balzeo.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/desangles-peinture",
    "title": "Desangles Peinture : référencement local, page 6 à 1",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/desangles-peinture.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/isabelle-diaz-naturopathe",
    "title": "Isabelle Diaz, naturopathe : présence en ligne et RDV",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/isabelle-diaz-naturopathe.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/cas-clients/les-carnets-de-montpellier",
    "title": "Les Carnets de Montpellier : une communauté payante",
    "group": "cas-clients",
    "collection": "cases",
    "file": "cases/les-carnets-de-montpellier.json",
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
    "title": "IA en comptabilité : automatiser sans perdre le contrôle · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/finance-comptabilite.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "IA et automatisation de la comptabilité",
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
    "title": "Réduire le temps de reporting · des chiffres prêts, pas à compiler",
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
        "label": "De trois jours à quelques minutes de relecture",
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
        "label": "Ce que vous nous demandez",
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
    "title": "Réduire le temps passé sur le CMS · éditer sans dépendre d'un dev",
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
        "label": "Ce que vous nous demandez",
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
    "title": "IA en ressources humaines : ce qu’on automatise · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/rh.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "IA et automatisation des ressources humaines",
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
        "label": "#6",
        "background": "paper-2"
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
    "title": "Automatiser les tâches administratives d'une PME · Waimia",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/standardiser-processus.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Automatiser les tâches administratives",
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
    "route": "/ressources/comparatifs/claude-code-vs-cursor",
    "title": "Claude Code vs Cursor · agentique ou autocomplétion ?",
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
        "label": "Claude Code face à Cursor, capacité par capacité",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Quatre lignes de fracture",
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
        "label": "Ce que vous nous demandez",
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
        "type": "comparison-table",
        "label": "Claude vs ChatGPT : ce qui est vérifiable",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#3",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Choisir selon votre situation",
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
    "route": "/ressources/comparatifs/geo-vs-seo",
    "title": "GEO vs SEO · être cité par les IA ou trouvé sur Google",
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
        "type": "comparison-table",
        "label": "GEO et SEO, ligne à ligne",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Trois bascules entre trouver et citer",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six repères pour doser GEO et SEO",
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
        "label": "Notre verdict, situation par situation",
        "background": "paper"
      },
      {
        "type": "editorial-prose",
        "label": "#5",
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
        "label": "Le bon outil se choisit sur vos tâches, pas sur un tableau.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
    "title": "Site Web Intelligent vs WordPress · le comparatif honnête pour PME",
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
    "route": "/ressources/guides/claude-cowork",
    "title": "Claude Cowork : guide pour les PME (2026) · Waimia",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-cowork.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Claude Cowork : ce que c'est, ce qui change, comment l'utiliser en PME",
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
        "label": "Où Cowork est disponible, selon Anthropic",
        "variant": "editorial",
        "background": "paper-2"
      },
      {
        "type": "tech-when-dual",
        "label": "Quand l'utiliser en PME, et quand s'abstenir",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Démarrer en PME en quatre étapes",
        "background": "paper-3"
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
        "label": "Savoir quelles tâches confier à Claude, et avec quelles règles.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/ressources/guides/claude-pme",
    "title": "Déployer Claude dans une PME : le guide pratique",
    "group": "ressources",
    "collection": "guides",
    "file": "guides/claude-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Déployer Claude dans votre PME.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "key-metric-grid",
        "label": "Un plan, pas une promesse",
        "variant": "accent",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Les cinq usages par lesquels commencer",
        "background": "paper-2"
      },
      {
        "type": "pull-quote-block",
        "label": "#4",
        "variant": "centered",
        "background": "ink"
      },
      {
        "type": "process-steps",
        "label": "Trois phases pour démarrer juste",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Les 6 prérequis à poser avant le premier compte",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour partir du bon pied",
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
        "label": "Vous savez par où commencer. Cadrons votre premier agent.",
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
    "route": "/ressources/outils/grille-taches-a-automatiser",
    "title": "Grille : quelles tâches automatiser en premier",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/grille-taches-a-automatiser.json",
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
    "route": "/blog/agent-ia-vs-automatisation-classique-2026",
    "title": "Agent IA vs automatisation : la frontière en 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/agent-ia-vs-automatisation-classique-2026.json",
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
    "title": "n8n vs Zapier en 2026 : notre verdict",
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
    "route": "/blog/essai-pillar-ia-pme-2026",
    "title": "L'IA appliquée aux PME en 2026 : le guide pillar",
    "group": "blog",
    "collection": "blog",
    "file": "blog/essai-pillar-ia-pme-2026.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/forward-deployed-engineer",
    "title": "Forward deployed engineer : définition et rôle en PME",
    "group": "blog",
    "collection": "blog",
    "file": "blog/forward-deployed-engineer.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/blog/google-ads-vs-meta-ads-pme-2026",
    "title": "Google Ads vs Meta Ads en PME : lequel choisir",
    "group": "blog",
    "collection": "blog",
    "file": "blog/google-ads-vs-meta-ads-pme-2026.json",
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
    "route": "/blog/seo-geo-etre-cite-par-les-ia-generatives",
    "title": "Être cité par les IA : les mécaniques du GEO",
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
    "route": "/blog/webflow-vs-wordpress-vs-site-code-ia-2026",
    "title": "Webflow vs WordPress vs site codé IA en 2026",
    "group": "blog",
    "collection": "blog",
    "file": "blog/webflow-vs-wordpress-vs-site-code-ia-2026.json",
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
        "type": "faq-accordion",
        "label": "Questions avant de réserver",
        "background": "paper-2"
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
    "title": "IA conforme en PME : AI Act et RGPD · Waimia",
    "group": "conversion",
    "collection": "audits",
    "file": "audits/conformite-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Déployer l'IA en conformité : AI Act et RGPD pour les PME",
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
        "label": "Parlons de vos processus, à Bordeaux ou en visio.",
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
        "label": "Commençons par 45 minutes en visio.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/montpellier",
    "title": "Agence IA à Montpellier : automatisation et agents IA · Waimia",
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
        "label": "Deux processus à automatiser, identifiés en 45 minutes.",
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
      "/services/agents-ia/agent-support-client",
      "/services/applications-internes",
      "/services/automatisation-make",
      "/services/automatisations",
      "/services/automatisations/automatisation-n8n",
      "/services/base-de-connaissance-ia",
      "/services/consultant-ia-claude",
      "/services/crm-scoring-routing",
      "/services/donnees-reporting",
      "/services/integration-claude",
      "/services/landing-pages-tunnels",
      "/services/prospection-automatisee",
      "/services/seo-geo-contenu",
      "/services/sequences-de-suivi",
      "/services/site-web-ia",
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
      "/cas-clients/desangles-peinture",
      "/cas-clients/isabelle-diaz-naturopathe",
      "/cas-clients/les-carnets-de-montpellier"
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
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/n8n-vs-make",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics/_index",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides",
      "/ressources/guides/claude-cowork",
      "/ressources/guides/claude-pme",
      "/ressources/outils",
      "/ressources/outils/calculateur-roi-ia",
      "/ressources/outils/charte-ia-entreprise",
      "/ressources/outils/grille-taches-a-automatiser"
    ]
  },
  {
    "id": "blog",
    "label_fr": "Blog",
    "routes": [
      "/blog",
      "/blog/agent-ia-vs-automatisation-classique-2026",
      "/blog/applications-internes-build-vs-buy-pme",
      "/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil",
      "/blog/avis-n8n-vs-zapier-2026",
      "/blog/brain-circuit",
      "/blog/cabler-son-crm-en-10-jours",
      "/blog/essai-pillar-ia-pme-2026",
      "/blog/forward-deployed-engineer",
      "/blog/google-ads-vs-meta-ads-pme-2026",
      "/blog/landing-page-qui-convertit-methode-2026",
      "/blog/seo-geo-etre-cite-par-les-ia-generatives",
      "/blog/tableau-de-bord-pme-quelles-donnees-suivre",
      "/blog/webflow-vs-wordpress-vs-site-code-ia-2026"
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
      "/cgv",
      "/demonstrations/_index",
      "/equipe/_index",
      "/implantations",
      "/implantations/bordeaux",
      "/implantations/lyon",
      "/implantations/montpellier",
      "/implantations/paris",
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
