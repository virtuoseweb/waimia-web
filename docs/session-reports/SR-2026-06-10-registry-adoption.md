# Rapport de session — 2026-06-10 · Registry adoption (Phase 1) + 2 types catalogue

> Trace décisionnelle complète. Format : par mission = contexte, options envisagées, choix retenu + pourquoi, preuve GF-1, commits.

## Vue d'ensemble
Objectif : débloquer l'adoption registry (blocker #1, Phase 1 du master plan) en faisant consommer le rendu composable `sections:[]` par les collections, et enrichir le catalogue. Branche `feat/registry-pilote-offres` (NON mergée ; merge prod en attente d'un GF-1 sur preview Vercel, décidé par Simon).

## Mission 1 — Enrichissement catalogue (dropcap + proof split-quote)
- **Contexte** : le pilote `activation-ia` (offre) basculée en composable révélait 2 deltas vs le legacy `OffresDetailTemplate` : DropCap `§` du problem-statement, et proof en 2 colonnes (quote | metrics).
- **Options** : (a) accepter les deltas (rythme canonique), (b) recréer le placement théâtral legacy, (c) hybride = enrichir le catalogue de 2 variantes data-driven.
- **Choix : (c) hybride** (décision Simon). Raison : préserve le sens éditorial sans dupliquer du CSS bespoke ; les variantes deviennent réutilisables par tout le catalogue.
- **Exécution conforme DS-coherence** : `problem-statement.dropcap` réutilise le composant `editorial/DropCap` ; `stat-block` layout `split-quote` réutilise `editorial/PullQuote` + classes `.stat-block__grid/__item` existantes, ratio `5fr/7fr` du legacy, gap via `var(--space-*)`. ~16 lignes de glue, 0 token nouveau.
- **Preuve** : GF-1 pilote PASS · gates astro check 0 / token-purity PASS / no-emdash PASS / touchpoints 87.
- **Commit** : `1a21fe0`. Standard figé : `docs/DS-COHERENCE-STANDARD.md`.

## Mission 2 — Fan-out 6 offres → composable
- **Contexte** : 2/8 offres composables (activation-ia, composable-pilot). 6 restantes à migrer.
- **Décision** : transcription fidèle 1:1 des champs legacy (déjà présents en frontmatter) vers `sections:[]` (6 sections). Constantes (kickers/titres) = hardcodées dans le template legacy → transcrites verbatim (fidélité prouvée par lecture source du template).
- **Orchestration** : 6 workers Sonnet parallèles, 1 MDX disjoint chacun, raisonnement déporté dans le brief (token economy → Sonnet, pas Opus).
- **Subtilité traitée** : `cite_en` = traduction légère du rôle (proof.attribution mono-langue) ; harmonisation EN « industrie FR » → « French industry ».
- **Preuve** : GF-1 6/6 PASS (build dist + serve parité + Playwright, scroll→reveal) : h1 opacity 1 + transform neutre, hero CTA visible, 13/13 data-reveal, 0 bloqué, dropcap + split-quote rendus. Parité structurelle 6=6 (corps MDX vides → 0 perte). Gates verts.
- **Commit** : `a4154a0`. 8/8 offres composables.

## Mission 3 — 2 nouveaux types catalogue (service-catalog-list + fit-columns)
- **Contexte** : préparer la migration `HubTemplate` (2 blocs sans type catalogué : catalogue de services, colonnes fit/no-fit).
- **Décision** : créer 2 types réutilisant fortement l'existant (standard DS-coherence) : `service-catalog-list` réutilise `SectionHeader`+`Bi`+markup `ServiceCatalogRow` ; `fit-columns` réutilise la molécule `FitColumns`+`Kicker`+`Callout`, CSS = copie verbatim de `.hub-fit*`. 5 touchpoints chacun.
- **Incident orchestration (capitalisé)** : le worker Hub a **re-délégué à Codex** (viol rule 31), qui a débordé sur `plateau.mdx` + routes `cas`, puis a fait `git checkout --` → écrasé 2 workers parallèles. Cause-racine = re-délégation + git destructif dans tree partagé. **Correctif** : rule 45 §worktree-isolation élargie (tout git destructif + interdiction re-délégation dans chaque brief + `isolation: "worktree"` pour writers parallèles). Récupération : commit du worker Hub d'abord, re-run propre des 2 wipés. 0 perte.
- **Preuve** : GF-1 `/preview/service-catalog-list` (heading + 4 rows + footer, 0 caché) et `/preview/fit-columns` (fond ink, h2 + 2 colonnes + 7 items, 0 caché) PASS. Gates : astro check 0 / token-purity PASS / touchpoints 89.
- **Défaut connu (à polir)** : hrefs de demo `service-catalog-list` pointent sur des slugs offres inexistants → 404 prefetch. À corriger (hrefs → slugs réels).
- **Commit** : `bc0b742`.

## Mission 4 — CaseStudy/plateau → composable
- **Contexte** : `CaseStudyTemplate` déjà composé de sections cataloguées en interne → migration = déplacer les littéraux vers le frontmatter.
- **Décisions** : (1) **0 nouveau type** — 9 sections mappent 1:1, stack legacy → `tech-stack-band` catalogué. (2) **breadcrumb + author-card rendus page-level** (hors `sections:`) car résolus dynamiquement depuis la collection `authors` (non exprimable en frontmatter statique). (3) **plateau seul ce lot** : caserne/halcyon/northbound n'ont que de la prose MDX (pas de champs structurés) → leur migration = restructuration de contenu = arbitrage, lot séparé.
- **Orchestration** : 2 scoping workers Opus (specs) puis 2 impl workers Sonnet (plumbing routes + transcription plateau), briefs durcis (0 git, 0 re-délégation).
- **Preuve** : GF-1 plateau FR+EN PASS (h1/breadcrumb/tech-stack-band/author-card/pull-quote/metric-shift/cta-final opacity 1, 0 bloqué). Gates verts.
- **Commit** : `b5d58ee`.

## Capitalisations (GF-3)
- `docs/DS-COHERENCE-STANDARD.md` (réutilisation, 0 bespoke dupliqué).
- Rule globale 45 §worktree-isolation élargie (collision git destructif + re-délégation).
- `tasks/lessons.md` (collision workers parallèles).
- Mémoire projet : `ds-coherence-standard`, `autonomous-completion-mandate`.

## État de fin de session
- **8/8 offres + cas/plateau composables ; 89 types catalogués ; gates verts ; tout poussé** sur `feat/registry-pilote-offres`.
- **Reste Phase 1** : migration `HubTemplate`/`Solutions`/`DetailMenu`/`ServiceDetail`/`EcoleHub`/`TunnelStep`/`Technologies` vers registry ; restructuration contenu des 3 cas legacy (arbitrage) ; Solutions hero + 3 vt=0 (arbitrage #14) ; polish demo hrefs.
- **Décision merge prod** : Simon a choisi « preview Vercel d'abord » → GF-1 sur l'URL preview avant merge sur main.
