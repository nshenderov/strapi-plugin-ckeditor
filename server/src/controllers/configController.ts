import type { Core } from '@strapi/strapi';

export default function configController({ strapi }: { strapi: Core.Strapi }): Core.Controller {
  return {
    async isResponsiveDimensions(ctx): Promise<void> {
      const { responsiveDimensions = false } = await strapi
        .plugin('upload')
        .service('upload')
        .getSettings();

      ctx.send({
        isResponsiveDimensions: responsiveDimensions,
      });
    },
  };
}
