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
        pluginOptions?: {
          i18n?: {
            localized?: boolean;
          };
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
  const isFieldLocalized = attribute?.pluginOptions?.i18n?.localized ?? false;

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
      isFieldLocalized={isFieldLocalized}
    >
      <Editor />
    </EditorProvider>
  );
}

function compare(oldProps: CKEditorFieldProps, newProps: CKEditorFieldProps): boolean {
  return oldProps.error === newProps.error && oldProps.labelAction === newProps.labelAction;
}

const MemoizedField = React.memo(Field, compare);
export { MemoizedField as Field };
