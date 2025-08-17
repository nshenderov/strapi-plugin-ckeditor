import React from 'react';
import type { InputProps, FieldValue } from '@strapi/strapi/admin';

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

const Field = React.forwardRef<{ focus: () => void }, CKEditorFieldProps>(
  (
    {
      name,
      hint,
      error,
      placeholder,
      label,
      attribute,
      labelAction = null,
      disabled = false,
      required = false,
    }: CKEditorFieldProps,
    forwardedRef
  ) => {
    const { preset, maxLengthWords, maxLengthCharacters } = attribute.options;
    const isFieldLocalized = attribute?.pluginOptions?.i18n?.localized ?? false;

    return (
      <EditorProvider
        name={name}
        error={error}
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
        <Editor ref={forwardedRef} />
      </EditorProvider>
    );
  }
);

function compare(oldProps: CKEditorFieldProps, newProps: CKEditorFieldProps): boolean {
  return oldProps.error === newProps.error && oldProps.labelAction === newProps.labelAction;
}

const MemoizedField = React.memo(Field, compare);
export { MemoizedField as Field };
