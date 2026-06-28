// Waimia · Co-location DS (Wave #38, T5) · module `commitments-grid` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/commitments-grid/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/commitments-grid/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'commitments-grid' as const,
  schema,
  demo,
  meta,
  Component,
};
