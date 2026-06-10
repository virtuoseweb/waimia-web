# Audit collections waimia-web : cartographie, redondances, candidats fusion

Audit lecture seule, 2026-06-10. Repo : `/Users/simonberos/waimia-web` (Astro 6 SSG, prod waimia.com).
Base anti-dédoublonnage : docs/13, docs/23, docs/26. Chaque claim vérifié contre le code réel (deltas en §2).

---

## 1. Cartographie réelle (source : `src/content.config.ts` + `src/content/**` + `src/pages/**`)

**32 collections exportées** (`src/content.config.ts:1365-1404`). État réel :

### 1.1 Collections « cœur de l'histoire » (concernées par la refonte)

| Collection | Entrées | Schéma (résumé) | Routes consommatrices | Composable `sections:[]` |
|---|---|---|---|---|
| `offres` | 9 MDX | base + taxonomy + tier/pricing/method_steps/deliverables/proof + `sections` opt (`content.config.ts:208-283`) | `/offres/[...slug]` + `/en/offres/[...slug]` (switch SectionsRenderer si `sections`, cf `src/pages/offres/[...slug].astro:45`) ; `/ressources/blog/[...slug]` (related) | **9/9 = 100 %** |
| `solutions` | 8 MDX | base + taxonomy + `kind: department\|industry` + pains/workflows/roi_metrics/stack + `sections` opt (`content.config.ts:286-353`) | `/solutions/[...slug]` + `/en/...` | **8/8 = 100 %** |
| `secteurs` | 3 MDX (finance-compta, industrie, services-b2b) | base + icp/pains/kpis + `caseRef` string (`content.config.ts:459-480`) | `/secteurs/[...slug]` + `/secteurs/index` | 0/3 (pas de champ sections) |
| `cases` | 4 MDX (plateau, halcyon, northbound, caserne) | base + taxonomy + client/sector/metrics + blocs éditoriaux W2 (bottlenecks/phases/shifts) + `sections` opt + `card` listing (`content.config.ts:106-205`) | `/cas/[...slug]`, `/cas/index` (via `card`), `/en/cas/*`, agrégateurs ressources (tag/categorie/silo), TaxonomyMenu | **1/4 = 25 %** (plateau seul) |
| `tunnels` | 20 MDX (5 offres × 4 steps : activation-ia, application-ia-pme, growth-system, revops, site-web-ia) | base + `offre_slug` + step/next/prev/cta (`content.config.ts:706-722`) | `/offres/[offre]/tunnel/[step]` | n/a |
| `blog` | 15 MDX | base + taxonomy + `type` discriminator opt (formation/essai/notes/avis/post/field-note/veille-ia, `content.config.ts:422`) + `editorialType` legacy | `/ressources/blog/*` FR+EN, rss, tag, categorie, silo, equipe, hub ressources | n/a |
| `fieldNotes` (legacy) | 3 MDX (`src/content/field-notes/`) | base + date + tag enum (`content.config.ts:447-456`) | `/ressources/field-notes/index` + `[slug]` | n/a |
| `veilleIA` (legacy) | 1 MDX | base + taxonomy + date + impact (`content.config.ts:576-588`) | `/ressources/veille-ia/*` + rss + tag/categorie/silo + equipe + TaxonomyMenu + rss.xml global | n/a |
| `commerce` | 15 MDX | discriminatedUnion `commerce_type: product\|subscription` + sku/price/stripe (`content.config.ts:1050-1085`) | `/commerce/index` + `/commerce/[type]/[slug]` | n/a |
| `technologies` | 2 MDX (claude-models, virtuoseos) | base + taxonomy + family/capabilities/models + `sections` opt | `/technologies/[...slug]` | **2/2 = 100 %** |

### 1.2 Collections support (peu concernées mais croisées)

