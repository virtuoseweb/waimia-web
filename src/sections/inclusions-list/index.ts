// Waimia · Co-location DS (Wave #38, T5) · module `inclusions-list` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/inclusions-list/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/inclusions-list/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'inclusions-list' as const,
  schema,
  demo,
  meta,
  Component,
};
