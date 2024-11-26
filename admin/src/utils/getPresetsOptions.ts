import { basePresets } from '../components/Input/config';
import getPluginConfig from './getPluginConfig';

function mergePresetsTo(userPresets, basePresets) {
  Object.keys(userPresets).map(presetName => {
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
}

export default async function getPresetsOptions() {
  const { presets: userPresets, dontMergePresets } = (await getPluginConfig()) || {};

  if (!dontMergePresets && userPresets) {
    mergePresetsTo(userPresets, basePresets);
  }

  const options = [...Object.keys(basePresets).map(presetName => basePresets[presetName].field)];

  return options;
}
