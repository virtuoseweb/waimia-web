# Audit visuel sectionné · Home waimia.com (prod live)

Audit empirique Playwright sur https://waimia.com, viewport 1440×900, reduced-motion, cookies refusés (bannière retirée des captures). Page mesurée : **12 110 px** de haut, **12 sections de contenu + 8 interludes `SectionTransition` (8 × 113 px = 904 px) + marquee footer**. Inventaire DOM brut : [`dom-inventory.json`](dom-inventory.json). Vue d'ensemble : [`00-fullpage.jpeg`](00-fullpage.jpeg).

Directive Simon : « certaines sections en plusieurs actes ont des incohérences, on a créé des éléments visuels qui font juste décoratif sans servir le contenu, en répétant 3 fois la même information ». Principe directeur appliqué : **1 information = 1 représentation**, chaque élément visuel doit servir le contenu, DA minimaliste/swiss/editorial-tech, qualité Awwwards (référence interne : le hero actuel, intangible).

Complément, ne duplique pas : `docs/39-PLAN-VAGUE-VISUELLE.md` (P1-5 CTA mobile hors fold, P1-8 : 9 800 px sans CTA + 10/12 sections paper, P3 : paper-3 jamais utilisé). Cet audit ajoute la couche « redondance d'information + recomposition narrative ».

Note de capture : les screenshots 07 et 08 incluent la nav sticky et un panneau de liens (English / Réserver un audit) en haut : artefact de capture élément (overlay fixe inclus dans la bounding box), pas un bug prod.

---

## Les 3 pires redondances (sourcées)

1. **MaturityPyramid : la même information 4 fois** (`src/components/sections/MaturityPyramid.astro`, cas d'école pointé par Simon). Les 4 paliers Cartographier/Câbler/Orchestrer/Industrialiser apparaissent dans : (a) le **H2 lui-même** (« Cartographier. Câbler. Orchestrer. Industrialiser. », `index.astro:113`), (b) la **timeline 4 jalons** (`pyramid-timeline`, roman + verbe + stage, MaturityPyramid.astro:33), (c) la **barre de segments SVG I-IV** (`pyramid-svg`, roman + tag, :43), (d) les **4 cards détaillées** (`ec-grid cols-4`, qui répètent ENCORE le verbe via `e-action`, le roman via `e-num`, le tag via `e-tag`, :67-78). Le verbe est affiché 4×, le chiffre romain 3×, le tag 2×. Seules les cards portent de l'information nouvelle (lead, livrables, lien palier). 1 223 px, la section la plus haute de la page, pour une seule information.
2. **« 12h économisées » affiché 3 fois sur la même page.** (a) Hero, colonne « § 02 · Résultats concrets » : « +12h économisées par équipe · semaine » (`Hero.astro:128`) ; (b) StatBlock proof-bar immédiatement en dessous : « 12h/sem économisées par équipe / semaine » (`HERO_METRICS`, `src/data/sitemap.ts:511`, monté `index.astro:224`) ; (c) badge « +12H / SEM » sur la card FIG 2.05 de ServicesGrid (`SIX_SERVICES` metric). Même donnée, même libellé, à 250 px puis 2 700 px d'écart. Le « +€840K » est lui aussi doublé (proof-bar + badge FIG 2.02 « +840 K€ PIPE »). Les deux blocs portent en plus le même kicker « § 02 » (hero : « § 02 · RÉSULTATS CONCRETS » ; proof-bar : « § 02 · PREUVES »).
3. **La taxonomie des capacités répétée 5 fois.** Acquisition/Contenu/Site/CRM/Analytics/Marque (± synonymes) apparaît dans : (a) la mini-map 6 territoires du hero, (b) FeatureGrid « 8 piliers » ([04](04-feature-grid.jpeg)), (c) les 6 canaux d'entrée de l'ArchitectureDiagram ([05](05-architecture-diagram.jpeg)), (d) les 6 services de ServicesGrid ([06](06-services-grid.jpeg)), (e) les 6 use cases d'UseCaseIndex ([08](08-use-case-index.jpeg)). Cinq listes quasi superposables sans que le visiteur comprenne ce qui les distingue (pilier ? service ? cas d'usage ? canal ?). Exemple mot à mot : pilier 04 « Un CRM qui qualifie, relance et reporte, sans relance manuelle » vs service FIG 2.03 « Le CRM qui relance, qualifie et alerte, sans que vous touchiez rien ».

