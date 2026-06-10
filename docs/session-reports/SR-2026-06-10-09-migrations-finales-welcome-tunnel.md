# SR-2026-06-10-09 · Migrations finales : Welcome (16/18) + TunnelStep hybride (17/18) — la migration des héros de templates est TERMINÉE

> Session autonome nuit. Workers Sonnet en worktrees isolés (briefs : 0 git, 0 re-délégation, fichiers nommés), GF-1 doublé d'une contre-vérification indépendante de l'orchestrateur (rule 09). Batch #1 poussé `2397efc`, **GF-1 prod waimia.com PASS**.

## 1. WelcomeTemplate → WelcomeSection (`93c0fd2`, merge `6808b42`)

- Contexte : `WelcomeSection` cataloguée existait déjà (copie byte-fidèle, slots headline/lede/foot + fallback data) ; le template gardait son markup inline dupliqué. Migration = pure consommation (197→49 LoC).
- **Leçon Astro capitalisée** : un forwarding de slot MÊME CONDITIONNEL (`{Astro.slots.has('foot') && <slot…/>}`) enregistre le slot comme « fourni » chez l'enfant → son fallback disparaît. Aucune page ne passant `foot`, le forwarding a été RETIRÉ : la section affiche son back-link natif. (Généralisation du bug ListIndex « wrapper filters fantôme ».)
- Bonus : le legacy rendait `<main class="welcome">` DANS le `<main id="main">` de Base.astro:165 = mains imbriqués invalides → corrigé de fait (la section rend `<section>`).
- GF-1 : 0 delta sur 10 métriques × 3 surfaces (FR, EN, preview) : h1 96px/-2.688px/op1/656px, lede 22px italic, 3 steps, back-link. Prod : h1 op1 96px, 3 steps, 0 err console.

## 2. TunnelStepTemplate hybride (`11226ce`, merge `6334eba`) — Wave 1.6

- Décision actée (handoff) : hero + nav en sections catalogués, prose `.tnl-body` page-level. 2 nouveaux types : **`tunnel-step-hero`** (kicker calculé `Tunnel · {offre} · Étape N/M`, barre `[01]..[NN]` aria-current, h1 variants hero/section, lede) et **`tunnel-step-nav`** (prev conditionnel, CTA 3 variants, meta reading+back). 5 touchpoints chacun (le repo a maintenant un 5e touchpoint : `library-manifest.ts`), **106 types** au catalogue, check-touchpoints vert.
- Interface Props du template INCHANGÉE → 0 route touchée.
- **Contre-vérification orchestrateur (legacy :4321 vs migré :4365, même route `/offres/activation-ia/tunnel/2`)** : 0 delta computed sur h1/kicker/lede/cta/prev/nav ; progress 4 steps 11px muted + actif accent identiques. **Découverte : le legacy affichait littéralement « &nbsp; » à l'écran** (échappement Astro d'une expression JSX) dans la meta « Temps de lecture » → la migration le corrige (`set:html`). Précédent suivi : « si la baseline EST le bug, la cible GF-1 = le rendu correct » (docs/22 leçon 1).
- GF-1 prod : h1 op1, 4 steps progress, 0 err console.

## 3. Bilan migration (docs/22 à jour)

**17/18 templates migrés. 1 exclu par veto Simon (Solutions, HeroSector infidèle). Le front « héros de templates » est CLOS.** Prochain front registry = bodies via `<SectionsRenderer>` + ~51 pages orphelines (master plan Waves 1.2-1.4) : hors backlog mandaté de cette nuit, à prioriser avec Simon.

## 4. Workers : écarts de brief observés (transparence)

- Le worker tunnel a édité `library-manifest.ts` hors liste autorisée : déviation LÉGITIME (gate check-touchpoints exige l'entrée d'inventaire) — la liste du brief était incomplète, pas le worker fautif.
- Son rapport ne montrait pas la table AVANT/APRÈS demandée → la contre-vérification indépendante l'a remplacée (et a attrapé le fix &nbsp; que le worker n'avait pas signalé).
