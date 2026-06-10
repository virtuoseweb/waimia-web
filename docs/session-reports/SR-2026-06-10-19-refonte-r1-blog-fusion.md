# SR-2026-06-10-19 · Refonte R1 : fusion fieldNotes + veilleIA → blog (vague R1-F1 de docs/37)

> Worker Task subagent **Fable 5** (worktree `.worktrees/r1blog`), branche **`feat/refonte-r1-blog-fusion`** commit `5eb9da6`. Contre-vérifié orchestrateur (rule 09) : gates relancés PASS, sondes canonical/duplicate/301/RSS sur `.vercel/output`, screenshot inspecté.

## 1. Résultat

Fin du triple stockage éditorial : les collections `fieldNotes` (3 entrées) et `veilleIA` (1 entrée) sont **absorbées par `blog`**, et les 2 doublons `migrated-*` (source du duplicate content SEO) sont supprimés. **1 contenu = 1 URL en 200.**

- 4 MDX migrés (slugs préservés, bodies prouvés byte-identiques par diff), routage centralisé dans `src/lib/blog-routing.ts`.
- ~15 consumers refactorés : routes silo/tag/catégorie, 3 flux RSS (liens type-aware, 0 lien `migrated-*` mort), TaxonomyMenu, RelatedByCluster, pages équipe + AuthorPageTemplate.

## 2. Arbitrage canonical (le choix structurant)

**Canonical = routes héritées** (`/ressources/field-notes/[slug]`, `/ressources/veille-ia/[slug]`) ; la route blog **exclut** ces types de son `getStaticPaths`. Pourquoi : (a) 0 redirection nouvelle à poser (toutes les URLs détail existantes restent en 200), (b) cohérent avec les 2 redirects `migrated-*` pré-existants d'`astro.config.mjs` qui pointent déjà vers ces routes, (c) aucun contenu servi à 2 URLs. Option écartée : canonical côté `/ressources/blog/*` = 4 redirections 301 à poser + rupture des URLs partagées, pour zéro gain.

## 3. Preuves (sondes orchestrateur sur le build)

- 4 URLs héritées présentes dans `.vercel/output/static` (200) ; duplicates `/ressources/blog/*` absents (404) ; **301 `migrated-*` émis** dans `.vercel/output/config.json` (vérifié inline).
- RSS global : **17 items** (re-compté : `grep -o "<item>"`), 3 field-notes + 1 veille avec liens canoniques, 0 lien `migrated-*` (avant : 2 liens morts).
- GF-1 visuel : listes field-notes 3/3 identiques avant/après, détails h1 opacity 1 + transform neutre + 0 erreur console (screenshots), flux veille 1 item valide.
- Gates relancés indépendamment : no-emdash PASS, touchpoints PASS, form-endpoints 5/5 PASS (worker : astro check 0 errors/0 warnings, build Complete!).

## 4. Écarts assumés (documentés par le worker, vérifiés)

- Lede veille affiche un `&#39;` échappé : bug pré-existant d'EssayTemplate, parité exacte avec la prod actuelle (prouvé par curl comparatif), non introduit.
- Compteurs catégories/auteurs évoluent légitimement (les doublons ne sont plus comptés deux fois, les field-notes entrent dans les agrégateurs).
- Nouvelles pages tag générées (composable, design-system…) : enrichissement attendu de la fusion.
- Mapping champs hors-enum documenté : `category` field-notes remappées (pilotage/gouvernance/productivite), `author: simon-beros` ajouté (pattern des migrated existants), `sourceUrl` jamais renseigné = 0 perte.
