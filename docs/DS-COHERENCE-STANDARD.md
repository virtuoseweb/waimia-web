# DS-COHERENCE-STANDARD — standard contraignant pour tout enrichissement catalogue

> Standard posé par Simon (2026-06-10). **À embarquer dans CHAQUE brief de worker** qui crée ou modifie un composant/section. Objectif : un design system FERMÉ et COHÉRENT où changer UNE valeur cascade partout, sans classe « pour rien » ni duplication.

## Le problème à éviter (récurrent)
Quand l'IA génère un nouveau composant/section, pour se simplifier le travail elle écrit des **nouvelles classes/ids CSS bespoke** avec des variables ou des **valeurs en dur** propres à la section, au lieu de réutiliser l'existant. Résultat : 1480 classes scoped, ~124 groupes de doublons (cf `DS-HEALTH-AUDIT.md`), un DS qui n'est plus pilotable par les tokens. INTERDIT désormais.

## Règles (ordre de préférence pour TOUTE valeur visuelle et toute mise en page)
1. **Token d'abord** : toute couleur / espacement / rayon / ombre / durée / taille typo = `var(--*)` existant de `src/styles/tokens.css`. **0 valeur en dur** (hex, px, rem) si un token existe. **0 nouveau token** (DS figé) sauf tâche dédiée Simon.
2. **Réutiliser un composant existant** plutôt que redupliquer son markup/CSS : `editorial/DropCap.astro`, `editorial/PullQuote.astro`, `editorial/KeyMetric.astro`, atomes/molécules `ui/*`, etc. (ex. exemplaire : `StatBlock` split-quote réutilise `PullQuote` au lieu de recopier le CSS de citation).
3. **Réutiliser une classe/utilitaire global existant** (`.wrap`, `.wrap-wide`, `.g12`, `.col-*`, `.eyebrow`, `.btn`, helpers de grille/flex) plutôt que créer une classe scoped équivalente. Grep avant de créer : si une classe fait déjà le job, l'utiliser.
4. **Tailwind pour la mise en page qui VARIE** (flex/grid/gap/alignement/responsive) : préférer des utilitaires Tailwind composables à une classe scoped sur-mesure quand le layout est standard. Le bespoke scoped reste OK uniquement pour une mise en page réellement spécifique au composant.
5. **Que le nécessaire** : 0 classe inutilisée, 0 doublon. Si deux sections ont le même pattern, il remonte en classe/utilitaire partagé ou en token, pas en 2 copies.

## Critère de parité
Viser le **pixel-perfect ou quasi** vs le legacy, MAIS en l'atteignant **par les bons tokens/classes/utilitaires réutilisés**, jamais par du CSS bespoke dupliqué. Parité visuelle ET cohérence DS, pas l'une au prix de l'autre.

## Vérification (gates, à passer avant tout commit)
- `node scripts/check-token-purity.mjs` (ou `npm run check:token-purity`) : 0 hex brut, 0 littéral, 0 espacement on-grid brut.
- `npx -y pnpm@9.15.0 exec astro check` : 0 errors.
- `node scripts/check-no-emdash.mjs` : 0 U+2014.
- Touchpoints synchronisés (`npm run check:touchpoints`) + manifests régénérés (`npm run gen:*`).
- Revue diff : pour chaque nouvelle classe scoped, justifier « pourquoi pas un token/classe/utilitaire existant ». Si pas de justification → refactor en réutilisation.

## Exemplaire conforme (référence)
Commit enrichissement `problem-statement` (dropcap) + `stat-block` (split-quote) : réutilise `DropCap` + `PullQuote` + classes metrics existantes + tokens, ratio `5fr/7fr` legacy, ~16 lignes de CSS de glue nécessaire seulement. C'est le niveau attendu.
