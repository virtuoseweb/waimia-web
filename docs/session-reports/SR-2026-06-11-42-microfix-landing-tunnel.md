# SR-2026-06-11-42 · micro-fix (StatBlock ink + contenu) + V-F3 landing composable + tunnel étalon

> 2 workers Opus (worktrees microfix / landingtunnel, base 4592d36), mergés `f1c8580`. Validation orchestrateur : scopes diff vérifiés, astro check 0 errors POST-merge, build Complete!, 7 gates PASS (dont form-endpoints).

## micro-fix (3 corrections bornées)

1. **StatBlock mode ink réparé** (dette signalée par offres-polish) : le PullQuote interne restait `var(--ink)` sur fond ink → citation invisible. 4 overrides idiome PullQuoteBlock, demo expose le cas. Preuve : distance couleur citation/fond 397 (seuil 120), screenshot.
2. Demo tech-models-table : « Opus 4.7 » → « Opus 4.8 ».
3. Liens morts pages neuves : 0 sur /agence, /ressources, les 12 /solutions ; 4 tags 404 corrigés sur ds-studio (TagPills → tags canoniques). Pré-existants documentés à traiter : switcher langue Header → /en/agence/{ds-studio,hero-lab} FR-only ; `/offres/site-web-ia-tunnel` mort site-wide (TunnelNav.astro).

## landing-tunnel (V-F3, docs/40 §4)

- **Landing** : 470 lignes bespoke → page mince SectionsRenderer 8 slots catalogués : hero-landing → problem-statement (3 stats) → architecture-diagram ink → metric-shift (cas Plateau 23→100, ×2,4, 4,1×) → quote-spotlight → pricing-cards ×3 (Standard featured, prix avant 70 % du scroll) → guarantee-block ink → faq-accordion → cta-final ink vers tunnel/1. JSON-LD Service conservé.
- **Tunnel** : les 4 steps étaient déjà proches de l'étalon ; step 4 enrichi : bloc « Nos garanties, écrites noir sur blanc » (4 engagements du référentiel) + Cal.com (mécanisme existant, parité revops/activation).
- Arbitrages documentés : migration site-web-ia.astro → MDX SKIP (page bespoke retouchée le jour même, interdit du brief) ; lien footer SKIP (mega-menu.ts réservé).
- GF-1 flow complet (rule 17) : landing → CTA → steps 1→4, un seul CTA next par step, h1 opacity 1 partout, progression visible, 7 screenshots fullpage scroll lent.

## Preuves d'intégration

astro check `- 0 errors` · build `Complete!` · 7 gates PASS · push `4592d36..f1c8580` · GF-1 prod : addendum ci-dessous après deploy.
