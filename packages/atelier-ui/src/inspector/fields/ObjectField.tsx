// @waimia/atelier-ui · inspector · champ OBJET imbriqué (sous-champs récursifs).
import React from 'react';
import type { Lang, SlotItemField } from '../types';
import { ContainerFields } from './ContainerFields';

export function ObjectField(props: {
  label: string;
  fieldName?: string;
  required?: boolean;
  shape: SlotItemField[];
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  lang: Lang;
  keyPrefix: string;
}): React.ReactElement {
  return (
    <div className="wa-insp-group" data-object={props.fieldName}>
      <div className="wa-insp-group-head">
        <span className="wa-insp-label">
          <span>{props.label}</span>
          {props.fieldName && props.fieldName !== props.label ? (
            <span className="wa-insp-fieldname">{props.fieldName}</span>
          ) : null}
          {props.required ? <span className="wa-insp-req">*</span> : null}
        </span>
      </div>
      <ContainerFields
        fields={props.shape}
        value={props.value ?? {}}
        onChange={props.onChange}
        lang={props.lang}
        keyPrefix={props.keyPrefix}
      />
    </div>
  );
}
