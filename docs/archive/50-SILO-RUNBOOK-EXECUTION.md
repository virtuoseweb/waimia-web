# 50 — Runbook d'exécution : assainissement + architecture de pages

> 🔁 **LARGEMENT SUPERSEDED par `strategy/52`.** Le dispositif « noindex,follow + 2 pages
> Hub Piloter/Opérer à ancres » de ce doc est **ANNULÉ** par 52 (suppression > noindex ;
> pas de Hub ; cas fictifs supprimés). **Ne PAS appliquer la matrice noindex/Hub d'ici.**
> Reste utile uniquement pour la **procédure technique réutilisable** (champ `noindex` Zod,
> wiring `[...slug].astro`, `NOINDEX_SITEMAP_PATHS`, pattern 301). Exécuter `strategy/52`.

> **Pour Claude Code.** Runbook autoporteur dérivé de `docs/49` (stratégie validée).
> Décision page par page : ce qu'on **garde/indexe**, **désindexe**, **fusionne/301**,
> **supprime**, **crée**, **complète**. Chaque action a une preuve GF-1 attendue.
> Branche unique : `feat/silo-site-web-ia-assainissement`. **Jamais sur `main`.**
> Build de référence : `npx -y pnpm@9.15.0 build` → `Complete!`.
> **Voir aussi `docs/52`** = audit exhaustif de TOUT le site (Agence, Ressources,
> catalogues) + nettoyage/suppressions + ordre des sections.

> ⚠️ **Correction (vérifiée dans `dist/`)** : le `noindex` présent dans les routes
> détail est un `.filter()` qui exclut du build, **pas** une balise meta. Donc
> blog/cas/secteurs/intégrations/comparaisons/tunnels sont **indexés aujourd'hui**
> (≈375 URLs au sitemap). Le vrai noindex = `<Base noindex>`. Plusieurs schémas
> (`integrations`, `comparisons`, `commerce`, `glossary`, `prompts`, `testimonials`)
> n'ont pas de champ `noindex` → poser le noindex **au niveau route** ou ajouter le champ.

---

## 0. Principe directeur

Domaine neuf, zéro autorité → **un seul silo indexé** (« Site web IA »,
acquisition web-first = expertise réelle Simon). Tout le reste passe `noindex,follow`
+ Hub à ancres. Objectif : Google ne voit qu'une niche cohérente, pas un généraliste
dilué sur 50 pages métier.

**Règle d'étanchéité** : zéro lien contextuel inter-silo dans le corps des MDX.
Maillage **vertical uniquement** (pilier ↔ enfant ↔ article du même silo).

---

## 1. Matrice de décision — pages métier (source : inventaire 2026-06-11)

### 1.1 SILO « Site web IA » — INDEX + optimiser (7 pages)

| Page | Rôle | Action | Intention cible |
|---|---|---|---|
| `/offres/site-web-ia` | **PILIER** | Compléter (cf §3.1) | agence / création site web IA B2B |
| `/solutions/contenu-seo-geo-ia` | Enfant | Garder, mailler ↑pilier | référencement IA / SEO + GEO |
| `/solutions/content-marketing-ia` | Enfant | Garder, mailler ↑pilier | automatisation contenu IA |
| `/solutions/tunnel-de-vente` | Enfant | Garder, mailler ↑pilier | tunnel de vente / conversion |
| `/solutions/publicite-en-ligne` | Enfant | Garder, mailler ↑pilier | Google / Meta Ads IA |
| `/solutions/agent-marketing-commercial` | Enfant | Garder, mailler ↑pilier | agent IA prospection |
| `/offres/growth-system-ia` | Palier escalade | Garder, lien ↑pilier | growth system IA (offre vedette) |

### 1.2 INDEX standalone — money pages hors silo (2 pages)

Indexées mais **non maillées** dans le silo (espace de mots-clés distinct → ne
diluent pas le pilier). Atteintes surtout via ads/direct.

| Page | Pourquoi standalone |
|---|---|
| `/offres/audit-maturite-ia` | Produit d'appel « audit quick win ». Intention « audit IA / maturité IA », distincte de « site web ». |

> ⚠️ `growth-system-ia` est en §1.1 (maillé silo car acquisition). `audit-maturite-ia`
> reste isolé : ne pas le lier depuis les enfants du silo.

### 1.3 FUSION / 301 — cannibalisation « site web IA » (3 pages)

