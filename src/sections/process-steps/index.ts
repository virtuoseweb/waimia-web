// Waimia · Co-location DS (Wave #38, T5) · module `process-steps` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/process-steps/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/process-steps/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'process-steps' as const,
  schema,
  demo,
  meta,
  Component,
};
