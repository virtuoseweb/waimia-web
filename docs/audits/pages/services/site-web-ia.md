---
route: /services/site-web-ia
verdict: VALIDER
title_actuel: "Site web IA pour PME · un site qui vend, pas une vitrine"
kw_cible: site web IA / création site internet IA
date: 2026-07-16
---

# /services/site-web-ia (module pilier · modèle de référence SWI)

## 1. Identité
- Title : « Site web IA pour PME · un site qui vend, pas une vitrine » (kw-first fort).
- H1 servi : « Un site web IA pour PME. » ✅.
- Kw cible `strategy/14` §1 : « site web IA / création site internet IA », pilier P1, note « fort ».
- Rôle : page hub du système marketing (`strategy/10 §0bis.2`), produit d'entrée + récit du système, modèle SWI 20 sections de référence pour les sœurs.

## 2. Contenu
- Modèle 20 sections complet, FAQ 8 (ajoutée en vague 1). Voix anti-théâtre exemplaire (« Votre site est joli et ne vend rien ? »).
- Définition extractible + pain-list + comparison-duo + deliverables : profondeur au-dessus des sœurs. E-E-A-T solide.
- C'est la page dont dérivent wordpress/webflow/sur-mesure (19/16/12 phrases partagées), cohérent : les offres sont des déclinaisons d'implémentation.

## 3. SEO on-page
- H1/title/Hn conformes, kw dense et varié. Aucun défaut de doctrine.

## 4. Maillage interne
- 1380 liens entrants (pilier). Émet vers ses 3 offres (wordpress/webflow/sur-mesure) et le hub acquisition.

## 5. Balisage
- Schema : Service + FAQPage (17 Q/A) + Offer + PriceSpecification + Breadcrumb + Organization + WebSite. Complet ✅. Canonical ✅.

## 6. Conversion
- CTA multiples bien ciblés + audits. Pricing `2000-10000€` (grille forfait canonique) ✅.
- **Défaut mineur** : le paramètre `offer=site-web-intelligent` dans les CTA ≠ slug de route `site-web-ia`. Incohérence de ncommage de suivi (et proche du ghost route `/services/site-web-intelligent`, cf point 7).

## 7. Verdict + actions
Verdict : **VALIDER** (page de référence, mérité).
1. `src/content/services/site-web-ia.json` : aligner le param CTA `offer=site-web-intelligent` sur le slug réel `site-web-ia` (ou documenter volontairement le décalage marque/route). Pourquoi : cohérence tracking + éviter toute confusion avec le ghost route.
2. Transverse (hors cette page) : `/lab/home-d.astro:82` pointe vers `/services/site-web-intelligent` qui **404** (route inexistante) ; lien mort à corriger côté lab (noindex mais lien cassé).
