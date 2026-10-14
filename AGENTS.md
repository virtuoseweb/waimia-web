# Waimia Web · instructions communes

Site Astro/React/Tailwind `waimia.com`, Vercel `waimia-web`, GitHub `virtuoseweb`.
Distinct du produit Waimia OS. Ne pas modifier l'agrégateur `waimia-v2`.

## Sources et suivi

- Lire `docs/README.md`, puis les seules sources de la mission. Positionnement V8 :
  `docs/strategy/10-architecture-finale-v7.md`. Board/backlog V7 et `tasks/ORCH-STATE.md`
  sont historiques : ne pas reprendre automatiquement leurs priorités.
- Si une tâche de `docs/state/02-plan-execution-claude-code.md` est réactivée,
  conserver son ID. Cocher seulement avec preuve et tag `<!-- sb commit=<sha> gf1=<y|n> -->`
  pointant un commit existant, dans le même tour que le commit autorisé.
- `docs/state/00-BOARD.md` et `tasks/claude-board.json` sont générés. Régénérer avec
  `node scripts/sync-board.mjs --regen`, contrôler avec `npm run check:board`.
  Le hook traite les commits simples ; après commande shell composée, le faire explicitement.

## Design et contenu

- Tokens DS figés, catalogue actif : valeurs/calculs/transparences sur les variables
  existantes permis. Nouveau type ou variante : tâche dédiée, DS Studio, propagation
  au catalogue ; aucun changement de page/template live hors tâche dédiée.
- Source catalogue : `src/sections/<type>/` (`schema.ts`, `demo.ts`, `meta.ts`,
  `Component.astro`, `index.ts`). Régénérer via `gen:section-aggregate` (REPLACE),
  vérifier `check:section-modules`. Ne pas éditer les agrégats/god-files générés ni
  prendre les composants legacy pour la source. Détail : `docs/audits/02-section-colocation-38.md`.
- Apparence : éditer le composant source (section, organism, header/footer), jamais
  du markup orphelin dans une page. Sections cataloguées et organisms bespoke sont distincts.
  Dark `ink` et CTA globaux : `docs/directives/02-dark-variantes.md`, `global.css`.
- Templates-as-data : `defineTemplate`/`resolveTemplate` dans `packages/ds-kernel/src/templates/`,
  définitions `src/lib/templates/`, rendu `SectionsRenderer`. Respecter les adaptateurs
  existants ; ne pas recréer un template à props pour contourner le moteur.
- Contenu JSON sous `src/content/`, prose `body_sections`/`editorial-prose` (`html_fr`,
  `html_en`). Pas de retour au MDX ; Markdown `dashboard-seo` = exception POC.
  Source : `docs/audits/01-template-registry-migration.md`.
- Contenu réutilisé : source partagée par ID/slug, override d'instance possible ;
  aucune copie de valeur entre pages. Studio : `/agence/ds-studio`, catalogue :
  `/agence/design-system`. La restriction du catalogue Amploi ne s'applique pas ici.

## Vérifier et livrer, y compris sans configuration globale

- `npx -y pnpm@9.15.0 build` ; `npx -y pnpm@9.15.0 exec astro check` ; dev :
  `npx -y pnpm@9.15.0 dev`. Build, Lighthouse et HTTP 200 ne prouvent pas un parcours.
- UI : parcours, capture au-dessus de la ligne de flottaison, styles calculés
  opacity/transform et revue du rendu. Backend : assertions réelles, écriture/lecture
  DB, cas limite, E2E si full-stack. Annoncer abstentions et limites des mesures locales.
- `main` sert la production : preview Vercel prouvée avant merge, auto-merge désactivé.
  Une preuve locale ne remplace pas implicitement cette preview. Secrets de bypass masqués.
- Une branche par scope, pas de `git add -A` global. Push autorisé :
  `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin <branche>`.
- Délégation si gain réel ; deux writers = worktrees/artefacts isolés, intégration
  et preuve critique par le parent. Utiliser les modèles réellement exposés par le client.
- Agir dans le périmètre autorisé ; demander seulement l'autorisation manquante pour
  paiement, destruction, installation, envoi externe ou sécurité. Après correction,
  mettre à jour la source canonique. Recherche/source avant affirmation négative,
  documentation officielle avant sur-mesure. Ces règles ne dépendent d'aucun plugin.

