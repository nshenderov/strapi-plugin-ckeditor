'use strict';

const pluginId = require('../utils/pluginId');

module.exports = {
  getConfig: async (ctx) => {
    const { responsiveDimensions = false } = await strapi
      .plugin('upload')
      .service('upload')
      .getSettings();

    const config =
      (await strapi.plugin(pluginId).service('config').getConfig()) +
      `\nglobalThis.SH_CKE_UPLOAD_ADAPTER_IS_RESPONSIVE = ${responsiveDimensions}`;

    ctx.type = 'application/javascript';
    ctx.send(config);
  },
};
