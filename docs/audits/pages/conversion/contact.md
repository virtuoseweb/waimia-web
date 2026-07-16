---
route: /contact
verdict: AMÉLIORER
title_actuel: "Contact · Réserver une séance de travail · Waimia"
kw_cible: "contact / prise de rendez-vous (intention navigationnelle)"
date: 2026-07-16
---

# /contact · contact.astro

## 1. Identité

- Route : `/contact` (`src/pages/contact.astro`, 298 lignes, page bespoke non composable).
- Title : `Contact · Réserver une séance de travail · Waimia`.
- Description : « Une séance de 45 minutes pour un problème diagnostiqué, ou pas de relance. À distance, Meet ou Zoom, depuis Montpellier. Réponse en 24 h ouvrées. »
- kw cible : intention navigationnelle pure (« contact waimia »). `docs/strategy/14 §4` la classe « reste indexée » (convention, 0 effort SEO). Pas de kw commercial à défendre.
- Rôle : endpoint de conversion (formulaire de brief + réservation Cal).

## 2. Contenu

- H1 servi : « Une séance. Pas un pitch. » Voix anti-théâtre exemplaire (cash, anti-relance).
- Copy orientée bénéfice (« un problème diagnostiqué, ou pas de relance »), rassurante sur l'absence de spam commercial. Cohérent avec le positionnement « interlocuteur direct, 0 captivité ».
- Page fonctionnelle (formulaire), profondeur volontairement faible : normal pour une page contact.

## 3. SEO on-page

- Title/description propres, non-cannibalisants. RAS.
- Hiérarchie Hn cohérente (1 H1). Pas d'enjeu de densité kw (page navigationnelle).

## 4. Maillage interne

- Entrante : la home et le footer global pointent massivement `/contact` (≈10 liens depuis la home seule). Bien maillée.
- Sortante : liens vers `/audit-ia-pme` ×3 et `/audit-site-web-intelligent` ×3 (bon renvoi vers les endpoints d'audit qualifiés) + Cal.

## 5. Balisage

- JSON-LD servi : `ContactPage` + `ContactPoint` + `Organization` + `BreadcrumbList` + `WebSite` + `PostalAddress`. Balisage riche et adapté (ContactPage est le type correct). Point fort.
- Canonical `https://waimia.com/contact`, robots `index, follow`. Cohérent avec « reste indexée » (§4).
- OG : kicker `§ Waimia` (anomalie transverse, cf home action 4).

## 6. Conversion

- CTA canonique présent : `https://cal.com/simonberos/audit` (audit gratuit, conforme memory pricing canonique). Bon.
- Formulaire de brief : capture de lead. NB : la mémoire projet signale que la capture passe par `/api/*` serverless (régression historique SR-05). Hors scope contenu, mais à re-tester fonctionnellement avant prospection (GF-1 fonctionnel, non couvert par cet audit lecture seule).

## 7. Verdict + actions

**AMÉLIORER** (léger). Page saine, bien balisée, voix juste. Deux micro-points.

1. **`src/pages/contact.astro`** : vérifier qu'un seul CTA de réservation canonique est exposé (`cal.com/simonberos/audit`, gratuit) et qu'aucun lien Cal payant (`30min`/`rdv1h`/`15min`) n'a fuité (memory `cal-booking-canonical`). Le HTML servi n'en montre qu'un (audit) : OK, à garder verrouillé.
2. **Transverse** : appliquer la décision OG kicker (`src/layouts/Base.astro:80`).
3. Post-audit (hors lecture seule, à planifier) : GF-1 fonctionnel du formulaire (`POST /api/*` réel, non-2xx géré, email Resend délivré) avant lancement prospection.
