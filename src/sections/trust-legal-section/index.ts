// Waimia · Co-location DS (Wave #38, T5) · module `trust-legal-section` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/trust-legal-section/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/trust-legal-section/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'trust-legal-section' as const,
  schema,
  demo,
  meta,
  Component,
};
