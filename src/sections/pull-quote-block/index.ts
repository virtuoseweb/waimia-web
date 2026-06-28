// Waimia · Co-location DS (Wave #38, T5) · module `pull-quote-block` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/pull-quote-block/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/pull-quote-block/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'pull-quote-block' as const,
  schema,
  demo,
  meta,
  Component,
};
