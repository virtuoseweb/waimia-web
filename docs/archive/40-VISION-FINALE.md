# 40 · VISION FINALE waimia.com : plan directeur de la version finale

> Mandat Simon (2026-06-10 soir) : nettoyage final complet, choix des collections, arborescence cible (cas clients enfants des secteurs ?), templates de service parfaits + 1 landing « site web IA » parfaite exposée dans le footer + 1 tunnel de conversion 4 steps parfait, étiquetage catalogue (utilisé vs bibliothèque), qualité Awwwards, extension motion non prioritaire.
> Directive additionnelle (même soir) : recomposition de la HOME section par section (tout sauf le hero), principe « 1 information = 1 représentation », et process d'audit visuel itératif avec screenshots conservés dans le repo (grille 4 axes, §6).
> Sources : audit consommation réel (grep `getCollection` 87 call-sites, 2026-06-10), `docs/audit-refonte/*` (5 audits), `docs/37` (vagues R0-R7, statuts), `docs/39` (audit visuel mesuré 14 pages), `docs/38` (pipeline images, branche `feat/images-pipeline`), `docs/00-MASTER-PLAN.md`. Ce doc NE duplique pas ces audits : il les référence et tranche.

## §1 · Verdict collections (25 dans le config + 2 dossiers orphelins)

Méthode : grep `getCollection('<nom>')` exhaustif sur `src/` (87 call-sites) + `reference()` (11, tous vers `authors`) + volumes réels `src/content/**`. Les 5 collections à 0 entrée (produits, abonnements, landingPages, welcomePages, newsletter) ont déjà été purgées du config par R0 (`6f03d3a`).

### GARDER · 19 collections (cœur, routes live)

| Collection | Vol | Consommateurs (preuve) | Note |
|---|---|---|---|
| `cases` | 4 | `cas/[...slug].astro`, `cas/index.astro`, `/en/cas/*`, agrégateurs tag/categorie/silo, `TaxonomyMenu.astro` (13 call-sites) | Objet preuve central, facettes `sector/pains/results` posées 4/4 par R7a |
| `offres` | 9 | `offres/[...slug].astro`, `/en/offres/*`, blog related (4) | Composable 9/9 |
| `solutions` | 8 | `solutions/[...slug].astro` + EN (2) | `need` 8/8 posé (R7a) |
| `secteurs` | 3 | `secteurs/[...slug].astro` (1) | Devient listing facetté des cas (§2) |
| `blog` | 17 | 19 call-sites : routes blog FR/EN, rss ×3, tag/categorie/silo, field-notes, veille-ia, equipe, ressources/index, `TaxonomyMenu`, `RelatedByCluster` | Fusion F1 faite (R1) : field-notes et veille-ia sont des vues filtrées de blog |
| `tunnels` | 20 | `offres/[offre]/tunnel/[step].astro:10` (1) | GARDER + élaguer (§4.2) : 5 tunnels × 4 steps, 2 rattachés à des offres encore `.astro` |
| `glossary` | 30 | `glossaire/index` + `[slug]` (2) | Actif SEO/GEO |
| `integrations` | 20 | `/integrations/*` + EN (4) | |
| `comparisons` | 10 | `/comparer/*` + EN (4) | |
| `commerce` | 15 | `commerce/index` + `[type]/[slug]` (2) | Socle Phase 6 (gamme produit) |
| `testimonials` | 5 | `/ressources/testimonials/*` (2) | Nourrit la preuve sociale landing/offres (§4) |
| `prompts` | 5 | `agence/prompts` + EN (2) | |
| `personas` | 3 | `/ressources/personas/*` + `PersonaSwitcher.astro` (3) | |
| `courses` | 3 | `/ecole/index`, `[type]/[slug]`, `cours/[slug]` (3) | |
| `cookbooks` | 2 | routes + agrégateurs (10) | + migrer les 3 one-off `.astro` en MDX (§2) |
| `livresBlancs` | 2 | routes + agrégateurs + Header/Footer (9) | + migrer `ai-act-readiness.astro` en MDX |
| `outils` | 2 | `/ressources/outils/*` (2) | |
| `authors` | 2 | `/equipe/*` (2) + `reference('authors')` ×11 dans le config | |
| `technologies` | 2 | `technologies/[...slug].astro` (1) | |

