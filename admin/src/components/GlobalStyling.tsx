import React from 'react';
import { createGlobalStyle, css } from 'styled-components';

import { defaultTheme } from '../theme';
import { getProfileTheme } from '../utils';
import type { Theme, Styles } from '../config';

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

    ${({ $presetStyles }) =>
      $presetStyles &&
      css`
        ${$presetStyles}
      `}
`;

const getSystemColorScheme = (): 'light' | 'dark' =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function GlobalStyling({ presetStyles }: { presetStyles?: Styles }) {
  const { theme: userTheme, dontMergeTheme } = window.SH_CKE_CONFIG || {};

  const profileTheme = getProfileTheme();
  const variant = profileTheme && profileTheme !== 'system' ? profileTheme : getSystemColorScheme();
  const theme = dontMergeTheme ? userTheme : { ...defaultTheme, ...userTheme };

  return <GlobalStyle $editortTheme={theme} $variant={variant} $presetStyles={presetStyles} />;
}

const MemoizedGlobalStyling = React.memo(GlobalStyling);
export { MemoizedGlobalStyling as GlobalStyling };
