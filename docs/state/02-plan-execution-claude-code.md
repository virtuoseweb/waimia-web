# 02 — Plan d'exécution maître (Claude Code) — backlog persistant

> 🔁 **GELÉ / SUPERSEDED par V7-FOLD (2026-06-26).** Le backlog P0→P4 ci-dessous et son cadre architecture (3 piliers) sont **gelés** : le travail courant est piloté par le plan `/goal` `~/.claude/plans/flickering-squishing-eagle.md` (V7) + `tasks/RESUME-NEXT.md`. Les tâches P1 (SEO/GEO), P2 (DS), légal/véridicité restent valides **sur le fond** mais à réinterpréter sous l'archi V7 (`docs/strategy/10`), pas à reprendre telles quelles. Ce doc n'est plus « source unique » du quoi-faire.

> **Pour Claude Code. Backlog d'exécution maître, lu au boot.** Source de vérité du
> *quoi faire et dans quel ordre* pour le repo `waimia-web`. Chaque chantier a deux
> sections : **Tâches finies** (vide au départ) et **Tâches en attente** (`[ ] EN ATTENTE`
> au démarrage). On coche `[x]` quand la preuve GF-1 est fournie ET commitée.
>
> Hiérarchie des sources de vérité (rappel) : `CLAUDE.md` (GF-1..GF-6, non négociable) >
> `docs/README.md` (carte) > **ce fichier** (backlog ordonné) > `tasks/ORCH-STATE.md`
> (journal horodaté) > git. Architecture cible = ⭐ `strategy/10-architecture-finale-v7.md` (FAIT FOI 2026-06-18,
> supersede l'archi 3-piliers). Spec véridicité/suppressions = `strategy/02-site-etat-final.md`.
> Stratégie = `strategy/01`. État réel = `state/01-chantiers.md`.
>
> **Contexte business** (réconcilié 2026-06-15, cf `state/RECONCILIATION-REPORT.md`) :
> **cabinet d'orchestration IA** anthropic-first, Montpellier, fondateur SOLO, phase démarrage.
> « agence IA » = keyword SEO de support seulement, jamais H1 de marque. Priorité = **quick wins
> + cash court terme** ; long terme FIGÉ mais non urgent.
> Offer ladder : audit gratuit (0 €) → **site web intelligent** dès **2 000 € HT** (grille
> **2 000 / 4 000 / 7 000 / 10 000 €** + sur-mesure) → Growth System IA →
> agents à l'usage (cf `business/08`). Domaine neuf : on supprime le fictif/thin (cas ET certifs), pas de
> redirections, lancement **FR monolingue**.

---

## ⏸️ STATUT SÉQUENCE (2026-06-16) : chantier inséré HORS-SÉQUENCE + backlog ci-dessous EN PAUSE

> **À lire avant de piocher un chantier.** Le backlog P0→P4 de ce document est la séquence
> *initialement prévue* (fondations honnêtes → SEO/GEO → design → acquisition → produit). Elle
> **n'a pas démarré** : aucun chantier P0.x ci-dessous n'est ouvert. Ce qui a tourné ces dernières
> sessions est un **chantier inséré hors-séquence**, devenu un besoin pendant le re-cataloguage.

**▶️ Ce qui a été fait HORS de ce backlog (inséré par besoin, pas dans l'ordre prévu) :**
- **OVERHAUL visuel W1→W5** (clos, déployé+GF-1 prod sur `main` `639065f`) : typo numérale fluide,
  recomposition des orphelines, services & schema (FAQPage JSON-LD), responsive & dette globale.
- **W3 « atelier `/library` »** : **PHASE 1 LIVRÉE** (`639065f`). L'embryon `/agence/design-system`
  est devenu l'atelier `/library/*` (hub + `[category]`/`[type]`/`studio`/`hero-lab`, redirects 301,
  footer/noindex) + 5 sections éditoriales cataloguées + `case-featured-grid` + toggles animation/dark.
  Détail + reste : `docs/design-system/03-library-strategy.md §11.3`.
  - **RESTE W3 (arbitrage Simon A→B, non démarré)** : *phase 1b* (presets ≥20/catégorie via `Workflow`
    + consolider le mixin `sectionBaseSchema`, appliqué 3/156 types) puis *phase 2* (git-write-back
    `POST /api/ds/preset` + `/api/ds/compose` + composition UI par slots, cf `design-system/03 §14`).
  - **Findings ouverts** : 2 erreurs prefetch démo `/library/case-featured-grid` (slugs fictifs) ;
    DsLocalNav garde des hrefs legacy `/agence/*` ; **arbitrage Simon en attente** = 3 secteurs
    (batiment / services-b2b / therapeutes) `noindex`↔`sitemap` : les indexer OU les masquer.

**⏸️ Ce qui était PRÉVU AVANT et reste EN PAUSE (ce backlog, à reprendre une fois W3 stabilisé) :**
- **P0 · Quick wins & site honnête (BLOQUANT prospection)** : `P0.0` réconciliation repo (archiver
  le périmé, figer les compteurs réels, cocher le déjà-committé avec SHA) ; `P0.A` migration home +
  nav + footer (store `pricing.ts` unique 2/4/7/10k, purge liens 404, hero « cabinet d'orchestration
  IA ») ; `P0.B` home -33 % scroll ; `P0.2/0.6/0.7` assainissement véridique + **pages légales**.
- **P1 · SEO/GEO & contenu** : figer H1 + `<title>`/meta + schema `Service`/`Breadcrumb`/FAQ-AEO ;
  **cas réels** (Balzeo, Amploi, Desangles, Isabelle Diaz) ; concurrent frontal **Vydera**.
- **P2 · Design / refonte DS (11 chantiers)** dont `P2.11` hardcode → `var(--token)` (~73 littéraux),
  budget perf (JS ≤ 30 KB/route, LCP < 2,0 s mobile), awwwards.
- **P3 · Acquisition** (Firecrawl + scoring) · **P4 · Produit** (boilerplate forkable, CMS Tina,
  dashboard agents). FIGÉ, non urgent.

**▶️ ORDRE DE REPRISE recommandé** (à confirmer par Simon à la reprise) :
1. **Stabiliser W3** : trancher les 3 findings (prefetch, hrefs DsLocalNav, arbitrage 3 secteurs),
   un petit lot qui referme proprement la phase 1.
2. **Décider W3 1b/2 vs backlog** : soit pousser W3 jusqu'à la phase 2 (git-write-back, gros chantier
   produit), soit le geler à la phase 1 et **revenir au socle prévu en commençant par `P0.0`**
   (réconciliation) puis `P0.A` (le seul vrai BLOQUANT prospection : site honnête + prix unique + légal).
3. Le reste du backlog (`state/05-design-refonte` pour P2) se déroule ensuite dans l'ordre ci-dessus.
>
> Rappel séquençage : `P0.A` et `P0.B` touchent tous deux `index.astro` → **séquencer**, pas paralléliser.

---

## Comment Claude Code utilise ce document

1. **Au boot** : lire `CLAUDE.md` → `docs/README.md` → **ce fichier**. Identifier le premier
   chantier dont les dépendances sont satisfaites et qui a des `[ ] EN ATTENTE`.
2. **En session** : matérialiser le sous-ensemble de tâches du chantier courant dans la
   task list Claude Code (`TaskCreate` / `TodoWrite`), statut `in_progress` quand on démarre.
   La task list de session = volatile ; **ce document = backlog persistant** qui survit aux
   sessions. Les deux doivent rester cohérents.
3. **1 scope = 1 branche `feat/<scope>`** (jamais `main`, jamais `git add -A` global). Build de
   référence : `npx -y pnpm@9.15.0 build` (attendu `Complete!`) + `npx -y pnpm@9.15.0 exec astro check`
   (0 errors) + gates `scripts/check-*.mjs` concernés.
4. **À la complétion d'une tâche** : fournir la **preuve GF-1** dans le même tour (visuel =
   screenshot Playwright above-fold + `getComputedStyle` sur preview/prod déployée ; backend =
   appel réel + assertion ; structurel = build vert + gate vert). Puis **cocher `[x]`**, déplacer
   la ligne dans « Tâches finies » du chantier, et **commit** (le doc fait partie du commit).
5. **Merge sur `main`** seulement après GF-1 sur une **preview Vercel** (auto-merge OFF).
6. **Jamais inliner du markup neuf** dans une page/template (anti-orphelin) : éditer le composant
   (`sections/`, `ui/organisms/`, `header/`, `footer/`). Contenu = props / MDX / `src/data`.
7. **Arbitrages Simon** (marqués `[?]`) : NE PAS trancher seul. Lister la question, attendre.

**Convention de statut par tâche** : `[ ] EN ATTENTE` · `[~] EN COURS` · `[x] FAIT (preuve+commit)` ·
`[?] ARBITRAGE SIMON`. Chaque tâche porte : **Objectif** · **Fichiers** · **Preuve GF-1** · **Dépend de**.

### Méthode par tâche (raisonnement + outils — NON dirigiste)
Chaque tâche ci-dessous est un **point de départ, pas une recette**. Pour chacune, Claude Code :
1. **INVESTIGUE d'abord** (grep + `git log/show` + read + build + screenshot) pour reconstituer l'état réel — ne jamais supposer « fait » sans preuve (GF-4).
2. **Se pose les bonnes questions explicitement** (chain-of-thought) : qu'est-ce qui est déjà fait/ghosté ? quelle est la vraie valeur (token count, couverture captures, sections manquantes) ? quel pattern figé du DS s'applique ? où est le risque de dette ?
3. **Utilise les outils/gates** (`check-*`, GF-1 visuel, git) pour **mesurer avant d'agir**.
4. **Agit au plus simple conforme au DS figé** (pattern fermé, pas de variable ad hoc).
5. **Prouve (GF-1)** dans le même tour, puis **capitalise** (coche `[x]` + commit + note le constat dans le doc).
> Un chantier ne se ferme **que quand sa question de couverture est répondue par la preuve**, pas quand « quelques » cas sont traités.

### Index des phases (backlog fondation GELÉ sous V7 ; cf addendum en tête ; le quoi-faire courant = plan V7)
- **P0** — Quick wins & cash court terme (11 chantiers, BLOQUANT prospection : site honnête)
- **P1** — SEO/GEO & contenu (3)
- **P2** — **DESIGN / refonte DS** (11 chantiers, ACTIF multi-passes ; détail `state/05-design-refonte`)
- **P3** — Outils d'acquisition (Firecrawl + scoring) (1)
- **P4** — Produit long terme FIGÉ (boilerplate, CMS/Tina, dashboard/agents) (3)
- **Backlog technique hérité** (T-1..T-7) + **Arbitrages Simon** `[?]`
> Toute phase/chantier/tâche (design ou autre) DOIT être listée ici. Si tu en trouves une orpheline
> (dans `state/01`, `design-system/03`, `directives/*`, `audits/02`…), **remonte-la ici** avant d'agir.

---

# PHASE P0 — Quick wins & cash court terme

> But : un site **propre, véridique, conforme**, l'**architecture en 3 piliers + 1 silo** câblée,
> et les **fondations d'acquisition** (GBP, LinkedIn, lead magnet, pricing, fiches offres) prêtes à
> générer des RDV. Cash-first : tout ce qui débloque une vente passe avant le confort technique.

---

## Chantier P0.0 — Reliquats documentaires & hygiène repo

