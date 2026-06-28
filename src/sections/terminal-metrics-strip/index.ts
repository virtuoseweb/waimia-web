// Waimia · Co-location DS (Wave #38, T5) · module `terminal-metrics-strip` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/terminal-metrics-strip/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/terminal-metrics-strip/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'terminal-metrics-strip' as const,
  schema,
  demo,
  meta,
  Component,
};
