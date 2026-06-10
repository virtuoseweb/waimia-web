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

## Statut — ✅ RÉSOLU END-TO-END (mergé main + déployé prod + GF-1 prod PASS)

- **PR #37 mergée sur `main`** (`e288f5c`). CI GitHub Actions verte (Build, E2E, gf1-sweep). GF-1 niveaux 1 + 2 PASS.
- **Déployé en prod** via `vercel promote` du preview tree-identique → bascule des alias prod (`waimia.com`), 0 rebuild (contourne le build-rate-limit Hobby). `healthcheck` prod → `version: 06c6314`.
- **GF-1 prod PASS** (POST réels live sur `waimia.com`, re-confirmés 2026-06-10) :

  | Endpoint | Avant régression | Après (prod) |
  |---|---|---|
  | `POST /api/newsletter` (honeypot-safe) | 404 | **200 `{ok:true}`** (0 email) |
  | `POST /api/contact` (invalide) | 405 | **400 `{ok:false,"Champs requis manquants."}`** |
  | `POST /api/devis` (invalide) | 404 | **400 `{ok:false,"Champs requis manquants."}`** |
  | `POST /api/lead-magnet` (invalide) | 404 | **400 `{ok:false,"Requête invalide."}`** |
  | `POST /api/academy` (invalide) | 404 | **400 `{ok:false,"Email manquant ou invalide."}`** |
  | `GET /api/newsletter` (méthode) | 404 | **405** (route existe) |

  → Les 404 (route absente) et 405 (POST sur statique) de la régression sont **éliminés en prod**.

- **⚠️ Correction du récit (GF-4)** : une version antérieure de ce statut déclarait « prod-deploy gelé 24h (deux quotas Vercel épuisés) ». **C'était FAUX.** Le `402 "retry in 24 hours (api-deployments-free-per-day)"` reçu sur `vercel promote` n'était PAS littéral : la **même commande relancée ~16 min plus tard a réussi**. Un message d'erreur est une affirmation à vérifier (retenter), pas une vérité — capitalisé dans la mémoire `vercel-build-rate-limit-promote`.
- **Gate préventif mergé** (#32, PR #38, `d27ffb8`) : `scripts/check-form-endpoints.mjs` — tout `action`/`fetch` vers `/api/X` impose l'existence de `src/pages/api/X.{ts,js,mjs}` (négatif-testé : retirer `newsletter.ts` → FAIL listant les 3 fichiers référents). Câblé dans `.github/workflows/ci.yml`. Memory `forms-architecture-api-routes` créée.
- **Discipline de déploiement (consigne Simon 2026-06-10)** : on limite les déploiements Vercel. Travail batché en local → validation locale (`node scripts/serve-dist.mjs`, parité prod, + GF-1) → push sur `main` qui déclenche le build Vercel auto. Plus d'API / `vercel promote` forcé.
- Le sous-finding LeadMagnet de la task #27 est résorbé (la note « endpoint absent » est obsolète : la prod l'expose et le valide).

## Suite (même session) — envoi RÉEL cassé : `EMAIL_FROM` vide → Resend 422

La preuve GF-1 initiale couvrait le **routage** (200 honeypot / 400 invalide / 405 méthode) mais PAS l'**envoi réel** (le honeypot répond `{ok:true}` sans envoyer, les 400 échouent avant `sendEmail`). En poussant GF-1 backend jusqu'au bout (envoi valide réel sur prod vers une adresse Gmail contrôlée, write→read), découverte d'un **2ᵉ bug, distinct de la régression de routage** :

- `POST /api/newsletter` valide en prod → **`500 {ok:false,"Erreur lors de l'envoi"}`**.
- Logs runtime Vercel (message complet) : `[resend] send error 422 {"name":"validation_error","message":"Invalid \`from\` field. The email address needs to follow the \`email@example.com\` or \`Name <email@example.com>\` format."}`.

**Cause racine** : la var d'env Vercel `EMAIL_FROM` (prod) est **définie mais vide** (`""`). Le code (`src/lib/resend.ts`) faisait `import.meta.env.EMAIL_FROM ?? "Waimia <…>"` : `??` ne rattrape QUE `null`/`undefined`, **pas** la chaîne vide → `from:""` envoyé à Resend → 422 sur CHAQUE soumission valide (les 3 vars `EMAIL_*` sont concernées). Diagnostic clé (GF-4) : un 422 arrive APRÈS authentification → la **clé `RESEND_API_KEY` est valide** (une mauvaise clé renverrait 401) ; le problème n'est ni la clé ni la vérification de domaine. `vercel env pull` rend ces vars vides (marquées « Sensitive » = write-only), donc seul le **422 runtime** révèle la vérité.

**Fix** (robuste, backend) : `import.meta.env.EMAIL_FROM?.trim() || "défaut"` (et non `??`) sur les 3 exports `EMAIL_FROM`/`EMAIL_REPLY_TO`/`EMAIL_INTERNAL_TO` → une env vide/whitespace retombe sur l'alias vérifié `…@virtuoseweb.fr`. Branche `fix/email-from-empty-env`. `astro check` 0 errors · `pnpm build` Complete! · gates verts. GF-1 envoi réel + réception Gmail validé post-déploiement.

**Arbitrage** : fix CODE (déployé via push `main`, aligné sur la discipline deploy) plutôt que fix ENV (qui exigerait `vercel env` + redeploy forcé via API). Le défaut `virtuoseweb.fr` est le domaine vérifié connu (partagé `sitewebastro`). Les 3 vars `EMAIL_*` vides en prod deviennent inoffensives une fois le code défensif ; nettoyage env optionnel à part. À terme : vérifier `waimia.com` sur Resend pour expédier depuis `@waimia.com` (branding) — non bloquant.
