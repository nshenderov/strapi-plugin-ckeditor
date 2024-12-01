import { defaultPreset } from './defaultPreset';
import { setUpLanguage } from './language';
import type { Field, PluginConfig, Preset } from './types';

export const pluginPresets: Record<string, Preset> = {
  default: defaultPreset,
};

export async function getConfiguredPreset(presetName: string): Promise<Preset> {
  const { presets: userPresets, dontMergePresets } = window.SH_CKE_CONFIG || {};

  if (dontMergePresets && !userPresets) {
    console.error('CKEditor: No presets found');
  }

  const preset =
    dontMergePresets && userPresets ? userPresets[presetName] : pluginPresets[presetName];

  const clonedPreset = {
    ...preset,
    editorConfig: {
      ...preset.editorConfig,
    },
  };

  await setUpLanguage(clonedPreset.editorConfig);

  return clonedPreset;
}

export async function getPresetsFields(config: PluginConfig | null): Promise<Field[]> {
  const { presets: userPresets = {}, dontMergePresets = false } = config ?? {};

  if (!dontMergePresets && userPresets) {
    mergePresets(userPresets as Record<string, Preset>, pluginPresets);
  }

  const fields: Field[] = [];
  Object.values(pluginPresets).forEach(preset => fields.push(preset.field));

  return fields;
}

function mergePresets(from: Record<string, Preset>, to: Record<string, Preset>): void {
  Object.keys(from).forEach(presetName => {
    if (to[presetName]) {
      to[presetName].field = {
        ...to[presetName].field,
        ...from[presetName].field,
      };
      to[presetName].styles = from[presetName].styles || to[presetName].styles;
      to[presetName].editorConfig = {
        ...to[presetName].editorConfig,
        ...from[presetName].editorConfig,
      };
    } else {
      to[presetName] = from[presetName];
    }
  });
}
