---
route: /services/systeme-commercial
verdict: AMÉLIORER
title_actuel: "Développement commercial B2B pour PME : le système commercial"
kw_cible: développement commercial B2B
date: 2026-07-16
---

# /services/systeme-commercial (hub système)

## 1. Identité
- Title : « Développement commercial B2B pour PME : le système commercial » (kw-first + suffixe marque). Conforme V8.1.
- H1 servi : « Transformer vos prospects en clients. » ✅ kw-first orienté outcome, pas « système X ».
- Kw cible `strategy/14` §1 : « développement commercial B2B ».
- Rôle : hub qui bundle prospection + crm-scoring-routing + sequences-de-suivi.

## 2. Contenu
- 20 sections modèle SWI, FAQ 8. Voix conforme.
- Note `strategy/14` : « cohérence home (tab) », le tab « Système commercial » du home était un résidu « bientôt » désync. À revérifier côté home (hors périmètre de ce rapport, mais dépendance à tracer).

## 3. SEO on-page
- H1/title conformes.
- Templated content : 32 phrases identiques avec systeme-acquisition (majoritairement blocs mutualisés). Même remarque d'ossature clonée que le hub acquisition.

## 4. Maillage interne
- 2509 liens entrants (fort, menu featured). Émet vers ses 3 modules + autres systèmes.

## 5. Balisage
- Schema : Service + FAQPage + Offer + PriceSpecification + BreadcrumbList + Organization + WebSite ✅.
- Canonical ✅.

## 6. Conversion
- CTA `/contact?offer=systeme-commercial&intent=discovery` ✅.
- Pricing : `priceRange: "0-1650€/mois"` (min 0 / max 1650), cohérent avec la logique abonnement du système commercial (palier gratuit + prospection 980/1650). Le `0` traduit un point d'entrée gratuit ; vérifier que la copie explique ce palier 0€ pour éviter l'incompréhension.

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. Vérifier/lever la désync du tab « Système commercial » sur le home (`strategy/14` §1). Pourquoi : cohérence marque acquisition↔commercial↔ops.
2. Diversifier 2 blocs mutualisés (cas/avis propre au commercial) vs systeme-acquisition. Pourquoi : ossature clonée.
3. S'assurer que le palier « 0€ » du `priceRange` est explicité dans le corps (pricing-cards) pour ne pas laisser un `min:0` orphelin dans le JSON-LD `PriceSpecification`.
