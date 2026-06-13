# Audit visuel des sections de service. Bibliothèque waimia-web

Audit fondateur pour la refonte du template de page de SERVICE (pilier Acquérir / Growth System IA) + pillar + landing. Jugement sur PIXELS RENDUS (desktop 1440x900 + mobile 390x844), tokens DS figés, direction design = les 2 maquettes de référence (`docs/visual-audit/references/ref-offre-deploiement.png`, `ref-finance-compta.png`).

- Méthode : capture batch headless (chromium isolé du repo) des previews `/preview/<type>` servies par `scripts/serve-dist.mjs` (port 4480), `waitForTimeout` + scroll up/down pour déclencher les reveals. 63 sections capturées, toutes en HTTP 200, toutes h1/h2 `opacity=1` (0 faux négatif scroll-reveal).
- Captures : `docs/visual-audit/service-sections-audit/<slot>/<type>-{desk,mob}.jpeg`.
- Critères DS figés : typo (serif = emphase de QUELQUES MOTS, jamais une phrase entière, cf `docs/directives/01-typo.md` + directive Awwwards #4), alignement gauche/droite discipliné, dark `ink` soigné, standards B2B avant exotiques, images habillées AU BON ENDROIT (pas de media-block brut), 0 nouveau token.

> Convention slug serif : « ABC ` 123 » indique l'unité d'emphase serif observée. Verdicts : NICKEL (utilisable tel quel) / À AMÉLIORER (correctif précis) / À REMPLACER (par un meilleur type du même slot) / À DÉCLINER (variante à créer, tokens figés).

---

## Synthèse chiffrée

63 sections jugées sur 8 slots.

| Verdict | Nombre | Sections |
| --- | --- | --- |
| NICKEL | 33 | voir tableaux par slot |
| À AMÉLIORER | 22 | densité, media placeholder, typo serif, overflow |
| À REMPLACER | 1 | inclusions-list (trop maigre pour un slot) |
| À DÉCLINER | 6 | variantes denses / media réel / highlight tier |

Constats transverses (récurrents, à traiter au niveau template / composant) :

1. **Typo serif sur phrases entières (directive #4, JAMAIS exécuté en transverse).** ~11 héros et headers de section rendent un H1/H2 entièrement en Instrument Serif sur 2-3 lignes (`hero-service-detail`, `hero-service-masthead`, `hero-pillar-hub`, `hero-landing`, `hero-lead-magnet`, `problem-statement`, `fit-columns`...). Le pattern correct (déjà présent dans le catalogue : `problems-grid`, `method-timeline`, `feature-grid`, `faq-accordion`) = titre sans + UN mot serif italique accent. Reco transverse : harmoniser les headers vers « sans + 1 mot serif accent » ; réserver le serif-full aux 1-2 héros manifeste assumés.
2. **Media en placeholder gris brut (anti-exemple directive #6).** `hero-split`, `feature-tabs`, `feature-zigzag` rendent des blocs media vides (« Diagramme workflow », rectangles gris). À habiller d'illustrations stylisées dans le bloc (le pattern `feature-split-media` et `hero-offer-detail` montrent la bonne voie : illustration trait + accent).
3. **Sparsité en isolation.** Plusieurs sections « fines » (`objection-handler`, `decision-list`, `steps-horizontal`, `inclusions-list`, `guarantee-block`, `cta-form-inline`) laissent un grand vide bas en preview isolée. En composition réelle ce n'est pas bloquant, mais les démos `section-demos.ts` sont sous-remplies (2-3 items) : enrichir les démos pour juger la densité cible.
4. **Overflow viewport large (BUG réel).** `hero-offer-detail` desktop : le H1 long déborde à droite (coupé à « votre d... »). Confirmé : le mobile rend la phrase entière (« votre delivery. ») donc c'est un défaut de clamp/au desktop large, pas un contenu manquant. À corriger (clamp font-size / wrap) avant d'en faire le hero canonique des pages offre.

---

## Séquence recommandée pour le template de page SERVICE (meilleur candidat par slot)

Page de service riche (ex. Growth System IA), de haut en bas :

1. **Hero** : `hero-conversion-funnel` (le plus complet : kicker + titre accent + intro + pills + checklist 2 col + proof line + dual CTA + KPI bar). Alternative offre Tier : `hero-offer-detail` (illustration + booking) **une fois l'overflow corrigé**.
2. **Proof bar** (juste sous le hero) : `proof-bar` (bande 3-4 métriques, hauteur minimale, pattern maquette).
3. **Problème / tension** : `problems-grid` (3 colonnes numérotées 01/02/03, accent labels. Pattern exact ref `ref-finance-compta`).
4. **Diagnostic** (différenciateur) : `diagnostic-stages` (auto-diagnostic 5 stades cliquables, stade actif accent. Pattern « Où en êtes-vous ? » de la maquette).
5. **Méthode** : `method-timeline` (numéros serif 01-04 + step). Variante avec timing : `process-steps` (badges SEMAINE X).
6. **Capacités / ce qu'on automatise** : `workflow-table` (table éditoriale workflow / modèle / gain accent / comment. Pattern « Workflows clés » de la maquette) + `feature-split-media` (capacité phare illustrée).
7. **Livrables** : `deliverables-grid` (3 cards serif + tags méta + numéros. Pattern « Livrables » de la maquette).
8. **Preuve / ROI** : `stats-bento` (bento ink + cards. Pattern « L'impact chiffré ») ou `roi-band` (4 métriques ink). Preuve sociale : `stat-block` (citation + KPIs).
9. **Comparatif / fit** : `comparison-duo` (avant/après) ou `fit-columns` (fit / anti-fit ink).
10. **Pricing** : `pricing-cards` (3 tiers, RECOMMANDÉ accent) pour une offre à paliers, ou `pricing-single-highlight` pour une offre unique.
11. **FAQ** : `faq-two-column` (6 Q&A déployées, indexable SEO/GEO) ou `faq-cta-aside` (FAQ + booking).
12. **CTA final** : `footer-cta-band` (bande INK, titre accent + dual CTA. Pattern « Prêt à déployer ? » de la maquette).
13. **Réassurance footer** (manquant catalogue, cf directive Awwwards #5 + ref) : bandeau certifications (Partenaire Anthropic, Claude Certified Architect, AI Act ready, RGPD, ISO 27001). À DÉCLINER depuis `tech-stack-band` / `trust-badges-band`.

---

## Slot 1. Hero

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| hero-conversion-funnel | **NICKEL** | header serif-full (mineur) | **Meilleur hero de service riche.** Garder ; harmoniser le titre vers serif-accent (1 mot). |
| hero-offer-detail | À AMÉLIORER | **H1 long déborde le viewport desktop** (coupé « votre d... ») ; mobile OK | corriger clamp/wrap du H1, puis = hero canonique pages OFFRE (illustration + booking conformes maquette). |
| hero-service-detail | À AMÉLIORER | titre 100 % serif sur 2 lignes (directive #4) | excellent KPI bar ; passer le titre en sans + 1 mot serif accent. |
| hero-pillar-hub | À AMÉLIORER | titre serif géant 3 lignes, surdimensionné pour service detail | réserver aux pages PILIER/HUB ; réduire l'échelle serif. |
| hero-landing | À AMÉLIORER | 2e ligne 100 % serif italique accent (phrase entière) | bon hero conversion (dual CTA + booking) ; raccourcir l'emphase serif. |
| hero-split | À AMÉLIORER | **media = bloc gris vide** (directive #6) | habiller le slot media d'une illustration ; sinon À DÉCLINER en hero centré sans media. |
| hero-lead-magnet | À AMÉLIORER | titre serif-full ; carte PDF placeholder | réservé landing lead-magnet ; visuel PDF réel + titre serif-accent. |
| hero-service-masthead | À AMÉLIORER | minimal (pas de CTA ni proof), titre serif-full | masthead pur ; ajouter CTA/proof si utilisé en tête de service. |

Meilleure section pour ce slot : **hero-conversion-funnel** (service riche) ; **hero-offer-detail** (offre, après fix overflow).

---

## Slot 2. Problème / tension

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| problems-grid | **NICKEL** | RAS | 3 col numérotées, accent labels, serif statements. Pattern exact maquette. |
| diagnostic-stages | **NICKEL** | RAS | auto-diagnostic 5 stades, stade actif accent. Différenciateur fort, pattern maquette. |
| problem-statement | À AMÉLIORER | titre serif-full 3 lignes (directive #4) | très bon anchor + KPI bar ; raccourcir l'emphase serif. |
| pain-points | **NICKEL** | RAS | timeline verticale numérotée + connecteurs, body serif. Bon alt. |
| why-stalls | À AMÉLIORER | accent « cale. » isolé à gauche, lecture éditoriale | bon pour essai/manifeste, moins canonique service. |
| objection-handler | À AMÉLIORER | démo 2 lignes -> très sparse | enrichir à 4-5 objections ; bon pour lever les freins avant CTA. |
| decision-list | À AMÉLIORER | grand vide gauche + bas, démo 3 items | densifier ; bon comme aiguillage « quel service ». |
| maturity-pyramid | À AMÉLIORER | très haute + complexe pour un slot unique | réserver page PILIER/HUB (vue d'ensemble paliers). |

Meilleure section pour ce slot : **problems-grid** (constat) + **diagnostic-stages** (engagement).
À DÉCLINER : `objection-handler` dense (4-5 lignes), `decision-list` compacte 2 colonnes.

---

## Slot 3. Méthode / process

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| method-timeline | **NICKEL** | RAS | numéros serif 01-04 + step, rythme aéré. Canonique. |
| process-steps | **NICKEL** | RAS | numéroté + connecteurs + badge SEMAINE X (timing). Excellent alt. |
| workflow-table | **NICKEL** | RAS | table éditoriale workflow/modèle/gain accent/comment sur ink-tint. Pattern maquette. |
| steps-horizontal | À AMÉLIORER | grand vide bas (4 étapes horizontales) | bon en méthode compacte ; densifier verticalement ou ajouter visuel. |
| timeline-block | (non détaillé, capturé) | à juger en composition | candidat secondaire. |
| how-we-ship | À AMÉLIORER | rend une page entière (4007px) pas une section isolée | n'est pas une section unitaire ; écarter du slot, c'est un template. |
| tech-integration-flow | (non détaillé, capturé) | à juger en composition | candidat technique (flux d'intégration). |

Meilleure section pour ce slot : **method-timeline** (méthode) ; **process-steps** (avec calendrier) ; **workflow-table** (méthode + capacités chiffrées).

---

## Slot 4. Capacités / features / services

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| deliverables-grid | **NICKEL** | RAS | 3 cards serif + tags méta accent + numéros. Pattern « Livrables » maquette. |
| feature-split-media | **NICKEL** | RAS | split texte + console illustrée + checklist + CTA. Bon usage image (directive #6). |
| bento-grid | **NICKEL** | RAS | bento asymétrique avec icônes, dark-able. Vue d'ensemble « atouts ». |
| services-grid | **NICKEL** | RAS | 6 cards FIG + métrique accent + connecteurs. Idéal pillar/hub « 6 services ». |
| feature-accordion | **NICKEL** | RAS | liste dépliable, accent + tag « LIVRÉ EN SEMAINE 1 ». |
| use-case-index | **NICKEL** | RAS | index cas d'usage romain + tags + CTA. Éditorial dense (pillar). |
| fit-columns | **NICKEL** | titre serif-full (mineur) | fit / anti-fit ink, lisible. Bon filtre de qualification. |
| feature-grid | À AMÉLIORER | cartes nues, génériques (pas d'icône) | ajouter icônes / poids visuel ; sinon À DÉCLINER avec média. |
| feature-tabs | À AMÉLIORER | **media placeholder vide + grand vide vertical** (texte bas-aligné) | centrer verticalement + media réel. |
| feature-zigzag | À AMÉLIORER | **tous les media = gris vides** (anti-exemple #6) | habiller d'illustrations réelles. |
| inclusions-list | **À REMPLACER** | une seule ligne inline + vide massif | trop maigre pour un slot ; remplacer par `deliverables-grid` ou À DÉCLINER en bande compacte de tags. |

Meilleure section pour ce slot : **deliverables-grid** (livrables) + **feature-split-media** (capacité phare illustrée) + **services-grid** (catalogue 6 services, pillar).
À DÉCLINER : `feature-grid` avec icônes ; `inclusions-list` en bande tags.

---

## Slot 5. Preuve / ROI

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| stats-bento | **NICKEL** | RAS | bento ink + cards light. Pattern « L'impact chiffré » maquette, riche. |
| roi-band | **NICKEL** | RAS | 4 métriques serif sur ink, élégant et lisible. |
| metric-callout-band | **NICKEL** | RAS | bande ink 3 métriques serif italique + intro. Fort impact. |
| proof-bar | **NICKEL** | RAS | bande fine 4 métriques. Idéale sous le hero (pattern maquette). |
| stat-block | **NICKEL** | RAS | citation ink + 2x2 KPIs (testimonial + métrique = preuve B2B la plus persuasive). |
| metric-shift | **NICKEL** | RAS | avant -> après + delta accent. Très persuasif. |
| comparison-duo | **NICKEL** | RAS | avant/après 2 cards, accent border sur « avec ». Canonique. |
| comparison-table | À AMÉLIORER | sparse (4 lignes), pas de colonne « recommandé » mise en avant | densifier + highlight de la colonne tier recommandée. |
| feature-comparison-grid | (capturé) | à juger en composition | candidat secondaire comparatif. |
| versus-competitors | (capturé) | à juger en composition | « nous vs alternatives » ; valider le ton (agressif). |

Meilleure section pour ce slot : **stats-bento** (ROI riche) ; **proof-bar** (bande sous hero) ; **stat-block** (preuve sociale chiffrée) ; **metric-shift** (avant/après).
À DÉCLINER : `comparison-table` avec colonne recommandée surlignée.

---

## Slot 6. Pricing / offre

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| pricing-cards | **NICKEL** | RAS | 3 tiers, badge RECOMMANDÉ + accent CTA, prix serif. Textbook B2B (mobile OK). |
| pricing-single-highlight | **NICKEL** | RAS | offre unique : prix barré ancre + inclus + garantie. Idéal page mono-offre. |
| offer-tier-grid | **NICKEL** | RAS | flagship ink + 3 cards. Idéal pillar/hub multi-offres. |
| pricing-table | (capturé) | à juger en composition | candidat comparatif tarifaire dense. |
| pricing-toggle | (capturé) | à juger en composition | toggle mensuel/annuel si pertinent. |
| pricing-comparison-matrix | (capturé) | à juger en composition | matrice détaillée (offres complexes). |
| tier-pyramid-svg | (capturé) | à juger en composition | pyramide d'offres (visuel). |
| guarantee-block | À AMÉLIORER | 3 points + grand vide bas | densifier ou utiliser en bande fine de réassurance sous pricing. |

Meilleure section pour ce slot : **pricing-cards** (offre à paliers) ; **pricing-single-highlight** (offre unique).

---

## Slot 7. FAQ

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| faq-two-column | **NICKEL** | RAS | 6 Q&A déployées 2 col, réponses visibles = indexable SEO/GEO. Meilleur pour service. |
| faq-cta-aside | **NICKEL** | RAS | accordéon + carte booking « Encore une question ? ». Orienté conversion. |
| faq-accordion | À AMÉLIORER | démo 3 questions seulement -> sparse | structure canonique OK ; remplir 6-8 questions en contenu réel. |

Meilleure section pour ce slot : **faq-two-column** (SEO/GEO) ; **faq-cta-aside** (conversion).

---

## Slot 8. CTA / conversion

| type | verdict | problème observé | reco |
| --- | --- | --- | --- |
| footer-cta-band | **NICKEL** | RAS | bande INK, titre serif-accent + dual CTA. Pattern « Prêt à déployer ? » maquette. |
| cta-final | **NICKEL** | RAS | CTA centré éditorial, dual CTA + reassurance. Sur paper (pas ink). |
| contact-form | **NICKEL** | RAS | split intro + form réel + meta contact. Bon final contact. |
| cta-band | **NICKEL** | overlap badge preview (artefact preview, pas un bug) | bande fine utilitaire, nudge mi-page. |
| branded-callout | À AMÉLIORER | carte plate, grand vide droite | bon callout marque/trust ; envisager split avec visuel. |
| cta-split-visual | À AMÉLIORER | sur paper, vide bas, illustration générique | passer en ink + habiller le visuel pour plus d'impact. |
| cta-form-inline | À AMÉLIORER | newsletter ink, vide bas | c'est une bande newsletter (slot 8 mal mappé) ; garder pour lead-magnet. |
| cta-inline | (capturé) | bande très fine (82px) | nudge in-content minimal, OK en composition. |

Meilleure section pour ce slot : **footer-cta-band** (CTA final ink) ; **contact-form** (pages contact) ; **cta-final** (CTA paper centré).

---

## Top 3 priorités de refonte

1. **Typo serif transverse (directive #4, jamais exécutée).** Harmoniser tous les headers de héros et de sections vers « sans-serif + UN mot serif italique accent ». Concerne ~11 sections (héros service/pillar/landing + problem-statement + fit-columns). C'est le gain de finition le plus visible et le plus répété, et il touche le template entier.
2. **Habillage des médias (directive #6).** Remplacer les placeholders gris bruts par des illustrations stylisées intégrées dans `hero-split`, `feature-tabs`, `feature-zigzag` (et corriger le vide vertical de `feature-tabs`). Modèles internes corrects : `feature-split-media`, `hero-offer-detail`.
3. **Fix overflow `hero-offer-detail` + densité des démos.** (a) Corriger le clamp du H1 qui déborde en viewport large (bloque l'usage canonique pour les pages offre). (b) Enrichir les démos sous-remplies (`faq-accordion`, `objection-handler`, `comparison-table`, `guarantee-block`, `inclusions-list`) à la densité cible pour pouvoir juger et présenter ces slots dignement.
