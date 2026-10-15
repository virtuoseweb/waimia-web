// Waimia · module `engagement-ledger` · demo bilingue (extrait de la page /tarifs).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  "type": "engagement-ledger",
  "background": "paper",
  "kicker_fr": "§ Tarifs",
  "kicker_en": "§ Pricing",
  "h1_fr": "Tarifs automatisation et <i>intégration IA</i> pour PME",
  "h1_en": "AI automation and <i>integration</i> pricing for SMEs",
  "lede_fr": "Un parcours en cinq étapes, prix affichés. Tout commence par un audit gratuit de 45 minutes ; le devis ferme vient après, jamais avant.",
  "lede_en": "A five-step path, prices shown. It all starts with a free 45-minute audit; the firm quote comes after, never before.",
  "rows": [
    {
      "step_fr": "Étape 1",
      "step_en": "Step 1",
      "name_fr": "Audit IA",
      "name_en": "AI audit",
      "body_fr": "Quarante-cinq minutes en visio avec Simon Beros, qui réalisera la mission. On passe vos processus en revue et on repère ce qui mérite d'être automatisé.",
      "body_en": "Forty-five minutes on a call with Simon Beros, who will do the work. We review your processes and spot what is worth automating.",
      "includes_fr": [
        "Revue de vos processus et de vos outils",
        "Trois automatisations rentables identifiées",
        "Un avis net : faire, attendre ou ne pas faire"
      ],
      "includes_en": [
        "Review of your processes and tools",
        "Three profitable automations identified",
        "A clear opinion: do it, wait, or don't"
      ],
      "duration_fr": "45 min, en visio",
      "duration_en": "45 min, on a call",
      "price_fr": "0 €",
      "price_en": "0 €",
      "price_note_fr": "Sans engagement",
      "price_note_en": "No commitment",
      "cta": {
        "label_fr": "Réserver un audit",
        "label_en": "Book an audit",
        "href": "/contact?offer=audit-ia-pme&intent=audit"
      },
      "entry": true
    },
    {
      "step_fr": "Étape 2",
      "step_en": "Step 2",
      "name_fr": "Sprint de cadrage",
      "name_en": "Scoping sprint",
      "body_fr": "Dix heures pour cadrer le premier chantier : périmètre, données, outils à brancher, risques. Vous repartez avec un premier livrable en main, pas avec un rapport qui dort.",
      "body_en": "Ten hours to scope the first project: perimeter, data, tools to connect, risks. You leave with a first deliverable in hand, not a report that sleeps.",
      "includes_fr": [
        "Cartographie du processus visé",
        "Premier livrable actionnable",
        "Plan d'action et temps estimé pour la suite",
        "Points RGPD et AI Act repérés"
      ],
      "includes_en": [
        "Map of the target process",
        "A first actionable deliverable",
        "Action plan and time estimate for what follows",
        "GDPR and AI Act points flagged"
      ],
      "duration_fr": "10 h",
      "duration_en": "10 h",
      "price_fr": "999 € HT",
      "price_en": "999 € ex VAT",
      "price_note_fr": "Prix fixe",
      "price_note_en": "Fixed price",
      "cta": {
        "label_fr": "Lancer un sprint de cadrage",
        "label_en": "Start a scoping sprint",
        "href": "/contact?offer=sprint-cadrage"
      }
    },
    {
      "step_fr": "Étape 3",
      "step_en": "Step 3",
      "name_fr": "Pilote",
      "name_en": "Pilot",
      "body_fr": "Un premier système en production : une automatisation, un agent IA ou une application métier, branché à vos outils et mesuré sur vos données.",
      "body_en": "A first system in production: an automation, an AI agent or a business application, connected to your tools and measured on your data.",
      "includes_fr": [
        "Le module qui rend le plus de temps, mis en production",
        "Branché à vos outils via API ou MCP",
        "Validation humaine et journal des actions",
        "Code et workflows livrés chez vous"
      ],
      "includes_en": [
        "The module that gives back the most time, in production",
        "Connected to your tools through API or MCP",
        "Human validation and action log",
        "Code and workflows delivered to you"
      ],
      "price_fr": "Dès 2 000 € HT",
      "price_en": "From 2,000 € ex VAT",
      "price_note_fr": "4 000 € HT indicatif pour une application de 3 à 5 écrans avec un premier agent",
      "price_note_en": "4,000 € ex VAT indicative for a 3-to-5-screen application with a first agent",
      "cta": {
        "label_fr": "Cadrer un pilote",
        "label_en": "Scope a pilot",
        "href": "/contact?offer=pilote"
      }
    }
  ],
  "aside": {
    "title_fr": "Aussi au catalogue",
    "title_en": "Also available",
    "body_fr": "Le site web et la prospection sont des outils au service du système, pas le cœur du métier. Même règle : audit d'abord, prix affichés.",
    "body_en": "The website and prospecting are tools serving the system, not the core of the job. Same rule: audit first, prices shown.",
    "items": [
      {
        "label_fr": "Site web IA",
        "label_en": "AI website",
        "price_fr": "dès 2 000 € HT",
        "price_en": "from 2,000 € ex VAT",
        "href": "/services/site-web-ia"
      },
      {
        "label_fr": "Maintenance d'un site en production",
        "label_en": "Maintenance of a live website",
        "price_fr": "dès 99 € HT/mois",
        "price_en": "from 99 € ex VAT/month"
      },
      {
        "label_fr": "SEO, GEO et contenu",
        "label_en": "SEO, GEO and content",
        "price_fr": "sprint à 999 € HT, puis 99 € HT/h",
        "price_en": "sprint at 999 € ex VAT, then 99 €/h",
        "href": "/services/seo-geo-contenu"
      },
      {
        "label_fr": "Prospection automatisée",
        "label_en": "Automated prospecting",
        "price_fr": "0, 980 ou 1 650 € HT/mois",
        "price_en": "0, 980 or 1,650 € ex VAT/month",
        "href": "/services/prospection-automatisee"
      }
    ]
  },
  "footnote_fr": "Prix hors taxes. Les montants « dès » sont des planchers : le devis ferme est établi après l'audit gratuit, sur un temps estimé avec vous et validé avant exécution. Taux horaire unique de 99 € HT, non dégressif.",
  "footnote_en": "Prices exclude VAT. \"From\" amounts are floors: the firm quote is drawn up after the free audit, on a time estimate made with you and validated before work starts. Single hourly rate of 99 € ex VAT, flat."
};
