# 📚 CONSOLIDATION-MANIFEST — fusion/MAJ/archivage du contenu des docs

> **Pour Claude Code.** Issu de la **lecture profonde du contenu** (pas des titres) de
> `strategy/ architecture/ state/ design-system/ audits/ audit-refonte/ cartography/ directives/`.
> Les **actions résiduelles** des docs archivés sont **déjà remontées** dans `state/01 §f-bis`,
> et les **corrections factuelles** dans `state/01 §f-ter`. Brancher `feat/docs-consolidation`,
> `git mv` (préserve l'historique), build vert, **supprimer ce fichier une fois fini**.

---

## 1. ARCHIVER → `docs/archive/` (32 docs : consommés / périmés / superseded)

**`cartography/` — TOUT le dossier (23)** : inventaires générés 2026-06-04 (compteurs caducs,
ex. « 67 type-ids » vs 151 réels) + briefs d'exécution dont les décisions sont faites ou
déjà remontées (`state/01`, `audit-refonte/`). Régénérables. *(Doublon interne :
`17-TIER2-INLINE-MAPPING` + `17-TIER2-MAPPING-SYNTHESIS`.)* → vider `cartography/`.

**`audits/` (12 sur 14)** : `23-COMPONENT-COVERAGE-PROGRAM`, `23-CROSS-COLLECTION-AUDIT`,
`24-A2-CATALOG-TAXONOMY`, `24-MIGRATION-FIELDNOTES-VEILLE`, `25-HREFLANG-SITEMAP-AUDIT`,
`26-COLLECTIONS-CLEANUP-AUDIT` (auto-déclaré périmé), `27-OG-DYNAMIC-AUDIT`, `31`, `32`, `33`
(les 3 auto-déclarés périmés), `34-AMBIGUS-VERDICTS-OPUS`, `25-EDITORIAL-REFONTE-CASE-STUDY-LEGAL`
(*après fusion §2*). → ne restent en `audits/` que **`22-TEMPLATE-REGISTRY-MIGRATION`** (runbook
actif) et **`23-DS-TOKEN-COHERENCE-AUDIT`** (référence tokens).

**`design-system/` (3)** : `18-DESIGN-SYSTEM-CARTOGRAPHY` (auto-déclaré périmé),
`19-DESIGN-SYSTEM-CLOSED` (superseded par `28`, cf 28 §11), `08-component-library` (chiffres
avril : 114 vs 151 réels).

**`architecture/` (1)** : `05-deployment.md` (bootstrap pré-go-live, prod `waimia.com` LIVE ;
repo/CMS faux). Extraire d'abord les cibles Lighthouse vers `10-deployment-checklist`.

**`state/` (1)** : `42-PROMPT-REPRISE-AUTONOME.md` (pointeurs boot morts vers MASTER-PLAN +
SESSION-HANDOFF ; file de travail pré-pivot). `README.md` couvre déjà la reprise. *(Sinon MAJ
lourde §0+§3.)*

---

## 2. FUSIONNER (chevauchement de contenu réel)

| Source(s) | Cible | Quoi garder |
|---|---|---|
| `archive/50-SILO-RUNBOOK-EXECUTION` (Hub/noindex annulé) | `strategy/02` | Extraire la **procédure technique** (champ `noindex` Zod, wiring `[...slug].astro`, `NOINDEX_SITEMAP_PATHS`, pattern 301) dans 52, puis ARCHIVER 50. Bannière superseded déjà posée. |
| `archive/07-component-patterns` | `architecture/01-standards-patterns` | Doublon quasi pur (mêmes patterns Slots, mêmes exemples). 1 seul doc « standards + patterns ». |
| `architecture/09` + `10` | — | **Dédupliquer le tableau env vars** (apparaît 2× avec valeurs divergentes : `bonjour@waimia.fr` vs `waimia@virtuoseweb.fr`, projet `waimia` vs `waimia-v2`). 1 seule source. |
| `design-system/46` + `47` | `design-system/45` | Rattacher comme annexes « Spec Phase B » et « Spec Studio » (déjà sous-chapitres de 45). |
| `archive/DS-COHERENCE-STANDARD` + `00-design-system-mapping` | `design-system/28` | DS-COHERENCE = durcissement de 28 §3 ; 00 = annexe tokens. |
| `archive/25-EDITORIAL-REFONTE-CASE-STUDY-LEGAL` | `audit-refonte/editorial.md` | editorial.md le référence et le généralise ; fusionner puis archiver 25. |

---

## 3. METTRE À JOUR (corrections factuelles — détail dans `state/01 §f-ter`)
- `architecture/03-integrations.md` : `output:'server'` → `static` **(prioritaire)**.
- `architecture/01` + `05` : Pages CMS → **TinaCMS** (réf `architecture/36`).
- `architecture/10` : projet Vercel `waimia-v2` → `waimia-web`.
- `architecture/02-content-models.md` : `author` inline → `reference('authors')`.
- `strategy/05-stack-decision` : « static = à venir » → **fait** ; `apps/web/` → `src/`.
- `strategy/02-geo-aio` : aligner exemples de routes sur la whitelist `52` ; retirer la FAQ
  « agence Anthropic certifiée » (véridicité).
- `strategy/01`, `state/01 §c` : « cas fictifs gardés » → **supprimés** (`02 §2H`). *(Bannière
  posée sur 49.)*
- `architecture/07-images-pipeline` : nettoyer l'inventaire lot 1 (assets liés aux cas/solutions
  fictifs supprimés).
