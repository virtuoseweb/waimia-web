# 51 — État réel du projet & chantiers (audit 2026-06-11)

> **Pour Claude Code.** Constat factuel sourcé de l'état réel : ce qui est en cours,
> pending non traité, sauté, manquant. À lire **après** `docs/strategy/01-silo-site-web-ia` (stratégie silo) et
> `docs/archive/50-SILO-RUNBOOK-EXECUTION` (runbook). Audit lecture seule, rien modifié.

---

## 0. ⚠️ Désynchro doc ↔ réalité (à savoir AVANT de se fier au MASTER-PLAN)

- **`docs/00-MASTER-PLAN.md` est PÉRIMÉ.** Il annonce « 147 types » et `main = 4942d93`.
  Réalité : **151 types** (commit `20f1c44`) et **~130 commits plus loin**.
- **`docs/SESSION-HANDOFF-CURRENT.md` est périmé** (snapshot 02:00). Le handoff frais
  vit dans **`tasks/SESSION-HANDOFF-CURRENT.md`** (REBOOT config agentique V19 en cours)
  et surtout **`docs/session-reports/SR-2026-06-11-55-HANDOFF-…`** (handoff autoporteur).
- **Source de vérité courante = `tasks/ORCH-STATE.md`** (journal horodaté) + `SR-55`.
- **Prod n'est PLUS gelée** : le blocker quota Vercel Hobby est résolu (redeploy
  `7a66a73`), `waimia.com` répond 200. Plusieurs entrées anciennes parlant de prod
  figée sur `f17d324` sont caduques.

→ **Action implicite** : réconcilier `docs/00` (compteur 147→151, `main`, statuts) =
tâche #7 backlog, partiellement faite.

---

## a. Chantiers EN COURS

- **[~] Boucle AWWWARDS-itératif** (`SR-55`, `ORCH-STATE`) — session « orchestrateur B »
  close à it.12 (score 4,5/5, zéro P1 résiduel). Reste : re-critique it.13 post-deploy.
  P3 connus : monotonie cards offres rangée « Construire », `/careers` colonne droite
  vide (assumé), marqueurs timeline secteurs hétérogènes, volume contenu faible.
- **[~] DS / variation / partners** (« orchestrateur A », `SR-55 §6`) — worktree
  `feat/ecosystem-partners` : section `ecosystem-partners` posée, **hub techno à finir**.
- **[~] Pilote TinaCMS Wave 3.1** — branche `origin/feat/tina-no-react-pilote` livrée
  (byte-identique visiteur), **NON mergée**. Bloqué sur credentials TinaCloud (Simon).
- **[~] Reboot config agentique V19** (`tasks/SESSION-HANDOFF-CURRENT.md`) — vérif
  plugins/hooks, `/evolve`, migration tooling.
- **[~] Silo SEO** (nouveau, ce chantier) — `docs/strategy/01-silo-site-web-ia` + `docs/archive/50-SILO-RUNBOOK-EXECUTION` posés ; exécution
  code à faire par Claude Code.

---

## b. Tâches PENDING non traitées

### Backlog DS/registry historique (hérité orchestrateur unique)
- **[ ] Migration templates registry : 11/18 restants** (`CLAUDE.md`, `MASTER-PLAN §5`,
  `SR-55`). ⚠️ Périmètre réel réduit par découvertes archi (`ORCH-STATE:212`) :
  - `OffresDetailTemplate` **MORT** (R6 composable via MDX).
  - Cas = chemin composable (`CaseStudyTemplate` intouché).
  - **Seul `SolutionsDetailTemplate` encore props-driven.**
  - Routes `offres/solutions/technologies/[...slug]` **throw déjà** si pas de
    `sections:` (extinction legacy R6 active).
  - 3 types vt=0 sans composant catalogué : **TrustLegal / Welcome / ListIndex**
    → arbitrage Simon requis (cataloguer ou laisser bespoke).
- **[ ] GF-1 sweep des 58 previews `/preview/<type>`** (`CLAUDE.md`, `SR-55`). Secret
  `VERCEL_AUTOMATION_BYPASS_SECRET` requis pour la voie auto, sinon `scripts/serve-dist.mjs`
  local. (Un sweep PROD 162 URLs a été fait, 0 FAIL — mais pas le sweep previews ciblé.)
- **[ ] Task #20 VISION FINALE** (`docs/40`) : clean collections, arbo cas-par-secteur,
  étiquettes catalogue, landing + tunnel « parfaits ».
- **[ ] #5 R7b** secteurs facettés + 301 fintech ; **[ ] #6 R6** extinction templates ;
  **[ ] #7** réconcilier docs (statuts `docs/00/16/35/37/39/40`).

