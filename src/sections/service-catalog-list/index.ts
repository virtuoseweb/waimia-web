// Waimia · Co-location DS (Wave #38, T5) · module `service-catalog-list` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/service-catalog-list/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/service-catalog-list/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'service-catalog-list' as const,
  schema,
  demo,
  meta,
  Component,
};
