# 02 — Plan d'exécution maître (Claude Code) — backlog persistant

> **Pour Claude Code. Backlog d'exécution maître, lu au boot.** Source de vérité du
> *quoi faire et dans quel ordre* pour le repo `waimia-web`. Chaque chantier a deux
> sections : **Tâches finies** (vide au départ) et **Tâches en attente** (`[ ] EN ATTENTE`
> au démarrage). On coche `[x]` quand la preuve GF-1 est fournie ET commitée.
>
> Hiérarchie des sources de vérité (rappel) : `CLAUDE.md` (GF-1..GF-6, non négociable) >
> `docs/README.md` (carte) > **ce fichier** (backlog ordonné) > `tasks/ORCH-STATE.md`
> (journal horodaté) > git. Spec d'état cible = `strategy/02-site-etat-final.md` (FAIT FOI,
> §0bis architecture en piliers). Stratégie = `strategy/01`. État réel = `state/01-chantiers.md`.
>
> **Contexte business** : agence IA anthropic-first, Montpellier, fondateur SOLO, phase
> démarrage. Priorité = **quick wins + cash court terme** ; long terme FIGÉ mais non urgent.
> Offer ladder : audit quick win (0 €) → Site web IA dès **3 000 € HT** → Growth System IA →
> agents à l'usage (cf `business/08`). Domaine neuf : on supprime le fictif/thin, pas de
> redirections, lancement **FR monolingue**.

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

### Index des phases (SOURCE UNIQUE — rien ne fait foi ailleurs pour le « quoi faire »)
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

> Sources : `docs/FINALISATION-MANIFEST.md`, `docs/CONSOLIDATION-MANIFEST.md`,
> `docs/REPO-CLEANUP-MANIFEST.md`, `state/01 §f,§f-bis,§f-ter`.

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.0-a — Exécuter les 3 manifestes de finalisation doc** (fusions + renumérotation `01..N`).
  - Objectif : set de ~25 docs vivants, numérotation cohérente par dossier, 0 contradiction ;
    supprimer les 3 manifestes à la fin.
  - Fichiers : `docs/**` (`git mv`), `docs/FINALISATION-MANIFEST.md` §1-§4, références croisées.
  - Preuve GF-1 : `grep` 0 référence cassée aux anciens numéros + build vert (les docs ne
    cassent pas le build, vérifier les imports MDX éventuels) + arbo finale = §3 README.
  - Dépend de : —
- [ ] **P0.0-b — Corrections factuelles de doc** (`state/01 §f-ter`).
  - Objectif : corriger `architecture/03` (`output:'static'` et non `'server'`),
    `architecture/01+05` (TinaCMS et non Pages CMS / `.pages.yml`), `architecture/04`
    (projet Vercel `waimia-web` et non `waimia-v2`), `architecture/02` (`author = reference`),
    et purger partout « cas fictifs gardés » (→ supprimés per `strategy/02 §2H`).
  - Fichiers : `docs/architecture/0{1,2,3,4,5}-*.md`, `docs/strategy/01`, `state/01`.
  - Preuve GF-1 : `grep -rn "output:'server'\|\.pages\.yml\|waimia-v2\|cas fictifs gardés" docs/` = 0 résiduel.
  - Dépend de : —
- [ ] **P0.0-c — Slim `CLAUDE.md`** (`FINALISATION-MANIFEST §2`).
  - Objectif : alléger `CLAUDE.md` racine (ne pas surcharger la config Claude Code) sans perdre
    les GF-1..GF-6 (filet inline) ni les pointeurs START HERE.
  - Fichiers : `CLAUDE.md`.
  - Preuve GF-1 : GF-1..GF-6 toujours présents intégralement + build vert + relecture diff.
  - Dépend de : P0.0-a (les pointeurs doivent viser les chemins renumérotés).
