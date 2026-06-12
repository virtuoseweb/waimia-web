# 52 — État final du site (spec définitive : whitelist + suppressions)

> **Pour Claude Code. Doc maître de l'état cible du site.** Remplace l'approche
> « noindex massif » par une **base minimale saine** : on garde une whitelist de pages
> excellentes, **on supprime tout le reste** (fictif / thin / vide / interne sans valeur),
> régénérable plus tard. Aucune redirection (domaine neuf, zéro autorité à préserver).
> Complète `docs/strategy/01-silo-site-web-ia` (stratégie silo) + `docs/state/01-chantiers` (état projet). Pour le détail du
> maillage silo : `docs/archive/50-SILO-RUNBOOK-EXECUTION`. Branche `feat/*`, preuve GF-1, jamais sur `main`.

---

## 0. Doctrine (best practices, domaine neuf)

- **Chaque URL est un vote de pertinence.** 25 pages excellentes > 375 dont 90 % vides.
  Google attribue l'autorité à un domaine cohérent et resserré, pas à un généraliste dilué.
- **Supprimer > noindexer** pour le fictif/thin : une page noindex reste de la dette
  (build, nav, maintenance, risque de découverte). Le noindex n'est gardé **que** pour les
  outils internes du design system.
- **Pas de redirection** : site neuf, aucune équité de lien à transférer. On supprime net.
- **Vérité E-E-A-T** : zéro chiffre/client/certif inventé. La preuve réelle = `waimia.com`,
  `virtuoseweb.fr` (sites IA-native de Simon) + vrais cas (Inbound Value, Amploi, Balzeo,
  Carnets de Montpellier, Desangles Peinture, naturopathe, import-export).
- **GEO by default** : pages statiques, JSON-LD, `llms.txt`, sitemap propre, < 5 cookies.
- **UX/conversion** : 1 CTA primaire par page, ordre de section douleur→preuve→offre→action
  (§5), preuve sociale réelle uniquement.
- **Lancement monolingue FR** (cf §1) : le bilingue double la surface thin et fractionne le
  budget de crawl sur un domaine sans autorité. EN archivé jusqu'à traction.

> 🔴 **P0 BLOQUANT AVANT PROSPECTION — pricing en prod.** Le pilier `/offres/site-web-ia` affiche
> aujourd'hui **7 900 €** (et jusqu'à 50 k€ ailleurs) : **hors-marché et faux** vs la grille réelle
> **3 000 € HT**. Démarcher depuis un site qui ment sur son prix = pire scénario pour une marque
> « preuve, pas promesse ». **Correction 7 900 € → 3 000 € HT à exécuter AVANT le 1er email outbound**
> (chantier déjà cadré, cf `strategy/01 Batch 4`, `strategy/03 §2`, `state/03 §C6`, §6 step 8 ci‑dessous).

---

## 0bis. ARCHITECTURE : 1 silo SEO + 3 piliers vitrine légers (2026-06-12 — FAIT FOI)

