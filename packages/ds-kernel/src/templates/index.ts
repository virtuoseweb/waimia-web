// @waimia/ds-kernel · Moteur « template-as-data » · barrel.
// Un template = définition logicielle (liste ordonnée de sections cataloguées +
// mappings frontmatter→données) ; `resolveTemplate` la matérialise pour le registry.

export * from './types';
export { defineTemplate } from './define';
export { resolveTemplate } from './resolve';
