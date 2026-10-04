export const INTERNAL_PATH_PREFIXES: string[];
export const INTERNAL_API_PREFIXES: string[];
export function isInternalPath(pathname: string): boolean;
export function internalToolsEnabled(env?: Record<string, string | undefined>): boolean;
