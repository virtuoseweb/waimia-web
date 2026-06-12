# 🗂️ REORG-MANIFEST — réorganisation de `docs/`

> **Pour Claude Code.** Plan de tri/consolidation des ~62 docs à plat en dossiers
> thématiques digestibles. Les `.md` ne sont **pas importés par le build** (vérifié :
> les refs `docs/` dans `src/` sont des commentaires) → la réorg ne casse pas le build,
> mais elle **casse les liens inter-docs et le pointeur `CLAUDE.md`** → cf §Procédure.
> Exécuter sur `feat/docs-reorg`, 1 commit par lot, `astro check` + `build` verts.

---

## Taxonomie cible

```
docs/
├── README.md              # index maître (déjà créé)
├── REORG-MANIFEST.md      # ce fichier (à supprimer une fois la réorg faite)
├── 00-MASTER-PLAN.md      # → METTRE À JOUR (compteur/état) ou archiver
├── strategy/              # business + SEO/GEO/content + marque (LIVE)
├── architecture/          # archi tech + standards + intégrations (RÉFÉRENCE)
├── design-system/         # catalogue + contrat + specs DS (RÉFÉRENCE)
├── directives/            # directives ponctuelles Simon (LIVE court)
├── state/                 # chantiers courants + handoffs (LIVE volatile)
├── audits/                # audits one-shot consultables (RÉFÉRENCE)
├── archive/               # périmé / superseded (existant)
├── session-reports/       # SR-* (existant, ne pas toucher)
├── cartography/           # (existant, ne pas toucher)
├── audit-refonte/         # (existant, ne pas toucher)
└── visual-audit/          # preuves visuelles 493 fichiers (existant, ne pas toucher)
```

---

## Mapping fichier → destination

### → `strategy/` (LIVE)
| Fichier | Statut |
|---|---|
| `49-SILO-SITE-WEB-IA-PLAN.md` | LIVE — stratégie silo |
| `50-SILO-RUNBOOK-EXECUTION.md` | LIVE — runbook silo |
| `52-PLAN-GENERAL-SITE-COMPLET.md` | LIVE — **spec d'état final (doc maître)** |
| `02-geo-aio-strategy.md` | LIVE — méthode GEO/AIO |
| `24-BRAND-CONTRACT.md` | RÉFÉRENCE — contrat de marque |
| `29-STACK-DECISION.md` | RÉFÉRENCE — verdict Astro |

### → `state/` (LIVE volatile)
| `51-ETAT-REEL-CHANTIERS.md` | LIVE — board chantiers |
| `42-PROMPT-REPRISE-AUTONOME.md` | LIVE — prompt de reprise |
| `SESSION-HANDOFF-CURRENT.md` | **SUPERSEDED** (périmé 02:00) → plutôt `archive/` (le frais = `tasks/`) |

### → `architecture/` (RÉFÉRENCE)
`01-architecture.md`, `03-content-models.md`, `05-deployment.md`,
`06-coding-standards.md`, `07-component-patterns.md`, `09-integrations.md`,
`10-deployment-checklist.md`, `11-url-redirects.md`,
`36-TINA-ASTRO-VISUAL-EDITING-REFERENCE.md`, `38-IMAGES-PIPELINE.md`,
`architecture-v2-cms-autonome.md`.

### → `design-system/` (RÉFÉRENCE, volumineux)
`00-design-system-mapping.md`, `04-motion-system.md`, `08-component-library.md`,
`18-DESIGN-SYSTEM-CARTOGRAPHY.md`, `19-DESIGN-SYSTEM-CLOSED.md`,
`28-DESIGN-SYSTEM-CONTRACT.md`, `45-LIBRARY-MASTER-STRATEGY.md`,
`46-VARIATION-SYSTEM-SPEC.md`, `47-DS-STUDIO-BUILDER-SPEC.md`,
`48-ECOSYSTEM-PARTNERS-SPEC.md`, `AGENT-DS.md`, `DS-COHERENCE-STANDARD.md`,
`DS-HEALTH-AUDIT.md`, `DS-SECTION-CATALOG.md`, `DESIGN-OS-V2.md`.

### → `directives/` (LIVE court)
`41-DIRECTIVE-TYPO-CONTRASTE.md`, `43-DIRECTIVE-VARIANTES-DARK-ALIGNEMENT.md`,
`44-DIRECTIVE-FINALE-AWWWARDS.md`.

