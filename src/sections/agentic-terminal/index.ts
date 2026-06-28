// Waimia · Co-location DS (Wave #38, T5) · module `agentic-terminal` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/agentic-terminal/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/agentic-terminal/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'agentic-terminal' as const,
  schema,
  demo,
  meta,
  Component,
};
