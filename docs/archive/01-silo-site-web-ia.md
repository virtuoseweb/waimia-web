# 49 — Plan Silo « Site web IA » (Cheval de Troie SEO)

> Source de vérité du virage SEO 2026. Silo **validé par Simon** (2026-06-11).
> Stratégie : domaine neuf sans autorité → on concentre 100 % du SEO sur **un seul
> silo** (acquisition web-first, l'expertise réelle de Simon), on rétrograde tout
> le reste en Hub à ancres + `noindex` pour stopper la dilution du budget de crawl.
> Exécution = branches `feat/*` + preuve GF-1 sur preview Vercel. **Jamais sur `main`.**

> 🔁 **Décisions partiellement SUPERSEDED par `strategy/02`** (état final canonique) :
> ce doc garde le **POURQUOI** stratégique. Mais 52 tranche l'inverse sur 4 points :
> (1) **suppression > noindex** des secondaires ; (2) **cas fictifs supprimés** (pas
> « gardés ») ; (3) **FR monolingue** (EN archivé) ; (4) **les 5 « enfants Acquérir » ne sont
> PLUS des pages indexées séparées** mais des **sections ancrées** du pilier vitrine Growth
> System IA (architecture §0bis FAIT FOI). En cas de divergence, **52 gouverne**.

---

## 1. Décision

**Silo = « Site web IA » (acquisition web-first), PAS la Data.**

Trois raisons tranchées :

1. **Légitimité réelle.** Métier historique de Simon : dev web + stratégie
   ads/SEO/content + écosystème Claude/GPT. E-E-A-T authentique possible
   (boilerplates Astro+TinaCMS, démos live, ses propres sites comme preuve).
   La Data est le terrain d'un partenaire **peu expérimenté** → parier l'autorité
   du domaine dessus = miser sur la zone la plus faible. **Non.**
2. **Produit d'appel = silo.** L'offre d'appel à **3 000 € HT** (landing/site 1–5
   pages + connexion IA Claude/GPT + skills + automation contenu) **EST** le silo
   Site web IA. Alignement parfait page pilier ↔ offre ↔ expertise ↔ intention
   transactionnelle.
3. **Contenu déjà le plus mature** et différenciation défendable : « l'expert du
   site web IA-native » (Astro / git-based / headless, IA-friendly, dupliquable,
   hébergement Vercel quasi-gratuit) vs les enfermés Webflow / WordPress lourds.

Escalade prévue : une fois le silo installé → horizontalisation consulting
(audit process → automatisation IA) et **Growth System IA** comme palier supérieur.

---

## 2. État vérifié (constat 2026-06-11)

Le brief postulait « site neuf, peu de pages ». **Faux.** Le site est déjà un
généraliste horizontal — l'inverse exact du Cheval de Troie :

- **~20 pages `/solutions/*`** (2 500–3 100 mots chacune), **toutes indexées** :
  `sitemap-noindex-exclude.ts` ne contient que des stubs `/offres/*` et
  `/technologies/*`, **aucune** page `/solutions/*`. → Google voit simultanément
  data, CRM, légal, RH, finance, support, ads, web, agents = dilution maximale.
- **Méga-menu horizontal** (`src/data/mega-menu.ts`) : 3 colonnes
  Acquérir / Piloter / Opérer, ~19 liens vers pages réelles distinctes. La
  porosité horizontale interdite par le brief est câblée dans la nav.
- **Cannibalisation sur le meilleur actif** : 3 URL se battent sur « site web IA »
  → `/offres/site-web-ia`, `/offres/site-web-ia-landing`,
  `/solutions/site-web-ia-pme`.