### MIGRER vers `src/data/` (référentiels TS) · 3 collections

| Collection | Vol | Constat | Action |
|---|---|---|---|
| `painPoints` | 12 | 0 `getCollection` ; R7a a créé `src/data/pain-points.ts` (20 ids consolidés depuis les MDX + pains inline, `sources` tracées) | Migration DÉJÀ faite par R7a. Reste : supprimer les 12 MDX + la collection du config (redondance avérée, le TS est la source unique validée par `check-content-refs.mjs`) |
| `proofPoints` | 15 | idem : `src/data/proof-points.ts` (22 ids, catégories roi/time/cost/quality/adoption/volume) | idem : purger MDX + collection |
| `guarantees` | 5 | 0 `getCollection` ; `GuaranteeBlock.astro` consomme des props inline | Migrer en `src/data/guarantees.ts` (même pattern R7a) : la landing et le step 4 du tunnel en ont besoin comme source unique (§4) ; puis purger MDX + collection |

### ARCHIVER / SUPPRIMER · 3 collections + 2 dossiers

| Item | Vol | Preuve | Action |
|---|---|---|---|
| `pages` | 1 (`a-propos`, template essay) | seul consumer `bienvenue/[...slug].astro` filtre `template === 'welcome'` : 0 entrée matche, **0 page générée** (audit collections §1.2) | Supprimer la collection + la route `bienvenue/[...slug].astro` (les 7 vraies pages bienvenue sont des `.astro` statiques) |
| `knowledgeBase` | 10 | 0 `getCollection` (grep négatif ; seules mentions = commentaires `ListIndexTemplate.astro:7`, `cookbooks/index.astro:5`) | Archiver : recycler la doctrine (methode-4-piliers, doctrine-prix-transparent, principes-design-editorial...) comme matière éditoriale pour `/agence/methode`, `/agence/about` (V-F2/V-F5) et le blog ; puis déplacer les MDX vers `docs/archive/content/` et purger la collection |
| `brandVoice` | 1 | 0 consumer (grep : seul `content.config.ts`) | C'est de la gouvernance de marque, pas du contenu de site : déplacer vers `docs/` (réf copywriting agents), purger la collection |
| `src/content/newsletter/` | dossier vide (`.gitkeep`) | collection déjà purgée (R0) | Supprimer le dossier |
| `src/content/pain-points/`, `proof-points/`, `guarantees/`, `knowledge-base/`, `brand-voice/`, `pages/` | 34 MDX | conséquence des verdicts ci-dessus | Suppression/archivage en V-F1 |

**Bilan : 19 gardées · 3 migrées en `src/data` (2 déjà faites par R7a) · 3 archivées. Config final = 19 collections.**

## §2 · Arborescence finale

### Décision structurante : variante (b) recommandée. `/cas/<slug>` reste canonique, les pages secteurs deviennent des listings facettés

| Critère | (a) `/secteurs/<secteur>/<cas>` + 301 | (b) `/cas/<slug>` canonique + listings facettés |
|---|---|---|
| SEO | 301 sur 4 URLs indexées depuis le lancement (perte transitoire 10-15 % + dilution backlinks) ; URL niveau 3 plus profonde ; 0 gain de mot-clé (le mot-clé secteur vit déjà dans le title de la page secteur) | 0 churn d'URL ; pages secteurs gagnent un contenu vivant (listing = signal de fraîcheur) ; breadcrumb JSON-LD `Secteurs > <secteur> > <cas>` donne la sémantique hiérarchique SANS déplacer l'URL |
| Modèle de données | Force un parent UNIQUE par cas. Faux dès aujourd'hui : `caserne` est industrie ET ops finance (1 200 h factures) ; un cas sert plusieurs secteurs | Facette `sector` multi-valuée déjà posée 4/4 par R7a (`check-content-refs` valide les ids). Un cas rayonne sur N secteurs |
| Maintenance | Migration de routes + redirects + getStaticPaths imbriqué + risque de cas sans secteur | 0 migration de route. Le template secteurs ajoute une section listing (type catalogué `case-card-grid` existant) filtrée par facette |

