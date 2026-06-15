# 09 — Blueprint contenu V1 : état réel, gaps à finir, inputs Simon

> Issu de l'exploration du **contenu réel du repo** (3 agents, 2026-06-15). Complète `strategy/08`
> (l'IA cible) avec **l'état réel page par page** : ce qui est PRÊT, les GAPS à finir, le fictif à
> retirer, les nouveaux modèles, le différé-compatible, et les **inputs que seul Simon a**.
> Pour Claude Code : la V1 n'est pas à construire, elle est à **finir et durcir**.

## 0. Constat majeur (la matière réelle ≠ ce que les vieux docs supposaient)

- **Silo Acquérir ≈ 90 % construit** : hub `/acquerir` (`acquerir.astro`, 10 sections) + 3 services
  `/services/*.mdx` (13 sections chacun, FAQ, pricing 4 paliers) + 3 landings `/lp/*.mdx`. **Fusions
  déjà faites** : content+SEO/GEO → `content-marketing-intelligent` ; tunnel-de-vente+`specs/04` →
  `tunnel-conversion-intelligent` ; growth-system-ia → recyclé dans le hub.
- **Fictif quasi déjà retiré** des collections : pas de cas Plateau/Halcyon/Northbound/Caserne (n'existent
  plus), pas de cookbooks/personas/testimonials/livres-blancs/veille-ia (collections supprimées).
- **3 cas RÉELS** : `amploi`, `balzeo`, `les-carnets-de-montpellier` (template cas complet).
- **Légal RÉEL et présent** (mentions/RGPD/CGV existent, données EI VirtuoseWeb vérifiables).
- **Le travail restant = finition + durcissement SEO/GEO + nettoyage résidus fictifs + inputs Simon.**

---

## 1. Silo Acquérir — état + gaps

| Page | État | GAPS à finir (priorité SEO/GEO) |
|---|---|---|
| `/acquerir` (hub) | 10 sections, PRÊT mais **en retard sur sa spec** | **+`problems-grid`** (3 douleurs ← `pain-points.ts`) · **+`case-card-grid`** (réutiliser bloc cases de site-web) · **+`faq-two-column` 6-8 Q chiffrées + schema `FAQPage`** (manque de citation LLM le + coûteux ; le hub n'a que `Service` JSON-LD) |
| `/services/site-web-intelligent` | 13 sections, **PRÊT**, FAQ 9 Q, `faq_fr` miroir OK | rien de bloquant (option : bloc profondeur agents `agentic-terminal`/`tech-integration-flow` = PLUS anti-DigiDop) |
| `/services/content-marketing-intelligent` | 13 sections, **PRÊT** (fusion faite) | **+`faq_fr`/`faq_en` en frontmatter** (miroir JSON-LD `FAQPage` manquant) |
| `/services/tunnel-conversion-intelligent` | 13 sections, **PRÊT** | **+`faq_fr`/`faq_en` en frontmatter** (idem) |
| `/lp/site-web-intelligent` · `/lp/content-…` · `/lp/tunnel-…` | 6-7 sections, **PRÊT** (noindex) | **+`guarantee-block`** (copy prête `specs/04` + `guarantees.ts`) · **+quizz lead-magnet de scoring** (Phase C, placeholders posés) |

**Arbitrages** : H1 hub « Trouver plus de clients » (actuel, PME-friendly) vs « Système d'acquisition IA »
(keyword autorité B) → **[Q1 Simon]**. Slug `tunnel-conversion-intelligent` (retenu) vs `tunnel-de-conversion` (ancien mapping) → garder le retenu.

---

## 2. Réalisations / cas — état + gaps

- **3 cas réels**, template complet (problème→système→résultat). **Balzeo** & **Carnets** ont shifts+metrics+verbatim ; **Amploi** n'a **pas de bloc résultat chiffré** (`shifts`/`metrics` absents).
- **Gaps** : (a) **valider les chiffres** Balzeo (5,2→2,4 s, +35 %, ×3, −84 %) et Carnets (40 art., 150 membres, 35 abonnés, Top 10) → **[Q2 Simon]** ; (b) Amploi : ajouter 1 chiffre réel **ou** assumer les `contextStats` sans inventer de delta → **[Q2 Simon]** ; (c) `heroImage` absent sur les 3 + `image-manifest.json` pointe encore les 4 slugs **fictifs** (`cas-caserne/halcyon/northbound/plateau`) → **nettoyer + ajouter `cas-amploi/balzeo/les-carnets`** ; (d) page hub : câbler `metric-callout-band` + `testimonial-metrics`.
- **Cas non créés** (Inbound Value, Desangles, naturopathe, import-export) : structure prête à les absorber (champs résultat optionnels) → **[Q3 Simon : produire lesquels ? matière ?]**.
- **URL** : route actuelle `/cas-clients` vs cible `/realisations` → **[Q1 Simon]**.

---

## 3. Ressources / blog / outils / academy — état + gaps

- **`/ressources` (hub) PRÊT** (agrège blog+outils+cases, compteurs réels). **Outils** (`calculateur-roi-ia`) **PRÊT** (formule honnête + API). **Academy PRÊT** (diagnostic 6 Q, score /18, API hot-lead).
- **Blog : 6 keepers réels, MAIS maillage vertical CASSÉ** — leurs `relatedSolutions` pointent l'ancienne arbo `/solutions/*` supprimée → **remapper vers `/services/*` + ancres piliers** (vrai trou fonctionnel). Normaliser le champ `type:` (2 articles ne l'ont pas). `essai-pillar-ia-pme-2026` cite « Claude 3.7 / GPT-4o / Gemini 2.0 » → **rafraîchir les versions modèles**.
- **Content gaps à écrire** (différable, structure prête) : Diagnostic IA + aides Osez l'IA · Site intelligent vs Wix/Lovable · Coût/ROI projet IA. (Agent IA vs auto + GEO : déjà couverts par 2 keepers.)
- **Décisions** : `captureEmail` sur le calculateur (lead-gen vs sans friction) → **[Q4 Simon]** ; Academy = diagnostic seul V1 (reco) vs +parcours pédagogiques → **[Q4 Simon]**.

---

## 4. Confiance / identité / local / audit / légal — état + gaps

| Page | État | Action |
|---|---|---|
| `/agence` (ENTITÉ — clé GEO) | Composable, déjà assaini | **+`faq-accordion` entité** (qui/qui dirige/où/depuis quand) · **injecter `Organization` + `founder` Simon + `foundingDate 2020` + `sameAs`** (LinkedIn + Crunchbase) · vérifier claim **France Num** |
| `/equipe/simon-beros` (AUTEUR) | Bio véridique, schema `Person` | Harmoniser 2020 (VirtuoseWeb) / 2024 (Waimia) · **retirer publications sans URL réelle** (memo/lettre/glossaire inexistants) · email canonique |
| `/manifeste` (ex-`/manifesto`) | Voix réelle MAIS **pollué fictif** | **SUPPRIMER Acte III VirtuoseOS** (produit inventé) · **SUPPRIMER `CLIENT_LOGOS` + 4 `CASE_FEED`** si non réels · renommer route `/manifeste` |
| `/contact` | Quasi propre | Vérifier `cal.com/simonberos/audit`, `linkedin.com/company/waimia` |
| `/agence-web-montpellier` (LOCAL) | Composable, propre, **`noindex`** | Pour indexer : **NAP réel** (adresse/tel/GBP) + `LocalBusiness` complété |
| `/offres/audit-maturite-ia` (DIAGNOSTIC) | **Massivement fictif → REFONTE** | Remplacer l'audit ETI 8k€/47 critères/32 audits/94 % NPS (inventés) par **« Diagnostic IA PME — 3 actions chiffrées, aides Osez l'IA »** conversion-first (cf `08 §7`) |
| Légal (mentions/RGPD/CGV) | **Existent, données réelles** | Vérifier alias `dpo@`, cohérence email `.fr`/`.com` |

**Fictif résiduel à purger (fichier:ligne fournis par l'agent)** : `VirtuoseOS` (methode.astro L134-144, manifesto.astro L190-213, sitemap.ts L481-487+L539), audit-maturite-ia.astro (proofMetrics L48-53, témoignage L80-83, cas SaaS 180p L137-160), `seo.ts` (`knowsAbout: AI Act compliance` L29-33 ; `sameAs` x.com/waimia_ai + github/waimia L26-27 si inexistants).

---

## 5. Nouveaux modèles de section nécessaires → quasi AUCUN

Le catalogue (156 types) couvre **tous** les besoins des blueprints (§08) : câblage + contenu, pas
création (cohérent régime DS). **Seul vrai nouveau modèle** = **quizz lead-magnet de scoring** (les 3 LP)
= feature **applicative** Phase C (questions → score maturité IA → reco palier), pas une simple section.
**[Q : grille de questions + barème → INPUT SIMON]**. Optionnel : bloc profondeur agents (PLUS).

## 6. Différé-compatible (déjà prévu, à ne pas casser)

Sections ancrées hub `#publicite`/`#agent-marketing` (« à venir », `coming-soon-pills`) · plus de cas
(collection prête, champs résultat optionnels) · plus d'articles (3 gaps) · plus d'outils (TCO, AI Act —
schéma prêt) · Academy parcours · maillage `relatedCases` en source unique (GLOBAL) le jour où réutilisé.

---

## 7. INPUT SIMON — checklist (les pages ne sont « finies » qu'avec ça)

**Stratégique (arbitrages) :** Q1 H1 hub + URL `/realisations` · Q2 chiffres cas (Balzeo/Carnets/Amploi)
· Q3 cas à produire (Inbound Value/Desangles/naturo/import-export) · Q4 calculateur captureEmail + Academy scope · grille quizz scoring · manifeste : logos/cas réels ou retrait.

**Factuel (entité/identité) — open text :**
- Crunchbase URL · page LinkedIn **société** Waimia (existe ?) · handle X société · agrément **France Num** réel ?
- Email canonique `@waimia.fr` vs `@waimia.com` + alias `dpo@` existe ?
- **cal.com** URL réelle du booking.
- **NAP Montpellier** : adresse pro (ou « sur RDV »), téléphone public oui/non, lien **Google Business Profile**.
- **Bio Simon** : parcours daté réel + vrais écrits publiés (sinon retirer le bloc).
- **Format réel du diagnostic** : durée, gratuit ou prix, livrables.
- **Aides « Osez l'IA » / Diagnostic Data IA** : taux/plafond/conditions/source officielle *(Claude peut les rechercher — public).*

> ⚠️ Règle GF-1 : tout chiffre de cas/preuve doit être **réel et validé** avant déploiement, sinon retiré.

---

## 8. DÉCISIONS TRANCHÉES (Simon, 2026-06-15) — VERROUILLÉ pour Claude Code

- **H1 hub `/acquerir` = HYBRIDE** : garder H1 « Trouver plus de clients » + ajouter « système d'acquisition IA » en sous-titre/H2 (keyword couche autorité).
- **Preuve fictive = RETIRER tout le non-prouvé (GF-1)** : manifeste → supprimer `CLIENT_LOGOS`, `CASE_FEED`, **Acte III VirtuoseOS** (garder la voix) ; audit → supprimer `proofMetrics` (32 audits/94 % NPS/78 %/0j), faux témoignage, « cas SaaS 180p » ; `seo.ts` → retirer `knowsAbout: AI Act compliance` + `sameAs` non vérifiés. Réafficher logos/cas/chiffres **seulement** si Simon fournit du réel.
- **Quizz scoring = DIFFÉRÉ Phase C** : les 3 LP partent sans (placeholders gardés) ; l'**Academy** (diagnostic réel) = lead magnet V1.
- **URL cas = GARDER `/cas-clients`** (pas de renommage `/realisations` — mettre à jour les réfs `/realisations` de `08`/`09`/`02 §0ter` vers `/cas-clients`).
- **Cas** = garder les 3 réels (**Balzeo : chiffres VALIDÉS ✅** par Simon — remplacer si besoin ; **Amploi : pas de metric inventée**, `contextStats`). **+ AJOUTER 2 cas réels maintenant : Desangles Peinture + Isabelle Diaz (naturopathe)** — matière réelle disponible (cf §9). Inbound Value = **futur cas** (projet en cours) ; import-export = **prospect** (pas un cas).
- **calculateur** : activer `captureEmail` (lead-gen). **Academy = diagnostic seul** en V1 (parcours différé).

### Valeurs entité/GEO — CONFIRMÉES par Simon (2026-06-15)
- **Email canonique = `@waimia.fr`** (source = mentions légales). Harmoniser tous les `@waimia.com` → `@waimia.fr`. `dpo@…` → `bonjour@waimia.fr`.
- **France Num « Activateur » = RÉEL → GARDER** ✅ Page officielle : `https://www.francenum.gouv.fr/activateurs/beros-simon`. À afficher (badge + lien) comme preuve d'autorité tierce — c'est un vrai signal E-E-A-T/GEO.
- **`sameAs` final = `linkedin.com/in/simonberos` · `linkedin.com/company/waimia` (existe ✅) · `x.com/simonberos` · `github.com/virtuoseweb`** + France Num activateur. Retirer `x.com/waimia_ai`, `github.com/virtuoseweb/waimia` (inexistants). Pas de Crunchbase (n'existe pas → ne pas fabriquer).
- **cal.com = confirmé ✅** (`cal.com/simonberos/audit`).
- **NAP locale = « Montpellier, France · sur RDV » + tél `+33 6 20 61 56 93`**. `/agence-web-montpellier` indexable avec ce NAP. **GBP Waimia n'existe pas encore** (c'est celui de **VirtuoseWeb** pour l'instant) → créer un GBP Waimia en parallèle (cash-first) ; en attendant, ne pas revendiquer d'avis/`aggregateRating` Waimia.
- **Bio Simon** = harmoniser « EI VirtuoseWeb 2020 → marque Waimia 2024 » ; retirer les publications sans URL réelle.

### Page `/offres/audit-maturite-ia` → « Diagnostic IA PME » (contenu « Osez l'IA » recherché & sourcé)
Reconstruire conversion-first, adossé au dispositif public réel :
- **Plan « Osez l'IA »** (France 2030, opéré **Bpifrance**) = formation + diagnostic + accompagnement ; cible 80 % d'adoption IA PME/ETI d'ici 2030 (~200 M€).
- **Diagnostic Data IA Bpifrance** : PME/ETI **10-2 000 salariés**, **8-10 j** d'expert, **10 000 € HT cofinancés (~25 % pris en charge pour les PME)**, sur 3 mois max ; plateforme **diaginno.bpifrance.fr** (compte → dossier → prestataire référencé).
- **Formations Osez l'IA** : gratuites / cofinancées (Académie IA).
- **Angle Waimia** : « on cadre votre diagnostic et on mobilise les aides » — posture conseil, friction quasi nulle. ⚠️ vérifier le **taux exact selon profil** avant de l'afficher comme promesse (0 chiffre non sourcé).
- Sources : [France Num — Osez l'IA/Bpifrance](https://www.francenum.gouv.fr/aides-financieres/guides-et-conseils-financiers/bpifrance-finance-et-accompagne-dans-le-cadre-du) · [Diagnostic IA Bpifrance](https://www.bloom-ai.fr/blog/diagnostic-ia-bpifrance) · [ladinguerie — guide Osez l'IA 2026](https://www.ladinguerie.fr/blog/osez-lia-en-2026-le-guide-complet-des-aides-diagnostics-et-financements-pour-pme).

---

## 9. Cas clients à produire — matière réelle (2026-06-15)

> Deux nouveaux cas réels à créer dans la collection `cases` (en plus d'amploi/balzeo/carnets). Champs =
> schéma `cases` (contextStatement, contextStats, bottlenecks×3, phases, deliverableCards, shifts/metrics,
> pullQuote, faq, card). **GF-1 : aucun résultat inventé.** heroImage + entrée image-manifest à ajouter.

### 9.a — Desangles Peinture (RÉEL, résultats MESURÉS) — source `virtuoseweb.fr/etudes-de-cas/desangles-peinture`
- **Carte** : secteur « Artisanat / Peinture bâtiment · TPE », durée **4 semaines**, headline « Artisan peintre en 1re page Google ».
- **Contexte** : artisan reconnu localement mais **invisible en ligne** (pas de logo, pas de site) ; les concurrents mieux positionnés captent les demandes de devis.
- **Goulots (3)** : 01 Aucune identité visuelle (pas de logo/carte) · 02 Aucun site ni présence en ligne · 03 Concurrents locaux bien positionnés sur Google (acquisition 100 % bouche-à-oreille).
- **Phases (3)** : 1 **Identité visuelle** (1 sem : logo, charte, cartes) · 2 **Site vitrine + galerie réalisations** (2 sem : responsive, galerie chantiers, formulaire devis) · 3 **SEO local + Google My Business** (1 sem : fiche GMB optimisée, référencement local, stratégie d'avis).
- **Livrables** : logo + charte + cartes · site vitrine responsive + galerie + formulaire devis · fiche GMB + SEO local + collecte d'avis.
- **Résultats (shifts MESURÉS, réels)** : Position Google **Non classé → 1re page** · Demandes **bouche-à-oreille → +10/an via le web** · Image **aucun support → logo+carte+site** · Avis Google **0 → 15+ (4,8★)**.
- **Verbatim** : « Avant, je n'avais ni logo, ni carte de visite, ni site. Simon a tout créé de A à Z… un référencement qui me ramène une dizaine de demandes supplémentaires par an. Mon image a complètement changé. » — Gérant, Desangles Peinture.
- ⚠️ **Cadrage honnête** : cas **web/SEO/identité local** (réalisé sous VirtuoseWeb, même fondateur) — léger en IA. À présenter comme **preuve d'exécution local/SEO** ; mention « réalisé par Simon Beros (VirtuoseWeb) ». Angle Waimia = la base web qui ramène des demandes réelles.

### 9.b — Isabelle Diaz, Naturopathe (RÉEL, SYSTÈME LIVRÉ — résultats À MESURER) — site `sitewebnaturopathe.vercel.app` (prod isabellediaz.com) + livrables dossier « Échanges & Livrables »
- **Carte** : secteur « Santé / bien-être · thérapeute · Montauroux (Var) », headline « Un site intelligent + funnel d'acquisition local & national pour thérapeute ».
- **Contexte** : naturopathe ex-biologiste/infirmière, **5 activités** (naturopathie, soins esséniens, soins quantiques, communication animale, fleurs de Bach). Besoin : transformer une présence faible en **système d'acquisition** local (cabinet) **et** national (visio), sans dépendre du bouche-à-oreille.
- **Goulots (3)** : 01 Présence en ligne faible, pas de tunnel · 02 Offre multi-services illisible pour le visiteur · 03 Acquisition non outillée (0 captation de lead, 0 mesure).
- **Phases (4)** : 1 **Site Astro IA-native** multi-services (pages service + à propos/approche + blog + **réservation en ligne**) · 2 **5 landing pages à QUIZ DIAGNOSTIC** (1 par service, routent le visiteur vers la bonne offre) + **lead magnet** (guide gratuit « gérer le stress ») · 3 **Funnel + stratégie d'acquisition double** (LOCAL cabinet / NATIONAL visio) : pub Meta/Google, séquences, VSL, créas · 4 **Dashboard KPI & roadmap de croissance** (suivi hebdo CPL/CPR/ROAS, plan d'action).
- **Livrables** (réels, dossier Échanges & Livrables) : site Astro multi-services · 5 LP à quiz + lead magnet · stratégie publicitaire local+national + garantie de performance · **dashboard KPI** (CPL/CPR/ROAS, cibles local & national) · stratégie de vente + communication/RS · devis/roadmap.
- **Résultats** : ⚠️ **PAS de chiffres de résultats** — les KPI livrés sont des **cibles/projections** (campagne en démarrage), pas du mesuré. **NE PAS afficher de metric chiffrée comme résultat.** Présenter **le système livré** comme la preuve (+ le **site live** comme démo cliquable). Framing : « Système d'acquisition complet livré et instrumenté pour mesurer (objectifs cadrés : CPR cabinet 15-60 €, ROAS > 3×, 5-15 nouveaux clients/mois) — en phase de démarrage. »
- **Verbatim** : [INPUT SIMON si dispo, sinon omettre].
- 🎯 **Pourquoi ce cas est le plus fort pour Waimia** : il démontre **exactement** le « site web intelligent » — Astro, LP à quiz diagnostic, lead magnet, réservation en ligne, **double funnel local/national** + la **couche conseil** (stratégie croissance/ads/vente). C'est la vitrine du pattern + de la posture cabinet.
- ⛔ **Périmètre (décision Simon)** : on **N'intègre PAS** le formulaire / le quiz / la mécanique d'Isabelle dans le site Waimia. Le cas = **preuve uniquement** (système livré décrit + lien vers le site live comme démo). Le **quizz scoring Waimia reste différé en Phase C** (placeholders sur les `/lp/*`), inchangé.

### Statut des autres cas
- **Inbound Value** = projet en cours → **futur cas** (pré-câbler la structure, ne pas publier).
- **Import-export** = **prospect** (travail commencé, pas un projet livré) → **pas un cas**.
