# Mapping de migration · refonte 3 piliers waimia-web

> Doc de travail produit en lecture seule (aucune édition `src/`). Source : audit fichier-par-fichier des 9 offres + 20 solutions + nav + templates, le 2026-06-13.
> Architecture cible (décidée par Simon, non rediscutée ici) : 3 piliers **Acquérir** (Growth System IA, seul silo développé maintenant), **Piloter** (Business Intelligence, pilier à ancres, silo non développé), **Opérer** (Opérations IA, pilier à ancres + quelques pages enfant, silo non développé). Acquérir Phase B = 3 pages de service : Site web intelligent, Content marketing intelligent, Tunnel de conversion + landing. Chaque service = 2 surfaces : `/services/<slug>` (SEO/GEO riche) + `/lp/<slug>` (landing conversion). URLs supprimées = **404 net, pas de 301**.

---

## 0. Synthèse chiffrée

| Action | Offres | Solutions | Total |
|---|---:|---:|---:|
| RECYCLER → page service Acquérir | 1 (site-web-ia .astro) | 4 | 5 |
| FUSIONNER (vers une des 3 pages service) | 0 | 4 | 4 |
| ANCRE PILIER (Piloter / Opérer) | 2 | 9 | 11 |
| ARCHIVER / 404 | 5 | 3 | 8 |
| GARDER TEL QUEL (hors périmètre) | 2 (revops, audit-maturite) | 0 | 2 |

- **3 pages service Acquérir** à fonder : `site-web-intelligent`, `content-marketing-intelligent`, `tunnel-de-conversion`.
- **2 surfaces chacune** = 6 routes nouvelles (`/services/<slug>` x3 + `/lp/<slug>` x3). Sources de contenu réutilisable identifiées pour les 6.
- **URLs qui passent en 404** : **~24** (voir §5). Toutes les pages `/solutions/*` non recyclées/non-ancrées + offres archivées + le hub `/solutions` lui-même.
- **Templates** : `OffresDetailTemplate` = à RETIRER (seul usage = placeholder noindex de 3 stubs morts). `SolutionsDetailTemplate` = à GARDER (live via `/secteurs/*`, hors périmètre refonte piliers).

> Note importante : `kind: industry` (fintech) et toute la branche `/secteurs/*` sont **hors périmètre** de cette refonte 3 piliers. Ils restent tels quels.

---

## 1. Tableau OFFRES (collection `src/content/offres/*.mdx` + pages `.astro`)

Toutes les offres MDX sont composables (`sections:` présent, 9/9). Rendu via `src/pages/offres/[...slug].astro` → `SectionsRenderer`. URL actuelle = `/offres/<slug>`.

