# 21 — GF-1 sweep cloud · 57/57 previews de la bibliothèque

> Preuve empirique GF-1 (visuel) sur les **57 `/preview/<type>`** de la bibliothèque W6.
> Exécuté en session **cloud** (claude.ai/code) le 2026-06-02 · branche `claude/focused-bardeen-0GySr`.
> Harnais réutilisable : `scripts/gf1-cloud-sweep.mjs` + `scripts/serve-dist.mjs`.

## Résultat

**57 / 57 PASS** · 0 fail · 3 warnings non-bloquants (artefacts d'isolation preview, voir §Warnings).

Chaque preview est jugée PASS si, dans un vrai Chromium (viewport 1440×900) :
- HTTP 200 + section connue (registry+demo présents) ;
- la section rend du contenu **visible above-fold** (hauteur > 0, texte visible) ;
- l'élément de contenu principal (heading hero, ou 1er élément texte pour les sections non-hero)
  a **`opacity ≠ 0`** ET **`transform` neutre** (`none` / `matrix(1,0,0,1,0,0)`) — cœur de GF-1 ;
- **0 erreur JS** (`pageerror` / `console.error` hors ressource 4xx) ;
- screenshot above-fold capturé.

## Pourquoi ce harnais (contexte cloud)

En session cloud, le download Playwright est bloqué (`cdn.playwright.dev` hors allowlist → 403).
Mais un Chromium est **pré-installé** dans `/opt/pw-browsers/chromium-<build>/chrome-linux/chrome`.
`gf1-cloud-sweep.mjs` le détecte et lance Playwright via `executablePath` (cf `docs/20` §6 :
« pour Playwright/MCP en cloud, les déclarer dans un `.mcp.json` repo (non fait) » → ce harnais
est la réponse scriptée, sans MCP). L'adapter Vercel sort le build dans `dist/client/` ;
`serve-dist.mjs` sert ce dossier en respectant `trailingSlash: 'never'`.

### Reproduire

```bash
npx -y pnpm@9.15.0 build
node scripts/serve-dist.mjs --port 4321 --root dist/client &   # serveur statique
node scripts/gf1-cloud-sweep.mjs --base http://localhost:4321 \
  --dist-preview dist/client/preview --out /tmp/wmission/gf1-cloud-sweep
# exit 0 = 57/57 PASS · screenshots + summary.json dans --out
```

Le harnais est **surface-agnostique** : `--base https://<preview>.vercel.app` le pointe sur une
preview Vercel déployée (gate de pré-merge, cf §Gate Vercel) sans rien changer d'autre.

## Warnings (3) — artefacts d'isolation preview, NON défauts composant

Les pages `/preview/<type>` sont des fragments isolés (build catalogue, pas le site complet).
Trois previews chargent une ressource absente de ce build isolé — vérifié visuellement : le
composant rend correctement, seul un asset annexe 4xx.

| Preview | Ressource 4xx | Nature | Sur le site complet |
|---|---|---|---|
| `hero-author` | `/agence/team` | **prefetch** du lien breadcrumb (Astro `prefetchAll`) absent du build preview | résout (page existe) |
| `hero-landing` | `/offres/site-web-ia-tunnel` | **prefetch** du CTA absent du build preview | résout (page existe) |
| `media-block` | `/og/default.png` | image placeholder de la démo, non copiée dans le build isolé | résout (asset site-wide) |

Aucun n'affecte le rendu above-fold (heading/contenu `opacity:1`, `transform:none`).

## Gate Vercel (complément, avant merge `main`)

Ce sweep tourne sur le **build de production réel** (`dist/client`, bytes identiques à ceux servis
par Vercel) rendu dans un vrai navigateur — c'est une preuve GF-1 valide des composants. Le gate
formel de `docs/20` (P1 « GF-1 visuel exhaustif sur preview Vercel ») reste à exécuter en pointant
le **même** harnais sur l'URL de preview Vercel une fois la branche déployée :
`node scripts/gf1-cloud-sweep.mjs --base https://<preview>.vercel.app --dist-preview dist/client/preview`.

## Tableau de preuve (57/57)

| Type | Hauteur above-fold | Heading | opacity | transform | Verdict |
|---|---|---|---|---|---|
| `architecture-diagram` | 797px | oui | 1 | neutre | ✅ |
| `branded-callout` | 571px | oui | 1 | neutre | ✅ |
| `case-card-grid` | 1055px | oui | 1 | neutre | ✅ |
| `commitments-grid` | 511px | oui | 1 | neutre | ✅ |
| `comparison-table` | 556px | oui | 1 | neutre | ✅ |
| `cta-band` | 90px | non(non-hero) | 1 | neutre | ✅ |
| `cta-final` | 551px | oui | 1 | neutre | ✅ |
| `cta-inline` | 82px | non(non-hero) | 1 | neutre | ✅ |
| `editorial-preview` | 623px | oui | 1 | neutre | ✅ |
| `faq-accordion` | 540px | oui | 1 | neutre | ✅ |
| `feature-grid` | 460px | oui | 1 | neutre | ✅ |
| `guarantee-block` | 533px | non(non-hero) | 1 | neutre | ✅ |
| `hero-academy-hub` | 413px | oui | 1 | neutre | ✅ |
| `hero-author` | 556px | oui | 1 | neutre | ✅ ⚠️4xx |
| `hero-case-study` | 546px | oui | 1 | neutre | ✅ |
| `hero-centered` | 699px | oui | 1 | neutre | ✅ |
| `hero-conversion-funnel` | 1195px | oui | 1 | neutre | ✅ |
| `hero-course` | 474px | oui | 1 | neutre | ✅ |
| `hero-detail-menu` | 518px | oui | 1 | neutre | ✅ |
| `hero-essay` | 553px | oui | 1 | neutre | ✅ |
| `hero-full-bleed` | 787px | oui | 1 | neutre | ✅ |
| `hero-home` | 795px | oui | 1 | neutre | ✅ |
| `hero-hub-listing` | 520px | oui | 1 | neutre | ✅ |
| `hero-hub-masthead` | 653px | oui | 1 | neutre | ✅ |
| `hero-hub-stats` | 1172px | oui | 1 | neutre | ✅ |
| `hero-landing` | 916px | oui | 1 | neutre | ✅ ⚠️4xx |
| `hero-lead-magnet` | 826px | oui | 1 | neutre | ✅ |
| `hero-offer-detail` | 657px | oui | 1 | neutre | ✅ |
| `hero-pillar-hub` | 1128px | oui | 1 | neutre | ✅ |
| `hero-problem-index` | 882px | oui | 1 | neutre | ✅ |
| `hero-sector` | 704px | oui | 1 | neutre | ✅ |
| `hero-service-detail` | 688px | oui | 1 | neutre | ✅ |
| `hero-service-masthead` | 486px | oui | 1 | neutre | ✅ |
| `hero-split` | 699px | oui | 1 | neutre | ✅ |
| `hero-tech-layer` | 721px | oui | 1 | neutre | ✅ |
| `hero-tunnel-step` | 627px | oui | 1 | neutre | ✅ |
| `hero-utility-masthead` | 666px | oui | 1 | neutre | ✅ |
| `how-we-ship` | 3886px | oui | 1 | neutre | ✅ |
| `manifesto-block` | 1116px | non(non-hero) | 1 | neutre | ✅ |
| `marquee-band` | 56px | non(non-hero) | 1 | neutre | ✅ |
| `maturity-pyramid` | 1124px | oui | 1 | neutre | ✅ |
| `media-block` | 238px | non(non-hero) | 1 | neutre | ✅ ⚠️4xx |
| `method-timeline` | 890px | oui | 1 | neutre | ✅ |
| `newsletter-band` | 491px | oui | 1 | neutre | ✅ |
| `objection-handler` | 478px | oui | 1 | neutre | ✅ |
| `operating-layer` | 1279px | oui | 1 | neutre | ✅ |
| `pricing-table` | 660px | oui | 1 | neutre | ✅ |
| `problems-grid` | 653px | oui | 1 | neutre | ✅ |
| `proof-bar` | 270px | non(non-hero) | 1 | neutre | ✅ |
| `services-grid` | 943px | oui | 1 | neutre | ✅ |
| `social-proof` | 155px | non(non-hero) | 1 | neutre | ✅ |
| `spec-bar` | 123px | non(non-hero) | 1 | neutre | ✅ |
| `stat-block` | 482px | oui | 1 | neutre | ✅ |
| `testimonial-block` | 536px | oui | 1 | neutre | ✅ |
| `timeline-block` | 631px | oui | 1 | neutre | ✅ |
| `use-case-index` | 956px | oui | 1 | neutre | ✅ |
| `why-stalls` | 984px | oui | 1 | neutre | ✅ |

_Screenshots above-fold + `summary.json` (mesures `getComputedStyle` complètes par type) :
`/tmp/wmission/gf1-cloud-sweep/` (hors repo, éphémère — régénérable via la commande ci-dessus)._
