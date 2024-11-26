import type { EditorConfig } from 'ckeditor5';

type IntlLabel = {
  id: string;
  defaultMessage: string;
  values?: object;
};

type Metadata = {
  intlLabel: IntlLabel;
  disabled?: boolean;
  hidden?: boolean;
};

type Field = {
  metadatas: Metadata;
  key: string | number;
  value: string | number;
};

export type CKEditorOptPreset = {
  field?: Field;
  styles?: string;
  editorConfig?: EditorConfig;
};

export type CKEditorPreset = {
  field: Field;
  styles?: string;
  editorConfig: EditorConfig;
};
