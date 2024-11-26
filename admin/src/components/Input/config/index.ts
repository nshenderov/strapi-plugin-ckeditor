import defaultEditor from './default';
import setLanguage from './language';

export const basePresets = {
  ...defaultEditor,
};

export async function getConfiguredPreset(presetName) {
  const { presets: userPresets, dontMergePresets } = globalThis.SH_CKE_CONFIG || {};

  const preset = dontMergePresets ? userPresets[presetName] : basePresets[presetName];

  const clonedPreset = {
    ...preset,
    editorConfig: {
      ...preset.editorConfig,
    },
  };

  await setLanguage(clonedPreset.editorConfig);

  return clonedPreset;
}
