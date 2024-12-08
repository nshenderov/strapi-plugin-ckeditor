export type {
  UserPluginConfig as PluginConfig,
  EditorConfig,
  Theme,
  Preset,
  Field,
  Metadatas,
  IntlLabel,
  Styles,
} from './config/types';
export { setPluginConfig, defaultHtmlPreset, defaultMarkdownPreset } from './config';
export { StrapiMediaLib, StrapiUploadAdapter } from './plugins';
export { defaultTheme } from './theme';
