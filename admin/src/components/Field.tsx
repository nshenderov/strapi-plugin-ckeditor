import React from 'react';
import { type InputProps, type FieldValue } from '@strapi/strapi/admin';

import { Editor } from './Editor';
import { EditorProvider } from './EditorProvider';

type CKEditorFieldProps = Readonly<
  InputProps &
    FieldValue & {
      labelAction?: React.ReactNode;
      attribute: {
        options: {
          preset: string;
          maxLengthWords: number;
          maxLengthCharacters: number;
        };
      };
    }
>;

function Field({
  name,
  hint,
  error,
  placeholder,
  label,
  attribute,
  labelAction = null,
  disabled = false,
  required = false,
}: CKEditorFieldProps) {
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

function compare(oldProps: CKEditorFieldProps, newProps: CKEditorFieldProps): boolean {
  return (
    oldProps.name === newProps.name &&
    oldProps.hint === newProps.hint &&
    oldProps.error === newProps.error &&
    oldProps.placeholder === newProps.placeholder &&
    oldProps.disabled === newProps.disabled &&
    oldProps.required === newProps.required &&
    oldProps.label === newProps.label &&
    oldProps.labelAction === newProps.labelAction
  );
}

const MemoizedField = React.memo(Field, compare);
export { MemoizedField as Field };
