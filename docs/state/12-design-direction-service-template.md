# 12 : Direction design consolidée — Template service §16 (doc de pilotage D4)

> Issu du brainstorm multi-agents (4 lentilles : choré scroll/bridges · layouts anti-hauteur · DA/visuel · rétention UX → synthèse). Daté 2026-06-18.
> Décisions Simon : **Registre A line-art DS partout** (générer le manquant en line-art, recolorer 2-3 illustrations B fortes pour l'éditorial) · **prune des ~15 illustrations inutilisables**.
> Grounding : template §16 figé (16 slots), 6 primitives compositionnelles (`docs/state` audit), manifeste assets `11-asset-illustrations-manifest.md`.

## 1. Direction en 5 lignes

Le scroll devient un **récit de ~6 chapitres**, pas un empilement de 16 sections. On tue la hauteur sur deux fronts : (1) **compositionnel** : chaque slot se densifie/horizontalise via 6 primitives CSS pures (auto-grid, asym-split, quantity-grid `:has()`, bento span-driven, `@container`, alternating-flow), recomposant sans trous selon le nombre d'enfants ; (2) **chorégraphique** : 5 bridges (`data-expand`/`data-morph`/sticky/overlap-parallax) cousent les frontières inter-sections, rythme de reveal à 3 intensités (calme/moyen/PIC), effets coûteux réservés à 5 climax espacés. **Visuel** = line-art `currentColor` (Sumie) qui se dessine au scroll (`view()`), s'inverse gratuitement aux sections ink, 1 seul point terracotta par image. **Rétention** : mini-nav sticky chapitrée + CTA persistant unique + progressive disclosure + `[data-density='compact']`. **0 nouveau token DS, 0 nouveau module JS.**

## 2. Spec par slot (5-10 + hero/architecture/études)

- **Slot 1 Hero (ink)** : split-1-3 ou centré (variation A) · `reveal-split-letter` H1 (1×/page) + count-up 4 stats + grille fantôme · motif Sumie lg draw-on-scroll · sort via B1 container-expand.
- **Slot 5 Ce qu'on met en place (paper-2, IMAGE)** : P2 asym-split média sticky / liste + P6 alternating si N≥4 · B1 container-expand OU média sticky · schéma dispositif line-art lg (à générer) · −50 % hauteur.
- **Slot 6 Livrables (paper)** : P1 auto-grid + P3 quantity-grid anti-orphelin (remplace `pgCols` JS de `FeatureGrid.astro:30`) · reveal-stagger + disclosure hover · pictos sm · −66 % sur 6 items, 0 cellule orpheline.
- **Slot 7 Architecture (ink)** : P4 feature-tile span-driven + `grid-auto-flow:dense` (remplace `BentoGrid.astro:75-92` figé) · B3 sticky-scrub (diagramme pin + entrées reveal-stagger) · diagramme line-art crème/noir draw-on-scroll · −50 %.
- **Slot 8 Process (paper-2)** : P6 alternating-flow + P5 `@container` (premier usage repo) · draw-on-scroll du fil + disclosure · −40 %.
- **Slot 9 Mesure (paper, IMAGE)** : P2 asym-split 2-1 + P4 mini-mosaïque KPI · count-up + draw courbe · B4 overlap+parallax vers 10 · promouvoir `placeholder-dashboard-site-web-intelligent.svg` · −43 %.
- **Slot 10 Stack (ink, LOGOS)** : P1 auto-grid + P3 quantity-clamp `--logo-min` · logos masqués currentColor, 0 faux logo · −33 %.
- **Slot 13 Études (ink, IMAGE)** : header line-art lg crème/noir · B4 overlap depuis 12 · reveal-curtain · réutiliser `cas/*.webp` Registre A.

## 3. Système de bridges retenu

| Bridge | Frontière | Mécanisme | Priorité |
|---|---|---|---|
| B1 container-expand | 1→2 (primaire) ; 5 card | `[data-expand]` + `.container-expand` | P1 (effet « waouh » réclamé) |
| B2 scroll-morph | 3→4 | `[data-morph]` + from/to | P2 — **risque mobile, arbitrage Simon (variation D)** |
| B3 sticky-scrub | 7↔8 | `.sticky-editorial data-sticky-track=2` | P1 (supprime 1 frontière) |
| B4 overlap+parallax | 9→10 ; 12→13 | `margin-top` négatif + `[data-par]` | P2 |

Cadence anti-fatigue : Hero split-letter → calme reveal-fade → stagger + sticky 7↔8 → count-up + overlap → stagger/fade → FAQ minimal → CTA zoom-in clôture. **Jamais 2 PICS consécutifs.**

⚠️ B2 morph 3→4 cache le contenu A sur mobile (`scroll-morph.css:312`). Reco = garder 3→4 en 2 blocs empilés + reveal-fade (variation D, à confirmer Simon).

## 4. Build list D4 (5 phases)

**Phase 1 — Primitives CSS** (socle, 0 dépendance) : `layouts.css` `[data-layout=split-1-2/2-1]` · `grid.css` `.section-cq{container-type}` + `.qgrid:has(...)` + `@supports not selector(:has)` · `.bento-fluid` + `.span-lg/wide/sm` · utilitaire `.draw-on-scroll` (`animation-timeline:view()` + fallback reveal-blur-clip + reduced-motion).
**Phase 2 — Refondre les figés** : `FeatureGrid.astro:30` (retirer pgCols JS→P3) · `BentoGrid.astro:75-92` (→ bento-fluid P4) · `StatsBento` (P4 + count-up) · `FeatureSplitMedia` (P2 asym + sticky) · `LogoWall.astro:79` (P3 clamp).
**Phase 3 — Câbler bridges** : B1 hero+slot5 · B3 architecture slot7 · B4 9→10 & 12→13 · B2 après arbitrage.
**Phase 4 — Rétention** : mini-nav sticky chapitrée + CTA persistant · `[data-density=compact]` slots secondaires · kickers numérotés + hairline terracotta · progressive disclosure.
**Phase 5 — GF-1** : Playwright prod, revealedCount===total, `--expand` 0→1, sticky effectif, 0 erreur console, mobile états finaux.

## 5. Points de VARIATION à présenter à Simon

- **A Hero** : (1) motif Sumie line-art plein cadre draw-on-scroll [reco] · (2) split média+texte illustration latérale · (3) centré minimal stats, visuel discret.
- **B Architecture** : (1) bento mosaïque dense P4 [reco] · (2) diagramme sticky-scrub narratif (+2×100vh) · (3) les deux combinés.
- **C Bridge signature** : (1) container-expand [reco, réclamé] · (2) sticky-scrub · (3) overlap+parallax sobre.
- **D Morph 3→4** : (1) 2 blocs empilés + reveal-fade [reco sûr] · (2) scroll-morph (cache A mobile) · (3) morph additif.

## 6. Visuels à générer (SVG line-art DS prioritaire, Sumie viewBox 480×320, currentColor + 1 accent terracotta ; GPT Image 2 réservé scènes figuratives palette DS imposée)

| Prio | Asset | Slot |
|---|---|---|
| P1 | Schéma « dispositif / comment on travaille » (avant→pendant→après) | 5 |
| P1 | Set 3-4 pictos « problème » | 3 |
| P1 | Set 4-6 pictos « livrables » | 6 |
| P2 | Frise de process + pictos d'étape | 8 |
| P2 | Diagramme architecture crème/noir (étendre `ArchitectureDiagram`) | 7 |
| P2 | Glyphes ✓/✕ + pictos cas d'usage | 4, 11 |
| — | Promouvoir `placeholder-dashboard-site-web-intelligent.svg` (animer) | 9 |
| — | Réutiliser motifs secteur Sumie, `cas/*.webp`, logos masqués | 10/12/13 |

+ capacités transverses à créer : utilitaire `draw-on-scroll` + helper séparateur SVG paper→ink.

## Phase 3 : câblage des effets morts (spec exécutable, 2026-06-18)

Constat vérifié (GF-4, `rg`) : `[data-expand]` et `[data-morph]` ont **0 consumer dans le markup**. CSS (`.container-expand`, `.scroll-morph__from/__to` dans `scroll-reveal.css:248-278`) + JS (`container-expand.ts`, `scroll-morph.ts`) + init (`Base.astro:176-186`) sont prêts. Seul le câblage markup manque, d'où « je vois pas les effets ».

Contrats minimaux :
- Container Expansion : `class="container-expand" data-expand` sur l'élément (reçoit `--expand` 0→1, interpole marge/radius/scale). Neutralisé mobile <=768px + reduced-motion.
- Scroll Morph : parent `class="scroll-morph" data-morph` + 2 enfants superposés `.scroll-morph__from` (A) / `.scroll-morph__to` (B).

Décision de câblage (catalogue-pur, opt-in déclaratif, 0 markup orphelin) :
1. **Container Expansion = opt-in générique par frontmatter.** Ajouter `expand: z.boolean().optional()` dans `sectionWithAnchorSchema` (`sections.ts:3937`, le wrapper d'intersection qui porte déjà `anchor` sans toucher les 151 variantes). `SectionsRenderer` enveloppe le `<Component>` dans `<div class="container-expand" data-expand>` si `section.expand === true`. 1 point de câblage, 0 churn composant, opt-in par instance dans le `sections[]` du flagship.
2. **Scroll Morph = section-bridge dédiée** (2 enfants from/to = contenu spécifique) à composer en D6 sur le flagship (ex. transition « avant / après » entre 2 slots du §16), pas un opt-in générique.

⚠️ Séquence : le point 1 touche `sections.ts` donc s'exécute APRÈS réconciliation du lot 2b (qui édite `sections.ts` en parallèle). Re-lire le `sectionWithAnchorSchema` réconcilié avant d'ajouter `expand`.

## D6 : blueprint de composition flagship (§16, 16 slots), 2026-06-18

Recomposition de `src/content/services/integrateur-claude.mdx` sur l'ordre §16, avec alternance Paper↔Ink (ink ancre les slots 1/7/10/13/16), bridges expand, images line-art déjà générées, sections content-driven de la Phase 2. Le contenu existant (validé) est réutilisé, réordonné et complété (slots manquants 4/5/7/11/12/14).

| # | Slot §16 | Type de section | Fond | Effet/bridge | Image line-art | Source contenu |
|---|---|---|---|---|---|---|
| 1 | Hero | hero-conversion-funnel `variant:split` | ink | exit container-expand vers 2 | media latéral (worker D6-Hero) | existant (slot 1) |
| 2 | Définition courte (LLM) | direct-answer | paper | reveal calme | · | existant |
| 3 | Problèmes | problems-grid (content-driven) | paper-2 | reveal-stagger | 4 `probleme-*.svg` en pictos | existant |
| 4 | Pour qui / pas pour qui | commitments-grid OU versus 2-col | paper | reveal | glyphes ✓/✕ | à rédiger (court) |
| 5 | Ce qu'on met en place | feature-split-media `layout:split-1-2` | paper-2 | `expand:true` + média sticky | `dispositif-flow.svg` lg | existant (tech-positioning) |
| 6 | Livrables | deliverables-grid (content-driven) | paper | reveal-stagger + disclosure | 6 `livrable-*.svg` pictos | existant |
| 7 | Architecture | bento-grid dense (span) | ink | reveal-stagger | (diagramme P2, futur) | existant (tech-positioning) |
| 8 | Process | method-timeline | paper-2 | draw-on-scroll du fil | (frise P2, futur) | existant |
| 9 | Mesure & analytics | stats-bento (vedette span-wide) | paper | count-up + overlap vers 10 | `placeholder-dashboard-*.svg` | existant |
| 10 | Stack | logo-marquee/logo-wall (clamp) | ink | · | logos masqués currentColor | existant |
| 11 | Cas d'usage liés | case-card-grid OU maillage cards | paper-2 | reveal | · | maillage (cas-usages) |
| 12 | Secteurs liés | maillage cards | paper | reveal | · | maillage (secteurs) |
| 13 | Études de cas | case-card-grid | ink | overlap depuis 12 | header line-art | existant |
| 14 | Ressources liées | maillage cards | paper-2 | reveal | · | maillage (guides/outils) |
| 15 | FAQ | faq-two-column | paper | reveal minimal | · | existant |
| 16 | CTA | footer-cta-band | ink | reveal-zoom-in clôture | · | existant |

Extras à replacer (hors séquence §16 stricte, conservés pour E-E-A-T/conversion) : `author-byline` + `about-story-split` (bloc auteur/cabinet, avant FAQ), `pricing-cards` (paliers, après livrables ou avant CTA), `versus-competitors` (peut servir le slot 4 « pas pour qui » ou un comparatif court). Maillage interne §16 obligatoire = slots 11/12/13/14 pointent vers les collections cas-usages/secteurs/etudes-de-cas/ressources.

Règle d'alternance : jamais 2 ink consécutifs ; ink = climax (hero, architecture, stack, études, CTA). Expand réservé au slot 5 (B1) ; pas d'expand en cascade (1 effet « waouh » par chapitre, doc §3 cadence).

⚠️ Séquence D6 : ce fichier MDX est en cours d'édition par le worker D6-Hero (slot 1). Composer les slots 2-16 APRÈS retour du worker (collision même fichier). Re-lire le frontmatter réconcilié avant d'éditer.

## Garde-fous tenus
0 nouveau token DS · 0 nouveau module JS (effets câblés `Base.astro:176-217`) · reflow-safe (transform/opacity/shadow/stroke hors-flux) · reduced-motion + mobile neutralisés CSS · ordre DOM = ordre lecteur (WCAG 1.3.2) · visuels honnêtes E-E-A-T (0 faux logo/screenshot, Registre A privilégié).

## Reprise post-crash 2026-06-19 (flotte d'agents OOM RAM)

> Snapshot de reprise. La flotte de la nuit du 2026-06-19 (~11 workers Opus parallèles, chacun avec build + chromium GF-1) a demandé plus de 50 Go RAM sur 24 Go physiques. La session a crashé. Bilan : ce qui a survécu (committé) vs ce qui reste.

### État de référence
- Branche à garder : `feat/v7-service-template` (HEAD `34062ac`). Sur-ensemble STRICT de `feat/v7-fondations` (fondations + le seul commit Phase A). `git log fondations..service-template` = 1 commit, l'inverse = vide. `feat/v7-fondations` est donc redondante, supprimable après vérif.
- Build d'intégrité : `npx -y pnpm@9.15.0 build` => `Complete!` (exit 0, ~784 pages). Les 4 touchpoints DS sont synchrones, Zod valide, gate no-emdash OK.
- Working tree propre : tout le travail committé a survécu.

### Missions committées (récupérées)
| Mission (agent) | Commit | Livrable |
|---|---|---|
| M1 import + curation assets (asset-curator) | `6db134b` + `3def870` | 28 illustrations gardées (14 écartées, manifeste 11 §4.2) + `ds/` (56 recolorées ink/paper) + manifeste `docs/state/11` |
| M4 primitives CSS + M5 line-art (css-primitives) | `a0777d0` | `.auto-grid/.qgrid/.bento-fluid/.span-*` (grid.css), `[data-layout=split-*]` (layouts.css), 11 SVG `public/images/line-art/` |
| M6+M7 sections content-driven (phase2a/2b) | `d6df495` | FeatureGrid, LogoWall, BentoGrid, StatsBento, FeatureSplitMedia recomposés |
| M8/M9 Container Expansion (phase3-bridge-expand) | `20b4541` (+ spec `aff0701`) | opt-in `expand:true` dans SectionsRenderer + schéma |
| M10 3 heros (d6-hero-variants) | `8ed4325` | `variant: split\|sumie\|minimal` ; `split` LIVE flagship slot 1 |
| M11 câblage line-art (lineart-wiring) | `14ee255` | 9 `illustration_src` câblés (3 problems + 6 deliverables), inline via `src/assets/line-art/` |
| M13 Phase A (phaseA-components) | `34062ac` | FeatureZigzag enrichi + `src/data/logos.ts` + primitives adaptatives |

M2 (audit compo read-only) et M3 (brainstorming design) etaient sans ecriture : leur sortie a nourri ce doc 12 (`ededa0b`, `aff0701`). Pas de livrable fichier propre.

### RESTE A FAIRE (perdu au crash, jamais committé)
1. ✅ **FAIT (session 2026-06-20, commit `5624d06`)** — **Recomposition flagship §16 (D6)** : `integrateur-claude.mdx` réordonné sur l'ordre §16, 15 sections + slots ajoutés (4 pour-qui `versus-competitors`, 5 dispositif `feature-split-media` `expand`, 7 architecture `bento-grid` ink, 12/14 maillage secteurs/ressources). Slot 11 cas-usages OMIS (collection vide, anti-404). Invariant ink vérifié (5 climax, jamais 2 consécutifs).
2. ✅ **FAIT (session 2026-06-20)** — **GF-1 visuel complet** : flagship (H1/CTA opacity 1 transform neutre, 19 sections, 16 line-art chargés, 0 orphelin, expand `--expand=1.0`, 0 console) + GF-1 non-régression socle v7 partagé (home/offres/previews bento/stats/hero-hub, 0 régression). Build `Complete!`.
3. **Câblage des 28 illustrations recolorées** (`ds/`) : manifeste 11 §5.5 le réserve à une phase pilotée par slot avec Simon (top 8 prioritaire). **Inclut le diagramme line-art du slot 7 bento (prévu §16, encore absent).** TOUJOURS À FAIRE (pilotage Simon).
4. **Décision Simon** : merger `feat/v7-service-template` → `main` (apres GF-1 preview ✅ fait) puis supprimer `feat/v7-fondations`. EN ATTENTE go Simon.

### Lot qualité pré-merge livré (session 2026-06-20, audit 3 angles design/SEO-GEO/copy)
Audit multi-agents → verdict GO-avec-réserves (0 P0). Réserves P1+P2 traitées :
- ✅ P1 copy (`c72d58e`) : `cabinet`→`studio` (10 occ Waimia ; ligne 437 « Cabinets »=cible client préservée) + maillage secteurs → `/secteurs` (anciens slugs noindex retirés).
- ✅ P1 design (`5274f1c`) : bento slot 7 clamp hauteur (tuile 673→299px) + `versus-competitors` reflow card-per-ligne mobile (0 overflow, colonnes contraste visibles). 0 nouveau token.
- ✅ P2 SEO/GEO : `astro.config.mjs` llms-txt `promote` corrigé (`solutions/**` PÉRIMÉ → silos réels acquerir/operer/piloter/services/secteurs ; description « agence »→« studio IA ») + JSON-LD `Service` `serviceType`/`priceRange`/`priceSpecification` (override par page via frontmatter `seo:`, non-régression autres pages OK) + meta desc flagship différenciée + maillage « site web intelligent ».
- ⚠️ Résidus signalés (non bloquants) : contenu EN systémique (30 fichiers + `src/data` → chantier transverse séparé, ne pas amorcer sur le seul flagship) · `priceRange` hors-domaine schema.org sur `Service` (toléré Google, `priceSpecification` valide ajouté en parallèle) · 16 liens `/solutions` résiduels dans le CORPS d'autres pages (hors flagship, à nettoyer un autre jour).

### GARDE-FOU ANTI-CRASH (prochaine flotte)
24 Go RAM physiques. Un worker Opus + chromium headless + build node consomme ~4-5 Go au pic. **Plafond sûr : 3 workers parallèles MAX** (2 si build+chromium simultanés). Échelonner par vagues, surveiller `memory_pressure` entre vagues, JAMAIS plusieurs `pnpm build` en parallèle (OOM Node connu). Pour plus de 6 sous-tâches, préférer le tool `Workflow` (slots cappés) à N `Agent` lancés d'un coup. Committer chaque mission finie (rien perdu si la RAM lâche).
