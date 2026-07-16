---
route: /secteurs/esn
verdict: AMÉLIORER
title_actuel: "Site web et IA pour les ESN : attirer les talents et prouver l'expertise avant le premier appel · Waimia"
kw_cible: "site web ESN / société de services numériques (marque employeur)"
date: 2026-07-16
---

# Audit · /secteurs/esn

## 1. Identité
- Contenu `src/content/secteurs/esn.mdx`. **noindex** (`:530-531`). Pas de `caseRef`.
- kw cible : « site web ESN / marque employeur IT ». Intention double (recrutement + commercial). Aligné.
- Rôle : demande-capture + GEO.

## 2. Contenu
- Prose 250 mots, 4 pains ESN distincts (guerre des talents, inter-contrat, prouver l'expertise tech, pipeline sur quelques chasseurs). Angle propre et rare : **marque-employeur + Claude Code déployé en interne (« la pratique avant la prédication »)**. Bonne substance.
- metricsHero distincts : CareerArc 73 % candidats + « 75 % recruteurs IT pénurie (étude secteur) ». **Faiblesse de sourcing** : le 2ᵉ chiffre est attribué à « étude secteur » (`:524-526`), source non nommée, contredit le standard du silo (« sources tierces nommées »). À sourcer précisément ou retirer.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien ESN ; devrait pousser `/services/integration-claude`, la page vend Claude Code interne), grille de cas cassée.

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison.

## 6. Conversion
- CTA « Cadrer ma marque-employeur → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder : angle marque-employeur IT + Claude Code interne = différenciant).
1. **Sourcer ou retirer** le metricsHero « 75 % recruteurs IT (étude secteur) » : source non nommée = entorse au standard « sources tierces nommées » du silo. Remplacer par un chiffre pénurie IT sourcé (ex. Numeum, Apec) ou le supprimer.
2. Sectoriser le `related-links` (mettre `/services/integration-claude` + `/services/agents-ia` en avant).
3. Corriger la grille de cas (bug transverse) → état vide honnête.
4. Raccourcir le `<title>`. Attention au léger recoupement avec `/secteurs/services-b2b` et `/secteurs/conseil` sur « prouver l'expertise B2B », l'angle recrutement/inter-contrat le distingue suffisamment, à préserver.
