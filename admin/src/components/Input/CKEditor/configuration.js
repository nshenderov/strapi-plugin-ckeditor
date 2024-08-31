import { auth } from "@strapi/helper-plugin";
import cloneDeep from 'lodash/cloneDeep';

import baseConfigs from "./configs";

const importLang = async (config, language) => {
  
    const translations = await import(
    /* webpackMode: "lazy-once" */ `ckeditor5/translations/${language}.js`
    ).catch((e) => console.log(e));

    config.translations = translations.default;
};

const setLanguage = async (config) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const languageContent = params["plugins[i18n][locale]"];

  const preferedLanguage = auth.getUserInfo().preferedLanguage || "en";

  const { ui = preferedLanguage, content, textPartLanguage, ignorei18n } = config.language || {};

  if (languageContent) {
    const locale = languageContent.split("-")[0];

    config.language = {
      ui: typeof config.language === "string" ? config.language : ui,
      content: ignorei18n ? content : locale,
      textPartLanguage: textPartLanguage,
    };
  }

  if(!config.language)
  {
    config.language = preferedLanguage;
  }

  await importLang(config, typeof config.language === "string" ?
                               config.language : config.language.ui);
};

const getCurrentConfig = (presetName) => {
  const { configs: userConfigs, configsOverwrite: overwrite } = globalThis.SH_CKE_CONFIG || {};

  let configs;

  if (overwrite) {
    configs = userConfigs;
  } else {
    configs = baseConfigs;
    if (userConfigs) {
      Object.keys(userConfigs).map(cfgName=>{
        if(baseConfigs.hasOwnProperty(cfgName)){
          configs[cfgName].field = { ...baseConfigs[cfgName].field, ...userConfigs[cfgName].field };
          configs[cfgName].styles = userConfigs[cfgName].styles || baseConfigs[cfgName].styles;
          configs[cfgName].editorConfig = { ...baseConfigs[cfgName].editorConfig, ...userConfigs[cfgName].editorConfig };
        } else { configs[cfgName] = userConfigs[cfgName] }
      })
    }
  }

  const clonedConfig = cloneDeep(configs[presetName]);

  return clonedConfig;
};

export const setPlugins = (preset, toggleMediaLib) => {
  const presetPluginNames = preset.ckeditorConfig?.plugins
    ? [...preset.ckeditorConfig.plugins.map((p) => p.pluginName)]
    : [];

  if (presetPluginNames.includes("StrapiMediaLib")) {
    preset.ckeditorConfig.strapiMediaLib = { toggle: toggleMediaLib };
  }

  if (presetPluginNames.includes("StrapiUploadAdapter")) {
    preset.ckeditorConfig.strapiUploadAdapter = {
      uploadUrl: `${strapi.backendURL}/upload`,
      headers: { Authorization: "Bearer " + auth.getToken() },
      backendUrl: strapi.backendURL,
      responsive: globalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE,
    };
  }

  if (presetPluginNames.includes("WordCount")) {
    preset.ckeditorConfig.WordCountPlugin = true;
  }
};

export const getConfiguration = async (presetName, toggleMediaLib) => {
  const currentConfig = getCurrentConfig(presetName);

  setPlugins(currentConfig, toggleMediaLib);

  await setLanguage(currentConfig.editorConfig);

  return currentConfig;
};