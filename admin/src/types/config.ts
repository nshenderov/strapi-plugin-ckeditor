import { CKEditorPreset } from './preset';

export type CKEditorConfig =
  | {
      dontMergePresets: true;
      presets: Record<string, CKEditorPreset>;
      dontMergeTheme?: boolean;
      theme?: Theme;
    }
  | {
      dontMergePresets?: false;
      presets?: Record<string, Partial<CKEditorPreset>>;
      dontMergeTheme?: boolean;
      theme?: Theme;
    };

type Theme = {
  common?: string;
  light?: string;
  dark?: string;
  additional?: string;
};