**Verdict : (b).** L'idée de Simon (« les secteurs listent leurs cas ») est intégralement satisfaite par (b) : chaque page secteur affiche ses cas (grid filtrée par la facette `sector`), chaque cas affiche un breadcrumb secteur cliquable et un bloc « autres cas du secteur ». C'est la hiérarchie perçue de (a) sans sa dette d'URL. Exécution en V-F5 (UI) sur la data R7a déjà mergée.

### Arbre final des routes (verdict par route existante)

Légende : ✅ garder · 🔁 fusionner/migrer (URL conservée) · ❌ supprimer · ➡️ 301.

```
/                               ✅ home (recomposée §6)
/manifesto /atlas /console      ✅ pages signature (entrent au menu Agence, R3 fait)
/archive                        ❌ index legacy (248 l), plus aucune raison d'exister
/[...slug] catch-all            ❌ ~40 stubs offres/solutions/technologies fantômes,
                                   79 URLs noindex (scope R6 : purge getStaticPaths)
/contact                        ✅
/offres                         ✅ hub (index regénéré depuis la collection, R6/F6)
/offres/<slug> ×9 MDX           ✅ composables 9/9
/offres/revops .astro           🔁 MDX (F6, scope R6) ; URL identique
/offres/audit-maturite-ia .astro 🔁 MDX (F6, scope R6)
/offres/site-web-ia .astro      🔁 MDX + tunnel rattaché (§4.2)
/offres/site-web-ia-landing     🔁 LA landing parfaite (§4.1), exposée footer
/offres/<offre>/tunnel/<1..4>   ✅ tunnels (élagués + refondus §4.2)
/solutions + /solutions/<slug>  ✅ hub 3 portes Acquérir/Piloter/Opérer (R7b)
/solutions/fintech              ➡️ 301 /secteurs/fintech (F4-A, avec R7b)
/secteurs + /secteurs/<slug>    ✅ listings facettés des cas (§2, V-F5)
/cas + /cas/<slug> ×4           ✅ canonique (décision b)
/technologies + <slug> ×2       ✅
/ressources                     ✅ hub (P1-10 docs/39)
/ressources/blog/*              ✅ (+ rss, tag, categorie, silo)
/ressources/blog/brain-circuit  🔁 MDX blog type essai (one-off .astro)
/ressources/field-notes|veille-ia ✅ vues filtrées de blog (post-F1) + rss veille
/ressources/cookbooks/*         ✅ + 🔁 3 one-off .astro vers MDX
/ressources/livres-blancs/*     ✅ + 🔁 ai-act-readiness.astro vers MDX
/ressources/outils|personas|testimonials|academy|changelog ✅
/ecole + /ecole/*               ✅
/glossaire /integrations /comparer /commerce /equipe ✅
/bienvenue/<page> ×7 .astro     ✅ thank-you pages (noindex)
/bienvenue/[...slug]            ❌ (0 page générée, avec la collection pages)
/agence/{about,methode,prompts,governance,trust-center,careers,docs} ✅
/agence/design-system /ds-studio /preview /components /categories ✅ infra catalogue
/agence/hero-lab                ❌ lab de comparaison périmé par R5a (17 heros vers 9)
/compare/organisms              ✅ outil dev noindex (utile tant que §3 vit)
/en/*                           ✅ miroir partiel (inchangé)
/api/*                          ✅ (contact, devis, newsletter, lead-magnet, academy, og)
```

