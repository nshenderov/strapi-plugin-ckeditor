import { auth, request } from "@strapi/helper-plugin";
import cloneDeep from 'lodash/cloneDeep';

import baseConfigs from "./configs";
import pluginId from "../../../utils/pluginId";

const importLang = async (config, language) => {
  
  if (!language) return;

  const { plugins: configPlugins = [] } = config;

  const configPluginNames = [...configPlugins.map((p) => p.pluginName)];

  const plugins = [
    { name: "DocumentList", module: "ckeditor5-list" },
    { name: "TextPartLanguage", module: "ckeditor5-language" },
    { name: "Alignment", module: "ckeditor5-alignment" },
    { name: "Autosave", module: "ckeditor5-autosave" },
    { name: "BlockQuote", module: "ckeditor5-block-quote" },
    { name: "CodeBlock", module: "ckeditor5-code-block" },
    { name: "Heading", module: "ckeditor5-heading" },
    { name: "HtmlEmbed", module: "ckeditor5-html-embed" },
    { name: "GeneralHtmlSupport", module: "ckeditor5-html-support" },
    { name: "HorizontalLine", module: "ckeditor5-horizontal-line" },
    { name: "MediaEmbed", module: "ckeditor5-media-embed" },
    { name: "Image", module: "ckeditor5-image" },
    { name: "Indent", module: "ckeditor5-indent" },
    { name: "Link", module: "ckeditor5-link" },
    { name: "RemoveFormat", module: "ckeditor5-remove-format" },
    { name: "Table", module: "ckeditor5-table" },
    { name: "WordCount", module: "ckeditor5-word-count" },
    { name: "FindAndReplace", module: "ckeditor5-find-and-replace" },
    { name: "SpecialCharacters", module: "ckeditor5-special-characters" },
    { name: "PageBreak", module: "ckeditor5-page-break" },
    { name: "SourceEditing", module: "ckeditor5-source-editing" },
    { name: "Highlight", module: "ckeditor5-highlight" },
    { name: "Style", module: "ckeditor5-style" },
  ];

  const basicStylesPlugin = [
    "Bold",
    "Code",
    "Italic",
    "Strikethrough",
    "Subscript",
    "Superscript",
    "Underline",
  ];

  const fontPlugin = ["FontBackgroundColor", "FontColor", "FontFamily", "FontSize"];

  const listPlugin = ["List", "DocumentList"];

  await Promise.all(
    plugins
      .filter(({ name }) => configPluginNames.includes(name))
      .map(
        async ({ module }) =>
          await import(
            /* webpackMode: "lazy-once" */ `@ckeditor/${module}/build/translations/${language}.js`
          ).catch(() => null)
      )
  );

  if (configPluginNames.some((p) => basicStylesPlugin.includes(p)))
    await import(
      /* webpackMode: "lazy-once" */ `@ckeditor/ckeditor5-basic-styles/build/translations/${language}.js`
    ).catch(() => null);
  if (configPluginNames.some((p) => listPlugin.includes(p)))
    await import(
      /* webpackMode: "lazy-once" */ `@ckeditor/ckeditor5-list/build/translations/${language}.js`
    ).catch(() => null);
  if (configPluginNames.some((p) => fontPlugin.includes(p)))
    await import(
      /* webpackMode: "lazy-once" */ `@_sh/ckeditor5-font-with-picker/build/translations/${language}.js`
    ).catch(() => null);
};

const setLanguage = async (config) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const languageContent = params["plugins[i18n][locale]"];

  const preferedLanguage = auth.getUserInfo().preferedLanguage;

  const { ui = preferedLanguage || 'en', content, textPartLanguage, ignorei18n } = config.language || {};

  if (languageContent) {
    const locale = languageContent.split("-")[0];

    config.language = {
      ui: typeof config.language === "string" ? config.language : ui,
      content: ignorei18n ? content : locale,
      textPartLanguage: textPartLanguage,
    };

    await importLang(config, config.language.ui);
    await importLang(config, config.language.content);
  } else if (typeof config.language === "object") {
    await importLang(config, config.language.ui);
    await importLang(config, config.language.content);
  } else if (typeof config.language === "string") {
    await importLang(config, config.language);
  } else {
    config.language = preferedLanguage;
    await importLang(config, preferedLanguage);
  }
};

const getCurrentConfig = (presetName) => {
  const { configs: userConfigs, configsOverwrite: overwrite } = globalThis.CKEditorConfig || {};

  let configs;

  if (overwrite) {
    configs = userConfigs;
  } else {
    configs = baseConfigs;
    if (userConfigs) {
      Object.keys(userConfigs).map(cfgName=>{
        if(baseConfigs.hasOwnProperty(cfgName)){
          configs[cfgName].fields = { ...baseConfigs[cfgName].field, ...userConfigs[cfgName].field };
          configs[cfgName].styles = userConfigs[cfgName].styles || baseConfigs[cfgName].styles;
          configs[cfgName].editorConfig = { ...baseConfigs[cfgName].editorConfig, ...userConfigs[cfgName].editorConfig };
        } else { configs[cfgName] = userConfigs[cfgName] }
      })
    }
  }

  const clonedConfig = cloneDeep(configs[presetName]);

  return clonedConfig;
};

const setPlugins = (config, { responsiveDimensions }, toggleMediaLib) => {
  const configPluginNames = config.editorConfig?.plugins ? [ ...config.editorConfig.plugins.map((p) => p.pluginName)] : [];

  if (configPluginNames.includes("StrapiMediaLib")) {
    config.editorConfig.strapiMediaLib = { toggle: toggleMediaLib };
  }
  if (configPluginNames.includes("StrapiUploadAdapter")) {
    config.editorConfig.strapiUploadAdapter = {
      uploadUrl: `${strapi.backendURL}/upload`,
      headers: { Authorization: "Bearer " + auth.getToken() },
      backendUrl: strapi.backendURL,
      responsive: responsiveDimensions,
    };
  }
  if (configPluginNames.includes("WordCount")) {
    config.editorConfig.WordCountPlugin = true;
  }
};
const requestConfig = (key) => request(`/${pluginId}/config/${key}`, { method: "GET" });

export const getConfiguration = async (presetName, toggleMediaLib) => {
  const currentConfig = getCurrentConfig(presetName);

  const uploadPluginConfig = await requestConfig("upload");

  setPlugins(currentConfig, uploadPluginConfig, toggleMediaLib);

  await setLanguage(currentConfig.editorConfig);

  return { currentConfig, uploadPluginConfig };
};