### → `audits/` (RÉFÉRENCE consultable)
| Fichier | Note |
|---|---|
| `22-TEMPLATE-REGISTRY-MIGRATION.md` | **LIVE** (runbook P1, référencé par `CLAUDE.md`) — déplacer puis corriger la ref |
| `26-COLLECTIONS-CLEANUP-AUDIT.md` | **LIVE-utile** (sert la suppression `strategy/52`) |
| `25-EDITORIAL-REFONTE-CASE-STUDY-LEGAL.md`, `25-HREFLANG-SITEMAP-AUDIT.md` | RÉFÉRENCE |
| `23-COMPONENT-COVERAGE-PROGRAM.md`, `23-CROSS-COLLECTION-AUDIT.md`, `23-DS-TOKEN-COHERENCE-AUDIT.md` | RÉFÉRENCE |
| `24-A2-CATALOG-TAXONOMY.md`, `24-MIGRATION-FIELDNOTES-VEILLE.md` | RÉFÉRENCE |
| `27-OG-DYNAMIC-AUDIT.md`, `31-COMPONENTS-DOUBLONS-MAPPING.md`, `32-TEMPLATES-DEEP-AUDIT.md`, `33-PAGES-TAXONOMY-AUDIT.md`, `34-AMBIGUS-VERDICTS-OPUS.md` | RÉFÉRENCE |

### → `archive/` (périmé / superseded / daté — gel)
`00-MASTER-PLAN.md` *(si non mis à jour)*, `13-CONTENT-ARCHITECTURE.md`,
`15-STRATEGIC-AUDIT.md` (2026-05-15), `17-COMPONENTS-CARTOGRAPHY.md`,
`21-GF1-CLOUD-SWEEP.md`, `21-SYNC-EN-AUDIT.md`, `22-QA-FINAL-AUDIT.md`,
`37-REFONTE-SYSTEMIQUE.md`, `39-PLAN-VAGUE-VISUELLE.md`,
`40-VISION-FINALE.md` *(extraire d'abord le backlog #20 encore vivant vers `state/51`)*,
`AUDIT-PROGRESS-V10.md`, `DESIGN-AUDIT.md`, `V9-AD2-QA-AUDIT.md`, `V9-N-AUDIT.md`,
`render-matrix.md`, `GIT-SYNC-FLORENTIN.md`, `SESSION-HANDOFF-CURRENT.md`.

> ⚠️ Numéros en doublon (deux `21-`, `22-`, `23-`, `24-`, `25-`) : la séparation en dossiers
> résout le conflit. Ne pas renuméroter (casse les refs externes) — laisser le nom tel quel
> dans son nouveau dossier.

---

## tasks/ — à consolider aussi
- **Garder** : `ORCH-STATE.md` (journal LIVE, référencé `CLAUDE.md`), `lessons.md`, `todo.md`.
- **Archiver** dans `tasks/archive/` : `RESUME-AUTONOMOUS-SESSION.md`,
  `SESSION-VERIF-2026-06-11-CARTOGRAPHY.md`, `brief-w2-case-study.md`,
  `brief-w3-legal.md`, `brief-w4-offres-proof.md` (briefs de vagues passées),
  `SESSION-HANDOFF-CURRENT.md` (doublon périmé).

---

## Procédure d'exécution (sûre)

1. Créer la branche `feat/docs-reorg` + les dossiers cibles.
2. `git mv` chaque fichier vers son dossier (préserve l'historique). **Lots par dossier**, 1 commit chacun.
3. **Corriger les cross-références** après chaque lot :
   - `grep -rn "docs/<ancien-chemin>" docs CLAUDE.md tasks` → réécrire vers le nouveau chemin.
   - **`CLAUDE.md`** référence : `docs/00-MASTER-PLAN`, `docs/20`, `docs/22`, `docs/43`, `docs/16`,
     `docs/35` → mettre à jour les pointeurs (certains numéros n'existent plus en top-level :
     vérifier dans `archive/`/`cartography/` avant de réécrire). **Repointer la « Reprise de
     session » de `CLAUDE.md` vers `docs/README.md`** (nouveau point d'entrée).
4. Mettre à jour `docs/00-MASTER-PLAN.md` (compteur 147→réel, commit, statuts) **ou** l'archiver
   en notant « remplacé par `docs/README.md` + `state/51` ».
5. Mettre à jour `docs/README.md §3` si la taxonomie a divergé.
6. `astro check` + `npx -y pnpm@9.15.0 build` → `Complete!` (preuve : aucun import cassé).
7. Supprimer `REORG-MANIFEST.md` une fois la réorg terminée (rôle = jetable).

> Règle : aucun fichier déplacé ne perd son contenu ; en cas de doute sur LIVE vs ARCHIVE,
> garder en `audits/` plutôt que supprimer. La suppression de **contenu** (pages/collections)
> est un autre chantier = `strategy/52`, à ne pas mélanger avec ce tri documentaire.