| Fichier | slug | need (déduit) | template actuel | qualité contenu | ACTION | cible | notes |
|---|---|---|---|---|---|---|---|
| `growth-system-ia.mdx` | growth-system-ia | acquerir | composable (7 sec, 295 l) | riche, réel, offre phare | **GARDER → devient le PILIER Acquérir** | `/acquerir` (page pilier Growth System) | C'est le silo Acquérir développé. Base du pilier. URL à arbitrer (garder `/offres/growth-system-ia` ou passer `/acquerir`). |
| `site-web-ia.astro` (page, pas MDX) | site-web-ia | acquerir | page `.astro` dédiée (tunnel conversion) | riche, réel, flagship | **RECYCLER → page service** | `/services/site-web-intelligent` + `/lp/site-web-intelligent` | Page conversion existante. La logique tunnel + steps alimente la landing `/lp`. |
| `site-web-ia-landing.astro` (page) | site-web-ia-landing | acquerir | page `.astro` (hero-landing, V-F3) | riche, réel, format landing | **RECYCLER → landing** | `/lp/site-web-intelligent` | Déjà une vraie landing conversion (eyebrow, problème, métriques). Devient le gabarit `/lp`. |
| `activation-ia.mdx` | activation-ia | (transverse) | composable (8 sec, 281 l) | riche, réel (offre starter 1 sem) | **ARCHIVER / 404** | — | Offre « palier d'entrée » transverse aux 3 piliers, pas un service Acquérir. Hors-scope refonte (les paliers tarifaires ne sont pas la grille piliers). À ré-héberger plus tard si besoin, sinon 404. |
| `growth-intelligence.mdx` | growth-intelligence | piloter | composable (6 sec, 259 l) | riche, réel | **ANCRE PILIER Piloter** | `/piloter#vue-densemble` | Contenu = pilotage data temps réel = cœur du pilier Piloter (Business Intelligence). Nourrit l'intro + ancre « pilotage ». |
| `productivite-operationnelle-ia.mdx` | productivite-operationnelle-ia | operer | composable (6 sec, 259 l) | riche, réel | **ANCRE PILIER Opérer** | `/operer#automatisation` | Contenu = automatisation workflows / Excel augmenté = cœur du pilier Opérer. |
| `infrastructure-ia.mdx` | infrastructure-ia | (transverse ETI) | composable (5 sec, 229 l) | réel mais haut de gamme ETI | **ARCHIVER / 404** | — | Offre « palier ETI sur devis », pas un service des 3 piliers. Hors-scope. 404. |
| `application-ia-pme.mdx` | application-ia-pme | (transverse) | composable (5 sec, 268 l) | réel (MVP app dédiée) | **ARCHIVER / 404** | — | Service custom (dev app), hors grille 3 piliers marketing. 404. |
| `conseil.mdx` | conseil | (gouvernance) | composable (9 sec, 239 l) | réel (7 services audit) | **ARCHIVER / 404** | — | Conseil/audit/gouvernance, hors 3 piliers. Recoupe `audit-maturite-ia`. 404. |
| `claude-cowork.mdx` | claude-cowork | (productivité interne) | composable (5 sec, 230 l) | réel (déploiement Claude équipes) | **ARCHIVER / 404** | — | Sujet « adoption Claude en interne », hors grille piliers acquisition. 404 (ou futur Opérer, mais pas maintenant). |
| `composable-pilot.mdx` | composable-pilot | — | composable (4 sec, 92 l) | **POC technique, contenu fictif** | **ARCHIVER / 404** | — | Preuve : frontmatter `title_fr: "Composable Pilot · POC adoption V2"`, `tags: ["composable-v2","demo"]`, body « Cette page utilise SectionsRenderer · 0 ligne de HTML hardcoded ». Démo dev, pas un service. Orphelin nav (référencé seulement par `src/data/guarantees.ts:89`). 404. |
| `revops.astro` (page) | revops | piloter | page `.astro` dédiée | réel (CRM+entrepôt+billing) | **GARDER TEL QUEL** | — | Offre RevOps autonome, déjà liée en nav (colonne Piloter du mega-menu). Hors refonte des 3 pages service Acquérir. Peut devenir une ancre Piloter ultérieurement. |
| `audit-maturite-ia.astro` (page) | audit-maturite-ia | (audit) | page `.astro` dédiée | réel (audit 10 j) | **GARDER TEL QUEL** | — | Page audit autonome, hors périmètre. Recoupe `conseil` (à dédupliquer plus tard, pas maintenant). |

> `/offres/site-web-ia` et `/offres/revops` ne sont PAS dans la collection MDX : ce sont des pages `.astro` dédiées (`src/pages/offres/site-web-ia.astro`, `revops.astro`). Le mega-menu les référence (`/offres/site-web-ia`, `/offres/revops`).

---

## 2. Tableau SOLUTIONS (collection `src/content/solutions/*.mdx`, 20 fichiers)

Toutes composables (`sections:` présent, 20/20). Rendu via `src/pages/solutions/[...slug].astro` → `SectionsRenderer`. URL actuelle = `/solutions/<slug>`. Le champ `need` est posé dans le frontmatter (acquerir/piloter/operer) sauf industries.