- [ ] **P0.0-d — Nettoyage racine repo & images-preuves** (`REPO-CLEANUP-MANIFEST`).
  - Objectif : supprimer les ~52 images-preuves à la racine, archiver `ONBOARDING-*`, pointeur
    README. ⚠️ **non supprimables en sandbox** : flaguer pour exécution Simon/local si bloqué.
  - Fichiers : racine repo, `docs/archive/`, `README.md`.
  - Preuve GF-1 : `ls` racine propre (ou liste résiduelle documentée + raison sandbox) ; `visual-audit/` GARDÉ.
  - Dépend de : —
- [ ] **P0.0-e — Hygiène git** (`state/01 §f`).
  - Objectif : `git worktree prune` (5 prunables), trier les 5 branches locales + remotes non
    mergées (`feat/contenu`, `feat/ds-coherence-v4b-phantom-color`, `feat/hero-2col-balance`,
    `fix/forms-api-endpoints-regression`, `worktree-1781168853`), traiter `stash@{0}`.
  - Fichiers : git only.
  - Preuve GF-1 : `git worktree list` propre + `git branch` trié + log de ce qui a été
    mergé/supprimé/conservé-et-pourquoi.
  - Dépend de : —

---

## Chantier P0.1 — Réparations de liens (pré-purge, anti-casse)

> Source : `strategy/02 §4,§6.1`, `state/01 §d`. **À faire AVANT toute suppression** pour ne pas
> casser le build pendant la purge.

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.1-a — Retirer les liens vers `/technologies/microsoft-power-platform` (404 en nav)**.
  - Objectif : supprimer les références (la page sera supprimée en P0.2H de toute façon).
  - Fichiers : `src/data/partners.ts`, `src/lib/section-demos.ts`, `src/data/mega-menu.ts`.
  - Preuve GF-1 : `check-content-refs` vert + `grep` 0 lien résiduel + build vert.
  - Dépend de : —
- [ ] **P0.1-b — Fixer les 3 liens Stripe PLACEHOLDER (cours école)** ou dé-publier les 3 cours.
  - Objectif : aucun cours non vendable lié en live (école supprimée en P0.2F, donc dé-publier suffit).
  - Fichiers : `src/content/.../ecole/courses/{automatiser-relances-crm-en-4-heures,prompter-claude-pour-les-non-tech,intro-ia-pme-b2b}.mdx`.
  - Preuve GF-1 : `grep` 0 lien Stripe placeholder live + build vert.
  - Dépend de : —
- [ ] **P0.1-c — Résorber les liens demo → 404 résiduels**.
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
- [ ] **P0.2-A — Lot A : collections auto-contenu + recâblages**.
  - Objectif : supprimer `comparisons`+`/comparer/*`, `glossary`+`/glossaire/*`, `commerce`+`/commerce/*`,
    `testimonials`+routes, `personas`+routes, `tunnels`+routes ; **garder** `IntegrationsGrid`,
    `TestimonialBlock`, `PersonaSwitcher`/`PersonaAttributesGrid` (basculer sur demo) ; recâbler
    `index.astro` (home l.229), `cas/index`, `secteurs/index`, `bienvenue/commande`, `schema-builder.ts`.
  - Fichiers : `src/content/{comparisons,glossary,commerce,testimonials,personas,tunnels}/`,
    routes `/comparer|/glossaire|/commerce|/ressources/{testimonials,personas}/*`,
    `src/data/{mega-menu,tags}.ts`, `src/lib/{section-demos,library-manifest,schema-builder}.ts`, `sitemap.ts`.
  - Preuve GF-1 : `check-touchpoints` + `check-content-refs` + `check-usage-manifest` verts + build vert + `astro check` 0.
  - Dépend de : P0.1 (liens réparés).
- [ ] **P0.2-B — Lot B : offres secondaires** (8 entrées `offres` + `/offres/revops` + `site-web-ia-landing`).
  - Objectif : supprimer `activation-ia`, `application-ia-pme`, `claude-cowork`, `conseil`,
    `growth-intelligence`, `infrastructure-ia`, `productivite-operationnelle-ia`, `composable-pilot` ;
    garder 3 offres réelles. **Remonter l'utile de `site-web-ia-landing` dans le pilier** avant rm (P0.4).
  - Fichiers : `src/content/offres/*`, routes correspondantes, nav, sitemap.
  - Preuve GF-1 : build vert + gates verts + sitemap ne liste plus ces URLs.
  - Dépend de : P0.4-a (pilier prêt à recevoir la cannibalisation) pour `site-web-ia-landing`.