> Validée Simon + arbitrage expert. **Ce n'est PAS un revirement de l'anti-dilution** : on
> tuait les ~19 pages séparées (Piloter/Opérer/Acquérir) ; on les **consolide** ici en 3 pages
> au lieu de les supprimer sèchement — même objectif (zéro page thin), mais l'offre reste
> **visible** (menu complet, crédibilité, funnel consulting). Supersede §1-§3 partout où ils
> traitent les enfants « Acquérir » en pages séparées indexées.
>
> **Règle d'expert non négociable (domaine neuf) :** le **pari SEO/GEO reste concentré sur UN
> seul silo = Site web IA**. Les 3 piliers sont des **pages vitrine légères de conversion**, PAS
> des silos SEO : 1 page chacune, sections ancrées, **aucun cluster d'articles**, **aucun ciblage
> keyword offensif** (surtout Data/Opérer où l'expertise/les cas manquent). Référencer les 4 de
> front = la dilution qu'on évite. Résultat : **~4 pages cœur** au lieu de 19, 1 seul vrai silo.

**Le silo profond (SEO/GEO) — où l'on mise :**
- **Site web IA** — `/offres/site-web-ia` = pilier + **cluster d'articles blog** in-silo. C'est
  LE silo où Simon est légitime ; sa profondeur vient du **contenu** (articles), pas de sous-pages
  services. Produit d'appel.

**Les 3 piliers d'offre (vitrine globale, sections ancrées, anti-dilution) :**
1. **Growth System IA** — `/offres/growth-system-ia` = pilier **Acquérir** (« trouver des
   clients »). Sections ancrées : `#site-web-ia` (résumé + lien vers le silo dédié), `#seo-geo`,
   `#content-marketing`, `#publicite`, `#tunnel-de-vente`, `#agent-marketing`. Le système complet
   d'acquisition/conversion. C'est l'offre vedette et le pilier qui contient tout « Acquérir ».
2. **Data & Analytics** — `/solutions/data-analytics` = pilier **Piloter** (« voir & décider »).
   Sections ancrées : `#revops`, `#tableaux-de-bord`, `#reporting-ia`, `#donnees-centralisees`,
   `#previsionnel-ia`, `#agent-analytique`. *(Terrain du partenaire : on garde le pilier mais on
   ne mise pas le SEO dessus — pas de cluster d'articles.)*
3. **Automatisation & Agents IA** — `/solutions/automatisation-agents-ia` = pilier **Opérer**
   (« gagner du temps »). *(Nom retenu = optimal SEO pour « automatisation IA » + « agents IA » +
   configuration IA ; à confirmer Simon.)* Sections ancrées : `#crm-relances`, `#automatisation`,
   `#service-client`, `#admin-rh`, `#legal`, `#agents-metiers`.

**Méga-menu** (les 3 colonnes Acquérir/Piloter/Opérer, cf maquette) : chaque lien pointe vers
l'**ancre** de section du pilier correspondant — **sauf « Site web IA »** qui pointe vers sa page
silo dédiée. Plus **aucune** page `/solutions/<sous-service>` séparée.

**Conséquence vs §2-§3 (suppressions) :** les 13 solutions Piloter/Opérer + les 5 enfants
Acquérir séparés ne deviennent **pas** des pages indexées séparées ; leur **contenu est fusionné
en sections ancrées** des 3 piliers. On supprime les **routes/pages séparées** (anti-dilution),
on **garde et réorganise le contenu**. Le fictif/thin hors de ces familles reste supprimé comme prévu.

**Indexation cible :** 4 piliers (`site-web-ia`, `growth-system-ia`, `data-analytics`,
`automatisation-agents-ia`) + `audit-maturite-ia` + home + pages de confiance + cas/secteurs +
légal. Le silo Site web IA porte le **cluster d'articles**. Data & Analytics et Automatisation
indexés mais **sans cluster** (pas de mise SEO offensive : expertise partenaire / pas de cas réels).

**À construire (chantier Claude Code, cf `state/02-plan-execution`) :** créer les 3 pages piliers
en **sections composables ancrées** (réutiliser les sections cataloguées — anti-orphelin), câbler
le méga-menu sur les ancres, fusionner le contenu existant des solutions dans les sections.

---

## 1. ÉTAT FINAL — whitelist des pages qui SURVIVENT (~28 URLs)

Tout ce qui n'est pas listé ici est **supprimé** (§2).

### Conversion : 1 silo SEO + 3 piliers vitrine (indexées — cf §0bis FAIT FOI)
- `/` — home réécrite, focalisée silo + preuve réelle
- `/offres/site-web-ia` — **PILIER SILO SEO/GEO** (money page, palier d'appel 3 000 € HT) + **cluster d'articles blog**
- `/offres/audit-maturite-ia` — produit d'appel « audit quick win »
- `/offres/growth-system-ia` — **PILIER VITRINE « Acquérir »** (1 page, sections ancrées `#site-web-ia`/`#seo-geo`/`#content-marketing`/`#publicite`/`#tunnel-de-vente`/`#agent-marketing` — AUCUN cluster, AUCUN ciblage KW offensif)
- `/solutions/data-analytics` — **PILIER VITRINE « Piloter »** (1 page, sections ancrées — sans cluster)
- `/solutions/automatisation-agents-ia` — **PILIER VITRINE « Opérer »** (1 page, sections ancrées — sans cluster)
- `/offres` — hub (offres réelles only)
- `/solutions` — hub resserré (renvoie aux piliers vitrine)

> **Les 5 « enfants Acquérir »** (contenu-seo-geo, content-marketing, tunnel-de-vente, publicité, agent-marketing) **ne sont PLUS des pages indexées séparées** : ce sont des **sections ancrées** du pilier Growth System IA (§0bis). Idem pour les 13 services Piloter/Opérer → sections des deux autres piliers. **AUCUNE** page `/solutions/<sous-service>` séparée. Le **cluster d'articles** reste sur le **seul** silo Site web IA.

### Agence / confiance (indexées, assainies véridiques)
- `/agence/about` — **réécrite** : Simon Beros / studio solo, pas d'agence à 10 ni bureaux Genève
- `/agence/methode` — méthode réelle (corriger l'ancienneté)
- `/agence` — index slim (ou fusionné dans about)
- `/manifesto` — pièce de marque (chiffres inventés retirés)
- `/equipe` + `/equipe/simon-beros` — page auteur (E-E-A-T fondateur, bio véridique)
- `/contact` — form + cal.com réel (fausses adresses retirées)

### Ressources (silo only)
- `/ressources` — hub slim
- `/ressources/blog` + **6 articles in-silo** (§2 liste)
- `/ressources/outils` + `/ressources/outils/calculateur-roi-ia` — outil réel
- `/ressources/academy` — diagnostic lead-gen réel (`/api/academy`)

### Autorité / GEO
- `/technologies` + `/technologies/claude-models` — positionnement écosystème Claude/Anthropic

### Cas clients RÉELS (à recréer, cf §3)
- `/cas` + cas **réels** (remplacent les fictifs supprimés)

### Légal / utilitaire (à créer, cf §3)
- `/mentions-legales` — **obligatoire (à créer)**
- `/politique-de-confidentialite` — **RGPD, obligatoire (à créer)**
- `/plan-du-site`, `/404`

### Internes DS — seul cas de NOINDEX conservé (outils de travail, `robots disallow`)
- `/agence/{design-system, ds-studio, hero-lab}`, `/preview/*`, `/components/*`,
  `/categories/*`, `/compare/organisms` — gardés noindex (déjà), utiles au workflow DS.

---

## 2. À SUPPRIMER — tout le reste (manifeste flat)

> Procédure sûre par cible : (1) `grep -rn "<slug|collection|route>" src` → recenser les
> réfs (nav, demos, sitemap, registry, i18n) ; (2) supprimer fichiers collection + routes
> `.astro` ; (3) nettoyer nav (`mega-menu.ts`, `Footer.astro`, `sitemap.ts`) + manifest/tags ;
> (4) si une **section cataloguée** consommait la collection → la basculer sur
> `section-demos.ts` (NE PAS supprimer le composant section = casse `check-touchpoints`) ;
> (5) `build` vert + `astro check` 0 erreur + gates `check-*` = preuve GF-1.

### A — Collections + routes (suppression franche)
| Cible | Note blast |
|---|---|
| `comparisons` (10) + `/comparer/*` (fr+en) | auto-contenu. Clean. |
| `glossary` (30) + `/glossaire/*` | auto-contenu. **Décision : supprimé** (vocabulaire IA général, thin, off-silo ; un glossaire GEO focalisé pourra être régénéré plus tard). |
| `integrations` (40) + `/integrations/*` | **garder** la section `IntegrationsGrid` (demo). Nettoyer `mega-menu.ts`, `sitemap.ts`, `tags.ts`, `library-manifest.ts`, réf `offres/site-web-ia-landing`. |
| `commerce` (15, faux Stripe) + `/commerce/*` | recâbler `bienvenue/commande`, `secteurs/index`, `integrations/index`, `schema-builder.ts`. |
| `testimonials` (5 fictifs) + `/ressources/testimonials/*` | **garder** `TestimonialBlock` ; **recâbler `index.astro` (home, ligne 229) + `cas/index` sur la demo**. |
| `personas` (3) + `/ressources/personas/*` | garder `PersonaSwitcher`/`PersonaAttributesGrid` (vérifier qu'ils lisent la demo, sinon basculer). |
| `tunnels` (20) + `/offres/[offre]/tunnel/[step]` | funnels internes ; vérifier usage `index.astro` avant suppression. |

### B — Offres secondaires (collection `offres`, 8 + 1 page)
`activation-ia`, `application-ia-pme`, `claude-cowork`, `conseil`, `growth-intelligence`,
`infrastructure-ia`, `productivite-operationnelle-ia`, `composable-pilot` (stub 439 mots),
`/offres/revops`, `/offres/site-web-ia-landing`. → **supprimés** (on garde 3 offres réelles).

### C — Solutions secondaires (collection `solutions`, 15)
Piloter : `tableaux-de-bord-analytics`, `reporting-ia`, `donnees-centralisees`,
`previsionnel-ia`, `agent-analytique`, `finance`. Opérer : `crm-relances-ia`,
`productivite-ia`, `support-client-ia`, `administration-rh-ia`, `legal-ia`,
`agents-metiers`, `fintech`. + `acquisition-ia` (fusionner l'utile dans le pilier) +
`site-web-ia-pme` (remonter les `pains` dans le pilier puis supprimer). → **supprimés**
(pas d'expertise/case study réel ; régénérables quand un silo est réellement étendu).

### D — Agence / démos fictives
`/agence/{careers, docs, governance, trust-center}` (dont **risque légal** trust-center :
fausses certifs ISO/SOC2/RGPD — la suppression règle le risque), `/console`, `/atlas`
(démos produit fantôme). Retirer leurs liens dans `mega-menu.ts` (Agence).

### E — Ressources hors silo
`changelog` (fictif), `veille-ia` (1 entrée vide), `field-notes` (+ collection),
`livres-blancs` (`ai-act-readiness` + collection), **cookbooks** (index 6 fictifs + 3
standalone off-silo + collection), `personas`, `testimonials`. + taxonomies
`/ressources/{categorie,tag,silo}/*`.

### F — École
`ecole` (3 cours stub, Stripe PLACEHOLDER) + `/ecole/*`. Régénérer au vrai go-live produit.

### G — Blog hors silo (15 articles → supprimer ; garder les 6 in-silo)
**GARDER (6)** : `seo-geo-etre-cite-par-les-ia-generatives`,
`automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil`, `cabler-son-crm-en-10-jours`,
`avis-n8n-vs-zapier-2026`, `agent-ia-vs-automatisation-classique-2026`, `essai-pillar-ia-pme-2026`.
**SUPPRIMER (15)** : `adoption-composable-v2`, `composable-adoption` (doublon),
`anti-hallucination-design-system`, `design-system-ferme`, `parallelisation-sonnet`,
`pas-une-stack-un-systeme-architectes`, `avis-claude-3-7-sonnet`, `avis-rag-vs-fine-tuning-pme`,
`gpt-4o-vision-update`, `ce-qu-un-audit-de-flux-revele-vraiment`,
`le-syndrome-du-dashboard-isole`, `pourquoi-vos-tableaux-de-bord-mentent`,
`note-3-erreurs-prompt-engineering`, `note-pourquoi-claude-pas-gpt`, `note-rgpd-vs-anthropic-api`.

### H — Technologies & secteurs & cas fictifs
- `technologies/virtuoseos` (projet relégué) + stubs `claude-code/claude-surfaces/frameworks`
  + `microsoft-power-platform` (404, lié en nav → retirer les liens `partners.ts`,
  `section-demos.ts`, `mega-menu.ts`). Garder `claude-models`.
- **`secteurs` (3) + `cases` (4 fictifs)** : supprimer le contenu fictif. **Garder les
  composants/templates** (CaseStudy, secteur) pour reconstruire `/cas` avec les **vrais cas**
  (§3). `/cas` et `/secteurs` indexés seulement une fois peuplés de réel.

### I — Versions `/en/` (toutes)
Supprimer le miroir `/en/*` (lancement monolingue FR). Garder l'infra i18n pour réactiver
plus tard. *(Réversible ; décision best-practice domaine neuf FR.)*

---

## 3. À CRÉER (combler les vrais manques)

- `/mentions-legales` + `/politique-de-confidentialite` — **obligatoires** (n'existent pas,
  juste référencées dans `sitemap.ts`). Bloquant conformité.
- **Cas clients réels** : 2-3 pour le lancement (Inbound Value, Amploi, Balzeo, Carnets de
  Montpellier, Desangles Peinture, naturopathe, import-export) — priorité contenu Mois 1.
- **2 pages Hub** Piloter/Opérer **NON** retenues : supprimées, pas créées (le menu se
  resserre au silo). *(Révision vs `docs/archive/50-SILO-RUNBOOK-EXECUTION` : avec suppression des 13 solutions, plus
  besoin de Hub.)*
- **Pilier enrichi** `/offres/site-web-ia` (cf §5) — H1 figés via passe keyword **gratuite**
  (`strategy/01 §7` + `strategy/03` recherche SEO).
- Cluster éditorial : 4-6 articles in-silo supplémentaires (Mois 2).

---

## 4. À RÉPARER avant suppression du reste
- `/technologies/microsoft-power-platform` : 404 lié en nav → retirer les liens (la page est
  supprimée de toute façon, §2H).
- Liens demo → 404 résiduels (`docs/state/01-chantiers §d`) disparaissent avec les suppressions ; vérifier
  `check-content-refs` au build.

---

## 5. Ordre des sections — pilier `/offres/site-web-ia` (canonique conversion)
1. **Hero** : H1 prestation, sous-titre bénéfice, 1 CTA primaire (audit), 3-4 stats réelles.
2. **Douleur** (pains) : 3-4 douleurs concrètes du prospect.
3. **Promesse / transformation** : avant→après mesurable.
4. **Preuve** : `waimia.com`/`virtuoseweb.fr` + vrais cas (quand prêts).
5. **Mécanisme** : Audit → Génération Astro → Édition par IA → GEO.
6. **Différenciation** : IA-native vs WordPress/Webflow (perf, maintenance, coût, IA-friendly).
7. **Offre / pricing** : 3 000 € HT → escalade Growth System IA.
8. **Maillage silo** : liens vers les 5 enfants.
9. **FAQ** (schema.org) : longue-traîne + objections.
10. **CTA final** : audit quick win / RDV.

> Anti-orphelin : composer via sections cataloguées (`SectionsRenderer` + `sections:`),
> jamais de markup inline. Enfants silo : même squelette, allégé.

---

## 6. Séquence d'exécution (Claude Code)

1. **Réparations de liens** (§4) pour éviter les casses pendant la purge.
2. **Suppression A→I** (§2) par lots cohérents (1 commit/lot, `git add` ciblé). Recâbler les
   sections consommées (home/cas/secteurs → demo). Build vert + gates à chaque lot.
3. **Méga-menu + Footer** resserrés sur la whitelist (§1) : nav = Offres (Site web IA / Audit
   / Growth System) · Expertises silo · Cas · Ressources · Agence · Contact.
4. **Assainissement véridique** des pages gardées (about, manifesto, methode, contact, equipe).
5. **Création légal** (§3) + **cannibalisation** : remonter `site-web-ia-pme` → pilier,
   supprimer `site-web-ia-landing`.
6. **Cas réels** (§3) — `/cas` + `/secteurs` repeuplés.
7. **Pilier enrichi + ordre sections** (§5) — H1 via passe keyword gratuite (`01 §7` / `53`).
8. **Pricing 3 000 €** + **cluster éditorial** (Mois 2).
9. **Vérif finale** : `build` + `astro check` + sitemap = ~28 URLs FR, 0 orphelin, 0 lien
   mort (`check-content-refs`), 0 page fictive indexée.

---

## 7. Décisions tranchées (arbitrages résolus — position d'expert)
- **Glossaire** → **supprimé** (thin, off-silo ; régénérer focalisé GEO plus tard si besoin).
- **13 solutions Piloter/Opérer + 8 offres secondaires** → **supprimées** (pas d'expertise/
  preuve réelle ; régénérables à l'extension réelle d'un silo).
- **Cas + secteurs + testimonials fictifs** → **supprimés** ; templates gardés ; reconstruits
  avec du **réel**. Un cas fictif indexé est un passif E-E-A-T, pas un actif.
- **Identité fictive** (agence 10 / Paris-Genève / certifs) → **véridicisée partout**
  (studio solo). *Croyance limitante nommée : « il me faut une légitimité externe avant que
  ça compte » → le décor d'agence. La preuve = un client qui paie, pas un faux bureau.*
- **EN** → **archivé** (lancement FR monolingue, réactivable).
- **Outils DS internes** → gardés en noindex (seule exception au « supprimer > noindexer »).
