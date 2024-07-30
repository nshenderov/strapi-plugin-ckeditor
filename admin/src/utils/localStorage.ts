const STORAGE_KEYS = {
  TOKEN: 'jwtToken',
  PREFERED_LANGUAGE: 'strapi-admin-language',
};

export const getStoredToken = (): string | null => {
  const token =
    localStorage.getItem(STORAGE_KEYS.TOKEN) ?? sessionStorage.getItem(STORAGE_KEYS.TOKEN);

  if (typeof token === 'string') {
    return JSON.parse(token);
  }

  return null;
};

export const getPreferedLanguage = (): string => {
  const language = localStorage.getItem(STORAGE_KEYS.PREFERED_LANGUAGE) ?? 'en';
  return language;
};
