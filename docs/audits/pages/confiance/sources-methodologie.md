---
route: /sources-methodologie
verdict: VALIDER
title_actuel: "Sources et méthodologie · Waimia"
kw_cible: "aucun ciblé (référentiel E-E-A-T / transparence)"
date: 2026-07-16
---

# /sources-methodologie · sources-methodologie.astro

## 1. Identité

- Fichier : `src/pages/sources-methodologie.astro` (178 lignes, `TrustLegalTemplate` + composants `Bi`/`Callout`, `:25-177`).
- Title : `Sources et méthodologie · Waimia` (`:26`). Indexée (`index, follow`), listée « restent indexées » `docs/strategy/14 §4`.
- kw cible : aucun ciblé (référentiel de transparence). Intention : preuve d'honnêteté sur les chiffres.
- Rôle : **socle E-E-A-T central** : définit les 2 familles de preuve (first-party vs sources tierces) et recense toutes les données marché citées sur le site.

## 2. Contenu

- Excellent : distinction claire cas client / analyse marché (`:47-70`), sources nommées et datées (Afnic 2025, Semrush 2025, Baymard, McKinsey, Adobe, 6sense 2024, CNB, Reuters, Warmly, Clickzou, `:79-139`), engagement honnêteté en 4 principes (`:147-170`). Voix conforme, zéro tiret cadratin.
- Source de vérité déclarée : `docs/strategy/03 §5/§6` (`:12-13`). Cohérent.

## 3. SEO on-page

- H1 « Sources et méthodologie. » (`:36-38`). Hiérarchie H2/H3 propre par famille et par secteur.
- Contenu unique, non dupliqué ailleurs. `revisedAt="2026-06-15"` + `version="v1.0"` (`:30-31`) : bon signal de fraîcheur/maintenance.

## 4. Maillage interne

- Entrant : ~5 références. **Point fort du design** : liée depuis les templates live via les chips de provenance (`CaseStudyTemplate`, `SecteurHubTemplate`, cf commentaire `:9-13`) : chaque chiffre du site pointe vers sa méthodologie.
- **Vérification recommandée** : les surfaces qui affichent les stats (home ProofBar avec Afnic 61 %, pages secteurs avec 6sense/McKinsey) doivent bien lier cette page. Le maillage « chiffre cité → sa source » est le levier E-E-A-T ; s'assurer qu'aucune stat n'est orpheline de sa provenance.
- Sortant : `/contact` (`:174`).

## 5. Balisage

- Rendue via `TrustLegalTemplate` (masthead + TOC + sections). Pas de JSON-LD spécifique nécessaire (page de transparence). Acceptable.

## 6. Conversion

- CTA doux « Écrivez-nous » → `/contact` (`:171-174`). Adapté au registre (pas de vente).

## 7. Verdict + actions

**VALIDER.** Pièce E-E-A-T exemplaire : provenance tracée, sources datées, engagement honnêteté. Modèle de transparence GEO/AIO.

1. **Vérifier le maillage entrant depuis chaque surface qui cite une stat** (home ProofBar Afnic, pages secteurs 6sense/McKinsey/etc.) : chaque chiffre doit lier `/sources-methodologie`. Compléter les chips manquants.
2. Optionnel : garder la date de révision à jour à chaque ajout de source (déjà le cas, maintenir le rituel).
3. Aucune correction bloquante.
