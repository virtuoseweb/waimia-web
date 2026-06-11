# SR-2026-06-11-47 · Split locale des essais bilingues + découverte quota Vercel Hobby

> Tête de queue it.6 : le corps MDX bilingue (FR + `---` + EN) était rendu EN ENTIER sur les 2 locales de chaque essai (anglais sous le français page FR, hauteur ×2, TOC bilingue). Pré-existant site-wide, découvert pendant le fix reveal it.5.

## Fix (worker essaysplit, mergé `c887a71`, commit `bb9c1b6`)

- **Audit décisif** : les 11 essais bilingues ont exactement **1 `<hr>` racine** = frontière FR→EN ; 0 hr interne ailleurs ; les contenus FR-only (field-notes, veille) ont 0 hr racine → split au 1er hr universellement sûr, **0 MDX touché**.
- **Mécanisme** : split du HTML rendu au build. Helper `src/lib/blog-locale-split.ts` (`splitLocaleHtml` : FR = avant le hr, EN = après, hr retiré, repli sans-hr = tout rendu ; `filterHeadingsForHtml` pour TOC/a11y par locale). `EssayTemplate.astro` : `Astro.slots.render('body')` → split → `set:html` ; TOC recalculé sur les headings localisés ; AuthorByline sorti du slot (props `bylineAuthorSlug`+`publishedAt`, sinon perdu côté EN). CSS `display:none` rejeté (DOM+SEO pollués), Container API rejeté (expérimental).
- 22 routes corrigées (11 FR + 11 EN). Prose ≈ divisée par 2 (pillar 39,5 Ko → 21/18,6).

## Preuves (orchestrateur, rule 09)

- Post-merge : astro check `0 errors` + build `Complete!` + 7 gates PASS.
- GF-1 local (harness indépendant, desktop 1440 + mobile 390, scroll lent) : 0 fuite EN sur 2 pages FR (sondes « The first layer », « We used Zapier ») ; page EN débute en anglais, 0 fuite FR ; TOC 100 % localisés des deux côtés (8 entrées FR vs 8 EN distinctes) ; prose opacity 1 partout ; 0 hr résiduel ; 0 reveal caché ; bas de page FR = newsletter française (avant : corps anglais).

## 🛑 Incident : quota Vercel Hobby épuisé (cause-racine des « webhooks muets »)

- Pushes `9c25e34`/`4839398`/`c887a71`/`0e12a59` : **aucun deployment créé**. Le remède commit-vide ne marche plus.
- Diagnostic : POST API `v13/deployments` → **402 `payment_required`, `api-deployments-free-per-day` remaining 0/100**, reset 2026-06-12 ~16h00 CEST. Le plan Hobby plafonne à 100 deploys/jour ; la cadence d'orchestration (2 sessions parallèles) l'a saturé. L'incident « webhook muet » du SR-46 était le début de la saturation.
- **Mode dégradé acté** (ORCH-STATE + lessons.md) : prod gelée sur `1e61599` (état it.5 validé, sain). Vagues continuent en local (GF-1 serve-dist), s'empilent sur main. Au reset : un trigger, déploiement consolidé, GF-1 prod complet (split inclus).
- Upgrade Pro lèverait la limite : paiement → décision Simon.

## Vague suivante (lancée)

C1' différenciation finance-compta / services-b2b : diagnostic subagent = les 2 pages partagent le même set de 4 blocs recompo (seule une permutation les distingue) ; cible = silhouettes uniques par secteur (finance + metric-shift clôture, services + method-timeline 90 jours, industrie inchangé), data-only dans `RECIPES`. Worker en cours, worktree `sectordiff`.
