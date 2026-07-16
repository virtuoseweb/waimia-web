---
route: /cas-usages/standardiser-processus
verdict: AMÉLIORER
title_actuel: "Standardiser ses processus · une qualité constante, sans dépendre des personnes"
kw_cible: "standardiser ses processus / formaliser et automatiser les procédures"
date: 2026-07-16
---

# /cas-usages/standardiser-processus — AMÉLIORER

Source : `src/content/cas-usages/standardiser-processus.json` · rendu composable. `category: productivite`. 9 sections (avec `related-cards-band`).

## 1. Identité
- Title : « Standardiser ses processus · une qualité constante, sans dépendre des personnes ». kw-first, bon.
- Intention : problème (« mes procédures vivent dans la tête d'une ou deux personnes »). Angle net.

## 2. Contenu
- **Angle problème solide** : hero « quand elles s'absentent, la qualité vacille et les erreurs grimpent… le sujet n'est pas d'écrire un classeur de règles » ; comparison-duo « De la dépendance à un système qui tient ». Voix anti-théâtre.
- **Near-duplicate de gabarit** (cf `generer-plus-de-leads.md` §2) : squelette identique, dates 2026-06-26, suffixe « Montpellier. », 7 FAQ.

## 3. SEO on-page
- H1 kw-first (vérifié HTML : « Standardiser ses processus. »). Conforme.
- **Cannibalisation à surveiller** : chevauchement avec `/services/automatisations`, `/services/automatisation-n8n` et `/services/systemes-operationnels-ia` (l'automatisation du répétitif est leur cœur). Angle à tenir : ici = **formalisation/qualité constante** (problème métier), services = **outillage/livrable technique**.

## 4. Maillage interne
- Mesh `related-links` verrouillé (branche non-acquisition → `systemes-operationnels-ia` / `integration-claude`). Vérifier cible explicite `/services/systemes-operationnels-ia` + `/services/automatisations`.
- `related-cards-band` présente. OK.

## 5. Balisage
- **Bug FAQPage dupliqué** (commun aux 5) : 2 `FAQPage` / 14 Q pour 7 FAQ. Cf action 1. `Article` + `BreadcrumbList` OK, canonical vérifié.

## 6. Conversion
- CTA `footer-cta-band` + `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER.**
1. **Dédupliquer le FAQPage** (fix commun aux 5).
2. Trancher l'angle vs `/services/automatisations` + `/services/systemes-operationnels-ia` (problème « qualité/dépendance humaine » vs livrable « automatisation ») ; vérifier 0 recouvrement H2/FAQ mot-pour-mot.
3. Différencier métadonnées (dates réelles, retirer suffixe « Montpellier. » mécanique commun aux 5).