- [ ] **P0.2-C — Lot C : solutions secondaires (13)** — *coordonné avec P0.3 (fusion en sections piliers)*.
  - Objectif : supprimer les **routes** `/solutions/<sous-service>` Piloter (`tableaux-de-bord-analytics`,
    `reporting-ia`, `donnees-centralisees`, `previsionnel-ia`, `agent-analytique`, `finance`) + Opérer
    (`crm-relances-ia`, `productivite-ia`, `support-client-ia`, `administration-rh-ia`, `legal-ia`,
    `agents-metiers`, `fintech`) + `acquisition-ia` + `site-web-ia-pme` ; **fusionner le contenu utile
    (pains) en sections ancrées des piliers** (P0.3) au lieu de jeter.
  - Fichiers : `src/content/solutions/*`, routes, `mega-menu.ts`, `sitemap.ts`.
  - Preuve GF-1 : build vert + gates verts + le contenu fusionné apparaît dans les piliers (cross-check P0.3).
  - Dépend de : P0.3 (piliers créés pour accueillir le contenu).
- [ ] **P0.2-D — Lot D : agence / démos fictives** (`careers`, `docs`, `governance`, **`trust-center`**, `/console`, `/atlas`).
  - Objectif : supprimer (trust-center = **risque légal** : fausses certifs ISO/SOC2/RGPD) + retirer
    les liens `mega-menu.ts` (colonne Agence).
  - Fichiers : routes `/agence/*`, `/console`, `/atlas`, `src/data/mega-menu.ts`.
  - Preuve GF-1 : build vert + gates verts + `grep` 0 lien résiduel + 0 mention certif fictive.
  - Dépend de : —
- [ ] **P0.2-E — Lot E : ressources hors silo**.
  - Objectif : supprimer `changelog`, `veille-ia`, `field-notes`, `livres-blancs` (+`ai-act-readiness`),
    `cookbooks` (index + 3 standalone + collection), `personas`, `testimonials`, taxonomies
    `/ressources/{categorie,tag,silo}/*`.
  - Fichiers : `src/content/{changelog,veille-ia,field-notes,livres-blancs,cookbooks}/`, routes, nav, sitemap.
  - Preuve GF-1 : build vert + gates verts + sitemap propre.
  - Dépend de : P0.2-A (personas/testimonials déjà recâblés).
- [ ] **P0.2-F — Lot F : école** (`ecole` 3 cours stub + `/ecole/*`).
  - Objectif : supprimer (Stripe placeholder, non vendable) ; régénérer au vrai go-live produit.
  - Fichiers : `src/content/ecole/`, routes `/ecole/*`, nav.
  - Preuve GF-1 : build vert + gates verts + 0 lien école en nav.
  - Dépend de : P0.1-b.
- [ ] **P0.2-G — Lot G : blog hors silo** (supprimer 15, garder 6 in-silo).
  - Objectif : GARDER `seo-geo-etre-cite-par-les-ia-generatives`, `automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil`,
    `cabler-son-crm-en-10-jours`, `avis-n8n-vs-zapier-2026`, `agent-ia-vs-automatisation-classique-2026`,
    `essai-pillar-ia-pme-2026` ; SUPPRIMER les 15 hors silo (liste `strategy/02 §2G`).
  - Fichiers : `src/content/blog/*` (ou collection articles), `sitemap.ts`.
  - Preuve GF-1 : build vert + sitemap = 6 articles + 0 lien interne mort vers les supprimés.
  - Dépend de : —
