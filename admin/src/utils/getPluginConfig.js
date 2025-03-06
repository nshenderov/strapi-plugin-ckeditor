import pluginId from '../pluginId';

const insertConfigScript = () => {
  const url =
    strapi.backendURL !== '/'
      ? `${strapi.backendURL}/${pluginId}/config/ckeditor`
      : `/${pluginId}/config/ckeditor`;

  var script = document.createElement('script');
  script.id = 'ckeditor-config';
  script.src = url;
  document.body.appendChild(script);
};

const waitForConfigToInitialize = async () => {
  return new Promise((resolve) => {
    (function checkConfigLoaded() {
      if (typeof globalThis.SH_CKE_CONFIG !== 'undefined') {
        resolve(globalThis.SH_CKE_CONFIG);
      } else setTimeout(checkConfigLoaded, 5);
    })();
  });
};

export const getPluginConfig = async () => {
  // raw config/ckeditor.[js|ts] file
  // Can be used with non-JSON serializable properties
  insertConfigScript();
  const configFromScript = await waitForConfigToInitialize();
  if (configFromScript) {
    return configFromScript;
  }

  return null;
};
