# Handoff Waimia — Bootstrap session fresh (MAJ 2026-06-01)

> **À LIRE EN PREMIER au démarrage de toute nouvelle session Waimia.**
> Source de vérité du point d'arrêt. Reconstruit le 2026-06-01 après audit complet des
> branches (lecture seule, prod intacte). Remplace le handoff du 2026-05-17/18.

---

## ⭐ Plan directeur 2026-06-01 — migration POLYREPO (gouverne la reprise)

**Décision Simon** : `apps/web` devient un **repo standalone propre** (`virtuoseweb/waimia-web`) que Vercel build au push. Le monorepo `waimia-v2` devient un **agrégateur léger** (submodules) pour centraliser sur GitHub sans alourdir. ADR complet : [`../../docs/architecture.md`](../../docs/architecture.md).

Blocs (ordre verrouillé anti-rework — consolider AVANT d'extraire) :

| Bloc | Tâche | Gate | Statut |
|---|---|---|---|
| 0 | ADR + docs cible | — | ✅ 2026-06-01 |
| A | M05 SEO (§3) | build → `dist/llms*.txt` | ☐ |
| B | Consolider Sessions 01-06 (§4.2) | build + Playwright (rule 40/33) | ☐ |
| C | Extraire apps/web → `waimia-web` (subtree split + `pnpm install` + build) | build vert | ☐ |
| D | Vercel relink `waimia-v2` → `waimia-web` (root `.`) | preview 200 + Playwright | ☐ (OAuth = Simon) |
| E | Monorepo → submodules + docs | clone léger vérifié | ☐ |
| F | Cleanup branches (§6) | — | ☐ |

> `apps/web` est **self-contained vérifié** (name déjà `waimia-web`, 0 dep workspace) → extraction propre.

---

## 0. Garde-fous compte (ne JAMAIS confondre avec Amploi)

| | **Waimia** (ce repo) | Amploi (NE PAS toucher) |
|---|---|---|
| Repo local | `/Users/simonberos/waimia-site/site` | `/Users/simonberos/Developer/amploi-project/amploi-astro` |
| GitHub | `virtuoseweb/waimia-v2` | `vigiscope-site/amploi-astro` |
| Vercel org | `team_Dz7XreG9vf9VoKmxeaAsIKF0` | `team_EyhJ4VT8pZp4nhnfW59WlUCd` |
| Projets Vercel | `waimia-v2` (waimia.com) · `waimia-v2-cal` (cal.waimia.com) | `amploi-astro` |

**`main` → waimia.com en prod.** Toute branche `feat/*` n'est PAS déployée en prod.

---

## 1. État global — deux chantiers distincts

| Chantier | Domaine | État |
|---|---|---|
| **apps/cal** (cal.waimia.com) | Booking + email | ✅ **CLOS** — PRs #1-6 mergées dans `origin/main`, déployé, pipeline email validé E2E (Resend HTTPS + `normalizeFromAddress`). Rien à reprendre. |
| **apps/web** (waimia.com) | Le SITE design/SEO/pages | 🟡 **EN COURS** — Sessions 01-06 livrées mais **NON-MERGÉES** (3 branches parallèles). M05 SEO reste. `main` est en retard. |

**Où on s'était arrêté** : Phase 4 SEO/GEO, mission **M05 rate-limited** (jamais faite), puis cutoff usage 5h le 17-18 mai. Depuis, seul le chantier cal a avancé (clos).

---

## 2. Topologie branches (audit empirique 2026-06-01)

`main` (= `origin/main`) tip = `5b57257` (batch-d, 17 mai). **Tout le travail Sessions 01-06 est sur 3 branches non-mergées** partageant une base commune de 19 commits, puis divergeant :

| Branche | Travail propre au sommet | ahead/main | Verdict |
|---|---|---|---|
| `feat/phase-1-design` ⭐ | Session-04 **SEO** M01-M04 (+ base 01-03) | 25 | **TRONC** — branche de reprise |
| `feat/phase-5-drifts` | Session-05 **nettoyage** (pages legacy, ressources data-driven) | 22 | Consolider dans le tronc |
| `feat/phase-6-pages` | Session-06 **pages** (About, Méthode, trust-center, welcome) | 22 | Consolider dans le tronc |
| `feat/api-to-actions` | Migration 5 routes API → Astro Actions (type-safe) | 1 | **PARK** — base candidate Session-07. Basée sur commit scope-creep reverté. Ni merge ni delete. |
| `feat/megamenu-v2-cabling` | doublons rebasés (batch-c, header) | 5 | 🗑️ DELETE — canoniques déjà dans le tronc |
| `feat/megamenu-v3-simplification` | doublon rebasé (`54da7e4` = `cdc4a0c`) | 10 | 🗑️ DELETE — idem |
| `hero-v8-attempt-1` | essai hero v8 (stale, 14 mai) | 3 (behind 109) | 🗑️ DELETE-pending — check visuel 2 min d'abord |

**19 branches avril** (`refactor/*`, `refonte/*`, `monorepo-pivot`, `feat/*` ère handoff2) = fully merged dans main → DELETE sûr.
**Résidus remote PRs cal squash-mergées** (`origin/chore/cal-from-test`, `origin/docs/architecture-monorepo`, `origin/docs/cal-runbook-13.16`, `origin/docs/cal-runbook-13.17`, `origin/fix/cal-resend-from-format`, `origin/fix/cal-smtp-resend-sdk`) → DELETE remote sûr.

> **Pourquoi rien n'a été mergé dans main** : gel de merge documenté (« ne pas merger Phase 1 avant que l'autre agent finisse `feat/api-to-actions` — collision forms »). Ce gel est désormais **levable** : api-to-actions est isolé (1 commit parqué), il ne bloque plus la consolidation 01-06.

