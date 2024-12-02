import type { Core } from '@strapi/strapi';
import PLUGIN_ID from '../utils/pluginId';

export default function configController({ strapi }: { strapi: Core.Strapi }): Core.Controller {
  return {
    async getConfig(ctx): Promise<void> {
      const { responsiveDimensions = false } = await strapi
        .plugin('upload')
        .service('upload')
        .getSettings();

      let config = await strapi.plugin(PLUGIN_ID).service('configService').readConfig();
      config += `window.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE = ${responsiveDimensions}\n`;

      ctx.type = 'application/javascript';
      ctx.send(config);
    },
  };
}
