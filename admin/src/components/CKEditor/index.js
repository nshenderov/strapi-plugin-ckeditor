import React, {useEffect, useRef, useState} from "react";
import {auth, prefixFileUrlWithBackendUrl, request} from "@strapi/helper-plugin";
import styled, {createGlobalStyle} from "styled-components";

import {Box} from "@strapi/design-system/Box";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {Editor as CustomClassicEditor} from "./build/ckeditor";
import MediaLib from "../MediaLib";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import styles from "./styles";
import theme from "./theme";

const EditorStyle = createGlobalStyle`
${styles}
${({ strapiTheme }) => strapiTheme}
${({ custom }) => custom}

.ck-editor__styled__container{
	position: relative;
	width:100%;
}
`;
const Wrapper = styled(Box)``;

const Editor = ({ onChange, name, value, disabled }) => {
  //####### strapi media lib connector #############################################################################################
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  const [editor, setEditor] = useState();

  const toggleMediaLib = (editor) => {
    if (editor) {
      setEditor(editor);
    }
    setMediaLibVisible((prev) => !prev);
  };

  const handleChangeAssets = (assets) => {
    let newValue = "";

    assets.map((asset) => {
      if (asset.mime.includes("image")) {
        if (asset.formats && uploadCfg?.responsiveDimensions) {
          let set = "";
          let keys = Object.keys(asset.formats).sort((a, b) => {
            return asset.formats[a].width - asset.formats[b].width;
          });
          keys.map((k) => {
            let str = prefixFileUrlWithBackendUrl(asset.formats[k].url) + ` ${asset.formats[k].width}w,`;
            set = set + str;
          });
          const imgTag = `<img src="${asset.url}" alt="${asset.alt}" srcset="${set}"></img>`;
          newValue = `${newValue}${imgTag}`;
        } else {
          const imgTag = `<img src="${asset.url}" alt="${asset.alt}"></img>`;
          newValue = `${newValue}${imgTag}`;
        }
      } else if (asset.mime.includes("application/pdf")) {
        const downloadTag = `<a href="${prefixFileUrlWithBackendUrl(asset.url)}" download="${asset.alt}">${asset.alt || 'Download PDF'}</a>`
        newValue = `${newValue}${downloadTag}`
      }
      // Handle videos and other type of files by adding some code
    });

    const viewFragment = editor.data.processor.toView(newValue);
    const modelFragment = editor.data.toModel(viewFragment);
    editor.model.insertContent(modelFragment);

    toggleMediaLib();
  };

  const requestConfig = (key) =>
      request(`/${pluginId}/config/${key}`, { method: "GET" });

  const insertConfigScript = () => {
    const url = strapi.backendURL !== '/'
        ? `${strapi.backendURL}/${pluginId}/editor-config-script.js`
        : `/${pluginId}/editor-config-script.js`

    var script = document.createElement('script');
    script.id = 'editor-config'
    script.src = url;
    document.body.appendChild(script);
  }

  const waitForConfigToInitialize = async () => {
    return new Promise((resolve) => {
      (function checkConfigLoaded() {
        if (typeof globalThis.ckEditorConfig !== "undefined") {
          resolve(globalThis.ckEditorConfig)
        } else
          setTimeout(checkConfigLoaded, 5)
      })();
    });
  }

  const getEditorConfig = async () => {
    // raw config/ckeditor.[js|ts] file
    // Can be used with non-JSON serializable properties
    insertConfigScript();
    const configFromScript = await waitForConfigToInitialize();
    if(configFromScript) {
      return configFromScript;
    }

    // ckeditor snippet of config/plugins.[js|ts] serialized as JSON
    // Can't be used with non-JSON serializable properties
    else {
      return requestConfig('editor');
    }
  }

  const setLanguage = (config) => {

    const {
      ui,
      content,
      textPartLanguage,
      ignorei18n
    } = config.language || {};

    const preferedLanguage = auth.getUserInfo().preferedLanguage;

     //read i18n locale
     const urlSearchParams = new URLSearchParams(window.location.search);
     const params = Object.fromEntries(urlSearchParams.entries());
     const languageContent = params["plugins[i18n][locale]"];

    //  let language = config.language;
    if (languageContent) {
      const locale = languageContent.split("-")[0]

      config.language = {
        ui: typeof config.language === "string" ? config.language : ui || preferedLanguage,
        content: ignorei18n ? content : locale,
        textPartLanguage: textPartLanguage
      }

      import(/* webpackMode: "eager" */ `./build/translations/${config.language.ui}.js`).catch(() => null);
      import(/* webpackMode: "eager" */ `./build/translations/${config.language.content}.js`).catch(() => null);
      
    } else {
      config.language = preferedLanguage
      import(/* webpackMode: "eager" */ `./build/translations/${preferedLanguage}.js`).catch(() => null);
    };

  }


  //####### config #############################################################################################
  const [config, setConfig] = useState();
  const [pluginCfg, setPluginCfg] = useState({});
  const [uploadCfg, setUploadCfg] = useState();
  const uploadUrl = `${prefixFileUrlWithBackendUrl("/upload")}`;
  const headers = { Authorization: "Bearer " + auth.getToken() };
  useEffect(() => {
    // load the editor config
    (async () => {
      const editor = await getEditorConfig();
      const plugin = await requestConfig('plugin');
      const upload = await requestConfig('uploadcfg');

      if (editor) {

        setLanguage(editor);
       
        setConfig({
          ...config,
          editor: {
            ...editor,
            strapiMediaLib: {
              onToggle: toggleMediaLib,
              label: "Media library",
            },
            strapiUpload: {
              uploadUrl,
              headers,
            },
          },
        });

      }
      if (plugin) {
        setPluginCfg({
          ...pluginCfg,
          ...plugin,
        });
        if (plugin.setAttribute !== false && localStorage.getItem("STRAPI_THEME")) {
          document.documentElement.setAttribute("data-theme", localStorage.getItem("STRAPI_THEME"));
        }
      }
      if (upload) {
        setUploadCfg({
          ...uploadCfg,
          ...upload,
        });
      }
    })();

    return () => { };
  }, []);

  //###########################################################################################################
  const wordCounter = useRef(null);
  return (
    <Wrapper className="ck-editor__styled__container" ref={wordCounter}>
      <EditorStyle custom={pluginCfg.styles} strapiTheme={pluginCfg.strapiTheme !== false ? theme : ""} />
      {config && (
        <CKEditor
          editor={CustomClassicEditor}
          disabled={disabled}
          data={value || ""}
          onReady={(editor) => {
            editor.setData(value || "")
            if(editor.config.get( 'removePlugins' ).includes("WordCount")===false){
              const wordCountPlugin = editor.plugins.get( 'WordCount' );
              const wordCountWrapper = wordCounter.current
              wordCountWrapper.appendChild( wordCountPlugin.wordCountContainer );
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange({ target: { name, value: data } });
          }}
          config={config?.editor}
        />
      )}
      <div style={{zIndex:5}}>
        <MediaLib isOpen={mediaLibVisible} onChange={handleChangeAssets} onToggle={toggleMediaLib} />
      </div>
    </Wrapper>
  );
};

Editor.defaultProps = {
  value: "",
  disabled: false,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Editor;
