import React, { useEffect, useRef, useState, useId } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { useField } from '@strapi/strapi/admin';
import { Box, Flex, FocusTrap, Portal, Loader } from '@strapi/design-system';
import { Expand, Collapse } from '@strapi/icons';
import 'ckeditor5/ckeditor5.css';

import { MediaLib } from './MediaLib';
import { getConfiguredPreset } from '../config';
import { GlobalStyling } from './GlobalStyling';
import { ExpandWrapper, LoaderBox, CounterLoaderBox, ExpandIconButton, CollapseIconButton } from './Styles';

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;


  ${({ styles }) => styles}
`;

const WrapperExpanded = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  .ck.ck-editor_top {
    box-shadow: 0 0 5px hsla( 0,0%,0%,.2 );
    z-index: 1;
  }

  .ck.ck-editor {
        display: flex;
        flex-direction: column;
    }

    .ck.ck-editor, .ck.ck-content,
    .ck.ck-content.ck-editor__editable,
    .ck.ck-editor__main {
            height: calc(100% - 0px) !important;
    }
        
    .ck.ck-editor__main {
        overflow-y: scroll !important;
        border: 1px solid var(--ck-color-base-border);
        border-bottom-left-radius: var(--ck-border-radius);
        border-bottom-right-radius: var(--ck-border-radius);
        padding: calc( 2 * var(--ck-spacing-large) );
    }

    .ck.ck-content.ck-editor__editable {
      width: 100%;
      max-width: var(--ck-editor-max-width) !important;
      height: auto !important;
      margin: 0 auto;
      overflow: auto !important;
      border: none;
      box-sizing: border-box;
    }

    .ck-word-count {
      position: absolute;
      display: flex;
      bottom: 0.3rem;
      right: 1.2rem;
    }

    .ck.ck-content.ck-editor__editable {
      border-radius: var(--ck-border-radius) !important;
      border: 1px solid var(--ck-color-base-border);
    }

  ${({ styles }) => styles}
`;

export const Editor = ({
  name,
  disabled,
  presetName,
  maxLength,
  placeholder,
}) => {
  const { onChange, value, error } = useField(name);

  const [editorInstance, setEditorInstance] = useState(false);

  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const [preset, setPreset] = useState(null);

  const [lengthMax, setLengthMax] = useState(false);
  
  const [isExpandedMode, setIsExpandedMode] = useState(false);

  const ariaDescriptionId = useId();

  const wordCounter = useRef(null);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleCounter = (number) =>
    number > maxLength ? setLengthMax(true) : setLengthMax(false);

  const handleToggleExpand = () => {
    setIsExpandedMode((prev) => !prev);
  };

  const handleOnCollapse = () => {
    setIsExpandedMode(false);
  };

  useEffect(() => {
    (async () => {
      const currentPreset = await getConfiguredPreset(presetName, {
        toggleMediaLib: handleToggleMediaLib,
        strapiFieldPlaceholder: placeholder,
      });

      setPreset(currentPreset);
    })();
  }, []);

  if (isExpandedMode) {
    return (
        <Portal role="dialog" aria-modal={false}>
          <FocusTrap onEscape={handleOnCollapse}>
            <ExpandWrapper
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={4}
              justifyContent="center"
              onClick={handleOnCollapse}
            >
              <Box
                background="neutral100"
                hasRadius
                shadow="popupShadow"
                overflow="hidden"
                width="90%"
                height="90%"
                onClick={(e) => e.stopPropagation()}
                aria-describedby={ariaDescriptionId}
                position="relative"
              >
                <Flex height="100%" alignItems="flex-start" direction="column">
                <>
                    {preset && <GlobalStyling />}
                    <WrapperExpanded styles={preset?.styles}>
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
                            data={value ?? ''}
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

                            <ExpandIconButton label="Expand" onClick={handleToggleExpand}>
                                <Expand />
                            </ExpandIconButton>

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
                    </WrapperExpanded>
                </>
                  <CollapseIconButton
                    label="Collapse"
                    onClick={handleOnCollapse}
                  >
                    <Collapse />
                  </CollapseIconButton>
                </Flex>
              </Box>
            </ExpandWrapper>
          </FocusTrap>
        </Portal>
      );
  }
  
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
              data={value ?? ''}
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

            <ExpandIconButton label="Expand" onClick={handleToggleExpand}>
                <Expand />
            </ExpandIconButton>

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
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  presetName: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
};