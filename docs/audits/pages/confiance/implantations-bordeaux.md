---
route: /implantations/bordeaux
verdict: VALIDER
title_actuel: "Agence IA et Site Web Intelligent à Bordeaux · Waimia en Gironde"
kw_cible: "agence IA Bordeaux (noindex assumé, réversible)"
date: 2026-07-16
---

# /implantations/bordeaux · content/implantations/bordeaux.json + [...slug].astro

## 1. Identité

- Source : `src/content/implantations/bordeaux.json` (424 lignes) rendu par `implantations/[...slug].astro`.
- Title : `Agence IA et Site Web Intelligent à Bordeaux · Waimia en Gironde` (`json:3`). Page **noindex** (`seo.noindex:true` `json:19-21`, vérifié HTML servi `noindex, follow`).
- kw cible : « agence IA Bordeaux » (visé mais volontairement non indexé). Décision `strategy/14 §3` : « bordeaux noindex fait (2026-07-14), réversible sur NAP réel ».
- Rôle : page locale Gironde en réserve, non indexée tant qu'il n'y a pas d'ancrage local vérifiable (pas d'adresse Bordeaux, pas de NAP local).

## 2. Contenu

- Contenu complet et de qualité (structure jumelle de Montpellier : hero, direct-answer, feature-zigzag, process-steps, decision-list, FAQ 7 questions). Voix conforme.
- **Honnêteté E-E-A-T respectée** : la page ne prétend PAS à une adresse Bordeaux (FAQ `json:24-25` : « La proximité ici, c'est surtout la disponibilité... pas seulement une adresse postale »). Le noindex est le bon choix tant que l'ancrage local n'est pas réel (sinon signal local trompeur).

## 3. SEO on-page

- H1 « Agence IA à Bordeaux. » (`json:105`) : conforme.
- noindex cohérent avec l'absence de NAP local : pas de `LocalBusiness` émis (`[...slug].astro:44` réserve `buildLocalBusiness` à montpellier). Correct.
- Le title contient aussi « Site Web Intelligent » (concept de marque, cf remarque Montpellier), mais sans enjeu tant que noindex.

## 4. Maillage interne

- Entrant/sortant : via hub `/implantations`. Cohérent avec un statut de réserve.

## 5. Balisage

- `Article` + `FAQPage` + Breadcrumb ; pas de `LocalBusiness` (correct sans NAP réel).

## 6. Conversion

- CTA `cal.com/simonberos/audit` (`json:127`) + `/contact`. Conforme.

## 7. Verdict + actions

**VALIDER** (en l'état noindex). Décision de non-indexation justifiée et honnête (pas d'ancrage Bordeaux réel). Contenu prêt à être réactivé.

1. **Condition de réindexation** (si un jour NAP Bordeaux réel) : adresse locale vérifiable + fiche GBP Bordeaux + `LocalBusiness` dédié, alors passer `seo.noindex:false`. Sans ces éléments, garder noindex.
2. Si réactivée un jour : appliquer la même correction de title que Montpellier (retirer « Site Web Intelligent » du `<title>`).
3. Aucune action à court terme.
