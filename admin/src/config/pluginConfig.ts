import { defaultTheme } from '../theme';
import { defaultHtmlPreset } from './htmlPreset';
import { defaultMarkdownPreset } from './markdownPreset';
import type { PluginConfig, UserPluginConfig, Preset, Theme } from './types';

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
 * - Function must be invoked before the admin panel's bootstrap lifecycle function.
 * The recommended way is to invoke it within the admin panel's register lifecycle function.
 *
 * - Provided properties will overwrite the default configuration values.
 *
 * @param userConfig - Plugin configuration object.
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
}

/**
 * Returns the presets object.
 *
 * @remarks
 *
 * - The property name for the preset must match the preset's name.
 *
 * - To extend or modify the options visible in the admin panel's content manager,
 *   changes must be made before the admin panel's bootstrap lifecycle function.
 *
 */
export function getPluginPresets(): Record<string, Preset> {
  return PLUGIN_CONFIG.presets;
}

/**
 * Returns the theme object.
 *
 */
export function getPluginTheme(): Theme {
  return PLUGIN_CONFIG.presets;
}

/**
 * Retrieves current plugin configuration.
 *
 * @internal
 */
export function getPluginConfig(): PluginConfig {
  return PLUGIN_CONFIG;
}
