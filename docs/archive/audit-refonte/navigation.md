# Audit navigation waimia-web (refonte simplification) · 2026-06-10

Sources : `src/data/mega-menu.ts` (structure servie), `src/data/sitemap.ts` (données legacy MM_* + FOOTER_COLS), `src/components/header/Header.astro`, `src/components/footer/Footer.astro`, `src/layouts/Base.astro`, `docs/33-PAGES-TAXONOMY-AUDIT.md`.

## 1. Structure EXACTE de la nav actuelle

### 1.1 Header (Header.astro, rendu depuis `MEGA_MENU` de src/data/mega-menu.ts)

Top-level : **5 triggers mega menu** (aucun lien direct, tous ouvrent un panel) + lang toggle FR·EN + **CTA « Réserver un audit » → `/contact`** (EN : `/en/contact`). Logo → `/` (EN : `/en`).

⚠️ **i18n** : les labels du mega menu sont bilingues (`t(label, lang)`), mais les `href` des liens de panel sont les chemins FR bruts (`sub.href`, Header.astro:107). En EN, tout clic dans un mega menu renvoie vers la version FR.

#### A. Solutions (hub `/solutions`) : source `MM_SOLUTIONS_NEW`
- Col « PAR PROBLÈME / Cas d'usage business » :
  - Acquisition IA → `/solutions/acquisition-ia`
  - CRM & relances IA → `/solutions/crm-relances-ia`
  - Contenu SEO / GEO IA → `/solutions/contenu-seo-geo-ia`
  - Productivité IA → `/solutions/productivite-ia`
  - Support client IA → `/solutions/support-client-ia`
- Col « PAR SECTEUR / Adapté à votre métier » :
  - Services B2B → `/secteurs/services-b2b`
  - Industrie & PME industrielles → `/secteurs/industrie`
  - Finance & cabinets comptables → `/secteurs/finance-compta`
  - Tous les secteurs → `/secteurs`
- Featured : « +€2,4 M de pipeline récupéré » → `/cas/plateau`
- Bas de panel : « Voir le hub Solutions → » `/solutions`

#### B. Offres (hub `/offres`) : source `MM_OFFRES_NEW` (EN : « Services »)
- Col « 01 · LES 3 PILIERS / Systèmes business » :
  - Growth System IA → `/offres/growth-system-ia` (featured)
  - Growth Intelligence → `/offres/growth-intelligence`
  - Productivité Opérationnelle IA → `/offres/productivite-operationnelle-ia`
  - Site web IA → `/offres/site-web-ia`
  - RevOps Rebuild → `/offres/revops`
- Col « 02 · NIVEAUX / Activation & infrastructure » :
  - Activation IA · 1 semaine → `/offres/activation-ia`
  - Infrastructure IA · ETI → `/offres/infrastructure-ia`
  - Application IA pour PME → `/offres/application-ia-pme`
  - Conseil & audit IA → `/offres/conseil`
- Featured : « Growth System IA · 5 à 20 k€ » → `/offres/growth-system-ia`

#### C. Cas clients (hub `/cas`) : source `MM_CASES_NEW`
- Col « PAR DOULEUR / Cas vedettes » :
  - Plateau · +€2,4M pipeline → `/cas/plateau` (featured)
  - Halcyon · −38% temps de triage → `/cas/halcyon`
  - Northbound · ×3,1 conversion SQL → `/cas/northbound`
  - Caserne · 1 200 h/an récupérées → `/cas/caserne`
- Col « PAR SECTEUR / Profils similaires » :
  - Services B2B → `/cas?secteur=services-b2b`
  - Industrie → `/cas?secteur=industrie`
  - Finance & compta → `/cas?secteur=finance`
  - Voir tous les cas → `/cas`
- Featured : témoignage Plateau → `/cas/plateau`

#### D. Ressources (hub `/ressources`) : défini inline dans mega-menu.ts (V3 simplifiée, NE PAS MODIFIER)
- Col « LECTURES » : Blog `/ressources/blog` · Livres blancs `/ressources/livres-blancs` · Veille IA `/ressources/veille-ia` · Newsletter `/ressources/#newsletter` · footer « Tous les contenus → » `/ressources`
- Col « PRATIQUE » : Cookbooks `/ressources/cookbooks` · Outils `/ressources/outils` · Cas clients `/cas` · footer « Catalogue outils → » `/ressources/outils`
- Featured (hérité de `MM_RESOURCES`) : Livre blanc AI Act Readiness → `/ressources/livres-blancs/ai-act-readiness`
- Note : les 3 colonnes legacy de `MM_RESOURCES` (École, changelog, essais, technologies) ne sont PLUS servies ; seuls label/href/lead/featured sont repris.

