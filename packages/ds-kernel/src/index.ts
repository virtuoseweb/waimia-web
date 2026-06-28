// @waimia/ds-kernel · barrel public.
// Contrat de section pur (schemas Zod + sous-systemes facets/slots/presets/
// colorschemes/variants/archetypes + page-document). 0 dependance vers
// Component/registry/demos : surface consommee par MCP/builder/catalogue/app.
// Les sous-chemins restent disponibles (`@waimia/ds-kernel/lib/...`,
// `@waimia/ds-kernel/schemas/...`, `@waimia/ds-kernel/sections/<type>/schema`)
// pour les imports cibles, mais l'API courante passe par ce barrel.

export * from './schemas/sections';
export * from './schemas/page-document';
