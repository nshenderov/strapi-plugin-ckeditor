import basePresets from '../presets';
import { setPlugins } from './plugins';
import { setLanguage } from './language';

export const getConfiguredPreset = async (
  presetName,
  { toggleMediaLib, strapiFieldPlaceholder }
) => {
  const { presets: userPresets, dontMergePresets } =
    globalThis.SH_CKE_CONFIG || {};

  const preset =
    dontMergePresets ? userPresets[presetName] : basePresets[presetName];

  const clonedPreset = {
    ...preset,
    editorConfig: {
      ...preset.editorConfig,
      placeholder: strapiFieldPlaceholder || preset.editorConfig.placeholder,
    },
  };

  setPlugins(clonedPreset.editorConfig, toggleMediaLib);

  await setLanguage(clonedPreset.editorConfig);

  return clonedPreset;
};
