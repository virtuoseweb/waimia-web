# 17 · Fusion de VirtuoseWeb dans Waimia

Décision de Simon du 23 novembre 2026 : un seul site, waimia.com. L'IA et l'automatisation restent
l'activité mise en avant ; le site web, le SEO/GEO et la publicité deviennent une offre secondaire
(« Marketing digital », dernière entrée de Solutions), vendue sur la grille unique de
virtuoseweb.fr/tarifs, reprise dans `src/data/pricing.ts` (`WEB_PRICING_EUR`, jetons `{{prix.web.*}}`).
Elle annule la décision du 19 novembre (commit 21fabe17, offres web redirigées vers VirtuoseWeb).

## Ce que disent les données Search Console de virtuoseweb.fr (export de Simon, 3 derniers mois)

- 145 pages, 134 954 impressions, 78 clics. 96 % des impressions sont au-delà de la position 50 :
  elles rapportent très peu de visites.
- 85 % des impressions viennent de requêtes locales (« agence web Nice », « création site internet
  Rennes »…). Les 15 pages « agence web <ville> » portent 104 000 impressions (77 %) en position
  moyenne 74,5, et 33 clics, surtout à Montpellier (15), Nice (6) et Toulouse (4).
- Les 49 pages « ville × service » : 12 400 impressions, 1 clic, position moyenne 62.
- Ce qui tient une position utile (≤ 25) : l'accueil (7,2 ; 13 clics), l'article sur le cloud
  souverain (7,6 ; 10 clics), l'hébergement Vercel (13,5), refonte Rennes (19,3), refonte
  Montpellier (20,9), marketing digital Rennes (22,1), Gemma 4 (19,8), agent IA on-premise (24,2).
- Côté Waimia, les pages web rétablies avaient 5 à 6 semaines d'indexation au 19 novembre, 0 clic,
  et une courbe en hausse (24 → 558 impressions sur 28 jours entre W41 et W48). Waimia a une
  meilleure position moyenne (28 contre 51 sur 7 jours) : c'est le domaine à garder.

## Étapes

1. **Rouvrir l'offre sur Waimia** (ce lot). Pages d'offre rétablies (site web et déclinaisons,
   SEO/GEO et déclinaisons, landing pages, publicité, maintenance, hub `systeme-acquisition`),
   aucune redirection vers VirtuoseWeb, prix alignés sur la grille unique, branding retiré
   (absent de la grille : 301 vers /services/site-web-ia). Menu : « Marketing digital » en dernier.
2. **Reprendre le contenu utile de VirtuoseWeb**, page par page (table ci-dessous), dans le format
   JSON du site. Prérequis : accès au dépôt de VirtuoseWeb ou lecture des pages en ligne.
3. **Basculer le domaine** : 301 de chaque URL de virtuoseweb.fr vers sa cible Waimia (accueil
   compris), puis outil de changement d'adresse de Search Console. Garder le domaine actif.

## Table de correspondance proposée (étape 2 et 3)

| virtuoseweb.fr | Cible waimia.com | Action |
| --- | --- | --- |
| `/` | `/` | 301 |
| `/tarifs/` | `/tarifs/marketing-digital` | 301 ; la grille marketing digital a sa page, /tarifs reste la page IA (PR #201) |
| `/services/creation-site-internet*`, `/services/site-web-par-abonnement/`, `/solutions/tpe|pme|independants|grands-comptes/` | `/services/site-web-ia` | 301 |
| `/services/referencement-seo/` | `/services/seo-geo-contenu` | 301 |
| `/services/marketing-digital/`, `/marketing-digital/` | `/services/systeme-acquisition` | 301 |
| `/services/publicite-en-ligne/`, `/services/google-ads/` | `/services/publicite-en-ligne` | 301 |
| `/services/maintenance-site-web/`, `/services/gestion-hebergement-vercel/` | `/services/maintenance-growth` | reprendre l'hébergement Vercel (position 13,5) en section, puis 301 |
| `/services/ia-automatisation/`, `/services/automatisation-n8n/` | `/services/systemes-operationnels-ia`, `/services/automatisation-n8n` | 301 |
| `/services/application-metier/`, `/services/developpement-application/`, `/services/creation-marketplace/` | `/services/applications-internes`, `/services/mvp-saas` | 301 |
| `/services/agent-ia-on-premise-donnees-sensibles/` | `/services/agents-ia-open-source` | 301 |
| `/agence-web-<ville>/` avec implantation Waimia (Bordeaux, Lille, Lyon, Marseille, Montpellier, Nantes, Paris, Strasbourg, Toulouse) | `/implantations/<ville>` | ajouter une section web à l'implantation, puis 301 |
| `/agence-web-<ville>/` sans implantation (Nice, Rennes, Grenoble, Angers, Rouen, Toulon) | 301 vers `/services/site-web-ia` | Nice et Rennes : création suspendue, voir `18-absorption-seo-virtuoseweb.md` (position moyenne) |
| `/agence-web-<ville>/<service>/` (49 pages) | page service Waimia du même service | 301 |
| `/marketing-digital/<secteur>/` (20 pages) | `/services/systeme-acquisition` ou secteur Waimia équivalent | 301 |
| `/blog/cloud-souverain-francais-scaleway-ovhcloud-outscale-ia/` (position 7,6, 10 clics) | nouvel article Waimia | reprendre le contenu, puis 301 |
| Autres articles et comparatifs IA (Gemma 4, Ollama, MCP, SOP, Claude vs ChatGPT…) | article Waimia équivalent s'il existe, sinon reprise | au cas par cas |
| `/a-propos/`, `/contact/`, `/faq/`, `/cgv/`, mentions | `/agence`, `/contact`, `/tarifs/marketing-digital`, pages légales | 301 |

Table complète des 145 URL : `17-redirections-virtuoseweb.json`. Stratégie de position : `18-absorption-seo-virtuoseweb.md`.

## Points à trancher par Simon

- Prospection : Waimia vend la prospection automatisée dès 980 € HT/mois (Standard, Pro 1 650 €),
  VirtuoseWeb l'option « Prospection » à 790 € HT/mois. Les deux grilles ne coïncident pas encore.
- Audit SEO technique : la grille n'a pas de prix d'audit seul ; la page le présente comme le point
  de départ des packs.
- Villes sans implantation Waimia (Nice, Rennes) : création suspendue le 23 novembre 2026, chiffres et garde-fou dans `18-absorption-seo-virtuoseweb.md`.
