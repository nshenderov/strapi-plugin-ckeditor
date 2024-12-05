import type { EditorConfig as CKE5EditorConfig } from 'ckeditor5';
import type { Interpolation } from 'styled-components';

export type PluginConfig = {
  presets: Record<string, Preset>;
  theme: Theme;
};

export type Theme = {
  common?: Styles;
  light?: Styles;
  dark?: Styles;
  additional?: Styles;
};

export type Preset = {
  field: Field;
  styles?: Styles;
  editorConfig: EditorConfig;
};

export type EditorConfig = CKE5EditorConfig;

export type Field = {
  metadatas: Metadata;
  key: string | number;
  value: string | number;
};

export type Metadata = {
  intlLabel: IntlLabel;
  disabled?: boolean;
  hidden?: boolean;
};

export type IntlLabel = {
  id: string;
  defaultMessage: string;
  values?: object;
};

export type Styles = string | Interpolation<object>[];