| Fichier | slug | need | kind | qualité contenu | ACTION | cible | notes |
|---|---|---|---|---|---|---|---|
| `site-web-ia-pme.mdx` | site-web-ia-pme | acquerir | department | riche, réel (5 sec, 213 l) | **FUSIONNER** | `/services/site-web-intelligent` (canonique = `site-web-ia.astro`) | Doublon d'intention avec la page `site-web-ia.astro`. Le contenu SEO « PME B2B » (personas, pipeline éditorial, scoring) enrichit la page service. Canonique = la page service, ce MDX est la source de corps SEO. |
| `content-marketing-ia.mdx` | content-marketing-ia | acquerir | department | **riche, réel, excellent** (8 sec, 252 l) | **RECYCLER → page service** | `/services/content-marketing-intelligent` | Canonique de la page service Content marketing. Hero, 3 pains, feature-zigzag, workflow-table 4 étapes, stack, pull-quote, CTA : tout exploitable verbatim. |
| `contenu-seo-geo-ia.mdx` | contenu-seo-geo-ia | acquerir | department | riche, réel (6 sec, 201 l) | **FUSIONNER** | `/services/content-marketing-intelligent` | SEO/GEO = sous-thème du content marketing intelligent (cf brief : « content-marketing-ia + contenu-seo-geo-ia → 1 page »). Apporte la dimension « trouvé par Google ET les IA ». SEO/GEO en page séparée = différé. |
| `tunnel-de-vente.mdx` | tunnel-de-vente | acquerir | department | riche, réel (8 sec, 273 l) | **RECYCLER → page service** | `/services/tunnel-de-conversion` + `/lp/tunnel-de-conversion` | Canonique de la page service Tunnel de conversion. Landing → qualification → nurture → closing, chaque étape scorée. Base directe de la 3e page service. |
| `acquisition-ia.mdx` | acquisition-ia | acquerir | department | riche, réel (9 sec, 293 l) | **FUSIONNER** | `/acquerir` (pilier) OU `/services/tunnel-de-conversion` | Vue « système d'acquisition » globale = recouvre le pilier Acquérir (growth-system-ia). Sert le chapô du pilier. Éviter le doublon avec growth-system-ia : un seul canonique pour « le système d'acquisition ». |
| `crm-relances-ia.mdx` | crm-relances-ia | acquerir(*) | department | riche, réel (5 sec, 192 l) | **ANCRE PILIER Opérer** | `/operer#crm-relances` | Frontmatter dit `need: acquerir` mais le mega-menu le range en colonne **Opérer** (`/solutions/crm-relances-ia` sous « Opérer »). CRM & relances = opérationnel. Incohérence à trancher (cf §7 Q1). Devient ancre Opérer. |
| `agent-marketing-commercial.mdx` | agent-marketing-commercial | acquerir | department | riche, réel (8 sec, 269 l) | **ARCHIVER / 404** | — | « Agent IA marketing » = agents IA = explicitement différé par le brief (« agents IA = différés, PAS maintenant »). 404. |
| `publicite-en-ligne.mdx` | publicite-en-ligne | acquerir | department | riche, réel (8 sec, 260 l) | **ARCHIVER / 404** | — | Publicité = explicitement différé par le brief (« publicité = différés »). 404. |
| `tableaux-de-bord-analytics.mdx` | tableaux-de-bord-analytics | piloter | department | riche, réel (8 sec, 290 l) | **ANCRE PILIER Piloter** | `/piloter#tableaux-de-bord` | Cœur du pilier Piloter (Business Intelligence). Ancre dashboards. |
| `reporting-ia.mdx` | reporting-ia | piloter | department | riche, réel (7 sec, 243 l) | **ANCRE PILIER Piloter** | `/piloter#reporting` | Ancre reporting IA. |
| `donnees-centralisees.mdx` | donnees-centralisees | piloter | department | riche, réel (9 sec, 306 l) | **ANCRE PILIER Piloter** | `/piloter#donnees` | Ancre « source de vérité / données centralisées ». Socle data du pilier. |
| `previsionnel-ia.mdx` | previsionnel-ia | piloter | department | riche, réel (9 sec, 289 l) | **ANCRE PILIER Piloter** | `/piloter#previsionnel` | Ancre prévisionnel (CA, tréso, pipeline). |
| `finance.mdx` | finance | piloter | department | riche, réel (6 sec, 200 l) | **ANCRE PILIER Piloter** | `/piloter#finance` | Finance & compta = pilotage. Ancre finance (ou archiver si le pilier reste léger : décision Simon §7 Q3). |
| `agent-analytique.mdx` | agent-analytique | piloter | department | riche, réel (10 sec, 329 l) | **ARCHIVER / 404** | — | « Agent analytique » = agent IA = différé par le brief. 404. |
| `productivite-ia.mdx` | productivite-ia | operer | department | riche, réel (6 sec, 200 l) | **ANCRE PILIER Opérer** | `/operer#automatisation` | Automatisation tâches / Office connecté = cœur Opérer. Recoupe l'offre `productivite-operationnelle-ia` (cf §3/§4). |
| `support-client-ia.mdx` | support-client-ia | operer | department | riche, réel (9 sec, 290 l) | **ANCRE PILIER Opérer** | `/operer#service-client` | Ancre service client IA 24/7. |
| `administration-rh-ia.mdx` | administration-rh-ia | operer | department | riche, réel (8 sec, 240 l) | **ANCRE PILIER Opérer** | `/operer#admin-rh` | Ancre admin & RH. |
| `legal-ia.mdx` | legal-ia | operer | department | riche, réel (8 sec, 267 l) | **ANCRE PILIER Opérer** | `/operer#legal` | Ancre légal IA. |
| `agents-metiers.mdx` | agents-metiers | operer | department | riche, réel (8 sec, 268 l) | **ARCHIVER / 404** | — | « Agents métiers » = agents IA = différé par le brief. 404. |
| `fintech.mdx` | fintech | operer | **industry** | riche, réel (5 sec, 192 l) | **GARDER TEL QUEL (hors périmètre)** | — | `kind: industry` → branche secteurs/industries, pas la grille 3 piliers. Hors refonte. Reste tel quel. |

