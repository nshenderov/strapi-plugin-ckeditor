import { defaultTheme } from '../theme';
import { defaultPreset } from './defaultPreset';
import type { PluginConfig } from './types';

const PLUGIN_CONFIG: PluginConfig = {
  presets: {
    default: defaultPreset,
  },
  theme: defaultTheme,
};

export function setPluginConfig(userConfig: Partial<PluginConfig>): void {
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
