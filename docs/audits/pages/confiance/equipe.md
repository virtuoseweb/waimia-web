---
route: /equipe
verdict: AMÉLIORER
title_actuel: "L'équipe Waimia · auteurs et contributeurs"
kw_cible: "équipe Waimia (E-E-A-T, pas money)"
date: 2026-07-16
---

# /equipe · equipe/index.astro

## 1. Identité

- Fichier : `src/pages/equipe/index.astro` (156 lignes, composants catalogués HeroCentered/TeamCardGrid/CtaFinal, `:137-148`).
- Title : `L'équipe Waimia · auteurs et contributeurs` (`:138`). Description : « ...Studio solo à Montpellier. » (`:139`).
- kw cible : « équipe Waimia » (faible volume, rôle E-E-A-T). Indexée (`index, follow`), listée « restent indexées » `docs/strategy/14 §4`.
- Rôle : hub auteurs (byline E-E-A-T), point d'entrée vers `/equipe/simon-beros`.

## 2. Contenu

- **Tension E-E-A-T** : le hub s'appelle « équipe » mais ne contient **qu'UN auteur actif** (`src/content/authors/` = `simon-beros.mdx` seul, vérifié). Le H1 « Qui écrit. Qui câble. » + kicker dynamique `1 auteur` (`:116`) exposent l'unicité. C'est cohérent avec « studio solo » mais un « hub équipe » à 1 carte est structurellement mince (`docs/strategy/14 §5` vague 3 le note : « habillage E-E-A-T ternes (equipe si mono-auteur) »).
- Voix conforme : « Pas de ghostwriting. Pas d'agence anonyme. Chaque article est signé. » (`:120`).

## 3. SEO on-page

- H1 « Qui écrit. Qui câble. » (`:118`) : correct, pas de « système X ».
- Grille à 1 carte : peu de contenu indexable propre. Le maillage vers la fiche auteur est l'essentiel de sa valeur.

## 4. Maillage interne

- Entrant : ~28 références `/equipe` (le plus maillé du silo, via bylines d'articles). Fort.
- Sortant : `/equipe/simon-beros` (carte, `:94`), `/contact` + `/services` (CTA `:131-132`). Bon.

## 5. Balisage

- `BreadcrumbList` + `CollectionPage` JSON-LD (`:69-83`, `:140`). Correct pour un hub d'auteurs.

## 6. Conversion

- CTA final « Réserver un audit » → `/contact` + « Voir les offres » → `/services` (`:131-132`). Conforme.

## 7. Verdict + actions

**AMÉLIORER.** Le hub joue son rôle de byline E-E-A-T mais reste mince (mono-auteur). Deux options selon la trajectoire.

1. **Si l'équipe reste solo à court terme** : garder `/equipe` indexée comme point d'entrée auteur, mais enrichir la carte unique (expertise, publications réelles) pour qu'elle ne soit pas une simple vignette. Assumer le mono-auteur comme signal d'honnêteté.
2. **Alternative** (si jamais 2ᵉ contributeur improbable) : envisager une redirection 301 `/equipe` → `/equipe/simon-beros` et rapatrier les bylines vers la fiche. À NE PAS faire tant que la byline « /equipe » est massivement maillée (28 liens) sans re-routage.
3. Vérifier que le `CollectionPage` JSON-LD ne promet pas une pluralité d'auteurs trompeuse.
