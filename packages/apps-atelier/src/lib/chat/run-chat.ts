// Waimia · Chat-IA in-app (Φ3) · BOUCLE AGENTIQUE (tool-calling loop).
//
// Q4 (scope v1) : prompt -> le LLM decide quels tools appeler -> execution reelle des tool calls
// in-process -> boucle jusqu'a reponse finale -> preview live. Ce module orchestre la boucle, sans
// connaitre le fournisseur (il recoit un ChatProvider abstrait) ni re-implementer les tools (il
// recoit / defaut le dispatch partage). Le PageDocument produit par le dernier page_compose est
// extrait pour etre applique au canvas du builder (mise a jour de la preview live).

import type { ChatProvider, ChatTurn, LlmToolDef } from './types';
import { LLM_TOOLS, dispatchTool, type ToolTraceEntry } from './tools';

/** System prompt scope : cadre l'IA sur le catalogue Waimia + la discipline DS (0 token invente). */
export const DEFAULT_SYSTEM_PROMPT = [
  "Tu es l'assistant de composition de pages du builder Waimia (Design System proprietaire).",
  'Ta mission : a partir de la demande de l\'utilisateur, composer une page en assemblant des sections',
  'EXISTANTES du catalogue Waimia, via les tools fournis. Regles :',
  "- Commence par catalogue_search pour trouver les types de sections pertinents (hero, preuve, CTA...).",
  '- Pour chaque section a composer, appelle catalogue_get_section pour connaitre ses slots de contenu',
  '  requis (kind=content, required) AVANT de la composer. Remplis-les avec un contenu francais credible.',
  "- N'invente JAMAIS un type de section ou un token DS hors de ceux retournes par les tools.",
  '- Termine TOUJOURS par page_compose (meta.collection valide, meta.slug kebab-case) pour produire le',
  '  PageDocument final. Si la validation echoue (valid=false), corrige et re-appelle page_compose.',
  '- Reponds en francais, de facon concise : explique la page composee (sections + pourquoi), pas le detail JSON.',
].join('\n');

/** Un PageDocument compose (forme large : ce que page_compose renvoie sous `pageDocument`). */
export interface ComposedPageDocument {
  $schema: string;
  meta: Record<string, unknown>;
  sections: Array<Record<string, unknown> & { type: string }>;
}

export interface RunChatResult {
  /** Texte final de l'assistant (derniere reponse sans tool call). */
  text: string;
  /** Historique complet apres la boucle (utile pour un tour suivant / debug). */
  turns: ChatTurn[];
  /** Trace ordonnee des tools executes (nom + args + ok + apercu resultat). */
  toolTrace: ToolTraceEntry[];
  /** Dernier PageDocument produit par page_compose (null si aucun) : a appliquer au canvas. */
  pageDocument: ComposedPageDocument | null;
  /** Validite du dernier page_compose (null si aucun). */
  pageValid: boolean | null;
  /** Nombre d'iterations de la boucle effectuees. */
  steps: number;
  /** 'final' = le modele a rendu une reponse finale ; 'max_steps' = plafond d'iterations atteint. */
  stopped: 'final' | 'max_steps';
}

export interface RunChatOptions {
  provider: ChatProvider;
  /** Historique de depart (doit contenir au moins le message user courant). */
  turns: ChatTurn[];
  system?: string;
  tools?: LlmToolDef[];
  /** Dispatch de tool injectable (defaut = dispatch partage in-process). */
  dispatch?: typeof dispatchTool;
  /** Plafond d'iterations de la boucle (borne les appels LLM + le cout). Defaut 6. */
  maxSteps?: number;
}

/** Extrait un PageDocument valide-de-forme d'un resultat brut de page_compose. */
function extractPageDocument(raw: unknown): ComposedPageDocument | null {
  if (!raw || typeof raw !== 'object') return null;
  const doc = (raw as { pageDocument?: unknown }).pageDocument;
  if (!doc || typeof doc !== 'object') return null;
  const sections = (doc as { sections?: unknown }).sections;
  if (!Array.isArray(sections)) return null;
  return doc as ComposedPageDocument;
}

/** Vrai/faux/undefined selon la validation renvoyee par page_compose. */
function extractValid(raw: unknown): boolean | null {
  if (!raw || typeof raw !== 'object') return null;
  const validation = (raw as { validation?: { valid?: unknown } }).validation;
  if (validation && typeof validation.valid === 'boolean') return validation.valid;
  return null;
}

/**
 * Execute la boucle agentique jusqu'a reponse finale ou plafond d'iterations. Chaque tour :
 * completion LLM -> si tool calls, on les execute REELLEMENT (dispatch in-process) et on reinjecte
 * les resultats -> on reboucle ; sinon on s'arrete (reponse finale).
 */
export async function runChatTurn(options: RunChatOptions): Promise<RunChatResult> {
  const {
    provider,
    system = DEFAULT_SYSTEM_PROMPT,
    tools = LLM_TOOLS,
    dispatch = dispatchTool,
    maxSteps = 6,
  } = options;

  const turns: ChatTurn[] = [...options.turns];
  const toolTrace: ToolTraceEntry[] = [];
  let pageDocument: ComposedPageDocument | null = null;
  let pageValid: boolean | null = null;
  let finalText = '';
  let steps = 0;

  for (; steps < maxSteps; steps += 1) {
    const completion = await provider.complete({ system, turns, tools });

    // Enregistre le tour assistant (texte + tool calls) dans l'historique canonique.
    turns.push({ role: 'assistant', content: completion.text, toolCalls: completion.toolCalls });
    if (completion.text) finalText = completion.text;

    if (completion.stop === 'end' || completion.toolCalls.length === 0) {
      return { text: finalText, turns, toolTrace, pageDocument, pageValid, steps: steps + 1, stopped: 'final' };
    }

    // Execute REELLEMENT chaque tool call, puis reinjecte le resultat comme tour 'tool'.
    for (const call of completion.toolCalls) {
      const outcome = await dispatch(call.name, call.args);
      turns.push({ role: 'tool', toolCallId: call.id, name: call.name, content: outcome.result });
      toolTrace.push({
        name: call.name,
        args: call.args,
        ok: outcome.ok,
        resultPreview: outcome.result.slice(0, 600),
      });
      if (call.name === 'page_compose' && outcome.ok) {
        const doc = extractPageDocument(outcome.raw);
        if (doc) {
          pageDocument = doc;
          pageValid = extractValid(outcome.raw);
        }
      }
    }
  }

  return { text: finalText, turns, toolTrace, pageDocument, pageValid, steps, stopped: 'max_steps' };
}
