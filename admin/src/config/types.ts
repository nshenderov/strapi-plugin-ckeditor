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
 * Used to register a preset option in the admin panel.
 *
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 *
 * @internal
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
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 *
 * @internal
 */
export type Metadatas = {
  intlLabel: IntlLabel;
};

/**
 * Used to register a preset option in the admin panel.
 *
 * @see {@link https://docs.strapi.io/dev-docs/custom-fields#options | Strapi documentation}
 *
 * @internal
 */
export type IntlLabel = {
  id: string;
  defaultMessage: string;
  values?: object;
};

/**
 * @public
 */
export type UserPluginConfig = {
  presets?: Preset[];
  /**
   * Styles applied globally to every editor instance.
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
  common?: CSS;
  /**
   * Styles apllied in light mode.
   */
  light?: CSS;
  /**
   * Styles apllied in dark mode.
   */
  dark?: CSS;
  /**
   * Additional styles that complement the theme.
   */
  additional?: CSS;
};

/**
 * CSS, can either be a string or an array of interpolated objects.
 *
 * @public
 */
export type CSS = string | Interpolation<object>[];

/**
 * @public
 */
export type Preset = {
  /**
   * Preset name, will be shown in the schema.
   */
  name: string;
  /**
   * Preset description, will be shown in the content-type builder.
   */
  description: string;
  /**
   * Styles applied to the editor instance in addition to the theme.
   */
  styles?: CSS;
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
