# 🎯 FINALISATION-MANIFEST — état documentaire final (renumérotation + cohérence)

> **Runbook capstone pour Claude Code.** Absorbe et ordonne les manifestes précédents
> (`CONSOLIDATION-MANIFEST`, `REPO-CLEANUP-MANIFEST`). Objectif : un set de **~25 docs vivants**,
> **numérotation cohérente par dossier (01..N, fini les numéros à 52)**, zéro contradiction/
> cannibalisation, et un **`CLAUDE.md` léger** qui ne surcharge pas la config Claude Code quand
> on travaille sur waimia. Brancher `feat/docs-finalisation`, `git mv`, build vert, **supprimer
> les 3 manifestes** à la fin.

---

## 0. Ordre d'exécution (les 3 manifestes en séquence)
1. **`CONSOLIDATION-MANIFEST.md`** — archiver 32 docs (cartography entière, audits consommés, DS
   périmés), fusions (07→06, 46/47→45, DS-COHERENCE+00→28, 50→52), corrections factuelles
   (output static, TinaCMS, waimia-web), sortir 48 du DS.
2. **`REPO-CLEANUP-MANIFEST.md`** — racine (rm images-preuves, archiver ONBOARDING, pointeur
   README), session-reports prune, tasks/ archive. `visual-audit/` = GARDÉ (mémoire visuelle).
3. **CE manifeste** — renumérotation §1 + slim `CLAUDE.md` §2 + intégration marketing §3 +
   checks cohérence §4.

---

## 1. Renumérotation — schéma final (per-dossier 01..N)

