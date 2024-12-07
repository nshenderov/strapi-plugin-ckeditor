import { defaultTheme } from '../theme';
import { defaultHtmlPreset } from './htmlPreset';
import { defaultMarkdownPreset } from './markdownPreset';
import type { PluginConfig, UserPluginConfig } from './types';

const PLUGIN_CONFIG: PluginConfig = {
  presets: {
    defaultHtml: defaultHtmlPreset,
    defaultMarkdown: defaultMarkdownPreset,
  },
  theme: defaultTheme,
};

/**
 * Sets a configuration for the plugin.
 * The function must be invoked before the admin panel's bootstrap lifecycle function.
 * Provided objects will overwrite the default values.
 * Each key in the presets must match the corresponding field's value property in the preset.
 */
export function setPluginConfig(userConfig: UserPluginConfig): void {
  const { presets = PLUGIN_CONFIG.presets, theme = PLUGIN_CONFIG.theme } = userConfig;
  PLUGIN_CONFIG.presets = presets;
  PLUGIN_CONFIG.theme = theme;
  deepFreeze(PLUGIN_CONFIG);
}

export function getPluginConfig(): PluginConfig {
  if (!Object.isFrozen(PLUGIN_CONFIG)) deepFreeze(PLUGIN_CONFIG);
  return PLUGIN_CONFIG;
}

function deepFreeze(obj: Object): Readonly<Object> {
  (Object.keys(obj) as (keyof typeof obj)[]).forEach(p => {
    if (typeof obj[p] === 'object' && obj[p] !== null && !Object.isFrozen(obj[p])) {
      deepFreeze(obj[p]);
    }
  });

  return Object.freeze(obj);
}
