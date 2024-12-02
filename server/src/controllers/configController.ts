import type { Core } from '@strapi/strapi';
import PLUGIN_ID from '../utils/pluginId';

export default function configController({ strapi }: { strapi: Core.Strapi }): Core.Controller {
  return {
    async getConfig(ctx): Promise<void> {
      const { responsiveDimensions = false } = strapi
        .plugin('upload')
        .service('upload')
        .getSettings();

      const isResponsive = `window.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE = ${responsiveDimensions}\n`;
      const config = strapi.plugin(PLUGIN_ID).service('configService').readConfig() + isResponsive;

      ctx.type = 'application/javascript';
      ctx.send(config);
    },
  };
}
