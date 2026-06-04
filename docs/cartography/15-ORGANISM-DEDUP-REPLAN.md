# 15 — ORGANISM DEDUP · RE-PLAN source-vérifié (corrige doc 14)

> Re-planification de la dédup des organismes home → jumeaux catalogués, après **comparaison au niveau source** (agent read-only 2026-06-04, Opus). **Corrige doc `14-CONVERSION-READINESS.md`** : les paires SixServices/Cases y étaient marquées « FIDÈLE » ; la lecture fine montre qu'elles sont **DÉRIVÉES** (deltas réels listés ci-dessous). **Aucune conversion organism n'est byte-identique** → toutes requièrent un arbitrage Simon (curation : quel modèle est canonique + comment réconcilier).

## Pourquoi ce n'est PAS comme la fusion héros H4
- **H4 (fait, `9789049`)** = fusion de fichiers-composants **byte-identiques** (même markup+CSS colocalisés, type-ids préservés, 0 choix de modèle) → sûr en autonome, prouvé par GF-1 diff prod↔local = 0.
- **Organism → jumeau** = les deux **diffèrent** (fond, liens, markup header). Choisir lequel devient canonique (et comment aligner) = **décision design/produit = curation Simon**. Convertir en autonome shipperait une régression. C'est la barrière que Simon a posée : « cartographier 100 %… cela nous aidera ensuite à choisir quel modèle on retient ».

## Verdict source-vérifié par paire (les 2 réputées « fidèles »)

### SixServices ↔ `services-grid` (`ServicesGrid.astro`) — **DÉRIVÉ**
Corps de grille (cellules, tokens, hover, breakpoints 900/600) : **équivalent ligne à ligne**. Mais 3 divergences :
- **D1 — fond `paper-2`** : `ServicesGrid.astro:54` pose `background:var(--paper-2)` ; `SixServices.astro:58` (`#act-2`) **ne le pose pas** (hérite du fond page). → **delta visuel réel possible** selon le fond hérité à la position home (après FeatureGrid/SystemArchitecture). À trancher : aligner le jumeau (retirer paper-2) OU accepter.
- **D2 — header chapter** : organism = atome `<ChapterLabel>` (`<div class="u-chapter-label">` styles inline) ; jumeau = markup BEM `__chapter` piloté `<style>`. Valeurs équivalentes, **DOM différent** → équivalence pixel à prouver.
- **D3 — h2** : organism JSX `<i>` littéral ; jumeau `set:html data.h2_fr` → exige `h2_fr = "Six services, appris en <i>livrant</i> — pas en PowerPoint."`.
- **Mapping piège** : `fig` doit valoir `2.01`..`2.06` (le jumeau préfixe `FIG `, organism affiche `FIG 2.{s.k}`). Passer `s.k`(=`01`) donnerait `FIG 01` ≠ `FIG 2.01`.

### Cases ↔ `case-card-grid` (`CaseCardGrid.astro`) — **DÉRIVÉ**
Rows (grille 6 col `90px 2fr 1.1fr 1.5fr 1.4fr 32px`, hover, breakpoints 1100/600) : **équivalent ligne à ligne**. Mais :
- **D5 — liens NON localisés** : `Cases.astro:39` `localizeHref(\`/cas/${slug}\`, lang)` ; `CaseCardGrid.astro:31` `href={c.href}` **brut**. → en EN, liens cassés sauf à fournir `data` **pré-localisé par langue** (data FR ≠ data EN). **Régression fonctionnelle si non géré.**
- **D6 — foot link conditionnel** : jumeau `{data.all_href && …}` → si `all_href`/`all_label_*` omis, la ligne « Tous les dossiers → » **disparaît** (delta visuel).
- **D7 — nombre** : organism `CASE_FEED.slice(0,4)` (4 dossiers, exclut `virtuoseos`). Passer exactement les 4 premiers.
- **`row-lines`** : classe présente sur l'organism (`Cases.astro:37`), **absente** du jumeau → vérifier qu'elle n'apporte pas un style/anim piloté par le script home (sinon delta).
- **D2 header** : même divergence atome→BEM que SixServices.

## Décisions Simon requises (curation) — par paire, AVANT toute conversion
Pour CHACUNE des 9 paires home (les 2 ci-dessus + les 7 de doc 14) : choisir **(a) aligner le jumeau sur l'organism** (→ conversion byte-identique ensuite, GF-1 0-delta) · **(b) accepter le restyle** du jumeau (delta assumé) · **(c) garder bespoke** (hors catalogue). Cas spécifiques :
- `hero-home` : porter les **View Transitions** inter-pages (absentes du jumeau) avant toute conversion, sinon régression navigation.
- `BookSession`→`cta-final` & `FooterMarquee`→`marquee-band` : **mauvais composant cible** (doc 14) → créer le bon type ou garder bespoke.
- SixServices : trancher le **fond paper-2** (D1).
- Cases : décider la **stratégie de liens localisés** (data par langue) + garder le foot link + vérifier `row-lines`.

## Séquence d'exécution (dès arbitrage Simon, même patron que H4)
1. Aligner les jumeaux retenus (worker, byte-cible = l'organism live).
2. Convertir `index.astro` FR+EN **en une fois** (éviter home hybride) — worker.
3. **GF-1 STRICT** : home FR + EN, diff prod(avant)↔local(après) = 0 sur above-fold + chaque section convertie (fond, `getComputedStyle` `.six-cell`/`.cases-row`, liens, reveals/`reveal-stagger`, foot link). Merge ff seulement si delta = 0.

## État dédup à ce jour (preuve)
- **FAIT** (`8df9546`) : 5 organismes dupliqués 0-consommateur supprimés (HowWeShip/Manifesto/OperatingLayer/WhyAIStalls/WritingNotes) → jumeaux catalogués = source unique. + 2 sans jumeau (Offices/SigBand).
- **RESTE (gated curation)** : 9 organismes encore inline dans `index.astro` (Hero, SystemArchitecture, SixServices, Pyramid, Departments, Cases, FieldNotes, BookSession, FooterMarquee) + 5 keep-bespoke chrome (AtlasGrid/CookiesBanner/PersonaSwitcher/Stub/ManifestoAccent).