> Après archivage/fusion, renommer les **survivants** en `01..N` **par dossier**. `git mv`
> (préserve l'historique). Puis **corriger toutes les références** (§4). Archive = noms d'origine gelés.

**`strategy/`** (SEO/site)
| Nouveau | Ancien |
|---|---|
| `01-silo-site-web-ia.md` | `49-SILO-SITE-WEB-IA-PLAN.md` |
| `02-site-etat-final.md` | `52-PLAN-GENERAL-SITE-COMPLET.md` (doc maître exécution) |
| `03-recherche-seo-geo.md` | `53-RECHERCHE-SEO-GRATUITE.md` |
| `04-geo-aio-methode.md` | `02-geo-aio-strategy.md` |
| `05-stack-decision.md` | `29-STACK-DECISION.md` |
| *(→ archive)* | `50-SILO-RUNBOOK-EXECUTION.md` (procédure technique d'abord remontée dans `02`) |
| *(→ design-system/)* | `24-BRAND-CONTRACT.md` → `design-system/brand-contract.md` |

**`marketing/`** — déjà propre : `01-positionnement-messaging`, `02-go-to-market`,
`03-content-editorial`, `04-acquisition-canaux`, `05-boilerplate-produit`, `README`. Rien à renommer.

**`architecture/`**
| Nouveau | Ancien |
|---|---|
| `01-standards-patterns.md` | fusion `06-coding-standards` + `07-component-patterns` |
| `02-content-models.md` | `03-content-models` (MAJ author=reference) |
| `03-integrations.md` | `09-integrations` (MAJ output:'static', retirer Plateau/virtuoseos) |
| `04-deployment-checklist.md` | `10-deployment-checklist` (MAJ projet `waimia-web`) |
| `05-url-redirects.md` | `11-url-redirects` |
| `06-tina-astro.md` | `36-TINA-ASTRO-VISUAL-EDITING-REFERENCE` |
| `07-images-pipeline.md` | `38-IMAGES-PIPELINE` (nettoyer inventaire fictif) |
| `08-architecture.md` | `01-architecture` (MAJ CMS→Tina, arbo standalone) |
| `09-cms-autonome.md` | `architecture-v2-cms-autonome` (marquer « phase auteurs faite, reste à reconcevoir ») |
| *(→ archive)* | `05-deployment` (bootstrap consommé) |

**`design-system/`**
| Nouveau | Ancien |
|---|---|
| `01-contrat.md` | `28-DESIGN-SYSTEM-CONTRACT` (source de vérité ; absorbe `DS-COHERENCE-STANDARD` + tokens `00-design-system-mapping`) |
| `02-catalogue.md` | `DS-SECTION-CATALOG` (généré, 151 types) |
| `03-library-strategy.md` | `45-LIBRARY-MASTER-STRATEGY` (absorbe `46` + `47` en annexes) |
| `04-agent-ds.md` | `AGENT-DS` |
| `05-design-os-da.md` | `DESIGN-OS-V2` (charte DA narrative, « non-normatif, 01 gouverne ») |
| `06-motion.md` | `04-motion-system` (MAJ pages citées) |
| `07-health-audit.md` | `DS-HEALTH-AUDIT` (daté, croiser ORCH-STATE) |
| `brand-contract.md` | ex-`design-system/brand-contract` |
| *(→ archive)* | `18-CARTOGRAPHY`, `19-CLOSED`, `08-component-library` |

**`directives/`** : `01-typo-contraste` (←41), `02-dark-variantes` (←43), `03-awwwards` (←44).
**`state/`** : `01-chantiers.md` (←51), `prochain-chantier.md` ; `42-prompt-reprise` → archive.
**`audits/`** : `01-template-registry-migration.md` (←22), `02-token-coherence.md` (←23-DS-TOKEN). Reste archivé.
**`specs/`** (nouveau) : `01-ecosystem-partners.md` (← `design-system/48`).

> Résultat : chaque dossier en `01..N`, **aucun numéro > ~9**, ~25 docs vivants.

---

## 2. Alléger `CLAUDE.md` (anti-surcharge config)
`CLAUDE.md` est **toujours chargé** → garder l'essentiel, déléguer le reste à l'index.
- **Garder** : garde-fous GF-1..GF-6, règles prod/branches, init cloud/local, **pointeur unique
  « START HERE → `docs/README.md` »**.
- **Sortir vers les docs** (déjà présents) : le détail DS/registry/dark, l'historique
  d'orchestration, les statuts datés → laisser dans `design-system/*`, `state/01-chantiers`,
  `tasks/ORCH-STATE`. CLAUDE.md ne fait que **pointer**.
- **Corriger les pointeurs** vers les nouveaux chemins (`strategy/02-site-etat-final`,
  `strategy/01-silo`, `state/01-chantiers`, `directives/02-dark-variantes`, `audits/01-...`).
- Cible : CLAUDE.md court, stable, sans état volatil (l'état vit dans `state/` + `tasks/`).

---

## 3. Intégrer la suite marketing au canon
- `docs/marketing/` (6 fichiers) = nouveau cluster LIVE. L'ajouter au **board** et à la **carte**
  de `docs/README.md` (fait) + au pointeur mission de `CLAUDE.md` si pertinent.
- **Vision produit** (`marketing/05`) : `waimia-web` n'est pas que le site de l'agence, c'est le
  **boilerplate produit** (service→fork client→modules→usage). Toute évolution du repo sert le produit.
- **Agents = Claude Code/Cowork + `.claude/` du repo** (pas un runtime custom) — refléter cette
  réalité partout où on parle d'« agents » (cohérent avec `vw-guardrails` déjà en place).

---

## 4. Checks de cohérence finale (zéro contradiction/cannibalisation)
- [ ] `grep -rn "docs/[0-9]" docs CLAUDE.md tasks README.md` → plus aucune réf aux anciens numéros.
- [ ] `grep -rn "Ahrefs\|output: 'server'\|Pages CMS\|waimia-v2\|cas fictifs gardés" docs` → 0
      (sauf en `archive/`). Tout aligné sur la stratégie finale.
- [ ] 1 seul doc maître par sujet : site=`strategy/02`, silo=`strategy/01`, DS=`design-system/01`,
      CMS=`architecture/06`, positionnement=`marketing/01`. Aucun doublon concurrent hors archive.
- [ ] `astro check` + `npx -y pnpm@9.15.0 build` → `Complete!`.
- [ ] `docs/README.md` reflète la structure finale (dossiers + compteurs + sources de vérité).
- [ ] Supprimer `CONSOLIDATION-MANIFEST.md`, `REPO-CLEANUP-MANIFEST.md`, **et ce fichier**.

> Principe : **1 sujet = 1 doc vivant = 1 emplacement = 1 numéro bas**. Tout le reste est
> archivé (consultable, hors chemin par défaut) ou supprimé. L'agent, depuis `CLAUDE.md`, atteint
> n'importe quelle info en ≤ 2 sauts, sans contradiction, sans surcharge.
