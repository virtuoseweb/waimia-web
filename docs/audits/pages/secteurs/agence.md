---
route: /secteurs/agence
verdict: AMÉLIORER
title_actuel: "Site web et IA pour les agences marketing et com : prouver votre valeur par l'exemple, industrialiser sans diluer la créa · Waimia"
kw_cible: "site web / IA pour agence marketing / communication"
date: 2026-07-16
---

# Audit · /secteurs/agence

## 1. Identité
- Contenu `src/content/secteurs/agence.mdx`. **noindex** (`:54-55`). Pas de `caseRef`.
- kw cible : « site web / IA pour agence marketing / com ». Intention commerciale. Aligné, mais attention : Waimia EST une agence IA, une page « agence » peut brouiller (concurrent ou client ?). L'angle « on outille les agences » est tenu, à garder net.
- Rôle : demande-capture + GEO.

## 2. Contenu
- Prose 235 mots, 4 pains agences distincts (prouver le ROI, pipeline en dents de scie, temps non facturable, se fondre dans la masse). Angle propre : « site vitrine-preuve » + industrialisation de la production de contenu sans toucher la créa. Substance réelle.
- **metricsHero = clone pur 6sense** : « 81 % » + « 70 % » (`:44-50`), **identiques mot pour mot** à conseil et services-b2b. Pour une page agence, aucun chiffre propre au métier (marge agence, temps non facturable, churn). C'est le symptôme le plus visible du find-replace sur cette page.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». **Title exceptionnellement long** (2 clauses après « : ») → forte troncature SERP, à raccourcir en priorité.
- 10 H2. Densité kw « agence / créa / contenu » correcte.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien agence ; devrait pousser `/services/seo-geo-contenu`, la page vend l'industrialisation de contenu), grille de cas cassée.

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison.

## 6. Conversion
- CTA « Cadrer ma production → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder, mais diversifier : c'est la page où le clonage est le plus flagrant).
1. **Remplacer les 2 metricsHero clonés (6sense 81 %/70 %)** par des chiffres propres aux agences (marge par livrable, part de temps non facturable, dépendance au bouche-à-oreille). Sans ça, le hero agence est indistinguable de conseil/services-b2b.
2. Raccourcir le `<title>` (le plus long du silo) : garder « Site web et IA pour agences marketing et com · Waimia ».
3. Sectoriser le `related-links` (`/services/seo-geo-contenu`, `/services/site-web-ia`).
4. Corriger la grille de cas (bug transverse) → état vide honnête.
5. Clarifier la posture Waimia-agence-vs-agence-cliente dans la prose pour ne pas semer le doute sur la cible.
