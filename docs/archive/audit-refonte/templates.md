# Audit refonte templates · waimia-web (2026-06-10, READ-ONLY)

> Base : docs 22/32/33 + render-matrix, vérifiés contre le code. Docs 32/33 datent du 2026-05-17 et sont PARTIELLEMENT PÉRIMÉS (deltas en §2). Doc 22 (bloc MAJ 2026-06-10) est fiable.

## 1. Liste réelle des templates (17 fichiers, 8 899 LoC total)

Mesures : `wc -l`, imports réels `src/pages/**`, `<section` inline + LoC `<style>` comme proxy du markup inline restant (body).

| Template | LoC | Routes consommatrices (réelles) | Héros migré | Body : sections inline / style LoC | Inline restant |
|---|---|---|---|---|---|
| OffresDetailTemplate | 1379 | `offres/[...slug]` + EN + catch-all racine `[...slug]` | ✅ (12/18) | 9 / 773 | ÉLEVÉ, mais voie quasi morte : les 9 offres MDX ont `sections:` → SectionsRenderer ; le template ne sert plus que les stubs du catch-all |
| SolutionsDetailTemplate | 1094 | `solutions/[...slug]` + EN + `secteurs/[...slug]` + catch-all | ⛔ veto Simon | 8 / 626 | ÉLEVÉ ; seul rendu legacy LIVE réel = 3 MDX `secteurs/` (pas de branche composable dans `secteurs/[...slug].astro`) + stubs |
| AuthorPageTemplate | 976 | `equipe/[...slug]` | ✅ (8/18, HeroAuthor) | 9 / 481 | ÉLEVÉ (body 100 % inline) |
| TechnologiesDetailTemplate | 918 | `technologies/[...slug]` + catch-all | ✅ (13/18) | 7 / 494 | ÉLEVÉ, voie quasi morte : 2/2 technologies MDX composables ; legacy = stubs catch-all uniquement |
| ConversionFunnelTemplate | 719 | `offres/site-web-ia` (1 page) | ✅ | 9 / 295 | ÉLEVÉ (body 100 % inline, pricing/FAQ/steps) |
| CourseDetailTemplate | 683 | `ecole/[type]/[slug]` + `ecole/cours/[slug]` | ✅ (5/18, HeroCourse) | 10 / 291 | ÉLEVÉ (body polymorphe 4 course_types inline) |
| EssayTemplate | 656 | blog `[...slug]` FR+EN, `brain-circuit`, cookbooks `[...slug]` + 3 statiques, outils `[...slug]`, veille-ia `[...slug]` (9 routes) | ✅ (11/18, HeroEssay) | 1 / 352 | MOYEN (TOC/byline/related inline + grosse CSS) |
| CaseStudyTemplate | 640 | `cas/[...slug]` FR+EN (hybride : composable si `sections:`) | ✅ (9/18, HeroCaseStudy) | 8 / 191 | MOYEN ; live legacy = 3 cases MDX sans `sections:` (caserne, halcyon, northbound) ; plateau = composable |
| LeadMagnetTemplate | 366 | livres-blancs `[...slug]` + `ai-act-readiness` | ✅ (10/18) | 3 / 142 | MOYEN (form/TOC/cover inline) |
| ServiceDetailTemplate | 312 | **AUCUNE** (revops migré full-composable) | ✅ (pilote 1/18) | 6 / 66 | **CODE MORT** |
| HubTemplate | 307 | **AUCUNE** (conseil → MDX composable `hero-hub-stats`) | ✅ (7/18) | 5 / 119 | **CODE MORT** |
| DetailMenuTemplate | 285 | `offres/audit-maturite-ia` (1 page) | ✅ (2/18) | 6 / 67 | MOYEN |
| TunnelStepTemplate | 183 | `offres/[offre]/tunnel/[step]` | ✅ (hybride Wave 1.6) | 1 / 100 | FAIBLE |
| UtilityTemplate | 151 | 10 routes : about/careers/methode FR+EN, contact FR+EN, academy, livres-blancs/index, veille-ia/index | ✅ (4/18) | 1 / 6 | FAIBLE (shell mince) |
| ListIndexTemplate | 93 | 4 routes : blog/index, changelog, cookbooks/index, outils/index | ✅ (14/18, HeroCentered listing) | 1 / 3 | QUASI NUL |
| TrustLegalTemplate | 88 | `agence/{docs,governance,trust-center}` | ✅ (15/18, TrustLegalSection) | 0 / 0 | NUL (full délégué) |
| WelcomeTemplate | 49 | 11 routes `bienvenue/*` FR (8) + EN (3) | ✅ (16/18, WelcomeSection) | 0 / 0 | NUL |

