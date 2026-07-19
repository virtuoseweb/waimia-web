# FORK.md : créer un nouveau site à partir de ce repo

Ce repo (`waimia-web`) est conçu pour être forké : la marque, les secrets et les apps internes
sont centralisés dans quelques fichiers, pas éparpillés dans le code. Cette recette t'emmène
d'un fork GitHub à un site qui build avec ta propre identité en quelques minutes. Le contenu
éditorial (textes, cas clients, articles), lui, demande un vrai travail de rédaction et n'est
pas couvert par ce « quelques minutes ».

## Pré-requis

- Node ≥ 22.12.0 (`package.json:6`, champ `engines.node`)
- pnpm 9.15.0 (`npx -y pnpm@9.15.0 <cmd>` fonctionne sans installation globale)
- Un compte Vercel (déploiement) + éventuellement Resend / MailerLite si tu gardes les formulaires
- Un compte GitHub (fork)

## Étape 1 : fork, clone, build de contrôle

```bash
git clone <ton-fork>
cd waimia-web
npx -y pnpm@9.15.0 install
npx -y pnpm@9.15.0 build   # doit finir sur "Complete!"
npx -y pnpm@9.15.0 exec astro check   # baseline attendue : 8 erreurs pré-existantes (voir CLAUDE.md), ton fork ne doit en ajouter aucune
```

À ce stade le site build encore avec l'identité **Waimia**, c'est normal, rien n'a été changé.
C'est ton point de départ vérifié : tout ce qui suit part d'un build vert.

## Étape 2 : identité de marque, `src/site.config.ts`

Toute l'identité de marque vit dans un seul objet `SITE` (`src/site.config.ts:16-51`).
Pas de `.env` pour ça : ce sont des données de marque versionnées, pas des secrets.

Chaque champ, vérifié par grep sur son usage réel dans le code (35 fichiers au total) :

| Champ | Pilote | Où (vérifié) |
| --- | --- | --- |
| `url` | URL canonique Astro (`site:` config), OG, JSON-LD, sitemap, host robots.txt | `astro.config.mjs` (`site: SITE.url`, `SITE_HOST = new URL(SITE.url).host`) |
| `name` | Nom de marque public (H1, watermark OG, JSON-LD `name`) | `src/lib/seo.ts`, `src/lib/seo/schema-builder.ts`, `src/layouts/Base.astro` |
| `legalName` | Raison sociale (JSON-LD `legalName`/`alternateName`) | `src/lib/seo/schema-builder.ts` |
| `email` | Email de contact public (JSON-LD Organization `email`), fallback reply-to email | `src/lib/seo/schema-builder.ts`, `src/lib/resend.ts` (fallback `EMAIL_REPLY_TO`) |
| `emailFrom` | Expéditeur transactionnel par défaut si `EMAIL_FROM` env absente/malformée | `src/lib/resend.ts` (`resolveEnvOrSite`) |
| `tel` / `telE164` | Téléphone JSON-LD (format lisible / E.164) | `src/lib/seo/schema-builder.ts` |
| `vatID` | TVA intracommunautaire JSON-LD | `src/lib/seo/schema-builder.ts` |
| `foundingDate` | Date de fondation JSON-LD | `src/lib/seo/schema-builder.ts` |
| `streetAddress`/`postalCode`/`city`/`region`/`country` | Adresse postale JSON-LD `PostalAddress` | `src/lib/seo/schema-builder.ts` |
| `themeColor` | `<meta name="theme-color">` | `src/layouts/Base.astro` |
| `sameAs` | Profils sociaux JSON-LD `sameAs` (tableau) | `src/lib/seo/schema-builder.ts` |
| `linkedin` | Raccourci LinkedIn (footer, pages équipe/agence) | `src/components/footer/Footer.astro`, `src/pages/equipe/index.astro` |
| `twitter.handle` / `twitter.url` | Compte X/Twitter (meta `twitter:site`, lien footer) | `src/layouts/Base.astro`, `src/components/footer/Footer.astro` |
| `youtube` | Chaîne YouTube (lien footer) | `src/components/footer/Footer.astro` |
| `cal.username` / `cal.event` | Défauts du widget de réservation Cal.com | `src/components/ui/molecules/CalEmbed.astro:44-45` |

`name` pilote aussi l'`og:site_name` (meta OpenGraph, `src/layouts/Base.astro`) et le copyright du
footer (`© {year} {SITE.name}`, `src/components/footer/Footer.astro`), désormais dérivés au lieu
d'être en dur.

Édite ces valeurs directement dans `src/site.config.ts`. Rebuild pour vérifier (`astro check` +
`build`) : aucune erreur ne doit apparaître.

⚠️ **Incohérence connue à corriger toi-même en forkant** : `src/pages/contact.astro:89` a un
lien LinkedIn en dur (`https://linkedin.com/company/waimia`, sans `www.`) au lieu de dériver de
`SITE.linkedin` (qui, lui, contient `www.`). C'est un wart legacy du site Waimia, à remplacer par
`SITE.linkedin` (ou ta propre URL) en même temps que tu édites `site.config.ts`.

