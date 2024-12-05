import React from 'react';
import { createGlobalStyle, css } from 'styled-components';

import { getProfileTheme } from '../utils';
import { type Theme, type Styles, getPluginConfig } from '../config';

const GlobalStyle = createGlobalStyle<{
  $editortTheme?: Theme;
  $variant: 'light' | 'dark';
  $presetStyles?: Styles;
}>`
  ${({ $editortTheme, $variant }) =>
    $editortTheme &&
    css`
      ${$editortTheme.common}
      ${$editortTheme[$variant]}
      ${$editortTheme.additional}
    `}
`;

const getSystemColorScheme = (): 'light' | 'dark' =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function GlobalStyling() {
  const { theme } = getPluginConfig();
  const profileTheme = getProfileTheme();
  const variant = profileTheme && profileTheme !== 'system' ? profileTheme : getSystemColorScheme();

  return <GlobalStyle $editortTheme={theme} $variant={variant} />;
}

const MemoizedGlobalStyling = React.memo(GlobalStyling);
export { MemoizedGlobalStyling as GlobalStyling };
