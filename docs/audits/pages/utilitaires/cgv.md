---
route: /cgv
verdict: VALIDER
title_actuel: "Conditions générales de vente · Waimia"
kw_cible: "aucun (page légale, indexable par convention)"
date: 2026-07-16
---

# /cgv · cgv.astro (audit léger)

## Identité

- Fichier : `src/pages/cgv.astro` (`TrustLegalTemplate`, TOC 16+ articles `:14-...`). Partie contractante = **VirtuoseWeb (EI Simon Beros)** (`:6`). Indexée (`index, follow` vérifié) : légal indexable par convention (`strategy/14 §4`, 0 effort SEO).

## Points

1. **Structure complète et cohérente** : objet, prestations, devis, tarifs, paiement (acompte 30 / 40 / 30, `:84`), retard (pénalités + indemnité 40 €, `:92`), PI, confidentialité, résiliation. Conforme au droit français.
2. **Entité cohérente** avec les mentions légales : VirtuoseWeb EI, prix « en euros hors taxes » (`:76`). Pas de contradiction d'entité.
3. **Bloc forfait hébergement Vercel** (Art. 16, `:181-193` : Hobby 24 € TTC/mois, Pro 40 € TTC/mois via Stripe) : cohérent avec la mémoire produit (page espace-client/hébergement). Vérifier que ces montants restent synchronisés si la grille hébergement bouge (source unique).
4. **Cohérence pricing services** : les CGV ne figent aucun prix de prestation au chiffre (renvoi au devis), donc pas de risque de désync avec les tarifs canoniques services. Bon.
5. Bilingue via `<Bi>`, `revisedAt`/`version` présents (fraîcheur tracée).

## Verdict

**VALIDER.** Page légale solide, entité cohérente, indexable par convention. Aucune correction bloquante. Maintenir `revisedAt` à chaque évolution des CGV et garder le forfait Vercel synchronisé avec sa source.
