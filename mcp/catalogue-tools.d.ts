// Declarations de types pour le module partage catalogue-tools.mjs (JS pur, consomme par le serveur
// MCP ET le chat-IA in-app en TypeScript). Miroir des exports ; la logique reste dans le .mjs.

export class ArtifactMissingError extends Error {}
export class ToolError extends Error {}

export const PAGE_COLLECTIONS: string[];

export function loadIndex(): unknown;
export function loadSectionDetail(type: string): unknown | null;
export function loadTokens(): Array<{ name: string; value: string }>;

export function runCatalogueSearch(args?: Record<string, unknown>): {
  total: number;
  returned: number;
  facets: unknown;
  results: unknown[];
};
export function runCatalogueGetSection(args?: { type?: string }): unknown;
export function runCatalogueGetPreset(args?: { type?: string; presetId?: string }): unknown;
export function runDsTokens(args?: { prefix?: string; group?: string }): {
  count: number;
  tokens: Array<{ name: string; value: string }>;
};
export function runPageCompose(args?: {
  sections?: Array<{ type: string; data?: Record<string, unknown> }>;
  meta?: Record<string, unknown>;
}): {
  pageDocument: {
    $schema: string;
    meta: Record<string, unknown>;
    sections: Array<Record<string, unknown> & { type: string }>;
  };
  validation: { valid: boolean; errors: unknown[]; warnings: unknown[] };
  sectionCount: number;
};
export function runPreviewRender(args?: {
  pageDocument?: unknown;
  baseUrl?: string;
  htmlMaxChars?: number;
}): Promise<{ ok: boolean; status: number; byteLength: number; html: string; [k: string]: unknown }>;
export function runBuilderSaveDraft(args?: { slug?: string; doc?: unknown }): unknown;
export function runBuilderListDrafts(): { count: number; drafts: unknown[] };

export interface CatalogueToolDef {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  run: (args: Record<string, unknown>) => unknown | Promise<unknown>;
}

export const CATALOGUE_TOOL_DEFS: CatalogueToolDef[];
export const CATALOGUE_TOOLS_BY_NAME: Record<string, CatalogueToolDef>;
