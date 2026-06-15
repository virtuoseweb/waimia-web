# 01 — Atomes (11)

> Inventaire exhaustif des 11 atomes de `src/components/ui/atoms/*.astro`.
> Données sourcées par lecture intégrale de chaque fichier + grep imports réels.
> Date : 2026-06-03.

---

### Bi
- file: `src/components/ui/atoms/Bi.astro`
- role: Primitive bilingue serveur — choisit la chaîne EN ou FR selon `langFromPath(Astro.url.pathname)` ; zéro JS côté client, deux modes : props string ou slots nommés `fr`/`en` pour contenu HTML structuré.
- props: `{ en?: string; fr?: string }` + slots nommés `slot="fr"` / `slot="en"` (mode HTML riche)
- css_vars: aucune (pas de `<style>`)
- css_classes: aucune
- consumers: `src/components/templates/CaseStudyTemplate.astro`, `src/components/templates/DetailMenuTemplate.astro`, `src/components/templates/EssayTemplate.astro`, `src/components/templates/HubTemplate.astro`, `src/components/templates/ServiceDetailTemplate.astro`, `src/components/templates/TrustLegalTemplate.astro`, `src/components/templates/WelcomeTemplate.astro`, `src/components/ui/molecules/FitColumns.astro`, `src/components/ui/molecules/PricingTier.astro`, `src/components/ui/molecules/ProofBand.astro`, `src/components/ui/molecules/RelatedCards.astro`, `src/components/ui/molecules/ServiceCatalogRow.astro`, `src/components/ui/molecules/StatRow.astro`, `src/pages/agence/design-system.astro`, `src/pages/agence/docs.astro`, `src/pages/agence/governance.astro`, `src/pages/agence/trust-center.astro`, `src/pages/ressources/index.astro` (18)
- status: `unique`
- notes: Atome fondamental de l'i18n statique — aucun équivalent. Très réutilisable. Seul atome sans aucune CSS. Sa valeur réside entièrement dans la logique `langFromPath` server-side, ce qui garantit un rendu indexable GEO/AIO sans hydratation. Candidat à rester tel quel.

---

### Button
- file: `src/components/ui/atoms/Button.astro`
- role: Wrapper généraliste `<a>`/`<button>` avec gestion des variantes visuelles (primary/ghost/accent/link), taille, état loading/spinner, magnetic hover, et accessibilité (aria-busy, aria-disabled).
- props: `{ href?: string; variant?: 'primary' | 'ghost' | 'accent' | 'link'; size?: 'md' | 'lg'; mag?: number; as?: 'a' | 'button'; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; 'aria-label'?: string; class?: string; loading?: boolean }`
- css_vars: `var(--ease)` (dans transition via classes legacy `.btn` définies dans `global.css` — styles non scopés dans ce fichier)
- css_classes: `.btn`, `.btn-${variant}` (générées dynamiquement), `.btn-lg`, `.btn--loading`, `.btn-spinner`, `.btn-label` (toutes issues de `global.css`, pas de `<style>` local)
- consumers: `src/components/sections/CtaBandSection.astro`, `src/components/sections/CtaFinal.astro`, `src/components/sections/CtaInline.astro`, `src/components/sections/HeroCentered.astro`, `src/components/sections/HeroConversionFunnel.astro`, `src/components/sections/HeroFullBleed.astro`, `src/components/sections/HeroHome.astro`, `src/components/sections/HeroLeadMagnet.astro`, `src/components/sections/HeroSplit.astro`, `src/components/sections/OperatingLayer.astro`, `src/components/sections/PricingTable.astro`, `src/components/templates/ConversionFunnelTemplate.astro`, `src/components/templates/EssayTemplate.astro`, `src/components/templates/LeadMagnetTemplate.astro`, `src/components/ui/molecules/PricingTier.astro`, `src/components/ui/organisms/BookSession.astro`, `src/components/ui/organisms/Hero.astro`, `src/components/ui/organisms/OperatingLayer.astro`, `src/pages/404.astro`, `src/pages/agence/design-system.astro`, `src/pages/commerce/[type]/[slug].astro`, `src/pages/contact.astro`, `src/pages/en/agence/design-system.astro`, `src/pages/en/contact.astro`, `src/pages/en/manifesto.astro`, `src/pages/en/ressources/index.astro`, `src/pages/manifesto.astro`, `src/pages/ressources/academy.astro`, `src/pages/ressources/index.astro`, `src/pages/ressources/livres-blancs/index.astro`, `src/pages/ressources/veille-ia/index.astro` (31)
- status: `unique`
- notes: Atome CTA généraliste le plus consommé du DS (31 imports). Couvre tous les CTA contextes fond clair/standard. Sa particularité : styles dans `global.css` (pas de `<style scoped>`) — ce choix facilite les overrides mais lie l'atome au global. Coexiste avec `PillCTA` (héros fond sombre, radius 999px pill pur) et `TerminalCTA` (héros terminal, radius carré 6-8px, font-mono) — ces 3 couvrent des contextes visuels distincts, fusion non recommandée sans arbitrage DA.