## Rôles des workers

Le rôle fixe modèle et effort (socle Claude ou Codex).
- `checker` : build, `astro check`, `check:*`, board ; `editor` : régénérations et patchs décidés.
- `coder` : section, template, adaptateur ; `designer` : rendu, DS Studio, variantes dark,
  preuve GF-1 visuelle ; `reviewer` avant merge vers `main`.
- `analyst` : contenu JSON, SEO/GEO, rédaction, audit écrit ; `explorer` : cartographie du catalogue.
- Workflows `.claude/workflows/` : 3 workers lourds (build, navigateur) simultanés au plus.

## Pilotage et ressources

- L'orchestrateur coordonne et intègre ; chaque worker est lancé par rôle (tableau ci-dessus) avec un modèle explicite.
- 3 workers lourds au plus ; un build ou une suite lourde à la fois (`scripts/claude/crochet-ressources.mjs` refuse le second ; échappatoire `WAIMIA_LOURD_OK=1` sur demande de Simon).
- Un worker ne builde pas : il prouve sans build, rend la main, et le parent construit une fois.
- Un seul navigateur à la fois ; servir le build (`scripts/serve-dist.mjs`), jamais le dev.
- Procédures récurrentes en skills (`/nom` côté Claude, `$nom` côté Codex) : `ecrire-un-brief`, `integrer-un-lot`,
  `prouver-une-page`, `optimiser-une-page-seo`, `lire-un-gros-volume`. Épreuve des crochets : `npm run test:claude-hooks`.

## Leçons actives

Une leçon nouvelle remplace ou ajoute une ligne ici (20 maximum) ; une leçon devenue garde-fou outillé est retirée. Historique : `docs/archive/lessons-2026-06-09.md`.

Design system et catalogue

- Composant catalogué : style en classes et `var(--token)`, jamais de `style=` littéral ; preuve : `rg -n "style=" <composant>` ne montre que des `data-*`.
- Texte pouvant porter `<i>` ou `<br>` : `set:html={expr}` ou JSX, jamais `set:html="..."` en attribut ; preuve : HTML buildé sans `&lt;i&gt;`.
- Décider alignement, densité et fond par rôle de section, pas par règle uniforme .
- Un type de page = un template canonique ; sous-page : air de famille, pas copie de la home.
- Effet ou section livré seulement si câblé au markup réel (`.reveal*`, `data-*`) et vu à l'écran.
- Hero : un seul lede (subtitle seulement si distinct) ; preuve : bas des CTA ≤ hauteur du viewport à 390×844.
- Étalon désigné par Simon : le lire en entier et le mesurer avant de reproduire.

Preuve visuelle

- GF-1 visuel : ajouter un jugement (hiérarchie, équilibre, débordements) et une passe mobile 390×844 aux styles calculés.
- `.reveal` : scroller et attendre la fin de l'animation avant de mesurer .
- Servir le build, jamais le dev : `node scripts/serve-dist.mjs --root dist/client` ; e2e contre ce build.
- Bug visible seulement en prod : lire la donnée servie (HTML, env, `iframe.src` après hydratation) avant de toucher le code, puis reproduire avec les mêmes variables.

SEO et redirections

- Avant d'ajouter un builder JSON-LD : compter `"@type"` dans le HTML rendu ; `FaqAccordion` et `Breadcrumb` émettent déjà le leur.
- Supprimer ou renommer des pages : `rg` des liens entrants dans tout le dépôt ; 301 seulement si la page était en prod ; les prouver dans `.vercel/output/config.json`.
- Brief de page : donner les plafonds de `packages/ds-kernel/src/schemas/sections.ts` (`description` ≤175) et une green-list d'URLs vérifiées dans `dist/`.

Workers et git

- Workers écrivains en parallèle : worktrees distincts, chemins absolus préfixés `.worktrees/<slug>`, briefs sans git ni re-délégation, 3 au plus, un build à la fois ; au retour : `git status` du dépôt principal et `ps aux | grep 'claude -p'`.
- Git d'orchestration : `git -C <chemin absolu>`, jamais `cd &&` ; résultat git « impossible » : vérifier `pwd`. Après tout merge multi-branches : `astro check` complet avant push.
- Déployer par `git push` seulement, jamais `vercel deploy` ni l'API . Marqueur de poll absent de la prod courante, `exit 1` au timeout.
