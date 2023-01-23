import baseTheme from "./theme";
import { createGlobalStyle } from "styled-components";

export const getGlobalStyling = () => {
    
  const variant = localStorage.getItem("STRAPI_THEME") || "light";
  const { theme: userTheme, themeOverwrite: overwrite } = globalThis.CKEditorConfig || {};

  const theme = overwrite ? userTheme : { ...baseTheme, ...userTheme};

  return createGlobalStyle`
       ${theme.common}
       ${theme[variant]}
       ${theme.additional}
   `;
}