| Page | Action | Cible |
|---|---|---|
| `/solutions/site-web-ia-pme` | **301** + remonter ses `pains` (les meilleurs) | `/offres/site-web-ia` |
| `/offres/site-web-ia-landing` | `noindex` + `<link rel=canonical>` | `/offres/site-web-ia` |
| `/solutions/acquisition-ia` | `noindex` (overlap pilier) ou fusion | `/offres/site-web-ia` |

### 1.4 NOINDEX,follow — secondaires (13 solutions + 7 offres)

Restent accessibles (humain + nav), retirées de l'index Google + du sitemap.
Regroupées sous 2 Hub à ancres (cf §4).

**Solutions Piloter (data — terrain partenaire peu expérimenté) :**
`tableaux-de-bord-analytics`, `reporting-ia`, `donnees-centralisees`,
`previsionnel-ia`, `agent-analytique`, `finance`.

**Solutions Opérer (CRM/RH/légal/support — pas d'expertise/case study Simon) :**
`crm-relances-ia`, `productivite-ia`, `support-client-ia`,
`administration-rh-ia`, `legal-ia`, `agents-metiers`, `fintech`.

**Offres secondaires (overlap / pas cœur de cible) :**
`/offres/revops`, `activation-ia`, `application-ia-pme`, `claude-cowork`,
`conseil`, `growth-intelligence`, `infrastructure-ia`,
`productivite-operationnelle-ia`.

### 1.5 SUPPRIMER / dé-publier

| Élément | Raison |
|---|---|
| `src/content/offres/composable-pilot.mdx` (439 mots) | Stub pilote technique, pas une offre vendable. |
| 3 cours école avec lien Stripe `PLACEHOLDER` | Non vendables (cf Rapport B §d) → dé-publier ou brancher Stripe avant index. |

---

## 2. Spec technique d'assainissement (batchs + preuves GF-1)

### Batch 1 — Désindexation des 13 solutions + 8 offres secondaires
- [ ] Ajouter `noindex: z.boolean().default(false)` au schéma `solutions` ET `offres`
      (`src/content.config.ts`).
- [ ] Wirer `src/pages/solutions/[...slug].astro:37` et `src/pages/offres/[...slug].astro` :
      `<Base ... noindex={data.noindex ?? false}>`.
- [ ] `noindex: true` en frontmatter sur les 13 solutions §1.4 + 8 offres §1.4
      (versions FR **et** `/en/`).
- [ ] Ajouter tous les paths FR+EN à `NOINDEX_SITEMAP_PATHS`
      (`src/data/sitemap-noindex-exclude.ts`).
- [ ] **Preuve** : build vert + croiser HTML `robots noindex` × `dist/sitemap-0.xml`
      → 0 page secondaire dans le sitemap (méthode `docs/25-HREFLANG-SITEMAP-AUDIT.md`).

### Batch 2 — Cannibalisation « site web IA »
- [ ] Remonter les 4 `pains` de `solutions/site-web-ia-pme.mdx` dans le pilier.
- [ ] Redirect 301 `/solutions/site-web-ia-pme` → `/offres/site-web-ia`
      (`astro.config.mjs` `redirects` + consigner dans `docs/11-url-redirects.md`).
- [ ] `/offres/site-web-ia-landing` : `noindex` + canonical → pilier.
- [ ] `/solutions/acquisition-ia` : `noindex` + canonical → pilier.
- [ ] **Preuve** : `curl -I` → 1 seule URL 200/index sur « site web IA », autres 301.

### Batch 3 — Méga-menu Hub + porosité zéro
- [ ] `src/data/mega-menu.ts` : colonnes **Piloter** et **Opérer** → liens d'**ancres**
      `/solutions/piloter#<id>` et `/solutions/operer#<id>` (au lieu des 13 URL).
- [ ] Garder la colonne **Acquérir** = liens directs vers le silo (pages indexées).
- [ ] Créer les 2 pages Hub (cf §4).
- [ ] Audit porosité : `grep -rn "/solutions/\|/offres/" src/content/{solutions,offres}/<silo>.mdx`
      → 0 lien contextuel vers data/CRM/légal/RH dans le corps des pages du silo.
- [ ] **Preuve** : screenshot méga-menu (GF-1 visuel) + grep porosité = 0.

### Batch 4 — Réalignement pricing (scope séparé, peut suivre)
- [ ] `offres/site-web-ia.astro` : palier d'appel **3 000 € HT** (landing/site 1–5
      pages + connexion IA Claude/GPT + skills + automation contenu) au lieu de `7 900 €`.
