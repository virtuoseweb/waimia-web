export const meta = {
  name: 'catalogue-enrichment',
  description: 'Fan-out: 12 workers Sonnet construisent chacun 1 section variee, 1 integrateur Opus cable les 4 touchpoints + gates + commit/push',
  phases: [
    { title: 'Build', detail: '12 agents Sonnet, 1 composant de section varie chacun' },
    { title: 'Integrate', detail: 'Opus: schema + demos + registry + gates verts + commit + push' },
  ],
}

const TEMPLATE = 'feature-grid'
const BRANCH = 'feat/hero-right-align'

// 12 sections aux ARCHITECTURES DISTINCTES (classiques + creatives/tendance), aucune dans les 75 existantes
const SPECS = [
  { id: 'bento-grid', pascal: 'BentoGrid', cat: 'feature-sections', sub: 'Feature Sections',
    title: 'Bento asymetrique',
    arch: 'Grille bento de 5 cellules de tailles INEGALES via CSS grid-template-areas (1 grande cellule 2x2 en haut a gauche + 4 cellules 1x1). Chaque cellule: petit label/glyph + titre + courte description, hairline, radius, hover lift tres subtil (translateY -2px). Mosaique moderne, tendance. Responsive: 1 colonne empilee < 760px.',
    tags: ['bento', 'grid', 'feature', 'asymmetric'] },
  { id: 'feature-zigzag', pascal: 'FeatureZigzag', cat: 'feature-sections', sub: 'Feature Sections',
    title: 'Features zigzag',
    arch: '3 lignes ALTERNEES: ligne 1 = visuel a gauche / texte a droite, ligne 2 inversee (row-reverse), ligne 3 comme la 1. Chaque ligne = 2 colonnes (visuel = bloc SVG/placeholder ratio constant, texte = kicker + titre + body + lien). Gap vertical genereux entre lignes. Responsive: stack < 760px (toujours visuel puis texte).',
    tags: ['feature', 'zigzag', 'alternating', 'rows'] },
  { id: 'logo-wall', pascal: 'LogoWall', cat: 'logo-sections', sub: 'Logo Sections',
    title: 'Mur de logos statique',
    arch: 'Grille STATIQUE de logos (repeat(auto-fit, minmax(140px,1fr)), ~5 par ligne), chaque logo dans une cellule hairline centree, effet grayscale -> couleur + opacite au hover. Kicker + titre court au-dessus. DISTINCT du marquee anime existant (ici statique, aligne en grille).',
    tags: ['logos', 'grid', 'social-proof', 'static'] },
  { id: 'pricing-comparison-matrix', pascal: 'PricingComparisonMatrix', cat: 'pricing-sections', sub: 'Pricing Sections',
    title: 'Matrice comparative tarifs',
    arch: 'Vrai tableau comparatif: lignes = fonctionnalites, colonnes = 3 plans. En-tete de colonne = nom du plan + prix + CTA. Cellules de corps = inclus (glyph plein) / exclu (glyph vide) / valeur texte. UNE colonne mise en avant (bordure accent + fond paper-2). Dense, classique SaaS. Responsive: scroll horizontal du tableau < 760px.',
    tags: ['pricing', 'table', 'comparison', 'matrix'] },
  { id: 'gallery-masonry', pascal: 'GalleryMasonry', cat: 'gallery-sections', sub: 'Gallery Sections',
    title: 'Galerie masonry',
    arch: 'Galerie en colonnes CSS (column-count 3, column-gap token) avec items de HAUTEURS VARIEES (masonry naturel, break-inside avoid). Chaque item = bloc visuel (ratios differents) + legende qui apparait au hover (overlay bas). Creatif, editorial. Responsive: column-count 2 puis 1.',
    tags: ['gallery', 'masonry', 'images', 'editorial'] },
  { id: 'feature-tabs', pascal: 'FeatureTabs', cat: 'feature-sections', sub: 'Feature Sections',
    title: 'Features en onglets',
    arch: 'Onglets cliquables (vanilla JS inline, 0 dependance): une barre de boutons-onglets (role=tab, aria-selected) + un panneau qui change. Chaque onglet montre un feature (titre + body + visuel a droite). Script Astro minimal: au clic, basculer aria-selected et la classe .is-active du panneau correspondant (data-tab / data-panel). Etat initial = 1er onglet actif. Interactif, tendance.',
    tags: ['feature', 'tabs', 'interactive', 'tabbed'] },
  { id: 'icon-trio', pascal: 'IconTrio', cat: 'feature-sections', sub: 'Feature Sections',
    title: 'Trio d icones',
    arch: '3 colonnes simples et epurees: glyph/icone + titre + description, contenu centre, separateurs hairline VERTICAUX entre les colonnes (border-left sur 2e/3e). 1 ligne 3 colonnes. Classique. Responsive: 1 colonne, separateurs horizontaux.',
    tags: ['feature', 'icons', 'trio', 'columns'] },
  { id: 'quote-spotlight', pascal: 'QuoteSpotlight', cat: 'testimonial-sections', sub: 'Testimonial Sections',
    title: 'Citation pleine lumiere',
    arch: 'Grande citation CENTREE (font-display, clamp large), gros guillemet decoratif au-dessus, sous la citation: auteur (nom + role) + petit portrait/avatar rond (placeholder). Fond paper-2 subtil pleine largeur, padding genereux. Editorial fort. Pas de carousel (1 citation).',
    tags: ['testimonial', 'quote', 'spotlight', 'editorial'] },
  { id: 'steps-horizontal', pascal: 'StepsHorizontal', cat: 'timelines', sub: 'Timelines',
    title: 'Etapes horizontales',
    arch: '4 etapes numerotees EN LIGNE: chaque etape = pastille ronde avec numero + titre + courte description sous la pastille. Connecteurs (ligne hairline horizontale) entre les pastilles. Process horizontal classique. Responsive < 760px: passage en vertical (connecteurs verticaux).',
    tags: ['process', 'steps', 'horizontal', 'timeline'] },
  { id: 'cta-split-visual', pascal: 'CtaSplitVisual', cat: 'cta-sections', sub: 'CTA Sections',
    title: 'CTA split visuel',
    arch: 'Bandeau CTA en 2 colonnes: gauche = kicker + titre + body + 1-2 boutons; droite = visuel/SVG decoratif. Fond plein largeur (paper-2 ou accent doux). DISTINCT des CTA centres existants (ici asymetrique avec visuel). Responsive: stack, visuel sous le texte.',
    tags: ['cta', 'split', 'visual', 'banner'] },
  { id: 'stats-bento', pascal: 'StatsBento', cat: 'stats-sections', sub: 'Stats Sections',
    title: 'Stats en bento',
    arch: '4 KPI en bento de tailles INEGALES (grid-template-areas: 1 grande cellule avec chiffre geant font-display + 3 cellules plus petites). Chaque cellule = grand chiffre + label + delta optionnel (+x%). Creatif vs le bandeau stats classique. Responsive: empile.',
    tags: ['stats', 'bento', 'kpi', 'metrics'] },
  { id: 'comparison-duo', pascal: 'ComparisonDuo', cat: 'comparison-sections', sub: 'Comparison Sections',
    title: 'Duo comparatif',
    arch: '2 cartes cote a cote: gauche = "Sans" (etat negatif, ton muted, items avec glyph vide), droite = "Avec" (etat positif, accent, items avec glyph plein). Chaque carte = titre + liste de points (4-5). Classique avant/apres / nous-vs-eux. Responsive: stack.',
    tags: ['comparison', 'duo', 'before-after', 'versus'] },
]

