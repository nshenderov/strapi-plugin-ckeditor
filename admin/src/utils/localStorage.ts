const STORAGE_KEYS = {
  TOKEN: 'jwtToken',
  PREFERED_LANGUAGE: 'strapi-admin-language',
  PROFILE_THEME: 'STRAPI_THEME',
};

export function getStoredToken(): string | null {
  const token =
    localStorage.getItem(STORAGE_KEYS.TOKEN) ?? sessionStorage.getItem(STORAGE_KEYS.TOKEN);

  if (typeof token === 'string') {
    return JSON.parse(token);
  }

  return null;
}

export function getPreferedLanguage(): string | 'en' {
  const language =
    localStorage.getItem(STORAGE_KEYS.PREFERED_LANGUAGE)?.replace(/^"|"$/g, '') || 'en';
  return language;
}

export function getProfileTheme(): 'light' | 'dark' | 'system' | null {
  const theme = localStorage.getItem(STORAGE_KEYS.PROFILE_THEME) as
    | 'light'
    | 'dark'
    | 'system'
    | null;
  return theme;
}
