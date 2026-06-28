# 12 — Décision CMS, format de page et surface d'édition

**Statut** : ✅ FIGÉ (direction validée Simon 2026-06-28)
**Sujet** : comment le contenu/structure des pages est stocké, par qui il est édité (humain + IA), et quel CMS.
**Lié** : [05-stack-decision](05-stack-decision.md) (Astro vs TanStack, figé), [10-architecture-finale-v7](10-architecture-finale-v7.md), backlog ARCHI #38/#39/#40/#41.

---

## Contexte et constat

L'audit a montré que les pages composables (offres, services, cas-usages, lp, audits, diagnostics) sont stockées en `.mdx` dont le **corps est vide** : le frontmatter YAML est un PageDocument déguisé. Tina est branché sur ces collections (`tina/config.ts`, champ `sections`). Le blog et l'éditorial utilisent vraiment le corps MDX.

## Décision

1. **Abandonner Tina.** Raison : le mode d'édition contextuel de Tina pousse vers `output: 'server'` + un datalayer GraphQL + un backend (Tina Cloud ou self-host) pour éditer en prod (doc officielle Tina/Astro). Incompatible avec la cible : SSG pur, zéro serveur, forkable. Ce n'était pas un problème de compatibilité Astro (Tina EST compatible), mais d'architecture d'édition.

2. **PageDocument JSON canonique, git-based.** Le contenu/structure des pages vit en `.json` validé par le schéma Zod existant (loader data Astro `glob`/`file`, supporté nativement). Git EST la base de données (commits = journal, branches = brouillons, historique = audit). Zéro DB, zéro serveur pour faire tourner le site. Boilerplate forkable : `clone + install + run`. Chaque page porte `"$schema"` (généré depuis Zod via zod-to-json-schema) pour l'autocomplétion humaine et le contrat IA.

3. **Keystatic pour la coque CMS de commodité** : lister/créer/dupliquer, media library, drafts via branches GitHub, et le **contenu d'entités partagées** (`src/data/**` : cas, prix, témoignages, auteurs = le contenu GLOBAL qui manque aujourd'hui). Git-native, JSON-native, no DB, reader au build (SSG préservé). Open-source, réversible (le contenu reste du JSON git : Keystatic est jetable, zéro lock-in).

4. **Builder maison pour les sections.** Le `sections[]` est édité dans le builder (canvas visuel + preview live via la route SSR render), PAS dans Keystatic. Le builder EST l'éditeur visuel (remplace l'édition visuelle de Tina, en mieux : DS-aware, section-aware).

5. **MCP = surface IA** (déjà livré #41) : compose/écrit le même PageDocument JSON.

## Règle structurante : 1 fichier = 1 propriétaire

| Donnée | Fichier | Propriétaire écrivain |
|---|---|---|
| Page (meta + `sections[]`) | `src/content/<col>/<slug>.json` | **Builder + MCP** uniquement |
| Entités partagées | `src/data/<entity>/*.json` | **Keystatic** |
| Media, settings, nav | `src/data/**` | **Keystatic** |

Keystatic ne possède JAMAIS les page docs → pas de risque de strip de clé inconnue (un CMS schema-driven n'écrit que les champs déclarés). Le builder et Keystatic n'écrivent jamais le même fichier.

## Question tranchée : ré-écrire les 199 schémas dans Keystatic ? NON

Même si des agents IA font le travail (coût de main-d'œuvre bas), c'est NON pour les 199 sections, parce que :
- Keystatic **ne sait pas rendre tes composants Astro** : même après ré-encodage, tu n'aurais qu'un formulaire SANS aperçu. Tu ré-encodes pour un bénéfice que tu n'obtiens pas.
- Double source de schéma (Zod + fields Keystatic) = mode de défaillance permanent (drift, perte de données), pas juste du labeur.
- Tu reconstruirais une version inférieure du builder que tu possèdes déjà (lui a l'aperçu live).

OUI en revanche pour définir nativement dans Keystatic les entités/meta simples (mapping natif, générable depuis Zod). Ce n'est pas de la bidouille, c'est l'usage correct. La bidouille serait de forcer Keystatic à posséder les sections.

## Contrainte de premier rang : UX des utilisateurs du PRODUIT

L'expérience des utilisateurs de l'app (ceux qui composent les sites) est un critère de conception, pas un après-coup. Conséquence sur les choix :
- Les surfaces à **haute fréquence et signature produit** (le builder/canvas) doivent être bespoke et soignées. On les possède, on y investit le design.
- Les surfaces **utilitaires/back-office** (CRUD entités, media) tolèrent le générique-propre de Keystatic. Si la cohérence de marque y devient un argument de vente, prévoir un admin bespoke en investissement ULTÉRIEUR, sans bloquer l'archi maintenant.
- Ne pas laisser l'admin générique de Keystatic devenir le VISAGE du produit : le visage, c'est le builder.

## Visiteurs : SSG/perf intacts

Site public en `output: 'static'` (contenu lu au build), ISR per-route via `@astrojs/vercel` là où utile (gros ensembles programmatiques). Seule la route admin `/keystatic` est dynamique (hybride `prerender = false`), ou en local-only. Zéro impact sur la perf visiteur.

## À vérifier avant industrialisation (rule 03, POC)

1. Comportement Keystatic sur clés inconnues (garantir qu'il ne touche jamais les page docs).
2. Existence d'un champ custom hors-document pour un bouton deep-link in-admin (sinon pont au niveau navigation).
3. Câblage `@keystatic/astro` admin hybride SSG-safe + collections format JSON.

## Migration (dans #39/#40, pas en reformatage isolé)

1. Générer `page.schema.json` depuis Zod.
2. Loader data JSON pour les collections composables ; garder MDX pour l'éditorial (blog, cases-avec-corps).
3. Convertir les ~23 `.mdx` composables → `.json` (transform déterministe).
4. Retirer Tina (config, deps, generated, bridge).
5. Builder write-back dev (`/api/page/save`) + MCP `page_write`.
6. POC Keystatic : 1 collection entité + media + reader au build.
7. GF-1 = parité de rendu (texte visible identique au dist actuel, même méthode que la vérif #38 T5).

---

*Décision produit + ingénierie · 2026-06-28 · à exécuter sous #39/#40.*
