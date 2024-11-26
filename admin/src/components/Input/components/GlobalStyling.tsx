import React from 'react';
import { createGlobalStyle, css } from 'styled-components';

import baseTheme from '../theme';
import { getProfileTheme } from '../../../utils/localStorage';

const GlobalStyle = createGlobalStyle<{ $editortTheme: Record<string, string>; $variant: string }>`
  ${({ $editortTheme, $variant }) => css`
    ${$editortTheme.common}
    ${$editortTheme[$variant]}
    ${$editortTheme.additional}
  `}
`;

const getSystemColorScheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function GlobalStyling() {
  const { theme: userTheme, dontMergeTheme } = globalThis.SH_CKE_CONFIG || {};

  const profileTheme = getProfileTheme();
  const variant = profileTheme && profileTheme !== 'system' ? profileTheme : getSystemColorScheme();
  const theme = dontMergeTheme ? userTheme : { ...baseTheme, ...userTheme };

  return <GlobalStyle $editortTheme={theme} $variant={variant} />;
}

const MemoizedGlobalStyling = React.memo(GlobalStyling);
export default MemoizedGlobalStyling;
