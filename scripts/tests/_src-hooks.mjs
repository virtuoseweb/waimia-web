/**
 * Crochet de chargement node pour exécuter le code de src/ sans build (tests) :
 *  - imports TypeScript sans extension (.ts, /index.ts) ;
 *  - `import.meta.env` → `process.env` (comme Vite au build) ;
 *  - JSON importé sans attribut `with { type: 'json' }` (Vite l'accepte, node non).
 * Importer pour son effet : `import './_src-hooks.mjs';`
 */
import { registerHooks } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (specifier.startsWith('.') && context.parentURL?.includes('/src/')) {
        for (const suffix of ['.ts', '/index.ts']) {
          try {
            return nextResolve(specifier + suffix, context);
          } catch {
            /* suivant */
          }
        }
      }
      throw err;
    }
  },
  load(url, context, nextLoad) {
    if (url.includes('/src/') && url.endsWith('.json')) {
      const json = readFileSync(fileURLToPath(url), 'utf8');
      return { format: 'module', source: `export default ${json};`, shortCircuit: true };
    }
    const result = nextLoad(url, context);
    if (url.includes('/src/') && url.endsWith('.ts') && result.source != null) {
      const text = Buffer.from(result.source).toString('utf8').replaceAll('import.meta.env', 'process.env');
      return { ...result, source: text };
    }
    return result;
  },
});
