---
route: /equipe/simon-beros
verdict: AMÉLIORER
title_actuel: "Simon Beros · Fondateur · architecte systèmes IA pour PME"
kw_cible: "Simon Beros (entité personne, pilier E-E-A-T)"
date: 2026-07-16
---

# /equipe/simon-beros · equipe/[...slug].astro + content/authors/simon-beros.mdx

## 1. Identité

- Source : `src/content/authors/simon-beros.mdx` (98 lignes) rendu par `src/pages/equipe/[...slug].astro` → `AuthorPageTemplate`.
- Title servi : `Simon Beros · Fondateur · architecte systèmes IA pour PME`. Indexée (`index, follow` vérifié).
- kw cible : nom propre / entité Personne. **Pilier E-E-A-T n°1 du site** (`docs/strategy/14 §4` : « /equipe/simon-beros (pilier E-E-A-T) »).
- Rôle : autorité de l'auteur qui signe tout le contenu ; ancre le graphe entité (sameAs).

## 2. Contenu

- Bio dense et véridique, voix conforme (`mdx:10-31` : « livre du code le mardi, mesure le pipeline le vendredi »). Expertise (5 items `:33-38`), expérience (`:40-54`), byline « Pourquoi Waimia » (`:89-98`). Bon socle E-E-A-T.
- **DÉFAUT MAJEUR E-E-A-T : 3 des 4 « publications » pointent vers des URLs 404** (vérifié : routes ABSENTES) :
  - `waimia.com/ressources/memo-architecture-ia-pme` (`mdx:63`) → ABSENT
  - `waimia.com/ressources/lettre-ouverte-poc-ia` (`mdx:68`) → ABSENT
  - `waimia.com/ressources/glossaire-ia-business-2026` (`mdx:73`) → ABSENT
  - Seule `/manifesto` (`mdx:58`) existe. Des publications listées mais mortes = signal E-E-A-T négatif (autorité fabriquée, liens brisés crawlés).

## 3. SEO on-page

- Cohérence bio inter-pages OK : « studio solo Montpellier » aligné avec /agence, /agence/about, expertise-claude.
- **Schema `Person.description` tronquée** : le HTML servi montre `"description":"Simon dirige Waimia, son studio solo basé à Montpellier. Son obsession :"` (coupée en plein milieu de phrase, `buildPersonFromAuthor` prend la 1ʳᵉ ligne du bloc `bio_fr`). Description structurée incomplète.

## 4. Maillage interne

- Entrant : ~11 références `/equipe/simon-beros` (bylines articles + /equipe). Bon.
- Sortant : liens sociaux (LinkedIn, X, GitHub) + publications (dont 3 mortes). Réparer les liens sortants.

## 5. Balisage

- **`ProfilePage` + `Person` + `sameAs` présents et solides** (HTML servi) : `sameAs` = LinkedIn `in/simonberos`, `x.com/simonberos`, `github.com/virtuoseweb`, `waimia.com`. C'est exactement le signal E-E-A-T attendu. Point fort.
- `worksFor` → Organization Waimia. Correct.

## 6. Conversion

- Page auteur : conversion secondaire (CTA du template vers contact). Acceptable.

## 7. Verdict + actions

**AMÉLIORER.** Pilier E-E-A-T avec un excellent balisage `Person`/`sameAs`, plombé par des publications fantômes.

1. **Réparer les 3 publications mortes** (`mdx:62-76`) : soit créer réellement ces contenus (`/ressources/memo-architecture-ia-pme`, `lettre-ouverte-poc-ia`, `glossaire-ia-business-2026`), soit **retirer les entrées** et ne garder que des publications qui existent (`/manifesto`, articles réels du blog signés Simon). Ne jamais laisser une bibliographie E-E-A-T pointer vers des 404.
2. **Corriger la `description` du schema `Person`** : `buildPersonFromAuthor` doit produire une phrase complète (bio condensée), pas la 1ʳᵉ ligne tronquée « ...Son obsession : ».
3. Vérifier que les articles réels signés Simon (blog) apparaissent bien dans l'auto-jointure de `AuthorPageTemplate` pour densifier la preuve d'autorité.
