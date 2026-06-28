// Waimia · Co-location DS (Wave #38, T5) · module `breadcrumb-bar` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/breadcrumb-bar/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/breadcrumb-bar/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'breadcrumb-bar' as const,
  schema,
  demo,
  meta,
  Component,
};
