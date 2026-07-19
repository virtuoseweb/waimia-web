// @waimia/atelier-ui · inspector · panneau à 4 onglets (composant hôte-monté, prop-driven).
//
// Édite UNE section sélectionnée. Contrôlé par props (aucun état de données dupliqué qui
// désynchroniserait) : l'état interne se limite à l'onglet actif et à la langue d'édition.
// Onglets : Variante (presets) · Layout (axes de présentation) · Contenu (slots) · Couleur
// (schémas). Chaque édition émet un patch partiel via onChange ; l'hôte fusionne dans props.
import React, { useState } from 'react';
import type { InspectorPanelProps, Lang } from './types';
import { useInspectorStyles } from './styles';
import { VariantTab } from './VariantTab';
import { LayoutTab } from './LayoutTab';
import { SlotForm } from './SlotForm';
import { ColorTab } from './ColorTab';

type TabId = 'variant' | 'layout' | 'content' | 'color';

const TABS: { id: TabId; label: string }[] = [
  { id: 'variant', label: 'Variante' },
  { id: 'layout', label: 'Layout' },
  { id: 'content', label: 'Contenu' },
  { id: 'color', label: 'Couleur' },
];

export function InspectorPanel(props: InspectorPanelProps): React.ReactElement {
  useInspectorStyles();
  const [tab, setTab] = useState<TabId>('variant');
  const [lang, setLang] = useState<Lang>('fr');

  const contentSlots = props.slots.filter((s) => s.kind === 'content');

  return (
    <div className="wa-insp" data-type={props.typeId}>
      <div className="wa-insp-tabs" role="tablist" aria-label="Inspecteur de section">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            className="wa-insp-tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="wa-insp-body" role="tabpanel">
        {tab === 'variant' ? (
          <VariantTab
            presets={props.presets}
            selectedPresetId={props.selectedPresetId}
            onPickPreset={props.onPickPreset}
            renderPresetThumb={props.renderPresetThumb}
          />
        ) : null}

        {tab === 'layout' ? (
          <LayoutTab axes={props.presentationAxes} value={props.props} onChange={props.onChange} />
        ) : null}

        {tab === 'content' ? (
          <SlotForm
            contentSlots={contentSlots}
            value={props.props}
            onChange={props.onChange}
            lang={lang}
            onLangChange={setLang}
          />
        ) : null}

        {tab === 'color' ? (
          <ColorTab schemes={props.schemes} value={props.props} onChange={props.onChange} />
        ) : null}
      </div>
    </div>
  );
}
