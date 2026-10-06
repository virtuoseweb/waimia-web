# 📒 docs/ — Index maître Waimia (START HERE)

> ⭐ **ÉTAT COURANT (2026-07-12) = V8 acté, prod = `main`.** V7-FOLD est mergée (plus de branche `feat/v7-foundations` en gate). **Positionnement V8 tranché** : ingénierie de systèmes business, `strategy/10 §0bis` (cf §Positionnement ci-dessous). **Home LIVE validée telle quelle** (verdict Simon gate B) ; la maquette D est rejetée ; itération **variante E** en cours sur `/lab/home-e` (raccourcir/hiérarchiser/dédoublonner, décision explicite Simon requise avant tout remplacement de la home). Reprise détaillée : `state/05-cloture-session-2026-07-12.md`. **Le board `state/00-BOARD` + le backlog `state/02` (P0-P4) restent GELÉS sous V7** (cadre 3-piliers superseded) : valides sur le fond, à réinterpréter sous V7/V8, pas à reprendre tels quels. Le point 5 ci-dessous (« source de vérité des tâches ») est donc gelé.

> **Point d'entrée unique pour tout agent IA.** Lis ce fichier en premier.
> Il dit quoi lire selon la mission, l'état des chantiers, et où vit chaque chose.
> Hiérarchie des sources de vérité :
> 1. **`CLAUDE.md`** (racine) = garde-fous GF-1..GF-6 + règles projet (non négociable).
> 2. **Ce `README.md`** = carte des docs + ordre de lecture.
> 3. **`docs/synthese-v1/SYNTHESE.md`** = synthèse unique de TOUS les docs (carte de lecture express + fiche condensée par document + conflits ouverts). Lire juste après ce README pour comprendre le projet sans ouvrir 100 fichiers.
> 4. **`docs/state/00-BOARD.md`** = board de progression **généré** (Phase / chantier / done-total / % / reste) — vue d'un coup d'œil, sync auto sur git. NE PAS éditer à la main.
> 5. **`docs/state/02-plan-execution-claude-code.md`** = source de vérité des **tâches** (cases `[x]` + tag `<!-- sb commit=… -->`). Le board en dérive.
> 6. **git** (log + branches) = vérité d'exécution. *(`tasks/ORCH-STATE.md` = journal narratif d'orchestration, désormais secondaire.)*