### Plan 301 (mécanisme : `astro.config.mjs` redirects, pattern déjà en place l.61)

1. `/solutions/fintech` vers `/secteurs/fintech` (seule vraie redirection nouvelle, R7b/F4-A).
2. Stubs catch-all supprimés : PAS de 301 (ils sont `noindex,follow`, 0 équité à transférer ; `sitemap-noindex-exclude.ts` se vide d'autant). 404 naturel.
3. `/archive`, `/agence/hero-lab` : supprimés, 301 vers `/` et `/agence/design-system` (2 lignes, par prudence).
4. Migrations `.astro` vers MDX (revops, site-web-ia, audit-maturite-ia, cookbooks, livre blanc, brain-circuit) : URL identique, 0 redirection.

## §3 · Étiquetage catalogue : UTILISÉ par waimia vs BIBLIOTHÈQUE

Le mécanisme existe à 80 % : `src/lib/library-manifest.ts` calcule déjà `rendering: 'live' | 'catalogue-only'` + `consumers: string[]` par section (anti-drift, dérivé du registry). Il manque seulement la surface UI. Mécanisme le plus simple, 0 nouvelle source de vérité :

1. **Champ dérivé** dans `library-manifest.ts` : `usage: 'site' | 'library'` = `consumers.length > 0 ? 'site' : 'library'` + liste d'overrides manuels (ex : une section gardée pour un futur client malgré 0 usage waimia reste `library` sans débat).
2. **Badge** dans `/agence/design-system` (le composant badge existe : `.ds-category-badge`, design-system.astro:857) : « Sur waimia · N pages » (terracotta) vs « Bibliothèque » (encre), + filtre en tête de galerie (Tout / Utilisé / Bibliothèque).
3. **Propagation** : `ds-section-manifest.json` regénéré embarque `usage` + `consumers` (les agents et DS Studio lisent le même fait) ; même badge dans `/components/[type]` et `/preview/[type]`.
4. **Gate** : `check-library-manifest` (extension du codegen drift-guard existant) échoue si un composant de `src/components/sections/` manque au manifeste.

C'est exactement la frontière dont DS Studio a besoin pour devenir un blueprint multi-sites (doctrine docs/37 §0.3) : « library » = réutilisable pour d'autres DA, « site » = engagé sur waimia, à auditer en §5/§6.

## §4 · Landing parfaite + tunnel 4 steps parfait + templates de service parfaits

### 4.1 Landing « site web IA » (l'unique landing du site, exposée dans le footer)

Existant : `src/pages/offres/site-web-ia-landing.astro` (470 l, bespoke inline : viole la règle anti-orphelin) + `site-web-ia.astro` (202 l, `ConversionFunnelTemplate`, lié footer:159) + solution `site-web-ia-pme.mdx` = le « dit 3 fois » de l'audit collections R4. Cible : **une seule page de vente** au-dessus du tunnel.

- **Reconstruire la landing en composable** (sections frontmatter MDX ou page mince sur `SectionsRenderer`), en réutilisant le type `hero-landing` déjà au schéma (`schemas/sections.ts:230`). Séquence narrative (8 slots, chacun mappé sur un type catalogué existant) : 1 hero magnétique (promesse + dispo + 2 CTA) · 2 douleur (problem-statement, ids `src/data/pain-points.ts`) · 3 démonstration concrète (architecture-diagram ou media-block + image lot 1 docs/38) · 4 preuve incarnée (metric-shift + quote-spotlight, ids `proof-points.ts` + `testimonials`) · 5 offre + ancrage prix (PricingTier ×3) · 6 garanties (`guarantee-block`, data §1) · 7 objections (faq-accordion ou objection-handler) · 8 cta-final ink vers `/offres/site-web-ia/tunnel/1`.
- **Footer** : ajouter le lien dans `FOOTER_COLS` (`src/data/mega-menu.ts`), colonne Offres, libellé « Site web IA » ; retirer la ligne dev `ft-dev-*` correspondante (Footer.astro:159-165, inventaire interne qui n'a rien à faire en prod, cf §6 décoratif non fonctionnel).
- **Absorption** : `site-web-ia.astro` migre en MDX `offres/site-web-ia.mdx` (page offre standard, tunnel rattaché) ; la landing reste l'arme de campagne (ads, social) avec son URL propre, `index,follow`, JSON-LD Service.

### 4.2 Tunnel de conversion 4 steps parfait

Existant : collection `tunnels` 20 MDX (5 offres × 4 steps), route `offres/[offre]/tunnel/[step].astro`, `TunnelStepTemplate` hybride avec types catalogués `tunnel-step-hero` + `tunnel-step-nav` (Wave 1.6). Le tunnel site-web-ia a déjà la bonne dramaturgie nominale (intro, mecanique, preuves, conversion).

- **Étalon** : le tunnel `site-web-ia` devient LE tunnel parfait, branché sous la landing 4.1. Standards par step : 1 idée par step ; step-title à l'italique signature ; 1 SEUL CTA (next_step), 0 nav concurrente (header minimal, progress 1/4 visible) ; step 3 = preuves avec chiffres des référentiels (jamais en dur, leçon P1-2) ; step 4 = conversion avec garanties + Cal.com/contact + micro-copy de dérisquage (modèle hero home).
- **Élagage** : ne garder que les tunnels dont l'offre MDX existe ET référence son tunnel (champ `tunnel` au schéma offres). Après F6 (revops, site-web-ia migrés), les 5 tunnels sont légitimes ; tout step orphelin est supprimé. La `offre_label_map` hardcodée de la route (`tunnel/[step].astro:24`) disparaît : le label vient de l'offre.
- **GF-1 fonctionnel** : parcours Playwright 1 vers 4 complet, assertion sur chaque CTA, soumission step 4 vérifiée (write-read API contact/devis).

### 4.3 Templates de service parfaits

Les 9 offres sont composables 9/9 : le « template parfait » n'est plus un fichier `.astro` mais **3 archétypes de séquence** documentés et appliqués (docs/39 P1-7) : Growth (+ metric-shift), Adoption (+ pull-quote terrain), Build (+ architecture/media). Standards communs : squelette 6 sections conservé (cohérence), 1 section signature + 1 alternance de fond par archétype, kicker unique (P1-1), CTA inline si page > 6 000 px (P3-4), `cta-final` ink. `OffresDetailTemplate` devient un shell mince (scope R6) et la grille d'audit §6 passe sur chaque offre.

## §5 · Standards Awwwards par type de page

Référence : `docs/39-PLAN-VAGUE-VISUELLE.md` (mesures fold/CTA/fonds sur 14 pages prod, P1-1 à P3-4) : NE PAS dupliquer, exécuter. Ce paragraphe fixe les standards STRUCTURELS par type de page ; les écarts mesurés et leurs correctifs sont dans docs/39.

| Type de page | Structure cible (sections) | Standards mesurables |
|---|---|---|
| Home (signature) | §6 (recomposition dédiée) | fold ≥ 95 % desktop, CTA hero in-fold à 390px (P1-5), jamais > 3 500 px sans CTA |
| Landing | 8 slots §4.1 | fold 100 %, ancrage prix visible avant 60 % scroll, 1 idée par section |
| Offre (service) | 6 + 1 signature §4.3 | dé-clonage (3 archétypes), alternance 3 fonds mini, climax ink |
| Cas client | hero chiffré, contexte, méthode, metric-shift, quote, tech-stack, cta ink | CTA inline après metric-shift (P1-6), spec bar FR sans fuite EN |
| Secteur | hero éditorial (H1 ≠ title, P2-3), pains, workflows scindés (P2-2), **listing cas facetté (§2)**, FAQ, cta | la section cas est la nouveauté V-F5 |
| Hub (cas, offres, ressources, solutions) | masthead stats (modèle HeroHubStats) + grids | fold ≥ 80 %, compteurs calculés des collections, jamais en dur |
| Tunnel step | tunnel-step-hero + contenu + tunnel-step-nav | 1 CTA, progress visible, 0 distraction |
| Éditorial (blog, glossaire...) | prose + mapping MDX riche (PullQuote, EditorialTable, Sidenote : R2-P3) | scannabilité : 1 respiration visuelle / 800 px |
| Trust/utility | composable (about/academy : P2-1) | plus aucun pavé > 1 500 px d'un bloc |

Transverses (toutes pages) : rythme vertical JOUÉ sur les 4 crans R4 (tight/base/loose/grand, pas du 96 px uniforme, P3-2) ; alternance paper/paper-2/ink + paper-3 rare (P3-1) ; espacements = crans `--section-*` uniquement (gate `check-section-rhythm`) ; wow sobre = micro-interactions data-reveal existantes + images lot 1 (docs/38) cadrées par la charte print, PAS d'effet gratuit.

## §6 · Recomposition HOME + process d'audit visuel itératif (directive Simon 2026-06-10)

### 6.1 Principe directeur : 1 information = 1 représentation

Chaque élément visuel doit SERVIR le contenu (apporter une information, une preuve ou une affordance), sinon suppression. Cas d'école pointé par Simon : l'Acte II « Pyramide d'engagements » de la home présente LA MÊME info 3 fois (timeline 4 jalons Cartographier/Câbler/Orchestrer/Industrialiser + barre de segments I-IV + cards I-IV) : 3 habillages, 0 information nouvelle. La cible : UNE représentation (la plus forte), les deux autres supprimées ou porteuses d'une information NOUVELLE (durées, livrables, jalons de facturation). Ce principe s'applique à la home, aux pages services et à tous les templates.

### 6.2 Recomposition home : section par section, TOUT sauf le hero

Le hero home est intouchable (modèle du site, docs/39 §excellent, hors P1-5 mobile). Tout le reste est recomposé via la grille 6.3 : incohérences entre actes, éléments décoratifs non fonctionnels, répétitions inter-sections (la promesse redite par 3 sections différentes compte AUSSI comme doublon). Un worker dédié capture déjà la home section par section : ses livrables alimentent directement V-F2.

### 6.3 Grille d'audit standard (4 axes, applicable à chaque page : home, services, templates)

1. **Verdict par section existante** : garder / fusionner / recomposer / supprimer, avec détection des redondances (1 info = 1 représentation) et du décoratif non fonctionnel.
2. **Sections MANQUANTES** du point de vue narration de conversion B2B + patterns des vainqueurs Awwwards : preuve sociale incarnée, démonstration concrète, traitement des objections, ancrage prix, point de vue tranché. Chaque manque est mappé vers le catalogue existant (147 types) ou devient une demande de création (4 touchpoints).
3. **Gap qualité Awwwards par section gardée** : micro-interactions, tension typographique, rythme des fonds, détails éditoriaux, sensation de scroll. Concret et actionnable, pas « améliorer le design ».
4. **Bilan structurel** : séquence cible avec rôle narratif par slot + slots où le catalogue n'a PAS de section à la hauteur = backlog DS priorisé (s'inscrit dans la croissance post-consolidation, doctrine docs/37 A8).

### 6.4 Process obligatoire : screenshots conservés dans le repo

- Captures section par section dans **`docs/visual-audit/<page>/NN-slug.jpeg`** + **`README.md`** de diagnostic par page (la grille 6.3 remplie, verdicts sourcés screenshot par screenshot).
- Itératif : re-capture après chaque vague de recomposition, diff visuel avant/après dans le même dossier (suffixe `-v2`), trace conservée (jamais d'écrasement de la v1 tant que la page n'est pas validée).
- C'est le pendant STRUCTUREL du GF-1 (qui reste exigé par ailleurs : screenshot above-fold + getComputedStyle sur preview avant merge).

## §7 · Plan de vagues V-F1..V-F8

Chantiers en cours à NE PAS dupliquer : **R6** (extinction templates : purge stubs catch-all, bodies Offres/Tech, fusion ListIndex+Utility, ConversionFunnel composable, hubs d'index : EN COURS par un autre worker) · **R7b** (UI hub par besoin) · fixes contenu docs/39 vague 1 · **`feat/images-pipeline`** (16 webp lot 1 générés, wiring à venir) · worker captures home.

| Vague | Contenu | Dépend de | Couvert ailleurs | Critère GF-1 |
|---|---|---|---|---|
| **V-F1 · Nettoyage final** | §1 : purge 3 collections archivées + 34 MDX migrés/archivés + dossier newsletter + collection pages + route bienvenue/[...slug] ; §2 : suppression /archive, /agence/hero-lab, brain-circuit/cookbooks/livre-blanc .astro vers MDX ; 301 ×2 ; `src/data/guarantees.ts` | rien (R6 purge les stubs catch-all : se synchroniser, pas de collision) | stubs + templates morts = R6 | build 0 erreur + gates verts + diff `dist/` nul hors pages supprimées + 404/301 vérifiés sur preview |
| **V-F2 · Recomposition HOME** | §6 : grille 4 axes sur chaque section (sauf hero), suppression des triples représentations (Acte II), séquence cible, exécution composition | livrables worker captures | captures = worker en cours | `docs/visual-audit/home/` complet avant/après + GF-1 above-fold 1440/390 + cohérence inter-sections (0 info répétée) |
| **V-F3 · Landing site-web-ia parfaite** | §4.1 : rebuild composable 8 slots, footer FOOTER_COLS, absorption site-web-ia.astro vers MDX, retrait liste dev Footer | V-F1 (guarantees.ts) ; F6 si R6 ne l'a pas pris | F6 (offres .astro vers MDX) reporté à R6 : vérifier, sinon l'inclure ici | GF-1 visuel + grille 6.3 remplie (`docs/visual-audit/landing-site-web-ia/`) + clic footer vers landing vers tunnel |
| **V-F4 · Tunnel 4 steps parfait** | §4.2 : étalon site-web-ia, élagage tunnels orphelins, label depuis l'offre, standards par step | V-F3 (landing en tête de tunnel) | types tunnel-step-* = Wave 1.6 faite | parcours Playwright steps 1-4 + soumission step 4 write-read + 0 step orphelin au build |
| **V-F5 · Secteurs = listings facettés + templates service** | §2 décision (b) : section cas facettée sur les 3 pages secteurs + breadcrumb secteur sur les cas + 301 fintech ; §4.3 : 3 archétypes offres (P1-7) | R7a (mergée) ; coordonner avec R7b (hub solutions) | dé-clonage = docs/39 P1-7 ; data = R7a | GF-1 par secteur + cohérence inter-surfaces (secteur liste exactement les cas dont la facette le cite) |
| **V-F6 · Étiquetage catalogue** | §3 : champ usage, badges design-system/preview/components, filtre, gate manifest | V-F1 (catalogue stabilisé) | manifest live/catalogue-only existant | badge visible (screenshot) + counts manifest == grep consumers (assertion script) |
| **V-F7 · Passe Awwwards par type de page** | §5 : exécution docs/39 (P1 restants, P2, P3) + grille 6.3 sur offres/cas/hubs/secteurs + wiring images lot 1 (docs/38, usages prévus) | V-F2..V-F5 (structure stabilisée avant le polish) | mesures + correctifs = docs/39 ; images = branche feat/images-pipeline | GF-1 par vague docs/39 + `docs/visual-audit/<page>/` par page traitée + fold ≥ standards §5 |
| **V-F8 · Extension motion (non prioritaire)** | §8 : pilote 1 page signature, gated perf | V-F7 fini + PageSpeed mesuré ≥ 97 avant | rien | PageSpeed mobile ≥ 97 APRÈS + reduced-motion vérifié + 0 CLS |

Discipline : 1 vague = 1 branche/worktree, gates verts, GF-1 preview avant merge, SR par vague (inchangé docs/37 §3). V-F1 est lançable immédiatement (coordination R6 sur le seul point stubs).

### État d'avancement V-F (2026-06-11, nuit autonome)

GitHub `main` = `0e92360` (5 commits batchés, EN ATTENTE de déploiement, blocker quota Vercel Hobby, cf `tasks/ORCH-STATE.md`). Prod sert encore `f17d324`.

- **V-F6 · Étiquetage catalogue : FAIT** (`e8f9816`). Champ dérivé `usage` (`library-manifest.ts`), badges site/library sur design-system + preview + components, filtre Tout/Utilisé/Bibliothèque, gate `check-usage-manifest`. Counts 51 site / 96 library / 147 total. GF-1 prod-build PASS (badges, filtre, badge site accent-2 5.57:1).
- **V-F1 (partiel) · `/archive` traité** (`cbed3dc`) : plutôt que supprimer le lien footer, une vraie page « Plan du site » bilingue a été créée (`src/pages/plan-du-site.astro` + EN), dérivée de `sitemap.ts` (93 liens, 0 inventé). Reste V-F1 : purge des 3 collections archivées + 34 MDX + migrations `.astro` vers MDX.
- **Hors V-F (directives docs/43) : dark systématique + 10 standards B2B-SaaS + polish** livrés (`7f60958` align tech-models-table + badge pricing AA, `0e92360` colonnes Coût/Contexte). Catalogue à **147 types**.
- **Liens morts user-facing corrigés** (`cbed3dc`) : `/ressources/cas` vers `/cas`, `/legal/privacy` vers `/agence/trust-center`, twitter vers x. Restent des décisions produit (7 sous-offres conseil sans page, `/mon-compte`, index EN solutions « coming soon ») en attente Simon.
- **À venir** : V-F2 (home), V-F3 (landing site-web-ia, §4.1), V-F4 (tunnel, §4.2), V-F5 (secteurs facettés, §2), V-F7 (passe Awwwards), V-F8 (motion). V-F3/V-F4 démarrent avec le déploiement débloqué (GF-1 prod) et cadrage copy.

## §8 · Extension future : islands React motion (lenis / gsap / three)

Cadrage de décision, PAS un chantier : ne se lance que si PageSpeed mobile ≥ 97 est PRÉSERVÉ (mesure avant/après sur les pages touchées, budget JS ajouté ≤ 60 KB gz par page, hydratation `client:visible` uniquement).

- **Où ça vaut le coup** : pages signature uniquement (home hero ambiance, manifesto bascules de fond scrollées, atlas/console qui sont déjà des concepts « démo ») + éventuellement 1-2 démos du catalogue DS (vitrine du savoir-faire pour la gamme SaaS Phase 6). Lenis (smooth scroll discret) est le meilleur ratio wow/poids ; gsap ScrollTrigger pour 1-2 séquences narratives ; three réservé à UNE pièce maîtresse si un jour elle a un rôle (pas avant).
- **Où ça ne vaut PAS le coup** : pages de conversion (landing, tunnels, offres : le motion ralentit la décision), éditorial (blog, glossaire, légal), hubs. Le data-reveal CSS existant y suffit.
- **Conditions absolues** : progressive enhancement (site 100 % fonctionnel sans JS, SSG intact), `prefers-reduced-motion` respecté, 0 CLS, DA inchangée (le motion anime l'existant, n'introduit ni couleur ni forme hors charte), gates verts. Skills disponibles le moment venu : gsap-scrolltrigger, motion-framer, lightweight-3d-effects.
- **Décision** : V-F8 en dernier, pilote sur UNE page, mesure, puis verdict d'extension. Si le pilote coûte ne serait-ce qu'1 point PageSpeed non récupérable : on s'arrête là.
