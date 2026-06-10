# SR-2026-06-10-16 · Refonte R0 : quick wins dette (vague R0 de docs/37)

> Worker Task subagent Opus (worktree `.worktrees/r0`), branche **`feat/refonte-r0-quickwins`** commit `6f03d3a`. Contre-vérifié orchestrateur (rule 09) : gates relancés 4/4 PASS, 0 import mort résiduel, équivalence DropCap prouvée par substitution inverse.

## 1. Résultat

Purge de la dette identifiée par les 5 audits (docs/audit-refonte/), **-1 214 LoC nettes**, zéro changement de rendu :

- **5 collections mortes supprimées** de `src/content/config.ts` + leurs dossiers `src/content/*` (déclarées mais 0 consumer vivant, vérifié par grep croisé avant suppression).
- **2 templates morts supprimés** : `ServiceDetailTemplate.astro` + `HubTemplate.astro` (déjà migrés vers SectionsRenderer, 0 import vivant re-vérifié indépendamment).
- **`/test-composable` supprimé** (page de test oubliée en prod) + entrée `FR_ONLY_STATIC` correspondante dans `i18n.ts` (1 ligne hors-liste, justifiée et acceptée).
- **Archives école purgées** (contenus orphelins sans route).
- **DropCap aligné sur le token** : la valeur hardcodée locale rejoint la variable DS. Rendu prouvé inchangé : home byte-identique ; delta conseil/revops = uniquement le bloc CSS DropCap, équivalence prouvée par substitution inverse (réinjection de l'ancienne valeur → bytes identiques).
- `design-system.lock.json` : l'écart `tokenCount 106 ≠ 110` signalé par l'audit était déjà résorbé (régénération idempotente, 0 diff).

## 2. Preuves

- Gates (relancés par l'orchestrateur, pas seulement par le worker) : `astro check` 0 errors · `build` Complete! · `check-no-emdash` PASS · `check-touchpoints` PASS.
- GF-1 structurel : home `index.html` byte-identique avant/après ; pages touchées par DropCap = delta limité au bloc CSS attendu.
- Scope : aucun fichier hors liste sauf la ligne `i18n.ts` documentée ci-dessus.

## 3. Arbitrages

| Décision | Justification |
|---|---|
| Supprimer plutôt qu'archiver les collections mortes | git = archive ; les garder « au cas où » = dette (doctrine zéro dette) |
| Entrée morte `/test-composable` retirée de `FR_ONLY_STATIC` | hors liste du brief mais cohérente (le worker l'a signalée, l'orchestrateur a accepté) |