- [ ] **P0.2-H — Lot H : technologies, secteurs, cas fictifs**.
  - Objectif : supprimer `technologies/virtuoseos` + stubs `claude-code/claude-surfaces/frameworks` +
    `microsoft-power-platform` (garder `claude-models`) ; supprimer **contenu** `secteurs` (3) + `cases`
    (4 fictifs) mais **GARDER les composants/templates** (`CaseStudy`, secteur) pour reconstruire en réel (P0.6).
  - Fichiers : `src/content/{technologies,secteurs,cases}/`, routes, `partners.ts`, `section-demos.ts`, `mega-menu.ts`.
  - Preuve GF-1 : `check-touchpoints` vert (composants conservés) + build vert + sitemap sans fictif.
  - Dépend de : P0.1-a.
- [ ] **P0.2-I — Lot I : miroir `/en/*` (lancement FR monolingue)**.
  - Objectif : supprimer toutes les routes `/en/*` ; **garder l'infra i18n** (réactivable à traction).
  - Fichiers : routes `/en/*`, config i18n (laisser le mécanisme, retirer la génération EN).
  - Preuve GF-1 : sitemap = FR only (~28 URLs) + build vert + `astro check` 0 + 0 hreflang EN orphelin.
  - Dépend de : tous les lots de contenu ci-dessus (éviter de purger EN deux fois).
- [ ] **P0.2-J — Purge collections mortes & fichiers parasites** (`state/01 §f-bis`).
  - Objectif : purger collections 0-entrée (`produits`, `abonnements`, `landingPages`, `welcomePages`,
    `newsletter`) + 43 MDX dormants (`brandVoice`/`painPoints`/`knowledgeBase`/`proofPoints`/`guarantees`) ;
    supprimer `src/pages/test-composable.astro` + `archive.astro` ; supprimer templates code-mort
    `ServiceDetailTemplate` + `HubTemplate` (0 conso).
  - Fichiers : `src/content/*`, `src/pages/{test-composable,archive}.astro`, `src/components/templates/{ServiceDetail,Hub}Template.astro`, `src/content/config.ts`.
  - Preuve GF-1 : build vert + `astro check` 0 + `check-touchpoints` vert + `grep` 0 import des supprimés.
  - Dépend de : P0.2-A..I (s'assurer qu'aucune route ne les consomme plus).

---

## Chantier P0.3 — Architecture en 3 piliers + silo (sections ancrées)

> Source : `strategy/02 §0bis` (FAIT FOI). **Anti-dilution** : 1 page pilier par famille avec
> **sections ancrées (`id`)**, le méga-menu pointe les ancres. Réutiliser les **sections cataloguées**
> (`SectionsRenderer` + frontmatter `sections:`), **jamais de markup inline** (anti-orphelin).

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.3-a — Pilier Growth System IA (Acquérir)** `/offres/growth-system-ia`.
  - Objectif : page composable avec sections ancrées `#site-web-ia` (résumé + lien vers le silo),
    `#seo-geo`, `#content-marketing`, `#publicite`, `#tunnel-de-vente`, `#agent-marketing`. Fusionner
    le contenu utile des solutions Acquérir supprimées (P0.2-C).
  - Fichiers : `src/content/offres/growth-system-ia.mdx` (frontmatter `sections:`), sections cataloguées
    (`src/components/sections/*`), `section-demos.ts` si nouvelles données.
  - Preuve GF-1 : screenshot preview above-fold + `getComputedStyle` (opacity≠0) + ancres résolvent
    (`#seo-geo` etc. scroll OK) + build vert.
  - Dépend de : P0.3 pré-requis (sections existantes cataloguées).
- [ ] **P0.3-b — Pilier Data & Analytics (Piloter)** `/solutions/data-analytics`.
  - Objectif : sections ancrées `#revops`, `#tableaux-de-bord`, `#reporting-ia`, `#donnees-centralisees`,
    `#previsionnel-ia`, `#agent-analytique`. Indexé mais **sans cluster** (pas de mise SEO offensive).
  - Fichiers : `src/content/solutions/data-analytics.mdx`, sections cataloguées.
  - Preuve GF-1 : screenshot above-fold + ancres OK + build vert.
  - Dépend de : —
