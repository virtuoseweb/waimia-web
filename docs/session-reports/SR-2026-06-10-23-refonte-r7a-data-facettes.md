# SR-2026-06-10-23 · Refonte R7a : couche data du hub par besoin (référentiels, facettes, maillage)

> **Addendum GF-1 PROD (21:57)** : batch mergé et déployé (push 00c89c5, live 21:55). R7a est data-only : la preuve prod est l'absence de régression (pages live inchangées, vérifiées au computed sur 4 pages lors du GF-1 batch).

> Worker **Fable 5** (worktree `.worktrees/r7data`), branche **`feat/refonte-r7a-data-facettes`** commit `dd29a98` (25 fichiers, +941/-24). Contre-vérifié orchestrateur (rule 09) : gate relancé, diff dist relancé.

## 1. Résultat

La couche **données** de l'architecture 2 couches (solutions = besoin, offres = exécution) est posée, **strictement iso-rendu** (0 UI touchée, R7b fera l'UI) :

- **`src/data/pain-points.ts`** (20 entrées) et **`src/data/proof-points.ts`** (26 entrées) : référentiels typés, chaque solution/offre/cas y pointe par id.
- **`need: acquerir | piloter | operer`** posé sur **8/8 solutions** (la porte d'entrée du futur hub /solutions à 3 portes).
- **Facettes sur 4/4 cas** (secteur, besoin, offre mobilisée, taille) : le cas devient l'objet facetté voulu par docs/37.
- **Maillage `related*`** sur 21 fichiers de contenu (solutions ↔ offres ↔ cas), références croisées vérifiées.
- **Gate `scripts/check-content-refs.mjs`** : intégrité référentiels + need + facettes + maillage (id morts = FAIL). Test négatif vérifié (id volontairement cassé → FAIL, restauré → PASS).

## 2. Preuves GF-1 (iso-rendu)

- **`diff -rq dist-ref/client dist/client` = 0 fichier différent** (build complet avant/après, contre-vérifié indépendamment par l'orchestrateur, exit 0).
- Gates : `check-content-refs` PASS · `check-no-emdash` PASS · build `Complete!`.

## 3. Signalements du worker (réinjectés dans les vagues suivantes)

- `caseRef` douteux sur finance-compta (pointage cas à revalider) → **R7b**.
- Incohérences chiffres copy (« ×3,4 » vs « ×2,4 », « 8 articles/semaine » vs « /mois ») → **vague visuelle** (harmonisation copy).

## 4. Suite

R7b (UI hub par besoin : 3 portes /solutions, facettes /cas) consommera ces référentiels. Le gate est branché et tournera sur chaque vague suivante.