(*) `crm-relances-ia` : frontmatter `need: acquerir`, mais classé Opérer dans le mega-menu. Incohérence réelle, voir §7.

---

## 3. Les 3 pages service Acquérir (Phase B)

Architecture : chaque service = `/services/<slug>` (SEO/GEO riche, maillée, indexable) + `/lp/<slug>` (landing conversion, peu de liens sortants, noindex possible).

### 3.1 Site web intelligent → `/services/site-web-intelligent` + `/lp/site-web-intelligent`

- **Sources à fusionner / recycler** :
  - `src/pages/offres/site-web-ia.astro` (RECYCLER · page conversion + tunnel) → base de `/services` + alimente `/lp`.
  - `src/pages/offres/site-web-ia-landing.astro` (RECYCLER · format landing déjà construit, hero-landing V-F3) → gabarit direct de `/lp/site-web-intelligent`.
  - `src/content/solutions/site-web-ia-pme.mdx` (FUSIONNER · corps SEO « PME B2B » : personas, pipeline éditorial SEO/GEO, scoring leads, intégration CRM).
- **Champs / sections récupérables** : hero-landing + bloc problème + métriques (de `site-web-ia-landing.astro`) ; steps tunnel audit→génération→conversion (de `site-web-ia.astro`) ; description SEO + useCases + pains + stack (de `site-web-ia-pme.mdx`).
- **À produire (manque)** : choix du slug canonique (`site-web-intelligent`), arbitrage entre les 3 sources pour 1 page SEO + 1 landing, maillage interne vers le pilier `/acquerir`, balisage Service JSON-LD (le builder `buildService` existe dans `solutions/[...slug].astro`).

### 3.2 Content marketing intelligent → `/services/content-marketing-intelligent`

- **Sources à fusionner / recycler** :
  - `src/content/solutions/content-marketing-ia.mdx` (**RECYCLER, canonique**) · 8 sections complètes, contenu excellent et réel.
  - `src/content/solutions/contenu-seo-geo-ia.mdx` (FUSIONNER) · ajoute la dimension SEO/GEO « trouvé par Google ET les IA ».
