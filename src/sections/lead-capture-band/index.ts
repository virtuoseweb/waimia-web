// Waimia · module `lead-capture-band` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/lead-capture-band/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/lead-capture-band/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'lead-capture-band' as const,
  schema,
  demo,
  meta,
  Component,
};