- **Pricing désaligné** : `offres/site-web-ia.astro` affiche Starter `7 900 €`
  (et le site va jusqu'à `50 k€` / `380 k€`). Grille réelle = appel **3 000 € HT**.
- **Couche preuve fictive** : cas `Plateau Inc.` / `Halcyon` / `Northbound` /
  `Caserne` inventés, agence présentée « Paris · Genève ». **Décision tranchée
  (`strategy/02 §2H`, gouverne) : cas fictifs SUPPRIMÉS** (passif E-E-A-T). Templates
  gardés ; `/cas` repeuplé avec les **vrais cas** (cf §6).

### Mécanismes techniques (vérifiés, pour l'exécution)

- `noindex` existe comme prop de `Base.astro` (`src/layouts/Base.astro:30,49,59,99`).
- La collection `solutions` **n'a pas** de champ `noindex` dans son schéma
  (`src/content.config.ts:298+`).
- `src/pages/solutions/[...slug].astro:37` **ne passe pas** `noindex` à `<Base>`.
- Le sitemap est filtré par `NOINDEX_SITEMAP_PATHS`
  (`src/data/sitemap-noindex-exclude.ts`) + règles de préfixe dans
  `astro.config.mjs:110`.

→ Désindexer une page `/solutions/*` demande **3 changements couplés** :
schéma + wiring `[...slug].astro` + frontmatter, puis ajout au set sitemap.

---

## 3. Architecture cible

### Pilier
**`/offres/site-web-ia`** = money page canonique (intention transactionnelle
« agence / création site web IA B2B », liée à l'offre 3 000 €).

### Cluster du silo = ARTICLES BLOG (pas de sous-pages services)

> ⚠️ **SUPERSEDED par `strategy/02 §0bis` (FAIT FOI).** Le silo Site web IA tire sa profondeur
> du **contenu (articles blog in-silo)**, PAS de sous-pages services. Les 5 prestations
> ci-dessous **ne sont plus des pages enfants indexées séparées** : leur contenu devient des
> **sections ancrées** du pilier vitrine **Growth System IA** (`/offres/growth-system-ia`).

| Prestation (Acquérir) | Devient | Cible |
|---|---|---|
| `/offres/site-web-ia` | **Pilier silo SEO/GEO** (inchangé) | agence / création site web IA B2B |
| SEO + GEO (référencement IA) | section `#seo-geo` du pilier Growth System IA | maillage interne, non indexée séparément |
| automatisation contenu IA | section `#content-marketing` | id. |
| tunnel de vente / conversion | section `#tunnel-de-vente` | id. |
| Google / Meta Ads pilotés IA | section `#publicite` | id. |
| agent IA prospection | section `#agent-marketing` | id. |

`acquisition-ia.mdx` chevauche le pilier → **contenu utile fusionné dans le pilier Growth System IA, page supprimée**.

### Hub secondaires (hors silo, traitement « services secondaires » du brief)
Tout **Piloter** (data) + **Opérer** (CRM/RH/légal/support) → **2 pages Hub à
ancres** (`/solutions/piloter#dashboards`, `/solutions/operer#crm`…), pages
profondes en `noindex,follow`. L'humain garde la profondeur au menu, Google ne
voit plus que le silo.

**13 pages à désindexer** (Piloter + Opérer) :
`tableaux-de-bord-analytics`, `reporting-ia`, `donnees-centralisees`,
`previsionnel-ia`, `agent-analytique`, `finance`, `fintech`,
`crm-relances-ia`, `productivite-ia`, `support-client-ia`,
`administration-rh-ia`, `legal-ia`, `agents-metiers`.
(Pour chaque : version FR **et** `/en/`.)

---

## 4. Spec d'assainissement (exécutable — checkpoints GF-1)

> Branche unique `feat/silo-site-web-ia-assainissement`. Build attendu :
> `npx -y pnpm@9.15.0 build` → `Complete!`. Preuve = build vert + croisement
> `noindex ∩ sitemap` (cf `docs/16` / `docs/25-HREFLANG-SITEMAP-AUDIT.md`).

### Batch 1 — Désindexation des secondaires
- [ ] Ajouter `noindex: z.boolean().default(false)` au schéma `solutions`
      (`src/content.config.ts`), via `seoBlock` ou champ direct.
- [ ] Wirer `src/pages/solutions/[...slug].astro` :
      `<Base ... noindex={data.noindex ?? false}>`.
- [ ] Poser `noindex: true` en frontmatter sur les **13 MDX** listés §3.
- [ ] Ajouter les **26 paths** (FR + EN) à `NOINDEX_SITEMAP_PATHS`.
- [ ] **Preuve** : build vert + grep `robots noindex` ∩ `sitemap-0.xml` = 0 fuite.

### Batch 2 — Résolution cannibalisation « site web IA »
- [ ] `/offres/site-web-ia` = pilier canonique (remonter les meilleurs `pains` de
      `solutions/site-web-ia-pme.mdx`).
- [ ] `/offres/site-web-ia-landing` → `noindex` + `<link rel=canonical>` vers le
      pilier (vérifier l'état actuel `offres/site-web-ia-landing.astro:209`).
- [ ] `/solutions/site-web-ia-pme` → **301** vers le pilier
      (`astro.config.mjs` redirects + `docs/11-url-redirects.md`).
- [ ] `acquisition-ia` → `noindex` ou fusion dans le pilier.
- [ ] **Preuve** : 1 seule URL répond 200/index sur « site web IA », les autres
      301/canonical.

### Batch 3 — Méga-menu Hub + porosité zéro
- [ ] Colonnes Piloter / Opérer de `mega-menu.ts` → liens d'**ancres** vers
      `/solutions/piloter#…` et `/solutions/operer#…`.
- [ ] Créer les 2 pages Hub avec sections `id` identifiables.
- [ ] Audit porosité : `grep` des liens contextuels inter-silo dans le corps des
      MDX du silo → **0 lien** vers data/CRM/légal/RH.

### Batch 4 — Réalignement pricing (scope séparé)
- [ ] Palier d'appel **3 000 € HT** (landing/site 1–5 pages + connexion IA +
      skills + automation contenu) sur pilier + landing.
- [ ] Paliers intermédiaires → escalade **Growth System IA**.

---

## 5. Cluster éditorial (Mois 2 — blog in-silo uniquement)

Aucun article hors silo ne maille le pilier. Sujets cibles (à confirmer via la passe
keyword gratuite §7 + autocomplete/SERP) :
- « Site web IA-native vs WordPress : performance, maintenance, coût réel »
- « GEO : se faire citer par ChatGPT / Claude / Perplexity »
- « Automatiser sa production de contenu marketing avec un agent IA »
- « Refonte site vitrine → système d'acquisition : la méthode »
- « Astro + TinaCMS : éditer son site en parlant à une IA »
- « Tunnel de vente IA : du premier clic à la signature »

Audit des **21 articles** existants : garder ceux du silo, `noindex`/retag le reste.

---

## 6. Preuve & E-E-A-T (Mois 3)

**Preuve vivante (atout réel de Simon)** : `waimia.com` et `virtuoseweb.fr` sont
**ses propres sites IA-native**. → contenu behind-the-scenes : comment ils sont
construits, le temps gagné, les prospects générés, les stratégies (ads + SEO/GEO +
automation contenu). C'est de l'E-E-A-T authentique, pas du décor.

**Vrais cas clients à intégrer** (réalisations Simon, à formaliser) :
Inbound Value, Amploi, Balzeo, Carnets de Montpellier, Desangles Peinture,
une naturopathe, une entreprise d'import-export.

**Cas fictifs** (`Plateau`…) : **SUPPRIMÉS** (`strategy/02 §2H`, gouverne). Un cas fictif
indexé est un passif E-E-A-T, pas un actif. On garde les **templates** (CaseStudy) pour
reconstruire `/cas` exclusivement avec les **vrais cas** ci-dessus.

---

## 7. Recherche de mots-clés — méthode GRATUITE (pas d'Ahrefs)

> Pas d'abonnement payant. On n'achète pas de volumes ; on raisonne intention + on
> valide avec les données réelles du site. **Rien n'est bloqué** : les suppressions et
> l'architecture n'ont jamais dépendu de ça ; seul le **libellé des H1** s'appuie dessus.

**Sources gratuites (passe amont, avant de figer les H1) :**
- **Google Autocomplete** + bloc « Autres questions » / « Recherches associées » (intention réelle).
- **Google Trends** (intérêt relatif FR, comparer 2-3 familles de termes — pas de volume absolu).
- **Google Keyword Planner** (fourchettes de volume, gratuit avec un compte Google Ads sans dépense).
- **Inspection SERP** des 3-5 concurrents qui rankent (type de page, intention, angle non couvert).
- **Bing Webmaster Tools** (keyword research gratuit) en complément.

**Règle de décision H1 :** ancrer le pilier sur l'intention volumique **réaliste** (famille
`création site internet` / `agence web B2B`) avec l'**IA en différenciateur** au H1 — pas sur
un chiffre payant. « Site web IA » = angle de marque, pas forcément head term.

**Validation post-lancement (le vrai signal, gratuit) :** brancher **Google Search Console**
dès la mise en ligne. À 4-8 semaines, les **requêtes réelles** (impressions/position) disent ce
qui prend — pour un domaine neuf c'est plus fiable que n'importe quel outil payant. On ajuste
H1/contenu à ce moment. Boucle : *hypothèse raisonnée → ship → GSC → ajustement*.

- **Exécution code** : branche `feat/*` + preuve GF-1 sur preview Vercel avant
  tout merge `main`. Auto-merge GitHub = OFF.
