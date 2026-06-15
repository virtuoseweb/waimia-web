# 08 — Architecture d'information V1 : templates, pages, sections (SEO/GEO/AIO + conversion)

> Spec d'exécution pour Claude Code : pour CHAQUE page de la V1, la **composition de sections**
> (types RÉELS du catalogue, anti-orphelin), le rôle **mi-chemin hub ↔ pillar ↔ service ↔ conversion**,
> les **éléments SEO/GEO/AIO** à intégrer, et le **contenu manquant** à produire.
> Dérive de : `strategy/00-synthese-lancement`, `02 §0ter`, `03 §7`, `07-benchmark-digidop`, `state/07`.
> Catalogue de sections = `src/lib/section-registry.ts` (156 types). Règle : composer, jamais inliner.

---

## §0. Règles transverses SEO/GEO/AIO (s'appliquent à TOUTES les pages)

Issues du benchmark DigiDop (`strategy/07 §5-6`). À câbler sur chaque page, pas en option :

1. **1 H1 unique** keyword-first + **arbre Hn = silo** : H2 = sections majeures, H3 = sous-sujets/liens enfants (le lien interne vers une page enfant est **encapsulé sous son H3**). Mapping sémantique propre.
2. **FAQ-AEO sur chaque page** (`faq-two-column` ou `faq-accordion`) : 5-8 Q&A **longues et chiffrées** (prix, délais, objections, RGPD), schema `FAQPage`. C'est le pattern de citation LLM le plus rentable à autorité zéro.
3. **Meta + OG UNIQUES par page** : `<title>` ≈ H1 + qualificatif, meta-description = **bénéfice chiffré + CTA**, **OG image propre à la page** (DigiDop rate ce point → easy win).
4. **Schema.org par page** : `Organization` + `sameAs` (global, layout), puis par page `Service` / `FAQPage` / `BreadcrumbList` / `Article` selon le type. `LocalBusiness` sur home + page locale.
5. **GEO d'entité** (global) : cohérence « cabinet d'orchestration IA · Montpellier · Simon Beros » répétée site + LinkedIn + Crunchbase + GBP ; `sameAs` pointant ces profils.
6. **« 1 section de preuve = 1 chiffre »** : chaque bloc cas/metric porte UNE metric forte (réelle ou « par l'usage » waimia.com/virtuoseweb.fr). Jamais de chiffre inventé (GF-1).
7. **Maillage vertical strict** : hub → services → articles in-silo ; **0 lien horizontal** inter-pilier dans le corps. Ancres descriptives.
8. **Profondeur = différenciateur** : sur le terrain agents/IA, aller PLUS loin que DigiDop (méthode agent, MCP, archi) — c'est notre angle « ingénieurs qui construisent ».
9. **Conversion progressive** : audit/diagnostic gratuit (adossé « Osez l'IA ») + quizz scoring comme lead magnet — pas un CTA monolithique.
10. **`llms.txt` + sitemap propre** (whitelist only), Core Web Vitals verts (atout Astro).

**Légende rôle** : `HUB` (route + autorité) · `PILLAR` (profondeur SEO) · `SERVICE` (transactionnel) · `CONV` (conversion/CRO) · `TRUST` (E-E-A-T) · `EDITO` (contenu).

---

## §1. TEMPLATE HUB — `/acquerir` (Growth System IA) — le hub phare, hybride HUB+PILLAR+CONV

> Le hub Acquérir est le **cœur du silo**. Il fait 3 choses à la fois : **router** vers les 3 services
> (hub), **ranker** sur « système d'acquisition IA / growth marketing IA » (pillar), **convertir**
> (CTA audit, preuve, pricing teaser). C'est le « mi-chemin » demandé. Intention : commerciale + autorité.

| # | Section (type réel) | Rôle | Contenu / note GEO-SEO-AIO |
|---|---|---|---|
| 1 | `hero-pillar-hub` | HUB/PILLAR | H1 « **Système d'acquisition IA — des clients en continu** » · sous-titre orchestration (site + contenu + tunnel + agents) · dual CTA (Audit gratuit / Découvrir le système) · 3-4 KPI |
| 2 | `proof-bar` | TRUST | 4 metrics réelles/usage (ex. perf Lighthouse, délai, ROI médian 159 % sourcé) |
| 3 | `logo-wall` ou `social-proof` | TRUST | clients réels (Inbound Value, Amploi…) / preuve « par l'usage » |
| 4 | `problems-grid` | PILLAR | 3 douleurs acquisition PME (leads irréguliers · contenu sporadique · relances perdues) — keyword intent |
| 5 | `asymmetric-services` ou `services-grid` | **HUB** | **les 3 services en cartes (H3 + 1 metric + lien)** → `/services/site-web-intelligent`, `/content-marketing-intelligent`, `/tunnel-conversion-intelligent`. **C'est le routage hub-and-spoke + mapping Hn→silo** |
| 6 | `operating-layer` ou `feature-split-media` | PILLAR/diff | **« Comment le système tourne »** : agents Claude branchés au repo, MCP, génération/qualif/relance — PROFONDEUR (anti-DigiDop) |
| 7 | `ecosystem-partners` ou `tech-stack-band` | TRUST/AIO | Anthropic-first, Claude, MCP, intégrations (HubSpot/Brevo) — signal d'entité/expertise |
| 8 | `case-card-grid` ou `case-spotlight` | TRUST | 2-3 cas réels, 1 metric chacun |
| 9 | `comparison-duo` ou `versus-competitors` | CONV | « système IA » vs « agence web classique » vs « faire seul » — désamorce la commodité |
| 10 | `coming-soon-pills` | HUB | ancres `#seo-geo` (→ service content), `#publicite` *(à venir)*, `#agent-marketing` *(à venir)* — crédible, 0 lien mort |
| 11 | `pricing-single-highlight` ou `offer-tier-grid` | CONV | teaser grille 2/4/7/10k + lien (renvoi `/services/site-web-intelligent#pricing`) |
| 12 | `faq-two-column` | GEO/AIO | **FAQ-AEO 6-8 Q chiffrées** (c'est quoi un système d'acquisition IA, combien, délai, et si je n'ai pas de site, ROI, différence agence) + schema `FAQPage` |
| 13 | `footer-cta-band` | CONV | CTA final « Audit gratuit » |

**SEO/GEO** : H1 « système d'acquisition IA » (couche B autorité) ; schema `Service` + `FAQPage` + `BreadcrumbList` ; OG propre.
**Contenu manquant** : copy hero + 3 douleurs + bloc « comment ça tourne » (méthode agents) + FAQ 6-8 Q chiffrées + 2-3 cas réels formalisés.

---

## §2. TEMPLATE HUB-VITRINE GELÉ — `/piloter` (Business Intelligence) & `/operer` (Operations IA)

> 1 page chacun, **sections ancrées**, **jamais de ciblage SEO offensif** (ADR-002). Rôle : crédibilité
> d'offre + funnel consulting, PAS un silo. Plus léger que `/acquerir` (pas de cluster, pas de pages enfant).

| # | Section | Rôle | Note |
|---|---|---|---|
| 1 | `hero-pillar-hub` ou `hero-hub-stats` | HUB | H1 = nom d'offre (« Business Intelligence » / « Operations IA ») + promesse (voir & décider / gagner du temps) |
| 2 | `proof-bar` | TRUST | metrics sobres |
| 3 | `problem-statement` | PILLAR-light | la douleur (données éparpillées / tâches répétitives) |
| 4 | `feature-grid` ou `bento-grid` | HUB | **1 bloc par sous-sujet = ancre** (`#revops`, `#tableaux-de-bord`, `#reporting-ia`… / `#crm-relances`, `#automatisation`, `#service-client`…) |
| 5 | `feature-split-media` | diff | 1 capacité phare illustrée |
| 6 | `case-spotlight` ou `testimonial-block` | TRUST | 1 preuve (ou « bientôt » honnête si pas de cas — Piloter = terrain partenaire) |
| 7 | `faq-accordion` | GEO/AIO | 4-6 Q (light) |
| 8 | `footer-cta-band` | CONV | CTA audit / « parler à un expert » |

**SEO/GEO** : pas de KW offensif ; schema `Service` + `FAQPage` ; les ancres servent le méga-menu, pas l'indexation séparée.
**Contenu manquant** : nom d'offre validé (Operations IA), 6 blocs ancrés par pilier, 1 preuve crédible chacun. *(Opérer peut tolérer 0-2 pages enfant métier plus tard — nouvel ADR.)*

---

## §3. TEMPLATE PAGE DE SERVICE — `/services/*` (raffiné depuis `state/07` + GEO)

> Les 3 pages : `site-web-intelligent` (flagship), `content-marketing-intelligent` (**fusionne SEO/GEO**),
> `tunnel-conversion-intelligent`. Séquence **13 sections déjà figée + buildée** (`state/07`). Rôle `SERVICE`
> riche (rank) — la `/lp/*` jumelle fait la `CONV` pure.

Séquence canonique (inchangée) : `hero-conversion-funnel` → `proof-bar` → `problems-grid` → `diagnostic-stages` → `method-timeline` → `workflow-table` → `feature-split-media` → `deliverables-grid` → `stats-bento` → `comparison-duo` → `pricing-cards` → `faq-two-column` → `footer-cta-band`.

**Ajouts V1 (benchmark) à câbler sur les 3 :**
- **FAQ-AEO enrichie** (`faq-two-column`) : porter à **6-8 Q chiffrées** par service (prix de CE service, délai, « et si je pars ? », RGPD, autonomie d'édition, différence vs Wix/Lovable). Schema `FAQPage`.
- **`pricing-cards`** : 4 paliers 2/4/7/10k + « Sur mesure » (5ᵉ carte/aside).
- **Profondeur agents** sur `site-web-intelligent` (`feature-split-media` + éventuel `agentic-terminal`/`tech-integration-flow`) : montrer le « comment » (agent Claude branché au repo, MCP) — surclasser la page `ai-automation` de DigiDop.
- **`content-marketing-intelligent`** : intègre la **section `#seo-geo`** (le GEO vit ici, pas de page séparée) — bloc « être trouvé par Google ET les IA » + méthode.
- Schema `Service` + `FAQPage` + `BreadcrumbList` ; H1 = `strategy/03 §7` ; OG propre par page.

**Contenu manquant** : copy des 13 sections × 3 services (hero, 3 douleurs, méthode 4-5 étapes, workflow chiffré, livrables, 4 stats, comparatif, pricing, FAQ 6-8 Q). Le `content-marketing-intelligent` doit absorber l'ancien contenu SEO/GEO.

---

## §4. TEMPLATE LANDING CRO — `/lp/*` (jumelle conversion de chaque service)

> Variante **allégée orientée conversion** (Phase C, `state/08`). Indexable mais pensée CRO + lead magnet.

| # | Section | Note |
|---|---|---|
| 1 | `hero-landing` | H1 promesse + 1 CTA fort + preuve immédiate |
| 2 | `pain-points` | 3 frictions |
| 3 | `metric-shift` ou `stat-block` | avant→après chiffré |
| 4 | `guarantee-block` | garanties (audit 5 j, données UE, « vous possédez tout ») |
| 5 | `pricing-single-highlight` | 1 offre mise en avant + lien grille |
| 6 | `faq-cta-aside` | 4-5 Q + CTA latéral |
| 7 | `cta-form-inline` ou `hero-lead-magnet` | **quizz de scoring / diagnostic** (lead magnet — avantage vs DigiDop) |

**Contenu manquant** : copy CRO par landing + le **quizz lead-magnet de scoring** (questions → score maturité IA → reco palier).

---

## §5. HOME — `/`

> Rôle : **marque + entité + routage**. Mène par le système/résultat (cabinet IA), pas « un site ».

| # | Section | Note GEO/SEO/AIO |
|---|---|---|
| 1 | `hero-home` | H1 « **Le cabinet qui fait tourner votre PME à l'IA** » + sous-titre acquisition/pilotage/opérations + dual CTA |
| 2 | `proof-bar` ou `social-proof` | preuve + logos réels |
| 3 | `problem-statement` | la douleur PME (« l'IA partout, par où commencer ») |
| 4 | `asymmetric-services` ou `department-stack` | **les 3 piliers** (Acquérir/Piloter/Opérer) → routage vers `/acquerir` `/piloter` `/operer` |
| 5 | `feature-split-media` | « porte d'entrée = site web intelligent » → `/services/site-web-intelligent` |
| 6 | `case-card-grid` | cas réels chiffrés + preuve « par l'usage » |
| 7 | `ecosystem-partners` | Anthropic-first / Claude / MCP (entité/expertise) |
| 8 | `manifesto-statement` | extrait manifeste (voix) → `/manifeste` |
| 9 | `faq-two-column` | FAQ-AEO « c'est quoi un cabinet d'orchestration IA », « pour qui », « combien », « par où commencer (aides Osez l'IA) » |
| 10 | `footer-cta-band` | CTA audit + ancrage local (Montpellier) |

**Schema** : `Organization` + `sameAs` + `LocalBusiness` + `FAQPage`. **Contenu manquant** : copy hero marque, 3 piliers, FAQ entité, sélection cas.

---

## §6. PAGE LOCALE — `/agence-web-montpellier`

> Front **cash local** du silo. Capte « site web intelligent / création site internet Montpellier » sans
> se réduire à « agence web ». Schema `LocalBusiness`.

| # | Section | Note |
|---|---|---|
| 1 | `hero-sector` ou `hero-social-proof` | H1 « **Site web intelligent & IA à Montpellier** » + ancrage local |
| 2 | `proof-bar` | preuve locale / délais |
| 3 | `problems-grid` | douleurs PME locales |
| 4 | `feature-split-media` | le système IA appliqué (renvoi `/services/site-web-intelligent`) |
| 5 | `case-spotlight` | cas local (Carnets de Montpellier…) |
| 6 | `pricing-single-highlight` | entrée 2 000 € + lien grille |
| 7 | `faq-two-column` | FAQ locale (zone, RDV, « pourquoi Montpellier », aides régionales) |
| 8 | `footer-cta-band` | CTA + GBP |

**SEO/GEO** : `LocalBusiness` schema, NAP cohérent (SIRET, Montpellier), lien GBP, entité locale. **Contenu manquant** : copy local + 1 cas local + FAQ locale.

---

## §7. PAGE D'APPEL — `/offres/audit-maturite-ia` (Diagnostic IA)

> Produit d'appel, **conversion-first**, adossé aux aides. Lead magnet central du funnel.

| # | Section | Note |
|---|---|---|
| 1 | `hero-lead-magnet` ou `hero-form-inline` | H1 « **Diagnostic IA PME — 3 actions chiffrées (aides Osez l'IA mobilisables)** » + form |
| 2 | `pain-points` | « passe à côté de l'IA / site qui ne convertit pas » |
| 3 | `inclusions-list` ou `deliverables-grid` | ce qu'on livre (diagnostic, 3 quick wins chiffrés, 1 capture GEO, reco palier) |
| 4 | `process-steps` | brief 20 min → analyse → restitution visio |
| 5 | `guarantee-block` | « repartez avec un plan même sans signer » |
| 6 | `faq-accordion` | « c'est gratuit ? », « aides Osez l'IA ? », « combien de temps » |
| 7 | `cta-form-inline` | prise de RDV (cal.com) |

**Contenu manquant** : copy + détail des aides « Osez l'IA » / Diagnostic Data IA (40 % État) + form/quizz.

---

## §8. PAGES CONFIANCE / E-E-A-T (compactes)

| Page | Sections (types) | GEO/SEO/AIO + contenu manquant |
|---|---|---|
| `/agence` (about+méthode fusionnés) | `hero-centered` → `about-story-split` → `method-timeline` → `commitments-grid` → `team-bio-grid` (Simon) → `ecosystem-partners` → `faq-accordion` → `footer-cta-band` | **Page ENTITÉ clé pour GEO** : qui/quoi/fondé/où/dirigeant, schema `Organization`+`sameAs` (LinkedIn société+Simon, Crunchbase). Véridique (studio/cabinet solo). Manquant : récit réel, méthode, engagements. |
| `/equipe/simon-beros` | `hero-author` → `about-story-split` → `stat-block` (parcours) → `timeline-block` → `related-cards-band` → `cta-inline` | Page AUTEUR (E-E-A-T) : bio véridique, schema `Person` + `sameAs` LinkedIn. Manquant : bio, parcours sourcé. |
| `/manifeste` | `manifesto-act` / `manifesto-block` / `manifesto-statement` → `cta-band` | Voix de marque (signatures réelles). Contenu = manifeste existant nettoyé (0 chiffre inventé). |
| `/realisations` (ex-/cas) | `hero-hub-listing` → `case-card-grid` → `metric-callout-band` → `testimonial-metrics` → `footer-cta-band` | Indexé **seulement une fois peuplé de VRAIS cas**. 1 cas = 1 metric. Manquant : 2-3 cas réels formalisés (problème→système→résultat chiffré). |
| `/contact` | `hero-form-inline` → `contact-form` → `booking-embed` (cal.com) → `trust-badges-band` | Coordonnées véridiques (retirer fausses adresses). Schema `Organization`/`ContactPoint`. |

---

## §9. RESSOURCES & AUTORITÉ (compactes)

| Page | Sections | Note |
|---|---|---|
| `/ressources` (hub) | `hero-hub-stats` → `resource-card-grid` → `newsletter-band` → `cta-band` | Hub slim : blog + outils + academy. |
| `/ressources/blog` (cluster in-silo) | `hero-hub-listing` → `article-grid` → `newsletter-band` | **6 articles in-silo only** (cf `strategy/03 §7` content gaps). Schema `Article`/`BlogPosting`. Maillage vertical vers `/services/*`. |
| `/ressources/outils/calculateur-roi-ia` | `hero-lead-magnet` → outil → `cta-form-inline` | Outil gratuit = aimant (pattern DigiDop). |
| `/ressources/academy` | `hero-academy-hub` → `learning-path-list` → `cta-newsletter-footer` | Diagnostic lead-gen réel. |
| `/expertise-claude` (ex-techno) | `hero-tech-layer` → `tech-positioning-split` → `tech-models-table` → `ecosystem-partners` → `faq-accordion` | Autorité écosystème Anthropic-first. Schema `Service`/`FAQPage`. Manquant : positionnement Claude/MCP. |
| Légal (`/mentions-legales`, `/politique-de-confidentialite`, `/cgv`) | `trust-legal-section` | **À CRÉER** (obligatoire RGPD). Contenu juridique réel. |

---

## §10. Checklist contenu manquant (consolidée, priorité lancement)

**P0 (bloquant lancement) :**
- [ ] Copy des 3 pages `/services/*` (13 sections ×3) + FAQ 6-8 Q chiffrées chacune.
- [ ] Copy hub `/acquerir` (hero, 3 douleurs, « comment ça tourne », FAQ, pricing teaser).
- [ ] Home (hero marque, 3 piliers, FAQ entité).
- [ ] Page locale `/agence-web-montpellier` (copy + 1 cas local + FAQ locale).
- [ ] `/offres/audit-maturite-ia` (copy + aides Osez l'IA + form).
- [ ] **Pages légales** (mentions, RGPD) — obligatoire.
- [ ] Page entité `/agence` + `/equipe/simon-beros` (GEO d'entité + `sameAs`).
- [ ] 2-3 **vrais cas** formalisés (1 section = 1 chiffre) pour `/realisations` + preuve par l'usage.
- [ ] Piliers `/piloter` `/operer` (6 blocs ancrés + 1 preuve chacun, nom « Operations IA » validé).

**P1 (post-lancement proche) :**
- [ ] Landings `/lp/*` (copy CRO + quizz scoring).
- [ ] 6 articles blog in-silo (content gaps `strategy/03 §7`).
- [ ] `/expertise-claude`, `/ressources/*`, outils.

**Transverse (toutes pages) :** OG + meta uniques · schema par page · FAQ-AEO · `sameAs` entité · maillage vertical · 0 chiffre inventé (GF-1).
