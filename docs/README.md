# 📒 docs/ — Index maître Waimia (START HERE)

> **Point d'entrée unique pour tout agent IA.** Lis ce fichier en premier.
> Il dit quoi lire selon la mission, l'état des chantiers, et où vit chaque chose.
> Hiérarchie des sources de vérité :
> 1. **`CLAUDE.md`** (racine) = garde-fous GF-1..GF-6 + règles projet (non négociable).
> 2. **Ce `README.md`** = carte des docs + ordre de lecture.
> 3. **`docs/state/00-BOARD.md`** = board de progression **généré** (Phase / chantier / done-total / % / reste) — vue d'un coup d'œil, sync auto sur git. NE PAS éditer à la main.
> 4. **`docs/state/02-plan-execution-claude-code.md`** = source de vérité des **tâches** (cases `[x]` + tag `<!-- sb commit=… -->`). Le board en dérive.
> 5. **git** (log + branches) = vérité d'exécution. *(`tasks/ORCH-STATE.md` = journal narratif d'orchestration, désormais secondaire.)*

### 📐 Compteurs canoniques (figés 2026-06-15, mesurés ; GF-4)
> Source unique. Périme toute autre valeur croisée ailleurs (58/67/87/123/147/151). Re-mesurer via `node scripts/gen-section-manifest.mjs`.

| Métrique | Valeur | Mesure |
|---|---|---|
| **Types registry catalogués** | **156** (45 site · 111 library) | `scripts/gen-section-manifest.mjs` |
| `src/components/sections/*.astro` | **128** | `ls sections/*.astro \| wc -l` |
| Templates (`src/components/templates/*.astro`) | **13** | `ls templates/*.astro` |
| `src/styles/tokens.css` | **278 lignes** | `wc -l` |

*(L'ancien `docs/00-MASTER-PLAN.md` (147 types) est **archivé** → `docs/archive/00-MASTER-PLAN.md`. Ne pas s'y fier.)*