État global : héros 17/18 migrés (Solutions = veto). Bodies : 4 templates déjà propres (TrustLegal, Welcome, ListIndex, Utility), 2 morts, le gros du markup inline restant est concentré dans Offres/Solutions/Tech/Author/ConversionFunnel/Course (~5 770 LoC à eux 6).

## 2. Deltas docs vs code (à corriger)

| Doc | Affirmation périmée | Réalité code |
|---|---|---|
| docs/32 (entier) | « 19 templates », FormationDetailTemplate + EcoleHubTemplate existants | **17 fichiers** : FormationDetail et EcoleHub SUPPRIMÉS. `ecole/cours/[slug].astro:5` importe CourseDetailTemplate ; `ecole/index.astro` compose directement HeroCentered + CourseCatalogTable + LearningPathList (sans template ni renderer) |
| docs/32 §2.2, §5.2 | ServiceDetail → migration « recommandée » | FAITE et dépassée : `offres/revops.astro:2-3` = full SectionsRenderer. ServiceDetailTemplate = 0 consommateur, à supprimer |
| docs/32 §2.4 | HubTemplate = « base canonique » famille hub | HubTemplate = **0 consommateur** (`offres/conseil.astro` supprimé, conseil.mdx composable `hero-hub-stats`). La « base canonique » de facto est le couple HeroCentered + sections catalogue |
| docs/32 §3 | Adoption W6 templates « 0/19 » | Périmé : 17/18 héros via sections cataloguées ; CaseStudy/DetailMenu/EssayTemplate importent 9/4/2 composants `sections/` |
| docs/33 §5.1 | secteurs statiques legacy `services-b2b.astro` / `finance-compta.astro` | SUPPRIMÉS : `src/pages/secteurs/` ne contient plus que `index.astro` + `[...slug].astro` (Batch C exécuté) |
| docs/33 §5.3 | « 9 pages statiques doublonnent les routes dynamiques » | Les 4 `cas/*.astro` statiques sont SUPPRIMÉS (4 MDX dans `content/cases/`). Les 5 restantes (brain-circuit, 3 cookbooks, ai-act-readiness) ne sont PLUS des doublons : leurs slugs n'existent pas dans les collections (cookbooks = 1 seul MDX `premier-agent-ia`, livres-blancs = `ia-pme-b2b-2026`). Ce sont des pages uniques en `.astro` statique, candidates à une MIGRATION MDX, pas à une suppression |
| docs/33 §5.5 | `test-composable.astro` « à supprimer » | Toujours présent (`src/pages/test-composable.astro`), toujours pas supprimé |
| docs/33 §5.4 | `archive.astro` double import Header/Footer | Toujours présent (2 imports directs, vérifié) |
| docs/33 §2.5 | « 3 templates différents » conseil/revops/audit | Restant : seul `audit-maturite-ia` est encore sur template (DetailMenu) ; conseil et revops sont composables |
| docs/33 Bloc 7 | `ecole/[type]/[slug]` → « FormationDetailTemplate? » | Les DEUX routes école utilisent CourseDetailTemplate (le doublon de route persiste, voir §5) |
| docs/render-matrix | blog index sur `FIELD_NOTES` statique | À re-vérifier lors de la passe bodies ; la matrice SSG/ISR reste valide dans ses conclusions (tout SSG) |
| docs/22 tableau | (fiable) seule imprécision : ListIndex liste 4 routes dont `outils/index` absent de docs/32 L58 | `ressources/outils/index.astro:8` importe bien ListIndexTemplate |

