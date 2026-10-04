# Line-art DS Waimia : visuels SVG (Registre A)

Set de visuels line-art générés dans la grammaire « Registre A » du design system Waimia (cf `docs/state/11-asset-illustrations-manifest.md` §1.1 + §3). Destinés aux slots 3 / 5 / 6 du template service.

## Grammaire commune (tous les fichiers)

- Trait `stroke="currentColor"` + `fill="none"` sur les tracés : la couleur vient du contexte (encre sur fond paper, crème sur fond ink) et **s'inverse gratuitement** sur les sections sombres.
- **1 seul accent terracotta** par visuel via `var(--accent, #C94F2E)` (token DS, jamais de couleur en dur sur le trait) : le point focal de la grammaire.
- `aria-hidden="true"` (décoratifs), `viewBox` cohérent, `stroke-width` régulier (~2), tracés `<path>`/`<line>`/`<circle>` propres : compatibles draw-on-scroll (`stroke-dashoffset`).
- Pour piloter la couleur depuis la page : poser `color` (trait) et `--accent` (focal) sur un parent. Sur `[data-bg='ink']`, le trait suit la couleur de texte du contexte.

## Fichiers

| fichier | sujet | slot cible | format |
|---|---|---|---|
| `dispositif-flow.svg` | Schéma « comment on travaille » : avant (outils dispersés) → pendant (orchestration, nœud terracotta) → après (résultat mesurable, courbe montante) | slot 5 (large) | 480×320 |
| `probleme-outils-cloisonnes.svg` | Outils cloisonnés / désynchronisés (silos non reliés, lien rompu) | slot 3 | 64×64 |
| `probleme-poc-qui-dort.svg` | Le POC qui dort (prototype en sommeil, jamais en prod) | slot 3 | 64×64 |
| `probleme-donnees-eparpillees.svg` | Données éparpillées (fragments dispersés, donnée perdue) | slot 3 | 64×64 |
| `probleme-pont-manuel.svg` | L'humain qui fait le pont à la main entre deux systèmes (tâche répétitive) | slot 3 | 64×64 |
| `livrable-agents-production.svg` | Agents en production (agent actif, statut live) | slot 6 | 64×64 |
| `livrable-connecteurs-mcp.svg` | Serveurs MCP / connecteurs (hub central relié aux services) | slot 6 | 64×64 |
| `livrable-skills-orchestration.svg` | Skills / orchestration (modules assemblés, skill pivot) | slot 6 | 64×64 |
| `livrable-gouvernance.svg` | Cadre de gouvernance (bouclier + validation) | slot 6 | 64×64 |
| `livrable-tableau-mesure.svg` | Tableau de mesure (dashboard KPI + courbe de tendance) | slot 6 | 64×64 |
| `livrable-passation-formation.svg` | Passation / formation (transmission de savoir entre personnes) | slot 6 | 64×64 |

## Vérification (GF-1 visuel)

Rendus dans un chromium headless sur fond paper (`#F6F1E8`) ET fond ink (`#0C0B09`), `getComputedStyle` confirmé :
- paper : trait `rgb(12,11,9)` (encre) sur fond crème ; ink : trait `rgb(246,241,232)` (crème) sur fond sombre → inversion `currentColor` opérationnelle.
- accent : fill `rgb(201,79,46)` = `#C94F2E`, identique et lisible sur les deux fonds.
