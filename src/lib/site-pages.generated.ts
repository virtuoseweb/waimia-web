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
        "type": "statement-orbit",
        "label": "Un chatbot vitrine parle. Un agent exécute, dans vos outils, et rend compte."
      },
      {
        "type": "definition-extract",
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi le répétitif vous coûte cher",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un agent change l'équation",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Ce qu'un agent exécute chez vous",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Autour de l'agent, le reste du système",
        "background": "paper-3"
      },
      {
        "type": "sticky-scroll-storytelling",
        "label": "Du cadrage à l'agent en production",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Des agents tenus sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Une offre, deux manières d'avancer",
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
        "label": "Confiez vos tâches répétitives à un agent qui exécute.",
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
        "type": "statement-orbit",
        "label": "Un chatbot vitrine parle. Un agent de support répond, agit dans vos outils, et vous passe la main quand il faut."
      },
      {
        "type": "definition-extract",
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Le support qu'un agent soulage.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un agent change le support",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un support assisté",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qu'on met en production",
        "background": "paper"
      },
      {
        "type": "logo-marquee",
        "label": "Les outils qu'on branche à votre agent de support",
        "background": "ink"
      },
      {
        "type": "feature-grid",
        "label": "Ce qu'un agent de support exécute chez vous",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "L'agent de support ouvre sur le système",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Comment un agent de support répond vraiment",
        "background": "ink"
      },
      {
        "type": "sticky-scroll-storytelling",
        "label": "Du cadrage à l'agent de support en production",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "L'agent de support continue de rendre du temps après son déploiement",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Des agents tenus sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Une offre, deux manières d'avancer",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#16",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Confiez le support récurrent à un agent qui répond.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vos outils maison vous freinent",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un outil sur mesure change l'équation",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un outil métier interne",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un outil interne solide",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "L'outil interne est une brique du système",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte une application sur mesure",
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
        "label": "Donnez à votre métier l'outil qu'il mérite.",
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
        "type": "statement-orbit",
        "label": "Un process manuel tient sur une personne. Une automatisation tient toute seule, tourne la nuit et ne se trompe pas de copier-coller."
      },
      {
        "type": "definition-extract",
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vos équipes perdent leurs journées",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un process automatisé change l'équation",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'une automatisation qui tient",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "L'automatisation est une brique du système",
        "background": "paper-3"
      },
      {
        "type": "sticky-scroll-storytelling",
        "label": "Comment on travaille ensemble",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Une offre, deux manières d'avancer",
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
        "label": "Rendez à vos équipes les heures que la saisie leur prend.",
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
        "type": "statement-orbit",
        "label": "Avec Zapier on construit vite. Avec n8n on construit large, et le workflow devient un actif métier, pas une recette jetable."
      },
      {
        "type": "definition-extract",
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Le moment où on passe à n8n.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Deux façons d'automatiser, deux coûts d'ownership",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'automatisation avec n8n",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "logo-marquee",
        "label": "Les outils qu'on orchestre dans n8n",
        "background": "ink"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un workflow n8n qui tient",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "n8n est une brique du système",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Comment un workflow n8n s'exécute",
        "background": "ink"
      },
      {
        "type": "sticky-scroll-storytelling",
        "label": "Comment on travaille votre n8n",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "n8n par défaut, Zapier quand il suffit",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Une offre, deux manières d'avancer",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#16",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Faites de n8n votre socle d'automatisation.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Là où une décision IA se grippe.",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un cadrage tranché change la décision",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'une décision IA",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qu'on dépose chez vous",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Quatre décisions avant la moindre ligne de code",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Une fois tranché, le chantier bascule à l'exécution",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Décisions tenues sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un accompagnement IA",
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
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Sortez de l'hésitation, tracez votre trajectoire IA.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi votre CRM sans scoring laisse filer des ventes",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Racheter un CRM de plus, ou activer celui que vous avez",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un CRM",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un CRM qui note et route",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Le CRM s'assemble au reste du système commercial",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Comment tout fonctionne ensemble",
        "background": "ink"
      },
      {
        "type": "feature-zigzag",
        "label": "Le CRM continue de s'affiner après le branchement",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de remettre votre CRM au travail",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#13",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Transformez votre CRM en machine à prioriser.",
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
        "type": "statement-orbit",
        "label": "Un tableur de reporting fige la photo d'hier. Un socle de données rassemble tout, fixe une définition et se met à jour tout seul."
      },
      {
        "type": "definition-extract",
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vous décidez sans y voir clair",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi une donnée centralisée change l'équation",
        "background": "paper-2"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un reporting automatisé qui tient",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Le reporting est une brique du système",
        "background": "paper-3"
      },
      {
        "type": "sticky-scroll-storytelling",
        "label": "Comment on travaille ensemble",
        "background": "paper"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Une offre, deux manières d'avancer",
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
        "label": "Décidez sur des chiffres à jour, pas au doigt mouillé.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi votre IA ne produit rien",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Du POC qui dort à l'agent en production",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux de maturité IA",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qu'on dépose chez vous",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Déployer Claude dans votre entreprise",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Claude ou ChatGPT pour votre entreprise",
        "background": "paper-2"
      },
      {
        "type": "hover-reveal-list",
        "label": "Cinq portes vers le même système",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte Claude en entreprise",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#12",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Mettez votre premier agent en production ce trimestre",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/landing-pages-tunnels",
    "title": "Landing pages qui convertissent · tunnels de qualification PME",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi votre trafic ne devient pas du business",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un tunnel instrumenté change l'équation",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un tunnel de conversion",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce qu'on branche chez vous",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un tunnel qui convertit",
        "background": "paper"
      },
      {
        "type": "system-flow",
        "label": "Comment tout fonctionne ensemble",
        "background": "ink"
      },
      {
        "type": "case-card-grid",
        "label": "Leads mieux captés sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de faire convertir votre trafic",
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
        "label": "Transformez le trafic en leads qualifiés et priorisés.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Prospection B2B et RGPD : ce que la loi autorise vraiment",
        "background": "paper-2"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi votre prospection outbound ne remplit pas le pipeline",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi une prospection instrumentée change l'équation",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'une prospection",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques de la prospection automatisée",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "La prospection s'assemble au reste du système commercial",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Comment tout fonctionne ensemble",
        "background": "ink"
      },
      {
        "type": "feature-zigzag",
        "label": "La séquence continue de s'affiner après le lancement",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Trois formules, un abonnement mensuel sans engagement",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#14",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Transformez votre prospection en machine à rendez-vous.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/seo-geo-contenu",
    "title": "Agence SEO et GEO pour PME · classé sur Google, cité par les IA",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi votre contenu ne rapporte rien",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Pourquoi un contenu structuré change l'équation",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux de visibilité SEO et GEO",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'une machine éditoriale",
        "background": "paper"
      },
      {
        "type": "system-flow",
        "label": "Comment tout fonctionne ensemble",
        "background": "ink"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de lancer votre machine éditoriale",
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
        "label": "Visible sur Google, durablement.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Pourquoi vos leads chauds refroidissent faute de nurturing",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Une newsletter de plus, ou un nurturing déclenché par le comportement",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un suivi",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un suivi qui relance et réveille",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Le suivi s'assemble au reste du système commercial",
        "background": "paper-3"
      },
      {
        "type": "system-flow",
        "label": "Comment tout fonctionne ensemble",
        "background": "ink"
      },
      {
        "type": "feature-zigzag",
        "label": "Les séquences continuent de s'affiner après le lancement",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Deux façons de remettre votre suivi au travail",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#13",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Transformez votre suivi en machine à réchauffer.",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Votre site est joli, et il ne vend rien ?",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Ce qu'un builder IA ne fait pas",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un site web intelligent",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques d'un site web intelligent",
        "background": "paper"
      },
      {
        "type": "hover-reveal-list",
        "label": "Quatre déclinaisons, une même base",
        "background": "paper-3"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Combien coûte un site internet qui vend",
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
        "label": "Transformez votre site en machine à qualifier.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/systeme-acquisition",
    "title": "Générer des leads B2B qualifiés · le système d'acquisition",
    "group": "offres",
    "collection": "services",
    "file": "services/systeme-acquisition.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-masthead-card",
        "label": "Générer des leads B2B qualifiés, sans racheter un flux chaque mois.",
        "background": "paper"
      },
      {
        "type": "proof-bar",
        "label": "En bref",
        "background": "paper"
      },
      {
        "type": "definition-extract",
        "label": "Définition · format extractible",
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
        "type": "method-stepline",
        "label": "Les 6 niveaux d'acquisition",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les briques, de l'acquisition au commercial",
        "background": "paper"
      },
      {
        "type": "system-flow",
        "label": "Comment tout s'articule",
        "background": "ink"
      },
      {
        "type": "feature-zigzag",
        "label": "Comment l'acquisition alimente le système commercial",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Quatre socles pour lancer votre acquisition",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#12",
        "variant": "media"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper-2"
      },
      {
        "type": "footer-cta-band",
        "label": "Une infrastructure qui attire, capte et qualifie, puis passe le relais au commercial.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/services/systeme-commercial",
    "title": "Développement commercial B2B pour PME : le système commercial",
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
        "label": "Définition · format extractible",
        "background": "paper"
      },
      {
        "type": "pain-severity-list",
        "label": "Vos mois creux en rendez-vous ont une cause",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Externaliser à une agence de SDR, ou installer un système",
        "background": "paper-2"
      },
      {
        "type": "method-stepline",
        "label": "Les 6 niveaux d'un développement commercial",
        "background": "paper-3"
      },
      {
        "type": "deliverables-grid",
        "label": "Ce que vous récupérez concrètement",
        "background": "paper"
      },
      {
        "type": "feature-grid",
        "label": "Les modules qui alimentent votre pipeline commercial",
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
        "type": "feature-zigzag",
        "label": "Le système commercial continue d'apprendre après le lancement",
        "background": "paper-2"
      },
      {
        "type": "case-card-grid",
        "label": "Résultats sur le terrain",
        "background": "ink"
      },
      {
        "type": "pricing-cards",
        "label": "Trois formules pour alimenter votre pipeline",
        "background": "paper"
      },
      {
        "type": "eeat-panel",
        "label": "#13",
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
        "label": "Définition · format extractible",
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
        "label": "Résultats sur le terrain",
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
        "label": "Faites tourner vos opérations sur un système, plus sur des personnes.",
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
    "route": "/secteurs",
    "title": "Secteurs",
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
    "title": "Site web et visibilité locale pour le bâtiment : transformer les appels en devis signés",
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
    "title": "Site e-commerce et IA taillé pour la conversion : convertir au lieu de subir les paniers abandonnés",
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
    "title": "Site web et référencement pour libéraux et indépendants : être trouvé et choisi avant le premier contact",
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
    "title": "Site web et IA pour startup et éditeur logiciel : capter les visiteurs qui partent sans formulaire",
    "group": "secteurs",
    "collection": "secteurs",
    "file": "secteurs/startup-logiciel.json",
    "editable": false,
    "sections": []
  },
  {
    "route": "/secteurs/therapeutes",
    "title": "Site web pour thérapeutes et praticiens bien-être : être trouvé sans dépendre des plateformes",
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
    "title": "Amploi : site marketing IA-ready et orienté conversion",
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
    "title": "Centraliser ses données · des outils qui se parlent enfin",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/centraliser-donnees.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Centraliser ses données.",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où la donnée se perd",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Connecter, pas tout remplacer",
        "background": "paper"
      },
      {
        "type": "bento-grid",
        "label": "Les briques qui relient vos outils",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Du vide entre les outils à la donnée fluide",
        "background": "paper-2"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Un cas réel",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Faites circuler vos données au lieu de les recopier.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/cas-usages/generer-plus-de-leads",
    "title": "Générer plus de leads · transformer son site en machine à qualifier",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/generer-plus-de-leads.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Générer plus de leads.",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où les leads fuient",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Une chaîne de conversion sans fuite",
        "background": "paper"
      },
      {
        "type": "bento-grid",
        "label": "Les briques qui captent vos leads",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "Du trafic perdu au lead qualifié",
        "background": "paper-2"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Un cas réel",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Arrêtez de perdre le trafic que vous payez déjà.",
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
    "route": "/cas-usages/standardiser-processus",
    "title": "Standardiser ses processus · une qualité constante, sans dépendre des personnes",
    "group": "cas-usages",
    "collection": "cas-usages",
    "file": "cas-usages/standardiser-processus.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Standardiser ses processus.",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Là où le savoir-faire se fragilise",
        "background": "paper-2"
      },
      {
        "type": "steps-horizontal",
        "label": "Comprendre, simplifier, formaliser, outiller",
        "background": "paper"
      },
      {
        "type": "bento-grid",
        "label": "Les briques qui ancrent vos standards",
        "background": "ink"
      },
      {
        "type": "comparison-duo",
        "label": "De la dépendance à un système qui tient",
        "background": "paper-2"
      },
      {
        "type": "author-byline",
        "label": "Simon Beros",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Un cas réel",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que vous nous demandez",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Transformez un savoir-faire fragile en système qui tient.",
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
    "route": "/ressources/_academy",
    "title": "_academy",
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
        "label": "Claude vs ChatGPT, point par point",
        "background": "paper"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce que chacun fait vraiment bien",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Choisir selon votre besoin",
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
        "label": "Le bon outil dépend de votre cas, pas d'un classement.",
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
    "route": "/ressources/diagnostics",
    "title": "Diagnostics",
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
    "title": "Diagnostic de maturité IA · comprendre les 5 niveaux",
    "group": "ressources",
    "collection": "diagnostics",
    "file": "diagnostics/maturite-ia.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Diagnostic de maturité IA.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "diagnostic-stages",
        "label": "Où en est votre entreprise ?",
        "background": "paper"
      },
      {
        "type": "data-table",
        "label": "Les cinq niveaux de maturité IA, en clair",
        "background": "paper-3"
      },
      {
        "type": "manifesto-statement",
        "label": "Le vrai critère"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce qui détermine votre niveau réel",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six questions pour situer votre maturité",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Ce qu'on fait selon votre niveau",
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
        "label": "Vous savez à quel niveau vous êtes. Posons la marche suivante.",
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
    "route": "/ressources/guides/claude-pme",
    "title": "Déployer Claude dans une PME : le guide pratique, des prérequis aux 90 premiers jours",
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
        "label": "Là où Claude paie le plus vite",
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
    "title": "Calculateur ROI IA gratuit pour PME B2B",
    "group": "ressources",
    "collection": "outils",
    "file": "outils/calculateur-roi-ia.json",
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
    "title": "Automatiser les relances B2B sans SDR",
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
    "route": "/equipe",
    "title": "Equipe",
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
    "title": "Audit IA gratuit pour PME · 45 min, un plan d'action concret",
    "group": "conversion",
    "collection": "audits",
    "file": "audits/audit-ia-pme.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Audit IA gratuit pour PME.",
        "background": "paper"
      },
      {
        "type": "deliverables-grid",
        "label": "Trois livrables activables, pas un diaporama",
        "background": "paper-2"
      },
      {
        "type": "versus-competitors",
        "label": "L'audit est utile pour vous si",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "Le déroulé des 45 minutes",
        "background": "paper-2"
      },
      {
        "type": "comparison-duo",
        "label": "Ce que l'audit gratuit fait et ne fait pas",
        "background": "ink"
      },
      {
        "type": "comparison-pricing-callout",
        "label": "Un regard d'ingénieur, pas un argumentaire commercial",
        "background": "paper"
      },
      {
        "type": "feature-split-media",
        "label": "Besoin d'y voir plus loin ? La grille des 47 critères",
        "background": "paper-2"
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
        "label": "Quarante-cinq minutes pour savoir où l'IA change la donne chez vous.",
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
    "route": "/demonstrations",
    "title": "Demonstrations",
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
    "title": "Agence IA à Bordeaux · Sites web et intégration Claude · Waimia en Gironde",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/bordeaux.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Agence IA à Bordeaux.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Deux leviers, un seul partenaire",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "De l'audit au résultat mesuré",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Waimia est pour vous si vous vous reconnaissez",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que les PME bordelaises nous demandent",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Bordeaux, Gironde. Commençons par un audit gratuit.",
        "background": "ink"
      }
    ]
  },
  {
    "route": "/implantations/montpellier",
    "title": "Agence IA à Montpellier · Sites web et intégration Claude · Waimia",
    "group": "autres",
    "collection": "implantations",
    "file": "implantations/montpellier.json",
    "editable": true,
    "sections": [
      {
        "type": "hero-split-media",
        "label": "Votre studio IA à Montpellier.",
        "background": "paper"
      },
      {
        "type": "direct-answer",
        "label": "#1",
        "background": "paper-2"
      },
      {
        "type": "feature-zigzag",
        "label": "Ce que change un partenaire à Montpellier",
        "background": "paper"
      },
      {
        "type": "process-steps",
        "label": "De l'audit local au site en production",
        "background": "paper-2"
      },
      {
        "type": "decision-list",
        "label": "Six signes qu'un studio IA local vous aiderait",
        "background": "paper"
      },
      {
        "type": "related-cards-band",
        "label": "Pour aller plus loin",
        "background": "paper-2"
      },
      {
        "type": "faq-accordion",
        "label": "Ce que les entreprises de Montpellier nous demandent",
        "background": "paper"
      },
      {
        "type": "footer-cta-band",
        "label": "Un studio IA près de chez vous, dans l'Hérault.",
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
      "/services/automatisations",
      "/services/automatisations/automatisation-n8n",
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
      "/secteurs",
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
      "/cas-usages/generer-plus-de-leads",
      "/cas-usages/reduire-reporting",
      "/cas-usages/reduire-temps-cms",
      "/cas-usages/standardiser-processus"
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
      "/ressources/_academy",
      "/ressources/comparatifs",
      "/ressources/comparatifs/claude-code-vs-cursor",
      "/ressources/comparatifs/claude-vs-chatgpt-pme",
      "/ressources/comparatifs/geo-vs-seo",
      "/ressources/comparatifs/site-web-intelligent-vs-wordpress",
      "/ressources/diagnostics",
      "/ressources/diagnostics/claude-pme",
      "/ressources/diagnostics/maturite-ia",
      "/ressources/diagnostics/referent-ia",
      "/ressources/diagnostics/site-web-intelligent",
      "/ressources/guides",
      "/ressources/guides/claude-pme",
      "/ressources/outils",
      "/ressources/outils/calculateur-roi-ia"
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
      "/equipe",
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
      "/contact",
      "/tarifs"
    ]
  },
  {
    "id": "autres",
    "label_fr": "Autres",
    "routes": [
      "/_expertise-claude",
      "/cgv",
      "/demonstrations",
      "/implantations",
      "/implantations/bordeaux",
      "/implantations/montpellier",
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