- [ ] **P0.3-c — Pilier Automatisation & Agents IA (Opérer)** `/solutions/automatisation-agents-ia`.
  - Objectif : sections ancrées `#crm-relances`, `#automatisation`, `#service-client`, `#admin-rh`,
    `#legal`, `#agents-metiers`. **Nom à confirmer Simon** (`[?]`).
  - Fichiers : `src/content/solutions/automatisation-agents-ia.mdx`, sections cataloguées.
  - Preuve GF-1 : screenshot above-fold + ancres OK + build vert.
  - Dépend de : —
- [ ] **P0.3-d — Page silo `/offres/site-web-ia` (PILIER money page)** — câblage initial.
  - Objectif : page composable selon **l'ordre canonique de sections** (`strategy/02 §5`) : Hero →
    Douleur → Promesse → Preuve → Mécanisme → Différenciation → Offre/pricing → Maillage silo → FAQ → CTA.
    (Enrichissement H1/keyword = P1 ; ici on pose le squelette composable.)
  - Fichiers : `src/content/offres/site-web-ia.mdx` (`sections:`), sections cataloguées, FAQ schema.
  - Preuve GF-1 : screenshot above-fold + ordre des sections conforme §5 + 1 seul CTA primaire + build vert.
  - Dépend de : P0.4 (cannibalisation site-web-ia-pme/landing remontée ici).

---

## Chantier P0.4 — Cannibalisation « site web IA » + maillage silo

> Source : `strategy/02 §2B,§5.8,§6.5`. 3 URL « site web IA » → 1 pilier.

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.4-a — Remonter `site-web-ia-pme` (pains) + `site-web-ia-landing` dans le pilier**.
  - Objectif : déplacer le contenu utile vers `/offres/site-web-ia`, puis supprimer les 2 sources
    (élimine la cannibalisation, 1 seule money page).
  - Fichiers : `src/content/offres/site-web-ia.mdx`, `src/content/solutions/site-web-ia-pme.*`, `src/content/offres/site-web-ia-landing.*`.
  - Preuve GF-1 : `grep` 0 doublon « site web IA » indexé + build vert + le pilier contient les pains remontés.
  - Dépend de : P0.3-d.
- [ ] **P0.4-b — Maillage silo : section « Maillage » du pilier**.
  - Objectif : liens vers les 5 enfants silo (`contenu-seo-geo-ia`, `content-marketing-ia`,
    `tunnel-de-vente`, `publicite-en-ligne`, `agent-marketing-commercial`).
  - Fichiers : `src/content/offres/site-web-ia.mdx`, sections cataloguées (maillage/grid).
  - Preuve GF-1 : `check-content-refs` vert + liens cliquables (screenshot) + build vert.
  - Dépend de : P0.3-d, P0.2 (enfants silo conservés).

---

## Chantier P0.5 — Méga-menu & Footer resserrés (ancres + whitelist)

> Source : `strategy/02 §6.3,§0bis`. Nav = Offres (Site web IA / Audit / Growth System) · Expertises
> silo · Cas · Ressources · Agence · Contact. Méga-menu 3 colonnes (Acquérir/Piloter/Opérer) →
> **liens d'ANCRES** vers les sections des piliers, **sauf « Site web IA »** → page silo dédiée.

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.5-a — Recâbler `mega-menu.ts` sur les ancres des piliers**.
  - Objectif : colonne Acquérir → ancres `growth-system-ia#...` (sauf Site web IA → `/offres/site-web-ia`) ;
    Piloter → `data-analytics#...` ; Opérer → `automatisation-agents-ia#...`. Aucune entrée vers une
    page `/solutions/<sous-service>` supprimée.
  - Fichiers : `src/data/mega-menu.ts`, `src/components/header/Header.astro`.
  - Preuve GF-1 : screenshot méga-menu déployé + clic ancre → scroll vers la bonne section
    (`getComputedStyle` cible visible) + `grep` 0 lien vers route supprimée.
  - Dépend de : P0.3 (piliers + ancres existants).
- [ ] **P0.5-b — Footer resserré sur la whitelist** + retrait des routes « encore en Stub ».
  - Objectif : `Footer.astro` ne liste que les pages whitelist (`strategy/02 §1`) ; retirer le bloc
    « routes encore en Stub » (`Footer.astro:186-241`).
  - Fichiers : `src/components/footer/Footer.astro`.
  - Preuve GF-1 : screenshot footer + `check-content-refs` vert + 0 lien vers page supprimée.
  - Dépend de : P0.2 (suppressions faites), P0.3.
