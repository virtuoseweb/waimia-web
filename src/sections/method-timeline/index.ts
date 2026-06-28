// Waimia · Co-location DS (Wave #38, T5) · module `method-timeline` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/method-timeline/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/method-timeline/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'method-timeline' as const,
  schema,
  demo,
  meta,
  Component,
};
