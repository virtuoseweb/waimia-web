---
route: /services/systeme-acquisition
verdict: AMÉLIORER
title_actuel: "Générer des leads B2B qualifiés pour PME : le système d'acquisition"
kw_cible: générer des leads B2B qualifiés
date: 2026-07-16
---

# /services/systeme-acquisition (hub système)

## 1. Identité
- Title : « Générer des leads B2B qualifiés pour PME : le système d'acquisition » (kw-first, « système » en suffixe de marque). Conforme doctrine double couche V8.1 (`strategy/10 §0bis`).
- H1 servi : « Générer des leads B2B qualifiés. » ✅ kw-first, jamais « système X » en H1.
- Kicker : « § Système d'acquisition » (marque, correct en kicker).
- Kw cible `strategy/14` §1 : « générer des leads B2B qualifiés ». Intention commerciale/bundle.
- Rôle : hub qui bundle site-web-ia + seo-geo-contenu + landing-pages-tunnels, passe le relais au système commercial.

## 2. Contenu
- 20 sections modèle SWI. Lede fort et concret (« Vos concurrents captent les prospects que vous laissez filer »), voix anti-théâtre respectée.
- Définition extractible présente (`definition-extract`) : bon levier GEO.
- FAQ : 8 questions, dont frontière système d'acquisition vs commercial (« C'est une offre unique ou un ensemble de modules ? »).
- E-E-A-T via eeat-panel + cas + testimonial-wall (réutilisés des sœurs).

## 3. SEO on-page
- H1/title/hiérarchie conformes.
- Risque templated content : partage 32 phrases identiques avec `/services/systeme-commercial` (mesuré par diff de phrases). L'essentiel = blocs mutualisés (case-card-grid, testimonial-wall, system-flow, notes pricing) et non le corps différenciant, mais reste un signal d'ossature clonée à surveiller (`strategy/14` : « varier l'ossature des 12 pages en P2 »).

## 4. Maillage interne
- Reçoit 2561 liens entrants (fort, placement menu « featured »).
- Émet vers tous les modules + les 2 autres systèmes (system-flow). Bon maillage descendant.

## 5. Balisage
- Schema servi : Service + FAQPage (16 Q/A) + Offer + PriceSpecification + BreadcrumbList + Organization + WebSite. Complet ✅.
- Canonical `https://waimia.com/services/systeme-acquisition` ✅.

## 6. Conversion
- CTA `/contact?offer=systeme-acquisition&intent=discovery` ✅ canonique + audits.
- Pricing : `priceRange: "2000-3960€"` (min 2000 / max 3960). **Défaut de format** : incohérent avec les sœurs (`2000€-3960€/mois` ailleurs), et pas de suffixe `/mois` alors que le max 3960 est un plafond de régie mensuelle.

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. `src/content/services/systeme-acquisition.json` (`seo.priceRange`) : harmoniser le format sur le standard silo (« 2000€ – 3960€/mois » ou la convention retenue). Pourquoi : `PriceSpecification` JSON-LD et affichage cohérents entre pages sœurs.
2. Diversifier au moins 2 des 4 blocs mutualisés (un cas / un avis propre à l'angle acquisition) pour réduire l'ossature clonée partagée avec systeme-commercial. Pourquoi : atténuer le signal templated-content sur les 3 hubs.
