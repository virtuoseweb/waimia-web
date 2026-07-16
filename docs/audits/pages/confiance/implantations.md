---
route: /implantations
verdict: VALIDER
title_actuel: "Implantations · Waimia"
kw_cible: "aucun (hub mince, noindex)"
date: 2026-07-16
---

# /implantations · implantations/index.astro

## 1. Identité

- Fichier : `src/pages/implantations/index.astro` (121 lignes, 100 % composable, `:58-102`).
- Title : `Implantations · Waimia` (`:106`). Page **noindex** (`:110`, vérifié HTML servi `noindex, follow`).
- kw cible : aucun (hub). Politique index-on-quality : hub mince → noindex (`:6`, cohérent `strategy/10 §3`).
- Rôle : point d'entrée nav vers les pages locales (`/implantations/montpellier`, `/implantations/bordeaux`).

## 2. Contenu

- Hero + cartes générées depuis la collection `implantations` (`:21-35`). Contenu propre minimal : c'est un hub d'aiguillage, pas une page de fond. Le noindex est le bon choix (2 enfants dont 1 noindex → hub trop mince pour ranker).
- Chunker anti-singleton propre (`:38-56`).

## 3. SEO on-page

- H1 « Nos implantations. » (`:66`). noindex correct : évite un hub concurrent des pages villes.

## 4. Maillage interne

- Entrant : le hub sert surtout de nœud nav. Sortant : cartes → `/implantations/<slug>` + CTA `/contact` + `/audit-ia-pme` (`:79-90`).
- Utile pour distribuer l'autorité vers Montpellier (la page locale indexée).

## 5. Balisage

- Aucun schema spécifique (hub noindex). Acceptable.

## 6. Conversion

- CTA final ink « Réserver un diagnostic (45 min) » → `/contact` (`:79-84`). Conforme.

## 7. Verdict + actions

**VALIDER.** Hub d'aiguillage correctement noindex (mince par nature), génération data-driven propre. Rôle nav rempli.

1. Aucune action bloquante. À réévaluer (passer index) uniquement si le nombre de pages villes réelles augmente ET qu'elles ont un NAP/contenu propres (index-on-quality).
2. S'assurer que le hub pointe bien vers Montpellier (indexée) pour lui transmettre du maillage interne.
