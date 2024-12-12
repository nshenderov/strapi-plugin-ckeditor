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
 * The general recommendation is to call it inside the admin panel's register lifecycle function.
 *
 * - Provided properties will overwrite the default configuration values.
 *
 * - The configuration becomes immutable after the first invocation, preventing further
 * modifications.
 *
 * @param userConfig - The plugin configuration object.
 */
export function setPluginConfig(userPluginConfig: UserPluginConfig): void {
  const { presets: userPresets, theme: userTheme } = userPluginConfig || {};

  if (userPresets) {
    PLUGIN_CONFIG.presets = {};
    userPresets.forEach(preset => {
      PLUGIN_CONFIG.presets[preset.name] = preset;
    });
  }

  if (userTheme) {
    PLUGIN_CONFIG.theme = userTheme;
  }

  deepFreeze(PLUGIN_CONFIG);
}

/**
 * Retrieves the current plugin configuration, ensuring it is immutable.
 *
 * @internal
 */
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
