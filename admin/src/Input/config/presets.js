import basePresets from '../presets';
import { setPlugins } from './plugins';
import { setLanguage } from './language';

export const getConfiguredPreset = async (presetName, toggleMediaLib) => {
  const { presets: userPresets, dontMergePresets } =
    globalThis.SH_CKE_CONFIG || {};

  const preset = dontMergePresets
    ? userPresets[presetName]
    : basePresets[presetName];

  setPlugins(preset.editorConfig, toggleMediaLib);

  await setLanguage(preset.editorConfig);

  return preset;
};
