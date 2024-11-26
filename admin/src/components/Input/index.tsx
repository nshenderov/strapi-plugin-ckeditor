import React from 'react';
import { type InputProps, type FieldValue } from '@strapi/strapi/admin';

import Editor from './components/Editor';
import { EditorProvider } from './components/EditorProvider';

type CustomFieldInputProps = InputProps &
  FieldValue & {
    labelAction?: React.ReactNode;
    attribute: {
      options: {
        preset: string;
        maxLengthWords: number;
        maxLengthCharacters: number;
      };
    };
  };

function Input({
  name,
  hint,
  error,
  placeholder,
  label,
  attribute,
  labelAction = null,
  disabled = false,
  required = false,
}: CustomFieldInputProps) {
  const { preset, maxLengthWords, maxLengthCharacters } = attribute.options;

  return (
    <EditorProvider
      name={name}
      fieldError={error}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      hint={hint}
      label={label}
      labelAction={labelAction}
      presetName={preset}
      wordsLimit={maxLengthWords}
      charsLimit={maxLengthCharacters}
    >
      <Editor />
    </EditorProvider>
  );
}

const MemoizedInput = React.memo(Input, compare);
export default MemoizedInput;

function compare(
  oldProps: Readonly<CustomFieldInputProps>,
  newProps: Readonly<CustomFieldInputProps>
): boolean {
  return (
    oldProps.name === newProps.name &&
    oldProps.hint === newProps.hint &&
    oldProps.error === newProps.error &&
    oldProps.placeholder === newProps.placeholder &&
    oldProps.disabled === newProps.disabled &&
    oldProps.required === newProps.required &&
    oldProps.labelAction === newProps.labelAction
  );
}