**Bonus incohérences relevées au passage** : (a) UseCaseIndex titre « **Cinq** cas d'usage » mais liste **6** items (USE CASE 01-06 ; `DEPARTMENTS_GRID` a 6 entrées, le heading `index.astro:143` dit cinq) ; (b) le système éditorial actes/figures est cassé : FIG II·2.5 (architecture) passe AVANT FIG II·2.0 (services), « Acte II » est porté par 2 sections différentes (services + pyramide), « Acte VI · Notes de terrain » arrive AVANT « Acte V : Passer à l'action », et les actes I/III n'existent nulle part. Un device signature incohérent devient du bruit décoratif ; (c) CaseCardGrid affiche « 10 WK / 6 WK / 14 WK / 8 WK » en page FR (cf doc 39 P1-3, « 10 SEM » ailleurs) ; (d) hero « ◉ DISPONIBLE · T3 2026 » vs BookSession « ● DISPONIBLE · RÉPONSE SOUS 24H » : deux claims de disponibilité non alignés.

---

## Verdicts section par section

### 01 · Hero (`ui/organisms/Hero.astro`, 852 px) · [capture](01-hero.jpeg)
**GARDER (intangible, hors scope par directive).** Référence qualité : promesse claire, mini-map 6 territoires, 2 CTA + sous-CTA chiffré, 3 preuves verticales. Une seule conséquence pour le reste de la page : tout ce que le hero affiche déjà (taxonomie des 6 territoires, « +12h », « 100 % sans changer vos outils ») ne doit PLUS être ré-affiché à l'identique en dessous.

### 02 · StatBlock preset proof-bar (`sections/StatBlock.astro`, 254 px) · [capture](02-proof-bar.jpeg)
**FUSIONNER avec SocialProof.** Info apportée : 4 métriques agrégées. Redondance : « 12h/sem » duplique mot pour mot la preuve n°1 du hero située 250 px plus haut ; double kicker « § 02 ». Décoratif non fonctionnel : aucune attribution, les chiffres flottent sans source, donc crédibilité faible malgré la belle typo didone terracotta.
**Recomposition** : une seule **bande de preuve unifiée** = 3 métriques NON déjà présentes dans le hero (23 workflows · +€840K pipeline · 3,4× ROI) + les logos clients en dessous + un lien « voir les 4 dossiers → » vers `/cas`. Les chiffres deviennent sourcés (médiane clients → dossiers), la page gagne une section. Composants : StatBlock (3 metrics) + SocialProof dans le même wrapper, ou variante à créer (cf backlog).

### 03 · SocialProof (`sections/SocialProof.astro`, 123 px) · [capture](03-social-proof.jpeg)
**FUSIONNER avec la proof-bar (cf 02).** Info : 13 noms clients en marquee texte. Seule, c'est la section la plus faible : marques inconnues du visiteur, défilement décoratif, et coût réel ~350 px avec ses 2 interludes. Les noms (Plateau, Caserne...) re-apparaissent dans CaseCardGrid : la fusion preuve chiffrée + logos + lien dossiers transforme deux signaux faibles en un seul signal fort.

