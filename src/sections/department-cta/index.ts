// Waimia · Co-location DS (Wave #38, T5) · module `department-cta` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/department-cta/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/department-cta/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'department-cta' as const,
  schema,
  demo,
  meta,
  Component,
};
