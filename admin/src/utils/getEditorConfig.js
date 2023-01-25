import pluginId from "./pluginId";

const insertConfigScript = () => {
  const url =
    strapi.backendURL !== "/"
      ? `${strapi.backendURL}/${pluginId}/ckeditor-config`
      : `/${pluginId}/ckeditor-config`;

  var script = document.createElement("script");
  script.id = "ckeditor-config";
  script.src = url;
  document.body.appendChild(script);
};

const waitForConfigToInitialize = async () => {
  return new Promise((resolve) => {
    (function checkConfigLoaded() {
      if (typeof globalThis.CKEditorConfig !== "undefined") {
        resolve(globalThis.CKEditorConfig);
      } else setTimeout(checkConfigLoaded, 5);
    })();
  });
};

const getEditorConfig = async () => {
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
