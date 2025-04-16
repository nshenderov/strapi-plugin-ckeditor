import cloneDeep from 'lodash/cloneDeep';

import { defaultHtmlPreset, defaultMarkdownPreset } from './config';
import { defaultTheme } from './theme';

const clonedDefaultTheme = cloneDeep(defaultTheme);
const clonedDefaultHtmlPreset = cloneDeep(defaultHtmlPreset);
const clonedDefaultMarkdownPreset = cloneDeep(defaultMarkdownPreset);

export { clonedDefaultTheme as defaultTheme };
export { clonedDefaultHtmlPreset as defaultHtmlPreset };
export { clonedDefaultMarkdownPreset as defaultMarkdownPreset };

export type {
  UserPluginConfig as PluginConfig,
  BareUserPluginConfig as BarePluginConfig,
  EditorConfig,
  Preset,
  Theme,
  EditorStyles,
} from './config/types';

export { setPluginConfig, modifyPluginConfig } from './config';
export { StrapiMediaLib, StrapiUploadAdapter } from './plugins';
