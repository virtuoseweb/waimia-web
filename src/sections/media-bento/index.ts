// Waimia · Co-location DS (Wave #38, T3) · module `media-bento` · point d'agrégation.
// Réunit les 4 facettes co-localisées (schema/demo/meta/Component) en un default unique,
// contrat attendu par scripts/gen-section-aggregate.mjs (`{ id, schema, demo, meta, Component }`).

import { schema } from '@waimia/ds-kernel/sections/media-bento/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/media-bento/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'media-bento' as const,
  schema,
  demo,
  meta,
  Component,
};
