import { auth } from '@strapi/helper-plugin';

const importLang = async (config, language) => {
  const translations = await import(
    /* webpackMode: "lazy-once" */ `ckeditor5/translations/${language}.js`
  ).catch((e) => console.log(e));
  
  config.translations = translations.default;
};

const detecti18n = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const i18n = params['plugins[i18n][locale]'];
  return i18n && i18n.split('-')[0];
};

export const setLanguage = async (config) => {
  const i18nLang = detecti18n();

  const preferedLanguage = auth.getUserInfo().preferedLanguage || 'en';

  const {
    ui = config.language && typeof config.language === 'string' ?
      config.language
    : preferedLanguage,
    textPartLanguage,
    ignorei18n,
  } = config.language || {};

  if (i18nLang && !ignorei18n) {
    config.language = {
      ui: ui,
      content: i18nLang,
      textPartLanguage: textPartLanguage,
    };
  }

  if (ui !== 'en') {
    await importLang(config, ui);
  }
};