- [ ] Paliers intermédiaires → escalade `growth-system-ia`.
- [ ] Cohérence avec `src/data/stripe-links.ts`.
- [ ] **Preuve** : screenshot above-fold pricing + getComputedStyle (GF-1).

---

## 3. Pages à CRÉER ou COMPLÉTER

### 3.1 Pilier `/offres/site-web-ia` — à enrichir (page existe, contenu à compléter)
État actuel : tunnel de conversion (4 steps + tiers), mais **pas un vrai pilier SEO**.
À ajouter pour assoir l'autorité topique :
- Section « Qu'est-ce qu'un site web IA-native » (définition + différenciation
  Astro/git-based vs Webflow/WordPress enfermés, **angle prestation pas Wikipédia**).
- Section comparatif IA-native vs WordPress (perf, maintenance, sécurité, coût,
  IA-friendly) — Simon a la matière réelle.
- Bloc maillage vers les 5 enfants du silo (§1.1).
- Bloc preuve : `waimia.com` + `virtuoseweb.fr` = sites IA-native construits par
  Simon (preuve vivante, cf `docs/49 §6`).
- FAQ schema.org (intentions longue-traîne).
- H1 figé **après** volumes Ahrefs (cf bloquant `docs/49 §7`).

### 3.2 Deux pages Hub à CRÉER (secondaires, `noindex`)
- `/solutions/piloter` — sections `id` : `#dashboards`, `#reporting`, `#donnees`,
  `#previsionnel`, `#agent-analytique`. Cible le menu, pas Google.
- `/solutions/operer` — sections `id` : `#crm`, `#productivite`, `#support`,
  `#rh`, `#legal`, `#agents-metiers`.
- Réutiliser un composant section catalogué (anti-orphelin, cf CLAUDE.md règle d'or).

### 3.3 Cluster éditorial blog (Mois 2 — in-silo only)
6 articles cibles (figés après Ahrefs) : IA-native vs WordPress ; GEO (citation
ChatGPT/Claude/Perplexity) ; automation contenu par agent IA ; refonte vitrine →
acquisition ; Astro+TinaCMS éditable par IA ; tunnel de vente IA.
- [ ] Audit des 21 articles existants : garder ceux du silo, `noindex`/retag le reste.

---

## 4. Ce que l'humain VOIT (méga-menu final)

| Entrée menu | Contenu visible | Réalité SEO |
|---|---|---|
| **Solutions › Acquérir** | 6 liens directs (silo) | **Indexé** |
| **Solutions › Piloter** | 5 liens d'ancres → `/solutions/piloter#…` | Hub `noindex` |
| **Solutions › Opérer** | 6 liens d'ancres → `/solutions/operer#…` | Hub `noindex` |
| **Solutions › featured** | Growth System IA | Indexé (palier) |
| **Cas clients** | Par secteur (fictifs gardés) | inchangé |
| **Ressources / Agence** | inchangé | inchangé |

Profondeur perçue conservée pour le prospect, bruit retiré pour Google.

---

## 5. Séquence d'exécution recommandée (Claude Code)

1. **Bloquant amont** : obtenir volumes Ahrefs (OAuth Simon) → figer H1 pilier + enfants.
2. **Batch 1** (désindexation) — plus gros gain SEO, risque faible, build prouvable.
3. **Batch 2** (cannibalisation) — concentre l'autorité sur 1 pilier.
4. **Batch 3** (méga-menu Hub + 2 pages Hub) — design-sensible, GF-1 visuel obligatoire.
5. **§3.1** enrichissement pilier (après Ahrefs).
6. **Batch 4** (pricing) — peut être parallèle.
7. **Mois 2** : cluster éditorial + audit 21 articles.

Chaque batch = 1 commit minimum, preuve GF-1 dans le même tour, merge `main`
seulement après preview Vercel verte.

---

## 6. Garde-fous d'exécution (rappel)

- Composant = source de vérité : éditer `sections/*.astro`, jamais inliner du markup
  neuf dans une page/template (anti-orphelin, CLAUDE.md).
- `noindex` ne suffit pas seul : toujours coupler **sitemap exclude** (sinon
  incohérence noindex↔sitemap = gaspillage crawl).
- Ne pas toucher aux cas fictifs (décision Simon, `docs/49 §6`).
- Ne pas mailler `audit-maturite-ia` dans le silo (étanchéité keyword).
