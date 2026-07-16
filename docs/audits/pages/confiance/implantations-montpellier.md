---
route: /implantations/montpellier
verdict: AMÉLIORER
title_actuel: "Agence IA et création de Site Web Intelligent à Montpellier"
kw_cible: "agence IA Montpellier / agence web Montpellier"
date: 2026-07-16
---

# /implantations/montpellier · content/implantations/montpellier.json + [...slug].astro

## 1. Identité

- Source : `src/content/implantations/montpellier.json` (424 lignes) rendu par `implantations/[...slug].astro` → `SectionsRenderer`.
- Title : `Agence IA et création de Site Web Intelligent à Montpellier` (`json:3`). **Indexée** (`seo.noindex:false` `json:19-21`, vérifié HTML servi `index, follow`).
- kw cible : « agence IA à Montpellier » (repris en H1/definition/direct-answer). **Page locale SEO clé** (`docs/strategy/14 §3` : « + JSON-LD LocalBusiness + NAP + GBP »).
- Rôle : capter le SEO local Montpellier/Hérault/Occitanie.

## 2. Contenu

- Riche et véridique : hero, `direct-answer` (GEO), `feature-zigzag` proximité, `process-steps`, `decision-list`, `related-cards-band`, FAQ 7 questions (`json:90-423`). Voix conforme, angle local calibré (saisonnalité touristique, French Tech, Halle Tropisme).
- Bon travail local : ancrage Hérault/Occitanie cohérent, cas d'usage crédibles.

## 3. SEO on-page

- H1 « Votre studio IA à Montpellier. » (`json:105`) : conforme doctrine (kw local, pas « système X »).
- **Point doctrine** : le TITLE (`json:3`) contient « Site Web Intelligent », concept de MARQUE à demande de recherche nulle (`strategy/10 §0bis` : « site web intelligent » pas recherché → copy de marque, jamais un `<title>` ciblé SEO). Le vrai kw « agence IA Montpellier » y est, mais le title est dilué par le concept de marque.
- `direct-answer` (`json:139-147`) : excellent format GEO (question + terme + réponse citable).

## 4. Maillage interne

- Entrant : ~5 références (dont hub `/implantations`). Devrait recevoir plus (page money locale) : lier depuis `/agence`, footer, et depuis `/services/seo-local`.
- Sortant : `/services/site-web-ia`, `/services/integration-claude`, `/contact` (related-cards `json:305-338`). Bon.

## 5. Balisage

- **`LocalBusiness`/`ProfessionalService` émis (montpellier uniquement)** via `buildLocalBusiness` (`[...slug].astro:44`). Vérifié `schema-builder.ts:92-110` : NAP réel (`telephone +33620615693`, `537 Rue du Pré aux Clercs`, `sameAs` GBP `share.google/...` + LinkedIn company). C'est exactement la demande `strategy/14 §3`, **FAIT**.
- `FAQPage` (via `buildFAQPage`, `json:22-55`) + `Article` + Breadcrumb. Balisage local complet.
- NAP cohérent aussi en clair dans le footer-cta (`json:406-407` : adresse + `06 20 61 56 93`).

## 6. Conversion

- **Incohérence CTA** : le hero pointe vers `/contact?offer=montpellier&intent=local` (`json:128`) alors que le footer-cta pointe vers `https://cal.com/simonberos/audit` (`json:412`). La mémoire canonique dit « tous les CTA réservation = `simonberos/audit` ». Harmoniser le parcours de réservation.

## 7. Verdict + actions

**AMÉLIORER.** Page locale forte, LocalBusiness + NAP + GBP déjà en place (demande §3 satisfaite). Corrections de finition.

1. **Title (doctrine)** : retirer « création de Site Web Intelligent » (concept de marque non recherché) et centrer sur le kw local réel, p. ex. « Agence IA à Montpellier · Sites web et intégration Claude · Waimia ».
2. **Harmoniser les CTA** : aligner le CTA hero (`json:128`, `/contact?offer=...`) et le footer (`cal.com/simonberos/audit`) sur un seul parcours de réservation canonique.
3. **Renforcer le maillage entrant** : lier Montpellier depuis `/agence`, le footer et `/services/seo-local` (page money locale sous-maillée).
4. Aucune correction bloquante sur le balisage : il est au niveau.