### Backlog silo SEO (validé Simon, pas démarré) — `docs/archive/50-SILO-RUNBOOK-EXECUTION`
- **[ ] #1 Recherche keyword GRATUITE** (SERP/autocomplete/Trends/Keyword Planner + GSC
  post-lancement) → figer H1 pilier. **Pas d'Ahrefs** (pas d'abonnement). Cf `strategy/01 §7` + `53`.
- **[ ] Batch 1** désindexation 13 solutions + 8 offres secondaires.
- **[ ] Batch 2** cannibalisation « site web IA » (3 URL → 1 pilier).
- **[ ] Batch 3** méga-menu Hub + 2 pages Hub.
- **[ ] Batch 4** réalignement pricing 3 000 € HT.

---

## c. Sauté / bloqué / arbitrages SIMON (NE PAS trancher seul)

- **[?] Solutions** : `HeroSector` infidèle, hero non migré (**veto Simon** masthead
  `/solutions`, `solutions/index.astro:79`).
- **[?] design-system vs ds-studio** : redirect/index mince à trancher.
- **[?] delta ~32px Offres/Tech** : standardiser ou veto.
- **[?] Upgrade Vercel Pro 20 $/mois** : seul remède structurel au quota Hobby (paiement
  = décision Simon).
- **Bloqués asset/credential externes** : photos équipe `/agence` (asset Simon) ;
  MailerLite (token mort, dormant) ; TinaCloud (credentials Simon).
- **VETO permanents** : `HeroHome` (`/`) + masthead `/solutions` non migrables dark/registry.
- **MORATOIRE CODEX** : 0 `codex exec` jusqu'à signal Simon.
- **Cas fictifs** `Plateau/Halcyon/Northbound/Caserne` : **gardés sciemment** (futur
  « benchmark concurrent », `docs/strategy/01-silo-site-web-ia §6`).

---

## d. Ce qui MANQUE / défauts réels (sourcés)

- **3 liens Stripe PLACEHOLDER** — cours école non vendables :
  `ecole/courses/automatiser-relances-crm-en-4-heures.mdx:55`,
  `prompter-claude-pour-les-non-tech.mdx:50`, `intro-ia-pme-b2b.mdx:50`.
- **Pages encore en Stub éditorial** — `src/pages/[...slug].astro:357` rend `Stub.astro`
  en fallback ; `Footer.astro:186-241` liste les routes « encore en Stub » (sous-routes
  /agence, /offres, /solutions, /technologies, cas, outils, ressources) : nav présente,
  contenu non instancié.
- **2 assets demo 404 (P1)** — `section-demos.ts:2833` (`public/media/feature-console.svg`)
  et `:2946` (`public/images/cases/finance-close.svg`). Statut **contradictoire** dans
  le journal (`ORCH-STATE:319` dit mergés via `cdc0249`) → **à re-vérifier au build**.
- **Liens demo → 404** : `/offres/{audit-ia,deploiement,run,pilote,dette-technique,
  roadmap-ia,gouvernance-donnees}` (sous-offres conseil absentes) + `/equipe/{elodie-tran,
  marc-devauchelle}` (slugs fictifs hors collection) — `ORCH-STATE:248`.
- **Switcher langue → `/en/agence/{ds-studio,hero-lab}` FR-only** (lien mort EN) —
  fix partiel `FR_ONLY_STATIC` posé, à confirmer.
- **Corps MDX bilingue rendu en double** sur certaines locales (essais) — fix
  `essaysplit` (`bb9c1b6`) appliqué au blog, pattern possible ailleurs.
- **`feature-grid` étiqueté `site` à tort** ; **demo `tech-models-table` « Opus 4.7 »**
  (sweep 4.8 fait, résidus à vérifier).

---

## e. Gates (`scripts/check-*.mjs` — rôle, NON exécutés ici)

| Gate | Rôle |
|---|---|
| `check-touchpoints.mjs` | Cross-valide les 5 touchpoints par section-id ; désync = build cassé. |
| `check-token-purity.mjs` | Interdit valeurs CSS hardcodées hors tokens. |
| `check-token-lock.mjs` | Verrou du set de tokens (anti-dérive). |
| `check-section-rhythm.mjs` | Paddings de section = crans `--section-*` only. |
| `check-semantic-coherence.mjs` | 1 seule source de vérité par valeur (anti double-source). |
| `check-no-emdash.mjs` | Interdit `—` (U+2014) côté user-facing + `src/lib`. |
| `check-static-quality.mjs` | GF-1 structurel sans navigateur sur le HTML bâti. |
| `check-content-refs.mjs` | Intégrité du maillage contenu (refs). |
| `check-form-endpoints.mjs` | form/fetch `/api/*` sans endpoint = échec. |
| `check-media-query-var.mjs` | `var()` invalide en `@media/@container`. |
| `check-usage-manifest.mjs` | Étiquetage catalogue site/library à jour. |
| `check-presets.mjs` | Valide le touchpoint PRESET (`section-presets.ts`). |

