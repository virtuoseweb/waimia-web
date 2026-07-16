---
route: /cas-clients/amploi
verdict: AMÉLIORER
title_actuel: "Amploi : un site marketing IA-ready, conforme et orienté conversion · Waimia"
kw_cible: "site marketing IA / site web entreprise adaptée RH (long tail marque)"
date: 2026-07-16
---

# /cas-clients/amploi — AMÉLIORER

Source : `src/content/cases/amploi.mdx` · rendu legacy `CaseStudyTemplate` (pas de `sections:`).

## 1. Identité
- Title `amploi.mdx:2` : « Amploi : un site marketing IA-ready, conforme et orienté conversion ». Correct, marque + bénéfices.
- Description `amploi.mdx:4` : claire (Astro, HubSpot, GEO/AIO). `card.order: 3`.
- Rôle : preuve secteur « RH et santé au travail » ; aussi `caseRef` de `/secteurs/startup-logiciel` (`secteurs/startup-logiciel.mdx:53`).

## 2. Contenu / E-E-A-T
- **Cas le plus faible en preuve chiffrée parmi les 5.** Aucun champ `metrics`, aucun `shifts`, aucun `pullQuote` (vérifié : matrice de champs, `amploi.mdx` n'a que `contextStats`/`phases`/`bottlenecks`/`deliverableCards`/`showcase`/`card`). `impact_fr:21` = « Site marketing IA-ready livré en 6 semaines… mise en production » : c'est une **histoire de livraison**, pas de résultat mesuré.
- `contextStats` (`:60-68`) sont structurels (6 sem., 2 sites, 3 couches), pas des outcomes.
- Conséquence : la page ne peut pas soutenir la promesse « résultats mesurés » du hub (cf `_index.md` action 2).
- `showcase` présent (`:26-50`) avec `url: https://amploi.fr` + 2 captures réelles (`home.webp`, `home-full.webp` existent sur disque, bouton visite `nofollow` rendu — vérifié HTML servi : 1 `sshow__visit`). Bon point de fraîcheur.
- Voix anti-théâtre respectée, prose correcte.

## 3. SEO on-page
- H1 = `title_fr` (kw-first marque, OK). Hiérarchie Hn du template correcte.
- Pas de contenu dupliqué inter-cas détecté.

## 4. Maillage interne
- **Incohérence secteur (croisé `docs/strategy/14:108`)** : `/secteurs/startup-logiciel` pointe `caseRef: "amploi"` alors qu'Amploi est une **entreprise adaptée RH / SCIC** (`amploi.mdx:56`), pas un éditeur logiciel / SaaS. Le kw map le signale explicitement (« corriger le cas (amploi ≠ SaaS) »). La preuve affichée sur la page secteur startup-logiciel ne correspond pas à l'ICP de cette page.
- **Manque** : pas de lien in-body du cas vers les services réellement utilisés (`/services/site-web-ia`, `/services/integration-crm`, `/services/referencement-ia`/GEO). Le template legacy `relatedCards` ne liste que les cas frères (`[...slug].astro:87-95`).

## 5. Balisage
- Vérifié (miroir balzeo, même template) : `Article` + `BreadcrumbList` + `Person`/`Organization`. Canonical `https://waimia.com/cas-clients/amploi` attendu (pattern router `[...slug].astro:104`). Conforme.

## 6. Conversion
- CTA hérités du template/chrome (`/contact`, `/audit-*`). Cohérents. Pas de pricing (normal).

## 7. Verdict + actions
**AMÉLIORER.**
1. **Résoudre le mismatch secteur** : soit repointer `/secteurs/startup-logiciel` (`secteurs/startup-logiciel.mdx:53`) vers un cas SaaS/éditeur réel, soit noindex temporaire de cette page secteur (cf `strategy/14:108`), soit requalifier explicitement Amploi. Ne pas laisser un cas RH illustrer « startup logiciel ».
2. Enrichir la preuve : ajouter au moins 1-2 outcomes réels vérifiables (trafic, leads captés HubSpot, pages indexées/citations IA) en `metrics`/`shifts` ; sinon assumer que ce cas ne figure PAS dans le décompte « résultats mesurés » du hub.
3. Ajouter un maillage in-body cas → services utilisés (site-web-ia, integration-crm, referencement-ia) une fois la mesh page-level des cas câblée (dette commune, cf `[...slug].astro:135` « TODO related page-level »).
