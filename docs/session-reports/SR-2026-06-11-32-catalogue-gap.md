# SR-2026-06-11-32 · Catalogue-gap : 7 types, 3 catégories (tables /console, manifesto, terminal)

> Worker Fable 5 (worktree catgap, branche `feat/catalogue-tables-manifesto` `fcd7b57`, mergée `91063a1`, push `3c7fd3d`). Contre-vérifié orchestrateur : scope exact, gates relancés, screenshots inspectés.
> **GF-1 PROD (01:49)** : `/preview/terminal-table` et `/preview/manifesto-act` 200 live.

Réponse au manque signalé par Simon (« on a pas nos composants de type tableau comme ceux dans /console ainsi que les sections de manifesto »). Catalogue 87 → **113 types / 18 catégories**.

- `table-sections` : `terminal-table` (wrappe TerminalTable, rôle typo par cellule), `editorial-write-feed` (EditorialWriteRow, tone paper/ink)
- `manifesto-sections` : `manifesto-statement` (ink/accent), `manifesto-act` (label sticky + statement + stats massives), `asymmetric-services`
- `terminal-sections` : `terminal-mockup` (lignes cmd/out/ok + curseur), `terminal-metrics-strip` (KPI mono)

Anti-orphelin : les sections wrappent les molecules existantes (source de vérité unique). Directive typo docs/41 appliquée au markup neuf ; violations des molecules sources inventoriées au rapport pour V-TYPO (`/tmp/wmission/catgap/REPORT.md`). Pages live console/manifesto intactes (re-câblage sur les nouvelles sections = tâche future). Preuves : touchpoints 113 alignés, astro check 0 errors, build Complete!, 7 screenshots `docs/visual-audit/catalogue-gap/` + computed opacity 1, library-manifest consumers `[]` (usage library).
