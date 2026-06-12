# 47 — Spec DS Studio Builder (Phase 2) — git-headless, Tina-compatible

> Directives Simon 2026-06-11 (3 messages convergents). Fonde la transformation du DS Studio
> en vrai builder (Figma/Webflow level), SANS créer de dette ni de format parallèle.
> Source amont : docs/45 (stratégie) + docs/46 (système de variation Phase B).

## 1. Contraintes d'infrastructure (non négociables)

1. **Save = git commit/push headless, 0 runtime serveur.** C'est déjà le pattern de `src/integrations/ds-save-dev.mjs` (middleware DEV-ONLY → écrit le fichier → `git add/commit/push` sur la branche courante, refus de `main`, garde mot-clé). La prod multi-tenant future = token GitHub headless (couche C'). Aucune fonction serverless sur `waimia.com` (`output: 'static'`).
2. **TinaCMS = optionnel / futur.** Le builder fonctionne **standalone**. Tina, s'il arrive, sera une **UI alternative sur les MÊMES champs** (frontmatter `sections:`), pas une dépendance dure. On ne bloque rien sur Tina.
3. **Aucun format parallèle (anti-dette).** Tout artefact produit par le builder = un format **déjà committé + déjà consommé** par le site. On n'invente pas de stockage propriétaire.
4. **UX-first.** L'interface du studio est le produit. Le code (harmonisation, refactor) est secondaire devant l'expérience de l'utilisateur du builder.

## 2. Les 3 artefacts (tous des formats git-committés existants)

| Artefact | Fichier cible (committé) | Route de save | État |
|---|---|---|---|
| **Tokens** (couleur/espacement/typo) | `src/styles/tokens.css` | `POST /api/ds/save` | ✅ existant |
| **Presets** (variante × déclinaison) | `src/data/ds-presets.json` + bloc `[data-theme]` dans `src/styles/themes.css` | `POST /api/ds/preset` (à créer, clone du garde save) | Phase B/C |
| **Composition / réorg de sections** | frontmatter `sections: [...]` (`sectionsArraySchema`) dans `src/content/<collection>/*.mdx` | `POST /api/ds/compose` (à créer) | la cible composable (`SectionsRenderer`) |

L'ancre : `content.config.ts` déclare `sections: sectionsArraySchema.optional()` sur offres/technologies/solutions/… ; `src/pages/**/[...slug].astro` rend `<SectionsRenderer sections={data.sections!} />`. **Composer/réordonner des sections = produire ce tableau `sections`.** C'est exactement ce qu'éditerait un field Tina → compatibilité par construction.

## 3. État live « session-scoped » (survit à la navigation, AVANT save)

Le principe Simon : « des répercussions réelles seulement si on sauvegarde, mais qui survivent pendant qu'on travaille sur la preview ».

- **Tokens** : overrides tenus en mémoire (`dirty` Map dans `ds-studio.js`), ré-appliqués à la preview à chaque navigation interne via le fix `astro:after-swap` (Brick 0, ci-dessous). Survivent à la nav, 0 commit.
- **Composition** : sections choisies/réordonnées tenues en mémoire + miroir `sessionStorage` (clé par route prévisualisée), ré-appliquées à la preview à chaque navigation. 0 commit avant save.

## 4. Comparaison visuelle avant / après (avant de sauvegarder)

`ds-studio.js` a DÉJÀ un mode baseline (`baselineHeld` dans `applyOverridesToPreview` : montre l'état committé). On le **généralise** en un **toggle A/B explicite** dans l'UI :
- **« Après »** (défaut) : preview avec l'état live (tokens dirty + composition dirty).
- **« Avant »** : preview avec l'état committé (baseline) — tokens d'origine ET composition d'origine.
- Bascule instantanée (pas de reload), pour juger le diff visuel avant de déclencher le save (mot-clé).

## 5. Bricks (incrémental, UX-first — chaque brick prouvé GF-1)

- **B0 — overrides tokens survivent la navigation** (FONDATION). Fix `astro:after-swap` dans `ds-studio.js` (l'event `load` de l'iframe ne se déclenche pas sur un swap View-Transition d'Astro `<ClientRouter />`). *En cours de finalisation (garde WeakSet).*
- **B1 — état composition survit la nav + A/B compare** généralisé (tokens + composition).
- **B2 — choisir / ajouter / réordonner une section** dans la preview live, depuis le catalogue (147 types) + presets. Drag/insert/remove, rendu live sans reload.
- **B3 — save composition** → écrit le frontmatter `sections: [...]` du MDX cible via `POST /api/ds/compose` (réutilise les 3 gardes : mot-clé, refus `main`, écriture stricte validée par `sectionsArraySchema`).
- **B4 — save preset** → `ds-presets.json` + `themes.css` via `POST /api/ds/preset`.
- **B5 (futur, optionnel) — Tina fields** sur les mêmes champs `sections:` (UI alternative, 0 refonte du modèle).

## 6. Garde-fous

- Réutilise les 3 gardes de `ds-save-dev.mjs` (keyword `DS_SAVE_KEYWORD`, refus `main`, écriture stricte) pour CHAQUE nouvelle route de save.
- 0 dépendance Tina dure ; 0 runtime serveur en prod (middleware dev-only ; multi-tenant futur = token GH headless).
- Valeurs DS only (tokens + classes utilitaires + presets) — cohérent avec docs/45.
- GF-1 sur chaque brick : preview live + `getComputedStyle` + preuve de persistance à la navigation.
