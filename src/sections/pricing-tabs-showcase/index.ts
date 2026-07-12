import { schema } from '@waimia/ds-kernel/sections/pricing-tabs-showcase/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/pricing-tabs-showcase/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'pricing-tabs-showcase' as const,
  schema,
  demo,
  meta,
  Component,
};
