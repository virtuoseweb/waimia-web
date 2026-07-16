---
route: /ressources/comparatifs/geo-vs-seo
verdict: AMÉLIORER
title_actuel: "GEO vs SEO · être cité par les IA ou trouvé sur Google"
kw_cible: GEO vs SEO (définition)
date: 2026-07-16
---

# /ressources/comparatifs/geo-vs-seo

## 1. Identité
- Title : « GEO vs SEO · être cité par les IA ou trouvé sur Google » (vs-intent + définition, très citable). Kw `strategy/14` §2 : comparatifs « fort · garder », P3.
- H1 servi : « GEO vs SEO. »
- Rôle : comparatif **définitionnel**. Feeder GEO du cluster SEO/GEO.

## 2. Contenu
- Format GEO excellent : **`<table>` HTML** (ligne à ligne), « Trois bascules entre trouver et citer », « Six repères pour doser GEO et SEO », FAQ (8 questions), daté 2026-06-29. Définition GEO extractible = actif AIO fort.

## 3. SEO on-page
- **Cannibalisation à cadrer (raison du verdict AMÉLIORER)** : le kw « GEO » et « être cité par les IA » est aussi porté par deux money pages :
  - `services/seo-geo-contenu` (kw « agence SEO GEO PME / être cité par les IA », pilier fort) ;
  - `services/referencement-ia` (kw « référencement IA / être cité par ChatGPT », enfant), dont `strategy/14` §1bis précise « comparatif = définition ».
  Frontière voulue : **comparatif = définition informationnelle**, services = offres commerciales. Ce comparatif ne doit pas remonter sur « agence SEO GEO PME » ni sur « être cité par ChatGPT » nu.
- Vérifier que le corps du comparatif reste définitionnel (pas de langage d'offre) et renvoie explicitement les intentions commerciales vers les services.

## 4. Maillage interne
- Doit pointer `services/seo-geo-contenu` (production complète) et `services/referencement-ia` (offre GEO pure) en corps, en ancres descriptives non-exact-match. Aujourd'hui ce lien de cluster est à garantir.

## 5. Balisage
- `Article` + `FAQPage` + `BreadcrumbList` + `WebPage` + `ImageObject` ✅.
- **Bug transverse FAQPage dupliqué** : 16 `Question` + **2 blocs `FAQPage`**. Cf `guide-claude-pme.md` action 1.

## 6. Conversion
- CTA « Vu sur Google, repris par les IA. Faisons les deux. » → présent aussi `cal.com/simonberos/audit` (audit gratuit canonique). ✅ Pas de pricing.

## 7. Verdict + actions
Verdict : **AMÉLIORER** (format excellent, cannibalisation à verrouiller).
1. Tenir l'angle strictement définitionnel et ajouter, en fin de FAQ/corps, un renvoi explicite « pour la mise en œuvre → `services/seo-geo-contenu` (production) / `services/referencement-ia` (citabilité IA) ». Pourquoi : répartir l'intention commerciale vers les money pages, garder ce comparatif sur la définition.
2. Surveiller que geo-vs-seo ne remonte pas sur « agence SEO GEO PME » (réservé au pilier). Pourquoi : anti-cannibalisation intra-cluster (cf audit `services/seo-geo-contenu`).
3. **[Transverse]** Corriger le FAQPage dupliqué.
