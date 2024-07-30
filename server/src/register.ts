import type { Core } from '@strapi/strapi';

import pluginId from './utils/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'CKEditor',
    plugin: pluginId,
    type: 'richtext',
  });
};

export default register;