const BUILD_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    pascalName: { type: 'string' },
    created: { type: 'boolean', description: 'true si le fichier composant a bien ete cree' },
    componentPath: { type: 'string' },
    importLine: { type: 'string', description: "ligne import exacte a ajouter au registry, ex: import BentoGrid from '../components/sections/BentoGrid.astro';" },
    registryEntry: { type: 'string', description: "le bloc complet de l'entree SECTIONS, ex: 'bento-grid': { component: BentoGrid, category: 'marketing', subcategory: 'Feature Sections', categorySlug: 'feature-sections', tags: [...], status: 'stable', description_fr: '...', description_en: '...' }," },
    schemaDecl: { type: 'string', description: "le bloc complet export const <camel>Schema = z.object({ type: z.literal('<id>'), ... }) mirroir du template, champs reels du composant" },
    schemaConstName: { type: 'string', description: 'nom de la const schema, ex: bentoGridSchema' },
    demoEntry: { type: 'string', description: "le bloc complet de l'entree SECTION_DEMOS, cle '<id>', avec type: '<id>' + champs bilingues *_fr/_en mirroir du template, donnees de demo plausibles FR/EN" },
    notes: { type: 'string', description: 'remarques, blocages eventuels' },
  },
  required: ['id', 'pascalName', 'created', 'importLine', 'registryEntry', 'schemaDecl', 'schemaConstName', 'demoEntry'],
}

