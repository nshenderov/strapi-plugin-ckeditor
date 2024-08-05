import baseTheme from "./theme";
import { createGlobalStyle } from "styled-components";

const getSystemColorScheme= () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches ?
  "dark" : "light";

export const getGlobalStyling = () => {

  const { theme: userTheme, themeOverwrite: overwrite } = globalThis.CKEditorConfig || {};

  const profileTheme = localStorage.getItem("STRAPI_THEME");

  const variant = profileTheme && profileTheme !== "system" ? profileTheme : getSystemColorScheme();

  const theme = overwrite ? userTheme : { ...baseTheme, ...userTheme};

  return createGlobalStyle`
       ${theme.common}
       ${theme[variant]}
       ${theme.additional}
   `;
}