| Collection | Entrées | Consommateurs |
|---|---|---|
| `courses` | 3 MDX (`src/content/ecole/courses/`) ; union formation/parcours/atelier/certification (`content.config.ts:782-880`) | `/ecole/index`, `/ecole/[type]/[slug]`, `/ecole/cours/[slug]` |
| `livresBlancs` | 1 MDX (ia-pme-b2b-2026) ; schéma inclut `isPremium`/`premium_price_eur`/`premium_stripe_link` (`content.config.ts:501-503`) | `/ressources/livres-blancs/*` + agrégateurs |
| `cookbooks` | 1 MDX (premier-agent-ia) | `/ressources/cookbooks/*` + agrégateurs |
| `outils` | 1 MDX | `/ressources/outils/index` + `[...slug]` |
| `pages` | 1 MDX (a-propos, `template: essay`) ; enum template utility/trust-legal/welcome/essay | `/bienvenue/[...slug].astro` filtre `template === 'welcome'` : **0 entrée matche, 0 page générée** ; les 7 vraies pages bienvenue sont des `.astro` statiques (`src/pages/bienvenue/{audit,contact,...}.astro`) |
| `authors` | 1 | `/equipe/*`, bylines |
| `glossary` 30 · `integrations` 20 · `comparisons` 10 · `proofPoints` 15 · `painPoints` 12 · `knowledgeBase` 10 · `personas` 3 · `prompts` 5 · `testimonials` 5 · `guarantees` 5 · `brandVoice` 1 | voir 1.3 pour les non consommées | glossaire/integrations/comparer/personas/prompts/testimonials ont des routes ; les autres non |

### 1.3 Collections MORTES (définies dans le config, zéro consommateur `getCollection`, vérifié par grep src/)

| Collection | Entrées | Constat |
|---|---|---|
| `produits` | 0 (dossier `src/content/produits` **inexistant**) | Remplacée par `commerce` (commentaire `content.config.ts:1049` « fusion produits + abonnements ») mais jamais retirée du config |
| `abonnements` | 0 (dossier inexistant) | idem |
| `landingPages` | 0 (dossier `src/content/lp` inexistant) | jamais peuplée, aucune route `/lp/*` |
| `welcomePages` | 0 (dossier `src/content/welcome-pages` inexistant) | concurrencée par `pages.template='welcome'` ET par les `.astro` statiques : 3 mécanismes pour le même objet |
| `newsletter` | 0 (dossier vide) | aucune route |
| `brandVoice`, `painPoints`, `knowledgeBase`, `proofPoints`, `guarantees` | 1/12/10/15/5 | **peuplées mais aucune page ne les consomme** (43 MDX dormants) |

### 1.4 Pages hardcodées restantes (hors collections)

