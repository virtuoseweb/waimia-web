# 41 · Directive typographie + contraste (Simon, 2026-06-11)

> Source : message Simon du 2026-06-11 (verbatim reformulé). S'applique à TOUT le site.

## Règles

1. **Instrument Serif (`var(--font-display)`) = emphase uniquement.** La masse des textes (titres compris) bascule vers Instrument Sans (`var(--font-sans)`) ou une police normale du DS. Le serif sert à RELEVER un mot ou un fragment dans un titre ou un paragraphe, éventuellement coloré avec la couleur accent (ou non).
2. **Parcimonie sur l'italique serif.** Pour faire ressortir/contraster un mot : préférer le **gras** (poids existants du DS : `var(--fw-medium)` ou plus) en police normale, selon le contexte. L'italique serif redevient un effet rare.
3. **Poids bold du DS autorisé** ponctuellement pour la lisibilité générale (pas de nouveau poids, pas de nouvelle police : tokens existants seulement).
4. **Contraste des blocs** : certains blocs doivent gagner en contraste via des fonds plus foncés/contrastés (tokens existants type encre/ink ou équivalents). Objectif lisibilité, qualité Awwwards.

## État des lieux (audit 2026-06-11)

- `src/styles/global.css` : h1/h2/h3 et plusieurs utilitaires sont en `var(--font-display)` (lignes 62-129 notamment) : c'est le cœur de la bascule.
- Usages inline `font-family:var(--font-display)` concentrés dans : console.astro (7), AtlasGrid (3), manifesto.astro (2), Stub (2), PersonaSwitcher (2), BookSession (2), CaseCardGrid (2), ManifestoAccent (1) + sections/templates via les classes globales.

## Application

- **Immédiat (2026-06-11)** : directive transmise aux workers en cours : recomposition home (sections recomposées, hors hero), catalogue-gap (markup neuf des nouvelles sections), ds-studio-nav (UI neuve). Chacun documente ce qui a basculé.
- **Vague transverse `V-TYPO` (après le batch en cours)** : passe systémique sur global.css (h1/h2/h3 → sans + mécanisme d'emphase serif type `<em class="u-serif-accent">` ou équivalent DS), puis sections/organisms/templates ; remplacement des italiques d'emphase par du gras au cas par cas ; passe contraste de fonds bloc par bloc. Preuves GF-1 : paired computed avant/après + screenshots par template.
- ⚠️ Le masthead /solutions reste sous veto Simon ; le hero home reste intouché.
