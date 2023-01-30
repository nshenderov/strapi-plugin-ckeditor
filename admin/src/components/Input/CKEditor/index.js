import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, Loader } from '@strapi/design-system';

import {getConfiguration} from "./configuration";
import {getGlobalStyling} from "./styling";
import MediaLib from "../MediaLib";

import ckeditor5Dll from "ckeditor5/build/ckeditor5-dll.js";
import ckeditor5EditorClassicDll from "@ckeditor/ckeditor5-editor-classic/build/editor-classic.js";

const GlobalStyling = getGlobalStyling();

const Wrapper = styled("div")`${({ editorStyles }) => editorStyles}`;

const Editor = ({ onChange, name, value, disabled, preset, maxLength }) => {

  const [ editorInstance, setEditorInstance ] = useState(false);
  
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  
  const [uploadPluginConfig, setUploadPluginConfig] = useState(null);
  
  const [config, setConfig] = useState(null);

  const [lengthMax, setLengthMax] = useState(false);

  const wordCounter = useRef(null);
  
  const handleToggleMediaLib = () => setMediaLibVisible(prev => !prev);

  const handleCounter = (number) => number > maxLength ? setLengthMax(true) : setLengthMax(false);
  
  useEffect(() => {
    (async () => {
      const {currentConfig, uploadPluginConfig} = await getConfiguration(preset, handleToggleMediaLib);
      setConfig(currentConfig);
      setUploadPluginConfig(uploadPluginConfig);
    })();
  }, []);

  return (
    <>
    {config && <GlobalStyling />}
    <Wrapper editorStyles={config?.styles} >
      {!config &&
      <LoaderBox hasRadius background="neutral100">
        <Loader>Loading...</Loader>
      </LoaderBox>}
      {config &&
          <CKEditor
            editor={window.CKEditor5.editorClassic.ClassicEditor}
            config={config?.editorConfig}
            disabled={disabled}
            data={value}
            onReady={(editor) => {
              
              if(config.editorConfig.WordCountPlugin){
                const wordCountPlugin = editor.plugins.get( 'WordCount' );
                wordCountPlugin.on( 'update', ( evt, stats ) =>handleCounter(stats.characters));
                const wordCountWrapper = wordCounter.current;
                wordCountWrapper?.appendChild( wordCountPlugin.wordCountContainer );
              }

              if(editor.plugins.has( 'ImageUploadEditing' )){
                editor.plugins.get( 'ImageUploadEditing' ).on( 'uploadComplete', ( evt, { data, imageElement } ) =>    
                  editor.model.change( writer => writer.setAttribute( 'alt', data.alt, imageElement ) ) ); 
              }
            
              setEditorInstance( editor );
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange({ target: { name, value: data } });
            }}
          />
      }
      {config && config.editorConfig.WordCountPlugin && 
          <CounterLoaderBox 
            color={lengthMax?"danger500":"neutral400"} 
            ref={wordCounter}>
              {!editorInstance && <Loader small>Loading...</Loader>}
          </CounterLoaderBox>
      }
      {uploadPluginConfig && <MediaLib isOpen={mediaLibVisible} onToggle={handleToggleMediaLib} editor={editorInstance} uploadConfig={uploadPluginConfig} />}
    </Wrapper>
    </>
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

const CounterLoaderBox = styled(Box)`
  display:flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  `
const LoaderBox = styled(Box)`
  display:flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  `

export default Editor;