- [ ] **P0.5-c — Sitemap & `robots`** alignés sur ~28 URLs FR (DS internes en noindex).
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
- [ ] **P0.6-a — Réécrire `/agence/about`** (studio solo, bio véridique).
  - Objectif : retirer agence-10 / bureaux Genève / ancienneté fausse ; positionner praticien solo crédible.
  - Fichiers : `src/content/.../agence/about.*`, sections cataloguées.
  - Preuve GF-1 : screenshot + `grep` 0 mention « 10 personnes / Genève / Paris » + build vert.
  - Dépend de : P0.2-D.
- [ ] **P0.6-b — Assainir `/manifesto`, `/agence/methode`, `/contact`, `/equipe` + `/equipe/simon-beros`**.
  - Objectif : retirer chiffres inventés (manifesto), corriger l'ancienneté (méthode), retirer fausses
    adresses + cal.com réel (contact), page auteur E-E-A-T fondateur (equipe).
  - Fichiers : `src/content/.../{manifesto,agence/methode,contact}.*`, `src/content/authors/simon-beros.*`.
  - Preuve GF-1 : screenshots + `grep` 0 fausse adresse/chiffre + form `/contact` POST réel testé
    (`check-form-endpoints` vert).
  - Dépend de : —
- [ ] **P0.6-c — Réécrire la home `/`** focalisée silo + preuve réelle.
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
- [ ] **P0.7-a — Créer `/mentions-legales`**.
  - Objectif : mentions légales conformes (éditeur, hébergeur, SIREN, contact) — données réelles Simon.
  - Fichiers : `src/pages/mentions-legales.astro` (ou MDX composable), sections cataloguées (légal/texte).
  - Preuve GF-1 : page rend (screenshot) + lien footer OK + build vert + `check-content-refs` vert.
  - Dépend de : P0.2-A (pas de section légale orpheline).
- [ ] **P0.7-b — Créer `/politique-de-confidentialite` (RGPD)**.
  - Objectif : politique RGPD conforme (cookies < 5, finalités, droits, DPO/contact).
  - Fichiers : `src/pages/politique-de-confidentialite.astro` (ou MDX), bandeau cookies si applicable.
  - Preuve GF-1 : page rend + lien footer + build vert + cookies réels comptés < 5 (preuve réseau).
  - Dépend de : —

---

## Chantier P0.8 — Pricing 3 000 € HT (offer ladder)

> Source : `strategy/02 §6.8`, `business/08`. Plancher Site web IA = **3 000 € HT** → escalade Growth System IA.

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.8-a — Câbler le pricing 3 000 € HT sur le pilier + hub offres**.
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
- [ ] **P0.9-a — Lead magnet = landing audit quick win** (CTA unique partout).
  - Objectif : page/landing « Audit IA gratuit 30 min, repartez avec 3 actions chiffrées », 1 CTA cal.com,
    réutilisée GBP/LinkedIn/signature. (`business/08` QW3, `marketing/04`.)
  - Fichiers : `src/content/offres/audit-maturite-ia.mdx`, sections cataloguées, lien cal.com réel.
  - Preuve GF-1 : screenshot landing + CTA cliquable vers cal.com réel + build vert.
  - Dépend de : P0.3, P0.6-b (cal.com réel câblé).
- [ ] **P0.9-b — Fiches & présentations offres prêtes** (sales enablement).
  - Objectif : fiches offres + pitch RDV exploitables (les 3 offres), prêtes à envoyer/présenter.
  - Fichiers : `docs/business/06-fiches-offres.md`, `docs/business/07-pitch-rdv.md` (formaliser livrables).
  - Preuve GF-1 : livrables relus, cohérents avec pricing 3 000 € + offer ladder.
  - Dépend de : P0.8.