> Sources : `docs/archive/FINALISATION-MANIFEST.md`, `docs/archive/CONSOLIDATION-MANIFEST.md`,
> `docs/archive/REPO-CLEANUP-MANIFEST.md` (archivés 2026-07-19, P0.0-a soldé), `state/01 §f,§f-bis,§f-ter`.

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.0-a — Exécuter les 3 manifestes de finalisation doc** (fusions + renumérotation `01..N`). ▸ *soldé 2026-07-19 : audit action par action (worker w-p00a) : archivages/fusions/corrections = FAIT via la réorg 2026-07-12 ; renumérotation stricte + « CMS→Tina » = MOOT (index README fait foi, Tina abandonné strategy/12) ; les 3 manifestes archivés dans docs/archive/ + README.md mis à jour ; grep MANIFEST hors archive = 0 référence cassée.* <!-- sb commit=c707d50b gf1=y -->
  - Objectif : set de ~25 docs vivants, numérotation cohérente par dossier, 0 contradiction ;
    supprimer les 3 manifestes à la fin.
  - Fichiers : `docs/**` (`git mv`), `docs/FINALISATION-MANIFEST.md` §1-§4, références croisées.
  - Preuve GF-1 : `grep` 0 référence cassée aux anciens numéros + build vert (les docs ne
    cassent pas le build, vérifier les imports MDX éventuels) + arbo finale = §3 README.
  - Dépend de : —
- [x] **P0.0-b — Corrections factuelles de doc** (`state/01 §f-ter`). **VÉRIFIÉ DÉJÀ FAIT (nuit 2026-06-12, GF-4)**. <!-- sb commit=417eff6 gf1=n note=doc-grep -->
  - Objectif : corriger `architecture/03` (`output:'static'` et non `'server'`),
    `architecture/01+05` (TinaCMS et non Pages CMS / `.pages.yml`), `architecture/04`
    (projet Vercel `waimia-web` et non `waimia-v2`), `architecture/02` (`author = reference`),
    et purger partout « cas fictifs gardés » (→ supprimés per `strategy/02 §2H`).
  - Fichiers : `docs/architecture/0{1,2,3,4,5}-*.md`, `docs/strategy/01`, `state/01`.
  - Preuve GF-1 : grep ciblé sur les docs **live** (hors manifestes-à-supprimer + archive + notes-de-suivi) =
    0 inexactitude. `architecture/03` = « Astro static config » ✅ · `01/05/06` = TinaCMS (0 `.pages.yml`/Pages CMS) ✅
    · `04` = projet Vercel `waimia-web` ✅ · `strategy/01` affirme « cas fictifs SUPPRIMÉS (pas gardés) » L11/61/184 ✅.
    Les seules occurrences résiduelles du grep large sont **légitimes** : (a) manifestes `FINALISATION/CONSOLIDATION`
    qui DÉCRIVENT la correction (supprimés en P0.0-a) ; (b) `docs/archive/*` historique ; (c) `arch/06` où
    `output:'server'` réfère correctement à l'ancien pattern obsolète + l'exemple officiel Tina (waimia-web reste static).
  - Dépend de : —
- [x] **P0.0-c — Slim `CLAUDE.md`** (`FINALISATION-MANIFEST §2`) ▸ *soldé (réconciliation 2026-07-19) : CLAUDE.md racine slim 72 lignes, GF-1..GF-6 inline présents intégralement.* <!-- sb commit=50445a77 gf1=n -->
  - Objectif : alléger `CLAUDE.md` racine (ne pas surcharger la config Claude Code) sans perdre
    les GF-1..GF-6 (filet inline) ni les pointeurs START HERE.
  - Fichiers : `CLAUDE.md`.
  - Preuve GF-1 : GF-1..GF-6 toujours présents intégralement + build vert + relecture diff.
  - Dépend de : P0.0-a (les pointeurs doivent viser les chemins renumérotés).
- [x] **P0.0-d — Nettoyage racine repo & images-preuves** (`REPO-CLEANUP-MANIFEST`) ▸ *soldé (réconciliation 2026-07-19) : 0 image-preuve à la racine, 0 `ONBOARDING-*` résiduel à la racine.* <!-- sb commit=50445a77 gf1=n -->
  - Objectif : supprimer les ~52 images-preuves à la racine, archiver `ONBOARDING-*`, pointeur
    README. ⚠️ **non supprimables en sandbox** : flaguer pour exécution Simon/local si bloqué.
  - Fichiers : racine repo, `docs/archive/`, `README.md`.
  - Preuve GF-1 : `ls` racine propre (ou liste résiduelle documentée + raison sandbox) ; `visual-audit/` GARDÉ.
  - Dépend de : —
- [x] **P0.0-e — Hygiène git** (`state/01 §f`). <!-- sb commit=7f286ab gf1=n note=git-only-70to6-branches -->
  - Objectif : `git worktree prune` (5 prunables), trier les 5 branches locales + remotes non
    mergées (`feat/contenu`, `feat/ds-coherence-v4b-phantom-color`, `feat/hero-2col-balance`,
    `fix/forms-api-endpoints-regression`, `worktree-1781168853`), traiter `stash@{0}`.
  - Fichiers : git only.
  - Preuve GF-1 : `git worktree list` propre + `git branch` trié + log de ce qui a été
    mergé/supprimé/conservé-et-pourquoi.
  - Dépend de : —

---

## Chantier P0.A — Migration home + nav + footer (ADR-003, fusion audit-03 E4)

> Source : `audits/03-audit-consolidé-2026-06-15.md` (P0-1..P0-5) + décisions `state/RECONCILIATION-REPORT.md` (addendum 2026-06-15). Racine commune = home/nav/footer alignés sur « cabinet d'orchestration IA » + grille 2/4/7/10k. Worker Opus, vérifié indépendamment (rule 09).