- `architecture/09-cms-autonome` : marquer « phase auteurs faite ; taxonomies/skills
  bâtis sur collections supprimées par `52` → à reconcevoir, ne pas exécuter tel quel ».
- `design-system/28` : corriger chemins morts `apps/web/docs/` → `docs/design-system/`.
- `design-system/06-motion` : vérifier pages citées (`/atlas`, `/console`) — supprimées par `52`.

---

## 4. DÉPLACER (mauvais dossier)
- `specs/01-ecosystem-partners.md` → c'est une **spec de feature** (logos/méga-menu/
  hub `/technologies`), pas une description du DS. Créer `docs/specs/` ou ranger en `architecture/`.
- *(Optionnel)* `design-system/brand-contract.md` → cohérent dans `design-system/` (contrat DS).

---

## 5. SOURCES DE VÉRITÉ après consolidation (à refléter dans `README.md`)
- **SEO/site** : `strategy/02` (état final) ; `strategy/01` = pourquoi ; `state/01` = état/chantiers.
- **DS règles** : `design-system/01-contrat`. **DS inventaire** : `DS-SECTION-CATALOG`
  (généré, 151 types). **DS R&D** : `45` (absorbe 46/47).
- **CMS** : `architecture/36-TINA-ASTRO`. **Standards** : `06` (fusionné avec 07).
- **Refonte (actionnable)** : les 5 `audit-refonte/*` + `audits/01` (migration) + `audits/23-tokens`.
- **Directives actives** : `directives/01` (typo, en cours), `43` (dark, close), `44` (awwwards, en cours).

---

## 6. Procédure
1. `git mv` les 32 archivés → `docs/archive/` (1 commit/lot par dossier).
2. Exécuter les fusions §2 (copier le contenu utile dans la cible, puis archiver la source).
3. Appliquer les MAJ §3 (corrections factuelles).
4. Déplacements §4.
5. **MAJ `README.md`** §3 (compteurs dossiers : `audits/` passe à 2, `cartography/` vidé) + §1
   (sources de vérité §5 ci-dessus).
6. `grep -rn "docs/<chemins déplacés>" docs CLAUDE.md tasks` → corriger les liens.
7. `astro check` + `build` verts. Supprimer ce manifeste.

> Bilan : ~62 docs top-level/clusterisés → ~25 docs **vivants** clairement répartis ;
> le reste en `archive/` (consultable, hors chemin par défaut). Aucun contenu perdu :
> actions résiduelles déjà dans `state/01 §f-bis/f-ter`.
