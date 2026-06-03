# 11 — BRIEF D'EXÉCUTION : Fusions évidentes (priorité 2)

> **Statut** : prêt à lancer **dès que `chore/ds-cleanup` (DS resserré, priorité 1) est mergé sur `main`**.
> **Auteur des décisions** : orchestrateur Opus (front-loading rule 41 §token-economy — le worker exécute, ne décide pas).
> **Sources** : `07-sections-heros.md` (héros 26→15) + `04-organisms.md` (dédup 13). Lecture-seule confirmée.
> **Garde-fou transverse** : chaque vague = GF-1 (Playwright screenshot above-fold + `getComputedStyle` H1/CTA opacity≠0/transform neutre + 0 erreur console) sur la **preview Vercel** ou le serve-dist local parité-prod, AVANT merge. Branches isolées `feat/<scope>`, jamais `git add -A`.

---

## 🎚️ Principe de fusion (NON négociable — anti-régression)

**Fusion = 1 composant générique + N entrées registry → variantes. AUCUN type-id supprimé.**

- Le catalogue **garde** ses N types (la bibliothèque « garde tout », vision Simon) mais ils **partagent le même composant** paramétré par `variant` → DA convergée, moins de classes CSS, 1 source de vérité par famille.
- Chaque consommateur live (template/page) est **migré explicitement** vers le composant générique avec ses props variantes — jamais laissé pointer vers un composant supprimé.
- Tant que le composant générique n'a pas atteint la **parité pixel** (GF-1) sur TOUS les consommateurs d'une famille, l'ancien composant reste en place (rollback trivial).

