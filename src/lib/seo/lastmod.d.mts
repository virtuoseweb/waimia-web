export const COLLECTION_ROUTE_PREFIX: Record<string, string>;
export function routeForContentFile(root: string, file: string): string | null;
export function routeForPageFile(root: string, file: string): string | null;
export function listRouteSources(root: string): Array<{ route: string; file: string }>;
export function loadLastmodMap(root?: string): Map<string, string>;
export function lastmodFor(pathname: string, root?: string): string | null;