function buildPrompt(s) {
  return `Tu es un worker de design system Waimia (Astro 6, repo /Users/simonberos/waimia-web, branche ${BRANCH}). Reponds en francais. **NE FAIS AUCUN git. NE LANCE PAS pnpm build/check. NE MODIFIE AUCUN fichier partage** (schemas/sections.ts, section-demos.ts, section-registry.ts, library-manifest.ts). NE RE-DELEGUE PAS.

## Ta seule ecriture: 1 fichier composant
Cree UNIQUEMENT \`src/components/sections/${s.pascal}.astro\` (la section "${s.title}").

## Template a MIROITER d'abord (lis ces 4 references du type "${TEMPLATE}")
1. Composant: \`src/components/sections/FeatureGrid.astro\` (structure frontmatter Props + interface, scroll-reveal/classes, <style> tokens-only).
2. Schema: dans \`src/schemas/sections.ts\`, trouve \`featureGridSchema\` (forme z.object, champ \`type: z.literal('feature-grid')\`, champs bilingues *_fr/_en, comment l'id est ajoute a l'union SectionType + au discriminatedUnion).
3. Demo: dans \`src/lib/section-demos.ts\`, l'entree \`'feature-grid'\` (cle plate, \`type: 'feature-grid'\`, champs \`*_fr\`/\`*_en\`, tableaux d'items bilingues).
4. Registry: dans \`src/lib/section-registry.ts\`, l'import + l'entree \`'feature-grid'\` de SECTIONS (component, category, subcategory, categorySlug, tags, status, description_fr/_en).

## Architecture imposee de TA section "${s.id}"
${s.arch}

## Contrat (4 touchpoints) que tu PREPARES (mais tu n'edites QUE le composant)
- id: \`${s.id}\` · composant \`${s.pascal}\` · categorySlug \`${s.cat}\` · subcategory \`${s.sub}\` · tags ${JSON.stringify(s.tags)}.
- Le composant lit ses props depuis une interface Props alignee EXACTEMENT sur les champs de ton schema (memes noms, memes types, champs bilingues \`*_fr\`/\`*_en\` quand c'est du texte; le composant choisit fr/en via une prop \`locale\` comme le template si le template le fait, sinon mirroir exact du template).
- Le composant accepte le shape de demo que tu fournis (\`demoEntry\`).

## Contraintes STRICTES
- TOKENS uniquement (var(--space-*), var(--text-*), var(--accent), var(--ink*), var(--paper*), var(--muted*), var(--hairline), var(--radius-*), var(--font-*), var(--shadow-*), var(--ease*), var(--dur*)). **0 nouveau token, 0 couleur/taille en dur** hors valeurs neutres (0, %, ratios). Gate check-token-purity.
- **0 tiret cadratin U+2014** dans le composant (code + texte). Utilise \`:\` \`/\` \`,\` \`·\` \`–\` \`−\`. Gate check-no-emdash.
- Reutilise les classes/patterns existants si pertinents (kicker, hline, body, etc. presents dans global.css). Scroll-reveal comme le template.
- Responsive (breakpoints coherents avec le template).
- Si interactif (feature-tabs), script Astro vanilla inline minimal, 0 dependance.

## Retour STRUCTURE (obligatoire, via l'outil de sortie structuree)
Renseigne: id, pascalName, created(=true si fichier ecrit), componentPath, importLine, registryEntry (bloc complet pret a coller dans SECTIONS), schemaDecl (bloc complet \`export const ${camel(s.id)}Schema = z.object({...})\`), schemaConstName, demoEntry (bloc complet pour SECTION_DEMOS, donnees FR/EN plausibles, type:'${s.id}'), notes.
Les snippets schemaDecl/registryEntry/demoEntry DOIVENT etre coherents entre eux et avec ton composant (memes noms de champs). Ne dis pas "valide": l'integrateur cable + verifie le build.`
}

