# Backlog cas-par-cas · flotte de finalisation (post-audit #50)

> **EXÉCUTÉ 2026-07-16 (flotte 7 workers, commit `3ff47257`)** : lots A/B/C/D traités et vérifiés (GF-1 Playwright 23/23 sur dist, prod suivie). Reliquat consolidé ci-dessous ; le corps du fichier reste la référence détaillée de ce qui a été demandé.
>
> **Reliquat post-flotte** (à router en vagues courtes ou arbitrage Simon) :
> 1. Sweep libellé `forfait growth` → `régie growth` (~15 pages, mécanique : 99 €/h = régie, pas forfait).
> 2. `internal-mesh.ts` : helpers `meshForBlogHub()` + `meshForCasClientsHub()` puis montage `related-links` sur les hubs blog et cas-clients (doctrine 0 lien hardcodé).
> 3. Deep-links des stats vers les ancres `#source-<slug>` posées sur /sources-methodologie (liste des surfaces dans le rapport w-fin-confiance : maintenance-growth, secteurs e-commerce/batiment/startup/agence/liberal/therapeutes, swi-variants).
> 4. Hub guides : `chunkCards` exige min 2 → la carte du guide unique ne se rend pas (rendu single-card ou nav directe).
> 5. JSON-LD `Service` absent des pages services malgré `seo.serviceType`/`priceRange` en contenu (gap template route offres).
> 6. Canonical du cluster maturité (diagnostic ↔ outil score) : arbitrage SEO.
> 7. Dédup-blocs transverse n°16 : le résidu inter-pages = scaffolding site-wide volontaire (témoignages réels, case-cards, refrains) présent sur 3-26 pages ; toute vague future le traite HOLISTIQUEMENT, jamais page par page.
> 8. Décisions Simon en attente : email canonique `bonjour@waimia.fr` vs `.com` (~7 surfaces) · témoignages persona (n°37) · OG kicker « § Waimia » (n°19) · nav bloat méga-menu (#63) · home H1 « système(s) » (composant Hero, optionnel).
> 9. Parité EN blog : moot (routes EN inexistantes, rendu fr en dur) ; nettoyage des moitiés EN incohérentes possible sans impact live.

> Gap-check 2026-07-16 : actions des 115 rapports NON couvertes par les vagues #55-#63.
> S = < 30 min copy/lien · M = section/composant · L = refonte. Détail source = rapport de la page.
> Statut : CONSOLIDÉ (4 lots, 115 rapports contre-vérifiés le 2026-07-16).
> **Bilan : 87 pages avec reste / 28 clean-ou-couvertes · 21 transverses nouveaux (n°15-35) au-delà des 14 de SYNTHESE §2.**

## Lot C · Cas clients, cas d'usage, blog, lp (18 avec reste / 28)

### cas-clients (4 avec reste, balzeo + carnets clean)
- `/cas-clients` (hub) · [S] CTA sur-typé B2B (`index.astro:110`) → label générique ; [M] sur-promesse « résultats mesurés » lede+kicker (`:166`/`:171`) reformulée pour couvrir amploi/isabelle sans mentir ; [M] pont hub→systèmes/secteurs
- `/cas-clients/amploi` · [M/décision] mismatch caseRef startup-logiciel (cas RH ≠ SaaS) : repointer/requalifier/noindex ; [M data] 1-2 outcomes réels ou sortir du décompte « mesurés »
- `/cas-clients/desangles-peinture` · [S] deltas hedgés « à préciser » (mdx:135,142,149,162) à chiffrer ou retirer ; [S] caseRef entrant secteur bâtiment (cf. lot A flip index)
- `/cas-clients/isabelle-diaz-naturopathe` · [S] caseRef entrant therapeutes ; mesures/URL live = en attente Simon

### cas-usages (6 avec reste)
- Les 5 fiches · [M] trancher l'angle anti-cannibalisation vs le service jumeau (centraliser↔integration-crm/donnees, generer-leads↔systeme-acquisition, reduire-reporting↔donnees-reporting, reduire-cms↔wordpress/headless, standardiser↔automatisations/ops) ; [S] métadonnées propres (dates réelles, retirer le suffixe « Montpellier. » mécanique)
- reduire-reporting + reduire-temps-cms · [S] ajouter related-cards-band
- `/cas-usages` (hub) · [S] CTA diagnostic tracé `/contact?intent=diagnostic`

### blog (8 avec reste)
- ~6 billets · [S] CTA de fin canonique Cal `simonberos/audit` (agent-ia, avis-n8n, cabler-crm, pillar, seo-geo, relances-b2b)
- relances-b2b · [M] dégonfler les chiffres théâtraux (500k/720k €, garder le 2,6× HubSpot) ; [M] frontière vs cabler-crm ; [S] coquille mdx:83
- avis-n8n · [S] sourcer le pricing (tarifs officiels datés) ; [S] category→data
- brain-circuit + cabler-crm · [M] parité version EN
- pillar · [S] CTA conclusion Cal + hub /services
- `/blog` (hub) · [M] CTA newsletter hero ; [M] bande maillage hub→money (internal-mesh pas câblé sur le hub blog) ; [S] title qualifié

### lp : 0 gap hors scope #60 (aucun contenu unique à sauver ; campagnes Ads = en attente Simon)

### Transverses NOUVEAUX lot C
29. **CTA de fin canonique manquant sur ~6 billets blog** + newsletter hub (le plus gros gap blog non tracé).
30. **Mesh in-body cas→services absent** (TODO `cas-clients/[...slug].astro:135`) : dette commune aux 5 cas.
31. **Cannibalisations cas-usages↔services (5 arbitrages d'angle)** + blog relances↔cabler-crm : hors périmètre §2.12.
32. **Métadonnées dupliquées cas-usages** (dates identiques, suffixe « Montpellier. » ×5).
33. **Parité bilingue EN des essais** (cabler-crm, brain-circuit).
34. **Chiffres théâtraux/sourcing** (relances-b2b, avis-n8n) : voix + E-E-A-T.
35. **Taxonomie category blog** approximative (2 billets).
36. ~~**Bandeau cookies** « analytiques anonymes » sans GA4~~ **RÉGLÉ 2026-07-16** par w-content-fixes (bonus) : `CookiesBanner.astro` aligné « cookies essentiels uniquement » fr/en + politique de confidentialité conditionnelle avec les 4 sous-traitants réels (Vercel, Resend, MailerLite, Cal.com).
37. **Vigilance témoignages persona** : les testimonial-wall du site portent des personnes non vérifiables (pattern pré-existant, champs author/company libres) ; w-services-dedup est resté dans ce pattern en dédupliquant les auteurs. À trancher avec Simon à terme (anonymiser en « DAF, PME industrielle » vs assumer) — ne pas laisser un futur worker inventer des identités hors de ce pattern.

## Lot A · Home, conversion, utilitaires, secteurs (16 avec reste / 24)

- `/` · [S] retirer « Site web intelligent » du title + og:title (doctrine §0bis.4 ; #61 ne vise que les locales) ; [S opt] réinjecter « système(s) » dans le H1 HeroHome (signature canonique)
- `/audit-site-web-intelligent` · [M] différencier 3 sections H2 mot-pour-mot identiques à /audit-ia-pme (near-duplicate)
- `/contact` · [S] vérif : aucun lien Cal payant qui a fuité (audit gratuit verrouillé)
- `/tarifs` · [S] étiqueter HT/annualisé les montants secondaires 1188/2376/3960 €
- `/secteurs` · [S] cta_href du case-spotlight → /cas-clients (pas /contact) ; [S] JSON-LD ItemList des 12 secteurs
- `/secteurs/agence` · [M] metricsHero propres (déclonage 6sense 81/70) ; [S] posture Waimia-agence vs agence-cliente
- `/secteurs/batiment` · [M] prose 189→~280 mots (SEO local : GBP, avis, réponse chiffrée) ; [S] flip noindex→index + caseRef desangles
- `/secteurs/comptabilite` · [S] déclonage 2ᵉ metricsHero 6sense
- `/secteurs/conseil` · [M] déclonage metricsHero ; [S] retirer « consultants indépendants » de l'ICP (cannibalise liberal)
- `/secteurs/e-commerce` · [S] raccourcir title (troncature SERP)
- `/secteurs/esn` · [S] sourcer ou retirer « 75 % recruteurs IT (étude secteur) »
- `/secteurs/formation` · [S] remplacer le faux-KPI « Qualiopi » du band chiffré par un vrai chiffre
- `/secteurs/industrie` · [S] raccourcir title
- `/secteurs/liberal-independant` · [S] recentrer ICP solo (départager conseil)
- `/secteurs/startup-logiciel` · [M] trancher cas amploi ≠ SaaS : reformuler « logiciel métier RH » assumé OU noindex temporaire
- `/secteurs/therapeutes` · [M] prose 153→~280 mots + metricsHero (1 seul/3) ; [S] flip noindex→index + caseRef isabelle ; [S] angle RDV/confiance vs liberal
- Clean/couverts : audit-ia-pme, 3× bienvenue, 404, cgv, mentions-legales, plan-du-site (+ politique #61, services-b2b #60)

### Transverses NOUVEAUX lot A
19. **OG kicker « § Waimia » hardcodé** (`Base.astro:80`) sur l'og:image de toutes les pages : cryptique en partage social → décision produit.
20. **Titles secteurs trop longs (13 pages)** : format 2-clauses > ~70 car → troncature SERP ; sweep unique « Site web et IA pour <métier> · Waimia » (H1 long conservé).
21. **metricsHero sectoriels non-propres** : clone 6sense 81/70 (agence, conseil, comptabilite), source non nommée (esn), faux-KPI textuel (formation), band sous-alimenté (therapeutes).
22. **Flip noindex→index post-fix grille** : batiment + therapeutes candidats index avec caseRef (décision éditoriale, la grille surfacée est réglée).
23. **Cannibalisation ICP inter-secteurs** : conseil ↔ liberal ↔ therapeutes (chevauchements icp_fr) ; la fusion services-b2b n'en règle qu'une branche.

## Lot D · Ressources + confiance (25 avec reste / 31)

- `/ressources` · [S] title « ressources IA PME » sans jargon ; [S] « Six formats » → compte réel ; [M] cards vers comparatifs/diagnostics/guides/academy
- `/ressources/academy` · [S] bloc contexte SEO pré-formulaire ; [S] JSON-LD du diagnostic ; [S] frontière copy vs /audit-ia-pme
- `/ressources/outils/calculateur-roi-ia` · [S] title sans « · Outils Waimia » ; [S] relatedPages → automatisations/ops ; [S] JSON-LD WebApplication (post-#57)
- `/ressources/outils/score-maturite-ia` · [S] idem (title, relatedPages, WebApplication)
- `/ressources/comparatifs/claude-vs-chatgpt-pme` · [S] liens corps → integration-claude + expertise-claude
- `/ressources/comparatifs` · [S] phrase de curation par comparatif
- `/ressources/diagnostics/claude-pme` · [M] grille en <table> ; [S] liens → guide + integration-claude ; [M] ossature différenciée
- `/ressources/diagnostics/maturite-ia` · [S] liens → score-maturite-ia + academy ; [M] grille en <table> ; [M] ossature
- `/ressources/diagnostics/referent-ia` · [S] lien → consultant-ia-claude ; [M] ossature
- `/ressources/diagnostics/site-web-intelligent` · [M] checklist en <table> ; [S] liens → site-web-ia + audit ; [M] ossature
- `/ressources/diagnostics` · [S] micro-repère de différenciation par card
- `/ressources/guides/claude-pme` · [S] liens corps → diagnostic claude-pme + integration-claude
- `/ressources/guides` · [S] curation ; [S] nav directe vers l'unique guide
- `/ressources/outils` · [M] décision : noindex aligné OU enrichir 3-4 outils ; [S] retirer « templates » du title
- `/agence` · [S] title sans « Architectes » pluriel/jargon ; [S] 2-3 liens sortants money
- `/agence/cartographie` · [S] vérif 0 lien nav public ; [S] Disallow robots optionnel
- `/equipe` · [S] enrichir carte auteur ; [S] CollectionPage sans pluralité trompeuse
- `/expertise-claude` · [S] lien descriptif → integration-claude
- `/implantations/montpellier` · [S] harmoniser CTA hero/footer ; [S] maillage entrant (agence, footer, seo-local)
- `/manifesto` · [M] vocabulaire « agence/équipe » → studio solo ; [S] mislabel lien expertise-claude ; [S] marquee « logos » → « stack » ; [S] email waimia.fr vs .com ; [S] ancres blog descriptives
- `/agence/methode` · [S] lien → integration-claude ; [S] cohérence « cinq ans »
- `/equipe/simon-beros` · [S] vérif auto-jointure articles signés (404 = #59)
- `/sources-methodologie` · [S] chips « chiffre cité → source » depuis chaque surface à stat
- `/technologies` · [S] 2 liens descriptifs → site-web-ia + integration-claude
- Clean/couverts : geo-vs-seo, swi-vs-wordpress (#56+#61), about, partenaires (#60), bordeaux, implantations

### Transverses NOUVEAUX lot D
24. **Grilles diagnostics non tabulées** (4 pages) : niveaux/checklists en prose/cards, pas de <table> extractible GEO → fix template diagnostics.
25. **Squelette templaté identique des 4 diagnostics** (mêmes H2 charpente) : risque templated content.
26. **Sous-maillage hub /ressources → enfants** : comparatifs/diagnostics/guides/academy atteignables uniquement par le méga-menu.
27. **Titles outils génériques « · Outils Waimia »** (2 pages).
28. **Curation absente des hubs noindex** (comparatifs/diagnostics/guides-index).
+ Vigilance : tension « agence/équipe » vs studio solo possible sur d'autres surfaces legacy que le manifesto.

## Lot B · Services (28 pages avec reste / 30)

- `/services` · [M] bloc extractible GEO « ce que couvre chaque système » (définitions citables LLM)
- `/services/site-web-ia` · [S] param CTA `offer=site-web-intelligent` → slug réel `site-web-ia`
- `/services/webflow` · [S] H2 sans « site web intelligent », mener par « Webflow » ; [M] dédup 16 phrases parent
- `/services/wordpress` · [M] dédup 19 phrases parent ; [M] H2 « headless WordPress » + « WooCommerce »
- `/services/sur-mesure-headless` · [M] dédup 12 phrases ; [S] H2 termes techniques (headless/SSG/composable)
- `/services/integration-claude` · [S] FAQ frontière cadrage↔déploiement vs consultant
- `/services/consultant-ia-claude` · [M] maillage entrant (lier depuis integration-claude + contenus Claude comme étape cadrage) ; [S] FAQ frontière réciproque
- `/services/maintenance-growth` · [S] title mené par « maintenance site web »/TMA, « growth » en second
- `/services/referencement-ia` · [S] H1 enrichi « Référencement IA pour PME » ; [M] dédup 15 phrases parent ; [S] FAQ frontière
- `/services/seo-geo-contenu` · [S] renvois contextuels vers seo-local + referencement-ia
- `/services/seo-local` · [S] H1 enrichi « pour PME et artisans » ; [M] pont ↔ /implantations/montpellier ; [M] évaluer schema LocalBusiness/aire de service
- `/services/systeme-acquisition` · [M] diversifier ≥2 blocs mutualisés vs systeme-commercial (32 clonées)
- `/services/systeme-commercial` · [M] idem réciproque ; [S] expliciter le palier 0 € dans pricing-cards ; [S] désync tab home
- `/services/systemes-operationnels-ia` · [S] H1 hub différencié du module automatisations ; [S] FAQ frontière hub↔module (2 pages)
- `/services/landing-pages-tunnels` · [S] renvoi parent→enfant (google-ads) ; [M] dédup 20 phrases
- `/services/landing-page-google-ads` · [M] dédup + cas Ads/CPL propre ; [S] H2 SEA (Quality Score, message match, CPL)
- `/services/prospection-automatisee` · [S] renvoi parent→enfant cold-email ; [S] recentrer sur « multicanal en abonnement »
- `/services/sequences-de-suivi` · [S] renvoi parent→enfant relance-devis ; [M] dédup 29 phrases
- `/services/relance-devis` · [M] dédup + cas devis artisan/BTP propre ; [S] canal SMS différenciant
- `/services/automatisations` · [S] H1 module (workflows/outils) vs hub ops ; [S] renvoi parent→enfant n8n
- `/services/automatisation-n8n` · [S] angle self-hosted/coût-par-exécution hors FAQ
- `/services/agents-ia` · [S] renvoi parent→enfant support ; [M] dédup 27 phrases
- `/services/agent-support-client` · [M] dédup + cas SAV propre ; [S] « chatbot » en H2
- `/services/crm-scoring-routing` · [S] renvoi parent→enfant integration-crm ; [M] dédup 26 phrases
- `/services/integration-crm` · [M] dédup + cas assainissement doublons ; [S] HubSpot/Pipedrive en H2
- `/services/donnees-reporting` · [S] renvois vers integration-claude/automatisations ; [M] diversifier blocs data
- `/services/applications-internes` · [S] renvoi parent→enfant mvp-saas
- `/services/mvp-saas` · [S] clarifier modèle pricing (régie vs forfait attendu) ; [M] cas « MVP en N semaines » propre
- Clean : cold-email-b2b (#62), template-service-ref (#60).

### Transverses NOUVEAUX remontés par le lot B (absents des 14 de SYNTHESE §2)
15. **Bridge parent→enfant asymétrique** (~9 couples : lien money→enfant seulement en nav) : gabarit unique « renvoi contextuel » à répliquer sur le silo.
16. **Ossature clonée au-delà des 2 paires #62** : hubs 32 phrases entre eux, couples 11-29 (blocs mutualisés) → vague « dédup-blocs » distincte sur ~11 pages (cf. liste des paires ci-dessous).
17. **Cannibalisation hub↔module ops** : systemes-operationnels-ia ↔ automatisations, même racine H1 → frontière H1 + FAQ (2 pages).
18. **H1 kw-first mais trop courts (2 mots)** : referencement-ia, seo-local (extension du §2.10).

### Paires de duplication restantes (phrases partagées, hors #62)
acquisition↔commercial 32 · sequences↔relance-devis 29 · agents-ia↔support 27 · crm↔integration-crm 26 · landing↔google-ads 20 · site-web-ia↔wordpress 19 · site-web-ia↔webflow 16 · referencement-ia↔seo-geo 15 · headless 12 · seo-geo↔seo-local 12 · applications↔mvp 11. Saines : integration-claude↔consultant 5, ops↔automatisations 3.
