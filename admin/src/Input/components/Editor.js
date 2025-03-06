import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { Box, Loader } from '@strapi/design-system';
import 'ckeditor5/ckeditor5.css';

import { MediaLib } from './MediaLib';
import { getConfiguredPreset, GlobalStyling } from '../config';

const Wrapper = styled('div')`
  ${({ styles }) => styles}
`;

export const Editor = ({
  onChange,
  name,
  value = '',
  disabled = false,
  presetName,
  maxLength,
  placeholder,
}) => {
  const [editorInstance, setEditorInstance] = useState(false);

  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const [preset, setPreset] = useState(null);

  const [lengthMax, setLengthMax] = useState(false);

  const wordCounter = useRef(null);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleCounter = (number) =>
    number > maxLength ? setLengthMax(true) : setLengthMax(false);

  useEffect(() => {
    (async () => {
      const currentPreset = await getConfiguredPreset(presetName, {
        toggleMediaLib: handleToggleMediaLib,
        strapiFieldPlaceholder: placeholder?.defaultMessage,
      });

      setPreset(currentPreset);
    })();
  }, []);

  return (
    <>
      {preset && <GlobalStyling />}
      <Wrapper styles={preset?.styles}>
        {!preset && (
          <LoaderBox hasRadius background="neutral100">
            <Loader>Loading...</Loader>
          </LoaderBox>
        )}
        {preset && (
          <>
            <CKEditor
              editor={ClassicEditor}
              config={preset.editorConfig}
              disabled={disabled}
              data={value}
              onReady={(editor) => {
                if (preset.editorConfig.WordCountPlugin) {
                  const wordCountPlugin = editor.plugins.get('WordCount');
                  wordCountPlugin.on('update', (evt, stats) =>
                    handleCounter(stats.characters)
                  );
                  const wordCountWrapper = wordCounter.current;
                  wordCountWrapper?.appendChild(
                    wordCountPlugin.wordCountContainer
                  );
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
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange({ target: { name, value: data } });
              }}
            />
            <MediaLib
              isOpen={mediaLibVisible}
              onToggle={handleToggleMediaLib}
              editor={editorInstance}
            />
            {preset.editorConfig.WordCountPlugin && (
              <CounterLoaderBox
                color={lengthMax ? 'danger500' : 'neutral400'}
                ref={wordCounter}
              >
                {!editorInstance && <Loader small>Loading...</Loader>}
              </CounterLoaderBox>
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
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
