# Chantier 2026-10-12 · menu Solutions, pages de services, hub ressources

Livré sur `main` au commit `ea616516` (chantier + PR #84 + PR #85 + filtres mobile). Prod vérifiée en live le 2026-10-12 : 200, un seul H1, meta description présente sur chaque URL listée.

## Pages de services (toutes 200 sur waimia.com)

| Sujet | URL |
|---|---|
| Agence site web (parent) | /services/site-web-ia |
| Agence Webflow | /services/webflow |
| Agence WordPress | /services/wordpress |
| Agence Shopify (nouvelle) | /services/shopify |
| Landing pages et tunnels (déclinaison du site web) | /services/landing-pages-tunnels |
| Agence SEO et référencement naturel | /services/seo-geo-contenu |
| Audit SEO technique / Rédaction SEO / SEO local | /services/audit-seo-technique, /services/redaction-seo-contenu, /services/seo-local |
| Agence de branding (nouvelle) | /services/branding |
| Landings d'offre branding | /services/identite-de-marque, /services/charte-graphique-brand-book, /services/naming-et-positionnement, /services/refonte-de-marque |
| Prospection LinkedIn | /services/prospection-linkedin |
| Réseaux sociaux | /services/automatisation-reseaux-sociaux |
| Applications internes + back-office | /services/applications-internes, /services/back-office-sur-mesure |
| Données et reporting | /services/donnees-reporting, /services/centralisation-donnees, /services/reporting-automatise |
| Agents IA et déclinaisons | /services/agents-ia, /services/agent-support-client, /services/base-de-connaissance-ia, /services/agent-qualification-leads, /services/agent-traitement-documents |
| Intégration Mistral AI (angle européen) | /services/integration-mistral-ai |
| Intégration ChatGPT et OpenAI | /services/integration-chatgpt-openai |

Les slugs historiques (site-web-ia, seo-geo-contenu, landing-pages-tunnels) sont conservés : seuls les libellés et H1 changent, donc aucune redirection à gérer.

## Menu Solutions
Voir le méga-menu sur n'importe quelle page, onglet Solutions puis « Commercial et visibilité » : Agence site web (Webflow, WordPress, Shopify, landing pages et tunnels), Agence SEO et référencement naturel, Agence de branding. Prospection : LinkedIn et Réseaux sociaux. Applications métier et Données et reporting ont leurs enfants. Un libellé identique entre menu et plan du site est garanti par `check:menu-labels`.

## Maillage de /services/systeme-acquisition
5 groupes de liens (site web 6, référencement naturel 5, marque 5, guides et comparatifs 1, aller plus loin 2), 19 cibles toutes en 200. Plafond 6 liens et 5 groupes imposé par `check-related-links-groups`.

## Hub ressources
- Vues filtrées indexables, chacune avec son title et sa meta : /ressources, /ressources/guides, /ressources/comparatifs, /ressources/outils. Pages détail inchangées.
- Recherche dynamique sur les seules ressources, index /ressources/search-index.json.
- Filtres : niveau Type puis niveau Thème, bouton Filtrer et panneau complet sur mobile, pastilles actives retirables.
- Cartes : 0 doublon, 0 carte sans image (`check-card-images`), image réelle de l'article quand elle existe, placeholder seulement sinon.

## PR #84 et #85 incluses
Comparatif CRM sur mesure : /ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche · Guide d'achat Claude (PDF) : /ressources/outils/guide-achat-claude-pme · Toulouse : /implantations/toulouse · Formation Claude Code : /formations/claude-code · Article logiciel SEO IA : /blog/logiciel-seo-ia-pme.

## Preuves rejouées sur l'arbre final
Build `WAIMIA_INTERNAL_TOOLS=0` exit 0. Gates à exit 0 : check-head, check-jsonld, check-sitemap, check-seo, check-static-quality, check-card-images, check-no-emdash, check-menu-labels, check-related-links-groups, check-internal-links, check-internal-mesh, check-redirects, check-media-query-var, check-token-lock, check-pricing, check-content-refs. `astro check` : 8 erreurs, les mêmes que sur `main` avant le chantier (eeat-panel, pricing-tabs-showcase). GF-1 : captures desktop et 390×844, styles calculés, 58 liens du menu en 200, recherche testée (« claude », « n8n », « RGPD », « crm »).

## Limites et points ouverts
- Preuve visuelle faite en Chromium headless, pas Safari ni tactile réel ; pages EN du hub non testées.
- Bandeau cookies mobile : il couvre le bas de l'écran avant choix, non modifié (hors périmètre).
- Les illustrations ajoutées sont des SVG dessinés (moteur B), aucun appel à l'API OpenAI d'images.
- Un merge lancé par erreur sur le dépôt principal pendant le chantier a été annulé (`reset --keep`), sans perte.
- Les PR #84 et #85 étaient en brouillon avec une preview Vercel en erreur `git_info_fail` : leur contenu est validé par le build et les gates de l'arbre final, pas par leur preview.
- Étape suivante : audits Semrush et concurrence, à traiter dans la session suivante.
