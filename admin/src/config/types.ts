import type { EditorConfig as CKE5EditorConfig } from 'ckeditor5';
import type { Interpolation } from 'styled-components';

/**
 * Plugin configuration object.
 *
 * @internal
 */
export type PluginConfig = {
  presets: Record<string, Preset>;
  theme: Theme;
};

/**
 * Used to register a preset option in the admin panel.
 *
 * @internal
 *
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 */
export type Option = {
  metadatas: Metadatas;
  key: string | number;
  /**
   * @remarks
   *
   * The value must match the corresponding key in the presets.
   */
  value: string | number;
};

/**
 * Used to register a preset option in the admin panel.
 *
 * @internal
 *
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 */
export type Metadatas = {
  intlLabel: IntlLabel;
};

/**
 * Used to register a preset option in the admin panel.
 *
 * @internal
 *
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 */
export type IntlLabel = {
  id: string;
  defaultMessage: string;
  values?: object;
};

/**
 * Plugin configuration object.
 */
export type UserPluginConfig = {
  /**
   * Presets are sets of settings that define the editor's features and appearance.
   */
  presets?: Preset[];
  /**
   * Styles applied globally to every editor instance.
   */
  theme?: Theme;
};

/**
 * Styles applied globally to every editor instance.
 *
 * @remarks
 *
 * The `common` styles are applied first, followed by `light` or `dark` styles
 * according to the preferences, and finally `additional` styles.
 */
export type Theme = {
  /**
   * Core styles.
   */
  common?: EditorStyles;
  /**
   * Styles apllied in light mode.
   */
  light?: EditorStyles;
  /**
   * Styles apllied in dark mode.
   */
  dark?: EditorStyles;
  /**
   * Additional styles that complement the theme.
   */
  additional?: EditorStyles;
};

/**
 * Represents styles that can be applied to an editor instance.
 * Can be a plain CSS string or an array of interpolations for dynamic styling.
 */
export type EditorStyles = string | Interpolation<object>[];

/**
 * Preset is a set of settings that define the editor's features and appearance.
 */
export type Preset = {
  /**
   * Preset name, displayed in the schema.
   */
  name: string;
  /**
   * Preset description, displayed in the Content-Type Builder.
   */
  description: string;
  /**
   * Additional styles applied to the editor instance after the theme styles.
   */
  styles?: EditorStyles;
  /**
   * CKEditor configuration object.
   *
   * @see {@link https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/configuration.html | CKEditor documentation}
   */
  editorConfig: EditorConfig;
};

/**
 * CKEditor configuration object.
 *
 * @see {@link https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/configuration.html | CKEditor documentation}
 */
export type EditorConfig = CKE5EditorConfig;
