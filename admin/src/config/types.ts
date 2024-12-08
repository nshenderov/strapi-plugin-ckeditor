import type { EditorConfig as CKE5EditorConfig } from 'ckeditor5';
import type { Interpolation } from 'styled-components';

/**
 * @internal
 */
export type PluginConfig = {
  presets: Record<string, Preset>;
  theme: Theme;
};

/**
 * @public
 */
export type UserPluginConfig = {
  /**
   * @remarks
   *
   * Each key in the presets must match the corresponding `field`'s `value` property in the preset.
   */
  presets?: Record<string, Preset>;
  /**
   * Styles applied globally to every editor.
   */
  theme?: Theme;
};

/**
 * @public
 */
export type Theme = {
  /**
   * Core styles.
   */
  common?: Styles;
  /**
   * Styles apllied to the editor in light mode.
   */
  light?: Styles;
  /**
   * Styles apllied to the editor in dark mode.
   */
  dark?: Styles;
  /**
   * Additional styles that complement the theme.
   */
  additional?: Styles;
};

/**
 * @public
 */
export type Preset = {
  /**
   * Used to register the preset option in the admin panel.
   *
   * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
   */
  field: Field;
  /**
   * Styles applied to the editor in addition to the theme.
   */
  styles?: Styles;
  /**
   * CKEditor configuration.
   *
   * @see {@link https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/configuration.html | CKEditor documentation}
   */
  editorConfig: EditorConfig;
};

/**
 * CKEditor configuration.
 *
 * @see {@link https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/configuration.html | CKEditor documentation}
 *
 * @public
 */
export type EditorConfig = CKE5EditorConfig;

/**
 * Used to register the preset option in the admin panel.
 *
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 *
 * @public
 */
export type Field = {
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
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 *
 * @public
 */
export type Metadatas = {
  intlLabel: IntlLabel;
  disabled?: boolean;
  hidden?: boolean;
};

/**
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 *
 * @public
 */
export type IntlLabel = {
  id: string;
  defaultMessage: string;
  values?: object;
};

/**
 * Defines styles, which can either be a string or an array of interpolated objects.
 *
 * @public
 */
export type Styles = string | Interpolation<object>[];
