// Waimia · module `engagement-ledger` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/engagement-ledger/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/engagement-ledger/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'engagement-ledger' as const,
  schema,
  demo,
  meta,
  Component,
};