### 04 · FeatureGrid « 8 piliers » (`sections/FeatureGrid.astro`, 706 px) · [capture](04-feature-grid.jpeg)
**SUPPRIMER de la home** (le composant reste au catalogue pour d'autres pages). Info : la liste des 8 capacités. Redondance maximale : 3ᵉ occurrence de la taxonomie (après hero mini-map, avant architecture/services/use-cases), et son H2 « Du canal à l'action » dit exactement ce que dit l'ArchitectureDiagram (« Six entrées, quatre sorties »). Les 2 piliers que le hero ne couvre pas (Workflows & agents IA, AI Act · RGPD · Sécurité) migrent : le 1ᵉʳ est déjà le cœur du diagramme, le 2ᵈ devient un nœud/une légende du diagramme ou reste porté par la FAQ Q.05.
**Gain : ~820 px (section + interlude) et une répétition de moins.**

### 05 · ArchitectureDiagram (`sections/ArchitectureDiagram.astro`, 813 px) · [capture](05-architecture-diagram.jpeg)
**GARDER (avec corrections).** C'est LA représentation qui sert réellement le contenu : le SVG signature 6 canaux → système → 4 sorties montre le modèle mental de l'offre, sans équivalent ailleurs sur la page. C'est aussi le seul moment « montrer plutôt que dire ».
**Corrections** : (a) renuméroter (FIG II·2.5 ne peut pas précéder FIG II·2.0) ; (b) absorber le message de FeatureGrid (cf 04) : hover/focus sur chaque nœud d'entrée → 1 ligne d'exemple concret (« CRM → relance J+3 automatique ») ; (c) la « BOUCLE D'AMÉLIORATION CONTINUE » pointillée est aujourd'hui purement décorative : l'animer (dash-offset au scroll) ou la légender pour qu'elle raconte la réinjection.

### 06 · ServicesGrid (`sections/ServicesGrid.astro`, 959 px) · [capture](06-services-grid.jpeg)
**GARDER : devient l'unique taxonomie de l'offre (avec dédoublonnage).** Info forte : 6 services nommés, 1 ligne de bénéfice, connecteurs concrets (HubSpot, GA4, Excel...) : c'est ce qu'un prospect « achète ». Redondances à purger : badges « +840 K€ PIPE » et « +12H / SEM » (déjà dans la bande preuve) → remplacer par un chiffre PROPRE à chaque service ou par le connecteur le plus parlant ; resserrer les libellés qui paraphrasent l'ex-FeatureGrid.
**Recomposition** : absorber UseCaseIndex (cf 08) : sous chaque service, le lien vers son cas d'usage `/solutions/*` (le mapping est quasi 1:1 : acquisition→Acquisition, CRM→CRM & Relances, données→Productivité, etc.). Une grille, deux niveaux de lecture, zéro section en plus.

### 07 · MaturityPyramid (`sections/MaturityPyramid.astro`, 1 223 px) · [capture](07-maturity-pyramid.jpeg)
**RECOMPOSER (cas d'école, cf redondance n°1).** Garder UNE représentation : les **4 cards** (seules porteuses d'info neuve : lead, livrables, lien palier). Supprimer la timeline `pyramid-timeline` ET la barre de segments `pyramid-svg`. Réintégrer dans chaque card ce que les 2 éléments supprimés apportaient d'unique : le stage (AUDIT / WORKFLOW / SYSTÈME / INFRASTRUCTURE) en sur-titre de card, et la notion de progression par une jauge fine (1 hairline terracotta qui s'allonge de I à IV en pied de card, ou la largeur croissante des colonnes : asymétrie maîtrisée au lieu d'un SVG séparé).
**Enrichissement clé (manque comblé, cf axe sections manquantes)** : ajouter le **prix d'entrée par palier** (« dès 1 500 € HT · 1 semaine » sur le palier I, etc.) : la pyramide est littéralement la « pyramide d'engagements » mais n'affiche aucun engagement chiffré ; les prix existent déjà en FAQ Q.01. Hauteur cible ~700 px (-520 px).

### 08 · UseCaseIndex (`sections/UseCaseIndex.astro`, 1 017 px) · [capture](08-use-case-index.jpeg)
**FUSIONNER avec ServicesGrid (cf 06).** Info : 6 liens vers `/solutions/*` avec 3 mots-clés chacun. Redondance : 5ᵉ occurrence de la taxonomie ; les mots-clés (« ADS · LANDING · GEO », « PIPELINE · QUALIFICATION · NURTURING ») répètent les connecteurs de ServicesGrid. 1 017 px pour 6 liens, c'est le pire ratio information/scroll de la page. Bug contenu à corriger quoi qu'il arrive : « Cinq cas d'usage » ≠ 6 items listés.
La carte « ADAPTÉ À VOTRE SECTEUR → /secteurs » (info unique et utile) survit : 1 ligne de pied dans la grille fusionnée. **Gain : ~1 130 px.**

### 09 · CaseCardGrid (`sections/CaseCardGrid.astro`, 1 057 px) · [capture](09-case-card-grid.jpeg)
**GARDER.** La meilleure section du corps de page : 4 dossiers, secteur · durée · stack · impact chiffré, zéro gras, exactement le ton « des chiffres, pas du marketing ». Non redondante (les chiffres par client ≠ les médianes de la bande preuve). Corrections mineures : « WK » → « SEM » en FR (cohérence doc 39 P1-3) ; les noms des clients font écho aux logos de la bande preuve fusionnée, ce qui devient une force (le logo croisé plus haut se matérialise en dossier).

### 10 · FaqAccordion (`sections/FaqAccordion.astro`, 926 px) · [capture](10-faq-accordion.jpeg)
**GARDER.** 8 questions réelles (prix, fit, ROI, réversibilité, RGPD, stack, CMS, marque), zéro redondance, vrai travail d'objections. Point faible : c'est l'unique endroit de la page où un prix apparaît, et il est caché derrière un accordéon fermé → ouvrir Q.01 par défaut, et dupliquer l'ancrage prix dans la pyramide (cf 07) ; la FAQ garde le détail.

### 11 · EditorialPreview (`sections/EditorialPreview.astro`, 919 px) · [capture](11-editorial-preview.jpeg)
**RECOMPOSER (compression).** Rôle légitime : autorité + maillage interne. Mais 919 px pour 5 liens de blog, placés entre la FAQ et le CTA final, diluent la fin du tunnel. Passer à 3 entrées (les 2 entrées « CAS » re-racontent des dossiers déjà vus dans CaseCardGrid : en garder 1 max, privilégier NOTE/ESSAI qui apportent la doctrine). Corriger la numérotation « Acte VI » avant « Acte V ». Hauteur cible ~600 px.

### 12 · BookSession (`ui/organisms/BookSession.astro`, 705 px) · [capture](12-book-session.jpeg)
**GARDER, recomposer le fond.** « Stop le théâtre. Câbler. » est le bon climax, et « si on n'a rien à vous proposer, on le dit » est un vrai risk-reversal. Deux corrections : (a) passer la section en **ink** (texte paper) : même climax que les offres et le manifesto, recommandation déjà actée doc 39 P1-8 ; aujourd'hui le moment le plus chaud de la page est sur le fond le plus tiède ; (b) aligner le claim de disponibilité avec le hero (T3 2026 vs sous 24h : choisir la formulation unique « Disponible T3 2026 · réponse sous 24h »).

### Interludes · SectionTransition ×8 (`ui/atoms/SectionTransition.astro`, 8 × 113 px) · [exemple](02b-section-transition-sample.jpeg)
**RECOMPOSER : en garder 3-4.** Les phrases-pont sont une belle idée éditoriale, mais ×8 au même format (italique centrée, même hauteur, même fond) elles deviennent un tic décoratif qui ajoute 904 px et ralentit le scan ; plusieurs paraphrasent la section suivante (« Une architecture ne vaut que si elle livre » → suivi d'un H2 qui dit la même chose). Garder les pivots narratifs majeurs uniquement : preuve→méthode, méthode→preuves clients, avant CTA final. Avec moins de sections (cf séquence cible), le besoin de liant diminue mécaniquement.

### Footer · FooterMarquee (`ui/organisms/FooterMarquee.astro`, 67 px) · [capture](13-footer-marquee.jpeg)
**GARDER.** Signature à coût quasi nul, non redondante dans sa fonction (ruban de sortie).

---

## Axe 1 · Sections MANQUANTES (narration prospect PME/ETI + patterns sites primés)

1. **Voix humaine incarnée : ABSENTE.** La home n'a aucune citation, aucun visage, aucun nom : que des chiffres et des clients anonymisés. Pour une PME qui achète de la confiance avant d'acheter de l'IA, c'est le manque n°1. Les sites B2B primés intercalent systématiquement une parole client forte entre l'offre et la preuve chiffrée. **Couverture catalogue : `QuoteSpotlight` (ou `TestimonialBlock`)**, 1 seule citation, grande, attribuée (nom, rôle, entreprise : un des 4 dossiers), placée juste avant ou après CaseCardGrid.
2. **Démonstration « montrer plutôt que dire » : ABSENTE.** La page AFFIRME un système mais ne MONTRE jamais un livrable (dashboard, relance générée, avant/après). **Couverture catalogue partielle : `MetricShift`** (bascule avant/après chiffrée, déjà recommandée doc 39 pour les offres Growth) intégrable dans un dossier de CaseCardGrid ; pour une vraie démo visuelle du système en marche (mini-capture produit, workflow animé), **rien au catalogue n'est à la hauteur → demande de création** (cf backlog).
3. **Ancrage prix/engagement : ENFOUI.** Prix uniquement en FAQ fermée. Pas besoin d'une section de plus : intégrer le prix d'entrée par palier dans la pyramide recomposée (cf 07) + ouvrir Q.01 par défaut. Couverture catalogue si on préfère une section : `OfferTierGrid` / `RoiBand`.
4. **Objections/risque inversé : PARTIELLEMENT couvert** (FAQ + la promesse du BookSession). Pas de section supplémentaire : renforcer le risk-reversal dans BookSession (3 garanties en 1 ligne chacune : diagnostic gratuit · réversibilité documentée · pas de relance). `GuaranteeBlock`/`ObjectionHandler` existent si un jour on veut l'expliciter.
5. **Point de vue tranché/manifesto : RETIRÉ de la home** (réservé `/manifesto`), et ça se sent : la différenciation idéologique (« stop le théâtre IA ») n'arrive qu'au CTA final. Réintroduire 1 dose homéopathique : remplacer UN interlude par un **`PullQuoteBlock` signé** (1 phrase de doctrine + lien `/manifesto`) au tiers du parcours. Pas plus : la home reste business-first.
6. **Urgence/disponibilité réelle : INCOHÉRENTE** (cf 12). Pas une section : un alignement hero ↔ BookSession, et si la contrainte de capacité est réelle (T3 2026), la chiffrer au CTA (« X créneaux d'audit par mois »).

## Axe 2 · Gap Awwwards par section GARDÉE

- **Bande preuve unifiée (02+03)** : count-up des chiffres au scroll (1 fois, sobre), logos en petites caps avec hairlines verticales déjà en place, attribution cliquable « médiane sur 4 dossiers → ». Le gap actuel : des chiffres muets et des logos morts ; la fusion les fait dialoguer.
- **ArchitectureDiagram (05)** : le SVG est statique : dash-offset progressif des courbes au scroll (GSAP/ScrollTrigger déjà chargés par la page), pulsation 1× du cercle central, hover nœuds → exemple concret. C'est LA candidate « site of the month » de la page : un diagramme signature animé sobrement vaut mille cards.
- **ServicesGrid (06)** : grille 3×2 parfaitement uniforme = sage. Introduire une asymétrie maîtrisée (la card « Diagnostic 30 min », porte d'entrée, en colonne étroite accentuée terracotta ou en première position pleine hauteur), hover : la ligne sous le titre se dessine + connecteurs passent en encre pleine. Les `FIG 2.0X` : très bien, à conserver (une fois la numérotation globale réparée).
- **MaturityPyramid recomposée (07)** : la jauge de progression I→IV en hairline qui s'étend au scroll (remplace le SVG supprimé par un geste qui SERT la lecture), palier I légèrement détaché (c'est l'offre d'appel). Les grands romains terracotta des cards sont déjà excellents.
- **CaseCardGrid (09)** : hover ligne → l'impact bascule en terracotta avec micro count-up, flèche ↗ qui se déplace de 2 px ; option : sparkline minuscule par dossier (cohérent « blocs de données »). Et « SEM » au lieu de « WK ».
- **FaqAccordion (10)** : Q.01 ouverte par défaut (le prix respire), rotation 90° de la flèche, hairline de séparation qui s'épaissit sur l'item ouvert. Rien de plus : la sobriété est juste.
- **EditorialPreview (11)** : déjà très « editorial-tech » (index numéroté daté). Compression à 3 + hover : la date glisse vers la gauche et la flèche entre. Suffisant.
- **BookSession (12)** : le passage en ink EST le gap principal (contraste final, modèle manifesto). Bouton magnetic déjà disponible (`mag` utilisé au hero), dot « disponible » pulsant déjà en place.
- **Rythme des fonds (transversal, cf doc 39 P1-8)** : aujourd'hui 10/12 sections paper. Cible avec la séquence recomposée : paper (hero) → paper-2 (preuve) → paper (architecture) → paper-2 (services) → paper (pyramide) → paper-2 ou paper-3 (quote, moment chaleur humaine : 1ᵉʳ usage légitime de paper-3) → paper (dossiers) → paper-2 (FAQ) → paper (éditorial) → **ink** (CTA). Chaque bascule de fond marque un changement d'acte réel.
- **Numérotation éditoriale (transversal)** : renuméroter strictement dans l'ordre de la séquence cible (Acte I promesse & preuve · II système & offre · III engagement · IV preuves clients · V action). Un device signature n'est premium que s'il est exact.

## Axe 3 · Bilan structurel

**Trop de sections, pas assez de rôles.** 12 sections + 8 interludes pour 5 rôles narratifs réels ; 5 sections re-disent la taxonomie des capacités, 2 re-disent les mêmes métriques, 1 dit 4 fois ses paliers. La page ne souffre pas d'un manque de matière mais d'un manque d'attribution : chaque information doit avoir UNE maison.

### Séquence cible (rôle narratif par slot)

| # | Section (composants) | Rôle narratif | Fond | Hauteur cible |
|---|---|---|---|---|
| 1 | **Hero** (intangible) | Promesse + preuve éclair + porte d'entrée | paper | 852 |
| 2 | **Bande preuve unifiée** (StatBlock 3 métriques + SocialProof logos + lien `/cas`) | Crédibilité immédiate, chiffres sourcés | paper-2 | ~380 |
| 3 | **ArchitectureDiagram animé** (absorbe les piliers en nœuds) | Le modèle mental : comment ça marche | paper | ~820 |
| 4 | **ServicesGrid fusionné** (+ liens use-cases par service + pied `/secteurs`) | L'offre : ce qu'on achète, par où ça rentre | paper-2 | ~1 050 |
| 5 | **MaturityPyramid recomposée** (4 cards uniques + stage + jauge + prix d'entrée) | L'engagement : comment on commence, à quel prix | paper | ~700 |
| 6 | **QuoteSpotlight** (NOUVEAU sur la home, catalogue existant) | Confiance humaine incarnée | paper-3 | ~400 |
| 7 | **CaseCardGrid** | Preuve chiffrée détaillée | paper | ~1 050 |
| 8 | **FaqAccordion** (Q.01 ouverte) | Objections, réversibilité, conformité | paper-2 | ~930 |
| 9 | **EditorialPreview ×3** | Autorité, doctrine, maillage | paper | ~600 |
| 10 | **BookSession** (ink + risk-reversal ×3) | Conversion, climax | **ink** | ~700 |
| 11 | **FooterMarquee** | Signature de sortie | : | 67 |

+ 3-4 interludes `SectionTransition` aux pivots (2→3, 5→6, 9→10), ~450 px.
+ 1 `CtaBandSection` sobre optionnelle après le slot 5 (le moment prix est le 2ᵉ pic d'intention ; répond aussi au P1-8 « 9 800 px sans CTA » de doc 39).

**Scroll total cible : ≈ 8 000-8 300 px** (vs 12 110 mesurés, soit ~-33 %), avec PLUS d'informations uniques qu'aujourd'hui (prix, témoignage, exemples par nœud) et zéro répétition.

### Backlog catalogue (slots sans section à la hauteur = demandes de création/évolution, rien créé ici)

1. **Variante « proof-band » unifiée** (métriques attribuées + logos + lien) : ni `StatBlock` ni `SocialProof` seuls ne la couvrent → nouveau preset de StatBlock ou type dédié.
2. **Évolution `MaturityPyramid`** : mode « cards-only » (suppression timeline + SVG) + champs `stage` et `price` par tier + jauge de progression intégrée.
3. **Évolution `ServicesGrid`** : champ `usecase_href`/`usecase_label` par service (absorption d'UseCaseIndex) + slot pied de grille (lien secteurs).
4. **Évolution `ArchitectureDiagram`** : exemples hover par nœud + animation de flux au scroll (aujourd'hui purement statique).
5. **« SystemDemo » (création)** : une vraie démonstration visuelle du système en marche (capture produit / workflow animé / avant-après riche) ; `MediaBlock` statique n'est pas au niveau du différenciant attendu. C'est le seul VRAI trou du catalogue pour une home « site of the month ».
6. **Audit qualité `QuoteSpotlight`/`TestimonialBlock`** avant mise en home (jamais vus sur une page signature : vérifier qu'ils tiennent le niveau du hero).
