import React, { useRef, useState } from 'react';
import { useField } from '@strapi/strapi/admin';
import { Box } from '@strapi/design-system';
import styled from 'styled-components';
import { ClassicEditor } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';

export const CKEReact = ({
  name,
  disabled,
  maxLength,
  preset,
  isMaxLength,
  setIsMaxLength,
  setEditorInstance,
}) => {
  const { onChange: fieldOnChange, value, error } = useField(name);

  const wordCounter = useRef(null);

  const handleCounter = (number) => setIsMaxLength(number > maxLength);

  const hasWordCountPlugin = Boolean(preset.editorConfig.WordCountPlugin);

  const onEditorReady = (editor) => {
    if (hasWordCountPlugin) {
      const wordCountPlugin = editor.plugins.get('WordCount');
      wordCountPlugin.on('update', (evt, stats) =>
        handleCounter(stats.characters)
      );
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
  };

  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    fieldOnChange({ target: { name, value: data } });
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={preset.editorConfig}
        disabled={disabled}
        data={value ?? ''}
        onReady={onEditorReady}
        onChange={onEditorChange}
      />
      {hasWordCountPlugin && (
        <WordCounterBox
          color={isMaxLength ? 'danger500' : 'neutral400'}
          ref={wordCounter}
        ></WordCounterBox>
      )}
    </>
  );
};

const WordCounterBox = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
