/**
 * ds-tokens.mjs - Logique pure de manipulation des tokens DS (parse + application).
 *
 * Partage entre :
 *   - scripts/apply-ds-export.mjs  (CLI `npm run ds:apply`)
 *   - src/integrations/ds-save-dev.mjs  (middleware dev-only "Enregistrer" du DS Studio)
 *
 * AUCUN process.exit ici : les fonctions levent des Error (le CLI les attrape et
 * mappe vers un code retour ; le middleware les mappe vers un status HTTP). Aucune
 * dependance externe : 100 % Node natif (regex + Map).
 */

// --- Parse export (CSS :root{} ou JSON) --------------------------------------

/**
 * Parse un export DS Studio (CSS `:root{}` ou JSON `{ "--x": "v" }`) en Map.
 * @param {string} raw
 * @returns {Map<string,string>}
 * @throws {Error} si le format est invalide
 */
export function parseExport(raw) {
  const trimmed = String(raw).trim();

  // Format JSON
  if (trimmed.startsWith('{')) {
    let obj;
    try {
      obj = JSON.parse(trimmed);
    } catch (e) {
      throw new Error('JSON invalide - ' + e.message);
    }
    const out = new Map();
    for (const [k, v] of Object.entries(obj)) {
      const key = String(k).trim();
      if (!key.startsWith('--')) {
        throw new Error(`cle JSON invalide (doit commencer par --) -> ${key}`);
      }
      out.set(key, String(v).trim());
    }
    return out;
  }

  // Format CSS :root { ... } (multi-ligne)
  const rootMatch = trimmed.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) {
    throw new Error('format non reconnu (attendu :root{ ... } ou JSON { ... })');
  }
  const block = rootMatch[1];
  const lineRe = /(--[\w-]+)\s*:\s*([^;]+)\s*;/g;
  const out = new Map();
  let m;
  while ((m = lineRe.exec(block)) !== null) {
    out.set(m[1].trim(), m[2].trim());
  }
  if (out.size === 0) {
    throw new Error('aucun token trouve dans le bloc :root{ }');
  }
  return out;
}

// --- Tokens connus dans tokens.css -------------------------------------------

const KNOWN_LINE_RE = /^([ \t]*)(--[\w-]+)([ \t]*:[ \t]*)([^;]+?)([ \t]*;.*)$/;

/**
 * Collecte les noms de tokens declares dans le CSS source.
 * @param {string} css
 * @returns {Set<string>}
 */
export function parseKnownTokens(css) {
  const known = new Set();
  for (const line of css.split('\n')) {
    const m = line.match(KNOWN_LINE_RE);
    if (m) known.add(m[2]);
  }
  return known;
}

// --- Application des tokens dans le CSS --------------------------------------

/**
 * Applique les valeurs `tokens` sur le CSS, en ne touchant QUE les tokens existants.
 * Idempotent (valeur identique = inchange, ligne preservee).
 * @param {string} css
 * @param {Map<string,string>} tokens  tokens deja filtres sur les connus
 * @returns {{ newLines: string[], applied: {name:string,oldVal:string,newVal:string}[], unchanged: {name:string,val:string}[], appliedNames: Set<string> }}
 */
export function applyTokens(css, tokens) {
  const lines = css.split('\n');
  const applied = [];
  const unchanged = [];
  const appliedNames = new Set();

  const newLines = lines.map((line) => {
    const m = line.match(KNOWN_LINE_RE);
    if (!m) return line;
    const name = m[2];
    if (!tokens.has(name)) return line;
    const newVal = tokens.get(name);
    const oldVal = m[4].trim();
    if (oldVal === newVal) {
      unchanged.push({ name, val: oldVal });
      appliedNames.add(name);
      return line; // idempotent
    }
    applied.push({ name, oldVal, newVal });
    appliedNames.add(name);
    // Reconstruit la ligne : garde indentation, nom, separateur, fin (commentaire inclus)
    return `${m[1]}${m[2]}${m[3]}${newVal}${m[5]}`;
  });

  return { newLines, applied, unchanged, appliedNames };
}

// --- Append overrides (uniquement CLI --allow-new) ---------------------------

/**
 * Ajoute un bloc :root d'overrides pour des tokens nouveaux (CLI --allow-new seulement).
 * @param {string} css
 * @param {Map<string,string>} newTokens
 * @returns {string}
 */
export function appendOverrides(css, newTokens) {
  const separator = '\n/* --- overrides --- */\n:root {\n';
  const entries = [...newTokens.entries()].map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const closing = '\n}\n';
  return css + separator + entries + closing;
}

/**
 * Orchestrateur haut niveau pour ecrire un map de tokens sur un fichier CSS donne.
 * STRICT : refuse tout token inconnu (allowNew:false) en levant une Error.
 * Utilise par le middleware dev-only (jamais d'append d'override depuis l'UI).
 *
 * @param {string} cssOriginal  contenu actuel de tokens.css
 * @param {Map<string,string>} tokenMap  tokens demandes
 * @param {{ allowNew?: boolean }} [opts]
 * @returns {{ css: string, applied: {name:string,oldVal:string,newVal:string}[], unchanged: {name:string,val:string}[], changedCount: number }}
 * @throws {Error} si un token inconnu est present et allowNew !== true
 */
export function applyTokenMap(cssOriginal, tokenMap, opts = {}) {
  const allowNew = opts.allowNew === true;
  const known = parseKnownTokens(cssOriginal);

  const toApply = new Map();
  const unknown = [];
  const newTokens = new Map();

  for (const [k, v] of tokenMap) {
    if (known.has(k)) {
      toApply.set(k, v);
    } else {
      unknown.push(k);
      if (allowNew) newTokens.set(k, v);
    }
  }

  if (unknown.length > 0 && !allowNew) {
    throw new Error(`token(s) inconnu(s) refuse(s) : ${unknown.join(', ')}`);
  }

  const { newLines, applied, unchanged } = applyTokens(cssOriginal, toApply);
  let css = newLines.join('\n');
  if (allowNew && newTokens.size > 0) {
    css = appendOverrides(css, newTokens);
  }

  return { css, applied, unchanged, changedCount: applied.length };
}
