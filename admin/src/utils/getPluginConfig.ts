import PLUGIN_ID from './pluginId';

function insertConfigScript() {
  const url = // @ts-ignore
    globalThis.strapi.backendURL !== '/'
      ? // @ts-ignore
        `${globalThis.strapi.backendURL}/${PLUGIN_ID}/config/ckeditor`
      : `/${PLUGIN_ID}/config/ckeditor`;

  const script = document.createElement('script');
  script.id = 'ckeditor-config';
  script.src = url;
  document.body.appendChild(script);
}

async function waitForConfigToInitialize() {
  return new Promise(resolve => {
    (function checkConfigLoaded() {
      if (typeof globalThis.SH_CKE_CONFIG !== 'undefined') {
        resolve(globalThis.SH_CKE_CONFIG);
      } else setTimeout(checkConfigLoaded, 5);
    })();
  });
}

export default async function getPluginConfig() {
  insertConfigScript();
  const configFromScript = await waitForConfigToInitialize();
  if (configFromScript) {
    return configFromScript;
  }

  return null;
}
