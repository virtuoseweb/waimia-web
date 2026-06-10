# SR-2026-06-10-18 · Refonte R1+R2 : éditorial premium des 3 cas clients (vagues R1-cards + R2-P1 de docs/37)

> Worker Task subagent **Fable 5** (worktree `.worktrees/r12cases`), branche **`feat/refonte-r12-cases`** commit `7256d95`. Contre-vérifié orchestrateur (rule 09) : scope exact 4 fichiers, plateau diff vide, gates relancés PASS, delta plateau dist re-prouvé par diff normalisé, screenshots inspectés.

## 1. Résultat

Les 3 cas pavés (caserne, halcyon, northbound) passent du body MDX brut (~4 100 mots de prose) au **frontmatter structuré + sections composables**, sur le modèle exact de plateau (l'exemple abouti, docs/25). La collection `cases` est désormais **4/4 composable** (cible CLAUDE.md).

- Redistribution traçable, 0 invention : contexte → `problem-statement` + stats ; goulots → `problems-grid` (h2 corrects par cas : « Quatre goulots structurels. » pour caserne, fini le hardcode template « Trois goulots ») ; audit → `method-timeline` (élimine le husk `steps`) ; livrables → `deliverableCards` ; résultats avant/après → `metric-shift` ; phrase-clé → `pull-quote-block` (sans cite : aucun locuteur attribué dans les bodies d'origine).
- **Cards du hub /cas réalignées sur les corps** (le corps fait foi, principe R1) : caserne « 4 goulots en 48 h » (avant : « 1 200 h/an » non sourcé), halcyon « 120 h consultant libérées » (avant : « −38 % triage » d'un autre récit), northbound « clôture allégée de 2 jours » (avant : « ×3,1 lead→SQL » non sourcé). Secteurs et durées corrigés idem.
- Route EN : 1 ligne (`steps={[] as any[]}` → `steps={[]}`). Route FR : 0 modif nécessaire (champs déjà câblés).

## 2. Décision d'architecture

Voie A pure (champs template) bloquée par un fait vérifié : `CaseStudyTemplate.astro:218` hardcode le h2 « Trois goulots structurels. », faux pour 2 des 3 cas, et le template était hors scope du worker. Choix : **mirrorer le pattern plateau** (champs voie A remplis + tableau `sections:` composable rendu effectivement + body vidé). C'est aussi la direction cible du repo (composable > template legacy).

## 3. Preuves

- Gates relancés par l'orchestrateur : no-emdash PASS, touchpoints PASS (worker : astro check 0 errors + build Complete!).
- GF-1 visuel (Playwright 1440×900, dist servi :4404) : h1 opacity 1 + transform neutre sur les 3 pages, plus long bloc de prose continue 162-217 mots (avant ~1 200-1 500), timeline 4-5 items rendue non vide, 9/9 sections visibles, 0 `[data-reveal]` caché, 0 erreur console, hub = nouvelles cards exactes, sanity EN OK.
- **Plateau** : diff source vide ; dist identique hors nom du chunk CSS (`scroll-reveal.u3TxjM5s.css` → `i18n.u3TxjM5s.css`, hash de contenu identique : le retrait des imports `Bi` des 3 MDX change le nommage de chunk du bundler). Re-prouvé par l'orchestrateur via diff normalisé sur les noms d'assets : « IDENTIQUE hors noms d'assets ».

## 4. Écarts assumés (hérités, pas introduits)

- Pas d'AuthorByline ni de related-cards page-level sur la branche composable des routes (TODO existant, déjà le cas pour plateau en prod).
- Specs hero non bilingues par schéma (`value` partagé FR/EN), précédent plateau identique.
- FAQ frontmatter conservée mais non rendue par les routes cas (état antérieur inchangé).
- Deltas dérivés arithmétiquement des chiffres des corps (ex. −83 % = 23→4 min), même logique que le −99 % de plateau.
