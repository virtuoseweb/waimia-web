---
route: /audit-ia-pme
verdict: AMÉLIORER
title_actuel: "Audit IA gratuit pour PME · 45 min, un plan d'action concret"
kw_cible: "audit IA gratuit PME"
date: 2026-07-16
---

# /audit-ia-pme · audit-ia-pme.astro (composable, `getEntry('audits','audit-ia-pme')`)

## 1. Identité

- Route : `/audit-ia-pme` (route explicite, `src/pages/audit-ia-pme.astro`, contenu MDX collection `audits`).
- Title : `Audit IA gratuit pour PME · 45 min, un plan d'action concret`.
- Description : « Audit IA gratuit de 45 min pour PME : on repère 2 process à automatiser, on chiffre le gain et on repart avec un plan d'action. Sans engagement. Montpellier. »
- kw cible (`docs/strategy/14:90`) : `audit IA gratuit PME` (fort, endpoint conversion, « 47 critères absorbés »). Action carte = garder.
- Intention : commerciale/lead-gen (l'audit gratuit = CTA primaire du site). Rôle : endpoint de conversion du système IA/opérationnel.

## 2. Contenu

- H1 servi : « Audit IA gratuit pour PME. » kw-first exact-match. Excellent.
- Modèle SWI-like : masthead + sections + FAQ (16 Q/R). Profondeur forte, orientée process/gain chiffré. Voix conforme (« on chiffre le gain », « sans engagement »).
- E-E-A-T : positionné en prestation gratuite crédible. Bon.

## 3. SEO on-page

- Title/H1 kw-first propre, pas de « système X » en H1 (conforme §0bis.4). RAS.
- 16 Q/R FAQ = fort levier AEO/GEO. Bon.

## 4. Maillage interne

- Entrante forte (home ×3, contact ×3, nav/footer). Bien maillée comme endpoint.
- MastheadBar breadcrumb : Accueil → Audit IA pour PME. Bon.
- Frontière avec `/audit-site-web-intelligent` : à surveiller (cf point cannibalisation ci-dessous).

## 5. Balisage

- JSON-LD servi : `Service` + `Offer` (price 0, EUR) + `BreadcrumbList` + `Organization` + `WebSite`. Adapté (audit = Service gratuit).
- **Anomalie : 2 blocs `FAQPage` sur la même page** (le HTML servi compte 2 `FAQPage`, 16 `Question`, 16 `Answer`). Origine : la page appelle `buildFAQPage(...)` au niveau page (`src/pages/audit-ia-pme.astro:44`) ET la section FAQ (`FaqAccordion.astro:9` / `FaqCtaAside.astro:4`) émet son propre `FAQPage`. Résultat : structured data FAQ dupliquée. Google déduplique en général, mais c'est du balisage redondant à nettoyer. **Transverse** à toute page combinant une section FAQ cataloguée + un `buildFAQPage` page-level.
- Canonical `https://waimia.com/audit-ia-pme`, robots `index, follow`. RAS.

## 6. Conversion

- Offre gratuite (price 0) claire, CTA cohérent (contact/Cal). Aucun prix contradictoire. Bon.

## 7. Verdict + actions

**AMÉLIORER** (uniquement à cause de la double FAQPage ; contenu et positionnement au niveau).

1. **Dédupliquer le FAQPage** : soit retirer l'appel `buildFAQPage` de `src/pages/audit-ia-pme.astro:44` (si la section FAQ émet déjà son JSON-LD), soit désactiver l'émission JSON-LD côté section pour cette page. Un seul `FAQPage` par page. **Vérifier le même défaut sur `/audit-site-web-intelligent` et sur toute page money combinant section FAQ + buildFAQPage** (transverse).
2. Cannibalisation `audit-ia-pme` vs `audit-site-web-intelligent` : `docs/strategy/14:91` tranche « PAS de fusion, catégories/kw distincts » (IA/process vs site web/conversion). À préserver : garder les 2 angles nettement séparés (voir action 1 de l'autre rapport). Vérifier qu'aucun bloc de copy n'est identique entre les deux (risque de contenu dupliqué inter-pages).
3. Transverse : décision OG kicker `§ Waimia`.
