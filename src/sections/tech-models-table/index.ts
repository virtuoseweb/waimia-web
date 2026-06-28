// Waimia · Co-location DS (Wave #38, T5) · module `tech-models-table` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/tech-models-table/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/tech-models-table/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'tech-models-table' as const,
  schema,
  demo,
  meta,
  Component,
};
