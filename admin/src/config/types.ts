import type { EditorConfig as CKE5EditorConfig } from 'ckeditor5';
import type { Interpolation } from 'styled-components';
import type { ExportToGlobal } from './expToGlobal';

export type PluginConfig =
  | {
      dontMergePresets: true;
      presets: Record<string, Preset>;
      dontMergeTheme?: boolean;
      theme?: Theme;
    }
  | {
      dontMergePresets?: false;
      presets?: {
        default: Partial<Preset>;
        /**
         * New presets must use Preset type.
         * Partial is included only for compatibility
         * with previous versions and should not be used.
         */
        [k: string]: Preset | PartialIsNotAllowedForNewPresets;
      };
      dontMergeTheme?: boolean;
      theme?: Theme;
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
  editorConfig: Partial<EditorConfig>;
};

export type PartialIsNotAllowedForNewPresets = {
  field?: Field;
  styles?: Styles;
  editorConfig?: Partial<EditorConfig>;
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

declare global {
  interface Window {
    SH_CKE: ExportToGlobal;
    SH_CKE_CONFIG: PluginConfig | null;
    SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE: boolean;
  }
}