---

## f. Hygiène git à purger (résidus des sessions parallèles)

- **5 branches locales non mergées** : `feat/contenu`,
  `feat/ds-coherence-v4b-phantom-color`, `feat/hero-2col-balance`,
  `fix/forms-api-endpoints-regression`, `worktree-1781168853`.
- **Remote non mergées** : `origin/feat/{contenu,contenu-menu,ds-coherence-v4b-phantom-color,
  hero-2col-balance,tina-no-react-pilote}`.
- **1 stash** : `stash@{0}` sur `feat/library-heroes-enrich`.
- **5 worktrees `prunable`** : `.worktrees/{1781150964,1781168853,1781194992,1781195015,
  validate-it8}` → `git worktree prune`.
- ~50 branches `feat/*` locales héritées (la plupart mergées) candidates au nettoyage.

---

## f-bis. Actions résiduelles remontées des docs archivés (consolidation 2026-06-12)

> Surfacées par la lecture profonde des `audit-refonte/*` + `directives/*` avant archivage
> des audits/cartographies. À traiter ou intégrer au chantier silo (`strategy/02`).

1. **V-TYPO transverse incomplète** (directive `41`) : `global.css:62-129` h1/h2/h3 encore
   en serif hors markup neuf. Vetos permanents : hero `/` + masthead `/solutions`.
2. **Bug i18n hrefs EN** (`audit-refonte/navigation.md` ; `Header.astro:107,172` + EssayTemplate) :
   clics méga-menu EN renvoient vers FR. *(Disparaît si EN archivé per `strategy/02 §I`.)*
3. **2 templates code-mort** (`audit-refonte/templates.md` F1) : `ServiceDetailTemplate` +
   `HubTemplate` (0 conso, −619 LoC) → suppression sûre.
4. **2 fichiers parasites** : `src/pages/test-composable.astro` + `archive.astro` (double
   import Header/Footer hors Base) → supprimer.
5. **Bugs DS concrets** (`audit-refonte/design-system.md`) : `design-system.lock.json`
   `tokenCount:106` ≠ 110 entrées ; `--text-drop-cap` 6vw (token) vs 8vw (fallback inline).
6. **3 cas en pavé MDX brut** (`audit-refonte/editorial.md`) : caserne/halcyon/northbound
   → *moot si supprimés per `strategy/02 §2H`* ; sinon migrer comme Plateau. `Sidenote` orphelin.
7. **Collections mortes à purger** (`audit-refonte/collections.md` F2) : `produits`,
   `abonnements`, `landingPages`, `welcomePages`, `newsletter` (0 entrée) + 43 MDX dormants
   (`brandVoice`/`painPoints`/`knowledgeBase`/`proofPoints`/`guarantees`, 0 page consommatrice).

## f-ter. Corrections factuelles de doc à appliquer (contradictions vérifiées)
- **`architecture/03-integrations.md`** affirme `output:'server'` → **FAUX**, le repo est
  `output:'static'` (`astro.config.mjs`, verrouillé par `strategy/05`). **Corriger (prioritaire,
  induit en erreur sur l'archi de rendu).**
- **`architecture/01` + `05`** décrivent **Pages CMS / `.pages.yml`** → réalité **TinaCMS**
  (`tina/config.ts`, réf `architecture/36`). Corriger ou archiver.
- **`architecture/04-deployment-checklist.md`** pointe le projet Vercel **`waimia-v2`** (repo
  interdit) → doit être `waimia-web`.
- **`architecture/02-content-models.md`** : `author` décrit en objet inline → réalité
  `reference('authors')` (migration faite).
- Partout « **cas fictifs gardés** » (01 §6, 51 §c) → **supprimés** per `strategy/02 §2H`.

## g. Point de départ recommandé

1. Se fier à **`tasks/ORCH-STATE.md` + `SR-55`**, pas au MASTER-PLAN (périmé).
2. Prod déployée et débloquée — pas de contrainte quota immédiate.
3. **Nouveau prioritaire = silo SEO** (`docs/strategy/01-silo-site-web-ia`/`docs/archive/50-SILO-RUNBOOK-EXECUTION`), distinct du backlog
   DS/registry historique. Trancher avec Simon l'ordre : silo SEO d'abord vs finir
   migration templates / VISION FINALE.
4. Quick wins indépendants du silo, sûrs : purge worktrees, fix Stripe placeholders
   (ou dé-publier les 3 cours), re-vérif des 2 SVG 404, nettoyage liens demo → 404.
