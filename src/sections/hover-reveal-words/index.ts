// Waimia · Co-location DS (#80) · module `hover-reveal-words` · point d'agrégation.
// Réunit les 4 facettes co-localisées (schema/demo/meta/Component) en un default unique,
// contrat attendu par scripts/gen-section-aggregate.mjs (`{ id, schema, demo, meta, Component }`).

import { schema } from '@waimia/ds-kernel/sections/hover-reveal-words/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hover-reveal-words/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hover-reveal-words' as const,
  schema,
  demo,
  meta,
  Component,
};