---

## 3. Mission M05 SEO — action immédiate

**Vérifié empiriquement 2026-06-01** : `apps/web/src/integrations/` n'existe pas, aucune trace de `astro-llms-txt` dans `astro.config.mjs`/`package.json` → **M05 = 0 %**. Le `llms.txt` actuel est la version manuelle de M02 (14 KB).

⚠️ Les briefs `/tmp/codex-missions/sessions/session-04-seo-geo/` ont été **effacés par le reboot V19**. Reconstruction (~15 min) depuis l'essentiel ci-dessous.

**Objectif M05** : remplacer le `llms.txt` manuel par génération auto + pages `.md` par route.

**Étapes (sur `feat/phase-1-design`)** :
1. `cd apps/web && pnpm add @4hse/astro-llms-txt` (plugin npm public v1.0.5)
2. Récupérer l'intégration custom de référence (éprouvée sur l'autre site VirtuoseWeb) :
   `mkdir -p apps/web/src/integrations && gh api /repos/virtuoseweb/sitewebastro/contents/src/integrations/llms-md-pages.ts --jq .content | base64 -d > apps/web/src/integrations/llms-md-pages.ts`
   (302 lignes, HTML→MD regex, zéro dépendance)
3. Modifier `apps/web/astro.config.mjs` : ajouter `@4hse/astro-llms-txt` (docSet llms-full/llms-small, promote solutions/agence/contact/methode) + l'intégration custom `llms-md-pages`
4. `rm apps/web/public/llms.txt` (sera auto-généré)
5. `pnpm build` → vérifier `dist/llms.txt`, `dist/llms-full.txt`, `dist/llms-small.txt`, `dist/**/*.md`
6. Commit `seo(m05): @4hse/astro-llms-txt + llms-md-pages custom` + push
7. Clôture Phase 4 SEO/GEO (5/5) → cocher M05 dans doc 16

**Délégation** : worker Codex GPT-5 si dispo, sinon T2/T3 worker Claude (rule 41). Scope ~300 LoC config+intégration → worker, pas Opus direct (GF-2).

---

## 4. Plan d'exécution session fresh (ordre)

1. **M05** (§3) → clôture Phase 4 SEO.
2. **Lever le gel + consolider Sessions 01-06** vers `main` :
   - Stratégie : merger `feat/phase-5-drifts` puis `feat/phase-6-pages` dans `feat/phase-1-design` (base commune → conflits limités aux commits de tête), OU branche d'intégration `feat/site-ready-consolidation`.
   - **Gates AVANT merge vers main** : `pnpm build` vert (rule 40, multi-branches) + Playwright above-fold + `getComputedStyle()` H1/CTA home FR/EN (rule 33 + GF-1) + `pnpm exec astro check`.
   - `npm install`/`pnpm install` si `package.json` change pendant le merge (rule 27).
3. **Nettoyage branches** (commandes §6) — après consolidation.
4. **Arbitrage Simon** : `feat/api-to-actions` revive (Session-07) ou drop ? `hero-v8-attempt-1` garder le design ou delete ?
5. Reprendre le **Master Plan Site-Ready** (doc 35) : rendering final (T14.2e-h), DS showcase + CI lock (T14.3/T14.5), CSS coherence (T14.4a-d), QA finale (T13).

---

## 5. Reste à faire « Site Ready » (doc 35 — 14 gates)

