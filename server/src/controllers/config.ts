import pluginId from '../utils/pluginId';

import type { Core } from '@strapi/strapi';

const config = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getUploadConfig(ctx) {
    const uploadConfig = await strapi
      .plugin(pluginId)
      .service('config')
      .getUploadConfig('upload')
      .getSettings();
    ctx.send(uploadConfig);
  },

  async getCKEditorConfig(ctx) {
    const config = await strapi.plugin(pluginId).service('config').getCKEditorConfig();

    ctx.type = 'text/javascript';
    ctx.send(config);
  },
});

export default config;
