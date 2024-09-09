import { auth } from '@strapi/helper-plugin';

export const setPlugins = (config, toggleMediaLib) => {
  const presetPluginNames = config?.plugins
    ? [...config.plugins.map((p) => p.pluginName)]
    : [];

  if (presetPluginNames.includes('StrapiMediaLib')) {
    config.strapiMediaLib = { toggle: toggleMediaLib };
  }

  if (presetPluginNames.includes('StrapiUploadAdapter')) {
    config.strapiUploadAdapter = {
      uploadUrl: `${strapi.backendURL}/upload`,
      headers: { Authorization: 'Bearer ' + auth.getToken() },
      backendUrl: strapi.backendURL,
      responsive: globalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE,
    };
  }

  if (presetPluginNames.includes('WordCount')) {
    config.WordCountPlugin = true;
  }
};
