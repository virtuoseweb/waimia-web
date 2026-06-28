// Waimia · Co-location DS (Wave #38, T5) · module `key-metric-grid` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/key-metric-grid/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/key-metric-grid/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'key-metric-grid' as const,
  schema,
  demo,
  meta,
  Component,
};
