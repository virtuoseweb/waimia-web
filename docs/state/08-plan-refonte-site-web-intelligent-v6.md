# Plan d'exécution — refonte `/services/site-web-intelligent` (brief v6)

> Source : `~/Downloads/brief-site-web-intelligent-v6.md` (lu en entier). Ordre des 13 sections §4 FIGÉ.
> Fusion ACTÉE. **Override Simon 2026-06-13 : pas de redirects (site neuf sans traffic) → suppression nette**
> (cohérent doctrine `strategy/02` « on supprime net »). Plan à checkpoints, rule 16 (les `[x]` suivent les commits + preuve GF-1).

## Stratégie d'orchestration (anti-collision, rule 45)

La page = **UN seul artefact MDX** `src/content/services/site-web-intelligent.mdx` (frontmatter `sections: [13]`).
Les 9 sous-agents nommés NE peuvent PAS écrire ce même fichier en parallèle. Décomposition **par artefact** :

- **Contenu MDX (13 sections)** : les agents de contenu **DRAFTENT** leur(s) section(s) en texte (copy FR/EN + type catalogué + props exacts) et **retournent** à l'orchestrateur (0 écriture → 0 collision). UN seul **worker d'assemblage** écrit le MDX final depuis le spec compilé.
- **Artefacts non-MDX (fichiers disjoints, parallélisables)** : suppression/nav, composant maturité (si étendu), a11y/CSS, schéma route.
- GF-1 (build + screenshot + getComputedStyle) = orchestrateur, jamais l'agent (rule 09).

## Principe catalogue — 2 axes distincts (directive Simon 2026-06-13, clarifiée)

**Axe DESIGN (toujours GLOBAL, sans exception)** : le markup/CSS d'un composant catalogué est la source de vérité unique de son rendu. Éditer le composant `sections/*.astro` propage le changement visuel à **TOUS** ses usages (global ET instancié). Une modif design sur un = changement sur tous. C'est la règle anti-orphelin du `CLAUDE.md` repo, inchangée.

**Axe CONTENU (2 modes)** — c'est le SEUL axe concerné par GLOBAL/INSTANCE :
- **GLOBAL** = source de contenu UNIQUE référencée (collection Astro ou `src/data/*.ts`) → éditer le contenu met à jour **tous** les usages (un même contenu partout, synchronisé).
- **INSTANCE** = même composant, design propagé comme tout le monde, **mais valeurs de contenu propres** à chaque usage (props inline par page).

> État actuel vérifié (GF-4, Explore) : le contenu de section dans waimia-web est **INSTANCE-only** (props inline `sections: [{type, ...props}]`, 0 propagation contenu). `reference()` (content.config.ts:5) ne sert qu'à `author`/`contributors`. Précédents GLOBAL déjà en place : `src/data/pain-points.ts` / `proof-points.ts` (store importé) + collection `cases` (content.config.ts:116-174, référençable, sous-exploitée).

**Conséquence directe pour cette refonte** : les contenus réutilisés **cross-page** (cas #5, avis #11, interlocuteur #10, prix #7/#11) apparaîtront sur la page service `/services/site-web-intelligent` **ET** la landing `/lp/site-web-intelligent` **ET** potentiellement le hub `/acquerir`. Les dupliquer inline = désync garantie (modifier à un endroit ne propage pas). → Ces contenus doivent être en **GLOBAL** : source unique (collection `cases` existante pour les cas ; store `src/data/*.ts` ou nouvelle collection pour avis/interlocuteur/prix), référencée par les sections. Le contenu propre à une page (hero, problème, méthode) reste **INSTANCE** (inline).

## Régime DS waimia-web — variables figées, catalogue ACTIF (directive Simon 2026-06-13)

> **Source de vérité = `docs/design-system/03-library-strategy.md §9` + `07-health-audit.md`** (industrialisation/audit). Le tableau ci-dessous est un rappel APPLIQUÉ à cette page, pas une source concurrente — toute évolution du régime va dans `03`.
> ⚠️ Distinction clé vs rule 28 (scopée Amploi `astro-tina-site-v1`, catalogue figé V1) : ici le catalogue est **en construction** (c'est l'objet même du travail de design de template, donc pas figé).

| Action | Statut |
|---|---|
| Créer une **nouvelle variable/token DS** | ❌ INTERDIT |
| Nouvelles **valeurs Tailwind** / calculs / transparences / dérivations **sur variables DS existantes** | ✅ OK |
| Créer un **nouveau composant / famille / variante / déclinaison** de section dans le **catalogue** | ✅ OK (objet du chantier template) |
| Tout passe par le **DS Studio** (source de vérité DS) + bâti avec les variables DS + **propagé/sync au catalogue** (4 touchpoints : schéma + demos + registry + composant) | ✅ obligatoire |
| Inline du markup/CSS hors catalogue (orphelin) | ❌ INTERDIT |

**Garde-fou composant** : créer/étendre un composant est autorisé quand c'est le bon choix de design (pas un réflexe d'évitement). Il doit être **catalogue-ready** : bâti avec les variables DS (0 nouveau token), 4 touchpoints synchronisés, administrable via DS Studio. S'il porte du contenu réutilisable, prévoir l'axe contenu 2 modes (réf `*Ref`/`*Id` optionnelle résolue via `getEntry`/`getCollection` + contenu inline en override). **Préférer la composition quand une section existante couvre ~80 % du besoin** (pas de création gratuite), mais la création n'est PAS bannie.

