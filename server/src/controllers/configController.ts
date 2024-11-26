import type { Core } from '@strapi/strapi';
import pluginId from '../utils/pluginId';

export default function configController({ strapi }: { strapi: Core.Strapi }): Core.Controller {
  return {
    getConfig(ctx) {
      const { responsiveDimensions = false } = strapi
        .plugin('upload')
        .service('upload')
        .getSettings();

      const isResponsive = `\nglobalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE = ${responsiveDimensions}`;

      const config = strapi.plugin(pluginId).service('configService').readConfig() + isResponsive;

      ctx.type = 'application/javascript';
      ctx.send(config);
    },
  };
}
