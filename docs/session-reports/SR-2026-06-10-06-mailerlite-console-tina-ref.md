# SR-2026-06-10-06 · MailerLite (automation) + drift /en/console + réécriture doc Tina No-React

> Statut : **CODE PRÊT, push tenu** jusqu'à `MAILERLITE_API_KEY` en env Vercel (Astro 6 inline au build). Console + doc = prêts à partir dans le même batch.

## 1. Console FR/EN drift (#35) · RÉSOLU (local GF-1 PASS)

- **Diag** : `src/pages/en/console.astro` était une **copie ancienne** de `src/pages/console.astro` (canonical, bilingue via `langFromPath`). Drift = OBS doctrine V6, pas de `reveal-mask-up`, padding 140px figé, type scale différente.
- **Fix** : mirror byte-identique `cp console.astro en/console.astro` + `sed 's/from \x27..\//from \x27...\//'` (profondeur imports). `diff` de contrôle = **uniquement les 9 lignes d'import** `../` vs `../../`.
- **GF-1 local** (serve-dist `.vercel/output/static`, parité prod) : `lang=en-US`, h1 « An operating system for your revenue operations. » `reveal-mask-up in is-visible`, **opacity 1**, transform neutre, visible (y=260) ; **17/17 reveals** visibles après scroll (IntersectionObserver OK) ; screenshot above-fold layout intact.
- Commit `835dcaa`.

## 2. MailerLite · couche automation (#36) · CODE VALIDÉ, ACTIVATION = clé env

- **Architecture** : Resend = transactionnel (1 email immédiat) ; **MailerLite = audience + drip** (upsert → groupe → déclenche les automations dashboard). Réponse à « systèmes différents selon le formulaire » : un seul transport (`/api/*`), deux providers complémentaires dans l'endpoint, orthogonaux aux Astro Actions.
- **`src/lib/mailerlite.ts`** : client fetch direct `POST https://connect.mailerlite.com/api/subscribers`, **non-bloquant** (try/catch interne, ne throw jamais → le 200 du form n'est jamais menacé), **skip propre** si pas de clé.
- **5 endpoints câblés** : `upsertSubscriber({...})` APRÈS le `sendEmail` Resend, AVANT le `return`. Mapping groupes : newsletter+academy → `114701…942792` ; lead-magnet → `105703…459251` ; contact → `117973…108238` (email ciblé, `fields:{company,role}`) ; devis → `114701…859842` (audit seo).
- **Validation** : `astro check` 0 errors + `pnpm build` Complete.
- ⚠️ **Pré-requis activation** (Astro 6 inline `import.meta.env` au BUILD, doc officielle) : `MAILERLITE_API_KEY` doit être en env Vercel **avant** le build qui embarque ce code, sinon `apiKey=undefined` est gravé → skip jusqu'au prochain rebuild. (Même mécanisme que `RESEND_API_KEY`, présente depuis 8j.)
- 🔴 **BLOCKER : la clé MailerLite collée est INVALIDE.** Extraite exactement (parsing JSON du transcript, 0 corruption, 995 chars) et testée contre `GET connect.mailerlite.com/api/subscribers` → **HTTP 401 `{"message":"Unauthenticated."}`**. Claims décodés : `aud:4`, `sub:725880`, `iat`=2026-06-10T12:23Z, `exp`=+100 ans, `scopes:[]`. Le token est frais (non expiré) mais **rejeté** → révoqué / sans droits API. Donc **rien posé en env** (une clé morte = 401+skip à chaque submit, pire qu'un skip propre sans clé). **Action requise** : régénérer un token API dans MailerLite (Integrations → API) ; dès qu'il authentifie (200), je le pose en env + rebuild + GF-1 (POST réel → 200 + abonné lu via API dans le bon groupe). Le code reste shippé et dormant en attendant.
- **Domaines MailerLite** : `waimia.com` + `virtuoseweb.fr` Authenticated → MailerLite peut envoyer les séquences depuis un domaine brandé. Indépendant de la vérif Resend (séparée ; `virtuoseweb.fr` vérifié côté Resend).
- Commit `ffd965a`.

## 3. Doc Tina×Astro réécrite (réponse question Simon) · #20

- **Constat** : `docs/36` décrivait l'approche **obsolète** (island React `client:load` + `output:server` + bridge serverless `/_tina/bridge.js`, basée Amploi). Tina (NOT installé dans waimia-web) a viré **sans-React** en mai 2026.
- **Sourcé releases GitHub** : `tinacms@3.8.0` (visual editing without React, bridge vanilla-JS ~2KB) ; `@tinacms/bridge@0.3.0` + `@tinacms/astro@0.3.0` (support `output:static`) ; `@tinacms/astro@0.4.0` (Astro 6). Dernières : astro 0.5.0, core 3.9.1.
- **Doc réécrit** sourcé (releases + PR + exemple officiel `examples/astro/visual-editing` @ tag 0.5.0) : registre `islands.ts`, endpoint unique `tina-island/[name].ts` (`prerender=false`), `requestWithMetadata`, `data-tina-island`/`data-tina-field`. Implications waimia-web (reste static, 1 endpoint serverless, 0 React visiteur, mapping section-registry → islands). Inclut la méthode `gh api` pour réinterroger les releases scopées.
- Commit `104cff8`. Mémoire : `tina-astro-no-react-visual-editing.md`.

## Discipline deploy

Batch local (835dcaa + ffd965a + 104cff8) ; **un seul push** sur `main` une fois `MAILERLITE_API_KEY` en env → un seul build active console + MailerLite + doc.