### 🏷️ Positionnement de marque (tranché 2026-06-15 ; voir `state/RECONCILIATION-REPORT.md`)
- **Marque = « studio IA »** (build-forward : on conseille **+** intègre **+** connecte **+** développe **+** opère, pas conseil-only). **Révisé 2026-06-15** (cf `state/RECONCILIATION-REPORT.md` §1) : « cabinet (d'orchestration) IA » écarté car le marché 2026 lit « cabinet » comme **conseil pur** (les LLM ne citent pas un cabinet sur l'intent « intégrer/connecter/développer l'IA » → coût GEO) et la voix `agence/methode` dit déjà « on ne vend pas un cabinet ». H1 = « Le studio qui fait tourner votre PME à l'IA. ». « orchestration IA » reste l'umbrella du full-chain dans la copy.
- **SEO/GEO en couches** : keywords support (title, longue traîne) = « agence IA », « intégrateur IA », « intégration IA PME », « studio IA » ; « cabinet conseil IA » / « audit maturité IA » réservés à la **page diagnostic** (intent advisory). Jamais un seul de ces termes en H1 de marque unique.
- **Offre cœur = « site web intelligent »** (nom/slug/H1) ; « site web IA » = keyword corps/FAQ.
- **Pricing = grille 2 000 / 4 000 / 7 000 / 10 000 € + sur-mesure** (plancher 2 000 € HT, audit gratuit). Périme 3 000 € / 7 900 € / « dès 1 500 € ».
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
0. ⭐ **`strategy/10-architecture-finale-v7.md`** — **ARCHITECTURE COURANTE (2026-06-18)** : 2 offres,
   nav 4 méga-menus, collections élargies, **politique d'indexation index-on-quality**. SUPERSEDE
   l'archi 3-piliers de `02`/`06`. **Lire EN PREMIER pour toute question d'architecture/URL.**
1. **`strategy/01-silo-site-web-ia.md`** — la stratégie (Cheval de Troie, pourquoi ce silo).
2. **`strategy/02-site-etat-final.md`** — spec d'état final : whitelist E-E-A-T + suppressions
   fictif/thin + ordre sections conversion. *(Archi 3-piliers SUPERSEDED par `10`.)*
3. **`strategy/03-case-study-sector-system.md`** : blueprint système case study + hubs sectoriels (taxonomie 6 secteurs, template `/cas` conversion/GEO, double-label, données marché sourcées). Chantier #18.
4. **`archive/50-SILO-RUNBOOK-EXECUTION.md`** — détail du maillage silo + batchs techniques.
5. **`state/01-chantiers.md`** — état réel du projet, pending, pièges.

### 🧱 Mission Design System (secondaire)
1. `design-system/01-contrat.md` — le contrat figé.
2. `design-system/02-catalogue.md` — catalogue des sections (gros).
3. `archive/08-component-library.md` — bibliothèque atomique.
4. `design-system/03-library-strategy.md` — stratégie 1000+ presets (#14). **Exécution = `state/02` PHASE P2 + `state/05-design-refonte`.**

### 🔧 Mission technique (archi / standards)
`architecture/01-standards-patterns.md`, `archive/07-component-patterns.md`,
`architecture/02-content-models.md`, `architecture/03-integrations.md`,
`architecture/05-url-redirects.md`, `architecture/36-TINA-ASTRO-*.md`.

### 🔁 Reprise de session
`state/01-chantiers.md` + `tasks/ORCH-STATE.md` + dernier `session-reports/SR-*`.

---

## 2. Board des chantiers (synthèse — détail dans `state/01`)

> Numérotation unique **P0→P4** = `state/02-plan-execution-claude-code.md` (backlog maître, 71 tâches). Ce board en est la synthèse.

| Phase / chantier | Statut | Doc |
|---|---|---|
| **P0 — Cash & base propre** : site honnête (grille pricing 2/4/7/10k, suppr. fictif/thin, légal) + 3 piliers + silo | 🟢 specé, **prioritaire** | `state/02` P0 · `strategy/01,02` |
| **P1 — SEO/GEO** : recherche KW **gratuite** → H1, cluster blog silo, GEO (schema/llms.txt/GBP) | 🟢 non bloqué | `state/02` P1 · `strategy/03` |
| **P2 — DESIGN / refonte DS** (ACTIF, multi-passes) : captures, socle DS, @theme, V-TYPO, awwwards, #14 presets, passe Claude Design | 🟢 actif | `state/02` P2 · `state/05-design-refonte` |
| **P3 — Outils** : lead sourcing + scoring (Firecrawl) | ⚪ à venir | `state/02` P3 · `business/09` |
| **P4 — Long terme (figé)** : boilerplate forkable, CMS lite + TinaCMS, dashboard/agents | ⚪ figé | `state/02` P4 · `marketing/05` |
| **Backlog hérité T-1..T-8** : migration SolutionsDetail, GF-1 sweep previews, hygiène git, VISION FINALE, 301 fintech | 🟡 à intercaler | `state/02` backlog · `state/01` · `audits/01` |

**Stratégie marketing, business & vente** (à enchaîner après le chantier site) :
- `marketing/` (6) — positionnement zone blanche, funnel 3-temps, contenu/GEO, canaux, **produit boilerplate**.
- `business/` (8) — **business plan, étude de marché, prospection, communication, sales enablement (objections/battlecards/scripts), fiches offres, pitch RDV, quick wins & plan de CA**.

Vision produit : `waimia-web` = **socle marketing IA modulaire forkable par client** (agents =
Claude Code/Cowork + `.claude/` du repo ; modules activables ; facturation à l'usage) —
cf `marketing/05-boilerplate-produit`.

**Finalisation doc en attente** (`docs/FINALISATION-MANIFEST.md`) : renumérotation cohérente
par dossier (`01..N`, fini les numéros à 52), allègement `CLAUDE.md`, checks anti-contradiction.
Tant qu'elle n'est pas exécutée, certains chemins ci-dessus portent encore les anciens numéros.

**Arbitrages tranchés** (position expert, cf `strategy/02 §7`) : glossaire supprimé ;
13 solutions Piloter/Opérer + 8 offres secondaires supprimées ; cas/secteurs/testimonials
fictifs supprimés (templates gardés, reconstruits en réel) ; identité véridicisée ;
EN archivé (lancement FR monolingue).

---

## 3. Carte des dossiers (renumérotation `01..N` EXÉCUTÉE le 2026-06-12)

```
docs/
├── README.md              ← CE FICHIER (index, seul .md « libre » à la racine docs/)
├── strategy/   (11)       SEO / site / GEO (LIVE) — 00 synthèse lancement · 01 silo · 02 état final site (archi 3-piliers SUPERSEDED par 10) · 03 recherche SEO/GEO · 04 GEO-AIO · 05 stack · 06 doctrine positionnement/archi/SEO (positionnement LIVE ; archi 3-piliers SUPERSEDED par 10) · 07 benchmark Digidop (concurrent terrain) · 08 IA templates pages V1 · 09 blueprint contenu V1 · **10 ARCHITECTURE FINALE v7 (SOURCE CANONIQUE d'architecture + politique d'indexation index-on-quality, 2026-06-18)**
├── marketing/  (6)        01 positionnement · 02 GTM · 03 contenu · 04 canaux · 05 boilerplate produit (LIVE)
├── business/  (16)        00 références canoniques (voix manifeste, offer ladder, clients) · 01 business plan · 02 étude marché · 03 prospection · 04 comm · 05 sales enablement · 06 fiches offres · 07 pitch RDV · 08 quick wins · 09 leadsourcing+scoring (Firecrawl) · 10 présentations offres · 11 cash-first 90j · 12 competitive brief · 13 modèle financier · 14 marché données réelles · 15 validation client (LIVE)
├── architecture/ (9)      standards, content-models, intégrations, déploiement, redirects, tina-astro, images, archi, cms (RÉFÉRENCE)
├── design-system/ (8)     01 contrat · 02 catalogue · 03 library-strategy · 04 agent-ds · 05 design-os · 06 motion · 07 health · brand-contract (RÉFÉRENCE)
├── directives/  (3)       01 typo · 02 dark · 03 awwwards (LIVE court)
├── state/       (9)       01 chantiers · 02 plan-execution-claude-code (BACKLOG MAÎTRE, phases P0→P4) · 03 critique · 04 brand-review · 05 design-refonte (détail PHASE P2) · 08 plan-refonte-site-web-intelligent-v6 · 09 plan-harmonisation-ds-page (LIVE, chantier DS+page courant) · RESUME-CLAUDE-CODE · prochain-chantier (LIVE volatile)
├── audits/      (3)       01 template-registry-migration · 02 token-coherence (RÉFÉRENCE) · 03 audit-consolidé-2026-06-15 (5 axes, P0→P3, RÉFÉRENCE état avant cutover)
├── specs/       (4)       01 ecosystem-partners · 02 adr-architecture-site (ADR-002) · 03 adr-ouverture-silo-acquerir (ADR-003, ouvre Acquérir en silo) · 04 copy minée ex-tunnel site-web-ia (préservée Phase C)
├── archive/               périmé / superseded (~60 docs : cartography/ (23), audit-refonte/ (5), audits consommés, DS périmés…)
├── session-reports/       journaux de session horodatés (SR-*)
├── visual-audit/          (mémoire visuelle, preuves GF-1, cf son README) · cartography/ + audit-refonte/ → archivés 2026-06-15
```
> ~25 docs **vivants** clairement répartis ; le reste en `archive/` (consultable, hors chemin par défaut).
> **Reste de la finalisation** (`FINALISATION-MANIFEST.md`) : fusions de contenu (06+07, 46/47→03, DS-COHERENCE→01),
> corrections factuelles (`architecture/03` output static, CMS→Tina), allègement `CLAUDE.md`.
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
