---
route: /services/template-service-ref
verdict: SUPPRIMER
title_actuel: "Référence · Template de page service · Growth System IA"
kw_cible: (aucun, page technique de référence)
date: 2026-07-16
---

# /services/template-service-ref (page technique de référence)

## 1. Identité
- Title : « Référence · Template de page service · Growth System IA ». H1 servi : « Growth System IA ».
- Kw cible : **aucun**. Description : « Page de référence noindex démontrant la séquence canonique de sections d'une page de service Waimia ».
- Rôle : fixture de développement / QA (démo de l'ossature 14 sections), pas une page publique à visée SEO.

## 2. Contenu
- 14 sections (≠ 20 des pages réelles), FAQ 6. Contenu factice/démonstratif (« Growth System IA », placeholder). Aucune valeur pour un visiteur ou une IA.

## 3. SEO on-page
- H1 « Growth System IA » = concept de marque non recherché (`strategy/10 §0bis` : « système X » = 0 demande). Aucune intention couverte. Ne doit jamais ranker.

## 4. Maillage interne
- 17 liens entrants (résidus de métadonnées `section-usage.generated.ts` + éventuels liens de dev). Une page noindex ne devrait recevoir aucun lien indexable dofollow.

## 5. Balisage
- `robots: noindex, follow` ✅ (vérifié servi). Hors sitemap ✅ (vérifié : 0 occurrence dans `sitemap-0.xml`). Schema Service + FAQPage présent (inutile sur une fixture, mais sans risque car noindex).

## 6. Conversion
- Sans objet (pas de CTA de conversion réel).

## 7. Verdict + actions
Verdict : **SUPPRIMER** (ou, a minima, statu quo noindex, déjà en place).
- Le risque SEO est DÉJÀ contenu : `noindex,follow` + exclusion sitemap. Le minimum acceptable est donc respecté.
1. Idéal : sortir la fixture du routing public, la déplacer hors de la collection `services` (ex. sous `/preview/*` ou `/lab/*` déjà exclus), pour qu'aucune URL `/services/*` factice n'existe en prod. Pourquoi : une page démo n'a rien à faire dans l'espace d'URL commercial, même noindex.
2. Si conservée : retirer les 17 liens entrants pointant vers elle (garder 0 lien dofollow vers du noindex) et vérifier qu'elle reste `noindex` + hors sitemap à chaque regen. Pourquoi : hygiène crawl budget.
