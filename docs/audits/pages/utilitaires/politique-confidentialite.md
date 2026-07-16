---
route: /politique-confidentialite
verdict: AMÉLIORER
title_actuel: "Politique de confidentialité · Waimia"
kw_cible: "aucun (page légale RGPD, indexable par convention)"
date: 2026-07-16
---

# /politique-confidentialite · politique-confidentialite.astro (audit léger)

## Identité

- Fichier : `src/pages/politique-confidentialite.astro` (`TrustLegalTemplate`, 9 sections RGPD `:13-21`). `revisedAt="2026-06-12"` (`:29`). Indexée (`index, follow` vérifié).

## Points

1. **Structure RGPD conforme** : responsable, données collectées, finalités, bases légales, cookies, conservation, destinataires, droits, contact. Renvoi CNIL (`:126`). Solide.
2. **Incohérence à surveiller (cookies analytiques vs GA4 non déployé)** : la section cookies déclare « cookies analytiques déposés avec votre consentement » (`:92`) et une conservation « Données analytiques : 26 mois » (`:101`), alors que `docs/strategy/14 §5` acte que **GA4 est reporté / non intégré**. Déclarer un traceur analytique non encore actif n'est pas un risque légal (on annonce plus que ce qu'on fait), mais crée une incohérence avec l'état réel du site. À réconcilier quand GA4 sera (ou non) branché.
3. **Destinataires / sous-traitants** : vérifier que les sous-traitants réellement utilisés (Resend pour l'email transactionnel, MailerLite pour l'audience, Vercel pour l'hébergement, Cal.com pour la réservation) sont bien nommés dans la section « destinataires des données ». Un formulaire actif (`/api/*`) transmet à Resend + MailerLite : ces flux doivent apparaître.
4. Bilingue via `<Bi>`, base « consentement » pour communications commerciales et cookies non essentiels (`:83`). Correct.

## Verdict

**AMÉLIORER.** Politique RGPD bien structurée, deux points de cohérence à aligner sur la réalité technique.

1. **Aligner la mention des cookies analytiques** (`:92`, `:101`) avec l'état réel : si GA4 n'est pas déployé, reformuler au conditionnel ou retirer jusqu'à activation ; si activé, garder tel quel.
2. **Vérifier l'exhaustivité des sous-traitants** (Resend, MailerLite, Vercel, Cal.com) dans la section destinataires, cohérent avec les endpoints `/api/*` réellement en production.
3. Maintenir `revisedAt` à jour à chaque changement d'outillage.
