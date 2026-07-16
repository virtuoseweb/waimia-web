---
route: /tarifs
verdict: VALIDER
title_actuel: "Tarifs site web IA pour PME · dès 2 000 € HT · Waimia"
kw_cible: "prix création site web PME / tarif site IA 2026"
date: 2026-07-16
---

# /tarifs · tarifs.astro (composable, `src/data/pages/tarifs.json`)

## 1. Identité

- Route : `/tarifs` (`src/pages/tarifs.astro` → `SectionsRenderer` sur `src/data/pages/tarifs.json`).
- Title : `Tarifs site web IA pour PME · dès 2 000 € HT · Waimia`.
- Description : « Combien coûte un site web IA pour PME ? Chez Waimia, un site démarre à 2 000 € HT, audit gratuit. Régie growth 99 € HT/h, prospection dès 980 € HT/mois. »
- kw cible (`docs/strategy/14:46`) : `prix création site web PME / tarif site IA 2026`. La carte la notait **terne → refondre** (title/H1 zéro kw, prix désync). Cet audit constate que **la refonte est faite**.
- Intention : commerciale/transactionnelle (« combien ça coûte »), forte valeur conversion + featured snippet.

## 2. Contenu

- H1 servi : « Le prix d'un site web IA pour PME, dès 2 000 € HT. » kw-first, chiffre en clair. Bon.
- Sections (`tarifs.json`) : `feature-split-media` ×2, `pricing-tabs-showcase`, `case-card-grid`, `logo-marquee`, `faq-accordion`, `footer-cta-band`. Composition riche, orientée preuve + réponse aux objections + FAQ (levier GEO).
- Voix : « Audit gratuit d'abord », « non dégressif », « Pause ou arrêt à tout moment » : transparence, anti-piège. Conforme anti-théâtre.

## 3. SEO on-page

- Title/H1 kw-first, plus de jargon (« growth » qualifié « régie growth 99 € HT/h »). Conforme à l'action `docs/strategy/14:46`.
- FAQPage JSON-LD (4 Q/R) : bon pour AEO/« combien coûte un site web IA ».

## 4. Maillage interne

- Entrante très forte : la home envoie ≈20 liens `/tarifs#formules` + `/tarifs`. Bien maillée.
- Sortante : `case-card-grid` (cas clients) + footer-cta-band vers conversion. Cohérent.

## 5. Balisage

- JSON-LD : `FAQPage` + `Organization` + `WebSite` + `PostalAddress`. Adapté. (Une entité `Offer`/`PriceSpecification` par palier serait un plus GEO, non bloquant.)
- Canonical `https://waimia.com/tarifs`, robots `index, follow`. RAS.

## 6. Conversion · cohérence pricing (vérifiée vs canonique)

Prix servis croisés avec les tarifs canoniques (memory + brief mission) :
- Grille projet : **2 000 (landing) / 4 000 (vitrine) / 7 000 (premium) / 10 000 €** HT. ✅ conforme.
- Régie growth : **99 € HT/h non dégressif**. ✅ conforme (fin du dégressif, `docs/strategy/14:150`).
- Prospection : **980 € / 1 650 € HT/mois** (+ tier 0 €). ✅ conforme (seule offre en abonnement).
- Maintenance : **99 € HT/mois**. ✅ conforme.
- Audit : **0 €** (gratuit). ✅.

Aucune contradiction de prix inter-pages détectée sur les valeurs canoniques. Point d'attention mineur : le JSON contient aussi « 1 188 € / 2 376 € / 3 960 € » (probables équivalents TTC ou annualisés de 990/1 980/… ) : vérifier que ces montants ne sèment pas d'ambiguïté HT/TTC dans la tab EN/annuelle (non tranché ici, à confirmer visuellement).

## 7. Verdict + actions

**VALIDER.** Refonte réussie : title/H1 kw-first, prix alignés sur toutes les grilles canoniques, FAQ AEO, composition complète. Page-modèle pour le silo conversion. Antécédent P0-1 (« deux grilles tarifaires live », `docs/audits/03:36`) : **résolu** côté /tarifs (source unique JSON, valeurs canoniques).

1. (Vérif seulement) Confirmer visuellement l'absence d'ambiguïté HT/TTC sur les montants secondaires (1 188 / 2 376 / 3 960 €) dans les onglets. Si annualisé, l'étiqueter explicitement.
2. (Nice-to-have GEO, non bloquant) Ajouter `Offer` + `PriceSpecification` JSON-LD par palier pour renforcer l'éligibilité rich-result prix.
3. Transverse : décision OG kicker `§ Waimia`.
