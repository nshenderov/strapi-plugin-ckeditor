import type { Core } from '@strapi/strapi';
import pluginId from './utils/pluginId';

export default function register({ strapi }: { strapi: Core.Strapi }): void {
  strapi.customFields.register({
    name: 'CKEditor',
    plugin: pluginId,
    type: 'richtext',
  });
}
