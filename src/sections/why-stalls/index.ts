// Waimia · Co-location DS (Wave #38, T5) · module `why-stalls` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/why-stalls/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/why-stalls/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'why-stalls' as const,
  schema,
  demo,
  meta,
  Component,
};