- `/offres/` : `index.astro` (liste 11 offres en JSON-LD hardcodé incluant audit-maturite-ia, site-web-ia, revops qui n'ont PAS de MDX), `revops.astro` (187 l), `site-web-ia.astro` (202 l), `audit-maturite-ia.astro` (232 l), `site-web-ia-landing.astro` (470 l).
- `/solutions/index.astro` : arrays hardcodés `horizontalSolutions` (l.15) + `sectorSatellites` (l.38).
- Catch-all `src/pages/[...slug].astro` : stubs pour ~16 slugs offres fantômes (claude-skills, mcp-connectors, multi-agents...), ~11 solutions fantômes (rh, juridique, retail, secteur-public...), ~9 technologies fantômes. Ces stubs sont indexables et figent une IA « ancienne nav » dans le sitemap.

---

## 2. Deltas docs vs code (les 3 docs sont PÉRIMÉS à des degrés divers)

### docs/13-CONTENT-ARCHITECTURE.md (2026-05-15) : très périmé

| Claim doc 13 | Réalité code | À corriger |
|---|---|---|
| Diagnostic l.41 : `offres` 0 entrée, « 13 pages /offres/* hardcoded » | 9 MDX 100 % composables + **4** hardcoded restantes seulement | Mettre à jour le diagnostic entier (l.33-50) |
| l.46 : `solutions` 0 entrée, « 9 pages hardcoded » | 8 MDX, plus aucune page solution hardcodée (hors index) | idem |
| l.47 : `technologies` 0 | 2 MDX | idem |
| l.37 : `cases` 1 | 4 MDX | idem |
| l.36 : `blog` 4 | 15 MDX avec discriminator `type` implémenté (`content.config.ts:422`) | idem |
| l.44 : collection `ressources` « Existe-t-elle vraiment ? » | n'existe pas dans le config, n'a jamais existé | supprimer la ligne |
| §École (l.649-728) : schémas `formations`/`parcours`/`ateliers` | implémentés PUIS remplacés par `courses` discriminatedUnion (`content.config.ts:781`) | remplacer la section |
| Roadmap l.1205-1219 : phases A-D toutes « ❌ » | A (migration MDX) ~faite, C (tunnels) faite (20 entrées + route), D-bis partiellement (statiques), commerce remplace D-quater/quinquies | resynchroniser ou archiver le doc |
| §SSG/ISR (l.1021-1059) : recommande ISR/hybrid | site est `output: 'static'` pur (CLAUDE.md) | obsolète |

### docs/23-CROSS-COLLECTION-AUDIT.md (2026-05-16) : fixes P1/P2 appliqués, données périmées

| Claim doc 23 | Réalité code |
|---|---|
| §3.2 Fix 1 typo `/ressources/temoignages` | **corrigé** : `src/data/sitemap.ts:242` pointe `/ressources/testimonials` |
| §3.2 Fix 2 `/ressources/newsletter` 404 | **corrigé** : href retiré du sitemap (grep négatif) |
| §3.2 Fix 3 `/ressources/outils` 404 | **corrigé** : `src/pages/ressources/outils/index.astro` existe |
| §3.3 orphelin glossary `workflow-ia` | **corrigé** : plus aucune référence (grep négatif sur `src/content/glossary/`) |
| §1.6 : 3 offre_slugs tunnels, seul `site-web-ia` orphelin | périmé : **20 tunnels, 5 offre_slugs**, et `revops` est un 2e orphelin (`src/content/tunnels/revops-1.mdx` : `offre_slug: "revops"` sans `content/offres/revops.mdx`, page statique seulement) |
| §1.2 : 8 offres MDX | 9 (ajout `conseil.mdx`) ; cross-refs `relatedTechnologies`/`caseStudies` toujours non peuplés (grep : champs absents → default `[]`) : P3 maillage interne toujours ouvert |
| §1.7 : `caseRef: caserne` → page statique | périmé : `content/cases/caserne.mdx` existe désormais |

### docs/26-COLLECTIONS-CLEANUP-AUDIT.md (2026-05-16) : exécuté à MOITIÉ, c'est la dette principale

| Item plan doc 26 | Réalité code |
|---|---|
| Supprimer `formations`/`parcours`/`ateliers` → `courses` | **FAIT** (plus dans le config ; reliquat fichiers dupliqués `src/content/ecole/_archived_formations/` = mêmes 3 MDX que `courses/`, hors loader, à purger) |
| Migrer `fieldNotes` → `blog` type field-note | **PARTIEL** : 1 seul migré et DUPLIQUÉ (`blog/migrated-fieldnote-composable-adoption.mdx` coexiste avec `field-notes/2026-05-15-composable-adoption.mdx`) ; 2 field-notes non migrées |
| Migrer `veilleIA` → `blog` type veille-ia | **PARTIEL/DUPLIQUÉ** : `blog/migrated-veille-gpt-4o-vision-update.mdx` coexiste avec `veille-ia/gpt-4o-vision-update.mdx` |
| Refactor des ~10 consumers | **PAS FAIT** : `getCollection('fieldNotes')` et `getCollection('veilleIA')` toujours présents (TaxonomyMenu.astro:9, rss.xml.ts:10, equipe/index.astro:51, silo, categorie, tag, routes field-notes/veille-ia, rss veille) |
| Critère §5 « 0 référence » | **NON ATTEINT** |

---

## 3. Matrice de redondance (le même contenu raconté 2-3 fois)

| # | Doublon | Preuves | Gravité |
|---|---|---|---|
| R1 | **field-note / veille en double dans 2 collections** : même contenu servi à `/ressources/field-notes/...` ET `/ressources/blog/...` (idem veille-ia) | `src/content/field-notes/2026-05-15-composable-adoption.mdx` vs `src/content/blog/migrated-fieldnote-composable-adoption.mdx` ; `src/content/veille-ia/gpt-4o-vision-update.mdx` vs `src/content/blog/migrated-veille-gpt-4o-vision-update.mdx` | Haute (duplicate content SEO en prod) |
| R2 | **Solutions (par problème) ↔ Offres (exécution) racontent la même promesse avec les mêmes chiffres** : « plus de leads qualifiés sans recruter » + métriques ×2,4 et −62 % présents dans les deux | `src/content/solutions/acquisition-ia.mdx` (roi_metrics ×2,4 leads, −62 % temps qualification) vs `src/content/offres/growth-system-ia.mdx` (FAQ : « ×2,4 leads qualifiés mensuels... −62 % de temps de qualification ») | Haute (maintenance double, risque divergence chiffres) |
| R3 | **Productivité dite 2 fois** : `solutions/productivite-ia.mdx` vs `offres/productivite-operationnelle-ia.mdx` (même thème, 2 URLs concurrentes pour la même requête) | + sitemap.ts:59 vs :105 (les 2 dans la nav) | Moyenne |
| R4 | **Site web IA dit 3 fois** : `solutions/site-web-ia-pme.mdx` + page statique `src/pages/offres/site-web-ia.astro` + `src/pages/offres/site-web-ia-landing.astro` + 4 tunnels `site-web-ia-tunnel-*` | offre absente de la collection → tunnel orphelin (doc 23 §P4 toujours vrai) | Haute |
| R5 | **2 taxonomies « secteur » concurrentes** : collection `secteurs` (3 pages `/secteurs/*`) ET `solutions.kind === 'industry'` (`solutions/fintech.mdx`) + `solutions/finance.mdx` (kind department mais nommé comme un secteur) + stubs catch-all `solutions/industrie`, `solutions/retail`... | `content.config.ts:291` (kind) vs `content.config.ts:459` (secteurs) ; nav sitemap.ts:67-70 pointe `/secteurs/*` | Haute (l'angle « par secteur » vit à 2 endroits) |
| R6 | **Le cas client n'est pas un objet unique : la `card` du hub raconte une AUTRE histoire que le cas** | `src/content/cases/caserne.mdx` : body = « 4 goulots en 48 h, audit 2 jours » MAIS `card` = « finance fluidifiée, 1 200 h/an, 8 sem » ; `halcyon.mdx` : sector_fr « Conseil en stratégie » vs card « Santé-tech » ; `northbound.mdx` : « Gestion d'actifs » vs card « Fintech EU » | **Critique** (incohérence éditoriale visible : hub /cas vs page détail) |
| R7 | **Douleurs dites 2 fois** : `painPoints` (12 MDX, ex `leads-non-qualifies.mdx`) vs `solutions.pains[]` inline (ex `solutions/acquisition-ia.mdx` pain « Leads non qualifiés », copy ~identique 40 % temps commercial) | painPoints jamais rendue (0 consumer) | Moyenne |
| R8 | **Preuves/metrics dites N fois** : `proofPoints` (15 MDX, jamais consommés) vs métriques inline dans cases.metrics, solutions.roi_metrics, offres FAQ | ×2,4 / −62 % apparaissent dans ≥ 3 fichiers | Moyenne |
| R9 | **Commerce ↔ ressources gratuites** : `commerce/livre-blanc-ai-act-premium.mdx` (79 €) vs collection `livresBlancs` qui porte DÉJÀ `isPremium`/`premium_price_eur`/`premium_stripe_link` (`content.config.ts:501-503`) ; `commerce/cookbook-automatiser-relances-crm.mdx` vs collection `cookbooks` | 2 schémas pour vendre le même objet | Moyenne |
| R10 | **3 mécanismes welcome** : collection `welcomePages` (morte) + `pages.template='welcome'` (0 entrée) + 7 `.astro` statiques `/bienvenue/*` | `src/pages/bienvenue/` | Basse (mais 2 schémas morts à purger) |
| R11 | `ecole/_archived_formations/` = copie exacte des 3 MDX de `ecole/courses/` | hors loader, dette fichier | Basse |

---

## 4. Candidats fusion (avec options, gains, risques, redirections)

### F1 · Achever doc 26 : `fieldNotes` + `veilleIA` → `blog` (préalable à tout)
- Migrer les 2 field-notes restantes, supprimer les 2 doublons « migrated- » OU les sources, refactorer les ~10 consumers (`TaxonomyMenu`, rss, equipe, silo/categorie/tag, routes dédiées), retirer 2 collections du config.
- Gain : fin du duplicate content R1, agrégateurs simplifiés (1 getCollection au lieu de 3).
- Risque : URLs `/ressources/field-notes/[slug]` et `/ressources/veille-ia/[slug]` indexées → **301 vers `/ressources/blog/[slug]`** (vercel.json redirects) ; conserver `/ressources/veille-ia/rss.xml` (feed alimenté par blog filtré type veille-ia).

### F2 · Purge des collections mortes (zéro risque SEO, zéro route)
- Retirer du config : `produits`, `abonnements` (déjà fusionnés dans `commerce`), `landingPages`, `welcomePages`, `newsletter` (réintroduire le jour où le besoin existe). Supprimer `ecole/_archived_formations/`.
- Décision à prendre sur les 5 peuplées non consommées : `painPoints`/`proofPoints` ont un rôle dans la cible (cf F5), `knowledgeBase`/`brandVoice`/`guarantees` à brancher ou geler explicitement.

### F3 · Solutions ↔ Offres : 2 couches nettes au lieu de 2 catalogues qui se recouvrent
- **Option A (recommandée, alignée mission)** : `solutions` devient le hub par besoin prospect avec `need: 'acquerir'|'piloter'|'operer'` (remplace `kind`) ; chaque solution liste ses offres d'exécution via `relatedOffres` ENFIN peuplé (aujourd'hui vide partout, doc 23 §P3). `offres` reste la couche exécution (pricing, method_steps, tunnels). Dédupliquer la copy : la promesse + douleurs vivent dans solutions, le « comment + combien » dans offres ; les chiffres sortent vers `proofPoints` (source unique).
- **Option B (fusion dure)** : 1 collection `solutions` avec discriminatedUnion `layer: 'besoin'|'offre'`. Gain : 1 schéma ; risque : schémas très différents (pricing vs pains), migration des 17 MDX + 2 routes, peu de gain net. Non recommandée.
- Cas particuliers : `solutions/productivite-ia` vs `offres/productivite-operationnelle-ia` → garder les 2 niveaux mais différencier la copy + canonical croisé ou 301 de l'un des deux ; `solutions/site-web-ia-pme` absorbe la copy des pages statiques site-web-ia (cf F6).

### F4 · Secteurs : une seule porte d'entrée « par secteur »
- **Option A (recommandée)** : `secteurs` reste LA taxonomie secteur ; migrer `solutions/fintech.mdx` (kind industry) vers `secteurs/` ; renommer/clarifier `solutions/finance.mdx` (c'est une solution « fonction finance », pas un secteur) ; retirer les stubs catch-all `solutions/industrie|retail|secteur-public` (`src/pages/[...slug].astro`). Redirection : `/solutions/fintech` → `/secteurs/fintech` (301).
- **Option B** : fusionner `secteurs` dans `solutions` kind industry et 301 `/secteurs/*` → `/solutions/secteur/*`. Coûte 3 redirections de pages bien maillées (mega-menu sitemap.ts:67-69) pour un gain faible. Non recommandée.

### F5 · Cas clients = objet unique explorable (corrige R6, R7, R8)
- Garder `cases` comme collection unique mais : (a) supprimer la divergence card/body (la card devient une PROJECTION du cas : mêmes secteur/chiffres, fichier:ligne des 3 incohérences en R6 à corriger d'abord) ; (b) ajouter facettes typées `pains: reference painPoints[]`, `solutions: []`, `offres: []`, `results: reference proofPoints[]` ; (c) le hub `/cas` propose les 4 axes d'exploration secteur/problème/solution/résultat à partir de ces facettes ; (d) `secteurs.caseRef` (string) migre vers ce maillage inversé.
- Gain : painPoints et proofPoints (27 MDX dormants) deviennent les referentiels uniques douleur/résultat, les chiffres ne sont plus dupliqués dans 3 collections.
- Risque : aucun sur les URLs (`/cas/[slug]` inchangé) ; effort = enrichissement frontmatter + hub.

### F6 · Finir la migration offres hardcodées (corrige R4 + orphelins tunnels)
- `revops.astro`, `site-web-ia.astro`, `audit-maturite-ia.astro` → MDX `content/offres/*` (le route `[...slug].astro` les prendra ; supprimer les `.astro`, URLs identiques donc 0 redirection). Résout les 2 tunnels orphelins (revops, site-web-ia). `site-web-ia-landing.astro` → soit collection `landingPages` réactivée, soit `.astro` assumé hors catalogue.
- Nettoyer `offres/index.astro` (JSON-LD hardcodé) pour générer la liste depuis la collection.

### F7 · Monétisation : `commerce` absorbe le « premium »
- Retirer `isPremium`/`premium_*` du schéma `livresBlancs` (`content.config.ts:501-503`) : un livre blanc gratuit vit dans `livresBlancs`, sa version payante est UNE entrée `commerce` liée par slug. Idem cookbooks. 0 redirection (routes distinctes déjà).

---

## 5. Mapping proposé vers le hub Solutions par besoin (Acquérir / Piloter / Opérer)

Le champ `category` existant (`content.config.ts:38-47`, peuplé sur 9/9 offres) donne le mapping quasi gratuit :

| Hub besoin | Solutions actuelles | Offres (couche exécution) | Cas (facette) | Tunnels |
|---|---|---|---|---|
| **ACQUÉRIR** (category acquisition + crm + contenu-seo-geo) | acquisition-ia, crm-relances-ia, contenu-seo-geo-ia, site-web-ia-pme | growth-system-ia, activation-ia, composable-pilot, site-web-ia (à migrer MDX) | plateau (pipeline +2,4 M€) | growth-system ×4, site-web-ia ×4, activation-ia ×4 |
| **PILOTER** (category data + pilotage) | finance (reporting/réconciliation, à repositionner « pilotage ») | growth-intelligence, conseil, audit-maturite-ia (à migrer MDX), revops (à migrer MDX) | northbound (gestion d'actifs/reporting), caserne (goulots identifiés) | revops ×4 |
| **OPÉRER** (category productivite + support + gouvernance) | productivite-ia, support-client-ia | productivite-operationnelle-ia, claude-cowork, application-ia-pme, infrastructure-ia | halcyon (conseil/ops), caserne (flux inter-sites) | application-ia-pme ×4 |

- `secteurs` (finance-compta, industrie, services-b2b, + fintech migré) = axe transverse de filtrage, pas un 4e hub.
- painPoints : leads-non-qualifies/landing-pages-low-convert/seo-stagnant → Acquérir ; decisions-sans-data/manque-visibilite-pipeline/reporting-manuel-excel/objectifs-non-mesures → Piloter ; taches-repetitives/onboarding-lent/agent-actions-non-auditables/donnees-clients-rgpd-flou/prompt-leak → Opérer.
- Redirections du hub : `/solutions` reste le hub (re-architecturé en 3 portes) ; pages solutions existantes conservent leurs URLs (301 uniquement pour fintech → secteurs si option F4-A). Stubs catch-all solutions fantômes à retirer du `getStaticPaths` (désindexation douce, ce sont des stubs sans valeur).

## 6. Ordre d'exécution suggéré (du sans-risque au structurant)

1. F2 purge config + `_archived_formations` (0 risque) ; 2. R6 cohérence cards cas (contenu pur) ; 3. F1 achever doc 26 + 301 ; 4. F6 migration 3 offres .astro → MDX ; 5. F7 premium → commerce ; 6. F4 secteurs ; 7. F5 cas objet unique facetté ; 8. F3 + hub Acquérir/Piloter/Opérer (avec maillage relatedOffres/relatedCases enfin peuplé, et script de vérif des slugs car aucun `reference()` ne valide ces champs, doc 23 §P3 toujours vrai).

Docs à mettre à jour ensuite : docs/13 (diagnostic + roadmap, ou archiver vers docs/archive/), docs/23 (§1.6, §3, §P4), docs/26 (statuts phases A/B/C).
