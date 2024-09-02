import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';

import { useFetchClient, useField } from '@strapi/strapi/admin';
import { Box, Loader } from '@strapi/design-system';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-editor-classic/build/editor-classic.js';
import 'ckeditor5/build/ckeditor5-dll.js';

import baseConfigs from './configs';
import { getGlobalStyling } from './styling';
import pluginId from '../../../utils/pluginId';
import MediaLib from '../MediaLib';
import { importLang } from './imports';
import { getPreferedLanguage, getStoredToken } from '../../../utils/localStorage';

const GlobalStyling = getGlobalStyling();

const Wrapper = styled('div')`
  ${({ editorStyles }) => editorStyles}
`;

const setLanguage = async (config) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const languageContent = params['plugins[i18n][locale]'];

  const preferedLanguage = getPreferedLanguage();

  const { ui = preferedLanguage, content, textPartLanguage, ignorei18n } = config.language || {};

  if (languageContent) {
    const locale = languageContent.split('-')[0];

    config.language = {
      ui: typeof config.language === 'string' ? config.language : ui,
      content: ignorei18n ? content : locale,
      textPartLanguage: textPartLanguage,
    };

    await importLang(config, config.language.ui);
    await importLang(config, config.language.content);
  } else if (typeof config.language === 'object') {
    await importLang(config, config.language.ui);
    await importLang(config, config.language.content);
  } else if (typeof config.language === 'string') {
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
      Object.keys(userConfigs).map((cfgName) => {
        if (baseConfigs.hasOwnProperty(cfgName)) {
          configs[cfgName].fields = {
            ...baseConfigs[cfgName].field,
            ...userConfigs[cfgName].field,
          };
          configs[cfgName].styles = userConfigs[cfgName].styles || baseConfigs[cfgName].styles;
          configs[cfgName].editorConfig = {
            ...baseConfigs[cfgName].editorConfig,
            ...userConfigs[cfgName].editorConfig,
          };
        } else {
          configs[cfgName] = userConfigs[cfgName];
        }
      });
    }
  }

  const clonedConfig = cloneDeep(configs[presetName]);

  return clonedConfig;
};

const setPlugins = (config, { responsiveDimensions }, toggleMediaLib, token) => {
  const configPluginNames = config.editorConfig?.plugins
    ? [...config.editorConfig.plugins.map((p) => p.pluginName)]
    : [];

  if (configPluginNames.includes('StrapiMediaLib')) {
    config.editorConfig.strapiMediaLib = { toggle: toggleMediaLib };
  }
  if (configPluginNames.includes('StrapiUploadAdapter')) {
    config.editorConfig.strapiUploadAdapter = {
      uploadUrl: `${strapi.backendURL}/upload`,
      headers: { Authorization: `Bearer ${token}` },
      backendUrl: strapi.backendURL,
      responsive: responsiveDimensions,
    };
  }
  if (configPluginNames.includes('WordCount')) {
    config.editorConfig.WordCountPlugin = true;
  }
};

export const CKEditorInput = ({ name, disabled, preset, maxLength }) => {
  const { get } = useFetchClient();
  const { onChange, value } = useField(name);

  const [editorInstance, setEditorInstance] = React.useState(false);

  const [mediaLibVisible, setMediaLibVisible] = React.useState(false);

  const [uploadPluginConfig, setUploadPluginConfig] = React.useState(null);

  const [ckEditorConfig, setCkEditorConfig] = React.useState(null);

  const [lengthMax, setLengthMax] = React.useState(false);

  const wordCounter = React.useRef(null);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleCounter = (number) => (number > maxLength ? setLengthMax(true) : setLengthMax(false));

  const getConfiguration = async (presetName, toggleMediaLib) => {
    const currentConfig = getCurrentConfig(presetName);

    const uploadPluginConfig = await get(`/${pluginId}/config/upload`);

    const token = getStoredToken();

    setPlugins(currentConfig, uploadPluginConfig, toggleMediaLib, token);

    await setLanguage(currentConfig.editorConfig);

    return { currentConfig, uploadPluginConfig };
  };

  React.useEffect(() => {
    const setConfig = async () => {
      const { currentConfig, uploadPluginConfig } = await getConfiguration(
        preset,
        handleToggleMediaLib
      );

      setCkEditorConfig(currentConfig);
      setUploadPluginConfig(uploadPluginConfig);
    };

    setConfig();
  }, []);

  return (
    <>
      {ckEditorConfig && <GlobalStyling />}
      <Wrapper editorStyles={ckEditorConfig?.styles}>
        {!ckEditorConfig && (
          <LoaderBox hasRadius background="neutral100">
            <Loader>Loading...</Loader>
          </LoaderBox>
        )}
        {ckEditorConfig && (
          <CKEditor
            editor={window.CKEditor5.editorClassic.ClassicEditor}
            config={ckEditorConfig?.editorConfig}
            disabled={disabled}
            data={value}
            onReady={(editor) => {
              if (ckEditorConfig.editorConfig.WordCountPlugin) {
                const wordCountPlugin = editor.plugins.get('WordCount');
                wordCountPlugin.on('update', (evt, stats) => handleCounter(stats.characters));
                const wordCountWrapper = wordCounter.current;
                wordCountWrapper?.appendChild(wordCountPlugin.wordCountContainer);
              }

              if (editor.plugins.has('ImageUploadEditing')) {
                editor.plugins
                  .get('ImageUploadEditing')
                  .on('uploadComplete', (evt, { data, imageElement }) =>
                    editor.model.change((writer) =>
                      writer.setAttribute('alt', data.alt, imageElement)
                    )
                  );
              }

              setEditorInstance(editor);
            }}
            onChange={(__, editor) => {
              const data = editor.getData();
              onChange({ target: { name, value: data } });
            }}
          />
        )}
        {ckEditorConfig && ckEditorConfig.editorConfig.WordCountPlugin && (
          <CounterLoaderBox color={lengthMax ? 'danger500' : 'neutral400'} ref={wordCounter}>
            {!editorInstance && <Loader small>Loading...</Loader>}
          </CounterLoaderBox>
        )}
        {uploadPluginConfig && (
          <MediaLib
            isOpen={mediaLibVisible}
            onToggle={handleToggleMediaLib}
            editor={editorInstance}
            uploadConfig={uploadPluginConfig}
          />
        )}
      </Wrapper>
    </>
  );
};

CKEditorInput.defaultProps = {
  disabled: false,
};

CKEditorInput.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const CounterLoaderBox = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
const LoaderBox = styled(Box)`
  display: flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