- [ ] **P0.9-c — Setup Google Business Profile** (QW1).
  - Objectif : GBP complet (catégorie agence web/IA, zone Montpellier, 10 photos, description mots-clés,
    FAQ) + demander 3-5 avis clients réels.
  - Fichiers : hors repo (action Simon `[?]` pour photos/avis).
  - Preuve GF-1 : profil publié + URL fournie + cohérence entité avec le site (NAP).
  - Dépend de : P0.6 (identité véridique figée).
- [ ] **P0.9-d — Setup LinkedIn personal brand Simon** (canal n°1, QW6).
  - Objectif : profil optimisé + 3 premiers posts orientés preuve + CTA doux audit (`marketing/04 §1`).
  - Fichiers : hors repo (action Simon `[?]`).
  - Preuve GF-1 : profil/posts publiés + CTA pointant la landing audit (P0.9-a).
  - Dépend de : P0.9-a.

---

## Chantier P0.10 — Vérification finale P0 (gate de phase)

### Tâches finies
_(vide)_

### Tâches en attente
- [ ] **P0.10-a — Build + check + sitemap = base propre**.
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
- [ ] **P1.1-a — Passe keyword gratuite** (SERP, autocomplete, Google Trends, Keyword Planner, GSC post-lancement).
  - Objectif : figer les **H1** du pilier silo + des 5 enfants + 3 piliers, sans outil payant.
  - Fichiers : `docs/strategy/03-recherche-seo-geo.md` (consigner), puis H1 dans les `.mdx`.
  - Preuve GF-1 : tableau keyword → H1 figé + H1 effectifs dans le HTML bâti (grep `<h1`).
  - Dépend de : P0.3, P0.4 (pages existantes).
- [ ] **P1.1-b — Appliquer les H1 figés** sur pilier + enfants + 3 piliers.
  - Objectif : 1 H1 unique et keyword-aligné par page indexée.
  - Fichiers : `src/content/{offres,solutions}/*.mdx`.
  - Preuve GF-1 : 1 seul `<h1>` par page (sweep HTML) + correspondance avec P1.1-a.
  - Dépend de : P1.1-a.

## Chantier P1.2 — Cluster blog silo « Site web IA »

### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P1.2-a — 4-6 articles in-silo supplémentaires** (Mois 2).
  - Objectif : étendre le cluster autour du pilier (longue traîne + maillage interne vers le pilier).
  - Fichiers : `src/content/blog/*` (skill `article-add`), maillage vers `/offres/site-web-ia`.
  - Preuve GF-1 : articles rendus + liens internes vers le pilier (`check-content-refs`) + build vert.
  - Dépend de : P0.2-G (blog nettoyé), P0.3-d.

## Chantier P1.3 — GEO (schema, llms.txt, cohérence entité)

### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P1.3-a — JSON-LD + FAQ schema.org** sur pilier + pages clés.
  - Objectif : Organization/LocalBusiness + FAQPage (objections longue traîne) + Article sur le cluster.
  - Fichiers : `src/components/.../schema-builder.ts`, layouts, `.mdx`.
  - Preuve GF-1 : JSON-LD valide (Rich Results test) + présent dans le HTML bâti.
  - Dépend de : P0.3-d.
- [ ] **P1.3-b — `llms.txt` + cohérence entité (GEO/AIO)**.
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

## Chantier P2.1 — Couverture & maintenance des captures (NE SE FERME JAMAIS)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.1-a — Établir la couverture réelle** (`docs/visual-audit/`). Le dossier est probablement
  **incomplet** (sections/templates oubliés). Te poser : quels templates × sections ont une capture
  above-fold À JOUR ? lesquels MANQUENT ? Construis l'inventaire templates × sections et compare.
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

## Chantier P2.3 — Fondation `@theme inline` (prérequis builder)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.3 — `@theme` mort → `@theme inline`** pointant `var(--token-maison)` (retirer les hex
  littéraux de `tokens.css`) pour que le DS Studio repeigne les utilities Tailwind. **Bloque P2.7/P2.8.**

