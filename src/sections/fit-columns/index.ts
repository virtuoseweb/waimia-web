// Waimia · Co-location DS (Wave #38, T5) · module `fit-columns` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/fit-columns/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/fit-columns/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'fit-columns' as const,
  schema,
  demo,
  meta,
  Component,
};