Buckets restants (IDs détaillés dans `docs/16-EXECUTION-TRACKER.md`) :
- **Rendering final** : `output: 'static'` (T14.2e), audit prerender/ISR (T14.2f-h)
- **Design System closure** : showcase complet FR/EN (T14.3d/e), audit islands (T14.3g), snapshots Playwright (T14.3h), **CI lock composant non-showcasé** (T14.5d/e)
- **CSS coherence** : audit inline/hardcoded → tokens (T14.4a-d, doc 30 à créer)
- **QA finale** : Lighthouse 10 pages (T13.3), schema.org validator (T13.4), Playwright 20 pages, preview Vercel verte (T13.9/10)
- **Contenu business** : blog pillar 4/5 restants (T9.1), 20 articles cluster (T9.2), cookbooks (T9.3), livres blancs (T9.6), produits/abonnements MDX (T9.8/9)
- **Conversion infra (Session-07)** : forms typés + BotID, quiz A/B, Stripe Payment Links + Customer Portal (T6.x ; base possible = `feat/api-to-actions`)
- **Telemetry (Session-08+)** : Vercel Analytics/Speed Insights/Sentry
- **Sessions 08/09/10** : content pillar / page audits Simon-grade 14 axes / QA lock CI → placeholders à briefer

---

## 6. Commandes nettoyage branches (exécution délibérée)

```bash
cd /Users/simonberos/waimia-site/site

# Doublons / essais (LOCAL) — après vérif visuelle hero-v8
git branch -D feat/megamenu-v2-cabling feat/megamenu-v3-simplification hero-v8-attempt-1

# 19 branches fully-merged (LOCAL) — sûr
for b in chore/code-review-followup feat/conversion-resend-cal feat/direction-switcher-routes \
  feat/footer-dev-index feat/handoff2-complete feat/hub-landings-composition feat/logo-headline-hover \
  feat/phase-d-remaining feat/phase-g-fixes feat/templates-handoff2 feat/templates-validation-phase \
  fix/cursor-progress-deduplication fix/header-uniform monorepo-pivot refactor/atomic-components \
  refactor/atomic-deep refactor/atomic-rigorous refactor/clean-architecture refonte/v2-direction-apparatus; do
  git branch -d "$b"
done

# Résidus remote PRs cal squash-mergées (REMOTE) — sûr
for b in chore/cal-from-test docs/architecture-monorepo docs/cal-runbook-13.16 \
  docs/cal-runbook-13.17 fix/cal-resend-from-format fix/cal-smtp-resend-sdk; do
  git push origin --delete "$b"
done
```

⚠️ NE PAS supprimer : `feat/phase-1-design`, `feat/phase-5-drifts`, `feat/phase-6-pages`, `feat/api-to-actions`, `main`.

---

## 7. Pointeurs persistants

- **Master Plan** : `apps/web/docs/35-MASTER-PLAN-SITE-READY.md` (8 phases, 14 gates Site Ready)
- **Tracker** : `apps/web/docs/16-EXECUTION-TRACKER.md` (Tiers T1-T14, réconcilié 2026-06-01)
- **Master Index persistant** : `~/.claude/projects/-Users-simonberos/memory/project_waimia_master_index_persistent.md` (auto-chargé)
- **Architecture monorepo** : `docs/architecture-monorepo.md` · **Runbook cal** : `docs/cal-deploy-runbook.md`
- **Recipe pattern V1** : `~/.claude/recipes/astro-tina-site-v1.md`
- **Tracking pages** : `apps/web/docs/12-PAGES-QUALITY-TRACKING.md` · **Contrat DS** : `docs/28-DESIGN-SYSTEM-CONTRACT.md`
- Audits : `docs/31` (composants) · `docs/32` (templates) · `docs/33` (pages taxonomie) · `docs/34` (verdicts ambigus)

## 8. Stack rappel

Astro 6.1.9 SSR git-based CMS · React 19 · Tailwind 4 · pnpm workspaces + Turbo · `apps/cal` exclu (Yarn Berry). Build : `pnpm build` (PAS `astro check` seul — rule 40). DS figé → composition (rule 28).

---

## Annexe — Historique commits SEO Phase 4 (sur `feat/phase-1-design`)

```
7d5ee72 seo(m04): astro-seo + astro-robots-txt · migration plugins officiels
c1b0af4 seo(m03): OG endpoint PNG + meta tags complets + logo JSON-LD
96b392c feat(seo-m02): Session-04 M02 · hreflang + sitemap + llms.txt
4d5d906 feat(seo-m01): Session-04 M01 · Schema JSON-LD audit + Course/Product builders
4668459 perf(m03): Session-03 M03 · self-host fonts woff2 + drop Google Fonts CDN
198c550 feat(perf): Session-03 Mission-01 · output static activé (T1.1)
cffa6ae fix(a11y-m03): Session-02 M03 · contraste WCAG AA + reduced-motion + forms focus
```
