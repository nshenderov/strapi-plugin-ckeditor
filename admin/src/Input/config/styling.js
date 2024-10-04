import React from 'react';
import { createGlobalStyle } from 'styled-components';

import baseTheme from '../theme';

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => theme.common}
  ${({ theme, variant }) => theme[variant]}
  ${({ theme }) => theme.additional}
`;

const getSystemColorScheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const GlobalStyling = () => {
  const { theme: userTheme, dontMergeTheme } = globalThis.SH_CKE_CONFIG || {};

  const profileTheme = localStorage.getItem('STRAPI_THEME');

  const variant =
    profileTheme && profileTheme !== 'system'
      ? profileTheme
      : getSystemColorScheme();

  const theme = dontMergeTheme ? userTheme : { ...baseTheme, ...userTheme };

  return <GlobalStyle theme={theme} variant={variant} />;
};

const MemoizedGlobalStyling = React.memo(GlobalStyling);

export { MemoizedGlobalStyling as GlobalStyling };