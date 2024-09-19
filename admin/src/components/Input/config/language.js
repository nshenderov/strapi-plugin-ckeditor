import { getPreferedLanguage } from '../../../utils/localStorage';

const translationImports = {
  af: () => import('ckeditor5/translations/af.js'),
  ar: () => import('ckeditor5/translations/ar.js'),
  ast: () => import('ckeditor5/translations/ast.js'),
  az: () => import('ckeditor5/translations/az.js'),
  bg: () => import('ckeditor5/translations/bg.js'),
  bn: () => import('ckeditor5/translations/bn.js'),
  bs: () => import('ckeditor5/translations/bs.js'),
  ca: () => import('ckeditor5/translations/ca.js'),
  cs: () => import('ckeditor5/translations/cs.js'),
  da: () => import('ckeditor5/translations/da.js'),
  'de-ch': () => import('ckeditor5/translations/de-ch.js'),
  de: () => import('ckeditor5/translations/de.js'),
  el: () => import('ckeditor5/translations/el.js'),
  'en-au': () => import('ckeditor5/translations/en-au.js'),
  'en-gb': () => import('ckeditor5/translations/en-gb.js'),
  en: () => import('ckeditor5/translations/en.js'),
  eo: () => import('ckeditor5/translations/eo.js'),
  'es-co': () => import('ckeditor5/translations/es-co.js'),
  es: () => import('ckeditor5/translations/es.js'),
  et: () => import('ckeditor5/translations/et.js'),
  eu: () => import('ckeditor5/translations/eu.js'),
  fa: () => import('ckeditor5/translations/fa.js'),
  fi: () => import('ckeditor5/translations/fi.js'),
  fr: () => import('ckeditor5/translations/fr.js'),
  gl: () => import('ckeditor5/translations/gl.js'),
  gu: () => import('ckeditor5/translations/gu.js'),
  he: () => import('ckeditor5/translations/he.js'),
  hi: () => import('ckeditor5/translations/hi.js'),
  hr: () => import('ckeditor5/translations/hr.js'),
  hu: () => import('ckeditor5/translations/hu.js'),
  hy: () => import('ckeditor5/translations/hy.js'),
  id: () => import('ckeditor5/translations/id.js'),
  it: () => import('ckeditor5/translations/it.js'),
  ja: () => import('ckeditor5/translations/ja.js'),
  jv: () => import('ckeditor5/translations/jv.js'),
  kk: () => import('ckeditor5/translations/kk.js'),
  km: () => import('ckeditor5/translations/km.js'),
  kn: () => import('ckeditor5/translations/kn.js'),
  ko: () => import('ckeditor5/translations/ko.js'),
  ku: () => import('ckeditor5/translations/ku.js'),
  lt: () => import('ckeditor5/translations/lt.js'),
  lv: () => import('ckeditor5/translations/lv.js'),
  ms: () => import('ckeditor5/translations/ms.js'),
  nb: () => import('ckeditor5/translations/nb.js'),
  ne: () => import('ckeditor5/translations/ne.js'),
  nl: () => import('ckeditor5/translations/nl.js'),
  no: () => import('ckeditor5/translations/no.js'),
  oc: () => import('ckeditor5/translations/oc.js'),
  pl: () => import('ckeditor5/translations/pl.js'),
  'pt-br': () => import('ckeditor5/translations/pt-br.js'),
  pt: () => import('ckeditor5/translations/pt.js'),
  ro: () => import('ckeditor5/translations/ro.js'),
  ru: () => import('ckeditor5/translations/ru.js'),
  si: () => import('ckeditor5/translations/si.js'),
  sk: () => import('ckeditor5/translations/sk.js'),
  sl: () => import('ckeditor5/translations/sl.js'),
  sq: () => import('ckeditor5/translations/sq.js'),
  sr: () => import('ckeditor5/translations/sr.js'),
  'sr-latn': () => import('ckeditor5/translations/sr-latn.js'),
  sv: () => import('ckeditor5/translations/sv.js'),
  th: () => import('ckeditor5/translations/th.js'),
  ti: () => import('ckeditor5/translations/ti.js'),
  tk: () => import('ckeditor5/translations/tk.js'),
  tr: () => import('ckeditor5/translations/tr.js'),
  tt: () => import('ckeditor5/translations/tt.js'),
  ug: () => import('ckeditor5/translations/ug.js'),
  uk: () => import('ckeditor5/translations/uk.js'),
  ur: () => import('ckeditor5/translations/ur.js'),
  uz: () => import('ckeditor5/translations/uz.js'),
  vi: () => import('ckeditor5/translations/vi.js'),
  'zh-cn': () => import('ckeditor5/translations/zh-cn.js'),
  zh: () => import('ckeditor5/translations/zh.js'),
};

const importLang = async (config, language) => {
  if (translationImports[language]) {
    const translations = await translationImports[language]();
    config.translations = translations.default;
  } else {
    console.error(`No translation found for language: ${language}`);
  }
};

const detecti18n = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const i18n = params['plugins[i18n][locale]'];
  return i18n && i18n.split('-')[0];
};

export const setLanguage = async (config) => {
  const i18nLang = detecti18n();

  const preferedLanguage = getPreferedLanguage();

  const {
    ui = preferedLanguage,
    content,
    textPartLanguage,
    ignorei18n,
  } = config.language || {};

  if (i18nLang) {
    config.language = {
      ui: typeof config.language === 'string' ? config.language : ui,
      content: ignorei18n ? content : i18nLang,
      textPartLanguage: textPartLanguage,
    };
  }

  if (!config.language) {
    config.language = preferedLanguage;
  }

  await importLang(
    config,
    typeof config.language === 'string' ? config.language : config.language.ui
  );
};
