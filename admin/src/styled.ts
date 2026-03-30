import type { StrapiTheme } from '@strapi/design-system';

// We need this since @strapi/design-system is not a direct dependency of the plugin anymore
declare module 'styled-components' {
  export interface DefaultTheme extends StrapiTheme {}
}
