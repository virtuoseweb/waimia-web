// Waimia · Co-location DS (Wave #38, T5) · module `pain-points` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/pain-points/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/pain-points/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'pain-points' as const,
  schema,
  demo,
  meta,
  Component,
};
