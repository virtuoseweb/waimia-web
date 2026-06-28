// Waimia · Co-location DS (Wave #38, T3) · module `hero-social-proof` · point d'agrégation.
// Réunit les 4 facettes co-localisées (schema/demo/meta/Component) en un default unique,
// contrat attendu par scripts/gen-section-aggregate.mjs (`{ id, schema, demo, meta, Component }`).

import { schema } from './schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from './schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-social-proof' as const,
  schema,
  demo,
  meta,
  Component,
};
