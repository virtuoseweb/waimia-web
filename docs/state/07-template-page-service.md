# 07 · Template de page service · Séquence canonique (P0.3-b)

Référence réutilisable pour les 3 pages du silo Acquérir (ADR-003 §3) : Site web intelligent, Content marketing intelligent, Tunnel de conversion intelligent. La page de service est rendue **100 % composable** (frontmatter MDX `sections: [...]` vers `SectionsRenderer`, registry), jamais en markup inliné (règle anti-orphelin, CLAUDE.md).

## Page de référence vivante

- **Route** : `/offres/template-service-ref` (collection `offres`, rendu via `src/pages/offres/[...slug].astro`).
- **Fichier** : `src/content/offres/template-service-ref.mdx`.
- **Statut** : page interne `noindex` (frontmatter `seo.noindex: true`), exclue du sitemap (`src/data/sitemap-noindex-exclude.ts`). Non listée dans le hub `/offres` (l'index `offres/index.astro` est une liste curée à la main, pas une énumération de collection), donc invisible en navigation.
- **But** : prouver la séquence rendue dans l'ordre, avec un contenu de démonstration réaliste (Growth System IA). Ce n'est pas une page commerciale : c'est le gabarit de référence.

## Séquence canonique (13 sections, ordre vérifié au DOM)

Issue de l'audit visuel (`docs/visual-audit/AUDIT-SECTIONS-SERVICE.md`, section « Séquence recommandée »). Chaque slot prend la meilleure section du catalogue pour ce rôle.

| # | Slot fonctionnel | Type exact (registry) | Fond | Note |
|---|---|---|---|---|
| 1 | Hero service riche | `hero-conversion-funnel` | `ink` | Hero le plus complet (kicker + h1 accent + lede + pills + checklist + proof + dual CTA + KPI 4-col). |
| 2 | Proof bar | `proof-bar` | `paper` | Bande fine 4 métriques sous le hero. `metrics` requiert `value`/`label_fr`/`label_en`. |
| 3 | Problème / tension | `problems-grid` | `paper-2` | 3 colonnes numérotées 01/02/03. |
| 4 | Diagnostic (engagement) | `diagnostic-stages` | `paper` | Auto-diagnostic, exige 4 à 6 stades (`min(4)`). 5 stades ici, un `current: true`. |
| 5 | Méthode | `method-timeline` | `paper-2` | Numéros serif 01-04 + step. |
| 6 | Capacités chiffrées | `workflow-table` | `paper` | Table workflow / modèle / gain accent / comment. `eyebrow_*` a un défaut « § Workflows ». |
| 7 | Capacité phare illustrée | `feature-split-media` | `paper-2` | Split texte + média + checklist + CTA. Bon usage image (directive #6). |
| 8 | Livrables | `deliverables-grid` | `paper` | 3+ cards serif + tags format. |
| 9 | Preuve / ROI | `stats-bento` | `ink` | Bento ROI. **Exige EXACTEMENT 4 stats** (`stats: z.array(...).min(4).max(4)`). |
| 10 | Comparatif avant / après | `comparison-duo` | `paper-2` | 2 cards Sans/Avec, accent sur « Avec ». |
| 11 | Pricing à paliers | `pricing-cards` | `paper` | 3 tiers, `featured: true` sur le tier recommandé. |
| 12 | FAQ indexable | `faq-two-column` | `paper-2` | 6 Q&A déployées (réponses visibles, SEO/GEO). |
| 13 | CTA final | `footer-cta-band` | `ink` | Bande INK, dual CTA. `buttons` `min(1).max(2)`. |

Alternatives par slot (cf audit, si l'offre diffère) : hero offre = `hero-offer-detail` (après fix overflow) ; ROI = `roi-band` ou `stat-block` ; pricing mono-offre = `pricing-single-highlight` ; FAQ conversion = `faq-cta-aside`.

## Substitutions de type faites

**Aucune.** Les 13 types de la séquence recommandée existent au nom exact dans `src/lib/section-registry.ts` et `src/schemas/sections.ts`. Le brief mentionnait `roi-band` comme variante de `stats-bento` au slot ROI : on a retenu `stats-bento` (recommandation primaire de l'audit pour une preuve ROI riche).

## Contraintes de schéma à connaître (réutilisation)

- `stats-bento.stats` : **exactement 4** entrées, champ `delta` optionnel par stat.
- `diagnostic-stages.stages` : **4 à 6** stades ; `glyph`, `phase_fr/en`, `current` optionnels.
- `proof-bar.metrics` et `metricSchema` : `value` + `label_fr` + `label_en` (+ `emphasis` optionnel).
- `pricing-cards.tiers` : 2 à 4 ; `features_fr`/`features_en` = tableaux de chaînes ; `cta` complet (label/href/variant) ; `featured` sur le tier mis en avant.
- `footer-cta-band.buttons` : 1 à 2 ; variantes `primary|ghost|accent`.
- `feature-split-media.points` : `label_fr`/`label_en` (pas de body).
- Fonds : enum `paper | paper-2 | paper-3 | ink` partout (sauf `cta-split-visual` qui ajoute `accent`).
- Emphase serif : utiliser `<i>...</i>` autour d'UN mot dans `h2_fr`/`h1_fr` (directive #4), pas une phrase entière.

## Preuve GF-1 (build + rendu)

- Build : `npx -y pnpm@9.15.0 build` -> `Complete!`. Page générée : `dist/client/offres/template-service-ref/index.html`. Hors sitemap (vérifié `grep` sitemap*.xml = absent).
- Rendu (serve `dist/client` port 4491, viewport 1440x900) : h1 `opacity: 1`, transform neutre ; après déclenchement des scroll-reveals, premier h2 `opacity ≈ 1`, transform neutre, **0 heading masqué**. 13 sections présentes au DOM dans l'ordre canonique exact ci-dessus.

## Défaut signalé (hors scope P0.3-b, à traiter ailleurs)

`src/pages/offres/[...slug].astro` ne propage PAS `data.seo.noindex` vers `<Base noindex>`. Conséquence : la balise meta robots reste `index, follow` même quand `seo.noindex: true` est posé dans le frontmatter. Pour cette page de référence, l'exclusion sitemap couvre la non-découverte par crawl, mais le robots meta n'est pas honoré. À corriger dans le template de page (passer `noindex={data.seo?.noindex}` à `<Base>`) pour que `noindex` soit réellement enforce sur les futures landings `/lp/<slug>` (ADR-003 niveau 3). Ne relève pas d'une section du catalogue.