#### E. L'Agence (hub `/agence`) : défini inline dans mega-menu.ts (4 colonnes, 14 liens)
- Col « L'ÉQUIPE / Qui nous sommes » : À propos `/agence/about` · Notre méthode `/agence/methode` (featured) · École Waimia `/ecole` (featured) · Carrières `/agence/careers` · Simon Beros CV `/equipe/simon-beros`
- Col « DESIGN SYSTEM / Design System & DA » : Design System `/agence/design-system` · DS Studio `/agence/ds-studio` (featured) · Hero Lab `/agence/hero-lab` · footer « Ouvrir le design system → »
- Col « CONFIANCE / Garanties & légal » : Trust Center `/agence/trust-center` · Gouvernance `/agence/governance` · Documentation `/agence/docs`
- Col « CONTACT / Discutons » : Réserver un audit `/contact` (featured) · Espace client `/bienvenue/contact` · Newsletter `/ressources/#newsletter`
- Featured (hérité) : « Paris · Genève » → `/agence/about#bureaux`

EN : structure identique (mêmes panels, labels EN), avec le défaut d'hrefs FR signalé plus haut. Mobile : sheet plein écran, accordéon des 5 mêmes sections + CTA + toggle langue.

### 1.2 Footer (Footer.astro, données `FOOTER_COLS` de sitemap.ts) : 5 colonnes
1. **L'Agence** : À propos · Méthode · Trust Center · Carrières · Contact
2. **Solutions** : les 5 solutions par problème + « Par secteur → » `/secteurs`
3. **Offres** : Growth System IA · Growth Intelligence · Productivité Opérationnelle IA · Activation IA · Infrastructure IA
4. **Ressources** : Cas clients `/cas` · Blog · Cookbooks · Livres blancs · Outils gratuits · Veille IA · Newsletter
5. **Légal & Archive** : Trust Center (+ ancres #ai-act #privacy #cgv #cookies) · **Plan du site `/archive`**
Plus : wordmark, trust badges, bloc newsletter, bottom (copyright, Mentions légales, switch FR/EN, LinkedIn/X/YouTube).
Un « DEV INDEX » massif (40 entrées, templates + stubs) est rendu **uniquement en `import.meta.env.DEV`** : invisible en prod.

## 2. Inventaire des navigations secondaires

| Système | Fichier | Pages utilisatrices | Valeur réelle | Pourquoi |
|---|---|---|---|---|
| **PagePill** (barre flottante bottom-left, switcher 4 directions home : Apparatus `/` · Manifesto `/manifesto` · Console `/console` · Atlas `/atlas`) | `src/components/ui/molecules/PagePill.astro` + `PagePillIsland.tsx` | `src/layouts/Base.astro:169` → toutes les pages, **mais gaté `import.meta.env.DEV`** (absent en prod) | **NON** (en prod : déjà invisible ; comme mécanisme : outil d'exploration interne, pas une nav utilisateur) | Supprimer ou laisser en dev. Ne PAS le promouvoir en prod ; remplacer par des entrées de nav réelles pour Manifesto/Console (cf §3) |
| **TunnelNav** (sticky 4 étapes Constat→Décision) | `src/components/ui/molecules/TunnelNav.astro` | `src/pages/offres/[offre]/tunnel/[step].astro` (+ vitrine catalogue design-system) | **OUI** | Progression de tunnel de conversion : oriente réellement, contexte fermé, pas redondant avec le header |
| **TOC sticky TrustLegal** (intégrée au template) | `src/components/templates/TrustLegalTemplate.astro` (TOC interne, sections en prop) | `/agence/trust-center`, `/agence/governance`, `/agence/docs` | **OUI** | Pages légales très longues avec ancres référencées par le footer (#cgv, #privacy...) ; suppression casserait ces ancres |
| **TableOfContents** (molécule) | `src/components/ui/molecules/TableOfContents.astro` | `EssayTemplate.astro` (blog/cookbooks/essais long-form) | **OUI** | Long-form éditorial, standard UX/SEO |
| **Breadcrumb** | `src/components/ui/molecules/Breadcrumb.astro` | ~14 templates + pages détail (cas, offres, solutions, glossaire, comparer, intégrations, équipe, ressources/*) + schema.org (`src/lib/seo/schema-builder.ts`) | **OUI** | Orientation + données structurées SEO ; coût nul |
| **TaxonomyMenu** (« Explorer par catégorie » → `/ressources/categorie/*`) | `src/components/ui/molecules/TaxonomyMenu.astro` | Seulement `agence/design-system.astro` (vitrine catalogue) : **orphelin des pages réelles** | **NON** (en l'état) | Construit mais branché nulle part ; soit l'intégrer au hub `/ressources` (hors scope : Ressources intouchable), soit l'ignorer dans la refonte |
| **TagPills** (tags → `/ressources/tag/*`) | `src/components/ui/molecules/TagPills.astro` | `EssayTemplate.astro` + DS Studio/catalogue | **OUI (faible)** | Maillage interne blog ; ne pollue pas la nav globale |
| **TechPillRow** | `src/components/ui/molecules/TechPillRow.astro` | TechStackBand, CaseStudy/ServiceDetail/ConversionFunnel/DetailMenu templates | **N/A** | Décoratif (stack badges), pas une navigation |
| **ComingSoonPills** | `src/components/sections/ComingSoonPills.astro` | `/secteurs` (index) | **NON** | Pills « à venir » non cliquables : ni nav ni valeur de découvrabilité ; candidat suppression lors de la refonte secteurs |
| **PersonaSwitcher** | `src/components/ui/organisms/PersonaSwitcher.astro` | `/atlas` (+ catalogue) | **OUI (locale)** | Switcher interne à la page Atlas (variante home hors nav) ; pas un système de nav global |

Conclusion navigation secondaire : les seuls « floating/page menus » à trancher sont **PagePill** (dev-only, à ne pas promouvoir) et **TaxonomyMenu/ComingSoonPills** (sans valeur en l'état). TunnelNav, TOC, Breadcrumb apportent une valeur réelle et restent.

## 3. Écarts vs la cible (Solutions · Cas clients · Ressources · Agence · CTA)

1. **Top-level : 5 entrées au lieu de 4.** « Offres » doit disparaître du top-level → fusion dans Solutions (9 liens Offres à redistribuer ; le hub `/offres` et ses ~16 sous-pages restent accessibles via un footer de panel « Voir toutes les offres → /offres » + colonne footer).
2. **Manifesto et Console : PAS accessibles aujourd'hui en prod.** Aucune entrée header/footer ; seuls accès : `/archive` (Plan du site, footer col 5) et le PagePill/DEV INDEX dev-only. La cible exige un accès direct → les ajouter au mega menu Agence (col « Qui nous sommes » ou nouvelle col « Manifeste & démos » : Manifesto `/manifesto` · Console `/console` · Atlas `/atlas`).
3. **Agence : structure générale OK mais 14 liens, à élaguer.** Candidats retrait du menu (restent accessibles via `/agence/design-system`) : Hero Lab, DS Studio (outils internes) ; « Espace client » (`/bienvenue/contact`, page de confirmation détournée en pseudo-portail) ; Newsletter doublonne Ressources.
4. **Doublons inter-menus** : `/cas` présent dans Ressources ET top-level ; `/contact` dans Agence ET CTA header ; Newsletter dans Agence ET Ressources ET footer.
5. **Sections entières hors nav** (découvrables uniquement via footer/archive/liens contextuels) : `/technologies` (hub + ~11 pages), `/ecole` (1 lien dans Agence seulement), `/glossaire`, `/comparer`, `/integrations`, `/commerce`, `/equipe`, `/atlas`, `/manifesto`, `/console`. À arbitrer : la refonte doit décider lesquelles deviennent accessibles (cible : Manifesto/Console oui).
6. **EN cassé dans les panels** : hrefs non localisés (cf §1.1) ; la refonte doit passer les liens par `localizeHref()`.
7. **Double source de données** : `mega-menu.ts` (servie) + `sitemap.ts` (legacy MM_* mappés + FOOTER_COLS). Toute refonte doit éditer les deux de façon cohérente (le footer lit `FOOTER_COLS`, pas `MEGA_MENU`).

## 4. Proposition mega menu Solutions (par besoin prospect : Acquérir / Piloter / Opérer)

Fusion Solutions + Offres, 3 colonnes orientées besoin, liens 100 % existants :

- **Col 1 · ACQUÉRIR : « Trouver et convertir des clients »**
  - Growth System IA (offre phare) → `/offres/growth-system-ia` (featured)
  - Acquisition IA → `/solutions/acquisition-ia`
  - CRM & relances IA → `/solutions/crm-relances-ia`
  - Contenu SEO / GEO IA → `/solutions/contenu-seo-geo-ia`
  - Site web IA → `/offres/site-web-ia`
  - footer : « Toutes les offres → » `/offres`
- **Col 2 · PILOTER : « Voir clair et décider vite »**
  - Growth Intelligence → `/offres/growth-intelligence`
  - RevOps Rebuild → `/offres/revops`
  - Conseil & audit IA → `/offres/conseil`
  - Activation IA · 1 semaine (porte d'entrée) → `/offres/activation-ia`
- **Col 3 · OPÉRER : « Faire tourner l'entreprise sans friction »**
  - Productivité IA → `/solutions/productivite-ia`
  - Support client IA → `/solutions/support-client-ia`
  - Productivité Opérationnelle IA → `/offres/productivite-operationnelle-ia`
  - Infrastructure IA · ETI → `/offres/infrastructure-ia`
  - Application IA pour PME → `/offres/application-ia-pme`
  - footer : « Votre secteur → » `/secteurs`
- **Featured** : cas Plateau +€2,4M → `/cas/plateau` (inchangé, fait le pont vers Cas clients)

Effet : 5 entrées de moins qu'aujourd'hui (Solutions 9 + Offres 9 = 18 → 14+2 footers), 1 niveau de lecture par besoin au lieu du croisement problème/pilier/niveau.

## 5. Proposition mega menu Cas clients simplifié

- **Col unique « RÉSULTATS MESURÉS »** (4 cas vedettes, métriques en label, inchangés) : Plateau · Halcyon · Northbound · Caserne + footer « Voir tous les cas → » `/cas`
- **Supprimer la colonne « Par secteur »** : les 3 liens `?secteur=` sont des filtres par query param, faible valeur dans un menu (le hub `/cas` filtre déjà) ; remplacer par un seul lien éventuel « Cas par secteur → /cas ».
- **Featured** : témoignage Plateau (garder, ou varier avec le livre blanc AI Act pour ne pas tripler Plateau dans le même panel : il est déjà featured du panel Solutions).
- Format 1 col + featured = panel `data-cols=2`, déjà supporté par Header.astro (lignes 87, 97).

## 6. Risques

1. **Liens internes** : retirer « Offres » du top-level n'orpheline pas `/offres/*` (footer col 3 + liens contextuels + proposition §4 les conserve), mais les **stubs `/offres/*` listés seulement dans le DEV INDEX** (agents-metiers, poc-mvp-sprint, managed-agents, self-hosted, +12) n'ont déjà aucune nav prod : vérifier le sitemap avant tout claim de régression.
2. **SEO / maillage** : le mega menu est rendu en HTML serveur sur toutes les pages (indexable LLM, commentaire Header.astro:5). Réduire les entrées réduit le maillage interne site-wide : compenser via footer (qui reste à 5 colonnes) et liens contextuels.
3. **Ancres légales** : footer col 5 dépend des ancres `#ai-act #privacy #cgv #cookies` de `/agence/trust-center` (TOC TrustLegal) : ne pas toucher.
4. **Pages orphelines existantes** (avant refonte) : `/technologies`, `/glossaire`, `/comparer`, `/integrations`, `/commerce`, `/equipe`, `/atlas` ne tiennent que par footer/archive/contextuel ; la refonte ne doit pas aggraver (garder `/archive` Plan du site dans le footer).
5. **EN** : tout changement reconduit le bug hrefs FR si on ne passe pas par `localizeHref` ; à corriger dans la même passe (Header.astro:107, 172).
6. **Double source** : oublier `FOOTER_COLS`/`PRIMARY_NAV` (sitemap.ts) en ne modifiant que `mega-menu.ts` créerait une dérive header/footer.
7. **`aria-current` de section** (Header.astro:24) repose sur `parentHref` : la fusion Solutions+Offres doit décider quel hub (`/solutions`) marque l'état actif pour les pages `/offres/*` (sinon perte du signal de section active).
