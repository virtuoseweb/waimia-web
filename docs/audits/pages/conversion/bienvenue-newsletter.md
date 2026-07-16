---
route: /bienvenue/newsletter
verdict: VALIDER
title_actuel: "Bienvenue · Newsletter Waimia"
kw_cible: "aucun (page de confirmation, noindex)"
date: 2026-07-16
---

# /bienvenue/newsletter · bienvenue/newsletter.astro

## 1. Identité

- Route : `/bienvenue/newsletter` (`src/pages/bienvenue/newsletter.astro`, 31 lignes).
- Title : `Bienvenue · Newsletter Waimia`. Description : « Votre inscription est confirmée. Le welcome email arrive sous 30 secondes. »
- kw cible : **aucun** (confirmation d'inscription newsletter). Sans intention de recherche.
- Rôle : confirmation d'opt-in newsletter.

## 2. Contenu

- H1 servi : « Inscription confirmée. » Clair. « Le welcome email arrive sous 30 secondes » = attente gérée. Voix conforme.
- Minimal, adapté.

## 3. SEO on-page

- `robots: noindex, follow` (vérifié). Correct.

## 4. Maillage interne

- Sortie de tunnel newsletter, rebond léger. Suffisant. Non listée en nav.

## 5. Balisage

- JSON-LD : `Organization` + `WebSite` + `PostalAddress` (socle). RAS.
- Absente du `sitemap-0.xml` servi : cohérence noindex↔sitemap OK.
- OG kicker `§ Waimia` (transverse).

## 6. Conversion

- Post-opt-in. Réassurance = objectif atteint. Un next step doux (ressource / audit) possible, non bloquant.

## 7. Verdict + actions

**VALIDER.** Page utilitaire saine.

1. (Nice-to-have) Next step doux vers une ressource ou l'audit gratuit.
2. Transverse : décision OG kicker.

> Note : les 3 pages `/bienvenue/*` sont quasi identiques par nature (confirmations). C'est légitime pour des thank-you pages noindex ; ne PAS les fusionner (chacune conclut un tunnel distinct : contact, lead-magnet, newsletter).
