# SR 2026-06-10-05 . Régression prod : tous les forms de capture de lead cassés (endpoints `/api/*` supprimés)

> Session autonome (suite de SR-04). Branche `fix/forms-api-endpoints-regression` : commit `06c6314`, PR #37.
> Bug PROD critique découvert et prouvé empiriquement (POST réel sur `waimia.com`), corrigé, GF-1 fonctionnel local + preview Vercel.

## TL;DR

En auditant le backlog registry, j'ai relevé dans la task #27 une note « bug prod LeadMagnet : POST `/api/lead-magnet` absent ». En vérifiant empiriquement (GF-4, pas de déduction), j'ai découvert que le problème était **bien plus large** : **tous les formulaires de capture de lead du site étaient cassés en production**, contact inclus. Aucune soumission ne fonctionnait depuis le commit `f3ac27d`.

Preuve empirique initiale (POST réel sur la prod, honeypot-safe) :

| Form | `action` rendu en prod | Statut prod |
|---|---|---|
| Newsletter (footer/hubs, site-wide) | `fetch('/api/newsletter')` | **404** |
| Devis (`/offres/site-web-ia`) | `action="/api/devis"` | **404** |
| Lead magnet (`/ressources/livres-blancs/*`) | `action="/api/lead-magnet"` | **404** |
| Contact (`/contact`, conversion primaire) | `action="?_action=contact"` (Astro Action) | **405** |

C'est le défaut le plus coûteux possible pour un site commercial : **zéro capture de lead inbound**, silencieusement, depuis des semaines.

## Cause racine (archéologie git)

