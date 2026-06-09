export const meta = {
  name: 'ds-health-audit',
  description: 'Audit READ-ONLY de sante du DS: CSS hardcode, gaps migration, sprawl de classes scopees, format de listing par section. Produit docs/DS-HEALTH-AUDIT.md',
  phases: [
    { title: 'Scan', detail: '4 dimensions read-only en parallele' },
    { title: 'Synthese', detail: 'doc hierarchise agent-readable' },
  ],
}

const RO = "Tu es un AUDITEUR READ-ONLY. **N'ECRIS / NE MODIFIE / NE git AUCUN fichier.** Utilise Read/Grep/Glob/Bash(lecture seule: rg, sed -n, node -e require). Repo /Users/simonberos/waimia-web. Reponds en francais, dense et factuel (fichier:ligne)."

const HARDCODED_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    total: { type: 'number' },
    hits: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      file: { type: 'string' }, line: { type: 'number' }, value: { type: 'string' },
      context: { type: 'string', description: 'la propriete CSS (ex: color, background, border)' },
      suggestedToken: { type: 'string', description: 'token existant de tokens.css qui devrait remplacer, ex: var(--accent); ou "AUCUN (token a discuter)"' },
    }, required: ['file', 'line', 'value', 'suggestedToken'] } },
    summary: { type: 'string' },
  },
  required: ['total', 'hits', 'summary'],
}

const dims = [
  { key: 'hardcoded-css', schema: HARDCODED_SCHEMA, prompt: `${RO}

## Mission: inventaire EXHAUSTIF du CSS hardcode (dette anti-token)
Trouve dans src/components, src/pages, src/layouts (PAS src/styles/tokens.css) toute valeur visuelle ecrite EN DUR qui devrait etre un token:
- couleurs hex (#abc, #aabbcc, #aabbccdd), rgb()/rgba()/hsl() litterales,
- tailles en px/rem ecrites en dur sur font-size, padding, margin, gap, border-radius, box-shadow QUAND un token equivalent existe (ignore 0, 1px hairline si pas de token, %, ratios neutres),
- box-shadow / transition litterales dupliquant un token --shadow-*/--ease-*/--dur-*.
Pour CHAQUE hit: fichier, ligne, valeur, propriete, et le token EXISTANT de tokens.css qui devrait le remplacer (lis tokens.css pour proposer le bon; si aucun token ne convient, dis "AUCUN (token a discuter)"). Lis src/data/ds-registry.json (tokens[] avec name+value) pour matcher valeur->token.
Retour STRUCTURE: total + hits[] + summary (combien de fichiers, combien remplacables par token existant vs combien necessitent discussion).` },

  { key: 'migration-gaps', prompt: `${RO}

## Mission: cartographier les GAPS de migration vers le catalogue
1. Templates src/components/templates/*.astro (18): pour chacun, dit s'il consomme le registry (SectionsRenderer/section-registry) ou s'il rend du markup en props/inline. Liste les 18 avec leur etat.
2. Pages src/pages/**/*.astro: lesquelles rendent du <section> inline / du markup massif NON issu d'un composant catalogue (orphelins). Donne le compte + les 10-15 cas les plus lourds (fichier + nb de lignes de markup inline approx).
3. Organisms bespoke src/components/ui/organisms/*.astro: lesquels pourraient devenir des sections cataloguees (candidats).
4. Conclusion: % de surface live reellement servie par le catalogue vs markup local. Quel est le chemin de migration le moins risque (par quoi commencer).
Retour: tableau templates (18 lignes) + liste orphelins prioritaires (fichier:approx LoC) + candidats organisms->catalogue + recommandation d'ordre de migration.` },

  { key: 'class-consolidation', prompt: `${RO}

## Mission: sprawl des classes scopees + consolidation avant de figer le DS
1. Magnitude: combien de classes definies dans les <style> scopes des composants (src/components, src/layouts) vs les 174 globales. Donne une estimation defendable (methode + commande).
2. Doublons: lis src/data/ds-registry.json duplicateClasses (124 groupes). Donne les 15 groupes les plus parlants (signature courte + noms de classes) = candidats fusion. + les 10 unusedTokens.
3. Promotion: quelles classes scopees recurrentes (memes patterns repetes dans plusieurs composants) devraient remonter en classe globale reutilisable ou en token. Donne 8-12 exemples concrets (pattern + fichiers ou il apparait).
4. Naming: la convention de nommage est-elle coherente et grep-able (BEM-like? prefixes par composant?) pour qu'un agent IA cible une classe sans ambiguite. Verdict + exemples d'incoherences.
Retour: magnitude chiffree + top doublons + candidats promotion + verdict naming.` },

  { key: 'section-listing-format', prompt: `${RO}

## Mission: prototyper le FORMAT de "listing par section" lisible par agent IA
Objectif Simon: pour CHAQUE section du catalogue, un listing clair et hierarchise donnant: classes utilisees · variables(tokens)+valeurs · props Tailwind de mise en page · champs de schema. Pour qu'un humain OU un agent (grep/Playwright) personnalise sans recopier le code.
Prends un ECHANTILLON REPRESENTATIF de 6 sections variees (ex: feature-grid, hero-offer-detail, cta-band, faq-accordion, stat-block, editorial-preview). Pour CHACUNE, lis son composant src/components/sections/*.astro + son schema (src/schemas/sections.ts) + son entree registry, et produis le listing:
- classes scopees definies (noms),
- tokens var(--x) consommes (+ leur valeur depuis tokens.css/ds-registry),
- utilitaires Tailwind utilises en class= (flex/grid/gap/etc.) s'il y en a,
- champs de schema (props personnalisables) avec type,
- 1 ligne "comment un agent personnalise cette section" (quel token/classe toucher pour quel effet).
But: valider le FORMAT (hierarchie, densite, readability) qui sera ensuite genere de facon DETERMINISTE par un script. Propose la STRUCTURE JSON + le rendu Markdown ideal pour ce manifest par-section.
Retour: les 6 listings + la proposition de structure (JSON schema du manifest par-section + exemple de rendu MD).` },
]

