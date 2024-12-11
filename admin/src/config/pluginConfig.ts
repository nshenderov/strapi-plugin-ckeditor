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
 *
 * @remarks
 *
 * - The function must be invoked before the admin panel's bootstrap lifecycle function.
 *
 * - Provided objects will overwrite the default configuration values.
 *
 * - The provided configuration will be frozen after the first invocation, preventing further modifications.
 *
 * @param userConfig - The configuration object provided by the user.
 *
 * @public
 */
export function setPluginConfig(userConfig: UserPluginConfig): void {
  const { presets, theme } = userConfig || {};

  if (presets) {
    presets.forEach(preset => {
      PLUGIN_CONFIG.presets[preset.name] = preset;
    });
  }

  if (theme) {
    PLUGIN_CONFIG.theme = theme;
  }

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
