import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor as CustomClassicEditor } from "./build/ckeditor";
import { Box } from "@strapi/design-system/Box";
import { prefixFileUrlWithBackendUrl, request, auth } from "@strapi/helper-plugin";
import MediaLib from "../MediaLib";
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
    let newValue = value ? value : "";
    assets.map((asset) => {
      if (asset.mime.includes("image")) {
        if (uploadCfg?.responsiveDimensions) {
          let set = "";
          let keys = Object.keys(asset.formats).sort((a, b) => {
            return asset.formats[a].width - asset.formats[b].width;
          });
          keys?.map((k) => {
            let str =
              prefixFileUrlWithBackendUrl(asset.formats[k].url) + ` ${asset.formats[k].width}w,`;
            set = set + str;
          });
          const imgTag = `<img src="${asset.url}" alt="${asset.alt}" srcset="${set}"></img>`;
          newValue = `${newValue}${imgTag}`;
        } else {
          const imgTag = `<img src="${asset.url}" alt="${asset.alt}"></img>`;
          newValue = `${newValue}${imgTag}`;
        }
      }
      // Handle videos and other type of files by adding some code
    });
    onChange({ target: { name, value: newValue } });
    toggleMediaLib();
  };

  //####### config #############################################################################################
  const [config, setConfig] = useState();
  const [pluginCfg, setPluginCfg] = useState({});
  const [uploadCfg, setUploadCfg] = useState();
  const uploadUrl = `${prefixFileUrlWithBackendUrl("/upload")}`;
  const headers = { Authorization: "Bearer " + auth.getToken() };
  useEffect(() => {
    // load the editor config
    (async () => {
      const editor = await request(`/${pluginId}/config/editor`, { method: "GET" });
      const plugin = await request(`/${pluginId}/config/plugin`, { method: "GET" });
      const upload = await request(`/${pluginId}/config/uploadcfg`, { method: "GET" });

      //read i18n locale
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const languageContent = params["plugins[i18n][locale]"];

      //set locale language code to content
      let language = editor.language;
      if (languageContent) {
        const countryCode = languageContent.split("-")[0]
        if (countryCode)
          language = { content: editor.language.content ? editor.language.content : countryCode, ui: editor.language.ui, textPartLanguage: editor.textPartLanguage }
      }

      if (editor) {
        setConfig({
          ...config,
          editor: {
            ...editor,
            language: language ? language : auth.getUserInfo().preferedLanguage,
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

        if (editor.language) {
          if (editor.language.ui) {
            import(
              /* webpackMode: "eager" */ `./build/translations/${editor.language.ui}.js`
            ).catch(() => null);
          }
          if (editor.language.content) {
            import(
              /* webpackMode: "eager" */ `./build/translations/${editor.language.content}.js`
            ).catch(() => null);
          }
          if (typeof editor.language !== "object") {
            import(/* webpackMode: "eager" */ `./build/translations/${editor.language}.js`).catch(
              () => null
            );
          }
        }
        if (!editor.language) {
          import(
            /* webpackMode: "eager" */ `./build/translations/${auth.getUserInfo().preferedLanguage
            }.js`
          ).catch(() => null);
        }
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
  return (
    <Wrapper className="ck-editor__styled__container">
      <EditorStyle
        custom={pluginCfg.styles}
        strapiTheme={pluginCfg.strapiTheme !== false ? theme : ""}
      />
      {config && (
        <CKEditor
          editor={CustomClassicEditor}
          disabled={disabled}
          data={value || ""}
          onReady={(editor) => editor.setData(value || "")}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange({ target: { name, value: data } });
          }}
          config={config?.editor}
        />
      )}
      <MediaLib isOpen={mediaLibVisible} onChange={handleChangeAssets} onToggle={toggleMediaLib} />
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
