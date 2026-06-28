// Waimia · Co-location DS (Wave #38, T5) · module `how-we-ship` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/how-we-ship/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/how-we-ship/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'how-we-ship' as const,
  schema,
  demo,
  meta,
  Component,
};
