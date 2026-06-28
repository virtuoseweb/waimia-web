// Waimia · Co-location DS (Wave #38, T5) · module `hover-reveal-list` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hover-reveal-list/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hover-reveal-list/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hover-reveal-list' as const,
  schema,
  demo,
  meta,
  Component,
};
