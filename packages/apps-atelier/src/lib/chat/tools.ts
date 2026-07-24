// Waimia · Chat-IA in-app (Φ3) · PONT entre les tools MCP du catalogue et la boucle agentique.
//
// Q4 (scope v1) : prompt -> le LLM decide quels tools appeler -> execution REELLE des tool calls
// IN-PROCESS (pas un second process MCP stdio) -> boucle jusqu'a reponse finale -> preview live.
// Ce module :
//   1. Expose les defs de tools au LLM (LLM_TOOLS), derivees de la SOURCE UNIQUE CATALOGUE_TOOL_DEFS
//      (mcp/catalogue-tools.mjs) -- exactement les fonctions que le serveur MCP expose.
//   2. Dispatch un appel de tool vers la fonction run* correspondante, executee directement.
//
// Aucune re-implementation de logique catalogue ici : on importe et on execute les MEMES fonctions.

// Import direct des fonctions que le serveur MCP expose (rule 59 : source de verite unique). Chemin
// relatif vers la racine repo (mcp/ vit hors packages/).
import {
  CATALOGUE_TOOL_DEFS,
  CATALOGUE_TOOLS_BY_NAME,
  ArtifactMissingError,
  ToolError,
} from '../../../../../mcp/catalogue-tools.mjs';
import type { LlmToolDef } from './types';

/** Defs de tools exposees au LLM (nom + description + JSON Schema), 1:1 avec les tools MCP. */
export const LLM_TOOLS: LlmToolDef[] = CATALOGUE_TOOL_DEFS.map((t) => ({
  name: t.name,
  description: t.description,
  parameters: t.parameters,
}));

/** Trace d'un tool execute pendant la boucle (pour l'UI + le debug + la preuve GF-1). */
export interface ToolTraceEntry {
  name: string;
  args: Record<string, unknown>;
  ok: boolean;
  /** Resultat brut serialise (tronque pour l'affichage cote UI). */
  resultPreview: string;
}

/** Longueur max du resultat renvoye au LLM (borne les tokens ; ex. HTML de preview_render). */
const MAX_RESULT_CHARS = 24000;

/**
 * Execute un tool par son nom, IN-PROCESS, via la fonction run* partagee du catalogue. Ne jette
 * jamais pour un echec METIER : une ToolError / ArtifactMissingError / tool inconnu est renvoyee
 * comme resultat de tool lisible (prefixe « ERREUR: ») pour que le LLM puisse se corriger. Une
 * erreur inattendue (bug reel) remonte.
 *
 * @returns { result: string (a renvoyer au LLM), ok: boolean, raw: unknown }
 */
export async function dispatchTool(
  name: string,
  args: Record<string, unknown>,
): Promise<{ result: string; ok: boolean; raw: unknown }> {
  const def = CATALOGUE_TOOLS_BY_NAME[name];
  if (!def) {
    const known = CATALOGUE_TOOL_DEFS.map((t) => t.name).join(', ');
    return { result: `ERREUR: tool inconnu « ${name} ». Tools disponibles : ${known}.`, ok: false, raw: null };
  }

  try {
    const raw = await def.run(args ?? {});
    let result = JSON.stringify(raw);
    if (result.length > MAX_RESULT_CHARS) {
      result = `${result.slice(0, MAX_RESULT_CHARS)}\n[...tronque pour economiser les tokens]`;
    }
    return { result, ok: true, raw };
  } catch (err) {
    if (err instanceof ArtifactMissingError || err instanceof ToolError) {
      return { result: `ERREUR: ${err.message}`, ok: false, raw: null };
    }
    throw err;
  }
}
