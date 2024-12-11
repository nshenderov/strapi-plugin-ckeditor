import type { Core } from '@strapi/strapi';

import pluginPkg from '../../package.json';

export default {
  register: ({ strapi }: { strapi: Core.Strapi }) => {
    strapi.customFields.register({
      name: 'CKEditor',
      plugin: pluginPkg.strapi.name,
      type: 'richtext',
    });
  },
};