## Étape 3 : secrets & config runtime, `.env`

```bash
cp .env.example .env
```

`.env.example` documente chaque variable avec sa console d'origine. Vérifié contre le code qui
les lit (`src/lib/resend.ts`, `src/lib/mailerlite.ts`, `astro.config.mjs`) :

| Variable | Rôle | Obligatoire pour... |
| --- | --- | --- |
| `RESEND_API_KEY` | Clé API Resend (envoi transactionnel) | Les 5 endpoints `/api/{contact,newsletter,devis,academy,lead-magnet}.ts` : sans elle, `console.error` en prod et l'envoi échoue silencieusement côté Resend |
| `RESEND_AUDIENCE_ID` | Audience Resend pour l'inscription newsletter | Endpoint `/api/newsletter.ts` |
| `EMAIL_FROM` | Expéditeur transactionnel (`"Nom <email@domaine>"`, domaine vérifié Resend) | Fallback = `SITE.emailFrom` si absente/vide/malformée (`src/lib/resend.ts` `resolveEnvOrSite`) |
| `EMAIL_REPLY_TO` | Adresse reply-to humaine | Fallback = `SITE.email` |
| `EMAIL_INTERNAL_TO` | Adresse interne pour alertes lead chaud | Idem pattern fallback |
| `MAILERLITE_API_KEY` | Clé API MailerLite (upsert audience/drip, non-bloquant) | Si absente : `src/lib/mailerlite.ts` skip proprement, pas d'erreur |
| `PUBLIC_CAL_USERNAME` / `PUBLIC_CAL_EVENT_TYPE` / `PUBLIC_CAL_NAMESPACE` | ⚠️ **Vestiges**, plus lues par le code depuis le 2026-06-12 | `CalEmbed.astro:36-42` : ces env vars ont introduit un bug de parsing (`\n` littéral saisi dans l'UI Vercel, URL cassée) et ont été remplacées par `SITE.cal.*` (constantes TS versionnées, 0 env var). `.env.example` ne les a pas retirées, ignore-les et édite `SITE.cal` dans `site.config.ts` à la place |
| `PUBLIC_SITE_URL` | URL canonique utilisée dans les liens des emails transactionnels | `src/lib/emails/*.ts` |
| `NOTION_TOKEN` | Optionnel, pipeline Notion → Astro (si tu l'actives) | n/a |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Optionnel, rate-limiting forms ; fallback in-memory gracieux si absentes | `src/actions/_shared.ts` |
| `ISR_BYPASS_TOKEN` | Optionnel, bypass cache ISR sur preview Vercel | `astro.config.mjs` (`adapter: vercel({ isr: { bypassToken } })`) |

## Étape 4 : apps internes, `src/apps.config.ts`

Les outils internes (dashboard SEO, DS Studio, builder de pages) sont déclarés comme des
« apps-as-plugins » dans un registre unique, activables/désactivables sans toucher au reste du
code (`src/apps.config.ts:16-19` documente la convention).

- **Activer/désactiver une app existante** : bascule son champ `enabled` dans `APPS`, rien
  d'autre à éditer. `enabled: true` + `integration` présente donne une route injectée (200) ;
  `enabled: false` retire la route (404).
- **Ajouter une nouvelle app** (recette déjà rodée pour `seoDashboard`, `src/apps.config.ts:20-27`) :
  1. Créer `packages/apps-<nom>/` (modèle : `packages/apps-seo-dashboard/`) avec un
     `package.json` + une page entrypoint `.astro` + les composants (imports vers l'app hôte
     en chemin relatif `../../../src/...`).
  2. Écrire `integration.mjs` qui appelle `injectRoute({ pattern, entrypoint: new URL('./src/<Page>.astro', import.meta.url), prerender: true })` (mécanisme officiel Astro).
  3. Dans `src/apps.config.ts` : importer l'intégration et ajouter une entrée
     `{ enabled: true, integration: monApp() }` dans `APPS`.
  4. Rien d'autre : `astro.config.mjs` récolte automatiquement via `enabledAppIntegrations`
     (`astro.config.mjs` importe `enabledAppIntegrations` depuis `apps.config.ts`).

Deux apps (`dsStudio`, `builder`) sont déclarées en **façade** (`facade: true`, pas
d'`integration`) : elles existent et sont actives, mais leur code n'a pas encore été extrait en
package, elles sont servies par leurs fichiers actuels sous `src/pages/library/*`.

## Étape 5 : contenu

Le contenu vit dans des collections Astro **JSON** sous `src/content/**` (18 dossiers :
`blog/`, `cas-usages/`, `cases/`, `secteurs/`, `services/`, `lp/`, `implantations/`, `guides/`,
`diagnostics/`, `outils/`, `comparatifs/`, `authors/`, `legal/`, `ecole/`, `audits/`, etc.),
définies dans `src/content.config.ts`. **0 fichier `.mdx`** : la doctrine du repo est
« template-as-data », chaque page est un JSON de contenu résolu par un template déclaratif
(`src/lib/templates/{case-study,sector,essay}.ts` + moteur `packages/ds-kernel/src/templates/`).

Pour un fork, deux façons de fabriquer du contenu :
1. **Éditer/dupliquer un JSON** existant dans `src/content/<collection>/` en suivant son schéma
   (`src/content.config.ts`). C'est la voie la plus rapide pour remplacer un cas client, un
   article ou une page secteur.
2. **Composer une page visuellement** via le builder (`/library/builder`, app façade décrite
   à l'étape 4) qui assemble des sections du catalogue DS et enregistre le résultat en JSON
   (`src/data/page-variants/<slug>.json` en dev).

Le contenu existant (textes, cas, avis) appartient à Waimia, voir « Limites connues » ci-dessous.

## Étape 6 : déploiement Vercel

1. Importer le repo forké dans Vercel (`vercel.com/new` ou `vercel link`).
2. Renseigner les env vars de l'étape 3 dans `Project Settings → Environment Variables`
   (noms exacts : `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `EMAIL_FROM`, `EMAIL_REPLY_TO`,
   `EMAIL_INTERNAL_TO`, `MAILERLITE_API_KEY`, `PUBLIC_SITE_URL`, et les optionnelles
   `NOTION_TOKEN` / `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` / `ISR_BYPASS_TOKEN`).
   ⚠️ Astro 6 inline `import.meta.env` **au build** : ces variables doivent être présentes
   *avant* le premier build, pas juste au runtime.
3. Vérifier que `PUBLIC_SITE_URL` et `SITE.url` (étape 2) pointent bien vers ton domaine final.
4. Connecter ton domaine dans `Project Settings → Domains`.
5. Build command par défaut Vercel (`astro build`) fonctionne tel quel : le
   `prebuild` (génération d'agrégats de sections) est déjà chaîné dans `package.json`.

## Limites connues du fork v0 (honnêteté totale)

Ce repo n'a pas été « désaimanté » de Waimia, il a été rendu forkable sur l'identité et
l'infrastructure (lots L1-L4), pas sur le contenu et la nav. Vérifié point par point :

- **Wordmark du header (`src/components/header/Header.astro`)** : le logo texte
  « Waim*i*a. » (italique médian stylisé) est un **actif de marque**, pas une chaîne dérivable
  de `SITE.name` ; un fork le remplace comme il remplacerait un logo SVG. L'`aria-label`, lui,
  suit `SITE.name` (constat de la démo réelle solstice-web-demo, 2026-07-19).
- **`src/data/mega-menu.ts` (948 lignes)** : structure du mega-menu **hardcodée** pour
  l'architecture de site Waimia (labels, routes, panneaux « détail » par module, contenu
  curé). Ce n'est pas piloté par `SITE` : un fork qui change de gamme de services ou
  d'architecture d'offres doit **réécrire ce fichier** (balisé en tête, cf commentaire ajouté).
- **`src/content/**` (18 collections JSON)** : contenu éditorial 100 % Waimia (cas clients,
  articles de blog, pages secteurs, avis). Un fork doit remplacer ce contenu, pas juste
  l'identité de marque, c'est la partie qui prend du temps (rédaction), pas des minutes.
- **Liens Cal.com en dur dans le contenu** : 18 fichiers `src/content/**/*.json` (LP, blog,
  comparatifs, implantations) contiennent des URLs `cal.com/simonberos/...` en clair dans le
  corps JSON (pas de token de marque pour un lien de réservation dans du contenu éditorial),
  à repasser en revue si tu remplaces le calendrier.
- **Prose éditoriale au ton et à la voix Waimia** : la voix éditoriale (registre, exemples,
  références sectorielles) est écrite pour le positionnement Waimia ; un fork qui change de
  marché doit réécrire, pas juste retexturer.
- **Incohérence LinkedIn `contact.astro:89`** : cf étape 2, lien en dur sans `www.` qui diverge
  de `SITE.linkedin`. À corriger en même temps que l'identité.
- **`.env.example` contient 3 variables mortes** (`PUBLIC_CAL_USERNAME`/`PUBLIC_CAL_EVENT_TYPE`/
  `PUBLIC_CAL_NAMESPACE`) : plus lues par le code depuis que `CalEmbed.astro` dérive de
  `SITE.cal` (cf étape 3). Ne pas perdre de temps à les renseigner.

## Gate à respecter si tu ajoutes du contenu

`node scripts/check-no-emdash.mjs` doit rester PASS (0 tiret cadratin U+2014 dans le contenu
visible), le gate tourne déjà en CI/build local, aucune config à ajouter pour un fork.
