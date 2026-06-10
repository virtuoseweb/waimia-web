# SR-2026-06-10-11 · DS Studio v2 : UX humain (undo/diff/contraste/viewport/presets/preview)

> Task #16 du backlog. Mission Codex `gpt-5.5` effort high (`/tmp/codex-missions/ds-studio-v2/`), worktree isolé, contre-vérification orchestrateur indépendante, **merge local `d3b8970`** (push avec le batch #2 de la nuit).

## 1. Livré

`/agence/ds-studio` passe d'un éditeur de tokens brut à un studio utilisable par un humain :

- **Undo/redo** (pile d'historique sur chaque mutation de token, raccourcis clavier).
- **Diff modal** : vue claire des tokens modifiés vs valeurs d'origine avant export/save.
- **Contraste WCAG** : panneau de vérification AA/AAA (nouveau `src/scripts/ds-studio-contrast.js`, 89 LoC).
- **Sélecteur viewport** (desktop/tablette/mobile) sur la preview.
- **Preview iframe** d'une vraie page du site réagissant aux tokens en live.
- **Presets** de thèmes enregistrables/rappelables.

Fichiers : `src/pages/agence/ds-studio.astro` (877→998 LoC), `src/scripts/ds-studio.js` (551→823), `src/scripts/ds-studio-contrast.js` (créé).

## 2. Contrainte tenue : contrat agent inchangé

La surface programmatique `window.dsStudio` (couche AGENT du master plan, axe C) est **préservée à l'identique** : `setToken/getToken/listModified/reset/export/save` + ajouts rétro-compatibles `undo/redo/presets`. Un agent qui scriptait le studio v1 continue de fonctionner sans modification.

## 3. Options et choix

- (a) SPA React dédiée pour le studio : rejeté (le DS est figé, 0 React superflu, cohérence Astro+vanilla du repo).
- (b) **Enrichir la page Astro existante + scripts vanilla** ← choisi : 0 dépendance nouvelle, contrat `window.dsStudio` conservé, poids minimal.
- Contraste : calcul WCAG implémenté en local (pas de lib externe) car le besoin est borné (ratio + seuils AA/AAA).

## 4. Preuves

- Gates worktree : `astro check` 0 errors · `build` Complete! · `check-no-emdash` PASS.
- GF-1 vérifié 2 fois (Codex puis orchestrateur, serve-dist local parité prod) : page charge, panneaux visibles, undo/redo fonctionnel, diff modal s'ouvre, preview iframe réagit à une mutation de token, 0 erreur console.
- Merge local `d3b8970` ; **GF-1 prod** refait après le push batch #2 (discipline Vercel Hobby : un seul push groupé).
