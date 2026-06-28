// Waimia · Co-location DS (Wave #38, T5) · module `metric-shift` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/metric-shift/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/metric-shift/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'metric-shift' as const,
  schema,
  demo,
  meta,
  Component,
};
