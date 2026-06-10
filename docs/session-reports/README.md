# Rapports de session — waimia-web

Trace décisionnelle des sessions de travail autonome (mandat Simon 2026-06-10 : « je tranche tout, je documente chaque arbitrage dans le repo pour vérification »). Chaque rapport liste, par mission : le contexte, les options envisagées, le choix retenu + le pourquoi, et la preuve GF-1.

## Convention de nommage

```
SR-YYYY-MM-DD-NN-<slug>.md
```

- `SR` = Session Report.
- `YYYY-MM-DD` = date de la session.
- `NN` = séquence zéro-paddée (`01`, `02`, …) pour départager plusieurs sessions le même jour. `ls` les trie alors dans l'ordre chronologique.
- `<slug>` = scope court et descriptif (kebab-case), idéalement aligné sur la branche de travail.

Un rapport « vivant » (mis à jour vague après vague pendant une session longue) garde son nom ; il est committé/poussé à chaque vague pour traçabilité.

## Index des rapports

| Rapport | Session | Scope | Branche / Prod | Statut | Commits clés |
|---|---|---|---|---|---|
| [SR-2026-06-10-01-registry-pilote-offres](SR-2026-06-10-01-registry-pilote-offres.md) | 2026-06-10 (diurne) | Registry adoption Phase 1 — pilote offres + 2 types catalogue + CaseStudy/plateau | `feat/registry-pilote-offres` (non mergée) | ✅ 89 types, gates verts, GF-1 PASS | `1a21fe0` · `a4154a0` · `bc0b742` · `b5d58ee` |
| [SR-2026-06-10-02-registry-night-waves](SR-2026-06-10-02-registry-night-waves.md) | 2026-06-10 (nocturne, autonome) | Registry adoption Phase 1 — waves 1.x (offres+cas, ServiceDetail/revops, Technologies, Hub/conseil, Solutions 8/8 +6 types→102, **Ecole hub +2 types→104**) | `main` (W1.1-1.5 MERGÉ PROD) | 🔄 en cours (vivant) | `38c2d3e` (W1.1) · `681ca40` (W1.2) · `d0d7b27` (W1.3) · `aa7ca45` (W1.4, **GF-1 prod FR+EN PASS**) · `9dc6a4b` (W1.4c breadcrumb i18n, **GF-1 prod PASS**) · `e3c2129` (W1.5 Ecole hub, **GF-1 preview + prod PASS** via `vercel promote`, rate-limit build contourné) |
| [SR-2026-06-10-03-responsive-media-var-fix](SR-2026-06-10-03-responsive-media-var-fix.md) | 2026-06-10 (matin, autonome) | Fix responsive systémique : 46 media queries `@media(max-width:var())` invalides → littéral px + stat-block grid-3 + DS spacing + faux-positif gate token-purity + **gate anti-régression** | `main` (`00e2b0a`) | ✅ **GF-1 preview Vercel PASS + CI main verte** ; prod-promote en attente quota Vercel (#30) | `382805f`+`a6c6773` (fix, GF-1 preview 5/5 0px, e2e 45/0) · `00e2b0a` (gate `check-media-query-var`, CI verte) |
| [SR-2026-06-10-04-responsive-residual-sweep](SR-2026-06-10-04-responsive-residual-sweep.md) | 2026-06-10 (matin, autonome) | Overflow mobile résiduel sur pages **bespoke** : sweep systématique 438 routes → 7 en overflow (methode, manifeste FR+EN, console FR+EN, blog essay, cookbooks) → grilles inline extraites en classes + reflow ≤768px + fix template essay (TOC `min-width:0`, `pre overflow-x:auto`) + test e2e 2→11 routes | `main` (`2094836`, PR #36) | ✅ **MERGÉ PROD** — GF-1 triangulé local 0/438 + preview Vercel 0/11 + **prod waimia.com 0/11** ; CI verte (#30 clos) | `df63c21` (methode+manifeste FR) · `2e47195` (6 routes, sweep 0/438) · `a6c9388` (test étendu) |

## Comment lire

- Le master plan canonique (vision + état vérifié + phases) reste `docs/00-MASTER-PLAN.md`.
- La source de vérité du **progrès** = git + task list Claude Code + gates `scripts/check-*.mjs`.
- Ces rapports = la source de vérité des **décisions d'arbitrage** (le « pourquoi » de chaque choix non trivial), pour audit a posteriori.
