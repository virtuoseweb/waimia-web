# 24 — Handoff reprise (session cloud 2026-06-02) · LIRE EN PREMIER avec docs/20

> État à la fin de la session cloud `claude/focused-bardeen-0GySr` (PR #1). Remplace temporairement
> docs/20 comme point d'entrée le plus à jour. Tout est **commité + poussé**. **Rien mergé sur `main`**
> (gate GF-1 Vercel non exécutable depuis le cloud + auto-merge OFF — voir §5).

## 0. MAJ 2026-06-02 — POINT CONSOLIDÉ (session cloud #1 + session locale #2) ⭐ LIRE EN PREMIER

### `main` A BOUGÉ : `7597e02` → `12ef26b` (PR #2 mergée) → `910968b` (template-clean)
La session locale #2 a transformé le repo en **template propre, connecté au repo config, prod saine** :
- **PR #2 mergée sur `main`** (`12ef26b` squash) : README standalone + CONTRIBUTING + CI (`.github/workflows/ci.yml`, build astro = gate dur) + **`CLAUDE.md`** + **`.claude/settings.json`** (marketplace `virtuoseweb/claude-config` + plugin `vw-guardrails`) + **`.mcp.json`** (playwright/context7).
- **Template clean** (`910968b`) : `tasks/` (notes process dev) untracké+gitignoré ; `audit-snapshots/` (−20 Mo) retirés ; `.env.example` complété (Upstash/ISR). Repo `is_template=true` (bouton « Use this template »).
- **Vercel nettoyé** : legacy `waimia` + `waimia-v2` supprimés → 2 projets (`waimia-web` + `waimia-cal`). `cal` sur repo dédié, `cal.waimia.com` READY (DB/env intactes).
- **Branches** : `chore/*` supprimées (local+remote) ; PR #4 (doublon hero-liquid base=main) **fermée** → la canonique est **#5** (`feat/lib-hero-liquid`, stackée sur `feat/library-heroes-enrich`).
- **GF-1 prod** (`910968b`) : `waimia.com` H1 « L'IA dans vos outils… » + CTA « Réserver un audit → » `opacity:1`/transform neutre/visibles · 0 erreur console · deploy Vercel success.
- ⚠️ `main` **n'a PAS** le registry-57 (commit `32deb1d` absent de main) — il garde le registry pré-heroes. La fondation 57 arrive via les PR library.

### ✅ CORRECTION du plan de merge (GF-4, `git merge-tree --write-tree` exit 0) — PAS de conflit
Vérifié empiriquement le 2026-06-02 contre le **nouveau** `main` (`910968b`) :
| PR | Branche | merge-tree vs main | Note |
|---|---|:--:|---|
| **#1** | `claude/focused-bardeen-0GySr` | **CLEAN** (exit 0) | fondation 57 + 4 migrations + sweep + CI gate + docs |
| **#3** | `feat/build-order-noise` | **CLEAN** (exit 0) | fix bruit build |
| **#5** | `feat/lib-hero-liquid` | **CLEAN** (exit 0) | hero-liquid 57→58 |

La prédiction « conflits both-added sur `CLAUDE.md`/`.claude/` » était une **fausse alerte** : ces fichiers
(+`.mcp.json`) sont **byte-identiques** entre `main` et les branches library (both-added identique → auto-résolu
par git). **Aucune résolution de conflit nécessaire.** (Le §3 plus bas, qui supposait `main`=`7597e02` vide, est **caduc** — voir ce §0.)

### Plan de merge consolidé (À EXÉCUTER avec le gate GF-1 Vercel — pas en cloud)
Chaque PR merge **clean** sur `main`. Ordre logique (chacun précédé de GF-1 sur SA preview Vercel) :
1. **PR #1** (apporte la fondation registry-57 + 4 migrations + sweep + CI gate + docs). Une fois sur `main`,
   le workflow `gf1-vercel-sweep` devient actif sur les PR suivantes (+ secret `VERCEL_AUTOMATION_BYPASS_SECRET`).
2. **PR #5** (hero-liquid → **58**) : commits-fondation partagés dédupliqués par git ; ne reste que `e95e3b0`.
   Après merge, le sweep couvre 58 (énumération dynamique `dist/client/preview/*`).
3. **PR #3** (build-noise, config-only).
   ⚠️ Vérifier après le 1er merge que le **gate dur `ci.yml`** (astro check) passe : ma branche #1 = **0 erreur**
   astro check (la fondation 57 corrige les ~40 erreurs pré-heroes que la session #2 voyait sur `main`).
4. Nettoyage post-merge : supprimer `feat/library-heroes-enrich` (subsumée par #5) + branches mergées.

### Reste à faire (consolidé, par priorité)
- **Standardisation** : 14 templates restants (`docs/22`, §4 ci-dessous) — priorité #1 validée Simon.
- **Issues session #2** : (a) **branch-protection `main`** = payant (Team) ou repo public → décision Simon (hors mandat) ;
  (b) **`vercel login`** = token CLI expiré (`invalidToken`, contourné via commit-status GitHub) → re-loguer pour l'API Vercel ;
  (c) **`CLAUDE.md` sur main** encore un peu library-specific (« Point d'arrêt feat/library-heroes-enrich ») → généraliser pour le template ;
  (d) `project_waimia_master_index_persistent.md` (Bloc F) = source persistante cross-session de Simon.
- **Puis** : variations de sections → audit tokens-only (DS verrouillé) → refacto → peaufinage (cf §4 + `docs/23`).
- **Backlog visuel** V1–V5 (`docs/23` §C) : V1 = markdown `**gras**` littéral `src/content/cases/plateau.mdx:83` (bug, à corriger).

---

## 1. Ce qui a été fait (cette session, PR #1, branche `claude/focused-bardeen-0GySr`)

### Infra GF-1 (preuve visuelle empirique en cloud)
- **`scripts/gf1-cloud-sweep.mjs`** + **`scripts/serve-dist.mjs`** : harnais de sweep GF-1 sur les
  `/preview/<type>`. Découverte clé : en cloud le download Playwright est bloqué (`cdn.playwright.dev`
  hors allowlist) MAIS un **chromium est pré-installé** (`/opt/pw-browsers/chromium-*/chrome-linux/chrome`)
  → on le pointe via `executablePath`. **`*.vercel.app` est aussi bloqué** (egress `host_not_allowed`) →
  le GF-1 sur preview Vercel **déployée** ne tourne PAS en cloud (→ CI ou local). Détail : `docs/21`.
- **`.github/workflows/gf1-vercel-sweep.yml`** : gate CI qui lance le sweep contre la preview Vercel
  (runner réseau-ouvert). Requiert le secret repo **`VERCEL_AUTOMATION_BYPASS_SECRET`** (Vercel ▸
  Deployment Protection ▸ Protection Bypass for Automation). Sans secret → skip neutre (warning, pas rouge).
  Trigger `deployment_status` (actif sur PR une fois le workflow sur `main`) + `workflow_dispatch` (manuel).
- **Preuve livrée** : sweep **57/57 PASS** sur le build de prod réel (`dist/client`), rendu Chromium,
  `getComputedStyle` opacity≠0 + transform neutre. Re-vérifié à CHAQUE migration (toujours 57/57).

### Standardisation templates → composants catalogués (Option B) — **4/18 faits, prouvés 0-régression**
Migration : la prod live consomme le composant catalogué (source unique structure+CSS), **contenu par
instance via props** (slots→props), 0 régression visuelle (before/after pixel + `getComputedStyle`).

| Template | Composant | Commit | Pages | Preuve |
|---|---|---|---|---|
| ServiceDetailTemplate | HeroServiceDetail | `7c41d4c` | /offres/revops | pixel-identique, sweep 57/57 |
| DetailMenuTemplate | HeroDetailMenu | `d582554` | /offres/audit-maturite-ia | diff 0.00000%, sweep 57/57 |
| ConversionFunnelTemplate | HeroConversionFunnel | `d4e402b` | /offres/site-web-ia | diff 0% above+full, sweep 57/57 |
| UtilityTemplate | HeroUtilityMasthead | `b2e4974` | **10 pages** (contact, about, careers, methode, academy, veille-ia, livres-blancs + 3 EN) | 8/10 à 0%, masthead byte-identique, sweep 57/57 |

**Pattern figé (runbook complet : `docs/22`)** : pour chaque écart de tokens (padding, max-width, reveal,
stats…) entre le composant catalogué et le live → **prop optionnelle rétro-compatible** sur le composant
(défaut catalogue **INCHANGÉ** → preview reste verte), pilotée depuis le template. Props ajoutées à ce jour :
`topPad`, `wrapMaxWidth`, `statsAsKeyMetric`, `kickerReveal`, `reveal`. **0 modif e2e** nécessaire jusqu'ici
(les tests assertent du contenu, pas la classe h1 — sauf pour Hub/CaseStudy/Essay/ListIndex, à éditer
centralement quand on les migrera).

### Docs / capitalisation
- **`docs/21`** — rapport sweep GF-1 + contrainte réseau cloud.
- **`docs/22`** — RUNBOOK migration (9 étapes) + mapping des 18 templates + caveats.
- **`docs/23`** — **vision industrialisation** (DS-as-data piloté IA, SPA génération DS via Codex,
  blocs TinaCMS « Gutenberg » sur projet **vigiscope-site** = compte séparé) + **principes archi à tenir
  dès maintenant** (tokens-only, schéma=contrat, contenu via props, props de variation) + **triage qualité
  visuelle** (sections faibles à corriger).

## 2. Travail parallèle d'autres sessions (PRs ouvertes, à intégrer)

| PR | Branche | Scope | Base réelle | État |
|---|---|---|---|---|
| **#1** | `claude/focused-bardeen-0GySr` | CETTE session (registry 57 + .claude + sweep + CI gate + 4 migrations + docs 20-24) | **main**, 20 commits | draft, Vercel ✅ |
| **#2** | `chore/collaborator-readiness` | README + CONTRIBUTING + (CI ci.yml à coller manuellement, scope workflow manquant) | main, 3 commits, **sans** la fondation heroes | draft |
| **#3** | `feat/build-order-noise` | fix bruit build `❌ File not found` (config llms-txt) | **main** (créée cloud → diff « gras », inclut la fondation) | draft, Vercel ✅ |
| **#5** | `feat/lib-hero-liquid` | hero-liquid catalogué (registry **57→58**) | **`feat/library-heroes-enrich`** (PR *stackée* = diff propre du seul delta) | open, Vercel ✅ |
| ~~#4~~ | ~~`feat/lib-hero-liquid`~~ | doublon de #5 (base=main) | — | **fermée** (ne pas rouvrir) |

⚠️ **Deux lignées de « fondation » parallèles** (contiennent toutes deux le registry-57, divergent à `23a9351`) :
(a) **PR #1** (ma branche, base main) — fondation + 4 migrations + sweep + CI gate + docs ;
(b) **`feat/library-heroes-enrich`** (`b49aa13`, base des stacks #5) — fondation + `.mcp.json` (Playwright/context7 cloud) + plugin v0.3.0.
**Laquelle merge en 1er sur `main` = décision d'orchestration de Simon.** #5 est stackée sur (b) ; #3 est sur main
(pourrait être re-basée sur (b) pour un diff propre). `feat/library-heroes-enrich` n'a pas de PR propre (mergé via la stack).

## 3. Topologie & plan de merge (À EXÉCUTER là où le gate GF-1 Vercel tourne — pas le cloud)

```
main 7597e02 (ne contient AUCUN travail de session)
 └─ 32deb1d 7cdf5aa a786e24 (registry 57)  → e0b9194 0ff7267 c0b5160 e2107b7 23a9351 (.claude)
      ├─ [PR #1] b090162 … b2e4974  (sweep + CI gate + 4 migrations + docs)
      └─ ee5bc53 2bea1bc b49aa13 (.mcp.json + plugin v0.3.0 = feat/library-heroes-enrich)
            ├─ [PR #3] 1e7935f (build-noise)
            └─ [PR #4] e95e3b0 (hero-liquid 57→58)
```

**Séquence recommandée** (chaque merge précédé de GF-1 sur SA preview Vercel) — ⚠️ suppose la **lignée (a) = PR #1**
comme fondation ; si Simon préfère la **lignée (b) = `feat/library-heroes-enrich`**, inverser (merger (b) + sa stack
#5 d'abord, puis rebaser PR #1 dessus pour ne garder que sweep+CI+migrations+docs) :
1. **PR #1** en premier (registry 57 + .claude + 4 migrations + sweep + CI gate + docs). Une fois sur `main`,
   le gate `gf1-vercel-sweep` devient actif sur les PR suivantes.
2. **Rebaser PR #3** sur le nouveau `main` → ne reste que le delta `1e7935f` (+ les commits `.mcp.json`
   `ee5bc53/2bea1bc/b49aa13` que #1 n'a pas). ⚠️ **Conflit attendu sur `docs/20`** (b49aa13 modifie §6 ;
   #1 a ajouté §0bis) et possiblement `.claude/settings.json` → réconcilier (garder le `.mcp.json` + v0.3.0).
3. **PR #5** (hero-liquid, stackée sur `feat/library-heroes-enrich`) : une fois sa base intégrée, ne reste que
   le delta `e95e3b0`. Après merge, le sweep couvre **58** automatiquement (énumération dynamique `dist/client/preview/*`).
4. **PR #2** (orthogonal, sans fondation) : rebaser sur main, coller `ci.yml` via l'UI GitHub (scope workflow).
5. Alternative si la divergence `.mcp.json`/lignées n'est pas voulue tout de suite : merger **seulement PR #1**,
   puis **cherry-pick** `1e7935f` (build-noise) et `e95e3b0` (hero-liquid) sur des branches fraîches issues du
   nouveau `main` (évite de retraîner `b49aa13`). À décider selon qu'on veut le `.mcp.json` cloud + le plugin v0.3.0.

**Nettoyage branches (après merges, NON fait — destructif)** : supprimer `feat/library-heroes-enrich`
(subsumée), et les branches de PR mergées (option « delete branch on merge » GitHub). Ne rien supprimer
tant que les PR ne sont pas mergées.

## 4. Reste à faire (prochaines sessions) — par priorité (ordre validé par Simon)

**(1) Finir la standardisation — 14 templates restants** (méthode = `docs/22`, 1 worker/template, GF-1 par page) :
- **vt=0 (simples, faire d'abord)** : CourseDetail→HeroCourse, EcoleHub→HeroAcademyHub, Welcome, TrustLegal,
  ListIndex→HeroHubListing/Masthead, Hub→HeroHubMasthead/Stats/PillarHub (⚠️ variante selon page), TunnelStep→HeroTunnelStep (⚠️ h1 atypique).
- **vt>0 (View Transitions à réintégrer via prop optionnelle `transitionName`)** : AuthorPage→HeroAuthor,
  CaseStudy→HeroCaseStudy, Essay→HeroEssay, LeadMagnet→HeroLeadMagnet, OffresDetail→HeroOfferDetail,
  SolutionsDetail→HeroSector/ServiceDetail (⚠️ mapping à confirmer), TechnologiesDetail→HeroTechLayer.
- ⚠️ **e2e centralisé** : Hub/CaseStudy/Essay/ListIndex assertent `h1.<classe>` dans `tests/e2e/templates.spec.ts`
  → l'orchestrateur édite ce fichier UNE fois (les workers n'y touchent pas, risque de collision).
- « S'assurer que toutes les sections/blocks sont bien bouclés » : après les templates, vérifier que **tout**
  composant catalogué est consommé en prod (audit registry↔usage).

**(2) Nouvelles variations de sections** (étendre la librairie, casser la monotonie — cf `docs/23` §D).
**(3) Audit tokens-only** des composants (pré-requis DS-as-data : 0 hardcode, tout en `var(--token)`) — **une fois le DS verrouillé**.
**(4) Refacto nécessaire** puis **(5) peaufinage**.

**Backlog qualité visuelle (parallèle, `docs/23` §C)** — à corriger sur le composant après componentisation, validation visuelle Simon requise :
- **V1** (bug, haute) : markdown `**gras**` affiché littéralement — `src/content/cases/plateau.mdx:83` passe `**…**` dans une string au prop `<Bi>`. Fix : `<strong>`/`set:html`.
- **V2** heros vides (`/solutions/finance`, `/solutions/contenu-seo-geo-ia`) · **V3** h1 débordant (`/secteurs/services-b2b`) · **V4** avant/après (`/offres/growth-system-ia`) · **V5** redondance pyramide home + monotonie horizontale.

**Plus tard (garder en tête, ne pas casser)** : SPA génération DS-as-data (Codex) ; export blocs librairie → TinaCMS (projet `vigiscope-site`, repo/compte séparés).

## 5. Méthode de reprise

### Init cloud (vérifier au démarrage)
- Plugin `vw-guardrails@virtuoseweb` installé (`claude plugin list`) + bloc « Garde-fous (☁️ CLOUD) » injecté.
- En cloud : rules/hooks globaux NE tournent PAS → contrat = `CLAUDE.md` repo + `docs/20`+`24`.
- GF-1 visuel en cloud = chromium `/opt/pw-browsers` + `serve-dist` + `gf1-cloud-sweep` sur build local.
  GF-1 sur preview Vercel = CI (`gf1-vercel-sweep` + secret) ou local (`*.vercel.app` bloqué en cloud).

### Boucle de migration (par template) — proven
1. Worker `general-purpose` (1 par template), brief = runbook `docs/22` + `git show` d'un commit récent (ex. `b2e4974`).
2. Worker : AVANT (build+serve+Playwright getComputedStyle+screenshot) → migre (slots→props, prop optionnelle pour écarts) → APRÈS → diff + sweep 57/57. **Ne committe pas.**
3. **Orchestrateur vérifie lui-même** (GF-1, jamais sur parole) : rebuild + sweep 57/57 + capture indépendante de la/les page(s) + `astro check` → puis **commit + push**.
4. Sérialisé (le build en place se clobbe entre workers parallèles). Pour paralléliser : `isolation: worktree`
   (worktree+branche par worker, builds isolés, puis merge) — non utilisé ici (friction merge cloud), mais viable.

### Agents à invoquer
- **`general-purpose`** : migrations templates (workers), recherches multi-fichiers.
- **`vw-guardrails:visual-proof-reviewer`** : revue adversariale de preuve GF-1 (visuelle/fonctionnelle) avant de déclarer « fini ».
- **`Explore`** : balayage read-only (mapping registry↔usage, audit tokens).
- Orchestrateur (Opus) : ≤3 LoC applicatif (GF-2) → décomposer, déléguer, vérifier.

### Caveats ouverts
- **Traductions EN** ajoutées sur les pages migrées : inertes sur pages FR-only, **rendues** sur les routes EN
  (ex. Utility `/en/...`) → **à relire éditorialement**.
- Caveat mobile **ConversionFunnel** 768–800px (breakpoint composant 768 vs live 800) — desktop pixel-parfait.

## 6. Pourquoi rien n'est mergé sur `main`
Discipline prod (CLAUDE.md + docs/20) : **ne merger sur `main` (→ prod waimia.com) qu'après GF-1 sur preview
Vercel ; auto-merge OFF**. Le cloud **ne peut pas** atteindre `*.vercel.app` (allowlist) → le gate ne tourne
pas ici, et un merge prod est irréversible/outward-facing. Donc : tout est **commité, poussé, merge-ready,
documenté** (§3) ; le merge s'exécute **avec le gate** (CI `gf1-vercel-sweep` + secret, ou local Simon),
sur feu vert explicite. (Si tu veux que je merge quand même depuis le cloud, dis-le — je le ferai, mais sans la preuve GF-1 Vercel.)
