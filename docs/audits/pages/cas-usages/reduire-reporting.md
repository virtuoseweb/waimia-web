---
route: /cas-usages/reduire-reporting
verdict: AMÉLIORER
title_actuel: "Réduire le temps de reporting · des chiffres prêts, pas à compiler"
kw_cible: "réduire le temps de reporting / automatiser le reporting"
date: 2026-07-16
---

# /cas-usages/reduire-reporting — AMÉLIORER

Source : `src/content/cas-usages/reduire-reporting.json` · rendu composable. `category: productivite`. 8 sections (`hero-split-media`, `feature-zigzag`, `steps-horizontal`, `bento-grid`, `comparison-duo`, `author-byline`, `faq-accordion`, `footer-cta-band`) — pas de `related-cards-band`.

## 1. Identité
- Title : « Réduire le temps de reporting · des chiffres prêts, pas à compiler ». kw-first, bon.
- Intention : problème (« je passe 2-3 jours/mois à compiler des tableaux »). Angle net.

## 2. Contenu
- **Angle problème solide** : hero « deux à trois jours partent à extraire, recopier, recalculer un rapport que le board consulte vingt minutes » ; comparison-duo « Du copier-coller au reporting prêt ». Voix anti-théâtre.
- **Near-duplicate de gabarit** (cf fiche generer-plus-de-leads §2) : même squelette (variante `steps-horizontal`), mêmes dates 2026-06-26, même suffixe « Montpellier. », 7 FAQ.

## 3. SEO on-page
- H1 kw-first (vérifié HTML : « Réduire le temps de reporting. »). Conforme.
- **Cannibalisation la plus forte du silo** : `/services/donnees-reporting` cible exactement « reporting automatisé / centraliser ses données » (`docs/strategy/14:42`). Ce cas-usage et ce service se disputent le kw « reporting automatisé ». Chevauchement aussi avec `/cas-usages/centraliser-donnees` (même category productivite, thème données). Il faut un angle strictement distinct : ici = **temps de reporting** (douleur temps), le service = **capacité technique**. À garder tranché.

## 4. Maillage interne
- Mesh `related-links` verrouillé vers le service pivot productivité/reporting (helper `meshForCasUsage`, branche non-acquisition → `integration-claude` / systèmes opérationnels, `internal-mesh.ts:363-365`). Vérifier que le lien « Voir le système → » cible bien `/services/donnees-reporting` ou `/services/systemes-operationnels-ia`.
- Pas de `related-cards-band` (cette fiche n'a pas la bande cas frères des autres) : asymétrie mineure avec les 3 fiches qui l'ont.

## 5. Balisage
- **Bug FAQPage dupliqué** (commun aux 5) : 2 `FAQPage` / 14 Q pour 7 FAQ (vérifié HTML). Cf action 1. `Article` + `BreadcrumbList` OK, canonical vérifié.

## 6. Conversion
- CTA `footer-cta-band` + `/contact` (intent selon config). Cohérent.

## 7. Verdict + actions
**AMÉLIORER.**
1. **Dédupliquer le FAQPage** (fix commun, cf `generer-plus-de-leads.md` action 1).
2. **Trancher la cannibalisation vs `/services/donnees-reporting`** : verrouiller l'angle « temps/douleur opérationnelle » ici et « service/capacité » côté service ; s'assurer que le mesh `related-links` pointe explicitement le service reporting et que les title/H2 ne se recouvrent pas mot pour mot. Monitorer GSC (mêmes requêtes servies par 2 URLs).
3. Ajouter une `related-cards-band` (cohérence avec les autres fiches) OU acter l'absence comme choix ; varier dates + retirer suffixe « Montpellier. » mécanique.