- **Champs / sections récupérables** : hero-sector, pain-points (3), feature-zigzag « Une idée, cinq vies », workflow-table (4 étapes : ligne édito / newsletter / réseaux / webinaires), feature-split-media, department-stack, pull-quote, department-cta. Verbatim exploitable. De `contenu-seo-geo-ia` : le volet SEO/GEO (8 articles/sem, citations IA, fiches GEO-ready).
- **À produire (manque)** : `/lp/content-marketing-intelligent` n'est pas listé comme prioritaire dans le brief (les 3 services ont une `/services` ; la landing quizz lead magnet arrive en Phase C). Fusion des 2 corps SEO + dédup des CTA. SEO/GEO comme page séparée = différé (cf brief), donc tout reste sur 1 page.

### 3.3 Tunnel de conversion + landing → `/services/tunnel-de-conversion` + `/lp/tunnel-de-conversion`

- **Sources à fusionner / recycler** :
  - `src/content/solutions/tunnel-de-vente.mdx` (**RECYCLER, canonique**) · 8 sections, landing→qualification→nurture→closing, chaque étape scorée. Réel.
  - `src/content/solutions/acquisition-ia.mdx` (FUSIONNER partiel) · vue système d'acquisition pour le chapô / maillage (mais éviter doublon avec le pilier growth-system-ia, cf §7 Q2).
- **Champs / sections récupérables** : tout le funnel scoré de `tunnel-de-vente.mdx` (pains, workflow par étape, ROI metrics, CTA).
- **À produire (manque)** : `/lp/tunnel-de-conversion` (landing conversion). **Quizz lead magnet = Phase C** (pas maintenant, cf brief). Donc Phase B = page `/services` + landing simple, le quizz vient après.

---

## 4. Piliers Piloter / Opérer (silos non développés, pages à ancres)

