# Waimia · site `waimia.com`

Site vitrine de **Waimia** — agence IA experte Claude. Dépôt **standalone** (anciennement extrait d'un monorepo) : Astro 6 en génération statique avec quelques routes serveur (`/api/*`) servies par des Vercel Functions, React 19 pour les îlots interactifs, Tailwind 4 pour le design system.

> Production : **<https://waimia.com>** · Org GitHub : **`virtuoseweb`** · Dépôt : **`virtuoseweb/waimia-web`**

## Prérequis

- **Node** : version épinglée dans [`.nvmrc`](.nvmrc) (`22.12.0`). Avec `nvm` : `nvm use`. Le `package.json` exige `node >= 22.12.0`.
- **pnpm** : version épinglée via `packageManager` dans `package.json` (`pnpm@9.15.0`). L'installer via Corepack : `corepack enable && corepack prepare pnpm@9.15.0 --activate` (ou `npm i -g pnpm@9.15.0`).

## Démarrage rapide

```bash
git clone https://github.com/virtuoseweb/waimia-web.git
cd waimia-web

pnpm install            # installe les dépendances (racine du repo, pas de monorepo)
cp .env.example .env    # puis remplir les clés (voir « Variables d'environnement »)
pnpm dev                # http://localhost:4321
```

## Scripts

Toutes les commandes se lancent **depuis la racine du dépôt**.

| Script             | Commande                | Description                                                        |
| ------------------ | ----------------------- | ------------------------------------------------------------------ |
| `pnpm dev`         | `astro dev`             | Serveur de développement (`http://localhost:4321`).                |
| `pnpm build`       | `astro build`           | Build de production → `dist/` + sortie Vercel.                     |
| `pnpm preview`     | `astro preview`         | Sert localement le build de production.                            |
| `pnpm check`       | `astro check`           | Vérification types + diagnostics Astro (alias : `pnpm typecheck`). |
| `pnpm format`      | `prettier --write ...`  | Formate `src/**/*.{astro,ts,tsx,js,jsx,md,json}`.                  |
| `pnpm test:e2e`    | `playwright test`       | Tests end-to-end Playwright.                                       |
| `pnpm lint`        | *(stub)*                | ⚠️ Non implémenté pour l'instant — ESLint à ajouter (TODO).        |
| `pnpm clean`       | `rm -rf dist .astro ...` | Nettoie les artefacts de build.                                    |

> ⚠️ **`pnpm lint` est aujourd'hui un stub** (il affiche seulement un message « lint TBD »). Ne pas s'y fier comme barrière qualité tant qu'ESLint n'est pas configuré.

## Architecture

Génération **`output: 'static'`** (SSG) configurée dans [`astro.config.mjs`](astro.config.mjs), avec l'adapter [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) qui sert les routes dynamiques `/api/*` en Vercel Functions (`prerender = false`). Les pages de contenu sont des fichiers statiques immuables sur le CDN.

```
src/
├── pages/            Routes Astro (.astro / .ts). FR à la racine, EN sous /en/*.
│   ├── api/          Endpoints serveur (Vercel Functions) — ex. healthcheck, og.png
│   ├── agence/  cas/  offres/  solutions/  secteurs/  ressources/  ecole/  …
│   ├── preview/      Catalogue : /preview/[type]
│   ├── components/   Catalogue : /components/[type]
│   └── categories/   Catalogue : /categories/[slug]
├── components/       Composants UI
│   ├── sections/     Sections composables du Design System (1 .astro par type)
│   ├── library/      Briques de la bibliothèque de blocs
│   ├── templates/    Templates de page
│   ├── ui/           Atomes / molécules
│   ├── header/  footer/  editorial/  motion/  seo/  svg/
├── content/          Content collections (MDX + Zod) : blog, cases, glossary, personas, …
├── content.config.ts Schémas Zod des collections de contenu
├── schemas/          Schémas des sections du Design System (sections.ts)
├── lib/              Logique partagée : section-registry, section-demos, emails, seo, animations
├── layouts/          Layouts de page
├── data/             Données structurées partagées
├── actions/          Astro Actions
├── integrations/     Intégrations Astro custom
├── middleware.ts     Middleware Astro
└── styles/           Tokens CSS + styles globaux (Tailwind 4, @theme)
```

### Design System — bibliothèque de sections (DS figé)

Catalogue de sections composables. Chaque **type de section** est synchronisé sur **4 touchpoints** (sinon le build casse) :

1. Schéma — `src/schemas/sections.ts` (`z.object` + `discriminatedUnion` + union `SectionType`)
2. Démos — `src/lib/section-demos.ts` (données bilingues fr/en)
3. Registry — `src/lib/section-registry.ts` (import + entrée `SECTIONS`)
4. Composant — `src/components/sections/*.astro`

Le DS est **figé** : on catalogue / compose l'existant, **zéro nouveau token CSS**, pas de modification des templates ou pages live sans tâche dédiée. Pages de catalogue : `/agence/design-system`, `/preview/[type]`, `/components/[type]`, `/categories/[slug]`.

## Intégrations

- **Resend** — emails transactionnels (formulaires, newsletter).
- **Upstash** — rate-limiting des endpoints (`@upstash/ratelimit` + `@upstash/redis`).
- **Cal.com** — embed de réservation (`@calcom/embed-react`).
- **GSAP**, **astro-seo**, **astro-robots-txt**, **@astrojs/sitemap**, **@astrojs/rss**, **MDX** — motion, SEO, syndication.

## Build & déploiement

- **Plateforme** : Vercel, projet `waimia-web`.
- **Production** : push sur `main` → build Vercel → **<https://waimia.com>**.
- **Preview** : chaque branche / PR génère un déploiement de prévisualisation (ex. `https://waimia-web.vercel.app`).
- Commande d'install / build Vercel : voir [`vercel.json`](vercel.json) (pnpm 9.15.0).
- Le déploiement est géré par Vercel — il n'est **pas** déclenché par la CI GitHub (voir `.github/workflows/ci.yml`, qui ne fait que valider).

Avant tout push, valider en local :

```bash
pnpm check    # 0 erreur attendu (voir note ci-dessous)
pnpm build    # doit terminer sans erreur
```

> **Note** : `pnpm check` (astro check) remonte actuellement un lot d'erreurs pré-existantes (de l'ordre de ~40, liées au contenu et aux schémas). Elles sont connues et hors périmètre de ce dépôt-doc ; les corriger fait l'objet de tâches dédiées. Ne pas considérer un `check` non vierge comme un blocage introduit par votre PR si le différentiel ne touche pas ces fichiers.