## 3. Candidats FUSION / suppression de templates

| # | Action | Gain | Risque | Effort |
|---|---|---|---|---|
| F1 | **Supprimer ServiceDetailTemplate + HubTemplate** (code mort, 0 import dans pages) | -619 LoC, -2 templates | Quasi nul ; vérifier les refs documentaires `src/lib/library-manifest.ts` et e2e avant | XS |
| F2 | **DetailMenuTemplate → composable** (1 page `audit-maturite-ia`, sections steps/proof/tech-pills déjà cataloguées, pattern revops prouvé) | -285 LoC, -1 template | Faible (1 page, GF-1 unitaire) | S |
| F3 | **ListIndexTemplate + UtilityTemplate → 1 shell unique** : 2 coquilles minces (93+151 LoC) wrappant des variantes du même masthead ; incohérence actuelle : livres-blancs/index et veille-ia/index (des INDEX) passent par Utility pendant que blog/changelog/cookbooks/outils passent par ListIndex | -1 template, 14 routes ré-homogénéisées, famille index unifiée | Moyen (10+4 routes, props/slots à réconcilier) | M |
| F4 | **Éteindre les bodies legacy Offres/Tech** : la voie template n'est plus empruntée par AUCUN contenu live (9/9 offres et 2/2 technologies composables) ; il ne reste que les stubs du catch-all `[...slug].astro`. Remplacer le fallback stub par un mini-template Stub commun puis supprimer les 2 gros templates | -2 297 LoC potentiels (1379+918) | Moyen : valider que le catch-all ne rend rien d'important (ce sont des placeholders) ; e2e | M |
| F5 | **Composabiliser secteurs (3 MDX) + 3 cases restants** : ajouter `sections:` aux MDX (séquence solutions déjà standard ; séquence case prouvée sur plateau) → SolutionsDetailTemplate ne sert plus que le veto Solutions... qui est déjà composable côté solutions/. Après ça, SolutionsDetail et CaseStudy peuvent maigrir ou disparaître | -1 094 et -640 LoC à terme | Moyen-fort (veto Simon sur le HÉROS solutions : la migration body n'y touche pas, mais clarifier le périmètre du veto avant) | M-L |
| F6 | **ConversionFunnelTemplate → composable** (1 page, pricing/FAQ/steps existent en types catalogue) ; absorbe au passage l'orpheline `site-web-ia-landing.astro` (470 LoC, 8 sections inline, même famille landing conversion) | -719 LoC template + 1 orpheline absorbée | Moyen (page à fort enjeu conversion, GF-1 strict + caveat mobile 768-800px connu) | M |
| F7 | EssayTemplate + LeadMagnetTemplate : même colonne vertébrale éditoriale (doc 32 §4.2). Fusion possible en 1 template éditorial à variantes (gated/ungated) APRÈS le passage bodies | -1 template (~-300 LoC) | Moyen (11 routes cumulées) | M |
| F8 | AuthorPageTemplate et CourseDetailTemplate : garder en standalone court terme (polymorphisme/1 route), mais décomposer leurs bodies en sections lors de Wave bodies | dette -772 LoC style | Faible si fait section par section | L |

Cible réaliste post-fusions : **17 → ~8-9 templates** (Offres*, Solutions*, Tech*, Hub, ServiceDetail, DetailMenu, ConversionFunnel, +1 fusion ListIndex/Utility, +1 fusion Essay/LeadMagnet en option), le rendu vivant passant majoritairement par SectionsRenderer.

## 4. Pages orphelines (53 réelles sans template ni SectionsRenderer)

Comptage exact : 53 fichiers `.astro` (le « ~51 » du master plan colle, modulo infra). Groupées par famille structurelle :

### A. Hubs d'index inline (le plus gros gisement, structure commune masthead + grid cards + CTA)
- `solutions/index` (267) + `en/solutions/index` (265)
- `offres/index` (305) + `en/offres/index` (306) : + pyramide SVG signature
- `technologies/index` (355) + `en/technologies/index` (347)
- `secteurs/index` (333)
- `cas/index` (237) + `en/cas/index` (222) : featured + grid
- `ressources/index` (487) + `en/ressources/index` (450) : multi-sections
→ Un type `hub-masthead + card-grid` (HeroHubMasthead existe déjà au catalogue) peut absorber les 11 ; data hardcodée à brancher sur getCollection au passage (drift doc 33 §5.2 toujours vrai : `ressources/index` hardcode `caseCards`).

### B. Hubs taxonomiques à pattern répété 3× (doc 33 §3.5 toujours valide)
- `glossaire/index` (141), `comparer/index` (92) + EN (92), `integrations/index` (157) + EN (148)
- `equipe/index` (164), `commerce/index` (166), `ressources/personas/index` (120), `ressources/testimonials/index` (167), `ressources/field-notes/index` (117, collection à vérifier)
→ Même squelette header + groupes + grid : 1 template hub fusionné ou séquence sections les absorbe TOUS.

### C. Détails collection inline (sans template)
- `glossaire/[slug]` (160), `comparer/[slug]` (153) + EN, `integrations/[slug]` (123) + EN (115), `commerce/[type]/[slug]` (223), `ressources/personas/[slug]` (142), `ressources/testimonials/[slug]` (140), `ressources/field-notes/[slug]` (107)
→ Famille « petit détail éditorial » : candidate à un template détail mince unique ou à des séquences sections par collection.

### D. Taxonomies SEO
- `ressources/categorie/[...slug]` (193), `ressources/silo/[...slug]` (230), `ressources/tag/[...slug]` (182), `categories/[slug]` (216, catalogue DS)
→ Même listing agrégé ; mutualisable avec famille B.

### E. Pages signature (refactor V5-V7, qualité 5/5 : NE PAS dégrader, cataloguer leurs organisms)
- `index` (301, organisms) + `en/index` (301), `manifesto` (453) + EN (293), `console` (443) + EN (443), `atlas` (132) + EN (45)
→ Wave 1.4 du master plan prévoit déjà : cataloguer AtlasGrid, PersonaSwitcher, BookSession plutôt que templatiser.

### F. Landing + divers
- `offres/site-web-ia-landing` (470, 8 sections inline) → voir F6
- `agence/prompts` (187) + EN (188), `agence/hero-lab` (125, outil interne), `agence/ds-studio` (998, outil interne), `archive` (248, anti-pattern Header/Footer direct toujours présent), `404` (118), `test-composable` (résiduel, à supprimer), `compare/organisms` (105, infra), `components/[type]` + `preview/[type]` (infra catalogue), `en/atlas` (45), `ecole/index` (134, déjà composé de sections cataloguées en direct : orpheline « saine »)

## 5. Routes redondantes / parcours doublonnés

1. **`ecole/cours/[slug]` vs `ecole/[type]/[slug]`** : les formations sont générées aux DEUX URLs (`cours/[slug].astro:8-13` filtre `course_type === 'formation'` ; `[type]/[slug].astro:7-13` génère tous types). Même contenu, même template, 2 chemins → choisir le canonique + redirect.
2. **Catch-all racine `[...slug].astro`** : génère ~50 routes stub FR + EN, dont des slugs en COLLISION d'intention avec les vraies collections (`offres/claude-cowork`, `technologies/claude-models`, `solutions/finance` y sont listés en dur L31-47) et la famille fantôme `ressources/cas/*` (les URLs 404 signalées par doc 33 §5.2 existent en fait comme stubs). Astro donne priorité aux routes spécifiques, mais le stub catch-all publie des dizaines de placeholders indexables + maintient OffresDetail/SolutionsDetail/Tech templates en vie artificiellement. À purger lors de F4.
3. **`solutions/finance` + `solutions/fintech` vs `secteurs/*`** : finance/fintech sont des SECTEURS rangés dans la collection solutions (8 MDX) pendant que `secteurs/` a 3 MDX (finance-compta, industrie, services-b2b). Deux taxonomies pour le même axe sectoriel, risque de contenu proche accessible par 2 parcours (`/solutions/finance` et `/secteurs/finance-compta`).
4. **`offres/site-web-ia` vs `offres/site-web-ia-landing`** : 2 pages de vente pour la même offre (template ConversionFunnel vs inline). Clarifier le rôle (landing ads vs page SEO) ou fusionner.
5. **`ressources/blog/brain-circuit.astro`** statique à côté de `blog/[...slug]` : plus un doublon de slug, mais un contenu hors collection → migrer en MDX (idem 3 cookbooks + ai-act-readiness).
6. `archive.astro` liste des liens vers des pages « à migrer » : page d'inventaire interne exposée en prod.

## 6. Fatigue visuelle : séquences de sections identiques

Constat central : la composabilité a homogénéisé les SÉQUENCES à l'identique au sein de chaque famille. Exemples concrets (frontmatter MDX, ordre exact) :

1-7. **7/9 offres strictement identiques** : `hero-offer-detail > problem-statement > method-timeline > deliverables-grid > stat-block > cta-final` pour activation-ia, application-ia-pme, claude-cowork, growth-intelligence, growth-system-ia, infrastructure-ia, productivite-operationnelle-ia. Fonds : paper → paper → paper → paper-2 (deliverables) → paper → cta-final (data-bg paramétrable paper/paper-2/ink). Un visiteur qui compare 2 offres voit 2 fois la même page avec d'autres mots. Exceptions saines : composable-pilot (hero-split > proof-bar > method-timeline > cta-final) et conseil (9 sections variées).

8-15. **8/8 solutions strictement identiques** : `hero-sector > pain-points > workflow-table > roi-band > case-split > department-stack > department-cta` (acquisition-ia, contenu-seo-geo-ia, crm-relances-ia, finance, fintech, productivite-ia, site-web-ia-pme, support-client-ia). Seul `roi-band` est dark (`--ink`, `SolutionsDetailTemplate`-héritée `.sol-sec-dark`) : le rythme clair/sombre est le même partout.

16. **2/2 technologies quasi identiques** : `hero-tech-layer > tech-positioning-split > tech-capabilities-specs > (tech-models-table) > tech-integration-flow > cta-final`.

17. Legacy : les 3 cases sans `sections:` (caserne, halcyon, northbound) partagent le pipeline CaseStudyTemplate fixe (masthead > steps > proof > tech-pills > related > CtaBand) ; plateau composable a déjà une séquence plus riche (9 sections avec metric-shift, pull-quote) : modèle à généraliser.

18. Queue de page répétitive cross-familles : presque tout finit par `cta-final`/CtaBand précédé d'un bloc stats/related ; les 4 index ListIndex partagent hero + liste sans variation de fond.

**Implication refonte** : le levier anti-fatigue n'est PAS de multiplier les templates mais de (a) varier les séquences par MDX (2-3 archétypes par famille au lieu d'1), (b) exposer les variantes de fond existantes (`cta-final[data-bg]`, sections dark) et en doter problem-statement/stat-block, (c) injecter 1-2 sections différenciantes par page (pull-quote, metric-shift, media) comme sur plateau et conseil, qui sont les 2 contre-exemples réussis du repo.

## 7. Synthèse priorisée pour la refonte

1. XS : supprimer ServiceDetail + Hub (morts) + `test-composable.astro` ; fixer `archive.astro`.
2. S : DetailMenu → composable (dernier petit template mono-page).
3. M : fusion ListIndex+Utility ; ConversionFunnel+landing → composable ; purge stubs catch-all puis extinction bodies Offres/Tech.
4. M-L : `sections:` sur secteurs (3) + cases (3) → extinction progressive SolutionsDetail/CaseStudy bodies ; clarifier périmètre du veto Solutions (héros seul ?).
5. L : Wave 1.4 orphelines par familles A→D (hub fusionné + détail mince), E en catalogage d'organisms.
6. Transversal : casser l'uniformité des séquences MDX (archétypes multiples + fonds alternés).
