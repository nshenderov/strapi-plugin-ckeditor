import { useEffect } from 'react';
import { useTheme, type DefaultTheme } from 'styled-components';

import { getProfileTheme } from '../utils';
import { type Theme, getPluginConfig } from '../config';

let styleElement: HTMLStyleElement | null = null;

const getSystemColorScheme = (): 'light' | 'dark' =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function flattenCSS(styles: unknown, theme: DefaultTheme): string {
  if (styles == null || styles === false) return '';

  if (typeof styles === 'string') {
    return styles;
  }
  if (typeof styles === 'number') {
    return String(styles);
  }
  if (typeof styles === 'function') {
    return flattenCSS(styles({ theme }), theme);
  }
  if (Array.isArray(styles)) {
    return styles.map(part => flattenCSS(part, theme)).join('');
  }

  return '';
}

function buildCSS(pluginTheme: Theme, strapiTheme: DefaultTheme): string {
  const profileTheme = getProfileTheme();
  const variant = profileTheme && profileTheme !== 'system' ? profileTheme : getSystemColorScheme();

  return [
    flattenCSS(pluginTheme.common, strapiTheme),
    flattenCSS(pluginTheme[variant], strapiTheme),
    flattenCSS(pluginTheme.additional, strapiTheme),
  ].join('\n');
}

function injectStyles(strapiTheme: DefaultTheme) {
  const { theme } = getPluginConfig();
  const cssText = buildCSS(theme, strapiTheme);

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'ck-editor-global-styles';
    document.head.appendChild(styleElement);
  }

  if (styleElement.textContent !== cssText) {
    styleElement.textContent = cssText;
  }
}

export function useGlobalStyles() {
  const strapiTheme = useTheme();

  useEffect(() => {
    injectStyles(strapiTheme);
  }, [strapiTheme]);
}