### Pilier Piloter (Business Intelligence) · `/piloter`
1 page pilier avec sections à ancres. Silo non développé (focus Google sur Acquérir d'abord).

| Solution / offre source | Ancre proposée | Statut |
|---|---|---|
| `offres/growth-intelligence.mdx` | `#vue-densemble` (chapô pilier) | ANCRE |
| `solutions/tableaux-de-bord-analytics.mdx` | `#tableaux-de-bord` | ANCRE |
| `solutions/reporting-ia.mdx` | `#reporting` | ANCRE |
| `solutions/donnees-centralisees.mdx` | `#donnees` | ANCRE |
| `solutions/previsionnel-ia.mdx` | `#previsionnel` | ANCRE |
| `solutions/finance.mdx` | `#finance` | ANCRE (ou archive si pilier léger, §7 Q3) |
| `solutions/agent-analytique.mdx` | — | **ARCHIVÉ / 404** (agent IA différé) |
| `offres/revops.astro` | `#revops` (option) | GARDÉ tel quel, ancre optionnelle |

### Pilier Opérer (Opérations IA) · `/operer`
1 page pilier à ancres + quelques pages enfant métier possibles (selon brief).

| Solution / offre source | Ancre proposée | Statut |
|---|---|---|
| `offres/productivite-operationnelle-ia.mdx` | `#automatisation` (chapô pilier) | ANCRE |
| `solutions/productivite-ia.mdx` | `#automatisation` (fusion avec ci-dessus) | ANCRE / FUSION |
| `solutions/support-client-ia.mdx` | `#service-client` | ANCRE (candidat page enfant) |
| `solutions/administration-rh-ia.mdx` | `#admin-rh` | ANCRE |
| `solutions/legal-ia.mdx` | `#legal` | ANCRE (candidat page enfant) |
| `solutions/crm-relances-ia.mdx` | `#crm-relances` | ANCRE (cf incohérence need §7 Q1) |
| `solutions/agents-metiers.mdx` | — | **ARCHIVÉ / 404** (agents IA différé) |

> `productivite-operationnelle-ia.mdx` (offre) et `productivite-ia.mdx` (solution) couvrent le même sujet (automatisation/Office augmenté). À fusionner en une seule ancre Opérer.

---

## 5. Liste des URLs → 404 (suppression nette, PAS de 301)

> Stratégie brief : URLs anciennes supprimées = 404 net (Google ré-évalue, signal « refonte assumée »). Les pages dont le contenu est recyclé/ancré redirigent leur valeur via le maillage interne, pas via 301.

**Hub supprimé**
- `/solutions` (le hub disparaît : le mega-menu « Solutions » fusionnait déjà Solutions+Offres, remplacé par les 3 piliers).

**Solutions archivées (agents IA / publicité = différés)**
- `/solutions/agent-marketing-commercial`
- `/solutions/agent-analytique`
- `/solutions/agents-metiers`
- `/solutions/publicite-en-ligne`

**Solutions recyclées/ancrées (l'ancienne URL `/solutions/*` disparaît ; contenu migré vers `/services/*` ou `/piloter`/`/operer`)**
- `/solutions/site-web-ia-pme` → contenu vers `/services/site-web-intelligent`
- `/solutions/content-marketing-ia` → vers `/services/content-marketing-intelligent`
- `/solutions/contenu-seo-geo-ia` → vers `/services/content-marketing-intelligent`
- `/solutions/tunnel-de-vente` → vers `/services/tunnel-de-conversion`
- `/solutions/acquisition-ia` → vers `/acquerir`
- `/solutions/tableaux-de-bord-analytics` → vers `/piloter#tableaux-de-bord`
- `/solutions/reporting-ia` → vers `/piloter#reporting`
- `/solutions/donnees-centralisees` → vers `/piloter#donnees`
- `/solutions/previsionnel-ia` → vers `/piloter#previsionnel`
- `/solutions/finance` → vers `/piloter#finance`
- `/solutions/crm-relances-ia` → vers `/operer#crm-relances`
- `/solutions/productivite-ia` → vers `/operer#automatisation`
- `/solutions/support-client-ia` → vers `/operer#service-client`
- `/solutions/administration-rh-ia` → vers `/operer#admin-rh`
- `/solutions/legal-ia` → vers `/operer#legal`

**Offres archivées (hors grille 3 piliers)**
- `/offres/activation-ia`
- `/offres/infrastructure-ia`
- `/offres/application-ia-pme`
- `/offres/conseil`
- `/offres/claude-cowork`
- `/offres/composable-pilot` (POC démo)

**Stubs placeholder déjà noindex (catch-all) à retirer aussi**
- `/offres/audit-process-intelligence`, `/offres/mcp-connectors`, `/offres/agents-metiers` (3 stubs OffresDetailTemplate, voir §6).

**Total URLs vers 404 : ~24** (1 hub + 4 solutions archivées + 15 solutions migrées + 6 offres archivées, hors stubs noindex et hors `/secteurs/*` et `fintech` conservés).

> NE PAS passer en 404 : `/offres/growth-system-ia` (→ devient pilier Acquérir), `/offres/site-web-ia` + `/offres/revops` + `/offres/audit-maturite-ia` (pages `.astro` gardées/recyclées), tout `/secteurs/*`, `/solutions/fintech` est industry (suivra le sort de la branche secteurs).
>
> ⚠️ Le redirect existant `astro.config` `/offres/site-web-ia-tunnel*` → `/offres/site-web-ia/tunnel/N` doit être réévalué si `/offres/site-web-ia` devient `/services/site-web-intelligent`.

---

## 6. État réel des 2 templates (preuve par grep)

### `OffresDetailTemplate.astro` → À RETIRER

**Preuve d'usage (grep imports `src/`, hors `ds-registry.json`/`ds-section-manifest.json` qui ne sont que des index DS)** :
- `src/pages/[...slug].astro:28` importe le template.
- Usage unique = **placeholder noindex** : `src/pages/[...slug].astro:164` rend `<OffresDetailTemplate>` pour 3 routes stub seulement, listées dans `getStaticPaths` : `offres/audit-process-intelligence`, `offres/mcp-connectors`, `offres/agents-metiers`. Toutes en `X-Robots-Tag: noindex, nofollow` (l. 145), contenu « Offre en préparation ».
- **Les vraies offres `/offres/<slug>` n'utilisent PAS ce template** : `src/pages/offres/[...slug].astro:6` documente explicitement « voie template legacy ÉTEINTE en R6, le fallback OffresDetailTemplate est supprimé » ; un MDX sans `sections:` casse le build. Les 9 offres sont composables → `SectionsRenderer`.
- `src/lib/library-manifest.ts:109` le liste comme consumer du hero `hero-offer-detail` (registre, pas un rendu live).

→ **Verdict** : orphelin fonctionnel (sert 3 stubs noindex morts qui partent aussi en 404). À RETIRER avec ses 3 stubs. Le hero `hero-offer-detail` (sections.ts:429) devient candidat à suppression si plus aucun consumer.

### `SolutionsDetailTemplate.astro` → À GARDER

**Preuve d'usage** :
- `src/pages/secteurs/[...slug].astro:5` l'importe, `:352` le rend `<SolutionsDetailTemplate>`. **Live via `/secteurs/*`** (cas clients par secteur).
- `src/pages/solutions/[...slug].astro:5` documente « fallback SolutionsDetailTemplate supprimé ICI (voie morte) ; le template reste LIVE via secteurs ».
- Ses styles sont recopiés verbatim dans des sections composables (`CaseSplit.astro`, `RoiBand.astro`, `WorkflowTable.astro`, `PainPoints.astro`, `CtaFinal.astro`).

→ **Verdict** : LIVE, hors périmètre de la refonte 3 piliers (branche `/secteurs`). À GARDER tel quel.

---

## 7. Risques / questions ouvertes pour Simon

1. **Incohérence `need` sur `crm-relances-ia`** : frontmatter `need: acquerir` mais rangé colonne **Opérer** dans le mega-menu. Je propose Opérer (`#crm-relances`). Confirmer le pilier cible.
2. **Doublon « système d'acquisition »** : `acquisition-ia.mdx` (solution) ET `growth-system-ia.mdx` (offre/pilier) décrivent tous deux « le système d'acquisition global ». Un seul doit être canonique pour le pilier `/acquerir`. Je propose : `growth-system-ia` = pilier canonique, `acquisition-ia` = source de corps fusionnée (puis 404 de l'URL `/solutions/acquisition-ia`). Valider.
3. **`finance.mdx`** : ancre Piloter ou archive ? Le pilier Piloter étant non développé (juste ancres), inclure finance ajoute du périmètre. Garder l'ancre légère ou différer.
4. **Slugs canoniques des 3 services** : `site-web-intelligent`, `content-marketing-intelligent`, `tunnel-de-conversion` (proposés). Le brief dit « Site web intelligent / Content marketing intelligent / Tunnel de conversion + landing ». Confirmer les slugs exacts FR.
5. **URL du pilier Acquérir** : garder `/offres/growth-system-ia` (préserve l'indexation existante) ou migrer vers `/acquerir` (cohérence 3 piliers) ? Si migration, c'est la SEULE offre où un 301 pourrait se justifier (page indexée), à arbitrer contre la règle « 404 net ».
6. **`activation-ia` / `infrastructure-ia` / `conseil` / `claude-cowork` / `application-ia-pme`** archivées : ces offres ont du contenu réel et de la valeur commerciale (paliers, ETI, audit). 404 sec = perte assumée. Confirmer qu'aucune ne doit survivre en page enfant d'Opérer ou en page autonome avant suppression.
7. **`/lp/*` (landings)** : le brief liste 2 surfaces par service mais ne détaille la landing que pour le tunnel (quizz lead magnet en Phase C). Préciser si `/lp/site-web-intelligent` et `/lp/content-marketing-intelligent` sont à fonder en Phase B ou différés.
8. **Mega-menu + sitemap.ts** : `src/data/mega-menu.ts` (3 colonnes Acquérir/Piloter/Opérer pointant vers `/solutions/*` et `/offres/*`) et `src/data/sitemap.ts` (MM_SOLUTIONS/MM_OFFRES) sont à réécrire intégralement vers les nouvelles routes `/services/*`, `/acquerir`, `/piloter`, `/operer`. Tous les liens actuels vers `/solutions/*` deviendront des liens morts (→ 404) tant que la nav n'est pas migrée. À séquencer avec la création des pages.

---

_Fin du mapping. Aucun fichier `src/` modifié. Seul fichier écrit : `docs/state/06-mapping-migration-3-piliers.md`._
