const STORAGE_KEYS = {
  TOKEN: 'jwtToken',
  PREFERED_LANGUAGE: 'strapi-admin-language',
  PROFILE_THEME: 'STRAPI_THEME',
};

export const getStoredToken = () => {
  const token =
    localStorage.getItem(STORAGE_KEYS.TOKEN) ??
    sessionStorage.getItem(STORAGE_KEYS.TOKEN);

  if (typeof token === 'string') {
    return JSON.parse(token);
  }

  return null;
};

export const getPreferedLanguage = () => {
  const language =
    localStorage
      .getItem(STORAGE_KEYS.PREFERED_LANGUAGE)
      ?.replace(/^"|"$/g, '') || 'en';
  return language;
};

export const getProfileTheme = () => {
  const theme = localStorage.getItem(STORAGE_KEYS.PROFILE_THEME);
  return theme;
};
