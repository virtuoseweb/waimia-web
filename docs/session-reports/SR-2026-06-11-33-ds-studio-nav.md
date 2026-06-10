# SR-2026-06-11-33 · DS Studio : découvrabilité catalogue, nav locale, aperçu live-token

> Worker Fable 5 (worktree dsnav, branche `feat/ds-studio-discoverability` `db6e44b`, mergée `988fe6f`, push `3c7fd3d`). Contre-vérifié orchestrateur.
> **GF-1 PROD (01:50)** : `id="catalogue"` présent sur /agence/ds-studio live, et le browser liste les nouveaux types (sonde `preview/terminal-table`).

Réponse au « c'est pas clair où on voit le catalogue » de Simon. Avant : studio → catalogue = un lien texte + échantillon de 14 sections. Livré :

1. **`DsLocalNav.astro`** : barre locale commune (DS Studio · Catalogue · Catégories) sur les 4 pages outillées, navigation bidirectionnelle en 1 clic (prouvée par clics Playwright dans les 2 sens).
2. **Volet Catalogue dans le studio** (`#catalogue`) : browser data-driven du registry (catégories avec comptes + tous les types), liens preview/fiche, **aperçu live du type sélectionné qui hérite des tokens édités** (extension `applyOverridesToPreview()` de ds-studio.js ; preuve : `setToken('--accent', '#1133ff')` → computed `#1133ff` dans l'iframe, reset → `#c94f2e`).
3. Rôle en 1 ligne par page (studio = personnaliser ; design-system = catalogue ; components = fiche). `/preview/[type]` volontairement intact (fragment iframe).

Preuves : 16/16 assertions Playwright (chromium isolé, port dédié 4333), gates verts, 8 screenshots `docs/visual-audit/ds-studio-nav/`. Incident outillage capitalisé : l'instance Playwright MCP est PARTAGÉE entre workers parallèles (page re-naviguée par un autre worker en plein test) ; preuves refaites sur chromium isolé. Consigne pour les briefs futurs : workers parallèles = chromium isolé, pas le MCP partagé.