---

### ChapterLabel
- file: `src/components/ui/atoms/ChapterLabel.astro`
- role: Label de chapitre éditorial combinant un point terracotta, un numéro de figure/acte en accent et un titre d'acte — pattern « FIG II · 2.0 · Acte II — La méthode ».
- props: `{ num: string; title: string; tone?: 'muted' | 'dim'; noDot?: boolean; class?: string }`
- css_vars: `var(--font-mono)`, `var(--muted)`, `var(--accent)` (dans styles inline, pas de `<style>`)
- css_classes: `.u-chapter-label` (classe utilitaire sur le wrapper, styles entièrement inline)
- consumers: `src/components/sections/OperatingLayer.astro`, `src/components/sections/WhyStalls.astro`, `src/components/templates/CaseStudyTemplate.astro`, `src/components/templates/HubTemplate.astro`, `src/components/ui/organisms/BookSession.astro`, `src/components/ui/organisms/Cases.astro`, `src/components/ui/organisms/OperatingLayer.astro`, `src/components/ui/organisms/SixServices.astro`, `src/components/ui/organisms/SystemArchitecture.astro`, `src/components/ui/organisms/WhyAIStalls.astro`, `src/pages/agence/design-system.astro`, `src/pages/en/agence/design-system.astro` (12)
- status: `variante-de Kicker` — ChapterLabel est une composition spécialisée : dot terracotta + numéro accent + séparateur `·` + titre. Kicker est le mono générique. ChapterLabel hardcode une structure (3 spans) que Kicker ne peut pas reproduire seul.
- notes: Bonne factorisation du pattern répétitif « FIG X · N.0 · Titre ». 12 imports = usage solide. Styles entièrement inline (pas de `<style>` Astro) — cohérence avec Kicker qui fait pareil. Mériterait d'accepter un slot optionnel pour les cas où le numéro ou le titre sont bilingues (interaction avec `Bi`).

---

