---
route: /secteurs/conseil
verdict: AMÉLIORER
title_actuel: "Site web et IA pour les cabinets de conseil : rendre l'expertise lisible avant le premier appel · Waimia"
kw_cible: "site web / IA pour cabinet de conseil (consultant)"
date: 2026-07-16
---

# Audit · /secteurs/conseil

## 1. Identité
- Contenu `src/content/secteurs/conseil.mdx`. **noindex** (`:333-334`). Pas de `caseRef`.
- kw cible : « site web / IA pour cabinet de conseil ». Intention commerciale. Aligné.
- Rôle : demande-capture + GEO. **Mais forte zone de cannibalisation** (cf §2).

## 2. Contenu
- Prose 227 mots, 4 pains conseil corrects (tout le monde dit pareil, expertise intangible, pipeline sur réseau associés, demandes mal calibrées). Angle : méthode lisible + cas anonymisés + capitalisation de connaissance.
- **Cannibalisation triple :** conseil recoupe fortement (a) `/secteurs/services-b2b` (même spine « 81 % 6sense, prouver avant le 1er contact, qualifier les leads, pipeline sur 2-3 personnes »), (b) `/secteurs/liberal-independant` dont l'ICP inclut « conseil » (`liberal-independant.mdx:777`), (c) partiellement esn/agence (tous « prouver l'expertise B2B »). L'angle distinctif de conseil (cas anonymisés / confidentialité) est réel mais mince.
- **metricsHero = clone pur 6sense** « 81 % » + « 70 % » (`:324-329`), identiques à agence et services-b2b. Aucun chiffre propre au conseil.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.

## 4. Maillage
- **Défauts partagés** : mesh identique 12×, grille de cas cassée. À noter : le mesh cas-usage/article `internal-mesh.ts:378,506,534` pointe déjà `SECTEURS['conseil']` comme secteur « par défaut » depuis d'autres silos → conseil reçoit du jus entrant, ce qui renforce son statut de page-pivot (argument pour la garder plutôt que la fusionner).

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison.

## 6. Conversion
- CTA « Cadrer mon acquisition → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder, mais c'est le nœud de cannibalisation à trancher avec services-b2b et liberal-independant).
1. **Verrouiller l'angle propre** : conseil = **cabinet** (pluri-associés, confidentialité, cas anonymisés) ≠ liberal-independant (solo) ≠ services-b2b (umbrella générique). Retirer « consultants indépendants » de l'ICP (`:287-288`) et le laisser à liberal-independant, pour supprimer le recouvrement.
2. **Remplacer les metricsHero clonés (6sense 81 %/70 %)** par des chiffres propres (taux de transformation exploratoire→mission, part pipeline dépendante du réseau).
3. Trancher la frontière conseil ↔ services-b2b : si services-b2b est fusionné (cf son rapport), conseil devient le vertical « cabinet de conseil » clair. Sinon, différencier durement les deux hero + prose.
4. Sectoriser le `related-links`, corriger la grille de cas, raccourcir le `<title>`.
