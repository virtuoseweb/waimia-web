# SR-2026-06-11-37 · V-TYPO transverse : serif réservé à l'emphase (docs/41)

> Mandat Simon (docs/44 §4, verbatim) : « encore beaucoup de h3 en instrument serif trop de mots (des phrases entières alors qu'on veut maximum quelques mots en instrument serif pour relever) ». Worker Opus (worktree typoserif, branche `feat/typo-serif-emphasis` `4a7c97a`, mergée `78250a0`). Contre-vérifié orchestrateur : 0 fichier interdit (sections.ts, mega-menu, content, Hero home, masthead /solutions intacts).

## Livré (106 fichiers, +525/-387)

- 122 règles de titres de section serif → `var(--font-sans)` medium (77 fichiers composants) ; 120 règles d'accent `<i>`/`<em>` dotées d'un `font-family: var(--font-display)` explicite (sinon l'accent devenait sans-italique après bascule du parent).
- `global.css` : `.sec-hd h2` (levier SectionHeader), cellules éditoriales, nav mega + tiroir mobile.
- Gardent le display : héros h1, métriques massives (96px, proof-bar, ROI, prix), citations, wordmarks, drop-cap, fragments d'emphase.

## Preuves

- Paired computed 8 pages : titres serif 14-21 par page → 1 (le h1 hero exempté) ; accents `<i>` 100 % Instrument Serif. Screenshots avant/après `docs/visual-audit/typo-serif/`.
- Gates : astro check 0 errors, build Complete!, no-emdash + token-purity + touchpoints PASS.
- Post-merge orchestrateur : sonde computed finance-compta h2 = Inter Tight opacity 1, accent Instrument Serif.