### CursorDot
- file: `src/components/ui/atoms/CursorDot.astro`
- role: Curseur custom terracotta animé suivant la souris, avec états hover (44px), CTA (52px terracotta solide), et CTA-on-accent (56px ring paper) — désactivé sur `pointer:coarse` et `prefers-reduced-motion`.
- props: aucune (pas d'interface Props)
- css_vars: `var(--accent)`, `var(--ease)`, `var(--paper)` (dans `<style is:global>`)
- css_classes: `.u-cursor-dot`, `.u-cursor-dot.on`, `.u-cursor-dot.hov`, `.u-cursor-dot.cta`, `.u-cursor-dot.on-accent` (toutes dans `<style is:global>`)
- consumers: `src/layouts/Base.astro`, `src/pages/agence/design-system.astro` (2 — usage unique prévu : Base.astro = inclus partout)
- status: `unique`
- notes: Atome singleton — conçu pour être inclus une seule fois dans `Base.astro`, où il est effectivement utilisé. La mention dans `design-system.astro` est probablement une démo. Logique JS interne (~90 LoC) avec cleanup `__waimiaCursorCleanup` pour éviter les doublons écouteurs. Style `is:global` nécessaire pour les classes dynamiques ajoutées par JS. Bonne séparation : 0 prop, 0 slot, pur side-effect visuel.

---

### FormErrors
- file: `src/components/ui/atoms/FormErrors.astro`
- role: Affichage conditionnel d'un bloc d'erreurs de formulaire structuré `role="alert"` avec liste `field: messages` — rendu uniquement si `errors` est non vide.
- props: `{ errors?: Record<string, string[]>; id?: string; className?: string }`
- css_vars: `var(--accent)`, `var(--ink)`, `var(--font-mono)` (dans `<style>` scopé)
- css_classes: `.form-errors`, `.form-errors ul`, `.form-errors strong`
- consumers: `src/pages/contact.astro`, `src/pages/en/contact.astro`, `src/pages/ressources/academy.astro`, `src/pages/ressources/index.astro` (4)
- status: `unique`
- notes: Atome utilitaire formulaire, propre et ciblé. Accessible (`role="alert"`, `aria-live="polite"`, `aria-atomic="true"`). 4 consumers = contextes formulaire uniquement. Candidat stable, pas de fusion envisageable. Note : le prop `className` est un pattern React-isme dans un contexte Astro — devrait être `class` pour cohérence avec les autres atomes (qui utilisent tous `class?: string`).

---

### Kicker
- file: `src/components/ui/atoms/Kicker.astro`
- role: Étiquette mono uppercase color-muted — élément de signalétique éditoriale réutilisable (surtitre de section, numéro de figure, footnote mono).
- props: `{ as?: 'div' | 'span' | 'p'; tone?: 'muted' | 'accent' | 'dim'; size?: number; letterSpacing?: string; textTransform?: 'uppercase' | 'none'; class?: string }`
- css_vars: `var(--font-mono)`, `var(--muted)`, `var(--accent)` (dans style inline ; pas de `<style>` Astro scopé)
- css_classes: `.u-kicker` (classe utilitaire sur le wrapper — styles entièrement inline)
- consumers: 112 fichiers (grep `import.*Kicker` — atome le plus consommé du DS, présent dans sections, templates, molecules, organisms, pages)
- status: `unique`
- notes: Atome fondamental le plus diffus du DS (112 imports). Extrêmement flexible (tag, tone, size, letterSpacing, textTransform). Styles inline = pas de `<style>` Astro = composition sans fuite CSS. ChapterLabel en est une variante spécialisée (structure fixe 3 spans). Candidat à ne jamais modifier — toute régression ici impacte l'ensemble du site.

---

### PillCTA
- file: `src/components/ui/atoms/PillCTA.astro`
- role: CTA pill (border-radius 999px) dédié aux héros sur fond sombre (canvas dark) — 3 variantes : accent terracotta, ghost-dark border-paper, accent-mono font-mono.
- props: `{ href: string; variant?: 'accent' | 'ghost-dark' | 'accent-mono'; mag?: number; class?: string }`
- css_vars: `var(--accent)`, `var(--paper)`, `var(--ease)`, `var(--font-mono)` (dans styles inline)
- css_classes: `.u-pill-cta` (classe utilitaire sur `<a>`, styles entièrement inline)
- consumers: `src/components/sections/HeroLiquid.astro`, `src/pages/agence/design-system.astro`, `src/pages/en/manifesto.astro`, `src/pages/manifesto.astro` (4)
- status: `unique` — distinct de `Button` (classes `.btn` legacy, fond clair généraliste) et `TerminalCTA` (radius carré, font-mono, contexte console)
- notes: 4 consumers seulement — usage volontairement restreint aux héros manifesto/liquid. Commentaire dans le fichier signale 6 occurrences « vérifiées avant ce refactor » — le nombre a diminué (ou certaines sont passées à Button). Styles 100% inline comme TerminalCTA. La prop `href` est requise (pas d'optionnel) — ne peut pas rendre un `<button>`, contrairement à `Button`. Si un futur hero sur fond clair a besoin du même shape, il faudra étendre `Button` plutôt que réutiliser PillCTA.

---

### ProgressBar
- file: `src/components/ui/atoms/ProgressBar.astro`
- role: Barre de progression scroll hairline terracotta (1.5px) positionnée `fixed` en haut de page, animée via `requestAnimationFrame` sur l'événement `scroll`.
- props: aucune
- css_vars: `var(--accent)` (dans `<style is:global>`)
- css_classes: `.u-progress`, `.u-progress > i` (dans `<style is:global>`)
- consumers: `src/layouts/Base.astro` (1 — usage singleton)
- status: `DUPLIQUE ScrollProgress` — les deux atomes implémentent le même concept (hairline scroll progress terracotta en haut de page). Différences techniques :
  - `ProgressBar` : 1.5px, JS `scroll` + `rAF`, `width` animée en `%`, `<style is:global>`, présent dans `Base.astro` (toutes pages)
  - `ScrollProgress` : 2px, CSS `animation-timeline: scroll()` natif (avec fallback `transform:scaleX(0)` sans JS), `<style>` scopé, `var(--z-sticky, 900)`, utilisé uniquement sur `index.astro` et `en/index.astro` (pages home)
- notes: Coexistence problématique — les deux peuvent s'afficher simultanément sur la home (Base.astro inclut ProgressBar, index.astro inclut ScrollProgress). Candidat fusion/suppression prioritaire. `ScrollProgress` est plus moderne (CSS-only `animation-timeline: scroll()`) mais `ProgressBar` est global. Recommandation : adopter ScrollProgress (CSS natif, sans JS) globalement et supprimer ProgressBar, ou garder ProgressBar en global et supprimer ScrollProgress des pages home.

---

### ScrollProgress
- file: `src/components/ui/atoms/ScrollProgress.astro`
- role: Hairline terracotta en haut de page indiquant la progression de scroll — implémentation CSS-only via `animation-timeline: scroll()` (support moderne) avec fallback `scaleX(0)` statique.
- props: aucune
- css_vars: `var(--accent, #c07046)`, `var(--z-sticky, 900)` (dans `<style>` scopé)
- css_classes: `.scroll-progress-wrap`, `.scroll-progress` (dans `<style>` scopé)
- consumers: `src/pages/index.astro`, `src/pages/en/index.astro` (2 — pages home uniquement)
- status: `DUPLIQUE ProgressBar` — même rôle visuel, implémentation différente (voir ProgressBar §notes)
- notes: Implémentation CSS-only plus moderne que ProgressBar (pas de JS, suit le scroll via `animation-timeline: scroll()` natif). Hauteur 2px vs 1.5px pour ProgressBar. `var(--z-sticky, 900)` signifie que l'atome a sa propre valeur de fallback — plus robuste. Si les deux sont actifs sur la home, l'utilisateur voit 2 barres superposées (1.5px + 2px = artefact visuel). Candidat à devenir le standard unique (supprimer ProgressBar).

---

### SectionTransition
- file: `src/components/ui/atoms/SectionTransition.astro`
- role: Phrase narrative éditoriale italic serif entre deux sections, accompagnée d'une hairline supérieure — « souffle » entre organisms, 3 variantes : default (centré), aligned-left, hairline-only.
- props: `{ phrase?: string; variant?: 'default' | 'aligned-left' | 'hairline-only' }`  + slot default si `phrase` non fourni
- css_vars: `var(--gut)`, `var(--hairline)`, `var(--paper)`, `var(--font-display)`, `var(--ink-2)`, `var(--accent)`, `var(--space-6)` (dans `<style>` scopé)
- css_classes: `.sec-transition`, `.sec-transition--aligned-left`, `.sec-transition--hairline-only`, `.sec-transition-phrase` (dans `<style>` scopé)
- consumers: `src/pages/index.astro`, `src/pages/en/index.astro` (2 — pages home uniquement)
- status: `unique`
- notes: Atome narratif pur — pas de CTA, pas de titre. 2 consumers seulement (home FR + EN) mais atome bien structuré. La variante `hairline-only` cache la phrase (`display:none`) et affiche uniquement un trait terracotta centré via `::before` — utile pour les séparations minimales. Candidat à être utilisé plus largement (entre organisms de pages de service, par exemple). Usage de `clamp()` pour le padding = responsive natif sans breakpoints.

---

### TerminalCTA
- file: `src/components/ui/atoms/TerminalCTA.astro`
- role: CTA terminal-style (font-mono, border-radius carré 6-8px) dédié aux héros console et Acte V — 4 variantes : ink, ink-ghost, accent, ghost-dark.
- props: `{ href: string; variant?: 'ink' | 'ink-ghost' | 'accent' | 'ghost-dark'; size?: 'md' | 'sm'; mag?: number; class?: string }`
- css_vars: `var(--ink)`, `var(--paper)`, `var(--accent)`, `var(--font-mono)`, `var(--ease)` (dans styles inline)
- css_classes: `.u-terminal-cta` (classe utilitaire sur `<a>`, styles entièrement inline)
- consumers: `src/pages/agence/design-system.astro`, `src/pages/console.astro`, `src/pages/en/console.astro` (3)
- status: `unique` — distinct de `Button` (classes legacy `.btn`, généraliste) et `PillCTA` (radius 999px pill, héros manifesto)
- notes: 3 consumers — usage ciblé sur la page console uniquement (hors design-system démo). Commentaire mentionne 8 occurrences avant refactor — le nombre est nettement plus bas maintenant. Styles 100% inline (même pattern que PillCTA). La prop `href` est requise. L'atome n'a pas de classe CSS dans un `<style>` Astro — tous les styles passent par inline, ce qui permet la composition mais complexifie le theming via CSS custom properties dynamiques.

---

## Synthèse

**11 atomes au total.**

### Orphelins (0 import réel)
Aucun atome orphelin — tous ont au moins 1 consumer réel.

### Doublon détecté (critique)
- **ProgressBar ↔ ScrollProgress** : même rôle (hairline scroll progress terracotta en haut de page), implémentations différentes (JS rAF vs CSS `animation-timeline: scroll()`). Les deux sont actifs simultanément sur la home (Base.astro charge ProgressBar globalement, index.astro charge ScrollProgress localement) → double barre potentielle. **Candidat fusion prioritaire** : adopter ScrollProgress (CSS-only, plus moderne, fallback propre) comme standard global, supprimer ProgressBar.

### Variante spécialisée détectée
- **ChapterLabel** est une variante structurée de **Kicker** — même ADN (font-mono, uppercase, color-muted/accent), mais structure fixe (dot + num + séparateur + title) que Kicker ne peut pas reproduire avec ses seules props. Pas de fusion recommandée — la spécialisation est légitime.

### Trio CTA (coexistence intentionnelle)
- **Button** (généraliste, classes `.btn` legacy, fond clair) / **PillCTA** (héros fond sombre, radius 999px pur) / **TerminalCTA** (héros console, radius carré, font-mono) couvrent 3 contextes DA distincts. Pas de doublon — coexistence justifiée.

### Atomes les plus consommés (top)
1. **Kicker** — 112 imports (fondamental DS, présent dans toute la hiérarchie)
2. **Button** — 31 imports (CTA généraliste dominant)
3. **Bi** — 18 imports (i18n statique, utilisé dans templates + molecules + pages)
4. **ChapterLabel** — 12 imports (signalétique éditoriale organisms + sections)
5. **FormErrors** — 4 imports (contextes formulaire uniquement)
6. **PillCTA** — 4 imports (héros manifesto/liquid)
7. **TerminalCTA** — 3 imports (héros console)
8. **SectionTransition** — 2 imports (home FR + EN)
9. **ScrollProgress** — 2 imports (home FR + EN)
10. **CursorDot** — 2 imports (Base.astro singleton + design-system démo)
11. **ProgressBar** — 1 import (Base.astro singleton → toutes pages via layout)

### Action recommandée
- **Fusionner ProgressBar → ScrollProgress** : supprimer ProgressBar, déplacer ScrollProgress dans Base.astro (toutes pages), retirer l'import de index.astro et en/index.astro.
- **Harmoniser FormErrors.className → class** : aligner avec la convention des autres atomes (`class?: string` au lieu de `className`).
