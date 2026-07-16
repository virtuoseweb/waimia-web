---
route: /cas-clients/desangles-peinture
verdict: AMÉLIORER
title_actuel: "Desangles Peinture : de la page 6 à la page 1 de Google en référencement local · Waimia"
kw_cible: "référencement local artisan / SEO local peintre (long tail villes)"
date: 2026-07-16
---

# /cas-clients/desangles-peinture — AMÉLIORER

Source : `src/content/cases/desangles-peinture.mdx` · rendu legacy `CaseStudyTemplate`.

## 1. Identité
- Title `:2` : « Desangles Peinture : de la page 6 à la page 1 de Google en référencement local ». kw-first (référencement local), fort.
- Description `:4` alignée. `card.order: 4`, `featured: true`.
- Rôle : **meilleur cas SEO local** du portefeuille (`docs/strategy/14:101`). Preuve secteur artisanat/bâtiment.

## 2. Contenu / E-E-A-T
- Angle local fort, prose crédible. `pullQuote` (`:165`) artisan réaliste.
- `showcase` (`:26-45`) présent avec **preuve de local pack** : capture `local-pack.webp` (« peintre Eauze : 5,0 étoiles sur 12 avis, dans le pack local Google »). Deux screens réels existent sur disque. Excellent signal E-E-A-T local. Note : pas de champ `url` (donc pas de bouton « visiter le site », d'où 0 `sshow__visit` en HTML — normal, ce n'est pas un défaut).
- **Faiblesse : deltas de résultats non renseignés, hedges visibles en prod.** Le tableau `shifts` (`:123-151`) contient des valeurs placeholder shippées à l'écran :
  - `:135` « Visibilité locale acquise · à préciser »
  - `:142` « Maillage local · chiffre à préciser »
  - `:149` « Estimation · à mesurer dans la durée »
  - `metrics:162` « Demandes en hausse (estimation) »
  Afficher « à préciser » / « chiffre à préciser » sur une fiche cas publiée affaiblit la crédibilité et contredit la règle « pas de résultat annoncé avant d'être mesuré ». La ligne solide (Page 6 → Page 1) est bonne ; les 3 autres sont des ébauches.

## 3. SEO on-page
- H1 = `title_fr` kw-first. Hn corrects. Pas de dup inter-cas.

## 4. Maillage interne
- **Manque** : pas de lien in-body vers `/services/seo-local` ni vers `/secteurs/batiment` (dette mesh page-level commune, `[...slug].astro:135`). Pour LE cas SEO local, ce pont vers le service `seo-local` est le plus utile de tout le portefeuille.
- Entrants : nav + éventuel secteur. Vérifier qu'un secteur artisan/bâtiment le référence (pas de `caseRef` desangles trouvé dans secteurs — seuls e-commerce/liberal/startup-logiciel ont un caseRef).

## 5. Balisage
- `Article` + `BreadcrumbList` (miroir template). Canonical `.../desangles-peinture`. Conforme.

## 6. Conversion
- CTA chrome cohérents. Pas de pricing.

## 7. Verdict + actions
**AMÉLIORER.**
1. **Retirer ou renseigner les deltas hedgés** du tableau `shifts` (`desangles-peinture.mdx:135`, `:142`, `:149`) et de `metrics:162`. Option A : chiffrer réellement (nb de mots-clés page 1, nb de villes, nb de demandes). Option B : supprimer les 3 lignes non mesurées et ne garder que « Page 6 → Page 1 » + la preuve local-pack (screenshot). Ne pas laisser « à préciser » en prod.
2. Câbler un `caseRef: "desangles-peinture"` sur la page secteur artisanat/bâtiment (ex. `/secteurs/batiment`) pour l'entrant, et le lien in-body vers `/services/seo-local` (via mesh page-level cas).
3. Conserver la capture local-pack : c'est le meilleur asset E-E-A-T local du site.
