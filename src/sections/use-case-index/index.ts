// Waimia · Co-location DS (Wave #38, T5) · module `use-case-index` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/use-case-index/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/use-case-index/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'use-case-index' as const,
  schema,
  demo,
  meta,
  Component,
};