## Variables d'environnement

Ne committez **jamais** de secret. Copiez le modèle et remplissez-le localement :

```bash
cp .env.example .env
```

Les clés attendues (Resend, Upstash, Cal.com, `PUBLIC_SITE_URL`, adresses email de contact, Notion optionnel) sont documentées dans [`.env.example`](.env.example). En production, ces valeurs sont configurées dans le dashboard Vercel du projet `waimia-web`, pas dans le code. `.env` est gitignored.

## Dépôts liés

| Dépôt                       | Rôle                                              |
| --------------------------- | ------------------------------------------------- |
| **`virtuoseweb/waimia-web`** | Ce site → **`waimia.com`** (ce dépôt).            |
| `virtuoseweb/waimia-cal`    | Calendrier auto-hébergé → `cal.waimia.com` (séparé). |

## Modèle de branches & contribution

- `main` = production (protégée). Ne jamais pousser directement dessus.
- `feat/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*` pour le travail courant.
- Toute modification passe par une **Pull Request** vers `main`.

Voir [`CONTRIBUTING.md`](CONTRIBUTING.md) pour le workflow complet (conventions de commit, process PR, exigence de preuve).

## Liens utiles

- Site en production : <https://waimia.com>
- Documentation Astro : <https://docs.astro.build>
- Documentation interne projet : dossier [`docs/`](docs/)

## Licence

Propriétaire — Waimia 2026.
