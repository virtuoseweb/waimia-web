# SR-2026-06-10-14 · TinaCMS No-React : pilote collection `offres` (task #20, Wave 3.1)

> Mission Codex `gpt-5.5` effort xhigh (`/tmp/codex-missions/tina-pilote/`), worktree `.worktrees/tina`, branche **`feat/tina-no-react-pilote`** commits `46fc43a` + `66551b5`.

**Addendum (même nuit) : preview Vercel ERROR → corrigé → GF-1 preview PASS → mergeable.** Le 1er deploy de la branche a échoué : le worker avait remplacé le script `build` par `tinacms build && astro build` (la mission prévoyait de le garder intact sans TinaCloud), et `astro build` seul échouait aussi (reproduit localement : `src/lib/tina-islands.ts` importe `tina/__generated__/client`, gitignoré). Fix `66551b5` (pattern tina-cloud-starter) : `build` restauré = `astro build`, `build:tina` séparé pour l'édition, `tina/__generated__` committé (300K, `.cache` exclu). Preuve preview Vercel (deploy `dpl_6Mp2…` READY, fetch avec bypass) : **HTTP 200 + SHA-256 `095048fb…` byte-identique à la prod waimia.com**, 0 marqueur react/tina. La condition de merge du repo (GF-1 preview Vercel) est remplie.

## 1. Résultat

L'édition visuelle TinaCMS fonctionne sur les 8 offres composables **sans expédier un octet de React au visiteur** :

- Admin local (`/admin`) : collection `Offres` listée (8 entrées), ouverture d'une offre dans l'iframe d'édition visuelle, modification d'un champ reflétée en **soft-refresh avant save** (preuve : valeur test affichée dans l'iframe, MDX sur disque intact, SHA-256 identique avant/après).
- Visiteur : `/offres/activation-ia` **byte-identique** : SHA-256 `095048fb…` égal entre baseline, build final ET le dist du main tree (contre-vérification orchestrateur indépendante, plus forte que le comparatif interne du worker). 0 marqueur react/tina dans le HTML.

## 2. Choix d'architecture (options écartées incluses)

| Décision | Choix | Alternative écartée |
|---|---|---|
| Chargement TinaIsland | **Import dynamique en DEV uniquement** (`import.meta.env.DEV`) : en build prod, la branche visiteur reste le `SectionsRenderer` direct | Bootstrap statique officiel de `TinaIsland` : casse l'identité byte-à-byte (script inline injecté même en prod) |
| Périmètre collection | 8 offres, `conseil.mdx` **exclu** (`match.exclude`) | L'inclure : aurait exigé de mirrorer ses types de sections supplémentaires, hors pilote |
| Champs templates Tina | **Optionnels** (les Zod de `sections.ts` restent la validation stricte runtime) | Champs requis : conflits de nullabilité GraphQL entre unions polymorphes |
| Script build | `build` = `tinacms build --local --skip-cloud-checks && astro build` | `--skip-cloud-checks` seul : échoue sans clientId/token TinaCloud |
| Route serveur | **1 seule** : `/tina-island/[name]` (`prerender=false`) ; tout le reste reste statique | output:server global : interdit (contrat SSG du repo) |

Versions épinglées : tinacms 3.9.1 · @tinacms/cli 2.4.4 · @tinacms/astro 0.5.0 · @tinacms/bridge 0.3.0 · react 18.3.1 en devDependencies (admin SPA uniquement).

## 3. Preuves

- Gates : `astro check` 0 errors (2555 hints préexistants) · `build` Complete! · `check-no-emdash` PASS.
- GF-1 A (visiteur) : SHA-256 identiques (149 282 octets), 7 sections, h1 opacity 1 / transform neutre, 0 erreur console. Screenshots `/tmp/wmission/tina/baseline|after-activation-ia-1440x900.png`.
- GF-1 B (édition) : screenshots `/tmp/wmission/tina/admin-*.png` (admin local mode, form complet de l'offre, iframe rendant la page, champ test avant save).
- `tina/tina-lock.json` **committé** (161 Ko, rule 29) ; `tina/__generated__/` + `public/admin/` gitignorés.

## 4. Limites et étape suivante

- **Pas de credentials TinaCloud** → édition locale uniquement. L'édition sur preview/prod est l'étape suivante, avec les credentials de Simon ; elle devra conserver la contrainte HTML visiteur inchangé.
- `conseil.mdx` rejoindra la collection quand ses types de sections seront mirrorés (mécanique identique).
- Généralisation aux autres collections (solutions, ressources…) = répliquer le pattern : 1 collection + templates miroirs + 1 entrée registry d'îles.
