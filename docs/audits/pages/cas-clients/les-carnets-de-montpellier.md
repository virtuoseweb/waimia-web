---
route: /cas-clients/les-carnets-de-montpellier
verdict: VALIDER
title_actuel: "Les Carnets de Montpellier : de zéro présence en ligne à une communauté payante · Waimia"
kw_cible: "site abonnement / site média local monétisé (long tail) ; histoire Montpellier (proof)"
date: 2026-07-16
---

# /cas-clients/les-carnets-de-montpellier — VALIDER

Source : `src/content/cases/les-carnets-de-montpellier.mdx` · rendu legacy `CaseStudyTemplate`. `card.order: 1` (cas spotlight du hub).

## 1. Identité
- Title `:2` : « Les Carnets de Montpellier : de zéro présence en ligne à une communauté payante ». kw-first (récit outcome), fort.
- Description `:4` : WordPress éditorial, abonnements multi-niveaux, SEO local. `featured: true`.
- Rôle : cas vitrine (repris en `CaseSpotlight` sur le hub, `index.astro:141-165`).

## 2. Contenu / E-E-A-T
- **Véracité interne parfaite.** Les chiffres sont cohérents sur toutes les surfaces :
  - `shifts` (`:132-160`) : 0 → 40+ articles ; 0 → 150+ membres ; 0 → 35+ abonnés payants ; Non classé → Top 10 « histoire montpellier ».
  - `metrics` (`:161-173`) : 40+ / 150+ / 35+ / Top 10 — identiques.
  - `impact_fr:19` : « 40+ articles, 150+ membres, 35+ abonnés payants en 3 mois, Top 10 sur histoire montpellier » — aligné.
  - **Cross-surface** : le `CaseSpotlight` du hub (`index.astro:158-162`) réaffiche 40+ / 150+ / 35+ — cohérent avec la fiche.
- `pullQuote` (`:174`) attribué nominativement « Fabrice Bertrand, Les Carnets de Montpellier » — meilleur signal E-E-A-T du portefeuille (client nommé, consentement implicite).
- Voix anti-théâtre, prose serrée.

## 3. SEO on-page
- H1 = `title_fr` kw-first. Hn corrects. Pas de dup inter-cas.
- Kw « histoire montpellier » explicitement mis en avant (proof local + kw longue traîne).

## 4. Maillage interne
- Entrant : `/secteurs/liberal-independant.mdx:53` → `caseRef: "les-carnets-de-montpellier"` + `CaseSpotlight` hub. Bien irrigué.
- **Dette commune (non bloquante)** : pas de lien in-body vers `/services/wordpress` / service abonnement (mesh page-level cas non câblée).

## 5. Balisage
- `Article` + `BreadcrumbList` (miroir template). Canonical `.../les-carnets-de-montpellier`. Conforme.

## 6. Conversion
- CTA chrome cohérents. Pas de pricing.

## 7. Verdict + actions
**VALIDER** (avec balzeo, modèle de référence du silo).
1. Aucune correction de contenu requise.
2. (Optionnel, dette globale) ajouter le lien in-body vers le service utilisé quand la mesh page-level des cas sera câblée.
3. Le rattachement secteur `liberal-independant` est correct mais « média local / patrimoine » pourrait mieux vivre dans un secteur dédié média/éditeur si créé plus tard (non prioritaire).