### 📐 Compteurs canoniques (re-mesurés 2026-07-19 ; GF-4)
> Source unique. Périme toute autre valeur croisée ailleurs (58/67/87/123/147/151/156). Re-mesurer via `node scripts/gen-section-manifest.mjs`. *(Valeurs 2026-06-15 « 156/128/13/278 » périmées → post-co-location #38 + monorepo #40, cf ci-dessous.)*

| Métrique | Valeur | Mesure |
|---|---|---|
| **Types registry catalogués** | **221** (40 site · 181 library) | `node scripts/gen-section-manifest.mjs` |
| Modules co-localisés (source catalogue) | **221** | `ls -d src/sections/*/ \| wc -l` |
| `src/components/sections/*.astro` (legacy) | **172** | `ls sections/*.astro \| wc -l` |
| Templates (`src/components/templates/*.astro`) | **6** | `ls templates/*.astro` |
| `tokens.css` (déplacé package #40) | **314 lignes** | `wc -l packages/ds-tokens/tokens.css` |
| Presets énumérés (allPresets) | **823** | `npx tsx scripts/check-presets.mjs` |

*(L'ancien `docs/00-MASTER-PLAN.md` (147 types) est **archivé** → `docs/archive/00-MASTER-PLAN.md`. Ne pas s'y fier.)*

### 🏷️ Positionnement de marque (V8, tranché 2026-07-12 ; source = `strategy/10` **§0bis**)
- **Métier = ingénierie de systèmes business** (concevoir · construire · opérer). Signature H1 : « **Le studio qui construit les systèmes qui font tourner votre PME.** » (évolution du H1 2026-06-15). Sous-titre classable GEO : « agence d'automatisation et d'intégration IA pour PME » (metadata/footer, jamais en signature). Définition canonique extractible : voir `strategy/10 §0bis.1`.
- **Architecture 3 étages** : marque (« systèmes business ») → familles par fonction (Système marketing · Intégration IA ; commercial plus tard ; RH/direction = upsell SANS pages) → portes d'entrée SEO (1 page = 1 requête réelle). « Système X » / « site web intelligent » / « intégrateur Claude » = récit de marque, **jamais des titles/H1 SEO** (0 requête, vérifié 2026-07-12).
- **Différenciation** : on adapte la solution au besoin/contraintes (Claude/GPT/Mistral · sur mesure ou WordPress/Webflow · Make/Zapier/n8n ou code) ; **Claude = lance SEO/GEO** (case FR quasi vierge), pas une identité « anthropic-first » ; constantes = production (pas POC), système possédé (0 captivité), interlocuteur direct.
- **Offres cœur (retitrées + 301, cf `strategy/10 §0bis.3`)** : « **site web IA** » (ex-SWI ; « site web intelligent » = concept propriétaire dans le corps) et « **Intégration Claude en entreprise** » (ex-intégrateur Claude).
- **Pricing = grille 2 000 / 4 000 / 7 000 / 10 000 € + sur-mesure** (plancher 2 000 € HT, audit gratuit). Périme 3 000 € / 7 900 € / « dès 1 500 € ». **V8 : hiérarchie 3 niveaux** (home = points d'entrée · page système = bundle · page service = sa grille propre, noms de paliers distincts par niveau) : `strategy/10 §0bis.3`.
- **Cas & certifs fictifs SUPPRIMÉS** ; cas réels : Balzeo, Amploi (sans métrique inventée), Desangles Peinture, Isabelle Diaz.
- **Cartographie concurrentielle sur 2 axes** (aucun concurrent écarté) :
  - **Axe terrain (site / web-agency)**, cf `strategy/07-benchmark-digidop.md` : **Digidop** (`digidop.com/fr`, agence Webflow premium primée) + **Vydera** (sa marque sœur spin-off GEO/AEO). Concurrent frontal sur la création de site ; angle d'attaque = leur page `ai-automation` superficielle.
  - **Axe positionnement-prix**, cf `business/12-competitive-brief.md` : **ClaudIn** (`claudin.tech`, « par le haut » : ex-McKinsey/Deloitte, intégrateur Claude Cowork grands comptes) + **Limova** (« par le bas » : SaaS agents préfab 70 à 120 €/mois) + **ia.agency, Juwa, e-declic, web-ia**.
  - **Zone blanche Waimia** = sur-mesure **accessible**, anthropic-first **pour la PME**, le site = **actif possédé** par le client (vs location d'agents type Limova, vs Webflow verrouillé chez Digidop, vs facture de cabinet type ClaudIn) + ancrage Montpellier/PME.

---

## 1. Quoi lire en premier — selon ta mission

### 🎯 Mission ACTUELLE prioritaire — Refonte SEO/GEO + base propre
Le chantier n°1. Domaine neuf → silo unique « Site web IA » + suppression du fictif/thin.
Ordre de lecture :
0. ⭐ **`strategy/10-architecture-finale-v7.md`** — **ARCHITECTURE COURANTE (2026-06-18) + positionnement V8 §0bis** : 2 offres,
   nav 4 méga-menus, collections élargies, **politique d'indexation index-on-quality**. SUPERSEDE
   l'archi 3-piliers. **Lire EN PREMIER pour toute question d'architecture/URL/positionnement.**
1. **`strategy/11 strat complète.md`** — nav / méga-menus / 6 services / templates / maillage / indexation (V7-FOLD, à lire avec l'affinage V8 de `10 §0bis`).
2. **`strategy/02-site-etat-final.md`** — spec d'état final : whitelist E-E-A-T + suppressions
   fictif/thin + ordre sections conversion. *(Archi 3-piliers SUPERSEDED par `10`.)*
3. **`strategy/03-case-study-sector-system.md`** : blueprint système case study + hubs sectoriels (taxonomie secteurs, template `/cas` conversion/GEO, double-label, données marché sourcées). Chantier #18.
4. **`archive/50-SILO-RUNBOOK-EXECUTION.md`** — détail du maillage silo + batchs techniques (archivé, référence).
5. **`docs/synthese-v1/SYNTHESE.md`** — synthèse de tous les docs + conflits ouverts. *(La stratégie « Cheval de Troie / silo unique » = `archive/01-silo-site-web-ia.md`, superseded par `10`.)*

### 🧱 Mission Design System (secondaire)
1. `design-system/01-contrat.md` — le contrat figé.
2. `design-system/02-catalogue.md` — catalogue des sections (gros).
3. `archive/08-component-library.md` — bibliothèque atomique.
4. `design-system/03-library-strategy.md` — stratégie 1000+ presets (#14). **Exécution = `state/02` PHASE P2 + `state/05-design-refonte`.**
5. `state/11-asset-illustrations-manifest.md` : catalogue des visuels par la vision (42 illustrations importées + assets DS existants), verdict garder/écarter, recommandation cohérence Registre A (line-art DS) vs Registre B (rétro importé).
6. `state/12-design-direction-service-template.md` : direction design consolidée du template service (brainstorm multi-agents), doc pilote D4 (primitives compositionnelles, 5 bridges, visuels SVG line-art à générer).

### 🔧 Mission technique (archi / standards)
- **`strategy/12-cms-content-format-decision.md`** — décision FIGÉE (2026-06-28) : Tina abandonné, PageDocument JSON git-based, Keystatic pour la coque CMS (entités/media), builder maison pour les sections, MCP pour l'IA, 1 fichier = 1 propriétaire. À exécuter sous #39/#40.
- **`strategy/16-cdc-landing-pages-2026.md`** — CdC OFFICIEL (Simon, 2026-07-17) du système de 4 LP `/lp/` (site-web-intelligent → visibilite-google-ia → systeme-ia-marketing → systeme-acquisition + hub) : stratégie, heros, structures, hooks, CTA, mesure, process agent en 7 phases. Source de vérité du chantier LP conversion (noindex, CRO pur).

`architecture/01-standards-patterns.md`, `archive/07-component-patterns.md`,
`architecture/02-content-models.md`, `architecture/03-integrations.md`,
`architecture/05-url-redirects.md`. *(Tina : `archive/06-tina-astro.md`, historique — Tina abandonné.)*

### 🔁 Reprise de session
`state/05-cloture-session-2026-07-12.md` (dernière clôture) + `tasks/SESSION-HANDOFF-CURRENT.md` + `docs/synthese-v1/SYNTHESE.md`. *(L'audit d'état `01-chantiers.md` = `archive/01-chantiers.md`, daté 2026-06-11.)*

---

## 2. Board des chantiers (synthèse — détail dans `state/00-BOARD.md` + reprise `state/05-cloture-session-2026-07-12.md`)

> Numérotation unique **P0→P4** = `state/02-plan-execution-claude-code.md` (backlog maître, 71 tâches). Ce board en est la synthèse.

| Phase / chantier | Statut | Doc |
|---|---|---|
| **P0 — Cash & base propre** : site honnête (grille pricing 2/4/7/10k, suppr. fictif/thin, légal) + 3 piliers + silo | 🟢 specé, **prioritaire** | `state/02` P0 · `strategy/02,10` |
| **P1 — SEO/GEO** : recherche KW **gratuite** → H1, cluster blog silo, GEO (schema/llms.txt/GBP) | 🟢 non bloqué | `state/02` P1 · `strategy/03` |
| **P2 — DESIGN / refonte DS** (ACTIF, multi-passes) : captures, socle DS, @theme, V-TYPO, awwwards, #14 presets, passe Claude Design | 🟢 actif | `state/02` P2 · `state/05-design-refonte` |
| **P3 — Outils** : lead sourcing + scoring (Firecrawl) | ⚪ à venir | `state/02` P3 · `business/09` |
| **P4 — Long terme (figé)** : boilerplate forkable, CMS lite + TinaCMS, dashboard/agents | ⚪ figé | `state/02` P4 · `marketing/05` |
| **Backlog hérité T-1..T-8** : migration SolutionsDetail, GF-1 sweep previews, hygiène git, VISION FINALE, 301 fintech | 🟡 à intercaler | `state/02` backlog · `audits/01` |

**Stratégie marketing, business & vente** (à enchaîner après le chantier site) :
- `marketing/` (6) — positionnement zone blanche, funnel 3-temps, contenu/GEO, canaux, **produit boilerplate**.
- `business/` (8) — **business plan, étude de marché, prospection, communication, sales enablement (objections/battlecards/scripts), fiches offres, pitch RDV, quick wins & plan de CA**.

Vision produit : `waimia-web` = **socle marketing IA modulaire forkable par client** (agents =
Claude Code/Cowork + `.claude/` du repo ; modules activables ; facturation à l'usage) —
cf `marketing/05-boilerplate-produit`.

**Finalisation doc SOLDÉE** (2026-07-19) : la réorg thématique (dossiers `strategy/ state/ audits/…`)
+ le pivot V8 ont rendu caduque la renumérotation stricte `01..N` visée par les 3 anciens manifestes ;
CLAUDE.md est slim et le nettoyage racine est fait. Les 3 manifestes (`CONSOLIDATION-`, `REPO-CLEANUP-`,
`FINALISATION-MANIFEST`) sont désormais dans `archive/` (référence historique). Certains chemins ci-dessus
gardent volontairement leur numéro d'origine : la carte thématique de ce README fait foi, pas la renumérotation.

**Arbitrages tranchés** (position expert, cf `strategy/02 §7`) : glossaire supprimé ;
13 solutions Piloter/Opérer + 8 offres secondaires supprimées ; cas/secteurs/testimonials
fictifs supprimés (templates gardés, reconstruits en réel) ; identité véridicisée ;
EN archivé (lancement FR monolingue).

---

## 3. Carte des dossiers (renumérotation `01..N` EXÉCUTÉE le 2026-06-12)

```
docs/
├── README.md              ← CE FICHIER (index, seul .md « libre » à la racine docs/)
├── strategy/            SEO / site / positionnement (LIVE) — 02 état final site (whitelist E-E-A-T ; archi 3-piliers SUPERSEDED par 10) · 03 recherche SEO/GEO · 03 case-study-sector-system · 04 GEO-AIO · 05 stack · 07 benchmark Digidop (concurrent terrain) · 09 blueprint contenu V1 · **10 ARCHITECTURE FINALE v7 + §0bis POSITIONNEMENT V8 (SOURCE CANONIQUE archi + indexation index-on-quality)** · 11 strat complète (nav/méga-menus/templates V7-FOLD) · 12 décision CMS (FIGÉ) · 13 vision dashboard + système forkable · **14 carte mot-clé/conversion par page (V8, 2026-07-14 — source du chantier « version finale exploitable », supersede le volet par-page de 09)**. *(Archivés → archive/ : 00 synthèse lancement, 01 silo, 06 doctrine, 08 IA templates.)*
├── marketing/  (6)        01 positionnement · 02 GTM · 03 contenu · 04 canaux · 05 boilerplate produit (LIVE)
├── business/  (16)        00 références canoniques (voix manifeste, offer ladder, clients) · 01 business plan · 02 étude marché · 03 prospection · 04 comm · 05 sales enablement · 06 fiches offres · 07 pitch RDV · 08 quick wins · 09 leadsourcing+scoring (Firecrawl) · 10 présentations offres · 11 cash-first 90j · 12 competitive brief · 13 modèle financier · 14 marché données réelles · 15 validation client (LIVE)
├── architecture/          01 standards · 02 content-models · 03 intégrations · 04 déploiement · 05 redirects · 07 images-pipeline · 08 archi (RÉFÉRENCE). *(Archivés → archive/ : 06 tina-astro, 09 cms-autonome — Tina abandonné, cf strategy/12.)*
├── design-system/ (8)     01 contrat · 02 catalogue · 03 library-strategy · 04 agent-ds · 05 design-os · 06 motion · 07 health · brand-contract (RÉFÉRENCE)
├── directives/  (3)       01 typo · 02 dark · 03 awwwards (LIVE court)
├── state/                02 plan-execution-claude-code (BACKLOG MAÎTRE P0→P4, GELÉ sous V7) · 03 critique · 03 revue-compositions-preview · 04 brand-review · 04 build-strat11-gap · 05 clôtures (06-29 · 06-30 · **07-12 = reprise courante**) · 05 design-refonte (détail P2) · 07 template-page-service · 08 plan-refonte-site-web-intelligent-v6 · 09 plan-harmonisation-ds-page · 10 audit-catalogue-interaction-v7 · 11 asset-illustrations · 12 design-direction-service-template · RECONCILIATION-REPORT (7 décisions) · night-sessions/. *(Archivés → archive/ : 01 chantiers, 06 mapping-migration, PROCHAIN-CHANTIER, RESUME-CLAUDE-CODE.)* Board généré = state/00-BOARD.
├── audits/      (8)       01 template-registry-migration · 02-section-colocation-38 (modules co-localisés src/sections/, gate check:section-modules) · 03 audit-consolidé-2026-06-15 (RÉFÉRENCE état avant cutover) · 04 packages-monorepo-40 (BLUEPRINT #40, clôturé 4 packages) · 05 media-inventory (ex-audit/, dossier singulier supprimé) · 06 token-coherence (ex-02, renuméroté pour lever la collision, RÉFÉRENCE) · 07 p2-triangulation-2026-07-19 · **08 ref-global-content-model (CADRAGE P4.4-e, gate `{ref}`, attente arbitrage Simon)**
├── specs/       (6)       01 ecosystem-partners · 04 copy minée ex-tunnel site-web-ia (préservée Phase C) · 05 builder-vision-reference · 06 builder-architecture. *(Archivés → archive/ : 02 adr-architecture-site ADR-002, 03 adr-ouverture-silo-acquerir ADR-003.)*
├── archive/               périmé / superseded (~60 docs : cartography/ (23), audit-refonte/ (5), audits consommés, DS périmés…)
├── seo/                   routine SEO/GEO hebdomadaire : ROUTINE (runbook de la session Claude) · SETUP (mise en route Search Console) · journal · **rapport-strategie-2026-10-06.md (bilan cluster Claude + plan silos/maillage/cannibalisations)** · **semrush/2026-10-06-recherche-semrush.md (volumes, KD, priorités, Tensoria)** · keywords/feeds/competitors.json · data/ (collecte commitée par le workflow seo-routine, NE PAS éditer)
├── session-reports/       journaux de session horodatés (SR-*)
├── visual-audit/          (mémoire visuelle, preuves GF-1, cf son README) · cartography/ + audit-refonte/ → archivés 2026-06-15
```
> ~25 docs **vivants** clairement répartis ; le reste en `archive/` (consultable, hors chemin par défaut).
> **Finalisation soldée** (2026-07-19) : fusions de contenu et corrections factuelles (`architecture/03` output static)
> intégrées lors de la réorg ; les 3 manifestes d'origine sont archivés (`archive/*-MANIFEST.md`, référence).
```

> Réorg faite (`git mv`, historique préservé). Pointeurs `CLAUDE.md` mis à jour
> (START HERE = ce README). `tasks/` consolidé : LIVE = `ORCH-STATE.md`, `lessons.md`,
> `todo.md` ; le reste → `tasks/archive/`.

---

## 4. Documentation HORS `docs/` (carte complète du repo)

Toute la connaissance n'est pas dans `docs/`. Voici où trouver le reste :

| Emplacement | Quoi | Quand le lire |
|---|---|---|
| **`CLAUDE.md`** (racine) | Garde-fous GF-1..GF-6 + règles projet + init cloud/local | **Toujours en premier** (avant ce README) |
| `README.md` (racine) | Readme dépôt : install, build, stack, commandes | Setup poste / commandes |
| `CONTRIBUTING.md` (racine) | Conventions de contribution | Avant une PR |
| **`tasks/ORCH-STATE.md`** | Journal d'orchestration horodaté (état le + frais) | Reprise de session |
| `tasks/lessons.md`, `tasks/todo.md` | Leçons capitalisées + todo courant | Reprise / capitalisation |
| **`projects/instincts/*.md`** (3) | Patterns d'agent réutilisables (SEO validation, worktrees parallèles, task-phase workflow) | Avant d'orchestrer une phase |
| **`skills/`** (5 + README) | Skills contenu projet : `article-add`, `calendrier-editorial`, `newsletter-mensuelle`, `post-linkedin`, `imported` | Production de contenu marketing |
| `tina/` | Config TinaCMS | Travail CMS |
| `.claude/` | Settings + plugin `vw-guardrails` (marketplace) | Init agent |
| **`visual-audit/`** (+ son `README.md`) | **Mémoire visuelle de l'état réel rendu** (preuves GF-1) | **À la demande** : « voir » l'état d'une page sans rebuild ; à maintenir après chaque modif visuelle |

> Règle : si un agent doit deviner où est une info, c'est que l'index a échoué. Toute
> nouvelle doc structurante = une ligne ici **ou** dans §3.

---

## 5. Conventions

- **1 doc = 1 sujet.** Nouveau doc stratégie → `strategy/NN-titre.md` + ligne dans ce README §2/§3.
- **Statuts** : LIVE (source active) · RÉFÉRENCE (stable, consulté) · ARCHIVE (périmé, gelé).
- **Quand un doc est remplacé**, le déplacer dans `archive/` + noter le remplaçant en tête.
- **Ne jamais** se fier à un doc daté sans croiser `tasks/ORCH-STATE.md` + git.
- **Preuves visuelles** : toujours dans `visual-audit/` (mémoire suivie, voir son `README.md`),
  jamais à la racine du repo ni en vrac dans la doc lisible. La maintenir = la recapturer
  après chaque modif visuelle (`_current/`).