### Tâches finies
- [x] **P0.A-1 — Store pricing unique** : `src/data/pricing.ts` (grille 2 000/4 000/7 000/10 000 € + sur-mesure, plancher 2 000 € HT) consommé par home/audit/growth/proof-points/sitemap/demos ; 0 montant ancien user-facing. <!-- sb commit=34b265c gf1=y -->
- [x] **P0.A-2 — Liens 404 footer/home** : 0 lien 404 live depuis pages indexables (footer route déjà /acquerir /piloter /operer ; refs /solutions/* dans bloc DEV). check-internal-links 0 bloquant. <!-- sb commit=34b265c gf1=y -->
- [x] **P0.A-3 — Hero + positioning** : H1 « Le cabinet qui fait tourner votre PME à l'IA. », title « Cabinet d'orchestration IA pour PME · Site web intelligent · Montpellier », « câbler » banni → orchestrer/mettre en production (BookSession inclus). GF-1 : getComputedStyle H1/CTA opacity:1 visible desktop+mobile, 0 console error, screenshot. <!-- sb commit=34b265c gf1=y -->
- [x] **P0.A-4 — Retrait suisse/ETI/8k home + recadrage audit** : audit-maturite-ia → Diagnostic IA PME gratuit, métriques fabriquées retirées, renvoi grille 2 000 €. <!-- sb commit=34b265c gf1=y -->
- [x] **P0.A-5 — Source unique de cas** : home + manifesto consomment `getCollection('cases')` (Amploi/Balzeo/Les Carnets réels) ; CASE_FEED générique supprimé de sitemap.ts. <!-- sb commit=34b265c gf1=y -->

### Tâches en attente
- (aucune ; chantier livré 2026-06-15, build Complete! + tsc 0 + gates verts + GF-1 visuel)

---

## Chantier P0.1 — Réparations de liens (pré-purge, anti-casse)

> Source : `strategy/02 §4,§6.1`, `state/01 §d`. **À faire AVANT toute suppression** pour ne pas
> casser le build pendant la purge.

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.1-a — Retirer les liens vers `/technologies/microsoft-power-platform` (404 en nav)**. <!-- sb commit=0113bb1 gf1=y note=worker-369978a -->
  - Objectif : supprimer les références (la page sera supprimée en P0.2H de toute façon).
  - Fichiers : `src/data/partners.ts`, `src/lib/section-demos.ts`, `src/data/mega-menu.ts`.
  - Preuve GF-1 : `check-content-refs` vert + `grep` 0 lien résiduel + build vert.
  - Dépend de : —
- [x] **P0.1-b — Fixer les 3 liens Stripe PLACEHOLDER (cours école)** ou dé-publier les 3 cours. <!-- sb commit=0113bb1 gf1=y note=worker-369978a -->
  - Objectif : aucun cours non vendable lié en live (école supprimée en P0.2F, donc dé-publier suffit).
  - Fichiers : `src/content/.../ecole/courses/{automatiser-relances-crm-en-4-heures,prompter-claude-pour-les-non-tech,intro-ia-pme-b2b}.mdx`.
  - Preuve GF-1 : `grep` 0 lien Stripe placeholder live + build vert.
  - Dépend de : —
- [x] **P0.1-c — Résorber les liens demo → 404 résiduels**. <!-- sb commit=0113bb1 gf1=y note=worker-369978a -->
  - Objectif : `/offres/{audit-ia,deploiement,run,pilote,dette-technique,roadmap-ia,gouvernance-donnees}`
    + `/equipe/{elodie-tran,marc-devauchelle}` (slugs fictifs) + 2 SVG demo (`feature-console.svg`,
    `cases/finance-close.svg`) — re-vérifier au build, fixer ou retirer.
  - Fichiers : `src/lib/section-demos.ts`, `src/components/footer/Footer.astro`, `public/media|images`.
  - Preuve GF-1 : `check-content-refs` + `check-form-endpoints` verts + build vert (0 lien mort).
  - Dépend de : —

---

## Chantier P0.2 — Assainissement du site (purge fictif/thin A→I)

> Source : `strategy/02 §2,§6.2`. **Procédure par cible** : grep réfs → supprimer collection+routes
> → nettoyer nav/sitemap/manifest → **basculer toute section cataloguée sur `section-demos.ts`**
> (ne JAMAIS supprimer le composant section = casse `check-touchpoints`) → build + gates verts.
> **1 commit par lot.** ⚠️ Intègre la révision §0bis : pour Piloter/Opérer, on **fusionne le
> contenu en sections ancrées des piliers** (P0.3) avant/pendant la suppression des routes.

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.2-A — Lot A : collections auto-contenu + recâblages** ▸ *soldé (réconciliation 2026-07-19) : `comparisons`/`glossary`/`commerce`/`testimonials`/`personas`/`tunnels` toutes absentes de `src/content/` (Lot A1 comparisons+glossary + Lot A2 commerce+tunnels).* <!-- sb commit=68e2754b gf1=n -->
  - Objectif : supprimer `comparisons`+`/comparer/*`, `glossary`+`/glossaire/*`, `commerce`+`/commerce/*`,
    `testimonials`+routes, `personas`+routes, `tunnels`+routes ; **garder** `IntegrationsGrid`,
    `TestimonialBlock`, `PersonaSwitcher`/`PersonaAttributesGrid` (basculer sur demo) ; recâbler
    `index.astro` (home l.229), `cas/index`, `secteurs/index`, `bienvenue/commande`, `schema-builder.ts`.
  - Fichiers : `src/content/{comparisons,glossary,commerce,testimonials,personas,tunnels}/`,
    routes `/comparer|/glossaire|/commerce|/ressources/{testimonials,personas}/*`,
    `src/data/{mega-menu,tags}.ts`, `src/lib/{section-demos,library-manifest,schema-builder}.ts`, `sitemap.ts`.
  - Preuve GF-1 : `check-touchpoints` + `check-content-refs` + `check-usage-manifest` verts + build vert + `astro check` 0.
  - Dépend de : P0.1 (liens réparés).
- [x] **P0.2-B — Lot B : offres secondaires** (8 entrées `offres` + `/offres/revops` + `site-web-ia-landing`) ▸ *soldé (réconciliation 2026-07-19), PÉRIMÉ partiel : collection `offres` supprimée en entier (pas seulement les 8 secondaires) via 301 vers l'architecture services pivot V8, plus large que le lot initial.* <!-- sb commit=29e56b84 gf1=n -->
  - Objectif : supprimer `activation-ia`, `application-ia-pme`, `claude-cowork`, `conseil`,
    `growth-intelligence`, `infrastructure-ia`, `productivite-operationnelle-ia`, `composable-pilot` ;
    garder 3 offres réelles. **Remonter l'utile de `site-web-ia-landing` dans le pilier** avant rm (P0.4).
  - Fichiers : `src/content/offres/*`, routes correspondantes, nav, sitemap.
  - Preuve GF-1 : build vert + gates verts + sitemap ne liste plus ces URLs.
  - Dépend de : P0.4-a (pilier prêt à recevoir la cannibalisation) pour `site-web-ia-landing`.
- [x] **P0.2-C — Lot C : solutions secondaires (13)** — *coordonné avec P0.3 (fusion en sections piliers)* ▸ *soldé (réconciliation 2026-07-19) : collection `solutions` supprimée en entier (pivot V8, architecture services).* <!-- sb commit=07098034 gf1=n -->
  - Objectif : supprimer les **routes** `/solutions/<sous-service>` Piloter (`tableaux-de-bord-analytics`,
    `reporting-ia`, `donnees-centralisees`, `previsionnel-ia`, `agent-analytique`, `finance`) + Opérer
    (`crm-relances-ia`, `productivite-ia`, `support-client-ia`, `administration-rh-ia`, `legal-ia`,
    `agents-metiers`, `fintech`) + `acquisition-ia` + `site-web-ia-pme` ; **fusionner le contenu utile
    (pains) en sections ancrées des piliers** (P0.3) au lieu de jeter.
  - Fichiers : `src/content/solutions/*`, routes, `mega-menu.ts`, `sitemap.ts`.
  - Preuve GF-1 : build vert + gates verts + le contenu fusionné apparaît dans les piliers (cross-check P0.3).
  - Dépend de : P0.3 (piliers créés pour accueillir le contenu).
- [x] **P0.2-D — Lot D : agence / démos fictives** (`careers`, `docs`, `governance`, **`trust-center`**, `/console`, `/atlas`). <!-- sb commit=b818142 gf1=y -->
  - Objectif : supprimer (trust-center = **risque légal** : fausses certifs ISO/SOC2/RGPD) + retirer
    les liens `mega-menu.ts` (colonne Agence).
  - Fichiers : routes `/agence/*`, `/console`, `/atlas`, `src/data/mega-menu.ts`.
  - Preuve GF-1 : build vert + gates verts + `grep` 0 lien résiduel + 0 mention certif fictive.
  - Dépend de : —
- [x] **P0.2-E — Lot E : ressources hors silo** ▸ *soldé (réconciliation 2026-07-19) : `changelog`/`veille-ia`/`field-notes`/`livres-blancs`/`cookbooks` toutes absentes de `src/content/`.* <!-- sb commit=eb1acb2c gf1=n -->
  - Objectif : supprimer `changelog`, `veille-ia`, `field-notes`, `livres-blancs` (+`ai-act-readiness`),
    `cookbooks` (index + 3 standalone + collection), `personas`, `testimonials`, taxonomies
    `/ressources/{categorie,tag,silo}/*`.
  - Fichiers : `src/content/{changelog,veille-ia,field-notes,livres-blancs,cookbooks}/`, routes, nav, sitemap.
  - Preuve GF-1 : build vert + gates verts + sitemap propre.
  - Dépend de : P0.2-A (personas/testimonials déjà recâblés).
- [x] **P0.2-F — Lot F : école** (`ecole` 3 cours stub + `/ecole/*`). <!-- sb commit=e453831 gf1=y -->
  - Objectif : supprimer (Stripe placeholder, non vendable) ; régénérer au vrai go-live produit.
  - Fichiers : `src/content/ecole/`, routes `/ecole/*`, nav.
  - Preuve GF-1 : build vert + gates verts + 0 lien école en nav.
  - Dépend de : P0.1-b.
- [x] **P0.2-G — Lot G : blog hors silo** (supprimer 15, garder 6 in-silo). <!-- sb commit=e453831 gf1=y -->
  - Objectif : GARDER `seo-geo-etre-cite-par-les-ia-generatives`, `automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil`,
    `cabler-son-crm-en-10-jours`, `avis-n8n-vs-zapier-2026`, `agent-ia-vs-automatisation-classique-2026`,
    `essai-pillar-ia-pme-2026` ; SUPPRIMER les 15 hors silo (liste `strategy/02 §2G`).
  - Fichiers : `src/content/blog/*` (ou collection articles), `sitemap.ts`.
  - Preuve GF-1 : build vert + sitemap = 6 articles + 0 lien interne mort vers les supprimés.
  - Dépend de : —
- [x] **P0.2-H — Lot H : technologies, secteurs, cas fictifs**. <!-- sb commit=2c02956 gf1=y -->
  - Objectif : supprimer `technologies/virtuoseos` + stubs `claude-code/claude-surfaces/frameworks` +
    `microsoft-power-platform` (garder `claude-models`) ; supprimer **contenu** `secteurs` (3) + `cases`
    (4 fictifs) mais **GARDER les composants/templates** (`CaseStudy`, secteur) pour reconstruire en réel (P0.6).
  - Fichiers : `src/content/{technologies,secteurs,cases}/`, routes, `partners.ts`, `section-demos.ts`, `mega-menu.ts`.
  - Preuve GF-1 : `check-touchpoints` vert (composants conservés) + build vert + sitemap sans fictif.
  - Dépend de : P0.1-a.
- [x] **P0.2-I — Lot I : miroir `/en/*` (lancement FR monolingue)**. <!-- sb commit=d99d403 gf1=y -->
  - Objectif : supprimer toutes les routes `/en/*` ; **garder l'infra i18n** (réactivable à traction).
  - Fichiers : routes `/en/*`, config i18n (laisser le mécanisme, retirer la génération EN).
  - Preuve GF-1 : sitemap = FR only (~28 URLs) + build vert + `astro check` 0 + 0 hreflang EN orphelin.
  - Dépend de : tous les lots de contenu ci-dessus (éviter de purger EN deux fois).
- [x] **P0.2-J — Purge collections mortes & fichiers parasites** (`state/01 §f-bis`). <!-- sb commit=7f286ab gf1=n note=no-op-GF4 --> ✅ **RÉSOLU (no-op documenté, nuit 2026-06-12)** : triangulation GF-4 → cibles déjà supprimées (templates `ServiceDetail`/`Hub` en R0, pages parasites, collections nommées inexistantes) OU gardées exprès (`cas`/`secteurs` per `strategy/02`, schéma `courses` = asset réutilisable École). Détail : `night-sessions/2026-06-12.md`.
  - Objectif : purger collections 0-entrée (`produits`, `abonnements`, `landingPages`, `welcomePages`,
    `newsletter`) + 43 MDX dormants (`brandVoice`/`painPoints`/`knowledgeBase`/`proofPoints`/`guarantees`) ;
    supprimer `src/pages/test-composable.astro` + `archive.astro` ; supprimer templates code-mort
    `ServiceDetailTemplate` + `HubTemplate` (0 conso).
  - Fichiers : `src/content/*`, `src/pages/{test-composable,archive}.astro`, `src/components/templates/{ServiceDetail,Hub}Template.astro`, `src/content/config.ts`.
  - Preuve GF-1 : build vert + `astro check` 0 + `check-touchpoints` vert + `grep` 0 import des supprimés.
  - Dépend de : P0.2-A..I (s'assurer qu'aucune route ne les consomme plus).
- [x] **P0.2-K — Sweep honnêteté data-roots & MDX (vague 1)** : retrait des faux cas clients + métriques-résultats fabriquées (~26 fichiers MDX, ~1740 lignes). <!-- sb commit=66ec505 gf1=y note=batches-dbdf7b8-8335d9f-db73f77 -->
  - Preuve GF-1 : build Complete! cache-purgé + grep `case_kicker`/`mesuré` = 0 + gates verts + Playwright pages non-thin. Détail : `night-sessions/2026-06-12.md`.
- [x] **P0.2-L — Sweep honnêteté data-roots (vague 2)** : `proof-points.ts` (26 métriques reframées), `sitemap.ts` (CASE_FEED → domaines), `mega-menu.ts` assainis (~11 fichiers). <!-- sb commit=4fdd6a4 gf1=y note=worker-a668ced -->
  - Preuve GF-1 : build Complete! + 3 gates + grep HTML site-wide = 0 faux client + Playwright home/cas (h1 opacity 1, reframé « mesuré sur vos données »).

---

## Chantier P0.3 — Silo Acquérir ouvert + piliers Piloter/Opérer (ADR-003)

> Source : **`specs/03-adr-ouverture-silo-acquerir.md` (ADR-003, FAIT FOI)** + mapping `state/06` + audit
> `visual-audit/AUDIT-SECTIONS-SERVICE.md`. ADR-003 amende ADR-002 : **Acquérir (Growth System IA)**
> s'ouvre en **silo de 3 pages service**, chacune en 2 surfaces (`/services/<slug>` SEO + `/lp/<slug>`
> conversion). **Piloter** et **Opérer** restent vitrine légère (sections ancrées, silos non développés).
> URLs : piliers en verbe (`/acquerir`, `/piloter`, `/operer`), services sous `/services/`, landings sous
> `/lp/`. Tout en **composable** (`SectionsRenderer` + frontmatter `sections:`), **jamais de markup inline**
> (anti-orphelin). DS figé : 0 nouveau token. SEO escalonné : Site web IA d'abord.

### Tâches finies
- [x] **P0.3-pre — Infra ancres sections composables** : `SectionsRenderer` émet un `id` scrollable optionnel par section (`z.intersection` sur `sectionsArraySchema`, `scroll-margin-top`). Pré-requis de P0.3-f/g + P0.5-a. <!-- sb commit=38d290b gf1=y note=worker-886916e -->
  - Preuve GF-1 : additif 0 régression (build Complete! + pages sans `anchor:` identiques + page test = 1 span + gates verts). Détail : `night-sessions/2026-06-12.md`.

### Tâches en attente

**Phase A — fondations (template + retrait legacy)**
- [x] **P0.3-b — Template page service refondu (séquence composable)**. <!-- sb commit=86aba71 gf1=y note=13-sections-ordre-correct+page-demo-noindex+doc-07+build-Complete -->
  - Objectif : figer la séquence de slots validée par l'audit, en sections cataloguées : `hero-conversion-funnel → proof-bar → problems-grid + diagnostic-stages → method-timeline + workflow-table → deliverables-grid + feature-split-media → stats-bento/roi-band → comparison-duo → pricing-cards → faq-two-column → footer-cta-band`. Composable pur, réutilisable par les 3 pages service.
  - Livré : page réf `/offres/template-service-ref` (noindex, exclue sitemap) + `docs/state/07-template-page-service.md`. 13 types rendus dans l'ordre, 0 substitution.
  - Fichiers : sections cataloguées (`src/components/sections/*`), `section-demos.ts` si données.
  - Preuve GF-1 : page test composée preview above-fold + `getComputedStyle` opacity≠0 + build vert.
  - Dépend de : P0.3-pre.
- [x] **P0.3-h — Retrait `OffresDetailTemplate` (legacy mort) + ses 3 stubs → 404**. <!-- sb commit=e953287 gf1=y note=build-Complete+3stubs-absents-dist+0-import-residuel -->
  - Objectif : supprimer le template orphelin (seul rendu = placeholder `[...slug].astro:164`), router ses 3 stubs (`offres/audit-process-intelligence`, `mcp-connectors`, `agents-metiers`) en 404.
  - Fichiers : `src/components/templates/OffresDetailTemplate.astro`, `src/pages/[...slug].astro`, `library-manifest.ts`.
  - Preuve GF-1 : build vert + les 3 URLs renvoient 404 + 0 import résiduel (`grep`).
  - Dépend de : mapping `state/06` (état template confirmé).
- [x] **P0.3-i — Propager `seo.noindex` vers `<Base>` dans `[...slug].astro`** (bug remonté par P0.3-b). <!-- sb commit=26e7fc0 gf1=y note=offres+solutions+technologies-noindex-meta-robots-verifie-dist -->
  - FAIT : offres/solutions/technologies `[...slug].astro` propagent `data.seo?.noindex`. `Base.astro` honorait déjà la prop. secteurs/cas filtrent déjà noindex dans `getStaticPaths` (non concernés).
  - Objectif : la route composable `src/pages/offres/[...slug].astro` ne passe pas `data.seo.noindex` à `<Base noindex>` → meta robots reste `index, follow` malgré `seo.noindex: true`. **Bloquant pour les landings `/lp/<slug>`** (ADR-003, doivent être noindex). Vérifier aussi les autres routes composables (`secteurs`, `solutions`).
  - Preuve GF-1 : build vert + page noindex → `<meta name="robots" content="noindex">` présent dans le HTML généré (`grep` dist).
  - Dépend de : —
- [x] **P0.3-j — Fondation routing `/services` + `/lp` (collections + routes composables)**. <!-- sb commit=5b87ab2 gf1=y note=collections-services+lp+2routes-pattern-solutions+mdv-ref-deplace-offres-vers-services+lp-noindex-sitemap-robots+build-Complete+19-sections+meta-noindex+offres-404 -->
  - Objectif : poser l'infra structurelle dont dépendent P0.3-c/d/e : collections `services` + `lp` (`content.config.ts`, schéma minimal `baseFields+taxonomyFields+sections`) + routes `src/pages/services/[...slug].astro` et `src/pages/lp/[...slug].astro` (pattern `solutions`, anti-orphelin). MDX de référence déplacé `offres/` → `services/`. `/lp/*` noindex par défaut (sitemap filter + robots disallow).
  - Fichiers : `src/content.config.ts`, `src/pages/services/[...slug].astro`, `src/pages/lp/[...slug].astro`, `src/content/services/template-service-ref.mdx` (déplacé), `src/data/sitemap-noindex-exclude.ts`, `astro.config.mjs`.
  - Preuve GF-1 : build `Complete!` + `/services/template-service-ref` générée (19 sections, `<meta name="robots" content="noindex, follow">`) + ancienne `/offres/template-service-ref` absente (404 net) + `/lp` vide (0 MDX, 0 page).
  - Dépend de : P0.3-b, P0.3-i.

**Phase B — hub Acquérir + 3 pages service**
- [x] **P0.3-a — Hub pilier Acquérir `/acquerir`** + redirect `301 /offres/growth-system-ia → /acquerir`. ▸ *PÉRIMÉ (réconciliation 2026-07-19) : pivot V8 : `/acquerir` est 301→`/services` (astro.config.mjs:205), le hub vivant est `/services/systeme-acquisition` ; le 301 growth-system-ia pointe `/services`.* <!-- sb commit=3b89e6d2 gf1=n -->
  - 🟢 PAGE FAITE (commit d26a8b5, GF-1 : build Complete! + `/acquerir` généré indexable + H1 opacity1 + 3 liens `/services/*` cliquables DOM + ancres seo-geo/publicite/agent-marketing + screenshot). ⏭️ RESTE : 301 `growth-system-ia`→`/acquerir` + retrait ancienne page de `offres` + lien depuis méga-menu (= vague bascule P0.5-a, après revue Simon). Case `[x]` quand le 301 + la bascule sont posés.
  - Objectif : recomposer `growth-system-ia.mdx` (déjà composable) en hub : vision système marketing IA + présentation des 3 services + sections ancrées `#site-web-ia`, `#content-marketing`, `#tunnel-conversion`. Maillage vers `/services/*`.
  - Fichiers : `src/content/offres/growth-system-ia.mdx` (→ route `/acquerir`), config redirect.
  - Preuve GF-1 : screenshot above-fold + ancres scroll OK + `/offres/growth-system-ia` → 301 + build vert.
  - Dépend de : P0.3-b, P0.5-a (mega-menu).
- [x] **P0.3-c — Page service Site web intelligent `/services/site-web-intelligent`** (surface service ; `/lp/` = Phase C). <!-- sb commit=c1d07a8 gf1=y note=build-Complete+page-generee+meta-index-follow+H1-opacity1-transform-neutre+CTA-visible+0console-bloquant+screenshot-abovefold -->
  - Objectif : page service SEO via template P0.3-b. Recycle `solutions/site-web-ia-pme.mdx` (corps PME) + `offres/site-web-ia*.astro` (tunnel/landing). C'est la page muscle-d'abord (cluster P1). Slug `-intelligent` (doctrine `strategy/06`, accent promesse).
  - Fichiers : `src/content/.../site-web-ia.mdx` (`sections:`), landing `/lp/`.
  - Preuve GF-1 : screenshot above-fold service + landing + opacity≠0 + 1 CTA primaire + build vert.
  - Dépend de : P0.3-b, P0.4-a (cannibalisation).
- [x] **P0.3-d — Page service Content marketing intelligent `/services/content-marketing-intelligent`** (surface service ; `/lp/` = Phase C). <!-- sb commit=c1d07a8 gf1=y note=build-Complete+page-generee+meta-index-follow+H1-opacity1-transform-neutre+CTA-visible+screenshot-abovefold+desc-fr-corrigee-180 -->
  - Objectif : **fusion** `solutions/content-marketing-ia.mdx` (canonique, 8 sections exploitables) + `solutions/contenu-seo-geo-ia.mdx` (volet SEO/GEO). Template P0.3-b. SEO/GEO reste fusionné ici, PAS de page séparée (doctrine `strategy/06` §3).
  - Fichiers : `src/content/.../content-marketing-ia.mdx`, landing `/lp/`.
  - Preuve GF-1 : screenshot above-fold + opacity≠0 + build vert.
  - Dépend de : P0.3-b.
- [x] **P0.3-e — Page service Tunnel de conversion intelligent `/services/tunnel-conversion-intelligent`** (surface service ; `/lp/` = Phase C). <!-- sb commit=c1d07a8 gf1=y note=build-Complete+page-generee+meta-index-follow+H1-opacity1-transform-neutre+CTA-visible+screenshot-abovefold+spec-produit-landing3paliers+nurturing-conditionnel -->
  - Objectif : recycle `solutions/tunnel-de-vente.mdx` (canonique) + `solutions/acquisition-ia.mdx` (chapô). Template P0.3-b. Décrit le produit : landing 3 paliers + lead magnet de scoring + tunnel 3-4 étapes + nurturing conditionnel (interactions email + réponses scoring) + sur-mesure. Quizz/lead magnet réellement construits = Phase C (P0.3-k).
  - Fichiers : `src/content/.../tunnel-conversion-ia.mdx`, landing `/lp/`.
  - Preuve GF-1 : screenshot above-fold + opacity≠0 + build vert.
  - Dépend de : P0.3-b.

**Phase B — piliers vitrine (silos non développés)**
- [x] **P0.3-f — Pilier Piloter `/piloter` (Business Intelligence)** — sections ancrées. <!-- sb commit=eb14387 gf1=y note=page-generee+6-anchors(revops/tableaux-de-bord/reporting-ia/donnees-centralisees/previsionnel-ia/agent-analytique)+meta-index-follow+H1-opacity1+CTA-visible+feature-split-degrade-propre-sans-media+screenshot -->
  - Objectif : page vitrine ancrée `#revops`, `#tableaux-de-bord`, `#reporting-ia`, `#donnees-centralisees`, `#previsionnel-ia`, `#agent-analytique`. Indexée, sans cluster (non offensive, ADR-002). Nourrie par les solutions Piloter (cf `state/06` ancres).
  - Fichiers : `src/content/.../piloter.mdx`, sections cataloguées.
  - Preuve GF-1 : screenshot above-fold + ancres OK + build vert.
  - Dépend de : P0.3-pre.
- [x] **P0.3-g — Pilier Opérer `/operer` (Opérations IA)** — sections ancrées. <!-- sb commit=eb14387 gf1=y note=page-generee+6-anchors(crm-relances/automatisation/service-client/admin-rh/legal/agents-metiers)+meta-index-follow+H1-opacity1+CTA-visible+screenshot -->
  - Objectif : page vitrine ancrée `#crm-relances`, `#automatisation`, `#service-client`, `#admin-rh`, `#legal`, `#agents-metiers`. Quelques pages enfant métier possibles (différé). Non offensive.
  - Fichiers : `src/content/.../operer.mdx`, sections cataloguées.
  - Preuve GF-1 : screenshot above-fold + ancres OK + build vert.
  - Dépend de : P0.3-pre.

**Phase C — conversion (après fondations stables)**
- [ ] **P0.3-k — Quizz lead magnet** (interactif, Q/R conditionnelles, routage vers l'offre par profil). ▸ *REPORTÉ 2026-07-19 (arbitrage Simon, fiche 0023) : « pas utile pour le moment ». Ne pas exécuter sans nouveau signal.*
  - Objectif : étude de marché + lead gen + routage. S'appuie sur collections `tunnels` + `outils` existantes. Branché sur les landings `/lp/`.
  - Fichiers : `src/content/tunnels/*` ou `src/content/outils/*` (type `audit`), composant quizz.
  - Preuve GF-1 (fonctionnelle) : flow E2E Playwright (réponses → routage correct) + persistance lead vérifiée + build vert.
  - Dépend de : P0.3-c/d/e (services + landings en place).

---

## Chantier P0.4 — Cannibalisation « site web IA » + maillage silo (ADR-003)

> Source : `strategy/02 §2B,§5.8,§6.5` + ADR-003. Les multiples URL « site web IA » convergent vers
> **1 page service** `/services/site-web-ia` (+ sa landing `/lp/site-web-ia`). Maillage : hub `/acquerir`
> vers les 3 pages service.

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.4-a — Converger les sources « site web IA » vers `/services/site-web-ia`** ▸ *soldé (réconciliation 2026-07-19) : canonique unique `/services/site-web-ia-intelligent` + enfants, 301 en place, 0 doublon indexé.* <!-- sb commit=66ec5057 gf1=n -->
  - Objectif : remonter le contenu utile de `site-web-ia-pme` (pains PME) + `site-web-ia*.astro` (tunnel/landing) dans la page service, puis supprimer les sources (0 doublon indexé, 1 page service + 1 landing).
  - Fichiers : `src/content/.../site-web-ia.mdx`, `src/content/solutions/site-web-ia-pme.*`, `src/pages/offres/site-web-ia*.astro`.
  - Preuve GF-1 : `grep` 0 doublon « site web IA » indexé + build vert + la page service contient les pains remontés.
  - Dépend de : P0.3-c.
- [x] **P0.4-b — Maillage silo : hub `/acquerir` → 3 services + inter-services** ▸ *PÉRIMÉ (réconciliation 2026-07-19) : le hub cible `/acquerir` n'existe plus (301 vers `/services`), le maillage vit désormais dans `internal-mesh`/`related-links`.* <!-- sb commit=0ce3b6ab gf1=n -->
  - Objectif : section maillage du hub vers `/services/{site-web-ia,content-marketing-ia,tunnel-conversion-ia}` + liens contextuels inter-services.
  - Fichiers : `src/content/offres/growth-system-ia.mdx` (hub), sections cataloguées (maillage/grid).
  - Preuve GF-1 : `check-content-refs` vert + liens cliquables (screenshot) + build vert.
  - Dépend de : P0.3-a, P0.3-c/d/e.

---

## Chantier P0.5 — Méga-menu & Footer resserrés (ancres + whitelist)

> Source : `strategy/02 §6.3,§0bis` + ADR-003. Méga-menu 3 colonnes (Acquérir/Piloter/Opérer). Colonne
> **Acquérir** → hub `/acquerir` + liens directs vers les 3 **pages service** `/services/*` (silo ouvert).
> Colonnes **Piloter** (`/piloter#...`) et **Opérer** (`/operer#...`) → **ancres** (silos non développés).

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.5-a — Recâbler `mega-menu.ts` sur l'arbo ADR-003** ▸ *PÉRIMÉ (réconciliation 2026-07-19) : mega-menu refondu V8.3 systèmes, ADR-003 abandonné au profit de l'architecture services/systèmes.* <!-- sb commit=3b89e6d2 gf1=n -->
  - Objectif : colonne Acquérir → `/acquerir` + 3 liens `/services/{site-web-ia,content-marketing-ia,tunnel-conversion-ia}` ; Piloter → `/piloter#...` ; Opérer → `/operer#...`. Aucune entrée vers une page `/solutions/<sous-service>` supprimée (cf `state/06` URLs → 404).
  - Fichiers : `src/data/mega-menu.ts`, `src/components/header/Header.astro`.
  - Preuve GF-1 : screenshot méga-menu déployé + liens service OK + clic ancre Piloter/Opérer → scroll bonne section (`getComputedStyle` visible) + `grep` 0 lien vers route supprimée.
  - Dépend de : P0.3 (hub + services + piliers).
- [x] **P0.5-b — Footer resserré sur la whitelist** + retrait des routes « encore en Stub » ▸ *soldé (réconciliation 2026-07-19), vérifié 2026-07-19 : `Footer.astro` 187 lignes, 0 bloc « encore en Stub » résiduel, data-driven.* <!-- sb commit=88819513 gf1=n -->
  - Objectif : `Footer.astro` ne liste que les pages whitelist (`strategy/02 §1`) ; retirer le bloc
    « routes encore en Stub » (`Footer.astro:186-241`).
  - Fichiers : `src/components/footer/Footer.astro`.
  - Preuve GF-1 : screenshot footer + `check-content-refs` vert + 0 lien vers page supprimée.
  - Dépend de : P0.2 (suppressions faites), P0.3.
- [x] **P0.5-c — Sitemap & `robots`** alignés sur ~28 URLs FR (DS internes en noindex) ▸ *PÉRIMÉ (réconciliation 2026-07-19) : cible ~28 URLs remplacée par l'index-on-quality V7 §3, même pivot que P0.5-a.* <!-- sb commit=3b89e6d2 gf1=n -->
  - Objectif : `sitemap.ts` = whitelist FR only ; outils DS (`/agence/{design-system,ds-studio,hero-lab}`,
    `/preview/*`, `/components/*`, `/categories/*`, `/compare/organisms`) en `robots disallow` (seul noindex conservé).
  - Fichiers : `src/pages/sitemap*.ts|xml`, `robots.txt` / config.
  - Preuve GF-1 : build → sitemap généré = ~28 URLs FR, 0 fictif ; `robots` couvre les outils DS.
  - Dépend de : P0.2, P0.3, P0.4.

---

## Chantier P0.6 — Assainissement véridique (fin du décor d'agence)

> Source : `strategy/02 §2D,§6.4,§7`. Zéro chiffre/client/certif inventé. Studio **solo** Simon Beros,
> pas d'agence à 10 ni bureaux Paris-Genève. Preuve réelle = `waimia.com`, `virtuoseweb.fr` + vrais cas.

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.6-a — Réécrire `/agence/about`** (studio solo, bio véridique). <!-- sb commit=c19a2b4 gf1=y note=feat-118dbb3-proof-65edc90 -->
  - Objectif : retirer agence-10 / bureaux Genève / ancienneté fausse ; positionner praticien solo crédible.
  - Fichiers : `src/content/.../agence/about.*`, sections cataloguées.
  - Preuve GF-1 : screenshot + `grep` 0 mention « 10 personnes / Genève / Paris » + build vert.
  - Dépend de : P0.2-D.
- [x] **P0.6-b — Assainir `/manifesto`, `/agence/methode`, `/contact`, `/equipe` + `/equipe/simon-beros`**. <!-- sb commit=c19a2b4 gf1=y note=methode-deja-honnete -->
  - Objectif : retirer chiffres inventés (manifesto), corriger l'ancienneté (méthode), retirer fausses
    adresses + cal.com réel (contact), page auteur E-E-A-T fondateur (equipe).
  - Fichiers : `src/content/.../{manifesto,agence/methode,contact}.*`, `src/content/authors/simon-beros.*`.
  - Preuve GF-1 : screenshots + `grep` 0 fausse adresse/chiffre + form `/contact` POST réel testé
    (`check-form-endpoints` vert).
  - Dépend de : —
- [x] **P0.6-c — Réécrire la home `/`** focalisée silo + preuve réelle ▸ *soldé (réconciliation 2026-07-19) : GATE C, la variante E (13 slots, tabs offres, quiz, maillage) est devenue la home live, composable V8.* <!-- sb commit=dd46a5a4 gf1=y -->
  - Objectif : home recentrée sur le silo Site web IA + preuves réelles ; recâbler la ligne testimonials
    (l.229) sur la demo. ⚠️ `HeroHome` = **VETO** dark/registry (ne pas migrer le hero).
  - Fichiers : `src/pages/index.astro`, `ui/organisms/*`, `section-demos.ts`.
  - Preuve GF-1 : screenshot above-fold + `getComputedStyle` hero (opacity≠0) + 1 CTA primaire + build vert.
  - Dépend de : P0.2-A (testimonials recâblés), P0.3-d.

---

## Chantier P0.7 — Pages légales (conformité, BLOQUANT)

> Source : `strategy/02 §3`. N'existent pas, juste référencées dans `sitemap.ts`. **Bloquant conformité.**

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.7-a — Créer `/mentions-legales`**. <!-- sb commit=b2e9a7d gf1=y -->
  - Objectif : mentions légales conformes (éditeur, hébergeur, SIREN, contact) — données réelles Simon.
  - Fichiers : `src/pages/mentions-legales.astro` (ou MDX composable), sections cataloguées (légal/texte).
  - Preuve GF-1 : page rend (screenshot) + lien footer OK + build vert + `check-content-refs` vert.
  - Dépend de : P0.2-A (pas de section légale orpheline).
- [x] **P0.7-b — Créer `/politique-de-confidentialite` (RGPD)**. <!-- sb commit=b2e9a7d gf1=y note=route-/politique-confidentialite -->
  - Objectif : politique RGPD conforme (cookies < 5, finalités, droits, DPO/contact).
  - Fichiers : `src/pages/politique-de-confidentialite.astro` (ou MDX), bandeau cookies si applicable.
  - Preuve GF-1 : page rend + lien footer + build vert + cookies réels comptés < 5 (preuve réseau).
  - Dépend de : —

---

## Chantier P0.8 — Pricing (offer ladder) — SUPERSEDED par P0.A

> ⚠️ **Périmé 2026-06-15** : le plancher « 3 000 € HT » (P0.8-a, commit `8643949`) est remplacé par la
> **grille 2 000 / 4 000 / 7 000 / 10 000 € + sur-mesure** (plancher 2 000 € HT) pilotée par `src/data/pricing.ts`
> (chantier **P0.A-1**, commit `34b265c`). Source décision : `state/RECONCILIATION-REPORT.md` §4. Ce chantier
> reste tracé pour l'historique ; la source de vérité pricing est désormais P0.A.
> Source d'origine : `strategy/02 §6.8`, `business/08`.

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.8-a — Câbler le pricing 3 000 € HT sur le pilier + hub offres**. <!-- sb commit=8643949 gf1=y note=push-b1f1125 -->
  - Objectif : section Offre/pricing du pilier (`strategy/02 §5.7`) affiche 3 000 € HT + escalade ;
    hub `/offres` = 3 offres réelles only (audit / site web IA / growth system).
  - Fichiers : `src/content/offres/{site-web-ia,audit-maturite-ia,growth-system-ia}.mdx`, `/offres/index`.
  - Preuve GF-1 : screenshot section pricing + montant correct affiché + build vert.
  - Dépend de : P0.3-d, P0.4.

---

## Chantier P0.9 — Fondations d'acquisition (hors-repo, cash-first)

> Source : `business/08 §1` (quick wins), `marketing/04` (canaux), `marketing/02` (GTM),
> `business/06` (fiches offres), `business/07` (pitch RDV). **Hors code site** mais P0 cash : à
> préparer en parallèle (assets livrables, pas forcément du code). Marquer `[?]` ce qui exige une
> action externe de Simon (création de compte, photos, avis clients).

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.9-a — Lead magnet = landing audit quick win** (CTA unique partout) ▸ *soldé (réconciliation 2026-07-19) : `/audit-ia-pme` + `/audit-site-web-intelligent` live, CTA Cal audit gratuit câblé.* <!-- sb commit=1200d1ad gf1=n -->
  - Objectif : page/landing « Audit IA gratuit 30 min, repartez avec 3 actions chiffrées », 1 CTA cal.com,
    réutilisée GBP/LinkedIn/signature. (`business/08` QW3, `marketing/04`.)
  - Fichiers : `src/content/offres/audit-maturite-ia.mdx`, sections cataloguées, lien cal.com réel.
  - Preuve GF-1 : screenshot landing + CTA cliquable vers cal.com réel + build vert.
  - Dépend de : P0.3, P0.6-b (cal.com réel câblé).
- [x] **P0.9-b — Fiches & présentations offres prêtes** (sales enablement) ▸ *soldé (réconciliation 2026-07-19) : `docs/business/06-fiches-offres.md` + `07-pitch-rdv.md` + `10-presentations-offres-core.md` présents.* <!-- sb commit=b794106c gf1=n -->
  - Objectif : fiches offres + pitch RDV exploitables (les 3 offres), prêtes à envoyer/présenter.
  - Fichiers : `docs/business/06-fiches-offres.md`, `docs/business/07-pitch-rdv.md` (formaliser livrables).
  - Preuve GF-1 : livrables relus, cohérents avec pricing 3 000 € + offer ladder.
  - Dépend de : P0.8.
- [x] **P0.9-c — Setup Google Business Profile** (QW1). ▸ *soldé 2026-07-19 (arbitrage Simon, fiche 0023) : fiche GBP virtuoseweb réutilisée « pour le moment » ; déjà câblée sameAs LocalBusiness (schema-builder.ts:110, redirection vérifiée kgmid /g/11vx0_x0vf) + sameAs global seo.ts aligné (profils morts x/github retirés). Photos/avis restent côté Simon.* <!-- sb commit=e45e4a74 gf1=y -->
  - Objectif : GBP complet (catégorie agence web/IA, zone Montpellier, 10 photos, description mots-clés,
    FAQ) + demander 3-5 avis clients réels.
  - Fichiers : hors repo (action Simon `[?]` pour photos/avis).
  - Preuve GF-1 : profil publié + URL fournie + cohérence entité avec le site (NAP).
  - Dépend de : P0.6 (identité véridique figée).
- [x] **P0.9-d — Setup LinkedIn personal brand Simon** (canal n°1, QW6). ▸ *soldé 2026-07-19 (arbitrage Simon, fiche 0023) : page + profil actualisés et prêts (linkedin.com/company/waimia, URL vérifiée 200) ; déjà câblé footer (Footer.astro:117) + sameAs des 2 builders JSON-LD. L'animation du canal reste côté Simon.* <!-- sb commit=e45e4a74 gf1=y -->
  - Objectif : profil optimisé + 3 premiers posts orientés preuve + CTA doux audit (`marketing/04 §1`).
  - Fichiers : hors repo (action Simon `[?]`).
  - Preuve GF-1 : profil/posts publiés + CTA pointant la landing audit (P0.9-a).
  - Dépend de : P0.9-a.

---

## Chantier P0.10 — Vérification finale P0 (gate de phase)

### Tâches finies
_(vide)_

### Tâches en attente
- [x] **P0.10-a — Build + check + sitemap = base propre**. ▸ *gate passé 2026-07-19 : build `Complete!` + astro check baseline 8 + check:board/no-emdash/section-aggregate/section-modules verts + sitemap-index généré + sweep previews 208/208 (2026-07-16) + GF-1 prod home/lp du jour.* <!-- sb commit=88819513 gf1=y -->
  - Objectif : `build` vert + `astro check` 0 + tous `check-*` verts + sitemap ~28 URLs FR + 0 orphelin
    + 0 lien mort (`check-content-refs`) + 0 page fictive indexée.
  - Fichiers : tout le repo.
  - Preuve GF-1 : sortie build `Complete!` + sortie gates + sitemap inspecté + sweep visuel des pages whitelist (Playwright).
  - Dépend de : tout P0.

---

# PHASE P1 — SEO/GEO & contenu

> Source : `strategy/01 §7`, `strategy/03-recherche-seo-geo`, `strategy/04-geo-aio-methode`,
> `marketing/03-content-editorial`. Pas d'Ahrefs (pas d'abonnement) → recherche **gratuite**.

## Chantier P1.1 — Recherche keyword gratuite → figer les H1

### Tâches finies
_(vide)_
### Tâches en attente
- [x] **P1.1-a — Passe keyword gratuite** (SERP, autocomplete, Google Trends, Keyword Planner, GSC post-lancement) ▸ *soldé (réconciliation 2026-07-19) : `strategy/14-keyword-conversion-map.md` (97 URLs, 4 analyses).* <!-- sb commit=10e4c979 gf1=n -->
  - Objectif : figer les **H1** du pilier silo + des 5 enfants + 3 piliers, sans outil payant.
  - Fichiers : `docs/strategy/03-recherche-seo-geo.md` (consigner), puis H1 dans les `.mdx`.
  - Preuve GF-1 : tableau keyword → H1 figé + H1 effectifs dans le HTML bâti (grep `<h1`).
  - Dépend de : P0.3, P0.4 (pages existantes).
- [x] **P1.1-b — Appliquer les H1 figés** sur pilier + enfants + 3 piliers ▸ *soldé (réconciliation 2026-07-19) : H1 réels appliqués vague E refonte services.* <!-- sb commit=b7efa99e gf1=n -->
  - Objectif : 1 H1 unique et keyword-aligné par page indexée.
  - Fichiers : `src/content/{offres,solutions}/*.mdx`.
  - Preuve GF-1 : 1 seul `<h1>` par page (sweep HTML) + correspondance avec P1.1-a.
  - Dépend de : P1.1-a.

## Chantier P1.2 — Cluster blog silo « Site web IA »

### Tâches finies
_(vide)_
### Tâches en attente
- [x] **P1.2-a — 4-6 articles in-silo supplémentaires** (Mois 2) ▸ *soldé (réconciliation 2026-07-19) : 12 articles blog JSON dont pilier + cluster, dépasse le lot initial.* <!-- sb commit=1ec9363b gf1=n -->
  - Objectif : étendre le cluster autour du pilier (longue traîne + maillage interne vers le pilier).
  - Fichiers : `src/content/blog/*` (skill `article-add`), maillage vers `/offres/site-web-ia`.
  - Preuve GF-1 : articles rendus + liens internes vers le pilier (`check-content-refs`) + build vert.
  - Dépend de : P0.2-G (blog nettoyé), P0.3-d.

## Chantier P1.3 — GEO (schema, llms.txt, cohérence entité)

### Tâches finies
_(vide)_
### Tâches en attente
- [x] **P1.3-a — JSON-LD + FAQ schema.org** sur pilier + pages clés ▸ *soldé (réconciliation 2026-07-19) : `schema-builder.ts` complet (FAQPage/Service/Organization/…) câblé.* <!-- sb commit=c8433a5b gf1=n -->
  - Objectif : Organization/LocalBusiness + FAQPage (objections longue traîne) + Article sur le cluster.
  - Fichiers : `src/components/.../schema-builder.ts`, layouts, `.mdx`.
  - Preuve GF-1 : JSON-LD valide (Rich Results test) + présent dans le HTML bâti.
  - Dépend de : P0.3-d.
- [x] **P1.3-b — `llms.txt` + cohérence entité (GEO/AIO)** ▸ *soldé (réconciliation 2026-07-19) : `llms.txt` servi via `@4hse/astro-llms-txt` (`astro.config.mjs:296`). Reste ouvert : cross-check GBP externe non vérifié.* <!-- sb commit=b4ac2fda gf1=n -->
  - Objectif : `llms.txt` propre, formulations citables, NAP cohérent site ↔ GBP (`strategy/04`).
  - Fichiers : `public/llms.txt`, pages d'autorité, GBP (cross-check).
  - Preuve GF-1 : `llms.txt` servi (fetch 200) + cohérence entité vérifiée (site = GBP).
  - Dépend de : P0.9-c (GBP), P1.3-a.

---

# PHASE P2 — DESIGN / refonte DS (ACTIF, multi-passes — détail `state/05-design-refonte`)

> **Corrige l'erreur « design figé ».** Le design N'EST PAS terminé : DS + catalogue ont été créés
> pour refactorer en plusieurs passes (POC du logiciel webdesign interne, **DS fermé à variables**
> façon ACSS/Frames de Kevin Geary ; inspirations relume/Webflow/MUI). Dépend en partie de P0 (les
> **sections finales** des templates). Philosophie + #14 + ghost-detail : `state/05-design-refonte`.
> Un chantier ne se ferme **que quand sa COUVERTURE est prouvée**, pas quand « quelques » cas sont traités.

## Chantier P2.0 — Reconstituer l'état réel du design (ghost, AVANT de toucher)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.0 — Trianguler ce qui a été fait/ghosté** (GF-4, via tes logs/history/branches/worktrees/stash).
  Te poser : commit `5924d29` « harmonisation DS Batch 1 » = quel scope (`git show 5924d29 --stat`) ?
  une branche a-t-elle tenté `@theme inline` (`git branch -a | grep -i theme`) ? `section-presets.ts`
  contient quoi au-delà de hero ? `feat/ds-coherence-v4b-phantom-color` + stash `feat/library-heroes-enrich`
  portent quoi ? `tokenCount` réel = 106 ou 115 ? Reconstitue, note ICI, **ne refais rien sans mesure**.
 ▸ *réconcilié 2026-07-19 : largement couvert (`RECONCILIATION-REPORT.md` 2026-06-13), quasi soldé, garder ouvert comme méta.*

## Chantier P2.1 — Couverture & maintenance des captures (NE SE FERME JAMAIS)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.1-a — Établir la couverture réelle** (`docs/visual-audit/`). Le dossier est probablement
  **incomplet** (sections/templates oubliés). Te poser : quels templates × sections ont une capture
  above-fold À JOUR ? lesquels MANQUENT ? Construis l'inventaire templates × sections et compare.
  - ▸ *Avancement (commit `52e2c79`, gf1=y)* : couverture **preview-level** établie — sweep auto des
    186 `/preview/<type>` (desktop+mobile), triage défauts (9 liens morts 404 du catalogue corrigés,
    16 « no-heading » = sans-titre by design confirmés). Rapport : `docs/visual-audit/coverage-report.md`.
    Re-vérifié sur build courant (`verify-fix.mjs`) : 9/9 ex-404 à 0 erreur console, 16 sans-titre rendent du contenu.
  - ▸ *Avancement (commit `a1d54de`, gf1=y)* : sweep des **59 pages site FR live** (Base.astro complet)
    ajouté — 53 clean, 6 « h1-transform » = faux positifs confirmés (identité `matrix(1,0,0,1,0,0)`, opacity 1).
    Rapport : `docs/visual-audit/site-sweep.json` + section dédiée du `coverage-report.md`.
    **Reste** : inventaire templates × sections + captures versionnées (→ P2.1-b/c).
  - ▸ *réconcilié 2026-07-19 : PARTIEL (sweeps `52e2c79` + `a1d54de`), manque l'inventaire templates × sections.*
- [ ] **P2.1-b — Compléter : 1 capture above-fold par section de chaque template** (l'agent itère dessus).
- [ ] **P2.1-c — Corriger gitignore/pipeline** : rediriger le sweep (`scripts/gf1-cloud-sweep.mjs`,
  `visual-check.mjs`) de `/tmp` → `docs/visual-audit/{previews,sections}/...` (versionné) ; dé-ignorer
  `design-system-*.png` (`.gitignore:42`) + `gf1-*` (`:73-74`) OU les ranger sous `docs/visual-audit/`.
- [ ] **P2.1-d — Maintenance permanente** : à CHAQUE itération design → recapture la section touchée,
  remplace l'obsolète, supprime le périmé, garde la trace. **Chantier OUVERT tant que le design évolue.**

## Chantier P2.2 — Consolidation socle DS (#14 Phase A, anti-dette, 0 changement de rendu)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.2 — Mesurer PUIS consolider.** Te poser : combien de tokens (cible 115→~92) ? combien de
  groupes de classes scoped dupliqués (cible 280→<50, scan scoped `gen-ds-registry`) ? A2 (serif global)/
  A3 (`.sec`/`.sec-hd`)/A4 (purge tokens)/A6 (`var(--spacing-section)`) faits ou non (MESURE) ?
  Preuve : gates verts + GF-1 = 0 changement de rendu.
  - ▸ *MESURE faite 2026-06-21 (agent Explore + vérif GF-4 orchestrateur)* : **122 tokens** (cible ~92, +30).
    **A2 serif ✅**, **A3 `.sec*` ✅** (13 classes centralisées global.css:1417-1530), **A6 ✅** (0 `spacing-section`).
    Classes scoped dupliquées = **380 groupes** (`gen-ds-registry.mjs`, cible <50) → gros effort cross-composant séparé.
    ⚠️ **2 sur-claims de l'agent corrigés (NE PAS purger en aveugle)** : (1) les ~11 « orphelins » `--color-*`
    sont dans le bloc **`@theme` Tailwind 4** = **faux orphelins** (sémantique utility/var à vérifier par la
    **doc officielle Tailwind**, GF-6, avant toute suppression) ; (2) `global.css:1795 --accent-text` n'est PAS
    un doublon mais un **override scopé légitime** de `.page-pill-btn.is-active` (le retirer casse la pill active).
    Idem les « doublons » `--font-display/sans/mono/ease-out` (`:root` + `@theme`) tiennent à la sémantique `@theme`.
    **Verdict** : aucune purge sûre en aveugle → **consolider = chantier dédié sur sa propre branche**, décision
    stratégie `@theme` (garder/minimaliser) informée doc Tailwind + GF-1 par retrait. A4 reste OUVERT (mesure faite,
    purge en attente d'arbitrage `@theme`).
  - ▸ *réconcilié 2026-07-19 : mesure faite (122 tokens), purge en attente d'arbitrage `@theme`.*

## Chantier P2.3 — Fondation `@theme inline` (prérequis builder)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.3 — `@theme` mort → `@theme inline`** pointant `var(--token-maison)` (retirer les hex
  littéraux de `tokens.css`) pour que le DS Studio repeigne les utilities Tailwind. **Bloque P2.7/P2.8.**
 ▸ *réconcilié 2026-07-19 : à re-scoper, P2.7 a shippé sans lui.*

## Chantier P2.4 — Nettoyage variables CSS (vagues différées + arbitrages)
### Tâches finies
- [x] **P2.4-c — Renommage tokens DS en rôles lisibles : `--accent-2` → `--accent-sur-clair`** (37 occ / 13 fichiers + 2 JSON dérivés ; valeur #A83D20 inchangée ; rôle « accent AA sur fond clair »). Demande Simon 2026-06-14, noms de rôle compréhensibles dans le DS Studio. Recoupe P2.11-f. GF-1 = build vert + grep résiduel 0. <!-- sb commit=2fa3444 gf1=y -->
- [x] **P2.4-d — Token rôle `--accent-sur-sombre` #D96A47 (AA 5.72 sur ink) + var de rôle `--accent-text`** : seul rôle manquant prouvé (rule 60-A : `--accent`=4.35, `--accent-sur-clair`=3.14 échouent AA petit-texte sur ink). Var `--accent-text` (défaut `var(--accent)` = identique sur clair) remappée sous `[data-bg=ink]`/`.on-dark` ; migration 601 occ `color: var(--accent)` → `var(--accent-text)` sur 175 fichiers ; co-localisation surfaces sombres brutes (`.hero-card`, `.page-pill-btn.is-active`) ; exposé DS Studio. GF-1 = build vert + audit Playwright contraste /offres 2→0, home 1→0, accent clair inchangé. <!-- sb commit=c6b87a2 gf1=y -->
- [x] **P2.4-e — Petit-texte-accent AA sur fond clair (fiche 0006)** : `--accent-text` défaut passe de `var(--accent)` à `var(--accent-sur-clair)` (#A83D20=5.57 sur paper) ; tout le texte accent AA (clair + sombre), surfaces accent restent vif #C94F2E. Demande Simon 2026-06-14. GF-1 = build vert + Playwright /offres 0 échec AA, 121 sur-clair + 11 sur-sombre, 0 vivid résiduel, signature terracotta préservée (screenshot). <!-- sb commit=8391ea7 gf1=y -->
- [x] **P2.4-b — 4 incohérences : verdict par vérification (rule 09/59, déjà résolu)** : (B) `--radius-xs` inversion 4px>2px déjà corrigée (xs=2px<sm=4px, commentaire L129). (C) `--shadow-hairline`≡`--shadow-card-rest` déjà fusionné R4 (grep : 0 usage hairline résiduel, card-rest 4×). (D) `--col-full` conservé intentionnel (grid.css `.g12--full`, documenté L238). (A) `--section-*` (rythme vertical section) vs `--spacing-block` (rythme intra-bloc) = rôles distincts, pas un doublon, aucun rename (churn évité). Aucune modif code requise. <!-- sb commit=137632c gf1=na note=verifie-source-tokens.css -->
### Tâches en attente
- [ ] **P2.4-a — Vagues perceptibles** V9d (demi-pixels)/V9e (line-height)/V9f (tracking)/V9g (durées)/
  V9h (collapses) — `audits/02-token-coherence`. Te poser : laquelle change le rendu, laquelle non ?

## Chantier P2.5 — V-TYPO transverse (directive 01, jamais exécutée en transverse)
### Tâches finies
_(vide)_
### Tâches finies
- [x] **P2.5 — Passe typo transverse** <!-- sb commit=5d975da gf1=y note=heros-headers-5composants-override-scope-rebascule-font-sans+veto-masthead-respecte --> : héros/headers serif-full → base `--font-sans`, accent serif sur emphase de quelques mots (cause réelle : règles scopées des composants écrasaient le global, pas `global.css`). 5 composants (HeroCentered, HeroHubStats, HeroSplit, ProblemStatement, FitColumnsSection), 0 nouveau token. Vetos respectés : HeroHome `/`, masthead `/solutions`. GF-1 : getComputedStyle Inter Tight base + Instrument Serif accent, opacity 1.
### Tâches en attente
- [x] **P2.5-b — Reliquat hero-landing : raccourcir l'accent serif à un mot** (data-driven). <!-- sb commit=cf302b9 gf1=y note=h1-hero-landing-accent-dernier-mot-dormez-sleep-rendu-dist -->
  - Objectif : la démo `hero-landing` enveloppe une clause entière (`pendant que vous dormez.`) dans `<em>` → accent serif sur toute la proposition. Raccourcir à un mot/segment dans `section-demos.ts` (`h1_fr`/`h1_en`). Idem auditer les autres titres data-driven.
  - Preuve GF-1 : screenshot hero-landing + accent serif sur 1 mot.
  - Dépend de : —

## Chantier P2.6 — Awwwards (directive 03) W1/W3/W4 + re-critique it.13
### Tâches finies
- [x] **P2.6-a — Fix overflow `hero-offer-detail` + habillage des médias (audit #2/#3)** <!-- sb commit=53ed1c3 gf1=y note=overflow-text-wrap-balance-H1-entier+placeholders-motif-radial-tokens-existants --> : overflow H1 `white-space:nowrap` → `text-wrap:balance` (`.hero-detail__title` partagée, H1 entier) ; placeholders média gris (`hero-split`, `feature-tabs`, `feature-zigzag`) habillés (motif diagonal + radial accent, pattern `feature-split-media`, tokens existants + variantes ink). 0 nouveau token/asset. GF-1 : screenshots `_current/v2-*` + getComputedStyle.
### Tâches en attente
- [ ] **P2.6 — W1 typo / W3 recomposition templates secteurs+offres / W4 images stylisées** + re-critique
  it.13 post-deploy (= T-5). Te poser : quelles sections paraissent pauvres/monotones (cards « Construire ») ? Preuve GF-1.

## Chantier P2.7 — Système de variation (#14 Phase B)
### Tâches finies
_(vide)_
### Tâches en attente
- [x] **P2.7 — `sectionBaseSchema` mixin + compléter `section-presets.ts` + `.sec--layout-*` + déployer `data-palette`/`data-density` + route `/preview/[type]/[preset]` + gate `check-presets`.** Dépend de P2.3. ▸ *soldé (réconciliation 2026-07-19) : `sectionBaseSchema` + 321 presets/36 types + `data-palette`/`data-density`/`data-layout` + route preview preset + gate `check:presets`.* <!-- sb commit=5e74e4c1 gf1=n -->

## Chantier P2.8 — DS Studio créatif (#14 Phase C)
### Tâches finies
_(vide)_
### Tâches en attente
- [x] **P2.8 — Save preset** (`POST /api/ds/preset`, garde `DS_SAVE_KEYWORD`, pipeline git) → `src/data/ds-presets.json` + `[data-theme]` dans `src/styles/themes.css`. Dépend de P2.7. ▸ *soldé 2026-07-19 (core save/list/apply, fiche 0022 : Option A dev-only, extension `ds-save-dev.mjs`) : GF-1 fonctionnel = POST réel 200/403/400/400 + write→read JSON+CSS + pipeline git tracé + gate `check:ds-presets` + UI round-trip (`dsStudio.presets.list().saved`). Sous-items scindés en P2.8-b/P2.8-c.* <!-- sb commit=2d23991a gf1=y -->
- [ ] **P2.8-b — Supprimer reload `loadCatalogType`** (apply preset sans rechargement complet).
 ▸ *scindé de P2.8 (fiche 0022), non bloquant pour P2.9.*
- [ ] **P2.8-c — Instance overrides** (overrides de tokens par instance de section).
 ▸ *scindé de P2.8 (fiche 0022), non bloquant pour P2.9.*

## Chantier P2.9 — Production presets en masse (#14 Phase D-E)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.9 — Vagues multi-agents** ▸ *Vague 0 livrée 2026-07-19 (fiche 0024, commit 63d4e2a4) : 8 layouts P1 + densité grand + gate check:presets vert (harvest) + listing /library curés∪générés (badges, cap 12). Vague 1 livrée 2026-07-19 (fiche 0025, commits 42abfcd7+6b6cbc50+f53c97a4) : gate durci allPresets 18→361 validés + pilote Testimonials 42 presets GF-1'd (7 types) + PresetProps index signature ; GF-1 prod OK (fiche testimonial-wall 10 curées/14 générées + preview). Fan-out ~25 catégories EN COURS (1ʳᵉ vague : CTA/conversion).* (1 catégorie/agent, worktrees), 40+ presets/catégorie, styles
  2010→2026, **GF-1 sur CHAQUE preset** + listing DS Studio exhaustif. Dépend de P2.7/P2.8 + sections finales (P0).
 ▸ *réconcilié 2026-07-19 : RESTE (chantier actif suivant).*

## Chantier P2.10 — Passe finale Claude Design
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.10 — Passe design finale** (skill `design:*`) une fois les sections figées et P2.2-P2.8 avancés :
  critique structurée → corrections → preuve GF-1 sur les pages de la whitelist `strategy/02 §1`.
 ▸ *réconcilié 2026-07-19 : RESTE (chantier actif suivant).*

## Chantier P2.11 — Harmonisation hover + no-hardcode → DS (rule 60) — détail : `state/09`
> **Source de vérité détaillée = `docs/state/09-plan-harmonisation-ds-page-site-web-intelligent.md`** (Phases A-E). Né de la revue live↔local de `site-web-intelligent` (2026-06-13). Principe transverse : **0 valeur hardcodée**, tout pointe un token DS existant (sync DS Studio) ; vérifier l'existant avant de créer (rule globale 60). Taxonomie DS gravée : `design-system/03 §9.6`.
### Tâches finies
- [x] **P2.11-a — Harmonisation hover catalogue (sections) + fix reflow** (state/09 Phase B, B1/B2/B4/B5) : 5 sections (`CaseCardGrid`/`EditorialPreview`/`ServiceCatalogList`/`UseCaseIndex`/`ServicesGrid`) ; `padding-inline` au hover → `translate:` (reflow-safe, slide conservé) ; `width`→`scaleX` ; durées→`--dur-*`. <!-- sb commit=f8ce276 gf1=y · GF-1 Playwright : rowHeight 161→161, IMPACT 42→42px, voisin 413→413, translate:12px rendu, 0 reflow -->
- [x] **P2.11-b — Card spacing pilotable DS Studio (ServicesGrid)** (state/09 B7) : padding cell hardcodé `clamp()×3` → `var(--spacing-block) var(--space-6) var(--space-8)` (0 nouveau token). <!-- sb commit=f8ce276 gf1=y · GF-1 Playwright : padding 38→48px selon vw, hauteur cell 300→300 au hover -->
- [x] **P2.11-c — Gate `check-hover-reflow`** (state/09 B6) : `scripts/check-hover-reflow.mjs` + `npm run check:hover-reflow`. <!-- sb commit=f8ce276 gf1=y · gate exécutable, détecte 6 violations latentes (exit 1) --> ⚠️ **NON activé en build/CI** tant que P2.11-e non fait (6 violations restantes le feraient échouer).
### Tâches en attente
- [ ] **P2.11-d — Menu fini déclinaisons hover `data-hover="surface|tint|lift"`** (state/09 B3) : standard documenté dans `design-system/03 §9.6` ; **implémentation globale (`global.css`) différée à l'adoption** (rule 60 : pas d'abstraction spéculative ; on l'implémente quand une variante/section l'adopte, GF-1 à ce moment).
- [x] **P2.11-e — Fix 6 `:hover` géométriques hors `sections/`** (révélés par le gate P2.11-c) : `templates/AuthorPageTemplate.astro`, `ui/molecules/EditorialWriteRow.astro`, `ui/molecules/ServiceCatalogRow.astro` (reveal → `translate:` individuel), `ui/organisms/PersonaSwitcher.astro` → `padding`→`translate`. Gate `check-hover-reflow` exit 0, build Complete!. <!-- sb commit=331b7c2 gf1=y · agent nommé bg hover-reflow-fixer ; gate exit 0 ; build OK --> ⚠️ Reste : câblage CI (pas d'agrégat de gates dans package.json aujourd'hui → tâche infra séparée si gating CI voulu).
- [ ] **P2.11-f — Migration no-hardcode catalogue (« littéralement tout », rule 60)** — ▸ *premise corrigé 2026-06-21 (audit GF-4, le « 30+ » était faux)* : le `grep "padding:.*clamp("` comptait des `padding: clamp(var(--space-X), Nvw, var(--space-Y))` = **compositions de tokens responsive, PAS des hardcodes** (le `CLAUDE.md` repo autorise « calculs sur variables existantes »). Surface RÉELLE vérifiée dans `sections/` : (a) **0** couleur hex brute (P2.4 a tout tokenisé) ; (b) **~46 px bruts** padding/margin/gap (`6/14/18/28/56px`) **tous off-scale** (échelle `--space-*` = 4/8/12/16/24/32/40/48/64… → Δ≥2px = visible, aucun match exact) → **arbitrage design par valeur** (rule 60 : « création = dernier recours », ne PAS forcer vers le token le plus proche = régression) ; (c) durées surtout boucles d'anim (`36s` marquee) littérales par nature. **Route propre appliquée** : `TestimonialLogoMetric` `transition .25s ease` → `var(--dur-trim) var(--ease)` (rôle hover exact). **Reste = arbitrage Simon** sur les ~46 off-scale : tolère-t-on l'arrondi au token (ex. `28px`→`--space-6` 32px) cran par cran, OU sont-ils du « littéral structurel » (rule 60 exception : knob `3px`, micro-gap `6px` liste dense, padding bouton `14px 28px`) ? Décision design, pas mécanique. ▸ *soldé 2026-07-19 (arbitrage Simon « arrondir aux tokens ») : 120 déclarations sur 46 fichiers → var(--space-N) plus proche (tie→haut), 0 off-scale restant, exceptions structurelles documentées (knobs ≤3px, hairlines, positionnement) ; GF-1 build + screenshots home//contact.* <!-- sb commit=98973f26 gf1=y -->
- [x] **P2.11-g — Migration font-size hardcodés → tokens de rôle** (dimension typo de P2.11-f) : audit = 1265 `font-size` déjà `var(--text-*)` vs 51 bruts (contextes littéral-requis OG/email/WebGL/JSON exclus → 33 en CSS réel). Couleurs déjà `var(--token,#fallback)` (pas hardcode, non touchées). Créé 6 tokens de rôle FIXES (`--text-glyph` 22 / `--text-micro` 9 / `--text-numeral{,-md,-sm}` 96/52/32 / `--text-title-lg` 38, gel « 0 token » levé pour gaps prouvés). 33 occurrences migrées : glyphes/micro/numéraux/mid-titres → tokens fixes ; titres de lecture → `--text-h2/h3` fluides ; 2 titres de carte (`.mega-col-hd .t`/`.acard-full-name`) → `--text-h3`. 3 wordmarks animés (`.wm`) laissés littéral. <!-- sb commit=81408f0 gf1=y · GF-1 sync DS Studio PROUVÉE : bump --text-glyph 22→44px → .svc-arr/.cases-arr/.trust-badges__glyph rendent 44px (getComputedStyle dist), revert→22 ; build Complete! ; 0 erreur console ; +8bb343d (hero -40px above-fold) +be887a1 (tokens) --> ⚠️ Stragglers hors scope à arbitrer : `.wf-n` responsive 24px (override breakpoint), `.dingbat-lg` 24px (échelle ornement md/lg), inline 48px `design-system:342`.

---

# PHASE P3 — Outils d'acquisition

> Source : `business/03-prospection`, `business/09` (scoring), `marketing/04`. Outils pour
> industrialiser le sourcing et le nurturing une fois la base propre.

## Chantier P3.1 — Lead sourcing + scoring

### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P3.1-a — Sourcing prospects (Firecrawl) + outil de scoring maison**.
  - Objectif : pipeline de sourcing + scoring (critères `business`), prospects locaux ultra-ciblés (QW4).
  - Fichiers : script/outil (hors site ou `scripts/`), `docs/business/03`.
  - Preuve GF-1 : run réel produisant une liste scorée + échantillon vérifié manuellement.
  - Dépend de : P0 (positionnement/offre figés).
- [ ] **P3.1-b — Séquences d'outreach + CRM lite**.
  - Objectif : séquences (skill `email-sequence`) + suivi léger des deals (CRM lite).
  - Fichiers : assets séquences, outil CRM lite.
  - Preuve GF-1 : séquence testée bout en bout + 1 prospect réel passé dans le flux.
  - Dépend de : P3.1-a, P0.9-a (landing audit comme CTA).

---

# PHASE P4 — Long terme (FIGÉ, non urgent)

> Source : `marketing/05-boilerplate-produit`, `architecture/06-tina-astro`, `architecture/09-cms-autonome`,
> `strategy/05-stack-decision`, `.claude/`. **Stratégie figée** : ne pas démarrer avant traction P0/P1.

## Chantier P4.1 — Boilerplate produit forkable

### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P4.1-a — Extraire `waimia-web` en socle marketing IA modulaire forkable** (modules activables).
  - Objectif : transformer le repo en boilerplate forkable par client (modules on/off).
  - Fichiers : structure repo, `marketing/05`.
  - Preuve GF-1 : fork de démo qui build vert avec un sous-ensemble de modules.
  - Dépend de : P0, P1 (base de référence stable).

## Chantier P4.2 — CMS lite + TinaCMS (visual editing 100% Astro)

### Tâches finies
_(vide)_
### Tâches en attente
- [x] **P4.2-a — Merger le pilote TinaCMS** (`feat/tina-no-react-pilote`, byte-identique visiteur) ▸ *PÉRIMÉ (réconciliation 2026-07-19) : Tina retiré entièrement (ADR `strategy/12`), la branche pilote n'existe plus.* <!-- sb commit=d267b834 gf1=n -->
  - Objectif : visual editing 100% Astro (derniers releases Tina), édition par IA des sections.
  - Fichiers : `tina/config.ts`, branche `feat/tina-no-react-pilote`.
  - Preuve GF-1 : rendu visiteur byte-identique (diff) + édition Tina fonctionnelle sur 1 page.
  - Dépend de : credentials TinaCloud (Simon `[?]`).

## Chantier P4.3 — Dashboard / cockpit & agents à l'usage

### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P4.3-a — Dashboard/cockpit client + agents (Claude Code/Cowork + `.claude/`)**.
  - Objectif : cockpit + agents métiers activables, facturation à l'usage.
  - Fichiers : `.claude/`, modules agents, facturation usage.
  - Preuve GF-1 : 1 agent exécute une tâche réelle bout en bout + compteur d'usage vérifié.
  - Dépend de : P4.1, P4.2.

---

## Backlog technique hérité (non bloquant cash, à intercaler)

> Source : `state/01 §b`, `audits/01-template-registry-migration`. Indépendant du silo ; à traiter
> entre deux lots P0/P1 quand utile. **Périmètre réel réduit** (`ORCH-STATE`) : seul
> `SolutionsDetailTemplate` est encore props-driven.

### Tâches finies
_(vide)_
### Tâches en attente
- [x] **T-1 — Migrer `SolutionsDetailTemplate` vers le registry** (dernier template props-driven) ▸ *PÉRIMÉ (réconciliation 2026-07-19) : `SolutionsDetailTemplate` n'existe plus (veto Solutions, migration templates soldée).* <!-- sb commit=3b89e6d2 gf1=n -->
  - Preuve GF-1 : page solutions rendue via registry (screenshot) + build vert + `check-touchpoints`.
  - Dépend de : —
- [x] **T-2 — GF-1 sweep des 58 previews `/preview/<type>`** ▸ *soldé (réconciliation 2026-07-19) : chiffre périmé (58→208 previews réels 2026-07-16), sweep 208/208 fonctionnels en local parité prod.* <!-- sb commit=15ca9e86 gf1=y -->
  - Preuve GF-1 : sweep Playwright (secret `VERCEL_AUTOMATION_BYPASS_SECRET` ou `scripts/serve-dist.mjs`) = 0 FAIL.
  - Dépend de : —
- [x] **T-3 — Arbitrage Simon : 3 types vt=0** (`TrustLegal` / `Welcome` / `ListIndex`). ▸ *soldé 2026-07-19 (arbitrage Simon « cataloguer ») : prémisse corrigée GF-4, les 3 étaient DÉJÀ catalogués (modules co-localisés Wave #38 T5) ; vrai gap = preview trust-legal-section corps vide → fallback body_html + demo (compat templates intacte, GF-1 screenshot).* <!-- sb commit=1f9bd682 gf1=y -->
  - Dépend de : décision Simon.
- [ ] **T-4 — DS / variation / partners : finir le hub techno** (`state/01 §a`, worktree `feat/ecosystem-partners`). ▸ *réconcilié 2026-07-19 : RESTE (effort S, section ecosystem-partners construite mais orpheline : câbler sur `/technologies` ou abandonner, ARBITRAGE léger)*
  - Contexte : section `ecosystem-partners` posée (`specs/01-ecosystem-partners`), **hub `/technologies` à finir**.
  - Preuve GF-1 : hub techno rendu (screenshot above-fold) + build vert. Dépend de : —
- [ ] **T-5 — Re-critique AWWWARDS it.13 post-deploy** (`state/01 §a` ; boucle close it.12 = 4,5/5). ▸ *réconcilié 2026-07-19 : RESTE (effort M, re-critique post-refontes)*
  - P3 connus à résorber : monotonie cards offres rangée « Construire » ; `/careers` colonne droite vide ;
    marqueurs timeline secteurs hétérogènes. Preuve GF-1 visuelle. Dépend de : refonte P0 déployée.

- [ ] **T-6 — VISION FINALE résidus** (`state/01 §b`, `docs/40` archivé) : arbo **cas-par-secteur**
  + **étiquettes catalogue** (non couverts par P0.2). Te poser : quoi reste-t-il de `docs/40` qui n'est
    pas déjà dans P0/P2 ? Remonter ici. Dépend de : —
- [ ] **T-7 — Réconcilier les compteurs/statuts docs périmés** (`00-MASTER-PLAN` 147→151, etc.) — `state/01 §0`.
  - Dépend de : —
- [ ] **T-8 [?] — Décision 301 fintech** : `strategy/02` pose « pas de redirections » (domaine neuf) →
  le 301 fintech de l'ex-R7b (`state/01 §b`) est **abandonné** ; confirmer que c'est volontaire.

> **NB design :** le DS est industrialisé en prod (~151 types, 5 touchpoints, dark `ink`) et **figé au
> sens « 0 nouveau token ad hoc »** — mais **la refonte design n'est PAS terminée** : elle vit en
> **PHASE P2** (détail `state/05-design-refonte`). T-4 (hub techno) et T-5 (re-critique it.13) sont
> design-adjacents → traités avec P2.6. Source de vérité DS règles : `design-system/01-contrat` ;
> inventaire : `design-system/02-catalogue` (généré).

---

## Arbitrages Simon en attente (NE PAS trancher seul)

- `[?]` Nom du pilier Opérer : `automatisation-agents-ia` (à confirmer, P0.3-c).
- `[?]` 3 types vt=0 (TrustLegal/Welcome/ListIndex) : cataloguer ou bespoke (T-3).
- `[?]` Upgrade Vercel Pro 20 $/mois (quota Hobby) — paiement = décision Simon.
- `[?]` Credentials TinaCloud (P4.2), MailerLite (token mort), photos équipe `/agence` (assets Simon).
- `[?]` GBP/LinkedIn : création de compte, photos, demande d'avis clients (P0.9-c/d).
- VETO permanents (ne pas migrer dark/registry) : `HeroHome` (`/`) + masthead `/solutions`.
- MORATOIRE : 0 `codex exec` jusqu'à signal Simon.

---

## Comment reprendre (ordre, gates, règle commit/preuve)

**Ordre canonique** : **P0.0 → P0.1 → P0.2 → P0.3 → P0.4 → P0.5 → P0.6 → P0.7 → P0.8 → P0.9 → P0.10**,
puis **P1 → P2 (design, multi-passes) → P3 → P4**. Les chantiers P0.9 (acquisition hors-repo) peuvent
avancer en parallèle dès que P0.6 (identité véridique) est figée. **P2.2 (consolidation socle DS,
anti-dette, 0 rendu) peut démarrer tôt** ; le gros volume design (P2.7-P2.9) attend les sections
finales (P0). Le backlog technique hérité (T-1..T-8) s'intercale sans bloquer le cash.

**Règle d'or séquence purge** (P0.2) : réparer les liens (P0.1) **avant** de supprimer ; basculer
toute section cataloguée sur `section-demos.ts` (ne jamais supprimer le composant = casse
`check-touchpoints`) ; **1 commit par lot** avec `git add` ciblé.

**Gates de validation** (à passer verts avant tout merge) :
- `npx -y pnpm@9.15.0 build` → `Complete!`
- `npx -y pnpm@9.15.0 exec astro check` → 0 errors
- `scripts/check-*.mjs` concernés (touchpoints, content-refs, form-endpoints, token-*, rhythm,
  semantic-coherence, no-emdash, static-quality, media-query-var, usage-manifest, presets).

**Règle commit/preuve (GF-1)** : aucune tâche n'est `[x]` sans **preuve empirique dans le même tour**
(visuel = screenshot Playwright above-fold + `getComputedStyle` sur preview/prod déployée ; backend =
appel réel + assertion ; structurel = build + gate verts). On déplace alors la ligne dans « Tâches
finies » du chantier et on **commit** (ce doc inclus). **Merge `main`** seulement après GF-1 sur une
**preview Vercel** (auto-merge OFF, push via `gh auth git-credential`).

**Anti-orphelin** : toute modif d'apparence/structure = éditer le **composant** (`sections/`,
`ui/organisms/`, `header/`, `footer/`), jamais inliner du markup neuf dans une page/template.
