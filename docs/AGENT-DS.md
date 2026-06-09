# DS Studio : manifeste de capacités agent

Un agent IA personnalise Waimia avec trois leviers contrôlés : les tokens existants pour le design, les sections cataloguées pour la composition, puis les vérifications obligatoires.

## Tokens : design

Dans le navigateur, l’API stable `window.dsStudio` applique puis sauvegarde les tokens existants :

```js
window.dsStudio.setToken('--accent', '#00aa00');
await window.dsStudio.save('WAIMIA-SAVE');
```

Autres surfaces :

- CLI : `npm run ds:apply` lit un fichier d’export CSS au format `:root { ... }`.
- HTTP en développement uniquement : `POST /api/ds/save` avec `{ tokens, keyword }`.
- Garde-fous : mot-clé `DS_SAVE_KEYWORD`, valeur par défaut `WAIMIA-SAVE` ; refus de push sur `main` ; modification de tokens existants uniquement, jamais de création.

### API `window.dsStudio`

- `setToken(name, value) -> { name, value, computed }` : applique une valeur finale, synchronise les contrôles et marque le token comme modifié.
- `getToken(name) -> string` : retourne la valeur calculée actuelle.
- `listModified() -> Array<{ name, value }>` : liste les modifications depuis le chargement.
- `reset() -> { ok: true }` : déclenche le même Reset que l’interface humaine.
- `export() -> string` : retourne le bloc CSS exportable sans utiliser le presse-papiers.
- `save(keyword) -> Promise<{ ok: boolean, ... }>` : appelle `/api/ds/save`, affiche l’overlay et retourne une réponse structurée sans lever d’exception.

## Sections : composition

Les pages composables déclarent `sections: [...]` dans leur frontmatter MDX. `SectionsRenderer` résout chaque type via `src/lib/section-registry.ts`.

Le manifeste `src/data/ds-section-manifest.json` contient 87 entrées. Chaque type expose notamment `id`, `component`, `schema_fields`, `scoped_classes`, `tokens` et `agent_guide` selon les données disponibles.

## Vérifier : obligatoire

Exécuter les garde-fous :

```sh
node scripts/check-token-purity.mjs
node scripts/check-touchpoints.mjs
node scripts/check-token-lock.mjs
node scripts/check-no-emdash.mjs
```

Faire ensuite une preuve visuelle Playwright avec `window.dsStudio`, `?clean=1` et `body[data-save-state]`.

Sélecteurs stables :

- Token : `[data-token="--x"]`
- Actions : `[data-action="export"]`, `[data-action="reset"]`, `[data-action="save"]`
- Sauvegarde : `body[data-save-state="idle"]`, `body[data-save-state="saving"]`, `body[data-save-state="done"]`, `body[data-save-state="error"]`
- Mot-clé : `[data-save-keyword]`

Exemple Playwright :

```js
await page.goto('http://localhost:4321/agence/ds-studio?clean=1');
await page.evaluate(() => window.dsStudio.setToken('--accent', '#00aa00'));
const accent = await page.evaluate(() => window.dsStudio.getToken('--accent'));
if (accent !== '#00aa00' && accent !== 'rgb(0, 170, 0)') {
  throw new Error(`Accent inattendu : ${accent}`);
}
await page.evaluate(() => window.dsStudio.save('WAIMIA-SAVE'));
await page.waitForSelector('body[data-save-state="done"]');
```
