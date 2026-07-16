---
route: /secteurs/services-b2b
verdict: FUSIONNER
title_actuel: "Site web et IA pour les services B2B : convaincre pendant que l'acheteur s'auto-évalue · Waimia"
kw_cible: "site web / IA pour services B2B (générique)"
date: 2026-07-16
---

# Audit · /secteurs/services-b2b

## 1. Identité
- Contenu `src/content/secteurs/services-b2b.mdx`. **noindex** (`:919-920`). Pas de `caseRef`.
- kw cible : « site web / IA pour services B2B ». Intention floue : « services B2B » est une **catégorie parapluie**, pas un métier. Toutes les autres pages du silo (conseil, agence, esn, comptabilite, industrie) SONT des services B2B.
- Rôle affiché : hub sectoriel. Rôle réel : **umbrella générique sans angle propre** = le template dont les autres pages sont les déclinaisons.

## 2. Contenu
- **Page la moins différenciée du silo.** Prose 170 mots (2ᵉ plus courte). 4 pains = version générique de ce que conseil/esn/agence disent en plus précis : « l'acheteur décide avant de parler », « site qui ne prouve rien », « leads non qualifiés », « pipeline sur quelques personnes ». Ce sont exactement les pains de conseil et services-b2b côte à côte (comparer `services-b2b.mdx:879-896` et `conseil.mdx:293-309`).
- metricsHero = **clone pur 6sense** 81 %/70 %, identique à agence et conseil. FAQ = 2 questions génériques recoupant conseil. Aucun vocabulaire, chiffre ou exemple qui n'existe déjà ailleurs.
- Verdict substance : cette page n'apporte aucune matière propre. C'est la définition du candidat FUSIONNER/SUPPRIMER de la grille du README (« un secteur sans substance propre »).

## 3. SEO on-page
- H1 kw-first, 0 « système X », mais le kw « services B2B » est trop large et cannibalise les verticaux. Pas d'exact-match commercial défendable (aucun prospect ne cherche « site pour services B2B » comme un métier). 10 H2.

## 4. Maillage
- **Défauts partagés** : mesh identique 12×, grille de cas cassée. Rien de sectoriel possible ici puisqu'il n'y a pas de secteur.

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison (aucun cas, aucune spécificité), et devrait le rester même après enrichissement, car la requête n'est pas commerciale.

## 6. Conversion
- CTA « Cadrer mon pipeline → » vers `/contact`. Cohérent, mais générique.

## 7. Verdict + actions
**FUSIONNER** (la page ne porte aucune valeur que les verticaux ne portent déjà mieux).
1. **Recommandation principale : fusionner services-b2b dans le hub `/secteurs`** (qui joue déjà le rôle d'ombrelle B2B) OU dans `/services/site-web-ia` (money page). Passer `visible:false` + 301 `/secteurs/services-b2b` → `/secteurs` (ou money page selon l'intention retenue).
2. Si l'on préfère la GARDER comme filet générique (fallback « je ne trouve pas mon métier »), alors : la dé-doublonner durement (metricsHero propres, pains distincts des verticaux) ET la maintenir noindex, mais le ROI est quasi nul vs le coût de désync (c'est une 12ᵉ page à entretenir sans requête propre). Priorité : fusionner.
3. Avant 301, vérifier les liens entrants : `internal-mesh.ts` route certains silos vers `SECTEURS['conseil']`/`['comptabilite']`, pas vers services-b2b, la fusion est donc peu risquée côté maillage interne.
4. Reporter l'angle « acheteur B2B qui s'auto-évalue » (le seul apport) dans la money page `/services/site-web-ia` ou le hub, où il sert vraiment.
