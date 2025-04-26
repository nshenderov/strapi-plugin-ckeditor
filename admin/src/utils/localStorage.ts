const STORAGE_KEYS = {
  TOKEN: 'jwtToken',
  PREFERED_LANGUAGE: 'strapi-admin-language',
  PROFILE_THEME: 'STRAPI_THEME',
};

export function getCookieValue(name: string): string | null {
  let result = null;
  const cookieArray = document.cookie.split(';');
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=').map(item => item.trim());
    if (key === name) {
      result = decodeURIComponent(value);
    }
  });
  return result;
}

export function getStoredToken(): string | null {
  const tokenFromStorage =
    localStorage.getItem(STORAGE_KEYS.TOKEN) ?? sessionStorage.getItem(STORAGE_KEYS.TOKEN);

  if (tokenFromStorage) {
    return JSON.parse(tokenFromStorage);
  }

  const tokenFromCookie = getCookieValue(STORAGE_KEYS.TOKEN);

  return tokenFromCookie;
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
