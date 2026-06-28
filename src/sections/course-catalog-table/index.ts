// Waimia · Co-location DS (Wave #38, T5) · module `course-catalog-table` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/course-catalog-table/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/course-catalog-table/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'course-catalog-table' as const,
  schema,
  demo,
  meta,
  Component,
};
