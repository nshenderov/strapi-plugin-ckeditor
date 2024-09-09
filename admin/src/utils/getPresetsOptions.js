import basePresets from '../Input/presets';
import { getPluginConfig } from './getPluginConfig';

const mergePresetsTo = (userPresets, basePresets) => {
  Object.keys(userPresets).map((presetName) => {
    if (basePresets.hasOwnProperty(presetName)) {
      basePresets[presetName].field = {
        ...basePresets[presetName].field,
        ...userPresets[presetName].field,
      };
      basePresets[presetName].styles =
        userPresets[presetName].styles || basePresets[presetName].styles;
      basePresets[presetName].editorConfig = {
        ...basePresets[presetName].editorConfig,
        ...userPresets[presetName].editorConfig,
      };
    } else {
      basePresets[presetName] = userPresets[presetName];
    }
  });
};

export const getPresetsOptions = async () => {
  const { presets: userPresets, dontMergePresets } =
    (await getPluginConfig()) || {};

  if (!dontMergePresets && userPresets) {
    mergePresetsTo(userPresets, basePresets);
  }

  const options = [
    ...Object.keys(basePresets).map(
      (presetName) => basePresets[presetName].field
    ),
  ];

  return options;
};