Mapping agents → artefact + phase :

| Agent (brief) | Rôle | Artefact | Écrit ? |
|---|---|---|---|
| `agent-suppression-nav` (ex-301) | Mine la copie utile des 4 MDX tunnel → catalogue, PUIS supprime `/offres/site-web-ia` + les 4 MDX de **contenu** tunnel (⚠️ PAS le template `ConversionFunnel`), nettoie liens internes, rattache nav à Acquérir. **0 redirect.** | `src/pages/offres/site-web-ia.astro`, `src/content/tunnels/site-web-ia-tunnel-1..4.mdx`, refs nav | OUI (fichiers disjoints) |
| `agent-structure-maturité` | Draft #1 Hero élargi, #3 Problème, #4 « Où en êtes-vous » (3 profils + échelle 6 stades) | fragments texte | NON (draft) |
| `agent-fonctionnement-système` | Draft #6 Méthode (étape 0 création), #7 Fonctionnement (2 mouvements + dashboard IMG-GEN) | fragments texte | NON |
| `agent-différenciation` | Draft #8 reframe bénéfice (§4.1, jamais « Claude » en titre), #2 Définition GEO | fragments texte | NON |
| `agent-livrables-impacts` | Draft #9 table Livrable↔Effet (chiffres à occurrence unique, en « cibles » sauf réel Simon) | fragments texte | NON |
| `agent-preuve-cas-avis` | Draft #5 cas (3 cartes placeholder balisé) + #11 avis (1-2 pull-quotes monogramme) + #10 Interlocuteur + #12 FAQ + #13 CTA + #11 prix | fragments texte | NON |
| `agent-assemblage` (orchestration) | Écrit le MDX final 13 sections (ordre figé) depuis le spec compilé + balises placeholder + blocs IMG-GEN | `site-web-intelligent.mdx` | OUI (writer unique) |
| `agent-seo-geo-schema` | FAQ frontmatter (→ FAQPage auto), Service `offers/priceRange/serviceType`, hreflang, requêtes réelles | route `/services/[...slug].astro` (si enrich Service) + frontmatter | OUI (route, disjoint) |
| `agent-pixel-a11y` | breadcrumb AA, padding mobile, `prefers-reduced-motion` + fallback no-JS, contraste corps gris/crème | composants/CSS (disjoints) | OUI (fichiers disjoints) |
| `agent-placeholders-imggen` | Blocs `<!-- IMG-GEN gpt-image-2 -->` (dashboard #7 prioritaire), avatars monogrammes | fragments → intégrés par assemblage | NON (draft) |

## 🔴 Décisions Simon AVANT contenu live (§9 : n'invente AUCUN chiffre)

Le scaffolding (placeholders balisés) part sans toi. Mais ces données = **toi qui tranche** (sinon « cibles » non chiffrées) :

- [ ] **D1 — Prix paliers** : §7 confirme 4 k€ / 9 k€ indicatif / 12 k€ ? **Uplift création** (ex-`site-web-ia` « dès 7 900 € » à confirmer) = combien ? (sinon : « chiffré au cadrage », sans nombre)
- [ ] **D2 — Chiffres d'impact** #9 (−40 % qualif · 8 articles/sem · 0 captivité) : réels (adossés à un cas) ou je les libelle « cibles » ? (brief P2 : « relibeller en cibles si non adossés »)
- [ ] **D3 — Cas clients** #5 : 0 réel publiable dans le repo → je scaffolde **3 placeholders balisés** (noms fictifs « Atelier Norne » / « Groupe Caldéra », §5.1). Tu fournis les vrais avant publication (gate §10).
- [ ] **D4 — Avis** #11 : quantifié sobre (`4,9/5 · 12 avis` mono) ou pull-quote seul sans note ? (brief : pas d'étoiles 5/5 par défaut, « choix = Simon »)
- [ ] **D5 — Échelle de maturité** (création autorisée, choix au mérite) : (a) `diagnostic-stages` (déjà 6 stades, 0 modif, le + rapide) ; (b) étendre `MaturityPyramid` 4→6 (schéma `.length(4)`→`.min(4).max(6)` + SVG + grille, 4 touchpoints sync, 0 nouveau token) ; (c) nouvelle variante de section dédiée dans le catalogue si le rendu voulu le justifie (catalogue-ready, DS Studio, variables DS, 4 touchpoints). Reco = (a) si le rendu convient, sinon (b)/(c). La création n'est PAS bannie — on prend le meilleur design.
- [ ] **D6 — Interlocuteur** #10 : ta vraie photo + lien CV, ou monogramme + bio 2 lignes en attendant ?
- [ ] **D7 — Où vit le contenu GLOBAL (cross-page)** : valider l'architecture pour cas/avis/interlocuteur/prix réutilisés sur page service + landing + hub. Reco = (a) **cas** → collection `cases` existante (déjà référençable), une carte = une entrée, la section reçoit des slugs ; (b) **avis / interlocuteur / prix** → store `src/data/*.ts` (léger, modèle `pain-points.ts`) importé, OU nouvelle collection si éditorialisation forte voulue. Si tu valides, le contenu (même placeholder) est créé DANS la source unique dès P0 → 0 duplication à corriger ensuite. Si tu préfères tout inline pour l'instant → on assume la dette et on factorise en Phase C. (Ne bloque pas le scaffolding : par défaut je place le contenu dans la source unique, c'est réversible.)

> Ces 6 points NE bloquent PAS le scaffolding (structure + placeholders balisés). Ils bloquent la **publication** (gate §10 du brief). Je démarre P0 sur tout le reste ; tu réponds quand tu veux, j'intègre.

## P0 — Fusion + structure + preuve (scaffolding)

- [ ] **P0.0 — Vérifier le mapping de types** (rule 09) : confirmer les noms EXACTS dans `src/lib/section-registry.ts` pour les 13 sections (l'Explore a proposé `hero-conversion-funnel`, `hero-sector`, `problems-grid`, `diagnostic-stages`, `case-card-grid`, `method-timeline`, `operating-layer`, `feature-comparison-grid`/`comparison-duo`, `deliverables-grid`/`feature-grid`, `hero-author`, `testimonial-*`, `faq-two-column`/`faq-accordion`, `footer-cta-band`/`cta-final`). Figer le spec props par type.
- [ ] **P0.0-bis — Classer chaque section GLOBAL vs INSTANCE** (directive 2026-06-13) : marquer pour chaque type si son contenu est propre à la page (**INSTANCE** inline : hero, problème, méthode, différenciation, livrables) ou réutilisé cross-page (**GLOBAL** référencé : cas #5 → collection `cases` ; avis #11, interlocuteur #10, prix → source unique `src/data/*.ts` ou collection). Vérifier si la section cible accepte déjà une référence (`*Id`/`*Ref`) ; sinon, le noter comme dépendance de D7 (la section reste inline en P0 si le mécanisme GLOBAL n'est pas encore câblé, mais le contenu vit dans la source unique dès le départ).
- [ ] **P0.1 — Suppression CIBLÉE du contenu, PAS du template** (`agent-suppression-nav`, clarif Simon 2026-06-13) :
  1. **Miner d'abord** la copie utile des 4 MDX `src/content/tunnels/site-web-ia-tunnel-1..4.mdx` (arguments/wording qui valent la peine) et la **verser dans le catalogue/bibliothèque** (demos de section, `src/data/*.ts`, ou collection appropriée) pour réemploi Phase C — pas une extraction volante, du contenu rangé.
  2. **Supprimer SEULEMENT** les 4 MDX de contenu `site-web-ia-tunnel-1..4.mdx` + `src/pages/offres/site-web-ia.astro` (page offre) ; retirer tous liens internes vers `/offres/site-web-ia*` ; rattacher au besoin à Acquérir. **0 redirect** (Simon).
  3. **⚠️ Le TEMPLATE tunnel (`ConversionFunnel` / template de conversion) NE BOUGE PAS** — il reste dans le catalogue, disponible pour la Phase C (quizz + tunnel). Ne pas le supprimer ni le modifier.
  - GF-1 : build vert + `grep` 0 lien résiduel vers `/offres/site-web-ia` + 0 page tunnel **de contenu** générée + template `ConversionFunnel` toujours présent et fonctionnel (preview catalogue OK).
- [ ] **P0.2 — Draft contenu** (5 agents de contenu EN PARALLÈLE, 0 écriture, retour texte) : sections #1-#13 selon §4, bénéfice-first #8 (§4.1), maturité 6 stades, fonctionnement 2 mouvements, livrables↔impacts.
- [ ] **P0.3 — Placeholders preuve balisés** (`agent-preuve-cas-avis` + `agent-placeholders-imggen`) : 3 cartes cas + 1-2 avis avec `data-placeholder` + commentaire `<!-- PLACEHOLDER ne pas indexer -->` + badge DÉMO dev ; avatars monogrammes ; blocs IMG-GEN (dashboard prioritaire). **Pas de Review/AggregateRating sur placeholder.**
- [ ] **P0.4 — Assemblage MDX** (`agent-assemblage`, writer unique) : écrit `site-web-intelligent.mdx`, 13 sections ordre figé, 4 beats sombres (1/5/9/13), DA crème/charcoal/coral, § + serif + mono, 0 U+2014, bilingue FR/EN.
- [ ] **P0.5 — Maillage** : ≥ 5 liens in-body hors `/contact`, dont la pillar `/acquerir`.
- [ ] **P0.6 — GF-1 P0** (orchestrateur) : build `Complete!` + screenshot above-fold + `getComputedStyle` H1/CTA (opacity≠0, transform neutre) + CTA hero above-fold + 13 sections rendues dans l'ordre + placeholders balisés visibles en dev SEULEMENT.

## P1 — SEO/GEO + a11y

- [ ] **P1.1 — FAQPage** : peupler `faq_fr/faq_en` (auto → JSON-LD via `schema-builder.ts:118`) + objection prix + « je n'ai pas de site ». Valider Rich Results Test.
- [ ] **P1.2 — Service schema enrichi** (`agent-seo-geo-schema`) : `offers`/`priceRange`/`serviceType` (route `/services/[...slug].astro` ou frontmatter). **Pas** de `Review`/`AggregateRating` tant que pas d'avis réel.
- [ ] **P1.3 — Définition GEO** #2 (< 60 mots extractible) + H2 double-intention + requêtes réelles (« site qui génère des leads », « agence site web IA B2B », « refonte site web B2B », « site qui qualifie les leads »).
- [ ] **P1.4 — hreflang** cohérent (FR/EN).
- [ ] **P1.5 — a11y** (`agent-pixel-a11y`, fichiers disjoints) : `prefers-reduced-motion` + fallback no-JS sur reveals ; breadcrumb AA ; padding mobile ; mesurer contraste corps gris/crème.

## P2 — Dégraissage final

- [ ] **P2.1** — Couper « En bref » (répétition hero).
- [ ] **P2.2** — Aucune métrique > 1× (toutes consolidées en #9). `grep` de contrôle.
- [ ] **P2.3** — Chiffres non adossés à un cas → libellés « cibles ».
- [ ] **P2.4** — Objections prix + « je n'ai pas de site » en FAQ (recoupe P1.1).
- [ ] **P2.5** — Ordre + rythme §4 appliqués ; CTA hero above-the-fold ; 4 beats sombres 1/5/9/13.

## Gate publication (§10 brief) — NON franchissable sans Simon

- [ ] **G1** — Tout placeholder cas + avis remplacé par du réel publiable. 0 `data-placeholder` / 0 badge DÉMO en prod.
- [ ] **G2** — Prix + impacts = réels ou « cibles » assumées (D1/D2 tranchés).
- [ ] **G3** — Photo/CV interlocuteur réels (D6).
- [ ] **G4** — `Review`/`AggregateRating` ajoutés SEULEMENT si avis réels (D4).

## Garde-fous §9 (rappel, bakés dans chaque brief worker)

301 supprimé (Simon : pas de traffic). · Différenciation bénéfice-first, jamais « nous utilisons Claude » en titre. · Placeholders balisés, jamais en prod/indexés, avatars monogrammes, pas de visage généré. · 0 chiffre inventé (impact/prix/cas = Simon). · DA stricte, pas d'étoiles 5/5. · Preuve empirique > 200. · **Régime DS waimia : 0 nouvelle variable/token DS, MAIS création de composants/variantes catalogue AUTORISÉE (via DS Studio + variables DS + 4 touchpoints sync) ; préférer composition si une section couvre ~80 %.** · **Design propage TOUJOURS (axe design = global) ; GLOBAL/INSTANCE concerne le CONTENU seul.** · **Contenu cross-page (cas/avis/interlocuteur/prix) = GLOBAL source unique (collection/`src/data`), jamais dupliqué inline.** · **Tunnel : miner la copie → catalogue, supprimer les 4 MDX de contenu, GARDER le template `ConversionFunnel` pour Phase C.** (directives 2026-06-13)