> Conséquence : la réduction « 26 → 15 » se mesure en **nombre de composants `.astro` distincts**, pas en nombre de type-ids. Le tri final des type-ids (lesquels masquer dans l'UI biblio) = priorité 3 (curation Simon via `library-manifest`).

---

## 🌊 WAVE H — Fusions héros (ordre RISQUE CROISSANT)

### H1 — `HeroService` (TRIVIAL) — fusionne 2

| | |
|---|---|
| **Composant cible** | `src/components/sections/HeroService.astro` (renommé/refondu depuis `HeroServiceDetail.astro`) |
| **Absorbe** | `HeroServiceDetail` + `HeroServiceMasthead` |
| **Type-ids conservés** | `hero-service-detail`, `hero-service-masthead` (2 entrées registry → même composant) |
| **Variante** | `metrics?` présent ⇒ rendu proof-bar ; absent ⇒ masthead simple. `topPad?` optionnel. |
| **Props unifiées** | `{ service_num, h1_fr, h1_en, lede_fr, lede_en, metrics?[{value, label_fr, label_en}], topPad? }` |
| **Consommateur** | `src/components/templates/ServiceDetailTemplate.astro` (usages détail **+** variante simplifiée l.131-138) |
| **Risque** | Très bas — `ServiceMasthead` ≡ `ServiceDetail` sans `metrics?`. |
| **GF-1** | preview `/preview/hero-service-detail` + `/preview/hero-service-masthead` + page ServiceDetail live (1 route). |

### H2 — `HeroStats` (TRIVIAL) — fusionne 2

| | |
|---|---|
| **Composant cible** | `src/components/sections/HeroStats.astro` (depuis `HeroHubStats.astro`) |
| **Absorbe** | `HeroHubStats` + `HeroPillarHub` |
| **Type-ids conservés** | `hero-hub-stats`, `hero-pillar-hub` |
| **Variante** | `useKeyMetric?: boolean` — `true` ⇒ délègue les cellules à la molécule `KeyMetric` (comportement PillarHub) ; `false`/absent ⇒ cellules inline (comportement HubStats). `ledeDropCap?` optionnel. `stats` requis côté HubStats, optionnel côté PillarHub → typer `stats?` + fallback vide. |
| **Props unifiées** | `{ meta_kicker_fr, meta_kicker_en, hub_num, h1_fr, h1_en, lede_fr, lede_en, stats?[{value, label_fr, label_en, emphasis?}], ledeDropCap?, useKeyMetric? }` |
| **Consommateurs** | `HubTemplate.astro` (`.hub-masthead` → PillarHub) + `src/pages/offres/conseil.astro` (HubStats) + `HubTemplate` (HubStats). ⚠️ grep `hero-pillar-hub`/`hero-hub-stats` pour la liste exacte avant migration. |
| **Risque** | Bas — mêmes props, diff = mode de rendu des cellules. |
| **GF-1** | preview des 2 types + page `offres/conseil` live + une page Hub live. |

### H3 — `HeroMastheadGeo` (MODÉRÉ) — fusionne 3

| | |
|---|---|
| **Composant cible** | `src/components/sections/HeroMastheadGeo.astro` |
| **Absorbe** | `HeroOfferDetail` + `HeroSector` + `HeroTechLayer` |
| **Type-ids conservés** | `hero-offer-detail`, `hero-sector`, `hero-tech-layer` |
| **Variantes** | `geoShape: 'circles' \| 'rects' \| 'triangles'` (Offer/Sector/Tech) + `labelKind: 'breadcrumb-tier' \| 'dept' \| 'layer'`. Props spécifiques encapsulées : `tags?` (Sector), `layer_type?` (Tech), `breadcrumb_href?`/`breadcrumbCurrent?` (Offer). |
| **Props unifiées** | voir `07-sections-heros.md` §Fusion 3 (bloc complet l.535-548). |
| **Sous-grille partagée** | `1.4fr / 1fr` + lead italique + CTA ink-button (identique aux 3). |
| **View Transitions** | préserver `transitionId`/`cardTransitionId` (Offer + Tech les utilisent ; Sector non → optionnels). **Pattern VT confirmé 6× (cf CLAUDE.md)** : `hero-h1-{transitionId}` + `hero-img-{transitionId}` (SVG géo) + `card-{cardTransitionId}`. |
| **Consommateurs** | `OffresDetailTemplate.astro` · `SolutionsDetailTemplate.astro` (`.sol-hero`) · `TechnologiesDetailTemplate.astro`. |
| **Risque** | Modéré — la divergence est le SVG (forme) + le label. Encapsuler chaque forme SVG dans un sous-bloc conditionnel par `geoShape`. **Attention au delta ~32px déjà signalé** sur Offres/Tech (row-gap `.g12--full` legacy) — viser parité ou standardisation **documentée**. |
| **GF-1** | preview des 3 types + 1 page de CHAQUE template live (Offres détail, Solutions détail, Tech détail) — VT à vérifier (navigation carte→détail sans flash). |

### H4 — `HeroCentered` générique (COMPLEXE) — fusionne 8

| | |
|---|---|
| **Composant cible** | `src/components/sections/HeroCentered.astro` (noyau = `HeroHubMasthead`, le plus minimaliste) |
| **Absorbe** | `HeroCentered` + `HeroHubMasthead` + `HeroUtilityMasthead` + `HeroHubListing` + `HeroProblemIndex` + `HeroAcademyHub` + `HeroCourse` + `HeroDetailMenu` |
| **Type-ids conservés** | les 8 |
| **Props cumulées (tout optionnel sauf h1)** | voir `07` §Fusion 1 (l.504-513) : `kicker?`, `cta_primary?`, `cta_secondary?`, `stats?` (AcademyHub), `pills?` (Course), `canonical?` (ProblemIndex), `meta_kicker?`/`detail_num?` (DetailMenu/Course type label), `decoration?: 'circles'\|'geo-rects'` (HubListing/ProblemIndex), `align?: 'left'\|'centered'` (Utility), `topPad?`, `wrapMaxWidth?` |
| **NON absorbés (conserver séparés)** | `HeroEssay` (méta éditoriale + image + VT), `HeroLanding` (`--font-serif` + availability). |
| **Consommateurs LIVE (risque élevé — pages directes)** | `offres/index.astro` (HubMasthead) · `ressources/index.astro` (HubListing) · `solutions/index.astro` (ProblemIndex) · `EcoleHubTemplate` (AcademyHub) · `CourseDetailTemplate` (Course) · `DetailMenuTemplate` (DetailMenu) · `UtilityTemplate` (Utility) · design-system (Centered). |
| **Risque** | Élevé — 8 structures, props cumulées, **plusieurs pages d'index live**. Découper en sous-vagues de 2-3 héros, GF-1 après chaque. |
| **GF-1** | preview des 8 types + CHAQUE page d'index live (offres, ressources, solutions) + EcoleHub/Course/DetailMenu/Utility. |

**Résultat Wave H** : 26 composants héros → **4 génériques + 11 conservés = 15 composants** (−42 %), 26 type-ids préservés (curation UI = priorité 3).

---

## 🌊 WAVE O — Dédup organisms (LE PLUS RISQUÉ — wave dédiée, JAMAIS mélangée à Wave H)

> 13/21 organisms portent `// COPIE FIDÈLE` d'un type catalogué. La home FR+EN rend du bespoke alors que le jumeau data-driven existe. **`index.astro` = 12 migrations d'un coup = page la plus critique du site.**

### O0 — `ManifestoAccent` → cataloguer d'abord (PRÉ-REQUIS, non-migration)

- **Action** : créer le type `manifesto-accent` (OU variante `manifesto-block + variant:'accent'`) — 4 touchpoints (schema/demo/registry/composant). Fond `--accent` full-bleed, texte `--paper`.
- **Pourquoi en premier** : 2 pages live (`manifesto.astro` FR+EN) en dépendent ; aucun type existant ne le couvre → bloquant pour retirer l'organism.
- **Risque** : bas (ajout additif). GF-1 : preview du type + page `/manifesto` live.

### O1 — Organisms hors-home (FAIBLE risque, migrer en premier)

| Organism | Type cible | Page(s) consommatrice(s) |
|---|---|---|
| `FieldNotes` | `editorial-preview` | `atlas.astro` FR+EN |
| `WritingNotes` | `editorial-preview` (variante `sticky`) | `ressources/index.astro` (+ home — voir O2) |

- Migrer atlas + ressources d'abord (pages moins critiques que la home). GF-1 par page.

### O2 — Home `index.astro` FR+EN (RISQUE MAXIMAL — sous-vagues de 2-3)

12 organisms à remplacer par leur type catalogué :

| Organism | Type catalogué | Dataset source (déjà branché sur le twin) |
|---|---|---|
| `Hero` | `hero-home` | inline (minimap/proofs) |
| `WhyAIStalls` | `why-stalls` | `WHY_AI_STALLS` |
| `OperatingLayer` | `operating-layer` (section) | `consoleLines`/`attrs` inline |
| `Pyramid` | `maturity-pyramid` | `PYRAMID_TIERS` |
| `SixServices` | `services-grid` | `SIX_SERVICES` |
| `Cases` | `case-card-grid` | `CASE_FEED` |
| `HowWeShip` | `how-we-ship` (section) | `steps` inline |
| `FooterMarquee` | `marquee-band` | inline → prop `items[]` |
| `Departments` | `use-case-index` | `DEPARTMENTS_GRID` |
| `BookSession` | `cta-final` | inline |
| `WritingNotes` | `editorial-preview` | `FIELD_NOTES` |
| `SystemArchitecture` | `architecture-diagram` | inline SVG (porter en slot/prop) |

- **Méthode** : migrer **2-3 organisms par sous-vague**, build + GF-1 STRICT après chaque (la home est la page #1, ~90 % des consumers). **Préserver les View Transitions + counters animés (metrics-reveal) + reveals** — vérifier `getComputedStyle` opacity≠0 sur H1/metrics + `revealedCount === total`.
- **Points de vigilance cartographiés** : `Hero` a SVG signature + minimap 3×2 + 3 métriques (vérifier que `hero-home` les absorbe ou migration partielle) ; `Pyramid` a SVG asymétrique + `editorial-cell` (vérifier support `maturity-pyramid` AVANT) ; `SystemArchitecture` SVG inline (porter en slot).
- **Après parité GF-1 sur les 12** : retirer les organisms dupliqués correspondants.

### O3 — Retrait `Manifesto` (orphelin)

- `Manifesto.astro` (organism, fond paper) = **0 consumer live** (uniquement design-system preview). Le contenu actif = `sections/ManifestoBlock`. → **`DEL?`** : retirer après confirmation grep 0-import-live.

### Conserver bespoke (6 — NE PAS toucher)

`AtlasGrid` · `CookiesBanner` · `Offices` · `PersonaSwitcher` · `SigBand` · `Stub` (chrome/utilitaire/island, hors catalogue).

---

## 🧱 Politique de collision & branches

| Wave | Branche | Fichiers touchés | Collision avec ? |
|---|---|---|---|
| H1-H4 | `feat/hero-fusion` | `src/components/sections/Hero*.astro` + registry + schema + demos + templates consommateurs | ⚠️ registry/schema/demos = fichiers PARTAGÉS → **série** dans la branche, pas de worker parallèle sur 2 héros à la fois |
| O0-O3 | `feat/organism-dedup` | `src/pages/index.astro` (+en) + atlas + manifesto + ressources + retrait organisms | indépendant de Wave H **sauf** registry/schema (ManifestoAccent O0) → faire O0 avant ou après Wave H, pas pendant |

- **registry/schema/demos** sont les 3 goulots partagés → toute vague qui les touche s'exécute en **série**. Les composants `.astro` distincts ne collisionnent pas.
- Worker = T2 Opus (Codex out) si raisonnement résiduel élevé (parité pixel à juger) ; T3 Sonnet si je front-load des `old→new` exacts (rule 41 §Task-subagent-model). **Signal de bascule** : worker Sonnet qui thrashe → déporter le raisonnement sur Opus OU relancer worker Opus.

## ✅ Definition of Done (par wave)

1. `npx -y pnpm@9.15.0 exec astro check` → 0 errors.
2. `npx -y pnpm@9.15.0 build` → `Complete!`.
3. **GF-1** sur preview Vercel (ou serve-dist parité-prod) : screenshot above-fold + `getComputedStyle` H1/CTA (opacity≠0, transform neutre) + 0 erreur console + (si reveals) `revealedCount === total` + (si VT) navigation sans flash.
4. Commit sur la branche de la wave, **push, PAS de merge `main` sans GF-1 vert**.
5. Mise à jour `library-manifest` (priorité 3) : statut `MERGE→done` sur les type-ids fusionnés.