function camel(id) {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

function integratePrompt(built) {
  const payload = JSON.stringify(built, null, 2)
  return `Tu es l'INTEGRATEUR du design system Waimia (Astro 6, repo /Users/simonberos/waimia-web, branche ${BRANCH}). Reponds en francais. NE RE-DELEGUE PAS.

${built.length} workers ont chacun cree un composant \`src/components/sections/<Pascal>.astro\` (deja sur le disque) et te fournissent leurs 4 touchpoints. Ta mission: **cabler les touchpoints partages, rendre TOUS les gates verts, committer et pusher**.

## Donnees des sections construites (JSON)
\`\`\`json
${payload}
\`\`\`

## Etapes
1. Pour CHAQUE section, verifie que \`src/components/sections/<pascalName>.astro\` existe (sinon ignore-la et signale-le dans le retour).
2. \`src/schemas/sections.ts\`: insere chaque \`schemaDecl\` (a cote des autres schemas), ajoute chaque \`id\` a l'union \`SectionType\`, et ajoute chaque \`schemaConstName\` au \`z.discriminatedUnion('type', [...])\`. Respecte l'ordre/style existant.
3. \`src/lib/section-registry.ts\`: ajoute chaque \`importLine\` (avec les autres imports) + chaque \`registryEntry\` dans l'objet \`SECTIONS\`.
4. \`src/lib/section-demos.ts\`: ajoute chaque \`demoEntry\` dans \`SECTION_DEMOS\` (Record<SectionType, DemoData>).
5. \`src/lib/library-manifest.ts\`: si LIBRARY_SECTIONS derive automatiquement de SECTIONS, rien a faire; sinon aligne.
6. **BOUCLE jusqu'au vert** (Opus, tu iteres):
   a. \`npx -y pnpm@9.15.0 exec astro check 2>&1 | tail -20\` -> 0 errors. Corrige toute erreur de type (champ manquant entre Props/schema/demo, type d'union, demo non conforme).
   b. \`npx -y pnpm@9.15.0 build 2>&1 | tail -8\` -> \`[build] Complete!\` (les pages /preview/<id>, /components/<id>, /categories/<slug> doivent se generer).
   c. \`node scripts/check-touchpoints.mjs 2>&1 | tail -8\` -> les 4 touchpoints alignes pour les ${built.length} nouveaux ids (total ${75 + built.length}).
   d. \`node scripts/check-token-purity.mjs 2>&1 | tail -3\` -> PASS. \`node scripts/check-no-emdash.mjs; echo exit=$?\` -> exit=0. \`node scripts/check-ds.mjs 2>&1 | tail -3\` si present.
   Si une section est irrecuperable (build casse a cause d'elle), RETIRE proprement ses 4 touchpoints + supprime son composant, et continue avec les autres (signale-la). Mieux vaut 10 sections vertes que 12 cassees.
7. Quand TOUT est vert, commit (ajoute UNIQUEMENT les fichiers concernes, **jamais git add -A**):
   \`git add src/components/sections/*.astro src/schemas/sections.ts src/lib/section-demos.ts src/lib/section-registry.ts src/lib/library-manifest.ts\`
   \`git commit -m "feat(catalogue): N sections variees (bento, zigzag, masonry, tabs, matrice prix, steps, trio, quote, duo, logos, stats-bento, cta-split) via 4 touchpoints"\` (remplace N et la liste par les sections REELLEMENT integrees; message FR, sans U+2014).
8. Push: \`git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin ${BRANCH} 2>&1 | tail -5\`.

## Retour attendu
- Liste des sections integrees (ids) + celles eventuellement retirees (avec raison).
- Les sorties EXACTES de: astro check (tail), build (tail Complete!), check-touchpoints (total ids), check-token-purity, check-no-emdash exit, check-ds.
- Le SHA du commit + confirmation push (tail).
- Ne dis pas "valide": l'orchestrateur fera le GF-1 Playwright sur les /preview/<id> de la preview Vercel.`
}

// ---- Run ----
phase('Build')
const built = (await parallel(
  SPECS.map(s => () => agent(buildPrompt(s), { label: `build:${s.id}`, phase: 'Build', model: 'sonnet', schema: BUILD_SCHEMA }))
)).filter(Boolean).filter(b => b.created)
log(`Build: ${built.length}/${SPECS.length} composants crees -> ${built.map(b => b.id).join(', ')}`)

if (!built.length) return { error: 'aucun composant construit' }

phase('Integrate')
const report = await agent(integratePrompt(built), { label: 'integrate', phase: 'Integrate', model: 'opus' })
return { builtIds: built.map(b => b.id), report }
