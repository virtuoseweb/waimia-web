# 08B — Templates (groupe B)

> Inventaire des 9 templates restants du répertoire `src/components/templates/`.
> Lecture seule — aucun composant modifié.
> Généré le 2026-06-04.

---

## 1. ListIndexTemplate

- **Fichier** : `src/components/templates/ListIndexTemplate.astro` (102 l)
- **Routes** :
  - `src/pages/ressources/blog/index.astro`
  - `src/pages/ressources/cookbooks/index.astro`
  - `src/pages/ressources/changelog.astro`
  - `src/pages/agence/design-system.astro` (usage catalogue)
  - Mapping handoff : `/ressources/cas`, `/ressources/blog`, `/ressources/cookbooks`, `/ressources/changelog`
- **Hero (type-id)** : aucun composant catalogué — masthead inline `<section class="list-hd">` (Kicker + h1 slot `reveal-mask-up` + lede + slot `filters` optionnel)
- **Section_sequence** :
  1. `list-hd` — masthead minimaliste (Kicker + H1 + lede + filters optionnel)
  2. `list-body` — slot ouvert `list` (grille ou liste selon la page parente)
  3. `CtaBandSection` — CTA bande conversion dynamique
- **Page_objective** : hub — agrège des listes d'articles/cas/cookbooks/changelog, SEO catégoriel et orientation interne
- **Redondance** : pas de quasi-doublon direct dans le groupe B ; le principe masthead+liste+CTA est proche du `HubTemplate` (groupe A) mais dédié aux listes éditoriales non-sections
- **Notes** : pas de composant hero catalogué (vt=0) — arbitrage Simon requis (task #10). Le slot `list` est entièrement délégué à la page parente → template très fin, pas de logique interne.

---

## 2. OffresDetailTemplate

- **Fichier** : `src/components/templates/OffresDetailTemplate.astro` (1354 l)
- **Routes** :
  - `src/pages/offres/[...slug].astro` (pages offres dynamiques)
  - `src/pages/en/offres/[...slug].astro` (EN)
  - `src/pages/agence/design-system.astro` (usage catalogue)
- **Hero (type-id)** : `HeroOfferDetail` (`hero-offer-detail`) — avec `transitionId` + `cardTransitionId` depuis `pageTransitionId` (pattern VT confirmé)
- **Section_sequence** :
  1. `HeroOfferDetail` — breadcrumb + tier badge + H1 + lead + CTA + meta pricing + cercles SVG (géométrie signature Offres)
  2. `off-problem` (02 Problem) — statement macro-typo (1 phrase forte)
  3. `off-method` (03 Method) — 4 phases numérotées 01→04
  4. `off-deliverables` (04 Deliverables) — 3-6 cards livrables tangibles + tag format
  5. `off-proof` (05 Proof) — quote client + métriques chiffrées
  6. `off-tools` (06 Tools, conditionnel) — stack outils
  7. `off-faq` (05.5 FAQ, conditionnel) — questions fréquentes
  8. `off-inclusions` (06 Inclusions, conditionnel) — inclusions du palier
  9. `off-pricing` (06.5 Pricing, conditionnel) — pricing
  10. `off-sec-dark` (07 CTA) — CTA dark "Prêt à déployer ?"
- **Page_objective** : conversion — focus sur la vente d'1 offre (problème → méthode → livrables → preuve → prix → CTA)
- **Redondance** : partage la structure Hero→Problem→Method→Deliverables→Proof→CTA avec `ServiceDetailTemplate` ; différences : OffresDetail = paliers tarifaires + livrables tagués format ; ServiceDetail = approach steps + TechPillRow + RelatedCards
- **Notes** : plus long template du repo (1354 l) dû aux sections conditionnelles. Brique signature : `DeliverablesGrid`. Delta ~32px vs design original (row-gap `.g12--full` legacy perdu) — arbitrage Simon requis (task #10).

---

## 3. ServiceDetailTemplate

- **Fichier** : `src/components/templates/ServiceDetailTemplate.astro` (312 l)
- **Routes** :
  - `src/pages/offres/revops.astro` (page statique)
  - `src/pages/agence/design-system.astro` (catalogue)
  - Mapping handoff : `/offres/revops`, `/technologies/anthropic`, `/solutions/fintech`, `/agence/paris`
- **Hero (type-id)** : `HeroServiceDetail` (`hero-service-detail`) — `topPad="140px"` (préserve rythme original)
- **Section_sequence** :
  1. `HeroServiceDetail` — masthead service (kicker + num + H1 + lede + cta)
  2. `svc-problem` — problem statement + stats optionnelles (ProofBarSection horizontal)
  3. `svc-approach` — 4 étapes numérotées (MethodTimeline)
  4. `svc-deliverables` (conditionnel) — slot ouvert livrables
  5. `svc-proof` (conditionnel) — ProofBand (quote + métriques)
  6. `svc-stack` — TechPillRow
  7. `svc-related` — RelatedCards
  8. `CtaFinal` — CTA double bouton (audit + collection parente)
- **Page_objective** : seo + conversion — présente 1 service en profondeur, maillage interne fort (related cards + collection back-link)
- **Redondance** : quasi-doublon structurel avec `OffresDetailTemplate` (même arc Hero→Problem→Approach→Deliverables→Proof→CTA) — `ServiceDetail` = version plus légère sans paliers tarifaires ni FAQ/Pricing ; `OffresDetail` = version complète avec sections conditionnelles palier
- **Notes** : template « généraliste service » utilisé aussi pour technologies et solutions dans les pages statiques (revops.astro). Différencié de `DetailMenuTemplate` (groupe A) : DetailMenu = hub catalogue multi-services ; ServiceDetail = 1 service en profondeur.

---

## 4. SolutionsDetailTemplate

- **Fichier** : `src/components/templates/SolutionsDetailTemplate.astro` (1230 l)
- **Routes** :
  - `src/pages/solutions/[...slug].astro`
  - `src/pages/secteurs/[...slug].astro`
  - `src/pages/[...slug].astro` (fallback)
  - `src/pages/en/solutions/[...slug].astro`
- **Hero (type-id)** : hero inline `<section class="sol-hero">` avec `transition:name={card-${pageTransitionId}}` — PAS de composant catalogué (HeroSector jugé infidèle, décision Simon — cf CLAUDE.md)
- **Section_sequence** :
  1. `sol-hero` (01 Hero Department) — breadcrumb + DEPT badge + H1 + lead italique + tags row + meta + SVG rect rotated 15° (géométrie signature Solutions)
  2. `sol-friction` (02 Pain Points) — 3 cards 01/02/03 (empathie métier)
  3. `sol-workflows` (03 Workflows) — table 5 colonnes (numéro/kicker+h3/model/gain/how) — brique signature
  4. `sol-proof` (04 ROI Band) — 4 chiffres énormes sur fond dark — brique signature
  5. `sol-case` (05 Case Study) — split dark/light 50/50
  6. `sol-faq` (05b FAQ, conditionnel) — questions fréquentes
  7. `sol-tools` (06 Stack) — 3×2 cards technos
  8. `sol-livrables` (06b Livrables, conditionnel) — livrables spécifiques secteur
  9. `sol-cta` (07 CTA) — dark, "Votre équipe X, augmentée."
- **Page_objective** : seo + pillar — page département métier (Finance/Marketing/RH…), forte densité métier, maillage interne via workflows et case study
- **Redondance** : aucun quasi-doublon direct dans les 9 ; arc différent de `OffresDetail` (pain points + workflows table + ROI band vs méthode + livrables tagués + pricing)
- **Notes** : hero non migré (statut « non migré » confirmé CLAUDE.md), vt inline. Briques signatures distinctives : Workflows Table + ROI Band. 1230 l dû à la richesse des sections inline.

---

## 5. TechnologiesDetailTemplate

- **Fichier** : `src/components/templates/TechnologiesDetailTemplate.astro` (915 l)
- **Routes** :
  - `src/pages/technologies/[...slug].astro`
  - `src/pages/[...slug].astro` (fallback)
- **Hero (type-id)** : `HeroTechLayer` (`hero-tech-layer`) — avec `transitionId` + `cardTransitionId` (pattern VT confirmé, migré session précédente avec fix bug h1 vide)
- **Section_sequence** :
  1. `HeroTechLayer` (01 Hero Layer) — breadcrumb + badge COUCHE coloré (claude/os/orch) + H1 + lead italique + meta + SVG triangles (géométrie signature Techno)
  2. `tech-positioning` (02 Positioning) — split 50/50 statement éditorial + 3 facts mono kv — brique signature
  3. `tech-capabilities` (03 Capabilities) — 3×2 cards (kicker + h3 + p + value signature)
  4. `tech-models` (04 Models, conditionnel `showModels`) — table 5 colonnes comparaison modèles
  5. `tech-when-to-use` (05 When To Use) — split "Utiliser quand / Considérer autre chose quand" — brique signature
  6. `tech-integration` (06 Integration) — flow 5 nœuds horizontaux avec 1 actif
  7. `tech-ecosystem` (07 Ecosystem, conditionnel `showEcosystem`) — 4 cards éditeurs open-source (layerType=os uniquement)
  8. `tech-cta` (09 CTA) — dark, "Quelle stack pour votre contexte ?"
- **Page_objective** : seo + information — page technologie/couche architecture (Claude/OS/Orchestration), aide à la décision technique, maillage vers les offres
- **Redondance** : aucun quasi-doublon ; arc unique (positioning + when-to-use + integration flow) absent des autres templates
- **Notes** : géométrie hero distincte (triangles SVG vs cercles Offres vs rect-rotated Solutions). Sections conditionnelles bien isolées via props boolean.

---

## 6. TrustLegalTemplate

- **Fichier** : `src/components/templates/TrustLegalTemplate.astro` (260 l)
- **Routes** :
  - `src/pages/agence/trust-center.astro`
  - `src/pages/agence/governance.astro`
  - `src/pages/agence/docs.astro`
- **Hero (type-id)** : aucun composant catalogué — masthead inline `<section class="trust-hd">` (Breadcrumb + Kicker + H1 + lede + date révision + version + footer légal). vt=0.
- **Section_sequence** :
  1. Breadcrumb (molécule)
  2. `trust-hd` — masthead Kicker + H1 + lede + date révision + version + footer légal inline
  3. `trust-body` — grille 2 colonnes : TOC sticky gauche (généré depuis prop `sections[]`) + contenu H2/H3 (slot ouvert)
  4. `CtaBandSection` — CTA bande conversion
- **Page_objective** : legal + information — pages conformité/gouvernance/docs, TOC sticky pour navigation dans un document long
- **Redondance** : aucun quasi-doublon direct ; le pattern TOC sticky + sections H2/H3 est unique dans le projet
- **Notes** : TOC généré dynamiquement depuis le prop `sections[]` (pas de molécule dédiée — usage 1× par page, décision justifiée dans les commentaires). Hero non catalogué (vt=0), arbitrage Simon requis (task #10).

---

## 7. TunnelStepTemplate

- **Fichier** : `src/components/templates/TunnelStepTemplate.astro` (333 l)
- **Routes** :
  - `src/pages/offres/[offre]/tunnel/[step].astro`
- **Hero (type-id)** : aucun composant catalogué — hero inline `<section class="tnl-hero">` (kicker label étape + barre progression + H1 + lede)
- **Section_sequence** :
  1. `tnl-hero` — kicker tunnel "Offre · Étape N/Total" + barre progression visuelle + H1 (variant hero/section selon step) + lede description
  2. `tnl-body` — slot ouvert (contenu étape : form, checklist, résumé…)
  3. `tnl-nav` (footer) — bouton précédent + CTA principal + meta (reading time + back-link offre)
- **Page_objective** : conversion — tunnel de qualification/commande multi-étapes ; objectif = mener l'utilisateur d'une étape à la suivante jusqu'au CTA final
- **Redondance** : aucun quasi-doublon ; le pattern barre progression + navigation étapes est unique dans le projet
- **Notes** : pas de `Base` layout (template `<article>` autonome sans header/footer global) — adapté au tunnel où on veut limiter les distractions. CTA variant configurable (`primary/accent/ghost`).

---

## 8. UtilityTemplate

- **Fichier** : `src/components/templates/UtilityTemplate.astro` (151 l)
- **Routes** :
  - `src/pages/contact.astro`
  - `src/pages/agence/careers.astro`
  - `src/pages/agence/about.astro`
  - `src/pages/agence/methode.astro`
  - `src/pages/ressources/academy.astro`
  - `src/pages/en/contact.astro`
  - `src/pages/en/agence/about.astro`
  - `src/pages/en/agence/methode.astro`
  - `src/pages/404.astro` et autres pages utilitaires
- **Hero (type-id)** : `HeroUtilityMasthead` (`hero-utility-masthead`) — `wrapMaxWidth="var(--wrap-wide)"` + `reveal={true}` ; prop `align` (left/centered)
- **Section_sequence** :
  1. Breadcrumb (molécule, optionnel)
  2. `HeroUtilityMasthead` — kicker + H1 + lede (align left ou centered selon usage)
  3. `util-body` — slot ouvert `body` (form contact, liste offres emploi, narrative about…)
  4. `CtaFinal` (conditionnel `showCta`) — CTA double bouton adaptatif (variant contact vs standard)
- **Page_objective** : information + acquisition — pages "institution" (contact, about, methode, careers) et utilitaires (academy, 404) ; pas de maillage SEO fort, focus sur l'action directe
- **Redondance** : aucun quasi-doublon dans le groupe B ; `WelcomeTemplate` pourrait sembler proche mais diffère intentionnellement (Welcome = post-conversion, pas de CtaFinal, next steps au lieu de body libre)
- **Notes** : template le plus généraliste du projet — couvre une grande diversité de pages via le slot `body` libre. CtaFinal adaptatif : si page contact → CTA "Voir les offres" ; sinon CTA "Réserver un audit".

---

## 9. WelcomeTemplate

- **Fichier** : `src/components/templates/WelcomeTemplate.astro` (197 l)
- **Routes** :
  - `src/pages/bienvenue/newsletter.astro`
  - `src/pages/bienvenue/livre-blanc.astro`
  - `src/pages/bienvenue/audit.astro`
  - `src/pages/bienvenue/contact.astro`
  - `src/pages/bienvenue/abonnement.astro`
  - `src/pages/bienvenue/formation.astro`
  - `src/pages/bienvenue/commande.astro`
  - `src/pages/bienvenue/[...slug].astro`
  - `src/pages/en/bienvenue/newsletter.astro`, `en/bienvenue/audit.astro`, `en/bienvenue/livre-blanc.astro`
- **Hero (type-id)** : aucun composant catalogué — masthead inline centré avec SVG checkmark + Kicker + H1 slot + lede slot. vt=0. Pas de CtaBand/CtaFinal (utilisateur a déjà converti).
- **Section_sequence** :
  1. `.welcome-mark` — SVG checkmark cercle accent (confirmation visuelle)
  2. `.welcome-kicker` — Kicker accent
  3. `.welcome-h1` + `.welcome-lede` — slots headline/lede
  4. `.welcome-steps` — liste ordonnée `nextSteps[]` (1-3 actions concrètes post-conversion avec num italic + titre + body + CTA optionnel)
  5. `.welcome-foot` — slot `foot` (lien retour accueil par défaut, override possible)
- **Page_objective** : information — page post-conversion (confirmation d'inscription/téléchargement/RDV) ; objectif = rassurer + orienter vers les prochaines étapes (pas de nouvelle conversion)
- **Redondance** : intentionnellement distinct de `UtilityTemplate` (commentaires template documentent la décision) — Welcome = contexte post-conversion sans CtaBand, UtilityTemplate = contexte pré-conversion avec CtaFinal
- **Notes** : le template le plus court avec une logique de séquencement forte (`nextSteps[]` numérotés). Metadata `noindex` appliquée via `<Base noindex>` (pages de confirmation, ne pas indexer). Hero non catalogué (vt=0), arbitrage Simon requis (task #10).

---

## Synthèse

### Tableau template → objectif → séquence

| Template | Objectif principal | Séquence (résumé) | Hero catalogué | vt |
|---|---|---|---|---|
| **ListIndexTemplate** | hub / seo catégoriel | masthead-hd → list (slot) → CtaBand | — (inline) | 0 |
| **OffresDetailTemplate** | conversion | HeroOfferDetail → Problem → Method → Deliverables → Proof → [Tools/FAQ/Pricing] → CTA dark | `hero-offer-detail` | ✓ |
| **ServiceDetailTemplate** | seo + conversion | HeroServiceDetail → Problem → Approach → [Deliverables] → [Proof] → Stack → Related → CtaFinal | `hero-service-detail` | ✓ |
| **SolutionsDetailTemplate** | seo + pillar | sol-hero (inline) → Pain Points → Workflows Table → ROI Band → Case Study → [FAQ] → Stack → [Livrables] → CTA dark | — (inline, non migré) | 0 |
| **TechnologiesDetailTemplate** | seo + information | HeroTechLayer → Positioning → Capabilities → [Models] → When-To-Use → Integration → [Ecosystem] → CTA dark | `hero-tech-layer` | ✓ |
| **TrustLegalTemplate** | legal + information | Breadcrumb → trust-hd (inline) → TOC sticky + sections H2/H3 (slot) → CtaBand | — (inline) | 0 |
| **TunnelStepTemplate** | conversion tunnel | tnl-hero (inline, progression bar) → body (slot) → nav (prev/CTA/back) | — (inline, no Base) | 0 |
| **UtilityTemplate** | information + acquisition | Breadcrumb (opt) → HeroUtilityMasthead → util-body (slot) → CtaFinal (opt) | `hero-utility-masthead` | ✓ |
| **WelcomeTemplate** | information post-conv. | checkmark SVG → Kicker → H1/lede → nextSteps[] → foot | — (inline, noindex) | 0 |

### Paires redondantes (quasi-doublons structurels)

| Paire | Nature de la similarité | Différenciation clé |
|---|---|---|
| **OffresDetailTemplate ≈ ServiceDetailTemplate** | Même arc Hero→Problem→Approach/Method→Deliverables→Proof→CTA | OffresDetail : paliers tarifaires + FAQ/Pricing/Inclusions conditionnels + 1354 l. ServiceDetail : version légère + TechPillRow + RelatedCards + 312 l |
| **UtilityTemplate ↔ WelcomeTemplate** | Masthead + body + pied de page ; même audience généraliste | Welcome : post-conversion, noindex, nextSteps numérotés, sans CtaFinal. Utility : pré-conversion, breadcrumb, body libre, CtaFinal adaptatif |

### Statut migration hero (vt)

- **vt=1 (catalogués)** : OffresDetailTemplate (`hero-offer-detail`) · ServiceDetailTemplate (`hero-service-detail`) · TechnologiesDetailTemplate (`hero-tech-layer`) · UtilityTemplate (`hero-utility-masthead`)
- **vt=0 — arbitrage requis** : ListIndexTemplate · TrustLegalTemplate · WelcomeTemplate (3 templates, task #10)
- **vt=0 — décision Simon (non migré)** : SolutionsDetailTemplate (HeroSector jugé infidèle)
- **vt=0 — hors scope catalogue** : TunnelStepTemplate (pas de Base layout, contexte tunnel isolé)