phase('Scan')
const results = await parallel(dims.map(d => () =>
  agent(d.prompt, d.schema
    ? { label: `audit:${d.key}`, phase: 'Scan', model: 'sonnet', schema: d.schema }
    : { label: `audit:${d.key}`, phase: 'Scan', model: 'sonnet' })
))
const byKey = {}
dims.forEach((d, i) => { byKey[d.key] = results[i] })
log('Scan termine: ' + dims.map(d => d.key).join(', '))

phase('Synthese')
const synthPrompt = `Tu es l'auteur d'un rapport d'audit de sante du Design System Waimia (Astro 6). Reponds en francais. Tu PEUX ecrire UNIQUEMENT le fichier \`docs/DS-HEALTH-AUDIT.md\` (rien d'autre, aucun git).

Voici les 4 scans:

### hardcoded-css (structure)
${JSON.stringify(byKey['hardcoded-css'], null, 2)}

### migration-gaps
${byKey['migration-gaps']}

### class-consolidation
${byKey['class-consolidation']}

### section-listing-format
${byKey['section-listing-format']}

## Ecris docs/DS-HEALTH-AUDIT.md (hierarchise, agent-readable, dense mais navigable):
1. **TL;DR** (5-8 lignes): l'etat reel du DS pour l'industrialisation, chiffres cles, verdict "operationnel a X%".
2. **Backlog priorise** (table): chaque chantier (kill hardcoded CSS · listing par-section · migration templates/pages · consolidation classes) avec effort/risque/impact.
3. **CSS hardcode** (la table fichier:ligne -> token cible, depuis le scan structure).
4. **Migration** (etat des 18 templates + orphelins prioritaires).
5. **Consolidation** (top doublons + candidats promotion + verdict naming).
6. **Format de listing par-section** (la structure JSON+MD proposee + les 6 exemples) = la specification de la brique "manifest par-section".
7. **Sequencement recommande** vers le visual builder (ce qui doit etre fait avant quoi, dependances avec DS Studio).
Termine par les chemins de fichiers cles. Ne dis pas "valide": l'orchestrateur relit.

Retour (ton message final): chemin du doc ecrit + le TL;DR + le backlog priorise (pour que l'orchestrateur le relaie).`

const report = await agent(synthPrompt, { label: 'synthese', phase: 'Synthese', model: 'opus' })
return { report }