## Chantier P2.4 — Nettoyage variables CSS (vagues différées + arbitrages)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.4-a — Vagues perceptibles** V9d (demi-pixels)/V9e (line-height)/V9f (tracking)/V9g (durées)/
  V9h (collapses) — `audits/02-token-coherence`. Te poser : laquelle change le rendu, laquelle non ?
- [ ] **P2.4-b [?] — 4 incohérences à trancher (Simon)** : (A) `--section-*` vs `--spacing-*` ;
  (B) `--radius-xs` mal nommé ; (C) `--shadow-hairline`≡`--shadow-card-rest` ; (D) `--col-full`.

## Chantier P2.5 — V-TYPO transverse (directive 01, jamais exécutée en transverse)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.5 — Passe typo transverse** : `global.css:62-129` h1/h2/h3 serif → sans (serif = emphase de
  quelques mots only). Vetos permanents : HeroHome `/` + masthead `/solutions`. Preuve GF-1 sur pages touchées.

## Chantier P2.6 — Awwwards (directive 03) W1/W3/W4 + re-critique it.13
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.6 — W1 typo / W3 recomposition templates secteurs+offres / W4 images stylisées** + re-critique
  it.13 post-deploy (= T-5). Te poser : quelles sections paraissent pauvres/monotones (cards « Construire ») ? Preuve GF-1.

## Chantier P2.7 — Système de variation (#14 Phase B)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.7 — `sectionBaseSchema` mixin + compléter `section-presets.ts` + `.sec--layout-*` + déployer
  `data-palette`/`data-density` + route `/preview/[type]/[preset]` + gate `check-presets`.** Dépend de P2.3.

## Chantier P2.8 — DS Studio créatif (#14 Phase C)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.8 — Save preset** (`POST /api/ds/preset`, garde `DS_SAVE_KEYWORD`, pipeline git) →
  `src/data/ds-presets.json` + `[data-theme]` dans `src/styles/themes.css` ; supprimer reload
  `loadCatalogType` ; instance overrides. Dépend de P2.7.

## Chantier P2.9 — Production presets en masse (#14 Phase D-E)
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.9 — Vagues multi-agents** (1 catégorie/agent, worktrees), 40+ presets/catégorie, styles
  2010→2026, **GF-1 sur CHAQUE preset** + listing DS Studio exhaustif. Dépend de P2.7/P2.8 + sections finales (P0).

## Chantier P2.10 — Passe finale Claude Design
### Tâches finies
_(vide)_
### Tâches en attente
- [ ] **P2.10 — Passe design finale** (skill `design:*`) une fois les sections figées et P2.2-P2.8 avancés :
  critique structurée → corrections → preuve GF-1 sur les pages de la whitelist `strategy/02 §1`.

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
- [ ] **P4.2-a — Merger le pilote TinaCMS** (`feat/tina-no-react-pilote`, byte-identique visiteur).
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
- [ ] **T-1 — Migrer `SolutionsDetailTemplate` vers le registry** (dernier template props-driven).
  - Preuve GF-1 : page solutions rendue via registry (screenshot) + build vert + `check-touchpoints`.
  - Dépend de : —
- [ ] **T-2 — GF-1 sweep des 58 previews `/preview/<type>`**.
  - Preuve GF-1 : sweep Playwright (secret `VERCEL_AUTOMATION_BYPASS_SECRET` ou `scripts/serve-dist.mjs`) = 0 FAIL.
  - Dépend de : —
- [ ] **T-3 [?] — Arbitrage Simon : 3 types vt=0** (`TrustLegal` / `Welcome` / `ListIndex`) — cataloguer ou laisser bespoke.
  - Dépend de : décision Simon.
- [ ] **T-4 — DS / variation / partners : finir le hub techno** (`state/01 §a`, worktree `feat/ecosystem-partners`).
  - Contexte : section `ecosystem-partners` posée (`specs/01-ecosystem-partners`), **hub `/technologies` à finir**.
  - Preuve GF-1 : hub techno rendu (screenshot above-fold) + build vert. Dépend de : —
- [ ] **T-5 — Re-critique AWWWARDS it.13 post-deploy** (`state/01 §a` ; boucle close it.12 = 4,5/5).
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
