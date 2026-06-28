// Waimia · Co-location DS (Wave #38, T5) · module `logo-wall` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/logo-wall/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/logo-wall/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'logo-wall' as const,
  schema,
  demo,
  meta,
  Component,
};
