import pluginId from './pluginId';

const insertConfigScript = () => {
  const url =
    window.strapi.backendURL !== '/'
      ? `${window.strapi.backendURL}/${pluginId}/config/ckeditor`
      : `/${pluginId}/config/ckeditor`;

  var script = document.createElement('script');
  script.id = 'ckeditor-config';
  script.src = url;
  document.body.appendChild(script);
};

const waitForConfigToInitialize = async () => {
  return new Promise((resolve) => {
    (function checkConfigLoaded() {
      if (
        //@ts-expect-error
        typeof globalThis.CKEditorConfig !== 'undefined'
      ) {
        //@ts-expect-error
        resolve(globalThis.CKEditorConfig);
      } else setTimeout(checkConfigLoaded, 5);
    })();
  });
};

type EditorConfig = {
  configs?: Record<string, any>;
  configsOverwrite?: boolean;
};

const getEditorConfig = async (): Promise<EditorConfig | null> => {
  // raw config/ckeditor.[js|ts] file
  // Can be used with non-JSON serializable properties
  insertConfigScript();

  const configFromScript = await waitForConfigToInitialize();

  if (configFromScript) {
    return configFromScript;
  }

  return null;
};

export default getEditorConfig;
