# PLAN VAGUE VISUELLE · waimia.com · audit 2026-06-10

Audit empirique Playwright sur **prod live** (https://waimia.com), 1440×900 et 390×844, 14 pages mesurées + comparaison des séquences de sections des 9 offres (curl). Mesures brutes : `measures-1440.json`, `measures-1440b.json`, `measures-390.json` (même dossier). Screenshots d'appui : `*-fold.jpeg`.

**Cadre** : DA parchemin/encre/terracotta + typo + ton = intangibles. Tout est réalisable par COMPOSITION (sections cataloguées, crans `--section-tight/base/loose/grand`, prop `background paper|paper-2|paper-3|ink`, presets hero). 0 nouveau token, 0 nouveau composant. Pages signature (home/manifesto/console/atlas) : léger only (A7). Masthead `/solutions` : INTOUCHABLE (veto).

Valeurs observées : paper `rgb(246,241,232)` · paper-2 `rgb(239,233,221)` · ink `rgb(12,11,9)`. **`paper-3` : jamais rencontré sur les 14 pages auditées** (confirme doc 37 « sous-exploité »).

---

## 0. Tableau de bord des mesures

### Fold utile desktop 1440×900 (doctrine : un hero qui ne remplit pas l'above-fold ne sert à rien)

| Page | % fold utile | Hero (px) | Verdict |
|---|---|---|---|
| `/` (home) | **95 %** | 852 | ✅ excellent |
| `/manifesto` | 92 % | 792 | ✅ (signature) |
| `/offres/growth-system-ia` | 91 % | 834 | ✅ |
| `/offres/productivite-operationnelle-ia` | 100 % | 931 | ✅ |
| `/offres/conseil` | 100 % | 1033 | ✅ |
| `/secteurs/finance-compta` | 89 % | 828 | ✅ |
| `/ecole` | ~91 % | 899 | ✅ hauteur, ❌ kicker sous le header + compteurs à 0 |
| `/solutions` | 82 % | 736 | ✅ acceptable (masthead veto) |
| `/ressources/academy` | 70 % | 672 | ⚠️ candidat connu (46 % en preview) |
| `/offres` (hub) | 69 % | 653 | ⚠️ |
| `/agence/about` | 69 % | 666 | ⚠️ |
| `/cas` (hub) | 63 % | 653 | ⚠️ moitié droite du hero vide |
| `/cas/plateau` | **56 %** | 473 | ❌ pire score du site |
| `/ressources` | **50 %** | 539 | ❌ bande morte 450→667px |

### Mobile 390×844

| Page | Constat |
|---|---|
| `/` | hero 1500 px (1,78 viewport) : **CTA « Réserver un audit » à y=957, HORS fold** (la liste de capacités Acquisition/Contenu/Web/Sales/Data/Marque passe avant le CTA) ; « DISPONIBLE · T3 2026 » wrap moche |
| `/cas/plateau` | **1er CTA in-page à y=7736 sur 10 725 px** (72 % de scroll sans porte de sortie) |
| `/secteurs/finance-compta` | section « Ce qu'on automatise » = **4 282 px d'un seul bloc paper-2 (5 écrans)** ; gap CTA 999→9816 |
| `/cas`, `/ressources` | mastheads à 57 % / 55 % de fold utile |
| Partout | ✅ 0 scroll horizontal, tables OK (350 px), tailles H1 40-60 px lisibles |

### Séquences de sections (axe clones), preuve curl sur les 9 offres

7/9 offres ont la séquence STRICTEMENT identique :
`hero-detail → problem-statement → method-timeline → deliverables-grid → stat-block → cta-final(ink)`
(activation-ia, application-ia-pme, claude-cowork, growth-intelligence, growth-system-ia, infrastructure-ia, productivite-operationnelle-ia)

Contre-exemples réussis (à imiter, pas à toucher) :
- `conseil` : hero-hub-stats → manifesto-block → service-catalog → editorial-table → decision-list → fit-sec(ink) → related-cards → pull-quote → cta-final
- `composable-pilot` : hero-split → proof-bar → method-timeline → cta-final

---

## P1 · Impact fort / effort faible (à faire en premier)

### P1-1 · Kickers dupliqués dans les heros detail et cas (toutes offres + secteurs + 4 cas)
- **Pages** : 7 offres clones, 3 secteurs, 4 cas (≥ 14 pages).
- **Problème (preuve)** : `offre-productivite-1440-fold.jpeg` : « OFFRES / § 03 · PILIER » immédiatement suivi de « § 03 · PILIER » répété. `cas-plateau-1440-fold.jpeg` : « § CAS CLIENT » puis « § CASE 01 » empilés. Le breadcrumb-kicker et le kicker du hero affichent la même info deux fois.
- **Amélioration** : un seul kicker par hero (garder la ligne breadcrumb, supprimer la répétition), au niveau template (`OffresDetailTemplate`/`HeroOfferDetail`, `CaseStudyTemplate` eyebrow `§ Cas client` vs kicker `Case 01`, cf `CaseStudyTemplate.astro:173`).
- **Levier DS** : édition du composant hero catalogué (propagation automatique), atome `Kicker` canonique.
- **Risque** : quasi nul (suppression d'un doublon).

### P1-2 · « Cinq missions » pour 4 cas listés sur /ressources
- **Page** : `/ressources`.
- **Problème (preuve)** : h2 « Cinq missions. Toutes mesurées. » mais la section liste exactement 4 liens (`/cas/plateau`, `/cas/halcyon`, `/cas/northbound`, `/cas/caserne`), vérifié au DOM. Source : `src/pages/ressources/index.astro:187` (chiffre en dur). Même famille d'erreur que la collision menu/cas.
- **Amélioration** : « Quatre missions. Toutes mesurées. » ou dériver le mot du count réel de la collection.
- **Levier DS** : contenu pur, 0 design.
- **Risque** : nul.

### P1-3 · Fuites EN « wk » dans le cas Plateau (page FR)
- **Page** : `/cas/plateau`.
- **Problème (preuve)** : spec bar FR affiche « 10 wk » (screenshot `cas-plateau-1440-fold.jpeg`). Source : `src/content/cases/plateau.mdx:10` `duration: "10 wk"` et `:17` value « 10 wk » (la card du hub /cas affiche pourtant « 10 SEM » : incohérence entre surfaces). Vérifier les 3 autres cas.
- **Amélioration** : « 10 sem » côté FR (champ duration_fr si dispo, sinon valeur FR), garder wk en EN.
- **Levier DS** : frontmatter MDX, 0 design.
- **Risque** : nul.

### P1-4 · /ecole : compteurs à zéro + kicker mangé par le header sticky
- **Page** : `/ecole`.
- **Problème (preuve)** : `ecole-1440-fold.jpeg` : (a) la barre stats affiche « 3 FORMATIONS · 0 PARCOURS · 0 ATELIER » : annoncer deux zéros est anti-vente ; (b) le kicker « ÉCOLE WAIMIA · CATALOGUE · INSCRIPTIONS OUVERTES » est recouvert par la nav sticky (visible derrière le menu). Source compteurs : `src/pages/ecole/index.astro:31`.
- **Amélioration** : (a) filtrer les segments à 0 du label (« 3 formations · inscriptions ouvertes ») ; (b) +1 cran d'espace au-dessus du hero ecole-hub pour dégager le kicker.
- **Levier DS** : logique de label (contenu) + cran de rythme `--section-tight` en padding-top hero.
- **Risque** : quasi nul.

### P1-5 · Home mobile : le CTA hero sort du fold
- **Page** : `/` à 390×844 (page signature : modif légère only, conforme A7).
- **Problème (preuve)** : `home-390-fold.jpeg` + mesure : hero mobile 1500 px, CTA principal à y=957 (fold = 844). La liste de capacités (Acquisition/Contenu/Web/Sales/Data/Marque) passe AVANT le CTA et l'éjecte du fold.
- **Amélioration** : en mobile uniquement, remonter le bloc CTA + microcopy juste après la promesse (ordre flex/grid), la liste de capacités descend dessous. Aucun changement desktop.
- **Levier DS** : CSS `order` responsive dans l'organism `HeroHome` (léger, signature préservée).
- **Risque** : faible (vérifier le rendu 768px intermédiaire).

### P1-6 · /cas/plateau (et les 4 cas) : 72 % de scroll sans CTA + climax final incohérent
- **Pages** : `/cas/plateau`, `/cas/halcyon`, `/cas/northbound`, `/cas/caserne`.
- **Problème (preuve)** : desktop : aucun CTA in-page avant y=6287/8121 ; mobile : y=7736/10725. ET le `cta-final` des cas est en **paper** alors que celui des offres est en **ink** : le moment le plus chaud du site (fin d'une preuve client) a le climax le plus faible.
- **Amélioration** : (a) insérer un `CtaInline` contextualisé juste après `metric-shift` (« Votre pipeline a un Plateau ? 45 min pour le voir ») ; (b) passer le `cta-final` des cas en `background: ink` (cohérence avec offres + modèle cas-cta du hub /cas qui est déjà ink).
- **Levier DS** : section cataloguée `CtaInline` existante + prop `background=ink` sur CtaFinal. 0 création.
- **Risque** : faible ; ton du CtaInline à écrire sobre (pas de hard-sell au milieu d'une preuve).

### P1-7 · Dé-cloner les 7 offres : 2-3 archétypes de séquence + 1 section différenciante
- **Pages** : les 7 offres clones (cf preuve curl ci-dessus).
- **Problème** : un prospect qui compare 2 offres voit la même page avec d'autres mots ; aucune mémorisation différenciée ; fatigue à la 2e visite. Doc 37 §2.6 prévoyait exactement ce correctif.
- **Amélioration** (composition pure, par familles) :
  - **Growth (growth-system-ia, growth-intelligence)** : + `MetricShift` (chiffres avant/après) entre deliverables et stat-block, `deliverables-grid` en `paper-2`.
  - **Adoption (activation-ia, claude-cowork, productivite-operationnelle-ia)** : + `PullQuoteBlock` ou `QuoteSpotlight` (parole d'équipe terrain) après method-timeline, `stat-block` en `paper-2`.
  - **Build (application-ia-pme, infrastructure-ia)** : + `MediaBlock` ou `ArchitectureDiagram` (montrer le système), `problem-statement` en `paper-2`.
  - Conserver le squelette commun (cohérence > originalité) : on ajoute UNE section signature + UN fond par archétype, pas plus.
- **Levier DS** : sections cataloguées existantes (`MetricShift`, `PullQuoteBlock`, `QuoteSpotlight`, `MediaBlock`, `ArchitectureDiagram`) + prop `background`. Les offres sont en MDX composable : pur frontmatter.
- **Risque** : moyen (contenu à produire pour les quotes/metrics : réutiliser proof-points et testimonials existants, sans em-dash). GF-1 par page.

### P1-8 · Home : 9 800 px sans CTA + 10 sections paper d'affilée
- **Page** : `/` (signature : léger only = prop background + 1 insertion, pas de refonte).
- **Problème (preuve)** : entre le CTA hero (y=706) et le CTA final (y=10495), RIEN sur 9 800 px. Fonds : 10 sections paper sur 12, seules services-grid et la section méthode sont en paper-2 (mesure `measures` home). La fin de page (cas d'usage → dossiers → FAQ → blog → CTA) = 6 400 px de paper ininterrompu.
- **Amélioration** : (a) 1 `CtaInline` sobre après la section architecture (y≈3100, moment où la promesse technique est posée) ; (b) passer « Quatre dossiers » OU la FAQ en `paper-2` et le `book-session` final en `ink` (même climax que les offres ; le « Stop le théâtre. Câbler. » en encre, c'est exactement le ton).
- **Levier DS** : `CtaInline` catalogué + prop `background`. 2 changements de fond + 1 insertion = léger.
- **Risque** : faible ; valider visuellement que book-session supporte l'inversion (GF-1).

### P1-9 · /cas hub : hero qui ne remplit pas (63 %) et moitié droite vide
- **Page** : `/cas`.
- **Problème (preuve)** : `cas-hub-1440-fold.jpeg` : « Pas de marketing. Des chiffres. » superbe, mais toute la zone droite du hero est vide et les cards sont coupées au milieu de leur titre. Une page qui promet « des chiffres » n'en montre AUCUN above-fold.
- **Amélioration** : monter les chiffres dans le masthead : 3-4 stats agrégées (2,4 M€ pipeline · 120 h libérées · −57 % temps de prod · 4 secteurs) en colonne droite ou bandeau sous la lede, sur le modèle du preset `HeroHubStats` (déjà catalogué, utilisé par conseil). Alternative coût zéro : compresser le hero d'un cran (`--section-tight` en bas) pour faire entrer la 1re rangée de cards entière.
- **Levier DS** : preset hero `HeroHubStats` existant OU cran de rythme. Chiffres = réutiliser les impact_fr des 4 cas (cohérence chiffres entre surfaces, cf P1-2/P1-3).
- **Risque** : faible. Ce masthead n'est PAS sous veto (seul /solutions l'est).

### P1-10 · /ressources : 50 % de fold utile, bande morte de ~220 px
- **Page** : `/ressources`.
- **Problème (preuve)** : `ressources-1440-fold.jpeg` : hero fini à ~450 px, prochaine section à 667 px ; à 390px le masthead tombe à 55 %.
- **Amélioration** : réduire l'espace hero→hub-tools d'un cran (`--section-tight`) pour que « Trois lectures. Pas de funnel commercial. » et la 1re carte entrent au fold ; OU enrichir le masthead d'un sous-bandeau de compteurs réels (« 4 cas · N notes · N cookbooks · N outils », calculés des collections, jamais en dur, cf leçon P1-2).
- **Levier DS** : cran de rythme ; option compteurs = pattern stats du masthead /cas (P1-9).
- **Risque** : quasi nul (nav Ressources intouchable = le MENU ; la page hub n'est pas sous veto).

---

## P2 · Impact fort / effort moyen

### P2-1 · /agence/about et /ressources/academy : casser le monolithe « utility »
- **Pages** : `/agence/about` (util-body 1761 px d'un bloc), `/ressources/academy` (util-body 2230 px).
- **Problème** : 3 sections seulement (hero → pavé géant → cta), 100 % paper, zéro respiration, zéro preuve visuelle. La page « qui sommes-nous », destination n°1 d'un prospect qui doute, est la plus pauvre visuellement du site (fold 69-70 %).
- **Amélioration** (composition) : éclater util-body en 3-4 sections cataloguées : `PullQuoteBlock` (la frustration de chantier fondatrice), `StatsBento` ou `ProofBarSection` (chiffres agence), `CommitmentsGrid` (les choix : boutique, francophone, code le mardi), option `TeamCardGrid`. Alternance `paper → paper-2 → paper → ink(cta)`.
- **Levier DS** : sections cataloguées existantes + prop background + crans.
- **Risque** : moyen (réécriture du flux du contenu existant ; aucun composant neuf). Si la page reste template Utility, c'est l'occasion de la passer composable (sections frontmatter), aligné Phase 1 du master plan.

### P2-2 · /secteurs/finance-compta mobile : « Ce qu'on automatise » = 5 écrans d'un bloc
- **Page** : `/secteurs/finance-compta` (vérifier industrie + services-b2b).
- **Problème (preuve)** : mesure mobile : section sol-sec paper-2 de 4 282 px (desktop 2 481 px). Hiérarchie écrasée : impossible de savoir où on en est.
- **Amélioration** : scinder en 2 sections au niveau du template secteurs (workflows en 2 groupes avec 2 kickers) OU alterner le fond à mi-parcours (paper-2 → paper) pour recréer un repère ; crans internes `--section-tight`.
- **Levier DS** : prop background + crans ; le contenu workflows est déjà structuré (slot workflows R2/P2).
- **Risque** : moyen (template partagé 3 secteurs, GF-1 sur les 3).

### P2-3 · H1 secteurs = titre SEO recopié
- **Pages** : 3 secteurs.
- **Problème (preuve)** : h1 « Finance & Compta · IA pour cabinets et DAF PME » = exactement le `<title>`. Tout le reste du site a des H1 éditoriaux (« Pas de marketing. Des chiffres. », « Le conseil qui commence par lire, pas par présenter. »). Les secteurs parlent en notice.
- **Amélioration** (propositions, sans em-dash) : finance-compta : « La clôture en 3 jours. Sans embaucher. » ; industrie : sur le modèle douleur+chiffre ; le « Finance & Compta · IA cabinets et DAF » descend en kicker. Les chiffres de la lede (9j→3j, −85 %, ROI 3,8×) restent : ils sont excellents.
- **Levier DS** : contenu frontmatter, 0 design.
- **Risque** : faible (vérifier le SEO : garder le title tel quel, seul le H1 devient éditorial).

### P2-4 · /offres hub : fold 69 % et 1er CTA réel à 1 737 px
- **Page** : `/offres`.
- **Problème** : masthead « Trois niveaux. Une méthode. » fini à ~620 px, le tier-1 n'entre pas au fold ; le seul CTA avant 5 549 px est une card d'offre.
- **Amélioration** : cran tight masthead→tier-1 pour faire entrer le titre du 1er niveau au fold (affordance « il y a la suite ») ; option : ligne de stats sous la lede (modèle P1-9).
- **Levier DS** : cran de rythme ; preset masthead stats.
- **Risque** : faible.

---

## P3 · Polish / opportuniste

### P3-1 · Introduire paper-3 là où la hiérarchie le mérite (2 endroits max)
- **Constat** : `paper-3` (variante chaude rare, `global.css:1155`) jamais utilisé sur les 14 pages : un cran de relief disponible et gratuit.
- **Proposition** : `tech-stack-band` des cas (actuellement paper-2) et `hub-cookbooks` de /ressources : les 2 moments « matière/artisanat » où la teinte chaude a du sens. PAS plus de 2 usages (ça doit rester rare pour rester précieux).
- **Levier** : prop background. **Risque** : faible, GF-1 contraste AA à vérifier.

### P3-2 · Rythme vertical des offres : tout est au même cran
- **Constat** : sections d'offres toutes entre 867 et 1 207 px, padding 96 px uniforme : le rythme R4 existe mais n'est pas JOUÉ (tight/base/loose/grand disponibles, seul base est utilisé + 128 px sur book-session home).
- **Proposition** : resserrer les sections de preuve courtes (`stat-block`, `pull-quote` en tight/base), aérer le climax (`cta-final` en loose). 1 page pilote (growth-system-ia) puis générMDX.
- **Levier** : crans de rythme R4. **Risque** : faible mais GF-1 page entière.

### P3-3 · Home mobile : « DISPONIBLE · T3 2026 » wrap cassé
- **Preuve** : `home-390-fold.jpeg` (« T3 2026 » seul sur sa ligne). `white-space: nowrap` ou raccourcir le label mobile. Risque nul.

### P3-4 · CtaInline mi-page sur les offres longues
- Après P1-7 : si les offres dépassent ~6 000 px, 1 `CtaInline` après method-timeline (y≈3 000). Cohérent avec P1-6/P1-8 : règle implicite « jamais plus de ~3 500 px sans porte de sortie ».

---

## Ce qui est déjà excellent (ne pas toucher, s'en servir de modèle)

1. **Hero home desktop** (95 %) : promesse + capacités + double CTA + microcopy de dé-risquage (« 30 min, on identifie 3 automatisations rentables ») + KPI colonne droite. Niveau Awwwards, c'est LE modèle du site.
2. **/manifesto** : alternance ink/paper/terracotta magistrale (7 bascules de fond), CTA tôt (y=723) et en fin. Modèle de climax.
3. **/secteurs/finance-compta desktop** : la meilleure alternance de fonds du site (paper → paper-2 → ink → paper → paper-2 → ink), 89 % fold, CTA hero contextualisé (« Activer Excel parlant »). Modèle pour les offres.
4. **/offres/conseil** : variété intra-page exemplaire (9 types de sections différents), fit-sec ink au bon moment. Modèle P1-7.
5. **Hygiène technique** : 0 erreur console sur toutes les pages auditées, 0 scroll horizontal mobile, tables lisibles à 390 px, tailles H1 mobiles bien calibrées (40-60 px).
6. **Ton éditorial** des H1/ledes hors secteurs : « Pas de marketing. Des chiffres. », « Tout ce qu'on publie. », « Stop le théâtre. Câbler. » : différenciant, cohérent.

## Ordre d'exécution suggéré (par vagues GF-1)

1. **Vague contenu** (P1-1, P1-2, P1-3, P1-4a, P2-3, P3-3) : textes/frontmatter/labels, risque quasi nul, 1 PR.
2. **Vague conversion** (P1-5, P1-6, P1-8a, P3-4) : CtaInline + ordre mobile hero home.
3. **Vague fonds & rythme** (P1-8b, P1-9, P1-10, P2-4, P3-1, P3-2) : props background + crans, GF-1 visuel par page.
4. **Vague dé-clonage offres** (P1-7) : 3 archétypes, 1 famille = 1 sous-vague GF-1.
5. **Vague monolithes** (P2-1, P2-2) : about/academy composables + secteurs mobile.

Chaque vague : preview Vercel + screenshot above-fold 1440 ET 390 + getComputedStyle avant merge (GF-1), 1 scope = 1 branche.