- `0b86b64` : les 5 routes `/api/{contact,newsletter,devis,lead-magnet,academy}.ts` existaient (architecture serverless `prerender=false` d'origine ; fixes `15161bf` import dynamique Resend + `89695fa` workaround bug POST `@astrojs/vercel@10` via `export const ALL`).
- `6524f78` → `c6a2e8d` : un worker a introduit les Astro Actions + Upstash « out-of-scope scope creep », **reverté**.
- `f3ac27d` « **TrustMarquee → SocialProof · 4 pages migrées** » : ce commit, dont le message ne parle QUE d'une migration de composant, a en réalité **supprimé les 5 routes `/api/*`** ; `d3be913` (même libellé) a réintroduit `src/actions/index.ts`.

Double faute : (1) un changement critique (suppression d'endpoints) enseveli sous un message de commit sans rapport (rule 09/GF-1 : exactement le type de régression silencieuse que la vérification empirique existe pour attraper) ; (2) la migration vers Astro Actions est **fondamentalement incompatible avec `output:'static'`** : une Action se poste en `?_action=` sur la page courante, mais une page prérendue est servie en HTML statique par le CDN → un POST renvoie 405. Et comme le form newsletter est dans le **footer global** (toutes les pages), on ne peut pas passer chaque page en `prerender=false` sans détruire le SSG (la raison d'être du site).

## Décision d'architecture (tranchée en autonomie)

**Restaurer l'architecture cible du projet : endpoints `/api/*` serverless.** Justification triangulée :
- Les commentaires de `astro.config.mjs` décrivent explicitement ce modèle (« API routes SSR via Vercel Functions for /api/* (prerender=false) »).
- L'`exclude` ISR de l'adapter référence ENCORE `/api/contact`, `/api/newsletter`, `/api/academy`, `/api/devis`, `/api/lead-magnet` → la config attend ces endpoints.
- Les Astro Actions ont été explicitement qualifiées de « out-of-scope scope creep » dans l'historique du projet, et déjà revertées une fois.
- Cette architecture **préserve le `output:'static'`** (seules les 5 routes `/api/*` sont des fonctions, comme `healthcheck`/`og.png` déjà en place).
- Les endpoints d'origine sont **récupérables verbatim** depuis git (`f3ac27d^`) : battle-tested, avec le workaround `export const ALL` du bug `@astrojs/vercel@10` toujours nécessaire (version actuelle `^10.0.5`).

Option écartée : « faire marcher les Actions en statique » → impossible sans `prerender=false` partout (footer newsletter) → tuerait le SSG.

## Fix appliqué

1. **Restauration VCS** des 5 endpoints `/api/*` (orchestrateur, `git show f3ac27d^:… > …`, byte-identique, pas d'authoring) : `prerender=false`, `export const ALL`, acceptent JSON ET form-encoded, réponse `{ok:true,redirect}` (200) / `{ok:false,error}` (400/429/500).
2. **Repoint des 5 surfaces Astro Actions → `/api/*`** (worker Opus, raisonnement déporté) avec enhancement client-fetch (pattern de référence = `NewsletterSignup.astro`) : `src/pages/contact.astro`, `src/pages/en/contact.astro`, `src/pages/ressources/academy.astro`, `src/pages/ressources/index.astro`, `src/pages/en/ressources/index.astro`. Retrait de `import {actions} from 'astro:actions'`, `getActionResult`, `isInputError` ; affichage d'erreur basculé côté client (réutilise les `<p>` d'erreur existants).
3. **Régression latente corrigée** : le form academy n'envoyait **aucun champ `email`** (requis par l'endpoint → 400 systématique même quand la route existait). Champ `email` ajouté.
4. **Suppression** de `src/actions/` (mort, 0 import résiduel).

Design/copy/structure/i18n préservés (seul le câblage des forms change). 0 nouveau token, 0 em-dash.

## Preuve GF-1 (fonctionnelle, 2 niveaux)

**Niveau 1 . Local (`astro dev`, sert les routes `/api/*` server-side)** — POST réel + assertion :

| Endpoint | Test | Résultat |
|---|---|---|
| `/api/newsletter` | honeypot-safe (`website` rempli → faux-succès sans email) | `200 {ok:true}` |
| `/api/contact` | payload invalide (brief manquant) | `400 {ok:false,"Champs requis manquants."}` |
| `/api/devis` | invalide (slug/brief manquants) | `400` |
| `/api/lead-magnet` | invalide (slug manquant) | `400 {ok:false,"Requête invalide."}` |
| `/api/academy` | invalide (email manquant) | `400 {ok:false,"Email manquant ou invalide."}` |
| `GET /api/newsletter` | méthode non-POST | `405` (route existe) |

Stratégie anti-spam : honeypot pour le happy-path newsletter (0 email envoyé) ; payload invalide pour les autres (la validation zod échoue AVANT `sendEmail` → 0 email parasite, tout en prouvant que la route est joignable et traite la requête — 400 ≠ 404/405). La logique d'envoi email étant restaurée verbatim de la version qui marchait en prod, le risque résiduel porte sur le câblage (la régression), pas sur Resend.

**Niveau 2 . Preview Vercel (prod-parité, `waimia-qq0lgsdh7`)** — valide le workaround `export const ALL` sur le runtime serverless réel (qu'`astro dev` ne reproduit pas). POST réels (bypass SSO preview) :

| Endpoint | Test | Résultat |
|---|---|---|
| `/api/newsletter` | honeypot-safe | `200 {ok:true}` |
| `/api/contact` | invalide | `400 {ok:false}` |
| `/api/devis` | invalide | `400` |
| `/api/lead-magnet` | invalide | `400` |
| `/api/academy` | invalide | `400` |
| `GET /api/newsletter` | méthode | `405` (route existe) |

→ Le workaround `export const ALL` fonctionne sur Vercel serverless. **Les 404 (route absente) et 405 (POST sur statique) sont éliminés.**

**Volet visuel (rule 33)** — preview, `getComputedStyle` : academy + contact `h1` `opacity:1`, transform neutre `matrix(1,0,0,1,0,0)`, forms `opacity:1` visibles, champ email academy visible (`w720 h52 opacity:1`), 0 erreur console. Screenshot above-fold academy propre.

Gates : `astro check` 0 errors · `pnpm build` Complete! · 5 `/api/*` routées vers `_render.func` (serverless, 0 HTML statique dans `dist/client/api/`) · no-emdash PASS.

## Finding secondaire (documenté, NON corrigé ici)

`src/components/sections/NewsletterBand.astro` rend `action={data.form_action ?? '#'}` sans script client. Vérifié : **0 usage live** (uniquement catalogue/registry — le hub ressources utilise un form inline `hub-nl`, pas cette section). Donc inerte mais non exposé. Laissé intact (hors scope de cette régression ; à câbler si un jour composé en page live).

**Incohérence de copy academy (pré-existante, non corrigée ici)** : le hero `/ressources/academy` annonce « un diagnostic structuré en 12 questions » alors que le form n'a que **6 questions** (q1..q6 ; l'endpoint score sur q1..q12, les manquantes valent 0). Distinct de la régression forms. À trancher séparément (corriger la copy → « 6 questions » OU ajouter les 6 questions manquantes). Documenté pour suivi.

## No-JS (limitation assumée)

Avec `/api/*` + enhancement client-fetch, un utilisateur sans JS qui soumet voit la réponse JSON brute (le POST natif atteint l'endpoint mais la redirection/succès est gérée en JS). C'est le tradeoff de l'architecture `/api/*` d'origine ; l'audience cible a JS. Non sur-ingénié (consigne).

## Décisions / arbitrages tranchés (autonomie)

1. **Restaurer `/api/*` plutôt que réparer les Actions** : intent projet documenté + SSG préservé + endpoints récupérables verbatim. Les Actions auraient exigé `prerender=false` partout (footer newsletter) → incompatible SSG.
2. **Restauration VCS verbatim plutôt que réécriture** : les endpoints d'origine portent le workaround `export const ALL` du bug `@astrojs/vercel@10` ; les réécrire risquait de re-déclencher le bug POST. Verbatim = known-working.
3. **Ajout du champ email sur academy** : l'endpoint l'exige ; sans lui, 400 systématique. Correction d'une régression latente (changement visuel mineur : une ligne email avant le CTA, à valider GF-1 visuel).
4. **NewsletterBand laissé intact** : 0 usage live, hors périmètre de la régression. Documenté plutôt que corrigé (discipline anti-scope-creep).
5. **Preuve par 400/honeypot plutôt que happy-path complet** : prouver la route sans spammer l'inbox interne. La logique email est restaurée verbatim de la version prod, donc seul le câblage (la régression) doit être prouvé.

## Fichiers

- Restaurés : `src/pages/api/{contact,newsletter,devis,lead-magnet,academy}.ts`
- Repointés : `src/pages/contact.astro`, `src/pages/en/contact.astro`, `src/pages/ressources/academy.astro`, `src/pages/ressources/index.astro`, `src/pages/en/ressources/index.astro`
- Supprimés : `src/actions/index.ts`, `src/actions/_shared.ts`

## Statut merge — ✅ MERGÉ MAIN · ⛔ prod-deploy gelé (quota Vercel)

- **PR #37 mergée sur `main`** (`e288f5c`). CI GitHub Actions verte (Build, E2E, gf1-sweep). GF-1 niveau 1 + 2 PASS.
- **Prod-deploy BLOQUÉ** : les **deux** quotas Vercel Hobby sont épuisés simultanément :
  - `build-rate-limit` (« retry in 24 hours ») → aucun nouveau build.
  - `api-deployments-free-per-day` (402, > 100/24h) → `vercel promote` lui-même refusé.
  → Impossible de pousser le fix en prod avant le reset (~24h, vers 2026-06-11 12:00). Upgrade Pro = exclu (paiement prohibé). Blocker externe dur, identique au précédent responsive (#30).
- **prod `waimia.com` sert encore `cd0e1bc5`** (forms cassés) jusqu'au reset. Le fix est mergé + prouvé ; seul le déploiement attend la fenêtre de quota.
- **Suivi** : task #34 (promote + GF-1 prod au reset). Le sous-finding LeadMagnet de la task #27 est résorbé par cette restauration globale (la note « endpoint absent » est obsolète une fois en prod).
- **GF-3 (prévention)** : task #32 (gate `check-form-endpoints` : tout `action`/`fetch` vers `/api/X` doit avoir `src/pages/api/X.ts`) + memory `forms-architecture-api-routes` créée.
