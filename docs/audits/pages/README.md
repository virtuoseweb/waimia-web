# Audit profond page-par-page · cadre de travail (#50)

> Directive Simon 2026-07-16 : « un audit profond sur chaque page du site pour savoir lesquelles
> améliorer au niveau du contenu, lesquelles fusionner, lesquelles supprimer, les corrections pour
> la stratégie SEO sur le contenu, le maillage interne, le balisage. Un rapport par page dans un
> dossier organisé pour le travail avec agent IA. » But : version finale clean, uniquement des
> modèles de pages validés, pour lancer la strat SEO/GEO et obtenir des clients.

## Périmètre

**INCLUS** : tout le contenu public du site Waimia (home, services, secteurs, cas clients,
cas d'usage, ressources, blog, LP, pages fixes, legal).
**EXCLU** (« plugins » outil pro, hors strat contenu) : `/library`, `/preview*`, `/lab`,
`/agence/ds-studio`, `/agence/design-system`, le builder, `/demonstrations` (vitrines outil).

## Organisation du dossier

```
docs/audits/pages/
├── README.md            ← ce fichier (méthodologie, à lire par chaque agent)
├── INDEX.md             ← 1 ligne par page : route · verdict · statut du rapport
├── home/                ← index.astro
├── services/            ← 27 pages + 3 hubs (/services/*)
├── secteurs/            ← /secteurs/*
├── cas-clients/         ← /cas-clients/* (+ index)
├── cas-usages/          ← /cas-usages/* (+ index)
├── ressources/          ← guides, diagnostics, academy/école, index ressources
├── blog/                ← /blog/* (+ index)
├── lp/                  ← /lp/*
├── conversion/          ← contact, tarifs, audit-*, bienvenue
├── confiance/           ← equipe, manifesto, expertise-claude, technologies,
│                          partenaires, sources-methodologie, implantations, pages-locales
└── utilitaires/         ← plan-du-site, 404, legal (CGV, mentions, confidentialité), comparatifs, outils
```

1 fichier = 1 page = `<slug>.md`. Les index de collection ont leur propre rapport (`_index.md`).

## Verdicts possibles (exactement un par page)

| Verdict | Sens | Suite |
| --- | --- | --- |
| **VALIDER** | Page conforme au modèle, contenu au niveau, kw propre | Rien (modèle de référence) |
| **AMÉLIORER** | La page reste, corrections listées et actionnables | Tâches de correction |
| **FUSIONNER** | Contenu redondant/cannibale avec une autre page nommée | Cible + plan 301 |
| **SUPPRIMER** | Pas de rôle dans la strat (kw nul, doublon, hors positionnement) | 301 vers la page héritière |

## Grille d'analyse par page (le rapport suit cet ordre)

1. **Identité** : route, title/description actuels, mot-clé cible (croiser `docs/strategy/14`,
   carte kw canonique), intention de recherche, rôle dans le silo.
2. **Contenu** : qualité vs voix anti-théâtre, conformité au modèle SWI 20 sections (pages
   services), profondeur vs concurrence, E-E-A-T, doublons internes (risque cannibalisation).
3. **SEO on-page** : H1 (kw-first, jamais « système X » en H1, doctrine V8.1), hiérarchie Hn,
   title/meta, densité et variantes du kw, contenu dupliqué inter-pages.
4. **Maillage interne** : liens entrants/sortants réels (grep), ponts hub↔enfants, section
   `related-links` présente et pertinente, ancres descriptives, orphelines.
5. **Balisage** : schema.org (type adapté : Service, Article, FAQPage, CaseStudy…), OpenGraph,
   canonical, breadcrumbs.
6. **Conversion** : CTA présent et cohérent (Cal `simonberos/audit`, `/contact?offer=…`),
   pricing conforme aux tarifs canoniques.
7. **Verdict + actions** : liste numérotée, actionnable par un agent sans relire l'audit.

## Règles pour les agents auditeurs

- **Preuve avant claim** (GF-4) : toute affirmation « manque X / X dupliqué » cite `fichier:ligne`
  ou un grep. Lecture du HTML BUILDÉ (dist) pour le balisage, pas seulement la source.
- Croiser systématiquement : `docs/strategy/14` (carte kw), `docs/strategy/10` (§0bis positionnement),
  memory pricing canonique, `docs/audits/03-audit-consolide-2026-06-15.md` (antécédents).
- Read-only : l'audit ne modifie AUCUNE page. Les corrections sont des tâches listées.
- 0 tiret cadratin (U+2014) dans les rapports.
- Mettre à jour `INDEX.md` à chaque rapport livré.

## Statut

- [ ] INDEX.md initialisé avec l'inventaire des routes (post-vague habillage, routes figées)
- [ ] Audits lancés (attendre la fin de la vague visuelle : showcase cas, cas-usages, ressources)
